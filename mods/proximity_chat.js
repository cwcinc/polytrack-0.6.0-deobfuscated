// Copyright (c) 2026 cwcinc. All rights reserved. Unauthorized use prohibited.

class ClientVoiceChat {
  constructor() {
    this.localStream = null;
    this.audioEl = null;
    this.peerConnection = null;
    this._voiceChannel = null;
  }

  async start(peerConnection) {
    this.peerConnection = peerConnection;
    this.localStream = null;

    peerConnection.ontrack = (event) => {
      if (event.track.kind !== 'audio') return;
      const stream = event.streams[0] ?? new MediaStream([event.track]);
      this.audioEl = new Audio();
      this.audioEl.srcObject = stream;
      this.audioEl.play().catch(() => {});
    };

    // Voice signaling channel for post-connection renegotiation
    // negotiated:true + id:2 means both sides pre-agree, no SDP needed for this channel
    this._voiceChannel = peerConnection.createDataChannel("voice-signal", {
      negotiated: true,
      id: 2
    });

    this._voiceChannel.onmessage = (event) => {
      try {
        this._handleVoiceSignal(JSON.parse(event.data));
      } catch {}
    };

    return null;
  }

  async _handleVoiceSignal(msg) {
    if (msg.type === 'answer') {
      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription({ type: 'answer', sdp: msg.sdp })
      );
    } else if (msg.type === 'offer') {
      // Host is renegotiating (e.g. adding mixed audio track)
      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription({ type: 'offer', sdp: msg.sdp })
      );
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      this._voiceChannel.send(JSON.stringify({
        type: 'answer',
        sdp: answer.sdp
      }));
    }
  }

  // Trigger renegotiation after adding/replacing a track
  async _renegotiate() {
    if (!this._voiceChannel || this._voiceChannel.readyState !== 'open') return;
    try {
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      this._voiceChannel.send(JSON.stringify({
        type: 'offer',
        sdp: offer.sdp
      }));
    } catch (e) {
      console.warn('[voice] renegotiation failed', e);
    }
  }

  async setMicMuted(muted) {
    if (muted) {
      if (this.localStream) {
        this.localStream.getAudioTracks().forEach(t => (t.enabled = false));
      }
      return this.localStream;
    }

    const liveTracks = this.localStream?.getAudioTracks()
      .filter(t => t.readyState === 'live') ?? [];

    if (liveTracks.length > 0) {
      liveTracks.forEach(t => (t.enabled = true));
      return this.localStream;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        video: false,
      });

      const audioTrack = stream.getAudioTracks()[0];
      if (!audioTrack) {
        this.localStream = null;
        return null;
      }

      const existingSender = this.peerConnection?.getSenders()
        .find(s => s.track?.kind === 'audio');

      if (existingSender) {
        await existingSender.replaceTrack(audioTrack);
      } else if (this.peerConnection) {
        this.peerConnection.addTrack(audioTrack, stream);
        // New track added — need renegotiation for host to receive it
        await this._renegotiate();
      }

      if (this.localStream) {
        this.localStream.getTracks().forEach(t => t.stop());
      }
      this.localStream = stream;
      this.localStream.getAudioTracks().forEach(t => (t.enabled = true));
      return this.localStream;
    } catch (error) {
      this.localStream = null;
      if (error?.name === 'NotFoundError' || error?.name === 'DevicesNotFoundError') {
        console.warn('[voice] microphone not found while unmuting; local mic disabled');
      } else {
        console.warn('[voice] failed to reconnect local microphone while unmuting', error);
      }
      return null;
    }
  }

  destroy() {
    if (this.localStream) this.localStream.getTracks().forEach(t => t.stop());
    if (this.audioEl) { this.audioEl.pause(); this.audioEl.srcObject = null; }
    this._voiceChannel = null;
    this.peerConnection = null;
  }
}

class HostVoiceChat {
  constructor({ maxDistance = 60, falloff = 1.5 }) {
    this.maxDistance = maxDistance;
    this.falloff = falloff;

    this.audioCtx = new AudioContext();

    this.localStream = null;
    this.localSource = null;

    // playerId -> { source, peerConnection, incomingStream, _keepAlive, _voiceChannel }
    this.clients = new Map();

    // playerId -> { destination, gains, panners, outputStream, sender }
    this.mixOutputs = new Map();

    this._intervalId = setInterval(() => this._updateAllGains(), 66);

    this.playerCarMap = new Map();
    this.hostPos = null;
    this.hostQuat = null;
  }

  setPlayerCar(playerId, car) {
    this.playerCarMap.set(playerId, car);
  }

  setHostPos(pos) {
    this.hostPos = pos;
  }

  setHostQuat(quat) {
    this.hostQuat = quat;
  }

  getPlayerPosition(playerId) {
    return this.playerCarMap.get(playerId)?.getPosition() ?? { x: 0, y: 0, z: 0 };
  }

  getPlayerQuaternion(playerId) {
    return this.playerCarMap.get(playerId)?.getQuaternion() ?? { x: 0, y: 0, z: 0, w: 1 };
  }

  getHostPosition() {
    return this.hostPos ?? { x: 0, y: 0, z: 0 };
  }

  getHostQuaternion() {
    return this.hostQuat ?? { x: 0, y: 0, z: 0, w: 1 };
  }

  // ---- Host's own mic ----

  async startHostMic() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        video: false,
      });
      this.localSource = this.audioCtx.createMediaStreamSource(this.localStream);
      this._rebuildAllMixes();
      return this.localStream;
    } catch (error) {
      this.localStream = null;
      this.localSource = null;
      if (error?.name === 'NotFoundError' || error?.name === 'DevicesNotFoundError') {
        console.warn('[voice] host microphone not found; host mic disabled');
      } else {
        console.warn('[voice] failed to start host microphone; host mic disabled', error);
      }
      this._rebuildAllMixes();
      return null;
    }
  }

  async setMicMuted(muted) {
    if (muted) {
      if (this.localStream) {
        this.localStream.getAudioTracks().forEach(t => (t.enabled = false));
      }
      return this.localStream;
    }

    const liveTracks = this.localStream?.getAudioTracks()
      .filter(t => t.readyState === 'live') ?? [];

    if (liveTracks.length > 0) {
      liveTracks.forEach(t => (t.enabled = true));
      return this.localStream;
    }

    return this.startHostMic();
  }

  // ---- Register a client ----

  registerClient(playerId, peerConnection) {
    // Voice signaling channel — matches client's negotiated channel
    const voiceChannel = peerConnection.createDataChannel("voice-signal", {
      negotiated: true,
      id: 2
    });

    voiceChannel.onmessage = async (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === 'offer') {
          // Client added an audio track and is renegotiating
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription({ type: 'offer', sdp: msg.sdp })
          );
          // ontrack fires here — client's audio arrives

          // Include host's mix track in the answer
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          voiceChannel.send(JSON.stringify({
            type: 'answer',
            sdp: answer.sdp
          }));
        } else if (msg.type === 'answer') {
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription({ type: 'answer', sdp: msg.sdp })
          );
        }
      } catch (e) {
        console.warn('[voice] signaling error for', playerId, e);
      }
    };

    peerConnection.ontrack = (event) => {
      if (event.track.kind !== 'audio') return;
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

      const stream = event.streams[0] ?? new MediaStream([event.track]);
      const source = this.audioCtx.createMediaStreamSource(stream);

      const keep = new Audio();
      keep.srcObject = stream;
      keep.volume = 0.001;
      keep.play().catch(() => {});

      this.clients.set(playerId, {
        source, peerConnection, incomingStream: stream,
        _keepAlive: keep, _voiceChannel: voiceChannel
      });

      this._rebuildAllMixes();
    };
  }

  // Trigger renegotiation toward a specific client (e.g. after host adds mix track)
  async _renegotiateClient(playerId) {
    const client = this.clients.get(playerId);
    if (!client?._voiceChannel || client._voiceChannel.readyState !== 'open') return;
    try {
      const offer = await client.peerConnection.createOffer();
      await client.peerConnection.setLocalDescription(offer);
      client._voiceChannel.send(JSON.stringify({
        type: 'offer',
        sdp: offer.sdp
      }));
    } catch (e) {
      console.warn('[voice] host renegotiation failed for', playerId, e);
    }
  }

  // ---- Build mix for one listener ----

  _buildMixForListener(listenerId) {
    const old = this.mixOutputs.get(listenerId);
    if (old) {
      old.gains.forEach(g => g.disconnect());
      old.panners.forEach(p => p.disconnect());
      old.destination.disconnect();
    }

    if (listenerId !== '__host__') {
      const client = this.clients.get(listenerId);
      if (!client || client.peerConnection.connectionState === 'closed') return;
    }

    const destination = this.audioCtx.createMediaStreamDestination();
    const gains = new Map();
    const panners = new Map();

    const sources = this._getAllSourcesExcept(listenerId);

    for (const { id, source } of sources) {
      const panner = this.audioCtx.createStereoPanner();
      panner.pan.value = 0;

      const gain = this.audioCtx.createGain();
      gain.gain.value = 0;

      source.connect(panner).connect(gain).connect(destination);

      panners.set(id, panner);
      gains.set(id, gain);
    }

    const outputStream = destination.stream;

    let sender = null;
    let needsRenegotiation = false;

    if (listenerId !== '__host__') {
      const client = this.clients.get(listenerId);
      if (client) {
        const audioTrack = outputStream.getAudioTracks()[0];
        const existingSender = client.peerConnection.getSenders()
          .find(s => s.track?.kind === 'audio');

        try {
          if (existingSender) {
            existingSender.replaceTrack(audioTrack);
            sender = existingSender;
          } else {
            sender = client.peerConnection.addTrack(audioTrack, outputStream);
            needsRenegotiation = true;
          }
        } catch (e) {
          console.warn('[mixer] skipping closed connection for', listenerId);
          return;
        }
      }
    }

    this.mixOutputs.set(listenerId, { destination, gains, panners, outputStream, sender });

    // If we added a new track (not replaced), renegotiate so client receives it
    if (needsRenegotiation) {
      this._renegotiateClient(listenerId);
    }
  }

  _getAllSourcesExcept(excludeId) {
    const sources = [];
    for (const [id, client] of this.clients) {
      if (id !== excludeId) {
        sources.push({ id, source: client.source });
      }
    }
    if (this.localSource && excludeId !== '__host__') {
      sources.push({ id: '__host__', source: this.localSource });
    }
    return sources;
  }

  _rebuildAllMixes() {
    for (const [clientId] of this.clients) {
      this._buildMixForListener(clientId);
    }
    this._buildMixForListener('__host__');
    this.playHostAudio();
  }

  // ---- Host playback ----

  getHostPlaybackStream() {
    const mix = this.mixOutputs.get('__host__');
    return mix?.outputStream ?? null;
  }

  playHostAudio() {
    if (!this._hostAudioEl) {
      this._hostAudioEl = new Audio();
    }
    const stream = this.getHostPlaybackStream();
    if (stream && this._hostAudioEl.srcObject !== stream) {
      this._hostAudioEl.srcObject = stream;
      this._hostAudioEl.play().catch(() => {});
    }
  }

  // ---- Heading derivation ----

  _headingFromQuaternion(q) {
    const fx = 2 * (q.x * q.z + q.w * q.y);
    const fz = 1 - 2 * (q.x * q.x + q.y * q.y);
    return Math.atan2(fx, fz);
  }

  _getHeading(id) {
    let q = (id === '__host__')
      ? this.getHostQuaternion()
      : this.getPlayerQuaternion(id);
    if (!q) return 0;
    if (id === '__host__') {
      q = { x: -q.x, y: -q.y, z: -q.z, w: q.w };
    }
    return this._headingFromQuaternion(q);
  }

  _computeDirectionalAudio(listenerId, sourceId) {
    const lPos = this._getPos(listenerId);
    const sPos = this._getPos(sourceId);
    if (!lPos || !sPos) return { pan: 0, behindAttenuation: 1 };

    const heading = this._getHeading(listenerId);

    const dx = sPos.x - lPos.x;
    const dz = (sPos.z ?? 0) - (lPos.z ?? 0);
    const angleToSource = Math.atan2(dx, dz);

    let rel = angleToSource - heading;
    while (rel > Math.PI) rel -= 2 * Math.PI;
    while (rel < -Math.PI) rel += 2 * Math.PI;

    const pan = Math.sin(rel);

    const cosAngle = Math.cos(rel);
    const behindMin = 0.3;
    const behindAttenuation = behindMin + (1 - behindMin) * (cosAngle + 1) / 2;

    return { pan, behindAttenuation };
  }

  // ---- Main update loop ----

  _updateAllGains() {
    const rampEnd = this.audioCtx.currentTime + 0.06;

    for (const [listenerId, mix] of this.mixOutputs) {
      const listenerPos = this._getPos(listenerId);
      if (!listenerPos) continue;

      for (const [sourceId, gainNode] of mix.gains) {
        const sourcePos = this._getPos(sourceId);
        if (!sourcePos) {
          gainNode.gain.linearRampToValueAtTime(0, rampEnd);
          continue;
        }

        const dx = listenerPos.x - sourcePos.x;
        const dy = listenerPos.y - sourcePos.y;
        const dz = (listenerPos.z ?? 0) - (sourcePos.z ?? 0);
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        const t = Math.min(dist / this.maxDistance, 1);
        const proximityVolume = Math.pow(1 - t, this.falloff);

        const { pan, behindAttenuation } = this._computeDirectionalAudio(listenerId, sourceId);

        gainNode.gain.linearRampToValueAtTime(proximityVolume * behindAttenuation, rampEnd);

        const pannerNode = mix.panners?.get(sourceId);
        if (pannerNode) {
          pannerNode.pan.linearRampToValueAtTime(pan, rampEnd);
        }
      }
    }
  }

  _getPos(id) {
    if (id === '__host__') return this.getHostPosition();
    return this.getPlayerPosition(id);
  }

  // ---- Cleanup ----

  removeClient(playerId) {
    const client = this.clients.get(playerId);
    if (client) {
      client.source.disconnect();
      if (client._keepAlive) {
        client._keepAlive.pause();
        client._keepAlive.srcObject = null;
      }
      this.clients.delete(playerId);
    }

    const mix = this.mixOutputs.get(playerId);
    if (mix) {
      mix.gains.forEach(g => g.disconnect());
      mix.panners.forEach(p => p.disconnect());
      mix.destination.disconnect();
      this.mixOutputs.delete(playerId);
    }

    this._rebuildAllMixes();
  }

  destroy() {
    clearInterval(this._intervalId);
    if (this.localStream) this.localStream.getTracks().forEach(t => t.stop());
    if (this.localSource) this.localSource.disconnect();
    for (const [id] of this.clients) this.removeClient(id);
    this.audioCtx.close();
  }
}
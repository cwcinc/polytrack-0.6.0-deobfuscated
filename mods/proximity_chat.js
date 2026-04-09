// Copyright (c) 2026 cwcinc. All rights reserved. Unauthorized use prohibited.

class ClientVoiceChat {
  constructor() {
    this.localStream = null;
    this.audioEl = null;
  }

  async start(peerConnection) {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      video: false,
    });

    for (const track of this.localStream.getAudioTracks()) {
      peerConnection.addTrack(track, this.localStream);
    }

    peerConnection.ontrack = (event) => {
      if (event.track.kind !== 'audio') return;
      const stream = event.streams[0] ?? new MediaStream([event.track]);
      this.audioEl = new Audio();
      this.audioEl.srcObject = stream;
      this.audioEl.play();
    };
  }

  muteMic(muted) {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(t => (t.enabled = !muted));
    }
  }

  destroy() {
    if (this.localStream) this.localStream.getTracks().forEach(t => t.stop());
    if (this.audioEl) { this.audioEl.pause(); this.audioEl.srcObject = null; }
  }
}

class HostVoiceChat {
  constructor({ maxDistance = 60, falloff = 1.5 }) {
    this.maxDistance = maxDistance;
    this.falloff = falloff;

    this.audioCtx = new AudioContext();

    this.localStream = null;
    this.localSource = null;

    // playerId -> { source, peerConnection, incomingStream, _keepAlive }
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
    this.localStream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      video: false,
    });
    this.localSource = this.audioCtx.createMediaStreamSource(this.localStream);
    this._rebuildAllMixes();
    return this.localStream;
  }

  // ---- Register a client ----

  registerClient(playerId, peerConnection) {
    peerConnection.ontrack = (event) => {
      if (event.track.kind !== 'audio') return;
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

      const stream = event.streams[0] ?? new MediaStream([event.track]);
      const source = this.audioCtx.createMediaStreamSource(stream);

      const keep = new Audio();
      keep.srcObject = stream;
      keep.volume = 0;
      keep.play().catch(() => {});

      this.clients.set(playerId, {
        source, peerConnection, incomingStream: stream, _keepAlive: keep
      });

      this._rebuildAllMixes();
    };
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
          }
        } catch (e) {
          console.warn('[mixer] skipping closed connection for', listenerId);
          return;
        }
      }
    }

    this.mixOutputs.set(listenerId, { destination, gains, panners, outputStream, sender });
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
    if (this.localSource) {
      this._buildMixForListener('__host__');
      this.playHostAudio();
    }
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

  // Extract yaw angle from quaternion (Y-up, forward = +Z)
  _headingFromQuaternion(q) {
    // Forward vector XZ components from quaternion
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

        // Proximity
        const dx = listenerPos.x - sourcePos.x;
        const dy = listenerPos.y - sourcePos.y;
        const dz = (listenerPos.z ?? 0) - (sourcePos.z ?? 0);
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        const t = Math.min(dist / this.maxDistance, 1);
        const proximityVolume = Math.pow(1 - t, this.falloff);

        // Directional
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
    for (const [id] of this.clients) this.removeClient(id);
    this.audioCtx.close();
  }
}
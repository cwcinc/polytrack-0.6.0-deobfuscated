class ClientVoiceChat {
  constructor() {
    this.localStream = null;
    this.audioEl = null;
  }

  async start(peerConnection) {
    // 1. Capture mic and send to host
    this.localStream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      video: false,
    });

    for (const track of this.localStream.getAudioTracks()) {
      peerConnection.addTrack(track, this.localStream);
    }

    // 2. Play whatever the host sends back (the personalized proximity mix)
    peerConnection.ontrack = (event) => {
      if (event.track.kind !== 'audio') return;
      const stream = event.streams[0] ?? new MediaStream([event.track]);

      // Just play it — volume is already baked in by the host
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

    // Include the host's own mic if they're also a player
    this.localStream = null;
    this.localSource = null;

    // playerId -> { source, peerConnection, incomingStream }
    this.clients = new Map();

    // playerId -> { destination, gains: Map<sourceId, GainNode>, outputStream, sender }
    // Each listener gets a unique mix with per-source gain nodes
    this.mixOutputs = new Map();

    this._intervalId = setInterval(() => this._updateAllGains(), 66);

    this.playerCarMap = new Map();
  }

  setPlayerCar(playerId, car) {
    this.playerCarMap.set(playerId, car);
  }

  getPlayerPosition(playerId) {
    return this.playerCarMap.get(playerId)?.getPosition() ?? {x: 0, y: 0, z: 0};
  }

  // ---- Host's own mic (host is also a player) ----

  async startHostMic() {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      video: false,
    });
    this.localSource = this.audioCtx.createMediaStreamSource(this.localStream);
    // Rebuild all mixes to include host audio
    this._rebuildAllMixes();
    return this.localStream;
  }

  // ---- Register a client's incoming audio ----

  registerClient(playerId, peerConnection) {
      peerConnection.ontrack = (event) => {
          if (event.track.kind !== 'audio') return;
          if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

          const stream = event.streams[0] ?? new MediaStream([event.track]);
          const source = this.audioCtx.createMediaStreamSource(stream);

          // Chrome workaround: remote streams can go silent unless
          // an Audio element holds a reference to the stream
          const keep = new Audio();
          keep.srcObject = stream;
          keep.volume = 0;        // don't actually play it through speakers
          keep.play().catch(() => {});

          this.clients.set(playerId, {
              source, peerConnection, incomingStream: stream, _keepAlive: keep
          });

          this._rebuildAllMixes();
      };
  }

  // ---- Build a personalized mix for one listener ----

  _buildMixForListener(listenerId) {
    const old = this.mixOutputs.get(listenerId);
    if (old) {
        old.gains.forEach(g => g.disconnect());
        old.destination.disconnect();
    }

    // Skip if this listener's connection is dead
    if (listenerId !== '__host__') {
        const client = this.clients.get(listenerId);
        if (!client || client.peerConnection.connectionState === 'closed') return;
    }

    const destination = this.audioCtx.createMediaStreamDestination();
    const gains = new Map();

    const sources = this._getAllSourcesExcept(listenerId);

    for (const { id, source } of sources) {
        const gain = this.audioCtx.createGain();
        gain.gain.value = 0;
        source.connect(gain).connect(destination);
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

    this.mixOutputs.set(listenerId, { destination, gains, outputStream, sender });
  }

  _getAllSourcesExcept(excludeId) {
    const sources = [];

    // Add all remote clients
    for (const [id, client] of this.clients) {
      if (id !== excludeId) {
        sources.push({ id, source: client.source });
      }
    }

    // Add host's own mic
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

  // ---- Host local playback (host hearing other players) ----

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

  // ---- Proximity gain update loop ----

  _updateAllGains() {
    for (const [listenerId, mix] of this.mixOutputs) {
      const listenerPos = this._getPos(listenerId);
      if (!listenerPos) continue;

      for (const [sourceId, gainNode] of mix.gains) {
        const sourcePos = this._getPos(sourceId);
        if (!sourcePos) {
          gainNode.gain.value = 0;
          continue;
        }

        const dx = listenerPos.x - sourcePos.x;
        const dy = listenerPos.y - sourcePos.y;
        const dz = (listenerPos.z ?? 0) - (sourcePos.z ?? 0);
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        const t = Math.min(dist / this.maxDistance, 1);
        const volume = Math.pow(1 - t, this.falloff);
        // console.log(`Setting gain for source ${sourceId} to ${volume.toFixed(2)} (dist: ${dist.toFixed(1)})`);
        gainNode.gain.linearRampToValueAtTime(
          volume,
          this.audioCtx.currentTime + 0.06
        );
      }
    }
  }

  _getPos(id) {
    return {x: 0, y: 0, z: 0}; // default position if not found
    if (id === '__host__') return this.getPlayerPosition('__host__');
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
        this.clients.delete(playerId);  // delete BEFORE rebuild
    }

    const mix = this.mixOutputs.get(playerId);
    if (mix) {
        mix.gains.forEach(g => g.disconnect());
        mix.destination.disconnect();
        this.mixOutputs.delete(playerId);  // delete BEFORE rebuild
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
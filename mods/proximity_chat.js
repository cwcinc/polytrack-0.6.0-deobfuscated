// Copyright (c) 2026 cwcinc. All rights reserved. Unauthorized use prohibited.

const VOICE_BUFFER_SIZE = 1024;

function encodeAudio(float32) {
  const int16 = new Int16Array(float32.length);
  for (let i = 0; i < float32.length; i++) {
    const s = Math.max(-1, Math.min(1, float32[i]));
    int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  return int16.buffer;
}

function decodeAudio(arrayBuffer) {
  const int16 = new Int16Array(arrayBuffer);
  const float32 = new Float32Array(int16.length);
  for (let i = 0; i < int16.length; i++) {
    float32[i] = int16[i] < 0 ? int16[i] / 0x8000 : int16[i] / 0x7FFF;
  }
  return float32;
}

class AudioRingBuffer {
  constructor() {
    this.buf = new Float32Array(16384);
    this.w = 0;
    this.r = 0;
  }
  write(samples) {
    for (let i = 0; i < samples.length; i++) {
      this.buf[(this.w++) & 16383] = samples[i];
    }
  }
  read(output) {
    for (let i = 0; i < output.length; i++) {
      output[i] = this.r < this.w ? this.buf[(this.r++) & 16383] : 0;
    }
  }
}

// ---- Client ----

class ClientVoiceChat {
  constructor({ maxDistance = 60, refDistance = 10, rolloffFactor = 1.5 } = {}) {
    this.listener = null;
    this.audioCtx = new AudioContext();
    this.maxDistance = maxDistance;
    this.refDistance = refDistance;
    this.rolloffFactor = rolloffFactor;

    this.localStream = null;
    this._audioChannel = null;
    this._micCapture = null;

    // playerId -> { ringBuffer, sourceNode, keepAlive, positionalAudio, mesh }
    this.players = new Map();
  }

  setListener(listener) {
    const needsMigration = listener && listener.context !== this.audioCtx;
    this.listener = listener;

    if (needsMigration) {
      this.audioCtx = listener.context;
      this._recreateAudioNodes();
    }

    // Reattach PositionalAudio for players that already have meshes
    for (const [id, player] of this.players) {
      if (player.mesh) this.setPlayerMesh(id, player.mesh);
    }
  }

  _recreateAudioNodes() {
    // Recreate mic capture on new context
    if (this._micCapture) {
      this._micCapture.source.disconnect();
      this._micCapture.processor.disconnect();
      this._micCapture = null;
    }
    if (this.localStream) this._setupMicCapture();

    // Recreate each player's source node on new context
    for (const [, player] of this.players) {
      player.sourceNode.disconnect();
      player.keepAlive.disconnect();

      const sourceNode = this.audioCtx.createScriptProcessor(VOICE_BUFFER_SIZE, 0, 1);
      sourceNode.onaudioprocess = (e) => {
        player.ringBuffer.read(e.outputBuffer.getChannelData(0));
      };

      const keepAlive = this.audioCtx.createGain();
      keepAlive.gain.value = 0;
      sourceNode.connect(keepAlive).connect(this.audioCtx.destination);

      player.sourceNode = sourceNode;
      player.keepAlive = keepAlive;
    }
  }

  async start(peerConnection) {
    if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        video: false,
      });
      this.localStream.getAudioTracks().forEach(t => (t.enabled = false));
      this._setupMicCapture();
    } catch (e) {
      this.localStream = null;
      console.warn('[voice] mic not available', e);
    }

    this._audioChannel = peerConnection.createDataChannel("voice-audio", {
      negotiated: true, id: 2, ordered: false, maxRetransmits: 0
    });
    this._audioChannel.binaryType = "arraybuffer";

    this._audioChannel.onmessage = (event) => {
      if (!(event.data instanceof ArrayBuffer) || event.data.byteLength <= 4) return;
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

      const playerId = new DataView(event.data).getUint32(0, true);
      const samples = decodeAudio(event.data.slice(4));

      let player = this.players.get(playerId);
      if (!player) player = this._createPlayerAudio(playerId);
      player.ringBuffer.write(samples);
    };
  }

  _setupMicCapture() {
    const source = this.audioCtx.createMediaStreamSource(this.localStream);
    const processor = this.audioCtx.createScriptProcessor(VOICE_BUFFER_SIZE, 1, 1);

    processor.onaudioprocess = (e) => {
      const input = e.inputBuffer.getChannelData(0);
      const output = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < output.length; i++) output[i] = 0;

      if (this._audioChannel?.readyState === 'open') {
        try { this._audioChannel.send(encodeAudio(input)); } catch {}
      }
    };

    source.connect(processor);
    processor.connect(this.audioCtx.destination);
    this._micCapture = { source, processor };
  }

  _createPlayerAudio(playerId) {
    const ringBuffer = new AudioRingBuffer();

    const sourceNode = this.audioCtx.createScriptProcessor(VOICE_BUFFER_SIZE, 0, 1);
    sourceNode.onaudioprocess = (e) => {
      ringBuffer.read(e.outputBuffer.getChannelData(0));
    };

    const keepAlive = this.audioCtx.createGain();
    keepAlive.gain.value = 0;
    sourceNode.connect(keepAlive).connect(this.audioCtx.destination);

    const player = { ringBuffer, sourceNode, keepAlive, positionalAudio: null, mesh: null };
    this.players.set(playerId, player);
    return player;
  }

  setPlayerMesh(playerId, mesh) {
    let player = this.players.get(playerId);
    if (!player) player = this._createPlayerAudio(playerId);
    player.mesh = mesh;

    // Detach old
    if (player.positionalAudio) {
      try { player.sourceNode.disconnect(player.positionalAudio.gain); } catch {}
      if (player.positionalAudio.parent) {
        player.positionalAudio.parent.remove(player.positionalAudio);
      }
      player.positionalAudio = null;
    }

    // Only create PositionalAudio if we have a listener and a mesh
    if (!this.listener || !mesh) return;

    const pa = new THREE.PositionalAudio(this.listener);
    pa.setNodeSource(player.sourceNode);
    pa.setRefDistance(this.refDistance);
    pa.setMaxDistance(this.maxDistance);
    pa.setRolloffFactor(this.rolloffFactor);
    pa.setDistanceModel('inverse');
    mesh.add(pa);
    player.positionalAudio = pa;
  }

  setMicMuted(muted) {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(t => (t.enabled = !muted));
    }
  }

  removePlayer(playerId) {
    const player = this.players.get(playerId);
    if (!player) return;
    if (player.positionalAudio) {
      try { player.sourceNode.disconnect(player.positionalAudio.gain); } catch {}
      if (player.positionalAudio.parent) {
        player.positionalAudio.parent.remove(player.positionalAudio);
      }
    }
    player.sourceNode.disconnect();
    player.keepAlive.disconnect();
    this.players.delete(playerId);
  }

  destroy() {
    if (this.localStream) this.localStream.getTracks().forEach(t => t.stop());
    if (this._micCapture) {
      this._micCapture.source.disconnect();
      this._micCapture.processor.disconnect();
    }
    for (const [id] of this.players) this.removePlayer(id);
  }
}

// ---- Host ----

class HostVoiceChat {
  constructor({ maxDistance = 60, refDistance = 10, rolloffFactor = 1.5, hostId = 0 } = {}) {
    this.listener = null;
    this.audioCtx = new AudioContext();
    this.maxDistance = maxDistance;
    this.refDistance = refDistance;
    this.rolloffFactor = rolloffFactor;
    this.hostId = hostId;

    this.localStream = null;
    this._micCapture = null;

    // playerId -> { peerConnection, audioChannel, ringBuffer, sourceNode, keepAlive, positionalAudio, mesh }
    this.clients = new Map();
  }

  setListener(listener) {
    const needsMigration = listener && listener.context !== this.audioCtx;
    this.listener = listener;

    if (needsMigration) {
      this.audioCtx = listener.context;
      this._recreateAudioNodes();
    }

    for (const [id, client] of this.clients) {
      if (client.mesh) this.setPlayerMesh(id, client.mesh);
    }
  }

  _recreateAudioNodes() {
    if (this._micCapture) {
      this._micCapture.source.disconnect();
      this._micCapture.processor.disconnect();
      this._micCapture = null;
    }
    if (this.localStream) this._setupMicCapture();

    for (const [, client] of this.clients) {
      client.sourceNode.disconnect();
      client.keepAlive.disconnect();

      const sourceNode = this.audioCtx.createScriptProcessor(VOICE_BUFFER_SIZE, 0, 1);
      sourceNode.onaudioprocess = (e) => {
        client.ringBuffer.read(e.outputBuffer.getChannelData(0));
      };

      const keepAlive = this.audioCtx.createGain();
      keepAlive.gain.value = 0;
      sourceNode.connect(keepAlive).connect(this.audioCtx.destination);

      client.sourceNode = sourceNode;
      client.keepAlive = keepAlive;
    }
  }

  async startHostMic() {
    if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        video: false,
      });
      this.localStream.getAudioTracks().forEach(t => (t.enabled = false));
      this._setupMicCapture();
      return this.localStream;
    } catch (e) {
      this.localStream = null;
      console.warn('[voice] host mic not available', e);
      return null;
    }
  }

  _setupMicCapture() {
    const source = this.audioCtx.createMediaStreamSource(this.localStream);
    const processor = this.audioCtx.createScriptProcessor(VOICE_BUFFER_SIZE, 1, 1);

    processor.onaudioprocess = (e) => {
      const input = e.inputBuffer.getChannelData(0);
      const output = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < output.length; i++) output[i] = 0;

      const tagged = this._tagRawAudio(this.hostId, encodeAudio(input));
      for (const [, client] of this.clients) {
        if (client.audioChannel?.readyState === 'open') {
          try { client.audioChannel.send(tagged); } catch {}
        }
      }
    };

    source.connect(processor);
    processor.connect(this.audioCtx.destination);
    this._micCapture = { source, processor };
  }

  _tagRawAudio(playerId, int16ArrayBuffer) {
    const tagged = new ArrayBuffer(4 + int16ArrayBuffer.byteLength);
    new DataView(tagged).setUint32(0, playerId, true);
    new Uint8Array(tagged, 4).set(new Uint8Array(int16ArrayBuffer));
    return tagged;
  }

  registerClient(playerId, peerConnection) {
    const ringBuffer = new AudioRingBuffer();

    const sourceNode = this.audioCtx.createScriptProcessor(VOICE_BUFFER_SIZE, 0, 1);
    sourceNode.onaudioprocess = (e) => {
      ringBuffer.read(e.outputBuffer.getChannelData(0));
    };

    const keepAlive = this.audioCtx.createGain();
    keepAlive.gain.value = 0;
    sourceNode.connect(keepAlive).connect(this.audioCtx.destination);

    const audioChannel = peerConnection.createDataChannel("voice-audio", {
      negotiated: true, id: 2, ordered: false, maxRetransmits: 0
    });
    audioChannel.binaryType = "arraybuffer";

    audioChannel.onmessage = (event) => {
      if (!(event.data instanceof ArrayBuffer) || event.data.byteLength === 0) return;
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

      ringBuffer.write(decodeAudio(event.data));

      const tagged = new ArrayBuffer(4 + event.data.byteLength);
      new DataView(tagged).setUint32(0, playerId, true);
      new Uint8Array(tagged, 4).set(new Uint8Array(event.data));

      for (const [otherId, other] of this.clients) {
        if (otherId !== playerId && other.audioChannel?.readyState === 'open') {
          try { other.audioChannel.send(tagged); } catch {}
        }
      }
    };

    this.clients.set(playerId, {
      peerConnection, audioChannel, ringBuffer, sourceNode, keepAlive,
      positionalAudio: null, mesh: null
    });
  }

  setPlayerMesh(playerId, mesh) {
    const client = this.clients.get(playerId);
    if (!client) return;
    client.mesh = mesh;

    if (client.positionalAudio) {
      try { client.sourceNode.disconnect(client.positionalAudio.gain); } catch {}
      if (client.positionalAudio.parent) {
        client.positionalAudio.parent.remove(client.positionalAudio);
      }
      client.positionalAudio = null;
    }

    if (!this.listener || !mesh) return;

    const pa = new THREE.PositionalAudio(this.listener);
    pa.setNodeSource(client.sourceNode);
    pa.setRefDistance(this.refDistance);
    pa.setMaxDistance(this.maxDistance);
    pa.setRolloffFactor(this.rolloffFactor);
    pa.setDistanceModel('inverse');
    mesh.add(pa);
    client.positionalAudio = pa;
  }

  setMicMuted(muted) {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(t => (t.enabled = !muted));
    }
  }

  removeClient(playerId) {
    const client = this.clients.get(playerId);
    if (!client) return;
    if (client.positionalAudio) {
      try { client.sourceNode.disconnect(client.positionalAudio.gain); } catch {}
      if (client.positionalAudio.parent) {
        client.positionalAudio.parent.remove(client.positionalAudio);
      }
    }
    client.sourceNode.disconnect();
    client.keepAlive.disconnect();
    this.clients.delete(playerId);
  }

  destroy() {
    if (this.localStream) this.localStream.getTracks().forEach(t => t.stop());
    if (this._micCapture) {
      this._micCapture.source.disconnect();
      this._micCapture.processor.disconnect();
    }
    for (const [id] of this.clients) this.removeClient(id);
  }
}
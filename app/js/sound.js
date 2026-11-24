/**
 * Audio sintetizado con Web Audio API (100% serverless, sin archivos externos)
 * Efectos de sonido ambientales para moneda, cartas y pistas.
 */

const SoundEffects = {
  ctx: null,

  init() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    } catch(e) {
      console.warn('Web Audio no soportado:', e);
    }
  },

  resumeContext() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  // Sonido de lanzamiento y tintineo de moneda metálica antigua
  playCoinFlip() {
    this.resumeContext();
    if (!this.ctx) return;
    
    // Haptic feedback en móvil
    if (navigator.vibrate) navigator.vibrate([20, 40, 20]);

    const now = this.ctx.currentTime;
    
    // Ruido y tonos metálicos
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1400, now);
    osc1.frequency.exponentialRampToValueAtTime(3200, now + 0.08);
    osc1.frequency.exponentialRampToValueAtTime(2200, now + 0.35);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(2800, now);
    osc2.frequency.exponentialRampToValueAtTime(1800, now + 0.3);

    gainNode.gain.setValueAtTime(0.18, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.45);
    osc2.stop(now + 0.45);
  },

  // Sonido de resolución de moneda (resultado)
  playCoinResult(isFavorable) {
    this.resumeContext();
    if (!this.ctx) return;

    if (navigator.vibrate) {
      navigator.vibrate(isFavorable ? [30, 20, 50] : [70, 40, 70]);
    }

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    if (isFavorable) {
      // Tono dulce y místico en escala mayor
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.1); // A5
      gainNode.gain.setValueAtTime(0.15, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    } else {
      // Tono oscuro y bajo
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(164.81, now); // E3
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.35); // A2
      gainNode.gain.setValueAtTime(0.15, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    }

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);
  },

  // Sonido de carta deslizándose
  playCardDraw() {
    this.resumeContext();
    if (!this.ctx) return;

    if (navigator.vibrate) navigator.vibrate(15);

    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.12;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    filter.Q.value = 1.2;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
  }
};

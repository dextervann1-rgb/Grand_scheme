/**
 * ChristFire WebAudio Synthesizer Engine
 * 100% Procedural synthesis using browser Web Audio API — No external audio files or bandwidth required.
 * © 2026 Vann Family Ventures LLC.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private volume: number = 0.7;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public getVolume(): number {
    return this.volume;
  }

  public tone(
    freq: number,
    duration: number = 0.2,
    type: OscillatorType = 'sine',
    volMultiplier: number = 0.25,
    delay: number = 0
  ) {
    if (!this.soundEnabled || this.volume <= 0) return;
    try {
      const a = this.initCtx();
      const osc = a.createOscillator();
      const gain = a.createGain();
      const master = this.volume;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, a.currentTime + delay);

      const targetGain = volMultiplier * master;
      gain.gain.setValueAtTime(0.001, a.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(targetGain, a.currentTime + delay + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(a.destination);

      osc.start(a.currentTime + delay);
      osc.stop(a.currentTime + delay + duration + 0.05);
    } catch {
      // AudioContext might be blocked until user gesture
    }
  }

  public noise(duration: number = 0.2, volMultiplier: number = 0.2, isHigh: boolean = false) {
    if (!this.soundEnabled || this.volume <= 0) return;
    try {
      const a = this.initCtx();
      const bufferSize = a.sampleRate * duration;
      const buffer = a.createBuffer(1, bufferSize, a.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (isHigh ? 1 : 1 - i / bufferSize);
      }

      const noiseSource = a.createBufferSource();
      noiseSource.buffer = buffer;

      const filter = a.createBiquadFilter();
      filter.type = isHigh ? 'highpass' : 'lowpass';
      filter.frequency.value = isHigh ? 2800 : 450;

      const gain = a.createGain();
      gain.gain.value = volMultiplier * this.volume;
      gain.gain.exponentialRampToValueAtTime(0.001, a.currentTime + duration);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(a.destination);

      noiseSource.start();
    } catch {
      // AudioContext guarded
    }
  }

  // SOUND PRESETS
  public click() {
    this.tone(880, 0.06, 'square', 0.08);
  }

  public strike() {
    this.tone(80, 0.28, 'sine', 0.6);
    this.noise(0.18, 0.35, false);
  }

  public verse(verseCount: number = 0) {
    const boost = 1 + (verseCount % 12) * 0.08;
    const chords = [523.25, 659.25, 783.99, 1046.5];
    chords.forEach((freq, idx) => {
      this.tone(freq * boost, 0.45, 'sine', 0.2, idx * 0.08);
    });
  }

  public shatter() {
    this.noise(0.45, 0.4, true);
    this.tone(1800, 0.35, 'sine', 0.2);
    this.tone(2400, 0.25, 'triangle', 0.15, 0.05);
    this.tone(90, 0.4, 'sine', 0.5, 0.02);
  }

  public thunder() {
    this.noise(0.6, 0.45, false);
    this.tone(65, 0.65, 'sawtooth', 0.4);
    this.tone(120, 0.4, 'triangle', 0.3, 0.05);
  }

  public shield() {
    this.tone(660, 0.4, 'sine', 0.18);
    this.tone(880, 0.4, 'sine', 0.14, 0.04);
    this.tone(440, 0.5, 'triangle', 0.1, 0.08);
  }

  public crown() {
    // Majestic VannDiamond Crown arpeggio + divine seismic bass
    const royalNotes = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98];
    royalNotes.forEach((f, i) => {
      this.tone(f, 0.6, 'sine', 0.25, i * 0.09);
    });
    this.tone(70, 0.85, 'sine', 0.55, 0.2);
    this.noise(0.4, 0.2, true);
  }

  public hurt() {
    this.tone(130, 0.25, 'sawtooth', 0.28);
    this.tone(85, 0.3, 'sine', 0.3, 0.05);
  }

  public pray() {
    // Sacred cathedral bell
    this.tone(1174.66, 0.8, 'sine', 0.22);
    this.tone(587.33, 0.9, 'triangle', 0.18, 0.03);
    this.tone(293.66, 1.1, 'sine', 0.15, 0.06);
  }

  public victory() {
    const fanfare = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    fanfare.forEach((f, i) => {
      this.tone(f, 0.5, 'triangle', 0.28, i * 0.11);
    });
    this.tone(1046.5, 0.9, 'sine', 0.35, 0.55);
  }

  public powerUp() {
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((f, i) => {
      this.tone(f, 0.35, 'triangle', 0.22, i * 0.07);
    });
  }

  public dodgePerfect() {
    this.tone(1046.5, 0.15, 'sine', 0.3);
    this.tone(1318.5, 0.25, 'sine', 0.35, 0.08);
    this.tone(1567.98, 0.3, 'sine', 0.25, 0.16);
  }

  public dodgeGood() {
    this.tone(660, 0.2, 'sine', 0.25);
    this.tone(880, 0.25, 'sine', 0.25, 0.08);
  }

  public dodgeMiss() {
    this.tone(90, 0.35, 'sawtooth', 0.3);
    this.noise(0.2, 0.25, false);
  }

  public qteAlert() {
    this.tone(784, 0.1, 'square', 0.12);
  }
}

export const soundEngine = new SoundEngine();

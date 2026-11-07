/**
 * ChristFire: Omega Protocol - Voice Narration & Voice-Changing Sound Engine
 * Features 5 distinct voice personas, dynamic pitch/rate warping,
 * WebAudio atmospheric harmonic resonance layer, and cross-browser speech synthesis.
 * © 2026 Vann Family Ventures LLC. In Lumine Veritas | May Jesus Reign.
 */

export type VoicePersonaId = 'samantha' | 'peter' | 'herald' | 'oracle' | 'malice';

export interface VoicePersona {
  id: VoicePersonaId;
  name: string;
  title: string;
  role: string;
  avatar: string;
  defaultPitch: number;
  defaultRate: number;
  resonanceType: 'holy' | 'thunder' | 'herald' | 'oracle' | 'dark';
  samplePhrase: string;
  description: string;
  color: string;
}

export const VOICE_PERSONAS: Record<VoicePersonaId, VoicePersona> = {
  samantha: {
    id: 'samantha',
    name: 'Samantha Crowned',
    title: 'QUEEN OF LIGHT & WARDEN',
    role: 'Judges 5:21 • Heroic Lead',
    avatar: '👑🛡️',
    defaultPitch: 1.25,
    defaultRate: 1.05,
    resonanceType: 'holy',
    samplePhrase: 'By the sword of Deborah and Judges 5:21, the shadows will break!',
    description: 'Heroic, radiant, and commanding queen with crystal holy reverberation.',
    color: 'from-amber-400 to-yellow-300',
  },
  peter: {
    id: 'peter',
    name: 'Peter / Big Beastie',
    title: 'THUNDER APOSTLE',
    role: 'Philippians 4:13 • Faith Juggernaut',
    avatar: '🧔‍♂️⚡',
    defaultPitch: 0.65,
    defaultRate: 0.92,
    resonanceType: 'thunder',
    samplePhrase: 'I can do all things through Christ who strengthens me! Philippians 4:13!',
    description: 'Deep, booming chest resonance with thunderous bass harmonics.',
    color: 'from-cyan-400 to-blue-500',
  },
  herald: {
    id: 'herald',
    name: 'Vann Herald',
    title: 'HIGH PROPHETIC SCRIBE',
    role: 'In Lumine Veritas • Narrator',
    avatar: '📜✨',
    defaultPitch: 0.88,
    defaultRate: 0.96,
    resonanceType: 'herald',
    samplePhrase: 'In Lumine Veritas! May Jesus Reign forever across all sectors!',
    description: 'Epic, stately cathedral preacher cadence with warm golden presence.',
    color: 'from-yellow-400 to-amber-600',
  },
  oracle: {
    id: 'oracle',
    name: 'Cathedral Synth Oracle',
    title: 'DIVINE BEACON FREQUENCY',
    role: 'Cyber-Harmonics • Tactical Voice',
    avatar: '🤖💎',
    defaultPitch: 1.45,
    defaultRate: 1.15,
    resonanceType: 'oracle',
    samplePhrase: 'Beacon resonance aligned. Faith protocol active. Strike true!',
    description: 'High-frequency angelic cyber synthesizer with crystal vocoder undertones.',
    color: 'from-fuchsia-400 to-purple-500',
  },
  malice: {
    id: 'malice',
    name: 'Commander Malice',
    title: 'DARK HEARTS ENFORCER',
    role: 'Shadow Syndicate • Boss Voice',
    avatar: '😈🖤',
    defaultPitch: 0.50,
    defaultRate: 0.88,
    resonanceType: 'dark',
    samplePhrase: 'Your holy light will be swallowed whole in the Blackout!',
    description: 'Sub-bass gravel growl with shadowy dark dissonance.',
    color: 'from-red-500 to-purple-800',
  },
};

class VoiceNarratorEngine {
  private enabled: boolean = true;
  private currentPersonaId: VoicePersonaId = 'samantha';
  private pitchOffset: number = 0; // -0.4 to +0.4
  private rateOffset: number = 0;  // -0.3 to +0.3
  private volume: number = 0.9;
  private audioCtx: AudioContext | null = null;
  private isSpeaking: boolean = false;
  private voicesLoaded: boolean = false;
  private cachedVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initSpeech();
    }
  }

  private initSpeech() {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        this.cachedVoices = window.speechSynthesis.getVoices();
        if (this.cachedVoices.length > 0) {
          this.voicesLoaded = true;
        }
      };

      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Triggers an atmospheric WebAudio background harmonic resonance
   * during speech synthesis based on the persona's resonance type.
   */
  private playResonance(type: 'holy' | 'thunder' | 'herald' | 'oracle' | 'dark') {
    try {
      const ctx = this.getAudioContext();
      if (!ctx || !this.enabled) return;

      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.12 * this.volume, now + 0.1);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
      masterGain.connect(ctx.destination);

      if (type === 'holy') {
        // High ethereal major fifth chime (E5 + B5)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        osc1.type = 'sine';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(659.25, now);
        osc2.frequency.setValueAtTime(987.77, now);
        osc1.connect(masterGain);
        osc2.connect(masterGain);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 1.4);
        osc2.stop(now + 1.4);
      } else if (type === 'thunder') {
        // Deep sub-bass pulse (55Hz + 110Hz)
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(55, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 1.2);
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, now);
        osc.connect(filter);
        filter.connect(masterGain);
        osc.start(now);
        osc.stop(now + 1.4);
      } else if (type === 'herald') {
        // Stately cathedral organ chord (C4, G4, C5)
        [261.63, 392.00, 523.25].forEach(freq => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          osc.connect(masterGain);
          osc.start(now);
          osc.stop(now + 1.5);
        });
      } else if (type === 'oracle') {
        // Cyber-synth harmonic frequency modulation
        const carrier = ctx.createOscillator();
        const mod = ctx.createOscillator();
        const modGain = ctx.createGain();
        carrier.type = 'sawtooth';
        carrier.frequency.setValueAtTime(880, now);
        mod.type = 'sine';
        mod.frequency.setValueAtTime(16, now);
        modGain.gain.setValueAtTime(50, now);
        mod.connect(modGain);
        modGain.connect(carrier.frequency);
        carrier.connect(masterGain);
        carrier.start(now);
        mod.start(now);
        carrier.stop(now + 1.3);
        mod.stop(now + 1.3);
      } else if (type === 'dark') {
        // Gloom dissonant tritone (Eb2 + A2)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        osc1.type = 'sawtooth';
        osc2.type = 'sawtooth';
        osc1.frequency.setValueAtTime(77.78, now);
        osc2.frequency.setValueAtTime(110.00, now);
        osc1.connect(masterGain);
        osc2.connect(masterGain);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 1.4);
        osc2.stop(now + 1.4);
      }
    } catch {
      // AudioContext fallback
    }
  }

  private pickBestVoice(persona: VoicePersona): SpeechSynthesisVoice | null {
    if (!this.cachedVoices || this.cachedVoices.length === 0) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        this.cachedVoices = window.speechSynthesis.getVoices();
      }
    }

    if (!this.cachedVoices || this.cachedVoices.length === 0) return null;

    // Filter by language
    const englishVoices = this.cachedVoices.filter(v => v.lang.startsWith('en'));
    const voices = englishVoices.length > 0 ? englishVoices : this.cachedVoices;

    if (persona.id === 'samantha') {
      const female = voices.find(v => 
        /female|samantha|zira|karen|victoria|moira|fiona|cynthia/i.test(v.name)
      );
      if (female) return female;
    } else if (persona.id === 'peter' || persona.id === 'malice') {
      const male = voices.find(v => 
        /male|david|daniel|george|alex|fred|oliver|arthur/i.test(v.name)
      );
      if (male) return male;
    }

    return voices[0] || null;
  }

  /**
   * Narrate a line of text aloud with the active or specified voice persona
   */
  public speak(text: string, options?: { persona?: VoicePersonaId; cancelCurrent?: boolean; onEnd?: () => void }) {
    if (!this.enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    const personaId = options?.persona || this.currentPersonaId;
    const persona = VOICE_PERSONAS[personaId] || VOICE_PERSONAS.samantha;

    if (options?.cancelCurrent !== false) {
      window.speechSynthesis.cancel();
    }

    // Trigger procedural WebAudio resonance backdrop
    this.playResonance(persona.resonanceType);

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = this.pickBestVoice(persona);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Compute tailored pitch and speed
    const finalPitch = Math.max(0.2, Math.min(2.0, persona.defaultPitch + this.pitchOffset));
    const finalRate = Math.max(0.5, Math.min(2.0, persona.defaultRate + this.rateOffset));

    utterance.pitch = finalPitch;
    utterance.rate = finalRate;
    utterance.volume = this.volume;

    utterance.onstart = () => {
      this.isSpeaking = true;
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      options?.onEnd?.();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
    };

    window.speechSynthesis.speak(utterance);
  }

  public previewPersona(personaId: VoicePersonaId) {
    const persona = VOICE_PERSONAS[personaId];
    if (!persona) return;
    this.speak(persona.samplePhrase, { persona: personaId, cancelCurrent: true });
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (!val) this.stop();
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setPersona(id: VoicePersonaId) {
    if (VOICE_PERSONAS[id]) {
      this.currentPersonaId = id;
    }
  }

  public getPersona(): VoicePersonaId {
    return this.currentPersonaId;
  }

  public setPitchOffset(val: number) {
    this.pitchOffset = Math.max(-0.6, Math.min(0.6, val));
  }

  public getPitchOffset(): number {
    return this.pitchOffset;
  }

  public setRateOffset(val: number) {
    this.rateOffset = Math.max(-0.4, Math.min(0.4, val));
  }

  public getRateOffset(): number {
    return this.rateOffset;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
  }

  public getVolume(): number {
    return this.volume;
  }
}

export const voiceNarrator = new VoiceNarratorEngine();

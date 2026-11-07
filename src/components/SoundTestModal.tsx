import React, { useState } from 'react';
import { soundEngine } from '../sound/audio';
import { Volume2, VolumeX, X, Play } from 'lucide-react';

interface SoundTestModalProps {
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  volume: number;
  onVolumeChange: (v: number) => void;
}

export const SoundTestModal: React.FC<SoundTestModalProps> = ({
  onClose,
  soundEnabled,
  onToggleSound,
  volume,
  onVolumeChange,
}) => {
  const [activeSound, setActiveSound] = useState<string | null>(null);

  const playWithIndicator = (id: string, fn: () => void) => {
    setActiveSound(id);
    fn();
    setTimeout(() => {
      setActiveSound(null);
    }, 450);
  };

  const soundList = [
    { id: 'strike', name: 'Strike Bass Thump', desc: '80Hz heavy sub-bass impact + attack noise', fn: () => soundEngine.strike() },
    { id: 'verse', name: 'Verse Chime', desc: 'Harmonic chime with ascending pitch multiplier', fn: () => soundEngine.verse(3) },
    { id: 'shatter', name: 'Shatter Glass', desc: 'High-frequency noise burst + resonant ping', fn: () => soundEngine.shatter() },
    { id: 'thunder', name: 'Thunder Crackle', desc: 'Azure lightning rumble with lowpass sweep', fn: () => soundEngine.thunder() },
    { id: 'shield', name: 'Wing Shield Pad', desc: 'Dual-sine harmonic protective frequency', fn: () => soundEngine.shield() },
    { id: 'crown', name: '👑 VannDiamond Crown', desc: '5-note royal arpeggio + divine seismic boom', fn: () => soundEngine.crown() },
    { id: 'hurt', name: 'Hurt Sawtooth', desc: '130Hz sawtooth drop feedback', fn: () => soundEngine.hurt() },
    { id: 'pray', name: 'Cathedral Pray Bell', desc: 'Deep sacred resonant bell overtones', fn: () => soundEngine.pray() },
    { id: 'victory', name: 'Fanfare Victory', desc: 'Ascending heroic chord progression', fn: () => soundEngine.victory() },
    { id: 'dodgePerfect', name: 'Dodge Perfect', desc: 'Crisp holy reflex ping [1046 - 1568Hz]', fn: () => soundEngine.dodgePerfect() },
    { id: 'dodgeMiss', name: 'Dodge Miss', desc: 'Low impact thud', fn: () => soundEngine.dodgeMiss() },
  ];

  const playSequence = () => {
    soundList.forEach((s, i) => {
      setTimeout(() => {
        playWithIndicator(s.id, s.fn);
      }, i * 400);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-xl bg-[#090f24] border-2 border-amber-400/80 rounded-2xl p-5 shadow-[0_0_35px_rgba(255,215,0,0.3)] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎧</span>
            <div>
              <h3 className="text-lg font-black text-amber-300 font-serif tracking-wide">
                PROCEDURAL WEBAUDIO TESTER
              </h3>
              <p className="text-[11px] text-slate-400">
                100% Client-side synthetic soundscape • Zero audio files loaded
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Global Sound Controls */}
        <div className="bg-[#0e1635] border border-cyan-500/30 rounded-xl p-3 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onToggleSound}
              className={`px-3 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                soundEnabled 
                  ? 'bg-amber-400 text-black shadow-[0_0_12px_rgba(255,215,0,0.4)]' 
                  : 'bg-red-950 text-red-300 border border-red-500/40'
              }`}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span>SOUND {soundEnabled ? 'ENABLED' : 'MUTED'}</span>
            </button>
            <span className="text-xs font-mono text-cyan-300">Vol: {Math.round(volume * 100)}%</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-1/2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <button
            onClick={playSequence}
            className="w-full sm:w-auto px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400 text-cyan-300 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Play size={14} />
            <span>PLAY ALL TEST</span>
          </button>
        </div>

        {/* Sound Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 overflow-y-auto pr-1 flex-1">
          {soundList.map((item) => (
            <button
              key={item.id}
              onClick={() => playWithIndicator(item.id, item.fn)}
              className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                activeSound === item.id
                  ? 'bg-amber-400 text-black border-amber-200 shadow-[0_0_15px_#FFD700] scale-[1.02]'
                  : 'bg-[#121b3d] hover:bg-[#18234f] text-slate-200 border-slate-700/80 hover:border-amber-400/50'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`font-bold text-xs ${activeSound === item.id ? 'text-black' : 'text-amber-300'}`}>
                  {item.name}
                </span>
                <span className="text-[10px] font-mono opacity-70">TRIGGER</span>
              </div>
              <span className={`text-[11px] mt-1 line-clamp-1 ${activeSound === item.id ? 'text-zinc-900' : 'text-slate-400'}`}>
                {item.desc}
              </span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-amber-400 text-black font-bold text-xs rounded-xl hover:bg-amber-300 transition cursor-pointer"
          >
            CLOSE SOUND TESTER
          </button>
        </div>
      </div>
    </div>
  );
};

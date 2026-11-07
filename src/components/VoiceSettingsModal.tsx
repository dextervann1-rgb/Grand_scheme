import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Mic, 
  Sparkles, 
  Sliders, 
  Play, 
  Check, 
  Flame, 
  RefreshCw 
} from 'lucide-react';
import { 
  voiceNarrator, 
  VOICE_PERSONAS, 
  VoicePersonaId 
} from '../sound/voiceNarrator';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  narrateVerses: boolean;
  onToggleNarrateVerses: (val: boolean) => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({
  isOpen,
  onClose,
  narrateVerses,
  onToggleNarrateVerses,
}) => {
  const [enabled, setEnabled] = useState<boolean>(voiceNarrator.isEnabled());
  const [activePersona, setActivePersona] = useState<VoicePersonaId>(voiceNarrator.getPersona());
  const [pitchOffset, setPitchOffset] = useState<number>(voiceNarrator.getPitchOffset());
  const [rateOffset, setRateOffset] = useState<number>(voiceNarrator.getRateOffset());
  const [playingId, setPlayingId] = useState<VoicePersonaId | null>(null);

  if (!isOpen) return null;

  const handleToggleEnabled = () => {
    const next = !enabled;
    setEnabled(next);
    voiceNarrator.setEnabled(next);
  };

  const handleSelectPersona = (id: VoicePersonaId) => {
    setActivePersona(id);
    voiceNarrator.setPersona(id);
    handlePreview(id);
  };

  const handlePreview = (id: VoicePersonaId) => {
    setPlayingId(id);
    voiceNarrator.previewPersona(id);
    setTimeout(() => setPlayingId(null), 3000);
  };

  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setPitchOffset(val);
    voiceNarrator.setPitchOffset(val);
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setRateOffset(val);
    voiceNarrator.setRateOffset(val);
  };

  const handleResetModifiers = () => {
    setPitchOffset(0);
    setRateOffset(0);
    voiceNarrator.setPitchOffset(0);
    voiceNarrator.setRateOffset(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0b1026] border-2 border-amber-400/90 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-[0_0_40px_rgba(255,215,0,0.35)] relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-black font-black shadow-md">
              <Mic size={20} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-black text-amber-300">
                VOICE NARRATION & SOUND CHANGER
              </h2>
              <p className="text-[11px] font-mono text-cyan-300">
                Select your Fellowship voice persona & adjust sound frequency warping
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Master Toggles Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-4">
          {/* Master Narration Toggle */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {enabled ? <Volume2 size={18} className="text-amber-400" /> : <VolumeX size={18} className="text-slate-500" />}
              <div>
                <span className="text-xs font-serif font-black text-white block">
                  VOICE NARRATION
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {enabled ? 'Active Voice Synthesis' : 'Muted / Disabled'}
                </span>
              </div>
            </div>
            <button
              onClick={handleToggleEnabled}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-black transition cursor-pointer ${
                enabled ? 'bg-amber-400 text-black shadow-md' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {enabled ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>

          {/* Auto-Narrate Verses in Battle */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-cyan-400" />
              <div>
                <span className="text-xs font-serif font-black text-white block">
                  BATTLE SCRIPTURES
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Speak verse on card play
                </span>
              </div>
            </div>
            <button
              onClick={() => onToggleNarrateVerses(!narrateVerses)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-black transition cursor-pointer ${
                narrateVerses ? 'bg-cyan-400 text-black shadow-md' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {narrateVerses ? 'AUTO ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Voice Personas Grid */}
        <div className="my-3">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-serif font-black text-amber-300">
              🎭 CHOOSE ACTIVE VOICE PERSONA
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Includes WebAudio resonance chime
            </span>
          </div>

          <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
            {(Object.keys(VOICE_PERSONAS) as VoicePersonaId[]).map((id) => {
              const p = VOICE_PERSONAS[id];
              const isSelected = activePersona === id;
              const isPlaying = playingId === id;

              return (
                <div
                  key={id}
                  onClick={() => handleSelectPersona(id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between select-none ${
                    isSelected 
                      ? 'bg-[#151c3f] border-amber-400 shadow-[0_0_20px_rgba(255,215,0,0.25)] ring-1 ring-amber-400/60' 
                      : 'bg-[#0d1430] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl shrink-0">
                      {p.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif font-black text-white text-xs sm:text-sm">
                          {p.name}
                        </span>
                        {isSelected && (
                          <span className="text-[9px] font-mono font-black bg-amber-400 text-black px-1.5 py-0.2 rounded">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300 block">
                        {p.title} • {p.role}
                      </span>
                      <p className="text-[10px] text-slate-300 italic line-clamp-1 mt-0.5">
                        &ldquo;{p.samplePhrase}&rdquo;
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePreview(id);
                    }}
                    className={`p-2 rounded-xl border transition cursor-pointer shrink-0 ml-2 ${
                      isPlaying 
                        ? 'bg-amber-400 text-black border-amber-300 animate-pulse' 
                        : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-amber-500/30'
                    }`}
                    title="Preview Voice Sample"
                  >
                    <Play size={14} fill="currentColor" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pitch & Rate Sound Warping Sliders */}
        <div className="my-4 bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-serif font-black text-amber-300 flex items-center gap-1.5">
              <Sliders size={14} className="text-cyan-400" />
              SOUND WARPING & PITCH MODIFIERS
            </span>
            <button
              onClick={handleResetModifiers}
              className="text-[10px] font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw size={11} />
              Reset Sliders
            </button>
          </div>

          {/* Pitch Slider */}
          <div>
            <div className="flex justify-between text-[11px] font-mono mb-1">
              <span className="text-slate-300">Tone Frequency / Pitch</span>
              <span className="text-amber-400 font-bold">
                {pitchOffset > 0 ? `+${pitchOffset.toFixed(2)}` : pitchOffset.toFixed(2)} (
                {pitchOffset < -0.2 ? 'Deep Chest Thunder' : pitchOffset > 0.2 ? 'High Angelic Synth' : 'Natural'}
                )
              </span>
            </div>
            <input
              type="range"
              min="-0.5"
              max="0.5"
              step="0.05"
              value={pitchOffset}
              onChange={handlePitchChange}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-0.5">
              <span>Deep Thunder (-0.5)</span>
              <span>Center</span>
              <span>Synth High (+0.5)</span>
            </div>
          </div>

          {/* Speed / Rate Slider */}
          <div>
            <div className="flex justify-between text-[11px] font-mono mb-1">
              <span className="text-slate-300">Speech Cadence / Velocity</span>
              <span className="text-cyan-400 font-bold">
                {rateOffset > 0 ? `+${rateOffset.toFixed(2)}` : rateOffset.toFixed(2)} (
                {rateOffset < -0.15 ? 'Stately Preacher' : rateOffset > 0.15 ? 'Rapid Reflex' : 'Standard'}
                )
              </span>
            </div>
            <input
              type="range"
              min="-0.3"
              max="0.3"
              step="0.05"
              value={rateOffset}
              onChange={handleRateChange}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-0.5">
              <span>Stately (-0.3)</span>
              <span>Standard (1.0x)</span>
              <span>Rapid (+0.3)</span>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => handlePreview(activePersona)}
            className="flex-1 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 text-black font-black text-xs sm:text-sm rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.35)] transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Play size={15} fill="black" />
            <span>HEAR ACTIVE VOICE PREVIEW</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition cursor-pointer"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};

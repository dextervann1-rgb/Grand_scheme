import React from 'react';
import { Zap, Flame, Sparkles } from 'lucide-react';

interface ComboMultiplierBadgeProps {
  combo: number;
  multiplier: number;
  selectedCardDamage?: number | null;
  selectedCardName?: string | null;
}

export const ComboMultiplierBadge: React.FC<ComboMultiplierBadgeProps> = ({
  combo,
  multiplier,
  selectedCardDamage = null,
  selectedCardName = null,
}) => {
  const percentBonus = Math.round((multiplier - 1) * 100);
  const isHighCombo = combo >= 3;
  const isMaxCombo = multiplier >= 3.0;

  // Visual tiers based on combo count
  let tierColor = 'from-slate-900/90 via-slate-800/80 to-slate-900/90 border-slate-700 text-slate-300';
  let badgeGlow = '';
  let tierTitle = 'BASE MOMENTUM';
  let accentColor = '#00E5FF';

  if (combo >= 5) {
    tierColor = 'from-amber-950/95 via-yellow-900/90 to-purple-950/95 border-amber-400 text-amber-200';
    badgeGlow = 'shadow-[0_0_35px_rgba(255,215,0,0.55)] ring-2 ring-amber-400/50 animate-pulse';
    tierTitle = '⚡ MAXIMUM FAITH OVERLOAD';
    accentColor = '#FFD700';
  } else if (combo === 4) {
    tierColor = 'from-purple-950/90 via-fuchsia-900/80 to-indigo-950/90 border-fuchsia-400 text-fuchsia-200';
    badgeGlow = 'shadow-[0_0_28px_rgba(232,121,249,0.45)] ring-1 ring-fuchsia-400/40';
    tierTitle = '✨ FAITH VELOCITY SURGE';
    accentColor = '#e879f9';
  } else if (combo === 3) {
    tierColor = 'from-amber-950/90 via-amber-900/80 to-slate-900/90 border-amber-500 text-amber-200';
    badgeGlow = 'shadow-[0_0_22px_rgba(245,158,11,0.4)]';
    tierTitle = '🔥 TRINITY RUSH';
    accentColor = '#f59e0b';
  } else if (combo === 2) {
    tierColor = 'from-cyan-950/90 via-blue-900/80 to-slate-900/90 border-cyan-400 text-cyan-200';
    badgeGlow = 'shadow-[0_0_18px_rgba(6,182,212,0.35)]';
    tierTitle = '⚡ DUAL STRIKE RESONANCE';
    accentColor = '#06b6d4';
  }

  // Calculate boosted damage if a card is selected
  const boostedDamage = selectedCardDamage 
    ? Math.round(selectedCardDamage * multiplier) 
    : null;

  return (
    <div className={`relative overflow-hidden rounded-2xl border-2 bg-gradient-to-r ${tierColor} ${badgeGlow} p-3 sm:p-3.5 transition-all duration-300 select-none`}>
      {/* Dynamic Background Glow Burst */}
      {combo > 1 && (
        <div 
          className="absolute -right-8 -top-8 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-40 animate-pulse"
          style={{ backgroundColor: accentColor }}
        />
      )}

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Combo Icon, Streak Pips, and Multiplier Display */}
        <div className="flex items-center gap-3">
          {/* Circular Multiplier Badge */}
          <div className="relative flex items-center justify-center shrink-0">
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-black/85 border-2 flex flex-col items-center justify-center transition-transform ${
              combo > 1 ? 'border-amber-400 shadow-[0_0_15px_rgba(255,215,0,0.4)] scale-105' : 'border-slate-700'
            }`}>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 -mb-0.5">
                MULTIPLIER
              </span>
              <span className={`text-xl sm:text-2xl font-mono font-black tracking-tight ${
                combo > 1 ? 'text-amber-300 text-shadow-[0_0_10px_#FFD700]' : 'text-slate-300'
              }`}>
                {multiplier.toFixed(2)}x
              </span>
              {percentBonus > 0 && (
                <span className="text-[9px] font-mono font-bold text-emerald-400 leading-none">
                  +{percentBonus}%
                </span>
              )}
            </div>

            {/* Pulsing indicator aura on higher combos */}
            {isHighCombo && (
              <div className="absolute -inset-1 rounded-2xl border border-amber-300/60 animate-ping pointer-events-none" />
            )}
          </div>

          {/* Center Info */}
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`text-xs font-serif font-black tracking-wider flex items-center gap-1 ${
                combo > 1 ? 'text-amber-300' : 'text-slate-300'
              }`}>
                {combo > 1 ? <Flame size={14} className="text-amber-400 fill-amber-400 animate-bounce" /> : <Zap size={14} className="text-cyan-400" />}
                {tierTitle}
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                combo > 1 ? 'bg-amber-950/90 text-amber-300 border-amber-500/60 shadow-sm' : 'bg-slate-900 text-slate-400 border-slate-700'
              }`}>
                🔥 {combo} {combo === 1 ? 'CARD PLAYED' : 'CONSECUTIVE CARDS'}
              </span>
            </div>

            {/* Combo Meter Segments (1 to 5+ Pips) */}
            <div className="mt-1.5 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((pip) => {
                const isActive = combo >= pip;
                const isCurrent = combo === pip;
                return (
                  <div
                    key={pip}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isActive 
                        ? pip >= 5 
                          ? 'w-6 bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_8px_#FFD700]' 
                          : pip >= 3 
                          ? 'w-5 bg-gradient-to-r from-amber-500 to-orange-400 shadow-[0_0_6px_#f59e0b]' 
                          : 'w-4 bg-cyan-400 shadow-[0_0_6px_#00E5FF]'
                        : 'w-3 bg-slate-800 border border-slate-700'
                    } ${isCurrent ? 'ring-2 ring-white/70 animate-pulse' : ''}`}
                    title={`Combo Stage ${pip}`}
                  />
                );
              })}
              <span className="text-[10px] font-mono text-slate-400 ml-1.5">
                {combo === 0 ? 'Play a card to ignite combo' : combo >= 5 ? 'Max Overload!' : `Next: +25%`}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Selected Card Damage Preview */}
        {selectedCardDamage !== null && selectedCardDamage !== undefined && boostedDamage !== null ? (
          <div className="bg-black/80 border border-amber-400/60 rounded-xl px-3 py-1.5 flex items-center gap-2.5 sm:self-center shrink-0 shadow-inner">
            <div className="text-left">
              <span className="text-[9px] font-mono text-slate-400 block uppercase">
                {selectedCardName ? `STRIKE: ${selectedCardName}` : 'SELECTED CARD'}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono line-through text-slate-500">
                  {selectedCardDamage}
                </span>
                <span className="text-xs text-amber-400">➔</span>
                <span className="text-sm font-mono font-black text-amber-300 animate-pulse">
                  {boostedDamage} DMG
                </span>
                {percentBonus > 0 && (
                  <span className="text-[9px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/50 px-1.5 rounded">
                    +{percentBonus}%
                  </span>
                )}
              </div>
            </div>
            <Sparkles size={16} className="text-amber-400 animate-spin" />
          </div>
        ) : (
          <div className="hidden sm:flex flex-col text-right justify-center">
            <span className="text-[10px] font-mono text-slate-400">
              COMBO RETENTION
            </span>
            <span className="text-[10px] font-mono text-cyan-300">
              🛡️ Maintained by Perfect Dodges
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

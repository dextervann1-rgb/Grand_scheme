import React from 'react';
import { GameState, StrategyType } from '../types';
import { SAMANTHA_CROWNED_HERO } from './CharacterPortraits';
import { Play, Lock, CheckCircle2, Shield, TrendingUp, Heart } from 'lucide-react';

interface HomeViewProps {
  state: GameState;
  onSelectScreen: (screen: 'nodes' | 'battle' | 'upgrades' | 'pray' | 'shop' | 'board') => void;
  onUpdateStrategy: (strat: StrategyType) => void;
  onUpdateTreasury: (protocol: number, product: number, liquidity: number) => void;
  onLogMessage: (msg: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  state,
  onSelectScreen,
  onUpdateStrategy,
  onUpdateTreasury,
  onLogMessage,
}) => {
  const totalAlloc = state.protocolAlloc + state.productAlloc + state.liquidityAlloc;
  const isTreasuryBalanced = totalAlloc === 100;

  const currentScore = Math.min(
    999999999,
    Math.floor((state.valuation * state.momentum) + (state.security * 25) + (state.verses * 500))
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* 2x2 Grid matching prototype */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Card 1: Prologue */}
        <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📜</span>
              <h3 className="text-lg font-black tracking-wide text-amber-400 m-0">PROLOGUE — Out of the Shadows</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              Illustrious land, gold light, full color. A shockwave strips all color — the neon metropolis plunges into darkness, Phantoms emerge. Big Beastie runs to rescue civilians, gets pinned beneath a collapsing skyscraper beam.
            </p>
            <div className="p-3.5 bg-black/40 border border-amber-500/30 rounded-xl mb-4">
              <p className="text-xs font-semibold text-slate-400 mb-1">Big Beastie speaks:</p>
              <p className="text-amber-300 font-bold text-sm tracking-wide">
                Philippians 4:13 — “I can do all things through Christ who strengthens me.”
              </p>
              <p className="text-xs text-cyan-300 mt-1">
                Gold flash. Holy aura. Heavy steel beam shatters. Halo burns cyan-blue. He rises.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectScreen('nodes')}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            PLAY — START PROLOGUE → NODES
          </button>
        </div>

        {/* Card 2: Strategy + Treasury */}
        <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🎯</span>
              <h3 className="text-lg font-black tracking-wide text-cyan-400 m-0">STRATEGY + TREASURY</h3>
            </div>

            <div className="mb-4">
              <label className="text-xs font-bold text-slate-300 mb-1.5 block">Active Fellowship Strategy:</label>
              <select
                value={state.strategy || 'ARCHITECT'}
                onChange={(e) => onUpdateStrategy(e.target.value as StrategyType)}
                className="w-full bg-[#0A0F22] border border-cyan-500/40 rounded-xl px-3.5 py-2.5 text-sm text-cyan-300 font-semibold focus:outline-none focus:border-cyan-400"
              >
                <option value="ARCHITECT">ARCHITECT (+20 Security)</option>
                <option value="VELOCITY">VELOCITY (+0.35 Momentum)</option>
                <option value="GUARDIAN">GUARDIAN (+50 Faith)</option>
              </select>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                <span>Treasury Balance (Must Total 100):</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-black ${isTreasuryBalanced ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                  {totalAlloc} / 100
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Protocol:</span>
                  <span className="font-bold text-amber-400">{state.protocolAlloc}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={state.protocolAlloc}
                  onChange={(e) => onUpdateTreasury(Number(e.target.value), state.productAlloc, state.liquidityAlloc)}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Product:</span>
                  <span className="font-bold text-cyan-400">{state.productAlloc}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={state.productAlloc}
                  onChange={(e) => onUpdateTreasury(state.protocolAlloc, Number(e.target.value), state.liquidityAlloc)}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Liquidity:</span>
                  <span className="font-bold text-purple-400">{state.liquidityAlloc}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={state.liquidityAlloc}
                  onChange={(e) => onUpdateTreasury(state.protocolAlloc, state.productAlloc, Number(e.target.value))}
                  className="w-full accent-purple-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>

              <p className={`text-xs p-2 rounded-lg ${isTreasuryBalanced ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40' : 'bg-rose-950/40 text-rose-300 border border-rose-800/40'}`}>
                {isTreasuryBalanced
                  ? `Total: 100 ✅ • Security +20 • Valuation +450 • Faith +45`
                  : `Total: ${totalAlloc} ⚠️ (Adjust sliders to equal 100)`}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              onLogMessage(`Strategy locked: ${state.strategy || 'ARCHITECT'} — Go to NODES!`);
              onSelectScreen('nodes');
            }}
            className="w-full py-3 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-sm uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer shadow-lg"
          >
            <Lock className="w-4 h-4" />
            LOCK STRATEGY → PROCEED
          </button>
        </div>

        {/* Card 3: Samantha the Warden Crowned */}
        <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">👑</span>
              <h3 className="text-lg font-black tracking-wide text-amber-300 m-0">SAMANTHA THE WARDEN — CROWNED</h3>
            </div>
            
            <div className="flex gap-4 items-center mb-3">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-lg shadow-amber-500/20 flex-shrink-0">
                <img
                  src={SAMANTHA_CROWNED_HERO}
                  alt="Samantha the Warden Crowned"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-1 right-1 bg-amber-400 text-slate-950 text-[9px] font-black px-1 rounded">
                  QUEEN
                </div>
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <p className="font-extrabold text-white text-sm">NOT blocky. Real Samantha:</p>
                <p className="text-slate-300 leading-tight">
                  Burgundy-red hair, tattooed arm, white + gold armor, cyan seams, VannDiamond Armored Crown of Light.
                </p>
                <p className="text-amber-400 font-bold">
                  Judges 5:21 — “March on, my soul, with might!”
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              When Big Beastie speaks Philippians 4:13, Crown descends from Beacon and crowns her — Queen of Light, Warden of the Fellowship.
            </p>
            <div className="p-2.5 bg-[#0A0F22] rounded-xl border border-slate-700 text-[11px] text-slate-400">
              <span className="text-amber-300 font-bold">Official App Icon:</span> Side-by-side portrait of Samantha and Big Beastie. No banner version. That photo is FINAL.
            </div>
          </div>

          <button
            onClick={() => onSelectScreen('battle')}
            className="mt-4 w-full py-3 px-4 bg-[#1a2340] border border-amber-400/50 hover:border-amber-400 text-amber-300 font-black rounded-xl text-sm uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>👑</span>
            VIEW IN BATTLE →
          </button>
        </div>

        {/* Card 4: 5-Cycle Progression */}
        <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🔄</span>
              <h3 className="text-lg font-black tracking-wide text-purple-400 m-0">5-CYCLE PROGRESSION</h3>
            </div>

            <div className="space-y-2 text-xs text-slate-300 mb-4">
              <div className="p-2 bg-[#0A0F22] rounded-lg border border-slate-800">
                <span className="font-bold text-amber-400">Cycle 1 AUTO:</span> Philippians 4:13 — Valuation ×1.25, Momentum +0.25 (Sector 1 Blackout)
              </div>
              <div className="p-2 bg-[#0A0F22] rounded-lg border border-slate-800">
                <span className="font-bold text-cyan-400">Cycle 2 CHOICE:</span> Psalm 91:4 Wing Shield vs Isaiah 40:31 Wings of Eagles
              </div>
              <div className="p-2 bg-[#0A0F22] rounded-lg border border-slate-800">
                <span className="font-bold text-emerald-400">Cycle 3 AUTO:</span> Ephesians 6:11 — Security +40, Valuation +250 (Sector 2 Neon Shadows)
              </div>
              <div className="p-2 bg-[#0A0F22] rounded-lg border border-slate-800">
                <span className="font-bold text-yellow-400">Cycle 4 CHOICE:</span> Isaiah 54:17 Firewall vs Matthew 17:20 Mountain Mover
              </div>
              <div className="p-2 bg-[#0A0F22] rounded-lg border border-slate-800">
                <span className="font-bold text-purple-400">Cycle 5 AUTO:</span> Romans 8:37 — Valuation ×1.50, Momentum +0.50 → Final Boss Overlord
              </div>
            </div>

            <div className="p-3 bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/40 rounded-xl text-xs">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-purple-200">Score Formula:</span>
                <span className="font-mono font-black text-amber-400 text-sm">{currentScore.toLocaleString()} pts</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                (Valuation × Momentum) + (Security × 25) + (Verses × 500) • Cap: 999,999,999
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectScreen('board')}
            className="mt-4 w-full py-3 px-4 bg-[#1a2340] border border-purple-400/50 hover:border-purple-400 text-purple-300 font-black rounded-xl text-sm uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>🏆</span>
            VIEW LEADERBOARD & STATS
          </button>
        </div>

      </div>
    </div>
  );
};

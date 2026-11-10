import React from 'react';
import { GameState, StrategyType, ScreenType } from '../types';
import { SAMANTHA_CROWNED_HERO } from './CharacterPortraits';
import { Play, Lock, CheckCircle2, Shield, TrendingUp, Heart, Crown, Bot } from 'lucide-react';

interface HomeViewProps {
  state: GameState;
  onSelectScreen: (screen: ScreenType) => void;
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
      {/* 2x2 Grid matching v10.1 prototype */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Card 1: Prologue + Strategy & Treasury */}
        <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">📜</span>
              <h3 className="text-lg font-black tracking-wide text-amber-400 m-0">PROLOGUE</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Illustrious land, gold light. Shockwave strips color — darkness, Phantoms. Beastie pinned by beam. Speaks <span className="text-amber-400 font-bold">Philippians 4:13</span> — Gold flash, beam shatters, halo burns blue, he rises. <b>Samantha Crowned</b> stands beside him — VannDiamond Crown, Judges 5:21, Light Shield raised.
            </p>

            {/* Strategy Selection */}
            <div className="mb-3">
              <label className="text-[11px] font-bold text-slate-300 mb-1 block">Active Strategy:</label>
              <select
                value={state.strategy || 'ARCHITECT'}
                onChange={(e) => onUpdateStrategy(e.target.value as StrategyType)}
                className="w-full bg-[#0A0F22] border border-cyan-500/40 rounded-xl px-3 py-2 text-xs text-cyan-300 font-semibold focus:outline-none focus:border-cyan-400"
              >
                <option value="ARCHITECT">ARCHITECT (+20 Security)</option>
                <option value="VELOCITY">VELOCITY (+0.35 Momentum)</option>
                <option value="GUARDIAN">GUARDIAN (+50 Faith)</option>
              </select>
            </div>

            {/* Treasury Allocation */}
            <div className="space-y-2 mb-2">
              <div className="flex justify-between items-center text-[11px] font-bold text-slate-300">
                <span>Treasury Must Total 100:</span>
                <span className={`px-2 py-0.2 rounded-full text-[10px] font-black ${isTreasuryBalanced ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                  Total {totalAlloc} {isTreasuryBalanced ? '✅' : '⚠️ Must total 100'}
                </span>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                  <span>Protocol:</span>
                  <span className="font-bold text-amber-400">{state.protocolAlloc}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={state.protocolAlloc}
                  onChange={(e) => onUpdateTreasury(Number(e.target.value), state.productAlloc, state.liquidityAlloc)}
                  className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                  <span>Product:</span>
                  <span className="font-bold text-cyan-400">{state.productAlloc}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={state.productAlloc}
                  onChange={(e) => onUpdateTreasury(state.protocolAlloc, Number(e.target.value), state.liquidityAlloc)}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                  <span>Liquidity:</span>
                  <span className="font-bold text-purple-400">{state.liquidityAlloc}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={state.liquidityAlloc}
                  onChange={(e) => onUpdateTreasury(state.protocolAlloc, state.productAlloc, Number(e.target.value))}
                  className="w-full accent-purple-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectScreen('samantha')}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all cursor-pointer"
          >
            <Crown className="w-4 h-4 fill-current" />
            👑 VIEW SAMANTHA ASCENSION →
          </button>
        </div>

        {/* Card 2: CF-001 DONE — Agent Report */}
        <div className="bg-[#11182E] border-2 border-[#FFD700] rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-black tracking-wide text-amber-300 m-0">
                ✅ CF-001 DONE — Agent Report
              </h3>
            </div>

            <div className="bg-[#0A0F22] border border-emerald-500/50 rounded-xl p-3.5 text-xs text-slate-300 font-mono space-y-1.5 leading-relaxed">
              <p>🤖 <b>BFF-DEX-AI (Lead):</b> Assigned CF-001 to Art + Balance + Beulah</p>
              <p>🎨 <b>Art Agent:</b> Samantha Crowned Ascension art spec locked — Real Samantha likeness, NOT blocky</p>
              <p>⚖️ <b>Balance Agent:</b> +800 DMG, 3 Energy, WARDEN JUDGMENT — fits Ascension, does not break 2% economy</p>
              <p>👑 <b>Beulah L5 (Executor):</b> Built card, added to Packs, Inventory, Battle, Ascension</p>
              <p>✅ <b>QA Agent:</b> 60 FPS ✅, &lt;50MB ✅, One file ✅, Saves don't break ✅, Face unchanged ✅, Fragments only ✅</p>
              <p className="border-t border-slate-800 pt-1 text-amber-300 font-bold">
                Status: NEEDS DEXTER APPROVAL → Dexter said YES → MERGED → v10.0 → v10.1
              </p>
              <p className="text-cyan-300 font-bold">
                Next: CF-002 John Thunder Ascension
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectScreen('asc')}
              className="py-2.5 px-3 bg-[#1a2340] border border-amber-500/50 hover:border-amber-400 text-amber-300 font-black rounded-xl text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              🔺 ASCENSION ROSTER
            </button>
            <button
              onClick={() => onSelectScreen('workflow')}
              className="py-2.5 px-3 bg-[#1a2340] border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 font-black rounded-xl text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              ⚙️ WORKFLOW QUEUE
            </button>
          </div>
        </div>

        {/* Card 3: Samantha the Warden Crowned Portrait */}
        <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">👑</span>
              <h3 className="text-base font-black tracking-wide text-amber-300 m-0">SAMANTHA THE WARDEN — CROWNED</h3>
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
          </div>

          <button
            onClick={() => onSelectScreen('battle')}
            className="w-full py-2.5 px-4 bg-[#1a2340] border border-amber-400/50 hover:border-amber-400 text-amber-300 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
          >
            ⚔️ TEST IN BATTLE →
          </button>
        </div>

        {/* Card 4: 5-Cycle Progression & Score */}
        <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🔄</span>
              <h3 className="text-base font-black tracking-wide text-purple-400 m-0">5-CYCLE PROGRESSION</h3>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 mb-3">
              <div className="p-1.5 bg-[#0A0F22] rounded-lg border border-slate-800">
                <span className="font-bold text-amber-400">Cycle 1 AUTO:</span> Phil 4:13 — Val ×1.25, Momentum +0.25
              </div>
              <div className="p-1.5 bg-[#0A0F22] rounded-lg border border-slate-800">
                <span className="font-bold text-cyan-400">Cycle 2 CHOICE:</span> Psalm 91:4 vs Isaiah 40:31
              </div>
              <div className="p-1.5 bg-[#0A0F22] rounded-lg border border-slate-800">
                <span className="font-bold text-emerald-400">Cycle 3 AUTO:</span> Eph 6:11 — Sec +40, Val +250
              </div>
              <div className="p-1.5 bg-[#0A0F22] rounded-lg border border-slate-800">
                <span className="font-bold text-yellow-400">Cycle 4 CHOICE:</span> Isa 54:17 vs Matt 17:20
              </div>
              <div className="p-1.5 bg-[#0A0F22] rounded-lg border border-slate-800">
                <span className="font-bold text-purple-400">Cycle 5 AUTO:</span> Romans 8:37 — Val ×1.50 → Boss
              </div>
            </div>

            <div className="p-2.5 bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/40 rounded-xl text-xs">
              <div className="flex justify-between items-center mb-0.5">
                <span className="font-bold text-purple-200">Score Formula:</span>
                <span className="font-mono font-black text-amber-400 text-xs">{currentScore.toLocaleString()} pts</span>
              </div>
              <p className="text-slate-400 text-[10px]">
                (Valuation × Momentum) + (Security × 25) + (Verses × 500)
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectScreen('market')}
            className="w-full py-2.5 px-4 bg-[#1a2340] border border-cyan-400/50 hover:border-cyan-400 text-cyan-300 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer mt-3"
          >
            🛒 OPEN COVENANT PACKS →
          </button>
        </div>

      </div>
    </div>
  );
};

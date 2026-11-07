import React from 'react';
import { GameState } from '../types';
import { UPGRADE_DEFINITIONS, getUpgradeCost, UpgradeDefinition } from '../data/upgrades';
import { Sparkles, ArrowUpCircle, Gift, Check, Shield, Zap } from 'lucide-react';
import { SAMANTHA_CROWNED_HERO } from './CharacterPortraits';

interface UpgradesViewProps {
  state: GameState;
  onUpgrade: (upgradeId: string, cost: number) => void;
  onClaimDailyFragments: () => void;
  onReturnToNodes: () => void;
}

export const UpgradesView: React.FC<UpgradesViewProps> = ({
  state,
  onUpgrade,
  onClaimDailyFragments,
  onReturnToNodes,
}) => {
  const upgradesMap = state.upgrades || {};

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">⬆️</span>
            <h2 className="text-xl font-black text-amber-400 m-0">FELLOWSHIP UPGRADE FORGE</h2>
          </div>
          <p className="text-xs text-slate-300">
            Spend your collected <span className="text-cyan-400 font-bold">💎 Fragments</span> to reinforce fellowship weapons, shields, and divine crown powers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#0A0F22] border border-cyan-500/40 px-4 py-2 rounded-xl text-center">
            <p className="text-[10px] text-slate-400 uppercase font-bold">Available Fragments</p>
            <p className="text-lg font-black text-cyan-300">💎 {state.fragments}</p>
          </div>
          <button
            onClick={onClaimDailyFragments}
            className="py-2.5 px-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            <Gift className="w-4 h-4" />
            FREE +50 💎
          </button>
        </div>
      </div>

      {/* Upgrades Grid (8 items) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {UPGRADE_DEFINITIONS.map((def) => {
          const currentLvl = upgradesMap[def.id] || 0;
          const isMaxed = currentLvl >= def.maxLevel;
          const cost = getUpgradeCost(def, currentLvl);
          const canAfford = state.fragments >= cost && !isMaxed;
          const progressPercent = (currentLvl / def.maxLevel) * 100;

          return (
            <div
              key={def.id}
              className={`bg-[#11182E] border rounded-2xl p-4 shadow-lg transition-all ${
                isMaxed
                  ? 'border-emerald-500/40 bg-emerald-950/10'
                  : 'border-[#2a3a6a] hover:border-amber-400/50'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {/* Avatar */}
                <div className="relative w-14 h-14 rounded-xl bg-[#1a2340] border-2 border-amber-400 flex items-center justify-center text-2xl flex-shrink-0 shadow-md">
                  {def.id.startsWith('sam') ? (
                    <img
                      src={SAMANTHA_CROWNED_HERO}
                      alt="Samantha"
                      className="w-full h-full object-cover object-top rounded-lg"
                    />
                  ) : (
                    <span>{def.avatarEmoji}</span>
                  )}
                  <span className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full border border-slate-900">
                    Lv {currentLvl}/{def.maxLevel}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-extrabold text-sm text-white truncate m-0">{def.name}</h3>
                    <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded flex-shrink-0">
                      {def.heroName}
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-amber-300 mt-0.5">{def.scripture}</p>
                  <p className="text-xs text-slate-300 leading-snug mt-1">{def.desc}</p>

                  {/* Level Bar */}
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-2.5">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isMaxed
                          ? 'bg-gradient-to-r from-emerald-400 to-teal-400'
                          : 'bg-gradient-to-r from-amber-400 to-cyan-400'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-3.5 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <span className="text-xs text-slate-400">
                  {isMaxed ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Max Level Reached
                    </span>
                  ) : (
                    <span>Cost: <b className="text-cyan-300 font-bold">{cost} 💎</b></span>
                  )}
                </span>

                <button
                  onClick={() => onUpgrade(def.id, cost)}
                  disabled={!canAfford}
                  className={`py-2 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                    isMaxed
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : canAfford
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-md active:scale-95'
                      : 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed opacity-60'
                  }`}
                >
                  <ArrowUpCircle className="w-3.5 h-3.5" />
                  {isMaxed ? 'MAXED' : `UPGRADE (${cost} 💎)`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Return to Nodes */}
      <div className="pt-2 text-center">
        <button
          onClick={onReturnToNodes}
          className="py-3 px-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black rounded-xl text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          🗺️ RETURN TO CAMPAIGN NODES
        </button>
      </div>
    </div>
  );
};

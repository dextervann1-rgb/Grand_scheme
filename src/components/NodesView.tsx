import React, { useState } from 'react';
import { GameState } from '../types';
import { CheckCircle2, Lock, Play, Sparkles, Swords, Skull, ShieldAlert } from 'lucide-react';
import { BOSS_MALICE_IMG, BOSS_PHANTASM_IMG, BOSS_OVERLORD_IMG, GLOOM_TROOPER_IMG } from './CharacterPortraits';

interface NodesViewProps {
  state: GameState;
  onStartNodeBattle: (chapter: number) => void;
  onClaimMiracleReward: () => void;
  onStartPreyHunt: () => void;
}

export const NodesView: React.FC<NodesViewProps> = ({
  state,
  onStartNodeBattle,
  onClaimMiracleReward,
  onStartPreyHunt,
}) => {
  const [miracleSolved, setMiracleSolved] = useState<boolean>(false);
  const [selectedVersePuzzle, setSelectedVersePuzzle] = useState<string>('');
  const [puzzleFeedback, setPuzzleFeedback] = useState<string | null>(null);

  const isNode1Cleared = true; // Prologue is cleared by default
  const isNode2Cleared = (state.unlockedNodes || [1, 2]).includes(3);
  const isNode3Unlocked = (state.unlockedNodes || [1, 2]).includes(3);
  const isNode3Cleared = (state.unlockedNodes || [1, 2]).includes(4);
  const isNode4Unlocked = (state.unlockedNodes || [1, 2]).includes(4);

  const handleSolvePuzzle = () => {
    if (selectedVersePuzzle === 'psalm23') {
      setMiracleSolved(true);
      setPuzzleFeedback('✨ MIRACLE MANIFESTED: Psalm 23:4 restored the fountain! +120 Fragments & Holy Water Upgrade Material awarded.');
      onClaimMiracleReward();
    } else {
      setPuzzleFeedback('❌ The fountain remains dormant. Choose the psalm of the Shepherd who guides through the valley of shadow.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-black text-amber-400 flex items-center gap-2 m-0">
              <span>🗺️</span> CAMPAIGN NODES & PROTOCOLS
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Tap a node to inspect and battle. Beat each boss to crack the Dark Heart and unlock the next sector.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-3 py-1 rounded-full border border-amber-500/30">
              Active Chapter: {state.chapter}
            </span>
          </div>
        </div>

        {/* Nodes List */}
        <div className="space-y-3 mb-6">

          {/* Node 1 */}
          <div className="flex items-center gap-3.5 bg-[#0A0F22] border border-slate-800 rounded-xl p-3.5 hover:border-amber-500/40 transition-colors">
            <div className="w-11 h-11 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-base flex-shrink-0 shadow-md shadow-amber-400/20">
              ✓
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-extrabold text-sm text-white">Node 1 — Sector 1 Blackout</p>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  CLEARED
                </span>
              </div>
              <p className="text-xs text-slate-400">Prologue • Philippians 4:13 • Fellowship Beacon Restored</p>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-1.5">
                <div className="h-full bg-gradient-to-r from-amber-400 to-cyan-400 w-full" />
              </div>
            </div>
          </div>

          {/* Node 2: Malice */}
          <div className="flex items-center gap-3.5 bg-[#141b38] border-2 border-amber-400/80 rounded-xl p-3.5 shadow-lg shadow-amber-500/10 hover:border-amber-300 transition-colors">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 flex-shrink-0 shadow-md">
              <img src={BOSS_MALICE_IMG} alt="Commander Malice" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-red-950/20" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <p className="font-black text-sm text-amber-300">Node 2 — Malice Boss (Chapter 1)</p>
                <span className="text-[11px] font-black text-amber-950 bg-amber-400 px-2 py-0.5 rounded shadow">
                  PLAY NOW
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Chapter 1 • HP 3,500 + Shield 500 • Dark Heart 100% Pristine
              </p>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-1.5">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-amber-400 transition-all duration-300" 
                  style={{ width: `${Math.max(10, (state.bossHp / (state.bossMax || 3500)) * 100)}%` }} 
                />
              </div>
            </div>
            <button
              onClick={() => onStartNodeBattle(1)}
              className="py-2 px-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black rounded-lg text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md flex-shrink-0 cursor-pointer active:scale-95"
            >
              <Swords className="w-3.5 h-3.5" />
              BATTLE
            </button>
          </div>

          {/* Node 3: Phantasm */}
          <div className={`flex items-center gap-3.5 bg-[#0A0F22] border rounded-xl p-3.5 transition-colors ${isNode3Unlocked ? 'border-cyan-500/60 opacity-100' : 'border-slate-800 opacity-60'}`}>
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-cyan-400/50 flex-shrink-0">
              <img src={BOSS_PHANTASM_IMG} alt="Phantasm" className="w-full h-full object-cover object-top" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-extrabold text-sm text-cyan-200">Node 3 — Neon Shadows (Phantasm)</p>
                {isNode3Cleared ? (
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">CLEARED</span>
                ) : isNode3Unlocked ? (
                  <span className="text-[11px] font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded">UNLOCKED</span>
                ) : (
                  <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1"><Lock className="w-3 h-3" /> LOCKED</span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Chapter 2 • HP 4,200 + Shield 750 • Unlocks Celestial Glide
              </p>
            </div>
            {isNode3Unlocked && (
              <button
                onClick={() => onStartNodeBattle(2)}
                className="py-2 px-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-lg text-xs uppercase tracking-wider flex items-center gap-1.5 flex-shrink-0 cursor-pointer active:scale-95"
              >
                <Swords className="w-3.5 h-3.5" />
                BATTLE
              </button>
            )}
          </div>

          {/* Node 4: Overlord */}
          <div className={`flex items-center gap-3.5 bg-[#0A0F22] border rounded-xl p-3.5 transition-colors ${isNode4Unlocked ? 'border-purple-500/60 opacity-100' : 'border-slate-800 opacity-60'}`}>
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-purple-400/50 flex-shrink-0">
              <img src={BOSS_OVERLORD_IMG} alt="Overlord" className="w-full h-full object-cover object-top" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-extrabold text-sm text-purple-200">Node 4 — Ancient Source (Gloom Overlord)</p>
                {isNode4Unlocked ? (
                  <span className="text-[11px] font-bold text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded">FINAL BOSS</span>
                ) : (
                  <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1"><Lock className="w-3 h-3" /> LOCKED</span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Chapter 3 • HP 6,000 + Shield 1,200 • Trinity Beam Required
              </p>
            </div>
            {isNode4Unlocked && (
              <button
                onClick={() => onStartNodeBattle(3)}
                className="py-2 px-3.5 bg-purple-500 hover:bg-purple-400 text-white font-black rounded-lg text-xs uppercase tracking-wider flex items-center gap-1.5 flex-shrink-0 cursor-pointer active:scale-95"
              >
                <Swords className="w-3.5 h-3.5" />
                BATTLE
              </button>
            )}
          </div>

          {/* Miracle Node */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/40 rounded-xl p-3.5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400 flex items-center justify-center text-xl flex-shrink-0">
                ✨
              </div>
              <div>
                <p className="font-extrabold text-sm text-cyan-300">Miracle Node — The Dried Fountain</p>
                <p className="text-xs text-slate-300">Verse puzzle • Reward: +120 Fragments + Holy Water Material</p>
              </div>
            </div>
            {!miracleSolved ? (
              <div className="flex items-center gap-2">
                <select
                  value={selectedVersePuzzle}
                  onChange={(e) => setSelectedVersePuzzle(e.target.value)}
                  className="bg-slate-900 border border-cyan-500/50 rounded-lg px-2.5 py-1.5 text-xs text-cyan-200"
                >
                  <option value="">Select Scripture to awaken waters...</option>
                  <option value="psalm23">Psalm 23:4 — He leads me beside still waters</option>
                  <option value="john4">John 4:14 — Fountain of water springing up</option>
                  <option value="rev21">Revelation 21:6 — To the thirsty from the spring</option>
                </select>
                <button
                  onClick={handleSolvePuzzle}
                  disabled={!selectedVersePuzzle}
                  className="py-1.5 px-3 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 font-black rounded-lg text-xs uppercase cursor-pointer"
                >
                  REVEAL
                </button>
              </div>
            ) : (
              <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/40">
                ✨ MIRACLE CLAIMED
              </span>
            )}
          </div>
          {puzzleFeedback && (
            <p className="text-xs p-2.5 bg-black/50 border border-cyan-500/30 rounded-lg text-cyan-300">
              {puzzleFeedback}
            </p>
          )}

          {/* Prey Node */}
          <div className="flex items-center justify-between gap-3 bg-[#0A0F22] border border-amber-500/30 rounded-xl p-3.5">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-amber-400/60 flex-shrink-0">
                <img src={GLOOM_TROOPER_IMG} alt="Gloom Trooper" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-extrabold text-sm text-amber-300">Prey Node — Gloom Trooper Hunt</p>
                <p className="text-xs text-slate-400">Hunt Gloom Troopers in the outskirts • Guaranteed +25 to +50 Fragments</p>
              </div>
            </div>
            <button
              onClick={onStartPreyHunt}
              className="py-2 px-3.5 bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-400 hover:to-amber-400 text-white font-black rounded-lg text-xs uppercase tracking-wider flex items-center gap-1.5 flex-shrink-0 cursor-pointer active:scale-95 shadow-md"
            >
              <span>🐺</span>
              HUNT
            </button>
          </div>

        </div>

        {/* Big Action Button */}
        <button
          onClick={() => onStartNodeBattle(state.chapter || 1)}
          className="w-full py-4 px-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Swords className="w-5 h-5" />
          ENTER BATTLE — NODE {state.chapter || 1} {state.chapter === 1 ? 'MALICE' : state.chapter === 2 ? 'PHANTASM' : 'OVERLORD'}
        </button>
      </div>
    </div>
  );
};

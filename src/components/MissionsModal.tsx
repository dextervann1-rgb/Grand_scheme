import React, { useState } from 'react';
import { DailyMission, Achievement } from '../types';
import { Target, Award, CheckCircle2, Gift, X } from 'lucide-react';
import { soundEngine } from '../sound/audio';

interface MissionsModalProps {
  missions: DailyMission[];
  achievements: Achievement[];
  onClaimMission: (id: string, reward: number) => void;
  onClose: () => void;
}

export const MissionsModal: React.FC<MissionsModalProps> = ({
  missions,
  achievements,
  onClaimMission,
  onClose,
}) => {
  const [tab, setTab] = useState<'missions' | 'achievements'>('missions');

  const handleClaim = (mission: DailyMission) => {
    soundEngine.victory();
    onClaimMission(mission.id, mission.reward);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-xl bg-[#090f24] border-2 border-amber-400 rounded-2xl p-5 shadow-[0_0_35px_rgba(255,215,0,0.3)] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <Target className="text-amber-400" size={24} />
            <div>
              <h3 className="text-lg font-black text-amber-300 font-serif tracking-wide">
                MISSIONS & TRIUMPHS
              </h3>
              <p className="text-[11px] text-cyan-300">
                Daily bounty protocol and eternal milestones
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

        {/* Tab switch */}
        <div className="flex gap-2 mb-4 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => { soundEngine.click(); setTab('missions'); }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              tab === 'missions' 
                ? 'bg-amber-400 text-black shadow' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Target size={14} />
            <span>DAILY MISSIONS (3)</span>
          </button>
          <button
            onClick={() => { soundEngine.click(); setTab('achievements'); }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              tab === 'achievements' 
                ? 'bg-amber-400 text-black shadow' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award size={14} />
            <span>ACHIEVEMENTS ({achievements.filter(a => a.unlocked).length}/{achievements.length})</span>
          </button>
        </div>

        {/* Missions list */}
        {tab === 'missions' && (
          <div className="space-y-3 overflow-y-auto flex-1 pr-1">
            {missions.map((m) => {
              const progress = Math.min(100, (m.current / m.target) * 100);
              const isReady = m.current >= m.target && !m.claimed;

              return (
                <div 
                  key={m.id}
                  className={`p-3.5 rounded-xl border transition ${
                    isReady 
                      ? 'bg-[#151f45] border-amber-400/80 shadow-[0_0_15px_rgba(255,215,0,0.2)]' 
                      : m.claimed 
                      ? 'bg-[#0b1126] border-slate-800/80 opacity-70' 
                      : 'bg-[#0f1738] border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-bold text-xs text-amber-300 font-serif">{m.title}</h4>
                      <p className="text-[11px] text-slate-300 mt-0.5">{m.description}</p>
                    </div>
                    <span className="text-xs font-mono font-black text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30 whitespace-nowrap">
                      +{m.reward} 💎
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-400 to-cyan-400 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                      {m.current} / {m.target}
                    </span>
                  </div>

                  {/* Claim Button */}
                  {isReady && (
                    <button
                      onClick={() => handleClaim(m)}
                      className="w-full mt-2.5 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 text-black font-black text-xs rounded-lg shadow flex items-center justify-center gap-1.5 cursor-pointer animate-pulse"
                    >
                      <Gift size={14} />
                      <span>CLAIM REWARD (+{m.reward} FRAGMENTS)</span>
                    </button>
                  )}

                  {m.claimed && (
                    <div className="mt-2 text-right">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center justify-end gap-1">
                        <CheckCircle2 size={12} /> REWARD CLAIMED
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Achievements list */}
        {tab === 'achievements' && (
          <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
            {achievements.map((ach) => (
              <div 
                key={ach.id}
                className={`p-3 rounded-xl border flex items-center gap-3 transition ${
                  ach.unlocked 
                    ? 'bg-[#131d45] border-amber-400/60 shadow-sm' 
                    : 'bg-[#0a1024] border-slate-800/80 opacity-60'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                  ach.unlocked ? 'bg-amber-400/20 border border-amber-400' : 'bg-slate-900 border border-slate-800'
                }`}>
                  {ach.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-amber-300 font-serif">{ach.title}</h4>
                    {ach.unlocked ? (
                      <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/40">
                        UNLOCKED ✓
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono text-slate-500">LOCKED</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">{ach.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 text-center mt-2">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition cursor-pointer"
          >
            RETURN
          </button>
        </div>
      </div>
    </div>
  );
};

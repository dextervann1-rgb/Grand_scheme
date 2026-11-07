import React from 'react';
import { Flame, Check, Gift, X } from 'lucide-react';
import { soundEngine } from '../sound/audio';

interface DailyStreakModalProps {
  streak: number;
  lastClaimDate: string;
  onClaim: (day: number, fragments: number, isCrownShard?: boolean) => void;
  onClose: () => void;
}

export const DailyStreakModal: React.FC<DailyStreakModalProps> = ({
  streak,
  lastClaimDate,
  onClaim,
  onClose,
}) => {
  const today = new Date().toISOString().split('T')[0];
  const canClaimToday = lastClaimDate !== today;

  const streakRewards = [
    { day: 1, fragments: 50, desc: '+50 Faith Fragments', icon: '💎' },
    { day: 2, fragments: 75, desc: '+75 Faith Fragments', icon: '💎' },
    { day: 3, fragments: 100, desc: '+100 Faith Fragments', icon: '💎' },
    { day: 4, fragments: 125, desc: '+125 Faith Fragments', icon: '💎' },
    { day: 5, fragments: 150, desc: '+150 Faith Fragments', icon: '💎' },
    { day: 6, fragments: 200, desc: '+200 Faith Fragments', icon: '💎' },
    { day: 7, fragments: 300, desc: '+300 Fragments + CROWN SHARD 👑', icon: '👑', isCrown: true },
  ];

  const currentDayIndex = ((streak) % 7); // 0 to 6
  const nextClaimDay = currentDayIndex + 1;

  const handleClaim = (dayItem: typeof streakRewards[0]) => {
    soundEngine.crown();
    onClaim(dayItem.day, dayItem.fragments, dayItem.isCrown);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-lg bg-[#090f24] border-2 border-amber-400 rounded-2xl p-5 shadow-[0_0_35px_rgba(255,215,0,0.3)] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Flame className="text-amber-400 animate-pulse" size={26} />
            <div>
              <h3 className="text-lg font-black text-amber-300 font-serif tracking-wide">
                7-DAY FAITH DEVOTION STREAK
              </h3>
              <p className="text-[11px] text-cyan-300 font-mono">
                Current Streak: {streak} Days {canClaimToday ? '• REWARD AVAILABLE!' : '• Claimed Today'}
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

        {/* Status Callout */}
        <div className="bg-[#121b3d] border border-amber-500/30 rounded-xl p-3 mb-4 text-center">
          <p className="text-xs text-slate-200">
            Consecrate your fellowship daily to unlock faith fragments and reach Day 7 for the{' '}
            <b className="text-amber-300 font-serif">VannDiamond Crown Shard</b>!
          </p>
        </div>

        {/* 7-Day Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4 overflow-y-auto">
          {streakRewards.map((reward) => {
            const isClaimed = streak >= reward.day && !canClaimToday;
            const isTodayTarget = canClaimToday && reward.day === nextClaimDay;
            const isFuture = reward.day > nextClaimDay;

            return (
              <div
                key={reward.day}
                className={`p-3 rounded-xl border flex flex-col items-center justify-between text-center relative transition ${
                  reward.isCrown ? 'col-span-2 sm:col-span-2 bg-gradient-to-r from-amber-950/60 to-purple-950/60 border-amber-400 shadow-md' : ''
                } ${
                  isTodayTarget
                    ? 'bg-amber-400/20 border-amber-400 shadow-[0_0_15px_rgba(255,215,0,0.4)] scale-102'
                    : isClaimed
                    ? 'bg-[#0d1430] border-emerald-500/40 opacity-75'
                    : 'bg-[#0a1026] border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] font-mono text-cyan-300 font-bold">DAY {reward.day}</span>
                  {isClaimed && <Check size={14} className="text-emerald-400" />}
                </div>

                <div className="text-3xl my-1">{reward.icon}</div>

                <div className="text-[11px] font-black text-amber-300 font-mono mt-1">
                  {reward.desc}
                </div>

                {isTodayTarget && (
                  <button
                    onClick={() => handleClaim(reward)}
                    className="w-full mt-2 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-black font-black text-xs rounded-lg shadow cursor-pointer animate-pulse"
                  >
                    CLAIM NOW
                  </button>
                )}

                {isClaimed && (
                  <span className="text-[9px] font-mono text-emerald-400 mt-2 font-bold">CLAIMED ✓</span>
                )}

                {isFuture && (
                  <span className="text-[9px] font-mono text-slate-500 mt-2">LOCKED</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick action */}
        {canClaimToday && (
          <div className="mb-2">
            <button
              onClick={() => handleClaim(streakRewards[currentDayIndex] || streakRewards[0])}
              className="w-full py-3 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-black text-sm rounded-xl shadow-lg cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] transition"
            >
              <Gift size={18} />
              <span>CLAIM TODAY'S REWARD (DAY {nextClaimDay})</span>
            </button>
          </div>
        )}

        <div className="pt-2 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

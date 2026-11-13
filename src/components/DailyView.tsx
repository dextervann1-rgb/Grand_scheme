import React from 'react';
import { Calendar, Gift, CheckCircle2, GraduationCap, Flame } from 'lucide-react';

interface DailyViewProps {
  streakCount: number;
  streakDay: number;
  lastClaimDate: string;
  tutorialCompleted: boolean;
  dailyMessage: string | null;
  tutorialMessage: string | null;
  onClaimDaily: () => void;
  onFinishTutorial: () => void;
  onNavigateToScreen: (screen: 'battle' | 'market' | 'pray') => void;
}

const DAILY_AMOUNTS = [25, 50, 75, 100, 125, 150, 200];

export const DailyView: React.FC<DailyViewProps> = ({
  streakCount,
  streakDay,
  lastClaimDate,
  tutorialCompleted,
  dailyMessage,
  tutorialMessage,
  onClaimDaily,
  onFinishTutorial,
  onNavigateToScreen,
}) => {
  const today = new Date().toISOString().split('T')[0];
  const alreadyClaimedToday = lastClaimDate === today;
  const activeDayIndex = Math.max(0, Math.min(6, streakDay - 1));
  const todayReward = DAILY_AMOUNTS[activeDayIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-6">
      {/* Daily Login Streak Card */}
      <div className="bg-[#11182E] border-2 border-amber-400/80 rounded-2xl p-5 sm:p-6 shadow-2xl text-center space-y-4">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-black text-amber-400 m-0">
              📅 DAILY LOGIN — STREAK
            </h2>
          </div>
          <p className="text-xs text-slate-300 m-0 flex items-center gap-2 flex-wrap justify-center">
            <span>
              Day <b className="text-amber-300 font-black">{streakDay}</b> / 7
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center gap-1 text-orange-300 font-bold">
              <Flame size={13} className="text-orange-400" />
              Streak: <b className="text-white">{streakCount}</b> days
            </span>
          </p>
        </div>

        {/* 7-Day Reward Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 pt-1">
          {DAILY_AMOUNTS.map((amount, idx) => {
            const dayNum = idx + 1;
            const isCurrent = dayNum === streakDay;
            const isPast = dayNum < streakDay;

            return (
              <div
                key={dayNum}
                className={`rounded-xl p-3 border text-center transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-b from-amber-400 to-yellow-500 text-slate-950 border-amber-200 shadow-[0_0_15px_rgba(255,215,0,0.45)] scale-[1.03]'
                    : isPast
                    ? 'bg-[#0A0F22] border-emerald-500/50 text-emerald-300 opacity-85'
                    : 'bg-[#0A0F22] border-amber-500/30 text-white'
                }`}
              >
                <div className="text-[11px] font-black uppercase tracking-wider">
                  Day {dayNum}
                </div>
                <div className={`text-sm font-black mt-1 ${isCurrent ? 'text-slate-950' : 'text-amber-300'}`}>
                  +{amount} 💎
                </div>
                <div className="text-[9px] font-mono mt-1 opacity-80">
                  {isCurrent ? (alreadyClaimedToday ? 'CLAIMED ✓' : 'TODAY') : isPast ? 'DONE ✓' : 'UPCOMING'}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClaimDaily}
          disabled={alreadyClaimedToday}
          className="w-full py-3.5 px-5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 disabled:opacity-45 disabled:cursor-not-allowed text-slate-950 font-black rounded-xl text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-[0.99] transition-all cursor-pointer"
        >
          <Gift className="w-4 h-4" />
          <span>
            {alreadyClaimedToday
              ? `✅ TODAY CLAIMED (+${todayReward} 💎) — RETURN TOMORROW`
              : `📅 CLAIM TODAY — +${todayReward} 💎 FRAGMENTS`}
          </span>
        </button>

        {dailyMessage && (
          <div className="p-3 bg-[#0A0F22] border border-amber-400/50 rounded-xl text-xs text-amber-300 font-bold">
            {dailyMessage}
          </div>
        )}
      </div>

      {/* First-Time Tutorial (+100 Fragments) */}
      <div className="bg-[#11182E] border-2 border-cyan-500/70 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-cyan-400" />
            <h3 className="text-lg font-black text-cyan-300 m-0">
              🎓 FIRST-TIME TUTORIAL — +100 💎
            </h3>
          </div>
          <span
            className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${
              tutorialCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
            }`}
          >
            {tutorialCompleted ? 'COMPLETED ✓' : 'READY TO CLAIM'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <button
            onClick={() => onNavigateToScreen('battle')}
            className="bg-[#0A0F22] hover:bg-[#131d40] border border-slate-700 hover:border-amber-400/60 rounded-xl p-3 text-left transition cursor-pointer"
          >
            <div className="font-black text-amber-300 mb-1">Step 1: Battle</div>
            <p className="text-slate-300 m-0 text-[11px]">
              Tap a scripture card in Battle and execute a strike or dodge.
            </p>
          </button>
          <button
            onClick={() => onNavigateToScreen('market')}
            className="bg-[#0A0F22] hover:bg-[#131d40] border border-slate-700 hover:border-cyan-400/60 rounded-xl p-3 text-left transition cursor-pointer"
          >
            <div className="font-black text-cyan-300 mb-1">Step 2: Covenant Pack</div>
            <p className="text-slate-300 m-0 text-[11px]">
              Open a 100 💎 Covenant Pack in Marketplace and equip your hero.
            </p>
          </button>
          <button
            onClick={() => onNavigateToScreen('pray')}
            className="bg-[#0A0F22] hover:bg-[#131d40] border border-slate-700 hover:border-purple-400/60 rounded-xl p-3 text-left transition cursor-pointer"
          >
            <div className="font-black text-purple-300 mb-1">Step 3: Pray For Prey</div>
            <p className="text-slate-300 m-0 text-[11px]">
              Offer prayer to reveal Gloom Troopers and hunt for bonus Fragments.
            </p>
          </button>
        </div>

        <button
          onClick={onFinishTutorial}
          disabled={tutorialCompleted}
          className="w-full py-3 px-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 disabled:opacity-45 disabled:cursor-not-allowed text-slate-950 font-black rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer transition"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>
            {tutorialCompleted
              ? '✅ TUTORIAL COMPLETED (+100 💎 AWARDED)'
              : '✅ FINISH TUTORIAL → +100 💎 FRAGMENTS'}
          </span>
        </button>

        {tutorialMessage && (
          <div className="p-3 bg-[#0A0F22] border border-cyan-400/50 rounded-xl text-xs text-cyan-300 font-bold">
            {tutorialMessage}
          </div>
        )}
      </div>
    </div>
  );
};

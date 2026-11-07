import React, { useState } from 'react';
import { LeaderboardEntry } from '../types';
import { Trophy, Share2, Check, X, Award } from 'lucide-react';
import { soundEngine } from '../sound/audio';

interface LeaderboardModalProps {
  entries: LeaderboardEntry[];
  currentScore?: number;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  entries,
  currentScore = 0,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleShare = () => {
    soundEngine.click();
    const scoreToShare = currentScore > 0 ? currentScore : (entries[0]?.score || 845200);
    const text = `⚔️ ChristFire: Omega Protocol — I scored ${scoreToShare.toLocaleString()} with Samantha Crowned & Big Beastie! Can you shatter the Gloom and let Jesus Reign? Play now!`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#090f24] border-2 border-amber-400 rounded-2xl p-5 shadow-[0_0_35px_rgba(255,215,0,0.3)] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <Trophy className="text-amber-400" size={26} />
            <div>
              <h3 className="text-lg font-black text-amber-300 font-serif tracking-wide">
                HALL OF FAITH — TOP 10 LEADERBOARD
              </h3>
              <p className="text-[11px] text-cyan-300">
                Formula: (Valuation × Momentum) + (Security × 25) + (Verses × 500)
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

        {/* Current Score Highlights & Share */}
        <div className="bg-[#0f1738] border border-amber-500/30 rounded-xl p-3 mb-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">
              Your Current Session Score
            </span>
            <span className="text-xl font-black text-amber-300 font-mono">
              {currentScore.toLocaleString()} PTS
            </span>
          </div>

          <button
            onClick={handleShare}
            className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black text-xs rounded-xl flex items-center gap-2 transition cursor-pointer shadow-md"
          >
            {copied ? <Check size={16} /> : <Share2 size={16} />}
            <span>{copied ? 'SCORE COPIED!' : 'SHARE SCORE'}</span>
          </button>
        </div>

        {/* Table list */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-1.5">
          {entries.slice(0, 10).map((entry, index) => {
            const isTop3 = index < 3;
            const rankBg = index === 0 
              ? 'bg-amber-400 text-black font-black' 
              : index === 1 
              ? 'bg-slate-200 text-black font-black' 
              : index === 2 
              ? 'bg-amber-700 text-white font-black' 
              : 'bg-slate-800 text-slate-300';

            return (
              <div 
                key={entry.id}
                className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition ${
                  isTop3 
                    ? 'bg-[#131c42] border-amber-400/40 shadow-sm' 
                    : 'bg-[#0d1430] border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono ${rankBg}`}>
                    {index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-100">{entry.playerName}</span>
                      {index === 0 && <Award size={14} className="text-amber-400" />}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Ch {entry.chapter} • Val: {entry.valuation} • Mom: {entry.momentum.toFixed(2)}x • Verses: {entry.verses}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-black text-sm text-amber-300 font-mono block">
                    {entry.score.toLocaleString()}
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono">{entry.date}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-amber-400 text-black font-bold text-xs rounded-xl hover:bg-amber-300 transition cursor-pointer"
          >
            RETURN TO GAME
          </button>
        </div>
      </div>
    </div>
  );
};

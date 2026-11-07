import React, { useEffect, useState, useRef } from 'react';
import { soundEngine } from '../sound/audio';

interface QuickTimeVerseProps {
  onSuccess: () => void;
  onExpire: () => void;
}

export const QuickTimeVerse: React.FC<QuickTimeVerseProps> = ({ onSuccess, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState<number>(3.0);
  const [pressed, setPressed] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);
  const completedRef = useRef<boolean>(false);

  useEffect(() => {
    soundEngine.qteAlert();
    const startTime = performance.now();
    const duration = 3000; // 3 seconds

    const tick = (now: number) => {
      if (completedRef.current) return;
      const elapsed = now - startTime;
      const remaining = Math.max(0, (duration - elapsed) / 1000);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        completedRef.current = true;
        onExpire();
      } else {
        timerRef.current = requestAnimationFrame(tick);
      }
    };

    timerRef.current = requestAnimationFrame(tick);

    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleSmite();
      }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const handleSmite = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setPressed(true);
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    soundEngine.verse(4);
    setTimeout(() => {
      onSuccess();
    }, 400);
  };

  const progressPercent = Math.max(0, Math.min(100, (timeLeft / 3.0) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-gradient-to-b from-[#140b2a] to-[#070b1a] border-2 border-amber-400 rounded-3xl p-6 shadow-[0_0_40px_rgba(255,215,0,0.5)] text-center relative overflow-hidden">
        {/* Divine background rays */}
        <div className="absolute inset-0 bg-radial from-amber-400/20 via-transparent to-transparent pointer-events-none animate-pulse" />

        <div className="inline-block bg-amber-400/20 border border-amber-400 text-amber-300 font-mono font-bold text-xs px-3 py-1 rounded-full mb-2">
          ⚡ QUICK-TIME SCRIPTURE REFLEX (3 SECONDS)
        </div>

        <h2 className="text-2xl font-black text-amber-300 font-serif tracking-wider mb-2">
          PHILIPPIANS 4:13
        </h2>

        <p className="text-sm font-semibold text-slate-100 italic mb-4 leading-relaxed">
          &ldquo;I can do all things through Christ who strengthens me.&rdquo;
        </p>

        {/* Countdown gauge */}
        <div className="mb-5">
          <div className="flex justify-between text-xs font-mono font-bold text-amber-400 mb-1">
            <span>HOLY FOCUS WINDOW</span>
            <span>{timeLeft.toFixed(2)}s</span>
          </div>
          <div className="w-full h-3.5 bg-slate-900 rounded-full border border-amber-500/50 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 via-amber-300 to-amber-500 transition-all duration-75"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSmite}
          disabled={pressed}
          className={`w-full py-4 rounded-2xl font-black text-lg transition-all transform active:scale-95 cursor-pointer shadow-lg ${
            pressed 
              ? 'bg-amber-300 text-black scale-105' 
              : 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-black shadow-[0_0_25px_rgba(255,215,0,0.6)]'
          }`}
        >
          {pressed ? '✨ FAITH RELEASED!' : '🔥 SPEAK THE WORD & SMITE!'}
        </button>

        <p className="text-[11px] text-slate-400 mt-3 font-mono">
          Tap button or press SPACE to unleash 3.5x Divine Shield Shatter!
        </p>
      </div>
    </div>
  );
};

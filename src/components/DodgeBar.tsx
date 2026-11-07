import React, { useEffect, useState, useRef } from 'react';
import { soundEngine } from '../sound/audio';

interface DodgeBarProps {
  incomingDamage: number;
  onDodgeComplete: (result: 'PERFECT' | 'GOOD' | 'MISS', finalDamage: number, energyBonus: number) => void;
}

export const DodgeBar: React.FC<DodgeBarProps> = ({ incomingDamage, onDodgeComplete }) => {
  const [pos, setPos] = useState<number>(0); // 0 to 100
  const [direction, setDirection] = useState<number>(1);
  const [resolved, setResolved] = useState<'PERFECT' | 'GOOD' | 'MISS' | null>(null);
  const animRef = useRef<number | null>(null);
  const posRef = useRef<number>(0);
  const dirRef = useRef<number>(1);
  const resolvedRef = useRef<boolean>(false);

  // Sweet spot ranges (0 to 100)
  // Perfect: 44 to 56
  // Good: 30 to 44 and 56 to 70
  // Miss: < 30 or > 70
  const PERFECT_MIN = 44;
  const PERFECT_MAX = 56;
  const GOOD_MIN = 28;
  const GOOD_MAX = 72;

  useEffect(() => {
    let lastTime = performance.now();
    const speed = 0.14; // speed of moving cursor

    const loop = (time: number) => {
      if (resolvedRef.current) return;
      const dt = time - lastTime;
      lastTime = time;

      let nextPos = posRef.current + dirRef.current * speed * dt;
      if (nextPos >= 100) {
        nextPos = 100;
        dirRef.current = -1;
      } else if (nextPos <= 0) {
        nextPos = 0;
        dirRef.current = 1;
      }
      posRef.current = nextPos;
      setPos(nextPos);
      setDirection(dirRef.current);

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    // Auto timeout if player doesn't react after 3.2 seconds: default MISS
    const timeout = setTimeout(() => {
      if (!resolvedRef.current) {
        handleTrigger();
      }
    }, 3200);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleTrigger();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      clearTimeout(timeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleTrigger = () => {
    if (resolvedRef.current) return;
    resolvedRef.current = true;
    if (animRef.current) cancelAnimationFrame(animRef.current);

    const currentP = posRef.current;
    let res: 'PERFECT' | 'GOOD' | 'MISS' = 'MISS';
    let finalDmg = incomingDamage;
    let energyBonus = 0;

    if (currentP >= PERFECT_MIN && currentP <= PERFECT_MAX) {
      res = 'PERFECT';
      finalDmg = 0;
      energyBonus = 1;
      soundEngine.dodgePerfect();
    } else if (currentP >= GOOD_MIN && currentP <= GOOD_MAX) {
      res = 'GOOD';
      finalDmg = Math.round(incomingDamage * 0.5);
      energyBonus = 0;
      soundEngine.dodgeGood();
    } else {
      res = 'MISS';
      finalDmg = incomingDamage;
      energyBonus = 0;
      soundEngine.dodgeMiss();
    }

    setResolved(res);
    setTimeout(() => {
      onDodgeComplete(res, finalDmg, energyBonus);
    }, 850);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-[#0b1024] border-2 border-amber-500 rounded-2xl p-5 shadow-[0_0_35px_rgba(255,215,0,0.4)] text-center relative overflow-hidden">
        {/* Glow header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-bold tracking-wider text-red-400 animate-pulse">
            ⚠️ INCOMING ENEMY ATTACK ({incomingDamage} DMG)
          </span>
          <span className="text-xs font-mono text-cyan-300">PRESS SPACE / TAP</span>
        </div>

        <h3 className="text-xl font-black text-amber-300 font-serif mb-1 tracking-wide">
          REAL-TIME DODGE REFLEX
        </h3>
        <p className="text-xs text-slate-300 mb-4">
          Time the moving cursor inside the <span className="text-emerald-400 font-bold">PERFECT</span> gold zone to negate all damage and gain +1 Energy!
        </p>

        {/* Dodge Meter Track */}
        <div className="relative w-full h-10 bg-slate-950 rounded-xl border border-slate-700 overflow-hidden mb-4 shadow-inner">
          {/* Miss left zone */}
          <div className="absolute left-0 top-0 bottom-0 w-[28%] bg-red-950/50 border-r border-red-500/30 flex items-center justify-center text-[10px] text-red-400/70 font-mono">
            MISS
          </div>

          {/* Good left zone */}
          <div className="absolute left-[28%] top-0 bottom-0 w-[16%] bg-amber-500/20 border-r border-amber-400/40 flex items-center justify-center text-[10px] text-amber-300 font-bold">
            HALF
          </div>

          {/* PERFECT CENTER ZONE */}
          <div className="absolute left-[44%] top-0 bottom-0 w-[12%] bg-gradient-to-r from-emerald-500/80 via-amber-400/90 to-emerald-500/80 border-x-2 border-amber-200 shadow-[0_0_15px_#FFD700] flex items-center justify-center text-[11px] font-black text-black">
            PERFECT
          </div>

          {/* Good right zone */}
          <div className="absolute left-[56%] top-0 bottom-0 w-[16%] bg-amber-500/20 border-r border-amber-400/40 flex items-center justify-center text-[10px] text-amber-300 font-bold">
            HALF
          </div>

          {/* Miss right zone */}
          <div className="absolute right-0 top-0 bottom-0 w-[28%] bg-red-950/50 flex items-center justify-center text-[10px] text-red-400/70 font-mono">
            MISS
          </div>

          {/* The Moving Cursor */}
          <div 
            className="absolute top-0 bottom-0 w-2.5 bg-white shadow-[0_0_12px_#00E5FF] -translate-x-1/2 transition-transform pointer-events-none rounded-full"
            style={{ left: `${pos}%` }}
          >
            <div className="w-full h-full bg-cyan-400 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Action Button */}
        {!resolved ? (
          <button
            onClick={handleTrigger}
            className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-black font-black text-lg rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.5)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>⚡ DODGE NOW!</span>
            <span className="text-xs font-mono bg-black/20 px-2 py-0.5 rounded">SPACE</span>
          </button>
        ) : (
          <div className={`p-3 rounded-xl font-black text-base animate-bounce ${
            resolved === 'PERFECT' 
              ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300' 
              : resolved === 'GOOD' 
              ? 'bg-amber-500/20 border border-amber-400 text-amber-300' 
              : 'bg-red-500/20 border border-red-500 text-red-400'
          }`}>
            {resolved === 'PERFECT' && '✨ PERFECT DODGE! 0 DAMAGE & +1 ENERGY!'}
            {resolved === 'GOOD' && `🛡️ GOOD DODGE! HALF DAMAGE TAKEN (${Math.round(incomingDamage * 0.5)} DMG)`}
            {resolved === 'MISS' && `💥 MISS! FULL DAMAGE TAKEN (-${incomingDamage} DMG)`}
          </div>
        )}
      </div>
    </div>
  );
};

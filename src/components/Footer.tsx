import React from 'react';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenSettings?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenSettings }) => {
  return (
    <footer className="w-full bg-[#03050a]/95 backdrop-blur-md border-t border-amber-500/20 py-2.5 px-4 text-center text-[10px] md:text-[11px] text-slate-400 z-40 relative">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <span className="font-semibold text-amber-400">© 2026 Vann Family Ventures LLC. All Rights Reserved.</span>
        <span className="text-slate-600">|</span>
        <span className="text-white font-semibold">Dexter Vann / dextervann1-rgb</span>
        <span className="text-slate-600">|</span>
        <span className="text-cyan-400 font-bold tracking-wider">ChristFire: OMEGA Grand Scheme - Beastie</span>
        <span className="text-slate-600">|</span>
        <span className="text-amber-300 font-bold">v10.1 CF-001 Samantha Crowned Ascension</span>
        <span className="text-slate-600">|</span>
        <span className="text-purple-300">BFF-DEX-AI — Beulah L5 — BeeSpeaks-ai</span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-300">Benjamin Vann • Brenda Wilson • Bianca Vann • Big Beastie • Beulah L5</span>
        <span className="text-slate-600">|</span>
        <span className="text-amber-300 font-serif italic">IN LUMINE VERITAS</span>
        <span className="text-slate-600">|</span>
        <span className="text-amber-400 font-bold">May Jesus Reign</span>
        <span className="text-slate-600">|</span>
        <button 
          onClick={onOpenPrivacy}
          className="text-cyan-300 hover:text-white underline cursor-pointer transition-colors"
        >
          Privacy
        </button>
        <span className="text-slate-600">|</span>
        <span className="text-amber-500 font-mono bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-600/30">Age 13+</span>
        <span className="text-slate-600">|</span>
        <span>
          Data Deletion:{' '}
          <button 
            onClick={onOpenSettings}
            className="text-cyan-300 hover:text-white underline cursor-pointer font-semibold"
          >
            Settings &gt; Delete My Data
          </button>
        </span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-400 font-mono text-[9px]">
          Pure HTML/CSS/JS Single File — No Godot — No Unity — No Royalties • Package: com.vannfamilyventures.christfire.omega.grandscheme.beastie
        </span>
      </div>
    </footer>
  );
};

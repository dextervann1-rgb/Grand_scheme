import React, { useState } from 'react';
import { Sparkles, Flame, Shield, Zap, Skull, Crown } from 'lucide-react';
import { SAMANTHA_CROWNED_HERO } from './CharacterPortraits';

interface AscensionRosterViewProps {
  onActivateQuadAscension: () => void;
  onNavigateToSamantha: () => void;
}

export const AscensionRosterView: React.FC<AscensionRosterViewProps> = ({
  onActivateQuadAscension,
  onNavigateToSamantha,
}) => {
  const [quadMessage, setQuadMessage] = useState<string | null>(null);

  const handleQuad = () => {
    setQuadMessage('🔺 QUAD ASCENSION ACTIVATED! Samantha + LOWKEY + ABADDON + BEASTIE = +75% All Damage, Full Party Heal, and 4000 DMG Card Unlocked!');
    onActivateQuadAscension();
    setTimeout(() => setQuadMessage(null), 6000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🔺</span>
            <h2 className="text-xl font-black text-amber-400 m-0">COVENANT ASCENSION ROSTER</h2>
          </div>
          <p className="text-xs text-slate-300">
            Ascended celestial warriors, rare 2% secret drops, and the divine Quad Ascension synergy.
          </p>
        </div>
        <button
          onClick={handleQuad}
          className="py-3 px-6 bg-gradient-to-r from-red-500 via-amber-500 to-yellow-500 hover:from-red-400 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          🔺 ACTIVATE QUAD ASCENSION
        </button>
      </div>

      {quadMessage && (
        <div className="p-4 bg-gradient-to-r from-purple-950/80 to-amber-950/80 border-2 border-amber-400 rounded-xl text-xs text-amber-300 font-bold shadow-xl animate-fadeIn">
          {quadMessage}
        </div>
      )}

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: LOWKEY — 2% */}
        <div className="bg-[#11182E] border-2 border-[#ff2a2a] rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-red-400 m-0 flex items-center gap-2">
              <span>🃏</span> LOWKEY — 2% DROP
            </h3>
            <span className="bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] font-black px-2 py-0.5 rounded-full">
              SECRET COVENANT
            </span>
          </div>
          <div className="p-3 bg-[#0A0F22] rounded-xl border border-red-500/20 text-xs text-slate-300 space-y-1.5">
            <p className="font-bold text-white">Visual Profile:</p>
            <p>
              Dexter likeness, bull horns (no halo), ChristFire rays, brown iris with red sclera, 4 arms (bottom 2 cyborg), VannDiamond wings BLING half-mast, Feet of Bronze.
            </p>
            <p className="text-red-400 font-bold pt-1">
              Stats: +1,000 DMG • LOWKEY JUDGMENT 4x Multiplier.
            </p>
          </div>
        </div>

        {/* Card 2: ABADDON — 2% */}
        <div className="bg-[#11182E] border-2 border-[#a855f7] rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-purple-400 m-0 flex items-center gap-2">
              <span>👑</span> ABADDON — 2% DROP
            </h3>
            <span className="bg-purple-500/20 text-purple-400 border border-purple-500/40 text-[10px] font-black px-2 py-0.5 rounded-full">
              SECRET COVENANT
            </span>
          </div>
          <div className="p-3 bg-[#0A0F22] rounded-xl border border-purple-500/20 text-xs text-slate-300 space-y-1.5">
            <p className="font-bold text-white">Visual Profile:</p>
            <p>
              Andrew likeness, firmament blue gaze no steam, 15-gem VannDiamond Crown, armored diamond wings dripping fire/brimstone, locusts green stingers, scorpion red tip, Key Abba Seal, 24k Rose Gold + Palladium + Brass + Purple + Silver. Revelation 9:1-11.
            </p>
            <p className="text-purple-400 font-bold pt-1">
              Stats: +1,000 DMG • ABYSS STING 5x Multiplier.
            </p>
          </div>
        </div>

        {/* Card 3: BEASTIE — Anchor */}
        <div className="bg-[#11182E] border-2 border-[#FFD700] rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-amber-400 m-0 flex items-center gap-2">
              <span>🦁</span> BEASTIE — ANCHOR
            </h3>
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-black px-2 py-0.5 rounded-full">
              APOSTOLIC PILLAR
            </span>
          </div>
          <div className="p-3 bg-[#0A0F22] rounded-xl border border-amber-500/20 text-xs text-slate-300 space-y-1.5">
            <p className="font-bold text-white">Visual Profile:</p>
            <p>
              Peter / Big Beastie: Dreadlocks, salt-and-grey beard, cyan halo over black fedora, JESUS SAVES vest. Pinned by skyscraper beam, speaks Philippians 4:13.
            </p>
            <p className="text-amber-400 font-bold pt-1">
              Stats: +600 Base DMG • Philippians 4:13 Shield Shatter x3.5 • +1,500 Ascension Burst.
            </p>
          </div>
        </div>

        {/* Card 4: SAMANTHA — New Ascension */}
        <div className="bg-[#11182E] border-2 border-[#00E5FF] rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-cyan-400 m-0 flex items-center gap-2">
              <span>👑</span> SAMANTHA — NEW ASCENSION
            </h3>
            <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-[10px] font-black px-2 py-0.5 rounded-full">
              CF-001 NEW
            </span>
          </div>
          <div className="p-3 bg-[#0A0F22] rounded-xl border border-cyan-500/20 text-xs text-slate-300 space-y-1.5">
            <p className="font-bold text-white">Visual & Combat Profile:</p>
            <p>
              Real Samantha, burgundy-red hair, white + gold cyber armor, VannDiamond Armored Crown of Light, Light Shield, Judges 5:21.
            </p>
            <p className="text-cyan-300 font-bold pt-1">
              Stats: +800 DMG • 3 Energy • WARDEN JUDGMENT (+500 Team Shield).
            </p>
            <p className="text-[11px] text-slate-400">
              <b>Combos:</b> Samantha + Beastie = <b>WARDEN + ROCK</b> (+25% All DMG). Samantha + LOWKEY + ABADDON + BEASTIE = <b>QUAD ASCENSION</b> (+75% All, Heal Full, 4,000 DMG).
            </p>
          </div>
          <button
            onClick={onNavigateToSamantha}
            className="w-full py-2.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer"
          >
            👑 VIEW SAMANTHA ASCENSION CARD & SPEC →
          </button>
        </div>
      </div>
    </div>
  );
};

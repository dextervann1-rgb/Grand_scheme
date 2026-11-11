import React, { useState } from 'react';
import { Sparkles, Flame, Shield, Zap, Skull, Crown } from 'lucide-react';
import { SAMANTHA_CROWNED_HERO } from './CharacterPortraits';

interface AscensionRosterViewProps {
  onActivateQuadAscension: () => void;
  onNavigateToSamantha: () => void;
  onNavigateToJohn: () => void;
}

export const AscensionRosterView: React.FC<AscensionRosterViewProps> = ({
  onActivateQuadAscension,
  onNavigateToSamantha,
  onNavigateToJohn,
}) => {
  const [synergyMessage, setSynergyMessage] = useState<string | null>(null);

  const handleStorm = () => {
    setSynergyMessage('⚡ STORM ASCENSION ACTIVATED! LOWKEY + ABADDON + BEASTIE + SAMANTHA + JOHN = +100% All Stats, Full Party Heal, and 5000 DMG Card Unlocked! Mark 3:17!');
    onActivateQuadAscension();
    setTimeout(() => setSynergyMessage(null), 6000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-6">
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🔺</span>
            <h2 className="text-xl font-black text-amber-400 m-0">COVENANT ASCENSION ROSTER</h2>
          </div>
          <p className="text-xs text-slate-300 m-0">
            Ascended celestial warriors, rare 2% secret drops, and the divine 5-Card Storm Ascension synergy.
          </p>
        </div>
        <button
          onClick={handleStorm}
          className="py-3 px-6 bg-gradient-to-r from-cyan-400 via-amber-400 to-yellow-400 hover:from-cyan-300 hover:to-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          ⚡ ACTIVATE STORM ASCENSION (5-CARD)
        </button>
      </div>

      {synergyMessage && (
        <div className="p-4 bg-gradient-to-r from-cyan-950/90 to-amber-950/90 border-2 border-cyan-400 rounded-xl text-xs text-cyan-300 font-bold shadow-xl animate-fadeIn">
          {synergyMessage}
        </div>
      )}

      {/* Grid of Ascensions */}
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

        {/* Card 3: SAMANTHA — v10.1 */}
        <div className="bg-[#11182E] border-2 border-[#FFD700] rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-amber-400 m-0 flex items-center gap-2">
              <span>👑</span> SAMANTHA — v10.1 DONE
            </h3>
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-black px-2 py-0.5 rounded-full">
              CF-001 COVENANT
            </span>
          </div>
          <div className="p-3 bg-[#0A0F22] rounded-xl border border-amber-500/20 text-xs text-slate-300 space-y-1.5">
            <p className="font-bold text-white">Visual & Combat Profile:</p>
            <p>
              Real Samantha, burgundy-red hair, white + gold cyber armor, VannDiamond Armored Crown of Light, Light Shield, Judges 5:21.
            </p>
            <p className="text-amber-300 font-bold pt-1">
              Stats: +800 DMG • 3 Energy • WARDEN JUDGMENT (Shield +500, shatter 400).
            </p>
          </div>
          <button
            onClick={onNavigateToSamantha}
            className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer"
          >
            👑 VIEW SAMANTHA ASCENSION →
          </button>
        </div>

        {/* Card 4: JOHN THUNDER — NEW v10.2 */}
        <div className="bg-[#11182E] border-2 border-[#00E5FF] rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-cyan-400 m-0 flex items-center gap-2">
              <span>⚡</span> JOHN THUNDER — NEW v10.2
            </h3>
            <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-[10px] font-black px-2 py-0.5 rounded-full">
              CF-002 NEW
            </span>
          </div>
          <div className="p-3 bg-[#0A0F22] rounded-xl border border-cyan-500/20 text-xs text-slate-300 space-y-1.5">
            <p className="font-bold text-white">Visual & Combat Profile:</p>
            <p>
              John Boanerges, deep blue + gold thunder robes, lightning seams, twin lightning bolts, storm wings. Mark 3:17.
            </p>
            <p className="text-cyan-300 font-bold pt-1">
              Stats: +700 DMG • 3 Energy • THUNDER REVEAL (Stun ALL 1 turn, reveals Phantasm +50% DMG).
            </p>
            <p className="text-[11px] text-slate-400">
              <b>Combos:</b> John + Samantha = <b>THUNDER + WARDEN</b> (Shield +500 + Stun + Reveal). 5-Card = <b>STORM ASCENSION</b> (+100% all, heal full, 5000 DMG).
            </p>
          </div>
          <button
            onClick={onNavigateToJohn}
            className="w-full py-2.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer"
          >
            ⚡ VIEW JOHN THUNDER ASCENSION →
          </button>
        </div>
      </div>
    </div>
  );
};

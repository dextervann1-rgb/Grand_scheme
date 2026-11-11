import React, { useState } from 'react';
import { Sparkles, Flame, Shield, Zap, Skull, Crown, Link2Off } from 'lucide-react';
import { SAMANTHA_CROWNED_HERO } from './CharacterPortraits';

interface AscensionRosterViewProps {
  onActivateQuadAscension: () => void;
  onNavigateToSamantha: () => void;
  onNavigateToJohn: () => void;
  onNavigateToSilas: () => void;
  onNavigateToOverlord: () => void;
}

export const AscensionRosterView: React.FC<AscensionRosterViewProps> = ({
  onActivateQuadAscension,
  onNavigateToSamantha,
  onNavigateToJohn,
  onNavigateToSilas,
  onNavigateToOverlord,
}) => {
  const [synergyMessage, setSynergyMessage] = useState<string | null>(null);

  const handleOmega = () => {
    setSynergyMessage('🔺 OMEGA ASCENSION ACTIVATED! LOWKEY + ABADDON + BEASTIE + SAMANTHA + JOHN + SILAS + OVERLORD = +150% All Stats, Full Party Heal, Cleanse All CC, and 8000 DMG Card Unlocked! Revelation 19:16!');
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
            Ascended celestial warriors, rare 2% secret drops, and the divine 7-Card Omega Ascension synergy.
          </p>
        </div>
        <button
          onClick={handleOmega}
          className="py-3 px-6 bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 hover:from-red-500 hover:to-orange-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          🔺 ACTIVATE OMEGA ASCENSION (7-CARD • 8000 DMG)
        </button>
      </div>

      {synergyMessage && (
        <div className="p-4 bg-gradient-to-r from-red-950/90 to-amber-950/90 border-2 border-red-500 rounded-xl text-xs text-amber-300 font-bold shadow-xl animate-fadeIn">
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
              Stats: +800 DMG • WARDEN JUDGMENT (Shield +500, shatter 400).
            </p>
          </div>
          <button
            onClick={onNavigateToSamantha}
            className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer"
          >
            👑 VIEW SAMANTHA ASCENSION →
          </button>
        </div>

        {/* Card 4: JOHN THUNDER — v10.2 */}
        <div className="bg-[#11182E] border-2 border-[#00E5FF] rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-cyan-400 m-0 flex items-center gap-2">
              <span>⚡</span> JOHN THUNDER — v10.2 DONE
            </h3>
            <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-[10px] font-black px-2 py-0.5 rounded-full">
              CF-002 COVENANT
            </span>
          </div>
          <div className="p-3 bg-[#0A0F22] rounded-xl border border-cyan-500/20 text-xs text-slate-300 space-y-1.5">
            <p className="font-bold text-white">Visual & Combat Profile:</p>
            <p>
              John Boanerges, deep blue + gold thunder robes, lightning seams, twin lightning bolts, storm wings. Mark 3:17.
            </p>
            <p className="text-cyan-300 font-bold pt-1">
              Stats: +700 DMG • THUNDER REVEAL (Reveals Phantasm, stuns all).
            </p>
          </div>
          <button
            onClick={onNavigateToJohn}
            className="w-full py-2.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer"
          >
            ⚡ VIEW JOHN THUNDER ASCENSION →
          </button>
        </div>

        {/* Card 5: SILAS UNCHAINED — NEW v10.3 */}
        <div className="bg-[#11182E] border-2 border-[#f97316] rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-orange-400 m-0 flex items-center gap-2">
              <span>⛓️</span> SILAS — NEW v10.3
            </h3>
            <span className="bg-orange-500/20 text-orange-400 border border-orange-500/40 text-[10px] font-black px-2 py-0.5 rounded-full">
              CF-003 NEW
            </span>
          </div>
          <div className="p-3 bg-[#0A0F22] rounded-xl border border-orange-500/20 text-xs text-slate-300 space-y-1.5">
            <p className="font-bold text-white">Visual & Combat Profile:</p>
            <p>
              Silas Unchained, shattered iron shackles, torn prison robes, holy earthquake fissures. Acts 16:26.
            </p>
            <p className="text-orange-400 font-bold pt-1">
              Stats: +650 DMG • 3 Energy • CHAIN BREAKER.
            </p>
            <p className="text-[11px] text-slate-400">
              <b>Combos:</b> Silas + John = <b>CHAIN + THUNDER</b> (Breaks all CC, paralyzes phantom 2 turns, reveals + stuns).
            </p>
          </div>
          <button
            onClick={onNavigateToSilas}
            className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer"
          >
            ⛓️ VIEW SILAS UNCHAINED →
          </button>
        </div>

        {/* Card 6: OVERLORD REDEEMED — NEW v10.4 */}
        <div className="bg-[#11182E] border-2 border-[#dc2626] rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-red-400 m-0 flex items-center gap-2">
              <span>👹</span> OVERLORD — NEW v10.4
            </h3>
            <span className="bg-red-600/20 text-red-400 border border-red-500/40 text-[10px] font-black px-2 py-0.5 rounded-full">
              CF-004 MYTHIC
            </span>
          </div>
          <div className="p-3 bg-[#0A0F22] rounded-xl border border-red-500/20 text-xs text-slate-300 space-y-1.5">
            <p className="font-bold text-white">Visual & Combat Profile:</p>
            <p>
              Overlord Redeemed, black + crimson plate cracked by gold light, Redeemed Blade glowing gold, kneeling before King of Kings. Revelation 19:16.
            </p>
            <p className="text-red-400 font-bold pt-1">
              Stats: +1200 DMG • 4 Energy • OVERLORD CRUSH (Ignores 50% shield) • Tanks 50% team damage 2 turns.
            </p>
            <p className="text-[11px] text-slate-400">
              <b>Combos:</b> Overlord + Beastie = <b>BOSS + ROCK</b> (+40% all DMG, Overlord tanks 50%).
            </p>
          </div>
          <button
            onClick={onNavigateToOverlord}
            className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer shadow"
          >
            👹 VIEW OVERLORD PLAYABLE →
          </button>
        </div>

        {/* Card 7: 7-CARD OMEGA ASCENSION */}
        <div className="bg-[#11182E] border-2 border-[#eab308] rounded-2xl p-5 shadow-xl space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-amber-300 m-0 flex items-center gap-2">
                <span>🔺</span> 7-CARD OMEGA ASCENSION
              </h3>
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-black px-2 py-0.5 rounded-full">
                7-CARD ULTIMATE
              </span>
            </div>
            <div className="p-3 bg-[#0A0F22] rounded-xl border border-amber-500/20 text-xs text-slate-300 space-y-1.5 mt-3">
              <p className="font-bold text-white">Ultimate Team Synergy:</p>
              <p>
                LOWKEY + ABADDON + BEASTIE + SAMANTHA + JOHN + SILAS + OVERLORD.
              </p>
              <p className="text-amber-300 font-bold pt-1">
                Effect: +150% all stats, heal party full, cleanse all CC, 8000 DMG ultimate card — Absolute pinnacle in the entire game.
              </p>
            </div>
          </div>
          <button
            onClick={handleOmega}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 hover:from-red-500 hover:to-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer shadow"
          >
            🔺 ACTIVATE OMEGA ASCENSION (8000 DMG)
          </button>
        </div>
      </div>
    </div>
  );
};

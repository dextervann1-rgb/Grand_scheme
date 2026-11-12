import React, { useState } from 'react';
import { Sparkles, Flame, Shield, Zap, Skull, Crown, Link2Off } from 'lucide-react';
import { 
  SAMANTHA_CROWNED_HERO,
  LOWKEY_NEMESIS_IMG,
  ABADDON_NEMESIS_IMG,
  JOHN_THUNDER_IMG,
  SILAS_UNCHAINED_IMG,
  OVERLORD_REDEEMED_IMG,
  PHANTASM_ASCENSION_IMG
} from './CharacterPortraits';

interface AscensionRosterViewProps {
  onActivateQuadAscension: () => void;
  onNavigateToSamantha: () => void;
  onNavigateToJohn: () => void;
  onNavigateToSilas: () => void;
  onNavigateToOverlord: () => void;
  onNavigateToPhantasm: () => void;
  onNavigateToNemesis?: () => void;
}

export const AscensionRosterView: React.FC<AscensionRosterViewProps> = ({
  onActivateQuadAscension,
  onNavigateToSamantha,
  onNavigateToJohn,
  onNavigateToSilas,
  onNavigateToOverlord,
  onNavigateToPhantasm,
  onNavigateToNemesis,
}) => {
  const [synergyMessage, setSynergyMessage] = useState<string | null>(null);

  const handleGrandScheme = () => {
    setSynergyMessage('🔺 GRAND SCHEME ASCENSION ACTIVATED! LOWKEY + ABADDON + BEASTIE + SAMANTHA + JOHN + SILAS + OVERLORD + PHANTASM = +175% All Stats, Full Party Heal, Cleanse All CC, Team Stealth 1 Turn, and 10,000 DMG Card Unlocked! 1 John 4:4 • Revelation 19:16!');
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
            Ascended celestial warriors, rare 2% secret drops, redeemed boss allies, and the 8-Card Grand Scheme Ascension.
          </p>
        </div>
        <button
          onClick={handleGrandScheme}
          className="py-3 px-6 bg-gradient-to-r from-purple-600 via-red-600 to-amber-400 hover:from-purple-500 hover:to-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          🔺 ACTIVATE GRAND SCHEME ASCENSION (8-CARD • 10000 DMG)
        </button>
      </div>

      {synergyMessage && (
        <div className="p-4 bg-gradient-to-r from-purple-950/90 to-amber-950/90 border-2 border-purple-500 rounded-xl text-xs text-amber-300 font-bold shadow-xl animate-fadeIn">
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
              CF-007 LOCKED ART
            </span>
          </div>
          <div className="p-3 bg-[#0A0F22] rounded-xl border border-red-500/20 text-xs text-slate-300 flex items-start gap-3">
            <img
              src={LOWKEY_NEMESIS_IMG}
              alt="LOWKEY"
              className="w-20 h-28 rounded-lg object-contain bg-[#05070F] border border-red-500/60 shrink-0 shadow"
            />
            <div className="space-y-1.5">
              <p className="font-bold text-white m-0">Visual Profile:</p>
              <p className="m-0">
                Dexter likeness, bull horns (no halo), ChristFire rays, brown iris with red sclera, 4 arms (bottom 2 cyborg), VannDiamond wings BLING half-mast, Feet of Bronze.
              </p>
              <p className="text-red-400 font-bold pt-1 m-0">
                Stats: +1,000 DMG • LOWKEY JUDGMENT 4x Multiplier • Nemesis Pair Synergy.
              </p>
            </div>
          </div>
          {onNavigateToNemesis && (
            <button
              onClick={onNavigateToNemesis}
              className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer shadow"
            >
              🃏 VIEW LOWKEY ART & PROMPTS (CF-007) →
            </button>
          )}
        </div>

        {/* Card 2: ABADDON — 2% */}
        <div className="bg-[#11182E] border-2 border-[#a855f7] rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-purple-400 m-0 flex items-center gap-2">
              <span>👑</span> ABADDON — 2% DROP
            </h3>
            <span className="bg-purple-500/20 text-purple-400 border border-purple-500/40 text-[10px] font-black px-2 py-0.5 rounded-full">
              CF-007 LOCKED ART
            </span>
          </div>
          <div className="p-3 bg-[#0A0F22] rounded-xl border border-purple-500/20 text-xs text-slate-300 flex items-start gap-3">
            <img
              src={ABADDON_NEMESIS_IMG}
              alt="ABADDON"
              className="w-20 h-28 rounded-lg object-contain bg-[#05070F] border border-purple-500/60 shrink-0 shadow"
            />
            <div className="space-y-1.5">
              <p className="font-bold text-white m-0">Visual Profile:</p>
              <p className="m-0">
                Andrew likeness, firmament blue gaze, 15-gem VannDiamond Crown, armored diamond wings dripping fire/brimstone, locusts green stingers, scorpion red tip, Key Abba Seal, 24k Rose Gold + Palladium + Brass + Purple + Silver. Revelation 9:1-11.
              </p>
              <p className="text-purple-400 font-bold pt-1 m-0">
                Stats: +1,000 DMG • ABYSS STING 5x Multiplier • Nemesis Pair Synergy.
              </p>
            </div>
          </div>
          {onNavigateToNemesis && (
            <button
              onClick={onNavigateToNemesis}
              className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer shadow"
            >
              👑 VIEW ABADDON ART & PROMPTS (CF-007) →
            </button>
          )}
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
          <div className="p-3 bg-[#0A0F22] rounded-xl border border-amber-500/20 text-xs text-slate-300 flex items-start gap-3">
            <img
              src={SAMANTHA_CROWNED_HERO}
              alt="Samantha Crowned"
              className="w-20 h-28 rounded-lg object-contain bg-[#05070F] border border-amber-400/60 shrink-0 shadow"
            />
            <div className="space-y-1.5">
              <p className="font-bold text-white m-0">Visual & Combat Profile:</p>
              <p className="m-0">
                Real Samantha, burgundy-red hair, white + gold cyber armor, VannDiamond Armored Crown of Light, Light Shield, Judges 5:21.
              </p>
              <p className="text-amber-300 font-bold pt-1 m-0">
                Stats: +800 DMG • WARDEN JUDGMENT (Shield +500, shatter 400).
              </p>
            </div>
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
          <div className="p-3 bg-[#0A0F22] rounded-xl border border-cyan-500/20 text-xs text-slate-300 flex items-start gap-3">
            <img
              src={JOHN_THUNDER_IMG}
              alt="John Thunder Ascension"
              className="w-20 h-28 rounded-lg object-contain bg-[#05070F] border border-cyan-400/60 shrink-0 shadow"
            />
            <div className="space-y-1.5">
              <p className="font-bold text-white m-0">Visual & Combat Profile:</p>
              <p className="m-0">
                John Boanerges, deep blue + gold thunder robes, lightning seams, twin lightning bolts, storm wings. Mark 3:17.
              </p>
              <p className="text-cyan-300 font-bold pt-1 m-0">
                Stats: +700 DMG • THUNDER REVEAL (Reveals Phantasm, stuns all).
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToJohn}
            className="w-full py-2.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer"
          >
            ⚡ VIEW JOHN THUNDER ASCENSION →
          </button>
        </div>

        {/* Card 5: SILAS UNCHAINED — v10.3 */}
        <div className="bg-[#11182E] border-2 border-[#f97316] rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-orange-400 m-0 flex items-center gap-2">
              <span>⛓️</span> SILAS — v10.3 DONE
            </h3>
            <span className="bg-orange-500/20 text-orange-400 border border-orange-500/40 text-[10px] font-black px-2 py-0.5 rounded-full">
              CF-003 COVENANT
            </span>
          </div>
          <div className="p-3 bg-[#0A0F22] rounded-xl border border-orange-500/20 text-xs text-slate-300 flex items-start gap-3">
            <img
              src={SILAS_UNCHAINED_IMG}
              alt="Silas Unchained"
              className="w-20 h-28 rounded-lg object-contain bg-[#05070F] border border-orange-500/60 shrink-0 shadow"
            />
            <div className="space-y-1.5">
              <p className="font-bold text-white m-0">Visual & Combat Profile:</p>
              <p className="m-0">
                Silas Unchained, shattered iron shackles, torn prison robes, holy earthquake fissures. Acts 16:26.
              </p>
              <p className="text-orange-400 font-bold pt-1 m-0">
                Stats: +650 DMG • 3 Energy • CHAIN BREAKER.
              </p>
              <p className="text-[11px] text-slate-400 m-0">
                <b>Combos:</b> Silas + John = <b>CHAIN + THUNDER</b> (Breaks all CC, paralyzes phantom 2 turns, reveals + stuns).
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToSilas}
            className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer"
          >
            ⛓️ VIEW SILAS UNCHAINED →
          </button>
        </div>

        {/* Card 6: OVERLORD REDEEMED — v10.4 */}
        <div className="bg-[#11182E] border-2 border-[#dc2626] rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-red-400 m-0 flex items-center gap-2">
              <span>👹</span> OVERLORD — v10.4 DONE
            </h3>
            <span className="bg-red-600/20 text-red-400 border border-red-500/40 text-[10px] font-black px-2 py-0.5 rounded-full">
              CF-004 MYTHIC
            </span>
          </div>
          <div className="p-3 bg-[#0A0F22] rounded-xl border border-red-500/20 text-xs text-slate-300 flex items-start gap-3">
            <img
              src={OVERLORD_REDEEMED_IMG}
              alt="Overlord Redeemed"
              className="w-20 h-28 rounded-lg object-contain bg-[#05070F] border border-red-500/60 shrink-0 shadow"
            />
            <div className="space-y-1.5">
              <p className="font-bold text-white m-0">Visual & Combat Profile:</p>
              <p className="m-0">
                Overlord Redeemed, black + crimson plate cracked by gold light, Redeemed Blade glowing gold, kneeling before King of Kings. Revelation 19:16.
              </p>
              <p className="text-red-400 font-bold pt-1 m-0">
                Stats: +1200 DMG • 4 Energy • OVERLORD CRUSH (Ignores 50% shield) • Tanks 50% team damage 2 turns.
              </p>
              <p className="text-[11px] text-slate-400 m-0">
                <b>Combos:</b> Overlord + Beastie = <b>BOSS + ROCK</b> (+40% all DMG, Overlord tanks 50%).
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToOverlord}
            className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer shadow"
          >
            👹 VIEW OVERLORD PLAYABLE →
          </button>
        </div>

        {/* Card 7: PHANTASM REDEEMED — NEW v10.5 */}
        <div className="bg-[#11182E] border-2 border-[#a855f7] rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-purple-300 m-0 flex items-center gap-2">
              <span>👻</span> PHANTASM — NEW v10.5
            </h3>
            <span className="bg-purple-600/20 text-purple-300 border border-purple-500/40 text-[10px] font-black px-2 py-0.5 rounded-full">
              CF-005 MYTHIC
            </span>
          </div>
          <div className="p-3 bg-[#0A0F22] rounded-xl border border-purple-500/20 text-xs text-slate-300 flex items-start gap-3">
            <img
              src={PHANTASM_ASCENSION_IMG}
              alt="Phantasm Redeemed"
              className="w-20 h-28 rounded-lg object-contain bg-[#05070F] border border-purple-500/60 shrink-0 shadow"
            />
            <div className="space-y-1.5">
              <p className="font-bold text-white m-0">Visual & Combat Profile:</p>
              <p className="m-0">
                Phantasm Redeemed, veil lifted, eyes glowing celestial gold, shadow robes turning to radiant white and gold. 1 John 4:4.
              </p>
              <p className="text-purple-300 font-bold pt-1 m-0">
                Stats: +900 DMG • 3 Energy • PHANTASM GLIDE (Ignores 100% shield) • Stealth team 1 turn.
              </p>
              <p className="text-[11px] text-slate-400 m-0">
                <b>Combos:</b> Phantasm + John = <b>SHADOW + THUNDER</b> (+60% DMG to revealed enemies).
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToPhantasm}
            className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer shadow"
          >
            👻 VIEW PHANTASM PLAYABLE →
          </button>
        </div>

        {/* Card 8: 8-CARD GRAND SCHEME ASCENSION */}
        <div className="bg-[#11182E] border-2 border-[#eab308] rounded-2xl p-5 shadow-xl space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-amber-300 m-0 flex items-center gap-2">
                <span>🔺</span> 8-CARD GRAND SCHEME ASCENSION
              </h3>
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-black px-2 py-0.5 rounded-full">
                8-CARD ULTIMATE
              </span>
            </div>
            <div className="p-3 bg-[#0A0F22] rounded-xl border border-amber-500/20 text-xs text-slate-300 space-y-1.5 mt-3">
              <p className="font-bold text-white">Ultimate Team Synergy:</p>
              <p>
                LOWKEY + ABADDON + BEASTIE + SAMANTHA + JOHN + SILAS + OVERLORD + PHANTASM.
              </p>
              <p className="text-amber-300 font-bold pt-1">
                Effect: +175% all stats, heal party full, cleanse all CC, stealth whole team 1 turn, 10,000 DMG ultimate card!
              </p>
            </div>
          </div>
          <button
            onClick={handleGrandScheme}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 via-red-600 to-amber-400 hover:from-purple-500 hover:to-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer shadow"
          >
            🔺 ACTIVATE GRAND SCHEME ASCENSION (10,000 DMG)
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Sparkles, Shield, CheckCircle2, Flame, Sword, Crown, Trophy } from 'lucide-react';

interface OverlordAscensionViewProps {
  onAddOverlord: () => void;
  onSimulateBeatOverlord: () => void;
  hasOverlord: boolean;
  overlordUnlocked: boolean;
  onNavigateToBattle: () => void;
}

export const OverlordAscensionView: React.FC<OverlordAscensionViewProps> = ({
  onAddOverlord,
  onSimulateBeatOverlord,
  hasOverlord,
  overlordUnlocked,
  onNavigateToBattle,
}) => {
  const [customVerse, setCustomVerse] = useState<string>('');
  const [verseApplied, setVerseApplied] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleApplyVerse = () => {
    if (!customVerse.trim()) return;
    setVerseApplied(true);
    setFeedback(`👹 Custom scripture attached: "${customVerse}". +200 Power added (Total: 1400 DMG), Gold Frame active, Trade value x3!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-6">
      {/* Primary Showcase Card */}
      <div className="bg-[#11182E] border-2 border-red-600 rounded-2xl p-6 shadow-2xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500 text-red-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-2">
            <span>👹</span> CF-004 OVERLORD PLAYABLE ASCENSION — v10.4
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-red-400 tracking-wider m-0">
            OVERLORD REDEEMED — PLAYABLE ASCENSION CARD
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            <span className="bg-red-600 text-white font-black text-xs px-3 py-0.5 rounded-full shadow">
              BOSS REDEEMED • MYTHIC
            </span>
            <span className="bg-purple-700 text-white font-extrabold text-xs px-3 py-0.5 rounded-full shadow">
              CHAPTER 3 BOSS → ALLY
            </span>
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-0.5 rounded-full shadow">
              REVELATION 19:16
            </span>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Art Spec */}
          <div className="bg-[#0A0F22] border border-red-600/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-xl">🎨</span>
              <h3 className="font-black text-red-400 text-base m-0">ART SPEC — LOCKED (Art Agent)</h3>
            </div>

            {/* Visual Portrait Card */}
            <div className="bg-gradient-to-b from-[#2a0e0e] to-[#0c0505] border-2 border-red-500/70 rounded-xl p-4 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-bl-lg">
                OVERLORD CRUSH
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-red-950/80 border-2 border-red-500 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(220,38,38,0.5)] shrink-0">
                  👹
                </div>
                <div>
                  <h4 className="text-amber-300 font-serif font-black text-lg m-0">
                    Overlord Redeemed
                  </h4>
                  <p className="text-red-300 text-xs font-mono font-bold m-0">
                    Cracked Armor • Gold Light • Redeemed Blade
                  </p>
                  <p className="text-slate-400 text-[11px] mt-1 m-0">
                    Once Chapter 3 arch-boss, now kneeling before the King of Kings, rising as humanity’s most devastating frontline tank.
                  </p>
                </div>
              </div>
            </div>

            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li><b>Face:</b> Overlord — dark crown cracked, eyes shifting from fiery red to sacred gold (redeemed).</li>
              <li><b>Armor:</b> Heavy black + crimson plate, fractured by golden ChristFire radiance, divine gold veins spreading across the cuirass.</li>
              <li><b>Cape:</b> Battle-torn black cape with gold silk trim and a gleaming VannDiamond clasp.</li>
              <li><b>Weapon:</b> Massive two-handed greatsword, dark steel with its tip blazing in golden holy fire — the Redeemed Blade.</li>
              <li><b>Background:</b> Gloom throne room collapsing in ruin as divine celestial light breaks through the dome.</li>
              <li><b>Pose:</b> Kneeling then rising — sword planted firmly, head bowed in honor to Beastie, then standing shoulder-to-shoulder as allied guardian.</li>
              <li><b>Key Art Rule:</b> Overlord must appear <b>GENUINELY REDEEMED</b> — not evil. Holy gold light cracking through shadow iron. He is no longer the destroyer, he is the shield.</li>
            </ul>
          </div>

          {/* Column 2: Stats + Ability */}
          <div className="bg-[#0A0F22] border border-amber-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-xl">⚖️</span>
              <h3 className="font-black text-amber-400 text-base m-0">STATS + ABILITY — LOCKED (Balance Agent)</h3>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-[#11182E] p-2 rounded-lg border border-red-500/40">
                <span className="text-slate-400 block text-[10px]">POWER</span>
                <span className="font-black text-red-400 text-sm">
                  {verseApplied ? '+1400 DMG' : '+1200 DMG'}
                </span>
              </div>
              <div className="bg-[#11182E] p-2 rounded-lg border border-amber-500/30">
                <span className="text-slate-400 block text-[10px]">ENERGY</span>
                <span className="font-black text-amber-300 text-sm">4 ENERGY</span>
              </div>
              <div className="bg-[#11182E] p-2 rounded-lg border border-emerald-500/30">
                <span className="text-slate-400 block text-[10px]">TANK BUFF</span>
                <span className="font-black text-emerald-400 text-sm">50% TANK 2T</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p className="font-bold text-white flex items-center gap-1.5 m-0">
                <Sword size={14} className="text-red-400" />
                <span>Ability: OVERLORD CRUSH</span>
              </p>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-300 text-[11px] leading-relaxed">
                <li>
                  <b className="text-red-400">1. CRUSH 1200 DMG:</b> Single target devastating strike that <b>ignores 50% of boss shield</b> and deals piercing damage directly to boss HP!
                </li>
                <li>
                  <b className="text-amber-400">2. TANK 50%:</b> Overlord intercepts and absorbs 50% of all incoming combat damage meant for your team for 2 consecutive turns.
                </li>
                <li>
                  <b className="text-cyan-300">3. BOSS + ROCK COMBO:</b> If Beastie is on your team, triggers <b>+40% all damage</b> while Overlord tanks 50% incoming damage.
                </li>
                <li>
                  <b className="text-purple-400">4. 7-CARD OMEGA ASCENSION:</b> LOWKEY + ABADDON + BEASTIE + SAMANTHA + JOHN + SILAS + OVERLORD = <b>+150% all stats, full heal, cleanse all CC, 8000 DMG ultimate card</b> (the ultimate power in the game).
                </li>
              </ul>
            </div>

            <div className="bg-[#11182E] p-3 rounded-lg border border-slate-700 text-xs">
              <span className="text-amber-400 font-bold block mb-0.5">📖 Revelation 19:16 Scripture:</span>
              <p className="text-slate-300 italic text-[11px] m-0">
                “On his robe and on his thigh he has this name written: KING OF KINGS AND LORD OF LORDS.” — Overlord bows to the true King.
              </p>
            </div>

            {/* Custom Verse Input */}
            <div className="bg-[#11182E] p-3 rounded-xl border border-red-500/40 space-y-2">
              <span className="text-xs font-bold text-red-300 flex items-center gap-1">
                <Sparkles size={13} className="text-amber-400" />
                <span>Attach Custom Scripture:</span>
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Isaiah 54:17 — No weapon formed against you shall prosper"
                  value={customVerse}
                  onChange={(e) => setCustomVerse(e.target.value)}
                  className="flex-1 bg-[#0A0F22] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
                <button
                  onClick={handleApplyVerse}
                  className="bg-red-600 hover:bg-red-500 text-white font-black text-xs px-3 py-1.5 rounded-lg cursor-pointer transition"
                >
                  ATTACH
                </button>
              </div>
              {feedback && (
                <p className="text-[11px] text-amber-300 font-semibold m-0">{feedback}</p>
              )}
            </div>
          </div>
        </div>

        {/* Unlock Rules & Demo Action Buttons */}
        <div className="mt-6 pt-5 border-t border-slate-800 text-center space-y-3">
          <p className="text-slate-400 text-xs m-0">
            <b>🔒 Unlock Rule:</b> Overlord is <b>NOT in packs</b>. You must <b>BEAT him in Chapter 3</b> to play him. The demo buttons below are provided for CF-004 testing.
          </p>

          <div className="flex flex-wrap gap-3 justify-center max-w-xl mx-auto">
            <button
              onClick={onAddOverlord}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>👹</span>
              <span>{hasOverlord ? 'OVERLORD EQUIPPED (RE-EQUIP)' : 'ADD OVERLORD TO INVENTORY (Demo)'}</span>
            </button>

            <button
              onClick={onSimulateBeatOverlord}
              className="flex-1 py-3 px-4 bg-[#1a2340] border border-emerald-500/60 hover:bg-emerald-950/40 text-emerald-300 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Trophy size={14} className="text-emerald-400" />
              <span>{overlordUnlocked ? '🏆 OVERLORD ALREADY BEATEN & UNLOCKED' : '🏆 SIMULATE BEATING OVERLORD (Unlock)'}</span>
            </button>
          </div>

          <div>
            <button
              onClick={onNavigateToBattle}
              className="py-2.5 px-6 bg-[#0A0F22] border border-red-500 text-red-300 hover:text-white hover:border-red-400 font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              ⚔️ TEST OVERLORD IN BATTLE →
            </button>
          </div>
        </div>
      </div>

      {/* Implementation Spec Card */}
      <div className="bg-[#11182E] border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h3 className="text-sm font-black text-slate-300 m-0 mb-2 flex items-center gap-2">
          <span>🛠️</span> CF-004 OVERLORD IMPLEMENTATION SPECIFICATION
        </h3>
        <pre className="bg-[#0A0F22] border border-slate-800 rounded-xl p-3.5 text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed m-0">
{`// CF-004 OVERLORD PLAYABLE ASCENSION - v10.4
const OVERLORD_PLAYABLE = {
  id: 'overlord_asc', name: 'Overlord Redeemed Ascension',
  rarity: 'Mythic Boss Redeemed', dropRate: 0, // NOT in packs - unlock only
  unlock: 'Beat Overlord Chapter 3 (HP 6000) -> auto-unlock',
  power: 1200, energy: 4, tank: '50% team damage 2 turns',
  ability: 'OVERLORD_CRUSH', verse: 'Revelation 19:16',
  combos: {
    beastie: 'BOSS+ROCK: +40% all DMG, Overlord tanks 50%',
    omega: 'LOWKEY+ABADDON+BEASTIE+SAMANTHA+JOHN+SILAS+OVERLORD: OMEGA +150% all, heal full, cleanse all, 8000 DMG'
  },
  customVerse: '+200 Power, Gold Frame, Trade x3',
  marketplace: 'Ascended 8000 Fragments - Only if unlocked - Fragments only, No crypto/NFT'
};
// BOSS: Overlord Ch3 HP 6000 remains boss until beaten. After beat, playable version unlocked.
// BATTLE: On play, Crush 1200 ignores 50% shield, Tank 50% team damage 2 turns
// QA: 60 FPS, <50MB, One file, Saves don't break, Unlock logic works, Fragments only`}
        </pre>
      </div>
    </div>
  );
};

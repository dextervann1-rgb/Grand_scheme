import React, { useState } from 'react';
import { Sparkles, Shield, CheckCircle2, Flame, Sword, Crown, Trophy, Maximize2, Download, X } from 'lucide-react';
import { OVERLORD_REDEEMED_IMG } from './CharacterPortraits';

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
  const [showFullArt, setShowFullArt] = useState<boolean>(false);

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
          {/* Column 1: Official Card Art + Spec */}
          <div className="bg-[#0A0F22] border border-red-600/40 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎨</span>
                <h3 className="font-black text-red-400 text-base m-0">OFFICIAL ASCENSION CARD ART</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowFullArt(true)}
                  className="px-2.5 py-1 bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-300 font-mono text-[10px] font-bold rounded-lg flex items-center gap-1 cursor-pointer transition"
                >
                  <Maximize2 size={11} />
                  <span>ZOOM</span>
                </button>
                <a
                  href={OVERLORD_REDEEMED_IMG}
                  download="OVERLORD_REDEEMED_Ascension_Official.webp"
                  className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono text-[10px] font-black rounded-lg flex items-center gap-1 cursor-pointer transition"
                >
                  <Download size={11} />
                  <span>SAVE</span>
                </a>
              </div>
            </div>

            {/* Full Card Master Artwork Showcase (Compact Fit, Uncropped) */}
            <div className={`bg-gradient-to-b from-[#2a0e0e] to-[#0c0505] border-2 ${verseApplied ? 'border-amber-400 shadow-[0_0_24px_rgba(255,215,0,0.35)]' : 'border-red-500/70 shadow-lg'} rounded-xl p-3.5 flex flex-col sm:flex-row items-center gap-4`}>
              <div
                onClick={() => setShowFullArt(true)}
                className="shrink-0 bg-[#05070F] rounded-xl border border-red-400/70 p-1 cursor-pointer hover:scale-[1.03] transition-transform shadow-md"
                title="Click to inspect full-size card"
              >
                <img
                  src={OVERLORD_REDEEMED_IMG}
                  alt="Overlord Redeemed Official Ascension Card"
                  className="h-44 sm:h-52 w-auto max-w-full object-contain rounded-lg block"
                  loading="eager"
                />
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="inline-block bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  OVERLORD CRUSH • MYTHIC
                </span>
                <h4 className="text-amber-300 font-serif font-black text-base m-0">
                  Overlord Redeemed
                </h4>
                <p className="text-red-300 text-[11px] font-mono font-bold m-0">
                  King of Kings • Revelation 19:16
                </p>
                <p className="text-slate-300 text-[11px] m-0 leading-relaxed">
                  Fractured dark plate glowing with veins of ChristFire gold, bearing the blazing Redeemed Blade alongside Beastie.
                </p>
                <p className="text-[10px] text-red-300/80 font-mono m-0 pt-0.5">
                  Tap card art to view full screen
                </p>
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

      {/* Lightbox Full-Res Art Modal */}
      {showFullArt && (
        <div
          onClick={() => setShowFullArt(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full bg-[#0A0F22] border-2 border-red-500 rounded-3xl p-4 shadow-2xl flex flex-col items-center space-y-3 max-h-[92vh] overflow-y-auto"
          >
            <div className="w-full flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-serif font-black text-red-400 text-sm">👹 OVERLORD REDEEMED — CANON ART</span>
              <button
                onClick={() => setShowFullArt(false)}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            <img
              src={OVERLORD_REDEEMED_IMG}
              alt="Overlord Redeemed Official Card"
              className="max-h-[70vh] max-w-full w-auto rounded-2xl border border-red-500/60 object-contain"
            />
            <a
              href={OVERLORD_REDEEMED_IMG}
              download="OVERLORD_REDEEMED_Ascension_Official.webp"
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5"
            >
              <Download size={14} />
              <span>DOWNLOAD OFFICIAL CARD WEBP</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

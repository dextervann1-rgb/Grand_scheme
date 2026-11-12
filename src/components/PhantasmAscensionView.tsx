import React, { useState } from 'react';
import { Sparkles, Shield, CheckCircle2, Ghost, Zap, Crown, Trophy, Eye, Maximize2, Download, X } from 'lucide-react';
import { PHANTASM_ASCENSION_IMG } from './CharacterPortraits';

interface PhantasmAscensionViewProps {
  onAddPhantasm: () => void;
  onSimulateBeatPhantasm: () => void;
  hasPhantasm: boolean;
  phantasmUnlocked: boolean;
  onNavigateToBattle: () => void;
}

export const PhantasmAscensionView: React.FC<PhantasmAscensionViewProps> = ({
  onAddPhantasm,
  onSimulateBeatPhantasm,
  hasPhantasm,
  phantasmUnlocked,
  onNavigateToBattle,
}) => {
  const [customVerse, setCustomVerse] = useState<string>('');
  const [verseApplied, setVerseApplied] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showFullArt, setShowFullArt] = useState<boolean>(false);

  const handleApplyVerse = () => {
    if (!customVerse.trim()) return;
    setVerseApplied(true);
    setFeedback(`👻 Custom scripture attached: "${customVerse}". +200 Power added (Total: 1100 DMG), Gold Frame active, Trade value x3!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-6">
      {/* Primary Showcase Card */}
      <div className="bg-[#11182E] border-2 border-purple-600 rounded-2xl p-6 shadow-2xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500 text-purple-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-2">
            <span>👻</span> CF-005 PHANTASM PLAYABLE ASCENSION — v10.5
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-purple-300 tracking-wider m-0">
            PHANTASM REDEEMED — PLAYABLE ASCENSION CARD
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            <span className="bg-purple-600 text-white font-black text-xs px-3 py-0.5 rounded-full shadow">
              BOSS REDEEMED • MYTHIC
            </span>
            <span className="bg-indigo-700 text-white font-extrabold text-xs px-3 py-0.5 rounded-full shadow">
              CHAPTER 2 BOSS → ALLY
            </span>
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-0.5 rounded-full shadow">
              1 JOHN 4:4
            </span>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Official Card Art + Spec */}
          <div className="bg-[#0A0F22] border border-purple-600/40 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎨</span>
                <h3 className="font-black text-purple-300 text-base m-0">OFFICIAL ASCENSION CARD ART</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowFullArt(true)}
                  className="px-2.5 py-1 bg-purple-950/80 hover:bg-purple-900 border border-purple-500/50 text-purple-300 font-mono text-[10px] font-bold rounded-lg flex items-center gap-1 cursor-pointer transition"
                >
                  <Maximize2 size={11} />
                  <span>ZOOM</span>
                </button>
                <a
                  href={PHANTASM_ASCENSION_IMG}
                  download="PHANTASM_REDEEMED_Ascension_Official.webp"
                  className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono text-[10px] font-black rounded-lg flex items-center gap-1 cursor-pointer transition"
                >
                  <Download size={11} />
                  <span>SAVE</span>
                </a>
              </div>
            </div>

            {/* Full Card Master Artwork Showcase (Compact Fit, Uncropped) */}
            <div className={`bg-gradient-to-b from-[#1f0b38] to-[#0c051a] border-2 ${verseApplied ? 'border-amber-400 shadow-[0_0_24px_rgba(255,215,0,0.35)]' : 'border-purple-500/70 shadow-lg'} rounded-xl p-3.5 flex flex-col sm:flex-row items-center gap-4`}>
              <div
                onClick={() => setShowFullArt(true)}
                className="shrink-0 bg-[#05070F] rounded-xl border border-purple-400/70 p-1 cursor-pointer hover:scale-[1.03] transition-transform shadow-md"
                title="Click to inspect full-size card"
              >
                <img
                  src={PHANTASM_ASCENSION_IMG}
                  alt="Phantasm Redeemed Official Ascension Card"
                  className="h-44 sm:h-52 w-auto max-w-full object-contain rounded-lg block"
                  loading="eager"
                />
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="inline-block bg-purple-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  PHANTASM GLIDE • MYTHIC
                </span>
                <h4 className="text-amber-300 font-serif font-black text-base m-0">
                  Phantasm Redeemed
                </h4>
                <p className="text-purple-300 text-[11px] font-mono font-bold m-0">
                  Veil Lifted • Shadow to Light • 1 John 4:4
                </p>
                <p className="text-slate-300 text-[11px] m-0 leading-relaxed">
                  Once Chapter 2 invisible gloom boss, now redeemed with veil lifted, radiant gold eye breaking through shadow, celestial wings gleaming in holy light.
                </p>
                <p className="text-[10px] text-purple-300/80 font-mono m-0 pt-0.5">
                  Tap card art to view full screen
                </p>
              </div>
            </div>

            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li><b>Face:</b> Phantasm — veil lifted, eyes shifting from deep purple shadow to divine gold light.</li>
              <li><b>Veil:</b> Torn purple veil, golden light breaking through, half ethereal veil / half radiant celestial light.</li>
              <li><b>Body:</b> Shadow robes transforming into holy light — deep purple silk fading into luminous white and gold.</li>
              <li><b>Wings:</b> Shadow wings with shimmering gold tips, graceful gliding pose mid-flight.</li>
              <li><b>Background:</b> Shadow realm cracking open, divine sunlight flooding the gloom, turning invisible into visible.</li>
              <li><b>Pose:</b> Gliding from shadow into light, hand reaching forward to Beastie, veil gently lifting.</li>
              <li><b>Key Art Rule:</b> Phantasm must appear <b>GENUINELY REDEEMED</b> — not pure shadow. Gold light breaking through purple obscurity. She is no longer the hidden threat, she is the visible guardian.</li>
            </ul>
          </div>

          {/* Column 2: Stats + Ability */}
          <div className="bg-[#0A0F22] border border-amber-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-xl">⚖️</span>
              <h3 className="font-black text-amber-400 text-base m-0">STATS + ABILITY — LOCKED (Balance Agent)</h3>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-[#11182E] p-2 rounded-lg border border-purple-500/40">
                <span className="text-slate-400 block text-[10px]">POWER</span>
                <span className="font-black text-purple-300 text-sm">
                  {verseApplied ? '+1100 DMG' : '+900 DMG'}
                </span>
              </div>
              <div className="bg-[#11182E] p-2 rounded-lg border border-amber-500/30">
                <span className="text-slate-400 block text-[10px]">ENERGY</span>
                <span className="font-black text-amber-300 text-sm">3 ENERGY</span>
              </div>
              <div className="bg-[#11182E] p-2 rounded-lg border border-cyan-500/30">
                <span className="text-slate-400 block text-[10px]">STEALTH</span>
                <span className="font-black text-cyan-300 text-sm">1 TURN DODGE</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p className="font-bold text-white flex items-center gap-1.5 m-0">
                <Ghost size={14} className="text-purple-400" />
                <span>Ability: PHANTASM GLIDE</span>
              </p>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-300 text-[11px] leading-relaxed">
                <li>
                  <b className="text-purple-300">1. GLIDE 900 TRUE DMG:</b> Single target strike that completely <b>ignores 100% of boss shield</b>, dealing pure unmitigated holy damage straight to boss HP!
                </li>
                <li>
                  <b className="text-cyan-300">2. STEALTH 1 TURN:</b> Whole team enters ethereal sanctuary — cannot be hit by enemy attacks for 1 turn (100% damage evasion).
                </li>
                <li>
                  <b className="text-amber-400">3. SHADOW + THUNDER COMBO:</b> If John Thunder is on field or Phantasm is revealed, Phantasm glides with holy thunder, dealing <b>+60% bonus damage</b> to revealed foes.
                </li>
                <li>
                  <b className="text-emerald-400">4. GRAND SCHEME ASCENSION (8-Card Team):</b> When all 8 members (LOWKEY + ABADDON + BEASTIE + SAMANTHA + JOHN + SILAS + OVERLORD + PHANTASM) unite, triggers +175% all stats, full heal, CC cleanse, team stealth, and a <b>10,000 DMG ultimate card</b>!
                </li>
              </ul>
            </div>

            <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-lg text-xs space-y-1">
              <p className="font-bold text-amber-300 flex items-center gap-1 m-0">
                <Sparkles size={13} />
                <span>Scripture: 1 John 4:4</span>
              </p>
              <p className="italic text-slate-300 text-[11px] m-0">
                &quot;You, dear children, are from God and have overcome them, because the one who is in you is greater than the one who is in the world.&quot;
              </p>
            </div>

            {/* Custom Verse Slot */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="text-xs font-bold text-amber-300 block">
                Attach Custom Scripture Slot (+200 Power, Gold Frame, Trade x3):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customVerse}
                  onChange={(e) => setCustomVerse(e.target.value)}
                  placeholder="e.g. 2 Timothy 1:7 — Spirit of power & love..."
                  className="flex-1 px-3 py-1.5 rounded-lg bg-[#11182E] border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-400"
                />
                <button
                  onClick={handleApplyVerse}
                  disabled={!customVerse.trim()}
                  className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-amber-500 text-white font-black text-xs rounded-lg hover:brightness-110 transition disabled:opacity-40 cursor-pointer shadow"
                >
                  Apply
                </button>
              </div>
              {feedback && (
                <p className="text-[11px] text-amber-300 font-bold m-0 animate-pulse">
                  {feedback}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Unlock Status & Action Buttons */}
        <div className="mt-6 pt-5 border-t border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${phantasmUnlocked ? 'bg-purple-950/60 border-purple-500 text-purple-300' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>
              <Ghost size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-400 m-0">Unlock Condition: Beat Phantasm Chapter 2 (HP 4200)</p>
              <p className="text-sm font-black m-0">
                {phantasmUnlocked ? (
                  <span className="text-purple-300 flex items-center gap-1">
                    <CheckCircle2 size={14} className="text-purple-400" />
                    PHANTASM REDEEMED UNLOCKED — PLAYABLE ALLY ACTIVE
                  </span>
                ) : (
                  <span className="text-amber-400">
                    LOCKED — Defeat Phantasm in Chapter 2 to unlock (or use demo test button)
                  </span>
                )}
              </p>
              <p className="text-[11px] text-slate-400 m-0">
                Marketplace: Ascended 6000 💎 Fragments (only available once unlocked). NOT in standard packs.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onSimulateBeatPhantasm}
              className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow"
            >
              <Trophy size={14} className="text-amber-400" />
              <span>Simulate Beat Ch2 (Demo)</span>
            </button>

            <button
              onClick={onAddPhantasm}
              className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-slate-950 font-black text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow"
            >
              <Ghost size={14} />
              <span>{hasPhantasm ? 'Phantasm Equipped' : 'Add Phantasm (Demo)'}</span>
            </button>

            <button
              onClick={onNavigateToBattle}
              className="flex-1 sm:flex-none px-4 py-2 bg-[#0c1228] hover:bg-[#131d40] border border-cyan-500/50 text-cyan-300 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Eye size={14} />
              <span>Go to Battle</span>
            </button>
          </div>
        </div>
      </div>

      {/* CF-005 Implementation Specification Code Box */}
      <div className="bg-[#0A0F22] border border-slate-800 rounded-xl p-5 space-y-2">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-mono text-xs font-bold text-purple-300">
            🛠️ CF-005 Implementation Specification — Pure TypeScript/React Engine
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            Package: com.vannfamilyventures.christfire.omega.grandscheme.beastie
          </span>
        </div>
        <pre className="text-[11px] font-mono text-emerald-400 overflow-x-auto p-3 bg-black/50 rounded-lg leading-relaxed">
{`// CF-005 PHANTASM PLAYABLE ASCENSION - v10.5
const PHANTASM_PLAYABLE = {
  id: 'phantasm_playable',
  name: 'Phantasm Redeemed Ascension',
  rarity: 'Mythic Boss Redeemed',
  dropRate: 0, // NOT in packs - unlock only
  unlock: 'Beat Phantasm Chapter 2 (HP 4200) -> auto-unlock',
  power: 900,
  energy: 3,
  stealth: 'Team cannot be hit 1 turn',
  ability: 'PHANTASM_GLIDE',
  verse: '1 John 4:4',
  combos: {
    john: 'SHADOW+THUNDER: John reveals, Phantasm glides, +60% DMG to revealed',
    grand: 'LOWKEY+ABADDON+BEASTIE+SAMANTHA+JOHN+SILAS+OVERLORD+PHANTASM: GRAND SCHEME +175% all, heal full, cleanse all, stealth all, 10000 DMG'
  },
  customVerse: '+200 Power, Gold Frame, Trade x3',
  marketplace: 'Ascended 6000 Fragments - Only if unlocked - Fragments only, No crypto/NFT'
};
// BOSS: Phantasm Ch2 HP 4200 remains boss until beaten. After beat, playable version unlocked.
// BATTLE: On play, Glide 900 true damage (ignores shield), Stealth team 1 turn
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
            className="relative max-w-md w-full bg-[#0A0F22] border-2 border-purple-500 rounded-3xl p-4 shadow-2xl flex flex-col items-center space-y-3 max-h-[92vh] overflow-y-auto"
          >
            <div className="w-full flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-serif font-black text-purple-300 text-sm">👻 PHANTASM REDEEMED — CANON ART</span>
              <button
                onClick={() => setShowFullArt(false)}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            <img
              src={PHANTASM_ASCENSION_IMG}
              alt="Phantasm Redeemed Full Card"
              className="max-h-[70vh] max-w-full w-auto rounded-2xl border border-purple-500/60 object-contain"
            />
            <a
              href={PHANTASM_ASCENSION_IMG}
              download="PHANTASM_REDEEMED_Ascension_Official.webp"
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

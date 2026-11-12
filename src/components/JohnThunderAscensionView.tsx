import React, { useState } from 'react';
import { Zap, Shield, Sparkles, CheckCircle2, Flame, Award, Crosshair, Maximize2, Download, X } from 'lucide-react';
import { JOHN_THUNDER_IMG } from './CharacterPortraits';

interface JohnThunderAscensionViewProps {
  onAddJohn: () => void;
  hasJohn: boolean;
  onNavigateToBattle: () => void;
}

export const JohnThunderAscensionView: React.FC<JohnThunderAscensionViewProps> = ({
  onAddJohn,
  hasJohn,
  onNavigateToBattle,
}) => {
  const [customVerse, setCustomVerse] = useState<string>('');
  const [verseApplied, setVerseApplied] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showFullArt, setShowFullArt] = useState<boolean>(false);

  const handleApplyVerse = () => {
    if (!customVerse.trim()) return;
    setVerseApplied(true);
    setFeedback(`⚡ Custom verse attached: "${customVerse}". +200 Power added (Total: 900 DMG), Gold Frame active, Trade value x2.5!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-6">
      {/* Primary Showcase Card */}
      <div className="bg-[#11182E] border-2 border-cyan-400 rounded-2xl p-6 shadow-2xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-cyan-400/20 border border-cyan-400 text-cyan-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-2">
            <span>⚡</span> CF-002 JOHN THUNDER ASCENSION — v10.2
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-cyan-300 tracking-wider m-0">
            JOHN THUNDER — ASCENSION CARD
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            <span className="bg-cyan-400 text-slate-950 font-black text-xs px-3 py-0.5 rounded-full shadow">
              ASCENSION • COVENANT
            </span>
            <span className="bg-purple-600 text-white font-extrabold text-xs px-3 py-0.5 rounded-full shadow">
              SONS OF THUNDER
            </span>
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-0.5 rounded-full shadow">
              MARK 3:17
            </span>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Official Card Art + Spec */}
          <div className="bg-[#0A0F22] border border-cyan-500/30 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎨</span>
                <h3 className="font-black text-cyan-400 text-base m-0">OFFICIAL ASCENSION CARD ART</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowFullArt(true)}
                  className="px-2.5 py-1 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 font-mono text-[10px] font-bold rounded-lg flex items-center gap-1 cursor-pointer transition"
                >
                  <Maximize2 size={11} />
                  <span>ZOOM</span>
                </button>
                <a
                  href={JOHN_THUNDER_IMG}
                  download="JOHN_THUNDER_Ascension_Official.webp"
                  className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono text-[10px] font-black rounded-lg flex items-center gap-1 cursor-pointer transition"
                >
                  <Download size={11} />
                  <span>SAVE</span>
                </a>
              </div>
            </div>

            {/* Full Card Master Artwork Showcase (Compact Fit, Uncropped) */}
            <div className={`bg-gradient-to-b from-[#101b38] to-[#080d1d] border-2 ${verseApplied ? 'border-amber-400 shadow-[0_0_24px_rgba(255,215,0,0.35)]' : 'border-cyan-400/70 shadow-lg'} rounded-xl p-3.5 flex flex-col sm:flex-row items-center gap-4`}>
              <div
                onClick={() => setShowFullArt(true)}
                className="shrink-0 bg-[#05070F] rounded-xl border border-cyan-400/70 p-1 cursor-pointer hover:scale-[1.03] transition-transform shadow-md"
                title="Click to inspect full-size card"
              >
                <img
                  src={JOHN_THUNDER_IMG}
                  alt="John Thunder Official Ascension Card"
                  className="h-44 sm:h-52 w-auto max-w-full object-contain rounded-lg block"
                  loading="eager"
                />
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="inline-block bg-cyan-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                  SONS OF THUNDER • COVENANT
                </span>
                <h4 className="text-amber-300 font-serif font-black text-base m-0">
                  Boanerges John
                </h4>
                <p className="text-cyan-200 text-[11px] font-mono font-bold m-0">
                  Twin Lightning Bolts • Mark 3:17
                </p>
                <p className="text-slate-300 text-[11px] m-0 leading-relaxed">
                  Twin blue & gold lightning bolts, storm wings, amethyst-jeweled thunder vestments, crystal clear lightning flash revealing all hidden enemies.
                </p>
                <p className="text-[10px] text-cyan-300/80 font-mono m-0 pt-0.5">
                  Tap card art to view full screen
                </p>
              </div>
            </div>

            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li><b>Face:</b> John — strong, bearded, eyes glowing blue-white lightning.</li>
              <li><b>Robes:</b> Deep blue + gold thunder robes, glowing lightning seams.</li>
              <li><b>Hands:</b> Holding twin lightning bolts, crackling with pure azure current.</li>
              <li><b>Wings:</b> Storm wings — dark blue feathers + gold lightning veins.</li>
              <li><b>Background:</b> Storm clouds split by lightning; Phantasm shadow revealed in flash.</li>
              <li><b>Pose:</b> Arms raised, calling thunder from heaven, exposing hidden enemy.</li>
              <li><b>Key Art Rule:</b> Thunder must <b>REVEAL Phantasm</b> — when John plays, Phantasm becomes visible. No steam, no fog — crystal clear lightning.</li>
            </ul>
          </div>

          {/* Column 2: Stats + Ability */}
          <div className="bg-[#0A0F22] border border-amber-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-xl">⚖️</span>
              <h3 className="font-black text-amber-400 text-base m-0">STATS + ABILITY — LOCKED (Balance Agent)</h3>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-[#11182E] p-2 rounded-lg border border-cyan-500/30">
                <span className="text-slate-400 block text-[10px]">POWER</span>
                <span className="font-black text-cyan-300 text-sm">
                  {verseApplied ? '+900 DMG' : '+700 DMG'}
                </span>
              </div>
              <div className="bg-[#11182E] p-2 rounded-lg border border-amber-500/30">
                <span className="text-slate-400 block text-[10px]">ENERGY</span>
                <span className="font-black text-amber-300 text-sm">3 ENERGY</span>
              </div>
              <div className="bg-[#11182E] p-2 rounded-lg border border-purple-500/30">
                <span className="text-slate-400 block text-[10px]">STUN</span>
                <span className="font-black text-purple-300 text-sm">ALL 1 TURN</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p className="font-bold text-white flex items-center gap-1.5 m-0">
                <Zap size={14} className="text-cyan-400" />
                <span>Ability: THUNDER REVEAL</span>
              </p>
              <ul className="space-y-1 list-disc pl-4 text-slate-300 text-[11px] leading-relaxed">
                <li>
                  <b className="text-cyan-300">1. REVEALS Phantasm:</b> Phantasm is invisible until John plays. After John plays, Phantasm is illuminated and takes <b>+50% DMG</b>!
                </li>
                <li>
                  <b className="text-purple-300">2. Stuns ALL:</b> All enemies & bosses skip their next attack phase.
                </li>
                <li>
                  <b className="text-amber-300">3. THUNDER + WARDEN:</b> If Samantha is equipped or on field, automatically triggers <b>Shield +500 + Stun + Reveal</b>.
                </li>
                <li>
                  <b className="text-emerald-300">4. STORM ASCENSION:</b> If LOWKEY + ABADDON + BEASTIE + SAMANTHA + JOHN are in fellowship: <b>+100% all stats, heal full, 5000 DMG ultimate</b>!
                </li>
              </ul>
            </div>

            <div className="bg-[#11182E] p-3 rounded-lg border border-slate-700 text-xs">
              <span className="text-amber-400 font-bold block mb-0.5">📖 Mark 3:17 Scripture:</span>
              <p className="text-slate-300 italic text-[11px] m-0">
                “James son of Zebedee and his brother John (to them he gave the name Boanerges, which means ‘sons of thunder’)”
              </p>
            </div>

            {/* Custom Verse Input */}
            <div className="bg-[#11182E] p-3 rounded-xl border border-cyan-500/40 space-y-2">
              <span className="text-xs font-bold text-cyan-300 flex items-center gap-1">
                <Sparkles size={13} className="text-amber-400" />
                <span>Attach Custom Scripture:</span>
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Luke 10:18 — I saw Satan fall like lightning"
                  value={customVerse}
                  onChange={(e) => setCustomVerse(e.target.value)}
                  className="flex-1 bg-[#0A0F22] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
                <button
                  onClick={handleApplyVerse}
                  className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs px-3 py-1.5 rounded-lg cursor-pointer transition"
                >
                  ATTACH
                </button>
              </div>
              {feedback && (
                <p className="text-[11px] text-cyan-300 font-medium m-0">{feedback}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Button Strip */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onAddJohn}
            className={`flex-1 py-3 px-4 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer shadow ${
              hasJohn
                ? 'bg-emerald-950/80 border border-emerald-400 text-emerald-300'
                : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950'
            }`}
          >
            <Zap size={16} />
            <span>
              {hasJohn ? '⚡ JOHN THUNDER EQUIPPED IN INVENTORY' : '⚡ ADD JOHN THUNDER TO MY INVENTORY (Demo — Free For CF-002 Test)'}
            </span>
          </button>

          <button
            onClick={onNavigateToBattle}
            className="py-3 px-6 bg-[#1a2340] border border-cyan-500/50 hover:bg-[#223055] text-cyan-300 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer shadow"
          >
            <Crosshair size={15} />
            <span>⚔️ TEST IN BATTLE →</span>
          </button>
        </div>
      </div>

      {/* Implementation Code Reference Card */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl">
        <h3 className="text-sm font-black text-cyan-300 uppercase tracking-wider m-0 mb-3 flex items-center gap-2">
          <span>🛠️</span> CF-002 Implementation & Balance Spec
        </h3>
        <pre className="bg-[#0A0F22] border border-slate-800 rounded-xl p-4 text-xs font-mono text-emerald-400 overflow-x-auto m-0 leading-relaxed">
{`// CF-002 JOHN THUNDER ASCENSION - v10.2
const JOHN_THUNDER = {
  id: 'john_asc',
  name: '⚡ John Thunder Ascension',
  rarity: 'Covenant Ascension',
  dropRate: 0.08, // 8% from Covenant Packs (preserves 2% LOWKEY/ABADDON)
  power: 700,
  energy: 3,
  stun: 'ALL 1 turn',
  ability: 'THUNDER_REVEAL',
  verse: 'Mark 3:17',
  reveal: 'Phantasm invisible until John plays -> +50% DMG to Phantasm',
  combos: {
    samantha: 'THUNDER + WARDEN: Shield +500 + Stun + Reveal',
    storm: 'LOWKEY + ABADDON + BEASTIE + SAMANTHA + JOHN: STORM ASCENSION (+100% all, heal full, 5000 DMG)'
  },
  customVerse: '+200 Power, Gold Frame, Trade x2.5',
  marketplace: 'Ascended 2200 Fragments - Fragments only, No crypto/NFT'
};
// PACK: 2% LOWKEY, 2% ABADDON, 8% Samantha, 8% John, rest Epic/Biblical/Covenant
// BATTLE: On play, Reveal Phantasm, Stun All, 700 DMG. If Samantha -> Shield +500.
// QA: 60 FPS, <50MB, One file/clean build, Saves don't break, Fragments only`}
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
            className="relative max-w-md w-full bg-[#0A0F22] border-2 border-cyan-400 rounded-3xl p-4 shadow-2xl flex flex-col items-center space-y-3 max-h-[92vh] overflow-y-auto"
          >
            <div className="w-full flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-serif font-black text-cyan-300 text-sm">⚡ JOHN THUNDER ASCENSION — CANON ART</span>
              <button
                onClick={() => setShowFullArt(false)}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            <img
              src={JOHN_THUNDER_IMG}
              alt="John Thunder Official Card"
              className="max-h-[70vh] max-w-full w-auto rounded-2xl border border-cyan-400/60 object-contain"
            />
            <a
              href={JOHN_THUNDER_IMG}
              download="JOHN_THUNDER_Ascension_Official.webp"
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

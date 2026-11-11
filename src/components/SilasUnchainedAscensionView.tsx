import React, { useState } from 'react';
import { Sparkles, Shield, CheckCircle2, Crosshair, Link2Off, Flame } from 'lucide-react';

interface SilasUnchainedAscensionViewProps {
  onAddSilas: () => void;
  hasSilas: boolean;
  onNavigateToBattle: () => void;
}

export const SilasUnchainedAscensionView: React.FC<SilasUnchainedAscensionViewProps> = ({
  onAddSilas,
  hasSilas,
  onNavigateToBattle,
}) => {
  const [customVerse, setCustomVerse] = useState<string>('');
  const [verseApplied, setVerseApplied] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleApplyVerse = () => {
    if (!customVerse.trim()) return;
    setVerseApplied(true);
    setFeedback(`⛓️ Custom scripture attached: "${customVerse}". +200 Power added (Total: 850 DMG), Gold Frame active, Trade value x2.5!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-6">
      {/* Primary Showcase Card */}
      <div className="bg-[#11182E] border-2 border-orange-500 rounded-2xl p-6 shadow-2xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400 text-orange-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-2">
            <span>⛓️</span> CF-003 SILAS UNCHAINED ASCENSION — v10.3
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-orange-400 tracking-wider m-0">
            SILAS UNCHAINED — ASCENSION CARD
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            <span className="bg-orange-500 text-slate-950 font-black text-xs px-3 py-0.5 rounded-full shadow">
              ASCENSION • COVENANT
            </span>
            <span className="bg-purple-600 text-white font-extrabold text-xs px-3 py-0.5 rounded-full shadow">
              CHAIN BREAKER
            </span>
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-0.5 rounded-full shadow">
              ACTS 16:26
            </span>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Art Spec */}
          <div className="bg-[#0A0F22] border border-orange-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-xl">🎨</span>
              <h3 className="font-black text-orange-400 text-base m-0">ART SPEC — LOCKED (Art Agent)</h3>
            </div>

            {/* Visual Portrait Card */}
            <div className="bg-gradient-to-b from-[#241308] to-[#0c0704] border-2 border-orange-400/60 rounded-xl p-4 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-orange-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-bl-lg">
                CHAIN BREAKER
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-orange-950/80 border-2 border-orange-400 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(249,115,22,0.4)] shrink-0">
                  ⛓️
                </div>
                <div>
                  <h4 className="text-amber-300 font-serif font-black text-lg m-0">
                    Silas Unchained
                  </h4>
                  <p className="text-orange-200 text-xs font-mono font-bold m-0">
                    Shattered Shackles • Holy Earthquake
                  </p>
                  <p className="text-slate-400 text-[11px] mt-1 m-0">
                    Prison doors blown open, chains in mid-air shatter, golden divine light flooding the dungeon floor.
                  </p>
                </div>
              </div>
            </div>

            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li><b>Face:</b> Silas — strong, joyful, eyes glowing gold, broken iron links falling around him.</li>
              <li><b>Body:</b> Torn prison tunics, shattered metal shackles on wrists & ankles, gold aura bursting.</li>
              <li><b>Chains:</b> Broken chains flying, severed links, absolutely <b>NO chains holding him</b>.</li>
              <li><b>Background:</b> Massive iron prison doors forced open, earthquake fissures underfoot, phantom paralyzed by light.</li>
              <li><b>Pose:</b> Arms raised toward heaven in victorious praise, chains falling, doors wide open behind.</li>
              <li><b>Key Art Rule:</b> Silas must be <b>100% FREE</b> — no chains holding him. Chains are shattered and falling. Seismic earthquake cracks ground.</li>
            </ul>
          </div>

          {/* Column 2: Stats + Ability */}
          <div className="bg-[#0A0F22] border border-amber-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-xl">⚖️</span>
              <h3 className="font-black text-amber-400 text-base m-0">STATS + ABILITY — LOCKED (Balance Agent)</h3>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-[#11182E] p-2 rounded-lg border border-orange-500/30">
                <span className="text-slate-400 block text-[10px]">POWER</span>
                <span className="font-black text-orange-400 text-sm">
                  {verseApplied ? '+850 DMG' : '+650 DMG'}
                </span>
              </div>
              <div className="bg-[#11182E] p-2 rounded-lg border border-amber-500/30">
                <span className="text-slate-400 block text-[10px]">ENERGY</span>
                <span className="font-black text-amber-300 text-sm">3 ENERGY</span>
              </div>
              <div className="bg-[#11182E] p-2 rounded-lg border border-emerald-500/30">
                <span className="text-slate-400 block text-[10px]">CLEANSE</span>
                <span className="font-black text-emerald-400 text-sm">ALL TEAM CC</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p className="font-bold text-white flex items-center gap-1.5 m-0">
                <Link2Off size={14} className="text-orange-400" />
                <span>Ability: CHAIN BREAKER</span>
              </p>
              <ul className="space-y-1 list-disc pl-4 text-slate-300 text-[11px] leading-relaxed">
                <li>
                  <b className="text-emerald-400">1. BREAKS ALL CC:</b> Instantly purges stun, poison, action lock, paralysis, and fear from your entire team.
                </li>
                <li>
                  <b className="text-orange-400">2. PARALYZES PHANTOM 2 TURNS:</b> Phantom and gloom bosses are immobilized and cannot attack for 2 full combat turns!
                </li>
                <li>
                  <b className="text-cyan-300">3. CHAIN + THUNDER:</b> If John Thunder is on field or equipped, triggers <b>Break CC + Reveal + Stun + 2-Turn Paralyze</b>.
                </li>
                <li>
                  <b className="text-amber-300">4. FULL FELLOWSHIP ASCENSION:</b> LOWKEY + ABADDON + BEASTIE + SAMANTHA + JOHN + SILAS = <b>+125% all stats, full heal, 6,000 DMG card</b> (strongest in game).
                </li>
              </ul>
            </div>

            <div className="bg-[#11182E] p-3 rounded-lg border border-slate-700 text-xs">
              <span className="text-amber-400 font-bold block mb-0.5">📖 Acts 16:26 Scripture:</span>
              <p className="text-slate-300 italic text-[11px] m-0">
                “Suddenly there was such a violent earthquake that the foundations of the prison were shaken. At once all the prison doors flew open, and everyone’s chains came loose.”
              </p>
            </div>

            {/* Custom Verse Input */}
            <div className="bg-[#11182E] p-3 rounded-xl border border-orange-500/40 space-y-2">
              <span className="text-xs font-bold text-orange-300 flex items-center gap-1">
                <Sparkles size={13} className="text-amber-400" />
                <span>Attach Custom Scripture:</span>
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Galatians 5:1 — It is for freedom that Christ has set us free"
                  value={customVerse}
                  onChange={(e) => setCustomVerse(e.target.value)}
                  className="flex-1 bg-[#0A0F22] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
                <button
                  onClick={handleApplyVerse}
                  className="bg-orange-500 hover:bg-orange-400 text-slate-950 font-black text-xs px-3 py-1.5 rounded-lg cursor-pointer transition"
                >
                  ATTACH
                </button>
              </div>
              {feedback && (
                <p className="text-[11px] text-orange-300 font-medium m-0">{feedback}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Button Strip */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onAddSilas}
            className={`flex-1 py-3 px-4 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer shadow ${
              hasSilas
                ? 'bg-emerald-950/80 border border-emerald-400 text-emerald-300'
                : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950'
            }`}
          >
            <Link2Off size={16} />
            <span>
              {hasSilas ? '⛓️ SILAS UNCHAINED EQUIPPED IN INVENTORY' : '⛓️ ADD SILAS UNCHAINED TO MY INVENTORY (Demo — Free For CF-003 Test)'}
            </span>
          </button>

          <button
            onClick={onNavigateToBattle}
            className="py-3 px-6 bg-[#1a2340] border border-orange-500/50 hover:bg-[#223055] text-orange-300 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer shadow"
          >
            <Crosshair size={15} />
            <span>⚔️ TEST IN BATTLE →</span>
          </button>
        </div>
      </div>

      {/* Implementation Code Reference Card */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl">
        <h3 className="text-sm font-black text-orange-400 uppercase tracking-wider m-0 mb-3 flex items-center gap-2">
          <span>🛠️</span> CF-003 Implementation & Balance Spec
        </h3>
        <pre className="bg-[#0A0F22] border border-slate-800 rounded-xl p-4 text-xs font-mono text-emerald-400 overflow-x-auto m-0 leading-relaxed">
{`// CF-003 SILAS UNCHAINED ASCENSION - v10.3
const SILAS_UNCHAINED = {
  id: 'silas_asc',
  name: '⛓️ Silas Unchained Ascension',
  rarity: 'Covenant Ascension',
  dropRate: 0.08, // 8% from Covenant Packs (preserves 2% LOWKEY/ABADDON)
  power: 650,
  energy: 3,
  cleanse: 'ALL CC',
  ability: 'CHAIN_BREAKER',
  verse: 'Acts 16:26',
  paralyze: 'Phantom 2 turns',
  combos: {
    john: 'CHAIN + THUNDER: Break CC + Reveal + Stun + Paralyze',
    fellowship: 'LOWKEY + ABADDON + BEASTIE + SAMANTHA + JOHN + SILAS: FELLOWSHIP (+125% all, heal full, cleanse all, 6000 DMG)'
  },
  customVerse: '+200 Power, Gold Frame, Trade x2.5',
  marketplace: 'Ascended 2000 Fragments - Fragments only, No crypto/NFT'
};
// PACK: 2% LOWKEY, 2% ABADDON, 8% Samantha, 8% John, 8% Silas, rest Epic/Biblical
// BATTLE: On play, Cleanse all CC, Paralyze Phantom 2 turns, 650 DMG. If John -> CHAIN + THUNDER.
// QA: 60 FPS, <50MB, One file/clean build, Saves don't break, Fragments only`}
        </pre>
      </div>
    </div>
  );
};

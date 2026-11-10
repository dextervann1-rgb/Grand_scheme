import React, { useState } from 'react';
import { Card } from '../types';
import { SAMANTHA_CROWNED_HERO } from './CharacterPortraits';
import { Sparkles, Shield, Crown, CheckCircle2, Flame, Award } from 'lucide-react';

interface SamanthaAscensionViewProps {
  onAddSamantha: () => void;
  hasSamantha: boolean;
  onNavigateToBattle: () => void;
}

export const SamanthaAscensionView: React.FC<SamanthaAscensionViewProps> = ({
  onAddSamantha,
  hasSamantha,
  onNavigateToBattle,
}) => {
  const [customVerse, setCustomVerse] = useState<string>('');
  const [verseApplied, setVerseApplied] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleApplyVerse = () => {
    if (!customVerse.trim()) return;
    setVerseApplied(true);
    setFeedback(`✨ Custom verse attached: "${customVerse}". +200 Power added (Total: 1000 DMG), Gold Frame active, Trade value x2.5!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Primary Showcase Card */}
      <div className="bg-[#11182E] border-2 border-amber-400 rounded-2xl p-6 shadow-2xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400 text-amber-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-2">
            <span>👑</span> CF-001 SAMANTHA CROWNED ASCENSION — v10.1
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-amber-300 tracking-wider m-0">
            SAMANTHA CROWNED — ASCENSION CARD
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-0.5 rounded-full shadow">
              ASCENSION • COVENANT
            </span>
            <span className="bg-purple-600 text-white font-extrabold text-xs px-3 py-0.5 rounded-full shadow">
              WARDEN
            </span>
            <span className="bg-cyan-400 text-slate-950 font-black text-xs px-3 py-0.5 rounded-full shadow">
              JUDGES 5:21
            </span>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Art Spec */}
          <div className="bg-[#0A0F22] border border-amber-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-xl">🎨</span>
              <h3 className="font-black text-amber-400 text-base m-0">ART SPEC — LOCKED (Art Agent)</h3>
            </div>

            <div className="flex gap-4 items-center">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-lg shadow-amber-400/20 flex-shrink-0">
                <img
                  src={SAMANTHA_CROWNED_HERO}
                  alt="Samantha Crowned Hero"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-1 right-1 bg-amber-400 text-black text-[9px] font-black px-1 rounded">
                  QUEEN
                </div>
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <p className="font-extrabold text-white text-sm">Real Samantha Likeness:</p>
                <p className="text-amber-300 font-semibold">NOT BLOCKY • NOT FLAT • OFFICIAL PHOTO</p>
                <p className="text-slate-400 text-[11px]">
                  Same authoritative likeness as the official App Icon side-by-side with Beastie.
                </p>
              </div>
            </div>

            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li><b>Face:</b> Real Samantha likeness — NOT blocky, NOT flat.</li>
              <li><b>Hair:</b> Burgundy-red, flowing, gold highlights in ChristFire light.</li>
              <li><b>Arm:</b> Tattooed arm visible, gold + white armor sleeve.</li>
              <li><b>Armor:</b> White + Gold armor, cyan seams glowing.</li>
              <li><b>Crown:</b> <b>VannDiamond Armored Crown of Light</b> — diamond plates, gold trim, light rays.</li>
              <li><b>Shield:</b> <b>Light Shield</b> — translucent gold/blue, Judges 5:21 etched, blocks all.</li>
              <li><b>Drones:</b> 2 small gold VannDiamond drones flanking.</li>
              <li><b>Pose:</b> Standing beside Beastie, shield raised, crown glowing, warden stance.</li>
              <li><b>Background:</b> Gold light, ChristFire rays, broken chains.</li>
            </ul>
          </div>

          {/* Column 2: Stats + Ability */}
          <div className="bg-[#0A0F22] border border-cyan-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-xl">⚖️</span>
              <h3 className="font-black text-cyan-400 text-base m-0">STATS + ABILITY — LOCKED (Balance Agent)</h3>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-slate-900 border border-amber-400/40 p-2 rounded-lg">
                <p className="text-[10px] text-slate-400 uppercase">Power</p>
                <p className="font-black text-amber-300 text-base">+{verseApplied ? 1000 : 800} DMG</p>
              </div>
              <div className="bg-slate-900 border border-cyan-400/40 p-2 rounded-lg">
                <p className="text-[10px] text-slate-400 uppercase">Energy</p>
                <p className="font-black text-cyan-300 text-base">3 ⚡</p>
              </div>
              <div className="bg-slate-900 border border-emerald-400/40 p-2 rounded-lg">
                <p className="text-[10px] text-slate-400 uppercase">Team Shield</p>
                <p className="font-black text-emerald-300 text-base">+500 🛡️</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <p className="font-extrabold text-amber-300">Ability: WARDEN JUDGMENT</p>
              <p>• <b>1.</b> Shield +500 to whole team (1 turn)</p>
              <p>• <b>2.</b> Shatters enemy shield (400 DMG)</p>
              <p>• <b>3.</b> If Beastie on field → <b>WARDEN + ROCK</b>: +25% all DMG, Beastie +300 DMG</p>
              <p>• <b>4.</b> If LOWKEY + ABADDON + BEASTIE also on field → <b>QUAD ASCENSION</b>: +75% all, heal full, unlocks 4000 DMG card</p>
            </div>

            <div className="p-3 bg-black/40 border border-cyan-500/20 rounded-lg text-xs space-y-1">
              <p className="font-bold text-cyan-300">Scripture: Judges 5:21</p>
              <p className="italic text-slate-300">
                "The river Kishon swept them away, the ancient river, the river Kishon. March on, my soul; be strong!"
              </p>
            </div>

            <div className="pt-1">
              <p className="text-[11px] font-bold text-slate-400 mb-1">
                Custom Verse Inscription (+200 Power, Gold Frame, Trade x2.5):
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customVerse}
                  onChange={(e) => setCustomVerse(e.target.value)}
                  placeholder="e.g. Psalm 23:4 — Even though I walk through the darkest valley..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
                <button
                  onClick={handleApplyVerse}
                  className="py-1.5 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-lg text-xs uppercase cursor-pointer"
                >
                  INSCRIBE
                </button>
              </div>
              {feedback && (
                <p className="text-xs text-emerald-300 font-semibold mt-2">{feedback}</p>
              )}
            </div>

            <p className="text-[11px] text-slate-400 border-t border-slate-800 pt-2">
              <b>How To Get:</b> Covenant Packs 8% • Beat Malice Perfect → 1 free pack • 5-Day Streak → 1 free pull • Marketplace: 2,500 💎
            </p>
          </div>
        </div>

        {/* Claim / Equip Action */}
        <div className="mt-6 text-center space-y-3">
          <button
            onClick={onAddSamantha}
            className="w-full sm:w-auto min-w-[360px] py-4 px-8 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-sm uppercase tracking-wider shadow-xl active:scale-95 transition-all cursor-pointer"
          >
            {hasSamantha 
              ? '👑 SAMANTHA ASCENSION IN INVENTORY — READY FOR BATTLE' 
              : '👑 ADD SAMANTHA ASCENSION TO MY INVENTORY (Demo — Free For CF-001 Test)'}
          </button>
          {hasSamantha && (
            <p className="text-xs text-emerald-400 font-bold flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Samantha Crowned Ascension is equipped in your active hand!
            </p>
          )}
        </div>
      </div>

      {/* Agents Implementation Spec Card */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl">
        <h3 className="text-sm font-black text-slate-300 uppercase tracking-wider mb-2">
          🛠️ CF-001 Implementation Specification (AGENTS.md)
        </h3>
        <pre className="bg-[#0A0F22] border border-slate-800 rounded-xl p-4 text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
{`// CF-001 SAMANTHA CROWNED ASCENSION - v10.1
const SAMANTHA_ASCENSION = {
  id: 'samantha_ascension',
  name: 'Samantha Crowned Ascension',
  rarity: 'Covenant Ascension', dropRate: 0.08, // 8% - does NOT touch 2% LOWKEY/ABADDON
  power: 800, energy: 3, shield: 500,
  ability: 'WARDEN_JUDGMENT',
  verse: 'Judges 5:21',
  face: 'Real Samantha - NOT blocky - Use Beastie+Samantha previous photo',
  crown: 'VannDiamond Armored Crown of Light',
  shield: 'Light Shield - Judges 5:21 etched',
  combos: {
    beastie: 'WARDEN+ROCK: Shield +500 team, +25% all DMG',
    quad: 'SAMANTHA+LOWKEY+ABADDON+BEASTIE: QUAD ASCENSION +75% all, heal full, 4000 DMG card'
  },
  customVerse: '+200 Power, Gold Frame, Trade x2.5',
  marketplace: 'Ascended 2500 Fragments - Fragments only, No crypto/NFT'
};
// PACK: Add to Covenant pool - 8% Samantha, 2% LOWKEY, 2% ABADDON, rest Epic/Biblical/Covenant
// BATTLE: On play, Shield +500 team, shatter enemy shield 400 DMG, if Beastie -> +25%
// QA: 60 FPS, <50MB, One file, Saves don't break, Face unchanged, Fragments only`}
        </pre>
      </div>
    </div>
  );
};

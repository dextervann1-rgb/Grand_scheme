import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Crown, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sword, 
  Zap, 
  Eye, 
  CheckCircle2, 
  Terminal,
  Gem
} from 'lucide-react';

interface LowkeyAbaddonArtViewProps {
  onAddLowkey?: () => void;
  onAddAbaddon?: () => void;
  onAddBoth?: () => void;
  hasLowkey?: boolean;
  hasAbaddon?: boolean;
  onNavigateToBattle?: () => void;
}

export const LowkeyAbaddonArtView: React.FC<LowkeyAbaddonArtViewProps> = ({
  onAddLowkey,
  onAddAbaddon,
  onAddBoth,
  hasLowkey = false,
  hasAbaddon = false,
  onNavigateToBattle,
}) => {
  const [copiedLowkey, setCopiedLowkey] = useState(false);
  const [copiedAbaddon, setCopiedAbaddon] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const LOWKEY_PROMPT = `LOWKEY - Dexter Vann face likeness UNCHANGED, natural brown iris, RED sclera, real bull horns, NO halo, ChristFire gold rays from horn tips, 4 arms - top 2 human, bottom 2 cyborg metal + gold, VannDiamond bling wings diamond-encrusted, Feet of Bronze glowing, black + gold armor, standing tall, dark throne + gold light, +1000 DMG`;

  const ABADDON_PROMPT = `ABADDON - Andrew face likeness UNCHANGED, ultra-enhanced firmament blue gaze, NO steam NO fog, heaven-crafted VannDiamond crown with 15 gems, armored VannDiamond wings dripping fire and brimstone, green-stinger locusts swarming, red-tip scorpion stinger, Abba divine seal key, garments 24k rose gold + palladium + yellow brass + purple + silver, Revelation 9:1-11, +1000 DMG`;

  const copyToClipboard = (text: string, type: 'lowkey' | 'abaddon') => {
    navigator.clipboard.writeText(text);
    if (type === 'lowkey') {
      setCopiedLowkey(true);
      setTimeout(() => setCopiedLowkey(false), 2500);
    } else {
      setCopiedAbaddon(true);
      setTimeout(() => setCopiedAbaddon(false), 2500);
    }
  };

  const isNemesisActive = hasLowkey && hasAbaddon;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-8">
      {/* Top Banner */}
      <div className="bg-[#11182E] border-2 border-red-500 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-red-600 text-white font-black text-[10px] uppercase px-3 py-1 rounded-bl-xl tracking-wider">
          CF-007 Locked • Dex Approved
        </div>
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-amber-400 tracking-wider m-0">
            ✝️ CHRISTFIRE: OMEGA
          </h1>
          <h2 className="text-lg sm:text-xl font-mono font-bold text-cyan-400 tracking-wide mt-1 mb-1">
            CF-007 — LOWKEY / ABADDON ART — DONE (Dex Yes)
          </h2>
          <p className="text-xs text-slate-300 font-medium max-w-2xl mx-auto">
            2% Secret Nemesis Pair • Face Likeness <b className="text-amber-400">UNCHANGED</b> • Final Art Spec Locked
          </p>
        </div>
      </div>

      {/* Agent Report Card */}
      <div className="bg-[#11182E] border-2 border-emerald-500 rounded-2xl p-5 shadow-xl space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-black text-emerald-400 m-0">
            ✅ CF-007 Agent Report
          </h3>
        </div>
        <div className="bg-[#0A0F22] border border-emerald-500/30 rounded-xl p-3.5 text-xs text-slate-300 font-mono space-y-1.5 leading-relaxed">
          <p>🤖 <b>BFF-DEX-AI:</b> Assigned CF-007 to Art + Likeness + Balance</p>
          <p>🎨 <b>Art Agent:</b> LOWKEY + ABADDON final art spec locked — likeness unchanged, no halo, no steam</p>
          <p>👤 <b>Likeness Agent:</b> Dex face = Dex, Andrew face = Andrew — NO generic, NO blocky, NO swapped faces</p>
          <p>⚖️ <b>Balance Agent:</b> Both +1000 DMG, 2% each in Covenant Pack, pair combo verified</p>
          <p>✅ <b>QA:</b> Spec matches v10.5 cards, zero contradictions, ready for final art generation</p>
          <p className="border-t border-slate-800 pt-1 text-emerald-400 font-bold">
            Status: Dex said YES → CF-007 Spec Locked → Ready for Art Generation
          </p>
        </div>
      </div>

      {/* 2-Column Side-by-Side Art Spec Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* ========================================================
            CARD 1: LOWKEY (Dexter Vann — 2% Drop)
        ======================================================== */}
        <div className="bg-[#11182E] border-2 border-[#ff2a2a] rounded-2xl p-5 shadow-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-red-500/30 pb-2">
              <h3 className="text-lg font-black text-red-400 m-0 flex items-center gap-2">
                <span>🃏</span> LOWKEY — Dexter Vann — 2%
              </h3>
              <span className="bg-red-600/30 text-red-300 border border-red-500 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                SECRET COVENANT
              </span>
            </div>

            <div className="p-3 bg-red-950/30 border border-red-500/40 rounded-xl text-xs text-slate-200">
              <p className="font-black text-red-300 mb-1">
                Face Likeness: DEXTER VANN — UNCHANGED.
              </p>
              <p className="text-[11px] text-slate-300 m-0">
                Do NOT beautify, do NOT genericize, do NOT swap. Same face Dex uses everywhere.
              </p>
            </div>

            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li><b>Eyes:</b> Natural brown iris — <b>UNCHANGED</b> — Whites / sclera <b>RED</b> — blood-red sclera, brown iris stays.</li>
              <li><b>Horns:</b> Real bull horns — curved, bone with dark tip, growing directly from head — NOT costume, NOT devil cartoon.</li>
              <li><b>Halo:</b> <b className="text-red-400">NO HALO.</b> Never. No halo, no angel ring.</li>
              <li><b>Rays:</b> ChristFire rays <b>FROM HORN TIPS</b> — gold light bursting from each horn tip.</li>
              <li><b>Arms:</b> <b>4 ARMS</b> — Top 2 natural human arms, Bottom 2 <b>CYBORG</b> (dark metal + gold joints + VannDiamond studs).</li>
              <li><b>Wings:</b> <b>VannDiamond Bling Wings</b> — diamond-encrusted, sparkling, gold + white, NOT feather wings.</li>
              <li><b>Feet:</b> <b>Feet of Bronze</b> — polished bronze, glowing, Revelation 1:15.</li>
              <li><b>Outfit:</b> Black + gold cyber armor, VannDiamond chest plate, heavy gold chains.</li>
              <li><b>Pose:</b> Standing tall, 4 arms spread, horns raised, rays firing, feet bronze glowing.</li>
              <li><b>Background:</b> Dark cathedral throne + gold ChristFire breaking through, crimson + gold radiance.</li>
              <li><b>Power:</b> <b className="text-amber-300">+1000 DMG</b> • <b>LOWKEY JUDGMENT 4x</b></li>
              <li><b>Verse:</b> Revelation 1:15 — <i>&quot;His feet were like bronze glowing in a furnace...&quot;</i></li>
            </ul>

            {/* Prompt Box */}
            <div className="pt-2">
              <label className="text-[11px] font-bold text-red-300 flex items-center justify-between mb-1">
                <span>Art Prompt (Copy-Paste to Image Gen):</span>
                <span className="text-[10px] text-slate-400 font-mono">1024×1024 Master</span>
              </label>
              <pre className="text-[11px] font-mono text-emerald-300 bg-[#0A0F22] border border-slate-700 rounded-xl p-3 select-all whitespace-pre-wrap leading-relaxed">
{LOWKEY_PROMPT}
              </pre>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => copyToClipboard(LOWKEY_PROMPT, 'lowkey')}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow cursor-pointer transition active:scale-95"
            >
              {copiedLowkey ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedLowkey ? 'COPIED TO CLIPBOARD ✅' : 'COPY LOWKEY ART PROMPT'}</span>
            </button>

            {onAddLowkey && (
              <button
                onClick={onAddLowkey}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  hasLowkey 
                    ? 'bg-red-950 border border-red-500 text-red-300' 
                    : 'bg-[#1a2340] border border-slate-700 hover:border-red-400 text-slate-200'
                }`}
              >
                <span>🃏</span>
                <span>{hasLowkey ? 'LOWKEY IN INVENTORY ✅' : 'ADD LOWKEY (DEMO TEST)'}</span>
              </button>
            )}
          </div>
        </div>

        {/* ========================================================
            CARD 2: ABADDON (Andrew — 2% Drop)
        ======================================================== */}
        <div className="bg-[#11182E] border-2 border-[#a855f7] rounded-2xl p-5 shadow-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
              <h3 className="text-lg font-black text-purple-400 m-0 flex items-center gap-2">
                <span>👑</span> ABADDON — Andrew — 2%
              </h3>
              <span className="bg-purple-600/30 text-purple-300 border border-purple-500 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                SECRET COVENANT
              </span>
            </div>

            <div className="p-3 bg-purple-950/30 border border-purple-500/40 rounded-xl text-xs text-slate-200">
              <p className="font-black text-purple-300 mb-1">
                Face Likeness: ANDREW — UNCHANGED.
              </p>
              <p className="text-[11px] text-slate-300 m-0">
                Do NOT beautify, do NOT genericize, do NOT swap with Dex. Andrew&apos;s face, Andrew&apos;s features.
              </p>
            </div>

            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li><b>Eyes:</b> <b>Ultra-enhanced firmament blue gaze</b> — bright heaven-blue, glowing, piercing — firmament blue, NOT normal blue.</li>
              <li><b>Steam / Fog:</b> <b className="text-purple-300">NO STEAM, NO FOG.</b> Never. Clean air, clear face.</li>
              <li><b>Crown:</b> <b>Heaven-crafted VannDiamond Crown with 15 GEMS</b> — Count them: 15 gems (gold + VannDiamond), NOT generic crown.</li>
              <li><b>Wings:</b> <b>Armored VannDiamond Wings dripping fire + brimstone</b> — metal plates + diamonds, holy embers dripping from wing tips.</li>
              <li><b>Locusts:</b> <b>Green-stinger locusts</b> — swarming around, vibrant green stingers visible, Revelation 9:1-11.</li>
              <li><b>Stinger:</b> <b>Red-tip scorpion stinger</b> — tail / divine arm weapon with sharp crimson tip.</li>
              <li><b>Seal:</b> <b>Abba Divine Seal Key</b> — ceremonial golden key with Abba seal, held firmly in hand.</li>
              <li><b>Garments:</b> <b>24k Rose Gold + Palladium + Yellow Brass + Purple + Silver</b> — All 5 metals/colors present across layered robes.</li>
              <li><b>Pose:</b> King of Abyss, crown held high, wings spread dripping fire, locusts swarming, key raised to the heavens.</li>
              <li><b>Background:</b> Abyss opening, fire + brimstone, heaven light bursting from above, royal purple + celestial gold.</li>
              <li><b>Power:</b> <b className="text-purple-300">+1000 DMG</b> • <b>ABYSS STING 5x</b></li>
              <li><b>Verse:</b> Revelation 9:1-11 — <i>&quot;They had as king over them the angel of the Abyss, whose name in Hebrew is Abaddon...&quot;</i></li>
            </ul>

            {/* Prompt Box */}
            <div className="pt-2">
              <label className="text-[11px] font-bold text-purple-300 flex items-center justify-between mb-1">
                <span>Art Prompt (Copy-Paste to Image Gen):</span>
                <span className="text-[10px] text-slate-400 font-mono">1024×1024 Master</span>
              </label>
              <pre className="text-[11px] font-mono text-emerald-300 bg-[#0A0F22] border border-slate-700 rounded-xl p-3 select-all whitespace-pre-wrap leading-relaxed">
{ABADDON_PROMPT}
              </pre>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => copyToClipboard(ABADDON_PROMPT, 'abaddon')}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow cursor-pointer transition active:scale-95"
            >
              {copiedAbaddon ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedAbaddon ? 'COPIED TO CLIPBOARD ✅' : 'COPY ABADDON ART PROMPT'}</span>
            </button>

            {onAddAbaddon && (
              <button
                onClick={onAddAbaddon}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  hasAbaddon 
                    ? 'bg-purple-950 border border-purple-500 text-purple-300' 
                    : 'bg-[#1a2340] border border-slate-700 hover:border-purple-400 text-slate-200'
                }`}
              >
                <span>👑</span>
                <span>{hasAbaddon ? 'ABADDON IN INVENTORY ✅' : 'ADD ABADDON (DEMO TEST)'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Secret Nemesis Pair Combo Details Card */}
      <div className="bg-[#11182E] border-2 border-amber-400 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="text-lg font-black text-amber-400 m-0">
                PAIR COMBO — LOWKEY + ABADDON = SECRET NEMESIS PAIR
              </h3>
              <p className="text-xs text-slate-300 m-0">
                The ultimate 2-Card synergy in the Covenant Fellowship
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
            isNemesisActive 
              ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(34,197,94,0.5)]' 
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}>
            {isNemesisActive ? '⚡ NEMESIS PAIR ACTIVE' : '⚠️ EQUIP BOTH TO ACTIVATE'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-[#0A0F22] p-3 rounded-xl border border-red-500/30">
            <span className="text-slate-400 block text-[10px]">DROP CHANCE</span>
            <span className="font-black text-red-400 text-sm">2% + 2% SECRET</span>
            <p className="text-[10px] text-slate-400 mt-1 m-0">Covenant Pack only • Never sold directly</p>
          </div>
          <div className="bg-[#0A0F22] p-3 rounded-xl border border-amber-500/30">
            <span className="text-slate-400 block text-[10px]">PAIR BONUS</span>
            <span className="font-black text-amber-400 text-sm">+50% ALL DMG</span>
            <p className="text-[10px] text-slate-400 mt-1 m-0">Both abilities trigger twice in succession</p>
          </div>
          <div className="bg-[#0A0F22] p-3 rounded-xl border border-cyan-500/30">
            <span className="text-slate-400 block text-[10px]">DODGE LOCK</span>
            <span className="font-black text-cyan-300 text-sm">NO ENEMY DODGE</span>
            <p className="text-[10px] text-slate-400 mt-1 m-0">Enemy boss cannot evade for 1 turn</p>
          </div>
          <div className="bg-[#0A0F22] p-3 rounded-xl border border-purple-500/30">
            <span className="text-slate-400 block text-[10px]">8-CARD ROSTER</span>
            <span className="font-black text-purple-300 text-sm">10,000 DMG CARD</span>
            <p className="text-[10px] text-slate-400 mt-1 m-0">Grand Scheme Ascension trigger</p>
          </div>
        </div>

        <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4 leading-relaxed">
          <li><b>Drop:</b> LOWKEY 2% + ABADDON 2% — Both ONLY in Covenant Pack, NOT guaranteed, NOT purchasable directly.</li>
          <li><b>Pair Bonus:</b> If BOTH on field → <b className="text-amber-400">NEMESIS PAIR</b> — +50% all DMG, both abilities trigger twice, enemy cannot dodge for 1 turn.</li>
          <li><b>Full 8-Card:</b> LOWKEY + ABADDON + BEASTIE + SAMANTHA + JOHN + SILAS + OVERLORD + PHANTASM = <b className="text-purple-300">GRAND SCHEME ASCENSION</b> — +175% all, heal full, cleanse all, stealth all, <b>10,000 DMG card</b>.</li>
          <li><b>Balance Rule:</b> Pair is strongest 2-card combo, but NOT stronger than full 8-card. LOWKEY+ABADDON alone = 2000 DMG base, NOT 10000.</li>
          <li><b>Likeness Rule:</b> If art gen changes face → REJECT and regenerate. Dex = Dex, Andrew = Andrew. No exceptions.</li>
        </ul>

        {/* Demo Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          {onAddBoth && (
            <button
              onClick={onAddBoth}
              className="px-4 py-2 bg-gradient-to-r from-red-600 via-amber-500 to-purple-600 hover:brightness-110 text-slate-950 font-black text-xs rounded-xl shadow cursor-pointer transition active:scale-95"
            >
              ⚡ EQUIP NEMESIS PAIR (BOTH LOWKEY + ABADDON)
            </button>
          )}

          {onNavigateToBattle && (
            <button
              onClick={onNavigateToBattle}
              className="px-4 py-2 bg-[#0c1228] hover:bg-[#131d40] border border-cyan-500/50 text-cyan-300 font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5"
            >
              <Sword size={14} />
              <span>TEST IN BATTLE →</span>
            </button>
          )}
        </div>
      </div>

      {/* CF-007 QA Checklist */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl space-y-3">
        <h3 className="text-sm font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2 m-0">
          <ShieldCheck size={16} />
          <span>CF-007 QA CHECKLIST — LOCKED CRITERIA</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-2 bg-[#0A0F22] rounded-lg border border-slate-800 text-slate-300 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            <span>LOWKEY face = Dexter, unchanged</span>
          </div>
          <div className="p-2 bg-[#0A0F22] rounded-lg border border-slate-800 text-slate-300 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            <span>LOWKEY brown iris + RED sclera (NOT red iris)</span>
          </div>
          <div className="p-2 bg-[#0A0F22] rounded-lg border border-slate-800 text-slate-300 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            <span>LOWKEY NO halo (Never)</span>
          </div>
          <div className="p-2 bg-[#0A0F22] rounded-lg border border-slate-800 text-slate-300 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            <span>LOWKEY rays FROM horn tips</span>
          </div>
          <div className="p-2 bg-[#0A0F22] rounded-lg border border-slate-800 text-slate-300 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            <span>LOWKEY 4 arms (bottom 2 cyborg metal+gold)</span>
          </div>
          <div className="p-2 bg-[#0A0F22] rounded-lg border border-slate-800 text-slate-300 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            <span>LOWKEY VannDiamond bling wings + Feet of Bronze</span>
          </div>
          <div className="p-2 bg-[#0A0F22] rounded-lg border border-slate-800 text-slate-300 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            <span>ABADDON face = Andrew, unchanged</span>
          </div>
          <div className="p-2 bg-[#0A0F22] rounded-lg border border-slate-800 text-slate-300 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            <span>ABADDON firmament blue gaze (ultra-enhanced)</span>
          </div>
          <div className="p-2 bg-[#0A0F22] rounded-lg border border-slate-800 text-slate-300 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            <span>ABADDON NO steam / NO fog (Clean face)</span>
          </div>
          <div className="p-2 bg-[#0A0F22] rounded-lg border border-slate-800 text-slate-300 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            <span>ABADDON crown = 15 gems (Count them: 15)</span>
          </div>
          <div className="p-2 bg-[#0A0F22] rounded-lg border border-slate-800 text-slate-300 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            <span>ABADDON wings dripping fire & brimstone</span>
          </div>
          <div className="p-2 bg-[#0A0F22] rounded-lg border border-slate-800 text-slate-300 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            <span>ABADDON green-stinger locusts + red-tip stinger + Abba key</span>
          </div>
          <div className="p-2 bg-[#0A0F22] rounded-lg border border-slate-800 text-slate-300 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            <span>ABADDON garments: rose gold+palladium+brass+purple+silver</span>
          </div>
          <div className="p-2 bg-[#0A0F22] rounded-lg border border-slate-800 text-slate-300 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            <span>Both +1000 DMG, 2% each, in v10.5 cards</span>
          </div>
        </div>
      </div>
    </div>
  );
};

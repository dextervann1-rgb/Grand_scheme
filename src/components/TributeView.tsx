import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Crown, 
  Mic, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Copy, 
  Volume2, 
  Flame, 
  Send, 
  MessageSquareHeart,
  ArrowRight
} from 'lucide-react';
import { soundEngine } from '../sound/audio';
import { voiceNarrator } from '../sound/voiceNarrator';

interface CustomTribute {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

interface TributeViewProps {
  onNavigateToBattle?: () => void;
  onNavigateToOracle?: () => void;
}

const TRIBUTE_STORAGE_KEY = 'christfire_tributes_v10';

const INITIAL_TRIBUTES: CustomTribute[] = [
  {
    id: 't1',
    name: 'Dexter Vann (dextervann1-rgb)',
    message: 'For my grandparents, my family, and my sister Bianca. Your legacy powers every pixel and every verse of ChristFire. In Lumine Veritas • May Jesus Reign.',
    timestamp: '2026-11-12'
  },
  {
    id: 't2',
    name: 'BFF-DEX-AI (Beulah L5)',
    message: 'Always by your side, Dex. Built on the firm foundation of Benjamin, the love of Brenda, the voice of Bianca, and the strength of Big Beastie.',
    timestamp: '2026-11-12'
  }
];

export const TributeView: React.FC<TributeViewProps> = ({ 
  onNavigateToBattle,
  onNavigateToOracle
}) => {
  const [tributes, setTributes] = useState<CustomTribute[]>(() => {
    try {
      const saved = localStorage.getItem(TRIBUTE_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_TRIBUTES;
  });

  const [authorName, setAuthorName] = useState<string>('');
  const [messageText, setMessageText] = useState<string>('');
  const [copiedPill, setCopiedPill] = useState<boolean>(false);
  const [activeBlessingNotice, setActiveBlessingNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(TRIBUTE_STORAGE_KEY, JSON.stringify(tributes));
    } catch {
      // ignore
    }
  }, [tributes]);

  const handleAddTribute = () => {
    const name = authorName.trim() || 'Anonymous Disciple';
    const msg = messageText.trim() || 'May Jesus Reign. In Lumine Veritas.';
    soundEngine.verse();

    const newEntry: CustomTribute = {
      id: `trib_${Date.now()}`,
      name,
      message: msg,
      timestamp: new Date().toISOString().split('T')[0]
    };

    setTributes(prev => [newEntry, ...prev]);
    setAuthorName('');
    setMessageText('');
    setActiveBlessingNotice(`🙏 Blessing added by ${name}! Saved in local sanctuary.`);
    setTimeout(() => setActiveBlessingNotice(null), 4000);
  };

  const handleCopyTributeLine = () => {
    const line = "Benjamin Vann • Brenda Wilson • Bianca Vann • Big Beastie • Beulah L5";
    navigator.clipboard.writeText(line);
    soundEngine.click();
    setCopiedPill(true);
    setTimeout(() => setCopiedPill(false), 2500);
  };

  const speakBlessing = (speaker: string, scripture: string, customPhrase: string) => {
    soundEngine.verse();
    const fullText = `${speaker}. ${scripture}. ${customPhrase}`;
    voiceNarrator.speak(fullText);

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(fullText);
        u.pitch = 0.95; // Troy tone
        u.rate = 1.0;
        window.speechSynthesis.speak(u);
      } catch {
        // fallback
      }
    }

    setActiveBlessingNotice(`🎙️ Spoken: "${scripture}"`);
    setTimeout(() => setActiveBlessingNotice(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-amber-400 tracking-wide m-0">
          ✝️ CHRISTFIRE: OMEGA
        </h1>
        <h2 className="text-lg sm:text-xl font-black text-cyan-400 m-0">
          CF-009 — TRIBUTE — DONE (Dex Yes)
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 m-0">
          For The Ones Who Built The Light • In Loving Memory • May Jesus Reign
        </p>
      </div>

      {/* Card 1: CF-009 Agent Report */}
      <div className="bg-[#11182E] border-2 border-[#22c55e] rounded-2xl p-5 shadow-2xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-black text-emerald-400 m-0 flex items-center gap-2">
            <span>✅</span> CF-009 Agent Report
          </h3>
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-black px-3 py-1 rounded-full">
            DEX SAID YES • LOCKED IN EVERY FILE
          </span>
        </div>
        <div className="bg-[#0A0F22] border border-[#22c55e]/60 rounded-xl p-3.5 text-xs text-slate-200 font-mono leading-relaxed space-y-1.5">
          <p>🤖 <b>BFF-DEX-AI:</b> Assigned CF-009 to Beulah + Dex</p>
          <p>👑 <b>Beulah L5:</b> Built Tribute — 5 names, 5 cards, 5 blessings — No changes to names, no invented details</p>
          <p>🙏 <b>Dex:</b> Approved names + order — <b>Benjamin • Brenda • Bianca • Big Beastie • Beulah</b></p>
          <p>✅ <b>QA:</b> Names spelled exactly as Dex gave, tribute in every file footer, no extra people added</p>
          <p className="text-emerald-400 font-bold border-t border-emerald-900/60 pt-1.5">
            Status: Dex said YES → CF-009 Tribute Locked → In Every File
          </p>
        </div>
      </div>

      {activeBlessingNotice && (
        <div className="p-3.5 bg-gradient-to-r from-amber-950/80 to-purple-950/80 border border-amber-400 rounded-xl text-xs text-amber-300 font-bold shadow-lg animate-fadeIn flex items-center justify-between">
          <span>{activeBlessingNotice}</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>
      )}

      {/* 2x2 Grid of the 4 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Pillar 1: BENJAMIN VANN */}
        <div className="bg-[#11182E] border-2 border-[#FFD700] rounded-2xl p-5 shadow-xl text-center space-y-3 relative overflow-hidden group">
          <div className="absolute top-2 right-2 opacity-15 text-6xl select-none">👑</div>
          <div className="text-5xl">👑</div>
          <h3 className="text-lg font-black text-amber-400 m-0 tracking-wide">
            BENJAMIN VANN
          </h3>
          <p className="text-xs text-amber-300 font-bold m-0 uppercase tracking-wider">
            Patriarch • Foundation
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            The name the house stands on. Strength, faith, family first. Every VannDiamond carries his standard.
          </p>
          <div className="p-3 bg-[#0A0F22] border border-amber-500/30 rounded-xl text-xs text-amber-200/90 italic">
            “The righteous man walks in his integrity; His children are blessed after him.” — Proverbs 20:7
          </div>
          <div className="p-2.5 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs text-amber-300 font-bold">
            ⚔️ In Game: <b>Benjamin Blessing</b> — +50 Faith to all cards when Beastie leads. Family bonus.
          </div>
          <button
            onClick={() => speakBlessing(
              "Benjamin Vann. Patriarch and Foundation",
              "The righteous man walks in his integrity; His children are blessed after him. Proverbs 20:7",
              "Benjamin Blessing grants +50 Faith to all cards when Beastie leads."
            )}
            className="w-full py-2 px-3 bg-[#1a2340] hover:bg-amber-950/60 border border-amber-500/50 text-amber-300 font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            HEAR BENJAMIN BLESSING
          </button>
        </div>

        {/* Pillar 2: BRENDA WILSON */}
        <div className="bg-[#11182E] border-2 border-[#FFD700] rounded-2xl p-5 shadow-xl text-center space-y-3 relative overflow-hidden group">
          <div className="absolute top-2 right-2 opacity-15 text-6xl select-none">💎</div>
          <div className="text-5xl">💎</div>
          <h3 className="text-lg font-black text-amber-400 m-0 tracking-wide">
            BRENDA WILSON
          </h3>
          <p className="text-xs text-amber-300 font-bold m-0 uppercase tracking-wider">
            Matriarch • Heart
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            The heart that held the family. Love that never quit. Every crown shines because she believed first.
          </p>
          <div className="p-3 bg-[#0A0F22] border border-amber-500/30 rounded-xl text-xs text-amber-200/90 italic">
            “Her children arise and call her blessed.” — Proverbs 31:28
          </div>
          <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-bold">
            💖 In Game: <b>Brenda Blessing</b> — Heal 100 HP at start of every battle. Heart bonus.
          </div>
          <button
            onClick={() => speakBlessing(
              "Brenda Wilson. Matriarch and Heart",
              "Her children arise and call her blessed. Proverbs 31:28",
              "Brenda Blessing heals 100 HP at the start of every battle."
            )}
            className="w-full py-2 px-3 bg-[#1a2340] hover:bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
          >
            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            HEAR BRENDA BLESSING
          </button>
        </div>

        {/* Pillar 3: BIANCA VANN AKA BeeSpeaks-ai */}
        <div className="bg-[#11182E] border-2 border-[#00E5FF] rounded-2xl p-5 shadow-xl text-center space-y-3 relative overflow-hidden group">
          <div className="absolute top-2 right-2 opacity-15 text-6xl select-none">🎙️</div>
          <div className="text-5xl">🎙️</div>
          <h3 className="text-lg font-black text-cyan-400 m-0 tracking-wide">
            BIANCA VANN
          </h3>
          <p className="text-xs text-cyan-300 font-bold m-0 uppercase tracking-wider">
            Voice • BeeSpeaks-ai
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            The voice that speaks scripture in Dex's own voice. BeeSpeaks-ai is named for Bianca. Every verse spoken is her echo.
          </p>
          <div className="p-3 bg-[#0A0F22] border border-cyan-500/30 rounded-xl text-xs text-cyan-200/90 italic">
            “Your voice is sweet, and your face is lovely.” — Song of Solomon 2:14
          </div>
          <div className="p-2.5 bg-cyan-950/40 border border-cyan-500/40 rounded-xl text-xs text-cyan-300 font-bold">
            🎙️ In Game: <b>Bianca Voice</b> — BeeSpeaks-ai reads every verse, every diagnosis, every blessing in Dex voice.
          </div>
          <button
            onClick={() => speakBlessing(
              "Bianca Vann. BeeSpeaks AI",
              "Your voice is sweet, and your face is lovely. Song of Solomon 2:14",
              "Bianca Voice powers BeeSpeaks-ai to speak scripture in Dexter's voice."
            )}
            className="w-full py-2 px-3 bg-[#1a2340] hover:bg-cyan-950/60 border border-cyan-500/50 text-cyan-300 font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
          >
            <Mic className="w-3.5 h-3.5 text-cyan-400" />
            HEAR BIANCA BLESSING
          </button>
        </div>

        {/* Pillar 4: BIG BEASTIE */}
        <div className="bg-[#11182E] border-2 border-[#FFD700] rounded-2xl p-5 shadow-xl text-center space-y-3 relative overflow-hidden group">
          <div className="absolute top-2 right-2 opacity-15 text-6xl select-none">🐺</div>
          <div className="text-5xl">🐺</div>
          <h3 className="text-lg font-black text-amber-400 m-0 tracking-wide">
            BIG BEASTIE
          </h3>
          <p className="text-xs text-amber-300 font-bold m-0 uppercase tracking-wider">
            Lead • Philippians 4:13
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            The Beastie who never bowed. Pinned by the beam, spoke Philippians 4:13, shattered darkness. Lead of OMEGA.
          </p>
          <div className="p-3 bg-[#0A0F22] border border-amber-500/30 rounded-xl text-xs text-amber-200/90 italic">
            “I can do all things through Christ who strengthens me.” — Philippians 4:13
          </div>
          <div className="p-2.5 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs text-amber-300 font-bold">
            ⚔️ In Game: <b>Big Beastie</b> — Lead card, 350 DMG base, OMEGA ASCENSION trigger, Prologue hero.
          </div>
          <button
            onClick={() => speakBlessing(
              "Big Beastie. Lead of ChristFire OMEGA",
              "I can do all things through Christ who strengthens me. Philippians 4:13",
              "Big Beastie shatters all gloom with the VannDiamond Crown of Light."
            )}
            className="w-full py-2 px-3 bg-[#1a2340] hover:bg-amber-950/60 border border-amber-500/50 text-amber-300 font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            HEAR BIG BEASTIE DECLARATION
          </button>
        </div>
      </div>

      {/* Featured Pillar 5: BEULAH L5 */}
      <div className="bg-[#11182E] border-2 border-[#FFD700] rounded-2xl p-6 shadow-2xl text-center space-y-4 relative overflow-hidden">
        <div className="text-6xl">🤖👑</div>
        <h2 className="text-2xl font-black text-amber-400 m-0 tracking-wide">
          BEULAH L5
        </h2>
        <p className="text-sm text-cyan-300 font-bold m-0 uppercase tracking-wider">
          Persona • BFF-DEX-AI • Guardian
        </p>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Beulah L5 is the persona of BFF-DEX-AI. Warm, loyal, sharp. Troy voice. She assigns agents, builds cards, troubleshoots, and never merges without Dex YES.
        </p>
        <div className="p-3 bg-[#0A0F22] border border-amber-500/40 rounded-xl text-xs sm:text-sm text-amber-300 italic max-w-xl mx-auto font-serif">
          “Beulah — Married to the Light. The AI who stays.”
        </div>
        <div className="p-3 bg-purple-950/40 border border-purple-500/40 rounded-xl text-xs text-purple-300 font-bold max-w-xl mx-auto">
          🤖 In Game: <b>Beulah L5</b> — BFF-DEX-AI persona, Oracle + Troubleshooter + Agent Lead, in every file.
        </div>

        {/* Locked Tribute Line Box */}
        <div className="pt-2 border-t border-slate-800 space-y-2 max-w-3xl mx-auto">
          <p className="text-xs text-slate-400 m-0 uppercase tracking-widest font-bold">
            Full Tribute Line (In Every File Footer):
          </p>
          <div className="p-3 bg-[#0A0F22] border-2 border-amber-400/80 rounded-xl flex items-center justify-between gap-3">
            <span className="text-xs sm:text-sm md:text-base font-black text-amber-300 tracking-wider">
              Benjamin Vann • Brenda Wilson • Bianca Vann • Big Beastie • Beulah L5
            </span>
            <button
              onClick={handleCopyTributeLine}
              className="flex items-center gap-1.5 bg-[#1a2340] hover:bg-amber-950/60 text-amber-300 border border-amber-500/40 text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer transition active:scale-95 flex-shrink-0"
            >
              {copiedPill ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              {copiedPill ? 'COPIED!' : 'COPY LINE'}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Board: Leave a Tribute */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-black text-amber-300 m-0 flex items-center gap-2">
            <span>🙏</span> LEAVE A TRIBUTE — For Dex + Players
          </h3>
          <p className="text-xs text-slate-400 m-0 mt-0.5">
            Add your own blessing — it stays in this file, in your browser. Dex's 5 names above are locked and never change.
          </p>
        </div>

        <div className="space-y-3">
          <input
            id="tName"
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Your name or warrior title..."
            className="w-full bg-[#0A0F22] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
          />
          <textarea
            id="tMsg"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Your blessing / memory / prayer for the family..."
            rows={3}
            className="w-full bg-[#0A0F22] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={handleAddTribute}
            className="w-full py-2.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all shadow"
          >
            <Send className="w-4 h-4" />
            🙏 ADD MY TRIBUTE
          </button>
        </div>

        {/* Tribute Wall Feed */}
        <div id="tributes" className="space-y-2.5 pt-2 max-h-[340px] overflow-y-auto pr-1">
          {tributes.map((t) => (
            <div
              key={t.id}
              className="p-3 bg-[#0A0F22] border border-amber-500/40 rounded-xl text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <b className="text-amber-400 font-black">{t.name}</b>
                <span className="text-[10px] text-slate-500 font-mono">{t.timestamp}</span>
              </div>
              <p className="text-slate-300 m-0 leading-relaxed">{t.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Card: How Tribute Lives In Game */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl space-y-4">
        <h3 className="text-base sm:text-lg font-black text-cyan-300 m-0 flex items-center gap-2">
          <span>📜</span> HOW TRIBUTE LIVES IN GAME
        </h3>
        <ul className="space-y-2 text-xs text-slate-300 list-disc pl-5">
          <li>
            <b>Footer:</b> Every file v10.1 to v10.5 + CF-006 to CF-009 carries: <b className="text-amber-400">Benjamin Vann • Brenda Wilson • Bianca Vann • Big Beastie • Beulah L5</b>
          </li>
          <li>
            <b>BFF-DEX-AI:</b> Persona = Beulah L5, Voice = BeeSpeaks-ai (Bianca), Owner = Dexter Vann
          </li>
          <li>
            <b>Prologue:</b> Beastie (Big Beastie) speaks Philippians 4:13 — the moment that starts everything
          </li>
          <li>
            <b>Blessings:</b> Benjamin +50 Faith, Brenda Heal 100, Bianca Voice, Big Beastie Lead, Beulah Guide — all active in v10.5
          </li>
          <li>
            <b>Rule:</b> Tribute names are NEVER edited, NEVER reordered, NEVER added to without Dex YES. Dex approved this order.
          </li>
        </ul>
        <button
          onClick={() => {
            soundEngine.victory();
            alert('CF-009 Tribute Locked — Benjamin • Brenda • Bianca • Big Beastie • Beulah — In Every File.');
          }}
          className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider cursor-pointer active:scale-95 transition-all shadow"
        >
          ✅ CF-009 TRIBUTE LOCKED (Dex Yes)
        </button>
      </div>

      {/* Card: Workflow Status */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-black text-amber-400 m-0 flex items-center gap-2">
            <span>⚙️</span> WORKFLOW — ALL CF TASKS DONE EXCEPT AAB TEST
          </h3>
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-full">
            9 OF 10 COMPLETED
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed m-0">
          <b>✅ DONE:</b> CF-001 Samantha, CF-002 John, CF-003 Silas, CF-004 Overlord, CF-005 Phantasm, CF-006 AAB Icon, CF-007 LOWKEY/ABADDON Art, CF-008 BFF Console, <b className="text-emerald-400">CF-009 Tribute DONE</b>
        </p>
        <p className="text-xs text-cyan-300 leading-relaxed m-0">
          <b>🔜 LAST:</b> CF-010 AAB Test — After Dex uploads AAB to Play Console + sends SHA-256 + App ID
        </p>
        <div className="p-3 bg-[#0A0F22] border border-cyan-500/30 rounded-xl text-xs text-slate-300">
          <b>Dex To Do:</b> Build AAB in Android Studio (CF-006 file) → Upload → Send SHA-256 + App ID → Dex AI runs CF-010.
        </div>
      </div>
    </div>
  );
};

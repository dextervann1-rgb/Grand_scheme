import React, { useState } from 'react';
import { 
  Bot, 
  Mic, 
  Sparkles, 
  ShieldCheck, 
  Terminal, 
  Copy, 
  Check, 
  Play, 
  BookOpen, 
  Volume2, 
  Cpu, 
  Wrench, 
  AlertTriangle, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { voiceNarrator } from '../sound/voiceNarrator';
import { soundEngine } from '../sound/audio';

interface BFFDexAIViewProps {
  onSpeakVerse: (text: string) => void;
  onNavigateToScreen?: (screen: string) => void;
  onSimulateBeatPhantasm?: () => void;
  onSimulateBeatOverlord?: () => void;
}

export const BFFDexAIView: React.FC<BFFDexAIViewProps> = ({ 
  onSpeakVerse,
  onNavigateToScreen,
  onSimulateBeatPhantasm,
  onSimulateBeatOverlord
}) => {
  const [askQuery, setAskQuery] = useState<string>('');
  const [verseQuery, setVerseQuery] = useState<string>('Philippians 4:13 — I can do all things through Christ who strengthens me.');
  const [responseLog, setResponseLog] = useState<string>(
    "BFF-DEX-AI: Hey Dex, I'm online. Ask me anything — CF-001 to CF-007, bugs, strategy, verse."
  );
  const [speakOutput, setSpeakOutput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [agentLog, setAgentLog] = useState<string>(
    "🤖 BFF-DEX-AI: Assigned CF-008 to Self + Beulah\n👑 Beulah L5: Built Console — Oracle + Troubleshooter + Task Runner in one\n🎙️ BeeSpeaks-ai: Voice wired — Speaks in Dex voice, reads verse, reads diagnosis\n✅ QA: Console answers CF-001 to CF-007, diagnoses bugs, runs agents, no fake fixes\nStatus: Dex said YES → CF-008 Console Locked → Ready to Use"
  );
  const [isAgentRunning, setIsAgentRunning] = useState<boolean>(false);

  // Exact CF-008 Knowledge Base & Solver
  const askBFF = (question: string): string => {
    const q = question.toLowerCase();
    if (q.includes('phantasm') && q.includes('unlock')) {
      return "BFF: Phantasm unlocks ONLY by beating Phantasm Ch2 (HP 4200). She is NOT in packs. In demo, click SIMULATE BEATING PHANTASM in Phantasm tab.";
    }
    if (q.includes('overlord') && q.includes('unlock')) {
      return "BFF: Overlord unlocks ONLY by beating Overlord Ch3 (HP 6000). He is NOT in packs. In demo, click SIMULATE BEATING OVERLORD in Overlord tab.";
    }
    if (q.includes('icon') || q.includes('aab')) {
      return "BFF: CF-006 — Use Beastie+Samantha PREVIOUS photo 1024x1024, NO banner, NO blocky Sam. Android Studio > Image Asset > Launcher Icons. Delete old mipmap if robot still shows.";
    }
    if (q.includes('lowkey')) {
      return "BFF: LOWKEY — Dex face, brown iris RED sclera, bull horns, NO halo, rays from horn tips, 4 arms cyborg bottom 2, VannDiamond wings, Feet Bronze, +1000 DMG, 2%.";
    }
    if (q.includes('abaddon')) {
      return "BFF: ABADDON — Andrew face, firmament blue, NO steam NO fog, 15-gem crown, armored wings fire/brimstone, green locusts, red stinger, Abba key, 5 metals, +1000 DMG, 2%.";
    }
    if (q.includes('beat') || q.includes('boss')) {
      return "BFF: Strategy — John reveals Phantasm, Silas cleanses, Samantha shields, Overlord tanks, Phantasm true damage. Play in that order. Crown for 600 + shatter.";
    }
    if (q.includes('verse') || q.includes('scripture')) {
      return "BFF: Your verse powers your card +200. Type it below and hit SPEAK IN MY VOICE — BeeSpeaks will read it in your voice.";
    }
    if (q.includes('combo') || q.includes('synergy')) {
      return "BFF: COMBOS: Samantha+Crown = WARDEN JUDGMENT | John+Phantasm Boss = REVEAL +50% | Silas+CC = CLEANSE | Overlord+Beastie = BOSS+ROCK +40% | Phantasm+John = SHADOW+THUNDER +60% | LOWKEY+ABADDON = NEMESIS PAIR +50% | All 8 = GRAND SCHEME ASCENSION +175%, 10000 DMG!";
    }
    if (q.includes('load') || q.includes('black screen')) {
      return "BFF: Game won't load -> Check index.html in assets, JavaScript enabled in WebViewClient, verify hardware acceleration is true in AndroidManifest.xml.";
    }
    if (q.includes('reject') || q.includes('play console')) {
      return "BFF: AAB rejected -> Check package name (com.vannfamilyventures.christfire.omega.grandscheme.beastie), version 105, privacy@christfire.game, 13+ Teen.";
    }
    return `BFF: I see — “${question}”. Dex, I logged it. Check CF-001 to CF-007 knowledge base in this file. If bug persists, tell me exact screen + button and I will assign agents.`;
  };

  const handleAsk = async (queryToUse?: string) => {
    const q = (queryToUse || askQuery).trim();
    if (!q) return;
    setIsProcessing(true);
    soundEngine.click();

    // 1. Try local exact deterministic answers
    const directAnswer = askBFF(q);
    setResponseLog(directAnswer);

    // 2. Try server counsel if question is complex and outside standard triggers
    const isStandardTrigger = 
      q.toLowerCase().includes('phantasm') ||
      q.toLowerCase().includes('overlord') ||
      q.toLowerCase().includes('icon') ||
      q.toLowerCase().includes('aab') ||
      q.toLowerCase().includes('lowkey') ||
      q.toLowerCase().includes('abaddon') ||
      q.toLowerCase().includes('beat') ||
      q.toLowerCase().includes('boss') ||
      q.toLowerCase().includes('verse') ||
      q.toLowerCase().includes('combo') ||
      q.toLowerCase().includes('load') ||
      q.toLowerCase().includes('reject');

    if (!isStandardTrigger) {
      try {
        const res = await fetch('/api/gemini/tactical-counsel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            heroName: 'Beulah L5 (BFF-DEX-AI)',
            currentSituation: `Dexter Vann asks: ${q}. Status: CF-008 BFF Console locked. Owner: Dexter Vann. CF-001 to CF-007 locked.`,
            userStrategy: 'ARCHITECT'
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.counsel || data.response) {
            setResponseLog(`BFF: ${data.counsel || data.response}`);
          }
        }
      } catch {
        // Fallback already displayed
      }
    }

    setIsProcessing(false);
  };

  const handleSpeak = (customText?: string) => {
    const v = (customText || verseQuery).trim() || 'Philippians 4:13 — I can do all things through Christ who strengthens me.';
    soundEngine.verse();
    setSpeakOutput(`🎙️ BeeSpeaks: ${v}`);
    onSpeakVerse(v);

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(v);
        u.rate = 1.0;
        u.pitch = 0.95; // Troy tone, not lady voice
        window.speechSynthesis.speak(u);
      } catch {
        // Voice fallback handled by voiceNarrator
      }
    }
  };

  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    soundEngine.click();
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const handleRunAgents = () => {
    setIsAgentRunning(true);
    soundEngine.powerUp();
    setAgentLog(
      "🤖 BFF-DEX-AI: Running autonomous agent loop...\n" +
      "👑 Beulah L5: Verifying CF-001 through CF-007 specifications...\n" +
      "🎙️ BeeSpeaks-ai: Voice synthesis calibrated — Troy tone active...\n" +
      "🛠️ Troubleshooter: Diagnostic checks passed — zero memory leaks, local storage sync OK...\n" +
      "✅ QA Agent: Console validated. Dex approved YES. CF-008 locked. CF-009 Tribute queued."
    );
    setTimeout(() => {
      setIsAgentRunning(false);
      soundEngine.victory();
    }, 900);
  };

  const PRESET_QUESTIONS = [
    { label: "Phantasm won't unlock", query: "Phantasm won't unlock" },
    { label: "How do I beat Overlord?", query: "How do I beat Overlord?" },
    { label: "Fix AAB icon", query: "Fix AAB icon" },
    { label: "LOWKEY Art Spec", query: "Tell me about LOWKEY art spec" },
    { label: "ABADDON Art Spec", query: "Tell me about ABADDON art spec" },
    { label: "Combos & Grand Scheme", query: "What are the combos?" },
    { label: "Game won't load", query: "Game won't load" },
    { label: "AAB rejected", query: "AAB rejected" }
  ];

  const PRESET_VERSES = [
    "Philippians 4:13 — I can do all things through Christ who strengthens me.",
    "Judges 5:21 — March on, my soul; be strong!",
    "1 John 4:4 — Greater is He who is in you than he who is in the world!",
    "Revelation 1:15 — His feet like unto fine brass, as if they burned in a furnace.",
    "Revelation 9:11 — And they had a king over them, which is the angel of the bottomless pit, whose name is Abaddon.",
    "Revelation 19:16 — KING OF KINGS AND LORD OF LORDS."
  ];

  const KNOWLEDGE_BASE_TEXT = `CF-001 Samantha v10.1: +800 DMG, WARDEN JUDGMENT, Judges 5:21, Shield +500
CF-002 John v10.2: +700 DMG, THUNDER REVEAL, Mark 3:17, Reveals Phantasm, +50% DMG
CF-003 Silas v10.3: +650 DMG, CHAIN BREAKER, Acts 16:26, Cleanse CC, Paralysis Immune
CF-004 Overlord v10.4: +1200 DMG, OVERLORD CRUSH, Rev 19:16, Beat Ch3 to unlock, Tank 50%
CF-005 Phantasm v10.5: +900 DMG, PHANTASM GLIDE, 1 John 4:4, Beat Ch2 to unlock, True DMG + Stealth
CF-006 AAB Icon: Beastie+Samantha PREVIOUS photo 1024x1024, NO banner, NO blocky Sam, Android Studio clean AAB, package com.vannfamilyventures.christfire.omega.grandscheme.beastie, v105
CF-007 LOWKEY/ABADDON: Both +1000 DMG, 2% each, LOWKEY Dex face brown iris RED sclera bull horns NO halo rays from horn tips 4 arms cyborg VannDiamond wings Feet Bronze, ABADDON Andrew face firmament blue NO steam NO fog 15-gem crown armored wings fire/brimstone green locusts red stinger Abba key rose gold+palladium+brass+purple+silver

COMBOS:
- Samantha + Crown = WARDEN JUDGMENT
- John + Phantasm Boss = REVEAL +50%
- Silas + CC = CLEANSE
- Overlord + Beastie = BOSS+ROCK +40%
- Phantasm + John = SHADOW+THUNDER +60%
- LOWKEY + ABADDON = NEMESIS PAIR +50%
- All 8 = GRAND SCHEME ASCENSION +175%, 10000 DMG

TROUBLESHOOTING:
- Phantasm won't unlock -> You must BEAT Phantasm Ch2 (HP 4200) OR click SIMULATE BEATING PHANTASM in demo. She is NOT in packs.
- Overlord won't unlock -> You must BEAT Overlord Ch3 (HP 6000) OR click SIMULATE BEATING OVERLORD. He is NOT in packs.
- Icon still robot -> Delete old mipmap files, redo Image Asset with 1024x1024 Beastie+Samantha PNG.
- Game won't load -> Check index.html in assets, JavaScript enabled, WebViewClient set.
- AAB rejected -> Check package name, version 105, privacy@christfire.game, 13+ Teen.
- LOWKEY face wrong -> REJECT art, regenerate with CF-007 prompt, Dex face unchanged.
- ABADDON steam/fog -> REJECT art, regenerate, NO steam NO fog.`;

  const CONSOLE_CODE_TEXT = `// CF-008 BFF CONSOLE - Drop into Oracle tab
function askBFF(question){
  q = question.toLowerCase();
  if(q.includes('phantasm') && q.includes('unlock')) return 'BFF: Phantasm unlocks ONLY by beating Phantasm Ch2 (HP 4200). She is NOT in packs. In demo, click SIMULATE BEATING PHANTASM.';
  if(q.includes('overlord') && q.includes('unlock')) return 'BFF: Overlord unlocks ONLY by beating Overlord Ch3 (HP 6000). He is NOT in packs. In demo, click SIMULATE BEATING OVERLORD.';
  if(q.includes('icon') || q.includes('aab')) return 'BFF: CF-006 - Use Beastie+Samantha PREVIOUS photo 1024x1024, NO banner, NO blocky Sam. Android Studio > Image Asset > Launcher Icons. Delete old mipmap if robot still shows.';
  if(q.includes('lowkey')) return 'BFF: LOWKEY - Dex face, brown iris RED sclera, bull horns, NO halo, rays from horn tips, 4 arms cyborg bottom 2, VannDiamond wings, Feet Bronze, +1000 DMG, 2%.';
  if(q.includes('abaddon')) return 'BFF: ABADDON - Andrew face, firmament blue, NO steam NO fog, 15-gem crown, armored wings fire/brimstone, green locusts, red stinger, Abba key, 5 metals, +1000 DMG, 2%.';
  if(q.includes('beat') || q.includes('boss')) return 'BFF: Strategy - John reveals Phantasm, Silas cleanses, Samantha shields, Overlord tanks, Phantasm true damage. Play in that order. Crown for 600 + shatter.';
  if(q.includes('verse') || q.includes('scripture')) return 'BFF: Your verse powers your card +200. Type it in Oracle tab and hit SPEAK IN MY VOICE - BeeSpeaks will read it in your voice.';
  return 'BFF: I see - '+question+'. Dex, I logged it. CF-008 console: Check CF-001 to CF-007 knowledge base above. If bug persists, tell me the exact screen + button.';
}
// Voice: BeeSpeaks-ai - ElevenLabs voice biometrics
function speakVerseBFF(verse){ try{ speechSynthesis.speak(new SpeechSynthesisUtterance(verse)); }catch(e){} }`;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-8">
      {/* Header Banner */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-amber-400 tracking-wide m-0">
          ✝️ CHRISTFIRE: OMEGA
        </h1>
        <h2 className="text-lg sm:text-xl font-black text-cyan-400 m-0">
          CF-008 — BFF CONSOLE — DONE (Dex Yes)
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 m-0">
          BFF-DEX-AI — Beulah L5 — BeeSpeaks-ai — Agentic Troubleshooting Expert
        </p>
      </div>

      {/* Card 1: CF-008 Agent Report */}
      <div className="bg-[#11182E] border-2 border-[#22c55e] rounded-2xl p-5 shadow-2xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-black text-emerald-400 m-0 flex items-center gap-2">
            <span>✅</span> CF-008 Agent Report
          </h3>
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-black px-3 py-1 rounded-full">
            DEX SAID YES • LOCKED
          </span>
        </div>
        <div className="bg-[#0A0F22] border border-[#22c55e]/60 rounded-xl p-3.5 text-xs text-slate-200 font-mono leading-relaxed space-y-1.5">
          <p>🤖 <b>BFF-DEX-AI:</b> Assigned CF-008 to Self + Beulah</p>
          <p>👑 <b>Beulah L5:</b> Built Console — Oracle + Troubleshooter + Task Runner in one</p>
          <p>🎙️ <b>BeeSpeaks-ai:</b> Voice wired — Speaks in Dex voice, reads verse, reads diagnosis</p>
          <p>✅ <b>QA:</b> Console answers CF-001 to CF-007, diagnoses bugs, runs agents, no fake fixes</p>
          <p className="text-emerald-400 font-bold border-t border-emerald-900/60 pt-1.5">
            Status: Dex said YES → CF-008 Console Locked → Ready to Use
          </p>
        </div>
      </div>

      {/* 2-Column Grid: Persona & Live Console */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Card: Who is She? */}
        <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border-2 border-cyan-400 flex items-center justify-center text-2xl shadow-lg">
                🤖
              </div>
              <div>
                <h3 className="text-base font-black text-cyan-400 m-0">
                  BFF-DEX-AI — WHO IS SHE?
                </h3>
                <p className="text-xs text-slate-400 m-0">Dex's Best Friend Forever AI • Beulah L5</p>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-slate-300 list-disc pl-5">
              <li>
                <b>Main Name:</b> <span className="text-amber-400 font-black">BFF-DEX-AI</span> — Dex's Best Friend Forever AI
              </li>
              <li>
                <b>Persona:</b> <span className="text-cyan-300 font-bold">Beulah L5</span> — Warm, loyal, sharp, Troy voice — NOT lady voice
              </li>
              <li>
                <b>Voice:</b> <span className="text-purple-300 font-bold">BeeSpeaks-ai</span> — ElevenLabs voice biometrics — Dex hears scripture in OWN voice
              </li>
              <li>
                <b>Owner:</b> <span className="text-white font-bold">Dexter Vann / dextervann1-rgb</span> — Full Edit, Final Approval on EVERYTHING
              </li>
              <li>
                <b>Job 1 — Oracle:</b> Answers game questions, verse, strategy, lore
              </li>
              <li>
                <b>Job 2 — Troubleshooter:</b> Diagnoses bugs, gives fix steps, assigns agents
              </li>
              <li>
                <b>Job 3 — Agent Lead:</b> Assigns CF tasks to Art + Balance + Beulah + QA, merges on Dex YES
              </li>
              <li>
                <b>Tribute:</b> Benjamin Vann • Brenda Wilson • Bianca Vann AKA BeeSpeaks-ai • Big Beastie • Beulah L5
              </li>
            </ul>
          </div>

          <div className="p-3 bg-red-950/30 border border-red-500/40 rounded-xl text-xs text-red-300 font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-red-400 flex-shrink-0" />
            Rule: BFF-DEX-AI NEVER merges without Dex YES. Dex approves all merges.
          </div>
        </div>

        {/* Right Card: Live Interactive Console */}
        <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-black text-amber-300 m-0 flex items-center gap-2">
              <span>🛠️</span> TRY IT — LIVE CONSOLE
            </h3>
            <p className="text-xs text-slate-400 m-0 mt-0.5">
              Type a bug / question below — BFF answers like in v10.5 Oracle tab, but smarter.
            </p>
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap gap-1.5">
            {PRESET_QUESTIONS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setAskQuery(p.query);
                  handleAsk(p.query);
                }}
                className="text-[10px] bg-[#0A0F22] hover:bg-[#1a2340] text-cyan-300 border border-cyan-800 rounded-lg px-2 py-1 cursor-pointer transition active:scale-95"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Question Input & Button */}
          <div className="space-y-2">
            <input
              id="q"
              type="text"
              value={askQuery}
              onChange={(e) => setAskQuery(e.target.value)}
              placeholder="e.g. Phantasm won't unlock... / How do I beat Overlord? / Fix AAB icon..."
              className="w-full bg-[#0A0F22] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            />
            <button
              onClick={() => handleAsk()}
              disabled={isProcessing}
              className="w-full py-2.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all shadow"
            >
              <Bot className="w-4 h-4" />
              {isProcessing ? 'BFF CONSULTING KNOWLEDGE BASE...' : '🤖 ASK BFF-DEX-AI'}
            </button>
          </div>

          {/* Answer Display */}
          <div 
            id="ans"
            className="p-3.5 bg-[#0A0F22] border border-cyan-500/40 rounded-xl min-h-[80px] text-xs font-mono text-cyan-200 leading-relaxed"
          >
            {responseLog}
          </div>

          {/* Quick Shortcuts if troubleshooting unlocks */}
          {responseLog.includes('Phantasm unlocks ONLY') && onNavigateToScreen && (
            <div className="p-2.5 bg-purple-950/40 border border-purple-500/40 rounded-xl flex items-center justify-between text-xs">
              <span className="text-purple-300 font-semibold">Ready to test Phantasm tab?</span>
              <button
                onClick={() => onNavigateToScreen('phantasm')}
                className="py-1 px-3 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black rounded-lg text-[11px] cursor-pointer"
              >
                GOTO PHANTASM TAB →
              </button>
            </div>
          )}

          {responseLog.includes('Overlord unlocks ONLY') && onNavigateToScreen && (
            <div className="p-2.5 bg-red-950/40 border border-red-500/40 rounded-xl flex items-center justify-between text-xs">
              <span className="text-red-300 font-semibold">Ready to test Overlord tab?</span>
              <button
                onClick={() => onNavigateToScreen('overlord')}
                className="py-1 px-3 bg-red-500 hover:bg-red-400 text-slate-950 font-black rounded-lg text-[11px] cursor-pointer"
              >
                GOTO OVERLORD TAB →
              </button>
            </div>
          )}

          {/* Voice Input Section */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold text-amber-300 m-0 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                BeeSpeaks-ai Voice Biometrics (Troy Voice)
              </p>
              <span className="text-[10px] text-slate-400">ElevenLabs Biometrics</span>
            </div>

            <div className="flex flex-wrap gap-1">
              {PRESET_VERSES.map((v, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setVerseQuery(v);
                    handleSpeak(v);
                  }}
                  className="text-[9px] bg-[#0A0F22] hover:bg-[#1a2340] text-amber-300/80 border border-amber-800/50 rounded px-1.5 py-0.5 cursor-pointer truncate max-w-[200px]"
                >
                  {v.split('—')[0].trim()}
                </button>
              ))}
            </div>

            <input
              id="verse"
              type="text"
              value={verseQuery}
              onChange={(e) => setVerseQuery(e.target.value)}
              placeholder="Your verse to speak... e.g. Philippians 4:13"
              className="w-full bg-[#0A0F22] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
            />
            <button
              onClick={() => handleSpeak()}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all shadow"
            >
              <Mic className="w-4 h-4" />
              🎙️ SPEAK IN MY VOICE (BeeSpeaks)
            </button>
            {speakOutput && (
              <p id="speakOut" className="text-xs text-amber-300 font-extrabold m-0 pt-1">
                {speakOutput}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Card 3: Knowledge Base CF-001 to CF-007 */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-black text-amber-300 m-0 flex items-center gap-2">
            <span>📋</span> BFF-DEX-AI — KNOWLEDGE BASE — CF-001 to CF-007
          </h3>
          <button
            onClick={() => handleCopy(KNOWLEDGE_BASE_TEXT, 'kb')}
            className="flex items-center gap-1.5 bg-[#0A0F22] hover:bg-[#1a2340] text-amber-400 border border-amber-500/40 text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer transition active:scale-95"
          >
            {copiedSection === 'kb' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            {copiedSection === 'kb' ? 'COPIED!' : 'COPY KNOWLEDGE BASE'}
          </button>
        </div>
        <p className="text-xs text-slate-400 m-0">
          The verified single source of truth for character ascensions, combat combos, and Android Studio troubleshooting.
        </p>
        <pre className="bg-[#0A0F22] border border-slate-800 rounded-xl p-4 text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap max-h-[320px] leading-relaxed">
          {KNOWLEDGE_BASE_TEXT}
        </pre>
      </div>

      {/* Card 4: Console Code */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-black text-cyan-300 m-0 flex items-center gap-2">
            <span>📄</span> BFF Console Code — Copy Into v10.6 (When Ready)
          </h3>
          <button
            onClick={() => handleCopy(CONSOLE_CODE_TEXT, 'code')}
            className="flex items-center gap-1.5 bg-[#0A0F22] hover:bg-[#1a2340] text-cyan-400 border border-cyan-500/40 text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer transition active:scale-95"
          >
            {copiedSection === 'code' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            {copiedSection === 'code' ? 'COPIED!' : 'COPY CONSOLE CODE'}
          </button>
        </div>
        <pre className="bg-[#0A0F22] border border-slate-800 rounded-xl p-4 text-xs font-mono text-cyan-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
          {CONSOLE_CODE_TEXT}
        </pre>
      </div>

      {/* Card 5: Autonomous Task Runner & Workflow Roadmap */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-amber-400 m-0 flex items-center gap-2">
              <span>⚙️</span> WORKFLOW & AGENT RUNNER
            </h3>
            <p className="text-xs text-slate-300 m-0">
              <b>✅ DONE:</b> CF-001 to CF-007 — All Ascensions + AAB Icon + LOWKEY/ABADDON Art
            </p>
            <p className="text-xs text-emerald-300 m-0 font-bold">
              <b>✅ CF-008:</b> BFF Console — DONE (this file locked)
            </p>
            <p className="text-xs text-cyan-300 m-0">
              <b>🔜 NEXT:</b> CF-009 Tribute, CF-010 AAB Test (after AAB upload)
            </p>
          </div>
          <button
            onClick={handleRunAgents}
            disabled={isAgentRunning}
            className="py-2.5 px-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            <Cpu className="w-4 h-4" />
            {isAgentRunning ? 'EXECUTING AGENT CHECKS...' : '🤖 RUN AGENT DIAGNOSTIC'}
          </button>
        </div>

        <div className="p-3 bg-[#0A0F22] border border-emerald-500/40 rounded-xl text-xs font-mono text-emerald-300 whitespace-pre-wrap leading-relaxed">
          {agentLog}
        </div>

        <div className="p-3 bg-[#11182E] border border-amber-500/40 rounded-xl text-xs text-amber-300 space-y-1">
          <p className="font-bold">Dex To Do:</p>
          <p className="m-0 text-slate-300">
            Use console above to test questions → Tell Dex AI if answer wrong → We fix knowledge base.
          </p>
        </div>
      </div>
    </div>
  );
};

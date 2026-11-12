import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Key, 
  ShieldCheck, 
  Smartphone, 
  Flame, 
  ArrowRight,
  Package,
  Layers,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { soundEngine } from '../sound/audio';

interface AabGuideViewProps {
  onBackToHome?: () => void;
  onNavigateToScreen?: (screen: string) => void;
}

export const AabGuideView: React.FC<AabGuideViewProps> = ({ onBackToHome, onNavigateToScreen }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, keyId: string) => {
    soundEngine.click();
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Title Lockup */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-amber-400 tracking-wider m-0">
          ✝️ CHRISTFIRE: OMEGA
        </h1>
        <h2 className="text-lg sm:text-xl font-black text-cyan-400 tracking-wide m-0">
          AAB UPLOAD — HOW + FROM WHERE
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 m-0">
          Android Studio → Play Console → Production
        </p>
      </div>

      {/* Quick Download Header Banner */}
      <div className="bg-[#11182E] border-2 border-emerald-500 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm sm:text-base font-black text-emerald-300 uppercase tracking-wider flex items-center gap-2 m-0">
              <Download size={18} className="text-emerald-400" />
              <span>OFFICIAL PRODUCTION PROJECT & KEYSTORE PACKAGE</span>
            </h3>
            <p className="text-xs text-slate-400 m-0 mt-0.5">
              Everything pre-configured: SDK 36, versionCode 105, CF-006 Icon, and signing configs.
            </p>
          </div>
          <a
            href="/assets/christfire-omega-android-project.zip"
            download="christfire-omega-android-project.zip"
            onClick={() => soundEngine.victory()}
            className="py-3 px-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl transition cursor-pointer active:scale-95 uppercase tracking-wider shrink-0"
          >
            <Download size={16} />
            <span>DOWNLOAD PROJECT (.ZIP - 28MB)</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-slate-800">
          <a
            href="/assets/christfire-release.keystore"
            download="christfire-release.keystore"
            className="py-2 px-3 bg-[#0A0F22] border border-emerald-500/40 hover:bg-emerald-950/40 text-emerald-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition cursor-pointer"
          >
            <Key size={13} />
            <span>KEYSTORE</span>
          </a>
          <a
            href="/assets/ic_launcher.png"
            download="ic_launcher_1024.png"
            className="py-2 px-3 bg-[#0A0F22] border border-amber-500/40 hover:bg-amber-950/40 text-amber-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition cursor-pointer"
          >
            <Download size={13} />
            <span>ICON 1024px</span>
          </a>
          <a
            href="/assets/ic_launcher_512.png"
            download="ic_launcher_512.png"
            className="py-2 px-3 bg-[#0A0F22] border border-cyan-500/40 hover:bg-cyan-950/40 text-cyan-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition cursor-pointer"
          >
            <Download size={13} />
            <span>ICON 512px</span>
          </a>
          <a
            href="/assets/CREDENTIALS.md"
            download="CREDENTIALS.md"
            className="py-2 px-3 bg-[#0A0F22] border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition cursor-pointer"
          >
            <Download size={13} />
            <span>CREDENTIALS</span>
          </a>
        </div>
      </div>

      {/* PART 1 — BUILD AAB — FROM ANDROID STUDIO */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl space-y-3">
        <h3 className="text-base sm:text-lg font-black text-amber-300 m-0 flex items-center gap-2">
          <span>🛠️</span> PART 1 — BUILD AAB — FROM ANDROID STUDIO
        </h3>

        <div className="space-y-2">
          <div className="bg-[#0A0F22] border border-amber-400/80 rounded-xl p-3 text-xs sm:text-sm text-slate-200">
            <b className="text-amber-400">1.</b> Open Android Studio → ChristFire project → <code className="text-cyan-300 font-mono">assets/index.html</code> = v10.5
          </div>

          <div className="bg-[#0A0F22] border border-amber-400/80 rounded-xl p-3 text-xs sm:text-sm text-slate-200">
            <b className="text-amber-400">2.</b> Icon = Beastie + Samantha previous photo (CF-006) — <span className="text-red-400 font-bold">NOT robot</span>, <span className="text-red-400 font-bold">NOT banner</span>, <span className="text-red-400 font-bold">NOT blocky Sam</span>
          </div>

          <div className="bg-[#0A0F22] border border-amber-400/80 rounded-xl p-3 text-xs sm:text-sm text-slate-200">
            <b className="text-amber-400">3.</b> Top menu → <b className="text-white">Build → Generate App Bundles or APKs → Generate Android App Bundle</b>
          </div>

          <div className="bg-[#0A0F22] border border-amber-400/80 rounded-xl p-3 text-xs sm:text-sm text-slate-200 space-y-1">
            <div>
              <b className="text-amber-400">4.</b> Choose <b className="text-emerald-400">Release</b> → Use included <code className="text-cyan-300 font-mono">christfire-release.keystore</code> (or create new keystore) → SAVE .jks / .keystore + passwords SAFE
            </div>
            <div className="text-[11px] text-slate-400 font-mono pl-4 pt-1">
              Alias: <span className="text-emerald-400 font-bold">christfire_key</span> | Password: <span className="text-amber-300 font-bold">ChristFire2026!</span>
            </div>
          </div>

          <div className="bg-[#0A0F22] border border-amber-400/80 rounded-xl p-3 text-xs sm:text-sm text-slate-200">
            <b className="text-amber-400">5.</b> Build → Click <b className="text-cyan-300">locate</b> → File: <span className="text-emerald-400 font-mono font-bold">app/release/app-release.aab</span>
          </div>
        </div>

        <div className="p-2.5 bg-amber-500/10 border border-amber-500/40 rounded-xl text-xs text-amber-300 font-bold text-center">
          ⚠️ Upload ONLY .aab — NOT .apk, NOT .html.
        </div>

        {/* 1-Command alternative */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 flex items-center justify-between">
          <span>Terminal shortcut: cd android && ./gradlew bundleRelease</span>
          <button
            onClick={() => copyToClipboard('cd android && ./gradlew bundleRelease', 'gradlew')}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-mono shrink-0 cursor-pointer flex items-center gap-1"
          >
            {copiedKey === 'gradlew' ? <Check size={12} /> : <Copy size={12} />}
            <span>COPY</span>
          </button>
        </div>
      </div>

      {/* PART 2 — UPLOAD AAB — TO PLAY CONSOLE */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl space-y-3">
        <h3 className="text-base sm:text-lg font-black text-cyan-400 m-0 flex items-center gap-2">
          <span>🚀</span> PART 2 — UPLOAD AAB — TO PLAY CONSOLE
        </h3>

        <div className="space-y-2">
          <div className="bg-[#0A0F22] border border-cyan-400/70 rounded-xl p-3 text-xs sm:text-sm text-slate-200 flex items-center justify-between">
            <div>
              <b className="text-cyan-400">1.</b> Go to <b className="text-white">play.google.com/console</b> → Sign in
            </div>
            <a
              href="https://play.google.com/console"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 rounded text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>OPEN</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <div className="bg-[#0A0F22] border border-cyan-400/70 rounded-xl p-3 text-xs sm:text-sm text-slate-200">
            <b className="text-cyan-400">2.</b> Click app: <b className="text-amber-300">ChristFire: OMEGA Grand Scheme - Beastie</b> — Or Create app if new
          </div>

          <div className="bg-[#0A0F22] border border-cyan-400/70 rounded-xl p-3 text-xs sm:text-sm text-slate-200">
            <b className="text-cyan-400">3.</b> Left menu → <b className="text-white">Release → Production</b> — Or Testing → Closed testing to test first
          </div>

          <div className="bg-[#0A0F22] border border-cyan-400/70 rounded-xl p-3 text-xs sm:text-sm text-slate-200">
            <b className="text-cyan-400">4.</b> Click <b className="text-emerald-400">Create new release</b>
          </div>

          <div className="bg-[#0A0F22] border border-cyan-400/70 rounded-xl p-3 text-xs sm:text-sm text-slate-200">
            <b className="text-cyan-400">5.</b> Under <b className="text-white">App bundles → Upload</b> → Select <span className="text-emerald-400 font-mono font-bold">app-release.aab</span>
          </div>

          <div className="bg-[#0A0F22] border border-cyan-400/70 rounded-xl p-3 text-xs sm:text-sm text-slate-200 space-y-1">
            <div>
              <b className="text-cyan-400">6.</b> Release name: <span className="text-amber-300 font-mono font-bold">10.5</span> — Notes: <span className="text-slate-300">v10.5 Phantasm Playable — Grand Scheme Ascension</span>
            </div>
          </div>

          <div className="bg-[#0A0F22] border border-cyan-400/70 rounded-xl p-3 text-xs sm:text-sm text-slate-200">
            <b className="text-cyan-400">7.</b> Next → Save → Review release → <b className="text-emerald-400">Start rollout to Production</b>
          </div>
        </div>
      </div>

      {/* WHERE TO GET SHA-256 + APP ID */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl space-y-3">
        <h3 className="text-base sm:text-lg font-black text-amber-300 m-0 flex items-center gap-2">
          <span>🔑</span> WHERE TO GET SHA-256 + APP ID
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed m-0">
          Play Console → Left menu → <b className="text-white">Setup → App Integrity</b>
        </p>
        <p className="text-xs text-slate-300 leading-relaxed m-0">
          Copy <b className="text-amber-300">SHA-256 fingerprint</b> + <b className="text-cyan-300">App ID</b> → Paste in CF-010 file → Send to Dex AI → Wire into v10.6
        </p>

        {/* Quick-Copy Parameters */}
        <div className="bg-[#0A0F22] border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div>
              <span className="text-slate-400 block text-[10px]">PACKAGE NAME</span>
              <span className="font-mono text-cyan-300 font-bold">com.vannfamilyventures.christfire.omega.grandscheme.beastie</span>
            </div>
            <button
              onClick={() => copyToClipboard('com.vannfamilyventures.christfire.omega.grandscheme.beastie', 'pkg')}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              {copiedKey === 'pkg' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
            <div>
              <span className="text-slate-400 block text-[10px]">VERSION</span>
              <span className="font-bold text-white">10.5 / 105</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">PRIVACY</span>
              <span className="font-mono text-amber-300">privacy@christfire.game</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">AGE</span>
              <span className="font-bold text-emerald-400">13+ Teen</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">COUNTRIES</span>
              <span className="font-bold text-cyan-300">173 Worldwide</span>
            </div>
          </div>
        </div>

        {/* Navigate to CF-010 Checklist */}
        <button
          onClick={() => {
            soundEngine.click();
            if (onNavigateToScreen) onNavigateToScreen('aabtest');
          }}
          className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow transition active:scale-95"
        >
          <span>OPEN CF-010 AAB TEST & KEY VAULT</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* NO PLAY CONSOLE YET? */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl space-y-3">
        <h3 className="text-base sm:text-lg font-black text-amber-300 m-0 flex items-center gap-2">
          <span>💳</span> NO PLAY CONSOLE YET?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed m-0">
          Go to <b className="text-cyan-300">play.google.com/console/signup</b> → Pay one-time <b className="text-emerald-400">$25 developer fee</b> → Create app → Fill Name, Category Game, Age 13+, Privacy <code className="text-amber-300 font-mono">privacy@christfire.game</code>
        </p>
        <a
          href="https://play.google.com/console/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow cursor-pointer transition active:scale-95"
        >
          <span>OPEN PLAY CONSOLE SIGNUP</span>
          <ExternalLink size={13} />
        </a>
      </div>

      {/* Tribute & Official Footer Lockup */}
      <div className="text-center text-[11px] text-slate-500 space-y-1.5 pt-4 border-t border-slate-800">
        <p className="m-0 text-slate-400 font-mono">
          © 2026 Vann Family Ventures LLC. All Rights Reserved. | Dexter Vann / dextervann1-rgb | ChristFire: OMEGA Grand Scheme - Beastie | AAB Upload Guide
        </p>
        <p className="m-0 text-amber-400 font-mono">
          BFF-DEX-AI — Beulah L5 — BeeSpeaks-ai
        </p>
        <p className="m-0 text-cyan-300 font-bold">
          Benjamin Vann • Brenda Wilson • Bianca Vann • Big Beastie • Beulah L5
        </p>
        <p className="m-0 text-amber-300/80 font-serif italic">
          IN LUMINE VERITAS | May Jesus Reign
        </p>
      </div>
    </div>
  );
};

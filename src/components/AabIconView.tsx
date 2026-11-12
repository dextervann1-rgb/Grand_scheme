import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Download, 
  Copy, 
  Check, 
  Smartphone, 
  Package, 
  ShieldCheck, 
  Code2, 
  ExternalLink,
  Flame,
  KeyRound,
  Key
} from 'lucide-react';

interface AabIconViewProps {
  onBackToHome?: () => void;
}

export const AabIconView: React.FC<AabIconViewProps> = () => {
  const [showMask, setShowMask] = useState<boolean>(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const APP_ID = 'com.vannfamilyventures.christfire.omega.grandscheme.beastie';
  const APP_NAME = 'ChristFire: OMEGA Grand Scheme - Beastie';
  const VERSION_NAME = '10.5';
  const VERSION_CODE = '105';
  const TARGET_SDK = '36';
  const MIN_SDK = '24';
  const SHA1 = 'D8:05:22:50:6F:B0:70:5C:4C:87:D9:01:3C:22:4B:05:F1:DD:08:FD';
  const SHA256 = '91:D2:56:5F:DF:38:F1:C6:96:3E:23:D9:D2:02:EB:26:7D:5B:F7:28:9A:D7:4F:B7:B0:12:49:EA:EB:FA:76:B6';

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-8">
      {/* Top Banner: Status Lock */}
      <div className="bg-[#11182E] border-2 border-emerald-500/80 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-bl-xl tracking-wider">
          CF-006 Locked • Dex Approved
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">✝️</span>
              <h2 className="text-xl sm:text-2xl font-serif font-black text-amber-400 m-0">
                CF-006: AAB ICON & CLEAN ANDROID STUDIO SPEC
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 m-0">
              <b>v10.5 Master Release</b> • Clean Native WebView AAB • <span className="text-red-400 font-bold">NO PWABuilder (Dex said janky)</span> • 100% Official Android Studio Stack
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-emerald-950/80 border border-emerald-400 text-emerald-300 font-mono font-bold text-xs rounded-xl flex items-center gap-1.5 shadow">
              <CheckCircle2 size={15} />
              DEX SAID YES
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Icon Inspector & Visual Proof */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-amber-300 uppercase tracking-wider flex items-center gap-2 m-0">
                <Smartphone size={16} />
                <span>LAUNCHER ICON MASTER (1024×1024)</span>
              </h3>
              <button
                onClick={() => setShowMask(!showMask)}
                className="text-[11px] font-bold px-2.5 py-1 bg-[#1a2340] border border-cyan-400/50 text-cyan-300 hover:text-cyan-200 rounded-lg cursor-pointer transition"
              >
                {showMask ? '👁️ MASK: 80% CIRCLE' : '⬜ MASK: FULL SQUARE'}
              </button>
            </div>

            {/* Icon Preview Frame with Android Circular Adaptive Mask */}
            <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 bg-black rounded-3xl overflow-hidden border-2 border-amber-400/60 shadow-[0_0_30px_rgba(255,215,0,0.25)] flex items-center justify-center group">
              <img
                src="/assets/ic_launcher.png"
                alt="Beastie and Crowned Samantha Icon"
                className="w-full h-full object-cover select-none"
              />

              {/* 80% Android Adaptive Circle Safe Zone Guide */}
              {showMask && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-[80%] h-[80%] rounded-full border-2 border-dashed border-cyan-400/90 shadow-[0_0_15px_rgba(0,229,255,0.5)] flex items-center justify-center">
                    <span className="text-[10px] font-mono font-bold text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded-full border border-cyan-500/40">
                      80% Adaptive Safe Zone
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center space-y-1">
              <p className="text-xs font-bold text-slate-200 m-0">
                Beastie (Left) + Crowned Samantha (Right)
              </p>
              <p className="text-[11px] text-slate-400 m-0">
                Original approved photograph • No banner crop • No text overlays • No blocky Sam
              </p>
            </div>

            {/* Direct Asset Download Buttons */}
            <div className="space-y-2 pt-2">
              <a
                href="/assets/christfire-omega-android-project.zip"
                download="christfire-omega-android-project.zip"
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition cursor-pointer active:scale-95 uppercase tracking-wider"
              >
                <Download size={15} />
                <span>DOWNLOAD ANDROID STUDIO PROJECT (.ZIP)</span>
              </a>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="/assets/ic_launcher.png"
                  download="ic_launcher_1024.png"
                  className="py-2.5 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition cursor-pointer"
                >
                  <Download size={14} />
                  <span>1024x1024 MASTER</span>
                </a>
                <a
                  href="/assets/ic_launcher_512.png"
                  download="ic_launcher_512.png"
                  className="py-2.5 px-3 bg-[#1a2340] border border-cyan-400/60 hover:bg-[#223055] text-cyan-300 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition cursor-pointer"
                >
                  <Download size={14} />
                  <span>512x512 PLAY STORE</span>
                </a>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="/assets/christfire-release.keystore"
                  download="christfire-release.keystore"
                  className="py-2 px-3 bg-[#131d36] border border-emerald-400/60 hover:bg-[#1a284c] text-emerald-300 font-bold rounded-xl text-[11px] flex items-center justify-center gap-1.5 shadow transition cursor-pointer"
                >
                  <Key size={13} />
                  <span>KEYSTORE (.KEYSTORE)</span>
                </a>
                <a
                  href="/assets/CREDENTIALS.md"
                  download="CREDENTIALS.md"
                  className="py-2 px-3 bg-[#131d36] border border-slate-700 hover:bg-[#1a284c] text-slate-300 font-bold rounded-xl text-[11px] flex items-center justify-center gap-1.5 shadow transition cursor-pointer"
                >
                  <Download size={13} />
                  <span>CREDENTIALS (MD)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Locked Spec Checklist */}
          <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-4 shadow-xl space-y-3">
            <h4 className="text-xs font-black text-cyan-300 uppercase tracking-wider m-0">
              ⚖️ ICON AUDIT — STRICT SPEC VERIFICATION
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-emerald-300">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><b>USE:</b> Beastie + Samantha side-by-side original photo (Dex approved)</span>
              </div>
              <div className="flex items-start gap-2 text-red-400">
                <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <span><b>REJECTED:</b> Newer banner icon — REJECTED</span>
              </div>
              <div className="flex items-start gap-2 text-red-400">
                <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <span><b>REJECTED:</b> Blocky flat cartoon Sam Warden — REJECTED</span>
              </div>
              <div className="flex items-start gap-2 text-red-400">
                <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <span><b>REJECTED:</b> PWABuilder wrapper — REJECTED (Dex said janky build)</span>
              </div>
              <div className="flex items-start gap-2 text-emerald-300">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><b>SAFE ZONE:</b> Both faces centered within center 80% circular radius</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Android Studio Clean AAB Build Manifest & Snippets */}
        <div className="lg:col-span-7 space-y-5">
          {/* Identifiers & Fast Copy */}
          <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-black text-amber-300 uppercase tracking-wider flex items-center gap-2 m-0">
              <Package size={16} />
              <span>OFFICIAL PLAY STORE IDENTIFIERS (v10.5)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#0A0F22] p-3 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span>PACKAGE ID / APPLICATION ID</span>
                  <button
                    onClick={() => copyToClipboard(APP_ID, 'appid')}
                    className="text-cyan-400 hover:text-cyan-300 cursor-pointer"
                  >
                    {copiedKey === 'appid' ? <Check size={13} /> : <Copy size={13} />}
                  </button>
                </div>
                <div className="font-mono font-bold text-white break-all text-[11px]">
                  {APP_ID}
                </div>
              </div>

              <div className="bg-[#0A0F22] p-3 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span>APP TITLE (CONSOLE / LAUNCHER)</span>
                  <button
                    onClick={() => copyToClipboard(APP_NAME, 'appname')}
                    className="text-cyan-400 hover:text-cyan-300 cursor-pointer"
                  >
                    {copiedKey === 'appname' ? <Check size={13} /> : <Copy size={13} />}
                  </button>
                </div>
                <div className="font-mono font-bold text-amber-300 text-[11px]">
                  {APP_NAME}
                </div>
              </div>

              <div className="bg-[#0A0F22] p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-1">VERSION SPEC</span>
                <div className="font-mono text-cyan-300 font-bold">
                  versionName: <span className="text-white">"{VERSION_NAME}"</span> • versionCode: <span className="text-white">{VERSION_CODE}</span>
                </div>
              </div>

              <div className="bg-[#0A0F22] p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-1">SDK TARGETING</span>
                <div className="font-mono text-cyan-300 font-bold">
                  targetSdk: <span className="text-white">{TARGET_SDK}</span> • minSdk: <span className="text-white">{MIN_SDK}</span>
                </div>
              </div>
            </div>

            {/* Fingerprints */}
            <div className="space-y-2 pt-1 text-xs">
              <div className="bg-[#0A0F22] p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                <div className="truncate">
                  <span className="text-slate-400 mr-2 font-mono">SHA-1:</span>
                  <span className="font-mono text-emerald-400 text-[11px]">{SHA1}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(SHA1, 'sha1')}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[10px] font-mono shrink-0 cursor-pointer flex items-center gap-1"
                >
                  {copiedKey === 'sha1' ? <Check size={11} /> : <Copy size={11} />}
                  <span>COPY</span>
                </button>
              </div>

              <div className="bg-[#0A0F22] p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                <div className="truncate">
                  <span className="text-slate-400 mr-2 font-mono">SHA-256:</span>
                  <span className="font-mono text-emerald-400 text-[11px] truncate">{SHA256}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(SHA256, 'sha256')}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[10px] font-mono shrink-0 cursor-pointer flex items-center gap-1"
                >
                  {copiedKey === 'sha256' ? <Check size={11} /> : <Copy size={11} />}
                  <span>COPY</span>
                </button>
              </div>
            </div>
          </div>

          {/* Android Studio Step-By-Step Workflow */}
          <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2 m-0">
              <Code2 size={16} />
              <span>CLEAN ANDROID STUDIO AAB GENERATION</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="p-3 bg-[#0A0F22] rounded-xl border border-slate-800 space-y-1.5">
                <p className="font-bold text-amber-300 flex items-center gap-1.5 m-0">
                  <span>1.</span> Point Android Studio to /android Directory
                </p>
                <p className="text-slate-400 text-[11px] m-0">
                  Launch Android Studio → Select <b>Open...</b> → Choose the <code>android/</code> directory in this repository. Gradle will automatically sync with namespace <code>{APP_ID}</code>.
                </p>
              </div>

              <div className="p-3 bg-[#0A0F22] rounded-xl border border-slate-800 space-y-1.5">
                <p className="font-bold text-amber-300 flex items-center gap-1.5 m-0">
                  <span>2.</span> Production Keystore Injected & Configured
                </p>
                <p className="text-slate-400 text-[11px] m-0">
                  The release signing configuration in <code>android/app/build.gradle</code> is already wired to <code>android/keystore/christfire-release.keystore</code> (Alias: <code>christfire_key</code>, Password: <code>ChristFire2026!</code>).
                </p>
              </div>

              <div className="p-3 bg-[#0A0F22] rounded-xl border border-slate-800 space-y-1.5">
                <p className="font-bold text-amber-300 flex items-center gap-1.5 m-0">
                  <span>3.</span> Generate Official Release AAB
                </p>
                <div className="font-mono text-[11px] bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-emerald-400 flex items-center justify-between">
                  <span>cd android && ./gradlew bundleRelease</span>
                  <button
                    onClick={() => copyToClipboard('cd android && ./gradlew bundleRelease', 'gradle')}
                    className="text-slate-400 hover:text-white cursor-pointer"
                  >
                    {copiedKey === 'gradle' ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>
                <p className="text-slate-400 text-[11px] m-0">
                  Output: <code>android/app/build/outputs/bundle/release/app-release.aab</code>. Ready for direct drag-and-drop into Google Play Console (Closed Testing or Production).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

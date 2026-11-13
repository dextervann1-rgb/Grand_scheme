import React, { useRef, useState } from 'react';
import { GameState } from '../types';
import { Download, Upload, Trash2, ShieldCheck, Volume2, Smartphone, FileText, Terminal } from 'lucide-react';
import { soundEngine } from '../sound/audio';

interface SettingsScreenViewProps {
  state: GameState;
  onToggleSound: () => void;
  onToggleHaptics: () => void;
  onToggleDevMode: () => void;
  onImportState: (newState: GameState) => void;
  onDeleteAllData: () => void;
  onOpenPrivacyModal: () => void;
}

export const SettingsScreenView: React.FC<SettingsScreenViewProps> = ({
  state,
  onToggleSound,
  onToggleHaptics,
  onToggleDevMode,
  onImportState,
  onDeleteAllData,
  onOpenPrivacyModal,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [deleteInput, setDeleteInput] = useState<string>('');
  const [deleteMsg, setDeleteMsg] = useState<string | null>(null);

  const playerId = state.playerId || 'CF-OMEGA';

  const handleExportSave = () => {
    soundEngine.click();
    const payload = {
      ...state,
      version: '10.6',
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `christfire_save_${playerId}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setSaveMsg(`✅ Save exported (christfire_save_${playerId}.json)! Keep this file safe.`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || ''));
        if (!parsed || typeof parsed !== 'object') {
          throw new Error('Invalid JSON structure');
        }
        onImportState({
          ...state,
          ...parsed,
          screen: 'settings',
        });
        soundEngine.victory();
        setSaveMsg('✅ Save imported and restored cleanly!');
      } catch {
        soundEngine.hurt();
        setSaveMsg('❌ Invalid save file. Please choose a valid ChristFire JSON export.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDelete = () => {
    if (deleteInput.trim() !== 'DELETE') {
      soundEngine.hurt();
      setDeleteMsg('⚠️ Type DELETE in all caps above to confirm.');
      return;
    }
    soundEngine.shatter();
    onDeleteAllData();
    setDeleteInput('');
    setDeleteMsg('✅ All local save data erased cleanly. Email privacy@christfire.game for cloud deletion inquiries.');
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 pb-6">
      {/* Card 1: Audio, Haptics, Save Backup & Dex Mode */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="text-lg font-black text-cyan-300 m-0">⚙️ SETTINGS &amp; SAVE</h3>
          <span className="text-[11px] font-mono bg-[#0A0F22] border border-cyan-500/40 px-2.5 py-0.5 rounded-full text-cyan-300">
            Player ID: <b>{playerId}</b>
          </span>
        </div>

        {/* Toggles Row */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onToggleSound}
            className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
              state.sound
                ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                : 'bg-[#0A0F22] border-slate-700 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-black">
              <Volume2 size={15} />
              <span>SOUND</span>
            </div>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${state.sound ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
              {state.sound ? 'ON' : 'OFF'}
            </span>
          </button>

          <button
            onClick={onToggleHaptics}
            className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
              state.haptics !== false
                ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                : 'bg-[#0A0F22] border-slate-700 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-black">
              <Smartphone size={15} />
              <span>HAPTICS</span>
            </div>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${state.haptics !== false ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
              {state.haptics !== false ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>

        {/* Cloud & Local Save Info */}
        <div className="bg-[#0A0F22] border border-cyan-500/30 rounded-xl p-3 text-xs text-slate-300 leading-relaxed">
          <p className="m-0">
            <b className="text-cyan-300">Cloud Save Status:</b> Local auto-save active + JSON Export/Import backup. Firebase Auth + Firestore cloud sync hook is ready when enabled in Android Studio.
          </p>
          {state.savedAt && (
            <p className="text-[10px] text-slate-400 font-mono mt-1 mb-0">
              Last auto-saved: {new Date(state.savedAt).toLocaleString()}
            </p>
          )}
        </div>

        {/* Export / Import Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleExportSave}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow cursor-pointer transition"
          >
            <Download size={14} />
            <span>💾 EXPORT SAVE (DOWNLOAD JSON)</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2.5 px-4 bg-[#1a2340] hover:bg-[#232f54] border border-slate-600 text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition"
          >
            <Upload size={14} />
            <span>📂 IMPORT SAVE (.JSON FILE)</span>
          </button>

          {saveMsg && (
            <p className="text-xs font-bold text-emerald-300 bg-[#0A0F22] border border-emerald-500/40 rounded-lg p-2.5 m-0">
              {saveMsg}
            </p>
          )}
        </div>

        {/* Dex-Only Dev Mode Toggle */}
        <div className="bg-[#2b1408] border border-amber-500/50 rounded-xl p-3 flex items-center justify-between gap-3">
          <div className="text-xs">
            <div className="font-black text-amber-400 flex items-center gap-1.5">
              <Terminal size={13} />
              <span>DEX ONLY: BUILD MODE</span>
            </div>
            <p className="text-[11px] text-slate-300 m-0 mt-0.5">
              {state.devMode
                ? 'DEV MODE — Internal BFF / Workflow / AAB tabs visible'
                : 'PRODUCTION — Dev tabs hidden from players'}
            </p>
          </div>
          <button
            onClick={onToggleDevMode}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-black uppercase cursor-pointer shrink-0 transition ${
              state.devMode
                ? 'bg-red-600 text-white'
                : 'bg-emerald-500 text-slate-950'
            }`}
          >
            {state.devMode ? 'DEV ON' : 'PROD ON'}
          </button>
        </div>
      </div>

      {/* Card 2: Privacy & Data Deletion */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-black text-white m-0">🔒 PRIVACY + DATA DELETION</h3>
          </div>

          <div className="bg-[#0A0F22] border border-slate-800 rounded-xl p-3 text-xs text-slate-300 space-y-1.5 leading-relaxed">
            <p className="m-0">
              Privacy Contact: <b className="text-cyan-300">privacy@christfire.game</b>
            </p>
            <p className="m-0">
              Age Rating: <b className="text-amber-300">Age 13+ Teen</b> • No public chat, no stranger messaging, no personalized tracking ads.
            </p>
            <p className="m-0 text-slate-400 text-[11px]">
              Type <b className="text-white">DELETE</b> below to erase all local game progress, cards, and streak data immediately.
            </p>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              placeholder="Type DELETE"
              className="w-full bg-[#0A0F22] border border-slate-600 focus:border-red-500 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none"
            />
            <button
              onClick={handleDelete}
              className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow cursor-pointer transition"
            >
              <Trash2 size={14} />
              <span>🗑️ DELETE ALL MY DATA</span>
            </button>
            {deleteMsg && (
              <p className="text-xs font-bold text-red-300 bg-red-950/40 border border-red-500/40 rounded-lg p-2.5 m-0">
                {deleteMsg}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={onOpenPrivacyModal}
          className="w-full py-2.5 px-4 bg-[#1a2340] hover:bg-[#232f54] border border-slate-600 text-cyan-300 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition"
        >
          <FileText size={14} />
          <span>📄 VIEW PRIVACY POLICY</span>
        </button>
      </div>
    </div>
  );
};

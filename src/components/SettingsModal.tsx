import React, { useState } from 'react';
import { GameState } from '../types';
import { Settings, Download, Upload, Trash2, Volume2, ShieldCheck, Check, AlertTriangle, X, Mic } from 'lucide-react';
import { soundEngine } from '../sound/audio';

interface SettingsModalProps {
  state: GameState;
  onImportState: (newState: GameState) => void;
  onDeleteAllData: () => void;
  onClose: () => void;
  initialTab?: 'settings' | 'privacy';
  onOpenVoiceSettings?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  state,
  onImportState,
  onDeleteAllData,
  onClose,
  initialTab = 'settings',
  onOpenVoiceSettings,
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'privacy'>(initialTab);
  const [copied, setCopied] = useState<boolean>(false);
  const [importJson, setImportJson] = useState<string>('');
  const [importError, setImportError] = useState<string | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  const handleExport = () => {
    soundEngine.click();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `christfire_save_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    if (navigator.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(state));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleImport = () => {
    soundEngine.click();
    setImportError(null);
    try {
      const parsed = JSON.parse(importJson);
      if (typeof parsed !== 'object' || parsed === null) {
        throw new Error('Invalid JSON format');
      }
      if (typeof parsed.valuation !== 'number' || typeof parsed.screen !== 'string') {
        throw new Error('Missing key ChristFire game save properties');
      }
      onImportState(parsed as GameState);
      soundEngine.victory();
      alert('Save loaded successfully! Fellowship restored.');
      onClose();
    } catch (err: unknown) {
      setImportError((err as Error).message || 'Failed to parse JSON file');
    }
  };

  const confirmDelete = () => {
    soundEngine.shatter();
    onDeleteAllData();
    setShowConfirmDelete(false);
    alert('All local game data, streaks, and progress have been permanently erased.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-xl bg-[#090f24] border-2 border-amber-400 rounded-2xl p-5 shadow-[0_0_35px_rgba(255,215,0,0.3)] max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <Settings className="text-amber-400" size={24} />
            <div>
              <h3 className="text-lg font-black text-amber-300 font-serif tracking-wide">
                SYSTEM & PRIVACY PROTOCOL
              </h3>
              <p className="text-[11px] text-cyan-300 font-mono">
                Auto-Save: ACTIVE (localStorage) • v9.1 Complete
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab selector */}
        <div className="flex gap-2 mb-4 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => { soundEngine.click(); setActiveTab('settings'); }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'settings' ? 'bg-amber-400 text-black shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Settings size={14} />
            <span>SAVE & AUDIO</span>
          </button>
          <button
            onClick={() => { soundEngine.click(); setActiveTab('privacy'); }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'privacy' ? 'bg-amber-400 text-black shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck size={14} />
            <span>PRIVACY & LEGAL</span>
          </button>
        </div>

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="overflow-y-auto flex-1 pr-1 space-y-4">
            {/* Auto-Save & Export */}
            <div className="bg-[#0f1738] border border-slate-800 rounded-xl p-3.5">
              <h4 className="text-xs font-bold text-amber-300 font-serif mb-1 flex items-center gap-2">
                <Download size={14} className="text-cyan-400" />
                EXPORT & BACKUP SAVE
              </h4>
              <p className="text-[11px] text-slate-300 mb-3">
                Download your full save JSON or copy to clipboard to migrate across devices.
              </p>
              <button
                onClick={handleExport}
                className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-xs rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow"
              >
                {copied ? <Check size={15} /> : <Download size={15} />}
                <span>{copied ? 'SAVE JSON COPIED & DOWNLOADED!' : 'EXPORT SAVE JSON'}</span>
              </button>
            </div>

            {/* Import Save */}
            <div className="bg-[#0f1738] border border-slate-800 rounded-xl p-3.5">
              <h4 className="text-xs font-bold text-amber-300 font-serif mb-1 flex items-center gap-2">
                <Upload size={14} className="text-amber-400" />
                IMPORT SAVE FILE
              </h4>
              <p className="text-[11px] text-slate-300 mb-2">
                Paste valid ChristFire save JSON below:
              </p>
              <textarea
                value={importJson}
                onChange={(e) => setImportJson(e.target.value)}
                placeholder='Paste {"valuation": 1000, "screen": "battle", ...}'
                className="w-full h-16 bg-slate-950 border border-slate-700 rounded-lg p-2 text-[10px] font-mono text-cyan-200 resize-none focus:outline-none focus:border-cyan-400"
              />
              {importError && (
                <p className="text-[10px] text-red-400 font-mono mt-1">⚠️ {importError}</p>
              )}
              <button
                onClick={handleImport}
                disabled={!importJson.trim()}
                className="w-full mt-2 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-black font-black text-xs rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Upload size={14} />
                <span>RESTORE SAVE FROM JSON</span>
              </button>
            </div>

            {/* Voice Narration & Sound Changer */}
            <div className="bg-[#121c45] border border-amber-500/40 rounded-xl p-3.5">
              <h4 className="text-xs font-bold text-amber-300 font-serif mb-1 flex items-center gap-2">
                <Mic size={14} className="text-amber-400" />
                VOICE NARRATION & SOUND PERSONAS
              </h4>
              <p className="text-[11px] text-slate-300 mb-2.5">
                Configure voice personas (Samantha Crowned, Big Beastie, Vann Herald, Synth Oracle) and pitch/cadence sound warping.
              </p>
              {onOpenVoiceSettings && (
                <button
                  onClick={() => { onClose(); onOpenVoiceSettings(); }}
                  className="w-full py-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 text-black font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer shadow"
                >
                  <Mic size={14} />
                  <span>OPEN VOICE CHANGER & SOUND SETTINGS</span>
                </button>
              )}
            </div>

            {/* Delete All Data (GDPR Compliant) */}
            <div className="bg-red-950/30 border border-red-500/40 rounded-xl p-3.5">
              <h4 className="text-xs font-bold text-red-400 font-serif mb-1 flex items-center gap-2">
                <Trash2 size={14} />
                DATA PRIVACY DELETION (TEEN 13+ / GDPR)
              </h4>
              <p className="text-[11px] text-slate-300 mb-2">
                Permanently purge all local progress, leaderboard personal bests, and streak cache from this browser.
              </p>
              {!showConfirmDelete ? (
                <button
                  onClick={() => setShowConfirmDelete(true)}
                  className="py-1.5 px-3 bg-red-950 hover:bg-red-900 border border-red-500 text-red-300 font-bold text-xs rounded-lg transition cursor-pointer flex items-center gap-1.5"
                >
                  <AlertTriangle size={14} />
                  <span>DELETE ALL MY DATA</span>
                </button>
              ) : (
                <div className="bg-red-900/60 p-2.5 rounded-lg border border-red-400">
                  <p className="text-xs font-bold text-white mb-2">
                    Are you sure? This cannot be undone. All game progress will be lost.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={confirmDelete}
                      className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-black text-xs rounded cursor-pointer"
                    >
                      CONFIRM PURGE
                    </button>
                    <button
                      onClick={() => setShowConfirmDelete(false)}
                      className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded hover:bg-slate-700 cursor-pointer"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <div className="overflow-y-auto flex-1 pr-1 text-xs text-slate-300 space-y-3 leading-relaxed">
            <div className="bg-[#0f1738] p-3 rounded-xl border border-slate-800">
              <h4 className="text-sm font-bold text-amber-300 font-serif mb-1">
                PRIVACY POLICY & OWNERSHIP NOTICE
              </h4>
              <p className="text-[11px] text-slate-400 mb-2 font-mono">
                Effective: 2026 | Age Rating: 13+ Teen | Offline First
              </p>
              <p className="mb-2">
                <b>© 2026 Vann Family Ventures LLC. All Rights Reserved.</b><br />
                Owner: Dexter Vann / Vann Family Ventures LLC.<br />
                Characters: Big Beastie, Samantha the Warden Crowned, John Thunderer, Silas Unchained, VannDiamonds, VannDiamond Crown, and ChristFire are proprietary marks of Vann Family Ventures LLC.
              </p>
              <p className="mb-2">
                <b>Data Privacy:</b> This game operates entirely in your local browser storage (localStorage). No personal credentials, emails, or behavioral tracking telemetry are transmitted to third-party ad networks.
              </p>
              <p>
                <b>Data Deletion Inquiries:</b> You can erase your save immediately via the &quot;Delete All My Data&quot; button above, or by contacting{' '}
                <a href="mailto:privacy@christfire.game" className="text-cyan-300 underline">privacy@christfire.game</a>.
              </p>
            </div>

            <div className="bg-[#0f1738] p-3 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold text-amber-300 font-serif mb-1">
                IN LUMINE VERITAS | MAY JESUS REIGN
              </h4>
              <p className="text-[11px] text-slate-400">
                Biblical quotations referenced from Philippians 4:13, Judges 5:21, Mark 3:17, Psalm 91:4, Ephesians 6:11, and Acts 16:26.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 text-center mt-2">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-amber-400 text-black font-bold text-xs rounded-xl hover:bg-amber-300 transition cursor-pointer"
          >
            CLOSE SETTINGS
          </button>
        </div>
      </div>
    </div>
  );
};

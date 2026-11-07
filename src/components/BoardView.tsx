import React, { useState } from 'react';
import { GameState, LeaderboardEntry } from '../types';
import { Trophy, Medal, Award, Download, Upload, Trash2, CheckCircle2 } from 'lucide-react';

interface BoardViewProps {
  state: GameState;
  onSaveScore: (playerName: string) => void;
  onExportSave: () => void;
  onImportSave: (json: string) => void;
  onResetGame: () => void;
}

export const BoardView: React.FC<BoardViewProps> = ({
  state,
  onSaveScore,
  onExportSave,
  onImportSave,
  onResetGame,
}) => {
  const [playerName, setPlayerName] = useState<string>('VannChampion');
  const [importText, setImportText] = useState<string>('');
  const [showImportBox, setShowImportBox] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const currentScore = Math.min(
    999999999,
    Math.floor((state.valuation * state.momentum) + (state.security * 25) + (state.verses * 500))
  );

  const handleScoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    onSaveScore(playerName.trim());
    setStatusMessage('🏆 Score registered on Fellowship Grand Scheme Leaderboard!');
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleImportSubmit = () => {
    if (!importText.trim()) return;
    onImportSave(importText.trim());
    setShowImportBox(false);
    setImportText('');
    setStatusMessage('✅ Game save data imported successfully!');
    setTimeout(() => setStatusMessage(null), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🏆</span>
            <h2 className="text-xl font-black text-amber-400 m-0">GLOBAL FELLOWSHIP BOARD & RECORDS</h2>
          </div>
          <p className="text-xs text-slate-300">
            Official records for <span className="text-amber-300 font-bold">ChristFire: OMEGA Grand Scheme - Beastie</span>.
          </p>
        </div>

        <div className="bg-[#0A0F22] border border-amber-500/40 px-4 py-2 rounded-xl text-center">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Current Calculated Score</p>
          <p className="text-xl font-black text-amber-400">{currentScore.toLocaleString()} PTS</p>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          {statusMessage}
        </div>
      )}

      {/* Score Registration Card */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl">
        <h3 className="text-sm font-extrabold text-cyan-300 uppercase tracking-wider mb-2">
          Register High Score to Eternal Hall of Faith
        </h3>
        <form onSubmit={handleScoreSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter Hero Handle (e.g. VannChampion)"
            maxLength={20}
            className="flex-1 bg-[#0A0F22] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            className="py-2.5 px-6 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            RECORD SCORE ({currentScore.toLocaleString()} PTS)
          </button>
        </form>
        <p className="text-[11px] text-slate-400 mt-2">
          Formula: <span className="text-slate-300 font-semibold">(Valuation × Momentum) + (Security × 25) + (Verses × 500)</span>
        </p>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-white flex items-center gap-2 m-0">
            <Trophy className="w-4 h-4 text-amber-400" />
            TOP FELLOWSHIP SCORES
          </h3>
          <span className="text-xs text-slate-400 font-semibold">
            {state.leaderboard?.length || 0} Registered Champions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 text-[11px] uppercase">
                <th className="py-2.5 px-3">Rank</th>
                <th className="py-2.5 px-3">Player</th>
                <th className="py-2.5 px-3">Score</th>
                <th className="py-2.5 px-3">Valuation</th>
                <th className="py-2.5 px-3">Momentum</th>
                <th className="py-2.5 px-3">Verses</th>
                <th className="py-2.5 px-3">Chapter</th>
              </tr>
            </thead>
            <tbody>
              {(state.leaderboard || []).slice(0, 10).map((entry, idx) => (
                <tr
                  key={entry.id || idx}
                  className={`border-b border-slate-800/80 hover:bg-slate-800/30 transition-colors ${
                    idx === 0 ? 'bg-amber-500/10 font-bold' : ''
                  }`}
                >
                  <td className="py-3 px-3">
                    {idx === 0 ? '🥇 1' : idx === 1 ? '🥈 2' : idx === 2 ? '🥉 3' : `#${idx + 1}`}
                  </td>
                  <td className="py-3 px-3 font-extrabold text-white">
                    {entry.playerName}
                  </td>
                  <td className="py-3 px-3 font-mono font-black text-amber-300">
                    {entry.score.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-cyan-300 font-mono">
                    💰 {entry.valuation}
                  </td>
                  <td className="py-3 px-3 text-purple-300 font-mono">
                    ⚡ {entry.momentum.toFixed(2)}x
                  </td>
                  <td className="py-3 px-3 text-emerald-300 font-mono">
                    📖 {entry.verses}
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    Ch {entry.chapter}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save / Export / Reset Controls */}
      <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl space-y-4">
        <h3 className="text-sm font-black text-slate-300 uppercase tracking-wider m-0">
          Save Data & Archive Management
        </h3>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onExportSave}
            className="py-2.5 px-4 bg-[#1a2340] border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-bold rounded-xl text-xs uppercase flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            EXPORT SAVE FILE (JSON)
          </button>

          <button
            onClick={() => setShowImportBox(!showImportBox)}
            className="py-2.5 px-4 bg-[#1a2340] border border-amber-500/40 hover:border-amber-400 text-amber-300 font-bold rounded-xl text-xs uppercase flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <Upload className="w-3.5 h-3.5" />
            IMPORT SAVE FILE
          </button>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                onResetGame();
              }
            }}
            className="py-2.5 px-4 bg-red-950/60 border border-red-500/40 hover:border-red-400 text-red-300 font-bold rounded-xl text-xs uppercase flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all ml-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            RESET PROGRESS
          </button>
        </div>

        {showImportBox && (
          <div className="p-4 bg-[#0A0F22] border border-amber-500/30 rounded-xl space-y-3">
            <p className="text-xs text-slate-300">Paste your previously exported JSON save string here:</p>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              rows={4}
              placeholder='{"screen":"home","fragments":500,...}'
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-mono text-cyan-300 font-mono focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={handleImportSubmit}
              disabled={!importText.trim()}
              className="py-2 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-lg text-xs uppercase cursor-pointer"
            >
              LOAD SAVE NOW
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

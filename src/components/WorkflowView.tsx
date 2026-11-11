import React, { useState } from 'react';
import { CheckCircle2, Clock, Play, Plus, Cpu, Bot } from 'lucide-react';

interface WorkflowViewProps {
  tasks: string[];
  onAddTask: (task: string) => void;
}

export const WorkflowView: React.FC<WorkflowViewProps> = ({ tasks, onAddTask }) => {
  const [newTaskInput, setNewTaskInput] = useState<string>('');
  const [agentLog, setAgentLog] = useState<string>('CF-004 agents done. CF-005 idle.');
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleAdd = () => {
    if (!newTaskInput.trim()) return;
    onAddTask(newTaskInput.trim());
    setNewTaskInput('');
  };

  const handleRunAgents = () => {
    setIsRunning(true);
    setAgentLog('🤖 BFF-DEX-AI assigning CF-005...\n👑 Beulah drafting Phantasm...\n✅ QA testing invisible + glide...\nCF-005 draft ready — Dexter, approve.');
    setTimeout(() => setIsRunning(false), 800);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Pipeline Roadmap */}
        <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">⚙️</span>
              <h3 className="text-base font-black text-amber-300 m-0">WORKFLOW — CF-001, CF-002, CF-003 & CF-004 DONE, CF-005 QUEUED</h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  DONE: CF-001 Samantha Crowned Ascension (v10.1)
                </span>
                <p className="text-slate-300 text-[11px] m-0">
                  Merged into v10.1 • Real Samantha likeness, +800 DMG, +500 Team Shield, WARDEN JUDGMENT, Judges 5:21.
                </p>
              </div>

              <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  DONE: CF-002 John Thunder Ascension (v10.2)
                </span>
                <p className="text-slate-300 text-[11px] m-0">
                  Merged into v10.2 • +700 DMG, 3 Energy, THUNDER REVEAL, reveals Phantasm (+50% DMG), stuns all, Mark 3:17.
                </p>
              </div>

              <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  DONE: CF-003 Silas Unchained Ascension (v10.3)
                </span>
                <p className="text-slate-300 text-[11px] m-0">
                  Merged into v10.3 • +650 DMG, 3 Energy, CHAIN BREAKER, cleanses all CC, paralyzes shadow 2 turns, Acts 16:26.
                </p>
              </div>

              <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  DONE: CF-004 Overlord Playable Ascension (v10.4)
                </span>
                <p className="text-slate-300 text-[11px] m-0">
                  Merged into v10.4 • +1200 DMG, 4 Energy, OVERLORD CRUSH (ignores 50% shield), Tanks 50% team damage 2 turns, Revelation 19:16.
                </p>
              </div>

              <div className="p-3 bg-[#0A0F22] border border-cyan-500/30 rounded-xl text-slate-300 space-y-1">
                <p className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  NEXT IN PIPELINE:
                </p>
                <p>• <b>CF-005:</b> Phantasm Playable Ascension — After beating her, invisible + glide (QUEUED)</p>
                <p>• <b>CF-006:</b> AAB Icon Lock — Beastie + Samantha official portrait (DONE Dex Yes)</p>
                <p>• <b>CF-007:</b> LOWKEY & ABADDON art showcase — QUEUED</p>
                <p>• <b>CF-008:</b> BFF-DEX-AI console integration — QUEUED</p>
                <p>• <b>CF-009:</b> Tribute to Benjamin, Brenda, Bianca, Beastie, Beulah — QUEUED</p>
                <p>• <b>CF-010:</b> AAB Test & Play Console testing — QUEUED</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => alert('CF-004 merged. Ready for CF-005 Phantasm when Dexter says Yes.')}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider active:scale-95 transition-all cursor-pointer shadow"
            >
              ✅ CF-004 MERGED — READY FOR CF-005
            </button>
          </div>
        </div>

        {/* Card 2: Interactive Task Queue & Agent Runner */}
        <div className="bg-[#11182E] border border-[#2a3a6a] rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-black text-cyan-300 m-0 flex items-center gap-2">
                <span>📋</span> TASK QUEUE ({tasks.length})
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">Agent Queue</span>
            </div>

            {/* Task List */}
            <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1 text-xs">
              {tasks.map((task, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-2 ${
                    task.includes('DONE')
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                      : 'bg-[#0A0F22] border-slate-800 text-slate-200'
                  }`}
                >
                  <span className="font-bold text-amber-400 text-[10px]">#{idx + 1}</span>
                  <span className="truncate">{task}</span>
                </div>
              ))}
            </div>

            {/* Add Task Input */}
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                placeholder="New task for autonomous agents..."
                className="flex-1 bg-[#0A0F22] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              />
              <button
                onClick={handleAdd}
                className="py-2 px-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-lg text-xs uppercase cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <button
              onClick={handleRunAgents}
              disabled={isRunning}
              className="w-full py-2.5 px-4 bg-[#1a2340] border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow"
            >
              <Bot className="w-4 h-4" />
              {isRunning ? 'AGENTS EXECUTING...' : '🤖 RUN AGENTS'}
            </button>

            <pre className="mt-2.5 bg-[#0A0F22] border border-slate-800 rounded-xl p-3 text-xs font-mono text-emerald-400 min-h-[75px] whitespace-pre-wrap">
              {agentLog}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

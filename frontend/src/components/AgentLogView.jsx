import React from 'react';
import { Cpu, CheckCircle2, AlertTriangle, Clock, RefreshCw, Terminal, Layers } from 'lucide-react';

export default function AgentLogView({ logs = [], onRefresh, isRefreshing = false }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            Autonomous Multi-Agent Telemetry & Decision Log
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time audit trail of multi-agent reasoning, consensus voting, and automated pricing pipeline.
          </p>
        </div>
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
          <span>Refresh Trace</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#131C31] border border-slate-800">
          <div className="text-[11px] uppercase font-bold text-slate-400">Orchestrator Mode</div>
          <div className="text-lg font-bold text-white mt-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            HITL Active
          </div>
          <p className="text-xs text-slate-400 mt-1">Human-In-The-Loop review required for non-autonomous SKUs</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#131C31] border border-slate-800">
          <div className="text-[11px] uppercase font-bold text-slate-400">Agent Swarm Size</div>
          <div className="text-lg font-bold text-white mt-1">6 Specialized Sub-Agents</div>
          <p className="text-xs text-slate-400 mt-1">Weather, Vision, Elasticity, HACCP, Footfall, Inventory</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#131C31] border border-slate-800">
          <div className="text-[11px] uppercase font-bold text-slate-400">Avg Consensus Latency</div>
          <div className="text-lg font-bold text-emerald-400 font-mono mt-1">420ms</div>
          <p className="text-xs text-slate-400 mt-1">Real-time inference & price dispatch</p>
        </div>
      </div>

      {/* Terminal-like audit feed */}
      <div className="rounded-2xl bg-[#0F172A] border border-slate-800 overflow-hidden shadow-2xl">
        <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>AGENT_COORDINATION_STREAM::HYD_STORES</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            STREAMING LIVE
          </span>
        </div>

        <div className="divide-y divide-slate-800/60 p-2 font-mono text-xs">
          {logs.map((log) => (
            <div key={log.id} className="p-3.5 hover:bg-slate-800/40 transition rounded-xl flex items-start space-x-4">
              <div className="text-slate-400 text-[11px] whitespace-nowrap pt-0.5">
                {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : '10:45:30'}
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    log.level === 'SUCCESS' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : log.level === 'WARN'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {log.level || 'INFO'}
                  </span>
                  <span className="text-white font-bold">{log.agent}</span>
                  <span className="text-slate-400">→</span>
                  <span className="text-cyan-400 font-semibold">{log.event}</span>
                </div>
                <p className="text-slate-300 font-sans text-xs mt-1.5 leading-relaxed">
                  {log.details}
                </p>
              </div>

              <div className="text-[10px] text-slate-400 font-mono">
                {log.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { 
  Sparkles, 
  LayoutDashboard, 
  BellRing, 
  Cpu, 
  SlidersHorizontal, 
  Database,
  Leaf,
  ShieldCheck,
  Network,
  FlaskConical,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ currentTab, setCurrentTab, alertCount = 14, unreviewedCount = 12, onOpenLanding }) {
  const navigate = useNavigate();
  const menuItems = [
    { id: 'overview',         label: 'Overview',           icon: LayoutDashboard },
    { id: 'alerts',           label: 'Alerts & Actions',   icon: BellRing,        badge: alertCount },
    { id: 'agent-log',        label: 'Agent Log',          icon: Cpu },
    { id: 'agent-ensemble',   label: 'Agent Ensemble',     icon: Network,         badge: '5', badgeType: 'special' },
    { id: 'simulation',       label: 'Simulation',         icon: SlidersHorizontal },
    { id: 'sim-eval',         label: 'Sim Evaluation',     icon: FlaskConical,    badge: 'NEW', badgeType: 'special' },
    { id: 'data-sources',     label: 'Data Sources',       icon: Database },
    { id: 'admin-users',      label: 'Users Admin',        icon: Users,           badge: 'Live', badgeType: 'special', isRoute: true, path: '/admin/users' },
  ];

  return (
    <aside className="w-64 bg-[#0F172A] border-r border-slate-800/80 flex flex-col justify-between select-none shrink-0 min-h-screen text-slate-300">
      <div>
        {/* FreshMind 3D AI Logo */}
        <div 
          onClick={onOpenLanding}
          className="px-6 py-5 border-b border-slate-800/80 flex items-center space-x-3 cursor-pointer hover:bg-slate-800/40 transition group"
          title="Click to view 3D Welcome Landing Page"
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 shadow-lg shadow-emerald-500/25 border border-emerald-300/30 group-hover:scale-105 transition-transform">
            <Leaf className="w-6 h-6 text-white drop-shadow-md" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-slate-900"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-emerald-300 transition-colors">FreshMind</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 tracking-wider">
                AI POC
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Zero-Waste Grocery</p>
          </div>
        </div>

        {/* 3D Landing Page Switcher Button */}
        {onOpenLanding && (
          <div className="px-3 pt-4 pb-1">
            <button
              onClick={onOpenLanding}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all duration-200 shadow-sm group"
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
                <span>3D Welcome Page</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/30 text-white font-mono">
                3D
              </span>
            </button>
          </div>
        )}

        {/* Navigation Menu */}
        <div className="px-3 py-4">
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Agentic Core
          </div>
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.isRoute && item.path) {
                      navigate(item.path);
                    } else {
                      setCurrentTab(item.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/15 to-teal-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      item.badgeType === 'special'
                        ? 'bg-gradient-to-r from-cyan-500/30 to-indigo-500/30 text-cyan-300 border border-cyan-500/30'
                        : isActive 
                          ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/50' 
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Live Autonomous Agent Status card */}
        <div className="px-4 mx-3 py-3 rounded-2xl bg-slate-800/40 border border-slate-700/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              Agent Consensus
            </span>
            <span className="text-[10px] font-bold text-emerald-400 px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20">
              Active
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Multi-agent orchestrator continuously polling 4 stores, 38°C weather forecast, and POS elasticity curves.
          </p>
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-700/50">
            <span>Pending Reviews</span>
            <span className="font-bold text-amber-400">{unreviewedCount} items</span>
          </div>
        </div>
      </div>

      {/* System Health / Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/50">
        <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-medium text-slate-300">HITL Safety Guardrails Active</span>
        </div>
        <p className="text-[10px] text-slate-400">
          Auto-execution threshold: &gt;95% confidence. Manual approval required for others.
        </p>
      </div>
    </aside>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import {
  Cloud, TrendingUp, Timer, Coins, Truck,
  CheckCircle2, Activity, Zap, Brain, Eye,
  FileText, Check, BookOpen, ArrowRight,
  Sparkles, Radio, Cpu, BarChart3
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────
   DATA — all five specialist agents
───────────────────────────────────────────────────────────────────────── */
const AGENTS = [
  {
    id: 'weather',
    label: 'Weather & Event Agent',
    icon: Cloud,
    status: 'ACTIVE',
    weight: 0.28,
    input: 'Temp 38°C Hyderabad · Festival 2 km',
    output: 'Dairy footfall +18%',
    vote: 'MARKDOWN',
    confidence: 89,
    from: 'sky-400',
    gradient: 'from-sky-500/25 via-sky-600/10 to-transparent',
    border: 'border-sky-500/35',
    glow: 'shadow-sky-500/20',
    pulse: 'bg-sky-400',
    badge: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    lineColor: '#38bdf8',
    emoji: '☀️',
  },
  {
    id: 'demand',
    label: 'Demand Forecasting Agent',
    icon: TrendingUp,
    status: 'ACTIVE',
    weight: 0.32,
    input: 'Historical sales + calendar',
    output: 'Forecast: 30u MILK · 55u BANANA',
    vote: 'MARKDOWN',
    confidence: 94,
    from: 'indigo-400',
    gradient: 'from-indigo-500/25 via-indigo-600/10 to-transparent',
    border: 'border-indigo-500/35',
    glow: 'shadow-indigo-500/20',
    pulse: 'bg-indigo-400',
    badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    lineColor: '#818cf8',
    emoji: '📈',
  },
  {
    id: 'freshness',
    label: 'Freshness & Spoilage Agent',
    icon: Timer,
    status: 'ACTIVE',
    weight: 0.25,
    input: 'Shelf life 3 d · Stock 80 units',
    output: 'Spoilage risk 85%',
    vote: 'CRITICAL',
    confidence: 92,
    from: 'orange-400',
    gradient: 'from-orange-500/25 via-orange-600/10 to-transparent',
    border: 'border-orange-500/35',
    glow: 'shadow-orange-500/20',
    pulse: 'bg-orange-400',
    badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    lineColor: '#fb923c',
    emoji: '⏳',
  },
  {
    id: 'elasticity',
    label: 'Price Elasticity Agent',
    icon: Coins,
    status: 'ACTIVE',
    weight: 0.35,
    input: 'Elasticity −2.1 · Margin 32%',
    output: '25% OFF → +140% velocity',
    vote: 'MARKDOWN',
    confidence: 96,
    from: 'emerald-400',
    gradient: 'from-emerald-500/25 via-emerald-600/10 to-transparent',
    border: 'border-emerald-500/35',
    glow: 'shadow-emerald-500/20',
    pulse: 'bg-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    lineColor: '#34d399',
    emoji: '💰',
  },
  {
    id: 'transfer',
    label: 'Transfer & Replenishment Agent',
    icon: Truck,
    status: 'ACTIVE',
    weight: 0.30,
    input: 'Store_1 excess 60 BREAD · Store_2 ≡ 0',
    output: 'Transfer $5 vs Waste $45',
    vote: 'TRANSFER',
    confidence: 88,
    from: 'purple-400',
    gradient: 'from-purple-500/25 via-purple-600/10 to-transparent',
    border: 'border-purple-500/35',
    glow: 'shadow-purple-500/20',
    pulse: 'bg-purple-400',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    lineColor: '#c084fc',
    emoji: '🚚',
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   CIRCULAR CONFIDENCE RING
───────────────────────────────────────────────────────────────────────── */
function ConfidenceRing({ pct = 92, size = 100, stroke = 8 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      {/* Track */}
      <circle cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      {/* Progress */}
      <circle cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke="url(#confGrad)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        style={{ transition: 'stroke-dasharray 1.2s ease' }}
      />
      <defs>
        <linearGradient id="confGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ANIMATED DOTTED FLOW LINE (SVG overlay)
───────────────────────────────────────────────────────────────────────── */
function FlowCanvas({ agentRefs, centerRef }) {
  const svgRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % 100), 40);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    const center = centerRef.current;
    if (!svg || !center) return;

    const svgRect = svg.getBoundingClientRect();
    const centerRect = center.getBoundingClientRect();
    const cx = centerRect.left - svgRect.left + centerRect.width / 2;
    const cy = centerRect.top - svgRect.top + centerRect.height / 2;

    const newLines = agentRefs.current.map((el, i) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x1: r.left - svgRect.left + r.width / 2,
        y1: r.top - svgRect.top + r.height / 2,
        x2: cx,
        y2: cy,
        color: AGENTS[i].lineColor,
      };
    }).filter(Boolean);

    setLines(newLines);
  }, [tick]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ overflow: 'visible' }}
    >
      {lines.map((ln, i) => {
        const len = Math.hypot(ln.x2 - ln.x1, ln.y2 - ln.y1);
        const dashOffset = -(tick / 100) * 30;
        return (
          <g key={i}>
            {/* Glow halo */}
            <line
              x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
              stroke={ln.color} strokeWidth={6} strokeOpacity={0.07}
            />
            {/* Main animated dashed line */}
            <line
              x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
              stroke={ln.color}
              strokeWidth={1.5}
              strokeOpacity={0.55}
              strokeDasharray="6 8"
              strokeDashoffset={dashOffset}
            />
            {/* Travelling particle */}
            {[0, 0.5].map((phase, pi) => {
              const t = ((tick / 100 + phase) % 1);
              const px = ln.x1 + (ln.x2 - ln.x1) * t;
              const py = ln.y1 + (ln.y2 - ln.y1) * t;
              return (
                <circle key={pi} cx={px} cy={py} r={2.5}
                  fill={ln.color} opacity={0.85} />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   INDIVIDUAL AGENT CARD
───────────────────────────────────────────────────────────────────────── */
function AgentCard({ agent, isHighlighted, onClick, cardRef }) {
  const Icon = agent.icon;
  const voteColors = {
    MARKDOWN: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
    CRITICAL: 'text-rose-400 bg-rose-500/15 border-rose-500/30',
    TRANSFER: 'text-purple-400 bg-purple-500/15 border-purple-500/30',
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`
        relative flex flex-col rounded-2xl p-4 cursor-pointer select-none
        bg-[#131C31]/80 backdrop-blur-xl
        border ${agent.border}
        shadow-[0_16px_40px_rgba(0,0,0,0.35)] ${agent.glow}
        transition-all duration-300
        hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(0,0,0,0.4)]
        ${isHighlighted ? '-translate-y-3 ring-2 ring-white/15' : ''}
        z-10
      `}
      style={{ minWidth: 180, flex: '1 1 0' }}
    >
      {/* Weight badge — floating top-right */}
      <div className={`absolute -top-2.5 -right-2.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold border shadow-lg ${agent.badge} z-20`}>
        w={agent.weight}
      </div>

      {/* Status pulse */}
      <div className="absolute top-3 left-3 flex items-center space-x-1">
        <span className={`relative flex h-2 w-2`}>
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${agent.pulse} opacity-60`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${agent.pulse}`}></span>
        </span>
        <span className="text-[9px] font-bold tracking-widest text-slate-400">{agent.status}</span>
      </div>

      {/* Ambient gradient blob */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${agent.gradient} pointer-events-none`} />

      {/* Icon  */}
      <div className={`mt-5 mb-3 w-12 h-12 rounded-2xl flex items-center justify-center ${agent.badge} border shadow-inner self-center`}>
        <Icon className="w-6 h-6" />
      </div>

      {/* Label */}
      <h3 className="text-[12px] font-extrabold text-white text-center leading-tight mb-3">
        {agent.label}
      </h3>

      {/* I/O capsules */}
      <div className="space-y-1.5 text-[10px]">
        <div className="flex items-start gap-1.5">
          <span className="shrink-0 mt-0.5 font-bold text-slate-500 uppercase tracking-wider">IN</span>
          <span className="text-slate-300 leading-snug">{agent.input}</span>
        </div>
        <div className="flex items-start gap-1.5">
          <span className="shrink-0 mt-0.5 font-bold text-slate-500 uppercase tracking-wider">OUT</span>
          <span className="text-slate-200 font-semibold leading-snug">{agent.output}</span>
        </div>
      </div>

      {/* Vote badge */}
      <div className={`mt-3 self-center px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border tracking-wider ${voteColors[agent.vote] || voteColors.MARKDOWN}`}>
        VOTE: {agent.vote}
      </div>

      {/* Confidence micro-bar */}
      <div className="mt-2.5 space-y-0.5">
        <div className="flex justify-between text-[9px] text-slate-500">
          <span>Conf</span><span className="text-slate-300 font-bold">{agent.confidence}%</span>
        </div>
        <div className="h-1 w-full rounded-full bg-slate-800 overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${agent.gradient.replace('/25', '').replace('/10', '').replace('via-', 'via-').replace('to-transparent', 'to-white/20')}`}
            style={{ width: `${agent.confidence}%`, transition: 'width 0.8s ease' }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────── */
export default function AgentEnsembleView() {
  const [activeAgent, setActiveAgent] = useState(null);
  const [approved, setApproved] = useState(false);
  const [cycleTime, setCycleTime] = useState('12:00 IST');
  const [showEvidence, setShowEvidence] = useState(false);
  const [showAudit, setShowAudit] = useState(false);

  const agentRefs = useRef(AGENTS.map(() => null));
  const centerRef = useRef(null);

  // Tick the cycle clock
  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setCycleTime(`${h}:${m}:${s} IST`);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex flex-col gap-7 min-h-full pb-8">

      {/* ── Subtle dot-grid background ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(100,116,139,0.35) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════
          ORCHESTRATOR STATUS BAR
      ═══════════════════════════════════════════════════════════════ */}
      <div
        className="relative z-10 flex flex-wrap items-center justify-between gap-4 p-5
                    rounded-2xl bg-[#0F172A]/85 backdrop-blur-2xl
                    border border-white/[0.07]
                    shadow-[0_20px_60px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]"
      >
        {/* Left — title + live indicator */}
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600
                          flex items-center justify-center shadow-lg shadow-emerald-500/30 border border-emerald-300/20">
            <Brain className="w-6 h-6 text-white drop-shadow" />
            {/* outer pulse ring */}
            <span className="absolute -inset-1 rounded-2xl border border-emerald-400/30 animate-ping opacity-40" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold text-white tracking-tight">
                Orchestrator Agent
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold
                               bg-emerald-500/20 text-emerald-300 border border-emerald-500/35">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Agent Ensemble Orchestration · Multi-Agent HITL Consensus
            </p>
          </div>
        </div>

        {/* Right — stat chips */}
        <div className="flex flex-wrap items-center gap-3">
          {[
            { label: 'Current Cycle', value: cycleTime, icon: Activity, accent: 'text-cyan-400' },
            { label: 'Stores', value: '3 Active', icon: Radio, accent: 'text-emerald-400' },
            { label: 'SKUs Monitored', value: '1,240', icon: BarChart3, accent: 'text-indigo-400' },
            { label: 'Agents Online', value: '5 / 5', icon: Cpu, accent: 'text-amber-400' },
          ].map(chip => {
            const IC = chip.icon;
            return (
              <div key={chip.label}
                   className="flex items-center gap-2 px-3.5 py-2 rounded-xl
                              bg-slate-900/70 border border-white/[0.06]
                              shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
                <IC className={`w-3.5 h-3.5 ${chip.accent}`} />
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 leading-none">{chip.label}</div>
                  <div className={`text-xs font-bold font-mono ${chip.accent} leading-tight mt-0.5`}>
                    {chip.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          AGENT CARDS ROW  +  FLOW CANVAS (positioned overlay)
      ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10">
        {/* SVG flow overlay — rendered on top */}
        <FlowCanvas agentRefs={agentRefs} centerRef={centerRef} />

        {/* Agent grid */}
        <div className="flex gap-4 items-stretch">
          {AGENTS.map((agent, i) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              isHighlighted={activeAgent === agent.id}
              onClick={() => setActiveAgent(v => v === agent.id ? null : agent.id)}
              cardRef={el => { agentRefs.current[i] = el; }}
            />
          ))}
        </div>

        {/* Hidden center target for SVG line calculations */}
        <div ref={centerRef} className="absolute left-1/2 -bottom-8 w-1 h-1 -translate-x-1/2 pointer-events-none" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          CENTRAL ORCHESTRATOR DECISION CARD
      ═══════════════════════════════════════════════════════════════ */}
      <div
        className="relative z-10 rounded-3xl overflow-hidden
                    bg-[#0F172A]/90 backdrop-blur-2xl
                    border border-white/[0.08]
                    shadow-[0_30px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.09)]"
      >
        {/* Ambient emerald glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-48
                        bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative p-7 flex flex-col lg:flex-row items-start lg:items-center gap-8">

          {/* Left — confidence ring + decision text */}
          <div className="flex items-center gap-6 shrink-0">
            {/* 3-D confidence ring */}
            <div className="relative">
              <ConfidenceRing pct={92} size={108} stroke={9} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-white leading-none">92</span>
                <span className="text-[9px] font-bold text-emerald-400 tracking-wider">% CONF</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">
                  Final Decision
                </span>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold
                                 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Sparkles className="w-2.5 h-2.5" />
                  Consensus
                </span>
              </div>

              <h2 className="text-xl lg:text-2xl font-black tracking-tight text-white leading-snug max-w-xl">
                MARKDOWN&nbsp;
                <span className="text-emerald-400">25%&nbsp;OFF</span>&nbsp;
                <span className="text-slate-300">MILK_500ML</span>
              </h2>
              <p className="text-sm font-semibold text-slate-400 mt-0.5">
                at <span className="text-white">Store_1_HYD</span> ·&nbsp;
                Effective <span className="text-amber-300">6&nbsp;PM Today</span>
              </p>
            </div>
          </div>

          {/* Middle — reasoning / votes */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Consensus summary */}
            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-white/[0.06]">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Agent Voting Consensus
              </div>
              <div className="flex items-center gap-2 mb-2">
                {AGENTS.map(a => (
                  <div key={a.id} title={a.label}
                       className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px]
                                   border ${a.border} bg-slate-900/60`}>
                    {a.emoji}
                  </div>
                ))}
              </div>
              <div className="text-sm font-extrabold text-white">
                4 / 5 agents voted MARKDOWN
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Transfer agent recommends parallel stock move
              </div>
            </div>

            {/* Weighted score breakdown */}
            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-white/[0.06]">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Weighted Score Breakdown
              </div>
              <div className="space-y-1.5">
                {AGENTS.slice(0, 4).map(a => (
                  <div key={a.id} className="flex items-center gap-2">
                    <span className="w-16 text-[10px] text-slate-400 truncate">{a.id}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${a.weight * 285}%`,
                          background: a.lineColor,
                          opacity: 0.75,
                          transition: 'width 1s ease',
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-300">×{a.weight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact snapshot */}
            <div className="sm:col-span-2 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900/70
                            border border-emerald-500/25">
              <div className="flex flex-wrap gap-5">
                {[
                  { k: 'Margin Saved', v: '+$120.00', c: 'text-amber-300' },
                  { k: 'Waste Avoided', v: '22.5 kg', c: 'text-emerald-400' },
                  { k: 'Velocity Lift', v: '+140%', c: 'text-cyan-400' },
                  { k: 'Stockout Risk ↓', v: '→ 0.9%', c: 'text-rose-400' },
                ].map(item => (
                  <div key={item.k}>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">{item.k}</div>
                    <div className={`text-sm font-extrabold font-mono ${item.c}`}>{item.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — CTA buttons */}
          <div className="flex flex-col gap-3 shrink-0 min-w-[160px]">
            {/* Approve */}
            <button
              onClick={() => setApproved(true)}
              className={`relative group w-full py-3 px-5 rounded-xl font-extrabold text-sm
                          transition-all duration-200
                          ${approved
                            ? 'bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 cursor-default'
                            : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/30 hover:-translate-y-1 hover:shadow-emerald-500/50 active:translate-y-0.5'
                          }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 stroke-[3]" />
                {approved ? 'Approved ✓' : 'Approve Decision'}
              </span>
            </button>

            {/* View Evidence */}
            <button
              onClick={() => setShowEvidence(v => !v)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold
                         bg-slate-800/80 hover:bg-slate-800 text-slate-200
                         border border-white/[0.08] hover:border-white/15
                         transition hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              View Evidence
            </button>

            {/* Audit Log */}
            <button
              onClick={() => setShowAudit(v => !v)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold
                         bg-slate-800/80 hover:bg-slate-800 text-slate-200
                         border border-white/[0.08] hover:border-white/15
                         transition hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              Audit Log
            </button>
          </div>
        </div>

        {/* Evidence Panel (collapsible) */}
        {showEvidence && (
          <div className="border-t border-white/[0.06] px-7 py-5 bg-slate-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
              Supporting Evidence Chain
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {AGENTS.map(a => (
                <div key={a.id}
                     className={`p-3 rounded-xl bg-[#131C31] border ${a.border}`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-base">{a.emoji}</span>
                    <span className="text-[11px] font-bold text-slate-300">{a.label}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    <strong className="text-slate-200">Input:</strong> {a.input}<br />
                    <strong className="text-slate-200">Output:</strong> {a.output}<br />
                    <strong className="text-slate-200">Vote:</strong> <span className="text-emerald-400">{a.vote}</span>
                    &nbsp;·&nbsp;Conf <span className="font-mono text-white">{a.confidence}%</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audit Log Panel (collapsible) */}
        {showAudit && (
          <div className="border-t border-white/[0.06] px-7 py-5 bg-slate-900/60 font-mono text-xs">
            <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-slate-400 mb-3">
              Immutable Audit Trail
            </p>
            <div className="space-y-1.5 text-slate-300">
              {[
                { t: '12:00:01', msg: 'Orchestrator cycle started — 1,240 SKU sweep', lvl: 'INFO' },
                { t: '12:00:03', msg: 'Weather Agent polled IMD Hyderabad — 38°C high, 89% conf', lvl: 'OK' },
                { t: '12:00:04', msg: 'Demand Agent ran SARIMA forecast — MILK 30u, BANANA 55u', lvl: 'OK' },
                { t: '12:00:05', msg: 'Freshness Agent: MILK_500ML shelf-life 3d, spoilage risk 85%', lvl: 'WARN' },
                { t: '12:00:06', msg: 'Price Elasticity Agent: −2.1 slope, 25% OFF → +140% velocity', lvl: 'OK' },
                { t: '12:00:07', msg: 'Transfer Agent: BREAD excess 60u, cross-store move recommended', lvl: 'OK' },
                { t: '12:00:08', msg: 'Consensus reached: 4/5 MARKDOWN · weighted avg conf 91.8%', lvl: 'OK' },
                { t: '12:00:09', msg: 'Decision packaged → HITL queue, awaiting Ananya approval', lvl: 'INFO' },
                approved
                  ? { t: cycleTime, msg: 'Ananya APPROVED — dispatching to SAP ERP, ESL, WMS, POS', lvl: 'OK' }
                  : { t: '—', msg: 'Awaiting human approval…', lvl: 'WAIT' },
              ].map((row, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-slate-500 w-16 shrink-0">{row.t}</span>
                  <span className={`w-10 shrink-0 font-bold ${
                    row.lvl === 'WARN' ? 'text-amber-400' :
                    row.lvl === 'OK' ? 'text-emerald-400' :
                    row.lvl === 'WAIT' ? 'text-slate-500 animate-pulse' :
                    'text-sky-400'
                  }`}>[{row.lvl}]</span>
                  <span>{row.msg}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Approved toast banner */}
      {approved && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5
                        rounded-2xl bg-[#0F172A] border border-emerald-500/45
                        shadow-[0_20px_50px_rgba(16,185,129,0.25)]
                        animate-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <div className="text-sm font-extrabold text-emerald-300">APPROVED — Synced to ERP/WMS/POS</div>
            <div className="text-xs text-slate-400 mt-0.5">
              MILK_500ML 25% OFF · Store_1_HYD · ESL tags updating…
            </div>
          </div>
          <button onClick={() => setApproved(false)} className="ml-2 text-slate-500 hover:text-white text-lg leading-none">×</button>
        </div>
      )}

    </div>
  );
}

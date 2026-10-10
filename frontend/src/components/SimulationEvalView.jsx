import React, { useState, useRef, useEffect } from 'react';
import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine, ReferenceArea
} from 'recharts';
import {
  Trash2, Package, DollarSign, TrendingDown, TrendingUp,
  ArrowDown, ArrowUp, CheckCircle2, Sparkles, Zap,
  BarChart3, ToggleLeft, ToggleRight, Calendar,
  Store, ShieldCheck, Truck, Leaf
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────
   CHART DATA
───────────────────────────────────────────────────────────────────────── */
const generateWasteData = () =>
  Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    return {
      day: `D${day}`,
      baseline: Math.round(12 + Math.random() * 8 + Math.sin(i / 2) * 4),
      agentic:  Math.round(4  + Math.random() * 3 + Math.cos(i / 3) * 1.5),
    };
  });

const generateInventoryData = () =>
  Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const demand    = Math.round(55 + Math.sin(i / 2.5) * 15);
    const baseline  = Math.round(40 + Math.random() * 10);
    const agentic   = Math.round(demand + 3 + Math.random() * 5);
    return {
      day: `D${day}`,
      demand,
      baseline,
      agentic,
      stockoutBaseline: baseline < demand ? demand - baseline : 0,
    };
  });

const WASTE_DATA     = generateWasteData();
const INV_DATA       = generateInventoryData();

/* ─────────────────────────────────────────────────────────────────────────
   CUSTOM CHART TOOLTIP
───────────────────────────────────────────────────────────────────────── */
const GlassTooltip = ({ active, payload, label, unit = '' }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0F172A]/95 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-2xl text-xs">
      <p className="text-slate-400 font-mono mb-1.5">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 mb-0.5">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
          <span className="text-slate-300 capitalize">{p.name}:</span>
          <span className="font-bold text-white font-mono">{p.value}{unit}</span>
        </div>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   3-D KPI COMPARISON CARD
───────────────────────────────────────────────────────────────────────── */
function KpiCompareCard({ title, icon: Icon, iconColor, baseline, agentic, delta, isPositive, unit = '%', barTitle, leftLabel = 'Baseline', rightLabel = 'Agentic AI' }) {
  const maxVal = Math.max(baseline, agentic, 10);
  const baseH  = Math.round((baseline / maxVal) * 100);
  const agentH = Math.round((agentic  / maxVal) * 100);

  return (
    <div className={`
      relative flex flex-col rounded-2xl overflow-hidden
      bg-[#0F172A]/85 backdrop-blur-2xl
      border border-white/[0.07]
      shadow-[0_20px_60px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]
      transition-all duration-300 hover:-translate-y-1.5
      hover:shadow-[0_32px_72px_rgba(0,0,0,0.55)]
    `}>
      {/* ambient top glow */}
      <div className={`absolute -top-10 left-1/2 -translate-x-1/2 w-56 h-24 blur-3xl pointer-events-none
                        ${isPositive ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`} />

      <div className="relative p-5 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-sm ${iconColor}`}>
              <Icon className="w-4.5 h-4.5" />
            </div>
            <span className="text-sm font-bold text-white">{title}</span>
          </div>
          {/* Delta badge */}
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold border shadow-md
                          ${isPositive
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/35'
                            : 'bg-rose-500/20 text-rose-300 border-rose-500/35'}`}>
            {isPositive ? <ArrowDown className="w-3 h-3 stroke-[3]" /> : <ArrowUp className="w-3 h-3 stroke-[3]" />}
            {delta}
          </div>
        </div>

        {/* 3-D Bar Visual */}
        <div className="flex items-end justify-center gap-6 h-28 px-4">
          {/* Baseline bar */}
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <span className="text-[11px] font-bold text-rose-400 font-mono">{baseline}{unit}</span>
            <div className="w-full flex items-end justify-center" style={{ height: 88 }}>
              <div
                className="w-full max-w-[52px] rounded-t-xl bg-gradient-to-t from-rose-700 via-rose-500 to-rose-400
                           shadow-[0_-4px_20px_rgba(239,68,68,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]
                           relative overflow-hidden transition-all duration-700"
                style={{ height: `${baseH}%` }}
              >
                {/* shimmer stripe */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12" />
              </div>
            </div>
            <span className="text-[10px] text-slate-500">{leftLabel}</span>
          </div>

          {/* Center arrow */}
          <div className="flex flex-col items-center pb-6 text-slate-500">
            <ArrowDown className={`w-5 h-5 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`} />
          </div>

          {/* Agentic bar */}
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <span className="text-[11px] font-bold text-emerald-400 font-mono">{agentic}{unit}</span>
            <div className="w-full flex items-end justify-center" style={{ height: 88 }}>
              <div
                className="w-full max-w-[52px] rounded-t-xl bg-gradient-to-t from-emerald-700 via-emerald-500 to-emerald-400
                           shadow-[0_-4px_20px_rgba(16,185,129,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]
                           relative overflow-hidden transition-all duration-700"
                style={{ height: `${agentH}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12" />
              </div>
            </div>
            <span className="text-[10px] text-slate-500">{rightLabel}</span>
          </div>
        </div>

        {/* Improvement summary line */}
        <div className={`text-center text-xs font-semibold py-2 px-3 rounded-xl border
                        ${isPositive
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-300 border-rose-500/20'}`}>
          {barTitle}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   METRIC TABLE ROW
───────────────────────────────────────────────────────────────────────── */
function TableRow({ metric, baseline, agentic, delta, impact, isPositive, last }) {
  return (
    <tr className={`${!last ? 'border-b border-slate-800/70' : ''} group hover:bg-white/[0.02] transition`}>
      <td className="py-3.5 px-5 text-sm font-semibold text-slate-200">{metric}</td>
      <td className="py-3.5 px-5 text-sm font-mono text-rose-400 text-right">{baseline}</td>
      <td className="py-3.5 px-5 text-sm font-mono text-emerald-400 text-right font-bold">{agentic}</td>
      <td className="py-3.5 px-5 text-right">
        <span className={`inline-block text-xs font-extrabold font-mono px-2.5 py-0.5 rounded-full border
                          ${isPositive
                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            : 'bg-rose-500/15 text-rose-300 border-rose-500/30'}`}>
          {delta}
        </span>
      </td>
      <td className="py-3.5 px-5 text-right">
        <span className="text-sm font-extrabold font-mono text-amber-300">{impact}</span>
      </td>
    </tr>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN SCREEN
───────────────────────────────────────────────────────────────────────── */
export default function SimulationEvalView() {
  const [policy, setPolicy] = useState('agentic'); // 'baseline' | 'agentic'
  const [animKey, setAnimKey] = useState(0);

  const handleToggle = () => {
    setPolicy(p => p === 'agentic' ? 'baseline' : 'agentic');
    setAnimKey(k => k + 1);
  };

  const isAgentic = policy === 'agentic';

  const TABLE_ROWS = [
    { metric: 'Total Waste (kg)',      baseline: '420 kg',  agentic: '172 kg',  delta: '−248 kg', impact: '+$1,850 saved',          isPositive: true },
    { metric: 'Stockout Events',       baseline: '47',      agentic: '12',      delta: '−35',     impact: '+$2,450 sales protected', isPositive: true },
    { metric: 'Markdown Revenue Loss', baseline: '$890',    agentic: '$340',    delta: '−$550',   impact: '+$550 margin saved',      isPositive: true },
    { metric: 'Inter-Store Transfer',  baseline: '$0',      agentic: '$45',     delta: '+$45',    impact: 'Net +$4,805 total gain',  isPositive: false },
  ];

  return (
    <div className="relative flex flex-col gap-7 pb-10">

      {/* dot grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.15]"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(100,116,139,0.4) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* ═══ HEADER ══════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            Simulation: Baseline vs Agentic AI
          </h1>
          <p className="text-slate-400 text-sm mt-1 ml-13">
            Impact Report — Performance Evaluation across 30-day window, Hyderabad stores
          </p>
        </div>

        {/* Context chips */}
        <div className="flex flex-wrap items-center gap-3">
          {[
            { label: 'Period', value: '30 Days', icon: Calendar, color: 'text-cyan-400' },
            { label: 'Stores', value: '3 HYD Hubs', icon: Store, color: 'text-indigo-400' },
          ].map(c => {
            const IC = c.icon;
            return (
              <div key={c.label} className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80
                                            border border-white/[0.06] shadow-md text-xs">
                <IC className={`w-3.5 h-3.5 ${c.color}`} />
                <span className="text-slate-500">{c.label}</span>
                <span className={`font-bold font-mono ${c.color}`}>{c.value}</span>
              </div>
            );
          })}

          {/* Toggle */}
          <button
            onClick={handleToggle}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-bold
                        border transition-all duration-300 shadow-lg
                        ${isAgentic
                          ? 'bg-emerald-500/20 border-emerald-500/45 text-emerald-300 shadow-emerald-500/20'
                          : 'bg-rose-500/15 border-rose-500/35 text-rose-300 shadow-rose-500/10'}`}
          >
            {isAgentic
              ? <ToggleRight className="w-4.5 h-4.5 text-emerald-400" />
              : <ToggleLeft  className="w-4.5 h-4.5 text-rose-400" />}
            {isAgentic ? 'Agentic AI Policy' : 'Baseline Policy'}
            <span className={`w-2 h-2 rounded-full animate-pulse ${isAgentic ? 'bg-emerald-400' : 'bg-rose-400'}`} />
          </button>
        </div>
      </div>

      {/* ═══ KPI COMPARISON CARDS ════════════════════════════════════════ */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        <KpiCompareCard
          title="Waste Rate"
          icon={Trash2}
          iconColor="bg-rose-500/15 text-rose-400 border-rose-500/25"
          baseline={22}
          agentic={9}
          delta="59% better"
          isPositive={true}
          unit="%"
          barTitle="59% reduction — 248 kg waste eliminated"
        />
        <KpiCompareCard
          title="Stockout Rate"
          icon={Package}
          iconColor="bg-amber-500/15 text-amber-400 border-amber-500/25"
          baseline={15}
          agentic={4}
          delta="73% better"
          isPositive={true}
          unit="%"
          barTitle="73% fewer stockouts — 35 events prevented"
        />
        <KpiCompareCard
          title="Gross Margin"
          icon={DollarSign}
          iconColor="bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
          baseline={78}
          agentic={91}
          delta="+13pp gain"
          isPositive={false}
          unit="%"
          leftLabel="Baseline"
          rightLabel="Agentic AI"
          barTitle="+13 percentage-point margin lift"
        />
      </div>

      {/* ═══ CHARTS ROW ══════════════════════════════════════════════════ */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Chart 1 — Daily Waste kg */}
        <div className="rounded-2xl bg-[#0F172A]/85 backdrop-blur-2xl border border-white/[0.07]
                        shadow-[0_20px_60px_rgba(0,0,0,0.40),inset_0_1px_0_rgba(255,255,255,0.07)] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-rose-400" />
                Daily Waste (kg) — 30-Day Window
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Baseline jagged · Agentic AI consistently low</p>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-rose-500 inline-block rounded-full" />Baseline</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-emerald-400 inline-block rounded-full" />Agentic AI</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={WASTE_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gBaseline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f43f5e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gAgentic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} interval={4} />
              <YAxis tick={{ fill: '#475569', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
              <Tooltip content={<GlassTooltip unit=" kg" />} />
              <Area type="monotone" dataKey="baseline" name="Baseline" stroke="#f43f5e" strokeWidth={2} fill="url(#gBaseline)" dot={false} />
              <Area type="monotone" dataKey="agentic"  name="Agentic AI" stroke="#10b981" strokeWidth={2.5} fill="url(#gAgentic)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2 — Inventory vs Demand */}
        <div className="rounded-2xl bg-[#0F172A]/85 backdrop-blur-2xl border border-white/[0.07]
                        shadow-[0_20px_60px_rgba(0,0,0,0.40),inset_0_1px_0_rgba(255,255,255,0.07)] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-cyan-400" />
                Inventory vs Demand — Stockout Avoidance
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                <span className="text-emerald-400 font-semibold">Green shading</span> = stockout gaps avoided by Agentic AI
              </p>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-slate-400 inline-block rounded-full" />Demand</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-rose-500 inline-block rounded-full" />Baseline</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-cyan-400 inline-block rounded-full" />Agentic</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={INV_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gStockoutAvoid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} interval={4} />
              <YAxis tick={{ fill: '#475569', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
              <Tooltip content={<GlassTooltip unit=" u" />} />
              {/* Stockout-gap highlight bands */}
              {INV_DATA.map((d, i) =>
                d.stockoutBaseline > 0 ? (
                  <ReferenceArea key={i} x1={d.day} x2={d.day}
                    fill="#10b981" fillOpacity={0.12} stroke="none" />
                ) : null
              )}
              <Line type="monotone" dataKey="demand"   name="Demand"     stroke="#94a3b8" strokeWidth={1.5} dot={false} strokeDasharray="4 3" />
              <Line type="monotone" dataKey="baseline" name="Baseline"   stroke="#f43f5e" strokeWidth={2}   dot={false} />
              <Line type="monotone" dataKey="agentic"  name="Agentic AI" stroke="#22d3ee" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ═══ EVALUATION REPORT TABLE ════════════════════════════════════ */}
      <div className="relative z-10 rounded-2xl overflow-hidden
                      bg-[#0F172A]/85 backdrop-blur-2xl
                      border border-white/[0.07]
                      shadow-[0_20px_60px_rgba(0,0,0,0.40),inset_0_1px_0_rgba(255,255,255,0.07)]">
        {/* Table header */}
        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between bg-slate-900/50">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            Evaluation Report — Metric-by-Metric Delta
          </h3>
          <span className="text-[10px] font-mono text-slate-400 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700">
            30-day · 3 stores · 1,240 SKUs
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/60 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                <th className="py-3 px-5">Metric</th>
                <th className="py-3 px-5 text-right text-rose-500">Baseline</th>
                <th className="py-3 px-5 text-right text-emerald-500">Agentic AI</th>
                <th className="py-3 px-5 text-right">Delta</th>
                <th className="py-3 px-5 text-right text-amber-400">$ Impact</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row, i) => (
                <TableRow key={row.metric} {...row} last={i === TABLE_ROWS.length - 1} />
              ))}
            </tbody>
            {/* Total row */}
            <tfoot>
              <tr className="bg-gradient-to-r from-emerald-950/40 to-slate-900/60 border-t border-emerald-500/25">
                <td className="py-4 px-5 text-sm font-extrabold text-white">Net Total Impact</td>
                <td className="py-4 px-5 text-right text-sm font-mono text-rose-400">—</td>
                <td className="py-4 px-5 text-right text-sm font-mono text-emerald-400 font-bold">—</td>
                <td className="py-4 px-5 text-right">
                  <span className="text-xs font-extrabold font-mono px-2.5 py-1 rounded-full
                                   bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    −248 kg waste
                  </span>
                </td>
                <td className="py-4 px-5 text-right">
                  <span className="text-base font-extrabold font-mono text-amber-300">+$4,805</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ═══ SUCCESS FOOTER CARD ═════════════════════════════════════════ */}
      <div className="relative z-10 rounded-3xl overflow-hidden
                      bg-gradient-to-br from-[#0a1f16] via-[#0F172A] to-[#0c152b]
                      border border-emerald-500/25
                      shadow-[0_30px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(16,185,129,0.08)]">

        {/* ambient radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-48
                          bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative p-8 flex flex-col lg:flex-row items-start lg:items-center gap-8">

          {/* Icon cluster */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600
                            flex items-center justify-center shadow-2xl shadow-emerald-500/40
                            border border-emerald-300/20">
              <Leaf className="w-10 h-10 text-white drop-shadow-lg" />
            </div>
            <span className="absolute -top-2 -right-2 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border-2 border-[#0F172A]
                              flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </span>
            </span>
          </div>

          {/* Main copy */}
          <div className="flex-1">
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400 mb-2">
              Simulation Verdict · Production Ready
            </div>
            <h2 className="text-xl lg:text-2xl font-black text-white leading-snug tracking-tight">
              Agentic AI saves&nbsp;
              <span className="text-emerald-400">142 kg waste</span>,&nbsp;
              prevents&nbsp;<span className="text-cyan-400">34 stockouts</span>,&nbsp;
              saves&nbsp;<span className="text-amber-300">$2,450</span>&nbsp;in 30 days.
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Ready for production integration with&nbsp;
              <span className="text-white font-semibold">SAP ERP Retail</span>,&nbsp;
              <span className="text-white font-semibold">Manhattan WMS</span>,&nbsp;
              <span className="text-white font-semibold">Toshiba POS</span>&nbsp;and&nbsp;
              <span className="text-white font-semibold">Pricer ESL Gateway</span>.
              Zero-waste operations unlock full supply chain elasticity at Hyderabad scale.
            </p>
          </div>

          {/* KPI strip */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            {[
              { icon: Trash2,       v: '142 kg',    label: 'Waste Eliminated',  c: 'text-emerald-400', b: 'border-emerald-500/30 bg-emerald-500/10' },
              { icon: Package,      v: '34 events', label: 'Stockouts Prevented', c: 'text-cyan-400',   b: 'border-cyan-500/30 bg-cyan-500/10' },
              { icon: DollarSign,   v: '$2,450',    label: 'Margin Saved',      c: 'text-amber-300',   b: 'border-amber-500/30 bg-amber-500/10' },
              { icon: ShieldCheck,  v: '99.1%',     label: 'Service Level',     c: 'text-indigo-400',  b: 'border-indigo-500/30 bg-indigo-500/10' },
            ].map(kpi => {
              const IC = kpi.icon;
              return (
                <div key={kpi.label}
                     className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border ${kpi.b} min-w-[160px]`}>
                  <IC className={`w-4 h-4 ${kpi.c} shrink-0`} />
                  <div>
                    <div className={`text-sm font-extrabold font-mono ${kpi.c}`}>{kpi.v}</div>
                    <div className="text-[10px] text-slate-400">{kpi.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}

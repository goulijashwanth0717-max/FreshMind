import React, { useState } from 'react';
import { SlidersHorizontal, TrendingUp, DollarSign, Trash2, ArrowUpRight, Sparkles } from 'lucide-react';

export default function SimulationView() {
  const [markdownRate, setMarkdownRate] = useState(25);

  // Dynamic simulation calculations
  const baselineLoss = 3580;
  const salvageRate = Math.min(95, 20 + markdownRate * 2.8);
  const wasteLoss = Math.round(baselineLoss * (1 - salvageRate / 100));
  const marginRecovered = baselineLoss - wasteLoss;
  const wasteDivertedKg = Math.round((salvageRate / 100) * 165);
  const salesLiftPct = Math.round(markdownRate * 5.6);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-emerald-400" />
          Interactive Price Elasticity & Waste Reduction Simulator
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Simulate markdown elasticity thresholds to model profit preservation vs total spoilage dump loss across Hyderabad stores.
        </p>
      </div>

      {/* Simulator Control Card */}
      <div className="p-6 rounded-2xl bg-[#131C31] border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Interactive Variable
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Target Perishable Markdown Rate
            </h3>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono bg-emerald-500/10 px-4 py-1.5 rounded-2xl border border-emerald-500/30">
            {markdownRate}% OFF
          </div>
        </div>

        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="60"
            step="5"
            value={markdownRate}
            onChange={(e) => setMarkdownRate(Number(e.target.value))}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>0% (Full Price - High Spoilage)</span>
            <span>25% (FreshMind AI Optimum)</span>
            <span>60% (Clearance Fire-Sale)</span>
          </div>
        </div>

        {/* Quantified impact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Waste Diverted</span>
              <Trash2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-white font-mono">{wasteDivertedKg}kg</div>
            <div className="text-[11px] text-emerald-400 mt-1 font-semibold">
              {salvageRate.toFixed(1)}% salvage rate
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Margin Protected</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-amber-300 font-mono">${marginRecovered.toLocaleString()}</div>
            <div className="text-[11px] text-slate-400 mt-1">vs $0 if discarded</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Sales Velocity Lift</span>
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-extrabold text-cyan-400 font-mono">+{salesLiftPct}%</div>
            <div className="text-[11px] text-slate-400 mt-1">Units sold per peak hour</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Residual Dump Loss</span>
              <ArrowUpRight className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-extrabold text-rose-400 font-mono">${wasteLoss.toLocaleString()}</div>
            <div className="text-[11px] text-slate-400 mt-1">Down from ${baselineLoss}</div>
          </div>
        </div>
      </div>

      {/* Elasticity Curve Comparison Table */}
      <div className="rounded-2xl bg-[#0F172A] border border-slate-800 overflow-hidden p-5">
        <h3 className="text-sm font-bold text-white mb-3">
          Price Elasticity Frontier by Category
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2.5 px-3">CATEGORY</th>
                <th className="py-2.5 px-3">BASE VELOCITY</th>
                <th className="py-2.5 px-3">SIMULATED VELOCITY</th>
                <th className="py-2.5 px-3">OPTIMAL DISCOUNT</th>
                <th className="py-2.5 px-3">RECOMMENDATION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-semibold text-white">DAIRY (Milk &amp; Yogurt)</td>
                <td className="py-3 px-3 font-mono text-slate-400">30 units/day</td>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">72 units/day (+140%)</td>
                <td className="py-3 px-3 font-mono text-cyan-300">25% OFF</td>
                <td className="py-3 px-3 text-emerald-400 font-medium">Clear batch before 8 PM cutoff</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-semibold text-white">PRODUCE (Bananas &amp; Berries)</td>
                <td className="py-3 px-3 font-mono text-slate-400">18 units/day</td>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">42 units/day (+133%)</td>
                <td className="py-3 px-3 font-mono text-cyan-300">20% - 35% OFF</td>
                <td className="py-3 px-3 text-emerald-400 font-medium">Front-shelf positioning required</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-semibold text-white">BAKERY (Loaves &amp; Pastries)</td>
                <td className="py-3 px-3 font-mono text-slate-400">25 units/day</td>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">58 units/day (+132%)</td>
                <td className="py-3 px-3 font-mono text-cyan-300">30% OFF</td>
                <td className="py-3 px-3 text-emerald-400 font-medium">Bundle promo with coffee / cheese</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-semibold text-white">MEAT &amp; SEAFOOD</td>
                <td className="py-3 px-3 font-mono text-slate-400">12 units/day</td>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">36 units/day (+200%)</td>
                <td className="py-3 px-3 font-mono text-cyan-300">35% - 40% OFF</td>
                <td className="py-3 px-3 text-rose-300 font-medium">Flash clearance under HACCP 4h limit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

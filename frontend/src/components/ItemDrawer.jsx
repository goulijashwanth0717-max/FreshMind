import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Check, 
  X, 
  Sliders, 
  TrendingUp, 
  Sun, 
  Cpu, 
  Users, 
  Eye, 
  ShieldAlert, 
  ShoppingBag, 
  BarChart3, 
  DollarSign, 
  Trash2, 
  Layers,
  ArrowRight,
  Clock,
  Radio,
  CheckCircle2
} from 'lucide-react';

export default function ItemDrawer({ 
  alert, 
  onApprove, 
  onReject, 
  onTweak, 
  isLoadingAction = false 
}) {
  if (!alert) return null;

  const [customDiscount, setCustomDiscount] = useState(alert.discount_pct || 25);

  useEffect(() => {
    setCustomDiscount(alert.discount_pct || 25);
  }, [alert.id, alert.discount_pct]);

  // Icon map for agent signals
  const getSignalIcon = (agentName) => {
    if (agentName.includes('Weather')) return Sun;
    if (agentName.includes('Elasticity') || agentName.includes('Price')) return TrendingUp;
    if (agentName.includes('IoT') || agentName.includes('Sensor')) return Cpu;
    if (agentName.includes('Footfall') || agentName.includes('Loyalty')) return Users;
    if (agentName.includes('Vision') || agentName.includes('Ripening') || agentName.includes('Spectrometry')) return Eye;
    if (agentName.includes('Safety') || agentName.includes('Expiry')) return ShieldAlert;
    if (agentName.includes('Forecast') || agentName.includes('Demand')) return BarChart3;
    return Sparkles;
  };

  const calculatedMarkdownPrice = (alert.original_price * (1 - customDiscount / 100)).toFixed(2);
  const estimatedVelocityGain = Math.round(customDiscount * 5.6);

  return (
    <div className="w-96 bg-[#0F172A]/95 backdrop-blur-xl border-l border-slate-800/90 flex flex-col justify-between shrink-0 h-full overflow-y-auto shadow-[-20px_0_50px_rgba(0,0,0,0.35)] p-5 select-none text-slate-200">
      <div className="space-y-5">
        {/* Header / SKU ID & Store */}
        <div className="flex items-start justify-between border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {alert.id}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {alert.batch_id || 'LOT-2025-05'}
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-white mt-1.5 tracking-tight">
              {alert.sku}
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              {alert.item_name}
            </p>
            <div className="mt-1 flex items-center space-x-2 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">{alert.store}</span>
              <span>·</span>
              <span>{alert.store_name}</span>
            </div>
          </div>

          {/* Confidence Badge */}
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-extrabold">{alert.confidence || 92}%</span>
              <span className="text-[10px] text-emerald-400/80">Conf</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1">Multi-Agent</span>
          </div>
        </div>

        {/* Primary Recommended Action Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-[0_10px_30px_rgba(16,185,129,0.1)] relative overflow-hidden">
          <div className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-400 mb-1 flex items-center justify-between">
            <span>RECOMMENDED DECISION</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">
              Optimal Margin
            </span>
          </div>
          <div className="text-base font-extrabold text-white flex items-center justify-between">
            <span>{alert.recommended_action}</span>
          </div>

          {/* Pricing strip */}
          <div className="mt-3 flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">Original</span>
              <span className="line-through text-slate-400 font-mono font-bold">
                ${(alert.original_price || 2.40).toFixed(2)}
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            <div>
              <span className="text-[10px] text-emerald-400 block">AI Price ({customDiscount}%)</span>
              <span className="text-white font-mono font-extrabold text-sm text-emerald-300">
                ${calculatedMarkdownPrice}
              </span>
            </div>
          </div>

          {/* Quantified impact metric bubbles */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800/80">
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Margin Saved</div>
                <div className="text-xs font-bold text-white font-mono">
                  +${(alert.margin_saved || 120.00).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Trash2 className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Waste Avoided</div>
                <div className="text-xs font-bold text-emerald-300 font-mono">
                  {alert.waste_avoided_kg || 22.5}kg
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Discount Slider / Tweaker */}
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              Adjust Discount Rate
            </span>
            <span className="font-mono font-bold text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
              {customDiscount}% OFF
            </span>
          </div>

          <input
            type="range"
            min="5"
            max="60"
            step="5"
            value={customDiscount}
            onChange={(e) => setCustomDiscount(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />

          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>5% (Soft)</span>
            <span>25% (Optimal)</span>
            <span>60% (Clearance)</span>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
            <span>Projected Velocity Lift:</span>
            <span className="font-semibold text-emerald-400">+{estimatedVelocityGain}%</span>
          </div>
        </div>

        {/* Multi-Agent Supporting Signals */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              Multi-Agent Supporting Signals
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {alert.signals?.length || 4} Signals
            </span>
          </div>

          <div className="space-y-2.5">
            {(alert.signals || []).map((sig, idx) => {
              const SignalIcon = getSignalIcon(sig.agent);
              return (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center text-emerald-400">
                      <SignalIcon className="w-3 h-3" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-300">
                      {sig.agent}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white pl-7">
                    {sig.headline}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 pl-7 leading-relaxed">
                    {sig.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="pt-4 border-t border-slate-800/80 space-y-2 shrink-0">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onApprove(alert.id, customDiscount)}
            disabled={isLoadingAction}
            className="btn-3d flex-1 py-3 px-4 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/25 cursor-pointer disabled:opacity-50"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Approve Markdown (-{customDiscount}%)</span>
          </button>

          <button
            onClick={() => onReject(alert.id)}
            disabled={isLoadingAction}
            className="btn-secondary-3d p-3 rounded-xl text-slate-400 hover:text-rose-400 bg-slate-800/80 hover:bg-rose-950/40 border border-slate-700/80 hover:border-rose-500/30 cursor-pointer disabled:opacity-50"
            title="Reject AI suggestion"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[10px] text-center text-slate-400">
          Syncs instantaneously to ERP, WMS, POS & Electronic Shelf Labels
        </p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Sliders, X, Check, Sparkles, TrendingUp, DollarSign } from 'lucide-react';

export default function BatchTweakModal({ 
  isOpen, 
  onClose, 
  selectedCount, 
  onApplyBatchTweak, 
  isLoading = false 
}) {
  if (!isOpen) return null;

  const [batchDiscount, setBatchDiscount] = useState(25);
  const presets = [15, 20, 25, 30, 40];

  const handleApply = () => {
    onApplyBatchTweak(batchDiscount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-[#0F172A] border border-slate-700/80 shadow-[0_25px_60px_rgba(0,0,0,0.5)] p-6 space-y-5 text-slate-200">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Batch Tweak Markdowns</h3>
              <p className="text-xs text-slate-400">Applying to {selectedCount} selected SKUs</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset quick buttons */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-2">
            Quick Markdown Presets
          </label>
          <div className="grid grid-cols-5 gap-2">
            {presets.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setBatchDiscount(val)}
                className={`py-2 rounded-xl text-xs font-bold border transition ${
                  batchDiscount === val
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {val}%
              </button>
            ))}
          </div>
        </div>

        {/* Custom slider */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Fine-tune Discount:</span>
            <span className="font-mono font-extrabold text-cyan-400 text-sm">
              {batchDiscount}% OFF
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            step="5"
            value={batchDiscount}
            onChange={(e) => setBatchDiscount(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Impact forecast */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Estimated Clearance Velocity:</span>
            <span className="text-emerald-400 font-bold">+{Math.round(batchDiscount * 5.5)}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">ERP Sync Target:</span>
            <span className="text-white font-mono text-[11px]">SAP + Pricer ESL Tags</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={isLoading}
            className="btn-3d px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25 flex items-center space-x-2"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Apply to {selectedCount} SKUs</span>
          </button>
        </div>
      </div>
    </div>
  );
}

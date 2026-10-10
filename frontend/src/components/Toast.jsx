import React from 'react';
import { CheckCircle2, AlertCircle, Info, X, Radio } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 max-w-md p-4 rounded-2xl bg-[#0F172A] border border-emerald-500/40 shadow-[0_20px_50px_rgba(16,185,129,0.25)] text-slate-100 animate-in slide-in-from-bottom-5 duration-300">
      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
        <CheckCircle2 className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h4 className="text-sm font-extrabold text-emerald-300 tracking-tight">
            {toast.title || 'APPROVED - Synced to ERP/WMS/POS'}
          </h4>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
        <p className="text-xs text-slate-300 mt-0.5 leading-snug">
          {toast.message || 'Updated pricing and stock reallocation sent to SAP S/4HANA, Manhattan WMS, and Pricer ESL tags.'}
        </p>
        <div className="flex items-center space-x-2 mt-1.5 text-[10px] text-slate-400 font-mono">
          <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">SAP ERP</span>
          <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">Manhattan WMS</span>
          <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">Toshiba POS</span>
          <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">ESL Gateway</span>
        </div>
      </div>

      <button 
        onClick={onClose}
        className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

import React from 'react';
import { LayoutDashboard, TrendingUp, Store, BarChart2, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function OverviewView({ alerts = [] }) {
  const storeStats = [
    { name: 'Store_1_HYD (Banjara Hills)', wasteAvoided: '58.5 kg', marginSaved: '$940', riskSkus: 5, health: '98.2%' },
    { name: 'Store_2_HYD (Hitec City)', wasteAvoided: '36.7 kg', marginSaved: '$620', riskSkus: 3, health: '99.4%' },
    { name: 'Store_3_HYD (Jubilee Hills)', wasteAvoided: '42.0 kg', marginSaved: '$590', riskSkus: 4, health: '97.8%' },
    { name: 'Store_4_HYD (Gachibowli)', wasteAvoided: '22.6 kg', marginSaved: '$300', riskSkus: 2, health: '99.1%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-emerald-400" />
          Hyderabad Perishables Operations Overview
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Network-wide zero-waste performance summary across all 4 store locations for 2025-05-18.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Store Performance Matrix */}
        <div className="p-5 rounded-2xl bg-[#131C31] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Store className="w-4 h-4 text-emerald-400" />
              Store-Level Waste Diversion
            </h3>
            <span className="text-xs font-mono text-emerald-400">142kg Total Saved</span>
          </div>

          <div className="space-y-3">
            {storeStats.map((st, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">{st.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {st.riskSkus} Alerts · Health {st.health}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-extrabold text-emerald-400 font-mono">{st.wasteAvoided}</div>
                  <div className="text-[11px] font-semibold text-amber-300 font-mono">{st.marginSaved}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="p-5 rounded-2xl bg-[#131C31] border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-cyan-400" />
            Category Risk Profile
          </h3>

          <div className="space-y-3.5 pt-1 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>DAIRY (Milk, Paneer, Yogurt)</span>
                <span className="font-mono font-bold text-rose-400">High Risk (38°C Peak)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>PRODUCE (Bananas, Strawberries, Spinach)</span>
                <span className="font-mono font-bold text-amber-400">Moderate Decay</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>BAKERY (Sourdough, Croissants)</span>
                <span className="font-mono font-bold text-cyan-400">Evening Clearance</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>MEAT &amp; SEAFOOD (Chicken, Salmon, Beef)</span>
                <span className="font-mono font-bold text-emerald-400">HACCP Guardrails</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

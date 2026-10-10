import React from 'react';
import { 
  Building2, 
  Calendar, 
  RefreshCw, 
  Radio, 
  UserCircle2, 
  ChevronDown,
  CloudSun
} from 'lucide-react';

export default function TopBar({ 
  selectedStore, 
  setSelectedStore, 
  onRefresh, 
  isRefreshing = false 
}) {
  const storeOptions = [
    { id: 'All Stores (Global View)', label: 'All Stores (Global View)', sub: '4 Hubs · Hyderabad' },
    { id: 'Store_1_HYD', label: 'Store_1_HYD — Banjara Hills', sub: 'High Volume Flagship' },
    { id: 'Store_2_HYD', label: 'Store_2_HYD — Hitec City', sub: 'Tech Corridor Express' },
    { id: 'Store_3_HYD', label: 'Store_3_HYD — Jubilee Hills', sub: 'Premium Organics Hub' },
    { id: 'Store_4_HYD', label: 'Store_4_HYD — Gachibowli', sub: 'Suburban Supercenter' },
  ];

  return (
    <header className="h-18 px-8 bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between sticky top-0 z-30 shadow-md">
      {/* Store Selector & Context */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="flex items-center space-x-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm font-medium text-slate-200 cursor-pointer shadow-sm transition">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="bg-transparent text-slate-100 font-semibold focus:outline-none cursor-pointer pr-4 appearance-none"
            >
              {storeOptions.map((st) => (
                <option key={st.id} value={st.id} className="bg-slate-900 text-slate-200">
                  {st.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Live Ops Date Indicator */}
        <div className="flex items-center space-x-2 bg-slate-900/80 border border-slate-700/60 rounded-xl px-3.5 py-1.5 text-xs text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
          <span>Ops Date: <strong className="text-white font-mono">2025-05-18</strong></span>
          <span className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 text-[10px] tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block"></span>
            LIVE
          </span>
        </div>

        {/* Weather alert banner */}
        <div className="hidden xl:flex items-center space-x-2 bg-amber-500/10 border border-amber-500/25 rounded-xl px-3 py-1.5 text-xs text-amber-300">
          <CloudSun className="w-4 h-4 text-amber-400" />
          <span>Weather Warning: <strong>38°C Hyderabad High Heat</strong></span>
        </div>
      </div>

      {/* Right Controls: Refresh & User Profile */}
      <div className="flex items-center space-x-4">
        {/* Refresh API status */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl transition flex items-center justify-center group"
          title="Sync with Backend"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-400' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
        </button>

        {/* ERP/POS Connectivity badge */}
        <div className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-400 bg-slate-800/40 px-3 py-1.5 rounded-xl border border-slate-800">
          <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>ERP/WMS/POS <strong className="text-emerald-400 font-medium">Sync Active</strong></span>
        </div>

        {/* User Profile & Logout */}
        {(() => {
          let user = { name: 'Ananya Reddy', role: 'Perishables Planner' };
          try {
            const stored = localStorage.getItem('fm_current');
            if (stored) user = { ...user, ...JSON.parse(stored) };
          } catch (e) {}
          const initial = user.name ? user.name.charAt(0).toUpperCase() : 'A';

          const handleLogout = () => {
            localStorage.removeItem('fm_current');
            window.location.href = '/login';
          };

          return (
            <div className="flex items-center space-x-3 pl-2 border-l border-slate-800">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md border border-emerald-400/30">
                  {initial}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
              </div>
              <div className="text-left hidden md:block">
                <div className="text-sm font-semibold text-white tracking-tight leading-tight">{user.name}</div>
                <div className="text-[11px] text-emerald-400/90 font-medium leading-tight">{user.role || 'Perishables Planner'}</div>
              </div>

              <button
                onClick={handleLogout}
                className="ml-1 p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 border border-transparent hover:border-rose-500/30 transition-all text-xs flex items-center space-x-1 cursor-pointer"
                title="Sign Out"
              >
                <span className="hidden lg:inline text-[11px]">Sign Out</span>
              </button>
            </div>
          );
        })()}
      </div>
    </header>
  );
}

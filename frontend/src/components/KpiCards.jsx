import React from 'react';
import { 
  TrendingUp, 
  Trash2, 
  PackageCheck, 
  DollarSign, 
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function KpiCards({ kpis }) {
  const cards = [
    {
      id: 'waste',
      title: 'WASTE PREVENTED',
      value: kpis?.waste_prevented?.value || '142kg',
      badge: kpis?.waste_prevented?.delta || '+18.4%',
      badgeType: 'success',
      subtext: 'Organic waste diverted from landfill',
      icon: Trash2,
      accentGlow: 'from-emerald-500/20 to-teal-500/5',
      iconBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      borderAccent: 'hover:border-emerald-500/40'
    },
    {
      id: 'stockouts',
      title: 'STOCKOUTS AVOIDED',
      value: kpis?.stockouts_avoided?.value || '34 SKUs',
      badge: kpis?.stockouts_avoided?.badge || '99.1% service',
      badgeType: 'info',
      subtext: 'Dynamic safety buffer orchestration',
      icon: PackageCheck,
      accentGlow: 'from-blue-500/20 to-indigo-500/5',
      iconBg: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
      borderAccent: 'hover:border-blue-500/40'
    },
    {
      id: 'margin',
      title: 'MARGIN SAVED',
      value: kpis?.margin_saved?.value || '$2,450',
      badge: kpis?.margin_saved?.delta || '+$380 today',
      badgeType: 'success',
      subtext: 'Dynamic markdown vs full dump loss',
      icon: DollarSign,
      accentGlow: 'from-amber-500/20 to-orange-500/5',
      iconBg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      borderAccent: 'hover:border-amber-500/40'
    },
    {
      id: 'spoilage',
      title: 'ACTIVE SPOILAGE ALERTS',
      value: `${kpis?.active_spoilage_alerts?.pending ?? 12} Pending`,
      badge: `${kpis?.active_spoilage_alerts?.critical ?? 4} Critical`,
      badgeType: 'critical',
      subtext: '4 items need urgent clearance in < 6h',
      icon: AlertTriangle,
      accentGlow: 'from-rose-500/20 to-red-500/5',
      iconBg: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      borderAccent: 'hover:border-rose-500/40'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.id}
            className={`relative overflow-hidden rounded-2xl bg-[#131C31]/80 backdrop-blur-md border border-slate-800/90 p-5 shadow-[0_12px_32px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 ${c.borderAccent} group`}
          >
            {/* Soft background ambient gradient */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${c.accentGlow} rounded-full blur-2xl pointer-events-none -mr-10 -mt-10 group-hover:scale-125 transition-transform duration-500`} />

            <div className="flex items-center justify-between mb-3 relative z-10">
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                {c.title}
              </span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-sm ${c.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline justify-between mb-1.5 relative z-10">
              <div className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-sans">
                {c.value}
              </div>
              <div
                className={`flex items-center space-x-1 text-xs font-semibold px-2 py-0.5 rounded-full border shadow-sm ${
                  c.badgeType === 'success'
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    : c.badgeType === 'critical'
                    ? 'bg-rose-500/15 text-rose-400 border-rose-500/30 animate-pulse'
                    : 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                }`}
              >
                {c.badgeType === 'success' && <ArrowUpRight className="w-3 h-3" />}
                <span>{c.badge}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 font-medium relative z-10 truncate">
              {c.subtext}
            </div>
          </div>
        );
      })}
    </div>
  );
}

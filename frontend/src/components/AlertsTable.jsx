import React, { useState } from 'react';
import { 
  Check, 
  CheckSquare, 
  Square, 
  Sliders, 
  X, 
  Sparkles, 
  AlertCircle, 
  Clock, 
  ArrowRight,
  Filter,
  CheckCircle2,
  XCircle,
  TrendingDown
} from 'lucide-react';

export default function AlertsTable({
  alerts,
  selectedAlert,
  setSelectedAlert,
  selectedIds,
  setSelectedIds,
  onApproveSelected,
  onOpenBatchTweak,
  onRejectSelected,
  filterType,
  setFilterType,
  categoryFilter,
  setCategoryFilter,
  searchQuery,
  setSearchQuery,
  isLoadingAction = false
}) {
  const categories = ['ALL', 'DAIRY', 'PRODUCE', 'BAKERY', 'MEAT', 'SEAFOOD'];

  // Calculate select all state
  const allFilteredIds = alerts.map(a => a.id);
  const isAllSelected = allFilteredIds.length > 0 && allFilteredIds.every(id => selectedIds.includes(id));
  const isSomeSelected = selectedIds.length > 0 && !isAllSelected;

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(allFilteredIds);
    }
  };

  const handleToggleSelectOne = (id, e) => {
    e.stopPropagation();
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Filter and Category Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#131C31]/90 backdrop-blur-md border border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
        {/* Risk / Type Quick Tabs */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterType === 'all'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            All Alerts ({alerts.length})
          </button>
          <button
            onClick={() => setFilterType('risk70')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
              filterType === 'risk70'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-rose-300 hover:bg-slate-800/60'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
            <span>Risk &gt; 70%</span>
          </button>
          <button
            onClick={() => setFilterType('markdown')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
              filterType === 'markdown'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Markdown Ready</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                categoryFilter === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Select All Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-[#0F172A]/90 border border-slate-800/90 shadow-md">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleToggleSelectAll}
            className="flex items-center space-x-2 text-xs font-medium text-slate-300 hover:text-white transition"
          >
            {isAllSelected ? (
              <CheckSquare className="w-4 h-4 text-emerald-400" />
            ) : isSomeSelected ? (
              <div className="w-4 h-4 rounded bg-emerald-500/30 border border-emerald-400 flex items-center justify-center text-[10px] text-emerald-300 font-bold">
                -
              </div>
            ) : (
              <Square className="w-4 h-4 text-slate-500" />
            )}
            <span>Select All ({alerts.length})</span>
          </button>
          <span className="text-xs text-slate-400">|</span>
          <span className="text-xs text-slate-400">
            Selected: <strong className="text-emerald-400 font-mono">{selectedIds.length}</strong> items
          </span>
        </div>

        {/* Batch Action Buttons */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={onApproveSelected}
            disabled={selectedIds.length === 0 || isLoadingAction}
            className="btn-3d flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Approve Selected ({selectedIds.length})</span>
          </button>

          <button
            onClick={onOpenBatchTweak}
            disabled={selectedIds.length === 0 || isLoadingAction}
            className="btn-secondary-3d flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Batch Tweak</span>
          </button>

          <button
            onClick={onRejectSelected}
            disabled={selectedIds.length === 0 || isLoadingAction}
            className="btn-secondary-3d flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 border border-slate-700/80 hover:border-rose-500/30 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <X className="w-3.5 h-3.5 text-rose-400" />
            <span>Reject</span>
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="rounded-2xl bg-[#131C31]/90 backdrop-blur-md border border-slate-800 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/90 bg-slate-900/60 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                <th className="py-3.5 px-4 w-10"></th>
                <th className="py-3.5 px-3">STORE</th>
                <th className="py-3.5 px-4">SKU / ITEM</th>
                <th className="py-3.5 px-3">CAT</th>
                <th className="py-3.5 px-3 text-right">STOCK</th>
                <th className="py-3.5 px-3 text-right">FCST</th>
                <th className="py-3.5 px-3 text-center">DAYS LEFT</th>
                <th className="py-3.5 px-4">RECOMMENDED ACTION</th>
                <th className="py-3.5 px-3 text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {alerts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    No spoilage alerts match the current filters.
                  </td>
                </tr>
              ) : (
                alerts.map((row) => {
                  const isSelectedInDrawer = selectedAlert?.id === row.id;
                  const isChecked = selectedIds.includes(row.id);
                  const isCritical = row.risk_score >= 80;

                  return (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedAlert(row)}
                      className={`cursor-pointer transition-all duration-150 ${
                        isSelectedInDrawer
                          ? 'bg-emerald-500/10 border-l-4 border-l-emerald-400 text-white'
                          : 'hover:bg-slate-800/50 text-slate-200'
                      }`}
                    >
                      {/* Checkbox column */}
                      <td className="py-3 px-4 text-center" onClick={(e) => handleToggleSelectOne(row.id, e)}>
                        <div className="flex items-center justify-center">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400 transition" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-600 hover:text-slate-400 transition" />
                          )}
                        </div>
                      </td>

                      {/* Store */}
                      <td className="py-3 px-3 font-mono font-medium text-slate-300 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-200">{row.store}</span>
                          <span className="text-[10px] text-slate-400 font-sans">{row.store_name}</span>
                        </div>
                      </td>

                      {/* SKU / Item */}
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-1.5">
                            <span className="font-bold text-white font-mono tracking-tight">{row.sku}</span>
                            {isCritical && (
                              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="Critical Risk" />
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 truncate max-w-[180px]">
                            {row.item_name}
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase ${
                          row.cat === 'DAIRY' ? 'bg-sky-500/15 text-sky-400 border border-sky-500/20' :
                          row.cat === 'PRODUCE' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' :
                          row.cat === 'BAKERY' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' :
                          row.cat === 'MEAT' ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20' :
                          'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20'
                        }`}>
                          {row.cat}
                        </span>
                      </td>

                      {/* Stock */}
                      <td className="py-3 px-3 text-right font-mono font-bold text-slate-100">
                        {row.stock}
                      </td>

                      {/* Forecast */}
                      <td className="py-3 px-3 text-right font-mono text-slate-400">
                        {row.fcst}
                      </td>

                      {/* Days Left */}
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 font-mono text-[11px] font-semibold text-amber-300">
                          <Clock className="w-3 h-3 mr-1 text-amber-400" />
                          {row.days_left}
                        </span>
                      </td>

                      {/* Recommended Action & Risk */}
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className={`px-2 py-1 rounded-lg text-[11px] font-bold flex items-center space-x-1 ${
                            row.risk_score >= 85
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : row.risk_score >= 70
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            <span>{row.risk_score}%</span>
                          </div>
                          <span className="text-xs font-medium text-emerald-300 font-sans truncate">
                            {row.recommended_action}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3 text-center">
                        {row.status === 'Approved' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Approved
                          </span>
                        ) : row.status === 'Rejected' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                            <XCircle className="w-3 h-3 mr-1" />
                            Rejected
                          </span>
                        ) : row.status === 'Tweaked' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                            Custom
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

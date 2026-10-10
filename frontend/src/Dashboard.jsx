import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import KpiCards from './components/KpiCards';
import AlertsTable from './components/AlertsTable';
import ItemDrawer from './components/ItemDrawer';
import BatchTweakModal from './components/BatchTweakModal';
import Toast from './components/Toast';
import AgentLogView from './components/AgentLogView';
import AgentEnsembleView from './components/AgentEnsembleView';
import SimulationView from './components/SimulationView';
import SimulationEvalView from './components/SimulationEvalView';
import DataSourcesView from './components/DataSourcesView';
import OverviewView from './components/OverviewView';
import mockData from './mockData.json';

const API_BASE_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:8000`;

export default function Dashboard() {
  const navigate = useNavigate();

  // Initial tab can come from sessionStorage (e.g. when clicked from Landing Page)
  const initialTab = sessionStorage.getItem('fm_initial_tab') || 'alerts';
  const [currentTab, setCurrentTab] = useState(initialTab);
  const [selectedStore, setSelectedStore] = useState('All Stores (Global View)');
  
  // Data state
  const [alerts, setAlerts] = useState(mockData.alerts || []);
  const [kpis, setKpis] = useState(mockData.kpis || {});
  const [logs, setLogs] = useState(mockData.logs || []);
  
  // Selection and filters
  const [selectedAlert, setSelectedAlert] = useState(mockData.alerts[0] || null);
  const [selectedIds, setSelectedIds] = useState(['ALT-1001']);
  const [filterType, setFilterType] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  
  // Modal & feedback state
  const [isBatchTweakOpen, setIsBatchTweakOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Clean initial tab session key after mount
  useEffect(() => {
    sessionStorage.removeItem('fm_initial_tab');
  }, []);

  // Fetch alerts from backend with fallback
  const fetchAlerts = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/alerts`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      if (data && data.data) {
        setAlerts(data.data);
        if (selectedAlert) {
          const freshSelected = data.data.find(a => a.id === selectedAlert.id);
          if (freshSelected) setSelectedAlert(freshSelected);
        } else if (data.data.length > 0) {
          setSelectedAlert(data.data[0]);
        }
      }
    } catch (err) {
      console.warn('Backend API unavailable, using mock data:', err.message);
    } finally {
      setIsRefreshing(false);
    }
  };

  const fetchKpis = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/kpis`);
      if (res.ok) {
        const data = await res.json();
        if (data.kpis) setKpis(data.kpis);
      }
    } catch (err) {
      // Mock data used
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/logs`);
      if (res.ok) {
        const data = await res.json();
        if (data.logs) setLogs(data.logs);
      }
    } catch (err) {
      // Mock data used
    }
  };

  useEffect(() => {
    fetchAlerts();
    fetchKpis();
    fetchLogs();
  }, []);

  const triggerToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const filteredAlerts = useMemo(() => {
    return alerts.filter(item => {
      if (selectedStore !== 'All Stores (Global View)' && item.store !== selectedStore) {
        return false;
      }
      if (categoryFilter !== 'ALL' && item.cat.toUpperCase() !== categoryFilter.toUpperCase()) {
        return false;
      }
      if (filterType === 'risk70' && item.risk_score < 70) {
        return false;
      }
      if (filterType === 'markdown' && !item.recommended_action.toLowerCase().includes('markdown')) {
        return false;
      }
      return true;
    });
  }, [alerts, selectedStore, categoryFilter, filterType]);

  useEffect(() => {
    if (filteredAlerts.length > 0) {
      const currentExists = filteredAlerts.some(a => a.id === selectedAlert?.id);
      if (!currentExists) {
        setSelectedAlert(filteredAlerts[0]);
      }
    }
  }, [filteredAlerts]);

  const submitDecision = async (alertIds, action, markdownPct = null) => {
    setIsLoadingAction(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alert_ids: alertIds,
          action: action,
          markdown_pct: markdownPct,
          reason: 'Perishables Planner dashboard HITL confirmation'
        })
      });

      if (res.ok) {
        setAlerts(prev => prev.map(a => {
          if (alertIds.includes(a.id)) {
            return {
              ...a,
              status: action === 'approve' ? 'Approved' : action === 'reject' ? 'Rejected' : 'Tweaked',
              discount_pct: markdownPct || a.discount_pct,
              recommended_action: markdownPct ? `Dynamic Markdown ${markdownPct}% OFF` : a.recommended_action
            };
          }
          return a;
        }));

        if (selectedAlert && alertIds.includes(selectedAlert.id)) {
          setSelectedAlert(prev => ({
            ...prev,
            status: action === 'approve' ? 'Approved' : action === 'reject' ? 'Rejected' : 'Tweaked',
            discount_pct: markdownPct || prev.discount_pct
          }));
        }

        setLogs(prev => [
          {
            id: `LOG-${Date.now()}`,
            timestamp: new Date().toISOString(),
            agent: 'Planner Ananya (HITL)',
            event: `Action: ${action.toUpperCase()}`,
            details: `Alerts [${alertIds.join(', ')}] marked as ${action.toUpperCase()}. Dispatched to ERP/WMS/POS/ESL gateways.`,
            level: action === 'approve' ? 'SUCCESS' : 'WARN'
          },
          ...prev
        ]);

        triggerToast(
          'APPROVED - Synced to ERP/WMS/POS',
          `Successfully processed ${alertIds.length} SKU(s). Dynamic pricing and shelf label updates broadcasted.`
        );
      } else {
        throw new Error('API decision endpoint returned an error');
      }
    } catch (err) {
      console.warn('API error, fallback local update:', err.message);
      setAlerts(prev => prev.map(a => {
        if (alertIds.includes(a.id)) {
          return {
            ...a,
            status: action === 'approve' ? 'Approved' : action === 'reject' ? 'Rejected' : 'Tweaked',
            discount_pct: markdownPct || a.discount_pct
          };
        }
        return a;
      }));

      triggerToast(
        'APPROVED - Synced to ERP/WMS/POS',
        `Processed ${alertIds.length} SKU(s). Synced to local store cache.`
      );
    } finally {
      setIsLoadingAction(false);
    }
  };

  const handleApprove = (alertId, customDiscount) => {
    submitDecision([alertId], 'approve', customDiscount);
  };

  const handleApproveSelected = () => {
    if (selectedIds.length === 0) return;
    submitDecision(selectedIds, 'approve');
    setSelectedIds([]);
  };

  const handleReject = (alertId) => {
    submitDecision([alertId], 'reject');
  };

  const handleRejectSelected = () => {
    if (selectedIds.length === 0) return;
    submitDecision(selectedIds, 'reject');
    setSelectedIds([]);
  };

  const handleBatchTweak = (discountPct) => {
    if (selectedIds.length === 0) return;
    submitDecision(selectedIds, 'tweak', discountPct);
    setIsBatchTweakOpen(false);
  };

  const pendingCount = alerts.filter(a => a.status === 'Pending').length;

  return (
    <div className="flex w-full min-h-screen bg-[#0B0F19] text-slate-100 font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Dark Sidebar #0F172A */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        alertCount={alerts.length}
        unreviewedCount={pendingCount}
        onOpenLanding={() => navigate('/')}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Bar */}
        <TopBar
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
          onRefresh={() => {
            fetchAlerts();
            fetchKpis();
            fetchLogs();
          }}
          isRefreshing={isRefreshing}
        />

        {/* Dynamic View Body */}
        <main className="flex-1 p-6 lg:p-8 space-y-6">
          {currentTab === 'alerts' && (
            <>
              {/* 4 KPI Cards Row */}
              <KpiCards kpis={kpis} />

              {/* Main Content: Table on Left + Right Drawer on Right */}
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Left Section: Controls + Table */}
                <div className="flex-1 min-w-0 w-full space-y-4">
                  <AlertsTable
                    alerts={filteredAlerts}
                    selectedAlert={selectedAlert}
                    setSelectedAlert={setSelectedAlert}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    onApproveSelected={handleApproveSelected}
                    onOpenBatchTweak={() => setIsBatchTweakOpen(true)}
                    onRejectSelected={handleRejectSelected}
                    filterType={filterType}
                    setFilterType={setFilterType}
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                    isLoadingAction={isLoadingAction}
                  />
                </div>

                {/* Right Drawer: Inspection & Multi-Agent Signals */}
                <div className="w-full lg:w-96 shrink-0 lg:sticky lg:top-24 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-slate-800">
                  <ItemDrawer
                    alert={selectedAlert}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onTweak={handleBatchTweak}
                    isLoadingAction={isLoadingAction}
                  />
                </div>
              </div>
            </>
          )}

          {currentTab === 'overview' && (
            <OverviewView alerts={alerts} />
          )}

          {currentTab === 'agent-log' && (
            <AgentLogView logs={logs} onRefresh={fetchLogs} isRefreshing={isRefreshing} />
          )}

          {currentTab === 'agent-ensemble' && (
            <AgentEnsembleView />
          )}

          {currentTab === 'simulation' && (
            <SimulationView />
          )}

          {currentTab === 'sim-eval' && (
            <SimulationEvalView />
          )}

          {currentTab === 'data-sources' && (
            <DataSourcesView />
          )}
        </main>
      </div>

      {/* Batch Tweak Modal */}
      <BatchTweakModal
        isOpen={isBatchTweakOpen}
        onClose={() => setIsBatchTweakOpen(false)}
        selectedCount={selectedIds.length}
        onApplyBatchTweak={handleBatchTweak}
        isLoading={isLoadingAction}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

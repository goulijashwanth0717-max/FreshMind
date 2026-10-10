import React from 'react';
import { Database, Radio, CheckCircle2, Server, Wifi, RefreshCw } from 'lucide-react';

export default function DataSourcesView() {
  const sources = [
    {
      id: 'sap',
      name: 'SAP S/4HANA Retail ERP',
      type: 'Core ERP & Master Data',
      status: 'Connected',
      latency: '34ms',
      lastSync: '10 seconds ago',
      records: '14,280 SKUs',
      protocol: 'OData v4 / RFC'
    },
    {
      id: 'wms',
      name: 'Manhattan Active WMS',
      type: 'Warehouse & DC Inventory',
      status: 'Connected',
      latency: '52ms',
      lastSync: '1 minute ago',
      records: '4 Hub Warehouses',
      protocol: 'REST / Kafka Stream'
    },
    {
      id: 'pos',
      name: 'Toshiba TCx 800 POS Cloud',
      type: 'Point of Sale & Checkout',
      status: 'Connected',
      latency: '18ms',
      lastSync: 'Real-time websocket',
      records: '38 Active Registers',
      protocol: 'WebSocket'
    },
    {
      id: 'esl',
      name: 'Pricer Electronic Shelf Labels (ESL)',
      type: 'IoT Dynamic Price Display',
      status: 'Connected',
      latency: '90ms',
      lastSync: '3 minutes ago',
      records: '2,400 ESL Tags Active',
      protocol: 'Zigbee Optical Sub-GHz'
    },
    {
      id: 'iot',
      name: 'Sensitech Cold-Chain IoT Telemetry',
      type: 'Chiller & Bay Temperature',
      status: 'Connected',
      latency: '120ms',
      lastSync: '30 seconds ago',
      records: '64 Chiller Probes',
      protocol: 'MQTT / AWS IoT Core'
    },
    {
      id: 'weather',
      name: 'IMD Hyderabad High-Resolution Radar',
      type: 'Ambient Weather & Heat Index',
      status: 'Connected',
      latency: '240ms',
      lastSync: '5 minutes ago',
      records: '38°C High Heat Warning',
      protocol: 'OpenMeteo API'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-400" />
          Enterprise Data Sources & IoT Telemetry Feeds
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Connected systems providing real-time inventory, footfall, ambient temperature, and electronic shelf label sync.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((src) => (
          <div key={src.id} className="p-5 rounded-2xl bg-[#131C31] border border-slate-800 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{src.type}</span>
                <h3 className="text-sm font-bold text-white mt-0.5">{src.name}</h3>
              </div>
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{src.status}</span>
              </span>
            </div>

            <div className="space-y-1.5 text-xs pt-2 border-t border-slate-800 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Latency:</span>
                <span className="font-mono text-emerald-400">{src.latency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payload Scope:</span>
                <span className="font-semibold">{src.records}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Protocol:</span>
                <span className="font-mono text-[11px] text-cyan-300">{src.protocol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Last Telemetry:</span>
                <span className="text-slate-400 text-[11px]">{src.lastSync}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

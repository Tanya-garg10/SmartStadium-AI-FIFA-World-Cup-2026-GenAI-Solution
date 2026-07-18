import React from 'react';
import { 
  Activity, 
  Bot, 
  AlertTriangle, 
  Compass, 
  BookOpen, 
  Globe, 
  Cpu 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  stadiumName: string;
}

export default function Sidebar({ activeTab, setActiveTab, stadiumName }: SidebarProps) {
  const menuItems = [
    { id: 'live-ops', name: 'Live Ops Console', icon: Activity, description: 'Stadium Telemetry & Heatmap' },
    { id: 'copilot', name: 'Aura Copilot Chat', icon: Bot, description: 'Multi-lingual Fan AI Assistant' },
    { id: 'incidents', name: 'Incident Dispatch', icon: AlertTriangle, description: 'AI Automated Triage Portal' },
    { id: 'routing', name: 'Smart Navigation', icon: Compass, description: 'Accessibility Route Planner' },
    { id: 'playbook', name: 'Hackathon Playbook', icon: BookOpen, description: 'Architect Strategy & 20 Points' },
  ];

  return (
    <aside id="vantage-sidebar" className="w-80 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-full text-slate-800">
      <div>
        
        {/* Header Branding Panel */}
        <div className="p-6 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <Cpu className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-sans font-black tracking-tight text-slate-950 leading-none">
                AURA<span className="text-indigo-600 font-extrabold">STADIUM</span>
              </h1>
              <p className="text-[10px] font-mono text-slate-500 tracking-wider uppercase mt-1 font-bold">
                FIFA 2026 COGNITIVE HUB
              </p>
            </div>
          </div>
          
          <div className="mt-5 p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
            <span className="text-xs font-mono text-slate-600 font-bold truncate">{stadiumName}</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
        </div>

        {/* Navigation Items list */}
        <nav className="p-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-btn-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-start gap-4 p-3.5 rounded-xl text-left transition-all group border ${
                  isActive 
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-900 shadow-sm font-bold' 
                    : 'bg-transparent border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-100'
                }`}
              >
                <Icon className={`h-5 w-5 mt-0.5 shrink-0 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <div className="min-w-0">
                  <div className="font-bold text-sm leading-tight">{item.name}</div>
                  <div className="text-[11px] text-slate-500 group-hover:text-slate-600 truncate mt-0.5">{item.description}</div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Metadata */}
      <div className="p-6 border-t border-slate-200 bg-slate-50/50">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 font-bold">
          <Globe className="h-4 w-4 text-indigo-500" />
          <span>FIFA Hub: Live Telemetry</span>
        </div>
        <div className="text-[9px] text-slate-400 mt-2 font-mono uppercase tracking-widest text-center font-bold">
          Active Senior Solution Advisor
        </div>
      </div>
    </aside>
  );
}

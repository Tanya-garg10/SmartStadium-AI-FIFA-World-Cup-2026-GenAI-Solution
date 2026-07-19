import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import LiveOpsDashboard from './components/LiveOpsDashboard';
import AiCopilot from './components/AiCopilot';
import IncidentDispatcher from './components/IncidentDispatcher';
import SmartNavigation from './components/SmartNavigation';
import ArchitecturePlaybook from './components/ArchitecturePlaybook';
import { GateStatus, SectorStatus, Incident, Message } from './types';

// Default initial simulation states
const defaultGates: GateStatus[] = [
  { id: "gate-a", name: "Gate A (Main North)", flowRate: 240, occupancy: 35, status: "optimal", avgWaitTime: 5 },
  { id: "gate-b", name: "Gate B (East Rotunda)", flowRate: 480, occupancy: 85, status: "congested", avgWaitTime: 35 },
  { id: "gate-c", name: "Gate C (South Transit Hub)", flowRate: 310, occupancy: 55, status: "moderate", avgWaitTime: 12 },
  { id: "gate-d", name: "Gate D (West VIP)", flowRate: 90, occupancy: 15, status: "optimal", avgWaitTime: 2 },
];

const defaultSectors: SectorStatus[] = [
  { id: "sector-100", name: "Section 100-112 (Lower North)", capacity: 15000, currentCount: 12400, density: "high", noiseLevel: 94 },
  { id: "sector-113", name: "Section 113-125 (Lower East)", capacity: 18000, currentCount: 16900, density: "critical", noiseLevel: 102 },
  { id: "sector-126", name: "Section 126-138 (Lower South)", capacity: 15000, currentCount: 11200, density: "medium", noiseLevel: 88 },
  { id: "sector-139", name: "Section 139-150 (Lower West)", capacity: 17000, currentCount: 9500, density: "low", noiseLevel: 81 },
];

const defaultIncidents: Incident[] = [
  {
    id: "inc-1",
    category: "facilities",
    title: "Water leakage near Section 102 toilets",
    location: "Section 102 (Lower North)",
    description: "Water leaking onto the concourse pathway near Section 102 family zone. Creating localized slip hazard.",
    reportedTime: "22:15",
    status: "dispatched",
    severity: "medium",
    recommendedAction: "Facilities team dispatch to isolate valve. Safety cones placed.",
    assignedTeam: "Rapid Facility Engineers",
    broadcastDraft: "Caution: Slip hazard reported in Section 102 concourse. Please follow steward directions."
  },
  {
    id: "inc-2",
    category: "medical",
    title: "Heat exhaustion behind Section 113",
    location: "Section 113 (Lower East)",
    description: "An elderly fan is feeling dizzy and overheated. Needs water and medical evaluation.",
    reportedTime: "22:30",
    status: "resolved",
    severity: "high",
    recommendedAction: "Medical response team B dispatched with vitals kit. Fan stabilized and escorted to section medical bay.",
    assignedTeam: "Medical Response Team A",
    broadcastDraft: "Medical personnel responding to a local issue near Section 113. No action required by nearby spectators."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('live-ops');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [incidents, setIncidents] = useState<Incident[]>(defaultIncidents);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  
  const [stadiumState, setStadiumState] = useState({
    stadium: "Metropolitan Stadium, NY/NJ",
    overallOccupancy: 86,
    gates: defaultGates,
    sectors: defaultSectors,
  });

  const fetchLiveState = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/stadium/live-state');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      // Validate data structure
      if (data && typeof data === 'object') {
        setStadiumState((prev) => ({
          ...prev,
          stadium: data.stadium || prev.stadium,
          overallOccupancy: typeof data.overallOccupancy === 'number' ? data.overallOccupancy : prev.overallOccupancy,
          gates: Array.isArray(data.gates) ? data.gates : prev.gates,
          sectors: Array.isArray(data.sectors) ? data.sectors : prev.sectors,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch live stadium operations state:", error);
      // Keep previous state on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveState();
  }, []);

  // Merge incidents into the stadium state object so LiveOpsDashboard can read them
  const mergedStadiumState = useMemo(() => ({
    ...stadiumState,
    incidents
  }), [stadiumState, incidents]);

  const renderActiveView = useCallback(() => {
    switch (activeTab) {
      case 'live-ops':
        return (
          <LiveOpsDashboard 
            stadiumState={mergedStadiumState} 
            setStadiumState={setStadiumState}
            isLoading={isLoading}
            onRefresh={fetchLiveState}
          />
        );
      case 'copilot':
        return (
          <AiCopilot 
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
          />
        );
      case 'incidents':
        return (
          <IncidentDispatcher 
            incidents={incidents}
            setIncidents={setIncidents}
          />
        );
      case 'routing':
        return <SmartNavigation />;
      case 'playbook':
        return <ArchitecturePlaybook />;
      default:
        return (
          <LiveOpsDashboard 
            stadiumState={mergedStadiumState} 
            setStadiumState={setStadiumState}
            isLoading={isLoading}
            onRefresh={fetchLiveState}
          />
        );
    }
  }, [activeTab, mergedStadiumState, setStadiumState, isLoading, fetchLiveState, chatHistory, setChatHistory, incidents, setIncidents]);

  return (
    <div id="vantage-container" className="h-screen w-full bg-slate-50 flex flex-col overflow-hidden font-sans text-slate-900 border-8 border-indigo-600">
      
      {/* Top Header Navigation */}
      <header id="vantage-header" className="h-16 bg-indigo-700 flex items-center justify-between px-6 shadow-lg shrink-0 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-indigo-700 text-xl shadow-inner">
            A
          </div>
          <div>
            <h1 className="text-white font-black text-xl leading-none uppercase tracking-tighter">
              AURA &apos;26
            </h1>
            <p className="text-indigo-200 text-[10px] font-medium tracking-widest uppercase mt-0.5">
              Smart Stadium Command OS
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <span className="px-3 py-1 bg-green-400 text-green-950 rounded-full text-xs font-bold font-mono shadow-sm">
            LIVE: Metropolitan Stadium
          </span>
          <div className="w-8 h-8 rounded-full bg-indigo-500 border border-indigo-400 flex items-center justify-center text-xs font-mono font-bold text-white shadow-sm" title="Operations Director">
            OP
          </div>
        </div>
      </header>

      {/* Main Viewport Content Split */}
      <div id="vantage-main-viewport" className="flex-1 flex overflow-hidden">
        
        {/* Left Hand Navigation Sidebar */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          stadiumName={stadiumState.stadium}
        />

        {/* Dynamic Display Area */}
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
          {renderActiveView()}
        </main>

      </div>

      {/* Bottom Control / Status Bar */}
      <footer id="vantage-footer" className="h-12 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-6 shrink-0 text-white text-[10px] uppercase font-mono">
        <div className="flex items-center gap-6">
          <div className="text-zinc-400">
            Node Zone: <span className="text-green-400 font-bold">AWS-US-EAST-1</span>
          </div>
          <div className="text-zinc-400">
            Cognitive Triage API: <span className="text-green-400 font-bold">99.99% ONLINE</span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="px-2 py-0.5 bg-slate-800 rounded text-[9px] text-slate-400 font-bold border border-slate-700">
            v1.04.2-STABLE
          </div>
          <button 
            onClick={fetchLiveState}
            className="px-3.5 py-1 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded text-[10px] font-black uppercase transition-all tracking-wider cursor-pointer shadow-sm"
          >
            Refresh Telemetry
          </button>
        </div>
      </footer>

    </div>
  );
}

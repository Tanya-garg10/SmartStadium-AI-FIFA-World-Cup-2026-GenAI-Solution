import React, { useState } from 'react';
import { 
  Users, 
  Activity, 
  Clock, 
  ShieldAlert, 
  TrendingUp, 
  RefreshCw, 
  Lightbulb, 
  ArrowRight,
  Gauge
} from 'lucide-react';
import { GateStatus, SectorStatus } from '../types';

interface LiveOpsDashboardProps {
  stadiumState: any;
  setStadiumState: any;
  isLoading: boolean;
  onRefresh: () => void;
}

export default function LiveOpsDashboard({ stadiumState, setStadiumState, isLoading, onRefresh }: LiveOpsDashboardProps) {
  const [activeScenario, setActiveScenario] = useState<'normal' | 'concession_rush' | 'gate_bottleneck' | 'exit_mode'>('normal');

  // Trigger scenario updates locally to update simulated telemetry state
  const handleScenarioChange = (scenario: 'normal' | 'concession_rush' | 'gate_bottleneck' | 'exit_mode') => {
    setActiveScenario(scenario);
    
    let updatedGates = [...stadiumState.gates];
    let updatedSectors = [...stadiumState.sectors];
    let occupancy = 86;

    if (scenario === 'normal') {
      occupancy = 86;
      updatedGates = [
        { id: "gate-a", name: "Gate A (Main North)", flowRate: 240, occupancy: 35, status: "optimal", avgWaitTime: 5 },
        { id: "gate-b", name: "Gate B (East Rotunda)", flowRate: 480, occupancy: 85, status: "congested", avgWaitTime: 35 },
        { id: "gate-c", name: "Gate C (South Transit Hub)", flowRate: 310, occupancy: 55, status: "moderate", avgWaitTime: 12 },
        { id: "gate-d", name: "Gate D (West VIP)", flowRate: 90, occupancy: 15, status: "optimal", avgWaitTime: 2 },
      ];
      updatedSectors = [
        { id: "sector-100", name: "Section 100-112 (Lower North)", capacity: 15000, currentCount: 12400, density: "high", noiseLevel: 94 },
        { id: "sector-113", name: "Section 113-125 (Lower East)", capacity: 18000, currentCount: 16900, density: "critical", noiseLevel: 102 },
        { id: "sector-126", name: "Section 126-138 (Lower South)", capacity: 15000, currentCount: 11200, density: "medium", noiseLevel: 88 },
        { id: "sector-139", name: "Section 139-150 (Lower West)", capacity: 17000, currentCount: 9500, density: "low", noiseLevel: 81 },
      ];
    } else if (scenario === 'concession_rush') {
      occupancy = 94;
      updatedGates = [
        { id: "gate-a", name: "Gate A (Main North)", flowRate: 80, occupancy: 15, status: "optimal", avgWaitTime: 3 },
        { id: "gate-b", name: "Gate B (East Rotunda)", flowRate: 150, occupancy: 30, status: "optimal", avgWaitTime: 4 },
        { id: "gate-c", name: "Gate C (South Transit Hub)", flowRate: 120, occupancy: 25, status: "optimal", avgWaitTime: 3 },
        { id: "gate-d", name: "Gate D (West VIP)", flowRate: 40, occupancy: 10, status: "optimal", avgWaitTime: 1 },
      ];
      updatedSectors = [
        { id: "sector-100", name: "Section 100-112 (Lower North)", capacity: 15000, currentCount: 14600, density: "critical", noiseLevel: 98 },
        { id: "sector-113", name: "Section 113-125 (Lower East)", capacity: 18000, currentCount: 17800, density: "critical", noiseLevel: 104 },
        { id: "sector-126", name: "Section 126-138 (Lower South)", capacity: 15000, currentCount: 14200, density: "critical", noiseLevel: 96 },
        { id: "sector-139", name: "Section 139-150 (Lower West)", capacity: 17000, currentCount: 16500, density: "critical", noiseLevel: 95 },
      ];
    } else if (scenario === 'gate_bottleneck') {
      occupancy = 78;
      updatedGates = [
        { id: "gate-a", name: "Gate A (Main North)", flowRate: 110, occupancy: 20, status: "optimal", avgWaitTime: 4 },
        { id: "gate-b", name: "Gate B (East Rotunda)", flowRate: 610, occupancy: 98, status: "congested", avgWaitTime: 55 },
        { id: "gate-c", name: "Gate C (South Transit Hub)", flowRate: 450, occupancy: 82, status: "congested", avgWaitTime: 28 },
        { id: "gate-d", name: "Gate D (West VIP)", flowRate: 70, occupancy: 15, status: "optimal", avgWaitTime: 2 },
      ];
      updatedSectors = [
        { id: "sector-100", name: "Section 100-112 (Lower North)", capacity: 15000, currentCount: 10200, density: "medium", noiseLevel: 82 },
        { id: "sector-113", name: "Section 113-125 (Lower East)", capacity: 18000, currentCount: 14100, density: "high", noiseLevel: 91 },
        { id: "sector-126", name: "Section 126-138 (Lower South)", capacity: 15000, currentCount: 9800, density: "medium", noiseLevel: 84 },
        { id: "sector-139", name: "Section 139-150 (Lower West)", capacity: 17000, currentCount: 8100, density: "low", noiseLevel: 75 },
      ];
    } else if (scenario === 'exit_mode') {
      occupancy = 45; // Empties out quickly
      updatedGates = [
        { id: "gate-a", name: "Gate A (Main North)", flowRate: 710, occupancy: 92, status: "congested", avgWaitTime: 20 },
        { id: "gate-b", name: "Gate B (East Rotunda)", flowRate: 850, occupancy: 95, status: "congested", avgWaitTime: 25 },
        { id: "gate-c", name: "Gate C (South Transit Hub)", flowRate: 910, occupancy: 96, status: "congested", avgWaitTime: 22 },
        { id: "gate-d", name: "Gate D (West VIP)", flowRate: 210, occupancy: 40, status: "optimal", avgWaitTime: 6 },
      ];
      updatedSectors = [
        { id: "sector-100", name: "Section 100-112 (Lower North)", capacity: 15000, currentCount: 4500, density: "low", noiseLevel: 89 },
        { id: "sector-113", name: "Section 113-125 (Lower East)", capacity: 18000, currentCount: 6100, density: "low", noiseLevel: 91 },
        { id: "sector-126", name: "Section 126-138 (Lower South)", capacity: 15000, currentCount: 4900, density: "low", noiseLevel: 85 },
        { id: "sector-139", name: "Section 139-150 (Lower West)", capacity: 17000, currentCount: 3200, density: "low", noiseLevel: 78 },
      ];
    }

    setStadiumState({
      ...stadiumState,
      overallOccupancy: occupancy,
      gates: updatedGates,
      sectors: updatedSectors
    });
  };

  // Pre-configured AI advice arrays based on active scenario
  const aiAdvisories = {
    normal: [
      { id: 1, type: 'info', text: 'Crowd density is distributed as expected. Gate B is exhibiting a 35m wait queue due to train schedule arrivals.', action: 'Deploy 5 stewards to Gate B to distribute water and assist with mobile ticket issues.' },
      { id: 2, type: 'warning', text: 'Sector 113 (Lower East) density is elevated (94% capacity). High crowd vibration detected.', action: 'Direct on-ground stewards to check standing lanes for accessibility blockages.' },
      { id: 3, type: 'recommend', text: 'Gate A (Main North) is practically empty (5m wait time).', action: 'Update dynamic digital billboards at the Subway station transit hub recommending Gate A entry for Section 100-108 ticket holders.' }
    ],
    concession_rush: [
      { id: 1, type: 'warning', text: 'Halftime triggered nationwide concession rush. Queue times at Section 100 & 113 food courts exceed 15 minutes.', action: 'Push mobile app notifications suggesting fans visit Section 139 level concessions with sub-4 minute wait times.' },
      { id: 2, type: 'recommend', text: 'Washroom queues in East concourse are heavily loaded.', action: 'AI Router automatically flips digital arrows directing half-time crowds to Section 126 underutilized facilities.' }
    ],
    gate_bottleneck: [
      { id: 1, type: 'critical', text: 'Gate B wait time has spiked to 55 minutes, presenting a potential crush threshold.', action: 'Activate acoustic queue diversion boards immediately. Instruct transit partners to slow down incoming shuttle arrivals by 3 minutes.' },
      { id: 2, type: 'warning', text: 'Gate C occupancy has risen to 82% as fans naturally seek alternatives.', action: 'Open overflow bypass lane 4C and dispatch 4 security rangers to support ticket validation scanners.' },
      { id: 3, type: 'info', text: 'Gate A remains optimal at 4-minute wait times.', action: 'Trigger a push notification to all geofenced tickets entering from East Transit hubs suggesting transit bypass.' }
    ],
    exit_mode: [
      { id: 1, type: 'info', text: 'Match conclusion detected. 82,000 spectators exiting concurrently.', action: 'Open all perimeter steel gates (Gates A-D) to outward egress mode. Switch digital signage to show public transit departures.' },
      { id: 2, type: 'warning', text: 'Concourse Sectors 113 and 126 showing elevated exits friction.', action: 'Direct security stewards to establish safety-cones near the main escalator bottlenecks to restrict cascade acceleration.' },
      { id: 3, type: 'recommend', text: 'VIP Gate D exhibits extremely low usage.', action: 'Activate accessibility exception, allowing sensory-sensitive and elderly fans standard exit paths via Gate D.' }
    ]
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8 text-slate-800">
      
      {/* Upper Title Area */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 font-bold tracking-wider uppercase">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 inline-block animate-ping"></span>
            Telemetry Control Console
          </div>
          <h2 className="text-3xl font-sans font-black tracking-tight text-slate-900 mt-1">Live Stadium Operations</h2>
          <p className="text-xs font-mono text-slate-400 mt-1 uppercase">Vibrant Multi-Agent Stadium Orchestration Hub</p>
        </div>
        
        {/* Scenario Selectors */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-mono text-slate-400 px-2 uppercase tracking-wide font-bold">Scenario Preset:</span>
          <button 
            id="scenario-btn-normal"
            onClick={() => handleScenarioChange('normal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeScenario === 'normal' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Normal Flow
          </button>
          <button 
            id="scenario-btn-concession"
            onClick={() => handleScenarioChange('concession_rush')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeScenario === 'concession_rush' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Halftime Rush
          </button>
          <button 
            id="scenario-btn-bottleneck"
            onClick={() => handleScenarioChange('gate_bottleneck')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeScenario === 'gate_bottleneck' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Gate B Bottleneck
          </button>
          <button 
            id="scenario-btn-exit"
            onClick={() => handleScenarioChange('exit_mode')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeScenario === 'exit_mode' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Exit Egress
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase font-bold">Stadium Occupancy</span>
            <div className="text-3xl font-sans font-black text-slate-900 mt-1">{stadiumState.overallOccupancy}%</div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1.5 font-mono font-bold">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              <span>{stadiumState.overallOccupancy > 90 ? 'Near Capacity' : 'Steady State'}</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
            <Users className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase font-bold">Avg Entry Wait</span>
            <div className="text-3xl font-sans font-black text-slate-900 mt-1">
              {Math.round(stadiumState.gates.reduce((acc: number, g: any) => acc + g.avgWaitTime, 0) / stadiumState.gates.length)}m
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1.5 font-mono font-bold">
              <Clock className="h-3.5 w-3.5 text-amber-500" />
              <span>Gate B spikes average</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-inner">
            <Clock className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase font-bold">Active Stewards</span>
            <div className="text-3xl font-sans font-black text-slate-900 mt-1">240</div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1.5 font-mono font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              <span>On-ground Staff Synced</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
            <Activity className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase font-bold">Safety Incidents</span>
            <div className="text-3xl font-sans font-black text-slate-900 mt-1">{stadiumState.incidents.filter((i: any) => i.status !== 'resolved').length}</div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1.5 font-mono font-bold">
              <span className="text-red-500">●</span>
              <span>{stadiumState.incidents.filter((i: any) => i.severity === 'critical' || i.severity === 'high').length} High Severity</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 shadow-inner">
            <ShieldAlert className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Main Content Split: Telemetry vs AI Proactive Advisory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Gate & Sector status grids */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Gate Telemetry Card */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
              <div>
                <h3 className="font-sans font-bold text-lg text-slate-900">Turnstile & Gate Telemetry</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">Real-time throughput metrics via smart ticket validators</p>
              </div>
              <button 
                onClick={onRefresh}
                className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors cursor-pointer shadow-sm"
                title="Refresh Telemetry Data"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 text-xs font-mono uppercase bg-slate-50">
                    <th className="p-4 pl-6">Gate Identity</th>
                    <th className="p-4">Flow Rate</th>
                    <th className="p-4">Capacity Load</th>
                    <th className="p-4">Avg Wait</th>
                    <th className="p-4 pr-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stadiumState.gates.map((gate: GateStatus) => (
                    <tr key={gate.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 pl-6 font-bold text-slate-800">{gate.name}</td>
                      <td className="p-4 font-mono text-sm font-bold text-slate-900">{gate.flowRate} <span className="text-slate-400 text-xs font-normal">p/min</span></td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                gate.status === 'optimal' ? 'bg-emerald-500' :
                                gate.status === 'moderate' ? 'bg-amber-400' : 'bg-rose-500'
                              }`}
                              style={{ width: `${gate.occupancy}%` }}
                            ></div>
                          </div>
                          <span className="font-mono text-xs font-bold text-slate-700">{gate.occupancy}%</span>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-sm">
                        <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${
                          gate.avgWaitTime > 30 ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                          gate.avgWaitTime > 15 ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        }`}>
                          {gate.avgWaitTime} mins
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wide border ${
                          gate.status === 'optimal' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          gate.status === 'moderate' ? 'bg-amber-55 text-amber-700 border-amber-100' :
                          'bg-rose-50 text-rose-700 border-rose-100'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            gate.status === 'optimal' ? 'bg-emerald-500' :
                            gate.status === 'moderate' ? 'bg-amber-400' : 'bg-rose-500'
                          }`}></span>
                          {gate.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sector Crowd Densities Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-sans font-bold text-lg text-slate-900 mb-1">Stadium Seating Sector Densities</h3>
            <p className="text-xs text-slate-500 font-mono mb-6">IoT pressure sensors and visual intelligence edge-counting models</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {stadiumState.sectors.map((sector: SectorStatus) => (
                <div key={sector.id} className="p-5 rounded-2xl bg-slate-50/50 border border-slate-200 flex flex-col justify-between hover:border-indigo-200 transition-colors group">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-slate-800 group-hover:text-indigo-900 transition-colors">{sector.name}</h4>
                      <p className="text-[10px] font-mono text-slate-400 mt-0.5 font-bold">Capacity: {sector.capacity.toLocaleString()}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wide border ${
                      sector.density === 'low' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      sector.density === 'medium' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                      sector.density === 'high' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      'bg-rose-50 text-rose-700 border-rose-100 animate-pulse'
                    }`}>
                      {sector.density} density
                    </span>
                  </div>

                  <div className="mt-5">
                    <div className="flex justify-between items-center text-xs font-mono text-slate-500 mb-1.5">
                      <span>Occupied Count: <strong className="text-slate-800">{sector.currentCount.toLocaleString()}</strong></span>
                      <span className="font-bold">{Math.round((sector.currentCount / sector.capacity) * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          sector.density === 'low' ? 'bg-emerald-500' :
                          sector.density === 'medium' ? 'bg-indigo-500' :
                          sector.density === 'high' ? 'bg-amber-400' : 'bg-rose-500'
                        }`}
                        style={{ width: `${Math.round((sector.currentCount / sector.capacity) * 100)}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mt-3.5 border-t border-slate-200/60 pt-2.5">
                      <div className="flex items-center gap-1.5">
                        <Gauge className="h-3.5 w-3.5 text-slate-400" />
                        <span>Acoustic Decibel Meter:</span>
                      </div>
                      <span className={`font-bold ${sector.noiseLevel > 100 ? 'text-rose-600' : sector.noiseLevel > 90 ? 'text-amber-600' : 'text-slate-600'}`}>
                        {sector.noiseLevel} dB
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Column: AI Proactive Advisory Board */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-[580px] lg:h-auto">
          <div>
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-100">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-lg text-slate-900 leading-tight">Aura AI Live Advisory</h3>
                <p className="text-xs text-slate-400 font-mono font-bold mt-0.5">Proactive advice & dispatcher tasks</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 overflow-y-auto max-h-[460px] pr-1 scrollbar-thin">
              {aiAdvisories[activeScenario].map((adv) => (
                <div key={adv.id} className="p-4 rounded-xl bg-slate-50/50 border border-slate-200 hover:border-indigo-200 transition-all group">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      adv.type === 'critical' ? 'bg-rose-500 animate-ping' :
                      adv.type === 'warning' ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}></span>
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold tracking-wider">
                      {adv.type === 'critical' ? 'CRITICAL ALERT' : adv.type === 'warning' ? 'CONGESTION WARNING' : 'AI OPTIMIZATION'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">{adv.text}</p>
                  
                  <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 flex flex-col gap-1.5 group-hover:border-indigo-200 transition-colors">
                    <span className="text-[10px] font-mono text-indigo-600 font-extrabold flex items-center gap-1 uppercase tracking-wider">
                      Recommended Operation <ArrowRight className="h-2.5 w-2.5" />
                    </span>
                    <span className="text-xs text-slate-500 font-sans leading-normal font-medium">{adv.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3 text-xs font-mono text-slate-400 font-bold">
            <span className="h-2 w-2 rounded-full bg-indigo-500 inline-block animate-pulse"></span>
            <span>Continuous Stream Processing Active</span>
          </div>
        </div>

      </div>

    </div>
  );
}

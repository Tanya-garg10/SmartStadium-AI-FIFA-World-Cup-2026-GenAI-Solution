import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Network, 
  Code, 
  Sparkles,
  Server,
  Terminal,
  Database,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { architecturePlaybook, PlaybookSection } from '../data/architecturePlaybook';

export default function ArchitecturePlaybook() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'core' | 'architecture' | 'implementation' | 'strategy'>('all');
  const [selectedSectionId, setSelectedSectionId] = useState('project-idea');

  const categories = [
    { id: 'all', name: 'All 20 Requirements', icon: BookOpen },
    { id: 'core', name: '1. Vision & Strategy', icon: Sparkles },
    { id: 'architecture', name: '2. System Architecture', icon: Network },
    { id: 'implementation', name: '3. Technical Specs', icon: Code },
    { id: 'strategy', name: '4. Pitch & Launch', icon: ShieldCheck },
  ];

  const filteredPlaybook = architecturePlaybook.filter(
    (sec) => selectedCategory === 'all' || sec.category === selectedCategory
  );

  const activeSection = architecturePlaybook.find((sec) => sec.id === selectedSectionId) || architecturePlaybook[0];

  return (
    <div className="flex-1 overflow-hidden bg-zinc-900 flex flex-col h-screen text-zinc-100">
      
      {/* Playbook Header */}
      <div className="p-6 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-sans font-bold text-white leading-tight">Hackathon Mentorship Playbook</h2>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">End-to-End AI Architectural Solution for FIFA World Cup 2026 operations</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-850 text-xs font-mono text-zinc-400">
          <Award className="h-4 w-4 text-emerald-400" />
          <span>Judges Criteria: High-Fidelity Winner Plan</span>
        </div>
      </div>

      {/* Categories Toolbar Filter */}
      <div className="p-4 bg-zinc-950/60 border-b border-zinc-900 shrink-0 flex flex-wrap gap-2 items-center">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              id={`cat-btn-${cat.id}`}
              onClick={() => {
                setSelectedCategory(cat.id as any);
                // Auto reset active section to first in category if exists
                const inCat = architecturePlaybook.filter(s => cat.id === 'all' || s.category === cat.id);
                if (inCat.length > 0) setSelectedSectionId(inCat[0].id);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat.id 
                  ? 'bg-zinc-800 border border-zinc-700 text-white font-bold' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main split: Section List (left) vs Active Details (right) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: 20 sections scroller */}
        <div className="w-80 border-r border-zinc-800 bg-zinc-950/40 flex flex-col overflow-y-auto shrink-0 scrollbar-thin">
          <div className="p-3.5 border-b border-zinc-900 bg-zinc-950/60 flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
            <span>Operational Elements</span>
            <span>{filteredPlaybook.length} sections</span>
          </div>

          <div className="divide-y divide-zinc-900 p-2.5 space-y-1">
            {filteredPlaybook.map((sec) => (
              <button
                key={sec.id}
                id={`playbook-section-btn-${sec.id}`}
                onClick={() => setSelectedSectionId(sec.id)}
                className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all group ${
                  selectedSectionId === sec.id 
                    ? 'bg-zinc-900 border-l-2 border-emerald-500 text-white' 
                    : 'text-zinc-400 hover:bg-zinc-900/30'
                }`}
              >
                <span className="font-mono text-xs font-bold text-emerald-400/90 mt-0.5 shrink-0 bg-zinc-900/60 px-1.5 py-0.5 rounded border border-zinc-800">
                  #{String(sec.number).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <div className="font-sans font-bold text-xs group-hover:text-white transition-colors truncate">{sec.title.replace('Innovative Project Idea: ', '')}</div>
                  <div className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-400 truncate mt-1 uppercase tracking-wide">{sec.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Big Detail & Diagram view */}
        <div className="flex-1 bg-zinc-900 overflow-y-auto p-8 scrollbar-thin flex flex-col justify-between">
          
          <div className="space-y-6">
            
            {/* Header Title Card */}
            <div className="border-b border-zinc-800 pb-5">
              <span className="px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                Section {String(activeSection.number).padStart(2, '0')} | {activeSection.category}
              </span>
              <h3 className="text-2xl font-sans font-bold text-white tracking-tight mt-3">{activeSection.title}</h3>
              <p className="text-sm text-zinc-400 font-mono mt-1 uppercase tracking-wider">{activeSection.subtitle}</p>
            </div>

            {/* Main content body text */}
            <div className="bg-zinc-950 border border-zinc-850 p-6 rounded-xl shadow-md">
              <p className="text-sm text-zinc-300 leading-relaxed font-sans">{activeSection.content}</p>
            </div>

            {/* Custom SVG Diagrams renderers */}
            {activeSection.diagramType && (
              <div className="p-6 bg-zinc-950 border border-zinc-850 rounded-xl space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-3">
                  <Network className="h-4 w-4 text-emerald-400" />
                  <span>Interactive Architecture Diagram</span>
                </div>

                {/* 1. End-To-End System Diagram */}
                {activeSection.diagramType === 'system' && (
                  <div className="relative border border-zinc-900 rounded-lg p-5 bg-zinc-900/40 text-center flex flex-col md:flex-row items-center justify-around gap-4">
                    <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 w-44 shadow">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Fan Client</span>
                      <strong className="text-xs text-white">Vite SPA / React</strong>
                      <span className="text-[10px] text-zinc-400 block mt-1.5 font-mono">Vercel Edge Host</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-emerald-400 shrink-0 transform rotate-90 md:rotate-0" />
                    <div className="p-4 bg-zinc-950 rounded-lg border border-emerald-500/20 w-48 shadow">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-1">Secure API Gateway</span>
                      <strong className="text-xs text-white">Express Server</strong>
                      <span className="text-[10px] text-zinc-400 block mt-1.5 font-mono">Render/Cloud Run</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-emerald-400 shrink-0 transform rotate-90 md:rotate-0" />
                    <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 w-44 shadow">
                      <span className="text-[10px] font-mono text-indigo-400 uppercase block mb-1">Cognitive Orchestration</span>
                      <strong className="text-xs text-white">Google Gemini API</strong>
                      <span className="text-[10px] text-zinc-400 block mt-1.5 font-mono">3.5 Flash / 3.1 Pro</span>
                    </div>
                  </div>
                )}

                {/* 2. AI Multi-Agent Workflow Diagram */}
                {activeSection.diagramType === 'flow' && (
                  <div className="relative border border-zinc-900 rounded-lg p-5 bg-zinc-900/40 text-center flex flex-col md:flex-row items-center justify-around gap-4">
                    <div className="p-3.5 bg-zinc-950 rounded-lg border border-zinc-800 w-36 shadow">
                      <span className="text-[10px] font-mono text-red-400 uppercase block">1. Sanitize</span>
                      <strong className="text-[11px] text-white">Safety Guardrails</strong>
                    </div>
                    <ArrowRight className="h-4 w-4 text-emerald-400 shrink-0 transform rotate-90 md:rotate-0" />
                    <div className="p-3.5 bg-zinc-950 rounded-lg border border-zinc-800 w-36 shadow">
                      <span className="text-[10px] font-mono text-amber-400 uppercase block">2. Classify</span>
                      <strong className="text-[11px] text-white">Intent Router</strong>
                    </div>
                    <ArrowRight className="h-4 w-4 text-emerald-400 shrink-0 transform rotate-90 md:rotate-0" />
                    <div className="p-3.5 bg-zinc-950 rounded-lg border border-emerald-500/30 w-40 shadow">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase block">3. Ground</span>
                      <strong className="text-[11px] text-white">Telemetry Context</strong>
                    </div>
                    <ArrowRight className="h-4 w-4 text-emerald-400 shrink-0 transform rotate-90 md:rotate-0" />
                    <div className="p-3.5 bg-zinc-950 rounded-lg border border-zinc-800 w-36 shadow">
                      <span className="text-[10px] font-mono text-indigo-400 uppercase block">4. Enforce</span>
                      <strong className="text-[11px] text-white">JSON Schema</strong>
                    </div>
                  </div>
                )}

                {/* 3. API & Data Flow Diagram */}
                {activeSection.diagramType === 'database' && (
                  <div className="relative border border-zinc-900 rounded-lg p-5 bg-zinc-900/40 text-center flex flex-col md:flex-row items-center justify-around gap-4">
                    <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 w-44 shadow">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">IoT Crowd Sensors</span>
                      <strong className="text-xs text-white">RFID Turnstiles</strong>
                    </div>
                    <ArrowRight className="h-5 w-5 text-emerald-400 shrink-0 transform rotate-90 md:rotate-0" />
                    <div className="p-4 bg-zinc-950 rounded-lg border border-emerald-500/20 w-44 shadow">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-1">PostgreSQL db</span>
                      <strong className="text-xs text-white">Supabase Cluster</strong>
                    </div>
                    <ArrowRight className="h-5 w-5 text-emerald-400 shrink-0 transform rotate-90 md:rotate-0" />
                    <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 w-44 shadow">
                      <span className="text-[10px] font-mono text-indigo-400 uppercase block mb-1">Alert dispatch</span>
                      <strong className="text-xs text-white">Steward Mobile Hub</strong>
                    </div>
                  </div>
                )}

                {/* 4. Deployment Topology Diagram */}
                {activeSection.diagramType === 'deployment' && (
                  <div className="relative border border-zinc-900 rounded-lg p-5 bg-zinc-900/40 text-center flex flex-col md:flex-row items-center justify-around gap-4">
                    <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 w-44 shadow">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Global CDN Edge</span>
                      <strong className="text-xs text-white">Vercel Edge Assets</strong>
                    </div>
                    <ArrowRight className="h-5 w-5 text-emerald-400 shrink-0 transform rotate-90 md:rotate-0" />
                    <div className="p-4 bg-zinc-950 rounded-lg border border-emerald-500/20 w-44 shadow">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-1">Auto-scaling Cluster</span>
                      <strong className="text-xs text-white">Render Express Pods</strong>
                    </div>
                    <ArrowRight className="h-5 w-5 text-emerald-400 shrink-0 transform rotate-90 md:rotate-0" />
                    <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 w-44 shadow">
                      <span className="text-[10px] font-mono text-indigo-400 uppercase block mb-1">Distributed Cluster</span>
                      <strong className="text-xs text-white">Supabase Multi-Region</strong>
                    </div>
                  </div>
                )}

                {/* 5. User Journey Visualizer */}
                {activeSection.diagramType === 'user_journey' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    <div className="p-4 rounded bg-zinc-900 border border-zinc-850">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-2">Spectator Journey</span>
                      <p className="text-xs leading-relaxed text-zinc-350">
                        1. Enters stadium outer bounds.<br/>
                        2. Aura detects geofence and suggests <strong>Gate A (step-free)</strong>, completely bypassing 55-minute queue at Gate B.<br/>
                        3. Guides fan directly to Section 113 Wheelchair row H.<br/>
                        4. Fan queries concessions and walks straight to empty Section 139 counters.
                      </p>
                    </div>
                    <div className="p-4 rounded bg-zinc-900 border border-zinc-850">
                      <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold block mb-2">Command Operations Journey</span>
                      <p className="text-xs leading-relaxed text-zinc-350">
                        1. Steward logs "Slipping hazard at Sec 102".<br/>
                        2. Gemini 3.5 automatically triages reports, rates <strong>Medium Severity</strong>.<br/>
                        3. AI automatically designates <strong>Facilities Team</strong> and triggers push notification.<br/>
                        4. Safety checklist dispatched, issue resolved in 6 minutes.
                      </p>
                    </div>
                  </div>
                )}

                {/* 6. Simple API Endpoint Visualizer */}
                {activeSection.diagramType === 'api' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-zinc-900 rounded border border-zinc-850 font-mono text-xs">
                      <span className="text-emerald-400 font-bold">POST /api/gemini/chat</span>
                      <span className="text-zinc-500">Multilingual Fan Copilot Core</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-zinc-900 rounded border border-zinc-850 font-mono text-xs">
                      <span className="text-emerald-400 font-bold">POST /api/gemini/incident-assess</span>
                      <span className="text-zinc-500">Steward Structured JSON Triage</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-zinc-900 rounded border border-zinc-850 font-mono text-xs">
                      <span className="text-zinc-400">GET /api/stadium/live-state</span>
                      <span className="text-zinc-500">Live IoT Gate & Sector Density State</span>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* List details bullets if present */}
            {activeSection.bullets && (
              <div className="space-y-3">
                <h4 className="font-sans font-bold text-sm text-zinc-400 uppercase tracking-wide">Key Points & Actionables</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeSection.bullets.map((bullet, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-850 flex gap-3 hover:border-zinc-700 transition-colors">
                      <div className="h-6 w-6 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono text-xs shrink-0 font-bold">
                        {idx + 1}
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Block Renderer */}
            {activeSection.codeBlock && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wide">
                  <Terminal className="h-4 w-4" />
                  <span>Production Code Sample: {activeSection.codeBlock.language}</span>
                </div>
                <div className="p-5 bg-zinc-950 border border-zinc-850 rounded-xl overflow-x-auto shadow-inner text-xs font-mono leading-relaxed text-zinc-200">
                  <pre>{activeSection.codeBlock.code}</pre>
                </div>
              </div>
            )}

          </div>

          <div className="mt-8 pt-4 border-t border-zinc-900 flex flex-col md:flex-row md:items-center md:justify-between text-xs font-mono text-zinc-500 gap-2 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              <span>Senior Solution Architect Pitch Guidelines Approved</span>
            </div>
            <span>AuraStadium System Design v1.0.4</span>
          </div>

        </div>

      </div>

    </div>
  );
}

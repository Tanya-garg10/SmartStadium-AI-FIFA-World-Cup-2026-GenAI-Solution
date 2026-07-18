import React, { useState } from 'react';
import { 
  Plus, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  ChevronRight, 
  AlertTriangle, 
  Users, 
  Megaphone,
  Filter,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { Incident } from '../types';

interface IncidentDispatcherProps {
  incidents: Incident[];
  setIncidents: React.Dispatch<React.SetStateAction<Incident[]>>;
}

export default function IncidentDispatcher({ incidents, setIncidents }: IncidentDispatcherProps) {
  // New Incident Form States
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<'medical' | 'security' | 'facilities' | 'lost_found' | 'accessibility'>('facilities');
  const [description, setDescription] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'reported' | 'dispatched' | 'resolved'>('all');

  const handleReportIncident = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !location.trim()) return;

    setIsSubmitting(true);
    setErrorText(null);

    try {
      const response = await fetch('/api/gemini/incident-assess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          location,
          category,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze incident with GenAI triage agent.');
      }

      // Add new incident to local state
      const newIncident: Incident = {
        id: `inc-${Date.now()}`,
        title,
        location,
        category: data.category || category,
        description,
        reportedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'dispatched', // Automatically dispatched because AI recommended a team!
        severity: data.severity || 'medium',
        recommendedAction: data.recommendedAction,
        assignedTeam: data.assignedTeam,
        broadcastDraft: data.broadcastDraft,
      };

      setIncidents((prev) => [newIncident, ...prev]);
      
      // Clear Form Fields
      setTitle('');
      setLocation('');
      setDescription('');
    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || 'Error connecting to Gemini safety triage API.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = (id: string, nextStatus: 'dispatched' | 'resolved') => {
    setIncidents((prev) => 
      prev.map((inc) => (inc.id === id ? { ...inc, status: nextStatus } : inc))
    );
  };

  const filteredIncidents = incidents.filter((inc) => {
    if (filterStatus === 'all') return true;
    return inc.status === filterStatus;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8 text-slate-800">
      
      {/* Title area */}
      <div className="border-b border-slate-200 pb-6 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 font-bold tracking-wider uppercase">
          <span className="h-2 w-2 rounded-full bg-indigo-600 inline-block animate-ping"></span>
          Operations Safety Module
        </div>
        <h2 className="text-3xl font-sans font-black tracking-tight text-slate-900 mt-1">Smart Incident Dispatch</h2>
        <p className="text-xs text-slate-400 font-mono mt-1 uppercase font-bold">Submit ground steward reports and watch Gemini API classify, assign, and draft alerts dynamically</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Log Incident Form */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
            <Plus className="h-5 w-5 text-indigo-600" />
            <h3 className="font-sans font-extrabold text-lg text-slate-900">Log Live Incident</h3>
          </div>

          <form onSubmit={handleReportIncident} className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-slate-500 uppercase mb-1.5 font-bold">Incident Title</label>
              <input 
                id="incident-title-input"
                type="text"
                placeholder="e.g., Water leakage near Section 102 toilets"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-400 focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-500 uppercase mb-1.5 font-bold">Location / Sector</label>
                <input 
                  id="incident-location-input"
                  type="text"
                  placeholder="e.g., Section 102 row F"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-400 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-500 uppercase mb-1.5 font-bold">Initial Category</label>
                <select
                  id="incident-category-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                >
                  <option value="facilities">Facilities & Leaks</option>
                  <option value="medical">Medical / First Aid</option>
                  <option value="security">Security & Crowds</option>
                  <option value="accessibility">Accessibility Barrier</option>
                  <option value="lost_found">Lost & Found</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 uppercase mb-1.5 font-bold">Detailed Steward Report</label>
              <textarea 
                id="incident-desc-textarea"
                rows={4}
                placeholder="Describe exactly what you observe. Gemini will evaluate safety threats, choose the dispatch group, and create public instructions."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-400 focus:border-indigo-500 transition-colors"
              />
            </div>

            {errorText && (
              <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs leading-relaxed flex items-start gap-2 shadow-sm font-medium">
                <ShieldAlert className="h-4.5 w-4.5 shrink-0 mt-0.5 text-rose-500" />
                <span>{errorText}</span>
              </div>
            )}

            <button
              id="report-incident-btn"
              type="submit"
              disabled={isSubmitting || !title.trim() || !description.trim()}
              className="w-full py-3 bg-indigo-600 text-white font-bold text-sm rounded-lg hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>AI Structured Triage in Progress...</span>
                </>
              ) : (
                <>
                  <span>Submit & Run AI Triage</span>
                  <ChevronRight className="h-4.5 w-4.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right 2 Columns: Active Incidents Dispatch Feed */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Feed Filter Headers */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2">
              <Filter className="h-4.5 w-4.5 text-slate-400" />
              <span className="font-sans font-bold text-sm text-slate-800">Incident Dispatch Board</span>
            </div>

            <div className="flex items-center gap-1.5">
              {(['all', 'dispatched', 'resolved'] as const).map((status) => (
                <button
                  key={status}
                  id={`filter-btn-${status}`}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded text-xs font-bold uppercase font-mono tracking-wide transition-all cursor-pointer ${
                    filterStatus === status 
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-950 font-extrabold border shadow-sm' 
                      : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Incidents Stream */}
          <div className="space-y-5">
            {filteredIncidents.length === 0 ? (
              <div className="bg-white border border-slate-200 p-12 rounded-2xl text-center shadow-sm">
                <CheckCircle className="h-10 w-10 text-emerald-500/30 mx-auto mb-3 animate-bounce" />
                <h4 className="font-sans font-extrabold text-slate-800 mb-1">Clear Command Board</h4>
                <p className="text-xs text-slate-500 font-mono font-bold">No logged incidents match the selected filter. Clean operations!</p>
              </div>
            ) : (
              filteredIncidents.map((inc) => (
                <div 
                  key={inc.id}
                  className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all ${
                    inc.status === 'resolved' 
                      ? 'border-slate-200 opacity-60 bg-slate-50/50' 
                      : inc.severity === 'critical' ? 'border-rose-300 bg-rose-50/10' :
                        inc.severity === 'high' ? 'border-amber-300 bg-amber-50/10' : 'border-slate-200'
                  }`}
                >
                  {/* Top Bar: Severity, Title, Category */}
                  <div className="p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-widest border ${
                        inc.severity === 'critical' ? 'bg-rose-100 text-rose-700 border-rose-200 animate-pulse' :
                        inc.severity === 'high' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                        inc.severity === 'medium' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {inc.severity || 'medium'} SEVERITY
                      </span>
                      <h4 className="font-sans font-black text-slate-900 text-base">{inc.title}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-mono font-bold">Reported {inc.reportedTime} | {inc.location}</span>
                    </div>
                  </div>

                  {/* Body description */}
                  <div className="p-5 space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wide">Original Report:</span>
                      <p className="text-sm text-slate-700 font-sans mt-1 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-150">{inc.description}</p>
                    </div>

                    {/* GenAI Outputs */}
                    {inc.recommendedAction && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {/* Dispatch Actions Checklist */}
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-indigo-200 transition-colors">
                          <div>
                            <span className="text-[10px] font-mono text-indigo-600 font-bold flex items-center gap-1 uppercase tracking-wide mb-2.5">
                              <Users className="h-3.5 w-3.5" /> Dispatch Target & Action Checklist
                            </span>
                            <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">{inc.recommendedAction}</p>
                          </div>
                          
                          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Assigned Unit:</span>
                            <span className="text-xs font-bold text-slate-800 font-sans">{inc.assignedTeam || 'Local Stewards'}</span>
                          </div>
                        </div>

                        {/* Public Broadcast System Draft */}
                        {inc.broadcastDraft && (
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-indigo-200 transition-colors">
                            <div>
                              <span className="text-[10px] font-mono text-indigo-600 font-bold flex items-center gap-1.5 uppercase tracking-wide mb-2.5">
                                <Megaphone className="h-3.5 w-3.5" /> PA / Mobile Broadcast Template
                              </span>
                              <p className="text-xs text-slate-600 italic font-sans leading-relaxed">Ref: &ldquo;{inc.broadcastDraft}&rdquo;</p>
                            </div>
                            
                            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                              Ready for live PA audio synthesis
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom Bar Controls */}
                  <div className="px-5 py-4 bg-slate-50 border-t border-slate-150 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-indigo-500 inline-block animate-pulse"></span>
                      <span className="text-xs text-slate-500 font-mono capitalize font-bold">Status: {inc.status}</span>
                    </div>

                    <div className="flex gap-2">
                      {inc.status === 'reported' && (
                        <button
                          id={`dispatch-btn-${inc.id}`}
                          onClick={() => handleUpdateStatus(inc.id, 'dispatched')}
                          className="px-3.5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all cursor-pointer shadow-sm"
                        >
                          Dispatch Crew
                        </button>
                      )}
                      {inc.status !== 'resolved' && (
                        <button
                          id={`resolve-btn-${inc.id}`}
                          onClick={() => handleUpdateStatus(inc.id, 'resolved')}
                          className="px-3.5 py-1.5 rounded bg-indigo-50 border border-indigo-150 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 text-indigo-700 text-xs font-bold transition-all cursor-pointer shadow-sm"
                        >
                          Mark Resolved
                        </button>
                      )}
                      {inc.status === 'resolved' && (
                        <span className="text-xs font-mono text-emerald-600 flex items-center gap-1.5 font-bold">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 animate-bounce" /> Resolved
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

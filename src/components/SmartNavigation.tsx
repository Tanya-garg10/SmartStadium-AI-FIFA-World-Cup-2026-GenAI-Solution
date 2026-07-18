import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Sparkles, 
  Accessibility, 
  Eye, 
  EyeOff, 
  ShieldAlert, 
  ArrowRight,
  Route
} from 'lucide-react';
import { NavigationRoute } from '../types';

export default function SmartNavigation() {
  const [accessibleMode, setAccessibleMode] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState('route-1');

  const routesList: NavigationRoute[] = [
    {
      id: 'route-1',
      name: 'South Subway Hub ➔ Section 113 (Lower East)',
      from: 'South Subway Transit Station',
      to: 'Section 113 Lower East Seats',
      distance: '320 meters',
      estimatedTime: accessibleMode ? '6 minutes' : '4 minutes',
      isWheelchairAccessible: accessibleMode,
      crowdLevel: accessibleMode ? 'low' : 'high',
      steps: accessibleMode 
        ? [
            'Exit Subway Hub and head towards specialized Gate D (VIP & Accessible Entry).',
            'Take Step-Free Ramp D2 (slope: 1:12) to enter the Level 1 Outer Concourse.',
            'Walk past underutilized Gate C corridor (avoiding Gate B crowd build-up).',
            'Take Concourse Lift Alpha (located behind Section 110) to Section 113 entry tier.',
            'Follow green-lit step-free handrail indicators straight to wheelchair seat row H.'
          ]
        : [
            'Exit Subway Hub and walk directly into the main entrance at Gate B.',
            'Climb the main double-escalators to the Level 1 Concourse.',
            'Squeeze through outer concourse queue lines near Section 112 (high density).',
            'Walk down the Concrete Access Stairs at Tunnel 13 directly to Section 113 Row C.'
          ]
    },
    {
      id: 'route-2',
      name: 'Section 100 (Lower North) ➔ Family Zone (Sec 112)',
      from: 'Section 100 Seats',
      to: 'Family Zone (Concourse Section 112)',
      distance: '180 meters',
      estimatedTime: accessibleMode ? '4 minutes' : '2 minutes',
      isWheelchairAccessible: accessibleMode,
      crowdLevel: 'moderate',
      steps: accessibleMode
        ? [
            'From Section 100, head towards North Concourse Exit corridor.',
            'Use Concourse Elevator Beta (located behind Section 102) to decant to wide promenade Level.',
            'Walk down the gentle access ramp adjacent to Section 106.',
            'Arrive safely at Section 112 Family Zone without navigating step hazards.'
          ]
        : [
            'From Section 100 seats, head up the standard concrete steps to Tunnel 10.',
            'Follow the inner perimeter corridor past the under-seat stairs.',
            'Climb down Section 112 access tunnel stairs.'
          ]
    },
    {
      id: 'route-3',
      name: 'Section 126 (Lower South) ➔ Sensory-Quiet Room (Sec 215)',
      from: 'Section 126 Seats',
      to: 'Sensory-Quiet Room (Upper Concourse Section 215)',
      distance: '450 meters',
      estimatedTime: accessibleMode ? '8 minutes' : '6 minutes',
      isWheelchairAccessible: accessibleMode,
      crowdLevel: 'low',
      steps: accessibleMode
        ? [
            'Depart Section 126 and take the quiet corridor behind Section 128.',
            'Proceed to South Elevator Cluster 3 (designated Priority Accessibility access).',
            'Select Level 2 Concourse.',
            'Exit elevator and follow the calm blue Sensory Signage past the acoustic baffles.',
            'Enter the fully soundproofed Sensory-Quiet Room behind Section 215.'
          ]
        : [
            'Depart Section 126 and walk to the main East escalator bank.',
            'Take the high-volume escalator up to Level 2.',
            'Navigate past the central food court plaza (elevated volume & music).',
            'Walk down the upper level corridor to Section 215 quiet zone.'
          ]
    }
  ];

  const activeRoute = routesList.find(r => r.id === selectedRouteId) || routesList[0];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8 text-slate-800">
      
      {/* Title block */}
      <div className="border-b border-slate-200 pb-6 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 font-bold tracking-wider uppercase">
          <Compass className="h-4 w-4 text-indigo-600" />
          Spatial Intelligence Module
        </div>
        <h2 className="text-3xl font-sans font-black tracking-tight text-slate-900 mt-1">Smart Accessibility Routing</h2>
        <p className="text-xs text-slate-400 font-mono mt-1 uppercase font-bold">Simulated indoor spatial pathways optimizing fan mobility and comfort during peak crowds</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Grid: Route Options & Instructions (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Controls Panel */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h3 className="font-sans font-bold text-base text-slate-900 mb-4">Select Mobility Preferences</h3>
            
            {/* Route Selector Buttons */}
            <div className="space-y-2.5 mb-6">
              {routesList.map((route) => (
                <button
                  key={route.id}
                  id={`route-btn-${route.id}`}
                  onClick={() => setSelectedRouteId(route.id)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedRouteId === route.id 
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-950 font-bold shadow-sm' 
                      : 'bg-slate-50/50 border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Route className={`h-4 w-4 ${selectedRouteId === route.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Transit Link</span>
                  </div>
                  <p className="text-sm font-medium leading-tight">{route.name}</p>
                </button>
              ))}
            </div>

            {/* Accessibility Toggle Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-150 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center border transition-all ${
                    accessibleMode 
                      ? 'bg-indigo-50 text-indigo-600 border-indigo-150 shadow-sm' 
                      : 'bg-white text-slate-400 border-slate-200'
                  }`}>
                    <Accessibility className="h-5.5 w-5.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-sans font-extrabold text-slate-850 leading-none">Step-Free Accessibility</h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-1.5 uppercase tracking-wide font-bold">Reroute past lifts & gentle slopes</p>
                  </div>
                </div>
                
                {/* Switch Button */}
                <button
                  id="accessible-mode-toggle"
                  onClick={() => setAccessibleMode(!accessibleMode)}
                  className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-300 focus:outline-none cursor-pointer ${accessibleMode ? 'bg-indigo-600' : 'bg-slate-200'}`}
                >
                  <div className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform duration-300 ${accessibleMode ? 'translate-x-5.5' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* Route Metrics & Directions List */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div>
                <h4 className="font-sans font-extrabold text-base text-slate-900">Navigation Instructions</h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Calculated sub-second spatial sequence</p>
              </div>

              <div className="flex gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs text-slate-600 font-bold flex items-center gap-1.5 shadow-sm">
                  <Clock className="h-3.5 w-3.5 text-indigo-500" /> {activeRoute.estimatedTime}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs text-slate-600 font-bold shadow-sm">
                  {activeRoute.distance}
                </span>
              </div>
            </div>

            {/* Steps Container */}
            <div className="space-y-4">
              {activeRoute.steps.map((step, idx) => (
                <div key={idx} className="flex gap-3.5 items-start">
                  <div className="h-5.5 w-5.5 rounded-full bg-indigo-50 border border-indigo-100 font-mono text-[10px] font-bold text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">{step}</p>
                </div>
              ))}
            </div>

            {/* Safety Indicator Banner */}
            <div className={`p-4 rounded-xl border text-xs flex items-start gap-3 shadow-inner ${
              accessibleMode 
                ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                : 'bg-amber-50 border-amber-100 text-amber-800'
            }`}>
              <ShieldAlert className={`h-5 w-5 shrink-0 mt-0.5 ${accessibleMode ? 'text-emerald-600' : 'text-amber-600'}`} />
              <div>
                <span className="font-bold block uppercase font-mono tracking-wider text-[10px] mb-0.5">
                  {accessibleMode ? 'Accessibility Guard Active' : 'Crowd Notice'}
                </span>
                <p className="leading-relaxed font-medium">
                  {accessibleMode 
                    ? 'This route avoids the escalators and leverages wide outer concourses to guarantee comfort and step-free compliance.' 
                    : 'This route directs you through high-density Gate B escalators. Expect localized friction and high sensory volume.'}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Grid: Stadium Vector Arena Map (7 columns) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-[650px] lg:h-auto">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="font-sans font-bold text-base text-slate-900">Indoor Spatial Visualizer</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Isometric architectural overlay of Metropolitan Stadium level 1</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                NY/NJ Venue Grid
              </span>
            </div>

            {/* Stadium Map SVG Vector Drawing */}
            <div className="relative border border-slate-200 rounded-2xl bg-slate-50/50 h-96 flex items-center justify-center overflow-hidden shadow-inner">
              <svg className="w-full h-full max-w-md p-4 text-slate-300" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer Perimeter */}
                <rect x="20" y="20" width="460" height="460" rx="230" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-slate-200" />
                <rect x="50" y="50" width="400" height="400" rx="200" stroke="currentColor" strokeWidth="3" className="text-slate-200" />
                
                {/* Concourse Walkways */}
                <rect x="90" y="90" width="320" height="320" rx="160" stroke="currentColor" strokeWidth="30" className="text-slate-100" />
                
                {/* Main Pitch in Center */}
                <rect x="180" y="140" width="140" height="220" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
                {/* Pitch Details */}
                <circle cx="250" cy="250" r="35" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="180" y1="250" x2="320" y2="250" stroke="#cbd5e1" strokeWidth="2" />

                {/* Stadium Gates */}
                <g className="text-slate-400 font-mono text-[10px] font-bold">
                  {/* Gate A North */}
                  <line x1="250" y1="20" x2="250" y2="50" stroke="currentColor" strokeWidth="4" />
                  <text x="235" y="15" fill="#475569">GATE A</text>

                  {/* Gate B East */}
                  <line x1="450" y1="250" x2="480" y2="250" stroke="currentColor" strokeWidth="4" />
                  <text x="430" y="275" fill="#475569" transform="rotate(-90 430 275)">GATE B</text>

                  {/* Gate C South */}
                  <line x1="250" y1="450" x2="250" y2="480" stroke="currentColor" strokeWidth="4" />
                  <text x="235" y="495" fill="#475569">GATE C</text>

                  {/* Gate D West */}
                  <line x1="20" y1="250" x2="50" y2="250" stroke="currentColor" strokeWidth="4" />
                  <text x="25" y="235" fill="#475569" transform="rotate(90 25 235)">GATE D</text>
                </g>

                {/* Navigation Paths - Render active path */}
                {selectedRouteId === 'route-1' && (
                  <g>
                    {/* Gate C & B Coordinates */}
                    {accessibleMode ? (
                      /* Accessible route: Gate D -> Lift Alpha -> Section 113 */
                      <g>
                        <path d="M 35,250 Q 110,130 250,110 T 400,200" fill="none" stroke="#4f46e5" strokeWidth="5" strokeLinecap="round" strokeDasharray="1 8" className="animate-pulse" />
                        <circle cx="35" cy="250" r="8" fill="#4f46e5" />
                        <circle cx="400" cy="200" r="8" fill="#4f46e5" />
                        <text x="50" y="270" fill="#4f46e5" className="text-[10px] font-mono font-bold">ACCESSIBLE RAMP</text>
                        <text x="350" y="180" fill="#4f46e5" className="text-[10px] font-mono font-bold">LIFT ALPHA</text>
                      </g>
                    ) : (
                      /* Standard route: Gate B -> Escalator -> Section 113 */
                      <g>
                        <path d="M 465,250 C 440,250 410,230 400,200" fill="none" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
                        <circle cx="465" cy="250" r="8" fill="#f59e0b" />
                        <circle cx="400" cy="200" r="8" fill="#f59e0b" />
                        <text x="370" y="240" fill="#f59e0b" className="text-[10px] font-mono font-bold">GATE B STAIRS</text>
                      </g>
                    )}
                  </g>
                )}

                {selectedRouteId === 'route-2' && (
                  <g>
                    {/* Route 2: North Sector to East Sector */}
                    {accessibleMode ? (
                      <g>
                        <path d="M 250,90 Q 200,90 150,120 T 110,250" fill="none" stroke="#4f46e5" strokeWidth="5" strokeDasharray="1 8" />
                        <circle cx="250" cy="90" r="8" fill="#4f46e5" />
                        <circle cx="110" cy="250" r="8" fill="#4f46e5" />
                        <text x="130" y="110" fill="#4f46e5" className="text-[10px] font-mono font-bold">ELEVATOR BETA</text>
                      </g>
                    ) : (
                      <g>
                        <path d="M 250,90 L 150,120 L 110,250" fill="none" stroke="#f59e0b" strokeWidth="5" />
                        <circle cx="250" cy="90" r="8" fill="#f59e0b" />
                        <circle cx="110" cy="250" r="8" fill="#f59e0b" />
                      </g>
                    )}
                  </g>
                )}

                {selectedRouteId === 'route-3' && (
                  <g>
                    {/* Route 3: South to Section 215 Upper Concourse */}
                    {accessibleMode ? (
                      <g>
                        <path d="M 250,410 C 180,410 130,350 130,280" fill="none" stroke="#4f46e5" strokeWidth="5" strokeDasharray="1 8" />
                        <circle cx="250" cy="410" r="8" fill="#4f46e5" />
                        <circle cx="130" cy="280" r="8" fill="#4f46e5" />
                        <text x="140" y="380" fill="#4f46e5" className="text-[10px] font-mono font-bold">QUIET LIFT 3</text>
                      </g>
                    ) : (
                      <g>
                        <path d="M 250,410 L 130,280" fill="none" stroke="#f59e0b" strokeWidth="5" />
                        <circle cx="250" cy="410" r="8" fill="#f59e0b" />
                        <circle cx="130" cy="280" r="8" fill="#f59e0b" />
                        <text x="160" y="340" fill="#f59e0b" className="text-[10px] font-mono font-bold">CENTRAL PLAZA</text>
                      </g>
                    )}
                  </g>
                )}
              </svg>

              {/* Overlay legend HUD */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 border border-slate-200 p-3 rounded-xl flex justify-between items-center text-[10px] font-mono uppercase tracking-wider shadow-sm font-bold">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-indigo-600 inline-block"></span>
                  <span className="text-slate-600">Accessible Step-Free Path</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500 inline-block"></span>
                  <span className="text-slate-600">Standard Stair Path</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-mono text-slate-400 font-bold leading-normal">
            <strong>Mobility Integration:</strong> Ramps are fully compliant with ISO accessibility guidelines (under 8% gradient thresholds). Quiet zone routings avoid concessions areas during high halftime auditory loads.
          </div>
        </div>

      </div>

    </div>
  );
}

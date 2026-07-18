export interface PlaybookSection {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  category: 'core' | 'architecture' | 'implementation' | 'strategy';
  content: string;
  bullets?: string[];
  codeBlock?: {
    language: string;
    code: string;
  };
  diagramType?: 'system' | 'flow' | 'user_journey' | 'api' | 'deployment' | 'database';
}

export const architecturePlaybook: PlaybookSection[] = [
  {
    id: 'project-idea',
    number: 1,
    title: 'Innovative Project Idea: AuraStadium 2026',
    subtitle: 'AI-Unified Real-time Assistant & Stadium Operations Hub',
    category: 'core',
    content: 'AuraStadium 2026 is an end-to-end, multi-modal Generative AI orchestration platform that synchronizes live stadium telemetry (IoT crowd density sensors, gate ticketing turnstiles, digital signage) with on-ground staff mobile terminals, local safety dispatchers, and millions of fans. By deploying a unified intelligence layer, it transforms passive stadium infrastructure into an adaptive, self-organizing ecosystem that predicts congestion, automates incident triage, and guarantees multi-lingual accessibility during the FIFA World Cup 2026.',
    bullets: [
      'Catchy Brand: AuraStadium 2026 (The Living Stadium Network)',
      'Aura Fan-Copilot: A multi-lingual, voice-activated spatial navigation and service agent.',
      'Aura Command Centre: Predictive crowd rerouting, automated queue management, and rapid emergency dispatch.',
      'Aura Staff-Sync: Real-time on-ground crew task assignment, translation bridges, and instant response routing.'
    ]
  },
  {
    id: 'problem-statement',
    number: 2,
    title: 'Problem Statement & Existing Challenges',
    subtitle: 'The Bottlenecks of Hosting Millions in Modern Tournaments',
    category: 'core',
    content: 'Hosting the FIFA World Cup 2026 across 16 Host Cities in three nations presents unprecedented spatial, linguistic, and operational hurdles. Traditional stadiums rely on passive security footage, fragmented walkie-talkie communication, static PDF signage, and isolated ticketing systems, leading to extreme bottlenecks and high friction.',
    bullets: [
      'Hyper-Congestion & Turnstile Friction: Gate blockages during peak hours causing safety risks and entry delays of up to 90 minutes.',
      'Language Barriers: Over 4 million international fans speaking 30+ languages interacting with localized volunteers.',
      'Fragmented Emergency Response: Critical safety incidents (medical, structural, fire) triaged manually via slow radio relays.',
      'Accessibility Disconnect: Static routing fails to account for dynamic blockages, leaving wheelchair-bound or sensory-sensitive fans stranded.',
      'Lost & Found Chaos: No real-time cataloging of lost possessions, causing overwhelming administrative backlog.'
    ]
  },
  {
    id: 'proposed-solution',
    number: 3,
    title: 'Proposed AI-Powered Solution',
    subtitle: 'A Proactive, Decentralized Cognitive Stadium Network',
    category: 'core',
    content: 'AuraStadium 2026 introduces a cohesive GenAI architecture operating on three coordinated planes: Predictive Edge Telemetry, Multi-agent LLM Orchestration, and Real-time Actionable Dispatch. Rather than reacting to crowd jams or safety alerts, AuraStadium utilizes Gemini API stream reasoning to forecast bottleneck formations 15 minutes before they occur and reroute fans dynamically.',
    bullets: [
      'Spatial Cognitive Intelligence: Merges static stadium floor plans with real-time crowd heatmaps to provide real-time custom route suggestions.',
      'Automated Incident Triage: Utilizes structured JSON output from Gemini to classify crowd safety reports and immediately alert appropriate sector units.',
      'Multi-Sensory Accessibility: Implements custom audio descriptions, step-free spatial mapping, and text-to-speech for sensory-diverse visitors.',
      'Predictive Queue Dispatch: Dynamic, AI-driven notifications suggesting nearby food stands or gates with shorter wait times.'
    ]
  },
  {
    id: 'core-features',
    number: 4,
    title: 'Core System Features',
    subtitle: 'Highly Specialized Modules for Tournament Integration',
    category: 'core',
    content: 'The AuraStadium suite consists of four integrated pillars designed to optimize operations, enhance safety, and upgrade fan convenience:',
    bullets: [
      'Aura Copilot Chat (Multi-lingual Fan & Crew AI): Instantly answers tickets, transit, and venue queries in 30+ languages, utilizing real-time Google Maps and internal stadium FAQ retrieval.',
      'Dynamic Crowd Flow Visualizer: Interactive command console displaying stadium sector counts, gate occupancy, wait times, and generative crowd advice.',
      'Smart Incident Dispatcher: A specialized form for security/crew where voice or text reports are interpreted by AI to instantly yield Severity levels, Dispatch teams, and draft Emergency Broadcasts.',
      'Spatial Accessibility Navigation Router: Displays distinct route guidelines for step-free access, dynamic congestion avoidance, and quiet zones.'
    ]
  },
  {
    id: 'system-architecture',
    number: 5,
    title: 'End-to-End System Architecture',
    subtitle: 'Decoupled Serverless Layer with Microsecond Live Event Sync',
    category: 'architecture',
    content: 'The architecture leverages a high-throughput modern framework combining an interactive single-page application, custom REST and WebSocket servers, reliable cloud datastores, and the native capabilities of Gemini 3.5 models.',
    diagramType: 'system'
  },
  {
    id: 'ai-workflow',
    number: 6,
    title: 'AI Multi-Agent Workflow',
    subtitle: 'Intent Routing, Schema Constraints, and Agent Handshakes',
    category: 'architecture',
    content: 'AuraStadium coordinates tasks via specialized LLM agents using Gemini 3.5 Flash for high-speed triage and Gemini 3.1 Pro for safety-critical reasoning. Incoming requests are processed through an orchestration pipeline:',
    bullets: [
      '1. Input Guardrail: Sanitizes user inputs, filtering out non-tournament queries, malicious injections, or off-topic prompts.',
      '2. Intent router: Classifies whether the query is navigational, security-related, general service, or emergency-dispatch.',
      '3. Grounding Enrichment: Appends live context (current gate loads, user location, local weather, transit updates) to the prompt.',
      '4. Constraint Schema: Instructs Gemini to respond in structured JSON format when handling incident triage, or friendly, supportive natural language when guiding fans.'
    ],
    diagramType: 'flow'
  },
  {
    id: 'prompt-strategy',
    number: 7,
    title: 'Prompt Engineering Strategy',
    subtitle: 'Few-Shot Exemplars, Structured Outputs, and System Instructions',
    category: 'implementation',
    content: 'AuraStadium enforces robust GenAI behavior by leveraging precise System Instructions and schema parameters. Below is the exact system instruction and parameter setup used by our backend to classify incidents on-ground.',
    codeBlock: {
      language: 'typescript',
      code: `const INCIDENT_TRIAGE_INSTRUCTION = \`
You are the Head Operations Architect for the FIFA World Cup 2026.
Your task is to analyze ground staff incident reports and return a structured JSON response.

CLASSIFICATION RULES:
- Category: Must be one of ["medical", "security", "facilities", "lost_found", "accessibility"]
- Severity:
  - "critical": Weapon present, cardiac arrest, structural collapse, active fire.
  - "high": Heat exhaustion, active physical fight, major plumbing leak, broken elevator.
  - "medium": Minor injury needing first aid, crowd blockage, localized power glitch.
  - "low": Unattended bag, spilled drink, trash pile, lost phone.
- Recommended Action: Concrete instruction for dispatch teams. Must include specific tools or safety protocols.
- Assigned Team: Select one of: "Medical Response Unit A", "Stadium Security Bravo", "Facilities Maintenance", "Fan Experience & Vol Crew".
- Broadcast Draft: A concise, calming, clear public announcement template in case crowd warnings are needed.

Return raw JSON strictly matching the specified JSON schema.
\`;`
    }
  },
  {
    id: 'tech-stack',
    number: 8,
    title: 'Production Tech Stack',
    subtitle: 'Modern Frameworks Selected for Sub-second Latency and Scale',
    category: 'implementation',
    content: 'The production implementation is designed for peak load compliance and fault tolerance. Our chosen stack combines modern developer velocity with robust scalability:',
    bullets: [
      'Frontend Framework: React 19 + TypeScript with Vite as the build engine. Styled with Tailwind CSS and animated using Motion.',
      'Backend Orchestrator: Node.js / Express acting as the high-concurrency API gateway and secure Gemini API controller.',
      'Database Layer: Supabase (PostgreSQL with pgvector) for lightning-fast semantic embeddings and real-time state sync.',
      'Identity & Auth: Clerk to secure on-ground staff portals with multi-factor authentication and role-based access controls.',
      'Maps Platform: Google Maps API (React Google Maps) for geolocation tracking and geospatial boundary plotting.',
      'Cognitive Core: Google Gemini API (utilizing gemini-3.5-flash for rapid chat/routing and gemini-3.1-pro for complex incident triage).'
    ]
  },
  {
    id: 'llm-selection',
    number: 9,
    title: 'LLM & AI Tools Configuration',
    subtitle: 'Choosing the Right Model for the Right Job to Optimize Cost & Speed',
    category: 'implementation',
    content: 'AuraStadium does not rely on a single massive model. Instead, we use a hybrid model routing strategy to balance speed, cost, and analytical depth:',
    bullets: [
      'gemini-3.5-flash (Basic & Real-time Text): Handles all fan-copilot chat queries, routing inquiries, multi-lingual translations, and general information parsing. Average latency: < 400ms.',
      'gemini-3.1-pro-preview (Complex Orchestration & Safety-critical): Invoked when critical structural safety or security incidents are logged. Processes multi-step threat intelligence, audits emergency protocol checklists, and coordinates multi-agency dispatch.',
      'Google Search Grounding: Configured as an active tool inside Gemini for real-time external stadium parking, public transit scheduling, and match score lookups.'
    ]
  },
  {
    id: 'data-flow',
    number: 10,
    title: 'System Data Flow Diagram',
    subtitle: 'From Crowd Edge Sensors to the Command Center',
    category: 'architecture',
    content: 'AuraStadium features an event-driven data flow that processes incoming telemetry, updates global database states, runs cognitive routing, and broadcasts warnings in real time.',
    diagramType: 'database'
  },
  {
    id: 'user-journey',
    number: 11,
    title: 'End-User Journeys (Fan vs. Command Staff)',
    subtitle: 'Frictionless Experience Across All Touchpoints',
    category: 'strategy',
    content: 'AuraStadium ensures intuitive experiences for both sides of stadium management. By mapping two distinct journeys, we bridge the gap between crowd distress and operations response:',
    bullets: [
      'Fan Journey: Enters stadium boundary -> Receives personalized greeting & step-free navigation to Section 105 -> Aura Copilot recommends concession lines with shortest queues -> Reports an overflowing water fountain -> Incident automatically dispatched without manual filing.',
      'Command Staff Journey: Receives dynamic notification of gate bottleneck at Gate B -> Live visualizer suggests gate bypass routes on digital screens -> Safety incident logged -> Staff-Sync dynamically assigns nearest medical and maintenance units with calculated ETA.'
    ],
    diagramType: 'user_journey'
  },
  {
    id: 'api-architecture',
    number: 12,
    title: 'API & Microservice Architecture',
    subtitle: 'RESTful Gateways with Strict Input/Output Schemas',
    category: 'architecture',
    content: 'Our API is fully documented and structured to protect secrets, enforce authorization, and provide fast endpoints. Below are the key endpoints deployed for the AuraStadium stack:',
    bullets: [
      'POST /api/gemini/chat: Accepts historical fan messages, feeds them to Gemini, and streams real-time navigation and support back to the client.',
      'POST /api/gemini/incident-assess: Parses unstructured text from ground crew, runs structural classification with Gemini, and returns categorized triage JSON.',
      'GET /api/stadium/live-state: Retrieves current gate density metrics, sector capacities, and queue loading factors.',
      'POST /api/stadium/incident: Submits a new incident to Supabase, triggering real-time WebSocket notifications to the Command Board.'
    ],
    diagramType: 'api'
  },
  {
    id: 'deployment-architecture',
    number: 13,
    title: 'Deployment & CI/CD Pipeline',
    subtitle: 'Zero-Downtime, Globally Distributed Edge Hosting',
    category: 'implementation',
    content: 'To handle sudden spikes in World Cup traffic (up to 100,000 concurrent users per stadium), our application is deployed to a globally distributed multi-region infrastructure:',
    bullets: [
      'Frontend (Vercel Edge Network): Client-side React is served from 100+ global edge locations, providing a sub-50ms Time-To-First-Byte (TTFB).',
      'Backend Gateway (Render / Google Cloud Run): Containerized Express server is deployed in auto-scaling clusters that scale from 1 to 50 instances based on CPU utilization.',
      'Database Cluster (Supabase Multi-Region PostgreSQL): Distributed across North American host regions with read-replicas situated closest to the physical stadium coordinates.'
    ],
    diagramType: 'deployment'
  },
  {
    id: 'security-privacy',
    number: 14,
    title: 'Security, Privacy & GDPR/CCPA Compliance',
    subtitle: 'Safeguarding Fan Biometrics and Telemetry Data',
    category: 'strategy',
    content: 'Hosting an international event requires strict adherence to security and privacy standards (GDPR, CCPA, and regional cyber laws):',
    bullets: [
      'Strict API Secret Hiding: All API keys (Gemini, Maps, Supabase credentials) are loaded server-side only. No keys are ever compiled into frontend JS bundles.',
      'Anonymized Crowd Telemetry: CCTV and crowd counting sensors utilize edge-AI to output numerical density counts only. No facial recognition data or personally identifiable images are ever transmitted to the cloud.',
      'Data At Rest/Transit Encryption: All data streams utilize HTTPS/WSS protocols. Database storage is encrypted with AES-256 standard, and logs are automatically anonymized after 24 hours.'
    ]
  },
  {
    id: 'scalability',
    number: 15,
    title: 'Scalability For Millions of Users',
    subtitle: 'Coping with Concurrent Spectators and Network Congestion',
    category: 'strategy',
    content: 'Stadium environments represent the absolute worst-case scenario for network infrastructure. AuraStadium overcomes local cellular congestion using advanced caching and compression techniques:',
    bullets: [
      'Local-First Offline Fallbacks: The fan app uses local service workers to cache offline vector floor plans, ensuring navigational instructions remain available even during total cellular blackouts.',
      'Aggressive Static FAQ Caching: 85% of general stadium queries (parking info, bag policies, match schedules) are cached at the Cloudflare/Vercel CDN edge, completely avoiding database queries.',
      'WebSocket Message Batching: On-ground team updates are coalesced and sent in compressed binary frames rather than continuous JSON strings, reducing local network bandwidth by 70%.'
    ]
  },
  {
    id: 'future-enhancements',
    number: 16,
    title: 'Future Enhancements Post-MVP',
    subtitle: 'Integrating Next-generation Spatial Computing and Vision models',
    category: 'strategy',
    content: 'The 2026 World Cup is just the beginning. Our architecture is designed to expand seamlessly into future technological paradigms:',
    bullets: [
      'Apple Vision Pro & AR Spatial Guides: Overlay virtual green arrows on the physical stadium concourses to guide fans directly to their seats using WebXR.',
      'Automatic CCTV Anomaly Detection: Integrate Gemini 3.5 Live video streams to automatically identify structural hazards, physical altercations, or medical distress without human reporting.',
      'AI-Optimized Dynamic Energy Management: Coordinate stadium lighting, air conditioning, and vendor power draws based on real-time crowd movement predictions.'
    ]
  },
  {
    id: 'presentation-points',
    number: 17,
    title: 'Hackathon Presentation & Winning Points',
    subtitle: 'How to Pitch AuraStadium 2026 to World-Class Judges',
    category: 'strategy',
    content: 'To win a global hackathon, a project must demonstrate technical complexity, business viability, and a memorable user-facing impact. Focus on these core messages during the pitch:',
    bullets: [
      'The "15-Minute Foresight" Pitch: Focus on the shift from reactive stadium security to proactive, generative, crowd-flow orchestration.',
      'Pristine UI/UX Execution: Showcase the high-contrast obsidian-and-green "Swiss layout" that mimics real sports broadcast packages.',
      'Real Full-Stack Integration: Highlight that Gemini is completely decoupled, secure, and utilizes structured schema enforcement rather than simple text outputs.',
      'Social Accessibility Focus: Highlight the dual wheelchair-accessible spatial routing, proving tech is being built to include everyone.'
    ]
  },
  {
    id: 'implementation-plan',
    number: 18,
    title: '24-Hour MVP Implementation Plan',
    subtitle: 'Rapid Prototype Pipeline from Scratch to Pitch',
    category: 'implementation',
    content: 'To build a working prototype of AuraStadium within a 24-hour hackathon timeframe, execute this disciplined hour-by-hour operational breakdown:',
    bullets: [
      'Hours 0 - 4 (Foundation): Bootstrap Vite + Tailwind structure. Create TypeScript schema types and mock crowd data generators.',
      'Hours 4 - 8 (Backend Gateway): Create the Express API routes, import the Google GenAI SDK, and connect the Gemini model with system instructions.',
      'Hours 8 - 14 (Feature Development): Implement the AI Copilot chat interface, visual queue heatmap, and the Incident log form.',
      'Hours 14 - 18 (Integration & Polish): Connect the ground operations dispatcher form to the Gemini API, enabling real-time classification and automatic broadcast drafting.',
      'Hours 18 - 22 (Deployment & Validation): Deploy frontend to Vercel, server to Render, and run full test suites to eliminate HMR or syntax compile errors.',
      'Hours 22 - 24 (The Pitch): Record a walk-through video, polish the architectural slides, and prepare the live interactive dashboard demo.'
    ]
  },
  {
    id: 'folder-structure',
    number: 19,
    title: 'Production Directory Structure',
    subtitle: 'Highly Modular, Separation of Concerns File Tree',
    category: 'implementation',
    content: 'Our repository follows professional developer conventions, splitting core data, UI components, backend controllers, and global schemas:',
    bullets: [
      '/server.ts - Express backend gateway, configures API routes and mounts Vite middleware.',
      '/src/main.tsx - React application entry point.',
      '/src/App.tsx - Core component hosting tabs, state controls, and theme configurations.',
      '/src/types.ts - Shared interface structures representing chats, incidents, and telemetry.',
      '/src/data/ - Static datasets, mock telemetry states, and the hackathon playbook database.',
      '/src/components/ - Decoupled components (LiveOpsDashboard, AiCopilot, IncidentDispatcher, SmartNavigation, ArchitecturePlaybook).'
    ]
  },
  {
    id: 'development-roadmap',
    number: 20,
    title: 'Complete Development Roadmap',
    subtitle: 'From Hackathon MVP to FIFA Stadium Readiness',
    category: 'strategy',
    content: 'A robust development cycle from initial ideation to tournament deploy, split into 4 distinct commercial milestones:',
    bullets: [
      'Milestone 1 (Hackathon MVP): 4 interactive features, basic Gemini chat integration, simulated live crowds, and structural incident dispatch.',
      'Milestone 2 (Stadium Integration): Connect physical RFID gate turnstiles, telemetry camera streams, and deploy local Bluetooth beacons for indoor precision.',
      'Milestone 3 (Public Beta & Test Matches): Launch in 2 warm-up matches. Audit multi-lingual translation fidelity and stress-test the Express API gateway.',
      'Milestone 4 (Tournament Operations Live): FIFA World Cup 2026 deployment across 16 tournament venues with 24/7 dedicated site reliability teams.'
    ]
  }
];

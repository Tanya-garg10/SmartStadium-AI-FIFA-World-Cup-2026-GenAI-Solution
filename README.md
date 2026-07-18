<div align="center">
  <h1>⚽ AuraStadium 2026</h1>
  <p><em>AI-Unified Real-time Assistant & Stadium Operations Hub for FIFA World Cup 2026</em></p>
</div>

## Overview

AuraStadium 2026 is a comprehensive smart stadium command operating system designed for real-time stadium operations management during the FIFA World Cup 2026. It integrates AI-powered analytics, incident management, and live telemetry to provide stadium operators with a unified command center.

## Features

- **Live Operations Dashboard**: Real-time monitoring of gate flow rates, sector occupancy, crowd density, and noise levels
- **AI Copilot**: Intelligent assistant powered by Google Gemini for operational guidance and decision support
- **Incident Dispatcher**: Centralized incident management with automated triage, team dispatch, and broadcast drafting
- **Smart Navigation**: Crowd-aware route planning with wheelchair accessibility options
- **Architecture Playbook**: Comprehensive reference documentation for stadium systems and protocols

## Tech Stack

- **Frontend**: React 19, TypeScript, TailwindCSS v4
- **Backend**: Express.js with TypeScript
- **AI Integration**: Google Gemini API (@google/genai)
- **Build Tools**: Vite, esbuild, tsx
- **UI Components**: Lucide React (icons), Motion (animations)
- **Styling**: TailwindCSS with Vite plugin

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API Key

## Installation

1. Clone the repository and navigate to the project directory

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your Google Gemini API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

## Running the Application

### Development Mode
```bash
npm run dev
```
The application will start on `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

### Other Commands
- `npm run lint` - Run TypeScript type checking
- `npm run clean` - Remove build artifacts

## Deployment

### Option 1: Vercel (Recommended for Frontend + Serverless)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Set environment variables in Vercel dashboard:
   - `GEMINI_API_KEY`

### Option 2: Railway (Full Stack)

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login to Railway:
   ```bash
   railway login
   ```

3. Initialize and deploy:
   ```bash
   railway init
   railway up
   ```

4. Add environment variables in Railway dashboard

### Option 3: Render (Full Stack)

1. Push your code to GitHub

2. Create a new Web Service on Render

3. Connect your GitHub repository

4. Configure build settings:
   - Build Command: `npm run build`
   - Start Command: `npm start`

5. Add environment variables:
   - `GEMINI_API_KEY`

### Option 4: Docker Deployment

1. Create a `Dockerfile` in the project root:
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. Build and run:
   ```bash
   docker build -t aurastadium .
   docker run -p 3000:3000 -e GEMINI_API_KEY=your_key aurastadium
   ```

### Option 5: Traditional VPS (AWS EC2, DigitalOcean, etc.)

1. SSH into your server

2. Install Node.js and npm

3. Clone the repository:
   ```bash
   git clone https://github.com/Tanya-garg10/SmartStadium-AI-FIFA-World-Cup-2026-GenAI-Solution.git
   cd SmartStadium-AI-FIFA-World-Cup-2026-GenAI-Solution
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Set up environment:
   ```bash
   cp .env.example .env
   # Edit .env with your API key
   ```

6. Build and start:
   ```bash
   npm run build
   npm start
   ```

7. Use PM2 for process management (recommended):
   ```bash
   npm install -g pm2
   pm2 start dist/server.cjs --name aurastadium
   pm2 save
   pm2 startup
   ```

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `GEMINI_API_KEY` - Your Google Gemini API key (required)
- `PORT` - Port number (default: 3000, optional)

## Project Structure

```
aura stadium/
├── src/
│   ├── components/
│   │   ├── AiCopilot.tsx          # AI chat interface
│   │   ├── ArchitecturePlaybook.tsx # Reference documentation
│   │   ├── IncidentDispatcher.tsx  # Incident management system
│   │   ├── LiveOpsDashboard.tsx    # Real-time operations dashboard
│   │   ├── Sidebar.tsx             # Navigation sidebar
│   │   └── SmartNavigation.tsx     # Route planning system
│   ├── data/
│   │   └── architecturePlaybook.ts # Static playbook data
│   ├── App.tsx                     # Main application component
│   ├── main.tsx                    # Application entry point
│   ├── types.ts                    # TypeScript type definitions
│   └── index.css                   # Global styles
├── server.ts                       # Express server with API endpoints
├── index.html                      # HTML template
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite build configuration
└── metadata.json                   # Project metadata
```

## Key Components

### Live Operations Dashboard
- Real-time gate flow monitoring (people per minute)
- Sector occupancy tracking with density analysis
- Noise level monitoring (decibels)
- Overall stadium occupancy percentage
- Refreshable telemetry data

### AI Copilot
- Chat interface with Google Gemini
- Context-aware operational guidance
- Multi-language support
- Chat history management

### Incident Dispatcher
- Incident categorization (medical, security, facilities, lost & found, accessibility)
- Severity-based triage
- Team assignment and tracking
- Automated broadcast drafting
- Status workflow (reported → triaging → dispatched → resolved)

### Smart Navigation
- Route planning between stadium locations
- Crowd density awareness
- Wheelchair accessibility filters
- Step-by-step directions

## API Endpoints

- `GET /api/stadium/live-state` - Fetch current stadium operations data
- `POST /api/ai/chat` - Send messages to AI copilot
- `POST /api/incidents` - Create or update incidents

## Environment Variables

- `GEMINI_API_KEY` - Required for AI functionality

## License

This project is part of the AuraStadium 2026 initiative for FIFA World Cup stadium operations.

© 2026 AuraStadium. All rights reserved.

### License Information

This project is proprietary software developed for stadium operations management. Unauthorized reproduction, distribution, or modification is strictly prohibited.

For licensing inquiries, please contact the AuraStadium operations team.

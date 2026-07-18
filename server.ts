import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini Client helper
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY is not configured. Please add it to your secrets or environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. Live State API Endpoint (Simulated Telemetry Gateway)
app.get("/api/stadium/live-state", (req, res) => {
  res.json({
    stadium: "Metropolitan Stadium, NY/NJ",
    timestamp: new Date().toISOString(),
    overallOccupancy: 86, // percentage
    gates: [
      { id: "gate-a", name: "Gate A (Main North)", flowRate: 240, occupancy: 35, status: "optimal", avgWaitTime: 5 },
      { id: "gate-b", name: "Gate B (East Rotunda)", flowRate: 480, occupancy: 85, status: "congested", avgWaitTime: 35 },
      { id: "gate-c", name: "Gate C (South Transit Hub)", flowRate: 310, occupancy: 55, status: "moderate", avgWaitTime: 12 },
      { id: "gate-d", name: "Gate D (West VIP)", flowRate: 90, occupancy: 15, status: "optimal", avgWaitTime: 2 },
    ],
    sectors: [
      { id: "sector-100", name: "Section 100-112 (Lower North)", capacity: 15000, currentCount: 12400, density: "high", noiseLevel: 94 },
      { id: "sector-113", name: "Section 113-125 (Lower East)", capacity: 18000, currentCount: 16900, density: "critical", noiseLevel: 102 },
      { id: "sector-126", name: "Section 126-138 (Lower South)", capacity: 15000, currentCount: 11200, density: "medium", noiseLevel: 88 },
      { id: "sector-139", name: "Section 139-150 (Lower West)", capacity: 17000, currentCount: 9500, density: "low", noiseLevel: 81 },
    ],
  });
});

// 2. Chat Endpoint (Multi-lingual Fan Copilot)
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { history } = req.body;
    if (!history || !Array.isArray(history)) {
      res.status(400).json({ error: "Invalid request. 'history' array is required." });
      return;
    }

    const ai = getGeminiClient();

    const systemInstruction = `
You are "Aura", the official AI Stadium Copilot & Operations Assistant for the FIFA World Cup 2026.
You are helping fans, volunteers, and ground crew at the Metropolitan Stadium, NY/NJ.

KEY VENUE CONTEXT FOR 2026 TOURNAMENT:
- Venue: Metropolitan Stadium, NY/NJ (Capacity: 82,500).
- Gate Load Status:
  * Gate A (Main North): Optimal, practically empty, average wait time 5 minutes. Excellent entrance!
  * Gate B (East Rotunda): Highly congested, crowd build-up. Average wait time 35 minutes. Strongly advise fans to reroute to Gate A or Gate C.
  * Gate C (South Transit Hub): Moderate congestion, wait time 12 minutes. Near public bus/subway arrivals.
  * Gate D (West VIP & Accessibility): Low congestion, strictly reserved for premium tickets and differently-abled visitors.
- Key Locations & Facilities:
  * Family play zones: Located in Section 112.
  * Sensory-quiet rooms: Section 215 (fully soundproofed for neurodiverse fans).
  * Wheelchair-accessible lifts/ramps: Available near Gate B, Gate C, and Gate D. Lifts inside the concourse are located behind Sections 104, 122, and 140.
  * Lost & Found Center: Located at Section 130 (near Gate C).
  * Emergency Medical Stations: Staffed 24/7, behind Sections 101, 142, and 224.
- Security Policies: No bags larger than A4 size. Transparent plastic bottles only. Food and banners must be pre-approved.

GUIDELINES FOR YOUR BEHAVIOR:
1. Speak in the language of the user (e.g. if they ask in Spanish, respond in fluent Spanish. Same for French, German, Arabic, etc.).
2. Be highly welcoming, friendly, clear, and reassuring. Always frame things constructively.
3. Suggest concrete actions (e.g., if they ask about queues at Gate B, say: "Gate B is currently crowded (35m wait). I highly recommend walking 4 minutes to Gate A, where wait time is just 5 minutes! Let me know if you need step-free directions.").
4. If asked about emergencies or lost kids, direct them to Section 142/101 medical stations or Section 130 immediately, and offer to contact on-ground stewards.
5. Do NOT make up score results or facts about the future. Highlight that you can guide them through the stadium layout, operations, ticketing sectors, and amenities.
`;

    const formattedContents = history.map((msg: any) => {
      // Map frontend roles to Gemini-compliant roles: "user" and "model"
      const role = msg.sender === "user" ? "user" : "model";
      return {
        role,
        parts: [{ text: msg.text }],
      };
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I apologize, but I received an empty response. Please try again.";
    res.json({ text: reply });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ error: error.message || "An internal error occurred while processing your query with Gemini." });
  }
});

// 3. Incident Assessment Endpoint (Ground Operations Dispatcher)
app.post("/api/gemini/incident-assess", async (req, res) => {
  try {
    const { title, description, location, category } = req.body;
    if (!title || !description || !location) {
      res.status(400).json({ error: "Missing required fields: 'title', 'description', and 'location' are required." });
      return;
    }

    const ai = getGeminiClient();

    const promptText = `
Analyze this tournament ground incident report and output a structured operational triage report.
- Category provided: ${category || "General"}
- Incident Title: ${title}
- Incident Description: ${description}
- Reported Location: ${location}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction: `
You are the Chief Operations Architect & Safety Dispatcher for the FIFA World Cup 2026.
Your job is to read unstructured reports from stewards, security, and cleaning staff, categorize them, evaluate severity, draft immediate dispatch tasks, and create a calm emergency PA announcement draft if necessary.

RULES FOR CLASSIFICATION:
- category: Select one of: "medical", "security", "facilities", "lost_found", "accessibility"
- severity: Select one of: "low", "medium", "high", "critical"
  * "critical": Weapon threat, physical violence, medical collapse/cardiac events, structural collapse, fire.
  * "high": Heatstroke, major plumbing burst, elevator outage trapping fans, crowd panic, gate queue breach.
  * "medium": Slip hazards, minor cuts, fan argument, crowd density bottlenecks, minor power outage.
  * "low": Lost wallet/phone, spilled liquid with no slip risk, minor trash buildup, general inquiry.
- recommendedAction: Specific, actionable, step-by-step instructions for on-ground response teams.
- assignedTeam: Select one of: "Stadium Security Bravo Unit", "Medical Response Team A", "Rapid Facility Engineers", "Fan Experience & Steward Crew".
- broadcastDraft: A short, 1-2 sentence comforting public announcement script (PA system / app push notification) keeping fans calm while directing them safely. Keep it professional and professional-sounding.
`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            severity: { type: Type.STRING },
            recommendedAction: { type: Type.STRING },
            assignedTeam: { type: Type.STRING },
            broadcastDraft: { type: Type.STRING }
          },
          required: ["category", "severity", "recommendedAction", "assignedTeam", "broadcastDraft"]
        },
        temperature: 0.2,
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Received empty response from triage model.");
    }

    const parsedJson = JSON.parse(resultText);
    res.json(parsedJson);
  } catch (error: any) {
    console.error("Gemini Incident Assess Error:", error);
    res.status(500).json({ error: error.message || "An internal error occurred while triaging the incident." });
  }
});

// Setup development server or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

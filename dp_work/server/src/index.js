import express from "express";
import cors from "cors";
import schemesRouter from "./routes/schemesRoute.js";
import partnersRouter from "./routes/partnersRoute.js";
import chatbotRouter from "./routes/chatbotRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

// API Routes
app.use("/api/schemes", schemesRouter);
app.use("/api/partners", partnersRouter);
app.use("/api/chat", chatbotRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    project: "Saarthi - AI-Driven Scheme Matching for Marginalized Entrepreneurs",
    problemStatement: "26092",
    team: "DigITal Pioneer",
    timestamp: new Date().toISOString()
  });
});

// Root welcome message
app.get("/", (req, res) => {
  res.send("Saarthi Backend API is running. Explore /api/health, /api/schemes, /api/partners, /api/chat.");
});

// Start server
app.listen(PORT, () => {
  console.log(`[Saarthi API] Server listening on port ${PORT}`);
  console.log(`[Saarthi API] Health check: http://localhost:${PORT}/api/health`);
});

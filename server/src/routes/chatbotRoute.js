import express from "express";
import { generateServerAssistantResponse, getSuggestedQuestionsForScheme } from "../services/assistantEngine.js";
import { quickPromptChips } from "../data/faqs.js";

const router = express.Router();

// GET quick prompt chips
router.get("/prompts", (req, res) => {
  const lang = req.query.lang || "en";
  const schemeId = req.query.schemeId || "pm-svanidhi";
  res.json({
    success: true,
    prompts: getSuggestedQuestionsForScheme(schemeId, lang) || quickPromptChips
  });
});

// POST message to Saarthi Mitra chatbot
router.post("/message", (req, res) => {
  const {
    message = "",
    language = "en",
    schemeId = "pm-svanidhi",
    userProfile = null
  } = req.body;

  const result = generateServerAssistantResponse({
    message,
    language,
    activeSchemeId: schemeId,
    userProfile
  });

  return res.json({
    success: true,
    reply: result.reply,
    intent: result.intent,
    schemeId: result.schemeId,
    suggestions: result.suggestions
  });
});

export default router;

import express from "express";
import { faqs, quickPromptChips } from "../data/faqs.js";

const router = express.Router();

// GET quick prompt chips
router.get("/prompts", (req, res) => {
  res.json({
    success: true,
    prompts: quickPromptChips
  });
});

// POST message to Saarthi Mitra chatbot
router.post("/message", (req, res) => {
  const { message = "" } = req.body;
  const userText = message.toLowerCase().trim();

  if (!userText) {
    return res.json({
      success: true,
      reply: "Namaste! I am Saarthi Mitra, your AI scheme guidance companion. Ask me anything about government schemes, eligibility, required documents, or finding local CSC partners.",
      suggestions: quickPromptChips
    });
  }

  // Find best match in FAQs based on keyword hits
  let bestFaq = null;
  let maxHits = 0;

  for (const item of faqs) {
    let hits = 0;
    for (const kw of item.keywords) {
      if (userText.includes(kw)) {
        hits += 1;
      }
    }
    if (hits > maxHits) {
      maxHits = hits;
      bestFaq = item;
    }
  }

  if (bestFaq && maxHits > 0) {
    return res.json({
      success: true,
      reply: bestFaq.answer,
      matchedQuestion: bestFaq.question,
      suggestions: quickPromptChips.filter((p) => p !== bestFaq.question)
    });
  }

  // Fallback intelligent guidance
  return res.json({
    success: true,
    reply: "Thank you for asking. Based on Government of India guidelines under SIH 2026, schemes like PM SVANidhi (street vendors), Stand-Up India (SC/ST & Women), PMEGP (up to 35% capital subsidy), and PM Vishwakarma (artisans) provide collateral-free credit and direct subsidies. You can click 'Find My Scheme' to run a customized eligibility check, or visit our 'Partners' tab to connect with a nearby CSC.",
    suggestions: quickPromptChips
  });
});

export default router;

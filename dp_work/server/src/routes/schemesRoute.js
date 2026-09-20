import express from "express";
import { schemes, schemeCategories } from "../data/schemes.js";
import { matchSchemes } from "../services/matchingEngine.js";

const router = express.Router();

// GET all schemes with optional category or demographic filtering
router.get("/", (req, res) => {
  const { category, demographic, search } = req.query;
  let filtered = [...schemes];

  if (category && category !== "All Categories") {
    filtered = filtered.filter((s) => s.category === category);
  }

  if (demographic && demographic !== "All") {
    filtered = filtered.filter((s) =>
      s.targetDemographic.some((d) => d.toLowerCase() === demographic.toLowerCase())
    );
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.shortName.toLowerCase().includes(q) ||
        s.overview.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    total: filtered.length,
    schemes: filtered
  });
});

// GET list of categories
router.get("/categories", (req, res) => {
  res.json({
    success: true,
    categories: schemeCategories
  });
});

// POST match schemes based on entrepreneur profile
router.post("/match", (req, res) => {
  const profile = req.body || {};
  const matched = matchSchemes(profile);

  res.json({
    success: true,
    profileReceived: profile,
    totalMatched: matched.length,
    topMatch: matched[0] || null,
    schemes: matched
  });
});

// GET single scheme details
router.get("/:id", (req, res) => {
  const scheme = schemes.find((s) => s.id === req.params.id);
  if (!scheme) {
    return res.status(404).json({ success: false, message: "Scheme not found" });
  }
  res.json({ success: true, scheme });
});

export default router;

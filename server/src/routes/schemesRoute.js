import express from "express";
import { schemes, schemeCategories } from "../data/schemes.js";
import { matchSchemes } from "../services/matchingEngine.js";

const router = express.Router();

// GET all schemes with category, purpose, fundingRange, demographic, or text search
router.get("/", (req, res) => {
  const { category, purpose, fundingRange, demographic, search } = req.query;
  let filtered = [...schemes];

  // Category filter
  if (category && category !== "All" && category !== "All Categories") {
    filtered = filtered.filter((s) => s.category.toLowerCase() === category.toLowerCase());
  }

  // Purpose filter
  if (purpose && purpose !== "All" && purpose !== "All Purposes") {
    const pQuery = purpose.toLowerCase();
    filtered = filtered.filter((s) =>
      (s.purpose || []).some(
        (p) => p.toLowerCase().includes(pQuery) || pQuery.includes(p.toLowerCase())
      )
    );
  }

  // Funding Range filter
  if (fundingRange && fundingRange !== "All" && fundingRange !== "All Ranges") {
    filtered = filtered.filter((s) => {
      const min = s.minLoanAmount ?? s.minLoan ?? 0;
      const max = s.maxLoanAmount ?? s.maxLoan ?? 0;
      if (fundingRange === "under_1lakh") {
        return max <= 100000 || min < 100000;
      }
      if (fundingRange === "1lakh_to_5lakh") {
        return (max >= 100000 && min <= 500000) || (max <= 500000 && max >= 100000);
      }
      if (fundingRange === "5lakh_to_25lakh") {
        return (max >= 500000 && min <= 2500000) || (max <= 2500000 && max >= 500000);
      }
      if (fundingRange === "above_25lakh") {
        return max >= 2500000;
      }
      return true;
    });
  }

  // Target Demographic filter (for legacy compatibility)
  if (demographic && demographic !== "All") {
    filtered = filtered.filter((s) =>
      (s.targetDemographic || []).some((d) => d.toLowerCase() === demographic.toLowerCase())
    );
  }

  // Free text search
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.shortName && s.shortName.toLowerCase().includes(q)) ||
        (s.shortDescription && s.shortDescription.toLowerCase().includes(q)) ||
        (s.overview && s.overview.toLowerCase().includes(q)) ||
        (s.category && s.category.toLowerCase().includes(q)) ||
        (s.eligibleCategory && s.eligibleCategory.toLowerCase().includes(q)) ||
        (s.keyBenefit && s.keyBenefit.toLowerCase().includes(q)) ||
        (s.targetBeneficiaries || []).some((b) => b.toLowerCase().includes(q)) ||
        (s.sector || []).some((sec) => sec.toLowerCase().includes(q))
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

// GET single scheme details by ID
router.get("/:id", (req, res) => {
  const scheme = schemes.find((s) => s.id === req.params.id);
  if (!scheme) {
    return res.status(404).json({ success: false, message: "Scheme not found" });
  }
  res.json({ success: true, scheme });
});

export default router;

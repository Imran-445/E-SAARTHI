import express from "express";
import { partners, partnerStates, partnerCategories } from "../data/partners.js";

const router = express.Router();

// GET list of channel partners with filtering
router.get("/", (req, res) => {
  const { state, category, search } = req.query;
  let filtered = [...partners];

  if (state && state !== "All States") {
    filtered = filtered.filter((p) => p.state.toLowerCase() === state.toLowerCase());
  }

  if (category && category !== "All Types") {
    filtered = filtered.filter((p) => p.type.toLowerCase().includes(category.toLowerCase()));
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.contactPerson.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    total: filtered.length,
    partners: filtered
  });
});

// GET filters metadata
router.get("/meta", (req, res) => {
  res.json({
    success: true,
    states: partnerStates,
    categories: partnerCategories
  });
});

// GET partner by ID
router.get("/:id", (req, res) => {
  const partner = partners.find((p) => p.id === req.params.id);
  if (!partner) {
    return res.status(404).json({ success: false, message: "Partner not found" });
  }
  res.json({ success: true, partner });
});

export default router;

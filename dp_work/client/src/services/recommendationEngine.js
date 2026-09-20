/**
 * Saarthi (SIH 2026) - Recommendation Engine
 * 
 * Deterministic, transparent, weighted scoring engine for matching marginalized
 * entrepreneurs against Central & State schemes.
 * 
 * Weights (Total 100 Points):
 * - Social category match: 20 points
 * - Income eligibility: 15 points
 * - Business type match: 15 points
 * - Business stage match: 10 points
 * - Business sector match: 10 points
 * - Loan amount compatibility: 15 points
 * - Loan purpose match: 10 points
 * - Funding type match: 5 points
 */

import { DEMO_SCHEMES } from "../data/schemes.js";

export function recommendSchemes(userProfile = {}, schemeCatalog = DEMO_SCHEMES) {
  if (!Array.isArray(schemeCatalog) || schemeCatalog.length === 0) {
    return [];
  }

  // Extract and normalize profile fields from form / localStorage
  const socialCategory = (userProfile.socialCategory || userProfile.category || "").trim();
  const gender = (userProfile.gender || "").trim();
  const area = (userProfile.area || "Rural").trim();
  const state = (userProfile.state || "").trim();
  const district = (userProfile.district || "").trim();

  const businessType = (userProfile.businessType || "").trim();
  const stage = (userProfile.stage || "").trim();
  const sector = (userProfile.businessSector || "").trim();

  const userIncome = Number(userProfile.annualFamilyIncome) || 0;
  const userTurnover = Number(userProfile.annualTurnover) || 0;

  const loanAmount = Number(userProfile.loanAmount) || 0;
  const loanPurpose = (userProfile.loanPurpose || userProfile.purpose || "").trim();
  const preferredFundingType = (userProfile.preferredFundingType || "").trim();
  const educationStatus = (userProfile.educationStatus || "").trim();

  const results = schemeCatalog.map((scheme) => {
    let score = 0;
    const matchedCriteria = [];
    const unmatchedCriteria = [];
    const warnings = [];
    const reasons = [];
    let isHardDisqualified = false;

    // -------------------------------------------------------------
    // 1. Social Category Match (20 Points)
    // -------------------------------------------------------------
    let catScore = 0;
    const schemeCats = (scheme.eligibleSocialCategories || []).map((c) => c.toLowerCase());
    const userCatLower = socialCategory.toLowerCase();

    // Check if scheme is exclusively for women
    const isExclusivelyWomen =
      schemeCats.length > 0 &&
      schemeCats.every((c) => c === "women") &&
      gender !== "Female" &&
      userCatLower !== "women";

    if (isExclusivelyWomen) {
      catScore = 0;
      isHardDisqualified = true;
      warnings.push("Exclusively reserved for Women applicants.");
      unmatchedCriteria.push("Scheme target demographic is strictly Women entrepreneurs");
    } else if (
      schemeCats.includes("all") ||
      schemeCats.includes(userCatLower) ||
      (userCatLower === "sc" && (schemeCats.includes("sc") || schemeCats.includes("scheduled caste"))) ||
      (userCatLower === "st" && (schemeCats.includes("st") || schemeCats.includes("scheduled tribe"))) ||
      (userCatLower === "obc" && schemeCats.includes("obc")) ||
      (userCatLower === "minority" && schemeCats.includes("minority")) ||
      (userCatLower.includes("artisan") && schemeCats.some((c) => c.includes("artisan"))) ||
      (userCatLower.includes("vendor") && schemeCats.some((c) => c.includes("vendor"))) ||
      (userCatLower.includes("shg") && schemeCats.includes("shg")) ||
      (userCatLower.includes("disability") && schemeCats.some((c) => c.includes("disability") || c.includes("differently abled"))) ||
      (gender === "Female" && schemeCats.includes("women"))
    ) {
      catScore = 20;
      matchedCriteria.push(`Your social category (${socialCategory || "General"}) directly qualifies`);
      reasons.push(`Social category (${socialCategory || "Applicant"}) is eligible`);
    } else if (schemeCats.includes("general")) {
      catScore = 15;
      matchedCriteria.push("Open to General and universal categories");
      reasons.push("Open to universal beneficiary categories");
    } else {
      catScore = 4;
      unmatchedCriteria.push(`Social category (${socialCategory}) is not directly prioritized in this scheme`);
    }

    const requiredCategories = scheme.requiredSocialCategories || [];
    if (requiredCategories.length > 0) {
      const hasAllRequired = requiredCategories.every((required) => {
        const r = required.toLowerCase();
        return r === userCatLower || (r === "women" && gender === "Female") || r === socialCategory.toLowerCase();
      });
      if (!hasAllRequired) {
        score -= catScore;
        catScore = 0;
        isHardDisqualified = true;
        unmatchedCriteria.push(`Required beneficiary combination (${requiredCategories.join(" + ")}) is not satisfied`);
        warnings.push(`This scheme requires ${requiredCategories.join(" + ")} eligibility.`);
      }
    }

    // -------------------------------------------------------------
    // 2. Income Eligibility (15 Points)
    // -------------------------------------------------------------
    let incomeScore = 0;
    const maxInc = scheme.maxIncome;

    if (maxInc === undefined || maxInc === null || maxInc === 0 || maxInc >= 10000000) {
      incomeScore = 15;
      matchedCriteria.push("No restrictive family income ceiling");
      reasons.push("Income falls within eligible range");
    } else if (userIncome <= maxInc) {
      incomeScore = 15;
      matchedCriteria.push(`Annual family income of ₹${userIncome.toLocaleString("en-IN")} is within the limit (≤ ₹${maxInc.toLocaleString("en-IN")})`);
      reasons.push(`Income (₹${userIncome.toLocaleString("en-IN")}) is within eligible ceiling (₹${maxInc.toLocaleString("en-IN")})`);
    } else {
      const overPct = (userIncome - maxInc) / maxInc;
      if (overPct <= 0.15) {
        incomeScore = 5;
        warnings.push(`Annual family income (₹${userIncome.toLocaleString("en-IN")}) slightly exceeds scheme threshold (₹${maxInc.toLocaleString("en-IN")})`);
      } else {
        incomeScore = 0;
        isHardDisqualified = true;
        warnings.push(`Annual family income of ₹${userIncome.toLocaleString("en-IN")} exceeds the scheme limit of ₹${maxInc.toLocaleString("en-IN")}`);
        unmatchedCriteria.push(`Income ceiling of ₹${maxInc.toLocaleString("en-IN")} exceeded`);
      }
    }

    // -------------------------------------------------------------
    // 3. Business Type Match (15 Points)
    // -------------------------------------------------------------
    let bizScore = 0;
    const schemeBiz = (scheme.eligibleBusinessTypes || []).map((b) => b.toLowerCase());
    const userBizLower = businessType.toLowerCase();

    const isDirectBizMatch =
      schemeBiz.includes("all") ||
      schemeBiz.some((b) => userBizLower.includes(b) || b.includes(userBizLower));

    if (isDirectBizMatch) {
      bizScore = 15;
      matchedCriteria.push(`Business activity (${businessType}) is supported`);
      reasons.push(`Business type (${businessType}) is supported`);
    } else {
      bizScore = 0;
      unmatchedCriteria.push(`Business type (${businessType}) is not supported`);
    }

    // -------------------------------------------------------------
    // 4. Business Stage Match (10 Points)
    // -------------------------------------------------------------
    let stageScore = 0;
    const schemeStages = (scheme.eligibleBusinessStages || []).map((s) => s.toLowerCase());
    const userStageLower = stage.toLowerCase();

    const isStageMatch =
      schemeStages.includes("all") ||
      schemeStages.some((s) => userStageLower.includes(s) || s.includes(userStageLower));

    if (isStageMatch) {
      stageScore = 10;
      matchedCriteria.push(`Venture stage (${stage}) matches scheme phase`);
      reasons.push(`Enterprise stage (${stage}) is eligible`);
    } else {
      stageScore = 3;
      unmatchedCriteria.push(`Scheme primarily finances different venture stages`);
    }

    // -------------------------------------------------------------
    // 5. Business Sector Match (10 Points)
    // -------------------------------------------------------------
    let sectorScore = 0;
    const schemeSectors = (scheme.eligibleSectors || []).map((s) => s.toLowerCase());
    const userSectorLower = sector.toLowerCase();

    const isSectorMatch =
      schemeSectors.includes("all") ||
      schemeSectors.some((s) => userSectorLower.includes(s) || s.includes(userSectorLower));

    if (isSectorMatch) {
      sectorScore = 10;
      matchedCriteria.push(`Sector (${sector || "All"}) is covered`);
      reasons.push(`Business sector aligns with trade coverage`);
    } else {
      sectorScore = 3;
      unmatchedCriteria.push(`Sector is not on the primary trade list`);
    }

    // -------------------------------------------------------------
    // 6. Loan Amount Compatibility (15 Points)
    // -------------------------------------------------------------
    let loanScore = 0;
    const minL = scheme.minLoanAmount || scheme.minLoan || 0;
    const maxL = scheme.maxLoanAmount || scheme.maxLoan || 100000000;

    if (loanAmount >= minL && loanAmount <= maxL) {
      loanScore = 15;
      matchedCriteria.push(`Requested ₹${loanAmount.toLocaleString("en-IN")} fits the loan envelope (₹${minL.toLocaleString("en-IN")} - ₹${maxL.toLocaleString("en-IN")})`);
      reasons.push(`Loan amount fits the scheme (₹${minL.toLocaleString("en-IN")} to ₹${maxL.toLocaleString("en-IN")})`);
    } else if (loanAmount < minL) {
      const underRatio = loanAmount / minL;
      if (underRatio >= 0.5) {
        loanScore = 6;
        warnings.push(`Requested ₹${loanAmount.toLocaleString("en-IN")} is below the scheme minimum of ₹${minL.toLocaleString("en-IN")}. You can apply for a higher amount.`);
      } else {
        loanScore = 0;
        warnings.push(`Loan requirement is significantly below scheme minimum of ₹${minL.toLocaleString("en-IN")}.`);
        unmatchedCriteria.push(`Minimum loan required is ₹${minL.toLocaleString("en-IN")}`);
      }
    } else {
      // loanAmount > maxL
      const overRatio = loanAmount / maxL;
      if (overRatio <= 1.25) {
        loanScore = 5;
        warnings.push(`Requested ₹${loanAmount.toLocaleString("en-IN")} exceeds scheme maximum limit of ₹${maxL.toLocaleString("en-IN")}.`);
      } else {
        loanScore = 0;
        warnings.push(`Requested ₹${loanAmount.toLocaleString("en-IN")} is well above scheme limit of ₹${maxL.toLocaleString("en-IN")}.`);
        unmatchedCriteria.push(`Scheme loan ceiling is ₹${maxL.toLocaleString("en-IN")}`);
      }
    }

    // -------------------------------------------------------------
    // 7. Loan Purpose Match (10 Points)
    // -------------------------------------------------------------
    let purposeScore = 0;
    const schemePurposes = (scheme.purpose || []).map((p) => p.toLowerCase());
    const userPurposeLower = loanPurpose.toLowerCase();

    // Map common equivalent purposes
    const isPurposeMatch =
      schemePurposes.includes("all") ||
      schemePurposes.some((p) => {
        if (p.includes(userPurposeLower) || userPurposeLower.includes(p)) return true;
        if (userPurposeLower.includes("start") && (p.includes("setup") || p.includes("new"))) return true;
        if (userPurposeLower.includes("setup") && (p.includes("start") || p.includes("new"))) return true;
        if (userPurposeLower.includes("working") && p.includes("working")) return true;
        if (userPurposeLower.includes("equipment") && (p.includes("equipment") || p.includes("machinery"))) return true;
        return false;
      });

    if (isPurposeMatch) {
      purposeScore = 10;
      matchedCriteria.push(`Purpose (${loanPurpose}) is supported`);
      reasons.push(`Selected loan purpose matches scheme objectives`);
    } else {
      purposeScore = 2;
      unmatchedCriteria.push(`Purpose is not primarily funded under this scheme`);
    }

    // -------------------------------------------------------------
    // 8. Funding Type Match (5 Points)
    // -------------------------------------------------------------
    let fundingScore = 0;
    const schemeFundingTypes = (scheme.fundingTypes || []).map((f) => f.toLowerCase());
    const userFundingLower = preferredFundingType.toLowerCase();

    const isFundingMatch =
      userFundingLower.includes("any") ||
      userFundingLower.includes("best") ||
      schemeFundingTypes.some((f) => f.includes(userFundingLower) || userFundingLower.includes(f));

    if (isFundingMatch) {
      fundingScore = 5;
      matchedCriteria.push(`Funding type preference matches`);
    } else {
      fundingScore = 2;
    }

    // -------------------------------------------------------------
    // Location & Education Verification Checks
    // -------------------------------------------------------------
    const schemeLocs = (scheme.eligibleLocations || []).map((l) => l.toLowerCase());
    const locationMismatch = area && !schemeLocs.includes("all") && !schemeLocs.includes(area.toLowerCase());
    if (locationMismatch) {
      warnings.push(`Scheme targets ${scheme.eligibleLocations.join(", ")} areas; verify local branch rules.`);
    } else {
      matchedCriteria.push(`Area eligibility verified for ${area || "Rural/Urban"}`);
    }

    // Check PMEGP education threshold warning
    if (scheme.id.includes("pmegp") && loanAmount > 1000000) {
      if (educationStatus.toLowerCase().includes("below 8th")) {
        warnings.push("PMEGP requires minimum 8th standard pass for project costs above ₹10 Lakh.");
      }
    }

    // Calculate Total Score (0 - 100)
    score = catScore + incomeScore + bizScore + stageScore + sectorScore + loanScore + purposeScore + fundingScore;
    score = Math.max(0, Math.min(100, Math.round(score)));

    // Determine Eligibility Status
    let eligibilityStatus = "Eligible";
    if (isHardDisqualified || score < 50) {
      eligibilityStatus = "Not Eligible";
    } else if (score < 75 || locationMismatch || (warnings.length > 0 && score < 85)) {
      eligibilityStatus = "Partially Matching";
    } else {
      eligibilityStatus = "Eligible";
    }

    // Guarantee 3-5 clean reasons
    if (reasons.length < 3) {
      if (catScore >= 15) reasons.push("Social category is eligible");
      if (loanScore >= 10) reasons.push("Loan amount fits within scheme limits");
      if (incomeScore >= 10) reasons.push("Income criteria is satisfied");
      if (bizScore >= 10) reasons.push("Business type is supported");
      if (reasons.length === 0) reasons.push("General microenterprise criteria matched");
    }

    const trimmedReasons = reasons.slice(0, 5);

    return {
      ...scheme,
      matchScore: score,
      eligibilityStatus,
      matchedCriteria,
      unmatchedCriteria,
      warnings,
      reasons: trimmedReasons,
      breakdown: {
        category: { score: catScore, max: 20, status: catScore >= 15 ? "✓" : "⚠", label: "Social Category Match" },
        income: { score: incomeScore, max: 15, status: incomeScore >= 15 ? "✓" : "⚠", label: "Income Eligibility" },
        businessType: { score: bizScore, max: 15, status: bizScore >= 12 ? "✓" : "⚠", label: "Business Type Match" },
        stage: { score: stageScore, max: 10, status: stageScore >= 8 ? "✓" : "⚠", label: "Business Stage Match" },
        sector: { score: sectorScore, max: 10, status: sectorScore >= 7 ? "✓" : "⚠", label: "Sector Match" },
        loanAmount: { score: loanScore, max: 15, status: loanScore >= 12 ? "✓" : "⚠", label: "Loan Amount Compatibility" },
        purpose: { score: purposeScore, max: 10, status: purposeScore >= 8 ? "✓" : "⚠", label: "Loan Purpose Match" },
        fundingType: { score: fundingScore, max: 5, status: fundingScore >= 4 ? "✓" : "⚠", label: "Funding Type Match" },
        total: score
      }
    };
  });

  // Sort schemes descending by matchScore
  return results.sort((a, b) => b.matchScore - a.matchScore || a.id.localeCompare(b.id));
}

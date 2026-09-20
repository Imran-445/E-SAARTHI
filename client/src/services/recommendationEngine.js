/**
 * Saarthi (SIH 2026) - AI-Driven Scheme Recommendation Engine
 * 
 * Transparent, deterministic, rule-based matching engine designed for marginalized Indian
 * entrepreneurs. Compares applicant profile against Central & State scheme eligibility criteria.
 * 
 * Modular Architecture:
 * - evaluateScheme(scheme, profile): pure deterministic evaluation function returning rich match criteria
 * - recommendSchemes(profile, catalog, options): ranks and filters schemes, separating eligible from ineligible
 * 
 * 100-Point Factor Breakdown:
 * 1. Social Category & Gender Match: 20 Points
 * 2. Purpose Match: 15 Points
 * 3. Loan Amount Compatibility: 15 Points
 * 4. Income Eligibility: 15 Points
 * 5. Business Type Match: 15 Points
 * 6. Location & Rural/Urban Match: 10 Points
 * 7. Business Sector Match: 5 Points
 * 8. Enterprise Stage Match: 5 Points
 */

import { DEMO_SCHEMES } from "../data/schemes.js";

// Helper to check substring or keyword match
function hasMatch(sourceArray = [], target = "") {
  if (!target) return false;
  const targetLower = String(target).toLowerCase().trim();
  return sourceArray.some((item) => {
    const itemLower = String(item).toLowerCase().trim();
    return itemLower === "all" || itemLower === targetLower || itemLower.includes(targetLower) || targetLower.includes(itemLower);
  });
}

// Helper to check purpose alignment
function isPurposeAligned(schemePurposes = [], userPurpose = "") {
  if (!userPurpose) return true;
  const u = userPurpose.toLowerCase().trim();
  return schemePurposes.some((item) => {
    const p = String(item).toLowerCase().trim();
    if (p === "all" || p === u || p.includes(u) || u.includes(p)) return true;
    if (u.includes("working") && p.includes("working")) return true;
    if (u.includes("equipment") && (p.includes("equipment") || p.includes("machinery") || p.includes("tool"))) return true;
    if ((u.includes("start") || u.includes("setup")) && (p.includes("start") || p.includes("setup") || p.includes("new"))) return true;
    if ((u.includes("expansion") || u.includes("modernization")) && (p.includes("expansion") || p.includes("modernization") || p.includes("upgradation"))) return true;
    if (u.includes("cart") && (p.includes("cart") || p.includes("working") || p.includes("vending"))) return true;
    return false;
  });
}

/**
 * Evaluates a single scheme against a user profile with complete factor transparency
 * @param {Object} scheme 
 * @param {Object} profile 
 * @returns {Object} Evaluated scheme with matchScore, isEligible, reasons, whyThisScheme, importantPoints
 */
export function evaluateScheme(scheme = {}, profile = {}) {
  // Normalize user inputs
  const socialCategory = String(profile.socialCategory || profile.category || "General").trim();
  const gender = String(profile.gender || "Female").trim();
  const area = String(profile.area || "Rural").trim();
  const state = String(profile.state || "").trim();
  const district = String(profile.district || "").trim();
  const businessType = String(profile.businessType || "Micro Retail").trim();
  const stage = String(profile.stage || "Existing & Operational").trim();
  const sector = String(profile.businessSector || "").trim();
  const userIncome = Number(profile.annualFamilyIncome) || 0;
  const loanAmount = Number(profile.loanAmount) || 50000;
  const loanPurpose = String(profile.loanPurpose || profile.purpose || "Working Capital").trim();
  const preferredFundingType = String(profile.preferredFundingType || "Any / Best Available").trim();

  // Normalize scheme inputs
  const minAmt = Number(scheme.minLoanAmount ?? scheme.minLoan ?? 0);
  const maxAmt = Number(scheme.maxLoanAmount ?? scheme.maxLoan ?? 100000000);
  const schemePurposes = scheme.purpose || [];
  const schemeBeneficiaries = scheme.targetBeneficiaries || scheme.targetDemographic || [];
  const schemeCategories = (scheme.eligibleSocialCategories || scheme.targetDemographic || []).map((c) => String(c).toLowerCase());
  const schemeBizTypes = scheme.eligibleBusinessTypes || scheme.businessTypes || [];
  const schemeSectors = scheme.eligibleSectors || scheme.sector || [];
  const schemeLocations = (scheme.eligibleLocations || []).map((l) => String(l).toLowerCase());
  const ruralUrban = String(scheme.ruralUrbanEligibility || "Rural & Urban").toLowerCase();

  // Factors tracking
  let isHardDisqualified = false;
  const disqualificationReasons = [];
  const warnings = [];
  const matchedFactors = [];
  const whyThisScheme = {};

  // -------------------------------------------------------------
  // 1. Social Category & Gender Match (20 Points)
  // -------------------------------------------------------------
  let categoryScore = 0;
  const userCatLower = socialCategory.toLowerCase();
  const isFemale = gender.toLowerCase() === "female" || userCatLower === "women";

  // Check Women-Only Scheme Restriction
  const isWomenOnlyScheme =
    (scheme.id === "mahila-samridhi-yojana" ||
      scheme.id === "mahila-coir-yojana" ||
      scheme.id === "nbcfdc-swarnima-scheme" ||
      (schemeCategories.length > 0 && schemeCategories.every((c) => c === "women"))) &&
    !isFemale &&
    userCatLower !== "shg";

  // Check SC/ST Only Scheme Restriction
  const isScStOnlyScheme =
    (scheme.id === "nssh-subsidy" || scheme.id === "nsfdc-micro-credit") &&
    userCatLower !== "sc" &&
    userCatLower !== "st" &&
    !userCatLower.includes("scheduled");

  // Check Stand-Up India Restriction (Must be SC, ST, or Woman)
  const isStandUpRestricted =
    scheme.id === "stand-up-india" &&
    !isFemale &&
    userCatLower !== "sc" &&
    userCatLower !== "st" &&
    !userCatLower.includes("scheduled");

  if (isWomenOnlyScheme) {
    isHardDisqualified = true;
    categoryScore = 0;
    disqualificationReasons.push("Scheme is exclusively reserved for Women entrepreneurs");
    whyThisScheme.categoryMatch = {
      score: 0,
      max: 20,
      status: "fail",
      label: "Social Category & Gender",
      detail: "Exclusively reserved for Women applicants; applicant profile indicates non-female."
    };
  } else if (isScStOnlyScheme) {
    isHardDisqualified = true;
    categoryScore = 0;
    disqualificationReasons.push("Scheme is exclusively reserved for SC/ST enterprise promoters");
    whyThisScheme.categoryMatch = {
      score: 0,
      max: 20,
      status: "fail",
      label: "Social Category & Gender",
      detail: `Exclusively for SC/ST entrepreneurs; applicant category is ${socialCategory}.`
    };
  } else if (isStandUpRestricted) {
    isHardDisqualified = true;
    categoryScore = 0;
    disqualificationReasons.push("Stand-Up India mandates at least one Woman or SC/ST borrower per bank branch");
    whyThisScheme.categoryMatch = {
      score: 0,
      max: 20,
      status: "fail",
      label: "Social Category & Gender",
      detail: "Stand-Up India is exclusively earmarked for Women or SC/ST borrowers."
    };
  } else if (
    schemeCategories.includes("all") ||
    schemeCategories.includes(userCatLower) ||
    (isFemale && schemeCategories.includes("women")) ||
    (userCatLower.includes("vendor") && schemeCategories.some((c) => c.includes("vendor"))) ||
    (userCatLower.includes("artisan") && schemeCategories.some((c) => c.includes("artisan"))) ||
    hasMatch(schemeBeneficiaries, socialCategory)
  ) {
    categoryScore = 20;
    matchedFactors.push(`Direct social category qualification (${socialCategory})`);
    whyThisScheme.categoryMatch = {
      score: 20,
      max: 20,
      status: "pass",
      label: "Social Category & Gender",
      detail: `Your demographic profile (${socialCategory}, ${gender}) directly qualifies for priority assistance.`
    };
  } else if (schemeCategories.includes("general") || schemeCategories.length === 0) {
    categoryScore = 15;
    matchedFactors.push("Universal eligibility covering General category");
    whyThisScheme.categoryMatch = {
      score: 15,
      max: 20,
      status: "pass",
      label: "Social Category & Gender",
      detail: "Scheme offers broad universal coverage open to General and all citizen categories."
    };
  } else {
    categoryScore = 5;
    warnings.push(`Social category ${socialCategory} is not the primary target group.`);
    whyThisScheme.categoryMatch = {
      score: 5,
      max: 20,
      status: "partial",
      label: "Social Category & Gender",
      detail: `Not the primary demographic target (${scheme.eligibleCategory || "Other"}), but general quota may apply.`
    };
  }

  // -------------------------------------------------------------
  // 2. Purpose Match (15 Points)
  // -------------------------------------------------------------
  let purposeScore = 0;
  if (isPurposeAligned(schemePurposes, loanPurpose)) {
    purposeScore = 15;
    matchedFactors.push(`Loan purpose matches: ${loanPurpose}`);
    whyThisScheme.purposeMatch = {
      score: 15,
      max: 15,
      status: "pass",
      label: "Loan Purpose Match",
      detail: `Requested purpose (${loanPurpose}) is directly supported under this scheme's approved financing guidelines.`
    };
  } else {
    purposeScore = 4;
    warnings.push(`Scheme does not primarily finance '${loanPurpose}'.`);
    whyThisScheme.purposeMatch = {
      score: 4,
      max: 15,
      status: "partial",
      label: "Loan Purpose Match",
      detail: `Scheme focuses on ${schemePurposes.slice(0, 2).join(", ")} rather than '${loanPurpose}'.`
    };
  }

  // -------------------------------------------------------------
  // 3. Loan Amount Compatibility (15 Points)
  // -------------------------------------------------------------
  let amountScore = 0;
  if (loanAmount >= minAmt && loanAmount <= maxAmt) {
    amountScore = 15;
    matchedFactors.push(`Loan request of ₹${loanAmount.toLocaleString("en-IN")} is within scheme range`);
    whyThisScheme.amountCompatibility = {
      score: 15,
      max: 15,
      status: "pass",
      label: "Amount Compatibility",
      detail: `Requested ₹${loanAmount.toLocaleString("en-IN")} fits well inside the scheme envelope (₹${minAmt.toLocaleString("en-IN")} to ₹${maxAmt.toLocaleString("en-IN")}).`
    };
  } else if (loanAmount < minAmt) {
    const ratio = minAmt > 0 ? loanAmount / minAmt : 1;
    if (ratio >= 0.4) {
      amountScore = 7;
      warnings.push(`Requested ₹${loanAmount.toLocaleString("en-IN")} is below the scheme minimum of ₹${minAmt.toLocaleString("en-IN")}. You can opt for a larger loan.`);
      whyThisScheme.amountCompatibility = {
        score: 7,
        max: 15,
        status: "partial",
        label: "Amount Compatibility",
        detail: `Below minimum threshold of ₹${minAmt.toLocaleString("en-IN")}, but you may scale your project cost.`
      };
    } else {
      amountScore = 0;
      isHardDisqualified = true;
      disqualificationReasons.push(`Requested loan amount (₹${loanAmount.toLocaleString("en-IN")}) is drastically below the minimum threshold of ₹${minAmt.toLocaleString("en-IN")}`);
      whyThisScheme.amountCompatibility = {
        score: 0,
        max: 15,
        status: "fail",
        label: "Amount Compatibility",
        detail: `Minimum loan ceiling is ₹${minAmt.toLocaleString("en-IN")}; request of ₹${loanAmount.toLocaleString("en-IN")} is too low.`
      };
    }
  } else {
    // loanAmount > maxAmt
    const overRatio = maxAmt > 0 ? loanAmount / maxAmt : 2;
    if (overRatio <= 1.3) {
      amountScore = 6;
      warnings.push(`Requested ₹${loanAmount.toLocaleString("en-IN")} exceeds the scheme ceiling of ₹${maxAmt.toLocaleString("en-IN")}.`);
      whyThisScheme.amountCompatibility = {
        score: 6,
        max: 15,
        status: "partial",
        label: "Amount Compatibility",
        detail: `Exceeds upper limit of ₹${maxAmt.toLocaleString("en-IN")}. Partial bank sanction or personal equity required.`
      };
    } else {
      amountScore = 0;
      isHardDisqualified = true;
      disqualificationReasons.push(`Requested loan (₹${loanAmount.toLocaleString("en-IN")}) far exceeds scheme cap of ₹${maxAmt.toLocaleString("en-IN")}`);
      whyThisScheme.amountCompatibility = {
        score: 0,
        max: 15,
        status: "fail",
        label: "Amount Compatibility",
        detail: `Scheme cap is ₹${maxAmt.toLocaleString("en-IN")}. Request of ₹${loanAmount.toLocaleString("en-IN")} is far too high for this micro scheme.`
      };
    }
  }

  // -------------------------------------------------------------
  // 4. Income Eligibility (15 Points)
  // -------------------------------------------------------------
  let incomeScore = 0;
  const maxIncome = scheme.maxIncome || (scheme.incomeEligibility && scheme.incomeEligibility.includes("3,00,000") ? 300000 : null);

  if (!maxIncome || maxIncome >= 10000000) {
    incomeScore = 15;
    matchedFactors.push("No restrictive family income ceiling");
    whyThisScheme.incomeMatch = {
      score: 15,
      max: 15,
      status: "pass",
      label: "Income Eligibility",
      detail: "Scheme has no mandatory household income ceiling; credit viability is evaluated based on business cash flow."
    };
  } else if (userIncome <= maxIncome) {
    incomeScore = 15;
    matchedFactors.push(`Income (₹${userIncome.toLocaleString("en-IN")}) is within ceiling (≤ ₹${maxIncome.toLocaleString("en-IN")})`);
    whyThisScheme.incomeMatch = {
      score: 15,
      max: 15,
      status: "pass",
      label: "Income Eligibility",
      detail: `Your family income of ₹${userIncome.toLocaleString("en-IN")} satisfies the statutory ceiling of ₹${maxIncome.toLocaleString("en-IN")}.`
    };
  } else {
    const excessRatio = (userIncome - maxIncome) / maxIncome;
    if (excessRatio <= 0.2) {
      incomeScore = 5;
      warnings.push(`Family income (₹${userIncome.toLocaleString("en-IN")}) slightly exceeds ₹${maxIncome.toLocaleString("en-IN")}.`);
      whyThisScheme.incomeMatch = {
        score: 5,
        max: 15,
        status: "partial",
        label: "Income Eligibility",
        detail: `Income slightly exceeds standard limit of ₹${maxIncome.toLocaleString("en-IN")}. Subject to discretionary income verification.`
      };
    } else {
      incomeScore = 0;
      isHardDisqualified = true;
      disqualificationReasons.push(`Annual family income (₹${userIncome.toLocaleString("en-IN")}) exceeds statutory cap of ₹${maxIncome.toLocaleString("en-IN")}`);
      whyThisScheme.incomeMatch = {
        score: 0,
        max: 15,
        status: "fail",
        label: "Income Eligibility",
        detail: `Statutory income ceiling of ₹${maxIncome.toLocaleString("en-IN")} exceeded by ₹${(userIncome - maxIncome).toLocaleString("en-IN")}.`
      };
    }
  }

  // -------------------------------------------------------------
  // 5. Business Type Match (15 Points)
  // -------------------------------------------------------------
  let bizScore = 0;
  const isDirectBizMatch = hasMatch(schemeBizTypes, businessType) || hasMatch(schemeBeneficiaries, businessType);

  // Hard street vendor / artisan check:
  if (scheme.id === "pm-svanidhi" && businessType !== "Street Vendor") {
    bizScore = 0;
    isHardDisqualified = true;
    disqualificationReasons.push("PM SVANidhi is strictly for Street Vendors, Hawkers and Thela Operators");
    whyThisScheme.businessTypeMatch = {
      score: 0,
      max: 15,
      status: "fail",
      label: "Business Type Match",
      detail: "PM SVANidhi requires a Certificate of Vending or urban vending activity."
    };
  } else if (scheme.id === "pm-vishwakarma" && businessType !== "Traditional Artisan" && !sector.toLowerCase().includes("handicraft") && !sector.toLowerCase().includes("pottery") && !sector.toLowerCase().includes("blacksmith")) {
    bizScore = 3;
    warnings.push("PM Vishwakarma is targeted specifically at the 18 notified traditional artisan crafts.");
    whyThisScheme.businessTypeMatch = {
      score: 3,
      max: 15,
      status: "partial",
      label: "Business Type Match",
      detail: "Requires engagement in one of the 18 traditional hand-tool crafts."
    };
  } else if (isDirectBizMatch) {
    bizScore = 15;
    matchedFactors.push(`Enterprise type (${businessType}) is supported`);
    whyThisScheme.businessTypeMatch = {
      score: 15,
      max: 15,
      status: "pass",
      label: "Business Type Match",
      detail: `Your business category (${businessType}) is an explicitly targeted enterprise model.`
    };
  } else {
    bizScore = 6;
    whyThisScheme.businessTypeMatch = {
      score: 6,
      max: 15,
      status: "partial",
      label: "Business Type Match",
      detail: `General non-farm microenterprises are accepted, though not the primary focus.`
    };
  }

  // -------------------------------------------------------------
  // 6. Location & Rural/Urban Match (10 Points)
  // -------------------------------------------------------------
  let locationScore = 0;
  const userAreaLower = area.toLowerCase();

  const isCoirRuralOnly = scheme.id === "mahila-coir-yojana" && userAreaLower === "urban";
  const isSvanidhiUrbanOnly = scheme.id === "pm-svanidhi" && userAreaLower === "rural" && !state.toLowerCase().includes("peri");

  if (isCoirRuralOnly) {
    locationScore = 0;
    warnings.push("Mahila Coir Yojana requires rural residency near coir clusters.");
    whyThisScheme.locationMatch = {
      score: 0,
      max: 10,
      status: "fail",
      label: "Location & Area Match",
      detail: "Scheme is strictly for rural women artisans."
    };
  } else if (isSvanidhiUrbanOnly) {
    locationScore = 4;
    warnings.push("PM SVANidhi primarily targets urban and peri-urban street vendors.");
    whyThisScheme.locationMatch = {
      score: 4,
      max: 10,
      status: "partial",
      label: "Location & Area Match",
      detail: "Street vendors in rural areas require peri-urban / town market vending verification."
    };
  } else if (
    ruralUrban.includes("both") ||
    ruralUrban.includes("rural & urban") ||
    ruralUrban.includes(userAreaLower) ||
    schemeLocations.includes("all") ||
    schemeLocations.includes(userAreaLower)
  ) {
    locationScore = 10;
    matchedFactors.push(`Location area (${area}) is eligible`);
    whyThisScheme.locationMatch = {
      score: 10,
      max: 10,
      status: "pass",
      label: "Location & Area Match",
      detail: `Operational in ${area} areas across ${state || "all states"} with active banking channels.`
    };
  } else {
    locationScore = 5;
    whyThisScheme.locationMatch = {
      score: 5,
      max: 10,
      status: "partial",
      label: "Location & Area Match",
      detail: "State or regional quotas may apply for your location."
    };
  }

  // -------------------------------------------------------------
  // 7. Business Sector Match (5 Points)
  // -------------------------------------------------------------
  let sectorScore = 0;
  if (!sector || hasMatch(schemeSectors, sector)) {
    sectorScore = 5;
    matchedFactors.push(`Sector coverage confirmed (${sector || "All Trades"})`);
    whyThisScheme.sectorMatch = {
      score: 5,
      max: 5,
      status: "pass",
      label: "Business Sector",
      detail: `Trade activity (${sector || "Commercial"}) aligns with eligible sector classifications.`
    };
  } else {
    sectorScore = 2;
    whyThisScheme.sectorMatch = {
      score: 2,
      max: 5,
      status: "partial",
      label: "Business Sector",
      detail: `Your sector (${sector}) is not specifically prioritized, but eligible under general MSME activities.`
    };
  }

  // -------------------------------------------------------------
  // 8. Enterprise Stage Match (5 Points)
  // -------------------------------------------------------------
  let stageScore = 0;
  const isGreenfieldScheme = scheme.id === "stand-up-india" || scheme.id === "pmegp";
  const isGreenfieldUser = stage.toLowerCase().includes("new") || stage.toLowerCase().includes("greenfield");

  if (isGreenfieldScheme && isGreenfieldUser) {
    stageScore = 5;
    matchedFactors.push(`New greenfield venture prioritized for capital grants`);
    whyThisScheme.stageMatch = {
      score: 5,
      max: 5,
      status: "pass",
      label: "Enterprise Stage",
      detail: "Greenfield / first-time enterprises receive top subsidy consideration."
    };
  } else if (!isGreenfieldScheme && !isGreenfieldUser) {
    stageScore = 5;
    matchedFactors.push(`Existing operational business matches working capital guidelines`);
    whyThisScheme.stageMatch = {
      score: 5,
      max: 5,
      status: "pass",
      label: "Enterprise Stage",
      detail: "Existing operational units qualify directly for expansion / working capital loans."
    };
  } else {
    stageScore = 3;
    whyThisScheme.stageMatch = {
      score: 3,
      max: 5,
      status: "partial",
      label: "Enterprise Stage",
      detail: `Scheme accommodates ${stage}, though primary focus is on other phases.`
    };
  }

  // Compute total score (0 - 100)
  let totalScore = categoryScore + purposeScore + amountScore + incomeScore + bizScore + locationScore + sectorScore + stageScore;
  totalScore = Math.max(0, Math.min(100, Math.round(totalScore)));

  // If hard disqualified, enforce low/zero score and ineligible status
  if (isHardDisqualified) {
    totalScore = Math.min(totalScore, 35);
  }

  // Determine overall eligibility status
  let eligibilityStatus = "Eligible";
  let isEligible = true;

  if (isHardDisqualified || totalScore < 50) {
    eligibilityStatus = "Not Eligible";
    isEligible = false;
  } else if (totalScore < 75 || warnings.length > 0) {
    eligibilityStatus = "Partially Matching";
    isEligible = true;
  } else {
    eligibilityStatus = "Eligible";
    isEligible = true;
  }

  // Generate concise short reason for the match
  let shortReason = "";
  if (isEligible) {
    if (scheme.id === "pm-svanidhi") {
      shortReason = `Direct match for street vendors needing ₹${loanAmount.toLocaleString("en-IN")} working capital with 7% interest rebate.`;
    } else if (scheme.id === "pm-vishwakarma") {
      shortReason = `Provides ₹15k modern toolkit grant and 5% credit for traditional artisans and craftsmen.`;
    } else if (scheme.id === "pmegp") {
      shortReason = `Eligible for up to 35% non-refundable government margin subsidy for new microenterprises.`;
    } else if (scheme.id === "stand-up-india") {
      shortReason = `Special formal banking credit up to ₹1 Crore for ${socialCategory} / Women greenfield ventures.`;
    } else if (scheme.id === "mahila-samridhi-yojana") {
      shortReason = `Concessional 4% interest microcredit specifically targeted at SC women entrepreneurs.`;
    } else if (scheme.id === "pm-mudra-yojana") {
      shortReason = `100% collateral-free formal bank loan with fast-track processing for ${businessType}.`;
    } else if (scheme.id === "dairy-entrepreneurship-deds") {
      shortReason = `Offers up to 33.33% back-ended capital subsidy on dairy and livestock setup in rural areas.`;
    } else if (scheme.id === "cgtmse-micro-guarantee") {
      shortReason = `Government credit guarantee covers up to 85% without requiring property or land mortgage.`;
    } else if (scheme.id === "nbcfdc-swarnima-scheme") {
      shortReason = `Low 5% concessional microloan for OBC women establishing self-employment units.`;
    } else if (scheme.id === "pm-surya-ghar-msme") {
      shortReason = `Up to 40% capital subsidy on rooftop solar installations to cut micro-business power bills.`;
    } else {
      shortReason = `Strong match across ${matchedFactors.length} profile criteria including loan amount and business activity.`;
    }
  } else {
    shortReason = disqualificationReasons[0] || "Does not meet scheme mandatory eligibility criteria.";
  }

  // Important bulleted eligibility terms & key benefits
  const importantPoints = [
    scheme.collateralRequired ? "Third-party collateral / mortgage required" : "100% Collateral-Free (No property or land mortgage needed)",
    scheme.subsidyRate ? `Subsidy Benefit: ${scheme.subsidyRate}` : "Concessional government credit facility",
    scheme.interestRate ? `Effective Interest: ${scheme.interestRate}` : "Standard MSME bank lending rate",
    scheme.ruralUrbanEligibility ? `Geographic Scope: ${scheme.ruralUrbanEligibility}` : "Pan-India coverage",
    scheme.repaymentPeriod ? `Repayment Tenure: ${scheme.repaymentPeriod}` : "Flexible installments"
  ];

  return {
    ...scheme,
    matchScore: totalScore,
    isEligible,
    eligibilityStatus,
    shortReason,
    importantPoints,
    whyThisScheme,
    matchedFactors,
    warnings,
    disqualificationReasons
  };
}

/**
 * Ranks all schemes in the catalog against user profile.
 * Separates eligible/suitable schemes from strictly ineligible schemes.
 * 
 * @param {Object} profile 
 * @param {Array} catalog 
 * @param {Object} options 
 * @returns {Array} List of evaluated schemes sorted descending by matchScore
 */
export function recommendSchemes(profile = {}, catalog = DEMO_SCHEMES, options = {}) {
  if (!Array.isArray(catalog) || catalog.length === 0) {
    return [];
  }

  const evaluated = catalog.map((scheme) => evaluateScheme(scheme, profile));

  // Sort descending by match score
  return evaluated.sort((a, b) => {
    // Eligible schemes first, then by matchScore descending
    if (a.isEligible && !b.isEligible) return -1;
    if (!a.isEligible && b.isEligible) return 1;
    return b.matchScore - a.matchScore || a.id.localeCompare(b.id);
  });
}

export const matchSchemes = recommendSchemes;

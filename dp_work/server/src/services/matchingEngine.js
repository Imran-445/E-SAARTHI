import { schemes } from "../data/schemes.js";

/**
 * Saarthi (SIH 2026) transparent 100-point recommendation engine.
 *
 * The frontend collects these eight weighted criteria:
 *   Social category 20, income 15, business type 15, stage 10,
 *   sector 10, loan amount 15, purpose 10, funding type 5.
 *
 * The server catalog predates the richer frontend schema, so the small
 * metadata table below normalizes the server records to the same matcher
 * contract. It does not change the scheme facts shown to users.
 */
const MATCH_METADATA = {
  "nsfdc-micro-credit": {
    purpose: ["Start a Small Business", "Business Setup", "Working Capital", "Equipment & Machinery", "New Enterprise Setup"],
    eligibleSocialCategories: ["SC", "Scheduled Caste"],
    eligibleBusinessTypes: ["Micro Retail", "Small Retail Shop / Kirana / Grocery", "Street Vendor", "Service Enterprise", "Micro Manufacturing"],
    eligibleBusinessStages: ["New Venture", "New Venture / Greenfield Project", "Early Stage", "Early Stage (< 1 Year)", "Existing & Operational"],
    eligibleSectors: ["Retail Grocery, Kirana & General Stores", "Personal Care, Beauty & Tailoring", "Textiles, Handloom & Garments", "All"],
    maxIncome: 600000,
    fundingTypes: ["Collateral-Free Microcredit", "Term Loan", "Concessional Interest Loan", "Any / Best Available"],
    eligibleLocations: ["Rural", "Urban", "Within District", "Within State", "All"],
    verificationStatus: "Demo Scheme Data - Verify final eligibility with the concerned authority."
  },
  "pm-svanidhi": {
    purpose: ["Working Capital", "Marketing & Vending Cart", "Equipment & Machinery", "Start a Small Business"],
    eligibleSocialCategories: ["All", "Street/Micro Vendor", "SC", "ST", "OBC", "Women", "Minority", "General", "Transgender", "Person with Disability"],
    eligibleBusinessTypes: ["Street Vendor", "Street Vendor / Hawker / Thela", "Micro Retail", "Small Retail Shop / Kirana / Grocery"],
    eligibleBusinessStages: ["Existing & Operational", "Early Stage", "Early Stage (< 1 Year)", "New Venture"],
    eligibleSectors: ["Retail Grocery, Kirana & General Stores", "Food Processing, Bakeries & Agro-Products", "Personal Care, Beauty & Tailoring", "All"],
    maxIncome: 300000,
    fundingTypes: ["Collateral-Free Microcredit", "Working Capital / CC Limit", "Any / Best Available"],
    eligibleLocations: ["Urban", "Within District", "Within State", "All"],
    verificationStatus: "Demo Scheme Data - Verify final eligibility with the concerned authority."
  },
  "stand-up-india": {
    purpose: ["Start a Small Business", "Business Setup", "Equipment & Machinery", "Expansion & Modernization"],
    eligibleSocialCategories: ["Women", "SC", "ST", "Scheduled Caste"],
    eligibleBusinessTypes: ["Micro Manufacturing", "Micro Manufacturing / Workshop Unit", "Service Enterprise", "Agri-Allied", "Micro Retail"],
    eligibleBusinessStages: ["New Venture", "New Venture / Greenfield Project"],
    eligibleSectors: ["Textiles, Handloom & Garments", "Food Processing, Bakeries & Agro-Products", "Digital Services, CSC & IT Support", "All"],
    maxIncome: 10000000,
    fundingTypes: ["Term Loan", "Working Capital / CC Limit", "Any / Best Available"],
    eligibleLocations: ["Rural", "Urban", "Pan-India", "All"],
    verificationStatus: "Demo Scheme Data - Verify final eligibility with the concerned authority."
  },
  "pmegp": {
    purpose: ["Start a Small Business", "Business Setup", "Equipment & Machinery", "Expansion & Modernization"],
    eligibleSocialCategories: ["SC", "ST", "OBC", "Women", "Minority", "Person with Disability", "General", "Transgender"],
    eligibleBusinessTypes: ["Micro Manufacturing", "Micro Manufacturing / Workshop Unit", "Service Enterprise", "Personal Services / Repair / Tailoring", "Agri-Allied", "Traditional Artisan"],
    eligibleBusinessStages: ["New Venture", "New Venture / Greenfield Project"],
    eligibleSectors: ["Textiles, Handloom & Garments", "Food Processing, Bakeries & Agro-Products", "Carpentry, Woodwork & Bamboo", "Metalwork, Blacksmithy & Welding", "Leather & Footwear Manufacturing", "All"],
    maxIncome: 2500000,
    fundingTypes: ["Capital Subsidy / Margin Money", "Term Loan", "Any / Best Available"],
    eligibleLocations: ["Rural", "Urban", "Within State", "Pan-India", "All"],
    verificationStatus: "Demo Scheme Data - Verify final eligibility with the concerned authority."
  },
  "pm-vishwakarma": {
    purpose: ["Equipment & Machinery", "Working Capital", "Marketing & Vending Cart", "Start a Small Business"],
    eligibleSocialCategories: ["Rural Artisan", "OBC", "SC", "ST", "Women", "Minority", "General", "All"],
    eligibleBusinessTypes: ["Traditional Artisan", "Traditional Artisan / Handicrafts", "Service Enterprise"],
    eligibleBusinessStages: ["Existing & Operational", "Early Stage", "Early Stage (< 1 Year)", "New Venture"],
    eligibleSectors: ["Traditional Handicrafts & Clay/Pottery", "Carpentry, Woodwork & Bamboo", "Metalwork, Blacksmithy & Welding", "Leather & Footwear Manufacturing", "Construction, Masonry & Plumbing", "All"],
    maxIncome: 400000,
    fundingTypes: ["Collateral-Free Microcredit", "Concessional Interest Loan", "Any / Best Available"],
    eligibleLocations: ["Rural", "Urban", "Within District", "Within State", "All"],
    verificationStatus: "Demo Scheme Data - Verify final eligibility with the concerned authority."
  },
  "pm-mudra-yojana": {
    purpose: ["Start a Small Business", "Business Setup", "Working Capital", "Equipment & Machinery", "Expansion & Modernization"],
    eligibleSocialCategories: ["All", "General", "SC", "ST", "OBC", "Women", "Minority", "Transgender", "Person with Disability", "Street/Micro Vendor"],
    eligibleBusinessTypes: ["Micro Retail", "Small Retail Shop / Kirana / Grocery", "Street Vendor", "Service Enterprise", "Micro Manufacturing", "Agri-Allied"],
    eligibleBusinessStages: ["New Venture", "New Venture / Greenfield Project", "Early Stage", "Early Stage (< 1 Year)", "Existing & Operational", "Expansion / Modernization"],
    eligibleSectors: ["Retail Grocery, Kirana & General Stores", "Personal Care, Beauty & Tailoring", "Electrical, Automobile & Device Repair", "Textiles, Handloom & Garments", "All"],
    maxIncome: 1500000,
    fundingTypes: ["Collateral-Free Microcredit", "Term Loan", "Working Capital / CC Limit", "Any / Best Available"],
    eligibleLocations: ["Rural", "Urban", "Within District", "Within State", "Pan-India", "All"],
    verificationStatus: "Demo Scheme Data - Verify final eligibility with the concerned authority."
  },
  "mahila-samridhi-yojana": {
    purpose: ["Start a Small Business", "Business Setup", "Working Capital", "Equipment & Machinery"],
    requiredSocialCategories: ["Women", "SC"],
    eligibleSocialCategories: ["Women", "SC", "Scheduled Caste", "SHG"],
    eligibleBusinessTypes: ["Micro Retail", "Small Retail Shop / Kirana / Grocery", "Street Vendor", "Traditional Artisan", "Service Enterprise", "SHG Enterprise"],
    eligibleBusinessStages: ["New Venture", "Early Stage", "Early Stage (< 1 Year)", "Existing & Operational"],
    eligibleSectors: ["Personal Care, Beauty & Tailoring", "Retail Grocery, Kirana & General Stores", "Traditional Handicrafts & Clay/Pottery", "All"],
    maxIncome: 300000,
    fundingTypes: ["Collateral-Free Microcredit", "Concessional Interest Loan", "Any / Best Available"],
    eligibleLocations: ["Rural", "Urban", "Within District", "All"],
    verificationStatus: "Demo Scheme Data - Verify final eligibility with the concerned authority."
  },
  "mahila-coir-yojana": {
    purpose: ["Equipment & Machinery", "Business Setup", "Working Capital"],
    eligibleSocialCategories: ["Women", "Rural Artisan", "SC", "ST", "OBC"],
    eligibleBusinessTypes: ["Traditional Artisan", "Traditional Artisan / Handicrafts", "Micro Manufacturing"],
    eligibleBusinessStages: ["New Venture", "Early Stage", "Existing & Operational"],
    eligibleSectors: ["Traditional Handicrafts & Clay/Pottery", "Textiles, Handloom & Garments", "All"],
    maxIncome: 500000,
    fundingTypes: ["Capital Subsidy / Margin Money", "Term Loan", "Any / Best Available"],
    eligibleLocations: ["Rural", "Within State", "All"],
    verificationStatus: "Demo Scheme Data - Verify final eligibility with the concerned authority."
  },
  "nssh-subsidy": {
    purpose: ["Equipment & Machinery", "Expansion & Modernization", "Business Setup"],
    eligibleSocialCategories: ["SC", "ST"],
    eligibleBusinessTypes: ["Micro Manufacturing", "Micro Manufacturing / Workshop Unit", "Service Enterprise"],
    eligibleBusinessStages: ["New Venture", "Existing & Operational", "Expansion / Modernization"],
    eligibleSectors: ["Metalwork, Blacksmithy & Welding", "Electrical, Automobile & Device Repair", "Textiles, Handloom & Garments", "All"],
    maxIncome: 10000000,
    fundingTypes: ["Capital Subsidy / Margin Money", "Term Loan", "Any / Best Available"],
    eligibleLocations: ["Rural", "Urban", "Within State", "Pan-India", "All"],
    verificationStatus: "Demo Scheme Data - Verify final eligibility with the concerned authority."
  }
};

function normalizedScheme(scheme) {
  const meta = MATCH_METADATA[scheme.id] || {};
  return {
    ...scheme,
    ...meta,
    shortDescription: scheme.shortDescription || scheme.overview,
    minLoanAmount: scheme.minLoanAmount ?? scheme.minLoan ?? 0,
    maxLoanAmount: scheme.maxLoanAmount ?? scheme.maxLoan ?? 100000000,
    documentsRequired: scheme.documentsRequired || scheme.requiredDocuments || [],
    purpose: meta.purpose || scheme.purpose || [],
    eligibleSocialCategories: meta.eligibleSocialCategories || scheme.targetDemographic || ["All"],
    eligibleBusinessTypes: meta.eligibleBusinessTypes || scheme.businessTypes || ["All"],
    eligibleBusinessStages: meta.eligibleBusinessStages || ["All"],
    eligibleSectors: meta.eligibleSectors || ["All"],
    fundingTypes: meta.fundingTypes || ["Any / Best Available"],
    eligibleLocations: meta.eligibleLocations || ["All"]
  };
}

function containsMatch(values, value) {
  if (values.some((item) => String(item).toLowerCase() === "all")) return true;
  if (!value) return false;
  const normalizedValue = value.toLowerCase();
  return values.some((item) => {
    const candidate = String(item).toLowerCase();
    return candidate === normalizedValue || candidate.includes(normalizedValue) || normalizedValue.includes(candidate);
  });
}

function purposeMatches(values, userPurpose) {
  const user = userPurpose.toLowerCase();
  return values.some((item) => {
    const p = String(item).toLowerCase();
    if (p === "all" || p.includes(user) || user.includes(p)) return true;
    if (user.includes("working") && p.includes("working")) return true;
    if (user.includes("equipment") && (p.includes("equipment") || p.includes("machinery"))) return true;
    if (user.includes("setup") && (p.includes("setup") || p.includes("start") || p.includes("new"))) return true;
    if (user.includes("start") && (p.includes("setup") || p.includes("start") || p.includes("new"))) return true;
    if (user.includes("expansion") && (p.includes("expansion") || p.includes("modernization"))) return true;
    return false;
  });
}

/** @param {Object} profile */
export function matchSchemes(profile = {}) {
  const socialCategory = String(profile.socialCategory || profile.category || "").trim();
  const gender = String(profile.gender || "").trim();
  const area = String(profile.area || "Rural").trim();
  const businessType = String(profile.businessType || "").trim();
  const stage = String(profile.stage || "").trim();
  const sector = String(profile.businessSector || "").trim();
  const userIncome = Number(profile.annualFamilyIncome) || 0;
  const loanAmount = Number(profile.loanAmount) || 0;
  const loanPurpose = String(profile.loanPurpose || profile.purpose || "").trim();
  const preferredFundingType = String(profile.preferredFundingType || "").trim();
  const educationStatus = String(profile.educationStatus || "").trim();

  return schemes.map(normalizedScheme).map((scheme) => {
    let score = 0;
    const matchedCriteria = [];
    const unmatchedCriteria = [];
    const warnings = [];
    const reasons = [];
    let isHardDisqualified = false;

    // 1. Social category — 20
    let catScore = 0;
    const cats = scheme.eligibleSocialCategories.map((c) => String(c).toLowerCase());
    const userCat = socialCategory.toLowerCase();
    const womenApplicant = gender.toLowerCase() === "female" || userCat === "women";
    const womenOnly = cats.length > 0 && cats.every((c) => c === "women") && !womenApplicant;

    if (womenOnly) {
      isHardDisqualified = true;
      unmatchedCriteria.push("Scheme target demographic is strictly Women entrepreneurs");
      warnings.push("Exclusively reserved for Women applicants.");
    } else if (
      cats.includes("all") ||
      containsMatch(scheme.eligibleSocialCategories, socialCategory) ||
      (womenApplicant && cats.includes("women"))
    ) {
      catScore = 20;
      score += catScore;
      matchedCriteria.push(`Your social category (${socialCategory || "General"}) directly qualifies`);
      reasons.push(`Social category (${socialCategory || "Applicant"}) is eligible`);
    } else if (cats.includes("general")) {
      catScore = 15;
      score += catScore;
      matchedCriteria.push("Open to General and universal categories");
      reasons.push("Open to universal beneficiary categories");
    } else {
      catScore = 4;
      score += catScore;
      unmatchedCriteria.push(`Social category (${socialCategory || "not provided"}) is not directly prioritized in this scheme`);
    }

    const requiredCategories = scheme.requiredSocialCategories || [];
    if (requiredCategories.length > 0) {
      const hasAllRequired = requiredCategories.every((required) => {
        const r = String(required).toLowerCase();
        return r === userCat || (r === "women" && gender.toLowerCase() === "female");
      });
      if (!hasAllRequired) {
        score -= catScore;
        catScore = 0;
        isHardDisqualified = true;
        unmatchedCriteria.push(`Required beneficiary combination (${requiredCategories.join(" + ")}) is not satisfied`);
        warnings.push(`This scheme requires ${requiredCategories.join(" + ")} eligibility.`);
      }
    }

    // 2. Income — 15
    let incomeScore = 0;
    const maxIncome = Number(scheme.maxIncome);
    if (!maxIncome || maxIncome >= 10000000 || userIncome <= maxIncome) {
      incomeScore = 15;
      score += incomeScore;
      matchedCriteria.push(maxIncome ? `Annual family income of ₹${userIncome.toLocaleString("en-IN")} is within the limit` : "No restrictive family income ceiling");
      reasons.push("Income falls within eligible range");
    } else {
      const overPct = (userIncome - maxIncome) / maxIncome;
      if (overPct <= 0.15) {
        incomeScore = 5;
        score += incomeScore;
        warnings.push(`Annual family income (₹${userIncome.toLocaleString("en-IN")}) slightly exceeds scheme threshold (₹${maxIncome.toLocaleString("en-IN")})`);
      } else {
        isHardDisqualified = true;
        unmatchedCriteria.push(`Income ceiling of ₹${maxIncome.toLocaleString("en-IN")} exceeded`);
        warnings.push(`Annual family income of ₹${userIncome.toLocaleString("en-IN")} exceeds the scheme limit of ₹${maxIncome.toLocaleString("en-IN")}`);
      }
    }

    // 3. Business type — 15
    let bizScore = 0;
    if (containsMatch(scheme.eligibleBusinessTypes, businessType)) {
      bizScore = 15;
      score += bizScore;
      matchedCriteria.push(`Business activity (${businessType}) is supported`);
      reasons.push(`Business type (${businessType}) is supported`);
    } else {
      unmatchedCriteria.push(`Business type (${businessType || "not provided"}) is not supported`);
    }

    // 4. Stage — 10
    let stageScore = 0;
    if (containsMatch(scheme.eligibleBusinessStages, stage)) {
      stageScore = 10;
      score += stageScore;
      matchedCriteria.push(`Venture stage (${stage}) matches scheme phase`);
      reasons.push(`Enterprise stage (${stage}) is eligible`);
    } else {
      stageScore = 3;
      score += stageScore;
      unmatchedCriteria.push("Scheme primarily finances different venture stages");
    }

    // 5. Sector — 10
    let sectorScore = 0;
    if (containsMatch(scheme.eligibleSectors, sector)) {
      sectorScore = 10;
      score += sectorScore;
      matchedCriteria.push(`Sector (${sector || "All"}) is covered`);
      reasons.push("Business sector aligns with trade coverage");
    } else {
      sectorScore = 3;
      score += sectorScore;
      unmatchedCriteria.push("Sector is not on the primary trade list");
    }

    // 6. Loan amount — 15
    let loanScore = 0;
    const minLoan = Number(scheme.minLoanAmount) || 0;
    const maxLoan = Number(scheme.maxLoanAmount) || 100000000;
    if (loanAmount >= minLoan && loanAmount <= maxLoan) {
      loanScore = 15;
      score += loanScore;
      matchedCriteria.push(`Requested ₹${loanAmount.toLocaleString("en-IN")} fits the loan envelope`);
      reasons.push(`Loan amount fits the scheme (₹${minLoan.toLocaleString("en-IN")} to ₹${maxLoan.toLocaleString("en-IN")})`);
    } else if (loanAmount < minLoan) {
      const ratio = minLoan ? loanAmount / minLoan : 0;
      if (ratio >= 0.5) {
        loanScore = 6;
        score += loanScore;
        warnings.push(`Requested ₹${loanAmount.toLocaleString("en-IN")} is below the scheme minimum of ₹${minLoan.toLocaleString("en-IN")}. You can apply for a higher amount.`);
      } else {
        warnings.push(`Loan requirement is significantly below scheme minimum of ₹${minLoan.toLocaleString("en-IN")}.`);
        unmatchedCriteria.push(`Minimum loan required is ₹${minLoan.toLocaleString("en-IN")}`);
      }
    } else {
      const ratio = maxLoan ? loanAmount / maxLoan : 2;
      if (ratio <= 1.25) {
        loanScore = 5;
        score += loanScore;
        warnings.push(`Requested ₹${loanAmount.toLocaleString("en-IN")} exceeds scheme maximum limit of ₹${maxLoan.toLocaleString("en-IN")}.`);
      } else {
        warnings.push(`Requested ₹${loanAmount.toLocaleString("en-IN")} is well above scheme limit of ₹${maxLoan.toLocaleString("en-IN")}.`);
        unmatchedCriteria.push(`Scheme loan ceiling is ₹${maxLoan.toLocaleString("en-IN")}`);
      }
    }

    // 7. Purpose — 10
    let purposeScore = 0;
    if (purposeMatches(scheme.purpose, loanPurpose)) {
      purposeScore = 10;
      score += purposeScore;
      matchedCriteria.push(`Purpose (${loanPurpose}) is supported`);
      reasons.push("Selected loan purpose matches scheme objectives");
    } else {
      purposeScore = 2;
      score += purposeScore;
      unmatchedCriteria.push("Purpose is not primarily funded under this scheme");
    }

    // 8. Funding type — 5
    let fundingScore = 0;
    if (!preferredFundingType || preferredFundingType.toLowerCase().includes("any") || preferredFundingType.toLowerCase().includes("best") || containsMatch(scheme.fundingTypes, preferredFundingType)) {
      fundingScore = 5;
      score += fundingScore;
      matchedCriteria.push("Funding type preference matches");
    } else {
      fundingScore = 2;
      score += fundingScore;
      unmatchedCriteria.push("Funding type preference differs from the scheme's primary facility");
    }

    // Verification checks: location and education are surfaced as warnings,
    // rather than silently changing the 100-point weighting.
    const locationMismatch = area && !containsMatch(scheme.eligibleLocations, area);
    if (locationMismatch) {
      warnings.push(`Scheme targets ${scheme.eligibleLocations.join(", ")} areas; verify local branch rules.`);
    } else {
      matchedCriteria.push(`Area eligibility verified for ${area || "Rural/Urban"}`);
    }

    if (scheme.id === "pmegp" && loanAmount > 1000000 && educationStatus.toLowerCase().includes("below 8th")) {
      warnings.push("PMEGP requires minimum 8th standard pass for project costs above ₹10 Lakh.");
    }

    score = Math.max(0, Math.min(100, Math.round(score)));
    let eligibilityStatus = "Eligible";
    if (isHardDisqualified || score < 50) eligibilityStatus = "Not Eligible";
    else if (score < 75 || locationMismatch || (warnings.length > 0 && score < 85)) eligibilityStatus = "Partially Matching";

    if (reasons.length < 3) {
      if (score >= 50 && matchedCriteria.length) reasons.push(matchedCriteria[0]);
      if (score >= 50 && reasons.length < 3) reasons.push("Profile criteria were compared against the scheme rules");
    }

    return {
      ...scheme,
      matchScore: score,
      eligibilityStatus,
      matchedCriteria,
      unmatchedCriteria,
      warnings,
      reasons: reasons.slice(0, 5),
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
  }).sort((a, b) => b.matchScore - a.matchScore || a.id.localeCompare(b.id));
}

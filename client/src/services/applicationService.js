/**
 * Saarthi (SIH 2026) - Application & Document Guidance Service
 * 
 * Provides centralized document categorization, personalized checklist generation,
 * readiness percentage calculation, and 6-stage application lifecycle tracking.
 */

export const DOCUMENT_CATEGORIES = [
  { id: "all", label: "All Documents" },
  { id: "identity_proof", label: "Identity Proof" },
  { id: "address_proof", label: "Address Proof" },
  { id: "income_document", label: "Income-Related" },
  { id: "category_certificate", label: "Category / Certificate" },
  { id: "business_document", label: "Business-Related" },
  { id: "bank_details", label: "Bank / Account Details" }
];

export const APPLICATION_STAGES = [
  { id: 1, key: "details_submitted", label: "Details Submitted", shortDesc: "Initial profile data captured" },
  { id: 2, key: "scheme_selected", label: "Scheme Selected", shortDesc: "Scheme matched and chosen" },
  { id: 3, key: "documents_prepared", label: "Documents Prepared", shortDesc: "Physical & digital paperwork assembled" },
  { id: 4, key: "application_submitted", label: "Application Submitted", shortDesc: "Filed via portal / CSC partner" },
  { id: 5, key: "under_review", label: "Under Review", shortDesc: "Nodal task force & bank appraisal" },
  { id: 6, key: "completed", label: "Completed", shortDesc: "Loan sanctioned & subsidy credited" }
];

/**
 * Returns personalized checklist for a given scheme and user profile
 */
export function getPersonalizedChecklist(scheme, userProfile = {}) {
  if (!scheme) return [];

  const rawList = scheme.documentChecklist || [];
  const userCat = (userProfile.socialCategory || "General").toLowerCase();
  const isFemale = (userProfile.gender || "").toLowerCase() === "female";
  const userArea = (userProfile.area || "Urban").toLowerCase();

  return rawList.map((doc) => {
    let personalizedNote = "";
    let isHighPriority = doc.mandatory;

    if (doc.category === "category_certificate") {
      if (userCat === "sc" || userCat === "st") {
        personalizedNote = "Critical for 25%-35% affirmative action margin money subsidy claim.";
        isHighPriority = true;
      } else if (userCat === "obc") {
        personalizedNote = "Required by State Backward Classes Corporation for concessional 5% interest rate.";
        isHighPriority = true;
      } else if (isFemale) {
        personalizedNote = "Required for Women Entrepreneur priority allocation.";
      }
    } else if (doc.category === "business_document") {
      if (scheme.id === "pm-svanidhi") {
        personalizedNote = "Essential proof of street vending under Urban Local Body (ULB) bylaws.";
      } else if (scheme.id === "pm-vishwakarma") {
        personalizedNote = "Validates eligibility for the ₹15,000 modern toolkit e-voucher grant.";
      }
    } else if (doc.category === "address_proof" && userArea === "rural") {
      personalizedNote = "Gram Panchayat residency certificate qualifies for higher rural subsidy rates.";
    }

    const catObj = DOCUMENT_CATEGORIES.find((c) => c.id === doc.category);
    const categoryLabel = catObj ? catObj.label : "Document";

    return {
      ...doc,
      categoryLabel,
      personalizedNote,
      isHighPriority
    };
  });
}

/**
 * Reads document progress for a specific scheme from localStorage
 */
export function getDocumentProgress(schemeId) {
  if (!schemeId) return {};
  try {
    const raw = localStorage.getItem(`saarthi_doc_progress_${schemeId}`);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn("Could not read document progress from localStorage", e);
    return {};
  }
}

/**
 * Saves document progress for a specific scheme to localStorage
 */
export function saveDocumentProgress(schemeId, progressMap) {
  if (!schemeId) return;
  try {
    localStorage.setItem(`saarthi_doc_progress_${schemeId}`, JSON.stringify(progressMap));
  } catch (e) {
    console.warn("Could not write document progress to localStorage", e);
  }
}

/**
 * Calculates document completion metrics
 */
export function calculateDocumentCompletion(checklist = [], progressMap = {}) {
  if (!checklist || checklist.length === 0) {
    return { total: 0, completed: 0, percentage: 0, isReady: false, mandatoryTotal: 0, mandatoryCompleted: 0 };
  }

  const total = checklist.length;
  let completed = 0;
  let mandatoryTotal = 0;
  let mandatoryCompleted = 0;

  checklist.forEach((doc) => {
    if (doc.mandatory) mandatoryTotal++;
    if (progressMap[doc.id]) {
      completed++;
      if (doc.mandatory) mandatoryCompleted++;
    }
  });

  const percentage = Math.round((completed / total) * 100);
  const isReady = mandatoryTotal > 0 ? mandatoryCompleted === mandatoryTotal : completed === total;

  return {
    total,
    completed,
    percentage,
    isReady,
    mandatoryTotal,
    mandatoryCompleted
  };
}

/**
 * Pre-populated mock sample applications for prototype demonstration
 */
export const SAMPLE_MOCK_APPLICATIONS = [
  {
    id: "SAARTHI-2026-7821",
    schemeId: "pm-svanidhi",
    schemeName: "PM SVANidhi (Street Vendor's AtmaNirbhar Nidhi)",
    category: "Street Vendors & Urban Micro-sellers",
    applicantName: "Sunita Devi",
    requestedAmount: 20000,
    currentStatus: "Completed",
    statusStage: 6,
    submissionDate: "2026-08-14",
    lastUpdated: "2026-09-12",
    documentCompletion: 100,
    nextAction: "First tranche of ₹20,000 active. Repay regularly via UPI to claim quarterly 7% interest cashback.",
    disbursedAmount: 20000,
    nodalAgency: "State Bank of India (Chandni Chowk Branch)",
    isMockSample: true
  },
  {
    id: "SAARTHI-2026-5190",
    schemeId: "pm-vishwakarma",
    schemeName: "PM Vishwakarma Kaushal Samman",
    category: "Artisans & Traditional Craftsmen",
    applicantName: "Rajesh Prajapati",
    requestedAmount: 200000,
    currentStatus: "Under Review",
    statusStage: 5,
    submissionDate: "2026-09-02",
    lastUpdated: "2026-09-15",
    documentCompletion: 100,
    nextAction: "Nodal Task Force inspection completed. Lead Bank branch credit appraisal in progress.",
    disbursedAmount: 0,
    nodalAgency: "District Industries Centre (DIC) Varanasi",
    isMockSample: true
  },
  {
    id: "SAARTHI-2026-3419",
    schemeId: "mahila-coir-yojana",
    schemeName: "Mahila Coir Yojana",
    category: "Rural Women Artisans",
    applicantName: "Ananya Pillai",
    requestedAmount: 150000,
    currentStatus: "Application Submitted",
    statusStage: 4,
    submissionDate: "2026-09-10",
    lastUpdated: "2026-09-14",
    documentCompletion: 83,
    nextAction: "Awaiting physical document verification at Regional Coir Board Training Centre.",
    disbursedAmount: 0,
    nodalAgency: "Central Coir Research Institute / Lead Bank",
    isMockSample: true
  },
  {
    id: "SAARTHI-2026-1944",
    schemeId: "pmegp",
    schemeName: "Prime Minister's Employment Generation Programme (PMEGP)",
    category: "Micro Enterprises & Self-Employment",
    applicantName: "Vikram Rathod",
    requestedAmount: 1200000,
    currentStatus: "Documents Prepared",
    statusStage: 3,
    submissionDate: "2026-09-15",
    lastUpdated: "2026-09-16",
    documentCompletion: 67,
    nextAction: "Upload supplier machinery quotation and obtain Gram Panchayat rural certificate to finalize.",
    disbursedAmount: 0,
    nodalAgency: "KVIC State Directorate / Punjab National Bank",
    isMockSample: true
  }
];

/**
 * Gets all applications (active user application + sample mock records)
 */
export function getAllApplications() {
  const list = [...SAMPLE_MOCK_APPLICATIONS];
  try {
    const active = getActiveApplication();
    if (active) {
      // Put user application at the very top
      return [active, ...list];
    }
  } catch (e) {
    console.warn("Could not read user application", e);
  }
  return list;
}

/**
 * Reads user's active application record from localStorage
 */
export function getActiveApplication() {
  try {
    const raw = localStorage.getItem("saarthi_active_application");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn("Could not read active application", e);
    return null;
  }
}

/**
 * Creates or updates the user's active application record
 */
export function saveActiveApplication(appData) {
  try {
    const existing = getActiveApplication() || {};
    const updated = {
      ...existing,
      ...appData,
      lastUpdated: new Date().toISOString().split("T")[0]
    };
    if (!updated.id) {
      const rand = Math.floor(1000 + Math.random() * 9000);
      updated.id = `SAARTHI-2026-${rand}`;
    }
    if (!updated.submissionDate) {
      updated.submissionDate = new Date().toISOString().split("T")[0];
    }
    localStorage.setItem("saarthi_active_application", JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn("Could not save active application", e);
    return appData;
  }
}

/**
 * Updates application status to one of the 6 lifecycle stages
 */
export function updateApplicationStatus(stageNumber) {
  const stage = APPLICATION_STAGES.find((s) => s.id === Number(stageNumber));
  if (!stage) return null;

  let nextAction = "";
  if (stage.key === "details_submitted") {
    nextAction = "Profile registered. Select a recommended scheme to generate your personalized document checklist.";
  } else if (stage.key === "scheme_selected") {
    nextAction = "Scheme selected. Assemble mandatory identity, caste/category, and business documents.";
  } else if (stage.key === "documents_prepared") {
    nextAction = "All mandatory documents ready! Visit nearest CSC partner or official portal to file application.";
  } else if (stage.key === "application_submitted") {
    nextAction = "Application submitted. Under initial desk verification by implementing agency.";
  } else if (stage.key === "under_review") {
    nextAction = "Task force scrutiny completed. Financing bank branch is conducting credit appraisal.";
  } else if (stage.key === "completed") {
    nextAction = "Sanction approved! Loan disbursed in your bank account with applicable subsidy credit.";
  }

  return saveActiveApplication({
    currentStatus: stage.label,
    statusStage: stage.id,
    nextAction
  });
}

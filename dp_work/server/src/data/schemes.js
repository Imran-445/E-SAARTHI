export const schemes = [
  {
    id: "nsfdc-micro-credit",
    name: "NSFDC Micro-Credit Finance Scheme (Demo)",
    shortDescription: "Concessional collateral-free micro financing for eligible Scheduled Caste entrepreneurs establishing or expanding small micro-enterprises.",
    overview: "Concessional collateral-free micro financing specifically crafted for Scheduled Caste (SC) entrepreneurs establishing new micro-retail shops, service kiosks, or small trading ventures.",
    category: "SC & Marginalized Retail Enterprise",
    ministry: "Ministry of Social Justice & Empowerment (NSFDC)",
    targetDemographic: ["SC", "Scheduled Caste", "Women"],
    businessTypes: ["Micro Retail", "Small Retail Shop / Kirana / Grocery", "Street Vendor", "Service Enterprise", "Micro Manufacturing"],
    minLoan: 10000,
    maxLoan: 500000,
    subsidyRate: "5% Concessional Interest Rate + Margin Assistance",
    subsidyType: "Concessional Interest Subsidy",
    collateralRequired: false,
    interestRate: "5% p.a. Concessional",
    tenureMonths: 60,
    processingTimeDays: 14,
    overview: "Concessional collateral-free micro financing specifically crafted for Scheduled Caste (SC) entrepreneurs establishing new micro-retail shops, service kiosks, or small trading ventures.",
    eligibilityCriteria: [
      "Prototype record targets Scheduled Caste entrepreneurs.",
      "Designed for micro-retail, service, trading, and related small enterprise activities.",
      "Final eligibility should be verified with the concerned authority."
    ],
    documentsRequired: [
      "Scheduled Caste (SC) Category Certificate",
      "Aadhaar Card linked to Mobile",
      "Bank Account Passbook / Mandate",
      "Simple Project Estimate / Quotation"
    ],
    highlights: [
      "Collateral-free credit up to ₹5 Lakhs in the prototype record",
      "Concessional interest structure in the prototype record",
      "Application support through State Channelising Agencies"
    ],
    applicationUrl: "https://nsfdc.nic.in"
  },
  {
    id: "pm-svanidhi",
    name: "PM SVANidhi (Street Vendor's AtmaNirbhar Nidhi)",
    shortName: "PM SVANidhi",
    ministry: "Ministry of Housing and Urban Affairs (MoHUA)",
    category: "Street Vendors & Urban Micro-sellers",
    targetDemographic: ["Street Vendors", "Hawkers", "Women", "General", "SC", "ST", "OBC", "Minority"],
    businessTypes: ["Street Vendor", "Retail/Vending", "Micro Enterprise"],
    minLoan: 10000,
    maxLoan: 50000,
    subsidyRate: "7% Interest Subsidy + up to ₹1,200/yr digital cashback",
    subsidyType: "Interest Concession",
    collateralRequired: false,
    interestRate: "Subsidized (~7% effectively)",
    tenureMonths: 12,
    processingTimeDays: 7,
    overview: "Affordable collateral-free working capital loan designed specifically for urban and peri-urban street vendors to resume or scale their livelihoods.",
    eligibilityCriteria: [
      "Must be engaged in vending in urban areas on or before March 24, 2020 (or verified by Local Urban Body).",
      "Possession of Certificate of Vending or Identity Card issued by Urban Local Bodies (ULBs).",
      "Street vendors left out of survey can apply through Letter of Recommendation (LoR).",
      "No minimum educational qualification required."
    ],
    documentsRequired: [
      "Aadhaar Card linked with Mobile Number",
      "Certificate of Vending (CoV) or ULB Identity Card or Letter of Recommendation",
      "Active Savings Bank Account Passbook",
      "Recent passport-size photograph"
    ],
    highlights: [
      "₹10,000 first tranche; escalates to ₹20,000 and ₹50,000 on timely repayment",
      "7% interest subsidy credited directly to bank account on quarterly basis",
      "Zero penalty on early repayment",
      "Digital transaction rewards up to ₹100 per month"
    ],
    applicationUrl: "https://pmsvanidhi.mohua.gov.in"
  },
  {
    id: "stand-up-india",
    name: "Stand-Up India Scheme",
    shortName: "Stand-Up India",
    ministry: "Ministry of Finance, Department of Financial Services (DFS)",
    category: "Women & SC/ST Entrepreneurs",
    targetDemographic: ["Women", "SC", "ST"],
    businessTypes: ["Manufacturing", "Service", "Trading", "Agri-Allied"],
    minLoan: 1000000,
    maxLoan: 10000000,
    subsidyRate: "Credit Guarantee + Margin Money Support up to 15%",
    subsidyType: "Credit Guarantee / Margin Subsidy",
    collateralRequired: false,
    interestRate: "Lowest applicable bank rate (MCLR + 3% + tenor premium)",
    tenureMonths: 84,
    processingTimeDays: 21,
    overview: "Facilitates bank loans between ₹10 lakh and ₹1 crore to at least one Scheduled Caste (SC) or Scheduled Tribe (ST) borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise.",
    eligibilityCriteria: [
      "Borrower must be SC/ST and/or Woman entrepreneur above 18 years of age.",
      "Loan is available only for greenfield (first-time) ventures in manufacturing, services, agri-allied activities, or trading sector.",
      "In non-individual enterprises, at least 51% shareholding and controlling stake must be held by SC/ST and/or Women.",
      "Borrower should not be in default to any bank or financial institution."
    ],
    documentsRequired: [
      "Proof of Identity (Voter ID / Passport / Driving License / PAN / Aadhaar)",
      "Proof of Residence",
      "Proof of SC/ST category certificate (for SC/ST applicants)",
      "Project Report with projected cash flows and machinery quotations",
      "Udyam Registration Certificate",
      "Bank Account Statements of past 6 months"
    ],
    highlights: [
      "Covers up to 85% of total project cost",
      "Moratorium period of up to 18 months",
      "Collateral-free backed by Credit Guarantee Scheme for Stand-Up India (CGSSI)",
      "Handholding support through Lead District Managers and SIDBI portals"
    ],
    applicationUrl: "https://www.standupmitra.in"
  },
  {
    id: "pmegp",
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    shortName: "PMEGP",
    ministry: "Ministry of Micro, Small and Medium Enterprises (MoMSME)",
    category: "Micro Enterprises & Self-Employment",
    targetDemographic: ["SC", "ST", "OBC", "Women", "Minority", "Differently Abled", "General"],
    businessTypes: ["Manufacturing", "Service", "Agri-Allied"],
    minLoan: 500000,
    maxLoan: 5000000,
    subsidyRate: "25% to 35% Capital Subsidy (Margin Money) for marginalized groups",
    subsidyType: "Capital Subsidy",
    collateralRequired: false,
    interestRate: "Standard Commercial Bank MSME rate (~8.5% - 10.5%)",
    tenureMonths: 60,
    processingTimeDays: 30,
    overview: "A flagship credit-linked subsidy programme aimed at generating self-employment opportunities through establishment of micro-enterprises in non-farm sector.",
    eligibilityCriteria: [
      "Any individual above 18 years of age.",
      "At least VIII standard pass for projects costing above ₹10 lakh in manufacturing and ₹5 lakh in service sector.",
      "Special category (SC/ST/OBC/Minorities/Women/Ex-servicemen/PH) gets 35% subsidy in rural areas and 25% in urban areas.",
      "Beneficiary contribution is only 5% of project cost for special categories (10% for general)."
    ],
    documentsRequired: [
      "Aadhaar Card and PAN Card",
      "Caste / Category Certificate for SC, ST, OBC, Minority, Differently-Abled",
      "Educational Qualification Certificate (8th pass or higher)",
      "Detailed Project Report (DPR) / Business Plan",
      "Rural Area Certificate (issued by Gram Panchayat / BDO) if claiming rural benefit",
      "EDP (Entrepreneurship Development Programme) Training Certificate (post approval)"
    ],
    highlights: [
      "Project limit: ₹50 Lakh for Manufacturing, ₹20 Lakh for Service sector",
      "Government deposits Margin Money (subsidy) in an escrow account for 3 years, after which it adjusts against loan",
      "Second loan up to ₹1 Crore available for successful PMEGP units for expansion",
      "Collateral free up to ₹10 Lakh (covered under CGTMSE)"
    ],
    applicationUrl: "https://www.kviconline.gov.in/pmegpeportal"
  },
  {
    id: "pm-vishwakarma",
    name: "PM Vishwakarma Scheme",
    shortName: "PM Vishwakarma",
    ministry: "Ministry of MSME & Ministry of Skill Development and Entrepreneurship",
    category: "Artisans & Traditional Craftsmen",
    targetDemographic: ["Artisans", "OBC", "SC", "ST", "Women", "Minority", "General"],
    businessTypes: ["Artisan/Handicraft", "Service", "Manufacturing"],
    minLoan: 100000,
    maxLoan: 300000,
    subsidyRate: "₹15,000 Toolkit Grant + 8% Interest Subvention (Effective Interest 5%)",
    subsidyType: "Grant & Interest Subvention",
    collateralRequired: false,
    interestRate: "Concessional 5% fixed interest rate",
    tenureMonths: 36,
    processingTimeDays: 14,
    overview: "Comprehensive support for traditional artisans and craftspeople working with their hands and tools across 18 notified traditional trades.",
    eligibilityCriteria: [
      "Must be engaged in one of the 18 specified traditional family-based crafts (e.g. Carpenter, Blacksmith, Potter, Sculptor, Cobbler, Tailor, Weaver, Barber, Washerman).",
      "Minimum age of 18 years on date of registration.",
      "Beneficiary should not have availed similar loans under PMEGP, PM SVANidhi, or Mudra in past 5 years.",
      "Registration restricted to one member per family."
    ],
    documentsRequired: [
      "Aadhaar Card",
      "Active Mobile number linked to Aadhaar",
      "Bank Account details (Passbook / Cancelled Cheque)",
      "Ration Card or Family details"
    ],
    highlights: [
      "Free PM Vishwakarma Certificate and ID Card recognition",
      "Skill training: 5-7 days basic and 15+ days advanced with ₹500/day stipend",
      "₹15,000 modern toolkit incentive e-voucher",
      "Collateral-free Enterprise Development Loan: 1st tranche ₹1,00,000 (18 months); 2nd tranche ₹2,00,000 (30 months) at only 5% interest"
    ],
    applicationUrl: "https://pmvishwakarma.gov.in"
  },
  {
    id: "pm-mudra-yojana",
    name: "Pradhan Mantri MUDRA Yojana (PMMY)",
    shortName: "PM MUDRA Yojana",
    ministry: "Department of Financial Services, Ministry of Finance",
    category: "Micro Enterprises & Small Retail",
    targetDemographic: ["Women", "SC", "ST", "OBC", "Minority", "General", "Street Vendors"],
    businessTypes: ["Retail/Vending", "Micro Enterprise", "Service", "Manufacturing", "Agri-Allied"],
    minLoan: 50000,
    maxLoan: 2000000,
    subsidyRate: "Zero Processing Fee for Shishu/Kishore + Guarantee Coverage (CGFMU)",
    subsidyType: "Credit Guarantee / Zero Processing Fee",
    collateralRequired: false,
    interestRate: "Competitive bank rates (8.4% - 11.5%)",
    tenureMonths: 60,
    processingTimeDays: 10,
    overview: "Provides collateral-free formal credit to non-corporate, non-farm small and micro enterprises up to ₹20 lakh through commercial banks, RRBs, Small Finance Banks, and MFIs.",
    eligibilityCriteria: [
      "Any Indian citizen who has a viable business plan for a non-farm income generating activity.",
      "Categorized in four tiers: Shishu (up to ₹50k), Kishore (₹50k to ₹5 Lakh), Tarun (₹5 Lakh to ₹10 Lakh), and Tarun Plus (₹10 Lakh to ₹20 Lakh).",
      "Applicant must not have defaulted with any financial institution.",
      "Women entrepreneurs get special concessional interest rate from select public sector banks."
    ],
    documentsRequired: [
      "Proof of Identity and Proof of Address (Voter ID, Aadhaar, PAN)",
      "Proof of Business Registration / Udyam Certificate (if available)",
      "Quotations of machinery or items to be purchased",
      "Past 6 months bank statement",
      "Category certificate (for SC/ST/OBC/Minority status confirmation)"
    ],
    highlights: [
      "No collateral or third-party guarantee required",
      "Over 68% of MUDRA loans nationally sanctioned to women entrepreneurs",
      "MUDRA Card provided for flexible working capital withdrawals",
      "Loan ceiling expanded to ₹20 Lakh under Union Budget 2024"
    ],
    applicationUrl: "https://www.mudra.org.in"
  },
  {
    id: "mahila-samridhi-yojana",
    name: "Mahila Samridhi Yojana (NSFDC)",
    shortName: "Mahila Samridhi",
    ministry: "National Scheduled Castes Finance and Development Corporation (NSFDC)",
    category: "SC Women Micro-Entrepreneurs",
    targetDemographic: ["Women", "SC"],
    businessTypes: ["Micro Enterprise", "Street Vendor", "Artisan/Handicraft", "Retail/Vending"],
    minLoan: 25000,
    maxLoan: 140000,
    subsidyRate: "High interest subsidy: Borrow at only 4% per annum",
    subsidyType: "Interest Subsidy / Direct Microfinance",
    collateralRequired: false,
    interestRate: "4% per annum concessional",
    tenureMonths: 36,
    processingTimeDays: 14,
    overview: "Targeted micro-credit scheme directly empowering women entrepreneurs belonging to Scheduled Castes living below double the poverty line.",
    eligibilityCriteria: [
      "Applicant must be a woman belonging to the Scheduled Caste community.",
      "Annual household family income should be below ₹3,00,000 per annum.",
      "Age of applicant should be between 18 and 50 years.",
      "Intends to start or augment income-generating micro-business."
    ],
    documentsRequired: [
      "Caste Certificate issued by Revenue Authority",
      "Income Certificate",
      "Aadhaar Card and Voter ID",
      "Savings Bank Account linked with Aadhaar",
      "Passport size photos"
    ],
    highlights: [
      "Unit cost up to ₹1,40,000 with 95% NSFDC loan component",
      "Extremely affordable 4% annual interest rate",
      "Implementation through State Channelizing Agencies (SCAs) and self-help groups",
      "Flexible repayment schedule over 3 years"
    ],
    applicationUrl: "https://nsfdc.nic.in"
  },
  {
    id: "mahila-coir-yojana",
    name: "Mahila Coir Yojana",
    shortName: "Mahila Coir",
    ministry: "Ministry of MSME / Coir Board",
    category: "Rural Women Artisans",
    targetDemographic: ["Women", "Rural", "OBC", "SC", "ST"],
    businessTypes: ["Artisan/Handicraft", "Manufacturing"],
    minLoan: 20000,
    maxLoan: 250000,
    subsidyRate: "75% Capital Subsidy on procurement of motorized ratts/machinery",
    subsidyType: "Capital Subsidy",
    collateralRequired: false,
    interestRate: "Only on balance 25% if bank financed (~7%-9%)",
    tenureMonths: 36,
    processingTimeDays: 20,
    overview: "A female-centric welfare scheme aimed at empowering rural women artisans in coconut and coir producing states with modern motorized equipment and direct capital subsidy.",
    eligibilityCriteria: [
      "Rural women trained in spinning of coir yarn through recognized Coir Board training centers.",
      "Only one beneficiary per household.",
      "Applicant must be at least 18 years of age."
    ],
    documentsRequired: [
      "Coir Board Training Certificate",
      "Aadhaar Card and Resident Proof",
      "Bank Account Details",
      "Self-declaration of family income"
    ],
    highlights: [
      "75% government subsidy on cost of motorized ratt / spinning equipment",
      "Skill training with monthly stipend provided before equipment distribution",
      "Direct linkage with cooperative societies for raw material supply and yarn buy-back"
    ],
    applicationUrl: "https://coirboard.gov.in"
  },
  {
    id: "nssh-subsidy",
    name: "National SC-ST Hub Special Credit Linked Capital Subsidy (SCLCSS)",
    shortName: "NSSH SCLCSS",
    ministry: "Ministry of MSME / National Small Industries Corporation (NSIC)",
    category: "SC/ST Enterprises Technology Upgradation",
    targetDemographic: ["SC", "ST"],
    businessTypes: ["Manufacturing", "Service"],
    minLoan: 500000,
    maxLoan: 10000000,
    subsidyRate: "25% upfront capital subsidy on plant and machinery",
    subsidyType: "Upfront Capital Subsidy",
    collateralRequired: false,
    interestRate: "Standard MSME bank rate",
    tenureMonths: 84,
    processingTimeDays: 25,
    overview: "Provides 25% upfront capital subsidy for procurement of plant & machinery / equipment for technology upgradation to SC/ST owned micro and small enterprises.",
    eligibilityCriteria: [
      "Sole Proprietorship / Partnership / Private Limited with 100% SC/ST ownership.",
      "Must have valid Udyam Registration.",
      "Eligible for both new and existing micro & small enterprises."
    ],
    documentsRequired: [
      "Udyam Registration Certificate",
      "Caste Certificate of all promoters/partners",
      "Machinery Proforma Invoices and Chartered Engineer Certificate",
      "Audited financial statements (if existing enterprise)",
      "Bank loan sanction letter"
    ],
    highlights: [
      "25% upfront capital subsidy capped at ₹25 Lakh",
      "Access to public procurement: 4% mandatory annual procurement target from SC/ST MSMEs by CPSEs",
      "Special reimbursement on registration fees for testing, rating, and international exhibitions"
    ],
    applicationUrl: "https://www.scsthub.in"
  }
];

export const schemeCategories = [
  "All Categories",
  "Street Vendors & Urban Micro-sellers",
  "Women & SC/ST Entrepreneurs",
  "Micro Enterprises & Self-Employment",
  "Artisans & Traditional Craftsmen",
  "Rural Women Artisans",
  "SC/ST Enterprises Technology Upgradation"
];

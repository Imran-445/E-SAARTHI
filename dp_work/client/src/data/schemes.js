/**
 * Saarthi (SIH 2026) - Structured Demo Scheme Database
 * 
 * IMPORTANT: These are prototype/demo scheme records created for evaluation.
 * Where official verification is unavailable, status is marked as 'Demo Scheme Data'.
 * Structure allows verified official government schemes to be seamlessly inserted later.
 */

const BASE_DEMO_SCHEMES = [
  {
    id: "nsfdc-micro-credit",
    name: "NSFDC Micro-Credit Finance Scheme (Demo)",
    shortDescription: "Concessional collateral-free micro financing specifically crafted for Scheduled Caste (SC) entrepreneurs establishing new micro-retail shops, service kiosks, or small trading ventures.",
    overview: "Concessional collateral-free micro financing specifically crafted for Scheduled Caste (SC) entrepreneurs establishing new micro-retail shops, service kiosks, or small trading ventures.",
    category: "SC & Marginalized Retail Enterprise",
    ministry: "Ministry of Social Justice & Empowerment (NSFDC)",
    purpose: [
      "Start a Small Business",
      "Business Setup",
      "Working Capital",
      "Equipment & Machinery",
      "New Enterprise Setup"
    ],
    eligibleSocialCategories: [
      "SC",
      "Scheduled Caste"
    ],
    targetDemographic: [
      "SC",
      "Scheduled Caste",
      "Women"
    ],
    eligibleBusinessTypes: [
      "Micro Retail",
      "Small Retail Shop / Kirana / Grocery",
      "Street Vendor",
      "Service Enterprise",
      "Micro Manufacturing"
    ],
    businessTypes: [
      "Micro Retail",
      "Small Retail Shop / Kirana / Grocery",
      "Street Vendor",
      "Service Enterprise"
    ],
    eligibleBusinessStages: [
      "New Venture",
      "New Venture / Greenfield Project",
      "Early Stage",
      "Early Stage (< 1 Year)",
      "Existing & Operational"
    ],
    eligibleSectors: [
      "Retail Grocery, Kirana & General Stores",
      "Personal Care, Beauty & Tailoring",
      "Textiles, Handloom & Garments",
      "All"
    ],
    minIncome: 0,
    maxIncome: 600000,
    minLoanAmount: 10000,
    maxLoanAmount: 500000,
    minLoan: 10000,
    maxLoan: 500000,
    subsidyRate: "5% Concessional Interest Rate + Margin Assistance",
    subsidyType: "Concessional Interest Subsidy",
    collateralRequired: false,
    fundingTypes: [
      "Collateral-Free Microcredit",
      "Term Loan",
      "Concessional Interest Loan",
      "Any / Best Available"
    ],
    educationRequirements: "No Minimum Educational Qualification Required",
    eligibleLocations: [
      "Rural",
      "Urban",
      "Within District",
      "Within State",
      "All"
    ],
    interestRate: "5% p.a. Concessional",
    moratorium: "6 Months",
    repaymentPeriod: "36 to 60 Months",
    requiredDocuments: [
      "Scheduled Caste (SC) Category Certificate",
      "Aadhaar Card linked to Mobile",
      "Bank Account Passbook / Mandate",
      "Simple Project Estimate / Quotation"
    ],
    benefits: [
      "100% Collateral-free credit up to ₹5 Lakhs",
      "Subsidized 5% annual interest rate",
      "Zero processing fee for first-time greenfield ventures",
      "Fast-tracked application through State Channelising Agencies"
    ],
    source: "National Scheduled Castes Finance & Development Corporation (NSFDC Prototype Framework)",
    lastUpdated: "September 2026",
    verificationStatus: "Demo Scheme Data - Verify final eligibility with the concerned authority."
  },
  {
    id: "pm-svanidhi",
    name: "PM SVANidhi Micro Credit Scheme (Demo)",
    shortDescription: "Affordable collateral-free working capital loan designed for street vendors, thela operators, and micro-hawkers with 7% interest subsidy and digital cashbacks.",
    overview: "Affordable collateral-free working capital loan designed for street vendors, thela operators, and micro-hawkers with 7% interest subsidy and digital cashbacks.",
    category: "Street Vendors & Micro Sellers",
    ministry: "Ministry of Housing and Urban Affairs (MoHUA)",
    purpose: [
      "Working Capital",
      "Marketing & Vending Cart",
      "Equipment & Machinery",
      "Start a Small Business"
    ],
    eligibleSocialCategories: [
      "All",
      "Street/Micro Vendor",
      "SC",
      "ST",
      "OBC",
      "Women",
      "Minority",
      "General",
      "Transgender",
      "Person with Disability"
    ],
    targetDemographic: [
      "Street/Micro Vendor",
      "Street Vendors",
      "Hawkers",
      "Women",
      "SC",
      "ST",
      "OBC"
    ],
    eligibleBusinessTypes: [
      "Street Vendor",
      "Street Vendor / Hawker / Thela",
      "Micro Retail",
      "Small Retail Shop / Kirana / Grocery"
    ],
    businessTypes: [
      "Street Vendor",
      "Retail/Vending",
      "Micro Retail"
    ],
    eligibleBusinessStages: [
      "Existing & Operational",
      "Early Stage",
      "Early Stage (< 1 Year)",
      "New Venture"
    ],
    eligibleSectors: [
      "Retail Grocery, Kirana & General Stores",
      "Food Processing, Bakeries & Agro-Products",
      "Personal Care, Beauty & Tailoring",
      "All"
    ],
    minIncome: 0,
    maxIncome: 300000,
    minLoanAmount: 10000,
    maxLoanAmount: 50000,
    minLoan: 10000,
    maxLoan: 50000,
    subsidyRate: "7% Interest Subsidy + ₹1,200/yr digital cashback",
    subsidyType: "Interest Concession",
    collateralRequired: false,
    fundingTypes: [
      "Collateral-Free Microcredit",
      "Working Capital / CC Limit",
      "Any / Best Available"
    ],
    educationRequirements: "No educational qualification required",
    eligibleLocations: [
      "Urban",
      "Within District",
      "Within State",
      "All"
    ],
    interestRate: "Subsidized (~7% effective rate)",
    moratorium: "None",
    repaymentPeriod: "12 to 36 Months",
    requiredDocuments: [
      "Aadhaar Card with linked Mobile Number",
      "Certificate of Vending (CoV) or Letter of Recommendation (LoR)",
      "Savings Bank Account Passbook",
      "Passport-size photo"
    ],
    benefits: [
      "₹10,000 first tranche; escalates to ₹20,000 and ₹50,000 on prompt repayment",
      "7% interest subsidy directly credited quarterly into bank account",
      "Digital transaction rewards up to ₹100/month",
      "Zero prepayment penalties"
    ],
    source: "MoHUA Street Vendors AtmaNirbhar Nidhi Guidelines (Demo Model)",
    lastUpdated: "September 2026",
    verificationStatus: "Demo Scheme Data - Verify final eligibility with the concerned authority."
  },
  {
    id: "pm-mudra-yojana",
    name: "PM MUDRA Yojana — Shishu & Kishore (Demo)",
    shortDescription: "Collateral-free formal banking credit for non-corporate micro and small enterprises in trading, manufacturing, and services up to ₹5 Lakh.",
    overview: "Collateral-free formal banking credit for non-corporate micro and small enterprises in trading, manufacturing, and services up to ₹5 Lakh.",
    category: "Micro Enterprises & Retail Stores",
    ministry: "Department of Financial Services, Ministry of Finance",
    purpose: [
      "Start a Small Business",
      "Business Setup",
      "Working Capital",
      "Equipment & Machinery",
      "Expansion & Modernization"
    ],
    eligibleSocialCategories: [
      "All",
      "General",
      "SC",
      "ST",
      "OBC",
      "Women",
      "Minority",
      "Transgender",
      "Person with Disability",
      "Street/Micro Vendor"
    ],
    targetDemographic: [
      "General",
      "SC",
      "ST",
      "OBC",
      "Women",
      "Minority"
    ],
    eligibleBusinessTypes: [
      "Micro Retail",
      "Small Retail Shop / Kirana / Grocery",
      "Street Vendor",
      "Service Enterprise",
      "Micro Manufacturing",
      "Agri-Allied"
    ],
    businessTypes: [
      "Micro Retail",
      "Retail/Vending",
      "Service Enterprise",
      "Micro Manufacturing"
    ],
    eligibleBusinessStages: [
      "New Venture",
      "New Venture / Greenfield Project",
      "Early Stage",
      "Early Stage (< 1 Year)",
      "Existing & Operational",
      "Expansion / Modernization"
    ],
    eligibleSectors: [
      "Retail Grocery, Kirana & General Stores",
      "Personal Care, Beauty & Tailoring",
      "Electrical, Automobile & Device Repair",
      "Textiles, Handloom & Garments",
      "All"
    ],
    minIncome: 0,
    maxIncome: 1500000,
    minLoanAmount: 50000,
    maxLoanAmount: 2000000,
    minLoan: 50000,
    maxLoan: 2000000,
    subsidyRate: "Zero Processing Fee + Credit Guarantee (CGFMU)",
    subsidyType: "Credit Guarantee / Low Processing Fee",
    collateralRequired: false,
    fundingTypes: [
      "Collateral-Free Microcredit",
      "Term Loan",
      "Working Capital / CC Limit",
      "Any / Best Available"
    ],
    educationRequirements: "No minimum educational requirement",
    eligibleLocations: [
      "Rural",
      "Urban",
      "Within District",
      "Within State",
      "Pan-India",
      "All"
    ],
    interestRate: "8.5% - 11.5% Competitive MSME Bank Rate",
    moratorium: "Up to 6 Months",
    repaymentPeriod: "36 to 60 Months",
    requiredDocuments: [
      "Aadhaar Card and PAN Card",
      "Business Address Proof / Shop Establishment / Udyam",
      "Quotations of Stock / Machinery to be purchased",
      "Past 6 Months Bank Statement"
    ],
    benefits: [
      "100% collateral-free under National Credit Guarantee Scheme (CGFMU)",
      "MUDRA RuPay card for flexible working capital withdrawals",
      "Available across all Public, Private, and Rural Regional Banks (RRBs)"
    ],
    source: "Pradhan Mantri MUDRA Yojana Prototype Operational Framework",
    lastUpdated: "September 2026",
    verificationStatus: "Demo Scheme Data - Verify final eligibility with the concerned authority."
  },
  {
    id: "pmegp",
    name: "Prime Minister's Employment Generation Programme (PMEGP Demo)",
    shortDescription: "Flagship credit-linked subsidy programme offering 25% (urban) to 35% (rural) margin money grant for greenfield micro-enterprises in manufacturing and services.",
    overview: "Flagship credit-linked subsidy programme offering 25% (urban) to 35% (rural) margin money grant for greenfield micro-enterprises in manufacturing and services.",
    category: "Micro Enterprises & Self-Employment",
    ministry: "Ministry of Micro, Small and Medium Enterprises (MoMSME)",
    purpose: [
      "Start a Small Business",
      "Business Setup",
      "Equipment & Machinery",
      "Expansion & Modernization"
    ],
    eligibleSocialCategories: [
      "SC",
      "ST",
      "OBC",
      "Women",
      "Minority",
      "Person with Disability",
      "General",
      "Transgender"
    ],
    targetDemographic: [
      "SC",
      "ST",
      "OBC",
      "Women",
      "Minority",
      "Differently Abled",
      "General"
    ],
    eligibleBusinessTypes: [
      "Micro Manufacturing",
      "Micro Manufacturing / Workshop Unit",
      "Service Enterprise",
      "Personal Services / Repair / Tailoring",
      "Agri-Allied",
      "Traditional Artisan"
    ],
    businessTypes: [
      "Micro Manufacturing",
      "Service Enterprise",
      "Agri-Allied"
    ],
    eligibleBusinessStages: [
      "New Venture",
      "New Venture / Greenfield Project"
    ],
    eligibleSectors: [
      "Textiles, Handloom & Garments",
      "Food Processing, Bakeries & Agro-Products",
      "Carpentry, Woodwork & Bamboo",
      "Metalwork, Blacksmithy & Welding",
      "Leather & Footwear Manufacturing",
      "All"
    ],
    minIncome: 0,
    maxIncome: 2500000,
    minLoanAmount: 500000,
    maxLoanAmount: 5000000,
    minLoan: 500000,
    maxLoan: 5000000,
    subsidyRate: "25% to 35% Capital Subsidy (Margin Money)",
    subsidyType: "Capital Subsidy",
    collateralRequired: false,
    fundingTypes: [
      "Capital Subsidy / Margin Money",
      "Term Loan",
      "Any / Best Available"
    ],
    educationRequirements: "At least 8th Pass for projects > ₹10 Lakh (Mfg) or > ₹5 Lakh (Services)",
    eligibleLocations: [
      "Rural",
      "Urban",
      "Within State",
      "Pan-India",
      "All"
    ],
    interestRate: "Commercial Bank MSME Rate (~8.5% - 10.5%)",
    moratorium: "Up to 12 Months",
    repaymentPeriod: "3 to 7 Years",
    requiredDocuments: [
      "Aadhaar Card and PAN Card",
      "Caste / Category Certificate (for 35% subsidy claim)",
      "Educational Qualification Certificate (8th pass or higher)",
      "Detailed Project Report (DPR) / Business Plan",
      "Rural Area Certificate if claiming 35% rural benefit"
    ],
    benefits: [
      "35% non-refundable government margin subsidy for special categories in rural areas",
      "Beneficiary own contribution is only 5% of total project cost",
      "Direct bank escrow disbursement under CGTMSE collateral guarantee",
      "Second loan up to ₹1 Crore for successful units to expand"
    ],
    source: "Khadi and Village Industries Commission (KVIC) Demo Portal",
    lastUpdated: "September 2026",
    verificationStatus: "Demo Scheme Data - Verify final eligibility with the concerned authority."
  },
  {
    id: "pm-vishwakarma",
    name: "PM Vishwakarma Kaushal Samman (Demo)",
    shortDescription: "Comprehensive holistic assistance for traditional artisans and craftspeople working with their hands and tools across 18 notified traditional trades.",
    overview: "Comprehensive holistic assistance for traditional artisans and craftspeople working with their hands and tools across 18 notified traditional trades.",
    category: "Artisans & Traditional Craftsmen",
    ministry: "Ministry of MSME & Skill Development",
    purpose: [
      "Equipment & Machinery",
      "Working Capital",
      "Marketing & Vending Cart",
      "Start a Small Business"
    ],
    eligibleSocialCategories: [
      "Rural Artisan",
      "OBC",
      "SC",
      "ST",
      "Women",
      "Minority",
      "General",
      "All"
    ],
    targetDemographic: [
      "Rural Artisan",
      "Artisans",
      "OBC",
      "SC",
      "ST",
      "Women"
    ],
    eligibleBusinessTypes: [
      "Traditional Artisan",
      "Traditional Artisan / Handicrafts",
      "Service Enterprise"
    ],
    businessTypes: [
      "Traditional Artisan",
      "Artisan/Handicraft",
      "Service Enterprise"
    ],
    eligibleBusinessStages: [
      "Existing & Operational",
      "Early Stage",
      "Early Stage (< 1 Year)",
      "New Venture"
    ],
    eligibleSectors: [
      "Traditional Handicrafts & Clay/Pottery",
      "Carpentry, Woodwork & Bamboo",
      "Metalwork, Blacksmithy & Welding",
      "Leather & Footwear Manufacturing",
      "Construction, Masonry & Plumbing",
      "All"
    ],
    minIncome: 0,
    maxIncome: 400000,
    minLoanAmount: 100000,
    maxLoanAmount: 300000,
    minLoan: 100000,
    maxLoan: 300000,
    subsidyRate: "₹15,000 Toolkit Grant + 8% Interest Subvention",
    subsidyType: "Grant & Concessional Interest",
    collateralRequired: false,
    fundingTypes: [
      "Collateral-Free Microcredit",
      "Concessional Interest Loan",
      "Any / Best Available"
    ],
    educationRequirements: "No educational qualification required",
    eligibleLocations: [
      "Rural",
      "Urban",
      "Within District",
      "Within State",
      "All"
    ],
    interestRate: "5% Fixed Concessional Interest Rate",
    moratorium: "Up to 6 Months",
    repaymentPeriod: "18 Months (Tranche 1), 30 Months (Tranche 2)",
    requiredDocuments: [
      "Aadhaar Card linked to active mobile",
      "Ration Card / Family details",
      "Bank Account Details (Passbook copy)",
      "Artisan trade self-declaration"
    ],
    benefits: [
      "PM Vishwakarma Certificate & National Artisan ID Card",
      "₹15,000 modern toolkit incentive e-voucher",
      "5-7 days basic skill training with ₹500/day stipend",
      "Collateral-free credit: ₹1 Lakh tranche 1 and ₹2 Lakh tranche 2 at only 5% interest"
    ],
    source: "PM Vishwakarma National Portal Demo Guidelines",
    lastUpdated: "September 2026",
    verificationStatus: "Demo Scheme Data - Verify final eligibility with the concerned authority."
  },
  {
    id: "stand-up-india",
    name: "Stand-Up India Scheme (Demo)",
    shortDescription: "Bank loans between ₹10 lakh and ₹1 crore to at least one SC or ST borrower and at least one woman borrower per bank branch for setting up greenfield enterprises.",
    overview: "Bank loans between ₹10 lakh and ₹1 crore to at least one SC or ST borrower and at least one woman borrower per bank branch for setting up greenfield enterprises.",
    category: "Women & SC/ST Entrepreneurs",
    ministry: "Ministry of Finance, Department of Financial Services (DFS)",
    purpose: [
      "Start a Small Business",
      "Business Setup",
      "Equipment & Machinery",
      "Expansion & Modernization"
    ],
    eligibleSocialCategories: [
      "Women",
      "SC",
      "ST",
      "Scheduled Caste"
    ],
    targetDemographic: [
      "Women",
      "SC",
      "ST"
    ],
    eligibleBusinessTypes: [
      "Micro Manufacturing",
      "Micro Manufacturing / Workshop Unit",
      "Service Enterprise",
      "Agri-Allied",
      "Micro Retail"
    ],
    businessTypes: [
      "Micro Manufacturing",
      "Service Enterprise",
      "Agri-Allied",
      "Trading"
    ],
    eligibleBusinessStages: [
      "New Venture",
      "New Venture / Greenfield Project"
    ],
    eligibleSectors: [
      "Textiles, Handloom & Garments",
      "Food Processing, Bakeries & Agro-Products",
      "Digital Services, CSC & IT Support",
      "All"
    ],
    minIncome: 0,
    maxIncome: 10000000,
    minLoanAmount: 1000000,
    maxLoanAmount: 10000000,
    minLoan: 1000000,
    maxLoan: 10000000,
    subsidyRate: "Credit Guarantee + Margin Money Support up to 15%",
    subsidyType: "Credit Guarantee / Margin Support",
    collateralRequired: false,
    fundingTypes: [
      "Term Loan",
      "Working Capital / CC Limit",
      "Any / Best Available"
    ],
    educationRequirements: "10th Pass or Higher Recommended",
    eligibleLocations: [
      "Rural",
      "Urban",
      "Pan-India",
      "All"
    ],
    interestRate: "Lowest bank rate (MCLR + 3% tenor premium)",
    moratorium: "Up to 18 Months",
    repaymentPeriod: "Up to 7 Years",
    requiredDocuments: [
      "Proof of Identity & Proof of Residence",
      "SC/ST Category Certificate or Woman Entrepreneur declaration",
      "Project Report with machinery quotations & projected cash flow",
      "Udyam Registration Certificate"
    ],
    benefits: [
      "Covers up to 85% of total project cost",
      "Moratorium period of up to 18 months",
      "Collateral-free credit backed by CGSSI guarantee",
      "Handholding support via Lead District Managers & SIDBI"
    ],
    source: "Stand-Up Mitra Portal Prototype Model",
    lastUpdated: "September 2026",
    verificationStatus: "Demo Scheme Data - Verify final eligibility with the concerned authority."
  },
  {
    id: "mahila-samridhi-yojana",
    name: "Mahila Samridhi Yojana (NSFDC Demo)",
    shortDescription: "Targeted concessional micro-credit scheme empowering women entrepreneurs from Scheduled Castes with low-interest seed capital up to ₹1.4 Lakh.",
    overview: "Targeted concessional micro-credit scheme empowering women entrepreneurs from Scheduled Castes with low-interest seed capital up to ₹1.4 Lakh.",
    category: "SC Women Micro-Entrepreneurs",
    ministry: "National Scheduled Castes Finance and Development Corporation",
    purpose: [
      "Start a Small Business",
      "Business Setup",
      "Working Capital",
      "Equipment & Machinery"
    ],
    requiredSocialCategories: ["Women", "SC"],
    eligibleSocialCategories: [
      "Women",
      "SC",
      "Scheduled Caste",
      "SHG"
    ],
    targetDemographic: [
      "Women",
      "SC"
    ],
    eligibleBusinessTypes: [
      "Micro Retail",
      "Small Retail Shop / Kirana / Grocery",
      "Street Vendor",
      "Traditional Artisan",
      "Service Enterprise",
      "SHG Enterprise"
    ],
    businessTypes: [
      "Micro Retail",
      "Street Vendor",
      "Traditional Artisan",
      "SHG Enterprise"
    ],
    eligibleBusinessStages: [
      "New Venture",
      "Early Stage",
      "Early Stage (< 1 Year)",
      "Existing & Operational"
    ],
    eligibleSectors: [
      "Personal Care, Beauty & Tailoring",
      "Retail Grocery, Kirana & General Stores",
      "Traditional Handicrafts & Clay/Pottery",
      "All"
    ],
    minIncome: 0,
    maxIncome: 300000,
    minLoanAmount: 25000,
    maxLoanAmount: 140000,
    minLoan: 25000,
    maxLoan: 140000,
    subsidyRate: "High Interest Subsidy: Borrow at 4% p.a.",
    subsidyType: "Direct Low-Interest Microfinance",
    collateralRequired: false,
    fundingTypes: [
      "Collateral-Free Microcredit",
      "Concessional Interest Loan",
      "Any / Best Available"
    ],
    educationRequirements: "Basic Literacy / Non-formal",
    eligibleLocations: [
      "Rural",
      "Urban",
      "Within District",
      "All"
    ],
    interestRate: "4% per annum concessional",
    moratorium: "3 Months",
    repaymentPeriod: "36 Months",
    requiredDocuments: [
      "Caste Certificate issued by Revenue Authority",
      "Income Certificate (< ₹3,00,000 p.a.)",
      "Aadhaar Card and Voter ID",
      "Bank Account details"
    ],
    benefits: [
      "Unit cost up to ₹1,40,000 with 95% NSFDC loan component",
      "Ultra-low 4% annual concessional interest rate",
      "Channelized through State Channelizing Agencies (SCAs) and SHGs",
      "Zero collateral or mortgage needed"
    ],
    source: "NSFDC Micro-Credit Guidelines Prototype Channel",
    lastUpdated: "September 2026",
    verificationStatus: "Demo Scheme Data - Verify final eligibility with the concerned authority."
  },
  {
    id: "mahila-coir-yojana",
    name: "Mahila Coir Yojana",
    shortDescription: "Support for rural women artisans in coir work through training, equipment assistance, and capital subsidy.",
    overview: "A female-centric welfare scheme aimed at empowering rural women artisans in coconut and coir producing states with modern motorized equipment and direct capital subsidy.",
    category: "Rural Women Artisans",
    ministry: "Ministry of MSME / Coir Board",
    purpose: ["Equipment & Machinery", "Business Setup", "Working Capital"],
    eligibleSocialCategories: ["Women", "Rural Artisan", "SC", "ST", "OBC"],
    targetDemographic: ["Women", "Rural", "OBC", "SC", "ST"],
    eligibleBusinessTypes: ["Traditional Artisan", "Traditional Artisan / Handicrafts", "Micro Manufacturing"],
    businessTypes: ["Artisan/Handicraft", "Manufacturing"],
    eligibleBusinessStages: ["New Venture", "Early Stage", "Existing & Operational"],
    eligibleSectors: ["Traditional Handicrafts & Clay/Pottery", "Textiles, Handloom & Garments", "All"],
    minIncome: 0,
    maxIncome: 500000,
    minLoanAmount: 20000,
    maxLoanAmount: 250000,
    minLoan: 20000,
    maxLoan: 250000,
    subsidyRate: "75% Capital Subsidy on procurement of motorized ratts/machinery",
    subsidyType: "Capital Subsidy",
    collateralRequired: false,
    fundingTypes: ["Capital Subsidy / Margin Money", "Term Loan", "Any / Best Available"],
    educationRequirements: "No specific educational qualification stated in the prototype record",
    eligibleLocations: ["Rural", "Within State", "All"],
    interestRate: "Only on balance 25% if bank financed (~7%-9%)",
    moratorium: "Not specified",
    repaymentPeriod: "36 Months",
    requiredDocuments: [
      "Coir Board Training Certificate",
      "Aadhaar Card and Resident Proof",
      "Bank Account Details",
      "Self-declaration of family income"
    ],
    benefits: [
      "75% government subsidy on cost of motorized ratt / spinning equipment",
      "Skill training with monthly stipend provided before equipment distribution",
      "Direct linkage with cooperative societies for raw material supply and yarn buy-back"
    ],
    source: "Ministry of MSME / Coir Board scheme record included in the prototype",
    lastUpdated: "September 2026",
    verificationStatus: "Demo Scheme Data - Verify final eligibility with the concerned authority."
  },
  {
    id: "nssh-subsidy",
    name: "National SC-ST Hub Special Credit Linked Capital Subsidy (SCLCSS)",
    shortDescription: "Capital subsidy support for eligible SC/ST-owned micro and small enterprises investing in plant, machinery, or technology upgradation.",
    overview: "Provides 25% upfront capital subsidy for procurement of plant & machinery / equipment for technology upgradation to SC/ST owned micro and small enterprises.",
    category: "SC/ST Enterprises Technology Upgradation",
    ministry: "Ministry of MSME / National Small Industries Corporation (NSIC)",
    purpose: ["Equipment & Machinery", "Expansion & Modernization", "Business Setup"],
    eligibleSocialCategories: ["SC", "ST"],
    targetDemographic: ["SC", "ST"],
    eligibleBusinessTypes: ["Micro Manufacturing", "Micro Manufacturing / Workshop Unit", "Service Enterprise"],
    businessTypes: ["Manufacturing", "Service"],
    eligibleBusinessStages: ["New Venture", "Existing & Operational", "Expansion / Modernization"],
    eligibleSectors: [
      "Metalwork, Blacksmithy & Welding",
      "Electrical, Automobile & Device Repair",
      "Textiles, Handloom & Garments",
      "All"
    ],
    minIncome: 0,
    maxIncome: 10000000,
    minLoanAmount: 500000,
    maxLoanAmount: 10000000,
    minLoan: 500000,
    maxLoan: 10000000,
    subsidyRate: "25% upfront capital subsidy on plant and machinery",
    subsidyType: "Upfront Capital Subsidy",
    collateralRequired: false,
    fundingTypes: [
      "Capital Subsidy / Margin Money",
      "Term Loan",
      "Any / Best Available"
    ],
    educationRequirements: "Not specified in the prototype record",
    eligibleLocations: ["Rural", "Urban", "Within State", "Pan-India", "All"],
    interestRate: "Standard MSME bank rate",
    moratorium: "Not specified",
    repaymentPeriod: "84 Months",
    requiredDocuments: [
      "Udyam Registration Certificate",
      "Caste Certificate of all promoters/partners",
      "Machinery Proforma Invoices and Chartered Engineer Certificate",
      "Audited financial statements (if existing enterprise)",
      "Bank loan sanction letter"
    ],
    benefits: [
      "25% upfront capital subsidy capped at ₹25 Lakh",
      "Access to public procurement support for eligible SC/ST MSMEs",
      "Special reimbursement support for testing, rating, and international exhibitions"
    ],
    source: "National SC-ST Hub scheme record included in the prototype",
    lastUpdated: "September 2026",
    verificationStatus: "Demo Scheme Data - Verify final eligibility with the concerned authority."
  }
];

// Canonical client catalog. UI components consume documentsRequired and the
// normalized loan field names regardless of which source supplied the record.
export const DEMO_SCHEMES = BASE_DEMO_SCHEMES.map((scheme) => ({
  ...scheme,
  shortDescription: scheme.shortDescription || scheme.overview,
  documentsRequired: scheme.documentsRequired || scheme.requiredDocuments || [],
  minLoanAmount: scheme.minLoanAmount ?? scheme.minLoan ?? 0,
  maxLoanAmount: scheme.maxLoanAmount ?? scheme.maxLoan ?? 100000000,
}));

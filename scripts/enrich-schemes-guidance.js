import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { schemes, schemeCategories } from "../server/src/data/schemes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemeEnrichments = {
  "micro-finance-scheme": {
    schemeStatus: "Active (Mock Prototype Evaluation)",
    targetDemographic: ["General", "SC", "ST", "OBC", "Women", "Minority", "Self-Employed", "Micro Enterprise"],
    businessTypes: ["Micro Enterprise", "Small Retail Shop", "Self-Employed / Service", "Home-Based Crafts"],
    documentChecklist: [
      {
        id: "mfs-aadhaar",
        name: "Aadhaar Card (Mobile Linked)",
        category: "identity_proof",
        mandatory: true,
        description: "Official UIDAI identity card linked with active mobile number for biometric e-KYC authentication."
      },
      {
        id: "mfs-address",
        name: "Proof of Residence / Domicile Certificate",
        category: "address_proof",
        mandatory: true,
        description: "Recent electricity bill, ration card, or voter ID verifying permanent residence in the district."
      },
      {
        id: "mfs-income",
        name: "Income Self-Declaration / Certificate",
        category: "income_document",
        mandatory: false,
        description: "Self-certified declaration of family income verifying household income within ₹5,00,000 threshold."
      },
      {
        id: "mfs-category",
        name: "Social Category Certificate (SC/ST/OBC/Minority)",
        category: "category_certificate",
        mandatory: false,
        description: "Official community certificate issued by Revenue Department for concessional priority allocation."
      },
      {
        id: "mfs-business",
        name: "Trade Activity Proof or Local Vendor Slip",
        category: "business_document",
        mandatory: true,
        description: "Proof of operating micro-enterprise, trade license, or municipal registration slip."
      },
      {
        id: "mfs-bank",
        name: "Bank Account Passbook / Statement",
        category: "bank_details",
        mandatory: true,
        description: "Active savings or current account passbook showing IFSC code, account number, and 6 months transactions."
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Assemble KYC and Business Verification Documents",
        description: "Gather mobile-seeded Aadhaar, bank passbook, and proof of operating micro-business.",
        timeframe: "1-2 Days",
        actionLocation: "Self / CSC Center"
      },
      {
        step: 2,
        title: "Submit Application at Partner Bank or CSC Desk",
        description: "Present documents to a designated Microfinance Bank Mitra or local Common Service Center.",
        timeframe: "1 Day",
        actionLocation: "CSC Center / Bank Mitra"
      },
      {
        step: 3,
        title: "Field Verification & Credit Appraisal",
        description: "Bank field officer verifies enterprise premises, operating inventory, and credit history.",
        timeframe: "3-5 Days",
        actionLocation: "Enterprise Location"
      },
      {
        step: 4,
        title: "Loan Sanction & Disbursement",
        description: "Sign microcredit agreement; funds disbursed directly into bank account with 3-6 month moratorium.",
        timeframe: "2-3 Days",
        actionLocation: "Bank Account"
      }
    ]
  },
  "pm-svanidhi": {
    documentChecklist: [
      {
        id: "svanidhi-aadhaar",
        name: "Aadhaar Card (Linked with Active Mobile)",
        category: "identity_proof",
        mandatory: true,
        description: "Required for Aadhaar-based OTP verification and e-KYC on official PM SVANidhi portal."
      },
      {
        id: "svanidhi-cov",
        name: "Certificate of Vending (CoV) or ULB ID / LoR",
        category: "business_document",
        mandatory: true,
        description: "Issued by Urban Local Body (ULB) / Town Vending Committee (TVC) or Letter of Recommendation (LoR)."
      },
      {
        id: "svanidhi-bank",
        name: "Active Savings Bank Account Passbook",
        category: "bank_details",
        mandatory: true,
        description: "Savings account linked to mobile for quarterly 7% interest subsidy & UPI transaction cashbacks."
      },
      {
        id: "svanidhi-photo",
        name: "Recent Passport-size Photograph",
        category: "identity_proof",
        mandatory: false,
        description: "Two recent colour passport photographs of the street vendor."
      },
      {
        id: "svanidhi-category",
        name: "Social Category Certificate (SC/ST/OBC/Minority)",
        category: "category_certificate",
        mandatory: false,
        description: "Optional certificate for social welfare integration under PM SVANidhi se Samriddhi program."
      },
      {
        id: "svanidhi-income",
        name: "Self-Declaration of Vending Income",
        category: "income_document",
        mandatory: false,
        description: "Signed declaration of daily vending earnings and household dependants."
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Check ULB Vendor Survey Status or Obtain LoR",
        description: "Verify if your name is in the municipal vendor survey or get a Letter of Recommendation from ULB.",
        timeframe: "1-3 Days",
        actionLocation: "Municipality / ULB Office"
      },
      {
        step: 2,
        title: "Fill Online Form via PM SVANidhi Portal or CSC",
        description: "Upload Aadhaar, CoV/LoR, and bank passbook with help from a CSC Village Level Entrepreneur.",
        timeframe: "Same Day",
        actionLocation: "CSC Center / Portal"
      },
      {
        step: 3,
        title: "Lending Institution Appraisal",
        description: "Selected Scheduled Commercial Bank or Microfinance Institution reviews vending credentials.",
        timeframe: "3-7 Days",
        actionLocation: "Bank Branch"
      },
      {
        step: 4,
        title: "Working Capital Disbursement & UPI QR Code Setup",
        description: "Loan amount credited; bank activates digital merchant QR code for monthly cashback.",
        timeframe: "1-2 Days",
        actionLocation: "Bank Account / UPI"
      }
    ]
  },
  "pm-vishwakarma": {
    documentChecklist: [
      {
        id: "vishwakarma-aadhaar",
        name: "Aadhaar Card with Biometric Seeding",
        category: "identity_proof",
        mandatory: true,
        description: "Aadhaar biometric authentication is mandatory for national Vishwakarma registration."
      },
      {
        id: "vishwakarma-trade",
        name: "Traditional Trade Verification Proof",
        category: "business_document",
        mandatory: true,
        description: "Evidence of practicing one of the 18 notified traditional artisan/craft trades with traditional tools."
      },
      {
        id: "vishwakarma-bank",
        name: "Bank Account Passbook / Bank Mandate",
        category: "bank_details",
        mandatory: true,
        description: "Active savings bank account for ₹15,000 toolkit e-voucher and daily ₹500 training stipend."
      },
      {
        id: "vishwakarma-address",
        name: "Ration Card / Family Declaration",
        category: "address_proof",
        mandatory: true,
        description: "Family details proof to ensure one artisan benefit per household as per guidelines."
      },
      {
        id: "vishwakarma-caste",
        name: "Category / Community Certificate (SC/ST/OBC)",
        category: "category_certificate",
        mandatory: false,
        description: "Caste certificate issued by Tehsildar for affirmative action benefits."
      },
      {
        id: "vishwakarma-income",
        name: "Artisan Household Income Declaration",
        category: "income_document",
        mandatory: false,
        description: "Self-declaration of family income from traditional artisanal craft."
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Biometric Enrollment at Common Service Center (CSC)",
        description: "Artisan undergoes Aadhaar biometric scan and trade selection at local CSC kiosk.",
        timeframe: "Same Day",
        actionLocation: "Nearest CSC Center"
      },
      {
        step: 2,
        title: "Three-Tier Verification (Gram Panchayat / ULB -> District -> MSME)",
        description: "Stage 1: Gram Panchayat/ULB head scrutiny; Stage 2: District Implementation Committee; Stage 3: MSME screening.",
        timeframe: "1-2 Weeks",
        actionLocation: "District MSME Board"
      },
      {
        step: 3,
        title: "Skill Upgradation Training & Toolkit Grant",
        description: "5-7 days basic training with ₹500/day stipend followed by ₹15,000 modern toolkit e-voucher.",
        timeframe: "5-7 Days",
        actionLocation: "District Skill Training Center"
      },
      {
        step: 4,
        title: "Enterprise Loan Disbursement (Tranche 1: ₹1L, Tranche 2: ₹2L)",
        description: "Concessional 5% interest collateral-free loan credited to initiate commercial enterprise.",
        timeframe: "3-5 Days",
        actionLocation: "Participating Bank"
      }
    ]
  },
  "pmegp": {
    documentChecklist: [
      {
        id: "pmegp-aadhaar",
        name: "Aadhaar Card of Enterprise Promoter",
        category: "identity_proof",
        mandatory: true,
        description: "Promoter identity and residence verification."
      },
      {
        id: "pmegp-dpr",
        name: "Detailed Project Report (DPR) / Machinery Quotations",
        category: "business_document",
        mandatory: true,
        description: "Project profile showing capital expenditure, working capital requirements, and equipment quotes."
      },
      {
        id: "pmegp-caste",
        name: "Special Category / Caste Certificate (SC/ST/OBC/Women/NER)",
        category: "category_certificate",
        mandatory: false,
        description: "Required to claim 25% (urban) or 35% (rural) margin money subsidy."
      },
      {
        id: "pmegp-rural",
        name: "Rural Area Certificate from Gram Panchayat",
        category: "address_proof",
        mandatory: false,
        description: "Required to establish rural jurisdiction for 35% elevated subsidy rate."
      },
      {
        id: "pmegp-bank",
        name: "Bank Account Statement & Credit Mandate",
        category: "bank_details",
        mandatory: true,
        description: "Savings or current account statement of the enterprise promoter."
      },
      {
        id: "pmegp-income",
        name: "Income Certificate / Tax Return (ITR)",
        category: "income_document",
        mandatory: false,
        description: "Previous year ITR or income certificate for borrower financial profiling."
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Prepare Detailed Project Report (DPR)",
        description: "Prepare project financial model and obtain machinery quotations from suppliers.",
        timeframe: "3-5 Days",
        actionLocation: "Self / Consultant / DIC"
      },
      {
        step: 2,
        title: "Submit Online Application on KVIC PMEGP Portal",
        description: "Upload DPR, Aadhaar, caste certificate, and choose preferred financing bank.",
        timeframe: "1-2 Days",
        actionLocation: "KVIC PMEGP Portal / CSC"
      },
      {
        step: 3,
        title: "District Level Task Force Committee (DLTFC) Scrutiny",
        description: "DLTFC examines the project feasibility and forwards approved applications to financing bank branch.",
        timeframe: "2-3 Weeks",
        actionLocation: "District Industries Centre"
      },
      {
        step: 4,
        title: "EDP Training & Subsidy Lock-in",
        description: "Complete mandatory Entrepreneurship Development Programme (EDP) training and bank disburses loan.",
        timeframe: "1-2 Weeks",
        actionLocation: "Bank Branch / RSETI"
      }
    ]
  },
  "stand-up-india": {
    documentChecklist: [
      {
        id: "standup-identity",
        name: "Identity Proof (Aadhaar / Voter ID / Passport)",
        category: "identity_proof",
        mandatory: true,
        description: "Primary identification of SC/ST or Woman borrower."
      },
      {
        id: "standup-caste",
        name: "SC/ST Category Certificate or Proof of Woman Promoter",
        category: "category_certificate",
        mandatory: true,
        description: "Mandated: applicant must be either a Woman or belong to SC/ST category."
      },
      {
        id: "standup-dpr",
        name: "Detailed Project Report for Greenfield Enterprise",
        category: "business_document",
        mandatory: true,
        description: "Comprehensive business plan for manufacturing, services, or trading greenfield unit."
      },
      {
        id: "standup-premises",
        name: "Proof of Business Premises / Lease Agreement",
        category: "address_proof",
        mandatory: true,
        description: "Registered lease deed, rent agreement, or industrial plot allotment letter."
      },
      {
        id: "standup-bank",
        name: "Bank Statement & Promoter Margin Proof (15%)",
        category: "bank_details",
        mandatory: true,
        description: "Last 12 months bank statement showing promoter margin contribution availability."
      },
      {
        id: "standup-income",
        name: "Audited Financials / Past Income Tax Returns",
        category: "income_document",
        mandatory: false,
        description: "ITR of promoters or personal net-worth statement for credit appraisal."
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Register on Stand-Up India Portal",
        description: "Create profile on standupmitra.in as trainee or ready borrower.",
        timeframe: "Same Day",
        actionLocation: "Stand-Up Mitra Portal"
      },
      {
        step: 2,
        title: "Handholding & Credit Mentorship Support",
        description: "Access guidance on project report preparation and collateral-free credit structure via SIDBI desk.",
        timeframe: "1-2 Weeks",
        actionLocation: "SIDBI / Lead District Manager"
      },
      {
        step: 3,
        title: "Bank Credit Appraisal & Sanction",
        description: "Commercial bank branch evaluates the composite loan (term loan + working capital).",
        timeframe: "3-4 Weeks",
        actionLocation: "Designated Bank Branch"
      },
      {
        step: 4,
        title: "Composite Loan Disbursement & CGSSI Coverage",
        description: "Loan disbursed under Credit Guarantee Scheme for Stand Up India (CGSSI).",
        timeframe: "1 Week",
        actionLocation: "Bank Account"
      }
    ]
  },
  "pm-mudra-yojana": {
    documentChecklist: [
      {
        id: "mudra-aadhaar",
        name: "Aadhaar Card / Voter ID / Driving License",
        category: "identity_proof",
        mandatory: true,
        description: "Primary photo identification proof of the borrower."
      },
      {
        id: "mudra-address",
        name: "Residence Proof (Utility Bill / Ration Card)",
        category: "address_proof",
        mandatory: true,
        description: "Recent electricity bill, telephone bill, or municipal tax receipt."
      },
      {
        id: "mudra-bank",
        name: "Bank Account Statement (Last 6 Months)",
        category: "bank_details",
        mandatory: true,
        description: "Savings or current account statement from an existing operational bank."
      },
      {
        id: "mudra-quotation",
        name: "Equipment Quotation / Inventory Pro-forma Invoice",
        category: "business_document",
        mandatory: true,
        description: "Quotation of machinery, equipment, or inventory to be financed."
      },
      {
        id: "mudra-caste",
        name: "Caste Certificate (SC/ST/OBC) if claiming quota",
        category: "category_certificate",
        mandatory: false,
        description: "For inclusion under priority sector lending targets."
      },
      {
        id: "mudra-income",
        name: "Sales Register / Income Proof / ITR",
        category: "income_document",
        mandatory: false,
        description: "Proof of business turnover or income declaration for Kishore / Tarun tranches."
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Choose MUDRA Category (Shishu, Kishore, or Tarun)",
        description: "Identify loan quantum: Shishu (up to ₹50k), Kishore (₹50k-₹5L), or Tarun (₹5L-₹20L).",
        timeframe: "1 Day",
        actionLocation: "Self / Udyamimitra Portal"
      },
      {
        step: 2,
        title: "Submit Loan Application Form with Quotations",
        description: "Submit standard MUDRA form along with equipment quotation to any commercial, RRB, or MFI bank.",
        timeframe: "1-2 Days",
        actionLocation: "Bank Branch / CSC"
      },
      {
        step: 3,
        title: "Bank Due Diligence & CIBIL Check",
        description: "Bank verifies applicant credentials, business viability, and non-defaulter status.",
        timeframe: "3-7 Days",
        actionLocation: "Bank Branch"
      },
      {
        step: 4,
        title: "Disbursement via MUDRA RuPay Debit Card",
        description: "Loan sanctioned without collateral; working capital accessible via specialized MUDRA RuPay card.",
        timeframe: "2-3 Days",
        actionLocation: "Bank Branch"
      }
    ]
  },
  "mahila-samridhi-yojana": {
    documentChecklist: [
      {
        id: "msy-aadhaar",
        name: "Aadhaar Card of Woman Entrepreneur",
        category: "identity_proof",
        mandatory: true,
        description: "Aadhaar verification confirming woman entrepreneur identity."
      },
      {
        id: "msy-sc-cert",
        name: "Scheduled Caste (SC) Caste Certificate",
        category: "category_certificate",
        mandatory: true,
        description: "Issued by Tehsildar / Sub-Divisional Magistrate confirming SC category."
      },
      {
        id: "msy-income",
        name: "Family Income Certificate (Below ₹3,00,000 p.a.)",
        category: "income_document",
        mandatory: true,
        description: "Competent authority certificate confirming annual family income within ₹3.00 Lakhs."
      },
      {
        id: "msy-address",
        name: "Residence Proof / BPL Card",
        category: "address_proof",
        mandatory: true,
        description: "Ration card or electricity bill confirming permanent residence."
      },
      {
        id: "msy-bank",
        name: "Active Bank Savings Account Passbook",
        category: "bank_details",
        mandatory: true,
        description: "Direct Bank Account passbook copy for concessional loan release."
      },
      {
        id: "msy-biz",
        name: "Trade Activity Description / SHG Resolution",
        category: "business_document",
        mandatory: false,
        description: "Self-Help Group resolution or description of proposed micro-business venture."
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Form Submission to State Channelizing Agency (SCA)",
        description: "Submit application to District SCA office or Regional Rural Bank / SHG Federation.",
        timeframe: "1-2 Days",
        actionLocation: "SCA District Office"
      },
      {
        step: 2,
        title: "Income & Caste Document Verification",
        description: "District welfare officer verifies SC certificate and family income criterion.",
        timeframe: "1 Week",
        actionLocation: "District Welfare Board"
      },
      {
        step: 3,
        title: "Target Allocation & Sanction Order",
        description: "NSFDC allocates concessional refinancing at 4% interest per annum to beneficiary.",
        timeframe: "1-2 Weeks",
        actionLocation: "SCA / Bank"
      },
      {
        step: 4,
        title: "Loan Disbursement & Skill Orientation",
        description: "Disbursement into bank account with 3-year repayment and quarterly monitoring.",
        timeframe: "3-5 Days",
        actionLocation: "Bank Account"
      }
    ]
  },
  "mahila-coir-yojana": {
    documentChecklist: [
      {
        id: "coir-aadhaar",
        name: "Aadhaar Card of Rural Woman Artisan",
        category: "identity_proof",
        mandatory: true,
        description: "Proof of identity of the rural woman coir worker."
      },
      {
        id: "coir-address",
        name: "Gram Panchayat Residency Proof",
        category: "address_proof",
        mandatory: true,
        description: "Certificate of residence in rural coconut/coir producing district."
      },
      {
        id: "coir-training",
        name: "Coir Board Skill Training Completion Certificate",
        category: "business_document",
        mandatory: true,
        description: "Certificate verifying completion of 2-month coir spinning skill training."
      },
      {
        id: "coir-bank",
        name: "Individual Savings Bank Account Details",
        category: "bank_details",
        mandatory: true,
        description: "Passbook copy for 75% capital subsidy DBT credit on motorized ratts."
      },
      {
        id: "coir-caste",
        name: "Social Category Certificate (SC/ST/OBC/Minority)",
        category: "category_certificate",
        mandatory: false,
        description: "Affirmative action category certificate for special stipend incentives."
      },
      {
        id: "coir-income",
        name: "Rural Artisan Income Certificate",
        category: "income_document",
        mandatory: false,
        description: "Gram Panchayat income declaration confirming smallholder or landless artisan status."
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Enroll in 2-Month Coir Board Training Program",
        description: "Complete certified skill training in motorized ratt spinning at Regional Training Centre.",
        timeframe: "2 Months",
        actionLocation: "Coir Board Training Centre"
      },
      {
        step: 2,
        title: "Submit Application for Motorized Coir Ratt Machinery",
        description: "Apply for 75% machinery subsidy through Coir Board Field Office or DIC.",
        timeframe: "1-2 Days",
        actionLocation: "Coir Board Sub-Office"
      },
      {
        step: 3,
        title: "Field Scrutiny & Subsidy Approval",
        description: "Regional Officer inspects workspace and verifies training credentials.",
        timeframe: "1-2 Weeks",
        actionLocation: "Artisan Workshop"
      },
      {
        step: 4,
        title: "Delivery of Motorized Equipment & Subsidy Transfer",
        description: "Motorized spinning ratt delivered; 75% government subsidy credited directly.",
        timeframe: "1 Week",
        actionLocation: "Beneficiary Premises"
      }
    ]
  },
  "nssh-subsidy": {
    documentChecklist: [
      {
        id: "nssh-aadhaar",
        name: "Aadhaar Card of SC/ST Promoter(s)",
        category: "identity_proof",
        mandatory: true,
        description: "Proof that at least 51% shareholding is held by SC/ST promoter(s)."
      },
      {
        id: "nssh-caste",
        name: "SC/ST Caste Certificate of Key Promoters",
        category: "category_certificate",
        mandatory: true,
        description: "Official caste certificate issued by designated government authority."
      },
      {
        id: "nssh-udyam",
        name: "Udyam Registration Certificate (with SC/ST tag)",
        category: "business_document",
        mandatory: true,
        description: "MSME Udyam registration acknowledging enterprise as SC/ST owned."
      },
      {
        id: "nssh-plant",
        name: "Machinery Invoices & Technology Upgradation DPR",
        category: "business_document",
        mandatory: true,
        description: "Quotations from approved OEMs for modern plant and machinery."
      },
      {
        id: "nssh-bank",
        name: "Term Loan Sanction Letter from Scheduled Bank",
        category: "bank_details",
        mandatory: true,
        description: "Sanction letter from lending bank approving institutional credit."
      },
      {
        id: "nssh-address",
        name: "Factory / Workshop Premises Allotment Deed",
        category: "address_proof",
        mandatory: true,
        description: "Proof of commercial/industrial property ownership or registered lease."
      },
      {
        id: "nssh-income",
        name: "Audited Balance Sheets & GST Returns",
        category: "income_document",
        mandatory: false,
        description: "Past 2 years financial statements and GST filing history."
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Avail Bank Term Loan for Modern Machinery",
        description: "Obtain institutional term loan sanction from scheduled bank for technology acquisition.",
        timeframe: "2-4 Weeks",
        actionLocation: "Lending Bank Branch"
      },
      {
        step: 2,
        title: "Apply Online on National SC-ST Hub Portal",
        description: "Submit SCLCSS subsidy claim through lending bank on the dedicated NSSH portal.",
        timeframe: "3-5 Days",
        actionLocation: "NSSH Portal / Bank"
      },
      {
        step: 3,
        title: "Technical Inspection & Joint Appraisal",
        description: "NSIC / MSME-DI officer inspects installed machinery and validates SC/ST ownership.",
        timeframe: "2-3 Weeks",
        actionLocation: "Enterprise Factory Site"
      },
      {
        step: 4,
        title: "25% Capital Subsidy Credit into TDR Account",
        description: "Direct 25% capital subsidy credited into Term Deposit Receipt (TDR) account for 3-year lock-in.",
        timeframe: "2 Weeks",
        actionLocation: "Bank Account"
      }
    ]
  },
  "dairy-entrepreneurship-deds": {
    documentChecklist: [
      {
        id: "deds-aadhaar",
        name: "Aadhaar Card of Dairy Farmer / Entrepreneur",
        category: "identity_proof",
        mandatory: true,
        description: "Proof of identity for rural dairy promoter."
      },
      {
        id: "deds-land",
        name: "Land Ownership Proof / Animal Shed Lease",
        category: "address_proof",
        mandatory: true,
        description: "Khasra/Khatauni land record or lease agreement for housing milch animals."
      },
      {
        id: "deds-quote",
        name: "Veterinary Health Certificate & Cattle Quotations",
        category: "business_document",
        mandatory: true,
        description: "Pro-forma invoice for milch cows/buffaloes and veterinary fitness records."
      },
      {
        id: "deds-bank",
        name: "Bank Account Details for NABARD Subsidy Routing",
        category: "bank_details",
        mandatory: true,
        description: "Active bank passbook of rural/commercial bank participating in NABARD scheme."
      },
      {
        id: "deds-caste",
        name: "SC/ST Category Certificate (for 33.33% Subsidy)",
        category: "category_certificate",
        mandatory: false,
        description: "Required for enhanced 33.33% subsidy (25% for general category)."
      },
      {
        id: "deds-income",
        name: "Rural Household Income Certificate",
        category: "income_document",
        mandatory: false,
        description: "Revenue department certificate confirming marginal farmer or rural artisan status."
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Prepare Dairy Project Profile",
        description: "Draft small dairy scheme (2 to 10 animals) with cattle purchase and milking setup costs.",
        timeframe: "2-3 Days",
        actionLocation: "Self / Dairy Cooperative"
      },
      {
        step: 2,
        title: "Submit Loan Application to Regional Rural Bank or Commercial Bank",
        description: "Present project proposal to local bank branch handling NABARD refinancing.",
        timeframe: "1-2 Days",
        actionLocation: "Bank Branch"
      },
      {
        step: 3,
        title: "Bank Appraisal & Joint Inspection",
        description: "Bank manager and district veterinary officer inspect cattle shed readiness.",
        timeframe: "1-2 Weeks",
        actionLocation: "Farm Premises"
      },
      {
        step: 4,
        title: "Sanction & Back-Ended Capital Subsidy Release",
        description: "Bank disburses credit; NABARD releases 25% to 33.33% back-ended capital subsidy.",
        timeframe: "2-3 Weeks",
        actionLocation: "Bank Account"
      }
    ]
  },
  "cgtmse-micro-guarantee": {
    documentChecklist: [
      {
        id: "cgtmse-aadhaar",
        name: "Aadhaar Card & PAN Card of Promoter(s)",
        category: "identity_proof",
        mandatory: true,
        description: "Compulsory KYC for all directors/partners/proprietor."
      },
      {
        id: "cgtmse-udyam",
        name: "Udyam Registration Certificate",
        category: "business_document",
        mandatory: true,
        description: "Valid MSME certificate declaring enterprise micro/small manufacturing or service status."
      },
      {
        id: "cgtmse-dpr",
        name: "Comprehensive Project Report & Fund Flow Projection",
        category: "business_document",
        mandatory: true,
        description: "Detailed 3-year financial model demonstrating debt-service coverage ratio (DSCR)."
      },
      {
        id: "cgtmse-bank",
        name: "Bank Statements for Last 12 Months",
        category: "bank_details",
        mandatory: true,
        description: "Current account statement proving banking discipline and cash turnovers."
      },
      {
        id: "cgtmse-address",
        name: "Business Premises Lease / Utility Bill",
        category: "address_proof",
        mandatory: true,
        description: "Commercial lease deed or utility bill of factory/workshop location."
      },
      {
        id: "cgtmse-income",
        name: "Income Tax Returns & Audited Financials (2-3 Yrs)",
        category: "income_document",
        mandatory: false,
        description: "ITR acknowledgment and profit & loss statements for existing operational enterprises."
      },
      {
        id: "cgtmse-caste",
        name: "Special Category Certificate (Women / SC / ST / ZED)",
        category: "category_certificate",
        mandatory: false,
        description: "Enables concessional annual guarantee fee and enhanced 85% guarantee coverage."
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Formulate Collateral-Free Project Proposal",
        description: "Prepare detailed business expansion proposal highlighting viable cash-flow repayment without third-party collateral.",
        timeframe: "3-5 Days",
        actionLocation: "Self / CA / Consultant"
      },
      {
        step: 2,
        title: "Apply to Member Lending Institution (MLI)",
        description: "Submit credit application to any public, private, or regional rural bank enrolled with CGTMSE.",
        timeframe: "1-2 Days",
        actionLocation: "MLI Bank Branch"
      },
      {
        step: 3,
        title: "Bank Credit Appraisal & Guarantee Enrolment",
        description: "Lender conducts viability check and applies for credit guarantee directly to CGTMSE trust.",
        timeframe: "2-3 Weeks",
        actionLocation: "Bank Zonal Credit Hub"
      },
      {
        step: 4,
        title: "Loan Sanction & Trust Guarantee Coverage",
        description: "Collateral-free credit sanctioned; guarantee letter issued by CGTMSE with 75%-85% coverage.",
        timeframe: "1 Week",
        actionLocation: "Bank Branch"
      }
    ]
  },
  "nbcfdc-swarnima-scheme": {
    documentChecklist: [
      {
        id: "swarnima-aadhaar",
        name: "Aadhaar Card of Woman Beneficiary",
        category: "identity_proof",
        mandatory: true,
        description: "Official photo ID verifying female applicant age (18 to 55 years)."
      },
      {
        id: "swarnima-obc",
        name: "OBC Caste Certificate (Non-Creamy Layer)",
        category: "category_certificate",
        mandatory: true,
        description: "Issued by Tehsildar certifying Backward Class category under state/central list."
      },
      {
        id: "swarnima-income",
        name: "Annual Family Income Certificate (< ₹3,00,000)",
        category: "income_document",
        mandatory: true,
        description: "Mandatory income proof issued by authorized revenue authority confirming eligibility under statutory limit."
      },
      {
        id: "swarnima-address",
        name: "Residence Proof / Voter ID / Ration Card",
        category: "address_proof",
        mandatory: true,
        description: "Permanent residential address proof in the state of application."
      },
      {
        id: "swarnima-bank",
        name: "Active Bank Passbook with IFSC Details",
        category: "bank_details",
        mandatory: true,
        description: "Individual bank savings account for concessional 5% interest microcredit disbursement."
      },
      {
        id: "swarnima-biz",
        name: "Trade Activity / Micro-Enterprise Proposal",
        category: "business_document",
        mandatory: false,
        description: "Brief outline of self-employment trade (tailoring, vending, artisan craft, beauty care, etc.)."
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Submit Application to State Channelizing Agency (SCA)",
        description: "Obtain and submit Swarnima application form at the district Backward Classes Development Corporation office.",
        timeframe: "1-2 Days",
        actionLocation: "District SCA Office / Portal"
      },
      {
        step: 2,
        title: "Document Scrutiny (OBC & Income Verification)",
        description: "District screening committee reviews OBC certificate, income eligibility, and trade suitability.",
        timeframe: "1-2 Weeks",
        actionLocation: "SCA District Board"
      },
      {
        step: 3,
        title: "Sanction of Concessional Loan at 5% Interest",
        description: "NBCFDC sanctions term loan up to ₹2,00,000 at maximum 5% interest per annum.",
        timeframe: "1-2 Weeks",
        actionLocation: "SCA / Bank"
      },
      {
        step: 4,
        title: "Funds Disbursement & Enterprise Setup",
        description: "Direct release of funds to applicant bank account; repayment in quarterly installments over up to 5 years.",
        timeframe: "3-5 Days",
        actionLocation: "Beneficiary Bank Account"
      }
    ]
  },
  "pm-surya-ghar-msme": {
    documentChecklist: [
      {
        id: "suryaghar-aadhaar",
        name: "Aadhaar Card & PAN Card of Applicant",
        category: "identity_proof",
        mandatory: true,
        description: "Identity authentication of the property/enterprise owner."
      },
      {
        id: "suryaghar-bill",
        name: "Latest Electricity Bill of Premises",
        category: "business_document",
        mandatory: true,
        description: "Recent electricity consumer bill showing CA/consumer number and active connection."
      },
      {
        id: "suryaghar-roof",
        name: "Roof Ownership Proof / Long-term Lease Consent",
        category: "address_proof",
        mandatory: true,
        description: "Registered title deed, house tax receipt, or landlord consent for solar installation."
      },
      {
        id: "suryaghar-bank",
        name: "Bank Account Passbook / Cancelled Cheque",
        category: "bank_details",
        mandatory: true,
        description: "Bank account linked with mobile for Direct Benefit Transfer (DBT) subsidy credit."
      },
      {
        id: "suryaghar-income",
        name: "Business Turnover / Income Self-Declaration",
        category: "income_document",
        mandatory: false,
        description: "Annual electricity cost savings assessment and income declaration."
      },
      {
        id: "suryaghar-caste",
        name: "Social Category Certificate (if applying via quota)",
        category: "category_certificate",
        mandatory: false,
        description: "Optional certificate for special institutional support."
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Register on National Solar Rooftop Portal",
        description: "Enter electricity distribution company (DISCOM) consumer account number and mobile.",
        timeframe: "Same Day",
        actionLocation: "pmsuryaghar.gov.in Portal"
      },
      {
        step: 2,
        title: "Feasibility Approval by DISCOM & Vendor Selection",
        description: "Local power utility grants technical feasibility; choose empanelled solar installer.",
        timeframe: "1-2 Weeks",
        actionLocation: "DISCOM / Registered Vendor"
      },
      {
        step: 3,
        title: "Rooftop Solar Plant Installation & Net-Meter Inspection",
        description: "Empanelled vendor installs solar panels, inverter; DISCOM installs net-meter.",
        timeframe: "1-2 Weeks",
        actionLocation: "Enterprise Rooftop"
      },
      {
        step: 4,
        title: "Commissioning Certificate & Direct DBT Subsidy",
        description: "Net-meter inspection report submitted; DBT capital subsidy up to ₹78,000 credited within 30 days.",
        timeframe: "2-4 Weeks",
        actionLocation: "Direct to Bank Account"
      }
    ]
  }
};

// Process schemes array
const updatedSchemes = schemes.map((scheme) => {
  const enrichment = schemeEnrichments[scheme.id] || {};
  return {
    ...scheme,
    ...enrichment
  };
});

// Format export file
const fileContent = `/**
 * Saarthi (SIH 2026) - Centralized Scheme Data System
 * 
 * IMPORTANT PROTOTYPE NOTICE:
 * This file contains realistic MOCK scheme data created for system demonstration,
 * UI testing, and prototype evaluation. Official government APIs and live values
 * are not available for this prototype. Sample values should NOT be treated as current
 * official government figures.
 */

export const schemes = ${JSON.stringify(updatedSchemes, null, 2)};

export const DEMO_SCHEMES = schemes;

export const schemeCategories = ${JSON.stringify(schemeCategories, null, 2)};
`;

const serverPath = path.resolve(__dirname, "../server/src/data/schemes.js");
const clientPath = path.resolve(__dirname, "../client/src/data/schemes.js");

fs.writeFileSync(serverPath, fileContent, "utf8");
console.log("Successfully wrote updated schemes to:", serverPath);

fs.writeFileSync(clientPath, fileContent, "utf8");
console.log("Successfully wrote updated schemes to:", clientPath);

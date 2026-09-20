import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The 12 scheme enriched checklists and application steps
const SCHEME_DOCS_AND_STEPS = {
  "pm-svanidhi": {
    documentChecklist: [
      {
        id: "aadhaar_card",
        name: "Aadhaar Card (Linked to Active Mobile)",
        category: "identity_proof",
        categoryLabel: "Identity Proof",
        description: "Government photo ID for Aadhaar-based biometric e-KYC authentication",
        mandatory: true
      },
      {
        id: "address_proof",
        name: "Current Urban Residence Proof",
        category: "address_proof",
        categoryLabel: "Address Proof",
        description: "Voter ID, recent electricity/water utility bill, or domicile certificate",
        mandatory: true
      },
      {
        id: "vending_cov",
        name: "Certificate of Vending (CoV) / LoR",
        category: "business_document",
        categoryLabel: "Business-Related Document",
        description: "Vending certificate issued by Urban Local Body (ULB) or Town Vending Committee (TVC), or Letter of Recommendation",
        mandatory: true
      },
      {
        id: "bank_passbook",
        name: "Active Savings Bank Account Passbook",
        category: "bank_details",
        categoryLabel: "Bank / Account Details",
        description: "Bank account passbook copy showing Account Number and IFSC for direct loan disbursement and DBT cashbacks",
        mandatory: true
      },
      {
        id: "passport_photo",
        name: "Recent Passport Size Photograph",
        category: "identity_proof",
        categoryLabel: "Identity Proof",
        description: "2 recent color passport-size photographs of the applicant",
        mandatory: false
      },
      {
        id: "caste_cert",
        name: "Social Category Certificate (SC/ST/OBC/Minority)",
        category: "category_certificate",
        categoryLabel: "Category / Certificate Document",
        description: "Optional certificate for affirmative action tracking and special training quota access",
        mandatory: false
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Check Vending Status & CoV",
        description: "Verify your Certificate of Vending (CoV) or obtain a Letter of Recommendation (LoR) from your Urban Local Body.",
        timeframe: "1-2 Days",
        actionLocation: "Urban Local Body (ULB) / Municipal Office"
      },
      {
        step: 2,
        title: "Document Assembly & Mobile Linkage",
        description: "Assemble original Aadhaar card, active bank passbook, and ensure mobile number receives OTPs.",
        timeframe: "1 Day",
        actionLocation: "Applicant Residence"
      },
      {
        step: 3,
        title: "Online Portal Filing or CSC Biometric Onboarding",
        description: "Submit application on the PM SVANidhi portal or visit nearest Common Service Center (CSC) / Bank Mitra.",
        timeframe: "1 Day",
        actionLocation: "PM SVANidhi Portal / Nearest CSC"
      },
      {
        step: 4,
        title: "Lending Bank Branch Credit Sanction",
        description: "Financing bank branch verifies vending credentials and executes digital sanction agreement.",
        timeframe: "3-5 Days",
        actionLocation: "Financing Bank Branch"
      },
      {
        step: 5,
        title: "Working Capital Credit & UPI Cashbacks",
        description: "First tranche of ₹10,000 to ₹50,000 is credited directly into savings account with 7% interest rebate active.",
        timeframe: "1-2 Days",
        actionLocation: "Bank Account"
      }
    ]
  },
  "pm-vishwakarma": {
    documentChecklist: [
      {
        id: "aadhaar_card",
        name: "Aadhaar Card",
        category: "identity_proof",
        categoryLabel: "Identity Proof",
        description: "Biometric-linked Aadhaar for CSC registration and e-KYC",
        mandatory: true
      },
      {
        id: "ration_card",
        name: "Ration Card / Family Member Details",
        category: "address_proof",
        categoryLabel: "Address Proof",
        description: "Ration card or official family register for household benefits verification",
        mandatory: true
      },
      {
        id: "trade_declaration",
        name: "Trade Self-Declaration (18 Notified Trades)",
        category: "business_document",
        categoryLabel: "Business-Related Document",
        description: "Declaration of active engagement in traditional trades (carpenter, potter, smith, tailor, etc.)",
        mandatory: true
      },
      {
        id: "bank_passbook",
        name: "Aadhaar-Seeded Bank Passbook / Cancelled Cheque",
        category: "bank_details",
        categoryLabel: "Bank / Account Details",
        description: "Account details for receiving ₹15,000 toolkit e-voucher grant and ₹500/day training stipend",
        mandatory: true
      },
      {
        id: "caste_cert",
        name: "Caste / Category Certificate (OBC/SC/ST)",
        category: "category_certificate",
        categoryLabel: "Category / Certificate Document",
        description: "Relevant caste certificate for priority craft cluster allocation",
        mandatory: false
      },
      {
        id: "income_cert",
        name: "Annual Household Income Declaration",
        category: "income_document",
        categoryLabel: "Income-Related Document",
        description: "Self-declaration of family income for priority credit tranche access",
        mandatory: false
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Biometric Registration at CSC",
        description: "Visit nearest Common Service Center (CSC) for biometric e-KYC on the PM Vishwakarma portal.",
        timeframe: "1 Day",
        actionLocation: "Common Service Center (CSC)"
      },
      {
        step: 2,
        title: "Gram Panchayat / ULB Three-Tier Verification",
        description: "Verification by Village Head / Municipal Executive Officer followed by District Implementation Committee.",
        timeframe: "5-7 Days",
        actionLocation: "Panchayat / Municipal Body"
      },
      {
        step: 3,
        title: "Basic Skill Training & Daily Stipend",
        description: "Complete 5 to 7 days of modern skill upgrading with daily stipend of ₹500 credited to your account.",
        timeframe: "5-7 Days",
        actionLocation: "MSME Training Centre / ITI"
      },
      {
        step: 4,
        title: "Digital Toolkit E-Voucher Issuance",
        description: "Receive ₹15,000 e-voucher on mobile to purchase modern, certified trade tools.",
        timeframe: "1-2 Days",
        actionLocation: "Digital / Mobile e-RUPI"
      },
      {
        step: 5,
        title: "Collateral-Free Concessional Loan at 5%",
        description: "Access Tranche 1 (up to ₹1 Lakh) and Tranche 2 (up to ₹2 Lakh) enterprise credit at 5% fixed interest rate.",
        timeframe: "5-10 Days",
        actionLocation: "Financing Bank Branch"
      }
    ]
  },
  "pmegp": {
    documentChecklist: [
      {
        id: "aadhaar_pan",
        name: "Aadhaar Card and PAN Card",
        category: "identity_proof",
        categoryLabel: "Identity Proof",
        description: "Mandatory identity and tax registration cards of the entrepreneur",
        mandatory: true
      },
      {
        id: "address_domicile",
        name: "Rural Area Certificate / Domicile",
        category: "address_proof",
        categoryLabel: "Address Proof",
        description: "Gram Panchayat / BDO certificate confirming rural location for higher 35% subsidy claim",
        mandatory: true
      },
      {
        id: "project_report",
        name: "Detailed Project Report (DPR) & Quotations",
        category: "business_document",
        categoryLabel: "Business-Related Document",
        description: "Project report outlining capital expenditure, working capital, machinery supplier quotations, and cashflow projections",
        mandatory: true
      },
      {
        id: "education_proof",
        name: "Educational Qualification Certificate",
        category: "business_document",
        categoryLabel: "Business-Related Document",
        description: "8th pass certificate mandatory for manufacturing projects > ₹10 Lakh and service projects > ₹5 Lakh",
        mandatory: true
      },
      {
        id: "caste_special_cert",
        name: "Special Category Certificate (SC/ST/OBC/Women/PH/Ex-Servicemen)",
        category: "category_certificate",
        categoryLabel: "Category / Certificate Document",
        description: "Official certificate required to claim special category 25% (urban) or 35% (rural) margin money grant",
        mandatory: false
      },
      {
        id: "bank_statement",
        name: "Bank Account Statement (Last 6 Months)",
        category: "bank_details",
        categoryLabel: "Bank / Account Details",
        description: "Operating account statement reflecting financial transactions and promoter contribution (5%-10%)",
        mandatory: true
      },
      {
        id: "income_proof",
        name: "Income Self-Affidavit",
        category: "income_document",
        categoryLabel: "Income-Related Document",
        description: "Declaration of family income and lack of previous government capital subsidy",
        mandatory: false
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "DPR Formulation & Machinery Quotations",
        description: "Prepare Detailed Project Report (DPR) detailing fixed assets, working capital, and vendor quotations.",
        timeframe: "3-5 Days",
        actionLocation: "District Industries Centre (DIC) / Consultant"
      },
      {
        step: 2,
        title: "Online Submission on KVIC PMEGP Portal",
        description: "Upload KYC, DPR, educational proof, and special category certificates on the official portal.",
        timeframe: "1-2 Days",
        actionLocation: "KVIC PMEGP e-Portal"
      },
      {
        step: 3,
        title: "District Task Force Committee (DLTFC) Scrutiny",
        description: "Task Force chaired by District Magistrate interviews entrepreneur and forwards recommendation to bank.",
        timeframe: "10-15 Days",
        actionLocation: "District Magistrate / DIC Office"
      },
      {
        step: 4,
        title: "Bank Credit Appraisal & Sanction",
        description: "Financing bank conducts site inspection and issues formal in-principle credit sanction.",
        timeframe: "7-14 Days",
        actionLocation: "Financing Bank Branch"
      },
      {
        step: 5,
        title: "EDP Training & 3-Year Escrow Subsidy Credit",
        description: "Complete 10-day Entrepreneurship Development Programme (EDP); 25%-35% margin money deposited in bank escrow.",
        timeframe: "10-15 Days",
        actionLocation: "RSETI Training Institute / Bank Branch"
      }
    ]
  },
  "stand-up-india": {
    documentChecklist: [
      {
        id: "aadhaar_pan",
        name: "Aadhaar Card and PAN Card",
        category: "identity_proof",
        categoryLabel: "Identity Proof",
        description: "Identity proof of SC/ST or Woman borrower",
        mandatory: true
      },
      {
        id: "business_address",
        name: "Registered Business Address / Utility Bill",
        category: "address_proof",
        categoryLabel: "Address Proof",
        description: "Electricity bill, registered rent agreement, or land allotment letter for enterprise unit",
        mandatory: true
      },
      {
        id: "greenfield_dpr",
        name: "Greenfield Project Report & Viability Plan",
        category: "business_document",
        categoryLabel: "Business-Related Document",
        description: "Comprehensive project report for first-time greenfield venture in manufacturing, services, or trading",
        mandatory: true
      },
      {
        id: "caste_woman_proof",
        name: "SC/ST Certificate or Woman Shareholding Proof (>51%)",
        category: "category_certificate",
        categoryLabel: "Category / Certificate Document",
        description: "Mandatory certificate verifying SC/ST community or women majority equity holding",
        mandatory: true
      },
      {
        id: "bank_current_statement",
        name: "Bank Statement (Last 6 Months) & Net Worth Statement",
        category: "bank_details",
        categoryLabel: "Bank / Account Details",
        description: "Statement showing promoter contribution margin (minimum 15% of project cost)",
        mandatory: true
      },
      {
        id: "income_itr",
        name: "Past 2-3 Years ITR with Financial Computations",
        category: "income_document",
        categoryLabel: "Income-Related Document",
        description: "Income tax returns of promoters or guarantor (if available)",
        mandatory: false
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Greenfield Proposal Formulation",
        description: "Structure proposal for a first-time venture in manufacturing, services, trading, or agri-allied sector.",
        timeframe: "5-7 Days",
        actionLocation: "Applicant / MSME Support Agency"
      },
      {
        step: 2,
        title: "Online Filing via Stand-Up India Portal",
        description: "Submit application on Stand-Up India portal, selecting your target commercial bank branch.",
        timeframe: "1-2 Days",
        actionLocation: "Stand-Up India Portal"
      },
      {
        step: 3,
        title: "Lead District Manager (LDM) Handholding",
        description: "Lead District Manager or SIDBI handholding agency assists with gap-filling and loan structuring.",
        timeframe: "5-10 Days",
        actionLocation: "Lead Bank Office"
      },
      {
        step: 4,
        title: "Bank Branch Credit Appraisal & Composite Sanction",
        description: "Scheduled Commercial Bank appraises project and sanctions composite term loan and working capital (₹10L - ₹1Cr).",
        timeframe: "15-20 Days",
        actionLocation: "Commercial Bank Branch"
      },
      {
        step: 5,
        title: "CGSSI Guarantee Registration & Disbursement",
        description: "Credit Guarantee Scheme coverage activated and funds disbursed progressively based on project milestones.",
        timeframe: "5-7 Days",
        actionLocation: "Bank Account"
      }
    ]
  },
  "pm-mudra-yojana": {
    documentChecklist: [
      {
        id: "identity_proof",
        name: "Aadhaar Card / Voter ID / Passport",
        category: "identity_proof",
        categoryLabel: "Identity Proof",
        description: "Government photo identity of the business owner",
        mandatory: true
      },
      {
        id: "address_proof",
        name: "Current Residence & Shop Address Proof",
        category: "address_proof",
        categoryLabel: "Address Proof",
        description: "Electricity bill, property tax receipt, or rental deed",
        mandatory: true
      },
      {
        id: "business_udyam",
        name: "Udyam MSME Registration & Purchase Invoices",
        category: "business_document",
        categoryLabel: "Business-Related Document",
        description: "Udyam certificate, trade license, or supplier machinery/inventory quotation",
        mandatory: true
      },
      {
        id: "bank_passbook",
        name: "Bank Statement / Passbook (Last 6 Months)",
        category: "bank_details",
        categoryLabel: "Bank / Account Details",
        description: "Record of financial turnover with IFSC details",
        mandatory: true
      },
      {
        id: "sales_turnover",
        name: "Estimated Sales Turnover / Income Slip",
        category: "income_document",
        categoryLabel: "Income-Related Document",
        description: "1-year projected turnover sheet or GST returns (if applicable)",
        mandatory: false
      },
      {
        id: "category_proof",
        name: "Community Certificate (SC/ST/OBC/Minority)",
        category: "category_certificate",
        categoryLabel: "Category / Certificate Document",
        description: "Optional certificate for affirmative action tracking",
        mandatory: false
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Select MUDRA Category",
        description: "Determine whether your funding need matches Shishu (up to ₹50k), Kishore (₹50k-₹5L), or Tarun (₹5L-₹20L).",
        timeframe: "1 Day",
        actionLocation: "Saarthi / Bank Branch"
      },
      {
        step: 2,
        title: "Application Submission via JanSamarth / Bank",
        description: "Apply on JanSamarth portal or visit nearest Public / Private Sector Bank, RRB, or MFI branch.",
        timeframe: "1-2 Days",
        actionLocation: "JanSamarth Portal / Bank Branch"
      },
      {
        step: 3,
        title: "Loan Officer Field & Credit Assessment",
        description: "Bank loan officer assesses business premises, inventory flow, and repayment feasibility.",
        timeframe: "3-5 Days",
        actionLocation: "Business Premises & Bank"
      },
      {
        step: 4,
        title: "Collateral-Free Loan Sanction",
        description: "Bank issues sanction letter under Credit Guarantee Fund for Micro Units (CGFMU) without collateral.",
        timeframe: "2-4 Days",
        actionLocation: "Bank Branch"
      },
      {
        step: 5,
        title: "MUDRA Card Issuance & Credit Release",
        description: "Working capital limit activated with MUDRA RuPay Debit Card for progressive inventory drawdown.",
        timeframe: "1-2 Days",
        actionLocation: "Bank Account"
      }
    ]
  },
  "mahila-samridhi-yojana": {
    documentChecklist: [
      {
        id: "aadhaar_female",
        name: "Aadhaar Card of Female Applicant",
        category: "identity_proof",
        categoryLabel: "Identity Proof",
        description: "Photo ID confirming female entrepreneurship",
        mandatory: true
      },
      {
        id: "residence_proof",
        name: "Voter ID / Ration Card / Domicile",
        category: "address_proof",
        categoryLabel: "Address Proof",
        description: "Valid residential address proof within state jurisdiction",
        mandatory: true
      },
      {
        id: "income_below_3lakh",
        name: "Annual Family Income Certificate (< ₹3,00,000 p.a.)",
        category: "income_document",
        categoryLabel: "Income-Related Document",
        description: "Income certificate issued by Tahsildar / Revenue Authority confirming family income within ceiling",
        mandatory: true
      },
      {
        id: "sc_caste_cert",
        name: "Scheduled Caste (SC) Certificate",
        category: "category_certificate",
        categoryLabel: "Category / Certificate Document",
        description: "Caste certificate issued by competent district revenue authority",
        mandatory: true
      },
      {
        id: "micro_business_plan",
        name: "Micro-Enterprise Activity Proposal / SHG Proof",
        category: "business_document",
        categoryLabel: "Business-Related Document",
        description: "Brief outline of proposed income-generating activity (tailoring, vending, dairy, small shop)",
        mandatory: true
      },
      {
        id: "bank_female_passbook",
        name: "Individual Bank Account Passbook (Female Applicant)",
        category: "bank_details",
        categoryLabel: "Bank / Account Details",
        description: "Savings account passbook in applicant's name with IFSC",
        mandatory: true
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Application Dossier Collection",
        description: "Collect prescribed application form from State Channelizing Agency (SCA) or District SC Development Office.",
        timeframe: "1-2 Days",
        actionLocation: "District SCA Office / Portal"
      },
      {
        step: 2,
        title: "Attach SC Certificate & Income Proof (< ₹3L)",
        description: "Attach certified copy of Scheduled Caste certificate and income certificate verified by revenue authority.",
        timeframe: "2-3 Days",
        actionLocation: "Revenue Authority / CSC"
      },
      {
        step: 3,
        title: "Field Verification by SCA Nodal Officer",
        description: "Nodal officer inspects the SHG or individual enterprise location to verify self-employment potential.",
        timeframe: "5-7 Days",
        actionLocation: "Enterprise Site"
      },
      {
        step: 4,
        title: "Sanction at 4% Concessional Interest Rate",
        description: "State Corporation approves funding up to ₹1.4 Lakh with state and NSFDC credit backing.",
        timeframe: "5-7 Days",
        actionLocation: "SCA Board"
      },
      {
        step: 5,
        title: "Direct Account Credit & EMI Start",
        description: "Loan disbursed into female beneficiary's bank account with low monthly repayment installment.",
        timeframe: "1-2 Days",
        actionLocation: "Bank Account"
      }
    ]
  },
  "mahila-coir-yojana": {
    documentChecklist: [
      {
        id: "aadhaar_id",
        name: "Aadhaar Card of Woman Artisan",
        category: "identity_proof",
        categoryLabel: "Identity Proof",
        description: "Primary identity proof for beneficiary registration",
        mandatory: true
      },
      {
        id: "rural_residence",
        name: "Gram Panchayat Residence Certificate",
        category: "address_proof",
        categoryLabel: "Address Proof",
        description: "Certificate verifying rural residence in notified coir-producing cluster",
        mandatory: true
      },
      {
        id: "coir_training_cert",
        name: "Coir Board Training Completion Certificate",
        category: "business_document",
        categoryLabel: "Business-Related Document",
        description: "Certificate showing completion of 2-month motorized ratt spinning training",
        mandatory: true
      },
      {
        id: "bpl_income_proof",
        name: "Income Certificate / BPL Card Copy",
        category: "income_document",
        categoryLabel: "Income-Related Document",
        description: "Proof of belonging to low-income / rural household",
        mandatory: false
      },
      {
        id: "bank_passbook_coir",
        name: "Aadhaar-Linked Bank Passbook Copy",
        category: "bank_details",
        categoryLabel: "Bank / Account Details",
        description: "Bank details for receiving 75% capital subsidy on equipment",
        mandatory: true
      },
      {
        id: "category_artisan",
        name: "Traditional Artisan / Women SHG Verification",
        category: "category_certificate",
        categoryLabel: "Category / Certificate Document",
        description: "Recommendation from local Self-Help Group or Mahila Mandal",
        mandatory: false
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Complete 2-Month Coir Board Training",
        description: "Undergo motorized ratt spinning training at Coir Board Training Centre or designated field cluster.",
        timeframe: "60 Days",
        actionLocation: "Coir Board Regional Centre"
      },
      {
        step: 2,
        title: "Submit Equipment Subsidy Application",
        description: "File application for motorized traditional or electronic ratt spinning equipment.",
        timeframe: "1-2 Days",
        actionLocation: "Coir Board Sub-Office"
      },
      {
        step: 3,
        title: "Technical Feasibility Inspection",
        description: "Coir Board Field Officer inspects beneficiary premises and confirms power/workspace availability.",
        timeframe: "3-5 Days",
        actionLocation: "Artisan Work Shed"
      },
      {
        step: 4,
        title: "Sanction of 75% Capital Subsidy",
        description: "Coir Board sanctions 75% subsidy on motorized ratt cost; beneficiary contributes balance 25%.",
        timeframe: "5-7 Days",
        actionLocation: "Coir Board HQ"
      },
      {
        step: 5,
        title: "Equipment Delivery & Commissioning",
        description: "Machinery delivered and installed on-site with warranty and technical maintenance handbook.",
        timeframe: "5-10 Days",
        actionLocation: "Artisan Work Shed"
      }
    ]
  },
  "nssh-subsidy": {
    documentChecklist: [
      {
        id: "aadhaar_pan_promoters",
        name: "Aadhaar & PAN Cards of SC/ST Promoters",
        category: "identity_proof",
        categoryLabel: "Identity Proof",
        description: "Identity verification for all partners/directors",
        mandatory: true
      },
      {
        id: "factory_premises_proof",
        name: "Factory / Workshop Lease Agreement or Utility Bill",
        category: "address_proof",
        categoryLabel: "Address Proof",
        description: "Proof of business manufacturing location",
        mandatory: true
      },
      {
        id: "sc_st_shareholding",
        name: "SC/ST Caste Certificates & Equity Shareholding Proof",
        category: "category_certificate",
        categoryLabel: "Category / Certificate Document",
        description: "Certificates confirming >51% SC/ST ownership of enterprise",
        mandatory: true
      },
      {
        id: "udyam_machinery_invoice",
        name: "Udyam Registration & Pro-forma Invoice for Machinery",
        category: "business_document",
        categoryLabel: "Business-Related Document",
        description: "Quotation from certified manufacturer for eligible plant and machinery",
        mandatory: true
      },
      {
        id: "audited_financials",
        name: "Audited Financial Statements / Tax Returns (Last 2 Yrs)",
        category: "income_document",
        categoryLabel: "Income-Related Document",
        description: "Balance sheet, P&L, and GST returns of operational unit",
        mandatory: true
      },
      {
        id: "bank_sanction_letter",
        name: "Bank Term Loan Sanction Letter & Current Account Details",
        category: "bank_details",
        categoryLabel: "Bank / Account Details",
        description: "Evidence of institutional credit sanction for machinery purchase",
        mandatory: true
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Select Eligible Plant & Machinery",
        description: "Select modern technology equipment compliant with SCLCSS guidelines and get vendor pro-forma invoice.",
        timeframe: "3-5 Days",
        actionLocation: "Enterprise / Machinery Vendor"
      },
      {
        step: 2,
        title: "Obtain Institutional Term Loan",
        description: "Secure term loan sanction from Scheduled Commercial Bank or State Financial Corporation.",
        timeframe: "10-15 Days",
        actionLocation: "Lending Bank Branch"
      },
      {
        step: 3,
        title: "Online Subsidy Claim on MSME NSSH Portal",
        description: "Lending bank branch uploads loan details and machinery invoices to NSSH SCLCSS portal.",
        timeframe: "2-3 Days",
        actionLocation: "NSSH SCLCSS Portal"
      },
      {
        step: 4,
        title: "Joint Physical Verification",
        description: "Joint inspection of installed machinery by MSME Development Institute and bank officer.",
        timeframe: "7-14 Days",
        actionLocation: "Manufacturing Unit"
      },
      {
        step: 5,
        title: "25% Capital Subsidy Disbursement",
        description: "25% upfront subsidy credited directly to term loan account, reducing principal balance immediately.",
        timeframe: "10-20 Days",
        actionLocation: "Term Loan Account"
      }
    ]
  },
  "dairy-entrepreneurship-deds": {
    documentChecklist: [
      {
        id: "aadhaar_card",
        name: "Aadhaar Card",
        category: "identity_proof",
        categoryLabel: "Identity Proof",
        description: "Primary KYC identity document",
        mandatory: true
      },
      {
        id: "land_residence_proof",
        name: "Land Records (7/12 or Khasra) / Gram Panchayat Certificate",
        category: "address_proof",
        categoryLabel: "Address Proof",
        description: "Proof of rural residency and agricultural land/shed availability",
        mandatory: true
      },
      {
        id: "dairy_dpr",
        name: "Dairy Project Proposal & Cattle Purchase Quotation",
        category: "business_document",
        categoryLabel: "Business-Related Document",
        description: "Plan outlining number of milch animals, fodder plan, and milk chilling/marketing arrangement",
        mandatory: true
      },
      {
        id: "veterinary_health_cert",
        name: "Veterinary Doctor Health & Tagging Certificate",
        category: "business_document",
        categoryLabel: "Business-Related Document",
        description: "Health certificate and ear-tagging records for purchased cattle",
        mandatory: true
      },
      {
        id: "caste_cert",
        name: "Caste Certificate (SC/ST for 33.33% Subsidy)",
        category: "category_certificate",
        categoryLabel: "Category / Certificate Document",
        description: "Certificate to qualify for enhanced 33.33% subsidy (vs 25% general)",
        mandatory: false
      },
      {
        id: "bank_rrb_passbook",
        name: "Regional Rural Bank (RRB) / Commercial Bank Passbook",
        category: "bank_details",
        categoryLabel: "Bank / Account Details",
        description: "Savings or loan account passbook copy for NABARD subsidy routing",
        mandatory: true
      },
      {
        id: "income_rural_cert",
        name: "Small / Marginal Farmer Certificate",
        category: "income_document",
        categoryLabel: "Income-Related Document",
        description: "Certificate from Revenue Authority confirming smallholder status",
        mandatory: false
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Prepare Dairy Project Proposal",
        description: "Structure proposal for 2 to 10 milch cattle, milking equipment, or cold chain unit.",
        timeframe: "2-3 Days",
        actionLocation: "Dairy Cooperative / DIC"
      },
      {
        step: 2,
        title: "Submit Loan Application to Rural Bank",
        description: "Submit application to local Regional Rural Bank (RRB), DCCB, or Commercial Bank branch.",
        timeframe: "1-2 Days",
        actionLocation: "Rural Bank Branch"
      },
      {
        step: 3,
        title: "Bank Appraisal & In-Principle Sanction",
        description: "Bank manager verifies cattle shed, water supply, and milk marketing tie-up.",
        timeframe: "5-7 Days",
        actionLocation: "Farm Shed & Bank"
      },
      {
        step: 4,
        title: "Cattle Purchase & Veterinary Tagging",
        description: "Purchase livestock accompanied by Bank Purchase Committee and government veterinary officer.",
        timeframe: "3-5 Days",
        actionLocation: "Livestock Fair / Farm"
      },
      {
        step: 5,
        title: "NABARD Back-Ended Subsidy Release",
        description: "Bank claims 25%-33.33% capital subsidy from NABARD, credited into Borrower Subsidy Reserve Fund.",
        timeframe: "15-30 Days",
        actionLocation: "Bank Account"
      }
    ]
  },
  "cgtmse-micro-guarantee": {
    documentChecklist: [
      {
        id: "aadhaar_pan_directors",
        name: "Aadhaar and PAN Card of Promoters",
        category: "identity_proof",
        categoryLabel: "Identity Proof",
        description: "KYC documents of all key partners/directors",
        mandatory: true
      },
      {
        id: "registered_office_proof",
        name: "Business Premises Lease Deed / Property Tax Bill",
        category: "address_proof",
        categoryLabel: "Address Proof",
        description: "Proof of registered operating enterprise location",
        mandatory: true
      },
      {
        id: "udyam_and_business_plan",
        name: "Udyam Certificate & Comprehensive Business Viability Report",
        category: "business_document",
        categoryLabel: "Business-Related Document",
        description: "Techno-economic feasibility report detailing working capital & capital expenditure requirements",
        mandatory: true
      },
      {
        id: "audited_balance_sheets",
        name: "Audited Balance Sheets & Projected Cashflows (3 Years)",
        category: "income_document",
        categoryLabel: "Income-Related Document",
        description: "Past 2-3 years financials with projected revenue for debt servicing",
        mandatory: true
      },
      {
        id: "zed_women_certificate",
        name: "Women / SC-ST / ZED Certification (If Applicable)",
        category: "category_certificate",
        categoryLabel: "Category / Certificate Document",
        description: "Certificates qualifying for enhanced 85% guarantee coverage and fee concessions",
        mandatory: false
      },
      {
        id: "operating_bank_statement",
        name: "Operating Bank Statements (Last 12 Months) & CIBIL Report",
        category: "bank_details",
        categoryLabel: "Bank / Account Details",
        description: "Banking history establishing repayment discipline",
        mandatory: true
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Project Plan with Cashflow Projections",
        description: "Structure proposal detailing fund utilization and debt servicing coverage ratio (DSCR).",
        timeframe: "3-5 Days",
        actionLocation: "Chartered Accountant / Enterprise"
      },
      {
        step: 2,
        title: "Approach Member Lending Institution (MLI)",
        description: "Submit proposal to MLI Bank (Public, Private, or Small Finance Bank) specifically requesting CGTMSE coverage.",
        timeframe: "1-2 Days",
        actionLocation: "Commercial Bank Branch"
      },
      {
        step: 3,
        title: "Bank Appraisal (No Collateral Requested)",
        description: "Bank evaluates proposal purely on commercial viability without demanding third-party property pledge.",
        timeframe: "7-14 Days",
        actionLocation: "Bank Branch"
      },
      {
        step: 4,
        title: "CGTMSE Guarantee Registration",
        description: "Lending institution logs proposal on CGTMSE portal to secure sovereign credit guarantee backing.",
        timeframe: "2-4 Days",
        actionLocation: "CGTMSE Online Portal"
      },
      {
        step: 5,
        title: "Credit Facility Sanction & Disbursement",
        description: "Sanction letter issued and composite term loan/cash credit limit credited into operating account.",
        timeframe: "3-5 Days",
        actionLocation: "Current Account"
      }
    ]
  },
  "nbcfdc-swarnima-scheme": {
    documentChecklist: [
      {
        id: "aadhaar_female_applicant",
        name: "Aadhaar Card of Female Applicant",
        category: "identity_proof",
        categoryLabel: "Identity Proof",
        description: "KYC identity proof of the woman entrepreneur",
        mandatory: true
      },
      {
        id: "domicile_certificate",
        name: "Domicile Certificate / Ration Card",
        category: "address_proof",
        categoryLabel: "Address Proof",
        description: "Proof of local state residence",
        mandatory: true
      },
      {
        id: "obc_certificate",
        name: "Other Backward Classes (OBC) Certificate",
        category: "category_certificate",
        categoryLabel: "Category / Certificate Document",
        description: "Non-creamy layer OBC certificate issued by authorized Sub-Divisional Magistrate / Tahsildar",
        mandatory: true
      },
      {
        id: "family_income_under_3lakh",
        name: "Family Income Certificate (< ₹3,00,000 p.a.)",
        category: "income_document",
        categoryLabel: "Income-Related Document",
        description: "Income certificate confirming total family income complies with ceiling",
        mandatory: true
      },
      {
        id: "self_employment_plan",
        name: "Self-Employment Project Plan / Tool Quotation",
        category: "business_document",
        categoryLabel: "Business-Related Document",
        description: "Plan for small venture (beauty parlour, tailoring shop, retail store, pickle making)",
        mandatory: true
      },
      {
        id: "bank_savings_passbook",
        name: "Active Bank Passbook Copy with IFSC",
        category: "bank_details",
        categoryLabel: "Bank / Account Details",
        description: "Individual savings account passbook for concessional loan credit",
        mandatory: true
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Collect Application Form from State Corporation",
        description: "Collect Swarnima scheme application from State Backward Classes Development Corporation (SCA).",
        timeframe: "1-2 Days",
        actionLocation: "District SCA Office"
      },
      {
        step: 2,
        title: "Attach OBC & Income Certificates",
        description: "Attach certified copy of OBC caste certificate and Tahsildar income certificate (< ₹3 Lakh).",
        timeframe: "2-3 Days",
        actionLocation: "Tehsil / Sub-Divisional Office"
      },
      {
        step: 3,
        title: "District Screening Committee Interview",
        description: "Screening committee evaluates applicant's experience and viability of self-employment trade.",
        timeframe: "7-10 Days",
        actionLocation: "District SCA Office"
      },
      {
        step: 4,
        title: "Concessional Loan Sanction at 5%",
        description: "Sanction letter approved for credit up to ₹2 Lakh at 5% fixed annual interest rate.",
        timeframe: "5-7 Days",
        actionLocation: "NBCFDC / SCA Office"
      },
      {
        step: 5,
        title: "Direct Account Disbursement",
        description: "Funds transferred into beneficiary bank account for procurement of raw material and tools.",
        timeframe: "1-3 Days",
        actionLocation: "Savings Account"
      }
    ]
  },
  "pm-surya-ghar-msme": {
    documentChecklist: [
      {
        id: "aadhaar_pan_commercial",
        name: "Aadhaar & PAN Card of Applicant / Enterprise",
        category: "identity_proof",
        categoryLabel: "Identity Proof",
        description: "Identity proof of the electricity consumer",
        mandatory: true
      },
      {
        id: "electricity_bill",
        name: "Latest Electricity Bill (Active DISCOM Connection)",
        category: "address_proof",
        categoryLabel: "Address Proof",
        description: "Recent electricity bill showing Consumer Account (CA) number and sanctioned load",
        mandatory: true
      },
      {
        id: "roof_ownership_proof",
        name: "Roof Ownership / Valid Long-Term Lease Deed",
        category: "business_document",
        categoryLabel: "Business-Related Document",
        description: "Proof of clear roof rights for mounting solar panels and net-metering setup",
        mandatory: true
      },
      {
        id: "udyam_enterprise_proof",
        name: "Udyam Registration Certificate (Commercial / Workshop)",
        category: "business_document",
        categoryLabel: "Business-Related Document",
        description: "Registration proving commercial / workshop MSME status for commercial tariff subsidy",
        mandatory: true
      },
      {
        id: "annual_turnover_slip",
        name: "Enterprise Annual Turnover / Sales Declaration",
        category: "income_document",
        categoryLabel: "Income-Related Document",
        description: "Record of business turnover establishing commercial viability",
        mandatory: false
      },
      {
        id: "bank_passbook_discom",
        name: "Bank Passbook / Cancelled Cheque Linked to DISCOM",
        category: "bank_details",
        categoryLabel: "Bank / Account Details",
        description: "Bank details for receiving direct Central Financial Assistance (CFA) subsidy DBT",
        mandatory: true
      }
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Registration on National Solar Rooftop Portal",
        description: "Register online with your DISCOM name, electricity Consumer Account (CA) number, and mobile.",
        timeframe: "1 Day",
        actionLocation: "National Rooftop Solar Portal"
      },
      {
        step: 2,
        title: "DISCOM Technical Feasibility Approval",
        description: "Local electricity distribution company verifies transformer capacity and grants net-metering approval.",
        timeframe: "3-7 Days",
        actionLocation: "DISCOM Sub-Division Office"
      },
      {
        step: 3,
        title: "Selection of Empaneled Vendor & Installation",
        description: "Choose certified ALMM-compliant solar vendor to install panels, inverter, and bidirectional wiring.",
        timeframe: "7-14 Days",
        actionLocation: "Commercial / Workshop Roof"
      },
      {
        step: 4,
        title: "Net-Meter Inspection & Commissioning",
        description: "DISCOM engineers test net-meter, solar synchronization, and issue formal Commissioning Certificate.",
        timeframe: "3-5 Days",
        actionLocation: "Workshop Site"
      },
      {
        step: 5,
        title: "Direct Subsidy Credit into Bank Account",
        description: "Upload commissioning certificate and bank passbook; government subsidy credited within 30 days.",
        timeframe: "15-30 Days",
        actionLocation: "Bank Account"
      }
    ]
  }
};

function injectData(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  // Check if schemes array can be updated
  let updatedContent = content;

  Object.entries(SCHEME_DOCS_AND_STEPS).forEach(([schemeId, data]) => {
    // Match scheme by id and inject documentChecklist and applicationSteps before collateralRequired
    const idNeedle = `id: "${schemeId}",`;
    if (!updatedContent.includes(idNeedle)) {
      console.warn(`Could not find scheme ${schemeId} in ${filePath}`);
      return;
    }

    // Convert documentChecklist and applicationSteps to code string
    const docJson = JSON.stringify(data.documentChecklist, null, 6)
      .replace(/^{\n/g, "{\n")
      .replace(/"([^"]+)":/g, "$1:");
    const stepsJson = JSON.stringify(data.applicationSteps, null, 6)
      .replace(/^{\n/g, "{\n")
      .replace(/"([^"]+)":/g, "$1:");

    const injection = `    documentChecklist: ${docJson},\n    applicationSteps: ${stepsJson},\n`;

    // Only inject if not already present
    const schemeBlockStart = updatedContent.indexOf(idNeedle);
    const nextSchemeOrEnd = updatedContent.indexOf("},\n  {", schemeBlockStart);
    const blockEnd = nextSchemeOrEnd !== -1 ? nextSchemeOrEnd : updatedContent.indexOf("}\n];", schemeBlockStart);

    const blockSlice = updatedContent.slice(schemeBlockStart, blockEnd);
    if (!blockSlice.includes("documentChecklist:")) {
      // Inject before collateralRequired: false,
      const targetPos = updatedContent.indexOf("collateralRequired:", schemeBlockStart);
      if (targetPos !== -1 && targetPos < blockEnd) {
        updatedContent = updatedContent.slice(0, targetPos) + injection + updatedContent.slice(targetPos);
      }
    }
  });

  fs.writeFileSync(filePath, updatedContent, "utf-8");
  console.log(`Updated ${filePath} successfully!`);
}

// Update client and server
const clientPath = path.resolve("X:/Digital Pioneer/client/src/data/schemes.js");
const serverPath = path.resolve("X:/Digital Pioneer/server/src/data/schemes.js");

injectData(clientPath);
injectData(serverPath);
console.log("All schemes data updated successfully with structured document checklists and application steps!");

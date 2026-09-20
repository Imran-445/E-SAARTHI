/**
 * Saarthi (SIH 2026) - Centralized Scheme Data System
 * 
 * IMPORTANT PROTOTYPE NOTICE:
 * This file contains realistic MOCK scheme data created for system demonstration,
 * UI testing, and prototype evaluation. Official government APIs and live values
 * are not available for this prototype. Sample values should NOT be treated as current
 * official government figures.
 */

export const schemes = [
  {
    "id": "micro-finance-scheme",
    "name": "Micro Finance Scheme",
    "schemeName": "Micro Finance Scheme",
    "shortName": "Micro Finance",
    "shortDescription": "For small businesses & self-employment with collateral-free credit, concessional interest rates, and flexible moratorium.",
    "overview": "Micro Finance Scheme is an accessible financial inclusion facility engineered to provide collateral-free microcredit for small enterprises, roadside kiosks, rural crafts, and self-employment ventures. It features flexible moratorium periods between 3 to 6 months and affordable interest rates of 6.5% to 8% p.a.",
    "category": "Micro Finance & Self-Employment",
    "eligibleCategory": "Micro-Entrepreneurs, Self-Employed Individuals & Small Businesses",
    "targetBeneficiaries": [
      "Small Shop Owners",
      "Self-Employed Individuals",
      "Micro Retailers",
      "Women Entrepreneurs",
      "Home-Based Artisans"
    ],
    "targetDemographic": [
      "General",
      "SC",
      "ST",
      "OBC",
      "Women",
      "Minority",
      "Self-Employed",
      "Micro Enterprise"
    ],
    "purpose": [
      "Working Capital",
      "Business Setup",
      "Equipment & Machinery",
      "Expansion & Modernization"
    ],
    "minLoanAmount": 10000,
    "maxLoanAmount": 140000,
    "minLoan": 10000,
    "maxLoan": 140000,
    "keyBenefit": "Collateral-free credit up to ₹1,40,000 with 6.5% - 8% interest and 3 - 6 months moratorium grace period",
    "subsidyInformation": "Low-interest priority microfinance with 3-6 months repayment moratorium for enterprise stabilization.",
    "subsidyRate": "6.5% - 8% p.a. Concessional Interest Rate",
    "subsidyType": "Concessional Microcredit",
    "interestRate": "6.5% - 8% p.a.",
    "defaultInterestRate": 6.5,
    "defaultTenureYears": 3,
    "defaultMoratoriumMonths": 3,
    "defaultLoanAmount": 100000,
    "incomeEligibility": "Annual family income up to ₹5,00,000 per annum.",
    "sector": [
      "Retail Grocery, Kirana & General Stores",
      "Personal Care, Beauty & Tailoring",
      "Food Processing, Bakeries & Agro-Products",
      "Traditional Handicrafts & Clay/Pottery"
    ],
    "eligibleSectors": [
      "Retail Grocery, Kirana & General Stores",
      "Personal Care, Beauty & Tailoring",
      "Food Processing, Bakeries & Agro-Products",
      "Traditional Handicrafts & Clay/Pottery",
      "All"
    ],
    "businessTypes": [
      "Micro Enterprise",
      "Small Retail Shop",
      "Self-Employed / Service",
      "Home-Based Crafts"
    ],
    "ruralUrbanEligibility": "Both Rural & Urban",
    "eligibleLocations": [
      "Rural",
      "Urban",
      "Within District",
      "Within State",
      "All"
    ],
    "requiredDocuments": [
      "Aadhaar Card linked to active mobile number",
      "Bank Account Passbook / Statement (last 6 months)",
      "Proof of Business Activity or Local Trade Certificate",
      "Income Self-Declaration or Certificate"
    ],
    "documentsRequired": [
      "Aadhaar Card linked to active mobile number",
      "Bank Account Passbook / Statement (last 6 months)",
      "Proof of Business Activity or Local Trade Certificate",
      "Income Self-Declaration or Certificate"
    ],
    "applicationMethod": "Online via Saarthi portal or through nearest Partner Bank / CSC Mitra desk.",
    "officialSourceUrl": "https://www.myscheme.gov.in",
    "applicationUrl": "https://www.myscheme.gov.in",
    "schemeStatus": "Active (Mock Prototype Evaluation)",
    "ministry": "Ministry of Finance & Priority Microfinance Framework",
    "collateralRequired": false,
    "tenureMonths": 36,
    "repaymentPeriod": "1 to 5 Years (12 to 60 Months)",
    "moratorium": "3 - 6 Months",
    "moratoriumMonths": 3,
    "fundingTypes": [
      "Collateral-Free Microcredit",
      "Term Loan"
    ],
    "isMockData": true,
    "disclaimer": "Realistic mock prototype data matching the Saarthi UI design reference for evaluation purposes.",
    "documentChecklist": [
      {
        "id": "mfs-aadhaar",
        "name": "Aadhaar Card (Mobile Linked)",
        "category": "identity_proof",
        "mandatory": true,
        "description": "Official UIDAI identity card linked with active mobile number for biometric e-KYC authentication."
      },
      {
        "id": "mfs-address",
        "name": "Proof of Residence / Domicile Certificate",
        "category": "address_proof",
        "mandatory": true,
        "description": "Recent electricity bill, ration card, or voter ID verifying permanent residence in the district."
      },
      {
        "id": "mfs-income",
        "name": "Income Self-Declaration / Certificate",
        "category": "income_document",
        "mandatory": false,
        "description": "Self-certified declaration of family income verifying household income within ₹5,00,000 threshold."
      },
      {
        "id": "mfs-category",
        "name": "Social Category Certificate (SC/ST/OBC/Minority)",
        "category": "category_certificate",
        "mandatory": false,
        "description": "Official community certificate issued by Revenue Department for concessional priority allocation."
      },
      {
        "id": "mfs-business",
        "name": "Trade Activity Proof or Local Vendor Slip",
        "category": "business_document",
        "mandatory": true,
        "description": "Proof of operating micro-enterprise, trade license, or municipal registration slip."
      },
      {
        "id": "mfs-bank",
        "name": "Bank Account Passbook / Statement",
        "category": "bank_details",
        "mandatory": true,
        "description": "Active savings or current account passbook showing IFSC code, account number, and 6 months transactions."
      }
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Assemble KYC and Business Verification Documents",
        "description": "Gather mobile-seeded Aadhaar, bank passbook, and proof of operating micro-business.",
        "timeframe": "1-2 Days",
        "actionLocation": "Self / CSC Center"
      },
      {
        "step": 2,
        "title": "Submit Application at Partner Bank or CSC Desk",
        "description": "Present documents to a designated Microfinance Bank Mitra or local Common Service Center.",
        "timeframe": "1 Day",
        "actionLocation": "CSC Center / Bank Mitra"
      },
      {
        "step": 3,
        "title": "Field Verification & Credit Appraisal",
        "description": "Bank field officer verifies enterprise premises, operating inventory, and credit history.",
        "timeframe": "3-5 Days",
        "actionLocation": "Enterprise Location"
      },
      {
        "step": 4,
        "title": "Loan Sanction & Disbursement",
        "description": "Sign microcredit agreement; funds disbursed directly into bank account with 3-6 month moratorium.",
        "timeframe": "2-3 Days",
        "actionLocation": "Bank Account"
      }
    ]
  },
  {
    "id": "pm-svanidhi",
    "name": "PM SVANidhi (Street Vendor's AtmaNirbhar Nidhi)",
    "schemeName": "PM SVANidhi (Street Vendor's AtmaNirbhar Nidhi)",
    "shortName": "PM SVANidhi",
    "shortDescription": "Affordable collateral-free working capital loan designed for urban and peri-urban street vendors with 7% interest subsidy and digital cashbacks.",
    "overview": "PM SVANidhi is a special micro-credit facility launched to empower street vendors, hawkers, thela operators, and small roadside service providers. It offers collateral-free working capital in progressive tranches (₹10,000, ₹20,000, and ₹50,000) upon timely repayment, accompanied by an attractive 7% annual interest subsidy credited directly to bank accounts and incentives for digital UPI transactions.",
    "category": "Street Vendors & Urban Micro-sellers",
    "eligibleCategory": "Street Vendors, Hawkers & Daily Urban Sellers",
    "targetBeneficiaries": [
      "Street Vendors",
      "Hawkers & Thela Operators",
      "Vegetable & Fruit Sellers",
      "Roadside Food & Tea Stalls",
      "Urban Micro-Service Providers"
    ],
    "targetDemographic": [
      "Street Vendors",
      "Hawkers",
      "Women",
      "General",
      "SC",
      "ST",
      "OBC",
      "Minority"
    ],
    "purpose": [
      "Working Capital",
      "Daily Inventory Purchase",
      "Vending Cart Upgradation",
      "Business Setup"
    ],
    "minLoanAmount": 10000,
    "maxLoanAmount": 50000,
    "minLoan": 10000,
    "maxLoan": 50000,
    "keyBenefit": "Collateral-free credit up to ₹50,000 in progressive tranches with 7% interest rebate & digital cashbacks",
    "subsidyInformation": "7% annual interest subvention directly credited quarterly into savings account + up to ₹1,200 annual cashbacks on digital transactions.",
    "subsidyRate": "7% Interest Subsidy + up to ₹1,200/yr digital cashback",
    "subsidyType": "Interest Concession & Digital Incentives",
    "interestRate": "Subsidized effective interest rate (~7% p.a. with subvention)",
    "incomeEligibility": "No mandatory household income ceiling; vendor must possess Urban Local Body (ULB) vending certificate or Letter of Recommendation (LoR).",
    "sector": [
      "Retail Vending & Hawkers",
      "Fast Food & Eateries",
      "Fruits, Vegetables & Perishables",
      "Small Personal Services"
    ],
    "eligibleSectors": [
      "Retail Grocery, Kirana & General Stores",
      "Food Processing, Bakeries & Agro-Products",
      "Personal Care, Beauty & Tailoring",
      "All"
    ],
    "businessTypes": [
      "Street Vendor",
      "Retail/Vending",
      "Micro Enterprise"
    ],
    "ruralUrbanEligibility": "Urban & Peri-Urban",
    "eligibleLocations": [
      "Urban",
      "Within District",
      "Within State",
      "All"
    ],
    "requiredDocuments": [
      "Aadhaar Card linked to active mobile number",
      "Certificate of Vending (CoV) or Urban Local Body Identity Card or Letter of Recommendation (LoR)",
      "Active Savings Bank Account Passbook",
      "Recent passport-size photograph"
    ],
    "documentsRequired": [
      "Aadhaar Card linked to active mobile number",
      "Certificate of Vending (CoV) or Urban Local Body Identity Card or Letter of Recommendation (LoR)",
      "Active Savings Bank Account Passbook",
      "Recent passport-size photograph"
    ],
    "applicationMethod": "Online via the official PM SVANidhi portal or offline through any Common Service Center (CSC) / Bank Mitra.",
    "officialSourceUrl": "https://pmsvanidhi.mohua.gov.in",
    "applicationUrl": "https://pmsvanidhi.mohua.gov.in",
    "schemeStatus": "Active (Mock Prototype Data)",
    "ministry": "Ministry of Housing and Urban Affairs (MoHUA)",
    "collateralRequired": false,
    "tenureMonths": 12,
    "repaymentPeriod": "12 to 36 Months",
    "moratorium": "Nil",
    "fundingTypes": [
      "Collateral-Free Microcredit",
      "Working Capital / CC Limit"
    ],
    "isMockData": true,
    "disclaimer": "Realistic mock prototype data for evaluation purposes. Not official government values.",
    "documentChecklist": [
      {
        "id": "svanidhi-aadhaar",
        "name": "Aadhaar Card (Linked with Active Mobile)",
        "category": "identity_proof",
        "mandatory": true,
        "description": "Required for Aadhaar-based OTP verification and e-KYC on official PM SVANidhi portal."
      },
      {
        "id": "svanidhi-cov",
        "name": "Certificate of Vending (CoV) or ULB ID / LoR",
        "category": "business_document",
        "mandatory": true,
        "description": "Issued by Urban Local Body (ULB) / Town Vending Committee (TVC) or Letter of Recommendation (LoR)."
      },
      {
        "id": "svanidhi-bank",
        "name": "Active Savings Bank Account Passbook",
        "category": "bank_details",
        "mandatory": true,
        "description": "Savings account linked to mobile for quarterly 7% interest subsidy & UPI transaction cashbacks."
      },
      {
        "id": "svanidhi-photo",
        "name": "Recent Passport-size Photograph",
        "category": "identity_proof",
        "mandatory": false,
        "description": "Two recent colour passport photographs of the street vendor."
      },
      {
        "id": "svanidhi-category",
        "name": "Social Category Certificate (SC/ST/OBC/Minority)",
        "category": "category_certificate",
        "mandatory": false,
        "description": "Optional certificate for social welfare integration under PM SVANidhi se Samriddhi program."
      },
      {
        "id": "svanidhi-income",
        "name": "Self-Declaration of Vending Income",
        "category": "income_document",
        "mandatory": false,
        "description": "Signed declaration of daily vending earnings and household dependants."
      }
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Check ULB Vendor Survey Status or Obtain LoR",
        "description": "Verify if your name is in the municipal vendor survey or get a Letter of Recommendation from ULB.",
        "timeframe": "1-3 Days",
        "actionLocation": "Municipality / ULB Office"
      },
      {
        "step": 2,
        "title": "Fill Online Form via PM SVANidhi Portal or CSC",
        "description": "Upload Aadhaar, CoV/LoR, and bank passbook with help from a CSC Village Level Entrepreneur.",
        "timeframe": "Same Day",
        "actionLocation": "CSC Center / Portal"
      },
      {
        "step": 3,
        "title": "Lending Institution Appraisal",
        "description": "Selected Scheduled Commercial Bank or Microfinance Institution reviews vending credentials.",
        "timeframe": "3-7 Days",
        "actionLocation": "Bank Branch"
      },
      {
        "step": 4,
        "title": "Working Capital Disbursement & UPI QR Code Setup",
        "description": "Loan amount credited; bank activates digital merchant QR code for monthly cashback.",
        "timeframe": "1-2 Days",
        "actionLocation": "Bank Account / UPI"
      }
    ]
  },
  {
    "id": "pm-vishwakarma",
    "name": "PM Vishwakarma Kaushal Samman",
    "schemeName": "PM Vishwakarma Kaushal Samman",
    "shortName": "PM Vishwakarma",
    "shortDescription": "Comprehensive support for traditional artisans and craftspeople working with their hands and tools across 18 notified traditional trades.",
    "overview": "PM Vishwakarma is a flagship central sector initiative designed to provide end-to-end holistic support to traditional artisans and craftspeople who create with their hands and traditional tools. Beneficiaries receive national recognition (ID & certificate), skill upgrading with daily stipends, ₹15,000 modern toolkit incentive e-vouchers, and collateral-free enterprise credit at an ultra-concessional 5% interest rate.",
    "category": "Artisans & Traditional Craftsmen",
    "eligibleCategory": "Traditional Artisans & Craftspeople (18 Notified Trades)",
    "targetBeneficiaries": [
      "Carpenters & Woodworkers",
      "Blacksmiths & Armorers",
      "Potters & Clay Sculptors",
      "Cobblers & Footwear Artisans",
      "Masons, Weavers, Tailors & Barbers"
    ],
    "targetDemographic": [
      "Artisans",
      "OBC",
      "SC",
      "ST",
      "Women",
      "Minority",
      "General"
    ],
    "purpose": [
      "Equipment & Machinery",
      "Working Capital",
      "Tool Upgradation",
      "Business Setup"
    ],
    "minLoanAmount": 100000,
    "maxLoanAmount": 300000,
    "minLoan": 100000,
    "maxLoan": 300000,
    "keyBenefit": "₹15,000 toolkit incentive grant + collateral-free loan up to ₹3 Lakh at just 5% fixed interest",
    "subsidyInformation": "₹15,000 direct e-voucher toolkit grant + 8% interest subvention paid by GoI (effective rate to borrower: 5%).",
    "subsidyRate": "₹15,000 Toolkit Grant + 8% Interest Subvention (Effective 5% rate)",
    "subsidyType": "Capital Grant & Interest Subvention",
    "interestRate": "5% Fixed Concessional Interest Rate",
    "incomeEligibility": "No strict income limit; applicant must be engaged in one of the 18 notified traditional trades on a self-employment basis.",
    "sector": [
      "Handicrafts & Traditional Trades",
      "Carpentry & Woodwork",
      "Metalwork & Blacksmithy",
      "Leather & Footwear Crafts",
      "Textiles & Tailoring"
    ],
    "eligibleSectors": [
      "Traditional Handicrafts & Clay/Pottery",
      "Carpentry, Woodwork & Bamboo",
      "Metalwork, Blacksmithy & Welding",
      "Leather & Footwear Manufacturing",
      "All"
    ],
    "businessTypes": [
      "Traditional Artisan",
      "Artisan/Handicraft",
      "Service Enterprise"
    ],
    "ruralUrbanEligibility": "Rural & Urban",
    "eligibleLocations": [
      "Rural",
      "Urban",
      "Within District",
      "Within State",
      "All"
    ],
    "requiredDocuments": [
      "Aadhaar Card linked to active mobile number",
      "Ration Card or Family Member Verification",
      "Active Bank Account Passbook copy",
      "Self-declaration of traditional artisan trade"
    ],
    "documentsRequired": [
      "Aadhaar Card linked to active mobile number",
      "Ration Card or Family Member Verification",
      "Active Bank Account Passbook copy",
      "Self-declaration of traditional artisan trade"
    ],
    "applicationMethod": "Online self-registration or biometric e-KYC verification through Common Service Centers (CSCs).",
    "officialSourceUrl": "https://pmvishwakarma.gov.in",
    "applicationUrl": "https://pmvishwakarma.gov.in",
    "schemeStatus": "Active (Mock Prototype Data)",
    "ministry": "Ministry of MSME & Ministry of Skill Development",
    "collateralRequired": false,
    "tenureMonths": 36,
    "repaymentPeriod": "18 Months (Tranche 1: ₹1 Lakh), 30 Months (Tranche 2: ₹2 Lakh)",
    "moratorium": "Up to 6 Months",
    "fundingTypes": [
      "Collateral-Free Microcredit",
      "Concessional Interest Loan"
    ],
    "isMockData": true,
    "disclaimer": "Realistic mock prototype data for evaluation purposes. Not official government values.",
    "documentChecklist": [
      {
        "id": "vishwakarma-aadhaar",
        "name": "Aadhaar Card with Biometric Seeding",
        "category": "identity_proof",
        "mandatory": true,
        "description": "Aadhaar biometric authentication is mandatory for national Vishwakarma registration."
      },
      {
        "id": "vishwakarma-trade",
        "name": "Traditional Trade Verification Proof",
        "category": "business_document",
        "mandatory": true,
        "description": "Evidence of practicing one of the 18 notified traditional artisan/craft trades with traditional tools."
      },
      {
        "id": "vishwakarma-bank",
        "name": "Bank Account Passbook / Bank Mandate",
        "category": "bank_details",
        "mandatory": true,
        "description": "Active savings bank account for ₹15,000 toolkit e-voucher and daily ₹500 training stipend."
      },
      {
        "id": "vishwakarma-address",
        "name": "Ration Card / Family Declaration",
        "category": "address_proof",
        "mandatory": true,
        "description": "Family details proof to ensure one artisan benefit per household as per guidelines."
      },
      {
        "id": "vishwakarma-caste",
        "name": "Category / Community Certificate (SC/ST/OBC)",
        "category": "category_certificate",
        "mandatory": false,
        "description": "Caste certificate issued by Tehsildar for affirmative action benefits."
      },
      {
        "id": "vishwakarma-income",
        "name": "Artisan Household Income Declaration",
        "category": "income_document",
        "mandatory": false,
        "description": "Self-declaration of family income from traditional artisanal craft."
      }
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Biometric Enrollment at Common Service Center (CSC)",
        "description": "Artisan undergoes Aadhaar biometric scan and trade selection at local CSC kiosk.",
        "timeframe": "Same Day",
        "actionLocation": "Nearest CSC Center"
      },
      {
        "step": 2,
        "title": "Three-Tier Verification (Gram Panchayat / ULB -> District -> MSME)",
        "description": "Stage 1: Gram Panchayat/ULB head scrutiny; Stage 2: District Implementation Committee; Stage 3: MSME screening.",
        "timeframe": "1-2 Weeks",
        "actionLocation": "District MSME Board"
      },
      {
        "step": 3,
        "title": "Skill Upgradation Training & Toolkit Grant",
        "description": "5-7 days basic training with ₹500/day stipend followed by ₹15,000 modern toolkit e-voucher.",
        "timeframe": "5-7 Days",
        "actionLocation": "District Skill Training Center"
      },
      {
        "step": 4,
        "title": "Enterprise Loan Disbursement (Tranche 1: ₹1L, Tranche 2: ₹2L)",
        "description": "Concessional 5% interest collateral-free loan credited to initiate commercial enterprise.",
        "timeframe": "3-5 Days",
        "actionLocation": "Participating Bank"
      }
    ]
  },
  {
    "id": "pmegp",
    "name": "Prime Minister's Employment Generation Programme (PMEGP)",
    "schemeName": "Prime Minister's Employment Generation Programme (PMEGP)",
    "shortName": "PMEGP",
    "shortDescription": "Flagship credit-linked subsidy programme offering 25% (urban) to 35% (rural) margin money grant for micro-enterprises in manufacturing and services.",
    "overview": "PMEGP is a premier credit-linked subsidy programme administered by KVIC to establish greenfield micro-enterprises across manufacturing and service domains. Eligible special category entrepreneurs (SC, ST, OBC, Women, Minorities, and Divyangjan) receive up to 35% non-refundable government margin subsidy in rural areas and 25% in urban areas, with beneficiary contribution as low as 5%.",
    "category": "Micro Enterprises & Self-Employment",
    "eligibleCategory": "New Greenfield Entrepreneurs (Manufacturing & Services)",
    "targetBeneficiaries": [
      "First-Time Micro-Entrepreneurs",
      "Rural & Urban Unemployed Youth",
      "Women & Self-Help Group Members",
      "SC, ST, OBC & Minority Candidates",
      "Divyangjan & Ex-Servicemen"
    ],
    "targetDemographic": [
      "SC",
      "ST",
      "OBC",
      "Women",
      "Minority",
      "Differently Abled",
      "General"
    ],
    "purpose": [
      "Start a Small Business",
      "Business Setup",
      "Equipment & Machinery",
      "Expansion & Modernization"
    ],
    "minLoanAmount": 500000,
    "maxLoanAmount": 5000000,
    "minLoan": 500000,
    "maxLoan": 5000000,
    "keyBenefit": "Up to 35% non-refundable capital subsidy (Margin Money) with own contribution of only 5%",
    "subsidyInformation": "25% (urban) to 35% (rural) non-refundable capital margin money grant deposited in bank escrow for 3 years, then adjusted against principal.",
    "subsidyRate": "25% to 35% Capital Subsidy (Margin Money)",
    "subsidyType": "Capital Subsidy / Margin Money",
    "interestRate": "Standard Commercial Bank MSME rate (~8.5% - 10.5% p.a.)",
    "incomeEligibility": "No ceiling on family income; project cost ceiling up to ₹50 Lakh for manufacturing and ₹20 Lakh for service units.",
    "sector": [
      "Agro-Processing & Food Products",
      "Textiles, Readymade Garments & Handlooms",
      "Wood, Paper & Printing",
      "Metal Fabrication & Light Engineering",
      "Commercial & Personal Services"
    ],
    "eligibleSectors": [
      "Textiles, Handloom & Garments",
      "Food Processing, Bakeries & Agro-Products",
      "Carpentry, Woodwork & Bamboo",
      "Metalwork, Blacksmithy & Welding",
      "All"
    ],
    "businessTypes": [
      "Micro Manufacturing",
      "Service Enterprise",
      "Agri-Allied"
    ],
    "ruralUrbanEligibility": "Rural & Urban (Rural receives higher 35% subsidy)",
    "eligibleLocations": [
      "Rural",
      "Urban",
      "Within State",
      "Pan-India",
      "All"
    ],
    "requiredDocuments": [
      "Aadhaar Card and PAN Card",
      "Caste / Category Certificate (for special category subsidy claim)",
      "Educational Qualification Certificate (at least 8th Pass for projects > ₹10 Lakh Mfg / > ₹5 Lakh Service)",
      "Detailed Project Report (DPR) / Business Plan",
      "Rural Area Certificate from Gram Panchayat / BDO if rural"
    ],
    "documentsRequired": [
      "Aadhaar Card and PAN Card",
      "Caste / Category Certificate (for special category subsidy claim)",
      "Educational Qualification Certificate (at least 8th Pass for projects > ₹10 Lakh Mfg / > ₹5 Lakh Service)",
      "Detailed Project Report (DPR) / Business Plan",
      "Rural Area Certificate from Gram Panchayat / BDO if rural"
    ],
    "applicationMethod": "Online e-Portal registration (KVIC PMEGP Portal) or through District Industries Centers (DIC) / KVIC / KVIB offices.",
    "officialSourceUrl": "https://www.kviconline.gov.in/pmegpeportal",
    "applicationUrl": "https://www.kviconline.gov.in/pmegpeportal",
    "schemeStatus": "Active (Mock Prototype Data)",
    "ministry": "Ministry of Micro, Small and Medium Enterprises (MoMSME)",
    "collateralRequired": false,
    "tenureMonths": 60,
    "repaymentPeriod": "3 to 7 Years",
    "moratorium": "Up to 12 Months",
    "fundingTypes": [
      "Capital Subsidy / Margin Money",
      "Term Loan"
    ],
    "isMockData": true,
    "disclaimer": "Realistic mock prototype data for evaluation purposes. Not official government values.",
    "documentChecklist": [
      {
        "id": "pmegp-aadhaar",
        "name": "Aadhaar Card of Enterprise Promoter",
        "category": "identity_proof",
        "mandatory": true,
        "description": "Promoter identity and residence verification."
      },
      {
        "id": "pmegp-dpr",
        "name": "Detailed Project Report (DPR) / Machinery Quotations",
        "category": "business_document",
        "mandatory": true,
        "description": "Project profile showing capital expenditure, working capital requirements, and equipment quotes."
      },
      {
        "id": "pmegp-caste",
        "name": "Special Category / Caste Certificate (SC/ST/OBC/Women/NER)",
        "category": "category_certificate",
        "mandatory": false,
        "description": "Required to claim 25% (urban) or 35% (rural) margin money subsidy."
      },
      {
        "id": "pmegp-rural",
        "name": "Rural Area Certificate from Gram Panchayat",
        "category": "address_proof",
        "mandatory": false,
        "description": "Required to establish rural jurisdiction for 35% elevated subsidy rate."
      },
      {
        "id": "pmegp-bank",
        "name": "Bank Account Statement & Credit Mandate",
        "category": "bank_details",
        "mandatory": true,
        "description": "Savings or current account statement of the enterprise promoter."
      },
      {
        "id": "pmegp-income",
        "name": "Income Certificate / Tax Return (ITR)",
        "category": "income_document",
        "mandatory": false,
        "description": "Previous year ITR or income certificate for borrower financial profiling."
      }
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Prepare Detailed Project Report (DPR)",
        "description": "Prepare project financial model and obtain machinery quotations from suppliers.",
        "timeframe": "3-5 Days",
        "actionLocation": "Self / Consultant / DIC"
      },
      {
        "step": 2,
        "title": "Submit Online Application on KVIC PMEGP Portal",
        "description": "Upload DPR, Aadhaar, caste certificate, and choose preferred financing bank.",
        "timeframe": "1-2 Days",
        "actionLocation": "KVIC PMEGP Portal / CSC"
      },
      {
        "step": 3,
        "title": "District Level Task Force Committee (DLTFC) Scrutiny",
        "description": "DLTFC examines the project feasibility and forwards approved applications to financing bank branch.",
        "timeframe": "2-3 Weeks",
        "actionLocation": "District Industries Centre"
      },
      {
        "step": 4,
        "title": "EDP Training & Subsidy Lock-in",
        "description": "Complete mandatory Entrepreneurship Development Programme (EDP) training and bank disburses loan.",
        "timeframe": "1-2 Weeks",
        "actionLocation": "Bank Branch / RSETI"
      }
    ]
  },
  {
    "id": "stand-up-india",
    "name": "Stand-Up India Scheme",
    "schemeName": "Stand-Up India Scheme",
    "shortName": "Stand-Up India",
    "shortDescription": "Bank loans between ₹10 lakh and ₹1 crore to at least one SC or ST borrower and at least one woman borrower per bank branch for setting up greenfield enterprises.",
    "overview": "Stand-Up India facilitates bank loans ranging from ₹10 Lakh to ₹1 Crore to Scheduled Caste (SC), Scheduled Tribe (ST), and Women entrepreneurs for establishing greenfield (first-time) enterprises in manufacturing, services, agri-allied, or trading sectors. Loans are backed by the Credit Guarantee Scheme for Stand-Up India (CGSSI) and cover up to 85% of the total project cost.",
    "category": "Women & SC/ST Entrepreneurs",
    "eligibleCategory": "SC, ST & Women Entrepreneurs (Greenfield Ventures)",
    "targetBeneficiaries": [
      "Women Entrepreneurs (All Communities)",
      "Scheduled Caste (SC) Promoters",
      "Scheduled Tribe (ST) Promoters",
      "Enterprises with >51% SC/ST/Women shareholding"
    ],
    "targetDemographic": [
      "Women",
      "SC",
      "ST"
    ],
    "purpose": [
      "Start a Small Business",
      "Business Setup",
      "Equipment & Machinery",
      "Expansion & Modernization"
    ],
    "minLoanAmount": 1000000,
    "maxLoanAmount": 10000000,
    "minLoan": 1000000,
    "maxLoan": 10000000,
    "keyBenefit": "High-value collateral-free loan of ₹10 Lakh to ₹1 Crore backed by CGSSI credit guarantee",
    "subsidyInformation": "Credit guarantee backing through CGSSI + convergence with state capital subsidies and margin money support up to 15%.",
    "subsidyRate": "Credit Guarantee + Margin Support up to 15%",
    "subsidyType": "Credit Guarantee & Margin Support",
    "interestRate": "Lowest bank rate (MCLR + 3% + tenor premium)",
    "incomeEligibility": "No specific income limit; applicant must be an SC/ST or Woman entrepreneur without existing banking defaults.",
    "sector": [
      "Manufacturing Units",
      "Service & IT Enterprises",
      "Agri-Allied Processing",
      "Wholesale & Retail Trading"
    ],
    "eligibleSectors": [
      "Textiles, Handloom & Garments",
      "Food Processing, Bakeries & Agro-Products",
      "Digital Services, CSC & IT Support",
      "All"
    ],
    "businessTypes": [
      "Micro Manufacturing",
      "Service Enterprise",
      "Agri-Allied",
      "Trading"
    ],
    "ruralUrbanEligibility": "Rural & Urban",
    "eligibleLocations": [
      "Rural",
      "Urban",
      "Pan-India",
      "All"
    ],
    "requiredDocuments": [
      "Proof of Identity & Address (Aadhaar, PAN, Voter ID)",
      "SC/ST Category Certificate or Woman Entrepreneur declaration",
      "Detailed Project Report with machinery quotations & projected cash flows",
      "Udyam Registration Certificate",
      "Past 6 months bank account statements"
    ],
    "documentsRequired": [
      "Proof of Identity & Address (Aadhaar, PAN, Voter ID)",
      "SC/ST Category Certificate or Woman Entrepreneur declaration",
      "Detailed Project Report with machinery quotations & projected cash flows",
      "Udyam Registration Certificate",
      "Past 6 months bank account statements"
    ],
    "applicationMethod": "Online via Stand-Up Mitra Portal or directly through commercial bank branches / Lead District Managers (LDM).",
    "officialSourceUrl": "https://www.standupmitra.in",
    "applicationUrl": "https://www.standupmitra.in",
    "schemeStatus": "Active (Mock Prototype Data)",
    "ministry": "Ministry of Finance, Department of Financial Services (DFS)",
    "collateralRequired": false,
    "tenureMonths": 84,
    "repaymentPeriod": "Up to 7 Years",
    "moratorium": "Up to 18 Months",
    "fundingTypes": [
      "Term Loan",
      "Working Capital / CC Limit"
    ],
    "isMockData": true,
    "disclaimer": "Realistic mock prototype data for evaluation purposes. Not official government values.",
    "documentChecklist": [
      {
        "id": "standup-identity",
        "name": "Identity Proof (Aadhaar / Voter ID / Passport)",
        "category": "identity_proof",
        "mandatory": true,
        "description": "Primary identification of SC/ST or Woman borrower."
      },
      {
        "id": "standup-caste",
        "name": "SC/ST Category Certificate or Proof of Woman Promoter",
        "category": "category_certificate",
        "mandatory": true,
        "description": "Mandated: applicant must be either a Woman or belong to SC/ST category."
      },
      {
        "id": "standup-dpr",
        "name": "Detailed Project Report for Greenfield Enterprise",
        "category": "business_document",
        "mandatory": true,
        "description": "Comprehensive business plan for manufacturing, services, or trading greenfield unit."
      },
      {
        "id": "standup-premises",
        "name": "Proof of Business Premises / Lease Agreement",
        "category": "address_proof",
        "mandatory": true,
        "description": "Registered lease deed, rent agreement, or industrial plot allotment letter."
      },
      {
        "id": "standup-bank",
        "name": "Bank Statement & Promoter Margin Proof (15%)",
        "category": "bank_details",
        "mandatory": true,
        "description": "Last 12 months bank statement showing promoter margin contribution availability."
      },
      {
        "id": "standup-income",
        "name": "Audited Financials / Past Income Tax Returns",
        "category": "income_document",
        "mandatory": false,
        "description": "ITR of promoters or personal net-worth statement for credit appraisal."
      }
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Register on Stand-Up India Portal",
        "description": "Create profile on standupmitra.in as trainee or ready borrower.",
        "timeframe": "Same Day",
        "actionLocation": "Stand-Up Mitra Portal"
      },
      {
        "step": 2,
        "title": "Handholding & Credit Mentorship Support",
        "description": "Access guidance on project report preparation and collateral-free credit structure via SIDBI desk.",
        "timeframe": "1-2 Weeks",
        "actionLocation": "SIDBI / Lead District Manager"
      },
      {
        "step": 3,
        "title": "Bank Credit Appraisal & Sanction",
        "description": "Commercial bank branch evaluates the composite loan (term loan + working capital).",
        "timeframe": "3-4 Weeks",
        "actionLocation": "Designated Bank Branch"
      },
      {
        "step": 4,
        "title": "Composite Loan Disbursement & CGSSI Coverage",
        "description": "Loan disbursed under Credit Guarantee Scheme for Stand Up India (CGSSI).",
        "timeframe": "1 Week",
        "actionLocation": "Bank Account"
      }
    ]
  },
  {
    "id": "pm-mudra-yojana",
    "name": "Pradhan Mantri MUDRA Yojana (PMMY)",
    "schemeName": "Pradhan Mantri MUDRA Yojana (PMMY)",
    "shortName": "PM MUDRA Yojana",
    "shortDescription": "Collateral-free formal banking credit for non-corporate micro and small enterprises in trading, manufacturing, and services up to ₹20 Lakh.",
    "overview": "Pradhan Mantri MUDRA Yojana (PMMY) provides collateral-free institutional credit to micro and small business enterprises across four tiers: Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 Lakh), Tarun (₹5 Lakh to ₹10 Lakh), and Tarun Plus (₹10 Lakh to ₹20 Lakh). Supported under the Credit Guarantee Fund for Micro Units (CGFMU), loans are disbursed through public, private, and regional rural banks.",
    "category": "Micro Enterprises & Small Retail",
    "eligibleCategory": "Non-Corporate Micro & Small Enterprises",
    "targetBeneficiaries": [
      "Kirana & Small Retail Store Owners",
      "Food Service & Dhaba Operators",
      "Artisans, Tailors & Repair Kiosks",
      "Small Fleet & Transport Operators",
      "Micro-Manufacturing Workshops"
    ],
    "targetDemographic": [
      "Women",
      "SC",
      "ST",
      "OBC",
      "Minority",
      "General",
      "Street Vendors"
    ],
    "purpose": [
      "Start a Small Business",
      "Business Setup",
      "Working Capital",
      "Equipment & Machinery",
      "Expansion & Modernization"
    ],
    "minLoanAmount": 50000,
    "maxLoanAmount": 2000000,
    "minLoan": 50000,
    "maxLoan": 2000000,
    "keyBenefit": "100% collateral-free formal bank loan up to ₹20 Lakh with MUDRA RuPay card for flexible credit",
    "subsidyInformation": "Zero processing fee for Shishu & Kishore tiers + 100% credit guarantee under CGFMU with concessional interest rates for women.",
    "subsidyRate": "Zero Processing Fee + Credit Guarantee (CGFMU)",
    "subsidyType": "Credit Guarantee / Zero Processing Fee",
    "interestRate": "8.5% - 11.5% Competitive MSME Bank Rate",
    "incomeEligibility": "No minimum income threshold; based on business viability and cash flow potential.",
    "sector": [
      "Retail Grocery, Kirana & General Stores",
      "Personal Care, Beauty & Tailoring",
      "Electrical, Automobile & Device Repair",
      "Textiles, Handloom & Garments",
      "Light Engineering & Services"
    ],
    "eligibleSectors": [
      "Retail Grocery, Kirana & General Stores",
      "Personal Care, Beauty & Tailoring",
      "Electrical, Automobile & Device Repair",
      "Textiles, Handloom & Garments",
      "All"
    ],
    "businessTypes": [
      "Micro Retail",
      "Retail/Vending",
      "Service Enterprise",
      "Micro Manufacturing",
      "Agri-Allied"
    ],
    "ruralUrbanEligibility": "Rural & Urban",
    "eligibleLocations": [
      "Rural",
      "Urban",
      "Pan-India",
      "All"
    ],
    "requiredDocuments": [
      "Aadhaar Card and PAN Card",
      "Business Address Proof / Shop Establishment / Udyam Certificate",
      "Quotations of stock, machinery, or tools to be purchased",
      "Past 6 months bank statement (if available)"
    ],
    "documentsRequired": [
      "Aadhaar Card and PAN Card",
      "Business Address Proof / Shop Establishment / Udyam Certificate",
      "Quotations of stock, machinery, or tools to be purchased",
      "Past 6 months bank statement (if available)"
    ],
    "applicationMethod": "Apply online through Udyamimitra portal or submit application directly at any commercial bank, RRB, or MFI branch.",
    "officialSourceUrl": "https://www.mudra.org.in",
    "applicationUrl": "https://www.mudra.org.in",
    "schemeStatus": "Active (Mock Prototype Data)",
    "ministry": "Department of Financial Services, Ministry of Finance",
    "collateralRequired": false,
    "tenureMonths": 60,
    "repaymentPeriod": "36 to 60 Months",
    "moratorium": "Up to 6 Months",
    "fundingTypes": [
      "Collateral-Free Microcredit",
      "Term Loan",
      "Working Capital / CC Limit"
    ],
    "isMockData": true,
    "disclaimer": "Realistic mock prototype data for evaluation purposes. Not official government values.",
    "documentChecklist": [
      {
        "id": "mudra-aadhaar",
        "name": "Aadhaar Card / Voter ID / Driving License",
        "category": "identity_proof",
        "mandatory": true,
        "description": "Primary photo identification proof of the borrower."
      },
      {
        "id": "mudra-address",
        "name": "Residence Proof (Utility Bill / Ration Card)",
        "category": "address_proof",
        "mandatory": true,
        "description": "Recent electricity bill, telephone bill, or municipal tax receipt."
      },
      {
        "id": "mudra-bank",
        "name": "Bank Account Statement (Last 6 Months)",
        "category": "bank_details",
        "mandatory": true,
        "description": "Savings or current account statement from an existing operational bank."
      },
      {
        "id": "mudra-quotation",
        "name": "Equipment Quotation / Inventory Pro-forma Invoice",
        "category": "business_document",
        "mandatory": true,
        "description": "Quotation of machinery, equipment, or inventory to be financed."
      },
      {
        "id": "mudra-caste",
        "name": "Caste Certificate (SC/ST/OBC) if claiming quota",
        "category": "category_certificate",
        "mandatory": false,
        "description": "For inclusion under priority sector lending targets."
      },
      {
        "id": "mudra-income",
        "name": "Sales Register / Income Proof / ITR",
        "category": "income_document",
        "mandatory": false,
        "description": "Proof of business turnover or income declaration for Kishore / Tarun tranches."
      }
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Choose MUDRA Category (Shishu, Kishore, or Tarun)",
        "description": "Identify loan quantum: Shishu (up to ₹50k), Kishore (₹50k-₹5L), or Tarun (₹5L-₹20L).",
        "timeframe": "1 Day",
        "actionLocation": "Self / Udyamimitra Portal"
      },
      {
        "step": 2,
        "title": "Submit Loan Application Form with Quotations",
        "description": "Submit standard MUDRA form along with equipment quotation to any commercial, RRB, or MFI bank.",
        "timeframe": "1-2 Days",
        "actionLocation": "Bank Branch / CSC"
      },
      {
        "step": 3,
        "title": "Bank Due Diligence & CIBIL Check",
        "description": "Bank verifies applicant credentials, business viability, and non-defaulter status.",
        "timeframe": "3-7 Days",
        "actionLocation": "Bank Branch"
      },
      {
        "step": 4,
        "title": "Disbursement via MUDRA RuPay Debit Card",
        "description": "Loan sanctioned without collateral; working capital accessible via specialized MUDRA RuPay card.",
        "timeframe": "2-3 Days",
        "actionLocation": "Bank Branch"
      }
    ]
  },
  {
    "id": "mahila-samridhi-yojana",
    "name": "Mahila Samridhi Yojana (NSFDC)",
    "schemeName": "Mahila Samridhi Yojana (NSFDC)",
    "shortName": "Mahila Samridhi",
    "shortDescription": "Targeted concessional micro-credit scheme empowering women entrepreneurs from Scheduled Castes with low-interest seed capital up to ₹1.4 Lakh.",
    "overview": "Mahila Samridhi Yojana is a welfare financing scheme by the National Scheduled Castes Finance & Development Corporation (NSFDC). It provides low-interest microcredit directly to women entrepreneurs belonging to Scheduled Castes whose family income is below ₹3,00,000 p.a., helping them launch small tailoring shops, beauty parlors, grocery kiosks, or artisan stalls.",
    "category": "SC Women Micro-Entrepreneurs",
    "eligibleCategory": "Scheduled Caste (SC) Women Entrepreneurs",
    "targetBeneficiaries": [
      "Scheduled Caste (SC) Women",
      "Women Self-Help Group (SHG) Members",
      "Low-Income SC Female Micro-Vendors",
      "Rural SC Women Craftspeople"
    ],
    "targetDemographic": [
      "Women",
      "SC"
    ],
    "purpose": [
      "Start a Small Business",
      "Business Setup",
      "Working Capital",
      "Equipment & Machinery"
    ],
    "minLoanAmount": 25000,
    "maxLoanAmount": 140000,
    "minLoan": 25000,
    "maxLoan": 140000,
    "keyBenefit": "Ultra-low 4% annual concessional interest rate with up to 95% project cost funded by NSFDC",
    "subsidyInformation": "Deep interest concession: loan provided at only 4% per annum interest rate channelized through State Channelising Agencies (SCAs).",
    "subsidyRate": "High Interest Subsidy: Borrow at 4% p.a.",
    "subsidyType": "Direct Low-Interest Microfinance",
    "interestRate": "4% per annum concessional",
    "incomeEligibility": "Annual household family income must be below ₹3,00,000 per annum (rural and urban).",
    "sector": [
      "Personal Care, Beauty & Tailoring",
      "Retail Grocery, Kirana & General Stores",
      "Traditional Handicrafts & Clay/Pottery",
      "Small Dairy & Livestock Activities"
    ],
    "eligibleSectors": [
      "Personal Care, Beauty & Tailoring",
      "Retail Grocery, Kirana & General Stores",
      "Traditional Handicrafts & Clay/Pottery",
      "All"
    ],
    "businessTypes": [
      "Micro Retail",
      "Street Vendor",
      "Traditional Artisan",
      "SHG Enterprise"
    ],
    "ruralUrbanEligibility": "Rural & Urban",
    "eligibleLocations": [
      "Rural",
      "Urban",
      "Within District",
      "All"
    ],
    "requiredDocuments": [
      "Scheduled Caste (SC) Category Certificate issued by Revenue Authority",
      "Income Certificate verifying family income < ₹3,00,000 p.a.",
      "Aadhaar Card and Voter ID",
      "Active Savings Bank Account passbook"
    ],
    "documentsRequired": [
      "Scheduled Caste (SC) Category Certificate issued by Revenue Authority",
      "Income Certificate verifying family income < ₹3,00,000 p.a.",
      "Aadhaar Card and Voter ID",
      "Active Savings Bank Account passbook"
    ],
    "applicationMethod": "Offline through State Channelising Agencies (SCAs), regional District Welfare Offices, or affiliated Women Self-Help Groups.",
    "officialSourceUrl": "https://nsfdc.nic.in",
    "applicationUrl": "https://nsfdc.nic.in",
    "schemeStatus": "Active (Mock Prototype Data)",
    "ministry": "Ministry of Social Justice & Empowerment (NSFDC)",
    "collateralRequired": false,
    "tenureMonths": 36,
    "repaymentPeriod": "36 Months",
    "moratorium": "3 Months",
    "fundingTypes": [
      "Collateral-Free Microcredit",
      "Concessional Interest Loan"
    ],
    "isMockData": true,
    "disclaimer": "Realistic mock prototype data for evaluation purposes. Not official government values.",
    "documentChecklist": [
      {
        "id": "msy-aadhaar",
        "name": "Aadhaar Card of Woman Entrepreneur",
        "category": "identity_proof",
        "mandatory": true,
        "description": "Aadhaar verification confirming woman entrepreneur identity."
      },
      {
        "id": "msy-sc-cert",
        "name": "Scheduled Caste (SC) Caste Certificate",
        "category": "category_certificate",
        "mandatory": true,
        "description": "Issued by Tehsildar / Sub-Divisional Magistrate confirming SC category."
      },
      {
        "id": "msy-income",
        "name": "Family Income Certificate (Below ₹3,00,000 p.a.)",
        "category": "income_document",
        "mandatory": true,
        "description": "Competent authority certificate confirming annual family income within ₹3.00 Lakhs."
      },
      {
        "id": "msy-address",
        "name": "Residence Proof / BPL Card",
        "category": "address_proof",
        "mandatory": true,
        "description": "Ration card or electricity bill confirming permanent residence."
      },
      {
        "id": "msy-bank",
        "name": "Active Bank Savings Account Passbook",
        "category": "bank_details",
        "mandatory": true,
        "description": "Direct Bank Account passbook copy for concessional loan release."
      },
      {
        "id": "msy-biz",
        "name": "Trade Activity Description / SHG Resolution",
        "category": "business_document",
        "mandatory": false,
        "description": "Self-Help Group resolution or description of proposed micro-business venture."
      }
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Form Submission to State Channelizing Agency (SCA)",
        "description": "Submit application to District SCA office or Regional Rural Bank / SHG Federation.",
        "timeframe": "1-2 Days",
        "actionLocation": "SCA District Office"
      },
      {
        "step": 2,
        "title": "Income & Caste Document Verification",
        "description": "District welfare officer verifies SC certificate and family income criterion.",
        "timeframe": "1 Week",
        "actionLocation": "District Welfare Board"
      },
      {
        "step": 3,
        "title": "Target Allocation & Sanction Order",
        "description": "NSFDC allocates concessional refinancing at 4% interest per annum to beneficiary.",
        "timeframe": "1-2 Weeks",
        "actionLocation": "SCA / Bank"
      },
      {
        "step": 4,
        "title": "Loan Disbursement & Skill Orientation",
        "description": "Disbursement into bank account with 3-year repayment and quarterly monitoring.",
        "timeframe": "3-5 Days",
        "actionLocation": "Bank Account"
      }
    ]
  },
  {
    "id": "mahila-coir-yojana",
    "name": "Mahila Coir Yojana",
    "schemeName": "Mahila Coir Yojana",
    "shortName": "Mahila Coir",
    "shortDescription": "Support for rural women artisans in coir work through training, equipment assistance, and 75% capital subsidy.",
    "overview": "Administered by the Coir Board under the Ministry of MSME, Mahila Coir Yojana empowers rural women artisans in coconut-growing states with modern motorized coir spinning and twisting equipment. The government funds 75% of the machinery cost as a direct capital grant, promoting rural female employment and sustainable fiber processing.",
    "category": "Rural Women Artisans",
    "eligibleCategory": "Rural Women Artisans & Self-Help Groups",
    "targetBeneficiaries": [
      "Rural Women Artisans",
      "Coir Craftswomen & Spinners",
      "Women Self-Help Groups (SHGs)",
      "Traditional Natural Fiber Workers"
    ],
    "targetDemographic": [
      "Women",
      "Rural",
      "OBC",
      "SC",
      "ST"
    ],
    "purpose": [
      "Equipment & Machinery",
      "Business Setup",
      "Working Capital"
    ],
    "minLoanAmount": 20000,
    "maxLoanAmount": 250000,
    "minLoan": 20000,
    "maxLoan": 250000,
    "keyBenefit": "75% capital subsidy on mechanized spinning equipment plus paid skill training",
    "subsidyInformation": "75% government subsidy on cost of motorized ratt / spinning equipment, with candidate or bank contributing the remaining 25%.",
    "subsidyRate": "75% Capital Subsidy on equipment",
    "subsidyType": "Capital Subsidy",
    "interestRate": "Only on balance 25% if bank financed (~7% - 9% p.a.)",
    "incomeEligibility": "No strict ceiling; priority given to BPL and low-income rural households.",
    "sector": [
      "Traditional Handicrafts & Natural Fibers",
      "Coir Ropes, Mats & Agro-Textiles",
      "Rural Micro-Manufacturing"
    ],
    "eligibleSectors": [
      "Traditional Handicrafts & Clay/Pottery",
      "Textiles, Handloom & Garments",
      "All"
    ],
    "businessTypes": [
      "Traditional Artisan",
      "Micro Manufacturing",
      "Artisan/Handicraft"
    ],
    "ruralUrbanEligibility": "Rural",
    "eligibleLocations": [
      "Rural",
      "Within State",
      "All"
    ],
    "requiredDocuments": [
      "Coir Board Training Certificate",
      "Aadhaar Card and Proof of Rural Residence",
      "Bank Account Details (Passbook copy)",
      "Self-declaration of family income"
    ],
    "documentsRequired": [
      "Coir Board Training Certificate",
      "Aadhaar Card and Proof of Rural Residence",
      "Bank Account Details (Passbook copy)",
      "Self-declaration of family income"
    ],
    "applicationMethod": "Apply through designated Coir Board Regional Extension Centers, local Gram Panchayats, or online at Coir Board portal.",
    "officialSourceUrl": "https://coirboard.gov.in",
    "applicationUrl": "https://coirboard.gov.in",
    "schemeStatus": "Active (Mock Prototype Data)",
    "ministry": "Ministry of MSME / Coir Board",
    "collateralRequired": false,
    "tenureMonths": 36,
    "repaymentPeriod": "36 Months",
    "moratorium": "Nil",
    "fundingTypes": [
      "Capital Subsidy / Margin Money",
      "Term Loan"
    ],
    "isMockData": true,
    "disclaimer": "Realistic mock prototype data for evaluation purposes. Not official government values.",
    "documentChecklist": [
      {
        "id": "coir-aadhaar",
        "name": "Aadhaar Card of Rural Woman Artisan",
        "category": "identity_proof",
        "mandatory": true,
        "description": "Proof of identity of the rural woman coir worker."
      },
      {
        "id": "coir-address",
        "name": "Gram Panchayat Residency Proof",
        "category": "address_proof",
        "mandatory": true,
        "description": "Certificate of residence in rural coconut/coir producing district."
      },
      {
        "id": "coir-training",
        "name": "Coir Board Skill Training Completion Certificate",
        "category": "business_document",
        "mandatory": true,
        "description": "Certificate verifying completion of 2-month coir spinning skill training."
      },
      {
        "id": "coir-bank",
        "name": "Individual Savings Bank Account Details",
        "category": "bank_details",
        "mandatory": true,
        "description": "Passbook copy for 75% capital subsidy DBT credit on motorized ratts."
      },
      {
        "id": "coir-caste",
        "name": "Social Category Certificate (SC/ST/OBC/Minority)",
        "category": "category_certificate",
        "mandatory": false,
        "description": "Affirmative action category certificate for special stipend incentives."
      },
      {
        "id": "coir-income",
        "name": "Rural Artisan Income Certificate",
        "category": "income_document",
        "mandatory": false,
        "description": "Gram Panchayat income declaration confirming smallholder or landless artisan status."
      }
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Enroll in 2-Month Coir Board Training Program",
        "description": "Complete certified skill training in motorized ratt spinning at Regional Training Centre.",
        "timeframe": "2 Months",
        "actionLocation": "Coir Board Training Centre"
      },
      {
        "step": 2,
        "title": "Submit Application for Motorized Coir Ratt Machinery",
        "description": "Apply for 75% machinery subsidy through Coir Board Field Office or DIC.",
        "timeframe": "1-2 Days",
        "actionLocation": "Coir Board Sub-Office"
      },
      {
        "step": 3,
        "title": "Field Scrutiny & Subsidy Approval",
        "description": "Regional Officer inspects workspace and verifies training credentials.",
        "timeframe": "1-2 Weeks",
        "actionLocation": "Artisan Workshop"
      },
      {
        "step": 4,
        "title": "Delivery of Motorized Equipment & Subsidy Transfer",
        "description": "Motorized spinning ratt delivered; 75% government subsidy credited directly.",
        "timeframe": "1 Week",
        "actionLocation": "Beneficiary Premises"
      }
    ]
  },
  {
    "id": "nssh-subsidy",
    "name": "National SC-ST Hub Special Credit Linked Capital Subsidy (SCLCSS)",
    "schemeName": "National SC-ST Hub Special Credit Linked Capital Subsidy (SCLCSS)",
    "shortName": "NSSH SCLCSS",
    "shortDescription": "Capital subsidy support for eligible SC/ST-owned micro and small enterprises investing in plant, machinery, or technology upgradation.",
    "overview": "Under the National SC-ST Hub (NSSH), this special subsidy provides 25% upfront capital subsidy for procurement of plant & machinery / equipment for technology upgradation to SC/ST owned micro and small enterprises. It facilitates participation in the Public Procurement Policy and modernisation of industrial units.",
    "category": "SC/ST Technology & Manufacturing",
    "eligibleCategory": "SC/ST Micro & Small Enterprise Promoters",
    "targetBeneficiaries": [
      "Scheduled Caste (SC) MSME Promoters",
      "Scheduled Tribe (ST) MSME Promoters",
      "100% SC/ST Owned Micro & Small Manufacturing Units"
    ],
    "targetDemographic": [
      "SC",
      "ST"
    ],
    "purpose": [
      "Equipment & Machinery",
      "Expansion & Modernization",
      "Business Setup"
    ],
    "minLoanAmount": 500000,
    "maxLoanAmount": 10000000,
    "minLoan": 500000,
    "maxLoan": 10000000,
    "keyBenefit": "25% upfront capital subsidy capped at ₹25 Lakh for technology and machinery upgradation",
    "subsidyInformation": "25% upfront capital subsidy on institutional term loan for procurement of plant and modern machinery.",
    "subsidyRate": "25% upfront capital subsidy on plant and machinery",
    "subsidyType": "Upfront Capital Subsidy",
    "interestRate": "Standard Commercial Bank MSME rate",
    "incomeEligibility": "No individual income ceiling; enterprise must hold valid Udyam Registration and 100% SC/ST equity ownership.",
    "sector": [
      "Metalwork, Blacksmithy & Welding",
      "Electrical, Automobile & Device Repair",
      "Textiles, Handloom & Garments",
      "Light Manufacturing & Processing"
    ],
    "eligibleSectors": [
      "Metalwork, Blacksmithy & Welding",
      "Electrical, Automobile & Device Repair",
      "Textiles, Handloom & Garments",
      "All"
    ],
    "businessTypes": [
      "Micro Manufacturing",
      "Service Enterprise"
    ],
    "ruralUrbanEligibility": "Rural & Urban",
    "eligibleLocations": [
      "Rural",
      "Urban",
      "Within State",
      "Pan-India",
      "All"
    ],
    "requiredDocuments": [
      "Udyam Registration Certificate",
      "Caste Certificate of all enterprise promoters/partners",
      "Machinery Proforma Invoices and Chartered Engineer Certificate",
      "Audited financial statements (if existing operational enterprise)",
      "Bank loan sanction letter for term loan"
    ],
    "documentsRequired": [
      "Udyam Registration Certificate",
      "Caste Certificate of all enterprise promoters/partners",
      "Machinery Proforma Invoices and Chartered Engineer Certificate",
      "Audited financial statements (if existing operational enterprise)",
      "Bank loan sanction letter for term loan"
    ],
    "applicationMethod": "Through primary lending institutions (commercial banks / SIDBI) integrated with National Small Industries Corporation (NSIC) NSSH portal.",
    "officialSourceUrl": "https://www.scsthub.in",
    "applicationUrl": "https://www.scsthub.in",
    "schemeStatus": "Active (Mock Prototype Data)",
    "ministry": "Ministry of MSME / National Small Industries Corporation (NSIC)",
    "collateralRequired": false,
    "tenureMonths": 84,
    "repaymentPeriod": "Up to 7 Years",
    "moratorium": "Up to 12 Months",
    "fundingTypes": [
      "Capital Subsidy / Margin Money",
      "Term Loan"
    ],
    "isMockData": true,
    "disclaimer": "Realistic mock prototype data for evaluation purposes. Not official government values.",
    "documentChecklist": [
      {
        "id": "nssh-aadhaar",
        "name": "Aadhaar Card of SC/ST Promoter(s)",
        "category": "identity_proof",
        "mandatory": true,
        "description": "Proof that at least 51% shareholding is held by SC/ST promoter(s)."
      },
      {
        "id": "nssh-caste",
        "name": "SC/ST Caste Certificate of Key Promoters",
        "category": "category_certificate",
        "mandatory": true,
        "description": "Official caste certificate issued by designated government authority."
      },
      {
        "id": "nssh-udyam",
        "name": "Udyam Registration Certificate (with SC/ST tag)",
        "category": "business_document",
        "mandatory": true,
        "description": "MSME Udyam registration acknowledging enterprise as SC/ST owned."
      },
      {
        "id": "nssh-plant",
        "name": "Machinery Invoices & Technology Upgradation DPR",
        "category": "business_document",
        "mandatory": true,
        "description": "Quotations from approved OEMs for modern plant and machinery."
      },
      {
        "id": "nssh-bank",
        "name": "Term Loan Sanction Letter from Scheduled Bank",
        "category": "bank_details",
        "mandatory": true,
        "description": "Sanction letter from lending bank approving institutional credit."
      },
      {
        "id": "nssh-address",
        "name": "Factory / Workshop Premises Allotment Deed",
        "category": "address_proof",
        "mandatory": true,
        "description": "Proof of commercial/industrial property ownership or registered lease."
      },
      {
        "id": "nssh-income",
        "name": "Audited Balance Sheets & GST Returns",
        "category": "income_document",
        "mandatory": false,
        "description": "Past 2 years financial statements and GST filing history."
      }
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Avail Bank Term Loan for Modern Machinery",
        "description": "Obtain institutional term loan sanction from scheduled bank for technology acquisition.",
        "timeframe": "2-4 Weeks",
        "actionLocation": "Lending Bank Branch"
      },
      {
        "step": 2,
        "title": "Apply Online on National SC-ST Hub Portal",
        "description": "Submit SCLCSS subsidy claim through lending bank on the dedicated NSSH portal.",
        "timeframe": "3-5 Days",
        "actionLocation": "NSSH Portal / Bank"
      },
      {
        "step": 3,
        "title": "Technical Inspection & Joint Appraisal",
        "description": "NSIC / MSME-DI officer inspects installed machinery and validates SC/ST ownership.",
        "timeframe": "2-3 Weeks",
        "actionLocation": "Enterprise Factory Site"
      },
      {
        "step": 4,
        "title": "25% Capital Subsidy Credit into TDR Account",
        "description": "Direct 25% capital subsidy credited into Term Deposit Receipt (TDR) account for 3-year lock-in.",
        "timeframe": "2 Weeks",
        "actionLocation": "Bank Account"
      }
    ]
  },
  {
    "id": "dairy-entrepreneurship-deds",
    "name": "Dairy Entrepreneurship Development Scheme (DEDS - Mock)",
    "schemeName": "Dairy Entrepreneurship Development Scheme (DEDS - Mock)",
    "shortName": "DEDS Dairy Scheme",
    "shortDescription": "Back-ended capital subsidy assistance for setting up modern dairy farms, milk processing equipment, and cold-chain chilling units in rural areas.",
    "overview": "DEDS provides financial assistance to rural youth, farmers, and dairy micro-entrepreneurs to set up modern dairy infrastructure. It offers back-ended capital subsidies (25% for General, 33.33% for SC/ST and women farmers) through NABARD for crossbred cows, milch animal sheds, bulk milk coolers, and dairy processing kiosks.",
    "category": "Rural & Agri-Allied",
    "eligibleCategory": "Dairy Farmers, Livestock Keepers & Rural Youth",
    "targetBeneficiaries": [
      "Small & Marginal Dairy Farmers",
      "Rural Livestock Keepers",
      "Dairy Cooperatives & Producer Groups",
      "SC/ST Rural Entrepreneurs"
    ],
    "targetDemographic": [
      "Rural",
      "SC",
      "ST",
      "Women",
      "OBC",
      "General"
    ],
    "purpose": [
      "Start a Small Business",
      "Equipment & Machinery",
      "Business Setup",
      "Expansion & Modernization"
    ],
    "minLoanAmount": 100000,
    "maxLoanAmount": 2000000,
    "minLoan": 100000,
    "maxLoan": 2000000,
    "keyBenefit": "Up to 33.33% back-ended capital subsidy on livestock procurement and chilling machinery",
    "subsidyInformation": "25% back-ended capital subsidy for general category; 33.33% for SC/ST, women, and hilly state beneficiaries administered via NABARD.",
    "subsidyRate": "25% to 33.33% Back-Ended Capital Subsidy",
    "subsidyType": "Capital Subsidy",
    "interestRate": "Refinanced NABARD / Regional Rural Bank rate (~7.5% - 9.0% p.a.)",
    "incomeEligibility": "No statutory income cap; preference given to small and marginal agricultural households.",
    "sector": [
      "Agri-Allied Activities",
      "Dairy & Animal Husbandry",
      "Milk Products & Cold Chain Storage",
      "Livestock Feed Processing"
    ],
    "eligibleSectors": [
      "Food Processing, Bakeries & Agro-Products",
      "Agri-Allied",
      "All"
    ],
    "businessTypes": [
      "Agri-Allied",
      "Micro Manufacturing"
    ],
    "ruralUrbanEligibility": "Rural & Peri-Urban",
    "eligibleLocations": [
      "Rural",
      "Within District",
      "Within State",
      "All"
    ],
    "requiredDocuments": [
      "Aadhaar Card and Land Possession Proof / Lease Agreement",
      "Caste Certificate (for claiming 33.33% SC/ST subsidy)",
      "Project Plan detailing herd size and milking equipment costs",
      "Veterinary health certificate of animals (post-purchase)"
    ],
    "documentsRequired": [
      "Aadhaar Card and Land Possession Proof / Lease Agreement",
      "Caste Certificate (for claiming 33.33% SC/ST subsidy)",
      "Project Plan detailing herd size and milking equipment costs",
      "Veterinary health certificate of animals (post-purchase)"
    ],
    "applicationMethod": "Submit project proposal directly to Commercial Banks, Regional Rural Banks (RRBs), or District Central Cooperative Banks (DCCBs).",
    "officialSourceUrl": "https://www.nabard.org",
    "applicationUrl": "https://www.nabard.org",
    "schemeStatus": "Active (Mock Prototype Data)",
    "ministry": "Department of Animal Husbandry and Dairying / NABARD",
    "collateralRequired": false,
    "tenureMonths": 60,
    "repaymentPeriod": "3 to 5 Years",
    "moratorium": "Up to 6 Months",
    "fundingTypes": [
      "Capital Subsidy / Margin Money",
      "Term Loan"
    ],
    "isMockData": true,
    "disclaimer": "Realistic mock prototype data for evaluation purposes. Not official government values.",
    "documentChecklist": [
      {
        "id": "deds-aadhaar",
        "name": "Aadhaar Card of Dairy Farmer / Entrepreneur",
        "category": "identity_proof",
        "mandatory": true,
        "description": "Proof of identity for rural dairy promoter."
      },
      {
        "id": "deds-land",
        "name": "Land Ownership Proof / Animal Shed Lease",
        "category": "address_proof",
        "mandatory": true,
        "description": "Khasra/Khatauni land record or lease agreement for housing milch animals."
      },
      {
        "id": "deds-quote",
        "name": "Veterinary Health Certificate & Cattle Quotations",
        "category": "business_document",
        "mandatory": true,
        "description": "Pro-forma invoice for milch cows/buffaloes and veterinary fitness records."
      },
      {
        "id": "deds-bank",
        "name": "Bank Account Details for NABARD Subsidy Routing",
        "category": "bank_details",
        "mandatory": true,
        "description": "Active bank passbook of rural/commercial bank participating in NABARD scheme."
      },
      {
        "id": "deds-caste",
        "name": "SC/ST Category Certificate (for 33.33% Subsidy)",
        "category": "category_certificate",
        "mandatory": false,
        "description": "Required for enhanced 33.33% subsidy (25% for general category)."
      },
      {
        "id": "deds-income",
        "name": "Rural Household Income Certificate",
        "category": "income_document",
        "mandatory": false,
        "description": "Revenue department certificate confirming marginal farmer or rural artisan status."
      }
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Prepare Dairy Project Profile",
        "description": "Draft small dairy scheme (2 to 10 animals) with cattle purchase and milking setup costs.",
        "timeframe": "2-3 Days",
        "actionLocation": "Self / Dairy Cooperative"
      },
      {
        "step": 2,
        "title": "Submit Loan Application to Regional Rural Bank or Commercial Bank",
        "description": "Present project proposal to local bank branch handling NABARD refinancing.",
        "timeframe": "1-2 Days",
        "actionLocation": "Bank Branch"
      },
      {
        "step": 3,
        "title": "Bank Appraisal & Joint Inspection",
        "description": "Bank manager and district veterinary officer inspect cattle shed readiness.",
        "timeframe": "1-2 Weeks",
        "actionLocation": "Farm Premises"
      },
      {
        "step": 4,
        "title": "Sanction & Back-Ended Capital Subsidy Release",
        "description": "Bank disburses credit; NABARD releases 25% to 33.33% back-ended capital subsidy.",
        "timeframe": "2-3 Weeks",
        "actionLocation": "Bank Account"
      }
    ]
  },
  {
    "id": "cgtmse-micro-guarantee",
    "name": "Credit Guarantee Scheme for Micro & Small Enterprises (CGTMSE - Mock)",
    "schemeName": "Credit Guarantee Scheme for Micro & Small Enterprises (CGTMSE - Mock)",
    "shortName": "CGTMSE Guarantee",
    "shortDescription": "Government-backed collateral-free credit guarantee coverage up to ₹5 Crore for first-generation micro and small entrepreneurs.",
    "overview": "CGTMSE facilitates collateral-free term loans and working capital credit lines to new and existing micro and small enterprises. By guaranteeing up to 85% of the loan amount against default (especially for women and SC/ST operated units), commercial banks can lend without demanding land or property mortgage.",
    "category": "Micro Enterprises & Self-Employment",
    "eligibleCategory": "First-Generation Micro & Small Business Promoters",
    "targetBeneficiaries": [
      "First-Generation Entrepreneurs lacking land collateral",
      "Micro Manufacturing Workshops",
      "Tech-Enabled Service Providers",
      "Women & SC/ST Business Owners"
    ],
    "targetDemographic": [
      "General",
      "Women",
      "SC",
      "ST",
      "OBC",
      "Minority"
    ],
    "purpose": [
      "Start a Small Business",
      "Working Capital",
      "Equipment & Machinery",
      "Expansion & Modernization"
    ],
    "minLoanAmount": 500000,
    "maxLoanAmount": 50000000,
    "minLoan": 500000,
    "maxLoan": 50000000,
    "keyBenefit": "100% collateral-free bank financing with up to 85% sovereign credit guarantee cover",
    "subsidyInformation": "Not a cash grant; provides sovereign credit guarantee coverage (75% to 85%) relieving borrowers of third-party collateral or mortgage demands.",
    "subsidyRate": "Up to 85% Sovereign Credit Guarantee Cover",
    "subsidyType": "Credit Guarantee Coverage",
    "interestRate": "Competitive MSME Bank Lending Rate (repo linked ~8.5% - 10.5%)",
    "incomeEligibility": "Open to viable non-farm business plans without mortgage; subject to bank appraisal.",
    "sector": [
      "Light Manufacturing & Workshops",
      "Professional & Digital Services",
      "Packaging & Agro-Processing",
      "Retail Wholesale Distribution"
    ],
    "eligibleSectors": [
      "Micro Manufacturing",
      "Service Enterprise",
      "Textiles, Handloom & Garments",
      "All"
    ],
    "businessTypes": [
      "Micro Manufacturing",
      "Service Enterprise",
      "Trading"
    ],
    "ruralUrbanEligibility": "Rural & Urban",
    "eligibleLocations": [
      "Rural",
      "Urban",
      "Pan-India",
      "All"
    ],
    "requiredDocuments": [
      "PAN Card & Aadhaar Card of Promoters",
      "Udyam Registration Certificate",
      "Detailed Business Proposal & Financial Projections",
      "Last 1 year bank statements and ITR (if existing unit)"
    ],
    "documentsRequired": [
      "PAN Card & Aadhaar Card of Promoters",
      "Udyam Registration Certificate",
      "Detailed Business Proposal & Financial Projections",
      "Last 1 year bank statements and ITR (if existing unit)"
    ],
    "applicationMethod": "Directly apply through any Member Lending Institution (Scheduled Commercial Bank, Small Finance Bank, or NBFC).",
    "officialSourceUrl": "https://www.cgtmse.in",
    "applicationUrl": "https://www.cgtmse.in",
    "schemeStatus": "Active (Mock Prototype Data)",
    "ministry": "Ministry of MSME & SIDBI",
    "collateralRequired": false,
    "tenureMonths": 84,
    "repaymentPeriod": "Up to 7 Years",
    "moratorium": "Up to 12 Months",
    "fundingTypes": [
      "Collateral-Free Microcredit",
      "Term Loan",
      "Working Capital / CC Limit"
    ],
    "isMockData": true,
    "disclaimer": "Realistic mock prototype data for evaluation purposes. Not official government values.",
    "documentChecklist": [
      {
        "id": "cgtmse-aadhaar",
        "name": "Aadhaar Card & PAN Card of Promoter(s)",
        "category": "identity_proof",
        "mandatory": true,
        "description": "Compulsory KYC for all directors/partners/proprietor."
      },
      {
        "id": "cgtmse-udyam",
        "name": "Udyam Registration Certificate",
        "category": "business_document",
        "mandatory": true,
        "description": "Valid MSME certificate declaring enterprise micro/small manufacturing or service status."
      },
      {
        "id": "cgtmse-dpr",
        "name": "Comprehensive Project Report & Fund Flow Projection",
        "category": "business_document",
        "mandatory": true,
        "description": "Detailed 3-year financial model demonstrating debt-service coverage ratio (DSCR)."
      },
      {
        "id": "cgtmse-bank",
        "name": "Bank Statements for Last 12 Months",
        "category": "bank_details",
        "mandatory": true,
        "description": "Current account statement proving banking discipline and cash turnovers."
      },
      {
        "id": "cgtmse-address",
        "name": "Business Premises Lease / Utility Bill",
        "category": "address_proof",
        "mandatory": true,
        "description": "Commercial lease deed or utility bill of factory/workshop location."
      },
      {
        "id": "cgtmse-income",
        "name": "Income Tax Returns & Audited Financials (2-3 Yrs)",
        "category": "income_document",
        "mandatory": false,
        "description": "ITR acknowledgment and profit & loss statements for existing operational enterprises."
      },
      {
        "id": "cgtmse-caste",
        "name": "Special Category Certificate (Women / SC / ST / ZED)",
        "category": "category_certificate",
        "mandatory": false,
        "description": "Enables concessional annual guarantee fee and enhanced 85% guarantee coverage."
      }
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Formulate Collateral-Free Project Proposal",
        "description": "Prepare detailed business expansion proposal highlighting viable cash-flow repayment without third-party collateral.",
        "timeframe": "3-5 Days",
        "actionLocation": "Self / CA / Consultant"
      },
      {
        "step": 2,
        "title": "Apply to Member Lending Institution (MLI)",
        "description": "Submit credit application to any public, private, or regional rural bank enrolled with CGTMSE.",
        "timeframe": "1-2 Days",
        "actionLocation": "MLI Bank Branch"
      },
      {
        "step": 3,
        "title": "Bank Credit Appraisal & Guarantee Enrolment",
        "description": "Lender conducts viability check and applies for credit guarantee directly to CGTMSE trust.",
        "timeframe": "2-3 Weeks",
        "actionLocation": "Bank Zonal Credit Hub"
      },
      {
        "step": 4,
        "title": "Loan Sanction & Trust Guarantee Coverage",
        "description": "Collateral-free credit sanctioned; guarantee letter issued by CGTMSE with 75%-85% coverage.",
        "timeframe": "1 Week",
        "actionLocation": "Bank Branch"
      }
    ]
  },
  {
    "id": "nbcfdc-swarnima-scheme",
    "name": "Swarnima Scheme for Women (NBCFDC - Mock)",
    "schemeName": "Swarnima Scheme for Women (NBCFDC - Mock)",
    "shortName": "Swarnima Scheme",
    "shortDescription": "Concessional term loans up to ₹2 Lakh at 5% interest rate for self-employment of women belonging to Other Backward Classes (OBC).",
    "overview": "The Swarnima Scheme is implemented by the National Backward Classes Finance and Development Corporation (NBCFDC) to provide social and financial empowerment to women from Other Backward Classes (OBC). It offers term credit up to ₹2,00,000 at an economical 5% annual interest rate, with no security or collateral required.",
    "category": "Women & SC/ST Entrepreneurs",
    "eligibleCategory": "Backward Classes (OBC) Women Entrepreneurs",
    "targetBeneficiaries": [
      "Women belonging to Other Backward Classes (OBC)",
      "Female Tailors, Weavers & Micro-Artisans",
      "Women Small Grocers & Kiosk Owners",
      "Rural OBC Self-Help Groups"
    ],
    "targetDemographic": [
      "Women",
      "OBC"
    ],
    "purpose": [
      "Start a Small Business",
      "Business Setup",
      "Working Capital",
      "Equipment & Machinery"
    ],
    "minLoanAmount": 20000,
    "maxLoanAmount": 200000,
    "minLoan": 20000,
    "maxLoan": 200000,
    "keyBenefit": "Subsidized 5% interest micro-loan up to ₹2 Lakh with zero guarantor requirement",
    "subsidyInformation": "Interest rate concession: borrower pays only 5% interest per annum; NBCFDC finances 95% of unit cost.",
    "subsidyRate": "Concessional 5% Annual Interest Rate",
    "subsidyType": "Concessional Microfinance",
    "interestRate": "5% per annum fixed",
    "incomeEligibility": "Annual family income of the beneficiary must be less than ₹3,00,000 per annum.",
    "sector": [
      "Apparel, Boutique & Tailoring",
      "Handicrafts & Toy Making",
      "Beauty Wellness & Hair Salons",
      "Kirana & Food Processing"
    ],
    "eligibleSectors": [
      "Personal Care, Beauty & Tailoring",
      "Retail Grocery, Kirana & General Stores",
      "Traditional Handicrafts & Clay/Pottery",
      "All"
    ],
    "businessTypes": [
      "Micro Retail",
      "Service Enterprise",
      "Traditional Artisan"
    ],
    "ruralUrbanEligibility": "Rural & Urban",
    "eligibleLocations": [
      "Rural",
      "Urban",
      "Within District",
      "All"
    ],
    "requiredDocuments": [
      "OBC Caste Certificate issued by competent Revenue Authority",
      "Income Certificate (< ₹3 Lakh/year)",
      "Aadhaar Card and Passport Photo",
      "Bank Account Passbook copy"
    ],
    "documentsRequired": [
      "OBC Caste Certificate issued by competent Revenue Authority",
      "Income Certificate (< ₹3 Lakh/year)",
      "Aadhaar Card and Passport Photo",
      "Bank Account Passbook copy"
    ],
    "applicationMethod": "Offline through State Channelising Agencies (SCAs) of NBCFDC or nominated regional cooperative banks.",
    "officialSourceUrl": "https://nbcfdc.gov.in",
    "applicationUrl": "https://nbcfdc.gov.in",
    "schemeStatus": "Active (Mock Prototype Data)",
    "ministry": "Ministry of Social Justice & Empowerment (NBCFDC)",
    "collateralRequired": false,
    "tenureMonths": 60,
    "repaymentPeriod": "Up to 5 Years",
    "moratorium": "6 Months",
    "fundingTypes": [
      "Collateral-Free Microcredit",
      "Concessional Interest Loan"
    ],
    "isMockData": true,
    "disclaimer": "Realistic mock prototype data for evaluation purposes. Not official government values.",
    "documentChecklist": [
      {
        "id": "swarnima-aadhaar",
        "name": "Aadhaar Card of Woman Beneficiary",
        "category": "identity_proof",
        "mandatory": true,
        "description": "Official photo ID verifying female applicant age (18 to 55 years)."
      },
      {
        "id": "swarnima-obc",
        "name": "OBC Caste Certificate (Non-Creamy Layer)",
        "category": "category_certificate",
        "mandatory": true,
        "description": "Issued by Tehsildar certifying Backward Class category under state/central list."
      },
      {
        "id": "swarnima-income",
        "name": "Annual Family Income Certificate (< ₹3,00,000)",
        "category": "income_document",
        "mandatory": true,
        "description": "Mandatory income proof issued by authorized revenue authority confirming eligibility under statutory limit."
      },
      {
        "id": "swarnima-address",
        "name": "Residence Proof / Voter ID / Ration Card",
        "category": "address_proof",
        "mandatory": true,
        "description": "Permanent residential address proof in the state of application."
      },
      {
        "id": "swarnima-bank",
        "name": "Active Bank Passbook with IFSC Details",
        "category": "bank_details",
        "mandatory": true,
        "description": "Individual bank savings account for concessional 5% interest microcredit disbursement."
      },
      {
        "id": "swarnima-biz",
        "name": "Trade Activity / Micro-Enterprise Proposal",
        "category": "business_document",
        "mandatory": false,
        "description": "Brief outline of self-employment trade (tailoring, vending, artisan craft, beauty care, etc.)."
      }
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Submit Application to State Channelizing Agency (SCA)",
        "description": "Obtain and submit Swarnima application form at the district Backward Classes Development Corporation office.",
        "timeframe": "1-2 Days",
        "actionLocation": "District SCA Office / Portal"
      },
      {
        "step": 2,
        "title": "Document Scrutiny (OBC & Income Verification)",
        "description": "District screening committee reviews OBC certificate, income eligibility, and trade suitability.",
        "timeframe": "1-2 Weeks",
        "actionLocation": "SCA District Board"
      },
      {
        "step": 3,
        "title": "Sanction of Concessional Loan at 5% Interest",
        "description": "NBCFDC sanctions term loan up to ₹2,00,000 at maximum 5% interest per annum.",
        "timeframe": "1-2 Weeks",
        "actionLocation": "SCA / Bank"
      },
      {
        "step": 4,
        "title": "Funds Disbursement & Enterprise Setup",
        "description": "Direct release of funds to applicant bank account; repayment in quarterly installments over up to 5 years.",
        "timeframe": "3-5 Days",
        "actionLocation": "Beneficiary Bank Account"
      }
    ]
  },
  {
    "id": "pm-surya-ghar-msme",
    "name": "PM Surya Ghar: Micro-Enterprise Solar Rooftop Assistance (Mock)",
    "schemeName": "PM Surya Ghar: Micro-Enterprise Solar Rooftop Assistance (Mock)",
    "shortName": "Surya Ghar MSME",
    "shortDescription": "Clean solar energy adoption assistance offering up to 40% capital subsidy and concessional bank loans for micro workshops, tailoring units, and shops.",
    "overview": "This prototype scheme models clean energy adoption for grassroots micro-enterprises under the PM Surya Ghar initiative. Small workshops, commercial tailoring units, and repair shops installing 1 kW to 5 kW rooftop solar systems receive up to 40% capital subsidy on benchmark equipment costs, significantly slashing monthly electricity bills.",
    "category": "Technology & Green Energy",
    "eligibleCategory": "Micro-Enterprises, Workshops & Commercial Units",
    "targetBeneficiaries": [
      "Micro-Workshop & Fabrication Units",
      "Commercial Tailoring & Printing Shops",
      "Cold Storage & Kirana Retailers with high power bills",
      "Rural Micro-Manufacturing Enterprises"
    ],
    "targetDemographic": [
      "General",
      "Women",
      "SC",
      "ST",
      "OBC"
    ],
    "purpose": [
      "Equipment & Machinery",
      "Expansion & Modernization",
      "Business Setup"
    ],
    "minLoanAmount": 50000,
    "maxLoanAmount": 300000,
    "minLoan": 50000,
    "maxLoan": 300000,
    "keyBenefit": "Up to 40% direct capital subsidy on rooftop solar installation plus collateral-free bank loan",
    "subsidyInformation": "Direct DBT capital subsidy up to ₹78,000 for up to 3 kW capacity; low-interest collateral-free loan at ~7% for the balance amount.",
    "subsidyRate": "Up to 40% Capital Subsidy + 7% Bank Loan",
    "subsidyType": "Capital Subsidy & Clean Energy Loan",
    "interestRate": "7.0% Concessional Priority Lending Rate",
    "incomeEligibility": "Must hold electricity connection in the business/owner name with suitable roof rights.",
    "sector": [
      "Clean Energy & Solar Equipment",
      "Power-Intensive Micro-Enterprises",
      "Workshops, Welding & Printing Units",
      "Commercial Retail & Grocery"
    ],
    "eligibleSectors": [
      "Metalwork, Blacksmithy & Welding",
      "Electrical, Automobile & Device Repair",
      "Retail Grocery, Kirana & General Stores",
      "All"
    ],
    "businessTypes": [
      "Micro Manufacturing",
      "Service Enterprise",
      "Micro Retail"
    ],
    "ruralUrbanEligibility": "Rural & Urban",
    "eligibleLocations": [
      "Rural",
      "Urban",
      "Pan-India",
      "All"
    ],
    "requiredDocuments": [
      "Latest Electricity Bill of Enterprise/Premises",
      "Aadhaar Card and PAN Card",
      "Roof Ownership / Long-term Lease Proof",
      "Bank Account details for Direct Benefit Transfer (DBT)"
    ],
    "documentsRequired": [
      "Latest Electricity Bill of Enterprise/Premises",
      "Aadhaar Card and PAN Card",
      "Roof Ownership / Long-term Lease Proof",
      "Bank Account details for Direct Benefit Transfer (DBT)"
    ],
    "applicationMethod": "Apply online via National Solar Rooftop Portal or through registered DISCOM empanelled solar vendors.",
    "officialSourceUrl": "https://pmsuryaghar.gov.in",
    "applicationUrl": "https://pmsuryaghar.gov.in",
    "schemeStatus": "Active (Mock Prototype Data)",
    "ministry": "Ministry of New and Renewable Energy (MNRE)",
    "collateralRequired": false,
    "tenureMonths": 60,
    "repaymentPeriod": "Up to 5 Years",
    "moratorium": "Nil",
    "fundingTypes": [
      "Capital Subsidy / Margin Money",
      "Concessional Interest Loan"
    ],
    "isMockData": true,
    "disclaimer": "Realistic mock prototype data for evaluation purposes. Not official government values.",
    "documentChecklist": [
      {
        "id": "suryaghar-aadhaar",
        "name": "Aadhaar Card & PAN Card of Applicant",
        "category": "identity_proof",
        "mandatory": true,
        "description": "Identity authentication of the property/enterprise owner."
      },
      {
        "id": "suryaghar-bill",
        "name": "Latest Electricity Bill of Premises",
        "category": "business_document",
        "mandatory": true,
        "description": "Recent electricity consumer bill showing CA/consumer number and active connection."
      },
      {
        "id": "suryaghar-roof",
        "name": "Roof Ownership Proof / Long-term Lease Consent",
        "category": "address_proof",
        "mandatory": true,
        "description": "Registered title deed, house tax receipt, or landlord consent for solar installation."
      },
      {
        "id": "suryaghar-bank",
        "name": "Bank Account Passbook / Cancelled Cheque",
        "category": "bank_details",
        "mandatory": true,
        "description": "Bank account linked with mobile for Direct Benefit Transfer (DBT) subsidy credit."
      },
      {
        "id": "suryaghar-income",
        "name": "Business Turnover / Income Self-Declaration",
        "category": "income_document",
        "mandatory": false,
        "description": "Annual electricity cost savings assessment and income declaration."
      },
      {
        "id": "suryaghar-caste",
        "name": "Social Category Certificate (if applying via quota)",
        "category": "category_certificate",
        "mandatory": false,
        "description": "Optional certificate for special institutional support."
      }
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Register on National Solar Rooftop Portal",
        "description": "Enter electricity distribution company (DISCOM) consumer account number and mobile.",
        "timeframe": "Same Day",
        "actionLocation": "pmsuryaghar.gov.in Portal"
      },
      {
        "step": 2,
        "title": "Feasibility Approval by DISCOM & Vendor Selection",
        "description": "Local power utility grants technical feasibility; choose empanelled solar installer.",
        "timeframe": "1-2 Weeks",
        "actionLocation": "DISCOM / Registered Vendor"
      },
      {
        "step": 3,
        "title": "Rooftop Solar Plant Installation & Net-Meter Inspection",
        "description": "Empanelled vendor installs solar panels, inverter; DISCOM installs net-meter.",
        "timeframe": "1-2 Weeks",
        "actionLocation": "Enterprise Rooftop"
      },
      {
        "step": 4,
        "title": "Commissioning Certificate & Direct DBT Subsidy",
        "description": "Net-meter inspection report submitted; DBT capital subsidy up to ₹78,000 credited within 30 days.",
        "timeframe": "2-4 Weeks",
        "actionLocation": "Direct to Bank Account"
      }
    ]
  }
];

export const DEMO_SCHEMES = schemes;

export const schemeCategories = [
  "All Categories",
  "Street Vendors & Urban Micro-sellers",
  "Artisans & Traditional Craftsmen",
  "Micro Enterprises & Self-Employment",
  "Women & SC/ST Entrepreneurs",
  "SC Women Micro-Entrepreneurs",
  "Rural Women Artisans",
  "SC/ST Technology & Manufacturing",
  "Rural & Agri-Allied",
  "Technology & Green Energy"
];

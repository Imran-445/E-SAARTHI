# Saarthi (सारथी) - AI-Driven Scheme Matching for Marginalized Entrepreneurs

**Smart India Hackathon 2026**  
**Problem Statement ID**: 26092  
**Team Name**: DigITal Pioneer  
**Project Name**: Saarthi  
**Subtitle**: *"Financial Support for a Stronger Tomorrow"*  

---

## 📌 Project Overview
**Saarthi** is an intelligent, accessible financial inclusion prototype engineered to dismantle information asymmetry and bridge marginalized Indian entrepreneurs—such as street vendors, rural artisans, women, and SC/ST craftspeople—with government loans, capital subsidies, and collateral-free formal credit.

---

## 🎨 Design Principles
- **Aesthetic**: Authentic Indian Government-Finance appearance.
- **Palette**: Deep Navy Blue (`#0B2545`), Emerald Green primary actions (`#15803D`), subtle Saffron accents (`#EA580C`), crisp white card surfaces (`#FFFFFF`) on light base backgrounds (`#F8FAFC`).
- **Typography & Layout**: Inter typography, rounded cards (`rounded-2xl`), soft shadows (`shadow-card`), responsive desktop/tablet/mobile design.

---

## 🚀 Key Implemented Features

### 1. Header & Navigation
- **Saarthi Brand Identity**: Stylized national growth emblem and subtitle: *"Financial Support for a Stronger Tomorrow"*.
- **Navigation Links**: Home, Schemes, Calculator, Partners, About.
- **Multi-Lingual Selector**: English, हिन्दी (Hindi), தமிழ் (Tamil), বাংলা (Bengali), తెలుగు (Telugu), मराठी (Marathi).
- **Citizen & Partner Login Trigger**: Secure demo OTP authentication modal.

### 2. Home Page
- **Hero Section**:
  - Exact Heading: *"Your Right Scheme. Your Bright Future."*
  - Exact Subtext: *"Find government financial support that matches your business needs, eligibility and location."*
  - Primary CTA: *"Get Started"* (launches the Entrepreneur Profile Wizard).
- **Four Feature Cards**:
  1. *Find My Scheme* (Personalized AI Matching)
  2. *EMI Calculator* (Interactive Loan & Subsidy Estimator)
  3. *Find Nearby Partner* (Verified CSCs & Bank Mitras locator)
  4. *Learn More* (Guidelines & Team DigITal Pioneer Overview)
- **Benefits & Statistics Section**:
  - *Personalized Scheme Matching* (100+ Central & State Schemes)
  - *Easy Eligibility Checking* (3-Minute Verification Checklist)
  - *Nearby Partner Assistance* (5,000+ Verified Help Centers)
- **Live Scheme Catalog Preview**: Instant category filter tabs (All, Street Vendors, Women, Artisans, SC/ST).

### 3. Core Working User Flow
- **Entrepreneur Profile Wizard (`ProfileWizardModal`)**: 3-step intuitive wizard capturing social category (SC, ST, OBC, Women, Minority, General, Divyangjan), business activity (Street Vendor, Traditional Artisan, Micro Retail, Manufacturing, Agri-Allied), turnover, and loan requirement.
- **AI-Driven Matching Engine**: Real-time scoring and prioritization against major Central schemes:
  - *PM SVANidhi* (Working capital for street vendors, collateral-free, 7% interest rebate)
  - *Stand-Up India* (₹10 Lakh - ₹1 Crore for Women & SC/ST greenfield ventures)
  - *PMEGP* (Up to 35% margin money capital subsidy)
  - *PM Vishwakarma* (Artisan recognition, ₹15k toolkit grant, 5% credit)
  - *PM MUDRA Yojana* (Shishu, Kishore, Tarun tiers up to ₹20 Lakh)
  - *Mahila Samridhi Yojana* (Low 4% microcredit for SC women)
  - *Mahila Coir Yojana* (75% equipment subsidy for rural women)
  - *National SC-ST Hub (NSSH)* (25% upfront capital subsidy)
- **Interactive Eligibility Checker (`EligibilityModal`)**: Plain-language criteria breakdown, required document scanner checklists (Aadhaar, Udyam, Caste certificate, Bank passbook, DPR), and direct links to official government portals.
- **Side-by-Side Scheme Comparison (`SchemeComparisonModal`)**: Direct comparative matrix comparing loan ceilings, subsidy structures, effective interest rates, collateral rules, and tenures.
- **Channel Partner Locator & Map (`PartnerMapLocator` & `PartnersPage`)**: Interactive locator for Common Service Centers (CSCs) and Bank Mitras with state/category filters, visual interactive GPS map, distance indicators, and direct "Call" and "WhatsApp" handholding links.
- **Saarthi Mitra AI Assistant (`ChatbotWidget`)**: Floating conversational assistant providing instant answers to queries on scheme eligibility, documents, subsidies, and local partner centers.
- **Loan & Subsidy Calculator (`CalculatorPage`)**: Interactive calculator illustrating how government capital subsidies (e.g. 35% PMEGP) and interest subventions reduce actual monthly EMIs.

---

## 📂 Project Architecture

```
DigItal Pioneer/
├── package.json                 # Root scripts to orchestrate client and server
├── powershell.cmd               # Helper wrapper for system execution
├── server/                      # Node.js + Express backend
│   ├── package.json
│   ├── test-run.js              # Automated verification test script
│   └── src/
│       ├── index.js             # Express API entry point (Port 5000)
│       ├── data/
│       │   ├── schemes.js       # Central & State scheme dataset
│       │   ├── partners.js      # Verified CSC & Bank Mitra dataset
│       │   └── faqs.js          # Chatbot knowledge base
│       ├── services/
│       │   └── matchingEngine.js# Algorithmic scheme eligibility & scoring
│       └── routes/
│           ├── schemesRoute.js  # /api/schemes & /api/schemes/match
│           ├── partnersRoute.js # /api/partners & /api/partners/meta
│           └── chatbotRoute.js  # /api/chat/message & prompts
└── client/                      # React 18 + Vite frontend
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx              # Main routing & state orchestration
        ├── index.css            # Tailwind directives & tricolor styling
        ├── services/
        │   └── api.js           # API client with seamless offline fallback
        ├── components/
        │   ├── Header.jsx       # Branding, nav, language selector, login
        │   ├── Footer.jsx       # Official portals, helpline, SIH attribution
        │   ├── FeatureCard.jsx  # Reusable 4 feature cards
        │   ├── StatCard.jsx     # Reusable benefits & stats card
        │   ├── ProfileWizardModal.jsx # 3-step profile wizard
        │   ├── SchemeCard.jsx   # Match score card with compare toggle
        │   ├── EligibilityModal.jsx   # Detailed eligibility & doc checklist
        │   ├── SchemeComparisonModal.jsx # Side-by-side comparison table
        │   ├── PartnerMapLocator.jsx  # Interactive partner finder & map
        │   ├── ChatbotWidget.jsx      # Floating Saarthi Mitra assistant
        │   └── PlaceholderModals.jsx  # Citizen/Partner login modal
        └── pages/
            ├── HomePage.jsx     # Exact hero text, 4 cards, benefits, preview
            ├── SchemesPage.jsx  # Catalog with filtering & comparison dock
            ├── PartnersPage.jsx # Dedicated Channel Partner finder
            ├── CalculatorPage.jsx # Interactive Loan & Subsidy EMI tool
            └── AboutPage.jsx    # SIH 2026 Problem Statement 26092 & Team
```

---

## 💻 How to Run the Project

### Prerequisites
- Node.js (v18 or v20+ installed)
- npm (v9+ installed)

### Option A: Run Both Client & Server (Recommended)
From the root directory:
```bash
# In first terminal (Start Backend API on port 5000):
cd server
npm start

# In second terminal (Start Frontend on port 3000):
cd client
npm run dev
```

Visit **`http://localhost:3000`** in your browser.

### Option B: Build Frontend for Production
```bash
cd client
npm run build
npm run preview
```

---

## 🧪 Verification & Build Status
- **Client Build (`vite build`)**: **Passed** (0 errors, 1609 modules transformed in 29.63s).
- **Backend Test (`node server/test-run.js`)**: **Passed** (All 8 schemes, 6 channel partners, and matching engine verified).
- **Resilience**: The client application features a built-in offline data fallback in `client/src/services/api.js`, ensuring that the prototype operates smoothly even if the backend is temporarily offline during presentations.

---

## 👥 Team Details
- **Team Name**: DigITal Pioneer
- **Hackathon**: Smart India Hackathon 2026
- **Problem Statement**: 26092

import { recommendSchemes } from "./recommendationEngine.js";
import { DEMO_SCHEMES } from "../data/schemes.js";

// One client-side catalog used whenever the API is unavailable.
// Keep the same normalized field names consumed by the UI and matcher.
export const fallbackSchemes = DEMO_SCHEMES.map((scheme) => ({
  ...scheme,
  shortDescription: scheme.shortDescription || scheme.overview,
  documentsRequired: scheme.documentsRequired || scheme.requiredDocuments || [],
  minLoanAmount: scheme.minLoanAmount ?? scheme.minLoan ?? 0,
  maxLoanAmount: scheme.maxLoanAmount ?? scheme.maxLoan ?? 100000000,
}));

export function clientSideMatch(profile = {}, schemeCatalog = DEMO_SCHEMES) {
  return recommendSchemes(profile, schemeCatalog);
}

// API functions with seamless fallback
export async function getSchemes(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/schemes?${query}`);
    if (!res.ok) throw new Error("API request failed");
    const data = await res.json();
    return (data.schemes || fallbackSchemes).map((scheme) => ({
      ...scheme,
      shortDescription: scheme.shortDescription || scheme.overview,
      documentsRequired: scheme.documentsRequired || scheme.requiredDocuments || [],
      minLoanAmount: scheme.minLoanAmount ?? scheme.minLoan ?? 0,
      maxLoanAmount: scheme.maxLoanAmount ?? scheme.maxLoan ?? 100000000,
    }));
  } catch (err) {
    console.warn("Using fallback schemes data:", err);
    let result = [...fallbackSchemes];
    if (params.search) {
      const q = params.search.toLowerCase();
      result = result.filter(s => s.name.toLowerCase().includes(q) || s.shortName?.toLowerCase().includes(q));
    }
    return result;
  }
}

export async function matchSchemesAPI(profile) {
  try {
    const res = await fetch("/api/schemes/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile)
    });
    if (!res.ok) throw new Error("Match API request failed");
    const data = await res.json();
    if (!Array.isArray(data.schemes)) throw new Error("Invalid match response");
    return data.schemes;
  } catch (err) {
    console.warn("Using local client-side matching engine:", err);
    return clientSideMatch(profile);
  }
}

export const fallbackPartners = [
  {
    id: "csc-001",
    name: "Jan Seva Kendra - CSC Subhash Chowk",
    type: "Common Service Center (CSC)",
    category: "CSC",
    district: "North Delhi",
    state: "Delhi",
    address: "Shop 14, Main Market, Subhash Chowk, Delhi - 110009",
    contactPerson: "Rajesh Kumar (VLE)",
    phone: "+91 98101 23456",
    whatsapp: "+919810123456",
    email: "rajesh.csc.delhi@gmail.com",
    languages: ["Hindi", "English"],
    servicesOffered: [
      "PM SVANidhi Application Assistance",
      "Udyam Registration",
      "Aadhaar Demographic Update",
      "PMEGP Portal e-Filing",
      "Document Scanning & DPR Upload"
    ],
    verified: true,
    rating: 4.8,
    reviewsCount: 142,
    operatingHours: "9:30 AM - 7:00 PM (Mon-Sat)",
    lat: 28.7041,
    lng: 77.1025,
    distanceKm: 1.2
  },
  {
    id: "csc-002",
    name: "Digital Seva Kendra - Gomti Nagar",
    type: "Common Service Center (CSC)",
    category: "CSC",
    district: "Lucknow",
    state: "Uttar Pradesh",
    address: "Block B-2/45, Vibhuti Khand, Gomti Nagar, Lucknow - 226010",
    contactPerson: "Sunita Verma (VLE)",
    phone: "+91 94520 87654",
    whatsapp: "+919452087654",
    email: "sunita.csc.lucknow@gmail.com",
    languages: ["Hindi", "Awadhi", "English"],
    servicesOffered: [
      "PM Vishwakarma Biometric Verification",
      "Women SHG Loan Facilitation",
      "PMEGP Margin Money Subsidy Claims",
      "Mudra Loan Proposal Drafting"
    ],
    verified: true,
    rating: 4.9,
    reviewsCount: 215,
    operatingHours: "9:00 AM - 6:30 PM (Mon-Sat)",
    lat: 26.8467,
    lng: 80.9462,
    distanceKm: 2.4
  },
  {
    id: "bm-003",
    name: "State Bank Mitra Point - Dadar East",
    type: "Lead District Bank Mitra",
    category: "Bank Mitra",
    district: "Mumbai",
    state: "Maharashtra",
    address: "Khadilkar Road, Near Dadar Railway Station, Mumbai - 400014",
    contactPerson: "Pravin Deshmukh",
    phone: "+91 98220 54321",
    whatsapp: "+919822054321",
    email: "pravin.bankmitra.sbi@gmail.com",
    languages: ["Marathi", "Hindi", "English"],
    servicesOffered: [
      "Stand-Up India Application Verification",
      "MUDRA Shishu & Kishore Loan Sanctions",
      "Zero-Balance Current Account Opening",
      "Direct Benefit Subsidy Tracking"
    ],
    verified: true,
    rating: 4.7,
    reviewsCount: 98,
    operatingHours: "10:00 AM - 5:00 PM (Mon-Fri)",
    lat: 19.0178,
    lng: 72.8478,
    distanceKm: 3.1
  },
  {
    id: "msme-004",
    name: "MSME Development & Facilitation Office (DFO)",
    type: "MSME Nodal Facilitation Desk",
    category: "MSME Help Center",
    district: "Patna",
    state: "Bihar",
    address: "Industrial Estate, Patliputra, Patna - 800013",
    contactPerson: "Dr. Aniruddh Prasad (Assistant Director)",
    phone: "+91 612 227 8901",
    whatsapp: "+919431098765",
    email: "dfo-patna@dcmsme.gov.in",
    languages: ["Hindi", "Bhojpuri", "English"],
    servicesOffered: [
      "National SC/ST Hub Handholding & Schemes",
      "Detailed Project Report (DPR) Free Guidance",
      "PMEGP Interview Preparation",
      "Public Procurement 4% Quota Support"
    ],
    verified: true,
    rating: 4.6,
    reviewsCount: 310,
    operatingHours: "9:30 AM - 6:00 PM (Govt Working Days)",
    lat: 25.5941,
    lng: 85.1376,
    distanceKm: 4.5
  },
  {
    id: "rseti-005",
    name: "Canara RSETI - Rural Self Employment Training Institute",
    type: "RSETI Skill & Enterprise Hub",
    category: "RSETI",
    district: "Bengaluru Rural",
    state: "Karnataka",
    address: "Near Toll Gate, Doddaballapura Road, Bengaluru Rural - 561203",
    contactPerson: "K. R. Venkatesh (Director)",
    phone: "+91 80 2762 3450",
    whatsapp: "+919448012345",
    email: "director.rsetiblrrural@canarabank.com",
    languages: ["Kannada", "Telugu", "English", "Hindi"],
    servicesOffered: [
      "Free EDP Training for PMEGP Loan Applicants",
      "Artisan Skill Certification under PM Vishwakarma",
      "Women Micro-Enterprise Incubation",
      "Post-Loan Handholding for 2 Years"
    ],
    verified: true,
    rating: 4.9,
    reviewsCount: 420,
    operatingHours: "9:00 AM - 5:30 PM (Mon-Sat)",
    lat: 13.2952,
    lng: 77.5348,
    distanceKm: 5.8
  },
  {
    id: "csc-006",
    name: "Gramin CSC Center - Chomu",
    type: "Common Service Center (CSC)",
    category: "CSC",
    district: "Jaipur",
    state: "Rajasthan",
    address: "Bus Stand Road, Chomu, Jaipur - 303702",
    contactPerson: "Mohan Lal Sharma",
    phone: "+91 97840 65432",
    whatsapp: "+919784065432",
    email: "chomu.csc.rajasthan@gmail.com",
    languages: ["Hindi", "Marwari"],
    servicesOffered: [
      "PM Vishwakarma Registration for Rural Artisans",
      "PMEGP Margin Money Online Tracking",
      "Jan Dhan Account Aadhaar Seeding",
      "Caste & Income Certificate e-District Service"
    ],
    verified: true,
    rating: 4.8,
    reviewsCount: 167,
    operatingHours: "8:30 AM - 8:00 PM (All Days)",
    lat: 27.1706,
    lng: 75.7208,
    distanceKm: 2.8
  }
];

export async function getPartners(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/partners?${query}`);
    if (!res.ok) throw new Error("Partners API request failed");
    const data = await res.json();
    return data.partners || fallbackPartners;
  } catch (err) {
    console.warn("Using fallback partners data:", err);
    let result = [...fallbackPartners];
    if (params.state && params.state !== "All States") {
      result = result.filter(p => p.state === params.state);
    }
    return result;
  }
}

export async function sendChatMessage(message) {
  try {
    const res = await fetch("/api/chat/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    if (!res.ok) throw new Error("Chat API failed");
    return await res.json();
  } catch (err) {
    console.warn("Using local chatbot fallback:", err);
    return {
      success: true,
      reply: "Namaste! Schemes like PM SVANidhi (street vendors up to ₹50k), Stand-Up India (SC/ST & Women up to ₹1 Crore), PMEGP (up to 35% subsidy), and PM Vishwakarma (artisans ₹15k toolkit + 5% loan) are available. You can click 'Find My Scheme' to calculate your personalized eligibility.",
      suggestions: [
        "What is PM SVANidhi?",
        "How much subsidy under PMEGP?",
        "Benefits of PM Vishwakarma for artisans?",
        "Where is my nearest CSC partner?"
      ]
    };
  }
}

import { recommendSchemes } from "./recommendationEngine.js";
import { schemes, DEMO_SCHEMES } from "../data/schemes.js";
import { generateAssistantResponse } from "./assistantEngine.js";

// Canonical client-side scheme catalog used whenever the API is unavailable.
export const fallbackSchemes = schemes.map((scheme) => ({
  ...scheme,
  shortDescription: scheme.shortDescription || scheme.overview,
  documentsRequired: scheme.documentsRequired || scheme.requiredDocuments || [],
  minLoanAmount: scheme.minLoanAmount ?? scheme.minLoan ?? 0,
  maxLoanAmount: scheme.maxLoanAmount ?? scheme.maxLoan ?? 100000000,
}));

export function clientSideMatch(profile = {}, schemeCatalog = fallbackSchemes) {
  return recommendSchemes(profile, schemeCatalog);
}

// API function to retrieve all schemes with optional search/filters and seamless fallback
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

    if (params.category && params.category !== "All" && params.category !== "All Categories") {
      result = result.filter((s) => s.category.toLowerCase() === params.category.toLowerCase());
    }

    if (params.purpose && params.purpose !== "All" && params.purpose !== "All Purposes") {
      const pQuery = params.purpose.toLowerCase();
      result = result.filter((s) =>
        (s.purpose || []).some(
          (p) => p.toLowerCase().includes(pQuery) || pQuery.includes(p.toLowerCase())
        )
      );
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.shortName?.toLowerCase().includes(q) ||
          s.shortDescription?.toLowerCase().includes(q) ||
          s.category?.toLowerCase().includes(q) ||
          (s.targetBeneficiaries || []).some((b) => b.toLowerCase().includes(q))
      );
    }

    return result;
  }
}

// API function to fetch a single scheme by ID with offline fallback
export async function getSchemeById(id) {
  try {
    const res = await fetch(`/api/schemes/${id}`);
    if (!res.ok) throw new Error("Scheme not found");
    const data = await res.json();
    return data.scheme;
  } catch (err) {
    console.warn(`Using fallback single scheme data for ID: ${id}`);
    const found = fallbackSchemes.find((s) => s.id === id);
    return found || null;
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

export const mockUserLocations = [
  { id: "delhi-cp", name: "Connaught Place, New Delhi", city: "New Delhi", district: "New Delhi", state: "Delhi", lat: 28.6315, lng: 77.2167 },
  { id: "lucknow-gomti", name: "Gomti Nagar, Lucknow", city: "Lucknow", district: "Lucknow", state: "Uttar Pradesh", lat: 26.8500, lng: 80.9900 },
  { id: "mumbai-dadar", name: "Dadar East, Mumbai", city: "Mumbai", district: "Mumbai City", state: "Maharashtra", lat: 19.0178, lng: 72.8478 },
  { id: "patna-patliputra", name: "Patliputra Industrial Area, Patna", city: "Patna", district: "Patna", state: "Bihar", lat: 25.6200, lng: 85.1000 },
  { id: "bangalore-indira", name: "Indiranagar, Bengaluru", city: "Bengaluru", district: "Bengaluru Urban", state: "Karnataka", lat: 12.9784, lng: 77.6408 },
  { id: "jaipur-mi", name: "MI Road, Jaipur", city: "Jaipur", district: "Jaipur", state: "Rajasthan", lat: 26.9150, lng: 75.8050 },
  { id: "varanasi-cantt", name: "Cantt Station, Varanasi", city: "Varanasi", district: "Varanasi", state: "Uttar Pradesh", lat: 25.3250, lng: 82.9850 },
  { id: "pune-shivaji", name: "Shivaji Nagar, Pune", city: "Pune", district: "Pune", state: "Maharashtra", lat: 18.5300, lng: 73.8470 }
];

export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export const fallbackPartners = [
  {
    id: "csc-001",
    name: "Jan Seva Kendra - CSC Connaught Place",
    partnerName: "Jan Seva Kendra - CSC Connaught Place",
    type: "Common Service Center (CSC)",
    partnerType: "Common Service Center (CSC)",
    category: "CSC",
    city: "New Delhi",
    district: "New Delhi",
    state: "Delhi",
    address: "Shop 14, Regal Building Outer Circle, Connaught Place, New Delhi - 110001",
    supportedSchemes: ["pm-svanidhi", "pm-vishwakarma", "pmegp", "micro-finance-scheme"],
    supportedSchemeNames: ["PM SVANidhi", "PM Vishwakarma", "PMEGP", "Micro Finance Scheme"],
    distanceKm: 1.2,
    distancePlaceholder: "1.2 km",
    contactInfo: {
      phone: "+91 98101 23456",
      whatsapp: "+919810123456",
      email: "rajesh.csc.delhi@gmail.com",
      contactPerson: "Rajesh Kumar",
      designation: "Authorized VLE Specialist"
    },
    contactPerson: "Rajesh Kumar (VLE Specialist)",
    phone: "+91 98101 23456",
    whatsapp: "+919810123456",
    email: "rajesh.csc.delhi@gmail.com",
    languages: ["Hindi", "English"],
    servicesOffered: [
      "PM SVANidhi Application Assistance & Digital UPI Cashback Setup",
      "PM Vishwakarma Biometric e-KYC Verification & Toolkit Registration",
      "Udyam & PAN Aadhaar Seeding",
      "PMEGP Portal e-Filing & Detailed Project Report (DPR) Upload"
    ],
    verified: true,
    rating: 4.9,
    reviewsCount: 184,
    operatingHours: "9:30 AM - 7:00 PM (Mon-Sat)",
    availabilityStatus: "Open Now • Closes at 7:00 PM",
    status: "Open Now",
    lat: 28.6315,
    lng: 77.2185
  },
  {
    id: "bm-002",
    name: "State Bank Mitra Point - Karol Bagh",
    partnerName: "State Bank Mitra Point - Karol Bagh",
    type: "Lead District Bank Mitra",
    partnerType: "Lead District Bank Mitra",
    category: "Bank Mitra",
    city: "New Delhi",
    district: "Central Delhi",
    state: "Delhi",
    address: "Plot 24, Arya Samaj Road, Opp Metro Pillar 98, Karol Bagh, New Delhi - 110005",
    supportedSchemes: ["pm-mudra-yojana", "pm-svanidhi", "stand-up-india", "micro-finance-scheme"],
    supportedSchemeNames: ["PM MUDRA Yojana", "PM SVANidhi", "Stand-Up India", "Micro Finance Scheme"],
    distanceKm: 2.7,
    distancePlaceholder: "2.7 km",
    contactInfo: {
      phone: "+91 98110 45678",
      whatsapp: "+919811045678",
      email: "karolbagh.mitra.sbi@gmail.com",
      contactPerson: "Sunil Batra",
      designation: "Lead Bank Mitra & CSP Manager"
    },
    contactPerson: "Sunil Batra (Lead Bank Mitra)",
    phone: "+91 98110 45678",
    whatsapp: "+919811045678",
    email: "karolbagh.mitra.sbi@gmail.com",
    languages: ["Hindi", "Punjabi", "English"],
    servicesOffered: [
      "PMMY MUDRA Loan Appraisal (Shishu, Kishore & Tarun)",
      "Zero-Balance Current Account & Merchant UPI Facility",
      "Stand-Up India Greenfield Venture Document Verification",
      "Direct Benefit Transfer (DBT) Subsidy Tracking"
    ],
    verified: true,
    rating: 4.8,
    reviewsCount: 126,
    operatingHours: "10:00 AM - 5:30 PM (Mon-Fri)",
    availabilityStatus: "Open Now • Closes at 5:30 PM",
    status: "Open Now",
    lat: 28.6517,
    lng: 77.1906
  },
  {
    id: "csc-003",
    name: "Digital Seva Kendra - Gomti Nagar",
    partnerName: "Digital Seva Kendra - Gomti Nagar",
    type: "Common Service Center (CSC)",
    partnerType: "Common Service Center (CSC)",
    category: "CSC",
    city: "Lucknow",
    district: "Lucknow",
    state: "Uttar Pradesh",
    address: "Block B-2/45, Vibhuti Khand, Near High Court, Gomti Nagar, Lucknow - 226010",
    supportedSchemes: ["pm-vishwakarma", "pmegp", "pm-svanidhi", "pm-mudra-yojana"],
    supportedSchemeNames: ["PM Vishwakarma", "PMEGP", "PM SVANidhi", "PM MUDRA Yojana"],
    distanceKm: 1.8,
    distancePlaceholder: "1.8 km",
    contactInfo: {
      phone: "+91 94520 87654",
      whatsapp: "+919452087654",
      email: "sunita.csc.lucknow@gmail.com",
      contactPerson: "Sunita Verma",
      designation: "District VLE Incharge"
    },
    contactPerson: "Sunita Verma (District VLE Incharge)",
    phone: "+91 94520 87654",
    whatsapp: "+919452087654",
    email: "sunita.csc.lucknow@gmail.com",
    languages: ["Hindi", "Awadhi", "English"],
    servicesOffered: [
      "PM Vishwakarma Biometric Verification & Skill Assessment Support",
      "Women Self-Help Group (SHG) Priority Handholding",
      "PMEGP Margin Money Subsidy Application e-Filing",
      "Aadhaar Correction & Mobile Linkage for Scheme Portals"
    ],
    verified: true,
    rating: 4.9,
    reviewsCount: 230,
    operatingHours: "9:00 AM - 6:30 PM (Mon-Sat)",
    availabilityStatus: "Open Now • Closes at 6:30 PM",
    status: "Open Now",
    lat: 26.8520,
    lng: 80.9950
  },
  {
    id: "dic-004",
    name: "District Industries Centre (DIC) Facilitation Cell",
    partnerName: "District Industries Centre (DIC) Facilitation Cell",
    type: "District Industries Centre (DIC)",
    partnerType: "District Industries Centre (DIC)",
    category: "MSME Facilitation Desk",
    city: "Lucknow",
    district: "Lucknow",
    state: "Uttar Pradesh",
    address: "Near Kaiserbagh Bus Stand, Industrial Estate Road, Lucknow - 226001",
    supportedSchemes: ["pmegp", "stand-up-india", "micro-finance-scheme"],
    supportedSchemeNames: ["PMEGP", "Stand-Up India", "Micro Finance Scheme"],
    distanceKm: 3.4,
    distancePlaceholder: "3.4 km",
    contactInfo: {
      phone: "+91 522 262 3456",
      whatsapp: "+919415012345",
      email: "dic-lucknow@upmsme.gov.in",
      contactPerson: "R. K. Srivastava",
      designation: "General Manager (DIC)"
    },
    contactPerson: "R. K. Srivastava (General Manager)",
    phone: "+91 522 262 3456",
    whatsapp: "+919415012345",
    email: "dic-lucknow@upmsme.gov.in",
    languages: ["Hindi", "English"],
    servicesOffered: [
      "PMEGP Task Force Committee Interview Guidance & Dossier Review",
      "35% Rural Capital Margin Subsidy Endorsement",
      "Udyam Assistance for SC/ST and Women Micro-Manufacturing",
      "Detailed Project Report (DPR) Template Library & Mentorship"
    ],
    verified: true,
    rating: 4.7,
    reviewsCount: 195,
    operatingHours: "9:30 AM - 5:30 PM (Govt Working Days)",
    availabilityStatus: "Open Today • 9:30 AM - 5:30 PM",
    status: "Open Today",
    lat: 26.8480,
    lng: 80.9320
  },
  {
    id: "bm-005",
    name: "State Bank Mitra Hub - Dadar East",
    partnerName: "State Bank Mitra Hub - Dadar East",
    type: "Lead District Bank Mitra",
    partnerType: "Lead District Bank Mitra",
    category: "Bank Mitra",
    city: "Mumbai",
    district: "Mumbai City",
    state: "Maharashtra",
    address: "Khadilkar Road, Opp. Dadar Station Plaza, Mumbai - 400014",
    supportedSchemes: ["stand-up-india", "pm-mudra-yojana", "pm-svanidhi", "micro-finance-scheme"],
    supportedSchemeNames: ["Stand-Up India", "PM MUDRA Yojana", "PM SVANidhi", "Micro Finance Scheme"],
    distanceKm: 1.5,
    distancePlaceholder: "1.5 km",
    contactInfo: {
      phone: "+91 98220 54321",
      whatsapp: "+919822054321",
      email: "pravin.bankmitra.sbi@gmail.com",
      contactPerson: "Pravin Deshmukh",
      designation: "Senior Lead CSP Coordinator"
    },
    contactPerson: "Pravin Deshmukh (Lead CSP Manager)",
    phone: "+91 98220 54321",
    whatsapp: "+919822054321",
    email: "pravin.bankmitra.sbi@gmail.com",
    languages: ["Marathi", "Hindi", "English"],
    servicesOffered: [
      "Stand-Up India Loan Processing for Women & SC/ST Entrepreneurs",
      "MUDRA Shishu & Kishore Loan Sanction Documentation",
      "Current Account Onboarding & Zero-Fee POS/QR Deployment",
      "Credit Guarantee Scheme for Stand-Up India (CGSSI) Liaison"
    ],
    verified: true,
    rating: 4.8,
    reviewsCount: 142,
    operatingHours: "10:00 AM - 6:00 PM (Mon-Sat)",
    availabilityStatus: "Open Now • Closes at 6:00 PM",
    status: "Open Now",
    lat: 19.0182,
    lng: 72.8485
  },
  {
    id: "csc-006",
    name: "Aaple Sarkar Seva Kendra - Andheri West",
    partnerName: "Aaple Sarkar Seva Kendra - Andheri West",
    type: "Common Service Center (CSC)",
    partnerType: "Common Service Center (CSC)",
    category: "CSC",
    city: "Mumbai",
    district: "Mumbai Suburban",
    state: "Maharashtra",
    address: "Shop 7, Navrang Cinema Compound, S.V. Road, Andheri West, Mumbai - 400058",
    supportedSchemes: ["pm-svanidhi", "pm-vishwakarma", "micro-finance-scheme"],
    supportedSchemeNames: ["PM SVANidhi", "PM Vishwakarma", "Micro Finance Scheme"],
    distanceKm: 4.1,
    distancePlaceholder: "4.1 km",
    contactInfo: {
      phone: "+91 98330 67890",
      whatsapp: "+919833067890",
      email: "andheri.csc.mumbai@gmail.com",
      contactPerson: "Meena Jadhav",
      designation: "Senior VLE Operator"
    },
    contactPerson: "Meena Jadhav (Authorized VLE)",
    phone: "+91 98330 67890",
    whatsapp: "+919833067890",
    email: "andheri.csc.mumbai@gmail.com",
    languages: ["Marathi", "Hindi", "Gujarati", "English"],
    servicesOffered: [
      "PM SVANidhi Application & Certificate of Vending Registration",
      "PM Vishwakarma Artisan Onboarding & Direct Toolkit Voucher Generation",
      "Self-Declaration Affidavits & Notarized Attestation Assistance",
      "Biometric e-KYC Verification for Unorganized Workers"
    ],
    verified: true,
    rating: 4.9,
    reviewsCount: 310,
    operatingHours: "9:00 AM - 8:00 PM (All Days)",
    availabilityStatus: "Open Now • Closes at 8:00 PM",
    status: "Open Now",
    lat: 19.1190,
    lng: 72.8460
  },
  {
    id: "msme-007",
    name: "MSME Development & Facilitation Office (DFO)",
    partnerName: "MSME Development & Facilitation Office (DFO)",
    type: "MSME Nodal Facilitation Desk",
    partnerType: "MSME Nodal Facilitation Desk",
    category: "MSME Facilitation Desk",
    city: "Patna",
    district: "Patna",
    state: "Bihar",
    address: "Industrial Estate, Patliputra, Patna - 800013",
    supportedSchemes: ["pmegp", "stand-up-india", "pm-vishwakarma", "micro-finance-scheme"],
    supportedSchemeNames: ["PMEGP", "Stand-Up India", "PM Vishwakarma", "Micro Finance Scheme"],
    distanceKm: 2.1,
    distancePlaceholder: "2.1 km",
    contactInfo: {
      phone: "+91 612 227 8901",
      whatsapp: "+919431098765",
      email: "dfo-patna@dcmsme.gov.in",
      contactPerson: "Dr. Aniruddh Prasad",
      designation: "Assistant Director (Promotion & Schemes)"
    },
    contactPerson: "Dr. Aniruddh Prasad (Assistant Director)",
    phone: "+91 612 227 8901",
    whatsapp: "+919431098765",
    email: "dfo-patna@dcmsme.gov.in",
    languages: ["Hindi", "Bhojpuri", "English"],
    servicesOffered: [
      "National SC/ST Hub (NSSH) Handholding & Free DPR Preparation",
      "PMEGP Manufacturing Unit Feasibility Screening",
      "Public Procurement 4% Quota Compliance Onboarding",
      "Direct Coordination with Lead District Bank Managers (LDM)"
    ],
    verified: true,
    rating: 4.7,
    reviewsCount: 340,
    operatingHours: "9:30 AM - 6:00 PM (Govt Working Days)",
    availabilityStatus: "Open Today • 9:30 AM - 6:00 PM",
    status: "Open Today",
    lat: 25.6210,
    lng: 85.1020
  },
  {
    id: "csc-008",
    name: "Vasudha Seva Kendra - Kankarbagh",
    partnerName: "Vasudha Seva Kendra - Kankarbagh",
    type: "Common Service Center (CSC)",
    partnerType: "Common Service Center (CSC)",
    category: "CSC",
    city: "Patna",
    district: "Patna",
    state: "Bihar",
    address: "Main Road, Near Tempo Stand, Kankarbagh, Patna - 800020",
    supportedSchemes: ["pm-svanidhi", "pm-mudra-yojana", "pm-vishwakarma"],
    supportedSchemeNames: ["PM SVANidhi", "PM MUDRA Yojana", "PM Vishwakarma"],
    distanceKm: 3.8,
    distancePlaceholder: "3.8 km",
    contactInfo: {
      phone: "+91 94302 45678",
      whatsapp: "+919430245678",
      email: "kankarbagh.csc@gmail.com",
      contactPerson: "Alok Kumar",
      designation: "VLE Center Operator"
    },
    contactPerson: "Alok Kumar (VLE Operator)",
    phone: "+91 94302 45678",
    whatsapp: "+919430245678",
    email: "kankarbagh.csc@gmail.com",
    languages: ["Hindi", "Magahi", "English"],
    servicesOffered: [
      "Street Vendor Letter of Recommendation (LoR) Assistance",
      "PM SVANidhi Working Capital e-Application Submission",
      "MUDRA Shishu Loan Proposal File Preparation",
      "Biometric UIDAI Authentication & Passbook Attestation"
    ],
    verified: true,
    rating: 4.8,
    reviewsCount: 178,
    operatingHours: "9:00 AM - 7:30 PM (Mon-Sat)",
    availabilityStatus: "Open Now • Closes at 7:30 PM",
    status: "Open Now",
    lat: 25.5940,
    lng: 85.1500
  },
  {
    id: "rseti-009",
    name: "Canara RSETI - Rural Self Employment Training Institute",
    partnerName: "Canara RSETI - Rural Self Employment Training Institute",
    type: "RSETI Skill & Enterprise Hub",
    partnerType: "RSETI Skill & Enterprise Hub",
    category: "RSETI Skill & Enterprise Hub",
    city: "Bengaluru",
    district: "Bengaluru Rural",
    state: "Karnataka",
    address: "Near Toll Gate, Doddaballapura Road, Bengaluru Rural - 561203",
    supportedSchemes: ["pmegp", "pm-vishwakarma", "micro-finance-scheme", "stand-up-india"],
    supportedSchemeNames: ["PMEGP", "PM Vishwakarma", "Micro Finance Scheme", "Stand-Up India"],
    distanceKm: 5.2,
    distancePlaceholder: "5.2 km",
    contactInfo: {
      phone: "+91 80 2762 3450",
      whatsapp: "+919448012345",
      email: "director.rsetiblrrural@canarabank.com",
      contactPerson: "K. R. Venkatesh",
      designation: "Institute Director"
    },
    contactPerson: "K. R. Venkatesh (Director)",
    phone: "+91 80 2762 3450",
    whatsapp: "+919448012345",
    email: "director.rsetiblrrural@canarabank.com",
    languages: ["Kannada", "Telugu", "English", "Hindi"],
    servicesOffered: [
      "Mandatory Free Entrepreneurship Development Training (EDP) for PMEGP",
      "Artisan Skill Certification & Toolkit Grant under PM Vishwakarma",
      "Women Micro-Enterprise Incubation & Machinery Advisory",
      "Post-Sanction Bank Credit Linkage & 2-Year Enterprise Handholding"
    ],
    verified: true,
    rating: 4.9,
    reviewsCount: 420,
    operatingHours: "9:00 AM - 5:30 PM (Mon-Sat)",
    availabilityStatus: "Open Today • 9:00 AM - 5:30 PM",
    status: "Open Today",
    lat: 13.2952,
    lng: 77.5348
  },
  {
    id: "csc-010",
    name: "Bangalore One Citizen Service Centre - Indiranagar",
    partnerName: "Bangalore One Citizen Service Centre - Indiranagar",
    type: "Common Service Center (CSC)",
    partnerType: "Common Service Center (CSC)",
    category: "CSC",
    city: "Bengaluru",
    district: "Bengaluru Urban",
    state: "Karnataka",
    address: "100 Feet Road, 12th Main Junction, Indiranagar, Bengaluru - 560038",
    supportedSchemes: ["pm-svanidhi", "pm-mudra-yojana", "stand-up-india", "micro-finance-scheme"],
    supportedSchemeNames: ["PM SVANidhi", "PM MUDRA Yojana", "Stand-Up India", "Micro Finance Scheme"],
    distanceKm: 1.4,
    distancePlaceholder: "1.4 km",
    contactInfo: {
      phone: "+91 80 2520 9876",
      whatsapp: "+919845012345",
      email: "indiranagar.b1@karnataka.gov.in",
      contactPerson: "Shwetha Rao",
      designation: "Lead Center Manager"
    },
    contactPerson: "Shwetha Rao (Center Incharge)",
    phone: "+91 80 2520 9876",
    whatsapp: "+919845012345",
    email: "indiranagar.b1@karnataka.gov.in",
    languages: ["Kannada", "Tamil", "English", "Hindi"],
    servicesOffered: [
      "PM SVANidhi Vendor Biometric & UPI Digital Onboarding",
      "Stand-Up India Women Entrepreneur File Vetting",
      "Udyam Micro-Enterprise Registration",
      "Income & Category Certificate Attestation"
    ],
    verified: true,
    rating: 4.8,
    reviewsCount: 260,
    operatingHours: "8:00 AM - 8:00 PM (All Days)",
    availabilityStatus: "Open Now • Closes at 8:00 PM",
    status: "Open Now",
    lat: 12.9785,
    lng: 77.6415
  },
  {
    id: "csc-011",
    name: "Gramin CSC Center - Chomu",
    partnerName: "Gramin CSC Center - Chomu",
    type: "Common Service Center (CSC)",
    partnerType: "Common Service Center (CSC)",
    category: "CSC",
    city: "Jaipur",
    district: "Jaipur",
    state: "Rajasthan",
    address: "Bus Stand Road, Chomu, Jaipur - 303702",
    supportedSchemes: ["pm-vishwakarma", "pmegp", "pm-mudra-yojana", "micro-finance-scheme"],
    supportedSchemeNames: ["PM Vishwakarma", "PMEGP", "PM MUDRA Yojana", "Micro Finance Scheme"],
    distanceKm: 2.8,
    distancePlaceholder: "2.8 km",
    contactInfo: {
      phone: "+91 97840 65432",
      whatsapp: "+919784065432",
      email: "chomu.csc.rajasthan@gmail.com",
      contactPerson: "Mohan Lal Sharma",
      designation: "Senior Rural VLE"
    },
    contactPerson: "Mohan Lal Sharma (Senior VLE)",
    phone: "+91 97840 65432",
    whatsapp: "+919784065432",
    email: "chomu.csc.rajasthan@gmail.com",
    languages: ["Hindi", "Marwari"],
    servicesOffered: [
      "PM Vishwakarma Biometric Verification for Rural Craftspeople",
      "PMEGP 35% Rural Margin Subsidy Tracking",
      "Jan Dhan Account Aadhaar Seeding",
      "Vernacular Form Filling Assistance & Document Scanning"
    ],
    verified: true,
    rating: 4.8,
    reviewsCount: 167,
    operatingHours: "8:30 AM - 8:00 PM (All Days)",
    availabilityStatus: "Open Now • Closes at 8:00 PM",
    status: "Open Now",
    lat: 27.1706,
    lng: 75.7208
  },
  {
    id: "po-012",
    name: "India Post Payments Bank (IPPB) Seva Kendra - MI Road",
    partnerName: "India Post Payments Bank (IPPB) Seva Kendra - MI Road",
    type: "Post Office Seva Kendra",
    partnerType: "Post Office Seva Kendra",
    category: "Post Office Seva Kendra",
    city: "Jaipur",
    district: "Jaipur",
    state: "Rajasthan",
    address: "General Post Office (GPO) Campus, MI Road, Jaipur - 302001",
    supportedSchemes: ["pm-svanidhi", "pm-mudra-yojana", "pm-vishwakarma"],
    supportedSchemeNames: ["PM SVANidhi", "PM MUDRA Yojana", "PM Vishwakarma"],
    distanceKm: 1.1,
    distancePlaceholder: "1.1 km",
    contactInfo: {
      phone: "+91 141 236 7890",
      whatsapp: "+919414078901",
      email: "ippb.jaipur.gpo@indiapost.gov.in",
      contactPerson: "Gireesh Meena",
      designation: "Dak Sevak & Microcredit Officer"
    },
    contactPerson: "Gireesh Meena (Dak Sevak / Microcredit Officer)",
    phone: "+91 141 236 7890",
    whatsapp: "+919414078901",
    email: "ippb.jaipur.gpo@indiapost.gov.in",
    languages: ["Hindi", "English"],
    servicesOffered: [
      "Doorstep Aadhaar Enabled Payment System (AePS) & DBT Setup",
      "PM SVANidhi Direct Disbursement Account Verification",
      "PM Vishwakarma E-Shram Data Verification",
      "Zero-Balance IPPB Merchant Account Setup"
    ],
    verified: true,
    rating: 4.7,
    reviewsCount: 185,
    operatingHours: "9:00 AM - 5:00 PM (Mon-Sat)",
    availabilityStatus: "Open Today • 9:00 AM - 5:00 PM",
    status: "Open Today",
    lat: 26.9160,
    lng: 75.8070
  },
  {
    id: "bm-013",
    name: "Baroda Bank Mitra Point - Lanka BHU",
    partnerName: "Baroda Bank Mitra Point - Lanka BHU",
    type: "Lead District Bank Mitra",
    partnerType: "Lead District Bank Mitra",
    category: "Bank Mitra",
    city: "Varanasi",
    district: "Varanasi",
    state: "Uttar Pradesh",
    address: "Lanka Gate, Near BHU Main Campus, Varanasi - 221005",
    supportedSchemes: ["pm-svanidhi", "pm-vishwakarma", "pmegp", "micro-finance-scheme"],
    supportedSchemeNames: ["PM SVANidhi", "PM Vishwakarma", "PMEGP", "Micro Finance Scheme"],
    distanceKm: 1.6,
    distancePlaceholder: "1.6 km",
    contactInfo: {
      phone: "+91 94500 11223",
      whatsapp: "+919450011223",
      email: "varanasi.mitra.bob@gmail.com",
      contactPerson: "Anand Mishra",
      designation: "Bank Mitra Lead Coordinator"
    },
    contactPerson: "Anand Mishra (Bank Mitra Coordinator)",
    phone: "+91 94500 11223",
    whatsapp: "+919450011223",
    email: "varanasi.mitra.bob@gmail.com",
    languages: ["Hindi", "Bhojpuri", "English"],
    servicesOffered: [
      "Banaras Handloom Weaver & Artisan PM Vishwakarma Enrollment",
      "PM SVANidhi Local Vendor Endorsement & QR Standee Dispatch",
      "Micro Finance Concessional Loan Sanctions",
      "Direct Bank Credit Linkage with Bank of Baroda"
    ],
    verified: true,
    rating: 4.9,
    reviewsCount: 192,
    operatingHours: "9:30 AM - 6:00 PM (Mon-Sat)",
    availabilityStatus: "Open Now • Closes at 6:00 PM",
    status: "Open Now",
    lat: 25.2810,
    lng: 82.9990
  },
  {
    id: "dic-014",
    name: "District Industries Centre - Pune Industrial Desk",
    partnerName: "District Industries Centre - Pune Industrial Desk",
    type: "District Industries Centre (DIC)",
    partnerType: "District Industries Centre (DIC)",
    category: "MSME Facilitation Desk",
    city: "Pune",
    district: "Pune",
    state: "Maharashtra",
    address: "Agriculture College Campus, Shivaji Nagar, Pune - 411005",
    supportedSchemes: ["pmegp", "stand-up-india", "pm-mudra-yojana"],
    supportedSchemeNames: ["PMEGP", "Stand-Up India", "PM MUDRA Yojana"],
    distanceKm: 2.3,
    distancePlaceholder: "2.3 km",
    contactInfo: {
      phone: "+91 20 2553 4567",
      whatsapp: "+919823098765",
      email: "dic-pune@maharashtra.gov.in",
      contactPerson: "Sanjay Patil",
      designation: "Joint Director (MSME Promotions)"
    },
    contactPerson: "Sanjay Patil (Joint Director)",
    phone: "+91 20 2553 4567",
    whatsapp: "+919823098765",
    email: "dic-pune@maharashtra.gov.in",
    languages: ["Marathi", "Hindi", "English"],
    servicesOffered: [
      "PMEGP Greenfield Project Consultation & Subsidy Approval",
      "Stand-Up India SC/ST & Women Agro-Processing Unit Advisory",
      "Industrial Power Subsidy & Electricity Duty Exemption Guidance",
      "ZED (Zero Defect Zero Effect) Certification Handholding"
    ],
    verified: true,
    rating: 4.8,
    reviewsCount: 220,
    operatingHours: "9:30 AM - 6:00 PM (Govt Working Days)",
    availabilityStatus: "Open Today • 9:30 AM - 6:00 PM",
    status: "Open Today",
    lat: 18.5320,
    lng: 73.8490
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
      result = result.filter((p) => p.state.toLowerCase() === params.state.toLowerCase());
    }

    if (params.category && params.category !== "All Types") {
      const cat = params.category.toLowerCase();
      result = result.filter(
        (p) => p.type.toLowerCase().includes(cat) || p.category.toLowerCase().includes(cat)
      );
    }

    if (params.scheme && params.scheme !== "All Schemes") {
      const sQuery = params.scheme.toLowerCase();
      result = result.filter(
        (p) =>
          (p.supportedSchemes || []).some((s) => s.toLowerCase() === sQuery || sQuery.includes(s.toLowerCase())) ||
          (p.supportedSchemeNames || []).some((sn) => sn.toLowerCase().includes(sQuery) || sQuery.includes(sn.toLowerCase()))
      );
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.district.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.contactPerson.toLowerCase().includes(q) ||
          (p.supportedSchemeNames || []).some((sn) => sn.toLowerCase().includes(q))
      );
    }

    return result;
  }
}

export async function sendChatMessage(message, options = {}) {
  const { language = "en", schemeId = "pm-svanidhi", userProfile = null } = options;
  try {
    const res = await fetch("/api/chat/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, language, schemeId, userProfile })
    });
    if (!res.ok) throw new Error("Chat API failed");
    return await res.json();
  } catch (err) {
    console.warn("Using local multilingual assistant engine fallback:", err);
    const localRes = generateAssistantResponse({
      message,
      language,
      activeSchemeId: schemeId,
      userProfile
    });
    return {
      success: true,
      reply: localRes.reply,
      intent: localRes.intent,
      schemeId: localRes.schemeId,
      suggestions: localRes.suggestions
    };
  }
}

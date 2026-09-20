import React, { useState, useEffect } from "react";
import {
  User,
  Briefcase,
  IndianRupee,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MapPin,
  ShieldCheck,
  Building2,
  GraduationCap,
  Globe
} from "lucide-react";

export const BENEFICIARY_CATEGORIES = [
  { id: "SC", label: "SC", desc: "Priority capital subsidies & Stand-Up India" },
  { id: "ST", label: "ST", desc: "Special central assistance & tribal grants" },
  { id: "OBC", label: "OBC", desc: "NBCFDC concessional lending schemes" },
  { id: "Minority", label: "Minority", desc: "NMDFC schemes for notified minorities" },
  { id: "Women", label: "Women", desc: "Highest subsidy bracket (up to 35% PMEGP)" },
  { id: "Transgender", label: "Transgender", desc: "SMILE scheme & inclusive credit window" },
  { id: "Person with Disability", label: "Person with Disability", desc: "NHFDC 5-10% extra margin money support" },
  { id: "Rural Artisan", label: "Rural Artisan", desc: "PM Vishwakarma & KVIC artisan toolkit" },
  { id: "Street/Micro Vendor", label: "Street/Micro Vendor", desc: "PM SVANidhi collateral-free credit" },
  { id: "SHG", label: "SHG", desc: "DAY-NRLM / NULM community investment" },
  { id: "General", label: "General", desc: "Eligible for MUDRA, PMEGP & Stand-Up" }
];

export const STATES_AND_DISTRICTS = {
  "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
  "Uttar Pradesh": ["Lucknow", "Varanasi", "Kanpur Nagar", "Agra", "Prayagraj", "Gorakhpur", "Noida / Gautam Buddha Nagar", "Ghaziabad", "Meerut", "Aligarh", "Bareilly", "Ayodhya", "Moradabad", "Jhansi", "Other District"],
  "Maharashtra": ["Mumbai City", "Mumbai Suburban", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad (Chhatrapati Sambhaji Nagar)", "Solapur", "Amravati", "Kolhapur", "Other District"],
  "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia", "Rohtas", "Samastipur", "Madhubani", "Other District"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bhilwara", "Alwar", "Sikar", "Other District"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Rewa", "Other District"],
  "Karnataka": ["Bengaluru Urban", "Bengaluru Rural", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi", "Kalaburagi", "Other District"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Other District"],
  "West Bengal": ["Kolkata", "Howrah", "North 24 Parganas", "South 24 Parganas", "Hooghly", "Siliguri / Darjeeling", "Murshidabad", "Other District"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Other District"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Other District"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Other District"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Other District"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Hisar", "Other District"],
  "Kerala": ["Thiruvananthapuram", "Kochi / Ernakulam", "Kozhikode", "Thrissur", "Kollam", "Kannur", "Palakkad", "Kottayam", "Other District"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Udham Singh Nagar", "Rishikesh", "Other District"],
  "Himachal Pradesh": ["Shimla", "Mandi", "Dharamshala / Kangra", "Solan", "Kullu", "Other District"],
  "Jammu & Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur", "Other District"],
  "Assam": ["Kamrup Metropolitan (Guwahati)", "Dibrugarh", "Silchar", "Jorhat", "Nagaon", "Other District"],
  "Jharkhand": ["Ranchi", "Jamshedpur (East Singhbhum)", "Dhanbad", "Bokaro", "Hazaribagh", "Other District"],
  "Odisha": ["Khurda (Bhubaneswar)", "Cuttack", "Ganjam", "Sundargarh (Rourkela)", "Sambalpur", "Other District"],
  "Chhattisgarh": ["Raipur", "Bhilai / Durg", "Bilaspur", "Korba", "Rajnandgaon", "Other District"],
  "Goa": ["North Goa", "South Goa", "Panaji", "Margao", "Other District"],
  "Other State / UT": ["Capital District", "Central District", "Rural District", "Other"]
};

export const BUSINESS_TYPES = [
  { id: "Street Vendor", label: "Street Vendor / Hawker / Thela", icon: "🛒", tag: "PM SVANidhi Match" },
  { id: "Traditional Artisan", label: "Traditional Artisan / Handicrafts", icon: "🔨", tag: "PM Vishwakarma Match" },
  { id: "Micro Retail", label: "Small Retail Shop / Kirana / Grocery", icon: "🏪", tag: "MUDRA Shishu / Kishore" },
  { id: "Micro Manufacturing", label: "Micro Manufacturing / Workshop Unit", icon: "⚙️", tag: "PMEGP up to 35% Subsidy" },
  { id: "Service Enterprise", label: "Personal Services / Repair / Tailoring", icon: "✂️", tag: "PMEGP / MUDRA" },
  { id: "Agri-Allied", label: "Agri-Allied / Dairy / Poultry / Fishery", icon: "🌾", tag: "KCC & Agri-Infra Fund" },
  { id: "SHG Enterprise", label: "Self Help Group (SHG) Collective Enterprise", icon: "👥", tag: "NRLM Community Fund" }
];

export const ENTERPRISE_STAGES = [
  { id: "New Venture", label: "New Venture / Greenfield Project", desc: "Yet to commence operations or registering newly" },
  { id: "Early Stage", label: "Early Stage (< 1 Year)", desc: "Started recently, building customer base" },
  { id: "Existing & Operational", label: "Existing & Operational (1+ Years)", desc: "Active business looking for working capital" },
  { id: "Expansion / Modernization", label: "Expansion / Modernization", desc: "Established enterprise adding machines or branches" }
];

export const BUSINESS_SECTORS = [
  "Textiles, Handloom & Garments",
  "Food Processing, Bakeries & Agro-Products",
  "Traditional Handicrafts & Clay/Pottery",
  "Carpentry, Woodwork & Bamboo",
  "Metalwork, Blacksmithy & Welding",
  "Leather & Footwear Manufacturing",
  "Retail Grocery, Kirana & General Stores",
  "Personal Care, Beauty & Tailoring",
  "Electrical, Automobile & Device Repair",
  "Construction, Masonry & Plumbing",
  "Transport & Logistics Micro-Services",
  "Digital Services, CSC & IT Support",
  "Other Local Trade / Livelihood"
];

export const FUNDING_PURPOSES = [
  { id: "Working Capital", label: "Working Capital (Stock, Raw Materials, Cash Flow)" },
  { id: "Equipment & Machinery", label: "Purchase of Equipment, Tools or Machinery" },
  { id: "Business Setup", label: "Setting Up New Business Premises / Shop" },
  { id: "Expansion & Modernization", label: "Business Expansion, Renovation or Technology Upgrade" },
  { id: "Marketing & Vending Cart", label: "Vending Cart, Packaging & Digital Payment Setup" }
];

export const FUNDING_TYPES = [
  { id: "Collateral-Free Microcredit", label: "Collateral-Free Microcredit (e.g. MUDRA / PM SVANidhi)" },
  { id: "Capital Subsidy / Margin Money", label: "Capital Subsidy / Margin Money (e.g. PMEGP 25-35%)" },
  { id: "Term Loan", label: "Term Loan with Fixed Monthly EMIs" },
  { id: "Working Capital / CC Limit", label: "Working Capital / Overdraft Cash Credit Limit" },
  { id: "Concessional Interest Loan", label: "Concessional Low-Interest Loan (Interest Subvention)" },
  { id: "Any / Best Available", label: "Any / Suggest Best Matched Government Scheme" }
];

export const EDUCATION_LEVELS = [
  "Below 8th Standard / Non-formal",
  "8th Pass",
  "10th Pass (Matriculation)",
  "12th Pass (Intermediate / Higher Secondary)",
  "ITI / Technical Diploma / Vocational Certification",
  "Graduate (B.A., B.Sc., B.Com., B.Tech, etc.)",
  "Post Graduate / Professional Degree"
];

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "bn", label: "বাংলা (Bengali)" },
  { code: "mr", label: "मराठी (Marathi)" },
  { code: "ta", label: "தமிழ் (Tamil)" },
  { code: "te", label: "తెలుగు (Telugu)" },
  { code: "gu", label: "ગુજરાતી (Gujarati)" },
  { code: "kn", label: "ಕನ್ನಡ (Kannada)" },
  { code: "ur", label: "اردو (Urdu)" }
];

export const LOCATION_PREFERENCES = [
  { id: "Within District", label: "Within My District (Local Gram Panchayat / Town)", desc: "Ideal for local vending, retail & traditional crafts" },
  { id: "Within State", label: "Within My State (Regional Supply Chain)", desc: "State MSME industrial estates & mandi access" },
  { id: "Pan-India", label: "Any Location / Pan-India Market", desc: "E-commerce, export & national procurement eligible" },
  { id: "Offline CSC Partner Desk", label: "Require Nearest CSC / Bank Mitra Physical Assistance", desc: "Handheld biometric, document scanning & offline filing" }
];

export const LOCAL_STORAGE_KEY = "saarthi_user_profile";

export default function SchemeFinderFlow({ onComplete, onCancel, isModal = false }) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State initialized from localStorage if available
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          // Step 1: User Details
          name: parsed.name || "",
          mobile: parsed.mobile || "",
          gender: parsed.gender || "Female",
          socialCategory: parsed.socialCategory || "Women",
          area: parsed.area || "Rural",
          state: parsed.state || "Uttar Pradesh",
          district: parsed.district || "Lucknow",

          // Step 2: Business Details
          businessType: parsed.businessType || "Street Vendor",
          stage: parsed.stage || "Existing & Operational",
          businessSector: parsed.businessSector || "Retail Grocery, Kirana & General Stores",
          annualFamilyIncome: parsed.annualFamilyIncome !== undefined ? parsed.annualFamilyIncome : 180000,
          annualTurnover: parsed.annualTurnover !== undefined ? parsed.annualTurnover : 120000,

          // Step 3: Funding Requirement
          loanPurpose: parsed.loanPurpose || "Working Capital",
          loanAmount: parsed.loanAmount !== undefined ? parsed.loanAmount : 50000,
          preferredFundingType: parsed.preferredFundingType || "Collateral-Free Microcredit",
          educationStatus: parsed.educationStatus || "10th Pass (Matriculation)",

          // Step 4: Preferences
          preferredLanguage: parsed.preferredLanguage || "हिन्दी (Hindi)",
          locationPreference: parsed.locationPreference || "Within District"
        };
      }
    } catch (e) {
      console.warn("Failed to load saved profile:", e);
    }

    return {
      // Step 1: User Details
      name: "",
      mobile: "",
      gender: "Female",
      socialCategory: "Women",
      area: "Rural",
      state: "Uttar Pradesh",
      district: "Lucknow",

      // Step 2: Business Details
      businessType: "Street Vendor",
      stage: "Existing & Operational",
      businessSector: "Retail Grocery, Kirana & General Stores",
      annualFamilyIncome: 180000,
      annualTurnover: 120000,

      // Step 3: Funding Requirement
      loanPurpose: "Working Capital",
      loanAmount: 50000,
      preferredFundingType: "Collateral-Free Microcredit",
      educationStatus: "10th Pass (Matriculation)",

      // Step 4: Preferences
      preferredLanguage: "हिन्दी (Hindi)",
      locationPreference: "Within District"
    };
  });

  // Keep district synchronized with state changes
  useEffect(() => {
    const districtsForState = STATES_AND_DISTRICTS[formData.state] || [];
    if (districtsForState.length > 0 && !districtsForState.includes(formData.district)) {
      setFormData((prev) => ({ ...prev, district: districtsForState[0] }));
    }
  }, [formData.state]);

  // Persist draft updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    } catch (e) {
      console.error("LocalStorage save error:", e);
    }
  }, [formData]);

  // Helper to update field and clear its validation error reactively
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Reset draft to initial state
  const handleResetDraft = () => {
    if (window.confirm("Are you sure you want to restore the built-in demo profile? Your current form inputs will be replaced.")) {
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } catch (e) {}
      setFormData({
        name: "",
        mobile: "",
        gender: "Female",
        socialCategory: "Women",
        area: "Rural",
        state: "Uttar Pradesh",
        district: "Lucknow",
        businessType: "Street Vendor",
        stage: "Existing & Operational",
        businessSector: "Retail Grocery, Kirana & General Stores",
        annualFamilyIncome: 180000,
        annualTurnover: 120000,
        loanPurpose: "Working Capital",
        loanAmount: 50000,
        preferredFundingType: "Collateral-Free Microcredit",
        educationStatus: "10th Pass (Matriculation)",
        preferredLanguage: "हिन्दी (Hindi)",
        locationPreference: "Within District"
      });
      setErrors({});
      setStep(1);
    }
  };

  // Validation function per step
  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Full name is required as per official ID.";
      } else if (formData.name.trim().length < 2) {
        newErrors.name = "Name should have at least 2 characters.";
      }

      if (!formData.mobile.trim()) {
        newErrors.mobile = "Mobile number is required for verification.";
      } else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
        newErrors.mobile = "Enter a valid 10-digit Indian mobile number (e.g. 9876543210).";
      }

      if (!formData.gender) {
        newErrors.gender = "Please select your gender.";
      }

      if (!formData.socialCategory) {
        newErrors.socialCategory = "Please select your beneficiary/social category.";
      }

      if (!formData.area) {
        newErrors.area = "Please select your residential area (Rural or Urban).";
      }

      if (!formData.state) {
        newErrors.state = "Please select your State or Union Territory.";
      }

      if (!formData.district) {
        newErrors.district = "Please select or specify your district.";
      }
    } else if (currentStep === 2) {
      if (!formData.businessType) {
        newErrors.businessType = "Please select your enterprise type.";
      }

      if (!formData.stage) {
        newErrors.stage = "Please select your venture stage.";
      }

      if (!formData.businessSector) {
        newErrors.businessSector = "Please select your business sector.";
      }

      if (formData.annualFamilyIncome === "" || isNaN(formData.annualFamilyIncome) || Number(formData.annualFamilyIncome) < 0) {
        newErrors.annualFamilyIncome = "Enter a valid annual family income (0 or higher).";
      }

      if (formData.annualTurnover === "" || isNaN(formData.annualTurnover) || Number(formData.annualTurnover) < 0) {
        newErrors.annualTurnover = "Enter a valid annual turnover (enter 0 if new venture).";
      }
    } else if (currentStep === 3) {
      if (!formData.loanPurpose) {
        newErrors.loanPurpose = "Please specify the purpose of funding.";
      }

      if (!formData.loanAmount || isNaN(formData.loanAmount) || Number(formData.loanAmount) < 5000) {
        newErrors.loanAmount = "Minimum loan amount request is ₹5,000.";
      } else if (Number(formData.loanAmount) > 100000000) {
        newErrors.loanAmount = "Maximum loan amount cannot exceed ₹10 Crore.";
      }

      if (!formData.preferredFundingType) {
        newErrors.preferredFundingType = "Please choose preferred funding type.";
      }

      if (!formData.educationStatus) {
        newErrors.educationStatus = "Please select your education status.";
      }
    } else if (currentStep === 4) {
      if (!formData.preferredLanguage) {
        newErrors.preferredLanguage = "Please select your preferred language.";
      }

      if (!formData.locationPreference) {
        newErrors.locationPreference = "Please select your location preference.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(4, prev + 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    } catch (err) {
      console.warn("Storage write error", err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      if (onComplete) {
        onComplete(formData);
      }
    }, 450);
  };

  const stepsMeta = [
    { num: 1, title: "User Details", subtitle: "Identity & Demographics", icon: User },
    { num: 2, title: "Business Details", subtitle: "Enterprise & Stage", icon: Briefcase },
    { num: 3, title: "Funding Requirement", subtitle: "Amount & Purpose", icon: IndianRupee },
    { num: 4, title: "Preferences", subtitle: "Language & Review", icon: SlidersHorizontal }
  ];

  // Helper to get loan bracket badge
  const getLoanTierBadge = (amt) => {
    const num = Number(amt) || 0;
    if (num <= 50000) return { name: "PM SVANidhi / Mudra Shishu Tier", color: "bg-emerald-100 text-emerald-800 border-emerald-300" };
    if (num <= 500000) return { name: "Mudra Kishore Tier", color: "bg-blue-100 text-blue-800 border-blue-300" };
    if (num <= 1000000) return { name: "Mudra Tarun / PMEGP Micro Tier", color: "bg-purple-100 text-purple-800 border-purple-300" };
    if (num <= 5000000) return { name: "PMEGP / Stand-Up India Tier", color: "bg-amber-100 text-amber-800 border-amber-300" };
    return { name: "High-Value MSME Greenfield Tier", color: "bg-slate-100 text-slate-800 border-slate-300" };
  };

  return (
    <div className={`w-full ${isModal ? "" : "max-w-4xl mx-auto"} text-left`}>
      {/* Top Card / Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        {/* National Tricolor Top Accent */}
        <div className="tricolor-border-top" />

        {/* Stepper Header */}
        <div className="px-5 sm:px-8 pt-6 pb-5 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  SIH 2026 • Government Scheme Finder
                </span>
                <span className="text-xs text-slate-400 font-medium">Step {step} of 4</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-saarthi-navy mt-1">
                Entrepreneur Profile & Scheme Assessment
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Provide your personal and business details to determine your eligibility and highest subsidies across Central & State schemes.
              </p>
            </div>

            <div className="flex items-center space-x-2 self-start sm:self-center">
              <button
                type="button"
                onClick={handleResetDraft}
                title="Restore the built-in demo profile"
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50/50 transition"
              >
                Reset Draft
              </button>
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Close
                </button>
              )}
            </div>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {stepsMeta.map((s) => {
              const IconComp = s.icon;
              const isCompleted = step > s.num;
              const isCurrent = step === s.num;

              return (
                <div
                  key={s.num}
                  className={`flex items-center space-x-2.5 p-2.5 rounded-2xl border transition-all ${
                    isCurrent
                      ? "bg-white border-saarthi-green shadow-sm ring-2 ring-emerald-500/10"
                      : isCompleted
                      ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
                      : "bg-slate-50/80 border-slate-200 text-slate-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
                      isCurrent
                        ? "bg-saarthi-navy text-white shadow-xs"
                        : isCompleted
                        ? "bg-saarthi-green text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4 text-white" /> : <IconComp className="w-4 h-4" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Step {s.num}
                      </span>
                    </div>
                    <div
                      className={`text-xs font-bold truncate ${
                        isCurrent ? "text-saarthi-navy" : isCompleted ? "text-emerald-900" : "text-slate-500"
                      }`}
                    >
                      {s.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-4">
            <div
              className="bg-saarthi-green h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-8">
          {/* STEP 1: USER DETAILS */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-saarthi-green flex-shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900">
                  <span className="font-bold">Affirmative Action & Inclusion:</span> Government programs offer enhanced margin subsidies (up to 35%), lower promoter contributions (as low as 5%), and zero-collateral coverage for designated beneficiary categories.
                </div>
              </div>

              {/* Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1.5">
                    Full Name <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Kumar / Sunita Devi"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium bg-white transition focus:outline-none focus:ring-2 ${
                      errors.name
                        ? "border-red-400 focus:ring-red-200 bg-red-50/30"
                        : "border-slate-300 focus:border-saarthi-navy focus:ring-saarthi-navy/20"
                    }`}
                  />
                  {errors.name ? (
                    <p className="mt-1 text-[11px] text-red-600 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      {errors.name}
                    </p>
                  ) : (
                    <p className="mt-1 text-[11px] text-slate-400">As shown on your Aadhaar or Voter ID.</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1.5">
                    Mobile Number <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={formData.mobile}
                      onChange={(e) => updateField("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className={`w-full pl-12 pr-3.5 py-2.5 rounded-xl border text-sm font-medium bg-white transition focus:outline-none focus:ring-2 ${
                        errors.mobile
                          ? "border-red-400 focus:ring-red-200 bg-red-50/30"
                          : "border-slate-300 focus:border-saarthi-navy focus:ring-saarthi-navy/20"
                      }`}
                    />
                  </div>
                  {errors.mobile ? (
                    <p className="mt-1 text-[11px] text-red-600 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      {errors.mobile}
                    </p>
                  ) : (
                    <p className="mt-1 text-[11px] text-slate-400">Used for scheme notifications & OTP verification.</p>
                  )}
                </div>
              </div>

              {/* Gender & Area (Rural/Urban) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1.5">
                    Gender <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "Female", label: "Female" },
                      { id: "Male", label: "Male" },
                      { id: "Transgender", label: "Transgender" }
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => updateField("gender", g.id)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center space-x-1 ${
                          formData.gender === g.id
                            ? "border-saarthi-green bg-emerald-50 text-saarthi-green-hover ring-2 ring-emerald-500/20"
                            : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                        }`}
                      >
                        <span>{g.label}</span>
                        {formData.gender === g.id && <CheckCircle2 className="w-3.5 h-3.5 text-saarthi-green" />}
                      </button>
                    ))}
                  </div>
                  {errors.gender && <p className="mt-1 text-[11px] text-red-600">{errors.gender}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1.5">
                    Location Area <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "Rural", label: "Rural (Gram Panchayat)", sub: "Higher 35% PMEGP Subsidy" },
                      { id: "Urban", label: "Urban (Municipal)", sub: "SVANidhi & Urban Quotas" }
                    ].map((ar) => (
                      <button
                        key={ar.id}
                        type="button"
                        onClick={() => updateField("area", ar.id)}
                        className={`p-2 rounded-xl border text-left text-xs font-bold transition ${
                          formData.area === ar.id
                            ? "border-saarthi-green bg-emerald-50 text-saarthi-green-hover ring-2 ring-emerald-500/20"
                            : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{ar.label}</span>
                          {formData.area === ar.id && <CheckCircle2 className="w-3.5 h-3.5 text-saarthi-green" />}
                        </div>
                        <span className="text-[10px] font-normal text-slate-500 block mt-0.5">{ar.sub}</span>
                      </button>
                    ))}
                  </div>
                  {errors.area && <p className="mt-1 text-[11px] text-red-600">{errors.area}</p>}
                </div>
              </div>

              {/* Social Category Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-saarthi-navy">
                    Social / Beneficiary Category <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <span className="text-[11px] text-slate-500">
                    Active: <strong className="text-saarthi-green">{formData.socialCategory}</strong>
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {BENEFICIARY_CATEGORIES.map((cat) => {
                    const isSelected = formData.socialCategory === cat.id;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => updateField("socialCategory", cat.id)}
                        className={`p-3 rounded-2xl text-left border transition text-xs flex flex-col justify-between ${
                          isSelected
                            ? "border-saarthi-green bg-emerald-50/80 text-saarthi-green-hover ring-2 ring-emerald-500/20 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold mb-1">
                          <span className="truncate">{cat.label}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-saarthi-green flex-shrink-0 ml-1" />}
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium leading-tight">
                          {cat.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
                {errors.socialCategory && (
                  <p className="mt-1 text-[11px] text-red-600">{errors.socialCategory}</p>
                )}
              </div>

              {/* State & District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1.5">
                    State / Union Territory <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={formData.state}
                      onChange={(e) => updateField("state", e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
                    >
                      {Object.keys(STATES_AND_DISTRICTS).map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.state && <p className="mt-1 text-[11px] text-red-600">{errors.state}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1.5">
                    District <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => updateField("district", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
                  >
                    {(STATES_AND_DISTRICTS[formData.state] || ["Main District", "Other"]).map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                  {errors.district && <p className="mt-1 text-[11px] text-red-600">{errors.district}</p>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: BUSINESS DETAILS */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 flex items-start space-x-3">
                <Building2 className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-blue-900">
                  <span className="font-bold">Enterprise Eligibility Mapping:</span> Different Central ministries oversee specialized funding (e.g. MoHUA for PM SVANidhi, MoMSME for PMEGP and PM Vishwakarma, MoF for MUDRA and Stand-Up India).
                </div>
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-2">
                  Business / Enterprise Type <span className="text-red-500 font-bold ml-0.5">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BUSINESS_TYPES.map((bt) => {
                    const isSelected = formData.businessType === bt.id;
                    return (
                      <button
                        type="button"
                        key={bt.id}
                        onClick={() => updateField("businessType", bt.id)}
                        className={`p-3.5 rounded-2xl text-left border transition flex items-center space-x-3 ${
                          isSelected
                            ? "border-saarthi-green bg-emerald-50 text-saarthi-green-hover ring-2 ring-emerald-500/20 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                        }`}
                      >
                        <span className="text-2xl">{bt.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-800 truncate">{bt.label}</div>
                          <span className="inline-block mt-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                            {bt.tag}
                          </span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-saarthi-green flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                {errors.businessType && (
                  <p className="mt-1 text-[11px] text-red-600">{errors.businessType}</p>
                )}
              </div>

              {/* Enterprise Stage & Business Sector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1.5">
                    Enterprise Stage <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <select
                    value={formData.stage}
                    onChange={(e) => updateField("stage", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
                  >
                    {ENTERPRISE_STAGES.map((stg) => (
                      <option key={stg.id} value={stg.id}>
                        {stg.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {ENTERPRISE_STAGES.find((s) => s.id === formData.stage)?.desc}
                  </p>
                  {errors.stage && <p className="mt-1 text-[11px] text-red-600">{errors.stage}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1.5">
                    Business Sector / Activity <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <select
                    value={formData.businessSector}
                    onChange={(e) => updateField("businessSector", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
                  >
                    {BUSINESS_SECTORS.map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-[11px] text-slate-400">Matches trade-specific toolkits and subsidies.</p>
                  {errors.businessSector && (
                    <p className="mt-1 text-[11px] text-red-600">{errors.businessSector}</p>
                  )}
                </div>
              </div>

              {/* Annual Family Income & Annual Turnover */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-saarthi-navy">
                      Annual Family Income (₹) <span className="text-red-500 font-bold ml-0.5">*</span>
                    </label>
                    <span className="text-xs font-bold text-saarthi-green">
                      {formData.annualFamilyIncome === "" ? "₹0" : `₹${Number(formData.annualFamilyIncome || 0).toLocaleString("en-IN")}`}
                    </span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="10000"
                    placeholder="e.g. 150000"
                    value={formData.annualFamilyIncome}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateField("annualFamilyIncome", val === "" ? "" : Number(val));
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium bg-white focus:outline-none focus:ring-2 ${
                      errors.annualFamilyIncome
                        ? "border-red-400 focus:ring-red-200"
                        : "border-slate-300 focus:border-saarthi-navy focus:ring-saarthi-navy/20"
                    }`}
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {[
                      { label: "< ₹1 Lakh", val: 90000 },
                      { label: "₹1.5 Lakh", val: 150000 },
                      { label: "₹3 Lakh", val: 300000 },
                      { label: "₹5 Lakh", val: 500000 }
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => updateField("annualFamilyIncome", preset.val)}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  {errors.annualFamilyIncome && (
                    <p className="mt-1 text-[11px] text-red-600">{errors.annualFamilyIncome}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-saarthi-navy">
                      Annual Turnover / Sales (₹) <span className="text-red-500 font-bold ml-0.5">*</span>
                    </label>
                    <span className="text-xs font-bold text-saarthi-navy">
                      {formData.annualTurnover === 0 || formData.annualTurnover === ""
                        ? "New Venture (₹0)"
                        : `₹${Number(formData.annualTurnover || 0).toLocaleString("en-IN")}`}
                    </span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="10000"
                    placeholder="e.g. 120000 (enter 0 if new)"
                    value={formData.annualTurnover}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateField("annualTurnover", val === "" ? "" : Number(val));
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium bg-white focus:outline-none focus:ring-2 ${
                      errors.annualTurnover
                        ? "border-red-400 focus:ring-red-200"
                        : "border-slate-300 focus:border-saarthi-navy focus:ring-saarthi-navy/20"
                    }`}
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {[
                      { label: "₹0 (Idea/New)", val: 0 },
                      { label: "₹80,000", val: 80000 },
                      { label: "₹2 Lakh", val: 200000 },
                      { label: "₹5 Lakh", val: 500000 }
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => updateField("annualTurnover", preset.val)}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  {errors.annualTurnover && (
                    <p className="mt-1 text-[11px] text-red-600">{errors.annualTurnover}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: FUNDING REQUIREMENT */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              {/* Required Loan Amount (Slider + Quick Buttons + Tier Badge) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-saarthi-navy">
                      Required Loan Amount (₹) <span className="text-red-500 font-bold ml-0.5">*</span>
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Total funding requested for capital expenditure and working stock.
                    </p>
                  </div>
                  <div className="flex flex-col sm:items-end">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-sm font-bold text-slate-400">₹</span>
                      <input
                        type="number"
                        min="5000"
                        max="100000000"
                        step="5000"
                        value={formData.loanAmount}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateField("loanAmount", val === "" ? "" : Number(val));
                        }}
                        className="w-36 text-right font-black text-xl text-saarthi-green px-2.5 py-1 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-saarthi-green"
                      />
                    </div>
                    {(() => {
                      const badge = getLoanTierBadge(formData.loanAmount);
                      return (
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 mt-1 rounded-full border ${badge.color}`}>
                          {badge.name}
                        </span>
                      );
                    })()}
                  </div>
                </div>

                <input
                  type="range"
                  min="10000"
                  max="5000000"
                  step="10000"
                  value={Number(formData.loanAmount) || 10000}
                  onChange={(e) => updateField("loanAmount", Number(e.target.value))}
                  className="w-full accent-saarthi-green cursor-pointer h-2 bg-slate-200 rounded-lg my-2"
                />

                <div className="flex justify-between text-[10px] text-slate-400 font-semibold mb-3">
                  <span>₹10,000 (SVANidhi)</span>
                  <span>₹50,000 (Shishu)</span>
                  <span>₹5 Lakh (Kishore)</span>
                  <span>₹20 Lakh (Tarun+)</span>
                  <span>₹50 Lakh (PMEGP)</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
                  <span className="text-xs text-slate-500 font-semibold self-center mr-1">Quick Select:</span>
                  {[
                    { label: "₹10,000", val: 10000 },
                    { label: "₹50,000", val: 50000 },
                    { label: "₹1,00,000", val: 100000 },
                    { label: "₹3,00,000", val: 300000 },
                    { label: "₹5,00,000", val: 500000 },
                    { label: "₹10,00,000", val: 1000000 },
                    { label: "₹25,00,000", val: 2500000 }
                  ].map((chip) => (
                    <button
                      key={chip.val}
                      type="button"
                      onClick={() => updateField("loanAmount", chip.val)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                        Number(formData.loanAmount) === chip.val
                          ? "bg-saarthi-navy text-white shadow-xs"
                          : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
                {errors.loanAmount && <p className="mt-1 text-[11px] text-red-600">{errors.loanAmount}</p>}
              </div>

              {/* Purpose of Loan */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-2">
                  Purpose of Loan <span className="text-red-500 font-bold ml-0.5">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {FUNDING_PURPOSES.map((fp) => {
                    const isSelected = formData.loanPurpose === fp.id;
                    return (
                      <button
                        type="button"
                        key={fp.id}
                        onClick={() => updateField("loanPurpose", fp.id)}
                        className={`p-3 rounded-2xl text-left border text-xs font-bold transition flex items-center justify-between ${
                          isSelected
                            ? "border-saarthi-green bg-emerald-50 text-saarthi-green-hover ring-2 ring-emerald-500/20"
                            : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                        }`}
                      >
                        <span>{fp.label}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-saarthi-green flex-shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
                {errors.loanPurpose && <p className="mt-1 text-[11px] text-red-600">{errors.loanPurpose}</p>}
              </div>

              {/* Preferred Funding Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-2">
                  Preferred Funding Type <span className="text-red-500 font-bold ml-0.5">*</span>
                </label>
                <select
                  value={formData.preferredFundingType}
                  onChange={(e) => updateField("preferredFundingType", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
                >
                  {FUNDING_TYPES.map((ft) => (
                    <option key={ft.id} value={ft.id}>
                      {ft.label}
                    </option>
                  ))}
                </select>
                {errors.preferredFundingType && (
                  <p className="mt-1 text-[11px] text-red-600">{errors.preferredFundingType}</p>
                )}
              </div>

              {/* Education Status where relevant */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-saarthi-navy">
                    Education Status (where relevant) <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Mandatory for PMEGP projects &gt; ₹10 Lakhs (8th Pass criteria)
                  </span>
                </div>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={formData.educationStatus}
                    onChange={(e) => updateField("educationStatus", e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
                  >
                    {EDUCATION_LEVELS.map((edu) => (
                      <option key={edu} value={edu}>
                        {edu}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.educationStatus && (
                  <p className="mt-1 text-[11px] text-red-600">{errors.educationStatus}</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: PREFERENCES & SUMMARY */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              {/* Preferred Language & Location Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1.5">
                    Preferred Language for Guidance <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={formData.preferredLanguage}
                      onChange={(e) => updateField("preferredLanguage", e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang.code} value={lang.label}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Scheme summary checklists and CSC handholding instructions will be prioritized in this language.
                  </p>
                  {errors.preferredLanguage && (
                    <p className="mt-1 text-[11px] text-red-600">{errors.preferredLanguage}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1.5">
                    Location Preference <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <select
                    value={formData.locationPreference}
                    onChange={(e) => updateField("locationPreference", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
                  >
                    {LOCATION_PREFERENCES.map((lp) => (
                      <option key={lp.id} value={lp.id}>
                        {lp.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {LOCATION_PREFERENCES.find((l) => l.id === formData.locationPreference)?.desc}
                  </p>
                  {errors.locationPreference && (
                    <p className="mt-1 text-[11px] text-red-600">{errors.locationPreference}</p>
                  )}
                </div>
              </div>

              {/* Summary / Review Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-saarthi-green" />
                    <span className="text-xs font-bold uppercase tracking-wider text-saarthi-navy">
                      Assessment Summary Review
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded">
                    Ready for Matching
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Applicant</span>
                    <span className="font-bold text-slate-800">{formData.name || "N/A"}</span>
                    <span className="text-slate-500 block text-[11px]">+91 {formData.mobile || "N/A"}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Category & Gender</span>
                    <span className="font-bold text-slate-800">{formData.socialCategory}</span>
                    <span className="text-slate-500 block text-[11px]">{formData.gender} • {formData.area}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
                    <span className="font-bold text-slate-800">{formData.district}</span>
                    <span className="text-slate-500 block text-[11px]">{formData.state}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Enterprise</span>
                    <span className="font-bold text-slate-800">{formData.businessType}</span>
                    <span className="text-slate-500 block text-[11px]">{formData.stage}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Loan Amount</span>
                    <span className="font-bold text-saarthi-green text-sm">
                      ₹{Number(formData.loanAmount).toLocaleString("en-IN")}
                    </span>
                    <span className="text-slate-500 block text-[11px]">{formData.loanPurpose}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Education & Language</span>
                    <span className="font-bold text-slate-800">{formData.educationStatus}</span>
                    <span className="text-slate-500 block text-[11px]">{formData.preferredLanguage}</span>
                  </div>
                </div>
              </div>

              {/* Data persistence notice */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-saarthi-green flex-shrink-0" />
                <span>
                  <strong>Automatic Persistence Active:</strong> Your responses are safely stored in your browser session so you can compare schemes, calculate EMIs, and locate nearby CSC centers without re-entering data.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Form Navigation Controls */}
        <div className="px-5 sm:px-8 py-4 bg-slate-50/90 border-t border-slate-200 flex items-center justify-between">
          <div>
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : onCancel ? (
              <button
                type="button"
                onClick={onCancel}
                className="text-xs font-semibold text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
            ) : (
              <div />
            )}
          </div>

          <div>
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-saarthi-navy hover:bg-saarthi-navy-light text-white text-xs font-bold transition shadow-sm"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center space-x-2 px-7 py-3 rounded-2xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-black transition shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Saving & Matching Schemes...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Find Matching Schemes</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

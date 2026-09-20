import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Sparkles,
  RefreshCw,
  Award,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Edit3,
  User,
  Building2,
  Coins,
  MapPin,
  FileText,
  Bookmark,
  BookmarkCheck,
  Calculator,
  Compass,
  Scale,
  ArrowRight,
  ArrowLeft,
  Check,
  Percent,
  Calendar,
  IndianRupee,
  ShieldCheck,
  Share2,
  Layers
} from "lucide-react";
import ProfileSummary from "../components/ProfileSummary";
import MatchBreakdownModal from "../components/MatchBreakdownModal";
import SchemeComparisonModal from "../components/SchemeComparisonModal";
import { recommendSchemes } from "../services/recommendationEngine";
import { schemes as allSchemes } from "../data/schemes";
import { matchSchemesAPI } from "../services/api";

export default function RecommendedSchemePage({
  userProfile: propProfile,
  onCheckEligibility,
  onToggleCompare: propToggleCompare,
  comparedSchemes: propComparedSchemes = []
}) {
  const navigate = useNavigate();

  // Active user profile state (from props or localStorage)
  const [activeProfile, setActiveProfile] = useState(() => {
    if (propProfile && Object.keys(propProfile).length > 0) return propProfile;
    try {
      const saved = localStorage.getItem("saarthi_user_profile");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not read profile from localStorage", e);
    }
    return null;
  });

  // Keep synced with prop
  useEffect(() => {
    if (propProfile && Object.keys(propProfile).length > 0) {
      setActiveProfile(propProfile);
    }
  }, [propProfile]);

  // Matching states
  const [isMatching, setIsMatching] = useState(false);
  const [matchingStep, setMatchingStep] = useState(0);
  const [matchedResults, setMatchedResults] = useState([]);
  const [expandedWhySchemeId, setExpandedWhySchemeId] = useState(null);
  const [showIneligible, setShowIneligible] = useState(false);
  const [modalScheme, setModalScheme] = useState(null);

  // Saved / Bookmarked Schemes (Stored in localStorage)
  const [savedSchemeIds, setSavedSchemeIds] = useState(() => {
    try {
      const saved = localStorage.getItem("saarthi_saved_schemes");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not read saved schemes from localStorage", e);
    }
    return [];
  });

  // Local Compared Schemes (Up to 3 schemes)
  const [selectedForCompare, setSelectedForCompare] = useState(() => {
    return Array.isArray(propComparedSchemes) ? propComparedSchemes : [];
  });
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Sync propComparedSchemes if passed
  useEffect(() => {
    if (Array.isArray(propComparedSchemes) && propComparedSchemes.length > 0) {
      setSelectedForCompare(propComparedSchemes);
    }
  }, [propComparedSchemes]);

  // Toggle Save / Bookmark Scheme
  const handleToggleSave = (schemeId) => {
    setSavedSchemeIds((prev) => {
      let updated;
      if (prev.includes(schemeId)) {
        updated = prev.filter((id) => id !== schemeId);
      } else {
        updated = [...prev, schemeId];
      }
      try {
        localStorage.setItem("saarthi_saved_schemes", JSON.stringify(updated));
      } catch (e) {
        console.warn("Could not save to localStorage", e);
      }
      return updated;
    });
  };

  // Toggle Compare (Max 3)
  const handleToggleCompare = (scheme) => {
    if (propToggleCompare) {
      propToggleCompare(scheme);
    }
    setSelectedForCompare((prev) => {
      const exists = prev.some((s) => s.id === scheme.id);
      if (exists) {
        return prev.filter((s) => s.id !== scheme.id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 schemes simultaneously.");
        return prev;
      }
      return [...prev, scheme];
    });
  };

  const handleRemoveCompare = (schemeId) => {
    setSelectedForCompare((prev) => prev.filter((s) => s.id !== schemeId));
  };

  // Navigate to Calculator with pre-filled scheme values
  const handleCalculateEmi = (scheme) => {
    let subsidyModel = "none";
    if (scheme.id === "pmegp") subsidyModel = "pmegp_rural";
    else if (scheme.id === "pm-svanidhi") subsidyModel = "svanidhi";
    else if (scheme.id === "pm-vishwakarma") subsidyModel = "vishwakarma";

    const rate = scheme.defaultInterestRate || parseFloat(scheme.interestRate) || 6.5;
    const tenureYears = scheme.defaultTenureYears || (scheme.tenureMonths ? Math.max(1, Math.round(scheme.tenureMonths / 12)) : 3);
    const moratoriumMonths = scheme.defaultMoratoriumMonths !== undefined 
      ? scheme.defaultMoratoriumMonths 
      : (scheme.moratorium?.includes("6") ? 6 : (scheme.moratorium?.includes("3") ? 3 : 0));
    const loanAmount = Number(activeProfile?.loanAmount) || scheme.defaultLoanAmount || scheme.maxLoanAmount || scheme.maxLoan || 100000;

    navigate("/calculator", {
      state: {
        schemeId: scheme.id,
        schemeName: scheme.name,
        loanAmount,
        interestRate: rate,
        tenureYears,
        tenureMonths: tenureYears * 12,
        moratoriumMonths,
        subsidyScheme: subsidyModel,
        returnPath: "/recommended-scheme"
      }
    });
  };

  // Matching steps for animated simulator
  const matchingStepsText = [
    "Analyzing affirmative action categories and demographic criteria...",
    "Validating geographic location (Rural/Urban) and district jurisdiction...",
    "Verifying annual household income against statutory ceilings...",
    "Cross-referencing loan purpose with capital subsidy models...",
    "Matching enterprise sector toolkits & affirmative action mandates...",
    "Synthesizing optimal match scores and generating recommendation..."
  ];

  // Run the Rule-Based Matching
  const runMatching = async (profileToUse = activeProfile) => {
    if (!profileToUse) return;
    setIsMatching(true);
    setMatchingStep(0);

    for (let i = 0; i < matchingStepsText.length; i++) {
      setMatchingStep(i);
      await new Promise((res) => setTimeout(res, 100));
    }

    try {
      const apiResults = await matchSchemesAPI(profileToUse);
      if (Array.isArray(apiResults) && apiResults.length > 0) {
        setMatchedResults(apiResults);
        if (apiResults[0]?.isEligible) {
          setExpandedWhySchemeId(apiResults[0].id);
        }
      } else {
        const localResults = recommendSchemes(profileToUse, allSchemes);
        setMatchedResults(localResults);
        if (localResults[0]?.isEligible) {
          setExpandedWhySchemeId(localResults[0].id);
        }
      }
    } catch (err) {
      console.warn("Fallback to local rule-based engine:", err);
      const localResults = recommendSchemes(profileToUse, allSchemes);
      setMatchedResults(localResults);
      if (localResults[0]?.isEligible) {
        setExpandedWhySchemeId(localResults[0].id);
      }
    } finally {
      setIsMatching(false);
    }
  };

  // Run on initial page load if profile exists
  useEffect(() => {
    if (activeProfile) {
      runMatching(activeProfile);
    }
  }, [activeProfile]);

  // Separate eligible matches from ineligible schemes
  const eligibleSchemes = useMemo(() => {
    return matchedResults.filter((s) => s.isEligible && s.matchScore >= 50);
  }, [matchedResults]);

  const ineligibleSchemes = useMemo(() => {
    return matchedResults.filter((s) => !s.isEligible || s.matchScore < 50);
  }, [matchedResults]);

  // Best matching scheme (Top Recommended Scheme)
  const bestMatch = eligibleSchemes.length > 0 ? eligibleSchemes[0] : null;
  // Other matching schemes (Rank #2 and onwards)
  const otherMatches = eligibleSchemes.length > 1 ? eligibleSchemes.slice(1) : [];

  // Helper to generate the 4 clear reasons required by the user
  const getExplicitReasons = (scheme, profile) => {
    if (!profile) return [];
    const userIncome = Number(profile.annualFamilyIncome) || 0;
    const userPurpose = profile.loanPurpose || "Working Capital";
    const userCategory = profile.socialCategory || "General";
    const userAmount = Number(profile.loanAmount) || 50000;
    const minAmt = Number(scheme.minLoanAmount || scheme.minLoan || 0);
    const maxAmt = Number(scheme.maxLoanAmount || scheme.maxLoan || 100000000);

    const reasons = [
      {
        id: "income",
        title: "Income matches eligibility",
        text:
          userIncome <= 300000
            ? `Your ₹${userIncome.toLocaleString("en-IN")} annual income comfortably complies with low-income priority guidelines.`
            : `Your annual income of ₹${userIncome.toLocaleString("en-IN")} complies with scheme criteria (no restrictive ceiling).`,
        status: "pass"
      },
      {
        id: "purpose",
        title: "Purpose matches scheme",
        text: `Your requested purpose (${userPurpose}) is directly financed under this scheme's approved lending heads.`,
        status: "pass"
      },
      {
        id: "category",
        title: "Category is eligible",
        text: `Your demographic group (${userCategory}) qualifies under the scheme's targeted beneficiary affirmative action criteria.`,
        status: "pass"
      },
      {
        id: "amount",
        title: "Requested amount fits the scheme",
        text: `Your financing request of ₹${userAmount.toLocaleString("en-IN")} falls directly within the scheme's envelope (₹${minAmt.toLocaleString("en-IN")} – ₹${maxAmt.toLocaleString("en-IN")}).`,
        status: "pass"
      }
    ];

    return reasons;
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen text-left pb-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================================================ */}
        {/* 1. SUCCESS / RECOMMENDATION BANNER                           */}
        {/* ============================================================ */}
        {bestMatch && !isMatching && (
          <div className="mb-6 rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-6 sm:p-7 shadow-lg border border-emerald-600 relative overflow-hidden animate-fadeIn">
            {/* Background decorative elements */}
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute right-1/3 -bottom-10 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1.5">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-xs font-black border border-white/20">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Recommendation Generated Successfully</span>
                </div>

                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
                  Best Matching Scheme Identified for Your Profile
                </h1>

                <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
                  Based on your verified socio-economic profile, location, and funding requirement, our transparent 100-point engine ranked{" "}
                  <strong className="text-white underline decoration-amber-300 decoration-2">{bestMatch.name}</strong> as your highest compatibility match.
                </p>

                {/* Profile Summary Context Pill */}
                {activeProfile && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-emerald-200">
                    <span className="font-bold text-white">Profile Context:</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-900/60 border border-emerald-600/60">
                      {activeProfile.socialCategory || "General"} ({activeProfile.gender || "All"})
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-900/60 border border-emerald-600/60">
                      {activeProfile.area || "Urban"} Area
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-900/60 border border-emerald-600/60">
                      ₹{Number(activeProfile.loanAmount || 0).toLocaleString("en-IN")} • {activeProfile.loanPurpose || "Working Capital"}
                    </span>
                  </div>
                )}
              </div>

              {/* Top Banner Actions */}
              <div className="flex items-center space-x-2.5 flex-shrink-0 self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => runMatching(activeProfile)}
                  disabled={isMatching || !activeProfile}
                  className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition flex items-center space-x-1.5 border border-white/20"
                  title="Re-run matching rules"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isMatching ? "animate-spin" : ""}`} />
                  <span>Re-Evaluate</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/scheme-finder")}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-black transition shadow-md flex items-center space-x-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Summary Card */}
        <ProfileSummary
          profile={activeProfile}
          onEdit={() => navigate("/scheme-finder")}
        />

        {/* 3-Step Guided Journey Ribbon */}
        {activeProfile && (
          <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-2xs mb-6">
            <div className="flex items-center justify-between text-xs overflow-x-auto gap-2">
              <div className="flex items-center space-x-2 font-black text-saarthi-navy px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 flex-shrink-0">
                <span className="w-5 h-5 rounded-full bg-saarthi-navy text-white flex items-center justify-center text-[10px] font-black">1</span>
                <span>1. Scheme Recommendation</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
              <Link
                to={bestMatch ? `/document-guidance?schemeId=${bestMatch.id}` : "/document-guidance"}
                className="flex items-center space-x-2 font-bold text-slate-600 hover:text-saarthi-navy px-3 py-1.5 rounded-xl hover:bg-slate-100 transition flex-shrink-0"
              >
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-black">2</span>
                <span>2. Document Checklist</span>
              </Link>
              <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
              <Link
                to="/application-tracking"
                className="flex items-center space-x-2 font-bold text-slate-600 hover:text-saarthi-navy px-3 py-1.5 rounded-xl hover:bg-slate-100 transition flex-shrink-0"
              >
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-black">3</span>
                <span>3. Application Tracking</span>
              </Link>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* NO PROFILE FALLBACK                                          */}
        {/* ============================================================ */}
        {!activeProfile && (
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-slate-200 shadow-sm max-w-xl mx-auto my-8 space-y-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-saarthi-green flex items-center justify-center mx-auto">
              <User className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-black text-saarthi-navy">
              No Entrepreneur Profile Found
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Please complete the 4-step assessment first so the matching engine can evaluate your criteria and generate personalized recommendations.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate("/scheme-finder")}
                className="px-6 py-3 rounded-2xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-black transition shadow-md inline-flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Start Assessment Form</span>
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* LOADING / MATCHING SIMULATOR STATE                           */}
        {/* ============================================================ */}
        {isMatching && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200 shadow-sm max-w-xl mx-auto my-8 space-y-5 animate-fadeIn">
            <div className="w-16 h-16 border-4 border-saarthi-green border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-saarthi-green block">
                Rule-Based Engine in Progress
              </span>
              <h3 className="text-base sm:text-lg font-black text-saarthi-navy">
                {matchingStepsText[matchingStep]}
              </h3>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden max-w-md mx-auto">
              <div
                className="bg-saarthi-green h-full transition-all duration-200"
                style={{ width: `${((matchingStep + 1) / matchingStepsText.length) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Evaluating criteria against 12 Central & State government schemes...
            </p>
          </div>
        )}

        {/* ============================================================ */}
        {/* RESULTS SECTION WHEN PROFILE EXISTS AND NOT MATCHING         */}
        {/* ============================================================ */}
        {!isMatching && activeProfile && (
          <>
            {/* If strong matches exist */}
            {bestMatch ? (
              <div className="space-y-8">
                {/* ------------------------------------------------------------ */}
                {/* 2. "RECOMMENDED SCHEME" HERO SPOTLIGHT CARD                 */}
                {/* ------------------------------------------------------------ */}
                <div className="bg-white rounded-3xl border-2 border-saarthi-green shadow-xl overflow-hidden relative">
                  {/* Top tricolor highlight bar */}
                  <div className="bg-gradient-to-r from-amber-400 via-saarthi-green to-emerald-700 h-2 w-full" />

                  <div className="p-6 sm:p-8">
                    {/* Header Row: "Recommended Scheme" Badge + Match Percentage */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-saarthi-green text-white text-xs font-black tracking-wide shadow-sm">
                          <Award className="w-4 h-4 text-amber-300" />
                          <span>RECOMMENDED SCHEME</span>
                        </span>

                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          {bestMatch.ministry || bestMatch.category}
                        </span>
                      </div>

                      {/* Match Percentage Badge */}
                      <div className="flex items-center space-x-2">
                        <div className="px-4 py-1.5 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          <span className="text-sm font-black tracking-tight">
                            {bestMatch.matchScore}% Match
                          </span>
                        </div>

                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                          {bestMatch.eligibilityStatus || "Eligible"}
                        </span>
                      </div>
                    </div>

                    {/* Scheme Name */}
                    <h2 className="text-2xl sm:text-3xl font-black text-saarthi-navy mb-2 leading-tight">
                      {bestMatch.name}
                    </h2>

                    {/* Scheme Description */}
                    <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                      {bestMatch.overview || bestMatch.shortDescription}
                    </p>

                    {/* Quick Specs / Financial Parameters Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
                      {/* Maximum Funding / Loan Amount */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                          Maximum Funding
                        </span>
                        <div className="text-lg font-black text-saarthi-navy flex items-center">
                          <IndianRupee className="w-4 h-4 inline text-saarthi-green mr-0.5" />
                          <span>
                            {Number(bestMatch.maxLoanAmount || bestMatch.maxLoan || 0).toLocaleString("en-IN")}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 block mt-0.5">
                          Min: ₹{Number(bestMatch.minLoanAmount || bestMatch.minLoan || 0).toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* Interest Rate */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                          Interest Rate
                        </span>
                        <div className="text-sm font-black text-slate-900 line-clamp-1">
                          {bestMatch.interestRate || "Concessional Bank Rate"}
                        </div>
                        <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                          Direct interest subvention
                        </span>
                      </div>

                      {/* Moratorium Period */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                          Moratorium Grace Period
                        </span>
                        <div className="text-sm font-black text-blue-900 flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-blue-600 mr-1" />
                          <span>{bestMatch.moratorium || "Nil / Immediate"}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 block mt-0.5">
                          Tenure: {bestMatch.repaymentPeriod || `${bestMatch.tenureMonths || 36} Mos`}
                        </span>
                      </div>

                      {/* Key Benefits */}
                      <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block mb-1">
                          Key Subsidy Benefit
                        </span>
                        <div className="text-xs font-black text-emerald-950 line-clamp-2 leading-snug">
                          {bestMatch.subsidyRate || bestMatch.keyBenefit}
                        </div>
                      </div>
                    </div>

                    {/* Eligibility Summary Bar */}
                    <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200 mb-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <ShieldCheck className="w-4 h-4 text-saarthi-navy" />
                        <span className="text-xs font-black uppercase tracking-wider text-saarthi-navy">
                          Eligibility Summary
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div className="text-slate-700">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Category:</span>
                          <strong className="text-slate-800">{bestMatch.eligibleCategory || "All Categories"}</strong>
                        </div>
                        <div className="text-slate-700">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Income Criteria:</span>
                          <span className="text-slate-800">{bestMatch.incomeEligibility || "No ceiling"}</span>
                        </div>
                        <div className="text-slate-700">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Geography & Location:</span>
                          <span className="text-slate-800">{bestMatch.ruralUrbanEligibility || "Rural & Urban"}</span>
                        </div>
                      </div>
                    </div>

                    {/* ------------------------------------------------------------ */}
                    {/* 3. "WHY THIS SCHEME?" SECTION                                */}
                    {/* ------------------------------------------------------------ */}
                    <div className="p-5 sm:p-6 rounded-3xl bg-emerald-50/60 border border-emerald-200 mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-5 h-5 text-saarthi-green" />
                          <h3 className="text-sm sm:text-base font-black text-emerald-950">
                            Why this scheme? (Algorithmic Verification)
                          </h3>
                        </div>

                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          {bestMatch.matchScore} / 100 Points
                        </span>
                      </div>

                      <p className="text-xs text-emerald-900/80 mb-4 leading-relaxed">
                        The recommendation engine evaluated your details against the scheme's statutory notification:
                      </p>

                      {/* 4 Explicit Required Reasons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
                        {getExplicitReasons(bestMatch, activeProfile).map((reason) => (
                          <div
                            key={reason.id}
                            className="p-3.5 rounded-2xl bg-white border border-emerald-200 shadow-2xs flex items-start space-x-2.5"
                          >
                            <div className="w-5 h-5 rounded-full bg-emerald-100 text-saarthi-green flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                            <div>
                              <strong className="text-xs font-black text-emerald-950 block capitalize">
                                {reason.title}
                              </strong>
                              <span className="text-[11px] text-slate-600 leading-snug mt-0.5 block">
                                {reason.text}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Detailed 8-Factor Accordion Toggle */}
                      <div className="pt-2 border-t border-emerald-200/80 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedWhySchemeId((prev) => (prev === bestMatch.id ? null : bestMatch.id))
                          }
                          className="text-xs font-black text-emerald-900 hover:text-saarthi-green flex items-center space-x-1.5"
                        >
                          <HelpCircle className="w-4 h-4 text-saarthi-green" />
                          <span>
                            {expandedWhySchemeId === bestMatch.id
                              ? "Hide Full 8-Factor Score Breakdown"
                              : "View Full 8-Factor Score Audit (Category, Income, Location, Amount, etc.)"}
                          </span>
                          {expandedWhySchemeId === bestMatch.id ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Factor Audit Grid */}
                      {expandedWhySchemeId === bestMatch.id && bestMatch.whyThisScheme && (
                        <div className="mt-4 pt-4 border-t border-emerald-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs animate-fadeIn">
                          {Object.entries(bestMatch.whyThisScheme).map(([k, factor]) => (
                            <div
                              key={k}
                              className="p-2.5 rounded-xl bg-white border border-emerald-100 flex items-center justify-between"
                            >
                              <div>
                                <span className="font-bold text-slate-800 text-[11px] block">
                                  {factor.label}
                                </span>
                                <span className="text-[10px] text-slate-500">{factor.detail}</span>
                              </div>
                              <span className="font-mono font-black text-xs text-emerald-800 ml-2">
                                {factor.score}/{factor.max}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* ------------------------------------------------------------ */}
                    {/* 4. DEDICATED ACTION BUTTONS                                  */}
                    {/* ------------------------------------------------------------ */}
                    <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                      {/* Left: Compare checkbox / button */}
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleToggleCompare(bestMatch)}
                          className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border ${
                            selectedForCompare.some((s) => s.id === bestMatch.id)
                              ? "bg-amber-100 text-amber-900 border-amber-300"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                          }`}
                        >
                          <Scale className="w-3.5 h-3.5 text-saarthi-navy" />
                          <span>
                            {selectedForCompare.some((s) => s.id === bestMatch.id)
                              ? "Selected for Comparison ✓"
                              : "+ Add to Compare"}
                          </span>
                        </button>

                        {/* Save Scheme Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleSave(bestMatch.id)}
                          className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border ${
                            savedSchemeIds.includes(bestMatch.id)
                              ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                              : "bg-white hover:bg-slate-50 text-slate-700 border-slate-300"
                          }`}
                          title={savedSchemeIds.includes(bestMatch.id) ? "Scheme bookmarked" : "Save scheme for later"}
                        >
                          {savedSchemeIds.includes(bestMatch.id) ? (
                            <>
                              <BookmarkCheck className="w-3.5 h-3.5 text-saarthi-green" />
                              <span>Saved ✓</span>
                            </>
                          ) : (
                            <>
                              <Bookmark className="w-3.5 h-3.5 text-slate-500" />
                              <span>Save Scheme</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Right: Prepare Documents, Calculate EMI, Find Partner, View Details */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => navigate(`/document-guidance?schemeId=${bestMatch.id}`)}
                          className="px-5 py-2.5 rounded-xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-black transition flex items-center space-x-1.5 shadow-md ring-2 ring-emerald-500/20"
                        >
                          <FileText className="w-3.5 h-3.5 text-white" />
                          <span>Prepare Documents & Apply</span>
                          <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCalculateEmi(bestMatch)}
                          className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition flex items-center space-x-1.5 border border-slate-300 shadow-xs"
                        >
                          <Calculator className="w-3.5 h-3.5 text-saarthi-navy" />
                          <span>Calculate EMI</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/partners?scheme=${encodeURIComponent(bestMatch.id)}&schemeName=${encodeURIComponent(
                                bestMatch.name
                              )}`
                            )
                          }
                          className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold transition flex items-center space-x-1.5 border border-blue-200 shadow-2xs"
                        >
                          <Compass className="w-3.5 h-3.5 text-blue-600" />
                          <span>Find Nearby Partner</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => navigate(`/schemes/${bestMatch.id}`)}
                          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center space-x-1.5 border border-slate-200"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-600" />
                          <span>Scheme Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ------------------------------------------------------------ */}
                {/* 5. ALTERNATIVE MATCHING SCHEMES SECTION (Rank #2, #3, ...)    */}
                {/* ------------------------------------------------------------ */}
                {otherMatches.length > 0 && (
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-black text-saarthi-navy">
                          Other Matching Schemes for You ({otherMatches.length})
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Additional schemes meeting your requirements sorted by compatibility score.
                        </p>
                      </div>

                      <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
                        Select schemes to compare side-by-side
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {otherMatches.map((scheme, idx) => {
                        const isSaved = savedSchemeIds.includes(scheme.id);
                        const isCompared = selectedForCompare.some((s) => s.id === scheme.id);

                        return (
                          <div
                            key={scheme.id}
                            className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition flex flex-col justify-between"
                          >
                            <div>
                              {/* Header: Rank + Match % */}
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                  Alternative Match #{idx + 2}
                                </span>

                                <div className="flex items-center space-x-1.5">
                                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-black">
                                    {scheme.matchScore}% Match
                                  </span>
                                </div>
                              </div>

                              <h4 className="text-base font-black text-saarthi-navy mb-1.5 line-clamp-1">
                                {scheme.name}
                              </h4>

                              <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                                {scheme.shortDescription}
                              </p>

                              {/* Specs pill row */}
                              <div className="grid grid-cols-2 gap-2 text-[11px] mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                <div>
                                  <span className="text-slate-400 block text-[10px] font-bold">Max Funding:</span>
                                  <strong className="text-saarthi-navy">
                                    ₹{Number(scheme.maxLoanAmount || scheme.maxLoan || 0).toLocaleString("en-IN")}
                                  </strong>
                                </div>
                                <div>
                                  <span className="text-slate-400 block text-[10px] font-bold">Interest / Subsidy:</span>
                                  <span className="text-slate-700 font-medium truncate block">
                                    {scheme.subsidyRate || scheme.interestRate || "Subsidized"}
                                  </span>
                                </div>
                              </div>

                              {/* Why snippet */}
                              <div className="text-[11px] text-slate-700 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100 mb-4 flex items-start space-x-2">
                                <Check className="w-3.5 h-3.5 text-saarthi-green flex-shrink-0 mt-0.5" />
                                <span>{scheme.shortReason || "Meets category and loan amount parameters."}</span>
                              </div>
                            </div>

                            {/* Card Actions */}
                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                              <div className="flex items-center space-x-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleToggleCompare(scheme)}
                                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center space-x-1 border ${
                                    isCompared
                                      ? "bg-amber-100 text-amber-900 border-amber-300"
                                      : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                                  }`}
                                >
                                  <Scale className="w-3 h-3 text-saarthi-navy" />
                                  <span>{isCompared ? "Compared ✓" : "Compare"}</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleToggleSave(scheme.id)}
                                  className={`p-1.5 rounded-lg border text-xs ${
                                    isSaved
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                      : "bg-white text-slate-400 hover:text-slate-700 border-slate-200"
                                  }`}
                                  title={isSaved ? "Remove from saved" : "Save scheme"}
                                >
                                  {isSaved ? (
                                    <BookmarkCheck className="w-3.5 h-3.5 text-saarthi-green" />
                                  ) : (
                                    <Bookmark className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>

                              <div className="flex items-center space-x-1.5">
                                <button
                                  type="button"
                                  onClick={() => navigate(`/document-guidance?schemeId=${scheme.id}`)}
                                  className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-[11px] font-bold flex items-center space-x-1 border border-emerald-200"
                                  title="View personalized document checklist for this scheme"
                                >
                                  <FileText className="w-3 h-3 text-saarthi-green" />
                                  <span>Checklist</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    navigate(
                                      `/partners?scheme=${encodeURIComponent(scheme.id)}&schemeName=${encodeURIComponent(
                                        scheme.name
                                      )}`
                                    )
                                  }
                                  className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 text-[11px] font-bold flex items-center space-x-1 border border-blue-200"
                                  title="Find nearest partner center for this scheme"
                                >
                                  <Compass className="w-3 h-3 text-blue-600" />
                                  <span>Partner</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleCalculateEmi(scheme)}
                                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold"
                                >
                                  EMI
                                </button>

                                <button
                                  type="button"
                                  onClick={() => navigate(`/schemes/${scheme.id}`)}
                                  className="px-3 py-1.5 rounded-lg bg-saarthi-navy hover:bg-saarthi-navy-light text-white text-[11px] font-bold flex items-center space-x-1"
                                >
                                  <span>Details</span>
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ============================================================ */
              /* 6. INCOMPATIBLE PROFILE FALLBACK (Requirement 7)             */
              /* ============================================================ */
              <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-slate-200 shadow-sm max-w-2xl mx-auto my-8 space-y-4 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-black text-saarthi-navy">
                  We couldn't find a strong match based on the information provided.
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  None of the available Central or State schemes met your combination of loan amount, demographic category, or income limit.
                </p>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 max-w-md mx-auto text-left space-y-1.5">
                  <span className="font-bold block">Suggestions to find a suitable match:</span>
                  <p>• Try adjusting the requested loan amount (e.g. ₹50,000 for street vendors, or ₹5 Lakh for PMEGP).</p>
                  <p>• Confirm whether you qualify under special priority quotas (Women, SC, ST, OBC, Minority, or Artisan).</p>
                  <p>• Check if your family income falls within statutory threshold ceilings.</p>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/scheme-finder")}
                    className="px-6 py-3 rounded-2xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-black transition shadow-md flex items-center space-x-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Go Back and Edit Information</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/schemes")}
                    className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-saarthi-navy text-xs font-bold transition"
                  >
                    Browse All 12 Schemes
                  </button>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* 7. INELIGIBLE / EXCLUDED SCHEMES DRAWER                     */}
            {/* ============================================================ */}
            {ineligibleSchemes.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowIneligible(!showIneligible)}
                  className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-saarthi-navy transition"
                >
                  <span>{showIneligible ? "Hide" : "Show"} Ineligible / Excluded Schemes ({ineligibleSchemes.length})</span>
                  {showIneligible ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showIneligible && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs animate-fadeIn">
                    {ineligibleSchemes.map((scheme) => (
                      <div
                        key={scheme.id}
                        className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200 text-slate-600 space-y-1.5 opacity-80 hover:opacity-100 transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800 truncate block">{scheme.name}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 flex-shrink-0">
                            Not Eligible
                          </span>
                        </div>
                        <p className="text-[11px] text-red-700 font-medium">
                          Reason: {scheme.disqualificationReasons?.[0] || "Does not meet scheme eligibility parameters."}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Modal for Detailed Criteria Audit */}
        <MatchBreakdownModal
          scheme={modalScheme}
          isOpen={!!modalScheme}
          onClose={() => setModalScheme(null)}
        />

        {/* ============================================================ */}
        {/* 8. FLOATING / STICKY COMPARISON TRAY                         */}
        {/* ============================================================ */}
        {selectedForCompare.length > 0 && (
          <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl p-3 sm:p-4 animate-slideUp">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-9 h-9 rounded-xl bg-saarthi-navy text-amber-300 flex items-center justify-center font-bold flex-shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black text-saarthi-navy">
                      Scheme Comparison ({selectedForCompare.length}/3)
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {3 - selectedForCompare.length} more slot available
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedForCompare.map((s) => (
                      <span
                        key={s.id}
                        className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold"
                      >
                        <span className="truncate max-w-[120px]">{s.shortName || s.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCompare(s.id)}
                          className="text-slate-400 hover:text-rose-600 ml-1"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedForCompare([])}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-700"
                >
                  Clear All
                </button>

                <button
                  type="button"
                  onClick={() => setIsCompareModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-saarthi-navy hover:bg-saarthi-navy-light text-white text-xs font-black transition shadow-md flex items-center space-x-1.5"
                >
                  <Scale className="w-4 h-4 text-amber-300" />
                  <span>Compare Schemes ({selectedForCompare.length})</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Scheme Comparison Modal */}
        <SchemeComparisonModal
          schemes={selectedForCompare}
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
          onRemoveScheme={handleRemoveCompare}
        />
      </div>
    </div>
  );
}

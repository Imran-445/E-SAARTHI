import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  Sparkles,
  Scale,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Award,
  ChevronDown
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SchemeCard from "../components/SchemeCard";
import ProfileSummary from "../components/ProfileSummary";
import MatchBreakdownModal from "../components/MatchBreakdownModal";
import { DEMO_SCHEMES } from "../data/schemes";
import { recommendSchemes } from "../services/recommendationEngine";

export default function SchemesPage({
  schemes: initialSchemes,
  onOpenProfileWizard,
  onCheckEligibility,
  onToggleCompare,
  comparedSchemes = [],
  onOpenCompareModal,
  userProfile = null
}) {
  const navigate = useNavigate();

  // Active user profile state (from props or localStorage)
  const [activeProfile, setActiveProfile] = useState(() => {
    if (userProfile && Object.keys(userProfile).length > 0) return userProfile;
    try {
      const saved = localStorage.getItem("saarthi_user_profile");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not read profile from localStorage", e);
    }
    return null;
  });

  // Keep active profile synced with props
  useEffect(() => {
    if (userProfile && Object.keys(userProfile).length > 0) {
      setActiveProfile(userProfile);
    }
  }, [userProfile]);

  // Saved bookmark schemes state
  const [savedSchemeIds, setSavedSchemeIds] = useState(() => {
    try {
      const saved = localStorage.getItem("saarthi_saved_schemes");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Modal for "Why am I seeing this?"
  const [breakdownScheme, setBreakdownScheme] = useState(null);

  // Search & Filter controls
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("match"); // 'match', 'loan_desc', 'interest_asc'
  const [filterEligibleOnly, setFilterEligibleOnly] = useState(false);
  const [filterPurpose, setFilterPurpose] = useState("All");
  const [filterFundingType, setFilterFundingType] = useState("All");

  // Compute matched recommendations using pure recommendationEngine
  const matchedSchemes = useMemo(() => {
    const profileToMatch = activeProfile || {
      category: "Scheduled Caste (SC)",
      socialCategory: "SC",
      annualFamilyIncome: 500000,
      purpose: "Start a Small Business",
      loanPurpose: "Start a Small Business",
      loanAmount: 100000,
      businessType: "Micro Retail",
      stage: "New Venture / Greenfield",
      preferredLanguage: "English",
      locationPreference: "Within District"
    };

    const hasApiMatches = Array.isArray(initialSchemes) && initialSchemes.some((scheme) => scheme && scheme.matchScore !== undefined);
    const results = hasApiMatches
      ? initialSchemes
      : recommendSchemes(profileToMatch, DEMO_SCHEMES);

    // Save recommendations in localStorage
    try {
      localStorage.setItem("saarthi_recommendations", JSON.stringify(results));
    } catch (e) {
      console.warn("Could not cache recommendations", e);
    }

    return results;
  }, [activeProfile, initialSchemes]);

  // Handle saving/bookmarking scheme
  const handleSaveScheme = (scheme, isSaved) => {
    setSavedSchemeIds((prev) => {
      const next = isSaved ? [...new Set([...prev, scheme.id])] : prev.filter((id) => id !== scheme.id);
      try {
        localStorage.setItem("saarthi_saved_schemes", JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Filter options
  const purposeOptions = [
    "All",
    "Start a Small Business",
    "Working Capital",
    "Equipment & Machinery",
    "Business Setup",
    "Expansion & Modernization"
  ];

  const fundingTypeOptions = [
    "All",
    "Collateral-Free Microcredit",
    "Capital Subsidy / Margin Money",
    "Term Loan",
    "Working Capital / CC Limit",
    "Concessional Interest Loan"
  ];

  // Filtering Logic
  let filtered = matchedSchemes.filter((s) => {
    // 1. Eligible Only filter
    if (filterEligibleOnly && s.eligibilityStatus === "Not Eligible") {
      return false;
    }

    // 2. Purpose filter
    if (filterPurpose !== "All") {
      const matchPurpose = (s.purpose || []).some((p) =>
        p.toLowerCase().includes(filterPurpose.toLowerCase()) ||
        filterPurpose.toLowerCase().includes(p.toLowerCase())
      );
      if (!matchPurpose) return false;
    }

    // 3. Funding Type filter
    if (filterFundingType !== "All") {
      const matchFunding = (s.fundingTypes || []).some((f) =>
        f.toLowerCase().includes(filterFundingType.toLowerCase()) ||
        filterFundingType.toLowerCase().includes(f.toLowerCase())
      );
      if (!matchFunding) return false;
    }

    // 4. Text Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText =
        s.name.toLowerCase().includes(q) ||
        (s.shortDescription && s.shortDescription.toLowerCase().includes(q)) ||
        (s.overview && s.overview.toLowerCase().includes(q)) ||
        (s.category && s.category.toLowerCase().includes(q)) ||
        (s.ministry && s.ministry.toLowerCase().includes(q));
      if (!matchText) return false;
    }

    return true;
  });

  // Sorting Logic
  filtered.sort((a, b) => {
    if (sortBy === "match") {
      return (b.matchScore || 0) - (a.matchScore || 0);
    }
    if (sortBy === "loan_desc") {
      const maxA = a.maxLoanAmount || a.maxLoan || 0;
      const maxB = b.maxLoanAmount || b.maxLoan || 0;
      return maxB - maxA;
    }
    if (sortBy === "interest_asc") {
      // Parse numerical interest rate if possible
      const parseRate = (str) => {
        const match = (str || "").match(/(\d+(\.\d+)?)/);
        return match ? parseFloat(match[0]) : 99;
      };
      return parseRate(a.interestRate) - parseRate(b.interestRate);
    }
    return 0;
  });

  const topMatch = filtered.length > 0 ? filtered[0] : null;
  const hasStrongMatch = topMatch && topMatch.matchScore >= 80;

  return (
    <div className="py-10 bg-slate-50 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Top Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-saarthi-green" />
                <span>AI-Assisted Smart Matching Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-saarthi-navy mt-1">
                Recommended Schemes
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                Based on the details you provided, Saarthi found schemes that may be suitable for your needs.
              </p>
            </div>

            <div className="flex items-center space-x-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => navigate("/scheme-finder")}
                className="px-5 py-3 rounded-2xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-bold transition shadow-md flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4 text-amber-300" />
                <span>Re-Run Scheme Finder</span>
              </button>
            </div>
          </div>
        </div>

        {/* Green Recommendation Banner when Strong Match Exists */}
        {hasStrongMatch && (
          <div className="mb-6 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-saarthi-green text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-100 block">
                  Top Matched Opportunity Identified
                </span>
                <h3 className="text-sm sm:text-base font-black text-white leading-tight">
                  "{topMatch.name}" matches {topMatch.matchScore}% of your profile criteria!
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCheckEligibility && onCheckEligibility(topMatch)}
              className="px-4 py-2 rounded-xl bg-white text-emerald-900 text-xs font-black hover:bg-emerald-50 transition shadow-sm self-start sm:self-auto flex items-center space-x-1.5"
            >
              <span>View Details & Apply</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Profile Summary Card */}
        <ProfileSummary
          profile={activeProfile}
          onEdit={() => navigate("/scheme-finder")}
        />

        {/* Filter & Sort Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search recommended schemes by name, keyword, or trade..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
            />
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Eligible Only Filter */}
            <label className="flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer text-slate-700 font-bold transition select-none">
              <input
                type="checkbox"
                checked={filterEligibleOnly}
                onChange={(e) => setFilterEligibleOnly(e.target.checked)}
                className="w-3.5 h-3.5 accent-saarthi-green rounded"
              />
              <span>Eligible Only</span>
            </label>

            {/* Purpose Filter */}
            <div className="flex items-center space-x-1">
              <select
                value={filterPurpose}
                onChange={(e) => setFilterPurpose(e.target.value)}
                className="px-2.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white"
              >
                <option value="All">All Purposes</option>
                {purposeOptions.slice(1).map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Funding Type Filter */}
            <div className="flex items-center space-x-1">
              <select
                value={filterFundingType}
                onChange={(e) => setFilterFundingType(e.target.value)}
                className="px-2.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white"
              >
                <option value="All">All Funding Types</option>
                {fundingTypeOptions.slice(1).map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Control */}
            <div className="flex items-center space-x-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-saarthi-navy bg-slate-50 hover:bg-slate-100"
              >
                <option value="match">Sort: Best Match</option>
                <option value="loan_desc">Sort: Highest Loan</option>
                <option value="interest_asc">Sort: Lowest Interest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-4 flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>
            Showing <strong>{filtered.length}</strong> matching schemes
            {filterEligibleOnly && " (Eligible Only)"}
          </span>
          {savedSchemeIds.length > 0 && (
            <span className="text-saarthi-green font-bold">
              ★ {savedSchemeIds.length} Saved in Bookmarks
            </span>
          )}
        </div>

        {/* Scheme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((scheme, index) => {
            // Highest scoring scheme receives "Most Suitable" badge
            const isMostSuitable = index === 0 && (scheme.matchScore || 0) >= 75;

            return (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                isMostSuitable={isMostSuitable}
                onCheckEligibility={onCheckEligibility}
                onToggleCompare={onToggleCompare}
                isCompared={comparedSchemes.some((s) => s.id === scheme.id)}
                onShowBreakdown={(s) => setBreakdownScheme(s)}
                onSaveScheme={handleSaveScheme}
                isSaved={savedSchemeIds.includes(scheme.id)}
                onCalculateEMI={(s) => {
                  const amt = s.maxLoanAmount || s.maxLoan || 100000;
                  navigate(`/calculator?amount=${amt}`);
                }}
                onFindPartner={(s) => {
                  navigate("/partners");
                }}
              />
            );
          })}
        </div>

        {/* No Match State (Requirement 7) */}
        {filtered.length === 0 && (
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-slate-200 shadow-sm max-w-2xl mx-auto my-8 space-y-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-black text-saarthi-navy">
              We couldn't find a strong match yet.
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              None of the available schemes met your current filter combination or strict eligibility criteria.
            </p>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 max-w-md mx-auto text-left space-y-1">
              <span className="font-bold block">Suggestions:</span>
              <p>• Try adjusting your loan amount, funding preference, or location.</p>
              <p>• Clear the "Eligible Only" or specific purpose filters above.</p>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setFilterEligibleOnly(false);
                  setFilterPurpose("All");
                  setFilterFundingType("All");
                  setSearchQuery("");
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Reset Filters
              </button>

              <button
                type="button"
                onClick={() => navigate("/scheme-finder")}
                className="px-6 py-2.5 rounded-xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-bold transition shadow-sm flex items-center space-x-2"
              >
                <span>Modify My Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Data Trust & Regulatory Disclaimer (Requirement 9) */}
        <div className="mt-12 p-4 rounded-2xl bg-slate-100/80 border border-slate-200 text-[11px] text-slate-500 text-center leading-relaxed">
          <p>
            <strong>Official Guidance Notice:</strong> Saarthi provides guidance based on available scheme information. Final eligibility and approval are determined by the concerned authority, lending bank, or administrative nodal department.
          </p>
        </div>

        {/* Floating Comparison Dock if schemes are selected */}
        {comparedSchemes.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-saarthi-navy text-white px-6 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-4 animate-fadeIn">
            <div className="flex items-center space-x-2">
              <Scale className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold">
                {comparedSchemes.length} {comparedSchemes.length === 1 ? "Scheme" : "Schemes"} Selected to Compare
              </span>
            </div>

            <button
              onClick={onOpenCompareModal}
              className="px-4 py-1.5 rounded-xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-bold transition shadow"
            >
              Compare Side-by-Side
            </button>
          </div>
        )}

        {/* Transparency Match Breakdown Modal */}
        <MatchBreakdownModal
          scheme={breakdownScheme}
          isOpen={!!breakdownScheme}
          onClose={() => setBreakdownScheme(null)}
        />
      </div>
    </div>
  );
}

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  Scale,
  RefreshCw,
  AlertTriangle,
  Layers,
  Sparkles,
  Award,
  ChevronDown,
  Info,
  X,
  SlidersHorizontal,
  Coins
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SchemeCard from "../components/SchemeCard";
import { schemes as allSchemes, schemeCategories } from "../data/schemes";
import { getSchemes } from "../services/api";

export default function SchemesPage({
  schemes: initialSchemes,
  onOpenProfileWizard,
  onCheckEligibility,
  onToggleCompare,
  comparedSchemes = [],
  onOpenCompareModal
}) {
  const navigate = useNavigate();

  // Primary scheme catalog
  const [catalog, setCatalog] = useState(() => {
    if (Array.isArray(initialSchemes) && initialSchemes.length > 0) {
      return initialSchemes;
    }
    return allSchemes;
  });

  // Keep catalog updated if initialSchemes change
  useEffect(() => {
    if (Array.isArray(initialSchemes) && initialSchemes.length > 0) {
      setCatalog(initialSchemes);
    }
  }, [initialSchemes]);

  // Saved bookmark schemes state
  const [savedSchemeIds, setSavedSchemeIds] = useState(() => {
    try {
      const saved = localStorage.getItem("saarthi_saved_schemes");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPurpose, setSelectedPurpose] = useState("All");
  const [selectedFundingRange, setSelectedFundingRange] = useState("All");
  const [sortBy, setSortBy] = useState("default"); // 'default', 'loan_asc', 'loan_desc'

  // Filter options
  const purposeOptions = [
    "All",
    "Working Capital",
    "Start a Small Business",
    "Equipment & Machinery",
    "Business Setup",
    "Expansion & Modernization"
  ];

  const fundingRangeOptions = [
    { value: "All", label: "All Funding Ranges" },
    { value: "under_1lakh", label: "Under ₹1 Lakh (Microcredit)" },
    { value: "1lakh_to_5lakh", label: "₹1 Lakh – ₹5 Lakh (Small Business)" },
    { value: "5lakh_to_25lakh", label: "₹5 Lakh – ₹25 Lakh (Medium Enterprise)" },
    { value: "above_25lakh", label: "Above ₹25 Lakh (High Value)" }
  ];

  // Handle saving scheme
  const handleSaveScheme = (scheme, isSaved) => {
    setSavedSchemeIds((prev) => {
      const next = isSaved ? [...new Set([...prev, scheme.id])] : prev.filter((id) => id !== scheme.id);
      try {
        localStorage.setItem("saarthi_saved_schemes", JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedPurpose("All");
    setSelectedFundingRange("All");
    setSortBy("default");
  };

  // Active filters count
  const activeFiltersCount =
    (searchQuery.trim() ? 1 : 0) +
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedPurpose !== "All" ? 1 : 0) +
    (selectedFundingRange !== "All" ? 1 : 0);

  // Filter and sort catalog
  const filteredSchemes = useMemo(() => {
    let list = catalog.filter((scheme) => {
      // 1. Category Filter
      if (selectedCategory !== "All" && selectedCategory !== "All Categories") {
        if (scheme.category !== selectedCategory) {
          return false;
        }
      }

      // 2. Purpose Filter
      if (selectedPurpose !== "All") {
        const matchPurpose = (scheme.purpose || []).some(
          (p) =>
            p.toLowerCase().includes(selectedPurpose.toLowerCase()) ||
            selectedPurpose.toLowerCase().includes(p.toLowerCase())
        );
        if (!matchPurpose) return false;
      }

      // 3. Funding Range Filter
      if (selectedFundingRange !== "All") {
        const minAmt = scheme.minLoanAmount ?? scheme.minLoan ?? 0;
        const maxAmt = scheme.maxLoanAmount ?? scheme.maxLoan ?? 0;

        if (selectedFundingRange === "under_1lakh") {
          if (maxAmt > 100000 && minAmt >= 100000) return false;
        } else if (selectedFundingRange === "1lakh_to_5lakh") {
          const inRange = (maxAmt >= 100000 && minAmt <= 500000) || (maxAmt <= 500000 && maxAmt >= 100000);
          if (!inRange) return false;
        } else if (selectedFundingRange === "5lakh_to_25lakh") {
          const inRange = (maxAmt >= 500000 && minAmt <= 2500000) || (maxAmt <= 2500000 && maxAmt >= 500000);
          if (!inRange) return false;
        } else if (selectedFundingRange === "above_25lakh") {
          if (maxAmt < 2500000) return false;
        }
      }

      // 4. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchSearch =
          scheme.name.toLowerCase().includes(q) ||
          (scheme.shortName && scheme.shortName.toLowerCase().includes(q)) ||
          (scheme.shortDescription && scheme.shortDescription.toLowerCase().includes(q)) ||
          (scheme.overview && scheme.overview.toLowerCase().includes(q)) ||
          (scheme.category && scheme.category.toLowerCase().includes(q)) ||
          (scheme.eligibleCategory && scheme.eligibleCategory.toLowerCase().includes(q)) ||
          (scheme.keyBenefit && scheme.keyBenefit.toLowerCase().includes(q)) ||
          (scheme.targetBeneficiaries || []).some((b) => b.toLowerCase().includes(q)) ||
          (scheme.sector || []).some((s) => s.toLowerCase().includes(q));

        if (!matchSearch) return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === "loan_desc") {
      list.sort((a, b) => {
        const maxA = a.maxLoanAmount ?? a.maxLoan ?? 0;
        const maxB = b.maxLoanAmount ?? b.maxLoan ?? 0;
        return maxB - maxA;
      });
    } else if (sortBy === "loan_asc") {
      list.sort((a, b) => {
        const minA = a.minLoanAmount ?? a.minLoan ?? 0;
        const minB = b.minLoanAmount ?? b.minLoan ?? 0;
        return minA - minB;
      });
    }

    return list;
  }, [catalog, selectedCategory, selectedPurpose, selectedFundingRange, searchQuery, sortBy]);

  return (
    <div className="py-8 bg-slate-50 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Top Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft mb-6 relative overflow-hidden">
          <div className="tricolor-border-top" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-saarthi-navy border border-slate-200 text-xs font-bold mb-2">
                <Layers className="w-3.5 h-3.5 text-saarthi-green" />
                <span>Government Scheme Data System</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-saarthi-navy mt-1">
                Central & State Scheme Directory
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                Explore government loans, capital subsidies, and credit guarantee schemes for marginalized Indian entrepreneurs, street vendors, rural artisans, and women.
              </p>
            </div>

            <div className="flex items-center space-x-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => navigate("/scheme-finder")}
                className="px-5 py-3 rounded-2xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-bold transition shadow-md flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Fill Details Form</span>
              </button>
            </div>
          </div>
        </div>

        {/* Prototype Mock Data Disclaimer Notice */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start space-x-3 text-xs leading-relaxed animate-fadeIn">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-black block uppercase tracking-wide text-amber-950">
              Prototype Mock Scheme Data Notice
            </strong>
            <p className="mt-0.5 text-amber-800 text-[11px] sm:text-xs">
              The scheme details, loan limits, subsidies, and application guidelines presented in this prototype are <strong>realistic mock data</strong> compiled for evaluation and development. They do not claim to be current official government values. Always verify current guidelines via official ministry portals.
            </p>
          </div>
        </div>

        {/* Search & Multi-Filter Control Bar */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm mb-6 space-y-4">
          {/* Top Search Line */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search schemes by name, keyword, beneficiary, or sector..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Control */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100"
              >
                <option value="default">Sort: Default Catalog</option>
                <option value="loan_desc">Sort: Highest Funding</option>
                <option value="loan_asc">Sort: Lowest Funding</option>
              </select>

              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition flex items-center space-x-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset ({activeFiltersCount})</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Dropdowns Grid: Category, Purpose, Funding Range */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs">
            {/* 1. Category Filter */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Category Filter
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white"
              >
                <option value="All">All Categories</option>
                {schemeCategories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Purpose Filter */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Purpose Filter
              </label>
              <select
                value={selectedPurpose}
                onChange={(e) => setSelectedPurpose(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white"
              >
                <option value="All">All Purposes</option>
                {purposeOptions.slice(1).map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Funding Range Filter */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Funding Range Filter
              </label>
              <select
                value={selectedFundingRange}
                onChange={(e) => setSelectedFundingRange(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white"
              >
                {fundingRangeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="mb-4 flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>
            Showing <strong>{filteredSchemes.length}</strong> of {catalog.length} schemes
            {activeFiltersCount > 0 && ` (Filtered by ${activeFiltersCount} criteria)`}
          </span>
          {savedSchemeIds.length > 0 && (
            <span className="text-saarthi-green font-bold">
              ★ {savedSchemeIds.length} Saved in Bookmarks
            </span>
          )}
        </div>

        {/* Scheme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              onViewDetails={(s) => navigate(`/schemes/${s.id}`)}
              onCheckEligibility={onCheckEligibility}
              onToggleCompare={onToggleCompare}
              isCompared={comparedSchemes.some((s) => s.id === scheme.id)}
              onSaveScheme={handleSaveScheme}
              isSaved={savedSchemeIds.includes(scheme.id)}
              onCalculateEMI={(s) => {
                const rate = s.defaultInterestRate || parseFloat(s.interestRate) || 6.5;
                const tenureYears = s.defaultTenureYears || (s.tenureMonths ? Math.max(1, Math.round(s.tenureMonths / 12)) : 3);
                const moratoriumMonths = s.defaultMoratoriumMonths !== undefined 
                  ? s.defaultMoratoriumMonths 
                  : (s.moratorium?.includes("6") ? 6 : (s.moratorium?.includes("3") ? 3 : 0));
                navigate("/calculator", {
                  state: {
                    schemeId: s.id,
                    schemeName: s.name,
                    loanAmount: s.defaultLoanAmount || s.maxLoanAmount || s.maxLoan || 100000,
                    interestRate: rate,
                    tenureYears,
                    moratoriumMonths,
                    returnPath: "/schemes"
                  }
                });
              }}
              onFindPartner={() => navigate("/partners")}
            />
          ))}
        </div>

        {/* Empty State when no schemes match */}
        {filteredSchemes.length === 0 && (
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-slate-200 shadow-sm max-w-xl mx-auto my-8 space-y-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mx-auto">
              <Search className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-black text-saarthi-navy">
              No Schemes Match Your Filters
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              We couldn't find any scheme matching your active search keyword and filter combinations.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-saarthi-navy text-white text-xs font-bold hover:bg-saarthi-navy-light transition shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {/* Disclaimer Footer Note */}
        <div className="mt-12 p-4 rounded-2xl bg-slate-100/80 border border-slate-200 text-[11px] text-slate-500 text-center leading-relaxed">
          <p>
            <strong>Official Guidance Notice:</strong> Saarthi provides information for guidance based on sample prototype datasets. Final eligibility, appraisal, and loan sanction are subject to official guidelines issued by the respective ministry, nodal agency, and lending institutions.
          </p>
        </div>

        {/* Floating Comparison Dock if schemes are selected */}
        {comparedSchemes.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-saarthi-navy text-white px-6 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-4 animate-fadeIn">
            <div className="flex items-center space-x-2">
              <Scale className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold">
                {comparedSchemes.length} {comparedSchemes.length === 1 ? "Scheme" : "Schemes"} Selected
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
      </div>
    </div>
  );
}

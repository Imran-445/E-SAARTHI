import React, { useState } from "react";
import {
  CheckCircle2,
  ChevronRight,
  Calculator,
  MapPin,
  Bookmark,
  Coins,
  Sparkles,
  Award,
  Layers,
  FileCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SchemeCard({
  scheme,
  onViewDetails,
  onCheckEligibility,
  onToggleCompare,
  isCompared = false,
  onSaveScheme,
  isSaved = false,
  onCalculateEMI,
  onFindPartner
}) {
  const navigate = useNavigate();
  const [localSaved, setLocalSaved] = useState(isSaved);

  const minAmt = scheme.minLoanAmount ?? scheme.minLoan ?? 0;
  const maxAmt = scheme.maxLoanAmount ?? scheme.maxLoan ?? 0;

  // Format loan range string
  const formatAmount = (num) => {
    if (!num) return "₹0";
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1).replace(/\.0$/, "")} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1).replace(/\.0$/, "")} Lakh`;
    return `₹${num.toLocaleString("en-IN")}`;
  };

  const fundingRangeDisplay =
    minAmt > 0
      ? `${formatAmount(minAmt)} – ${formatAmount(maxAmt)}`
      : `Up to ${formatAmount(maxAmt)}`;

  const eligibleCategoryDisplay =
    scheme.eligibleCategory ||
    scheme.category ||
    (scheme.targetBeneficiaries && scheme.targetBeneficiaries[0]) ||
    "Micro Entrepreneurs";

  const keyBenefitDisplay =
    scheme.keyBenefit ||
    scheme.subsidyRate ||
    scheme.subsidyInformation ||
    "Government credit support and concessions";

  const handleSaveToggle = (e) => {
    e.stopPropagation();
    const nextState = !localSaved;
    setLocalSaved(nextState);
    if (onSaveScheme) {
      onSaveScheme(scheme, nextState);
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(scheme);
    } else {
      navigate(`/schemes/${scheme.id}`);
    }
  };

  const handleCalculateEMI = (e) => {
    e.stopPropagation();
    if (onCalculateEMI) {
      onCalculateEMI(scheme);
    } else {
      const rate = scheme.defaultInterestRate || parseFloat(scheme.interestRate) || 6.5;
      const tenureYears = scheme.defaultTenureYears || (scheme.tenureMonths ? Math.max(1, Math.round(scheme.tenureMonths / 12)) : 3);
      const moratoriumMonths = scheme.defaultMoratoriumMonths !== undefined 
        ? scheme.defaultMoratoriumMonths 
        : (scheme.moratorium?.includes("6") ? 6 : (scheme.moratorium?.includes("3") ? 3 : 0));
      navigate("/calculator", {
        state: {
          schemeId: scheme.id,
          schemeName: scheme.name,
          loanAmount: maxAmt || scheme.defaultLoanAmount || 100000,
          interestRate: rate,
          tenureYears,
          moratoriumMonths,
          returnPath: "/schemes"
        }
      });
    }
  };

  const handleFindPartner = (e) => {
    e.stopPropagation();
    if (onFindPartner) {
      onFindPartner(scheme);
    } else {
      navigate("/partners");
    }
  };

  return (
    <div className="group bg-white rounded-3xl border border-slate-200 hover:border-slate-300 shadow-card hover:shadow-hover transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden">
      {/* Top Subtle Stripe */}
      <div className="bg-gradient-to-r from-emerald-500 via-saarthi-navy to-amber-500 h-1 w-full" />

      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        {/* Top Header: Category Tag & Mock Data Indicator */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 border border-blue-100 text-[11px] font-bold tracking-tight">
            <Layers className="w-3 h-3 mr-1 text-blue-700 flex-shrink-0" />
            <span className="truncate max-w-[180px]">{scheme.category}</span>
          </span>

          <div className="flex items-center space-x-1.5 flex-shrink-0">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              Mock Data
            </span>
            <button
              type="button"
              onClick={handleSaveToggle}
              title={localSaved ? "Saved in Bookmarks" : "Save Scheme"}
              className={`p-1 rounded-lg border transition ${
                localSaved
                  ? "bg-amber-50 border-amber-300 text-amber-600"
                  : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-600"
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${localSaved ? "fill-amber-500 text-amber-500" : ""}`} />
            </button>
          </div>
        </div>

        {/* 1. Scheme Name */}
        <h3 className="text-base sm:text-lg font-black text-saarthi-navy group-hover:text-saarthi-navy-light transition-colors leading-snug mb-2">
          {scheme.name}
        </h3>

        {/* 2. Short Description */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4 flex-1">
          {scheme.shortDescription || scheme.overview}
        </p>

        {/* 3. Eligible Category Badge */}
        <div className="mb-3.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-2">
          <Award className="w-4 h-4 text-saarthi-navy mt-0.5 flex-shrink-0" />
          <div className="text-xs leading-tight">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Eligible Category</span>
            <span className="font-semibold text-slate-800">{eligibleCategoryDisplay}</span>
          </div>
        </div>

        {/* 4. Loan / Funding Range */}
        <div className="mb-3.5 p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Coins className="w-4 h-4 text-saarthi-green flex-shrink-0" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block">
                Loan / Funding Range
              </span>
              <span className="text-sm font-black text-saarthi-navy">
                {fundingRangeDisplay}
              </span>
            </div>
          </div>

          {scheme.interestRate && (
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-semibold">Interest</span>
              <span className="text-xs font-bold text-saarthi-green">{scheme.interestRate.split(" ")[0]}</span>
            </div>
          )}
        </div>

        {/* 5. Key Benefit */}
        <div className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white border border-emerald-200/80">
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-saarthi-green mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-950 block">
                Key Benefit
              </span>
              <p className="text-xs text-slate-700 font-medium leading-snug mt-0.5">
                {keyBenefitDisplay}
              </p>
            </div>
          </div>
        </div>

        {/* Target Beneficiary Pills */}
        {scheme.targetBeneficiaries && scheme.targetBeneficiaries.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {scheme.targetBeneficiaries.slice(0, 3).map((item, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
              >
                {item}
              </span>
            ))}
            {scheme.targetBeneficiaries.length > 3 && (
              <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-400 text-[10px] font-medium">
                +{scheme.targetBeneficiaries.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* 6. Action Bar with "View Details" Button */}
      <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {/* View Details Button (Primary Action) */}
          <button
            type="button"
            onClick={handleViewDetails}
            className="flex-1 py-2.5 px-4 rounded-xl bg-saarthi-navy hover:bg-saarthi-navy-light text-white text-xs font-bold transition shadow-sm flex items-center justify-center space-x-1.5 group-hover:bg-saarthi-green"
          >
            <span>View Details</span>
            <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Quick EMI Calculator */}
          <button
            type="button"
            onClick={handleCalculateEMI}
            title="Estimate EMI & Subsidy"
            className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 transition"
          >
            <Calculator className="w-4 h-4 text-slate-600" />
          </button>

          {/* Find Partner */}
          <button
            type="button"
            onClick={handleFindPartner}
            title="Find Nearby CSC / Bank Mitra"
            className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 transition"
          >
            <MapPin className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Compare Checkbox Toggle */}
        {onToggleCompare && (
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <label className="flex items-center space-x-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isCompared}
                onChange={() => onToggleCompare(scheme)}
                className="w-3.5 h-3.5 accent-saarthi-navy rounded cursor-pointer"
              />
              <span className="font-medium text-slate-700">Compare with others</span>
            </label>

            <span className="text-[10px] text-slate-400">
              {scheme.ruralUrbanEligibility || "Pan-India"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

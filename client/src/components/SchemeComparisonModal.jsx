import React from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Scale,
  Check,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Calculator,
  FileText,
  AlertCircle,
  Sparkles,
  Info
} from "lucide-react";

export default function SchemeComparisonModal({
  schemes = [],
  isOpen,
  onClose,
  onRemoveScheme
}) {
  const navigate = useNavigate();

  if (!isOpen || !schemes || schemes.length === 0) return null;

  const handleCalculateEmi = (scheme) => {
    onClose();
    let subsidyModel = "none";
    if (scheme.id === "pmegp") subsidyModel = "pmegp_rural";
    else if (scheme.id === "pm-svanidhi") subsidyModel = "svanidhi";
    else if (scheme.id === "pm-vishwakarma") subsidyModel = "vishwakarma";

    const rate = scheme.defaultInterestRate || parseFloat(scheme.interestRate) || 6.5;
    const tenureYears = scheme.defaultTenureYears || (scheme.tenureMonths ? Math.max(1, Math.round(scheme.tenureMonths / 12)) : 3);
    const moratoriumMonths = scheme.defaultMoratoriumMonths !== undefined 
      ? scheme.defaultMoratoriumMonths 
      : (scheme.moratorium?.includes("6") ? 6 : (scheme.moratorium?.includes("3") ? 3 : 0));

    navigate("/calculator", {
      state: {
        schemeId: scheme.id,
        schemeName: scheme.name,
        loanAmount: scheme.defaultLoanAmount || scheme.maxLoanAmount || scheme.maxLoan || 100000,
        interestRate: rate,
        tenureYears,
        tenureMonths: tenureYears * 12,
        moratoriumMonths,
        subsidyScheme: subsidyModel,
        returnPath: "/schemes"
      }
    });
  };

  const handleViewDetails = (schemeId) => {
    onClose();
    navigate(`/schemes/${schemeId}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative bg-white rounded-3xl max-w-6xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn flex flex-col max-h-[92vh]">
        {/* Top tricolor border */}
        <div className="tricolor-border-top" />

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 flex-shrink-0">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-saarthi-navy flex items-center justify-center text-white shadow-sm">
              <Scale className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-black text-saarthi-navy">
                  Scheme Comparison Matrix
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                  {schemes.length} of 3 Selected
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Side-by-side evaluation across eligibility, funding limits, interest, subsidies, moratoria, and documents
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition"
            aria-label="Close comparison"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Comparison Body - Scrollable Table */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-left">
          {/* Top Schemes Header Row */}
          <div className="grid grid-cols-12 gap-3 mb-6 pb-4 border-b border-slate-200">
            <div className="col-span-12 sm:col-span-3 flex flex-col justify-end">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Comparing Parameters
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Evaluate which government scheme best fits your financial horizon.
              </p>
            </div>

            <div className="col-span-12 sm:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {schemes.map((s, idx) => (
                <div
                  key={s.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-saarthi-green">
                        Option #{idx + 1}
                      </span>
                      {onRemoveScheme && (
                        <button
                          type="button"
                          onClick={() => onRemoveScheme(s.id)}
                          className="text-slate-400 hover:text-rose-600 text-xs p-0.5"
                          title="Remove from comparison"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <h3 className="text-xs sm:text-sm font-black text-saarthi-navy line-clamp-2">
                      {s.shortName || s.name}
                    </h3>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                      {s.ministry || s.category}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between gap-1">
                    <button
                      type="button"
                      onClick={() => handleViewDetails(s.id)}
                      className="text-[11px] font-bold text-saarthi-navy hover:text-saarthi-green underline"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCalculateEmi(s)}
                      className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-[10px] font-bold flex items-center space-x-1"
                    >
                      <Calculator className="w-3 h-3 text-saarthi-green" />
                      <span>EMI</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6 Key Parameter Groups */}
          <div className="space-y-4">
            {/* 1. ELIGIBILITY */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-4 py-2.5 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-saarthi-navy" />
                <h4 className="text-xs font-black uppercase tracking-wider text-saarthi-navy">
                  1. Eligibility & Target Demographics
                </h4>
              </div>

              <div className="grid grid-cols-12 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-white p-3 text-xs">
                <div className="col-span-12 sm:col-span-3 p-2 font-bold text-slate-700 bg-slate-50/50 rounded-xl">
                  <span>Target Beneficiaries & Category</span>
                </div>
                <div className="col-span-12 sm:col-span-9 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  {schemes.map((s) => (
                    <div key={s.id} className="p-2.5 space-y-1.5">
                      <span className="font-bold text-slate-800 text-[11px] block">
                        {s.eligibleCategory || s.category}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {(s.targetDemographic || s.targetBeneficiaries || []).slice(0, 4).map((d, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Income Eligibility Sub-row */}
              <div className="grid grid-cols-12 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-white p-3 text-xs border-t border-slate-100">
                <div className="col-span-12 sm:col-span-3 p-2 font-bold text-slate-700 bg-slate-50/50 rounded-xl">
                  <span>Income Ceiling & Criteria</span>
                </div>
                <div className="col-span-12 sm:col-span-9 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  {schemes.map((s) => (
                    <div key={s.id} className="p-2.5 text-[11px] text-slate-600 leading-snug">
                      {s.incomeEligibility || "No statutory household income ceiling"}
                    </div>
                  ))}
                </div>
              </div>

              {/* Geographic Scope Sub-row */}
              <div className="grid grid-cols-12 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-white p-3 text-xs border-t border-slate-100">
                <div className="col-span-12 sm:col-span-3 p-2 font-bold text-slate-700 bg-slate-50/50 rounded-xl">
                  <span>Geographic Scope</span>
                </div>
                <div className="col-span-12 sm:col-span-9 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  {schemes.map((s) => (
                    <div key={s.id} className="p-2.5 text-[11px]">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px]">
                        {s.ruralUrbanEligibility || "Rural & Urban"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. LOAN AMOUNT */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-4 py-2.5 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-saarthi-green" />
                <h4 className="text-xs font-black uppercase tracking-wider text-saarthi-navy">
                  2. Loan Envelope & Financing Limits
                </h4>
              </div>

              <div className="grid grid-cols-12 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-white p-3 text-xs">
                <div className="col-span-12 sm:col-span-3 p-2 font-bold text-slate-700 bg-slate-50/50 rounded-xl">
                  <span>Funding Range (Min - Max)</span>
                </div>
                <div className="col-span-12 sm:col-span-9 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  {schemes.map((s) => (
                    <div key={s.id} className="p-2.5">
                      <div className="text-sm font-black text-saarthi-navy">
                        ₹{Number(s.minLoanAmount || s.minLoan || 0).toLocaleString("en-IN")} – ₹{Number(s.maxLoanAmount || s.maxLoan || 0).toLocaleString("en-IN")}
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        Max Project Ceiling: ₹{Number(s.maxLoanAmount || s.maxLoan || 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Collateral Requirement Sub-row */}
              <div className="grid grid-cols-12 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-white p-3 text-xs border-t border-slate-100">
                <div className="col-span-12 sm:col-span-3 p-2 font-bold text-slate-700 bg-slate-50/50 rounded-xl">
                  <span>Collateral Security</span>
                </div>
                <div className="col-span-12 sm:col-span-9 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  {schemes.map((s) => (
                    <div key={s.id} className="p-2.5">
                      {s.collateralRequired ? (
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                          Collateral Required
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold inline-flex items-center space-x-1">
                          <Check className="w-3 h-3" />
                          <span>100% Collateral-Free</span>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. INTEREST RATE */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-4 py-2.5 flex items-center space-x-2">
                <span className="text-saarthi-navy font-black text-xs">%</span>
                <h4 className="text-xs font-black uppercase tracking-wider text-saarthi-navy">
                  3. Interest Rate & Concessions
                </h4>
              </div>

              <div className="grid grid-cols-12 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-white p-3 text-xs">
                <div className="col-span-12 sm:col-span-3 p-2 font-bold text-slate-700 bg-slate-50/50 rounded-xl">
                  <span>Applicable Interest Structure</span>
                </div>
                <div className="col-span-12 sm:col-span-9 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  {schemes.map((s) => (
                    <div key={s.id} className="p-2.5">
                      <div className="font-black text-slate-900 text-xs">
                        {s.interestRate || "Concessional Bank MSME Rate"}
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        Backed by statutory interest subvention / rebate
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. SUBSIDY / BENEFIT */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-4 py-2.5 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs font-black uppercase tracking-wider text-saarthi-navy">
                  4. Subsidy & Key Financial Benefits
                </h4>
              </div>

              <div className="grid grid-cols-12 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-white p-3 text-xs">
                <div className="col-span-12 sm:col-span-3 p-2 font-bold text-slate-700 bg-slate-50/50 rounded-xl">
                  <span>Subsidy Rate / Grant</span>
                </div>
                <div className="col-span-12 sm:col-span-9 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  {schemes.map((s) => (
                    <div key={s.id} className="p-2.5">
                      <div className="font-black text-saarthi-green text-xs">
                        {s.subsidyRate || s.subsidyInformation || "Not Applicable"}
                      </div>
                      <p className="text-[10px] text-slate-600 mt-1 line-clamp-2">
                        {s.keyBenefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. REPAYMENT & MORATORIUM INFORMATION */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-4 py-2.5 flex items-center space-x-2">
                <Info className="w-4 h-4 text-blue-600" />
                <h4 className="text-xs font-black uppercase tracking-wider text-saarthi-navy">
                  5. Repayment & Moratorium Information
                </h4>
              </div>

              <div className="grid grid-cols-12 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-white p-3 text-xs">
                <div className="col-span-12 sm:col-span-3 p-2 font-bold text-slate-700 bg-slate-50/50 rounded-xl">
                  <span>Tenure & Repayment Term</span>
                </div>
                <div className="col-span-12 sm:col-span-9 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  {schemes.map((s) => (
                    <div key={s.id} className="p-2.5">
                      <div className="font-bold text-slate-800 text-xs">
                        {s.repaymentPeriod || `${s.tenureMonths || 36} Months`}
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        Equated Monthly Installments (EMI)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Moratorium Sub-row */}
              <div className="grid grid-cols-12 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-white p-3 text-xs border-t border-slate-100">
                <div className="col-span-12 sm:col-span-3 p-2 font-bold text-slate-700 bg-slate-50/50 rounded-xl">
                  <span>Moratorium Grace Period</span>
                </div>
                <div className="col-span-12 sm:col-span-9 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  {schemes.map((s) => (
                    <div key={s.id} className="p-2.5">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-bold text-[10px]">
                        {s.moratorium || "Nil / Immediate Repayment"}
                      </span>
                      <p className="text-[10px] text-slate-500 mt-1">
                        {s.moratorium && s.moratorium !== "Nil"
                          ? "Principal holiday during business establishment phase"
                          : "Standard EMI schedule starts in month 1"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 6. REQUIRED DOCUMENTS */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-4 py-2.5 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-saarthi-navy" />
                <h4 className="text-xs font-black uppercase tracking-wider text-saarthi-navy">
                  6. Required Verification Documents
                </h4>
              </div>

              <div className="grid grid-cols-12 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-white p-3 text-xs">
                <div className="col-span-12 sm:col-span-3 p-2 font-bold text-slate-700 bg-slate-50/50 rounded-xl">
                  <span>Mandatory Checklist</span>
                </div>
                <div className="col-span-12 sm:col-span-9 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  {schemes.map((s) => {
                    const docs = s.requiredDocuments || s.documentsRequired || [];
                    return (
                      <div key={s.id} className="p-2.5 space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          {docs.length} Documents Required
                        </span>
                        <ul className="space-y-1">
                          {docs.map((d, i) => (
                            <li key={i} className="flex items-start space-x-1.5 text-[11px] text-slate-700">
                              <span className="text-saarthi-green font-bold flex-shrink-0">•</span>
                              <span className="line-clamp-2">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="text-[11px] text-slate-500">
            * Comparison parameters reflect official scheme guidelines from the Saarthi Central Data System.
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-saarthi-navy text-white text-xs font-bold hover:bg-saarthi-navy-light transition shadow-sm"
            >
              Close Comparison
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

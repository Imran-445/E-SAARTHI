import React from "react";
import { X, CheckCircle2, AlertTriangle, Info, ShieldCheck, Sparkles } from "lucide-react";

export default function MatchBreakdownModal({ scheme, isOpen, onClose }) {
  if (!isOpen || !scheme) return null;

  const breakdown = scheme.breakdown || {
    category: { score: 20, max: 20, status: "✓", label: "Social Category Match" },
    income: { score: 15, max: 15, status: "✓", label: "Income Eligibility" },
    businessType: { score: 15, max: 15, status: "✓", label: "Business Type Match" },
    stage: { score: 10, max: 10, status: "✓", label: "Business Stage Match" },
    sector: { score: 10, max: 10, status: "✓", label: "Sector Match" },
    loanAmount: { score: 15, max: 15, status: "✓", label: "Loan Amount Compatibility" },
    purpose: { score: 10, max: 10, status: "✓", label: "Loan Purpose Match" },
    fundingType: { score: 5, max: 5, status: "✓", label: "Funding Type Match" },
    total: scheme.matchScore || 90
  };

  const criteriaKeys = [
    "category",
    "income",
    "businessType",
    "stage",
    "sector",
    "loanAmount",
    "purpose",
    "fundingType"
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn text-left">
        {/* Tricolor top border motif */}
        <div className="tricolor-border-top" />

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between bg-slate-50">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-saarthi-green">
                Transparent Recommendation Audit
              </span>
            </div>
            <h3 className="text-base font-black text-saarthi-navy mt-0.5">
              Why Am I Seeing This Scheme?
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {scheme.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Total Score Display */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                Total Compatibility Score
              </span>
              <span className="text-2xl font-black text-saarthi-green">
                {breakdown.total} / 100
              </span>
            </div>
            <div className="text-right">
              <span className={`px-2.5 py-1 rounded-full text-xs font-black border ${
                breakdown.total >= 80
                  ? "bg-emerald-200/80 text-emerald-900 border-emerald-300"
                  : "bg-blue-100 text-blue-800 border-blue-200"
              }`}>
                {scheme.eligibilityStatus || "Eligible"}
              </span>
            </div>
          </div>

          {/* 8-Criteria Breakdown Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-2.5">
              Matching Criteria Breakdown
            </h4>
            <div className="space-y-2 text-xs">
              {criteriaKeys.map((k) => {
                const item = breakdown[k];
                if (!item) return null;
                const isFull = item.score === item.max;
                return (
                  <div
                    key={k}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-white transition"
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                        isFull ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {item.status || (isFull ? "✓" : "!")}
                      </span>
                      <span className="font-semibold text-slate-700">{item.label}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-800">
                      {item.score} / {item.max}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Matched Criteria List */}
          {scheme.matchedCriteria && scheme.matchedCriteria.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-2">
                Eligible Factors Verified
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {scheme.matchedCriteria.map((c, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-saarthi-green flex-shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings & Items to Verify */}
          {scheme.warnings && scheme.warnings.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="flex items-center space-x-2 mb-1.5 text-amber-900 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Items Requiring Verification</span>
              </div>
              <ul className="space-y-1 text-[11px] text-amber-800">
                {scheme.warnings.map((w, idx) => (
                  <li key={idx} className="list-disc ml-4">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Transparency / Prototype Note */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
            <span className="font-bold text-slate-700">Algorithmic Transparency Note:</span> Saarthi calculates compatibility using explicit eligibility matrices for SIH 2026. Data status: <strong>{scheme.verificationStatus || "Demo Scheme Data"}</strong>. Final loan sanctioning is performed by designated financial institutions and nodal agencies.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-saarthi-navy text-white text-xs font-bold hover:bg-saarthi-navy-light transition"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}

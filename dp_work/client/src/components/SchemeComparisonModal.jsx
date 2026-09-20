import React from "react";
import { X, Scale, Check, ShieldCheck, ExternalLink } from "lucide-react";

export default function SchemeComparisonModal({ schemes, isOpen, onClose, onRemoveScheme }) {
  if (!isOpen || !schemes || schemes.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn">
        {/* Top bar with tricolor motif */}
        <div className="tricolor-border-top" />

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-saarthi-navy flex items-center justify-center text-white shadow-sm">
              <Scale className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-saarthi-navy">
                Scheme Comparison Matrix
              </h2>
              <p className="text-xs text-slate-500">
                Comparing {schemes.length} selected government schemes for marginalized entrepreneurs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Table Body */}
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-3 px-4 font-bold text-slate-400 uppercase tracking-wider w-1/4">
                  Feature / Parameter
                </th>
                {schemes.map((s) => (
                  <th key={s.id} className="py-3 px-4 font-bold text-saarthi-navy w-1/4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-black">{s.shortName || s.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{s.ministry}</div>
                      </div>
                      {onRemoveScheme && (
                        <button
                          onClick={() => onRemoveScheme(s.id)}
                          className="text-slate-400 hover:text-rose-500 text-xs p-1"
                          title="Remove from comparison"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-700 bg-slate-50/50">
                  Target Demographic
                </td>
                {schemes.map((s) => (
                  <td key={s.id} className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {s.targetDemographic.map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-700 bg-slate-50/50">
                  Maximum Loan Amount
                </td>
                {schemes.map((s) => (
                  <td key={s.id} className="py-3.5 px-4 font-bold text-saarthi-navy text-sm">
                    ₹{s.maxLoan.toLocaleString("en-IN")}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-700 bg-slate-50/50">
                  Subsidy / Financial Perk
                </td>
                {schemes.map((s) => (
                  <td key={s.id} className="py-3.5 px-4 font-bold text-saarthi-green">
                    {s.subsidyRate}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-700 bg-slate-50/50">
                  Interest Rate
                </td>
                {schemes.map((s) => (
                  <td key={s.id} className="py-3.5 px-4 text-slate-700 font-medium">
                    {s.interestRate}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-700 bg-slate-50/50">
                  Collateral Security
                </td>
                {schemes.map((s) => (
                  <td key={s.id} className="py-3.5 px-4">
                    {s.collateralRequired ? (
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">
                        Collateral Required
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold flex items-center w-fit space-x-1">
                        <Check className="w-3 h-3 inline" />
                        <span>Collateral-Free</span>
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-700 bg-slate-50/50">
                  Repayment Tenure
                </td>
                {schemes.map((s) => (
                  <td key={s.id} className="py-3.5 px-4 text-slate-700 font-medium">
                    {s.tenureMonths} Months ({Math.round(s.tenureMonths / 12)} Years)
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-700 bg-slate-50/50">
                  Official Portal
                </td>
                {schemes.map((s) => (
                  <td key={s.id} className="py-3.5 px-4">
                    <a
                      href={s.applicationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1 text-saarthi-green hover:underline font-bold"
                    >
                      <span>Visit Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-saarthi-navy text-white text-xs font-bold hover:bg-saarthi-navy-light transition shadow-sm"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}

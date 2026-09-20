import React from "react";
import { X, CheckCircle, FileText, ExternalLink, ShieldAlert, Award, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function EligibilityModal({ scheme, isOpen, onClose }) {
  if (!isOpen || !scheme) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn">
        {/* Tricolor top header stripe */}
        <div className="tricolor-border-top" />

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between bg-slate-50">
          <div>
            <span className="text-[11px] font-bold text-saarthi-navy uppercase tracking-wider">
              {scheme.ministry}
            </span>
            <h2 className="text-xl font-black text-saarthi-navy mt-0.5">
              {scheme.name}
            </h2>
            <div className="flex items-center space-x-2 mt-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                {scheme.matchScore ? `${scheme.matchScore}% Match` : "Verified Scheme"}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {scheme.category}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Key Financial Snapshot */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Loan Envelope</span>
              <strong className="text-saarthi-navy font-bold">
                ₹{scheme.minLoan.toLocaleString("en-IN")} - ₹{scheme.maxLoan.toLocaleString("en-IN")}
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Subsidy / Benefit</span>
              <strong className="text-saarthi-green font-bold">
                {scheme.subsidyRate}
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Interest Rate</span>
              <strong className="text-slate-700 font-bold">
                {scheme.interestRate}
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Collateral</span>
              <strong className="text-emerald-700 font-bold">
                {scheme.collateralRequired ? "Required" : "Collateral-Free"}
              </strong>
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-3 flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-saarthi-green" />
              <span>Eligibility Conditions</span>
            </h4>
            <div className="space-y-2">
              {scheme.eligibilityCriteria && scheme.eligibilityCriteria.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white border border-slate-200 flex items-start space-x-2.5 text-xs text-slate-700"
                >
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Required Checklist */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-3 flex items-center space-x-1.5">
              <FileText className="w-4 h-4 text-saarthi-navy" />
              <span>Mandatory Documents Checklist</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(scheme.documentsRequired || scheme.requiredDocuments || []).map((doc, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-2 text-xs text-slate-700"
                >
                  <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                  <span className="font-medium">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Need Offline Assistance Banner */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-amber-950 block">
                Do you need help applying or scanning documents?
              </span>
              <p className="text-amber-800 text-[11px] mt-0.5">
                Our verified Common Service Center (CSC) partners can complete your biometric registration and upload documents for you.
              </p>
            </div>
            <Link
              to="/partners"
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center space-x-1 whitespace-nowrap shadow-sm flex-shrink-0 text-xs"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Find Partner</span>
            </Link>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-white transition"
          >
            Close
          </button>

          {scheme.applicationUrl && (
            <a
              href={scheme.applicationUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-bold transition shadow-md"
            >
              <span>Apply on Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, CheckCircle2, Award, Sparkles, HelpCircle } from "lucide-react";
import SchemeFinderFlow from "../components/SchemeFinderFlow";

export default function SchemeFinderPage({ onMatchComplete }) {
  const navigate = useNavigate();

  const handleComplete = (formData) => {
    if (onMatchComplete) {
      onMatchComplete(formData);
    } else {
      navigate("/scheme-matching");
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Top Context Card */}
        <div className="mb-6 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-soft">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-saarthi-green" />
              <span>Personalized Government Scheme Matcher</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-saarthi-navy">
              Find Schemes Matched to Your Profile
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Complete the 4-step assessment below. Our matching engine will evaluate your social category, income, business sector, and loan requirements against active Central and State schemes.
            </p>
          </div>

          {/* Trust Guarantees */}
          <div className="flex sm:flex-col items-center sm:items-end justify-center gap-2 text-xs font-bold text-slate-600">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-saarthi-green flex-shrink-0" />
              <span>100% Free & Open Access</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Data Kept In Browser</span>
            </div>
          </div>
        </div>

        {/* The 4-Step Form Flow */}
        <SchemeFinderFlow onComplete={handleComplete} />
      </div>
    </div>
  );
}

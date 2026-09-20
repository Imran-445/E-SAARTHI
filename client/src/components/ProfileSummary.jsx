import React from "react";
import { User, Briefcase, IndianRupee, MapPin, Edit3, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfileSummary({ profile, onEdit }) {
  if (!profile || Object.keys(profile).length === 0) {
    return (
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-soft mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-saarthi-navy">No Entrepreneur Profile Found</h4>
            <p className="text-xs text-slate-500">
              Complete the 4-step assessment to receive ranked, personalized scheme recommendations.
            </p>
          </div>
        </div>

        <Link
          to="/scheme-finder"
          className="px-4 py-2 rounded-xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-bold transition shadow-sm flex items-center space-x-1.5 flex-shrink-0"
        >
          <span>Start Scheme Finder</span>
        </Link>
      </div>
    );
  }

  const socialCategory = profile.socialCategory || profile.category || "General";
  const income = Number(profile.annualFamilyIncome) || 0;
  const loanAmount = Number(profile.loanAmount) || 0;
  const purpose = profile.loanPurpose || profile.purpose || "Start a Small Business";
  const businessType = profile.businessType || "Micro Enterprise";
  const locationText = [profile.district, profile.state].filter(Boolean).join(", ") || (profile.area ? `${profile.area} Area` : "India");

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-soft mb-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-saarthi-navy text-white flex items-center justify-center">
            <User className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-saarthi-green">
                Assessed Profile Active
              </span>
              {profile.name && (
                <span className="text-xs font-bold text-slate-800">
                  • {profile.name}
                </span>
              )}
            </div>
            <h3 className="text-sm font-black text-saarthi-navy">
              Profile Parameters Used for Scheme Matching
            </h3>
          </div>
        </div>

        <Link
          to="/scheme-finder"
          onClick={onEdit}
          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition self-start sm:self-auto shadow-xs"
        >
          <Edit3 className="w-3.5 h-3.5 text-saarthi-navy" />
          <span>Modify My Details</span>
        </Link>
      </div>

      {/* Snapshot Pills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-4 text-xs">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Category</span>
          <strong className="text-saarthi-navy font-bold truncate block">{socialCategory}</strong>
          <span className="text-[10px] text-slate-500 font-medium">{profile.gender || "Citizen"}</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Family Income</span>
          <strong className="text-saarthi-green font-bold truncate block">
            ₹{income.toLocaleString("en-IN")}
          </strong>
          <span className="text-[10px] text-slate-500 font-medium">Annual Income</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Loan Need</span>
          <strong className="text-saarthi-navy font-bold truncate block">
            ₹{loanAmount.toLocaleString("en-IN")}
          </strong>
          <span className="text-[10px] text-slate-500 font-medium truncate block">
            {purpose}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Business Type</span>
          <strong className="text-saarthi-navy font-bold truncate block">{businessType}</strong>
          <span className="text-[10px] text-slate-500 font-medium truncate block">{profile.stage || "Greenfield"}</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Location</span>
          <strong className="text-saarthi-navy font-bold truncate block">
            {profile.district || profile.state || "Within District"}
          </strong>
          <span className="text-[10px] text-slate-500 font-medium truncate block">
            {profile.state || profile.area || "State/UT"}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
          <span className="text-[10px] uppercase font-bold text-emerald-700 block">Language</span>
          <strong className="text-emerald-900 font-bold truncate block">
            {profile.preferredLanguage || "English"}
          </strong>
          <span className="text-[10px] text-emerald-700 font-medium">Assistance Ready</span>
        </div>
      </div>
    </div>
  );
}

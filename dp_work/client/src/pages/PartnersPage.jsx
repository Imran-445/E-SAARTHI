import React from "react";
import PartnerMapLocator from "../components/PartnerMapLocator";
import { ShieldCheck, MapPin, Users, HelpCircle, PhoneCall } from "lucide-react";
import { fallbackPartners } from "../services/api";

export default function PartnersPage() {
  return (
    <div className="py-10 bg-slate-50 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft mb-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-saarthi-green">
              Last-Mile Handholding Network
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-saarthi-navy mt-1">
              Find Verified Channel Partners & CSC Centers
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Don't have a scanner or struggling with digital forms? Visit your nearest Common Service Center (CSC), Lead Bank Mitra, or MSME Nodal Officer for zero-cost biometric onboarding, document verification, and DPR submission.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center space-x-2.5 text-slate-700">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 font-bold">
                ✓
              </div>
              <div>
                <strong className="block text-saarthi-navy font-bold">Free Assistance</strong>
                <span className="text-slate-500">Zero fee for scheme eligibility lookup</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 text-slate-700">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 font-bold">
                ✓
              </div>
              <div>
                <strong className="block text-saarthi-navy font-bold">Vernacular Languages</strong>
                <span className="text-slate-500">Spoken guidance in your local mother tongue</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 text-slate-700">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0 font-bold">
                ✓
              </div>
              <div>
                <strong className="block text-saarthi-navy font-bold">Document Scanning</strong>
                <span className="text-slate-500">Aadhaar, Udyam & photo upload support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Interactive Locator & Map */}
        <PartnerMapLocator initialPartners={fallbackPartners} />
      </div>
    </div>
  );
}

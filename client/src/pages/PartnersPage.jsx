import React, { useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import PartnerMapLocator from "../components/PartnerMapLocator";
import {
  ShieldCheck,
  MapPin,
  Users,
  HelpCircle,
  PhoneCall,
  ArrowLeft,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { fallbackPartners } from "../services/api";

export default function PartnersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const schemeParam = searchParams.get("scheme") || "All Schemes";
  const schemeNameParam = searchParams.get("schemeName") || "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClearSchemeFilter = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("scheme");
    nextParams.delete("schemeName");
    setSearchParams(nextParams);
  };

  return (
    <div className="py-8 sm:py-10 bg-slate-50 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Breadcrumb / Return CTA */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-500">
            <Link to="/" className="hover:text-saarthi-navy transition">
              Home
            </Link>
            <span>/</span>
            {schemeParam !== "All Schemes" ? (
              <>
                <Link to="/recommended-scheme" className="hover:text-saarthi-navy transition">
                  Recommended Schemes
                </Link>
                <span>/</span>
                <span className="text-saarthi-navy font-bold">Partner Locator</span>
              </>
            ) : (
              <span className="text-saarthi-navy font-bold">Partner Locator</span>
            )}
          </div>

          {schemeParam !== "All Schemes" && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-saarthi-navy text-xs font-bold transition shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Scheme Details</span>
            </button>
          )}
        </div>

        {/* Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-saarthi-green flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-saarthi-green" />
              <span>National Last-Mile Handholding Network</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-saarthi-navy mt-1.5 tracking-tight">
              Channel Partner & Facilitation Desk Locator
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Struggling with online forms, document scanning, or Detailed Project Reports (DPR)?
              Connect with nearest verified Common Service Centers (CSCs), Lead District Bank Mitras,
              and District Industries Centers (DICs) for zero-cost biometric onboarding and end-to-end guidance.
            </p>
          </div>

          {/* Highlights Checklist */}
          <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center space-x-2.5 text-slate-700">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 font-bold">
                ✓
              </div>
              <div>
                <strong className="block text-saarthi-navy font-bold">Zero-Cost Handholding</strong>
                <span className="text-slate-500 text-[11px]">Free eligibility checks & portal filing</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 text-slate-700">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 font-bold">
                ✓
              </div>
              <div>
                <strong className="block text-saarthi-navy font-bold">Vernacular Assistance</strong>
                <span className="text-slate-500 text-[11px]">Spoken guidance in your local mother tongue</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 text-slate-700">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0 font-bold">
                ✓
              </div>
              <div>
                <strong className="block text-saarthi-navy font-bold">Biometric & Document Scanning</strong>
                <span className="text-slate-500 text-[11px]">UIDAI e-KYC, Udyam & photo upload support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Interactive Locator & Map Component */}
        <PartnerMapLocator
          initialPartners={fallbackPartners}
          initialScheme={schemeParam}
          initialSchemeName={schemeNameParam}
          onClearSchemeFilter={handleClearSchemeFilter}
        />

        {/* Next Steps in Citizen Journey */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-saarthi-green block">
              Next Step in Your Entrepreneur Journey
            </span>
            <h3 className="text-base font-black text-saarthi-navy mt-0.5">
              Prepare Documents with Your Partner
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
              Review the self-attested document checklist required by your nodal bank or CSC VLE before submitting your application.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
            <Link
              to="/document-guidance"
              className="px-5 py-2.5 rounded-2xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-black transition shadow-sm flex items-center space-x-1.5"
            >
              <span>View Document Checklist</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </Link>

            <Link
              to="/application-tracking"
              className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center space-x-1.5"
            >
              <span>Track Application (6 Stages)</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

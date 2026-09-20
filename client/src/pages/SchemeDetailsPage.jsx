import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Coins,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Building2,
  ExternalLink,
  Calculator,
  MapPin,
  AlertTriangle,
  Layers,
  Award,
  Calendar,
  Clock,
  Briefcase,
  Globe2,
  Sparkles,
  Printer,
  Copy,
  Check
} from "lucide-react";
import { getSchemeById, fallbackSchemes } from "../services/api";

export default function SchemeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedDocs, setCopiedDocs] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function load() {
      setLoading(true);
      try {
        const data = await getSchemeById(id);
        if (data) {
          setScheme(data);
        } else {
          // Fallback search in static catalog
          const found = fallbackSchemes.find((s) => s.id === id);
          setScheme(found || null);
        }
      } catch (err) {
        console.warn("Could not load scheme details, trying fallback", err);
        const found = fallbackSchemes.find((s) => s.id === id);
        setScheme(found || null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleCopyDocs = () => {
    if (!scheme) return;
    const docs = scheme.requiredDocuments || scheme.documentsRequired || [];
    const text = `Required Documents for ${scheme.name}:\n` + docs.map((d, i) => `${i + 1}. ${d}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopiedDocs(true);
    setTimeout(() => setCopiedDocs(false), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-saarthi-green border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-slate-600">Loading scheme information...</p>
        </div>
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-saarthi-navy">Scheme Record Not Found</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            The requested scheme identifier could not be located in the prototype dataset.
          </p>
          <button
            onClick={() => navigate("/schemes")}
            className="px-5 py-2.5 rounded-xl bg-saarthi-green text-white text-xs font-bold hover:bg-saarthi-green-hover transition inline-flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Schemes Catalog</span>
          </button>
        </div>
      </div>
    );
  }

  const minAmt = scheme.minLoanAmount ?? scheme.minLoan ?? 0;
  const maxAmt = scheme.maxLoanAmount ?? scheme.maxLoan ?? 0;

  const formatAmount = (num) => {
    if (!num) return "₹0";
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1).replace(/\.0$/, "")} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1).replace(/\.0$/, "")} Lakh`;
    return `₹${num.toLocaleString("en-IN")}`;
  };

  const docs = scheme.requiredDocuments || scheme.documentsRequired || [];
  const beneficiaries = scheme.targetBeneficiaries || scheme.targetDemographic || [];
  const sectors = scheme.sector || scheme.eligibleSectors || [];
  const purposes = scheme.purpose || [];

  return (
    <div className="py-8 bg-slate-50 min-h-screen text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
            <Link to="/" className="hover:text-saarthi-navy transition">
              Home
            </Link>
            <span>/</span>
            <Link to="/schemes" className="hover:text-saarthi-navy transition">
              Schemes Catalog
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-bold truncate max-w-[200px] sm:max-w-xs">
              {scheme.shortName || scheme.name}
            </span>
          </div>

          <button
            onClick={() => navigate("/schemes")}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Schemes</span>
          </button>
        </div>

        {/* Prototype Mock Data Disclaimer Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start space-x-3 text-xs leading-relaxed animate-fadeIn">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-black block uppercase tracking-wide text-amber-950">
              Prototype Mock Scheme Data Notice
            </strong>
            <p className="mt-0.5 text-amber-800 text-[11px] sm:text-xs">
              This record contains realistic mock data compiled for user interface testing and architectural evaluation.
              Sample values should <strong>not</strong> be considered official government regulations. Please consult official government portals or your local Common Service Center (CSC) for official notifications.
            </p>
          </div>
        </div>

        {/* Scheme Hero Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft mb-6 relative overflow-hidden">
          <div className="tricolor-border-top" />

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              {/* Category & Status Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-saarthi-navy text-white text-[11px] font-bold tracking-wide">
                  {scheme.category}
                </span>

                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-saarthi-green animate-pulse" />
                  <span>{scheme.schemeStatus || "Active (Mock Prototype Data)"}</span>
                </span>

                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                  {scheme.ruralUrbanEligibility || "Pan-India"}
                </span>
              </div>

              {/* Title & Ministry */}
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  {scheme.ministry || "Government of India"}
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-saarthi-navy mt-1 leading-tight">
                  {scheme.name}
                </h1>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-normal">
                {scheme.shortDescription}
              </p>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 flex-shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigate(`/document-guidance?schemeId=${scheme.id}`)}
                className="px-5 py-3 rounded-2xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-black transition shadow-md flex items-center justify-center space-x-2"
              >
                <FileText className="w-3.5 h-3.5 text-white" />
                <span>Prepare Documents & Apply</span>
              </button>

              {scheme.officialSourceUrl && (
                <a
                  href={scheme.officialSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-2xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-black transition shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Visit Official Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <button
                type="button"
                onClick={() => {
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
                      returnPath: `/schemes/${scheme.id}`
                    }
                  });
                }}
                className="px-4 py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold transition flex items-center justify-center space-x-2"
              >
                <Calculator className="w-3.5 h-3.5 text-saarthi-green" />
                <span>Calculate EMI</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("saarthi:open-chat", {
                      detail: {
                        schemeId: scheme.id,
                        initialQuery: `Explain ${scheme.shortName || scheme.name} simply.`
                      }
                    })
                  );
                }}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-saarthi-navy to-slate-800 hover:from-slate-800 hover:to-saarthi-navy text-white text-xs font-bold transition shadow-sm flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Ask Saarthi Mitra (AI)</span>
              </button>

              <button
                type="button"
                onClick={() => navigate("/partners")}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition flex items-center justify-center space-x-2"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-600" />
                <span>Find CSC Partner</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Financial Metric Callout Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1: Loan Amount */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Funding Range
            </span>
            <div className="my-2">
              <span className="text-xl sm:text-2xl font-black text-saarthi-navy block">
                {minAmt > 0 ? `${formatAmount(minAmt)} - ${formatAmount(maxAmt)}` : `Up to ${formatAmount(maxAmt)}`}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Min: ₹{minAmt.toLocaleString("en-IN")} | Max: ₹{maxAmt.toLocaleString("en-IN")}
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block w-max">
              {scheme.collateralRequired ? "Collateral Required" : "Collateral-Free"}
            </span>
          </div>

          {/* Card 2: Subsidy / Capital Support */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Subsidy Support
            </span>
            <div className="my-2">
              <span className="text-base sm:text-lg font-black text-saarthi-green block leading-snug">
                {scheme.subsidyRate || "Available"}
              </span>
              <span className="text-[11px] text-slate-500 font-medium line-clamp-1">
                {scheme.subsidyType || "Direct Government Benefit"}
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md inline-block w-max">
              Direct Benefit Transfer
            </span>
          </div>

          {/* Card 3: Interest Rate */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Interest Rate
            </span>
            <div className="my-2">
              <span className="text-xl sm:text-2xl font-black text-saarthi-navy block">
                {scheme.interestRate ? scheme.interestRate.split(" ")[0] : "Concessional"}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {scheme.interestRate || "Bank Priority Sector Rate"}
              </span>
            </div>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md inline-block w-max">
              Moratorium: {scheme.moratorium || "Standard"}
            </span>
          </div>

          {/* Card 4: Repayment Period */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Repayment Tenure
            </span>
            <div className="my-2">
              <span className="text-xl sm:text-2xl font-black text-saarthi-navy block">
                {scheme.repaymentPeriod || `${scheme.tenureMonths || 36} Months`}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Flexible installment terms
              </span>
            </div>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md inline-block w-max">
              Zero Prepayment Fine
            </span>
          </div>
        </div>

        {/* Detailed Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Columns: Core Scheme Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview & Detailed Purpose */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base sm:text-lg font-black text-saarthi-navy flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-saarthi-green" />
                <span>Scheme Overview & Objectives</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {scheme.overview || scheme.shortDescription}
              </p>

              {/* Key Benefit Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-950 block mb-1">
                  ★ Key Advantage & Impact
                </span>
                <p className="text-xs sm:text-sm font-bold text-emerald-900 leading-snug">
                  {scheme.keyBenefit || scheme.subsidyInformation}
                </p>
              </div>

              {/* Supported Loan Purposes */}
              {purposes.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Approved Financing Purposes:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {purposes.map((p, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800"
                      >
                        ✓ {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Subsidy & Financial Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base sm:text-lg font-black text-saarthi-navy flex items-center space-x-2">
                <Coins className="w-5 h-5 text-amber-500" />
                <span>Subsidy Structure & Financial Concessions</span>
              </h2>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs sm:text-sm text-slate-700">
                <div>
                  <strong className="text-saarthi-navy font-bold block mb-0.5">Subsidy Description:</strong>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {scheme.subsidyInformation || "Check guidelines for subsidy breakdown."}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Subsidy Type</span>
                    <strong className="text-xs text-slate-800">{scheme.subsidyType || "Direct Benefit Grant"}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Effective Interest Rate</span>
                    <strong className="text-xs text-saarthi-green">{scheme.interestRate || "Subsidized"}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Eligibility Conditions Breakdown */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base sm:text-lg font-black text-saarthi-navy flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-saarthi-green" />
                <span>Eligibility Criteria & Conditions</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Income Eligibility */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Income Eligibility
                  </span>
                  <p className="text-slate-800 font-semibold leading-relaxed">
                    {scheme.incomeEligibility || "No strict income ceiling; viability of business activity evaluated."}
                  </p>
                </div>

                {/* Rural / Urban Scope */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Geographic Scope
                  </span>
                  <p className="text-slate-800 font-semibold leading-relaxed">
                    {scheme.ruralUrbanEligibility || "Open across Rural and Urban regions in India."}
                  </p>
                </div>
              </div>

              {/* Eligible Category Callout */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 block mb-1">
                  Eligible Social Categories & Demographics
                </span>
                <p className="text-xs font-bold text-saarthi-navy">
                  {scheme.eligibleCategory || "Open to all qualified micro-entrepreneurs."}
                </p>
              </div>

              {/* Supported Sectors */}
              {sectors.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Eligible Industry Sectors:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sectors.map((sec, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium"
                      >
                        • {sec}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Application Method & Step-by-Step Guide */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base sm:text-lg font-black text-saarthi-navy flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-saarthi-navy" />
                <span>Application Method & Procedure</span>
              </h2>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <strong className="font-bold text-saarthi-navy block">
                  How to apply for {scheme.shortName || scheme.name}:
                </strong>
                <p className="text-xs text-slate-600">
                  {scheme.applicationMethod || "Apply online through the official portal or visit an authorized Common Service Center (CSC) / Bank Mitra."}
                </p>
              </div>

              {/* 3 Step Process Illustration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs space-y-1">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs">
                    1
                  </span>
                  <span className="font-bold text-slate-800 block">Collect Documents</span>
                  <p className="text-[11px] text-slate-500">Gather Aadhaar, category certificate, and business quotations.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs space-y-1">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs">
                    2
                  </span>
                  <span className="font-bold text-slate-800 block">Portal / CSC Filing</span>
                  <p className="text-[11px] text-slate-500">Submit form online or get assisted e-KYC filing at nearest CSC.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs space-y-1">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs">
                    3
                  </span>
                  <span className="font-bold text-slate-800 block">Bank Sanction & DBT</span>
                  <p className="text-[11px] text-slate-500">Bank verifies proposal and disburses capital into escrow account.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Required Documents & Side Actions */}
          <div className="space-y-6">
            {/* Required Documents Checklist Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-black text-saarthi-navy flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-saarthi-green" />
                  <span>Required Documents</span>
                </h3>

                <button
                  type="button"
                  onClick={handleCopyDocs}
                  className="inline-flex items-center space-x-1 text-[11px] font-bold text-saarthi-green hover:underline"
                >
                  {copiedDocs ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-saarthi-green" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy List</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-500 leading-snug">
                Keep the following self-attested documents ready before beginning the application:
              </p>

              <div className="space-y-2">
                {docs.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-2.5 text-xs text-slate-700"
                  >
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="font-medium">{doc}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 italic">
                  Note: CSC centers offer document scanning and digital format compression for portal submission.
                </p>
              </div>
            </div>

            {/* Target Beneficiaries Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-sm font-black text-saarthi-navy flex items-center space-x-2">
                <Award className="w-4 h-4 text-saarthi-navy" />
                <span>Target Beneficiaries</span>
              </h3>

              <div className="space-y-1.5">
                {beneficiaries.map((b, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700 flex items-center space-x-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-saarthi-navy" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Source & Verification Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-sm font-black text-saarthi-navy flex items-center space-x-2">
                <Globe2 className="w-4 h-4 text-blue-600" />
                <span>Official Source Link</span>
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                Refer to the nodal ministry portal for notifications, standard operating procedures, and authorized circulars.
              </p>

              {scheme.officialSourceUrl ? (
                <a
                  href={scheme.officialSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-saarthi-navy text-xs font-bold transition flex items-center justify-center space-x-1.5 border border-slate-300"
                >
                  <span className="truncate">{scheme.officialSourceUrl}</span>
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                </a>
              ) : (
                <span className="text-xs text-slate-400 italic block">Official URL placeholder not provided</span>
              )}

              <div className="pt-2 text-[10px] text-slate-400">
                Scheme ID: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">{scheme.id}</code>
              </div>
            </div>

            {/* Assistance Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200 text-xs space-y-3">
              <div>
                <span className="font-bold text-amber-950 block">Need Local Help?</span>
                <p className="text-amber-900 text-[11px] mt-0.5">
                  Visit your nearest CSC or Bank Mitra for handholding and verification assistance.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/partners?scheme=${encodeURIComponent(scheme.id)}&schemeName=${encodeURIComponent(
                      scheme.name
                    )}`
                  )
                }
                className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition text-xs flex items-center justify-center space-x-1.5 shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Find Nearby Help Center</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  FileText,
  Building2,
  IndianRupee,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  MapPin,
  Sparkles,
  Info,
  Calendar,
  Layers,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check
} from "lucide-react";
import { schemes as allSchemes } from "../data/schemes";
import {
  APPLICATION_STAGES,
  getAllApplications,
  getActiveApplication,
  updateApplicationStatus,
  saveActiveApplication
} from "../services/applicationService";

export default function ApplicationTrackingPage() {
  const navigate = useNavigate();

  // Active Application state
  const [activeApp, setActiveApp] = useState(() => {
    const existing = getActiveApplication();
    if (existing) return existing;

    // If none exists, create a realistic default application for the prototype
    const defaultScheme = allSchemes[0]; // PM SVANidhi
    const newApp = {
      id: "SAARTHI-2026-8492",
      schemeId: defaultScheme.id,
      schemeName: defaultScheme.name,
      category: defaultScheme.category,
      applicantName: "Entrepreneur Applicant",
      requestedAmount: 50000,
      currentStatus: "Documents Prepared",
      statusStage: 3,
      submissionDate: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      documentCompletion: 100,
      nextAction: "All mandatory documents are marked ready! Visit your nearest CSC partner or official portal to file.",
      disbursedAmount: 0,
      nodalAgency: "State Bank of India / Urban Local Body"
    };
    saveActiveApplication(newApp);
    return newApp;
  });

  // All applications list (including mock samples)
  const [allApps, setAllApps] = useState(() => getAllApplications());
  // Copied ID toast
  const [copiedId, setCopiedId] = useState(false);
  // Status transition toast
  const [statusMessage, setStatusMessage] = useState("");

  // Re-sync applications when updated
  const refreshApps = () => {
    const current = getActiveApplication();
    setActiveApp(current);
    setAllApps(getAllApplications());
  };

  // Copy Application ID to clipboard
  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Demonstrate switching status across the 6 stages
  const handleSimulateStatus = (stageId) => {
    const updated = updateApplicationStatus(stageId);
    if (updated) {
      setActiveApp(updated);
      setAllApps(getAllApplications());
      const stageObj = APPLICATION_STAGES.find((s) => s.id === stageId);
      setStatusMessage(`Status demonstrated: ${stageObj?.label}`);
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  // Inspect or switch to a sample application
  const handleSelectSample = (sampleApp) => {
    saveActiveApplication(sampleApp);
    setActiveApp(sampleApp);
    setAllApps(getAllApplications());
  };

  const currentStageIndex = activeApp?.statusStage || 3;

  return (
    <div className="py-8 bg-slate-50 min-h-screen text-left pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prototype Disclaimer Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-3 shadow-xs">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Application Tracking Simulator (SIH 2026 Prototype):</strong> This page demonstrates the 6-stage lifecycle tracking for government micro-enterprise schemes. <em>This prototype is not connected to a real live government application portal.</em> You can simulate each stage using the prototype controls below.
          </div>
        </div>

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft mb-6 relative overflow-hidden">
          <div className="tricolor-border-top" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
                <Clock className="w-3.5 h-3.5 text-saarthi-green" />
                <span>Transparent Application Lifecycle Monitor</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-saarthi-navy mt-1 leading-tight">
                Scheme Application Tracking
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                Monitor real-time progress through all 6 official stages: Details Submitted → Scheme Selected → Documents Prepared → Application Submitted → Under Review → Completed.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
              <Link
                to="/document-guidance"
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-saarthi-navy border border-slate-300 text-xs font-bold transition flex items-center space-x-1.5 shadow-xs"
              >
                <FileText className="w-3.5 h-3.5 text-saarthi-green" />
                <span>Document Guidance</span>
              </Link>

              <Link
                to="/dashboard"
                className="px-4 py-2.5 rounded-xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
              >
                <span>Citizen Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ACTIVE APPLICATION SPOTLIGHT CARD                            */}
        {/* ============================================================ */}
        {activeApp && (
          <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-lg p-6 sm:p-8 mb-8 space-y-6">
            {/* Top Bar: ID, Scheme Name, Current Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Application Reference ID
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyId(activeApp.id)}
                    className="inline-flex items-center space-x-1 text-[11px] font-mono font-bold text-saarthi-navy hover:text-saarthi-green bg-slate-100 px-2 py-0.5 rounded-md"
                    title="Copy Application ID"
                  >
                    <span>{activeApp.id}</span>
                    {copiedId ? (
                      <Check className="w-3 h-3 text-saarthi-green" />
                    ) : (
                      <Copy className="w-3 h-3 text-slate-400" />
                    )}
                  </button>
                  {copiedId && (
                    <span className="text-[10px] text-saarthi-green font-bold">Copied!</span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-saarthi-navy leading-tight">
                  {activeApp.schemeName}
                </h2>

                <p className="text-xs text-slate-500 mt-0.5">
                  Category: <strong>{activeApp.category}</strong> • Target Amount: <strong>₹{Number(activeApp.requestedAmount || 50000).toLocaleString("en-IN")}</strong>
                </p>
              </div>

              {/* Status Badge & Document Completion Pill */}
              <div className="flex sm:flex-col items-start sm:items-end justify-between gap-2 flex-shrink-0">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-black text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-saarthi-green animate-pulse" />
                  <span>Status: {activeApp.currentStatus}</span>
                </div>

                <Link
                  to={`/document-guidance?schemeId=${activeApp.schemeId || "pm-svanidhi"}`}
                  className="text-xs font-bold text-saarthi-navy hover:text-saarthi-green flex items-center space-x-1"
                >
                  <FileText className="w-3 h-3 text-saarthi-green" />
                  <span>Docs Ready: {activeApp.documentCompletion || 100}%</span>
                </Link>
              </div>
            </div>

            {/* 6-Stage Visual Stepper */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-saarthi-navy">
                  Application Lifecycle Progress (Stage {currentStageIndex} of 6)
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {Math.round((currentStageIndex / 6) * 100)}% Milestone Completed
                </span>
              </div>

              {/* Stepper Desktop Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {APPLICATION_STAGES.map((stage) => {
                  const isDone = stage.id < currentStageIndex;
                  const isCurrent = stage.id === currentStageIndex;
                  const isFuture = stage.id > currentStageIndex;

                  return (
                    <div
                      key={stage.id}
                      className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                        isCurrent
                          ? "bg-emerald-50 border-saarthi-green shadow-xs ring-2 ring-emerald-500/20"
                          : isDone
                          ? "bg-slate-50/80 border-slate-200"
                          : "bg-white border-slate-200 opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                            isCurrent
                              ? "bg-saarthi-green text-white"
                              : isDone
                              ? "bg-emerald-200 text-emerald-900"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {isDone ? "✓" : stage.id}
                        </span>

                        <span className="text-[10px] font-mono text-slate-400">
                          {isCurrent ? "ACTIVE" : isDone ? "DONE" : "PENDING"}
                        </span>
                      </div>

                      <div>
                        <h4
                          className={`text-xs font-black leading-snug ${
                            isCurrent
                              ? "text-emerald-950"
                              : isDone
                              ? "text-slate-800"
                              : "text-slate-500"
                          }`}
                        >
                          {stage.label}
                        </h4>
                        <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                          {stage.shortDesc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Action Callout Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-saarthi-navy text-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-saarthi-navy block">
                    Immediate Next Action Required:
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed mt-0.5">
                    {activeApp.nextAction || "Your application is progressing. Follow up with your nodal agency if required."}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 flex-shrink-0 self-end sm:self-auto">
                <Link
                  to={`/document-guidance?schemeId=${activeApp.schemeId || "pm-svanidhi"}`}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold transition shadow-xs"
                >
                  View Checklist
                </Link>

                <Link
                  to="/partners"
                  className="px-4 py-2 rounded-xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-bold transition shadow-sm flex items-center space-x-1"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Find Partner</span>
                </Link>
              </div>
            </div>

            {/* ============================================================ */}
            {/* PROTOTYPE STATUS DEMONSTRATOR (EVALUATOR INTERACTIVE CONTROL) */}
            {/* ============================================================ */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-800 text-white text-[10px] font-black">
                    PROTOTYPE DEMONSTRATOR
                  </span>
                  <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                    Simulate Application Stage Transitions
                  </h4>
                </div>
                {statusMessage && (
                  <span className="text-xs font-bold text-saarthi-green animate-fadeIn">
                    ✓ {statusMessage}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Click any stage button below to demonstrate how the active application dynamically updates its stepper, milestones, and next action guidance:
              </p>

              {/* 6 Stage Simulation Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
                {APPLICATION_STAGES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSimulateStatus(s.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition text-left flex items-center justify-between border ${
                      activeApp.statusStage === s.id
                        ? "bg-saarthi-navy text-white border-saarthi-navy shadow-sm"
                        : "bg-white hover:bg-emerald-100/50 text-slate-700 border-emerald-200"
                    }`}
                  >
                    <span>{s.id}. {s.label}</span>
                    {activeApp.statusStage === s.id && (
                      <span className="text-amber-300 font-black">●</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SAMPLE MOCK APPLICATIONS HISTORY LIST                        */}
        {/* ============================================================ */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-black text-saarthi-navy">
                Demonstration Application Records
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Sample applications illustrating diverse applicant trades, stages, and loan outcomes.
              </p>
            </div>

            <span className="text-xs text-slate-400 font-semibold">
              Showing {allApps.length} Application Dossiers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allApps.map((app, idx) => {
              const isSelected = activeApp?.id === app.id;

              return (
                <div
                  key={app.id || idx}
                  onClick={() => handleSelectSample(app)}
                  className={`p-5 rounded-3xl border transition cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-white border-saarthi-green shadow-md ring-2 ring-emerald-500/20"
                      : "bg-white border-slate-200 shadow-sm hover:border-slate-300"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-1.5 font-mono text-[11px] font-bold text-slate-500">
                        <span>{app.id}</span>
                        {app.isMockSample && (
                          <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 text-[10px]">
                            Sample
                          </span>
                        )}
                      </div>

                      <span
                        className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                          app.currentStatus === "Completed"
                            ? "bg-emerald-100 text-emerald-900"
                            : app.currentStatus === "Under Review"
                            ? "bg-blue-100 text-blue-900"
                            : "bg-amber-100 text-amber-900"
                        }`}
                      >
                        {app.currentStatus}
                      </span>
                    </div>

                    <h4 className="text-base font-black text-saarthi-navy leading-snug line-clamp-1 mb-1">
                      {app.schemeName}
                    </h4>

                    <p className="text-xs text-slate-600 mb-3">
                      Applicant: <strong>{app.applicantName || "Registered Entrepreneur"}</strong> • Target: <strong>₹{Number(app.requestedAmount || 0).toLocaleString("en-IN")}</strong>
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 leading-relaxed mb-4">
                      <span className="font-bold text-slate-800 block text-[10px] uppercase">Next Step:</span>
                      {app.nextAction}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400 font-medium">
                      Submitted: {app.submissionDate}
                    </span>

                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-bold text-saarthi-navy hover:text-saarthi-green">
                        {isSelected ? "Currently Active ✓" : "Load in Stepper"}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-saarthi-navy" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Support CTA Bar */}
        <div className="mt-8 p-6 rounded-3xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold flex-shrink-0">
              ✓
            </div>
            <div>
              <strong className="block text-saarthi-navy font-bold text-sm">Need In-Person Application Help?</strong>
              <span className="text-slate-600">
                Visit your local Village Level Entrepreneur (VLE) at a Common Service Center (CSC) or District Industries Centre (DIC).
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 flex-shrink-0">
            <Link
              to="/partners"
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold transition shadow-2xs flex-shrink-0"
            >
              Find Nearby Center
            </Link>

            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-saarthi-green hover:bg-saarthi-green-hover text-white font-black transition shadow-sm flex items-center space-x-1.5 flex-shrink-0"
            >
              <span>User Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

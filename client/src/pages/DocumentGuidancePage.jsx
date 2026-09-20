import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom";
import {
  FileText,
  CheckCircle2,
  Circle,
  AlertCircle,
  Clock,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Bookmark,
  Share2,
  MapPin,
  Calculator,
  Building2,
  HelpCircle,
  Compass,
  Check,
  Save,
  Layers,
  Info
} from "lucide-react";
import { schemes as allSchemes } from "../data/schemes";
import {
  DOCUMENT_CATEGORIES,
  getPersonalizedChecklist,
  getDocumentProgress,
  saveDocumentProgress,
  calculateDocumentCompletion,
  saveActiveApplication,
  getActiveApplication
} from "../services/applicationService";

export default function DocumentGuidancePage() {
  const navigate = useNavigate();
  const { schemeId: paramSchemeId } = useParams();
  const [searchParams] = useSearchParams();

  // Determine active scheme ID from route param, query param, or localStorage
  const activeSchemeId = useMemo(() => {
    if (paramSchemeId) return paramSchemeId;
    const fromQuery = searchParams.get("schemeId");
    if (fromQuery) return fromQuery;

    // Check active application or user profile
    try {
      const activeApp = getActiveApplication();
      if (activeApp && activeApp.schemeId) return activeApp.schemeId;
      const savedProfile = localStorage.getItem("saarthi_user_profile");
      if (savedProfile) {
        // Default to PM SVANidhi or PM Vishwakarma based on profile
        const p = JSON.parse(savedProfile);
        if (p.businessType === "Street Vendor") return "pm-svanidhi";
        if (p.businessType === "Traditional Artisan") return "pm-vishwakarma";
      }
    } catch (e) {
      console.warn("Could not determine scheme", e);
    }
    return "pm-svanidhi";
  }, [paramSchemeId, searchParams]);

  // Current selected scheme object
  const currentScheme = useMemo(() => {
    return allSchemes.find((s) => s.id === activeSchemeId) || allSchemes[0];
  }, [activeSchemeId]);

  // User Profile
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("saarthi_user_profile");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Selected Category filter
  const [selectedCategory, setSelectedCategory] = useState("all");
  // Active View Tab: "documents" vs "steps"
  const [activeTab, setActiveTab] = useState("documents");
  // Document Progress map: { [docId]: boolean }
  const [progressMap, setProgressMap] = useState(() => {
    return getDocumentProgress(currentScheme?.id);
  });
  // Save feedback state
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Sync progressMap when scheme changes
  useEffect(() => {
    if (currentScheme?.id) {
      setProgressMap(getDocumentProgress(currentScheme.id));
    }
  }, [currentScheme?.id]);

  // Personalized checklist
  const personalizedList = useMemo(() => {
    return getPersonalizedChecklist(currentScheme, userProfile || {});
  }, [currentScheme, userProfile]);

  // Filtered documents by category tab
  const filteredList = useMemo(() => {
    if (selectedCategory === "all") return personalizedList;
    return personalizedList.filter((doc) => doc.category === selectedCategory);
  }, [personalizedList, selectedCategory]);

  // Completion metrics
  const completion = useMemo(() => {
    return calculateDocumentCompletion(personalizedList, progressMap);
  }, [personalizedList, progressMap]);

  // Toggle document checked state
  const handleToggleDoc = (docId) => {
    setProgressMap((prev) => {
      const updated = {
        ...prev,
        [docId]: !prev[docId]
      };
      saveDocumentProgress(currentScheme.id, updated);
      return updated;
    });
  };

  // Explicit Save Progress action
  const handleSaveProgress = () => {
    saveDocumentProgress(currentScheme.id, progressMap);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  // Mark all documents ready
  const handleMarkAll = () => {
    const updated = {};
    personalizedList.forEach((d) => {
      updated[d.id] = true;
    });
    setProgressMap(updated);
    saveDocumentProgress(currentScheme.id, updated);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  // Proceed to Application Tracking
  const handleProceedToTracking = () => {
    const statusStage = completion.isReady ? 3 : 2; // Stage 3 = Documents Prepared, Stage 2 = Scheme Selected
    const currentStatus = completion.isReady ? "Documents Prepared" : "Scheme Selected";
    const nextAction = completion.isReady
      ? "All mandatory documents are marked ready! Visit your nearest CSC partner or official portal to file."
      : `Complete remaining ${completion.mandatoryTotal - completion.mandatoryCompleted} mandatory documents to finalize preparation.`;

    saveActiveApplication({
      schemeId: currentScheme.id,
      schemeName: currentScheme.name,
      category: currentScheme.category,
      requestedAmount: userProfile?.loanAmount || currentScheme.maxLoanAmount || 50000,
      currentStatus,
      statusStage,
      documentCompletion: completion.percentage,
      nextAction
    });

    navigate("/application-tracking");
  };

  // Switch to another scheme
  const handleSelectScheme = (e) => {
    const newId = e.target.value;
    navigate(`/document-guidance?schemeId=${newId}`);
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen text-left pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prototype Disclaimer Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-3 shadow-xs">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Prototype Preparation Notice:</strong> This guidance checklist is designed to help entrepreneurs assemble, verify, and organize their physical and digital documents before visiting a Common Service Center (CSC), Bank Mitra, or nodal bank. <em>This prototype is not connected to a live government application portal.</em>
          </div>
        </div>

        {/* Header Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft mb-6 relative overflow-hidden">
          <div className="tricolor-border-top" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
                <FileText className="w-3.5 h-3.5 text-saarthi-green" />
                <span>Personalized Application & Document Guidance</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-saarthi-navy mt-1 leading-tight">
                Document Checklist: {currentScheme.shortName || currentScheme.name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                Categorized checklist extracted directly from {currentScheme.name} guidelines. Mark each document as ready to track your preparation score.
              </p>

              {/* Profile Context Pill */}
              {userProfile && (
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-600">
                  <span className="font-bold text-saarthi-navy">Applicant:</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700">
                    {userProfile.socialCategory || "General"} ({userProfile.gender || "All"})
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700">
                    {userProfile.area || "Urban"} Area
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700">
                    ₹{Number(userProfile.loanAmount || currentScheme.maxLoanAmount || 0).toLocaleString("en-IN")} Required
                  </span>
                </div>
              )}
            </div>

            {/* Top Scheme Selector & Switcher */}
            <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2.5 flex-shrink-0">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Switch Scheme:
              </label>
              <select
                value={currentScheme.id}
                onChange={handleSelectScheme}
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-saarthi-navy bg-white focus:outline-none focus:ring-2 focus:ring-saarthi-navy max-w-xs"
              >
                {allSchemes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.shortName || s.name}
                  </option>
                ))}
              </select>

              <Link
                to="/recommended-scheme"
                className="text-xs font-bold text-saarthi-navy hover:text-saarthi-green flex items-center space-x-1 mt-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Recommendations</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Readiness Progress Banner */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            {/* Circular Progress Badge */}
            <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={
                    completion.percentage === 100
                      ? "text-saarthi-green"
                      : completion.percentage >= 50
                      ? "text-blue-600"
                      : "text-amber-500"
                  }
                  strokeDasharray={`${completion.percentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black text-saarthi-navy">
                {completion.percentage}%
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-black text-saarthi-navy">
                  Document Readiness: {completion.completed} of {completion.total} Ready
                </h3>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                    completion.percentage === 100
                      ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                      : completion.percentage >= 50
                      ? "bg-blue-100 text-blue-900 border border-blue-200"
                      : "bg-amber-100 text-amber-900 border border-amber-200"
                  }`}
                >
                  {completion.percentage === 100
                    ? "100% Ready to Submit"
                    : completion.percentage >= 50
                    ? "Substantially Ready"
                    : "Preparation Required"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {completion.mandatoryCompleted} of {completion.mandatoryTotal} mandatory documents marked ready.
              </p>
            </div>
          </div>

          {/* Quick Progress Buttons */}
          <div className="flex items-center space-x-2.5 flex-shrink-0 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleSaveProgress}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold transition flex items-center space-x-1.5 shadow-xs"
            >
              <Save className="w-3.5 h-3.5 text-saarthi-green" />
              <span>{showSavedToast ? "Saved ✓" : "Save Progress"}</span>
            </button>

            <button
              type="button"
              onClick={handleMarkAll}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-saarthi-navy text-xs font-bold transition"
            >
              Mark All Ready
            </button>

            <button
              type="button"
              onClick={handleProceedToTracking}
              className="px-5 py-2.5 rounded-xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-black transition shadow-md flex items-center space-x-1.5"
            >
              <span>Track Application</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs: Documents vs Application Steps */}
        <div className="flex items-center space-x-2 mb-6 border-b border-slate-200 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab("documents")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center space-x-2 ${
              activeTab === "documents"
                ? "bg-saarthi-navy text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Document Checklist ({personalizedList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("steps")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center space-x-2 ${
              activeTab === "steps"
                ? "bg-saarthi-navy text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Application Process Steps ({(currentScheme.applicationSteps || []).length})</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: DOCUMENT CHECKLIST VIEW                               */}
        {/* ============================================================ */}
        {activeTab === "documents" && (
          <div className="space-y-6">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 text-[11px] font-bold mr-1">Filter Category:</span>
              {DOCUMENT_CATEGORIES.map((cat) => {
                const count =
                  cat.id === "all"
                    ? personalizedList.length
                    : personalizedList.filter((d) => d.category === cat.id).length;

                if (count === 0 && cat.id !== "all") return null;

                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center space-x-1.5 ${
                      isSelected
                        ? "bg-saarthi-green text-white shadow-xs"
                        : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? "bg-emerald-800 text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Checklist Items List */}
            <div className="space-y-3">
              {filteredList.map((doc) => {
                const isChecked = !!progressMap[doc.id];

                return (
                  <div
                    key={doc.id}
                    onClick={() => handleToggleDoc(doc.id)}
                    className={`p-4 sm:p-5 rounded-3xl border transition-all duration-200 cursor-pointer flex items-start justify-between gap-3 ${
                      isChecked
                        ? "bg-emerald-50/50 border-emerald-300 shadow-2xs"
                        : "bg-white border-slate-200 shadow-sm hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start space-x-3.5">
                      {/* Checkbox Icon */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleDoc(doc.id);
                        }}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
                          isChecked
                            ? "bg-saarthi-green text-white"
                            : "border-2 border-slate-300 hover:border-slate-400 bg-white"
                        }`}
                        aria-label={isChecked ? "Mark incomplete" : "Mark complete"}
                      >
                        {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                      </button>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4
                            className={`text-sm sm:text-base font-black ${
                              isChecked ? "text-emerald-950 line-through opacity-80" : "text-saarthi-navy"
                            }`}
                          >
                            {doc.name}
                          </h4>

                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {doc.categoryLabel}
                          </span>

                          {doc.mandatory ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                              Mandatory
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                              Optional / Quota
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                          {doc.description}
                        </p>

                        {/* Personalized Context Pill */}
                        {doc.personalizedNote && (
                          <div className="pt-1 flex items-center space-x-1.5 text-[11px] text-emerald-800 font-semibold">
                            <Sparkles className="w-3.5 h-3.5 text-saarthi-green flex-shrink-0" />
                            <span>{doc.personalizedNote}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0 self-center hidden sm:block">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-xl transition ${
                          isChecked
                            ? "bg-emerald-100 text-emerald-900"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {isChecked ? "Ready ✓" : "Click to mark ready"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredList.length === 0 && (
              <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs">
                No documents found for this category filter.
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: APPLICATION PROCESS STEPS ROADMAP                     */}
        {/* ============================================================ */}
        {activeTab === "steps" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-black text-saarthi-navy">
                Step-by-Step Official Application Roadmap
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Standard processing workflow mandated for {currentScheme.name}.
              </p>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200 before:hidden sm:before:block">
              {(currentScheme.applicationSteps || []).map((stepItem, idx) => (
                <div key={idx} className="relative flex flex-col sm:flex-row items-start gap-4">
                  {/* Step Number Circle */}
                  <div className="w-10 h-10 rounded-2xl bg-saarthi-navy text-white flex items-center justify-center font-black text-sm flex-shrink-0 z-10 shadow-sm">
                    {stepItem.step || idx + 1}
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm font-black text-saarthi-navy">
                        {stepItem.title}
                      </h4>

                      <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-500">
                        {stepItem.timeframe && (
                          <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-white border border-slate-200">
                            <Clock className="w-3 h-3 text-amber-500" />
                            <span>{stepItem.timeframe}</span>
                          </span>
                        )}

                        {stepItem.actionLocation && (
                          <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-white border border-slate-200 text-saarthi-navy">
                            <MapPin className="w-3 h-3 text-saarthi-green" />
                            <span>{stepItem.actionLocation}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {stepItem.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Official Source link */}
            {currentScheme.officialSourceUrl && (
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <span className="text-slate-500">
                  Ready to apply online? Check the official portal:
                </span>
                <a
                  href={currentScheme.officialSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-saarthi-navy hover:bg-saarthi-navy-light text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
                >
                  <span>Visit Official Portal ({currentScheme.shortName || "Portal"})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-saarthi-navy via-slate-900 to-saarthi-navy text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
              Next Step in Your Entrepreneur Journey
            </span>
            <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
              Proceed to Application Tracking
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Track your loan application through all 6 stages (Details Submitted → Scheme Selected → Documents Prepared → Application Submitted → Under Review → Completed).
            </p>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            <button
              type="button"
              onClick={() => navigate("/partners")}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20"
            >
              Find CSC Partner
            </button>

            <button
              type="button"
              onClick={handleProceedToTracking}
              className="px-6 py-3 rounded-2xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-black transition shadow-md flex items-center space-x-2"
            >
              <span>Track Application (6 Stages)</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

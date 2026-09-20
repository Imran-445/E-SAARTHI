import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Bookmark,
  MapPin,
  User,
  Settings,
  LogOut,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  Building2,
  Calculator,
  Search,
  PhoneCall,
  ExternalLink,
  ChevronRight,
  Share2,
  Trash2,
  Award,
  Bell,
  Sliders,
  RefreshCw,
  Coins
} from "lucide-react";
import {
  getCurrentUser,
  logout,
  updateUserProfile,
  calculateProfileCompletion,
  getSavedSchemes,
  toggleSaveScheme,
  getSavedPartners,
  toggleSavePartner,
  DEMO_ACCOUNTS
} from "../services/authService";
import { schemes as allSchemes } from "../data/schemes";
import { fallbackPartners } from "../services/api";
import { getAllApplications, getActiveApplication } from "../services/applicationService";
import { clientSideMatch } from "../services/api";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { tab: routeTab } = useParams();

  // Active Tab state (default to "dashboard" overview)
  const [activeTab, setActiveTab] = useState(routeTab || "dashboard");

  // User auth state
  const [user, setUser] = useState(getCurrentUser());
  const [savedSchemes, setSavedSchemes] = useState(getSavedSchemes());
  const [savedPartners, setSavedPartners] = useState(getSavedPartners());
  const [applications, setApplications] = useState(getAllApplications());
  const [activeApp, setActiveApp] = useState(getActiveApplication());

  // Edit Profile Form State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState(user || {});
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  // Settings State
  const [preferredLang, setPreferredLang] = useState("English");
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);

  // Sync tab with URL param if it changes
  useEffect(() => {
    if (routeTab) {
      setActiveTab(routeTab);
    }
  }, [routeTab]);

  // Listen to auth changes
  useEffect(() => {
    const handleAuthChange = (e) => {
      setUser(e.detail);
      if (e.detail) {
        setProfileForm(e.detail);
      }
    };
    window.addEventListener("saarthi_auth_change", handleAuthChange);
    return () => window.removeEventListener("saarthi_auth_change", handleAuthChange);
  }, []);

  // Sync saved schemes
  useEffect(() => {
    const handleSchemesChange = (e) => setSavedSchemes(e.detail);
    window.addEventListener("saarthi_saved_schemes_changed", handleSchemesChange);
    return () => window.removeEventListener("saarthi_saved_schemes_changed", handleSchemesChange);
  }, []);

  // Sync saved partners
  useEffect(() => {
    const handlePartnersChange = (e) => setSavedPartners(e.detail);
    window.addEventListener("saarthi_saved_partners_changed", handlePartnersChange);
    return () => window.removeEventListener("saarthi_saved_partners_changed", handlePartnersChange);
  }, []);

  // Compute profile completion metrics
  const profileCompletion = useMemo(() => {
    return calculateProfileCompletion(user);
  }, [user]);

  // Compute matched schemes for this user
  const matchedSchemes = useMemo(() => {
    if (!user) return allSchemes.slice(0, 4);
    const mockProfile = {
      socialCategory: user.socialCategory,
      gender: user.gender,
      area: user.area || "urban",
      businessType: user.businessType,
      annualIncome: user.annualIncome,
      loanAmount: user.loanAmount,
      loanPurpose: user.loanPurpose
    };
    const results = clientSideMatch(mockProfile);
    return results && results.length > 0 ? results : allSchemes;
  }, [user]);

  // Recent / Best Scheme Recommendation
  const topRecommendedScheme = useMemo(() => {
    if (matchedSchemes && matchedSchemes.length > 0) {
      return matchedSchemes[0];
    }
    return allSchemes[0];
  }, [matchedSchemes]);

  // Handle Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Handle Save Profile
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = updateUserProfile(profileForm);
    setUser(updated);
    setIsEditingProfile(false);
    setProfileSaveSuccess(true);
    setTimeout(() => setProfileSaveSuccess(false), 3000);
  };

  // Format INR currency
  const formatAmount = (num) => {
    if (!num) return "₹0";
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1).replace(/\.0$/, "")} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1).replace(/\.0$/, "")} Lakh`;
    return `₹${num.toLocaleString("en-IN")}`;
  };

  // Fallback state if user is somehow null (e.g. direct URL visit without login)
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 text-left">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-lg text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-saarthi-navy">Citizen Sign-In Required</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Please log in or select a demo citizen persona to access the personalized Saarthi User Dashboard.
          </p>
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                const demo = DEMO_ACCOUNTS[0];
                updateUserProfile(demo);
                setUser(demo);
              }}
              className="w-full py-3 rounded-2xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-black transition"
            >
              Sign In as Ramesh Kumar (Demo Street Vendor)
            </button>
            <Link
              to="/login"
              className="w-full py-2.5 rounded-2xl border border-slate-300 text-slate-700 text-xs font-bold block hover:bg-slate-50 transition"
            >
              Go to Citizen Login Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Sidebar navigation links
  const sidebarLinks = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    {
      id: "applications",
      label: "My Applications",
      icon: FileText,
      badge: applications.length
    },
    {
      id: "saved-schemes",
      label: "Saved Schemes",
      icon: Bookmark,
      badge: savedSchemes.length
    },
    {
      id: "saved-partners",
      label: "Saved Partners",
      icon: MapPin,
      badge: savedPartners.length
    },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-left">
      {/* Top Banner Ribbon */}
      <div className="tricolor-border-top" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-4">
            {/* Avatar Circle */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-saarthi-navy to-saarthi-navy-light text-white font-black text-xl flex items-center justify-center shadow-md flex-shrink-0 border-2 border-amber-400/40">
              {user.avatarInitial || "RK"}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-saarthi-navy">
                  Namaste, {user.name}!
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Verified Citizen
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
                <span>{user.businessType || "Micro Enterprise"}</span>
                <span>•</span>
                <span>{user.socialCategory} Category</span>
                <span>•</span>
                <span>{user.area === "rural" ? "Rural Area" : "Urban Area"}</span>
                <span>•</span>
                <span className="text-slate-400">Mobile: +91 {user.mobile}</span>
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center space-x-2.5 self-start md:self-auto">
            <button
              type="button"
              onClick={() => {
                setActiveTab("profile");
                setIsEditingProfile(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center space-x-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition flex items-center space-x-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid with Left Sidebar and Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ============================================================ */}
          {/* LEFT SIDEBAR NAVIGATION                                       */}
          {/* ============================================================ */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm sticky top-28">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2 block">
                Citizen Menu
              </span>

              <nav className="space-y-1">
                {sidebarLinks.map((item) => {
                  const Icon = item.icon;
                  const isSelected = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full px-3.5 py-3 rounded-2xl text-xs font-bold transition flex items-center justify-between group ${
                        isSelected
                          ? "bg-saarthi-navy text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100 hover:text-saarthi-navy"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon
                          className={`w-4 h-4 ${
                            isSelected
                              ? "text-amber-400"
                              : "text-slate-400 group-hover:text-saarthi-navy"
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>

                      {item.badge !== undefined && (
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            isSelected
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Profile Readiness Callout */}
              <div className="mt-6 pt-4 border-t border-slate-100 px-2">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-saarthi-navy">Profile Readiness</span>
                  <span className="font-black text-saarthi-green">
                    {profileCompletion.percentage}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-saarthi-green rounded-full transition-all duration-500"
                    style={{ width: `${profileCompletion.percentage}%` }}
                  />
                </div>
                {profileCompletion.missingFields.length > 0 ? (
                  <p className="text-[10px] text-slate-400 mt-2">
                    Tip: Complete {profileCompletion.missingFields[0]} for enhanced priority.
                  </p>
                ) : (
                  <p className="text-[10px] text-emerald-600 font-bold mt-2 flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Profile fully verified
                  </p>
                )}
              </div>
            </div>
          </aside>

          {/* ============================================================ */}
          {/* MAIN CONTENT AREA                                            */}
          {/* ============================================================ */}
          <main className="lg:col-span-9 space-y-8">
            {/* ========================================================== */}
            {/* TAB 1: OVERVIEW DASHBOARD                                  */}
            {/* ========================================================== */}
            {activeTab === "dashboard" && (
              <div className="space-y-8 animate-fadeIn">
                {/* 5 Key Metric Counter Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                  {/* Metric 1: Recommended Schemes */}
                  <div
                    onClick={() => navigate("/recommended-scheme")}
                    className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm hover:border-saarthi-green cursor-pointer transition flex flex-col justify-between"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-saarthi-green flex items-center justify-center mb-3">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-2xl font-black text-saarthi-navy block">
                        {matchedSchemes.length}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        Recommended Schemes
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 mt-2 block">
                      View Top Match →
                    </span>
                  </div>

                  {/* Metric 2: Applications Count */}
                  <div
                    onClick={() => setActiveTab("applications")}
                    className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm hover:border-saarthi-navy cursor-pointer transition flex flex-col justify-between"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-2xl font-black text-saarthi-navy block">
                        {applications.length}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        Active Applications
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-blue-700 mt-2 block">
                      Track Status →
                    </span>
                  </div>

                  {/* Metric 3: Saved Schemes */}
                  <div
                    onClick={() => setActiveTab("saved-schemes")}
                    className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm hover:border-amber-500 cursor-pointer transition flex flex-col justify-between"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                      <Bookmark className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-2xl font-black text-saarthi-navy block">
                        {savedSchemes.length}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        Saved Schemes
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-700 mt-2 block">
                      View Bookmarks →
                    </span>
                  </div>

                  {/* Metric 4: Saved Partners */}
                  <div
                    onClick={() => setActiveTab("saved-partners")}
                    className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm hover:border-purple-500 cursor-pointer transition flex flex-col justify-between"
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-2xl font-black text-saarthi-navy block">
                        {savedPartners.length}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        Saved Partners
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-purple-700 mt-2 block">
                      View Centers →
                    </span>
                  </div>

                  {/* Metric 5: Profile Completion */}
                  <div
                    onClick={() => setActiveTab("profile")}
                    className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm hover:border-saarthi-green cursor-pointer transition flex flex-col justify-between col-span-2 sm:col-span-1"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-saarthi-green flex items-center justify-center mb-3">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-2xl font-black text-saarthi-navy block">
                        {profileCompletion.percentage}%
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        Profile Readiness
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 mt-2 block">
                      {profileCompletion.percentage === 100 ? "100% Ready" : "Complete Details →"}
                    </span>
                  </div>
                </div>

                {/* ====================================================== */}
                {/* HERO: RECENT SCHEME RECOMMENDATION                      */}
                {/* ====================================================== */}
                <div className="bg-gradient-to-br from-white via-white to-emerald-50/40 rounded-3xl p-6 sm:p-7 border border-emerald-200 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 flex items-center space-x-1">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>Recent Top Recommendation</span>
                      </span>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        {topRecommendedScheme.matchScore || 100}% Match Score
                      </span>
                    </div>

                    <Link
                      to="/recommended-scheme"
                      className="text-xs font-bold text-saarthi-green hover:underline flex items-center space-x-1"
                    >
                      <span>View Full Recommendation Analysis</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 space-y-3">
                      <h2 className="text-xl sm:text-2xl font-black text-saarthi-navy">
                        {topRecommendedScheme.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {topRecommendedScheme.shortDescription}
                      </p>

                      {/* Quick financial tags */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                        <div className="p-3 rounded-2xl bg-white border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">
                            Loan Envelope
                          </span>
                          <strong className="text-sm font-black text-saarthi-navy">
                            Up to {formatAmount(topRecommendedScheme.maxLoanAmount || topRecommendedScheme.maxLoan)}
                          </strong>
                        </div>
                        <div className="p-3 rounded-2xl bg-white border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">
                            Interest Rate
                          </span>
                          <strong className="text-sm font-black text-emerald-700">
                            {topRecommendedScheme.interestRate || "Subsidized"}
                          </strong>
                        </div>
                        <div className="p-3 rounded-2xl bg-white border border-slate-200 col-span-2 sm:col-span-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">
                            Subsidy / Benefit
                          </span>
                          <strong className="text-xs font-black text-saarthi-navy truncate block">
                            {topRecommendedScheme.subsidy || topRecommendedScheme.keyBenefit}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="lg:col-span-4 flex flex-col justify-center space-y-2.5">
                      <Link
                        to={`/document-guidance?schemeId=${topRecommendedScheme.id}`}
                        className="w-full py-3 px-4 rounded-2xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-black transition shadow flex items-center justify-center space-x-2 text-center"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Prepare Documents & Apply</span>
                      </Link>

                      <Link
                        to={`/schemes/${topRecommendedScheme.id}`}
                        className="w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold transition flex items-center justify-center space-x-2 text-center"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        <span>View Scheme Dossier</span>
                      </Link>

                      <Link
                        to={`/calculator?amount=${topRecommendedScheme.maxLoanAmount || 50000}`}
                        className="w-full py-2.5 px-4 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold transition flex items-center justify-center space-x-2 text-center"
                      >
                        <Calculator className="w-3.5 h-3.5 text-blue-700" />
                        <span>Calculate EMI</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* ====================================================== */}
                {/* 4 QUICK ACTIONS SECTION                                */}
                {/* ====================================================== */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-black text-saarthi-navy flex items-center space-x-2">
                      <Sliders className="w-4 h-4 text-saarthi-green" />
                      <span>Quick Actions</span>
                    </h3>
                    <span className="text-xs text-slate-400">Direct Portal Tools</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Action 1: Find Another Scheme */}
                    <Link
                      to="/scheme-finder"
                      className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-saarthi-green hover:shadow-md transition group"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-saarthi-green flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                        <Search className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-black text-saarthi-navy mb-1 group-hover:text-saarthi-green transition-colors">
                        Find Another Scheme
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Re-evaluate eligibility with modified loan amount or business activities.
                      </p>
                    </Link>

                    {/* Action 2: Calculate EMI */}
                    <Link
                      to="/calculator"
                      className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition group"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                        <Calculator className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-black text-saarthi-navy mb-1 group-hover:text-blue-700 transition-colors">
                        Calculate EMI
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Simulate repayment schedules, moratorium terms, and interest subvention.
                      </p>
                    </Link>

                    {/* Action 3: Find Nearby Partner */}
                    <Link
                      to="/partners"
                      className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-purple-500 hover:shadow-md transition group"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-black text-saarthi-navy mb-1 group-hover:text-purple-700 transition-colors">
                        Find Nearby Partner
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Locate verified CSC centers and Bank Mitras for biometric e-filing.
                      </p>
                    </Link>

                    {/* Action 4: View Application */}
                    <Link
                      to="/application-tracking"
                      className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-amber-500 hover:shadow-md transition group"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                        <Clock className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-black text-saarthi-navy mb-1 group-hover:text-amber-700 transition-colors">
                        View Application
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Track your 6-stage application lifecycle and preview next nodal steps.
                      </p>
                    </Link>
                  </div>
                </div>

                {/* Recent Application Quick Spotlight */}
                {activeApp && (
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Active Application Dossier
                        </span>
                        <h3 className="text-base font-black text-saarthi-navy mt-0.5">
                          {activeApp.schemeName}
                        </h3>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-900 border border-blue-200">
                        {activeApp.currentStatus}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                      <div className="p-3 bg-slate-50 rounded-2xl">
                        <span className="text-slate-400 text-[10px] block">Application ID</span>
                        <strong className="font-bold text-saarthi-navy">{activeApp.id}</strong>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-2xl">
                        <span className="text-slate-400 text-[10px] block">Requested Amount</span>
                        <strong className="font-bold text-saarthi-navy">
                          ₹{(activeApp.requestedAmount || 0).toLocaleString("en-IN")}
                        </strong>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-2xl">
                        <span className="text-slate-400 text-[10px] block">Submission Date</span>
                        <strong className="font-bold text-slate-700">{activeApp.submissionDate}</strong>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-2xl">
                        <span className="text-slate-400 text-[10px] block">Document Readiness</span>
                        <strong className="font-bold text-saarthi-green">
                          {activeApp.documentCompletion}%
                        </strong>
                      </div>
                    </div>

                    <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start space-x-2">
                      <Clock className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Next Action: </strong>
                        <span>{activeApp.nextAction}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================== */}
            {/* TAB 2: MY APPLICATIONS                                     */}
            {/* ========================================================== */}
            {activeTab === "applications" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-saarthi-navy">My Applications</h2>
                    <p className="text-xs text-slate-500">
                      Track submissions across the 6 prototype application lifecycle stages.
                    </p>
                  </div>
                  <Link
                    to="/application-tracking"
                    className="px-4 py-2 rounded-xl bg-saarthi-navy text-white text-xs font-bold hover:bg-saarthi-navy-light transition flex items-center space-x-1.5"
                  >
                    <span>Open Tracking Simulator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-slate-300 transition space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-2xl bg-slate-100 text-saarthi-navy flex items-center justify-center font-bold">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                              ID: {app.id}
                            </span>
                            <h3 className="text-base font-black text-saarthi-navy">
                              {app.schemeName}
                            </h3>
                          </div>
                        </div>

                        <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-blue-800 border border-blue-200">
                          Stage {app.statusStage || 3}/6: {app.currentStatus}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div>
                          <span className="text-slate-400 text-[10px] block">Applicant</span>
                          <strong className="font-bold text-slate-800">{user.name}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block">Loan Amount</span>
                          <strong className="font-bold text-slate-800">
                            ₹{(app.requestedAmount || 0).toLocaleString("en-IN")}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block">Nodal Agency</span>
                          <strong className="font-bold text-slate-800 truncate block">
                            {app.nodalAgency}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block">Submitted</span>
                          <strong className="font-bold text-slate-800">{app.submissionDate}</strong>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start space-x-2">
                        <Clock className="w-4 h-4 text-saarthi-green flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Next Step: </strong> {app.nextAction}
                        </span>
                      </div>

                      <div className="flex items-center justify-end space-x-2 pt-1">
                        <Link
                          to={`/document-guidance?schemeId=${app.schemeId}`}
                          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                        >
                          View Checklist
                        </Link>
                        <Link
                          to="/application-tracking"
                          className="px-4 py-2 rounded-xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-bold transition flex items-center space-x-1"
                        >
                          <span>Track Full Lifecycle</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* TAB 3: SAVED SCHEMES                                       */}
            {/* ========================================================== */}
            {activeTab === "saved-schemes" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-saarthi-navy">Saved Schemes</h2>
                    <p className="text-xs text-slate-500">
                      Bookmarked government credit schemes saved for quick reference.
                    </p>
                  </div>
                  <Link
                    to="/schemes"
                    className="px-4 py-2 rounded-xl bg-saarthi-green text-white text-xs font-bold hover:bg-saarthi-green-hover transition flex items-center space-x-1"
                  >
                    <span>Browse All Schemes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {savedSchemes.length === 0 ? (
                  <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-3">
                    <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
                    <h3 className="text-base font-bold text-saarthi-navy">No Saved Schemes Yet</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Click the "Save Scheme" bookmark button on any scheme card to save it here.
                    </p>
                    <Link
                      to="/schemes"
                      className="px-4 py-2 rounded-xl bg-saarthi-navy text-white text-xs font-bold inline-block"
                    >
                      Explore Schemes
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedSchemes.map((schemeId) => {
                      const scheme = allSchemes.find((s) => s.id === schemeId);
                      if (!scheme) return null;

                      return (
                        <div
                          key={scheme.id}
                          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-slate-300 transition flex flex-col justify-between space-y-4"
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                                {scheme.category}
                              </span>
                              <button
                                type="button"
                                onClick={() => toggleSaveScheme(scheme.id)}
                                className="text-slate-400 hover:text-rose-600 transition"
                                title="Remove Bookmark"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <h3 className="text-base font-black text-saarthi-navy">
                              {scheme.shortName || scheme.name}
                            </h3>
                            <p className="text-xs text-slate-500 line-clamp-2">
                              {scheme.shortDescription}
                            </p>
                          </div>

                          <div className="p-3 bg-slate-50 rounded-2xl text-xs space-y-1">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Funding:</span>
                              <strong className="text-slate-800">
                                Up to {formatAmount(scheme.maxLoanAmount || scheme.maxLoan)}
                              </strong>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Interest:</span>
                              <strong className="text-emerald-700">
                                {scheme.interestRate || "Subsidized"}
                              </strong>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                            <Link
                              to={`/schemes/${scheme.id}`}
                              className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold text-center transition"
                            >
                              Details
                            </Link>
                            <Link
                              to={`/document-guidance?schemeId=${scheme.id}`}
                              className="py-2 px-3 rounded-xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-bold text-center transition"
                            >
                              Checklist
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================== */}
            {/* TAB 4: SAVED PARTNERS                                      */}
            {/* ========================================================== */}
            {activeTab === "saved-partners" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-saarthi-navy">Saved Channel Partners</h2>
                    <p className="text-xs text-slate-500">
                      Nearby Common Service Centers (CSCs) and Bank Mitras bookmarked for physical assistance.
                    </p>
                  </div>
                  <Link
                    to="/partners"
                    className="px-4 py-2 rounded-xl bg-saarthi-green text-white text-xs font-bold hover:bg-saarthi-green-hover transition flex items-center space-x-1"
                  >
                    <span>Find More Centers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {savedPartners.length === 0 ? (
                  <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-3">
                    <MapPin className="w-10 h-10 text-slate-300 mx-auto" />
                    <h3 className="text-base font-bold text-saarthi-navy">No Saved Partners</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Save nearby CSC centers or Bank Mitras from the partner locator page.
                    </p>
                    <Link
                      to="/partners"
                      className="px-4 py-2 rounded-xl bg-saarthi-navy text-white text-xs font-bold inline-block"
                    >
                      Browse Center Directory
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedPartners.map((partnerId) => {
                      const p = fallbackPartners.find((item) => item.id === partnerId);
                      if (!p) return null;

                      return (
                        <div
                          key={p.id}
                          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-slate-300 transition space-y-4"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md">
                                {p.type}
                              </span>
                              <h3 className="text-base font-black text-saarthi-navy mt-1">
                                {p.name}
                              </h3>
                              <p className="text-xs text-slate-500">{p.contactPerson}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => toggleSavePartner(p.id)}
                              className="text-slate-400 hover:text-rose-600 transition"
                              title="Remove Bookmark"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed">
                            📍 {p.address}
                          </p>

                          <div className="p-3 bg-slate-50 rounded-2xl text-xs space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 block">
                              Assistance Services:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {p.servicesOffered.slice(0, 3).map((s, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-600"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 pt-1">
                            <a
                              href={`tel:${p.phone}`}
                              className="flex-1 py-2 px-3 rounded-xl bg-saarthi-navy hover:bg-saarthi-navy-light text-white text-xs font-bold text-center transition flex items-center justify-center space-x-1"
                            >
                              <PhoneCall className="w-3 h-3" />
                              <span>{p.phone}</span>
                            </a>
                            <Link
                              to="/partners"
                              className="py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
                            >
                              View on Map
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================== */}
            {/* TAB 5: PROFILE MANAGEMENT                                  */}
            {/* ========================================================== */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-black text-saarthi-navy">Citizen Profile</h2>
                    <p className="text-xs text-slate-500">
                      Manage demographic and enterprise parameters that power your AI recommendations.
                    </p>
                  </div>

                  {!isEditingProfile && (
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(true)}
                      className="px-4 py-2 rounded-xl bg-saarthi-green text-white text-xs font-bold hover:bg-saarthi-green-hover transition"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                {profileSaveSuccess && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 rounded-2xl flex items-center space-x-2 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Profile saved! AI scheme matches have been recalculated.</span>
                  </div>
                )}

                {isEditingProfile ? (
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-saarthi-navy mb-1 uppercase">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileForm.name || ""}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-saarthi-navy mb-1 uppercase">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          value={profileForm.mobile || ""}
                          disabled
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-500 font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-saarthi-navy mb-1 uppercase">
                          Social Category
                        </label>
                        <select
                          value={profileForm.socialCategory || "General"}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, socialCategory: e.target.value })
                          }
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                        >
                          <option value="General">General / Unreserved</option>
                          <option value="OBC">Other Backward Classes (OBC)</option>
                          <option value="SC">Scheduled Caste (SC)</option>
                          <option value="ST">Scheduled Tribe (ST)</option>
                          <option value="Minority">Minority</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-saarthi-navy mb-1 uppercase">
                          Gender
                        </label>
                        <select
                          value={profileForm.gender || "Male"}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, gender: e.target.value })
                          }
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Transgender">Transgender</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-saarthi-navy mb-1 uppercase">
                          Area Type
                        </label>
                        <select
                          value={profileForm.area || "urban"}
                          onChange={(e) => setProfileForm({ ...profileForm, area: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                        >
                          <option value="urban">Urban</option>
                          <option value="rural">Rural</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-saarthi-navy mb-1 uppercase">
                          Business Type / Sector
                        </label>
                        <select
                          value={profileForm.businessType || "Street Vendor"}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, businessType: e.target.value })
                          }
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                        >
                          <option value="Street Vendor">Street Vendor / Urban Micro-Seller</option>
                          <option value="Traditional Artisan">Traditional Artisan / Potter / Weaver</option>
                          <option value="Micro Enterprise">Micro Enterprise / Retail</option>
                          <option value="Dairy / Livestock">Dairy / Livestock</option>
                          <option value="Manufacturing / Food">Manufacturing / Food Processing</option>
                          <option value="Services / Repair">Services / Repair</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-saarthi-navy mb-1 uppercase">
                          Business Name / Trade
                        </label>
                        <input
                          type="text"
                          value={profileForm.businessName || ""}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, businessName: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                          placeholder="e.g. Ramesh Juices & Snacks"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-saarthi-navy mb-1 uppercase">
                          Annual Family Income (₹)
                        </label>
                        <input
                          type="number"
                          value={profileForm.annualIncome || 180000}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              annualIncome: Number(e.target.value)
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-saarthi-navy mb-1 uppercase">
                          Loan Requirement (₹)
                        </label>
                        <input
                          type="number"
                          value={profileForm.loanAmount || 50000}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, loanAmount: Number(e.target.value) })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-3">
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-black transition"
                      >
                        Save Profile Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Full Name
                      </span>
                      <strong className="text-sm text-saarthi-navy block mt-0.5">
                        {user.name}
                      </strong>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Mobile Number
                      </span>
                      <strong className="text-sm text-saarthi-navy block mt-0.5">
                        +91 {user.mobile}
                      </strong>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Social Category
                      </span>
                      <strong className="text-sm text-saarthi-navy block mt-0.5">
                        {user.socialCategory}
                      </strong>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Gender & Location
                      </span>
                      <strong className="text-sm text-saarthi-navy block mt-0.5">
                        {user.gender} • {user.area === "rural" ? "Rural Area" : "Urban Area"}
                      </strong>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Business Occupation
                      </span>
                      <strong className="text-sm text-saarthi-navy block mt-0.5">
                        {user.businessType}
                      </strong>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Enterprise Name
                      </span>
                      <strong className="text-sm text-saarthi-navy block mt-0.5">
                        {user.businessName || "Not Provided"}
                      </strong>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Annual Income
                      </span>
                      <strong className="text-sm text-saarthi-navy block mt-0.5">
                        ₹{(user.annualIncome || 0).toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Loan Requirement
                      </span>
                      <strong className="text-sm text-emerald-800 block mt-0.5">
                        ₹{(user.loanAmount || 0).toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Aadhaar Linked Status
                      </span>
                      <strong className="text-xs font-bold text-emerald-700 flex items-center mt-1">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Linked to Mobile & DBT
                      </strong>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================== */}
            {/* TAB 6: SETTINGS                                            */}
            {/* ========================================================== */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-black text-saarthi-navy">Citizen Settings</h2>
                  <p className="text-xs text-slate-500">
                    Preferences, language localization, and prototype data management.
                  </p>
                </div>

                <div className="space-y-6 text-xs">
                  {/* Vernacular Language Selector */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <label className="font-bold text-saarthi-navy uppercase tracking-wider block">
                      Preferred Language (Vernacular Support)
                    </label>
                    <p className="text-slate-500 text-[11px]">
                      Select your preferred language for audio voice assistance and scheme guidance.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                      {["English", "हिन्दी (Hindi)", "தமிழ் (Tamil)", "বাংলা (Bengali)", "తెలుగు (Telugu)", "मराठी (Marathi)"].map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setPreferredLang(lang.split(" ")[0])}
                          className={`py-2 px-3 rounded-xl border font-bold transition text-left flex items-center justify-between ${
                            preferredLang.startsWith(lang.split(" ")[0])
                              ? "bg-saarthi-green text-white border-saarthi-green"
                              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <span>{lang}</span>
                          {preferredLang.startsWith(lang.split(" ")[0]) && <span>✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notification Toggles */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <span className="font-bold text-saarthi-navy uppercase tracking-wider block">
                      Prototype Notification Alerts
                    </span>
                    <div className="flex items-center justify-between py-1">
                      <div>
                        <strong className="text-slate-800 block">SMS Loan Stage Updates</strong>
                        <span className="text-slate-500 text-[11px]">
                          Simulate SMS alerts whenever your application changes status.
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={smsAlerts}
                        onChange={(e) => setSmsAlerts(e.target.checked)}
                        className="w-4 h-4 text-saarthi-green rounded border-slate-300"
                      />
                    </div>
                    <div className="flex items-center justify-between py-1 border-t border-slate-200 pt-2">
                      <div>
                        <strong className="text-slate-800 block">WhatsApp Handholding Alerts</strong>
                        <span className="text-slate-500 text-[11px]">
                          Receive scheme subsidy alerts and CSC camp invites on WhatsApp.
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={whatsappAlerts}
                        onChange={(e) => setWhatsappAlerts(e.target.checked)}
                        className="w-4 h-4 text-saarthi-green rounded border-slate-300"
                      />
                    </div>
                  </div>

                  {/* Prototype Data Controls */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 text-amber-900">
                    <span className="font-bold uppercase tracking-wider block text-xs">
                      Prototype Session Management
                    </span>
                    <p className="text-[11px] leading-relaxed">
                      Reset saved bookmarks or switch to another demo persona for jury evaluation.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          localStorage.removeItem("saarthi_saved_schemes");
                          localStorage.removeItem("saarthi_saved_partners");
                          setSavedSchemes(["pm-svanidhi", "pm-vishwakarma"]);
                          setSavedPartners(["csc-001"]);
                          alert("Saved items reset to default demo state.");
                        }}
                        className="px-3 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold hover:bg-amber-100 transition"
                      >
                        Reset Saved Bookmarks
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const demo = DEMO_ACCOUNTS[1]; // Sunita Devi
                          updateUserProfile(demo);
                          setUser(demo);
                        }}
                        className="px-3 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold hover:bg-amber-100 transition"
                      >
                        Switch to Sunita Devi (Weaver)
                      </button>
                    </div>
                  </div>

                  {/* Sign Out Button */}
                  <div className="pt-4 border-t border-slate-200 flex justify-end">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition flex items-center space-x-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out from Saarthi</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  LayoutDashboard,
  FileSpreadsheet,
  Users,
  Building2,
  FileText,
  BarChart3,
  Settings,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  Search,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  IndianRupee,
  ExternalLink,
  Award,
  AlertCircle,
  RefreshCw,
  PhoneCall,
  Sliders,
  Check,
  Eye
} from "lucide-react";
import { schemes as allSchemes } from "../data/schemes";
import { fallbackPartners } from "../services/api";

// Mock Analytics Data
const MOCK_ANALYTICS = {
  totalUsers: {
    value: "24,580",
    change: "+14.2%",
    isPositive: true,
    subtext: "16,890 verified Aadhaar profiles"
  },
  schemeRecommendations: {
    value: "48,920",
    change: "+22.5%",
    isPositive: true,
    subtext: "Avg. 2.1 scheme matches per citizen"
  },
  applications: {
    value: "9,340",
    change: "+8.7%",
    isPositive: true,
    subtext: "68.5% conversion from checklist"
  },
  activePartners: {
    value: "5,120",
    change: "+5.1%",
    isPositive: true,
    subtext: "Covering 740+ districts nationwide"
  }
};

// Mock Popular Schemes
const MOCK_POPULAR_SCHEMES = [
  {
    id: "pm-svanidhi",
    name: "PM SVANidhi (Street Vendors)",
    ministry: "MoHUA",
    recommendations: 16420,
    applications: 4180,
    disbursed: "₹18.5 Cr",
    approvalRate: "92%",
    tag: "High Volume",
    status: "Active"
  },
  {
    id: "pmegp",
    name: "PMEGP (Prime Minister's Employment Generation)",
    ministry: "MoMSME",
    recommendations: 12850,
    applications: 2190,
    disbursed: "₹42.8 Cr",
    approvalRate: "78%",
    tag: "Highest Subsidy (35%)",
    status: "Active"
  },
  {
    id: "pm-vishwakarma",
    name: "PM Vishwakarma (Artisans & Craftsmen)",
    ministry: "MoMSME",
    recommendations: 8940,
    applications: 1460,
    disbursed: "₹14.6 Cr",
    approvalRate: "88%",
    tag: "Collateral-Free + Toolkit",
    status: "Active"
  },
  {
    id: "mudra-shishu",
    name: "Pradhan Mantri MUDRA Yojana (Shishu & Kishore)",
    ministry: "DFS, MoF",
    recommendations: 7120,
    applications: 1040,
    disbursed: "₹19.2 Cr",
    approvalRate: "84%",
    tag: "Microcredit",
    status: "Active"
  },
  {
    id: "stand-up-india",
    name: "Stand-Up India (SC/ST & Women)",
    ministry: "DFS, MoF",
    recommendations: 3590,
    applications: 470,
    disbursed: "₹38.5 Cr",
    approvalRate: "72%",
    tag: "Greenfield MSME",
    status: "Active"
  }
];

// Mock Top Districts / Locations
const MOCK_TOP_DISTRICTS = [
  {
    district: "Lucknow",
    state: "Uttar Pradesh",
    recommendations: 3420,
    applications: 890,
    activeDesks: 86,
    ruralUrban: "45% Rural / 55% Urban",
    growth: "+18%"
  },
  {
    district: "Varanasi",
    state: "Uttar Pradesh",
    recommendations: 2890,
    applications: 740,
    activeDesks: 72,
    ruralUrban: "60% Rural / 40% Urban",
    growth: "+24%"
  },
  {
    district: "Mumbai Suburban",
    state: "Maharashtra",
    recommendations: 2650,
    applications: 680,
    activeDesks: 64,
    ruralUrban: "5% Rural / 95% Urban",
    growth: "+12%"
  },
  {
    district: "Jaipur",
    state: "Rajasthan",
    recommendations: 2310,
    applications: 590,
    activeDesks: 58,
    ruralUrban: "50% Rural / 50% Urban",
    growth: "+15%"
  },
  {
    district: "Patna",
    state: "Bihar",
    recommendations: 2180,
    applications: 560,
    activeDesks: 52,
    ruralUrban: "55% Rural / 45% Urban",
    growth: "+29%"
  },
  {
    district: "Gorakhpur",
    state: "Uttar Pradesh",
    recommendations: 1940,
    applications: 510,
    activeDesks: 48,
    ruralUrban: "70% Rural / 30% Urban",
    growth: "+21%"
  },
  {
    district: "Bengaluru Urban",
    state: "Karnataka",
    recommendations: 1870,
    applications: 490,
    activeDesks: 44,
    ruralUrban: "10% Rural / 90% Urban",
    growth: "+14%"
  }
];

// Mock Partner Utilization Metrics
const MOCK_PARTNER_UTILIZATION = [
  {
    partnerType: "Common Service Centers (CSCs)",
    totalNetwork: "3,840 Desks",
    applicationsAssisted: "6,120",
    avgTurnaroundDays: "2.4 Days",
    biometricEkycRate: "98.2%",
    activeRatio: "94%"
  },
  {
    partnerType: "Lead District Bank Mitras",
    totalNetwork: "860 Agents",
    applicationsAssisted: "2,140",
    avgTurnaroundDays: "3.8 Days",
    biometricEkycRate: "95.6%",
    activeRatio: "89%"
  },
  {
    partnerType: "District Industries Centers (DICs)",
    totalNetwork: "420 Desks",
    applicationsAssisted: "1,080",
    avgTurnaroundDays: "5.1 Days",
    biometricEkycRate: "91.4%",
    activeRatio: "86%"
  }
];

// Mock Recent Applications
const MOCK_RECENT_APPLICATIONS = [
  {
    id: "SAARTHI-2026-9281",
    applicant: "Sunita Devi",
    trade: "Traditional Textile Handloom",
    socialCategory: "SC (Women)",
    district: "Varanasi, UP",
    schemeName: "PMEGP (Rural Subsidy)",
    amount: "₹1,50,000",
    statusStage: "Under Review",
    stageNum: 5,
    timestamp: "12 mins ago"
  },
  {
    id: "SAARTHI-2026-9280",
    applicant: "Mohd. Aslam",
    trade: "Fruit & Vegetable Vendor",
    socialCategory: "Minority",
    district: "Lucknow, UP",
    schemeName: "PM SVANidhi",
    amount: "₹20,000",
    statusStage: "Application Submitted",
    stageNum: 4,
    timestamp: "28 mins ago"
  },
  {
    id: "SAARTHI-2026-9279",
    applicant: "Ravi Shankar Prajapati",
    trade: "Clay Pottery & Terracotta",
    socialCategory: "OBC Artisan",
    district: "Gorakhpur, UP",
    schemeName: "PM Vishwakarma",
    amount: "₹1,00,000",
    statusStage: "Completed",
    stageNum: 6,
    timestamp: "1 hour ago"
  },
  {
    id: "SAARTHI-2026-9278",
    applicant: "Anjali Kumari",
    trade: "Garment Tailoring Shop",
    socialCategory: "Women",
    district: "Patna, Bihar",
    schemeName: "MUDRA Shishu",
    amount: "₹50,000",
    statusStage: "Documents Prepared",
    stageNum: 3,
    timestamp: "2 hours ago"
  },
  {
    id: "SAARTHI-2026-9277",
    applicant: "Ganesh Ram",
    trade: "Carpentry & Bamboo Furniture",
    socialCategory: "ST",
    district: "Ranchi, Jharkhand",
    schemeName: "Stand-Up India",
    amount: "₹10,00,000",
    statusStage: "Under Review",
    stageNum: 5,
    timestamp: "3 hours ago"
  },
  {
    id: "SAARTHI-2026-9276",
    applicant: "Ramesh Kumar",
    trade: "Street Vending / Kirana",
    socialCategory: "OBC",
    district: "Lucknow, UP",
    schemeName: "PM SVANidhi",
    amount: "₹50,000",
    statusStage: "Scheme Selected",
    stageNum: 2,
    timestamp: "4 hours ago"
  }
];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { tab: routeTab } = useParams();

  // Navigation tabs
  const [activeTab, setActiveTab] = useState(routeTab || "dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedSchemeFilter, setSelectedSchemeFilter] = useState("all");
  const [exportNotice, setExportNotice] = useState(false);

  // Sync route param
  React.useEffect(() => {
    if (routeTab) {
      setActiveTab(routeTab);
    }
  }, [routeTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigate(`/admin/${tabId}`);
  };

  const handleSimulateExport = (type) => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 2500);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "schemes", label: "Schemes", icon: FileSpreadsheet },
    { id: "partners", label: "Channel Partners", icon: Building2 },
    { id: "users", label: "Users", icon: Users },
    { id: "applications", label: "Applications", icon: FileText },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-left">
      {/* Tricolor Header Accent for National Identity */}
      <div className="tricolor-border-top" />

      {/* Admin Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand / Admin Portal Title */}
            <div className="flex items-center space-x-3">
              <Link to="/admin" className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-saarthi-navy flex items-center justify-center text-white shadow-md border border-amber-400/30">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-black tracking-tight text-saarthi-navy">
                      Saarthi Admin
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                      Prototype Console
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-semibold leading-none">
                    National MSME Scheme Matching Platform • SIH 2026
                  </p>
                </div>
              </Link>
            </div>

            {/* Top Bar Quick Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTabChange(item.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                      isSelected
                        ? "bg-saarthi-navy text-white shadow-xs"
                        : "text-slate-600 hover:text-saarthi-navy hover:bg-slate-100"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-amber-400" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Return to Public Portal CTA */}
            <div className="flex items-center space-x-2">
              <Link
                to="/"
                className="px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition flex items-center space-x-1 shadow-2xs"
              >
                <span>Citizen Portal</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                to="/dashboard"
                className="px-3.5 py-1.5 rounded-xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-bold transition shadow-xs flex items-center space-x-1"
              >
                <span>User Dashboard</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Nav Tabs Bar */}
        <div className="lg:hidden flex items-center space-x-1 px-4 py-2 border-t border-slate-100 overflow-x-auto no-scrollbar bg-slate-50/50">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTabChange(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition flex items-center space-x-1.5 ${
                  isSelected
                    ? "bg-saarthi-navy text-white"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Prototype Export Toast Notice */}
        {exportNotice && (
          <div className="p-3.5 rounded-2xl bg-emerald-600 text-white text-xs font-bold text-center flex items-center justify-center space-x-2 animate-fadeIn shadow-md">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>Prototype report generated successfully! Simulated download initiated.</span>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 1: PROTOTYPE / MOCK ANALYTICS 4-STAT GRID            */}
        {/* ============================================================ */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-saarthi-green block">
                Executive Overview & Platform Throughput
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-saarthi-navy">
                National Program Health & Performance
              </h2>
            </div>

            <div className="flex items-center space-x-2 self-start sm:self-auto">
              <span className="text-[11px] text-slate-500 font-semibold">
                Live Mock Data Window: <strong className="text-slate-800">FY 2025–2026</strong>
              </span>
              <button
                type="button"
                onClick={() => handleSimulateExport("csv")}
                className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center space-x-1 transition shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-saarthi-navy" />
                <span>Export Metrics</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Users */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:border-saarthi-navy transition flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-saarthi-navy flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center space-x-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{MOCK_ANALYTICS.totalUsers.change}</span>
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-saarthi-navy block">
                  {MOCK_ANALYTICS.totalUsers.value}
                </span>
                <span className="text-xs font-bold text-slate-500 block mt-0.5">
                  Total Registered Users
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 border-t border-slate-100 pt-2">
                {MOCK_ANALYTICS.totalUsers.subtext}
              </p>
            </div>

            {/* Card 2: Scheme Recommendations */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:border-saarthi-green transition flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-saarthi-green flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center space-x-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{MOCK_ANALYTICS.schemeRecommendations.change}</span>
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-saarthi-navy block">
                  {MOCK_ANALYTICS.schemeRecommendations.value}
                </span>
                <span className="text-xs font-bold text-slate-500 block mt-0.5">
                  Scheme Recommendations
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 border-t border-slate-100 pt-2">
                {MOCK_ANALYTICS.schemeRecommendations.subtext}
              </p>
            </div>

            {/* Card 3: Applications */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-500 transition flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center space-x-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{MOCK_ANALYTICS.applications.change}</span>
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-saarthi-navy block">
                  {MOCK_ANALYTICS.applications.value}
                </span>
                <span className="text-xs font-bold text-slate-500 block mt-0.5">
                  Applications Processed
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 border-t border-slate-100 pt-2">
                {MOCK_ANALYTICS.applications.subtext}
              </p>
            </div>

            {/* Card 4: Active Partners */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:border-amber-500 transition flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center space-x-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{MOCK_ANALYTICS.activePartners.change}</span>
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-saarthi-navy block">
                  {MOCK_ANALYTICS.activePartners.value}
                </span>
                <span className="text-xs font-bold text-slate-500 block mt-0.5">
                  Active Channel Partners
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 border-t border-slate-100 pt-2">
                {MOCK_ANALYTICS.activePartners.subtext}
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* TAB SPECIFIC CONTENT (7 TABS)                                */}
        {/* ============================================================ */}

        {/* TAB 1: DASHBOARD OVERVIEW (CONTAINS THE 4 REQUIRED SECTIONS) */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fadeIn">
            {/* -------------------------------------------------------- */}
            {/* SECTION A: POPULAR SCHEMES                               */}
            {/* -------------------------------------------------------- */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-saarthi-navy flex items-center space-x-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <span>Popular Welfare & Credit Schemes</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Highest adoption programs across marginalized beneficiary categories.
                  </p>
                </div>

                <span className="text-xs font-bold text-saarthi-navy bg-slate-100 px-3 py-1 rounded-xl self-start sm:self-auto">
                  Catalog Rank By Demand
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-y border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Scheme Name</th>
                      <th className="py-3 px-4">Ministry</th>
                      <th className="py-3 px-4 text-right">Recommendations</th>
                      <th className="py-3 px-4 text-right">Applications</th>
                      <th className="py-3 px-4 text-right">Disbursed Volume</th>
                      <th className="py-3 px-4 text-center">Sanction Rate</th>
                      <th className="py-3 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {MOCK_POPULAR_SCHEMES.map((scheme) => (
                      <tr key={scheme.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3 px-4">
                          <div className="font-bold text-saarthi-navy text-xs">
                            {scheme.name}
                          </div>
                          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded">
                            {scheme.tag}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-600">
                          {scheme.ministry}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                          {scheme.recommendations.toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-saarthi-navy">
                          {scheme.applications.toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-black text-emerald-700">
                          {scheme.disbursed}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-black text-[11px]">
                            {scheme.approvalRate}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-700">
                            <span className="w-2 h-2 rounded-full bg-saarthi-green" />
                            <span>{scheme.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* -------------------------------------------------------- */}
            {/* SECTION B: TOP DISTRICTS / LOCATIONS & PARTNER UTILIZATION */}
            {/* -------------------------------------------------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Top Districts / Locations (7 Cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-black text-saarthi-navy flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-saarthi-green" />
                        <span>Top Districts & Jurisdictions</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        High-density engagement clusters and geographic demand distribution.
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      7 Priority Districts
                    </span>
                  </div>

                  <div className="space-y-3">
                    {MOCK_TOP_DISTRICTS.map((dist, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <strong className="font-bold text-saarthi-navy text-xs">
                              {dist.district}
                            </strong>
                            <span className="text-[11px] text-slate-500">({dist.state})</span>
                            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                              {dist.growth}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 block mt-0.5">
                            {dist.ruralUrban} • {dist.activeDesks} Active Nodal Desks
                          </span>
                        </div>

                        <div className="flex items-center space-x-4 self-end sm:self-auto font-mono">
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 block">Matches</span>
                            <strong className="text-xs text-slate-900 font-bold">
                              {dist.recommendations.toLocaleString("en-IN")}
                            </strong>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 block">Applied</span>
                            <strong className="text-xs text-saarthi-green font-bold">
                              {dist.applications.toLocaleString("en-IN")}
                            </strong>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Covering 740+ total operational districts</span>
                  <button
                    type="button"
                    onClick={() => handleTabChange("partners")}
                    className="font-bold text-saarthi-navy hover:text-saarthi-green flex items-center space-x-1"
                  >
                    <span>Inspect District Desks</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Partner Utilization (5 Cols) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-black text-saarthi-navy flex items-center space-x-2">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        <span>Channel Partner Utilization</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Efficiency metrics of last-mile offline facilitation networks.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {MOCK_PARTNER_UTILIZATION.map((part, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <strong className="text-xs font-black text-saarthi-navy">
                            {part.partnerType}
                          </strong>
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            {part.activeRatio} Active
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                          <div className="p-2 rounded-xl bg-white border border-slate-100">
                            <span className="text-[9px] text-slate-400 uppercase font-bold block">Network</span>
                            <strong className="text-[11px] text-slate-800">{part.totalNetwork}</strong>
                          </div>
                          <div className="p-2 rounded-xl bg-white border border-slate-100">
                            <span className="text-[9px] text-slate-400 uppercase font-bold block">Filed</span>
                            <strong className="text-[11px] text-saarthi-green">{part.applicationsAssisted}</strong>
                          </div>
                          <div className="p-2 rounded-xl bg-white border border-slate-100">
                            <span className="text-[9px] text-slate-400 uppercase font-bold block">Avg Turn</span>
                            <strong className="text-[11px] text-blue-900">{part.avgTurnaroundDays}</strong>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                          <span>Biometric e-KYC Success:</span>
                          <strong className="text-slate-800 font-bold">{part.biometricEkycRate}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    <strong>Notice:</strong> CSC centers handle 65.5% of all rural applications with biometric authentication and local mother-tongue transcription.
                  </p>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------- */}
            {/* SECTION C: RECENT APPLICATIONS                           */}
            {/* -------------------------------------------------------- */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-saarthi-navy flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-saarthi-navy" />
                    <span>Recent Prototype Application Submissions</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live stream of citizen applications processed across the 6 prototype lifecycle stages.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleTabChange("applications")}
                    className="px-3 py-1.5 rounded-xl bg-saarthi-navy text-white text-xs font-bold hover:bg-saarthi-navy-light transition flex items-center space-x-1 shadow-xs"
                  >
                    <span>View All Applications</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-y border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Application ID</th>
                      <th className="py-3 px-4">Applicant & Trade</th>
                      <th className="py-3 px-4">Social Category</th>
                      <th className="py-3 px-4">District</th>
                      <th className="py-3 px-4">Scheme Applied</th>
                      <th className="py-3 px-4 text-right">Loan Amount</th>
                      <th className="py-3 px-4 text-center">Lifecycle Stage</th>
                      <th className="py-3 px-4 text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {MOCK_RECENT_APPLICATIONS.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3 px-4 font-mono font-bold text-saarthi-navy">
                          {app.id}
                        </td>
                        <td className="py-3 px-4">
                          <strong className="font-bold text-slate-900 block text-xs">
                            {app.applicant}
                          </strong>
                          <span className="text-[11px] text-slate-500">{app.trade}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                            {app.socialCategory}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {app.district}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-800">
                          {app.schemeName}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-black text-slate-900">
                          {app.amount}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                              app.stageNum === 6
                                ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                : app.stageNum === 5
                                ? "bg-blue-100 text-blue-900 border border-blue-200"
                                : "bg-amber-100 text-amber-900 border border-amber-200"
                            }`}
                          >
                            Stage {app.stageNum}: {app.statusStage}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-slate-400 text-[11px]">
                          {app.timestamp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: SCHEMES CATALOG MANAGEMENT                            */}
        {/* ============================================================ */}
        {activeTab === "schemes" && (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-saarthi-navy">
                  Active Scheme Catalog Management
                </h3>
                <p className="text-xs text-slate-500">
                  Inspect eligibility envelopes, subsidy parameters, and operational status of all prototype schemes.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-500">
                  Total Active Schemes: <strong>{allSchemes.length}</strong>
                </span>
              </div>
            </div>

            {/* Scheme Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-saarthi-navy transition flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        {scheme.id}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-saarthi-green" />
                        <span>Active</span>
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-saarthi-navy leading-snug mb-1">
                      {scheme.name}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                      {scheme.shortDescription}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div className="p-2 rounded-xl bg-slate-50">
                        <span className="text-[9px] text-slate-400 uppercase font-bold block">Max Funding</span>
                        <strong className="text-xs text-saarthi-navy">
                          ₹{Number(scheme.maxLoanAmount || scheme.maxLoan || 0).toLocaleString("en-IN")}
                        </strong>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50">
                        <span className="text-[9px] text-slate-400 uppercase font-bold block">Interest Rate</span>
                        <strong className="text-xs text-emerald-700">
                          {scheme.interestRate ? scheme.interestRate.split(" ")[0] : "Subsidized"}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 font-medium">
                      {scheme.ruralUrbanEligibility || "Pan-India"}
                    </span>
                    <Link
                      to={`/schemes/${scheme.id}`}
                      className="text-xs font-bold text-saarthi-navy hover:text-saarthi-green flex items-center space-x-1"
                    >
                      <span>View Dossier</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: CHANNEL PARTNERS MANAGEMENT                           */}
        {/* ============================================================ */}
        {activeTab === "partners" && (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-saarthi-navy">
                  Verified Channel Partner & Assistance Network
                </h3>
                <p className="text-xs text-slate-500">
                  Directory of certified Common Service Centers (CSCs), Bank Mitras, and DIC helpdesks.
                </p>
              </div>

              <Link
                to="/partners"
                className="px-3.5 py-1.5 rounded-xl bg-saarthi-navy text-white text-xs font-bold hover:bg-saarthi-navy-light transition flex items-center space-x-1 self-start sm:self-auto"
              >
                <span>Open Citizen Locator Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Center / Partner Name</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">District & State</th>
                    <th className="py-3 px-4">Operator / Lead Contact</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {fallbackPartners.map((partner) => (
                    <tr key={partner.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-bold text-saarthi-navy">
                        {partner.name}
                        <span className="text-[10px] text-slate-400 block font-normal">
                          PIN: {partner.pincode}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                          {partner.type}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {partner.district}, {partner.state}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">
                        {partner.contactPerson}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600">
                        +91 {partner.phone}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black">
                          Verified CSC
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-amber-600">
                        ★ {partner.rating || "4.8"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: USERS & DEMOGRAPHIC EQUITY ANALYTICS                   */}
        {/* ============================================================ */}
        {activeTab === "users" && (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-black text-saarthi-navy">
                Beneficiary Demographics & Affirmative Action Metrics
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Monitoring platform outreach across priority marginalized social categories.
              </p>
            </div>

            {/* Demographics Equity Breakdown Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Women Entrepreneurs</span>
                <strong className="text-2xl font-black text-saarthi-navy block my-1">42.8%</strong>
                <span className="text-[10px] text-emerald-700 font-semibold">10,520 Registered Citizens</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">SC / ST Beneficiaries</span>
                <strong className="text-2xl font-black text-saarthi-navy block my-1">28.4%</strong>
                <span className="text-[10px] text-emerald-700 font-semibold">6,980 Stand-Up / PMEGP Quota</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">OBC Artisans & Trades</span>
                <strong className="text-2xl font-black text-saarthi-navy block my-1">21.5%</strong>
                <span className="text-[10px] text-emerald-700 font-semibold">5,280 NBCFDC / Vishwakarma</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Minorities & PwD</span>
                <strong className="text-2xl font-black text-saarthi-navy block my-1">7.3%</strong>
                <span className="text-[10px] text-emerald-700 font-semibold">1,800 NMDFC / Special Grant</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-xs text-emerald-950 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-saarthi-green flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-emerald-950 block">Inclusion Mandate Compliance:</strong>
                <p className="mt-0.5 text-[11px] text-emerald-900 leading-relaxed">
                  92.7% of all scheme recommendations generated by Saarthi algorithmically prioritized affirmative action subsidy quotas (PMEGP 35% rural bracket, PM Vishwakarma toolkit incentives, and PM SVANidhi 7% interest subvention).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: APPLICATIONS MANAGEMENT                                */}
        {/* ============================================================ */}
        {activeTab === "applications" && (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-saarthi-navy">
                  Application Lifecycle Administration
                </h3>
                <p className="text-xs text-slate-500">
                  Track, audit, and inspect submissions across all 6 standardized stages.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleSimulateExport("csv")}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center space-x-1 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Application ID</th>
                    <th className="py-3 px-4">Applicant</th>
                    <th className="py-3 px-4">Scheme Applied</th>
                    <th className="py-3 px-4 text-right">Requested Loan</th>
                    <th className="py-3 px-4 text-center">Lifecycle Stage</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {MOCK_RECENT_APPLICATIONS.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-mono font-bold text-saarthi-navy">
                        {app.id}
                      </td>
                      <td className="py-3 px-4">
                        <strong className="font-bold text-slate-900 block">{app.applicant}</strong>
                        <span className="text-[10px] text-slate-400">{app.district}</span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        {app.schemeName}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-black text-slate-900">
                        {app.amount}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-900 border border-blue-200">
                          Stage {app.stageNum}: {app.statusStage}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Link
                          to="/application-tracking"
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-saarthi-navy font-bold text-[11px] inline-flex items-center space-x-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Audit</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 6: REPORTS & EXPORT                                       */}
        {/* ============================================================ */}
        {activeTab === "reports" && (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-black text-saarthi-navy">
                Periodic Governance & Subsidy Reports
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Download aggregated analytical reports compiled for Ministry and State nodal officers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-saarthi-navy mb-1">
                    Demographic Equity Report
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Audits capital disbursement and affirmative action delivery to Women, SC, ST, and OBC entrepreneurs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSimulateExport("equity-pdf")}
                  className="w-full py-2 px-3 rounded-xl bg-saarthi-navy hover:bg-saarthi-navy-light text-white text-xs font-bold transition flex items-center justify-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Report (PDF)</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold mb-3">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-saarthi-navy mb-1">
                    Subsidy Outlay Projections
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Quarterly projections for interest subventions and capital margin grants under PMEGP & SVANidhi.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSimulateExport("subsidy-csv")}
                  className="w-full py-2 px-3 rounded-xl bg-saarthi-navy hover:bg-saarthi-navy-light text-white text-xs font-bold transition flex items-center justify-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Spreadsheet (CSV)</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-3">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-saarthi-navy mb-1">
                    Channel Partner SLA Audit
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Evaluates turnaround duration, biometric failure rates, and customer assistance feedback across CSC desks.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSimulateExport("sla-csv")}
                  className="w-full py-2 px-3 rounded-xl bg-saarthi-navy hover:bg-saarthi-navy-light text-white text-xs font-bold transition flex items-center justify-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export SLA Metrics (CSV)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 7: SYSTEM SETTINGS                                        */}
        {/* ============================================================ */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-black text-saarthi-navy">
                Admin Console Parameters & Engine Configuration
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage prototype simulation parameters and algorithmic scoring thresholds.
              </p>
            </div>

            <div className="space-y-4 max-w-2xl text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="font-bold text-slate-900 block">Transparent 100-Point Match Engine</strong>
                  <span className="text-slate-500 text-[11px]">Enforce deterministic 8-factor evaluation model</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black">
                  ENABLED
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="font-bold text-slate-900 block">Affirmative Action Weighting Multiplier</strong>
                  <span className="text-slate-500 text-[11px]">SC/ST/Women/Minority boost coefficient</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-800 font-bold font-mono">
                  1.25x Priority
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="font-bold text-slate-900 block">Prototype Mock Data Mode</strong>
                  <span className="text-slate-500 text-[11px]">Ensure compliance with SIH guidelines (no fake APIs)</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black">
                  MOCK ONLY
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    alert("Settings saved in prototype session.");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-saarthi-green text-white font-bold text-xs hover:bg-saarthi-green-hover transition shadow-sm"
                >
                  Save Console Parameters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

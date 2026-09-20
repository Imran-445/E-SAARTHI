import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Calculator,
  MapPin,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Filter,
  Users,
  Building2,
  Coins
} from "lucide-react";
import FeatureCard from "../components/FeatureCard";
import StatCard from "../components/StatCard";
import SchemeCard from "../components/SchemeCard";
import { fallbackSchemes } from "../services/api";

export default function HomePage({
  onOpenProfileWizard,
  onCheckEligibility,
  onToggleCompare,
  comparedSchemes = []
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");

  const tabFilters = [
    { id: "All", label: "All Priority Schemes" },
    { id: "Street Vendors", label: "Street Vendors" },
    { id: "Women", label: "Women Entrepreneurs" },
    { id: "Artisans", label: "Artisans & Craftsmen" },
    { id: "SC", label: "SC/ST Special" }
  ];

  const filteredSchemes = fallbackSchemes.filter((s) => {
    if (activeTab === "All") return true;
    return s.targetDemographic.some((d) => d.toLowerCase() === activeTab.toLowerCase());
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-12 pb-20 border-b border-slate-200">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-50/60 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-amber-50/60 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Government Initiative Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-300/80 text-xs font-semibold text-saarthi-navy shadow-sm mb-8 animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-saarthi-green animate-pulse" />
            <span>Smart India Hackathon 2026 • Problem Statement 26092</span>
            <span className="text-slate-300">|</span>
            <span className="text-amber-600 font-bold">Team DigITal Pioneer</span>
          </div>

          {/* Exact Hero Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-saarthi-navy tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Your Right Scheme. <br />
            <span className="text-saarthi-green">Your Bright Future.</span>
          </h1>

          {/* Exact Hero Text */}
          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Find government financial support that matches your business needs, eligibility and location.
          </p>

          {/* Primary Call to Action */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onOpenProfileWizard}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-base font-extrabold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2.5 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate("/schemes")}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-saarthi-navy text-sm font-bold border border-slate-300 shadow-sm transition"
            >
              Browse All Schemes
            </button>
          </div>

          {/* Trust points bar */}
          <div className="mt-12 pt-8 border-t border-slate-200/80 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-500">
            <div className="flex items-center justify-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-saarthi-green flex-shrink-0" />
              <span>Collateral-Free Focus</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-saarthi-green flex-shrink-0" />
              <span>Up to 35% Subsidies</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-saarthi-green flex-shrink-0" />
              <span>Multi-Lingual CSC Support</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-saarthi-green flex-shrink-0" />
              <span>Direct Bank Escrow</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOUR FEATURE CARDS SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-saarthi-navy">
              Comprehensive Financial Empowerment Tools
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Four tailored features built to guide grassroots and marginalized entrepreneurs from scheme discovery to fund disbursement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Find My Scheme */}
            <FeatureCard
              icon={Sparkles}
              title="1. Find My Scheme"
              description="Personalized AI matching based on your social category, business activity, annual turnover, and investment needs."
              badgeText="AI Powered"
              accentColor="green"
              onClick={onOpenProfileWizard}
            />

            {/* Card 2: EMI Calculator */}
            <FeatureCard
              icon={Calculator}
              title="2. EMI Calculator"
              description="Calculate monthly installments, evaluate government interest subventions, and estimate capital margin subsidies."
              badgeText="Interactive"
              accentColor="navy"
              onClick={() => navigate("/calculator")}
            />

            {/* Card 3: Find Nearby Partner */}
            <FeatureCard
              icon={MapPin}
              title="3. Find Nearby Partner"
              description="Locate verified Common Service Centers (CSCs), Bank Mitras, and MSME Nodal Desks near your PIN code for offline assistance."
              badgeText="5,000+ Centers"
              accentColor="saffron"
              onClick={() => navigate("/partners")}
            />

            {/* Card 4: Learn More */}
            <FeatureCard
              icon={BookOpen}
              title="4. Learn More"
              description="Access step-by-step documentation guides, eligibility requirements, and details about Team DigITal Pioneer's SIH solution."
              badgeText="Guidelines"
              accentColor="blue"
              onClick={() => navigate("/about")}
            />
          </div>
        </div>
      </section>

      {/* BENEFITS & STATISTICS SECTION */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-saarthi-green">
              Key Platform Advantages
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-saarthi-navy mt-1">
              Engineered for Marginalized Entrepreneurs
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Removing systemic barriers to credit access through transparent matching and last-mile handholding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Benefit 1: Personalized scheme matching */}
            <StatCard
              icon={TrendingUp}
              stat="100+ Schemes"
              label="Personalized Scheme Matching"
              description="Algorithmic scoring analyzes social category (SC/ST/OBC/Women), rural/urban location, and capital need to present the highest subsidy options first."
              highlightColor="green"
            />

            {/* Benefit 2: Easy eligibility checking */}
            <StatCard
              icon={ShieldCheck}
              stat="3-Minute Check"
              label="Easy Eligibility Checking"
              description="Plain-language criteria checklist and instant document scanner preparation list so applicants know exact requirements before applying."
              highlightColor="saffron"
            />

            {/* Benefit 3: Nearby partner assistance */}
            <StatCard
              icon={Users}
              stat="5,000+ Centers"
              label="Nearby Partner Assistance"
              description="Empowers digitally excluded citizens with local biometric support, vernacular translation, and application filing via certified CSC VLEs."
              highlightColor="blue"
            />
          </div>
        </div>
      </section>

      {/* LIVE INTERACTIVE DEMO: TOP SCHEMES PREVIEW */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-saarthi-navy">
                Verified Welfare Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-saarthi-navy mt-1">
                Featured Flagship Schemes
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explore real schemes tailored for marginalized groups under Government of India programs.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
              {tabFilters.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                    activeTab === tab.id
                      ? "bg-white text-saarthi-navy shadow-sm"
                      : "text-slate-600 hover:text-saarthi-navy"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scheme Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.slice(0, 6).map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onCheckEligibility={onCheckEligibility}
                onToggleCompare={onToggleCompare}
                isCompared={comparedSchemes.some((s) => s.id === scheme.id)}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => navigate("/schemes")}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-saarthi-navy text-xs font-bold transition"
            >
              <span>View All Available Schemes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import { ShieldCheck, Target, Users, Cpu, Award, ExternalLink, Heart, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-10 bg-slate-50 min-h-screen text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart India Hackathon 2026 Submission</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-saarthi-navy tracking-tight">
            About Project Saarthi & Team DigITal Pioneer
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
            <strong>Problem Statement 26092:</strong> <em>"AI-Driven Scheme Matching for Marginalized Entrepreneurs"</em>.
            Saarthi is designed as a national public-good digital bridge that addresses the acute information and handholding gap faced by India's street vendors, rural craftspeople, women, and SC/ST micro-entrepreneurs.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-saarthi-navy mb-2">The Challenge</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Over 63 million MSMEs operate in India, yet marginalized entrepreneurs disproportionately rely on high-interest informal moneylenders because government welfare portals are fragmented, document-heavy, and English-centric.
              </p>
            </div>
            <span className="mt-4 text-[11px] font-bold text-saarthi-green">Solving Information Asymmetry</span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-saarthi-navy mb-2">The Saarthi Engine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our lightweight matching algorithm analyzes social category, business sector, location (rural/urban), and capital requirements to prioritize collateral-free schemes with the highest capital and interest subsidies.
              </p>
            </div>
            <span className="mt-4 text-[11px] font-bold text-amber-700">Algorithmic Transparency</span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-black mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-saarthi-navy mb-2">Last-Mile Human Bridge</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Technology alone cannot bridge digital illiteracy. Saarthi directly integrates with 5,000+ verified Common Service Centers (CSCs) and Bank Mitras for biometric verification and localized handholding.
              </p>
            </div>
            <span className="mt-4 text-[11px] font-bold text-blue-700">Phygital Onboarding</span>
          </div>
        </div>

        {/* Team Profile */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card">
          <h2 className="text-xl font-bold text-saarthi-navy mb-4 flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Team DigITal Pioneer</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            We are passionate engineers building scalable, human-centered public technology for inclusive economic growth. Saarthi is built strictly adhering to national accessibility standards and Indian government design principles.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <strong className="text-saarthi-navy block">Prototype Status:</strong>
              <span>React 18 + Vite Frontend • Node.js + Express Backend • Ready for SIH 2026 Evaluation</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[11px]">
              Active SIH 2026 Prototype
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

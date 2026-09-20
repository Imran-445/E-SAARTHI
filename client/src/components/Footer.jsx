import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, PhoneCall, ExternalLink, Heart, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: About Saarthi */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">Saarthi</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-driven scheme discovery & handholding bridge designed to empower marginalized Indian entrepreneurs (SC/ST, Women, Artisans, Street Vendors) with formal credit and capital subsidies.
            </p>
            <div className="inline-flex items-center px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-amber-400">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              SIH 2026 • Problem Statement 26092
            </div>
          </div>

          {/* Col 2: Flagship Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Official Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="https://pmsvanidhi.mohua.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center space-x-1">
                  <span>PM SVANidhi Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.standupmitra.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center space-x-1">
                  <span>Stand-Up India Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.kviconline.gov.in/pmegpeportal" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center space-x-1">
                  <span>PMEGP e-Portal (KVIC)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://pmvishwakarma.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center space-x-1">
                  <span>PM Vishwakarma Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://udyamregistration.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center space-x-1">
                  <span>Udyam Registration</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-emerald-400">Home & Overview</Link>
              </li>
              <li>
                <Link to="/schemes" className="hover:text-emerald-400">Browse All Schemes</Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-emerald-400">Loan & Subsidy Calculator</Link>
              </li>
              <li>
                <Link to="/partners" className="hover:text-emerald-400">Find Nearby CSC Partner</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400">Team DigITal Pioneer</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-amber-400 font-semibold text-slate-300">Admin Dashboard (Console)</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: National Helpline & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              National Helplines
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start space-x-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-200 font-semibold">1800-180-1111 / 1800-11-0001</div>
                  <div className="text-[11px] text-slate-500">PM SVANidhi & Financial Inclusion Toll-Free</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <PhoneCall className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-200 font-semibold">1800-267-7777</div>
                  <div className="text-[11px] text-slate-500">PM Vishwakarma / MSME Champions Desk</div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] text-slate-400">
                Offline assistance is available through 5,00,000+ Common Service Centers (CSCs) and Lead Bank Mitras.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center space-x-1">
            <span>Developed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>by Team <strong className="text-slate-300">DigITal Pioneer</strong> for Smart India Hackathon 2026.</span>
          </div>
          <div className="text-slate-500 text-[11px]">
            Official Prototype • Non-Commercial Demonstration
          </div>
        </div>
      </div>
    </footer>
  );
}

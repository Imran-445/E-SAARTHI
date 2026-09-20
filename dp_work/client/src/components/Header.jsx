import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Globe, User, Menu, X, ShieldCheck } from "lucide-react";

export default function Header({ onOpenLogin, onOpenProfileWizard }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Scheme Finder", path: "/scheme-finder" },
    { name: "Schemes", path: "/schemes" },
    { name: "Calculator", path: "/calculator" },
    { name: "Partners", path: "/partners" },
    { name: "About", path: "/about" },
  ];

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी (Hindi)" },
    { code: "ta", label: "தமிழ் (Tamil)" },
    { code: "bn", label: "বাংলা (Bengali)" },
    { code: "te", label: "తెలుగు (Telugu)" },
    { code: "mr", label: "मराठी (Marathi)" }
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      {/* Tricolor top border for Indian public portal identity */}
      <div className="tricolor-border-top" />

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand / Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group text-left">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-saarthi-navy via-saarthi-navy-light to-saarthi-navy flex items-center justify-center shadow-md text-white border border-amber-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3"/>
                <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"/>
                <circle cx="12" cy="12" r="3" fill="#15803D" stroke="#FFFFFF" strokeWidth="1.5"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black tracking-tight text-saarthi-navy group-hover:text-saarthi-navy-light transition-colors">
                  Saarthi
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  SIH 2026
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 tracking-normal hidden sm:block">
                Financial Support for a Stronger Tomorrow
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? "bg-slate-100 text-saarthi-navy shadow-inner"
                    : "text-slate-600 hover:text-saarthi-navy hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions: Language & Login */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 shadow-sm transition"
              >
                <Globe className="w-3.5 h-3.5 text-saarthi-navy" />
                <span>{currentLang}</span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white border border-slate-200 shadow-xl py-1 z-50 animate-fadeIn">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setCurrentLang(l.label.split(" ")[0]);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center justify-between"
                    >
                      <span>{l.label}</span>
                      {currentLang.startsWith(l.label.split(" ")[0]) && (
                        <span className="text-saarthi-green text-xs font-bold">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login / Register Button */}
            <button
              type="button"
              onClick={onOpenLogin}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-saarthi-navy text-white text-xs font-semibold hover:bg-saarthi-navy-light transition shadow-sm"
            >
              <User className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-saarthi-navy hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <p className="text-xs font-medium text-slate-500 pb-2 border-b border-slate-100">
            Financial Support for a Stronger Tomorrow
          </p>
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-semibold ${
                  isActive(link.path)
                    ? "bg-slate-100 text-saarthi-navy"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
              }}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-700"
            >
              <Globe className="w-3.5 h-3.5 text-saarthi-navy" />
              <span>Language: {currentLang}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-saarthi-navy text-white text-xs font-semibold"
            >
              <User className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

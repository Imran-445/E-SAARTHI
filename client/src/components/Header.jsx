import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Globe,
  User,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Bookmark,
  FileText,
  Calculator,
  MapPin,
  Info,
  CheckCircle2
} from "lucide-react";
import { getCurrentUser, logout } from "../services/authService";

export default function Header({ onOpenLogin, onOpenProfileWizard }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const servicesRef = useRef(null);
  const langRef = useRef(null);
  const userRef = useRef(null);

  // Sync auth state on storage/auth changes
  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(getCurrentUser());
    };
    window.addEventListener("saarthi_auth_change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);
    return () => {
      window.removeEventListener("saarthi_auth_change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  // Close open dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setLangDropdownOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const handleSignOut = () => {
    logout();
    setCurrentUser(null);
    setUserDropdownOpen(false);
    navigate("/");
  };

  const [currentLang, setCurrentLang] = useState(() => {
    try {
      const saved = localStorage.getItem("saarthi_assistant_lang");
      if (saved === "hi") return "हिन्दी";
      if (saved === "gu") return "ગુજરાતી";
      if (saved === "en") return "English";
    } catch (e) {}
    return "English";
  });

  const languages = [
    { code: "en", label: "English", short: "EN" },
    { code: "hi", label: "हिन्दी (Hindi)", short: "हिन्दी" },
    { code: "gu", label: "ગુજરાતી (Gujarati)", short: "ગુજ" },
    { code: "ta", label: "தமிழ் (Tamil)", short: "தமிழ்" },
    { code: "bn", label: "বাংলা (Bengali)", short: "বাংলা" },
    { code: "mr", label: "मराठी (Marathi)", short: "मराठी" }
  ];

  const currentLangObj = languages.find(
    (l) => currentLang.includes(l.short) || l.label.startsWith(currentLang)
  ) || languages[0];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (
      path === "/recommended-scheme" &&
      (location.pathname.startsWith("/recommended-scheme") || location.pathname.startsWith("/scheme-matching"))
    )
      return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Check if current page is within Services dropdown items
  const isServicesActive = [
    "/scheme-finder",
    "/profile-flow",
    "/recommended-scheme",
    "/scheme-matching",
    "/document-guidance",
    "/application-tracking",
    "/admin"
  ].some((p) => location.pathname.startsWith(p));

  // Services dropdown items for desktop
  const serviceItems = [
    {
      name: "Scheme Finder",
      desc: "AI eligibility & tailored scoring",
      path: "/scheme-finder",
      icon: Sparkles,
      badge: "AI Match",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300"
    },
    {
      name: "Recommended Schemes",
      desc: "Top matched government schemes",
      path: "/recommended-scheme",
      icon: CheckCircle2,
      badge: null
    },
    {
      name: "Document Guidance",
      desc: "Checklists, formats & file specs",
      path: "/document-guidance",
      icon: FileText,
      badge: null
    },
    {
      name: "Track Application",
      desc: "Real-time sanction status monitor",
      path: "/application-tracking",
      icon: Bookmark,
      badge: null
    },
    {
      name: "Admin Console",
      desc: "SIH authority & partner analytics",
      path: "/admin",
      icon: ShieldCheck,
      badge: "Console",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300"
    }
  ];

  // Primary desktop navigation links
  const primaryNavLinks = [
    { name: "Home", path: "/" },
    ...(currentUser ? [{ name: "Dashboard", path: "/dashboard" }] : []),
    { name: "Schemes", path: "/schemes" },
    { name: "Calculator", path: "/calculator" },
    { name: "Partners", path: "/partners" },
    { name: "About", path: "/about" }
  ];

  // Complete list of links for mobile/tablet drawer
  const mobileNavLinks = [
    { name: "Home", path: "/" },
    ...(currentUser ? [{ name: "Citizen Dashboard", path: "/dashboard", badge: "Live" }] : []),
    { name: "Browse Schemes", path: "/schemes" },
    { name: "Scheme Finder", path: "/scheme-finder", badge: "AI Match" },
    { name: "Recommended Scheme", path: "/recommended-scheme" },
    { name: "EMI Calculator", path: "/calculator" },
    { name: "Nearby CSC Partners", path: "/partners" },
    { name: "Document Guidance", path: "/document-guidance" },
    { name: "Track Application", path: "/application-tracking" },
    { name: "About Saarthi", path: "/about" },
    { name: "Admin Dashboard", path: "/admin", badge: "Console" }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm w-full">
      {/* Tricolor top border for Indian public portal identity */}
      <div className="tricolor-border-top" />

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 min-w-0">
          {/* Brand / Logo Section */}
          <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3 group text-left flex-shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-saarthi-navy via-saarthi-navy-light to-saarthi-navy flex items-center justify-center shadow-md text-white border border-amber-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
                <circle cx="12" cy="12" r="3" fill="#15803D" stroke="#FFFFFF" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-saarthi-navy group-hover:text-saarthi-navy-light transition-colors">
                  Saarthi
                </span>
                <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 flex-shrink-0">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  SIH 2026
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 tracking-normal hidden xl:block truncate max-w-[260px]">
                Financial Support for a Stronger Tomorrow
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links (>= 1024px) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 min-w-0">
            {/* Home link */}
            <Link
              to="/"
              className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-colors flex items-center space-x-1 ${
                isActive("/")
                  ? "bg-slate-100 text-saarthi-navy shadow-inner"
                  : "text-slate-600 hover:text-saarthi-navy hover:bg-slate-50"
              }`}
            >
              <span>Home</span>
            </Link>

            {/* Dashboard if logged in */}
            {currentUser && (
              <Link
                to="/dashboard"
                className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-colors flex items-center space-x-1 ${
                  isActive("/dashboard")
                    ? "bg-slate-100 text-saarthi-navy shadow-inner"
                    : "text-slate-600 hover:text-saarthi-navy hover:bg-slate-50"
                }`}
              >
                <span>Dashboard</span>
              </Link>
            )}

            {/* Schemes Catalog */}
            <Link
              to="/schemes"
              className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-colors flex items-center space-x-1 ${
                isActive("/schemes")
                  ? "bg-slate-100 text-saarthi-navy shadow-inner"
                  : "text-slate-600 hover:text-saarthi-navy hover:bg-slate-50"
              }`}
            >
              <span>Schemes</span>
            </Link>

            {/* Services Dropdown (Scheme Finder, Recommended, Docs, Tracking, Admin) */}
            <div className="relative" ref={servicesRef}>
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-colors flex items-center space-x-1.5 ${
                  isServicesActive
                    ? "bg-slate-100 text-saarthi-navy shadow-inner"
                    : "text-slate-600 hover:text-saarthi-navy hover:bg-slate-50"
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <Sparkles className="w-3.5 h-3.5 text-saarthi-green flex-shrink-0" />
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    servicesDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200 shadow-2xl py-2 z-50 animate-fadeIn text-left">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                    Citizen & Partner Services
                  </div>
                  {serviceItems.map((item) => {
                    const Icon = item.icon;
                    const isItemActive = isActive(item.path);
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setServicesDropdownOpen(false)}
                        className={`px-3 py-2.5 hover:bg-slate-50 flex items-start space-x-3 transition group ${
                          isItemActive ? "bg-slate-50/80 border-l-4 border-saarthi-green" : ""
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isItemActive
                              ? "bg-saarthi-navy text-white"
                              : "bg-slate-100 text-saarthi-navy group-hover:bg-slate-200"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1.5">
                            <span
                              className={`text-xs font-bold truncate ${
                                isItemActive ? "text-saarthi-navy" : "text-slate-800 group-hover:text-saarthi-navy"
                              }`}
                            >
                              {item.name}
                            </span>
                            {item.badge && (
                              <span
                                className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded border ${item.badgeColor}`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">{item.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Calculator link */}
            <Link
              to="/calculator"
              className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-colors flex items-center space-x-1 ${
                isActive("/calculator")
                  ? "bg-slate-100 text-saarthi-navy shadow-inner"
                  : "text-slate-600 hover:text-saarthi-navy hover:bg-slate-50"
              }`}
            >
              <span>Calculator</span>
            </Link>

            {/* Partners link */}
            <Link
              to="/partners"
              className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-colors flex items-center space-x-1 ${
                isActive("/partners")
                  ? "bg-slate-100 text-saarthi-navy shadow-inner"
                  : "text-slate-600 hover:text-saarthi-navy hover:bg-slate-50"
              }`}
            >
              <span>Partners</span>
            </Link>

            {/* About link */}
            <Link
              to="/about"
              className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-colors flex items-center space-x-1 ${
                isActive("/about")
                  ? "bg-slate-100 text-saarthi-navy shadow-inner"
                  : "text-slate-600 hover:text-saarthi-navy hover:bg-slate-50"
              }`}
            >
              <span>About</span>
            </Link>
          </nav>

          {/* Actions & Responsive Controls (Always visible, fits viewport) */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs transition flex-shrink-0"
                aria-label="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-saarthi-navy flex-shrink-0" />
                <span className="hidden sm:inline">{currentLangObj.label.split(" ")[0]}</span>
                <span className="sm:hidden">{currentLangObj.short}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-44 rounded-2xl bg-white border border-slate-200 shadow-2xl py-1.5 z-50 animate-fadeIn">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                    Select Language
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        const short = l.label.split(" ")[0];
                        setCurrentLang(short);
                        setLangDropdownOpen(false);
                        try {
                          localStorage.setItem("saarthi_assistant_lang", l.code);
                          window.dispatchEvent(new Event("storage"));
                        } catch (e) {}
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center justify-between transition"
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

            {/* Login Button OR User Profile Dropdown */}
            {currentUser ? (
              <div className="relative" ref={userRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-xs font-bold text-saarthi-navy shadow-xs transition flex-shrink-0"
                  aria-expanded={userDropdownOpen}
                >
                  <span className="w-7 h-7 rounded-lg bg-saarthi-navy text-white text-xs font-black flex items-center justify-center border border-amber-400/40 flex-shrink-0">
                    {currentUser.avatarInitial || currentUser.name.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="hidden sm:inline font-bold text-slate-800 truncate max-w-[100px]">
                    {currentUser.name.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-2xl py-2 z-50 animate-fadeIn text-left">
                    <div className="px-4 py-2 border-b border-slate-100 mb-1">
                      <strong className="block text-xs font-black text-saarthi-navy truncate">
                        {currentUser.name}
                      </strong>
                      <span className="text-[10px] text-slate-500 block truncate">
                        +91 {currentUser.mobile} • {currentUser.businessType || "Citizen"}
                      </span>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-saarthi-green flex-shrink-0" />
                      <span>Citizen Dashboard</span>
                    </Link>

                    <Link
                      to="/dashboard/applications"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>My Applications</span>
                    </Link>

                    <Link
                      to="/dashboard/saved-schemes"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span>Saved Schemes</span>
                    </Link>

                    <Link
                      to="/dashboard/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <User className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                      <span>Citizen Profile</span>
                    </Link>

                    <Link
                      to="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span>Admin Dashboard</span>
                    </Link>

                    <div className="border-t border-slate-100 my-1 pt-1">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center space-x-2"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="flex items-center space-x-1.5 px-3 sm:px-4 py-2 rounded-xl bg-saarthi-navy text-white text-xs font-bold hover:bg-saarthi-navy-light transition shadow-sm flex-shrink-0 active:scale-95"
              >
                <User className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile / Tablet Menu Button (Visible on < 1024px) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-saarthi-navy hover:bg-slate-100 border border-slate-200 transition flex-shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-saarthi-navy" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (< 1024px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-2xl text-left max-h-[calc(100vh-80px)] overflow-y-auto animate-fadeIn">
          {/* User state badge */}
          {currentUser ? (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-saarthi-navy text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                  {currentUser.avatarInitial || currentUser.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-saarthi-navy truncate">{currentUser.name}</div>
                  <div className="text-[10px] text-emerald-800 font-bold truncate">
                    {currentUser.businessType || "Citizen"} • +91 {currentUser.mobile}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="text-xs font-bold text-rose-600 hover:underline flex-shrink-0 ml-2"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">Public Welfare Portal</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                SIH 2026
              </span>
            </div>
          )}

          {/* All Links Categorized */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-1">
              Menu Navigation
            </div>
            {mobileNavLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                    active
                      ? "bg-slate-100 text-saarthi-navy shadow-inner font-extrabold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    {link.name === "Scheme Finder" && <Sparkles className="w-4 h-4 text-saarthi-green" />}
                    <span>{link.name}</span>
                  </span>
                  {link.badge && (
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Drawer Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700"
            >
              <Globe className="w-3.5 h-3.5 text-saarthi-navy flex-shrink-0" />
              <span>Language: {currentLang}</span>
            </button>

            {currentUser ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-saarthi-green text-white text-xs font-black shadow-sm"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/login");
                }}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-saarthi-navy text-white text-xs font-bold"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

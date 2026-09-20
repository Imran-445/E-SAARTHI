import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import {
  Lock,
  Smartphone,
  KeyRound,
  ShieldCheck,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Building2,
  Briefcase,
  Layers,
  MapPin,
  IndianRupee,
  RefreshCw
} from "lucide-react";
import {
  loginWithPassword,
  sendMockOtp,
  verifyMockOtp,
  registerUser,
  getCurrentUser,
  DEMO_ACCOUNTS
} from "../services/authService";

export default function LoginPage({ initialTab = "login" }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const existing = getCurrentUser();
    if (existing) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Tab: "login" or "register"
  const urlTab = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(urlTab || initialTab);

  // Login Mode: "password" or "otp"
  const [loginMode, setLoginMode] = useState("password");

  // Form Fields - Login
  const [mobile, setMobile] = useState("9876543210");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields - OTP mode
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [mockOtpNotice, setMockOtpNotice] = useState(null);

  // Form Fields - Registration
  const [regData, setRegData] = useState({
    name: "",
    mobile: "",
    password: "password123",
    socialCategory: "OBC",
    gender: "Male",
    area: "urban",
    businessType: "Street Vendor",
    businessName: "",
    annualIncome: 180000,
    loanAmount: 50000,
    loanPurpose: "Working Capital",
    aadhaarLinked: true,
    udyamRegistered: false
  });

  // Status & Feedback
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [successToast, setSuccessToast] = useState("");

  // Handle Login submission
  const handleLoginSubmit = (e) => {
    e?.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      if (loginMode === "password") {
        const user = loginWithPassword(mobile, password);
        setSuccessToast(`Welcome back, ${user.name}!`);
        setTimeout(() => {
          navigate("/dashboard");
        }, 600);
      } else {
        // OTP mode verification
        if (!otpSent) {
          const res = sendMockOtp(mobile);
          setOtpSent(true);
          setMockOtpNotice(res.message);
          setOtpCode(res.mockOtp); // Pre-fill for instant seamless testing
          setLoading(false);
          return;
        } else {
          const user = verifyMockOtp(mobile, otpCode);
          setSuccessToast(`Verified! Welcome, ${user.name}!`);
          setTimeout(() => {
            navigate("/dashboard");
          }, 600);
        }
      }
    } catch (err) {
      setErrorMsg(err.message || "Authentication failed. Please check credentials.");
      setLoading(false);
    }
  };

  // Handle Quick Demo Account Login
  const handleQuickDemoLogin = (demoAcc) => {
    setErrorMsg("");
    setLoading(true);
    try {
      setMobile(demoAcc.mobile);
      setPassword(demoAcc.password);
      const user = loginWithPassword(demoAcc.mobile, demoAcc.password);
      setSuccessToast(`Logged in as demo persona: ${user.name}!`);
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (err) {
      setErrorMsg(err.message || "Demo login failed");
      setLoading(false);
    }
  };

  // Handle Registration submission
  const handleRegisterSubmit = (e) => {
    e?.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const user = registerUser(regData);
      setSuccessToast(`Account created successfully for ${user.name}!`);
      setTimeout(() => {
        navigate("/dashboard");
      }, 700);
    } catch (err) {
      setErrorMsg(err.message || "Registration failed. Please complete all fields.");
      setLoading(false);
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen text-left">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium mb-6">
          <Link to="/" className="hover:text-saarthi-navy transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">
            {activeTab === "login" ? "Citizen & Partner Login" : "Entrepreneur Registration"}
          </span>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fadeIn">
          {/* Tricolor top border */}
          <div className="tricolor-border-top" />

          {/* Card Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-saarthi-navy flex items-center justify-center text-white shadow-md">
                  <ShieldCheck className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-saarthi-navy">
                    Saarthi Portal Access
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">
                    National Scheme Matching & Citizen Dashboard
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                SIH 2026 Prototype
              </span>
            </div>

            {/* Prototype Notice Alert */}
            <div className="mt-4 p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <strong>Simulated Authentication:</strong> You can log in using any 10-digit mobile number, use demo accounts below, or test with simulated OTP <code>4826</code> / <code>1234</code>.
              </div>
            </div>

            {/* Main Tabs Switcher (Login vs Register) */}
            <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-slate-100 rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("login");
                  setErrorMsg("");
                }}
                className={`py-2.5 rounded-xl text-xs font-black transition ${
                  activeTab === "login"
                    ? "bg-white text-saarthi-navy shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Citizen Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("register");
                  setErrorMsg("");
                }}
                className={`py-2.5 rounded-xl text-xs font-black transition ${
                  activeTab === "register"
                    ? "bg-white text-saarthi-navy shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                New Registration
              </button>
            </div>
          </div>

          {/* Success Toast Banner */}
          {successToast && (
            <div className="p-4 bg-emerald-500 text-white text-xs font-bold text-center flex items-center justify-center space-x-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" />
              <span>{successToast}</span>
            </div>
          )}

          {/* Error Message Alert */}
          {errorMsg && (
            <div className="mx-6 sm:mx-8 mt-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span className="font-semibold">{errorMsg}</span>
            </div>
          )}

          <div className="p-6 sm:p-8">
            {/* ========================================================== */}
            {/* TAB 1: LOGIN FLOW                                          */}
            {/* ========================================================== */}
            {activeTab === "login" ? (
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                {/* Auth Mode Toggle (Password vs Simulated OTP) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-saarthi-navy">
                      Select Login Method
                    </label>
                    <span className="text-[11px] text-slate-400">Mock Authentication</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setLoginMode("password");
                        setOtpSent(false);
                        setMockOtpNotice(null);
                        setErrorMsg("");
                      }}
                      className={`p-2.5 rounded-xl border font-bold flex items-center justify-center space-x-2 transition ${
                        loginMode === "password"
                          ? "bg-saarthi-navy text-white border-saarthi-navy shadow-xs"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Password Login</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setLoginMode("otp");
                        setErrorMsg("");
                      }}
                      className={`p-2.5 rounded-xl border font-bold flex items-center justify-center space-x-2 transition ${
                        loginMode === "otp"
                          ? "bg-saarthi-navy text-white border-saarthi-navy shadow-xs"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>OTP Login (Simulated)</span>
                    </button>
                  </div>
                </div>

                {/* Mobile Number Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1.5">
                    Registered Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 text-xs font-bold">
                      +91
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                      placeholder="10-digit mobile number"
                      className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-saarthi-green focus:border-transparent transition"
                      required
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Must be Aadhaar or Jan Dhan-seeded mobile number
                  </span>
                </div>

                {/* Password Mode Fields */}
                {loginMode === "password" && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-saarthi-navy">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setPassword("password123")}
                        className="text-[11px] font-bold text-saarthi-green hover:underline"
                      >
                        Auto-fill demo password
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-saarthi-green focus:border-transparent pr-11 transition"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Simulated OTP Mode Fields */}
                {loginMode === "otp" && (
                  <div className="space-y-3">
                    {mockOtpNotice && (
                      <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 animate-fadeIn flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{mockOtpNotice}</span>
                      </div>
                    )}

                    {otpSent ? (
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-saarthi-navy">
                            Enter 4-Digit OTP
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const res = sendMockOtp(mobile);
                              setOtpCode(res.mockOtp);
                              setMockOtpNotice(res.message);
                            }}
                            className="text-[11px] font-bold text-saarthi-green hover:underline flex items-center space-x-1"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Resend Code</span>
                          </button>
                        </div>
                        <input
                          type="text"
                          maxLength={4}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                          placeholder="e.g. 4826 or 1234"
                          className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm font-black text-center tracking-widest text-slate-800 focus:outline-none focus:ring-2 focus:ring-saarthi-green focus:border-transparent transition"
                          required
                        />
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Clicking <strong>"Send Demo OTP"</strong> below simulates an instant verification SMS without needing external telecommunication gateways.
                      </p>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs sm:text-sm font-black transition shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Authenticating...</span>
                  ) : loginMode === "otp" && !otpSent ? (
                    <>
                      <span>Send Demo OTP via SMS</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Login to Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* 1-Click Fast Persona Switcher for Testers */}
                <div className="pt-5 border-t border-slate-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                    Instant Demo Personas (1-Click Test Login):
                  </span>
                  <div className="space-y-2">
                    {DEMO_ACCOUNTS.map((demo) => (
                      <button
                        key={demo.id}
                        type="button"
                        onClick={() => handleQuickDemoLogin(demo)}
                        className="w-full p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition flex items-center justify-between group"
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="w-8 h-8 rounded-xl bg-saarthi-navy text-white text-xs font-black flex items-center justify-center group-hover:bg-saarthi-green transition">
                            {demo.avatarInitial}
                          </span>
                          <div>
                            <span className="text-xs font-bold text-saarthi-navy block">
                              {demo.name}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium">
                              {demo.businessType} • {demo.socialCategory} • ₹{demo.annualIncome.toLocaleString("en-IN")} Income
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-saarthi-green group-hover:translate-x-0.5 transition-transform">
                          Login →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggle to Registration */}
                <div className="text-center pt-3 text-xs text-slate-600 font-medium">
                  Don't have an entrepreneur profile?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("register")}
                    className="font-bold text-saarthi-green hover:underline"
                  >
                    Register New Account
                  </button>
                </div>
              </form>
            ) : (
              /* ========================================================== */
              /* TAB 2: REGISTRATION FLOW                                   */
              /* ========================================================== */
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={regData.name}
                      onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-saarthi-green"
                      required
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit mobile"
                      value={regData.mobile}
                      onChange={(e) =>
                        setRegData({ ...regData, mobile: e.target.value.replace(/\D/g, "") })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-saarthi-green"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Password */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1">
                      Set Password *
                    </label>
                    <input
                      type="password"
                      placeholder="Create password"
                      value={regData.password}
                      onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-saarthi-green"
                      required
                    />
                  </div>

                  {/* Social Category */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1">
                      Social Category *
                    </label>
                    <select
                      value={regData.socialCategory}
                      onChange={(e) => setRegData({ ...regData, socialCategory: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-saarthi-green bg-white"
                    >
                      <option value="General">General / Unreserved</option>
                      <option value="OBC">Other Backward Classes (OBC)</option>
                      <option value="SC">Scheduled Caste (SC)</option>
                      <option value="ST">Scheduled Tribe (ST)</option>
                      <option value="Minority">Religious Minority</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Gender */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1">
                      Gender
                    </label>
                    <select
                      value={regData.gender}
                      onChange={(e) => setRegData({ ...regData, gender: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-saarthi-green bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                    </select>
                  </div>

                  {/* Location Area */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1">
                      Area
                    </label>
                    <select
                      value={regData.area}
                      onChange={(e) => setRegData({ ...regData, area: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-saarthi-green bg-white"
                    >
                      <option value="urban">Urban</option>
                      <option value="rural">Rural</option>
                    </select>
                  </div>
                </div>

                {/* Business Type / Occupation */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1">
                    Business Sector / Occupation *
                  </label>
                  <select
                    value={regData.businessType}
                    onChange={(e) => setRegData({ ...regData, businessType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-saarthi-green bg-white"
                  >
                    <option value="Street Vendor">Street Vendor / Urban Micro-Seller</option>
                    <option value="Traditional Artisan">Traditional Artisan / Potter / Weaver</option>
                    <option value="Micro Enterprise">Micro Enterprise / Small Retail</option>
                    <option value="Dairy / Livestock">Dairy / Livestock / Agri-Allied</option>
                    <option value="Manufacturing / Food">Manufacturing / Food Processing</option>
                    <option value="Services / Repair">Services / Repair Workshop</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Annual Income */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1">
                      Annual Income (₹)
                    </label>
                    <input
                      type="number"
                      step={10000}
                      value={regData.annualIncome}
                      onChange={(e) =>
                        setRegData({ ...regData, annualIncome: Number(e.target.value) })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-saarthi-green"
                    />
                  </div>

                  {/* Loan Amount */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1">
                      Loan Required (₹)
                    </label>
                    <input
                      type="number"
                      step={5000}
                      value={regData.loanAmount}
                      onChange={(e) =>
                        setRegData({ ...regData, loanAmount: Number(e.target.value) })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-saarthi-green"
                    />
                  </div>
                </div>

                {/* Checkbox for Aadhaar seeded */}
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id="aadhaarSeed"
                    checked={regData.aadhaarLinked}
                    onChange={(e) => setRegData({ ...regData, aadhaarLinked: e.target.checked })}
                    className="w-4 h-4 text-saarthi-green rounded border-slate-300 focus:ring-saarthi-green"
                  />
                  <label htmlFor="aadhaarSeed" className="text-xs font-medium text-slate-700">
                    My mobile number is linked to Aadhaar for Direct Benefit Transfer (DBT)
                  </label>
                </div>

                {/* Submit Registration */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs sm:text-sm font-black transition shadow-md flex items-center justify-center space-x-2 mt-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Registering Citizen...</span>
                  ) : (
                    <>
                      <span>Register & Go to Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Toggle to Login */}
                <div className="text-center pt-2 text-xs text-slate-600 font-medium">
                  Already have a registered profile?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("login")}
                    className="font-bold text-saarthi-green hover:underline"
                  >
                    Citizen Login
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

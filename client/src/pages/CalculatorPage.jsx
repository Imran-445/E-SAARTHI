import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useSearchParams, Link, useNavigate } from "react-router-dom";
import {
  Calculator,
  IndianRupee,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Info,
  Calendar,
  Clock,
  BarChart3,
  TrendingUp,
  Percent,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from "lucide-react";
import { fallbackSchemes } from "../services/api";
import {
  calculateEMI,
  validateInputs,
  calculateAffordability,
  formatINR
} from "../utils/emiCalculator";

export default function CalculatorPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Load saved user profile for income-based affordability
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("saarthi_user_profile");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Extract navigation state or URL parameters
  const passedState = location.state || {};
  const querySchemeId = searchParams.get("scheme") || searchParams.get("schemeId");
  const querySchemeName = searchParams.get("schemeName");
  const queryLoanAmount = searchParams.get("amount") || searchParams.get("loanAmount");
  const queryInterestRate = searchParams.get("rate") || searchParams.get("interestRate");
  const queryTenureYears = searchParams.get("tenureYears") || (searchParams.get("tenureMonths") ? Number(searchParams.get("tenureMonths")) / 12 : null);
  const queryMoratorium = searchParams.get("moratorium") || searchParams.get("moratoriumMonths");

  // Determine initial scheme
  const initialSchemeId = passedState.schemeId || querySchemeId || "micro-finance-scheme";
  const initialScheme = useMemo(() => {
    return fallbackSchemes.find(
      (s) => s.id === initialSchemeId || s.name.toLowerCase() === (passedState.schemeName || querySchemeName || "").toLowerCase()
    ) || fallbackSchemes[0];
  }, [initialSchemeId, passedState.schemeName, querySchemeName]);

  // Form input state
  const [selectedSchemeId, setSelectedSchemeId] = useState(initialScheme?.id || "micro-finance-scheme");
  const [loanAmount, setLoanAmount] = useState(() => {
    if (passedState.loanAmount !== undefined) return Number(passedState.loanAmount);
    if (queryLoanAmount !== undefined) return Number(queryLoanAmount);
    return initialScheme?.defaultLoanAmount || 100000;
  });

  const [interestRate, setInterestRate] = useState(() => {
    if (passedState.interestRate !== undefined) return Number(passedState.interestRate);
    if (queryInterestRate !== undefined) return Number(queryInterestRate);
    return initialScheme?.defaultInterestRate || 6.5;
  });

  const [tenureYears, setTenureYears] = useState(() => {
    if (passedState.tenureYears !== undefined) return Number(passedState.tenureYears);
    if (passedState.tenureMonths !== undefined) return Math.max(1, Math.round(Number(passedState.tenureMonths) / 12));
    if (queryTenureYears !== undefined) return Math.max(1, Math.round(Number(queryTenureYears)));
    return initialScheme?.defaultTenureYears || 3;
  });

  const [moratoriumMonths, setMoratoriumMonths] = useState(() => {
    if (passedState.moratoriumMonths !== undefined) return Number(passedState.moratoriumMonths);
    if (queryMoratorium !== undefined) return Number(queryMoratorium);
    return initialScheme?.defaultMoratoriumMonths !== undefined ? initialScheme.defaultMoratoriumMonths : 3;
  });

  // User monthly income state for affordability indicator
  const defaultMonthlyIncome = useMemo(() => {
    if (userProfile?.annualFamilyIncome) {
      return Math.round(Number(userProfile.annualFamilyIncome) / 12);
    }
    return 15000; // Realistic prototype benchmark income for micro-entrepreneurs
  }, [userProfile]);

  const [monthlyIncome, setMonthlyIncome] = useState(defaultMonthlyIncome);
  const [isEditingIncome, setIsEditingIncome] = useState(false);

  // Validation state
  const [errors, setErrors] = useState({});
  const [hasCalculated, setHasCalculated] = useState(false);

  // Full schedule expandable toggle
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  // Banner indicating pre-filled scheme from recommendation
  const isPreFilled = Boolean(passedState.schemeName || passedState.schemeId || querySchemeName || querySchemeId);
  const preFilledSchemeName = passedState.schemeName || querySchemeName || initialScheme?.name || "Recommended Scheme";

  // When selected scheme changes in the dropdown, auto-fill its realistic default parameters
  const handleSchemeChange = (schemeId) => {
    setSelectedSchemeId(schemeId);
    const targetScheme = fallbackSchemes.find((s) => s.id === schemeId);
    if (targetScheme) {
      // Use scheme mock default values
      const defLoan = targetScheme.defaultLoanAmount || targetScheme.maxLoanAmount || 100000;
      const defRate = targetScheme.defaultInterestRate || parseFloat(targetScheme.interestRate) || 7.5;
      const defTenure = targetScheme.defaultTenureYears || (targetScheme.tenureMonths ? Math.round(targetScheme.tenureMonths / 12) : 3);
      const defMorat = targetScheme.defaultMoratoriumMonths !== undefined ? targetScheme.defaultMoratoriumMonths : (targetScheme.moratorium?.includes("6") ? 6 : 3);

      setLoanAmount(defLoan);
      setInterestRate(defRate);
      setTenureYears(Math.max(1, defTenure));
      setMoratoriumMonths(defMorat);
      setErrors({});
    }
  };

  // Synchronize if location.state changes
  useEffect(() => {
    if (location.state) {
      if (location.state.schemeId) setSelectedSchemeId(location.state.schemeId);
      if (location.state.loanAmount) setLoanAmount(Number(location.state.loanAmount));
      if (location.state.interestRate) setInterestRate(Number(location.state.interestRate));
      if (location.state.tenureYears) setTenureYears(Number(location.state.tenureYears));
      else if (location.state.tenureMonths) setTenureYears(Math.max(1, Math.round(Number(location.state.tenureMonths) / 12)));
      if (location.state.moratoriumMonths !== undefined) setMoratoriumMonths(Number(location.state.moratoriumMonths));
    }
  }, [location.state]);

  // Validate on input changes
  const validation = useMemo(() => {
    return validateInputs({
      loanAmount,
      interestRate,
      tenureYears,
      moratoriumMonths
    });
  }, [loanAmount, interestRate, tenureYears, moratoriumMonths]);

  // Execute Calculation
  const calculationResult = useMemo(() => {
    if (!validation.isValid) {
      return {
        monthlyEmi: 0,
        totalInterest: 0,
        totalAmountPayable: 0,
        schedule: [],
        principal: Number(loanAmount) || 0,
        effectivePrincipal: Number(loanAmount) || 0,
        moratoriumInterest: 0,
        repaymentMonths: 0,
        totalMonths: 0
      };
    }

    return calculateEMI({
      loanAmount,
      interestRate,
      tenureYears,
      moratoriumMonths
    });
  }, [validation.isValid, loanAmount, interestRate, tenureYears, moratoriumMonths]);

  // Affordability Indicator
  const affordability = useMemo(() => {
    return calculateAffordability(calculationResult.monthlyEmi, monthlyIncome);
  }, [calculationResult.monthlyEmi, monthlyIncome]);

  // Handle explicit "Calculate EMI" button click
  const handleCalculateClick = (e) => {
    e.preventDefault();
    const val = validateInputs({
      loanAmount,
      interestRate,
      tenureYears,
      moratoriumMonths
    });
    setErrors(val.errors);
    if (val.isValid) {
      setHasCalculated(true);
    }
  };

  // Reset to default
  const handleReset = () => {
    handleSchemeChange("micro-finance-scheme");
    setShowFullSchedule(false);
  };

  // Quick Loan Amount Presets
  const loanPresets = [
    { label: "₹50,000", value: 50000 },
    { label: "₹1 Lakh", value: 100000 },
    { label: "₹2 Lakh", value: 200000 },
    { label: "₹5 Lakh", value: 500000 }
  ];

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to={passedState.returnPath || "/schemes"}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-saarthi-navy transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{passedState.returnPath ? "Back to Recommendations" : "Back to Schemes Catalog"}</span>
          </Link>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-saarthi-green transition"
            title="Reset calculator inputs to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Header Title & Subtext matching UI Reference */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-saarthi-navy tracking-tight">
            EMI Calculator
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Calculate your monthly installment based on the selected scheme.
          </p>
        </div>

        {/* Pre-fill Notification Banner if opened from recommendation */}
        {isPreFilled && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center space-x-2.5 text-emerald-950 text-xs sm:text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-saarthi-green flex-shrink-0" />
              <span>
                Pre-filled parameters for: <strong className="font-bold text-emerald-900">{preFilledSchemeName}</strong>
              </span>
            </div>
            <Link
              to={passedState.returnPath || "/recommended-scheme"}
              className="text-xs font-bold text-saarthi-green hover:text-emerald-800 hover:underline flex items-center space-x-1 flex-shrink-0"
            >
              <span>View Recommended Scheme</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>
        )}

        {/* Main 2-Column Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Inputs Card (Inspired by UI Reference) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-card">
            <form onSubmit={handleCalculateClick} className="space-y-5">
              {/* Input 1: Scheme Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Scheme
                </label>
                <div className="relative">
                  <select
                    value={selectedSchemeId}
                    onChange={(e) => handleSchemeChange(e.target.value)}
                    className="w-full appearance-none px-3.5 py-2.5 pr-10 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-saarthi-navy focus:border-transparent transition shadow-2xs"
                  >
                    {fallbackSchemes.map((scheme) => (
                      <option key={scheme.id} value={scheme.id}>
                        {scheme.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Selecting a scheme automatically loads its indicative interest rate and terms.
                </p>
              </div>

              {/* Input 2: Loan Amount (₹) * */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Loan Amount (₹) <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-xs font-bold text-saarthi-navy">
                    {formatINR(loanAmount)}
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold text-xs sm:text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="1000"
                    step="1000"
                    value={loanAmount}
                    onChange={(e) => {
                      setLoanAmount(e.target.value === "" ? "" : Number(e.target.value));
                      if (errors.loanAmount) setErrors((prev) => ({ ...prev, loanAmount: null }));
                    }}
                    placeholder="1,00,000"
                    className={`w-full pl-8 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 transition shadow-2xs ${
                      errors.loanAmount || (loanAmount !== "" && Number(loanAmount) <= 0)
                        ? "border-rose-300 focus:ring-rose-500 bg-rose-50/20"
                        : "border-slate-200 focus:ring-saarthi-navy"
                    }`}
                  />
                </div>
                {/* Preset Chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {loanPresets.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setLoanAmount(preset.value)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition ${
                        Number(loanAmount) === preset.value
                          ? "bg-saarthi-navy text-white border-saarthi-navy"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                {(errors.loanAmount || (loanAmount !== "" && Number(loanAmount) <= 0)) && (
                  <p className="text-[11px] text-rose-600 mt-1 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errors.loanAmount || "Loan amount must be greater than 0"}</span>
                  </p>
                )}
              </div>

              {/* Input 3: Interest Rate (%) * */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Interest Rate (%) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="30"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => {
                      setInterestRate(e.target.value === "" ? "" : Number(e.target.value));
                      if (errors.interestRate) setErrors((prev) => ({ ...prev, interestRate: null }));
                    }}
                    placeholder="6.5"
                    className={`w-full px-3.5 py-2.5 pr-8 rounded-xl border text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 transition shadow-2xs ${
                      errors.interestRate || (interestRate !== "" && Number(interestRate) < 0)
                        ? "border-rose-300 focus:ring-rose-500 bg-rose-50/20"
                        : "border-slate-200 focus:ring-saarthi-navy"
                    }`}
                  />
                  <span className="absolute right-3.5 top-2.5 text-slate-400 font-semibold text-xs sm:text-sm">
                    %
                  </span>
                </div>
                {(errors.interestRate || (interestRate !== "" && Number(interestRate) < 0)) && (
                  <p className="text-[11px] text-rose-600 mt-1 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errors.interestRate || "Interest rate must be 0% or greater"}</span>
                  </p>
                )}
              </div>

              {/* Input 4: Tenure (Years) * */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Tenure (Years) <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-xs font-medium text-slate-500">
                    {tenureYears ? `${Math.round(Number(tenureYears) * 12)} Months` : ""}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min="0.5"
                    max="15"
                    step="0.5"
                    value={tenureYears}
                    onChange={(e) => {
                      setTenureYears(e.target.value === "" ? "" : Number(e.target.value));
                      if (errors.tenureYears) setErrors((prev) => ({ ...prev, tenureYears: null }));
                    }}
                    placeholder="3"
                    className={`w-full px-3.5 py-2.5 pr-14 rounded-xl border text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 transition shadow-2xs ${
                      errors.tenureYears || (tenureYears !== "" && Number(tenureYears) <= 0)
                        ? "border-rose-300 focus:ring-rose-500 bg-rose-50/20"
                        : "border-slate-200 focus:ring-saarthi-navy"
                    }`}
                  />
                  <span className="absolute right-3.5 top-2.5 text-slate-400 font-medium text-xs">
                    Years
                  </span>
                </div>
                {(errors.tenureYears || (tenureYears !== "" && Number(tenureYears) <= 0)) && (
                  <p className="text-[11px] text-rose-600 mt-1 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errors.tenureYears || "Tenure must be greater than 0"}</span>
                  </p>
                )}
              </div>

              {/* Input 5: Moratorium (Months) * */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Moratorium (Months) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="60"
                    step="1"
                    value={moratoriumMonths}
                    onChange={(e) => {
                      setMoratoriumMonths(e.target.value === "" ? 0 : Number(e.target.value));
                      if (errors.moratoriumMonths) setErrors((prev) => ({ ...prev, moratoriumMonths: null }));
                    }}
                    placeholder="3"
                    className={`w-full px-3.5 py-2.5 pr-16 rounded-xl border text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 transition shadow-2xs ${
                      errors.moratoriumMonths || (moratoriumMonths !== "" && Number(moratoriumMonths) < 0)
                        ? "border-rose-300 focus:ring-rose-500 bg-rose-50/20"
                        : "border-slate-200 focus:ring-saarthi-navy"
                    }`}
                  />
                  <span className="absolute right-3.5 top-2.5 text-slate-400 font-medium text-xs">
                    Months
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Grace period where principal repayment is deferred.
                </p>
                {errors.moratoriumMonths && (
                  <p className="text-[11px] text-rose-600 mt-1 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errors.moratoriumMonths}</span>
                  </p>
                )}
              </div>

              {/* Calculate EMI Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-saarthi-green hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition shadow-sm hover:shadow flex items-center justify-center space-x-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculate EMI</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Loan Summary & Repayment Schedule (Inspired by UI Reference) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-card">
              {/* Card Section 1: Loan Summary */}
              <div>
                <h2 className="text-base font-bold text-saarthi-navy mb-4">
                  Loan Summary
                </h2>

                {/* Highlighted Monthly EMI Card (styled exactly like the reference UI box) */}
                <div className="p-4 sm:p-5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-emerald-950">
                    Monthly EMI
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight">
                    {formatINR(calculationResult.monthlyEmi)}
                  </span>
                </div>

                {/* Total Interest Row */}
                <div className="flex items-center justify-between py-3.5 border-b border-slate-100 text-xs sm:text-sm">
                  <span className="text-slate-600 font-medium">Total Interest</span>
                  <span className="text-slate-900 font-bold">
                    {formatINR(calculationResult.totalInterest)}
                  </span>
                </div>

                {/* Total Amount Payable Row */}
                <div className="flex items-center justify-between py-3.5 text-xs sm:text-sm">
                  <span className="text-slate-600 font-medium">Total Amount Payable</span>
                  <span className="text-slate-950 font-black text-base sm:text-lg">
                    {formatINR(calculationResult.totalAmountPayable)}
                  </span>
                </div>
              </div>

              {/* Card Section 2: Repayment Schedule (First 5 Months) */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                    Repayment Schedule <span className="text-slate-400 font-normal">({showFullSchedule ? `All ${calculationResult.schedule.length} Months` : "First 5 Months"})</span>
                  </h3>
                  {calculationResult.repaymentMonths > 0 && (
                    <span className="text-[11px] text-slate-500 font-medium">
                      {calculationResult.repaymentMonths} active EMI payments
                    </span>
                  )}
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto rounded-xl border border-slate-200/80">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200/80">
                      <tr>
                        <th className="py-2.5 px-3.5">Month</th>
                        <th className="py-2.5 px-3.5">Principal</th>
                        <th className="py-2.5 px-3.5">Interest</th>
                        <th className="py-2.5 px-3.5 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {calculationResult.schedule.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-4 text-center text-slate-400">
                            Enter valid loan details above to view the schedule.
                          </td>
                        </tr>
                      ) : (
                        (showFullSchedule ? calculationResult.schedule : calculationResult.schedule.slice(0, 5)).map((row) => (
                          <tr key={row.month} className="hover:bg-slate-50/60 transition">
                            <td className="py-2.5 px-3.5 font-semibold text-slate-900">
                              {row.month}
                            </td>
                            <td className="py-2.5 px-3.5 text-slate-800">
                              {formatINR(row.principal)}
                            </td>
                            <td className="py-2.5 px-3.5 text-slate-600">
                              {formatINR(row.interest)}
                            </td>
                            <td className="py-2.5 px-3.5 text-right font-semibold text-slate-900">
                              {formatINR(row.balance)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* View Full Schedule Toggle Button */}
                {calculationResult.schedule.length > 5 && (
                  <div className="mt-3 text-right">
                    <button
                      type="button"
                      onClick={() => setShowFullSchedule(!showFullSchedule)}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-saarthi-green hover:text-emerald-800 hover:underline transition"
                    >
                      <span>{showFullSchedule ? "Show First 5 Months" : "View Full Schedule"}</span>
                      {showFullSchedule ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Prototype Affordability Indicator Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-saarthi-green" />
                  <h3 className="text-xs sm:text-sm font-bold text-saarthi-navy">
                    Income Affordability Assessment
                  </h3>
                </div>

                {/* Explicit Prototype Label */}
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 tracking-wider">
                  Prototype Estimate
                </span>
              </div>

              {/* Monthly Income Setting Row */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-slate-500 font-medium">Assumed Monthly Household Income:</span>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">
                    {formatINR(monthlyIncome)} <span className="text-slate-400 font-normal text-xs">/ month</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {isEditingIncome ? (
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs text-slate-400">₹</span>
                      <input
                        type="number"
                        min="1000"
                        step="1000"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(Number(e.target.value) || 0)}
                        className="w-28 px-2 py-1 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-saarthi-navy"
                      />
                      <button
                        type="button"
                        onClick={() => setIsEditingIncome(false)}
                        className="px-2.5 py-1 rounded-lg bg-saarthi-navy text-white text-[11px] font-bold"
                      >
                        Done
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditingIncome(true)}
                      className="text-xs font-semibold text-saarthi-green hover:underline"
                    >
                      Adjust Income
                    </button>
                  )}
                </div>
              </div>

              {/* Debt Burden Progress Bar */}
              <div className="space-y-1.5 mb-3">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-600">Debt Burden (EMI-to-Income Ratio):</span>
                  <span className={`px-2 py-0.5 rounded-md border text-[11px] font-bold ${affordability.badgeColor}`}>
                    {affordability.category}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${affordability.barColor}`}
                    style={{ width: `${Math.min(100, affordability.ratio)}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {affordability.description}
              </p>

              {/* Context Note */}
              <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-start space-x-1.5">
                <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>
                  This affordability indicator is an educational simulation based on your declared profile income. It helps assess whether monthly repayments fit within standard financial limits.
                </span>
              </div>
            </div>

            {/* Next Steps in Citizen Journey */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-saarthi-green block">
                    Next Step in Your Entrepreneur Journey
                  </span>
                  <h4 className="text-sm font-black text-saarthi-navy mt-0.5">
                    Ready to Take the Next Step?
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Connect with local CSC assistance or organize your required documentation.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => navigate(`/partners?scheme=${encodeURIComponent(selectedSchemeId)}`)}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-saarthi-navy border border-slate-300 text-xs font-bold transition shadow-2xs"
                  >
                    Find Nearby Partner
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/document-guidance?schemeId=${encodeURIComponent(selectedSchemeId)}`)}
                    className="px-4 py-2 rounded-xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-black transition shadow-xs flex items-center space-x-1"
                  >
                    <span>Prepare Documents</span>
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </div>
              </div>
            </div>

            {/* Statutory Prototype Disclaimer Banner */}
            <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-[11px] text-slate-500 leading-relaxed space-y-1">
              <div className="font-bold text-slate-700 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
                <span>Prototype Disclaimer & Educational Guidance</span>
              </div>
              <p>
                This calculator provides indicative estimates for prototype evaluation only. It does not constitute formal financial advice, credit appraisal, or guaranteed loan approval. Final sanction terms, interest rates, collateral conditions, and moratorium permissions are subject to official verification and guidelines of the respective lending financial institutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

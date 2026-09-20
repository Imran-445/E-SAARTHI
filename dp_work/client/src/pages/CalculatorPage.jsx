import React, { useState } from "react";
import { Calculator, IndianRupee, ShieldCheck, Sparkles, Percent, HelpCircle } from "lucide-react";

export default function CalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(200000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureMonths, setTenureMonths] = useState(36);
  const [subsidyScheme, setSubsidyScheme] = useState("pmegp_rural"); // 'pmegp_rural', 'pmegp_urban', 'svanidhi', 'vishwakarma', 'none'

  // Determine subsidy percentage or grant
  let subsidyPercent = 0;
  let fixedGrant = 0;
  let effectiveInterestRate = interestRate;

  if (subsidyScheme === "pmegp_rural") {
    subsidyPercent = 35; // 35% margin money subsidy
  } else if (subsidyScheme === "pmegp_urban") {
    subsidyPercent = 25; // 25% margin money subsidy
  } else if (subsidyScheme === "svanidhi") {
    effectiveInterestRate = Math.max(0, interestRate - 7); // 7% interest rebate
  } else if (subsidyScheme === "vishwakarma") {
    effectiveInterestRate = 5.0; // 5% fixed concessional rate
    fixedGrant = 15000; // ₹15,000 toolkit voucher
  }

  // Calculation logic
  const principalAfterSubsidy = Math.max(0, loanAmount - (loanAmount * subsidyPercent) / 100);
  const monthlyInterestRatio = effectiveInterestRate / 12 / 100;
  
  let calculatedEmi = 0;
  if (monthlyInterestRatio > 0 && tenureMonths > 0) {
    calculatedEmi = Math.round(
      (principalAfterSubsidy * monthlyInterestRatio * Math.pow(1 + monthlyInterestRatio, tenureMonths)) /
      (Math.pow(1 + monthlyInterestRatio, tenureMonths) - 1)
    );
  } else if (tenureMonths > 0) {
    calculatedEmi = Math.round(principalAfterSubsidy / tenureMonths);
  }

  const totalRepayment = calculatedEmi * tenureMonths;
  const totalInterest = Math.max(0, totalRepayment - principalAfterSubsidy);
  const totalSubsidyBenefit = (loanAmount * subsidyPercent) / 100 + fixedGrant;

  return (
    <div className="py-10 bg-slate-50 min-h-screen text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft mb-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-saarthi-green">
              Financial Transparency Tool
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-saarthi-navy mt-1">
              Government Loan & Subsidy EMI Calculator
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Understand how Government of India margin money subsidies and interest subventions drastically reduce your actual monthly repayment obligations.
            </p>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <h2 className="text-base font-bold text-saarthi-navy flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-saarthi-green" />
              <span>Loan & Scheme Parameters</span>
            </h2>

            {/* Scheme Subsidy Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-2">
                Apply Government Subsidy Model
              </label>
              <select
                value={subsidyScheme}
                onChange={(e) => setSubsidyScheme(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
              >
                <option value="pmegp_rural">PMEGP Special Category (35% Margin Money Capital Subsidy)</option>
                <option value="pmegp_urban">PMEGP Urban Special Category (25% Capital Subsidy)</option>
                <option value="svanidhi">PM SVANidhi (7% Direct Interest Rebate)</option>
                <option value="vishwakarma">PM Vishwakarma (5% Fixed Interest + ₹15k Toolkit Grant)</option>
                <option value="none">Standard Bank Loan (0% Subsidy)</option>
              </select>
            </div>

            {/* Loan Amount Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-saarthi-navy">
                  Total Project / Loan Amount
                </label>
                <span className="text-base font-black text-saarthi-navy">
                  ₹{Number(loanAmount).toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="5000000"
                step="10000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-saarthi-navy cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>₹10,000</span>
                <span>₹10 Lakh</span>
                <span>₹50 Lakh</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-saarthi-navy">
                  Base Bank Annual Interest Rate (%)
                </label>
                <span className="text-base font-black text-saarthi-navy">
                  {interestRate}%
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="18"
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-saarthi-navy cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>4% (Concessional)</span>
                <span>9% (Standard MSME)</span>
                <span>18% (Commercial)</span>
              </div>
            </div>

            {/* Repayment Tenure */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-saarthi-navy">
                  Repayment Tenure
                </label>
                <span className="text-base font-black text-saarthi-navy">
                  {tenureMonths} Months ({Math.round(tenureMonths / 12)} Yrs)
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="84"
                step="6"
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="w-full accent-saarthi-navy cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>1 Year</span>
                <span>3 Years</span>
                <span>7 Years</span>
              </div>
            </div>
          </div>

          {/* Result Output Pane (5 cols) */}
          <div className="lg:col-span-5 bg-saarthi-navy text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                Calculated Estimate
              </span>
              <div className="mt-4">
                <span className="text-xs text-slate-300 block">Effective Monthly EMI:</span>
                <div className="text-4xl font-black text-white tracking-tight mt-1">
                  ₹{calculatedEmi.toLocaleString("en-IN")}
                  <span className="text-xs text-slate-400 font-normal"> / month</span>
                </div>
              </div>

              {/* Subsidy Highlights */}
              <div className="mt-8 space-y-3.5 pt-6 border-t border-slate-700/80 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Total Government Subsidy Benefit:</span>
                  <span className="font-bold text-emerald-400 text-sm">
                    ₹{Math.round(totalSubsidyBenefit).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Principal Repaid by Borrower:</span>
                  <span className="font-bold text-slate-100">
                    ₹{Math.round(principalAfterSubsidy).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Effective Interest Rate:</span>
                  <span className="font-bold text-amber-300">
                    {effectiveInterestRate.toFixed(1)}% p.a.
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Total Interest Payable:</span>
                  <span className="font-bold text-slate-100">
                    ₹{Math.round(totalInterest).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-700/80 text-[11px] text-slate-400 leading-relaxed">
              💡 <strong>Margin Money Note:</strong> Under PMEGP, the subsidy is deposited into a bank escrow account for 3 years, reducing your interest burden immediately.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

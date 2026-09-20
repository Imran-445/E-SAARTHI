/**
 * Saarthi (SIH 2026) - EMI & Financial Planning Calculator Engine
 * 
 * Implements standard reducing-balance loan amortization, moratorium grace period handling,
 * Indian Rupee formatting, input validation, and prototype affordability estimation.
 */

/**
 * Format numbers in Indian Rupee format (e.g. ₹ 1,00,000)
 * @param {number|string} amount
 * @param {boolean} includeSymbol
 * @returns {string}
 */
export function formatINR(amount, includeSymbol = true) {
  const num = Number(amount);
  if (isNaN(num)) return includeSymbol ? "₹ 0" : "0";
  
  // Format to standard Indian comma grouping (en-IN)
  const formatted = Math.round(num).toLocaleString("en-IN");
  return includeSymbol ? `₹ ${formatted}` : formatted;
}

/**
 * Validates EMI calculator input fields
 * Requirements:
 * - loan amount > 0
 * - interest rate >= 0
 * - tenure > 0
 * - moratorium >= 0 and moratorium < tenure in months
 */
export function validateInputs({ loanAmount, interestRate, tenureYears, moratoriumMonths = 0 }) {
  const errors = {};
  const p = Number(loanAmount);
  const r = Number(interestRate);
  const t = Number(tenureYears);
  const m = Number(moratoriumMonths) || 0;

  if (isNaN(p) || p <= 0) {
    errors.loanAmount = "Loan amount must be greater than 0";
  }

  if (isNaN(r) || r < 0) {
    errors.interestRate = "Interest rate must be 0% or greater";
  }

  if (isNaN(t) || t <= 0) {
    errors.tenureYears = "Tenure must be greater than 0 years";
  }

  const totalMonths = Math.round(t * 12);
  if (isNaN(m) || m < 0) {
    errors.moratoriumMonths = "Moratorium period cannot be negative";
  } else if (m >= totalMonths) {
    errors.moratoriumMonths = `Moratorium period must be less than total loan tenure (${totalMonths} months)`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Calculate Monthly EMI, Total Interest, Total Amount Payable, and Full Repayment Schedule.
 * 
 * Supports:
 * - Reducing balance standard formula
 * - Zero-interest loans (e.g., promotional or interest-free schemes)
 * - Moratorium grace period accounting (principal deferred, simple interest accrued during moratorium capitalized or amortized)
 * - Exact ₹0 terminating balance in amortization table
 * 
 * @param {Object} params
 * @param {number} params.loanAmount
 * @param {number} params.interestRate Annual interest rate in %
 * @param {number} params.tenureYears Tenure in years
 * @param {number} params.moratoriumMonths Moratorium in months (optional, defaults to 0)
 * @returns {Object} { monthlyEmi, totalInterest, totalAmountPayable, schedule, principal, effectivePrincipal, moratoriumInterest }
 */
export function calculateEMI({ loanAmount, interestRate, tenureYears, moratoriumMonths = 0 }) {
  const principal = Math.max(0, Number(loanAmount) || 0);
  const annualRate = Math.max(0, Number(interestRate) || 0);
  const years = Math.max(0, Number(tenureYears) || 0);
  const moratorium = Math.max(0, Number(moratoriumMonths) || 0);

  const totalMonths = Math.round(years * 12);
  if (principal <= 0 || totalMonths <= 0) {
    return {
      monthlyEmi: 0,
      totalInterest: 0,
      totalAmountPayable: 0,
      schedule: [],
      principal: 0,
      effectivePrincipal: 0,
      moratoriumInterest: 0,
      repaymentMonths: 0,
      totalMonths: 0
    };
  }

  // Active repayment months after moratorium
  // If moratorium is specified, repayment occurs over the remaining months.
  // Standard Indian banking practice: total tenure includes moratorium; repayment is over (totalMonths - moratorium).
  const repaymentMonths = Math.max(1, totalMonths - moratorium);
  const monthlyRate = annualRate / 12 / 100;

  // Moratorium simple interest accrued during grace period
  let moratoriumInterest = 0;
  if (moratorium > 0 && annualRate > 0) {
    moratoriumInterest = (principal * (annualRate / 100) * moratorium) / 12;
  }

  // Capitalized principal at end of moratorium
  const effectivePrincipal = principal + moratoriumInterest;

  let monthlyEmi = 0;
  if (monthlyRate === 0) {
    // 0% interest loan
    monthlyEmi = Math.round(effectivePrincipal / repaymentMonths);
  } else {
    // Standard reducing balance formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
    const factor = Math.pow(1 + monthlyRate, repaymentMonths);
    monthlyEmi = Math.round((effectivePrincipal * monthlyRate * factor) / (factor - 1));
  }

  // Generate repayment schedule for all repayment months
  const schedule = [];
  let remainingBalance = effectivePrincipal;
  let totalInterestAccumulated = 0;

  for (let month = 1; month <= repaymentMonths; month++) {
    // Interest component for this month on remaining balance
    let interestComponent = Math.round(remainingBalance * monthlyRate);
    let principalComponent = monthlyEmi - interestComponent;

    // Boundary adjustment on the last month to ensure remaining balance zeroes out exactly
    if (month === repaymentMonths || principalComponent >= remainingBalance) {
      principalComponent = remainingBalance;
      remainingBalance = 0;
    } else {
      remainingBalance = Math.max(0, remainingBalance - principalComponent);
    }

    totalInterestAccumulated += interestComponent;

    schedule.push({
      month,
      principal: principalComponent,
      interest: interestComponent,
      balance: remainingBalance,
      emi: principalComponent + interestComponent
    });

    if (remainingBalance === 0) break;
  }

  const totalAmountPayable = principal + totalInterestAccumulated;
  const totalInterest = Math.max(0, totalInterestAccumulated);

  return {
    monthlyEmi,
    totalInterest,
    totalAmountPayable,
    schedule,
    principal,
    effectivePrincipal: Math.round(effectivePrincipal),
    moratoriumInterest: Math.round(moratoriumInterest),
    repaymentMonths,
    totalMonths
  };
}

/**
 * Calculates prototype affordability indicator based on user income and monthly EMI
 * @param {number} monthlyEmi
 * @param {number} monthlyIncome
 * @returns {Object} { ratio, category, level, badgeColor, barColor, description }
 */
export function calculateAffordability(monthlyEmi, monthlyIncome) {
  const emi = Number(monthlyEmi) || 0;
  const income = Number(monthlyIncome) || 0;

  if (income <= 0) {
    return {
      ratio: 0,
      category: "Income Not Provided",
      level: "neutral",
      badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
      barColor: "bg-slate-400",
      description: "Enter your monthly income above to calculate prototype affordability."
    };
  }

  const ratio = Math.round((emi / income) * 100);

  if (ratio <= 30) {
    return {
      ratio,
      category: "Comfortable (High Affordability)",
      level: "comfortable",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      barColor: "bg-emerald-600",
      description: `Estimated EMI is ${ratio}% of your monthly income. This is well within the recommended 30% threshold for sustainable business debt.`
    };
  } else if (ratio <= 50) {
    return {
      ratio,
      category: "Manageable (Moderate Affordability)",
      level: "manageable",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
      barColor: "bg-amber-500",
      description: `Estimated EMI is ${ratio}% of your monthly income. May require disciplined cash flow management or exploring longer loan tenures.`
    };
  } else {
    return {
      ratio,
      category: "High Debt Burden (Low Affordability)",
      level: "high_burden",
      badgeColor: "bg-rose-50 text-rose-800 border-rose-200",
      barColor: "bg-rose-500",
      description: `Estimated EMI is ${ratio}% of your monthly income. We recommend reducing the loan amount or applying for high-subsidy schemes (e.g. PMEGP).`
    };
  }
}

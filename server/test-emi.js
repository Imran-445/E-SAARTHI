// Saarthi (SIH 2026) - Automated EMI Calculation Test Suite
import { calculateEMI, validateInputs, calculateAffordability, formatINR } from "../client/src/utils/emiCalculator.js";

console.log("=== SAARTHI EMI & FINANCIAL PLANNING CALCULATOR TEST SUITE ===");

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    console.error(`  ✗ FAIL: ${message}`);
  }
}

// Test Case 1: Reference UI Scenario (Micro Finance Scheme: P=1,00,000, R=6.5%, T=3 yrs, M=3 months)
console.log("\nTest Case 1: Reference UI Scenario (P=1,00,000, R=6.5%, T=3 yrs, M=3 months)");
const res1 = calculateEMI({ loanAmount: 100000, interestRate: 6.5, tenureYears: 3, moratoriumMonths: 3 });
assert(res1.monthlyEmi > 3000 && res1.monthlyEmi < 3500, `Monthly EMI should be reasonable (${res1.monthlyEmi})`);
assert(res1.schedule.length === 33, `Schedule should have 33 active repayment months (${res1.schedule.length})`);
assert(res1.schedule[res1.schedule.length - 1].balance === 0, "Final remaining balance must be exactly 0");
assert(res1.totalAmountPayable > 100000, `Total payable should exceed principal (${res1.totalAmountPayable})`);
assert(res1.moratoriumInterest === 1625, `Moratorium simple interest = 100000 * 0.065 * 3/12 = 1625 (got ${res1.moratoriumInterest})`);

// Test Case 2: Standard Loan without Moratorium (P=1,00,000, R=8.5%, T=2 yrs, M=0)
console.log("\nTest Case 2: Standard Loan without Moratorium (P=1,00,000, R=8.5%, T=2 yrs, M=0)");
const res2 = calculateEMI({ loanAmount: 100000, interestRate: 8.5, tenureYears: 2, moratoriumMonths: 0 });
assert(res2.schedule.length === 24, `Schedule should have 24 months (${res2.schedule.length})`);
assert(res2.monthlyEmi === 4546, `Standard formula EMI should be 4546 (got ${res2.monthlyEmi})`);
assert(res2.schedule[23].balance === 0, "Final remaining balance is 0");
assert(res2.moratoriumInterest === 0, "Zero moratorium interest");

// Test Case 3: Street Vendor Micro-credit (PM SVANidhi: P=20,000, R=7.0%, T=1 yr, M=0)
console.log("\nTest Case 3: Street Vendor Micro-credit (P=20,000, R=7.0%, T=1 yr, M=0)");
const res3 = calculateEMI({ loanAmount: 20000, interestRate: 7.0, tenureYears: 1, moratoriumMonths: 0 });
assert(res3.schedule.length === 12, `12 months repayment schedule (${res3.schedule.length})`);
assert(res3.schedule[11].balance === 0, "Final remaining balance is 0");

// Test Case 4: Zero-Interest Loan (P=50,000, R=0%, T=2 yrs, M=0)
console.log("\nTest Case 4: Zero-Interest Loan (P=50,000, R=0%, T=2 yrs, M=0)");
const res4 = calculateEMI({ loanAmount: 50000, interestRate: 0, tenureYears: 2, moratoriumMonths: 0 });
assert(res4.monthlyEmi === Math.round(50000 / 24), `Monthly EMI should be 50000/24 = 2083 (got ${res4.monthlyEmi})`);
assert(res4.totalInterest === 0, "Total interest must be 0 for 0% loan");
assert(res4.totalAmountPayable === 50000, "Total amount payable must equal principal");

// Test Case 5: Large Enterprise Loan (Stand-Up India / PMEGP: P=15,00,000, R=9.5%, T=5 yrs, M=12)
console.log("\nTest Case 5: Large Enterprise Loan (P=15,00,000, R=9.5%, T=5 yrs, M=12)");
const res5 = calculateEMI({ loanAmount: 1500000, interestRate: 9.5, tenureYears: 5, moratoriumMonths: 12 });
assert(res5.schedule.length === 48, `48 repayment months after 12m moratorium (${res5.schedule.length})`);
assert(res5.schedule[47].balance === 0, "Final remaining balance is 0");

// Test Case 6: Input Validation
console.log("\nTest Case 6: Input Validation Verification");
const v1 = validateInputs({ loanAmount: 0, interestRate: 6.5, tenureYears: 3 });
assert(!v1.isValid && v1.errors.loanAmount, "Flags loan amount <= 0");

const v2 = validateInputs({ loanAmount: 100000, interestRate: -2, tenureYears: 3 });
assert(!v2.isValid && v2.errors.interestRate, "Flags interest rate < 0");

const v3 = validateInputs({ loanAmount: 100000, interestRate: 6.5, tenureYears: 0 });
assert(!v3.isValid && v3.errors.tenureYears, "Flags tenure <= 0");

const v4 = validateInputs({ loanAmount: 100000, interestRate: 6.5, tenureYears: 3, moratoriumMonths: 40 });
assert(!v4.isValid && v4.errors.moratoriumMonths, "Flags moratorium >= tenure in months");

const v5 = validateInputs({ loanAmount: 100000, interestRate: 6.5, tenureYears: 3, moratoriumMonths: 3 });
assert(v5.isValid, "Valid inputs pass validation");

// Test Case 7: Affordability Indicator
console.log("\nTest Case 7: Affordability Indicator Calculations");
const aff1 = calculateAffordability(3000, 15000); // 20% -> comfortable
assert(aff1.ratio === 20 && aff1.level === "comfortable", `20% DTI is comfortable (got ${aff1.level})`);

const aff2 = calculateAffordability(6000, 15000); // 40% -> manageable
assert(aff2.ratio === 40 && aff2.level === "manageable", `40% DTI is manageable (got ${aff2.level})`);

const aff3 = calculateAffordability(9000, 15000); // 60% -> high burden
assert(aff3.ratio === 60 && aff3.level === "high_burden", `60% DTI is high burden (got ${aff3.level})`);

// Test Case 8: Indian Rupee Formatting
console.log("\nTest Case 8: Indian Rupee Formatting");
assert(formatINR(100000).replace(/\s+/g, " ") === "₹ 1,00,000", `100000 formatted as ₹ 1,00,000 (got ${formatINR(100000)})`);
assert(formatINR(114952).replace(/\s+/g, " ") === "₹ 1,14,952", `114952 formatted as ₹ 1,14,952 (got ${formatINR(114952)})`);

console.log(`\n=== RESULTS: ${passedTests} / ${totalTests} TESTS PASSED ===`);
if (passedTests !== totalTests) {
  process.exit(1);
}

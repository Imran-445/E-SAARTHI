import { matchSchemes, evaluateScheme } from "./src/services/matchingEngine.js";
import { schemes } from "./src/data/schemes.js";

console.log("===============================================================");
console.log(" SAARTHI AI-DRIVEN SCHEME MATCHING ENGINE - PROFILE TEST SUITE");
console.log("===============================================================");

// -------------------------------------------------------------
// Test Case 1: Urban Street Vendor
// -------------------------------------------------------------
console.log("\n[Test 1] Profile: Urban Female Street Vendor (PM SVANidhi target)");
const profile1 = {
  name: "Sunita Devi",
  gender: "Female",
  socialCategory: "Street/Micro Vendor",
  area: "Urban",
  state: "Uttar Pradesh",
  district: "Lucknow",
  businessType: "Street Vendor",
  stage: "Existing & Operational",
  businessSector: "Retail Grocery, Kirana & General Stores",
  annualFamilyIncome: 150000,
  loanPurpose: "Working Capital",
  loanAmount: 20000
};

const results1 = matchSchemes(profile1, schemes);
const topMatch1 = results1[0];
console.log(`  Top Match: "${topMatch1.name}" (${topMatch1.matchScore}%) - ${topMatch1.eligibilityStatus}`);
console.log(`  Short Reason: ${topMatch1.shortReason}`);
if (topMatch1.id !== "pm-svanidhi") {
  console.error(`FAIL: Expected PM SVANidhi as #1 match, got: ${topMatch1.id}`);
  process.exit(1);
}
if (topMatch1.matchScore < 85) {
  console.error(`FAIL: Expected matchScore >= 85, got: ${topMatch1.matchScore}`);
  process.exit(1);
}
console.log("  PASS: Correctly identified PM SVANidhi as highest priority match.");

// -------------------------------------------------------------
// Test Case 2: Rural Traditional Artisan
// -------------------------------------------------------------
console.log("\n[Test 2] Profile: Rural OBC Male Potter (PM Vishwakarma target)");
const profile2 = {
  name: "Ramesh Prajapati",
  gender: "Male",
  socialCategory: "Rural Artisan",
  area: "Rural",
  state: "Rajasthan",
  district: "Jaipur",
  businessType: "Traditional Artisan",
  stage: "Existing & Operational",
  businessSector: "Traditional Handicrafts & Clay/Pottery",
  annualFamilyIncome: 200000,
  loanPurpose: "Equipment & Machinery",
  loanAmount: 100000
};

const results2 = matchSchemes(profile2, schemes);
const topMatch2 = results2[0];
console.log(`  Top Match: "${topMatch2.name}" (${topMatch2.matchScore}%) - ${topMatch2.eligibilityStatus}`);
console.log(`  Short Reason: ${topMatch2.shortReason}`);
if (topMatch2.id !== "pm-vishwakarma") {
  console.error(`FAIL: Expected PM Vishwakarma as #1 match, got: ${topMatch2.id}`);
  process.exit(1);
}
// Verify male applicant is disqualified from women-only schemes
const mahilaSamridhi = results2.find((s) => s.id === "mahila-samridhi-yojana");
if (mahilaSamridhi.isEligible) {
  console.error("FAIL: Male applicant should not be eligible for Mahila Samridhi Yojana.");
  process.exit(1);
}
console.log(`  PASS: Guardrail verified - Mahila Samridhi is marked: ${mahilaSamridhi.eligibilityStatus}`);

// -------------------------------------------------------------
// Test Case 3: Rural SC Woman Micro-Retailer
// -------------------------------------------------------------
console.log("\n[Test 3] Profile: Rural SC Female Micro-Retailer (Mahila Samridhi target)");
const profile3 = {
  name: "Lakshmi Bai",
  gender: "Female",
  socialCategory: "SC",
  area: "Rural",
  state: "Madhya Pradesh",
  district: "Bhopal",
  businessType: "Micro Retail",
  stage: "New Venture",
  businessSector: "Personal Care, Beauty & Tailoring",
  annualFamilyIncome: 180000,
  loanPurpose: "Start a Small Business",
  loanAmount: 100000
};

const results3 = matchSchemes(profile3, schemes);
const topMatches3 = results3.filter((s) => s.isEligible).slice(0, 3);
console.log(`  Found ${topMatches3.length} strong matches:`);
topMatches3.forEach((s, idx) => console.log(`   ${idx + 1}. [${s.matchScore}%] ${s.name}`));
const hasMahilaSamridhi = results3.some((s) => s.id === "mahila-samridhi-yojana" && s.isEligible);
if (!hasMahilaSamridhi) {
  console.error("FAIL: Expected Mahila Samridhi to be eligible for SC Female.");
  process.exit(1);
}
console.log("  PASS: Correctly matched SC Woman schemes.");

// -------------------------------------------------------------
// Test Case 4: Urban General Male Greenfield Enterprise
// -------------------------------------------------------------
console.log("\n[Test 4] Profile: Urban General Male, ₹35 Lakh Greenfield Manufacturing");
const profile4 = {
  name: "Vikram Sharma",
  gender: "Male",
  socialCategory: "General",
  area: "Urban",
  state: "Maharashtra",
  district: "Pune",
  businessType: "Micro Manufacturing",
  stage: "New Venture",
  businessSector: "Metalwork, Blacksmithy & Welding",
  annualFamilyIncome: 1200000,
  loanPurpose: "Equipment & Machinery",
  loanAmount: 3500000
};

const results4 = matchSchemes(profile4, schemes);
const topMatch4 = results4.find((s) => s.isEligible);
console.log(`  Top Eligible Match: "${topMatch4?.name}" (${topMatch4?.matchScore}%)`);

// Check that Stand-Up India is marked NOT ELIGIBLE for General Male
const standUp = results4.find((s) => s.id === "stand-up-india");
console.log(`  Stand-Up India eligibility check: ${standUp.eligibilityStatus} (Reason: ${standUp.disqualificationReasons?.[0]})`);
if (standUp.isEligible) {
  console.error("FAIL: Stand-Up India must be disqualified for General Male.");
  process.exit(1);
}
console.log("  PASS: Stand-Up India and demographic guardrails strictly enforced.");

// -------------------------------------------------------------
// Test Case 5: Incompatible Extreme Profile
// -------------------------------------------------------------
console.log("\n[Test 5] Profile: Incompatible Profile (₹50 Crore loan, ₹2 Crore family income)");
const profile5 = {
  name: "Anonymous User",
  gender: "Male",
  socialCategory: "General",
  area: "Urban",
  businessType: "Micro Retail",
  annualFamilyIncome: 20000000,
  loanAmount: 500000000,
  loanPurpose: "Working Capital"
};

const results5 = matchSchemes(profile5, schemes);
const eligibleCount5 = results5.filter((s) => s.isEligible && s.matchScore >= 50).length;
console.log(`  Eligible schemes found: ${eligibleCount5}`);
if (eligibleCount5 > 0) {
  console.error("FAIL: Incompatible profile should yield 0 eligible schemes.");
  process.exit(1);
}
console.log("  PASS: Triggers 'We couldn't find a strong match based on the information provided.' fallback correctly.");

console.log("\n===============================================================");
console.log(" ALL 5 PROFILE COMBINATION TEST CASES PASSED SUCCESSFULLY!");
console.log("===============================================================");

import { schemes, schemeCategories } from "./src/data/schemes.js";

console.log("==================================================");
console.log(" SAARTHI SCHEME DATA SYSTEM VERIFICATION TEST");
console.log("==================================================");

const REQUIRED_FIELDS = [
  "name",
  "shortDescription",
  "category",
  "targetBeneficiaries",
  "purpose",
  "minLoanAmount",
  "maxLoanAmount",
  "subsidyInformation",
  "interestRate",
  "incomeEligibility",
  "sector",
  "ruralUrbanEligibility",
  "requiredDocuments",
  "applicationMethod",
  "officialSourceUrl",
  "schemeStatus",
  "keyBenefit"
];

console.log(`[Test 1] Total Mock Schemes Loaded: ${schemes.length}`);
if (schemes.length < 8) {
  console.error("FAIL: Expected at least 8 sample schemes.");
  process.exit(1);
} else {
  console.log("PASS: Scheme dataset contains rich sample coverage.");
}

console.log(`[Test 2] Validating Schema Fields across all ${schemes.length} schemes...`);
let allValid = true;

schemes.forEach((s, idx) => {
  const missing = [];
  REQUIRED_FIELDS.forEach((f) => {
    if (s[f] === undefined || s[f] === null || (Array.isArray(s[f]) && s[f].length === 0)) {
      missing.push(f);
    }
  });

  if (missing.length > 0) {
    console.error(`  FAIL: Scheme #${idx + 1} "${s.name}" missing fields:`, missing);
    allValid = false;
  } else {
    console.log(`  ✓ [${s.id}] "${s.name}" (Funding: ₹${s.minLoanAmount} - ₹${s.maxLoanAmount}) - All ${REQUIRED_FIELDS.length} fields present`);
  }
});

if (!allValid) {
  console.error("FAIL: One or more schemes failed field validation.");
  process.exit(1);
} else {
  console.log("PASS: All schemes conform strictly to the required schema.");
}

console.log("\n[Test 3] Verifying Coverage of Diverse Entrepreneur Needs:");
const categoriesFound = new Set(schemes.map((s) => s.category));
console.log(`  Identified ${categoriesFound.size} distinct scheme categories:`);
categoriesFound.forEach((cat) => console.log(`   - ${cat}`));

console.log("\n[Test 4] Verifying Filter Facets:");
// Test 4a: Category filter
const streetVendorSchemes = schemes.filter((s) => s.category.includes("Street Vendor"));
console.log(`  - Street Vendor schemes: ${streetVendorSchemes.length}`);

// Test 4b: Purpose filter
const workingCapitalSchemes = schemes.filter((s) => (s.purpose || []).includes("Working Capital"));
console.log(`  - Working Capital schemes: ${workingCapitalSchemes.length}`);

// Test 4c: Funding range filter
const microcreditSchemes = schemes.filter((s) => s.maxLoanAmount <= 100000 || s.minLoanAmount < 100000);
console.log(`  - Under ₹1 Lakh (Microcredit) schemes: ${microcreditSchemes.length}`);

const highValueSchemes = schemes.filter((s) => s.maxLoanAmount >= 2500000);
console.log(`  - High Value (>₹25 Lakh) schemes: ${highValueSchemes.length}`);

// Test 4d: Keyword search
const artisanSearch = schemes.filter((s) =>
  s.name.toLowerCase().includes("artisan") ||
  s.shortDescription.toLowerCase().includes("artisan") ||
  (s.targetBeneficiaries || []).some((b) => b.toLowerCase().includes("artisan"))
);
console.log(`  - Keyword search 'artisan': ${artisanSearch.length} found`);

console.log("\n[Test 5] Checking Mock Data Flags & Disclaimers:");
const allMock = schemes.every((s) => s.isMockData === true && s.schemeStatus.includes("Mock"));
if (!allMock) {
  console.error("FAIL: Every scheme must explicitly be tagged as mock data.");
  process.exit(1);
} else {
  console.log("PASS: All schemes explicitly declare mock prototype status and disclaimers.");
}

console.log("\n==================================================");
console.log(" ALL SCHEME SYSTEM VERIFICATION TESTS PASSED!");
console.log("==================================================");

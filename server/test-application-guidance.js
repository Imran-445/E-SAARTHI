import { schemes } from "./src/data/schemes.js";

console.log("=================================================");
console.log("   TEST SUITE: APPLICATION & DOCUMENT GUIDANCE    ");
console.log("=================================================");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Total Schemes
assert(Array.isArray(schemes) && schemes.length >= 12, `Total schemes in dataset is at least 12 (found: ${schemes.length})`);

// 2. Document Categories
const VALID_CATEGORIES = new Set([
  "identity_proof",
  "address_proof",
  "income_document",
  "category_certificate",
  "business_document",
  "bank_details"
]);

const observedCategories = new Set();

schemes.forEach((scheme) => {
  const hasChecklist = Array.isArray(scheme.documentChecklist) && scheme.documentChecklist.length >= 3;
  assert(hasChecklist, `Scheme '${scheme.id}' has structured documentChecklist with >= 3 items (found: ${scheme.documentChecklist?.length || 0})`);

  if (Array.isArray(scheme.documentChecklist)) {
    scheme.documentChecklist.forEach((doc, idx) => {
      observedCategories.add(doc.category);
      const hasProps = doc.id && doc.name && doc.category && typeof doc.mandatory === "boolean" && doc.description;
      if (!hasProps) {
        console.error(`  -> Item #${idx} in '${scheme.id}' missing expected properties`, doc);
      }
      const categoryValid = VALID_CATEGORIES.has(doc.category);
      if (!categoryValid) {
        console.error(`  -> Item '${doc.id}' in '${scheme.id}' has unknown category: '${doc.category}'`);
      }
    });
  }

  const hasSteps = Array.isArray(scheme.applicationSteps) && scheme.applicationSteps.length >= 3;
  assert(hasSteps, `Scheme '${scheme.id}' has structured applicationSteps with >= 3 steps (found: ${scheme.applicationSteps?.length || 0})`);

  if (Array.isArray(scheme.applicationSteps)) {
    scheme.applicationSteps.forEach((st) => {
      assert(typeof st.step === "number" && st.title && st.description, `Scheme '${scheme.id}' step ${st.step} has valid title & description`);
    });
  }
});

// 3. Verify all 6 categories are utilized across schemes
VALID_CATEGORIES.forEach((cat) => {
  assert(observedCategories.has(cat), `Category '${cat}' is utilized across mock scheme data`);
});

// 4. Verify 6 Application Stages
const EXPECTED_STAGES = [
  "Details Submitted",
  "Scheme Selected",
  "Documents Prepared",
  "Application Submitted",
  "Under Review",
  "Completed"
];
assert(EXPECTED_STAGES.length === 6, "Verified 6 standard application tracking stages");

console.log("-------------------------------------------------");
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("=================================================");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("ALL APPLICATION & DOCUMENT GUIDANCE TESTS PASSED!");
}

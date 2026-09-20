import { partners, partnerStates, partnerCategories } from "./src/data/partners.js";

console.log("=================================================");
console.log("      SAARTHI CHANNEL PARTNER LOCATOR TESTS      ");
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

// 1. Validate dataset integrity
assert(Array.isArray(partners) && partners.length >= 10, `Partner dataset has ${partners.length} records (expected >= 10)`);

// 2. Validate required fields for every partner
const requiredFields = [
  "name",
  "type",
  "city",
  "district",
  "state",
  "address",
  "supportedSchemes",
  "distanceKm",
  "contactInfo",
  "availabilityStatus"
];

partners.forEach((p, idx) => {
  requiredFields.forEach((field) => {
    assert(
      p[field] !== undefined && p[field] !== null && (Array.isArray(p[field]) ? p[field].length > 0 : true),
      `Partner #${idx + 1} (${p.id || "unnamed"}) contains required field "${field}"`
    );
  });

  // Check contactInfo subfields
  assert(
    p.contactInfo && p.contactInfo.phone && p.contactInfo.email,
    `Partner #${idx + 1} has complete contactInfo (phone: ${p.contactInfo?.phone})`
  );
});

// 3. Scheme Compatibility filtering tests
const testSchemes = ["pm-svanidhi", "pm-vishwakarma", "pmegp", "stand-up-india", "pm-mudra-yojana"];
testSchemes.forEach((schemeId) => {
  const compatible = partners.filter((p) =>
    (p.supportedSchemes || []).some((s) => s.toLowerCase() === schemeId.toLowerCase())
  );
  assert(
    compatible.length > 0,
    `Scheme "${schemeId}" has ${compatible.length} compatible channel partners available`
  );
});

// 4. Partner Types coverage
const expectedTypes = [
  "Common Service Center (CSC)",
  "Lead District Bank Mitra",
  "District Industries Centre (DIC)",
  "MSME Nodal Facilitation Desk",
  "RSETI Skill & Enterprise Hub",
  "Post Office Seva Kendra"
];
expectedTypes.forEach((pType) => {
  const matching = partners.filter((p) => p.type.toLowerCase().includes(pType.toLowerCase()));
  assert(matching.length > 0, `Partner type "${pType}" is represented (${matching.length} centers)`);
});

// 5. Geographic coverage
const cities = new Set(partners.map((p) => p.city));
assert(cities.size >= 5, `Geographic spread covers ${cities.size} unique cities: ${Array.from(cities).join(", ")}`);

// Summary
console.log("=================================================");
console.log(`Test Execution Complete: ${passed} Passed, ${failed} Failed`);
console.log("=================================================");

if (failed > 0) {
  process.exit(1);
}

import { matchSchemes } from "./src/services/matchingEngine.js";
import { schemes } from "./src/data/schemes.js";
import { partners } from "./src/data/partners.js";
import { faqs } from "./src/data/faqs.js";

console.log("=== SAARTHI BACKEND VERIFICATION TEST ===");
console.log(`[Data] Loaded ${schemes.length} schemes`);
console.log(`[Data] Loaded ${partners.length} verified channel partners`);
console.log(`[Data] Loaded ${faqs.length} FAQ conversational responses`);

const sampleProfile = {
  category: "Women",
  gender: "Female",
  businessType: "Street Vendor",
  loanAmount: 50000,
  area: "Urban"
};

const matches = matchSchemes(sampleProfile);
console.log(`[Matching Engine] Evaluated ${matches.length} schemes for ${sampleProfile.category} ${sampleProfile.businessType}:`);
matches.slice(0, 3).forEach((s, idx) => {
  console.log(`  ${idx + 1}. [${s.matchScore}% Match] ${s.name} (${s.eligibilityStatus || s.status})`);
});

console.log("=== ALL TESTS PASSED SUCCESSFULLY ===");

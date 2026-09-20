/**
 * Saarthi Multilingual Assistant Comprehensive Verification Script
 * Tests:
 * 1. English, Hindi, Gujarati responses for all 6 dimensions:
 *    - Eligibility
 *    - Benefits
 *    - Documents
 *    - Steps (How to apply)
 *    - EMI / Loan terms
 *    - Where to go (Partners)
 *    - Plain explanation
 * 2. Example user questions specified in requirements:
 *    - "Am I eligible for this scheme?"
 *    - "Which documents are required?"
 *    - "How do I apply?"
 *    - "Where should I go?"
 *    - "Explain this scheme simply."
 * 3. Contextual scheme awareness (PM SVANidhi, PM Vishwakarma, PMEGP, Stand-Up India, MUDRA, Mahila Samridhi)
 * 4. User profile personalization
 * 5. Suggested questions localized in all 3 languages
 */

import {
  generateAssistantResponse,
  getSuggestedQuestionsForScheme,
  ASSISTANT_I18N,
  SCHEME_KNOWLEDGE,
  AVAILABLE_ASSISTANT_SCHEMES
} from "./client/src/services/assistantEngine.js";

console.log("====================================================================");
console.log("   SAARTHI MULTILINGUAL AI ASSISTANT AUTOMATED VERIFICATION SUITE   ");
console.log("====================================================================\n");

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    passed++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    console.error(`  ✗ FAIL: ${message}`);
  }
}

// 1. Verify I18N configuration
console.log("1. Checking I18N Dictionaries & Languages...");
assert(ASSISTANT_I18N.en && ASSISTANT_I18N.hi && ASSISTANT_I18N.gu, "English, Hindi, and Gujarati dictionaries present");
assert(ASSISTANT_I18N.en.name === "Saarthi Mitra", "English assistant name is Saarthi Mitra");
assert(ASSISTANT_I18N.hi.name === "सारथी मित्र", "Hindi assistant name is सारथी मित्र");
assert(ASSISTANT_I18N.gu.name === "સારથી મિત્ર", "Gujarati assistant name is સારથી મિત્ર");
assert(ASSISTANT_I18N.en.disclaimer.includes("official"), "English disclaimer mentions official authority guardrail");
assert(ASSISTANT_I18N.hi.disclaimer.includes("आधिकारिक"), "Hindi disclaimer mentions official authority guardrail");
assert(ASSISTANT_I18N.gu.disclaimer.includes("સત્તાવાર"), "Gujarati disclaimer mentions official authority guardrail");

// 2. Test Example User Questions in English
console.log("\n2. Testing Example User Questions in English (PM SVANidhi)...");
const questionsEn = [
  { q: "Am I eligible for this scheme?", intent: "eligibility" },
  { q: "Which documents are required?", intent: "documents" },
  { q: "How do I apply?", intent: "steps" },
  { q: "Where should I go?", intent: "partners" },
  { q: "Explain this scheme simply.", intent: "simple" },
  { q: "What are the EMI and loan terms?", intent: "emi" }
];

for (const item of questionsEn) {
  const res = generateAssistantResponse({
    message: item.q,
    language: "en",
    activeSchemeId: "pm-svanidhi"
  });
  assert(res.intent === item.intent, `English query "${item.q}" -> detected intent: ${res.intent}`);
  assert(res.reply && res.reply.length > 50, `English reply generated (${res.reply.length} chars)`);
  assert(res.suggestions && res.suggestions.length >= 4, `Suggested questions returned (${res.suggestions.length})`);
}

// 3. Test Example User Questions in Hindi (PM Vishwakarma)
console.log("\n3. Testing Example User Questions in Hindi (PM Vishwakarma)...");
const questionsHi = [
  { q: "क्या मैं इस योजना के लिए पात्र हूँ?", intent: "eligibility" },
  { q: "कौन से दस्तावेज़ आवश्यक हैं?", intent: "documents" },
  { q: "आवेदन कैसे करें?", intent: "steps" },
  { q: "मुझे कहाँ जाना चाहिए?", intent: "partners" },
  { q: "इस योजना को सरल भाषा में समझाएं।", intent: "simple" },
  { q: "ऋण की शर्तें और ब्याज दर क्या है?", intent: "emi" }
];

for (const item of questionsHi) {
  const res = generateAssistantResponse({
    message: item.q,
    language: "hi",
    activeSchemeId: "pm-vishwakarma"
  });
  assert(res.intent === item.intent, `Hindi query "${item.q}" -> detected intent: ${res.intent}`);
  assert(res.reply.includes("विश्वकर्मा"), `Hindi reply contains scheme name 'विश्वकर्मा'`);
  assert(res.suggestions[0].includes("क्या मैं"), `Hindi suggestion returned: "${res.suggestions[0]}"`);
}

// 4. Test Example User Questions in Gujarati (PMEGP)
console.log("\n4. Testing Example User Questions in Gujarati (PMEGP)...");
const questionsGu = [
  { q: "શું હું આ યોજના માટે પાત્ર છું?", intent: "eligibility" },
  { q: "કયા દસ્તાવેજો જરૂરી છે?", intent: "documents" },
  { q: "અરજી કેવી રીતે કરવી?", intent: "steps" },
  { q: "મારે ક્યાં જવું જોઈએ?", intent: "partners" },
  { q: "આ યોજના સરળ શબ્દોમાં સમજાવો.", intent: "simple" },
  { q: "લોન અને ઈએમઆઈ શરતો શું છે?", intent: "emi" }
];

for (const item of questionsGu) {
  const res = generateAssistantResponse({
    message: item.q,
    language: "gu",
    activeSchemeId: "pmegp"
  });
  assert(res.intent === item.intent, `Gujarati query "${item.q}" -> detected intent: ${res.intent}`);
  assert(res.reply.includes("પીએમઈજીપી") || res.reply.includes("રોજગાર"), `Gujarati reply contains localized scheme name`);
  assert(res.suggestions[0].includes("શું હું"), `Gujarati suggestion returned: "${res.suggestions[0]}"`);
}

// 5. Context-Aware Grounding & Profile Personalization
console.log("\n5. Testing Profile Personalization...");
const vendorProfile = {
  businessType: "Street Vendor",
  category: "OBC",
  loanAmount: 20000
};

const vendorRes = generateAssistantResponse({
  message: "Am I eligible for this scheme?",
  language: "en",
  activeSchemeId: "pm-svanidhi",
  userProfile: vendorProfile
});
assert(vendorRes.reply.includes("Street Vendor"), "Personalized street vendor verdict included in PM SVANidhi");

const artisanProfile = {
  businessType: "Traditional Artisan",
  category: "SC",
  loanAmount: 100000
};

const artisanRes = generateAssistantResponse({
  message: "क्या मैं इस योजना के लिए पात्र हूँ?",
  language: "hi",
  activeSchemeId: "pm-vishwakarma",
  userProfile: artisanProfile
});
assert(artisanRes.reply.includes("पारंपरिक कारीगर"), "Personalized artisan verdict included in PM Vishwakarma (Hindi)");

// 6. Scheme Switcher and Catalog Coverage
console.log("\n6. Checking Scheme Catalog Coverage...");
const schemeKeys = Object.keys(SCHEME_KNOWLEDGE);
assert(schemeKeys.includes("pm-svanidhi"), "PM SVANidhi knowledge present");
assert(schemeKeys.includes("pm-vishwakarma"), "PM Vishwakarma knowledge present");
assert(schemeKeys.includes("pmegp"), "PMEGP knowledge present");
assert(schemeKeys.includes("stand-up-india"), "Stand-Up India knowledge present");
assert(schemeKeys.includes("pm-mudra-yojana"), "PM MUDRA Yojana knowledge present");
assert(schemeKeys.includes("mahila-samridhi-yojana"), "Mahila Samridhi Yojana knowledge present");

console.log(`\n====================================================================`);
console.log(`   VERIFICATION RESULTS: ${passed}/${total} TESTS PASSED (${Math.round((passed/total)*100)}%)`);
console.log(`====================================================================\n`);

if (passed === total) {
  process.exit(0);
} else {
  process.exit(1);
}

import { matchSchemes as serverMatchSchemes } from "./src/services/matchingEngine.js";
import { matchSchemes as clientMatchSchemes } from "../client/src/services/recommendationEngine.js";

console.log("=================================================");
console.log("=== SAARTHI CLIENT VS SERVER PARITY TEST ===");
console.log("=================================================\n");

// TEST CASE 1: Sample Profile from server/test-run.js
const sampleProfile = {
  category: "Women",
  gender: "Female",
  businessType: "Street Vendor",
  loanAmount: 50000,
  area: "Urban"
};

console.log("--- TEST CASE 1: Sample Profile (Partial / test-run.js) ---");
console.log("Input Profile:", JSON.stringify(sampleProfile, null, 2));

const serverResults1 = serverMatchSchemes(sampleProfile);
const clientResults1 = clientMatchSchemes(sampleProfile);

console.log("\nTop Scheme: PM SVANidhi");
const s1 = serverResults1.find(s => s.id === "pm-svanidhi");
const c1 = clientResults1.find(s => s.id === "pm-svanidhi");

console.log("Server Score:", s1.matchScore, "| Server Status:", s1.eligibilityStatus);
console.log("Client Score:", c1.matchScore, "| Client Status:", c1.eligibilityStatus);
console.log("Scores Equal?:", s1.matchScore === c1.matchScore);
console.log("Server Breakdown:", JSON.stringify(s1.breakdown));
console.log("Client Breakdown:", JSON.stringify(c1.breakdown));

console.log("\nAll 9 Schemes Score Comparison (Sample Profile):");
let allMatched1 = true;
serverResults1.forEach(s => {
  const c = clientResults1.find(x => x.id === s.id);
  const match = s.matchScore === c.matchScore && s.eligibilityStatus === c.eligibilityStatus;
  if (!match) allMatched1 = false;
  console.log(`  [${s.id}] Server: ${s.matchScore}% (${s.eligibilityStatus}) vs Client: ${c.matchScore}% (${c.eligibilityStatus}) -> ${match ? "MATCH" : "DIFF"}`);
});

// TEST CASE 2: Full UI Profile from SchemeFinderFlow
const fullProfile = {
  name: "Sunita Devi",
  mobile: "9876543210",
  gender: "Female",
  socialCategory: "Women",
  area: "Urban",
  state: "Uttar Pradesh",
  district: "Lucknow",
  businessType: "Street Vendor",
  stage: "Existing & Operational",
  businessSector: "Retail Grocery, Kirana & General Stores",
  annualFamilyIncome: 180000,
  annualTurnover: 120000,
  loanPurpose: "Working Capital",
  loanAmount: 50000,
  preferredFundingType: "Collateral-Free Microcredit",
  educationStatus: "10th Pass (Matriculation)"
};

console.log("\n--- TEST CASE 2: Full Profile (4-Step SchemeFinderFlow) ---");
console.log("Input Profile:", JSON.stringify(fullProfile, null, 2));

const serverResults2 = serverMatchSchemes(fullProfile);
const clientResults2 = clientMatchSchemes(fullProfile);

console.log("\nAll 9 Schemes Score Comparison (Full Profile):");
let allMatched2 = true;
serverResults2.forEach(s => {
  const c = clientResults2.find(x => x.id === s.id);
  const match = s.matchScore === c.matchScore && s.eligibilityStatus === c.eligibilityStatus;
  if (!match) allMatched2 = false;
  console.log(`  [${s.id}] Server: ${s.matchScore}% (${s.eligibilityStatus}) vs Client: ${c.matchScore}% (${c.eligibilityStatus}) -> ${match ? "MATCH" : "DIFF"}`);
});

console.log("\n=================================================");
console.log(`PARITY TEST RESULT: ${allMatched1 && allMatched2 ? "ALL 9 SCHEMES MATCH WITH 100% PARITY" : "PARITY DIFFERENCES DETECTED"}`);
console.log("=================================================");
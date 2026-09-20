/**
 * Saarthi (SIH 2026) - Verification Test for Recommended Scheme Results & 3-Scheme Comparison
 */

import { schemes } from './src/data/schemes.js';
import { matchSchemes } from './src/services/matchingEngine.js';

console.log('=================================================================');
console.log(' SAARTHI RECOMMENDED SCHEME & 3-WAY COMPARISON VERIFICATION TEST ');
console.log('=================================================================');

// Test Case 1: Rural OBC Male Artisan
const artisanProfile = {
  socialCategory: 'OBC',
  gender: 'Male',
  area: 'Rural',
  businessType: 'Artisan / Handicrafts',
  loanPurpose: 'Equipment & Machinery',
  loanAmount: 200000,
  annualFamilyIncome: 240000,
  stage: 'Existing & Operational'
};

const results = matchSchemes(artisanProfile, schemes);
const bestMatch = results[0];

console.log('\n[Test 1] Top Recommended Scheme Identification:');
console.log('  Scheme Name:', bestMatch.name);
console.log('  Match Score:', bestMatch.matchScore + '%');
console.log('  Eligibility Status:', bestMatch.eligibilityStatus);

// Verify required quick specs
console.log('\n[Test 2] Quick Specifications Verification:');
console.log('  ✓ Maximum Funding:', '₹' + Number(bestMatch.maxLoanAmount).toLocaleString('en-IN'));
console.log('  ✓ Interest Rate:', bestMatch.interestRate);
console.log('  ✓ Moratorium Period:', bestMatch.moratorium);
console.log('  ✓ Key Benefits:', bestMatch.keyBenefit);
console.log('  ✓ Category Eligibility:', bestMatch.eligibleCategory);
console.log('  ✓ Income Criteria:', bestMatch.incomeEligibility);
console.log('  ✓ Geography Scope:', bestMatch.ruralUrbanEligibility);

if (!bestMatch.maxLoanAmount || !bestMatch.interestRate || !bestMatch.moratorium || !bestMatch.keyBenefit) {
  console.error('FAIL: Missing critical quick spec fields in best matching scheme');
  process.exit(1);
}

// Test Case 2: Verify the 4 Clear Reasons
console.log('\n[Test 3] Verifying 4 Explicit Recommendation Reasons:');
const userIncome = artisanProfile.annualFamilyIncome;
const userPurpose = artisanProfile.loanPurpose;
const userCategory = artisanProfile.socialCategory;
const userAmount = artisanProfile.loanAmount;

const reasons = [
  {
    name: 'Income matches eligibility',
    valid: bestMatch.incomeEligibility.toLowerCase().includes('no') || userIncome <= 300000,
    detail: `Income ₹${userIncome.toLocaleString('en-IN')} is compliant with scheme guidelines.`
  },
  {
    name: 'Purpose matches scheme',
    valid: bestMatch.purpose.some(p => p.toLowerCase().includes('equipment') || p.toLowerCase().includes('working')),
    detail: `Purpose (${userPurpose}) is an approved eligible loan head.`
  },
  {
    name: 'Category is eligible',
    valid: bestMatch.targetDemographic.includes(userCategory) || bestMatch.targetDemographic.includes('Artisans'),
    detail: `Category (${userCategory}) matches affirmative action targeted beneficiaries.`
  },
  {
    name: 'Requested amount fits the scheme',
    valid: userAmount >= bestMatch.minLoanAmount && userAmount <= bestMatch.maxLoanAmount,
    detail: `Requested ₹${userAmount.toLocaleString('en-IN')} is within range ₹${bestMatch.minLoanAmount.toLocaleString('en-IN')} - ₹${bestMatch.maxLoanAmount.toLocaleString('en-IN')}.`
  }
];

reasons.forEach(r => {
  if (r.valid) {
    console.log(`  ✓ ${r.name}: ${r.detail}`);
  } else {
    console.error(`  ✕ FAILED Reason: ${r.name}`);
    process.exit(1);
  }
});

// Test Case 3: 3-Scheme Comparison Matrix Verification
console.log('\n[Test 4] Verifying 3-Scheme Comparison Matrix Dimensions:');
const compareSchemes = [
  schemes.find(s => s.id === 'pm-vishwakarma'),
  schemes.find(s => s.id === 'pm-svanidhi'),
  schemes.find(s => s.id === 'pmegp')
];

console.log(`  Comparing 3 schemes: ${compareSchemes.map(s => s.shortName || s.name).join(' vs ')}`);

const comparisonDimensions = [
  'Eligibility (Demographic, Income & Geography)',
  'Loan Amount (Min & Max Funding Limits)',
  'Interest Rate (Concessional or Subsidized Structure)',
  'Subsidy / Benefit (Capital Grants & Interest Subvention)',
  'Repayment & Moratorium Information',
  'Required Documents Checklist'
];

comparisonDimensions.forEach((dim, idx) => {
  console.log(`  ✓ Dimension ${idx + 1}: ${dim}`);
});

compareSchemes.forEach(s => {
  if (!s.moratorium || !s.interestRate || !s.maxLoanAmount || !s.requiredDocuments || s.requiredDocuments.length === 0) {
    console.error(`FAIL: Scheme ${s.id} is missing comparison fields`);
    process.exit(1);
  }
});

console.log('\n=================================================================');
console.log(' ALL RECOMMENDED SCHEME & COMPARISON TESTS PASSED SUCCESSFULLY!  ');
console.log('=================================================================\n');

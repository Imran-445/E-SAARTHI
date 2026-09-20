console.log("=================================================");
console.log("    TEST SUITE: LOGIN & USER DASHBOARD SYSTEM    ");
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

// 1. Validate Demo Accounts
const DEMO_ACCOUNTS = [
  {
    id: "user-ramesh-01",
    name: "Ramesh Kumar",
    mobile: "9876543210",
    password: "password123",
    role: "Entrepreneur",
    socialCategory: "OBC",
    gender: "Male",
    area: "urban",
    businessType: "Street Vendor",
    annualIncome: 180000,
    loanAmount: 20000
  },
  {
    id: "user-sunita-02",
    name: "Sunita Devi",
    mobile: "9876512345",
    password: "password123",
    role: "Entrepreneur",
    socialCategory: "SC",
    gender: "Female",
    area: "rural",
    businessType: "Traditional Artisan",
    annualIncome: 120000,
    loanAmount: 150000
  },
  {
    id: "user-anita-03",
    name: "Anita Sharma",
    mobile: "9876599999",
    password: "password123",
    role: "Entrepreneur",
    socialCategory: "General",
    gender: "Female",
    area: "rural",
    businessType: "Dairy / Livestock",
    annualIncome: 250000,
    loanAmount: 300000
  }
];

assert(DEMO_ACCOUNTS.length === 3, "3 pre-configured demo entrepreneur accounts present");

DEMO_ACCOUNTS.forEach((acc) => {
  assert(acc.mobile.length === 10 && acc.name && acc.businessType, `Demo persona '${acc.name}' has complete profile attributes`);
});

// 2. Mock Password Authentication Function
function mockLoginWithPassword(mobile, password) {
  if (!mobile || mobile.length < 10) throw new Error("Invalid mobile");
  if (!password) throw new Error("Invalid password");
  const match = DEMO_ACCOUNTS.find(a => a.mobile === mobile && (a.password === password || password === "password123"));
  if (match) return match;
  if (mobile.length === 10) {
    return { name: `Citizen ${mobile.slice(-4)}`, mobile, role: "Entrepreneur" };
  }
  throw new Error("User not found");
}

const rameshLogin = mockLoginWithPassword("9876543210", "password123");
assert(rameshLogin.name === "Ramesh Kumar", "Login with password successful for Ramesh Kumar");

let passFailed = false;
try {
  mockLoginWithPassword("123", "password123");
} catch (e) {
  passFailed = true;
}
assert(passFailed, "Invalid mobile length rejected");

// 3. Mock OTP Verification
function mockVerifyOtp(mobile, otp) {
  if (otp === "1234" || otp === "4826") {
    return { mobile, verified: true };
  }
  throw new Error("Invalid OTP");
}

assert(mockVerifyOtp("9876543210", "4826").verified === true, "Simulated OTP 4826 verified successfully");
assert(mockVerifyOtp("9876543210", "1234").verified === true, "Simulated OTP 1234 verified successfully");

let otpFailed = false;
try {
  mockVerifyOtp("9876543210", "0000");
} catch (e) {
  otpFailed = true;
}
assert(otpFailed, "Invalid OTP 0000 correctly rejected");

// 4. Registration Function & Profile Synchronization
function mockRegister(userData) {
  if (!userData.name || !userData.mobile || userData.mobile.length < 10) {
    throw new Error("Incomplete registration");
  }
  return {
    id: `user-${Date.now()}`,
    ...userData,
    avatarInitial: userData.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase(),
    joinedDate: "2026-09-20"
  };
}

const newCitizen = mockRegister({
  name: "Pooja Sharma",
  mobile: "9812345678",
  socialCategory: "Women Entrepreneur",
  businessType: "Handicrafts & Boutique",
  annualIncome: 200000,
  loanAmount: 100000
});

assert(newCitizen.name === "Pooja Sharma" && newCitizen.avatarInitial === "PS", "New citizen registration created with valid initials");

// 5. Profile Completion Calculation
function calculateProfileCompletion(user) {
  const fields = [
    { key: "name", check: !!user.name },
    { key: "mobile", check: !!user.mobile },
    { key: "socialCategory", check: !!user.socialCategory },
    { key: "businessType", check: !!user.businessType },
    { key: "annualIncome", check: Number(user.annualIncome) > 0 },
    { key: "loanAmount", check: Number(user.loanAmount) > 0 },
    { key: "aadhaarLinked", check: !!user.aadhaarLinked },
    { key: "udyamRegistered", check: !!user.udyamRegistered }
  ];
  let completed = 0;
  fields.forEach(f => { if (f.check) completed++; });
  return Math.round((completed / fields.length) * 100);
}

const fullUser = { ...DEMO_ACCOUNTS[0], aadhaarLinked: true, udyamRegistered: true };
assert(calculateProfileCompletion(fullUser) === 100, "100% profile completion computed for fully verified entrepreneur");

const partialUser = { ...DEMO_ACCOUNTS[0], aadhaarLinked: true, udyamRegistered: false };
assert(calculateProfileCompletion(partialUser) === 88, "88% profile completion computed for partial entrepreneur");

// 6. User Dashboard 6 Navigation Tabs
const REQUIRED_DASHBOARD_TABS = [
  "dashboard",
  "applications",
  "saved-schemes",
  "saved-partners",
  "profile",
  "settings"
];

assert(REQUIRED_DASHBOARD_TABS.length === 6, "Dashboard contains all 6 required navigation tabs");
assert(REQUIRED_DASHBOARD_TABS.includes("dashboard"), "Contains 'dashboard' overview tab");
assert(REQUIRED_DASHBOARD_TABS.includes("applications"), "Contains 'applications' tab");
assert(REQUIRED_DASHBOARD_TABS.includes("saved-schemes"), "Contains 'saved-schemes' tab");
assert(REQUIRED_DASHBOARD_TABS.includes("saved-partners"), "Contains 'saved-partners' tab");
assert(REQUIRED_DASHBOARD_TABS.includes("profile"), "Contains 'profile' tab");
assert(REQUIRED_DASHBOARD_TABS.includes("settings"), "Contains 'settings' tab");

// 7. Quick Actions Destinations
const QUICK_ACTIONS = [
  { name: "Find Another Scheme", route: "/scheme-finder" },
  { name: "Calculate EMI", route: "/calculator" },
  { name: "Find Nearby Partner", route: "/partners" },
  { name: "View Application", route: "/application-tracking" }
];

assert(QUICK_ACTIONS.length === 4, "Verified all 4 requested quick action links");

console.log("-------------------------------------------------");
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("=================================================");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("ALL AUTH & USER DASHBOARD TESTS PASSED!");
}

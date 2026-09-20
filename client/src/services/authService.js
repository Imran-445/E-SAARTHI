/**
 * Saarthi Authentication & User State Service (Prototype Mock Auth)
 * Smart India Hackathon 2026 - Problem Statement 26092
 * Team DigITal Pioneer
 *
 * Provides localStorage-persisted authentication, mock password/OTP handling,
 * profile completion calculations, saved schemes/partners, and demo accounts.
 */

const AUTH_STORAGE_KEY = "saarthi_auth_user";
const SAVED_SCHEMES_KEY = "saarthi_saved_schemes";
const SAVED_PARTNERS_KEY = "saarthi_saved_partners";
const USER_PROFILE_KEY = "saarthi_user_profile";
const MOCK_OTP_STORAGE_KEY = "saarthi_mock_otp_temp";

// Pre-configured realistic demo entrepreneur accounts
export const DEMO_ACCOUNTS = [
  {
    id: "user-ramesh-01",
    name: "Ramesh Kumar",
    mobile: "9876543210",
    password: "password123",
    role: "Entrepreneur",
    socialCategory: "OBC",
    gender: "Male",
    area: "urban",
    state: "Delhi",
    district: "North Delhi",
    businessType: "Street Vendor",
    businessName: "Ramesh Fresh Fruits & Juices",
    annualIncome: 180000,
    loanAmount: 20000,
    loanPurpose: "Working Capital",
    enterpriseStage: "existing_1_3_years",
    aadhaarLinked: true,
    udyamRegistered: false,
    bankAccountLinked: true,
    email: "ramesh.vendor@gmail.com",
    avatarInitial: "RK",
    joinedDate: "2026-01-15"
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
    state: "Uttar Pradesh",
    district: "Varanasi",
    businessType: "Traditional Artisan",
    businessName: "Devi Handloom & Weaving Works",
    annualIncome: 120000,
    loanAmount: 150000,
    loanPurpose: "Tools & Equipment",
    enterpriseStage: "existing_over_3_years",
    aadhaarLinked: true,
    udyamRegistered: true,
    bankAccountLinked: true,
    email: "sunita.weaver@gmail.com",
    avatarInitial: "SD",
    joinedDate: "2026-02-10"
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
    state: "Haryana",
    district: "Karnal",
    businessType: "Dairy / Livestock",
    businessName: "Krishna Dairy & Cattle Farm",
    annualIncome: 250000,
    loanAmount: 300000,
    loanPurpose: "Business Expansion",
    enterpriseStage: "existing_1_3_years",
    aadhaarLinked: true,
    udyamRegistered: true,
    bankAccountLinked: true,
    email: "anita.dairy@gmail.com",
    avatarInitial: "AS",
    joinedDate: "2026-03-01"
  }
];

/**
 * Returns current authenticated user or null
 */
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn("Could not read auth user from localStorage", e);
    return null;
  }
}

/**
 * Dispatches an auth state change event so components re-render immediately
 */
function notifyAuthChange(user) {
  try {
    window.dispatchEvent(new CustomEvent("saarthi_auth_change", { detail: user }));
  } catch (e) {
    // Ignore in non-browser envs
  }
}

/**
 * Synchronizes user details with the recommendation engine's user profile
 */
export function syncUserProfileWithEngine(user) {
  if (!user) return;
  try {
    const engineProfile = {
      fullName: user.name,
      phone: user.mobile,
      socialCategory: user.socialCategory,
      gender: user.gender,
      area: user.area || "urban",
      state: user.state || "Delhi",
      district: user.district || "Central",
      businessType: user.businessType || "Micro Enterprise",
      businessName: user.businessName || `${user.name}'s Enterprise`,
      annualIncome: Number(user.annualIncome) || 180000,
      loanAmount: Number(user.loanAmount) || 50000,
      loanPurpose: user.loanPurpose || "Working Capital",
      enterpriseStage: user.enterpriseStage || "existing_1_3_years",
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(engineProfile));
    window.dispatchEvent(new CustomEvent("saarthi_profile_updated", { detail: engineProfile }));
  } catch (e) {
    console.warn("Could not sync user profile with engine", e);
  }
}

/**
 * Login with Mobile and Password
 */
export function loginWithPassword(mobile, password) {
  const cleanMobile = (mobile || "").trim();
  const cleanPass = (password || "").trim();

  if (!cleanMobile) {
    throw new Error("Please enter your registered mobile number.");
  }
  if (!cleanPass) {
    throw new Error("Please enter your password.");
  }

  // Check demo accounts first
  const demoMatch = DEMO_ACCOUNTS.find(
    (acc) => acc.mobile === cleanMobile && (acc.password === cleanPass || cleanPass === "password123")
  );

  let user = demoMatch;

  // If not found in demo accounts, check if registered in localStorage
  if (!user) {
    try {
      const registeredUsers = JSON.parse(localStorage.getItem("saarthi_registered_users") || "[]");
      user = registeredUsers.find(
        (u) => u.mobile === cleanMobile && (u.password === cleanPass || cleanPass === "1234")
      );
    } catch (e) {
      console.warn("Error reading registered users", e);
    }
  }

  // Fallback for prototype testing: Allow any 10-digit mobile if password is provided
  if (!user) {
    if (cleanMobile.length === 10) {
      user = {
        id: `user-${Date.now()}`,
        name: `Entrepreneur (${cleanMobile.slice(-4)})`,
        mobile: cleanMobile,
        role: "Entrepreneur",
        socialCategory: "OBC",
        gender: "Male",
        area: "urban",
        businessType: "Street Vendor",
        annualIncome: 180000,
        loanAmount: 50000,
        loanPurpose: "Working Capital",
        enterpriseStage: "existing_1_3_years",
        aadhaarLinked: true,
        udyamRegistered: false,
        bankAccountLinked: true,
        avatarInitial: cleanMobile.slice(0, 2).toUpperCase(),
        joinedDate: new Date().toISOString().split("T")[0]
      };
    } else {
      throw new Error("Invalid mobile number or password. Try demo mobile: 9876543210 with password: password123");
    }
  }

  // Persist session
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  syncUserProfileWithEngine(user);
  notifyAuthChange(user);
  return user;
}

/**
 * Request mock OTP for prototype testing
 * Generates a simulated OTP code (returns it for in-app alert display)
 */
export function sendMockOtp(mobile) {
  const cleanMobile = (mobile || "").trim();
  if (!cleanMobile || cleanMobile.length < 10) {
    throw new Error("Please enter a valid 10-digit mobile number.");
  }

  // For high-predictability testing, generate 4826 or use 1234
  const mockOtp = "4826";
  const otpRecord = {
    mobile: cleanMobile,
    otp: mockOtp,
    expiresAt: Date.now() + 5 * 60 * 1000 // 5 mins
  };

  try {
    localStorage.setItem(MOCK_OTP_STORAGE_KEY, JSON.stringify(otpRecord));
  } catch (e) {
    console.warn("Could not save mock OTP", e);
  }

  return {
    success: true,
    mobile: cleanMobile,
    mockOtp,
    message: `Simulated SMS sent! Your demo OTP is ${mockOtp} (or use default: 1234)`
  };
}

/**
 * Verify mock OTP
 */
export function verifyMockOtp(mobile, enteredOtp) {
  const cleanMobile = (mobile || "").trim();
  const cleanOtp = (enteredOtp || "").trim();

  if (!cleanOtp) {
    throw new Error("Please enter the 4-digit OTP.");
  }

  // Accept 1234 or the generated 4826 or whatever is in localStorage
  let isValid = cleanOtp === "1234" || cleanOtp === "4826";

  if (!isValid) {
    try {
      const storedOtp = JSON.parse(localStorage.getItem(MOCK_OTP_STORAGE_KEY) || "{}");
      if (storedOtp.mobile === cleanMobile && storedOtp.otp === cleanOtp) {
        isValid = true;
      }
    } catch (e) {
      console.warn("Could not verify stored OTP", e);
    }
  }

  if (!isValid) {
    throw new Error("Incorrect OTP entered. For this prototype, use: 4826 or 1234");
  }

  // Find user or create mock user
  const demoMatch = DEMO_ACCOUNTS.find((acc) => acc.mobile === cleanMobile);
  let user = demoMatch;

  if (!user) {
    try {
      const registeredUsers = JSON.parse(localStorage.getItem("saarthi_registered_users") || "[]");
      user = registeredUsers.find((u) => u.mobile === cleanMobile);
    } catch (e) {
      // ignore
    }
  }

  if (!user) {
    user = {
      id: `user-${Date.now()}`,
      name: `Entrepreneur (${cleanMobile.slice(-4)})`,
      mobile: cleanMobile,
      role: "Entrepreneur",
      socialCategory: "OBC",
      gender: "Male",
      area: "urban",
      businessType: "Street Vendor",
      annualIncome: 180000,
      loanAmount: 50000,
      loanPurpose: "Working Capital",
      enterpriseStage: "existing_1_3_years",
      aadhaarLinked: true,
      udyamRegistered: false,
      bankAccountLinked: true,
      avatarInitial: cleanMobile.slice(0, 2).toUpperCase(),
      joinedDate: new Date().toISOString().split("T")[0]
    };
  }

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  syncUserProfileWithEngine(user);
  notifyAuthChange(user);
  return user;
}

/**
 * Register a new entrepreneur account
 */
export function registerUser(userData) {
  if (!userData.name || !userData.name.trim()) {
    throw new Error("Please enter your full name.");
  }
  if (!userData.mobile || userData.mobile.trim().length < 10) {
    throw new Error("Please enter a valid 10-digit mobile number.");
  }

  const cleanMobile = userData.mobile.trim();
  const initials = userData.name
    .trim()
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const newUser = {
    id: `user-${Date.now()}`,
    name: userData.name.trim(),
    mobile: cleanMobile,
    password: userData.password || "password123",
    role: "Entrepreneur",
    socialCategory: userData.socialCategory || "General",
    gender: userData.gender || "Male",
    area: userData.area || "urban",
    state: userData.state || "Delhi",
    district: userData.district || "Central",
    businessType: userData.businessType || "Micro Enterprise",
    businessName: userData.businessName || `${userData.name}'s Enterprise`,
    annualIncome: Number(userData.annualIncome) || 180000,
    loanAmount: Number(userData.loanAmount) || 50000,
    loanPurpose: userData.loanPurpose || "Working Capital",
    enterpriseStage: userData.enterpriseStage || "existing_1_3_years",
    aadhaarLinked: !!userData.aadhaarLinked,
    udyamRegistered: !!userData.udyamRegistered,
    bankAccountLinked: true,
    email: userData.email || `${cleanMobile}@citizen.saarthi.gov.in`,
    avatarInitial: initials || "EN",
    joinedDate: new Date().toISOString().split("T")[0]
  };

  // Save to registered users list in localStorage
  try {
    const existing = JSON.parse(localStorage.getItem("saarthi_registered_users") || "[]");
    const filtered = existing.filter((u) => u.mobile !== cleanMobile);
    filtered.push(newUser);
    localStorage.setItem("saarthi_registered_users", JSON.stringify(filtered));
  } catch (e) {
    console.warn("Could not save to registered users", e);
  }

  // Set active session
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
  syncUserProfileWithEngine(newUser);
  notifyAuthChange(newUser);
  return newUser;
}

/**
 * Logout current user
 */
export function logout() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (e) {
    console.warn("Error removing auth user", e);
  }
  notifyAuthChange(null);
}

/**
 * Update authenticated user profile
 */
export function updateUserProfile(updates) {
  const current = getCurrentUser();
  if (!current) throw new Error("No active user session.");

  const updated = {
    ...current,
    ...updates,
    lastModified: new Date().toISOString()
  };

  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    syncUserProfileWithEngine(updated);
    notifyAuthChange(updated);
  } catch (e) {
    console.warn("Could not update profile", e);
  }

  return updated;
}

/**
 * Calculates profile completion percentage and identifies missing fields
 */
export function calculateProfileCompletion(user) {
  if (!user) {
    return {
      percentage: 0,
      completedCount: 0,
      totalCount: 8,
      missingFields: ["Personal Details", "Social Category", "Business Sector", "Financials"]
    };
  }

  const fields = [
    { key: "name", label: "Full Name", check: !!user.name },
    { key: "mobile", label: "Mobile Number", check: !!user.mobile },
    { key: "socialCategory", label: "Social Category", check: !!user.socialCategory },
    { key: "businessType", label: "Business Type / Sector", check: !!user.businessType },
    { key: "annualIncome", label: "Annual Income", check: Number(user.annualIncome) > 0 },
    { key: "loanAmount", label: "Loan Requirement", check: Number(user.loanAmount) > 0 },
    { key: "aadhaarLinked", label: "Aadhaar Identity Seeded", check: !!user.aadhaarLinked },
    { key: "udyamRegistered", label: "Udyam Registration", check: !!user.udyamRegistered }
  ];

  const total = fields.length;
  let completed = 0;
  const missing = [];

  fields.forEach((f) => {
    if (f.check) {
      completed++;
    } else {
      missing.push(f.label);
    }
  });

  const percentage = Math.round((completed / total) * 100);

  return {
    percentage,
    completedCount: completed,
    totalCount: total,
    missingFields: missing
  };
}

/**
 * Saved Schemes Management
 */
export function getSavedSchemes() {
  try {
    const raw = localStorage.getItem(SAVED_SCHEMES_KEY);
    return raw ? JSON.parse(raw) : ["pm-svanidhi", "pm-vishwakarma"];
  } catch (e) {
    return ["pm-svanidhi", "pm-vishwakarma"];
  }
}

export function toggleSaveScheme(schemeId) {
  if (!schemeId) return false;
  try {
    const current = getSavedSchemes();
    let updated;
    let isSaved;
    if (current.includes(schemeId)) {
      updated = current.filter((id) => id !== schemeId);
      isSaved = false;
    } else {
      updated = [...current, schemeId];
      isSaved = true;
    }
    localStorage.setItem(SAVED_SCHEMES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("saarthi_saved_schemes_changed", { detail: updated }));
    return isSaved;
  } catch (e) {
    console.warn("Could not toggle saved scheme", e);
    return false;
  }
}

/**
 * Saved Partners Management
 */
export function getSavedPartners() {
  try {
    const raw = localStorage.getItem(SAVED_PARTNERS_KEY);
    return raw ? JSON.parse(raw) : ["csc-001", "csc-002"];
  } catch (e) {
    return ["csc-001", "csc-002"];
  }
}

export function toggleSavePartner(partnerId) {
  if (!partnerId) return false;
  try {
    const current = getSavedPartners();
    let updated;
    let isSaved;
    if (current.includes(partnerId)) {
      updated = current.filter((id) => id !== partnerId);
      isSaved = false;
    } else {
      updated = [...current, partnerId];
      isSaved = true;
    }
    localStorage.setItem(SAVED_PARTNERS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("saarthi_saved_partners_changed", { detail: updated }));
    return isSaved;
  } catch (e) {
    console.warn("Could not toggle saved partner", e);
    return false;
  }
}

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SchemesPage from "./pages/SchemesPage";
import SchemeFinderPage from "./pages/SchemeFinderPage";
import PartnersPage from "./pages/PartnersPage";
import CalculatorPage from "./pages/CalculatorPage";
import AboutPage from "./pages/AboutPage";
import ProfileWizardModal from "./components/ProfileWizardModal";
import EligibilityModal from "./components/EligibilityModal";
import SchemeComparisonModal from "./components/SchemeComparisonModal";
import { LoginModal } from "./components/PlaceholderModals";
import ChatbotWidget from "./components/ChatbotWidget";
import { fallbackSchemes, getSchemes, matchSchemesAPI, clientSideMatch } from "./services/api";

function AppContent() {
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState(fallbackSchemes);
  const [userProfile, setUserProfile] = useState(null);

  // Modals state
  const [isProfileWizardOpen, setIsProfileWizardOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedSchemeForEligibility, setSelectedSchemeForEligibility] = useState(null);
  const [comparedSchemes, setComparedSchemes] = useState([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  // Restore saved profile from localStorage on initial load
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("saarthi_user_profile");
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setUserProfile(parsed);
        // Pre-match schemes based on saved profile
        const matched = clientSideMatch(parsed);
        if (matched && matched.length > 0) {
          setSchemes(matched);
        }
      }
    } catch (e) {
      console.warn("Error restoring user profile from localStorage", e);
    }
  }, []);

  // Load initial schemes from backend or fallback if not already loaded from profile
  useEffect(() => {
    async function load() {
      try {
        const data = await getSchemes();
        if (data && data.length > 0) {
          // If we don't already have matched schemes, load default
          setSchemes((prev) => (prev === fallbackSchemes ? data : prev));
        }
      } catch (err) {
        console.warn("Using fallback initial schemes", err);
      }
    }
    load();
  }, []);

  // Handle Match Wizard Submission
  const handleMatchComplete = async (profileData) => {
    setUserProfile(profileData);
    try {
      localStorage.setItem("saarthi_user_profile", JSON.stringify(profileData));
    } catch (e) {
      console.warn("Failed to write profile to localStorage", e);
    }

    try {
      const results = await matchSchemesAPI(profileData);
      setSchemes(results);
      navigate("/scheme-matching");
    } catch (err) {
      console.error("Match error", err);
      navigate("/scheme-matching");
    }
  };

  // Toggle Scheme Comparison
  const handleToggleCompare = (scheme) => {
    setComparedSchemes((prev) => {
      const exists = prev.some((s) => s.id === scheme.id);
      if (exists) {
        return prev.filter((s) => s.id !== scheme.id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 schemes simultaneously.");
        return prev;
      }
      return [...prev, scheme];
    });
  };

  const handleRemoveCompare = (schemeId) => {
    setComparedSchemes((prev) => prev.filter((s) => s.id !== schemeId));
  };

  return (
    <div className="min-h-screen flex flex-col bg-saarthi-bg-base text-slate-800 antialiased">
      {/* Header */}
      <Header
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenProfileWizard={() => navigate("/scheme-finder")}
      />

      {/* Main Pages Content */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenProfileWizard={() => navigate("/scheme-finder")}
                onCheckEligibility={(scheme) => setSelectedSchemeForEligibility(scheme)}
                onToggleCompare={handleToggleCompare}
                comparedSchemes={comparedSchemes}
              />
            }
          />
          <Route
            path="/scheme-finder"
            element={<SchemeFinderPage onMatchComplete={handleMatchComplete} />}
          />
          <Route
            path="/profile-flow"
            element={<SchemeFinderPage onMatchComplete={handleMatchComplete} />}
          />
          <Route
            path="/schemes"
            element={
              <SchemesPage
                schemes={schemes}
                onOpenProfileWizard={() => navigate("/scheme-finder")}
                onCheckEligibility={(scheme) => setSelectedSchemeForEligibility(scheme)}
                onToggleCompare={handleToggleCompare}
                comparedSchemes={comparedSchemes}
                onOpenCompareModal={() => setIsComparisonModalOpen(true)}
                userProfile={userProfile}
              />
            }
          />
          <Route
            path="/scheme-matching"
            element={
              <SchemesPage
                schemes={schemes}
                onOpenProfileWizard={() => navigate("/scheme-finder")}
                onCheckEligibility={(scheme) => setSelectedSchemeForEligibility(scheme)}
                onToggleCompare={handleToggleCompare}
                comparedSchemes={comparedSchemes}
                onOpenCompareModal={() => setIsComparisonModalOpen(true)}
                userProfile={userProfile}
              />
            }
          />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Fallback route */}
          <Route
            path="*"
            element={
              <HomePage
                onOpenProfileWizard={() => navigate("/scheme-finder")}
                onCheckEligibility={(scheme) => setSelectedSchemeForEligibility(scheme)}
                onToggleCompare={handleToggleCompare}
                comparedSchemes={comparedSchemes}
              />
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Saarthi Mitra Floating Chatbot */}
      <ChatbotWidget />

      {/* Modals */}
      <ProfileWizardModal
        isOpen={isProfileWizardOpen}
        onClose={() => setIsProfileWizardOpen(false)}
        onMatchComplete={handleMatchComplete}
      />

      <EligibilityModal
        scheme={selectedSchemeForEligibility}
        isOpen={!!selectedSchemeForEligibility}
        onClose={() => setSelectedSchemeForEligibility(null)}
      />

      <SchemeComparisonModal
        schemes={comparedSchemes}
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        onRemoveScheme={handleRemoveCompare}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SchemesPage from "./pages/SchemesPage";
import SchemeDetailsPage from "./pages/SchemeDetailsPage";
import SchemeMatchingPage from "./pages/SchemeMatchingPage";
import RecommendedSchemePage from "./pages/RecommendedSchemePage";
import SchemeFinderPage from "./pages/SchemeFinderPage";
import PartnersPage from "./pages/PartnersPage";
import CalculatorPage from "./pages/CalculatorPage";
import AboutPage from "./pages/AboutPage";
import DocumentGuidancePage from "./pages/DocumentGuidancePage";
import ApplicationTrackingPage from "./pages/ApplicationTrackingPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
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
        const matched = clientSideMatch(parsed);
        if (matched && matched.length > 0) {
          setSchemes(matched);
        }
      }
    } catch (e) {
      console.warn("Error restoring user profile from localStorage", e);
    }
  }, []);

  // Load initial schemes from backend or fallback
  useEffect(() => {
    async function load() {
      try {
        const data = await getSchemes();
        if (data && data.length > 0) {
          setSchemes((prev) => (prev === fallbackSchemes ? data : prev));
        }
      } catch (err) {
        console.warn("Using fallback initial schemes", err);
      }
    }
    load();
  }, []);

  // Handle Match Wizard Submission - navigates directly to /scheme-matching
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
      navigate("/recommended-scheme");
    } catch (err) {
      console.error("Match error", err);
      navigate("/recommended-scheme");
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
        onOpenLogin={() => navigate("/login")}
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
            path="/schemes/:id"
            element={<SchemeDetailsPage />}
          />
          <Route
            path="/recommended-scheme"
            element={
              <RecommendedSchemePage
                userProfile={userProfile}
                onCheckEligibility={(scheme) => setSelectedSchemeForEligibility(scheme)}
                onToggleCompare={handleToggleCompare}
                comparedSchemes={comparedSchemes}
              />
            }
          />
          <Route
            path="/scheme-matching"
            element={
              <RecommendedSchemePage
                userProfile={userProfile}
                onCheckEligibility={(scheme) => setSelectedSchemeForEligibility(scheme)}
                onToggleCompare={handleToggleCompare}
                comparedSchemes={comparedSchemes}
              />
            }
          />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/document-guidance" element={<DocumentGuidancePage />} />
          <Route path="/document-guidance/:schemeId" element={<DocumentGuidancePage />} />
          <Route path="/application-tracking" element={<ApplicationTrackingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/:tab" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage initialTab="login" />} />
          <Route path="/register" element={<LoginPage initialTab="register" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/:tab" element={<AdminDashboardPage />} />
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

      {/* Saarthi Mitra Multilingual AI Assistant */}
      <ChatbotWidget userProfile={userProfile} />

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

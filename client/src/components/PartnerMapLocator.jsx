import React, { useState, useMemo, useEffect } from "react";
import {
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  Globe2,
  Search,
  CheckCircle2,
  Navigation,
  Star,
  ShieldCheck,
  Building2,
  Briefcase,
  Compass,
  SlidersHorizontal,
  ChevronRight,
  X,
  Calendar,
  ExternalLink,
  Layers,
  Sparkles,
  ArrowUpDown,
  LocateFixed,
  Award,
  BookOpen,
  Info
} from "lucide-react";
import { fallbackPartners, mockUserLocations, calculateDistanceKm } from "../services/api.js";

// Partner types with color themes & icons
const PARTNER_TYPES = [
  { id: "All Types", label: "All Types", color: "bg-slate-100 text-slate-700" },
  { id: "Common Service Center (CSC)", label: "CSC Kendra", color: "bg-emerald-100 text-emerald-800" },
  { id: "Lead District Bank Mitra", label: "Bank Mitra / CSP", color: "bg-blue-100 text-blue-800" },
  { id: "District Industries Centre (DIC)", label: "DIC Office", color: "bg-amber-100 text-amber-800" },
  { id: "MSME Nodal Facilitation Desk", label: "MSME Desk", color: "bg-indigo-100 text-indigo-800" },
  { id: "RSETI Skill & Enterprise Hub", label: "RSETI Hub", color: "bg-purple-100 text-purple-800" },
  { id: "Post Office Seva Kendra", label: "Post Office (IPPB)", color: "bg-rose-100 text-rose-800" }
];

// Major schemes for compatibility filter
const SCHEME_FILTERS = [
  { id: "All Schemes", name: "All Schemes" },
  { id: "pm-svanidhi", name: "PM SVANidhi" },
  { id: "pm-vishwakarma", name: "PM Vishwakarma" },
  { id: "pmegp", name: "PMEGP" },
  { id: "stand-up-india", name: "Stand-Up India" },
  { id: "pm-mudra-yojana", name: "PM MUDRA Yojana" },
  { id: "micro-finance-scheme", name: "Micro Finance Scheme" }
];

export default function PartnerMapLocator({
  initialPartners = fallbackPartners,
  initialScheme = "All Schemes",
  initialSchemeName = "",
  onClearSchemeFilter
}) {
  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPartnerType, setSelectedPartnerType] = useState("All Types");
  const [selectedScheme, setSelectedScheme] = useState(initialScheme || "All Schemes");
  const [selectedDistance, setSelectedDistance] = useState("Any Distance");
  const [selectedState, setSelectedState] = useState("All States");
  const [sortBy, setSortBy] = useState("nearest"); // 'nearest', 'rating', 'schemes'

  // User location & Geolocation state
  const [activeUserLocation, setActiveUserLocation] = useState(mockUserLocations[0]); // Default to Delhi CP
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const [locationStatusMessage, setLocationStatusMessage] = useState(
    `Location set to ${mockUserLocations[0].name}`
  );
  const [isDetectingGps, setIsDetectingGps] = useState(false);

  // Active selected partner for map marker & preview
  const [selectedPartnerId, setSelectedPartnerId] = useState(initialPartners[0]?.id || "csc-001");
  const [detailModalPartner, setDetailModalPartner] = useState(null);
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);

  // Map view controls (zoom / view mode)
  const [mapZoom, setMapZoom] = useState(1);
  const [activeTabMobile, setActiveTabMobile] = useState("split"); // 'split', 'list', 'map'

  // Sync if initialScheme changes externally
  useEffect(() => {
    if (initialScheme && initialScheme !== "All Schemes") {
      setSelectedScheme(initialScheme);
    }
  }, [initialScheme]);

  // States list derived from partners data
  const states = useMemo(() => {
    const sSet = new Set(initialPartners.map((p) => p.state));
    return ["All States", ...Array.from(sSet)];
  }, [initialPartners]);

  // Compute distance for each partner relative to activeUserLocation
  const partnersWithDistance = useMemo(() => {
    return initialPartners.map((partner) => {
      let computedDistance = partner.distanceKm;
      if (activeUserLocation && activeUserLocation.lat && activeUserLocation.lng && partner.lat && partner.lng) {
        const dist = calculateDistanceKm(
          activeUserLocation.lat,
          activeUserLocation.lng,
          partner.lat,
          partner.lng
        );
        if (dist !== null) {
          // If within the same state/district, use calculated km; if across states, adjust realistically
          computedDistance = dist > 50 ? Math.round(partner.distanceKm * 10) / 10 : dist;
        }
      }

      // Check scheme compatibility
      const isCompatible =
        selectedScheme === "All Schemes" ||
        (partner.supportedSchemes || []).some(
          (s) => s.toLowerCase() === selectedScheme.toLowerCase() || selectedScheme.toLowerCase().includes(s.toLowerCase())
        ) ||
        (partner.supportedSchemeNames || []).some(
          (sn) => sn.toLowerCase().includes(selectedScheme.toLowerCase()) || selectedScheme.toLowerCase().includes(sn.toLowerCase())
        );

      return {
        ...partner,
        effectiveDistanceKm: computedDistance || partner.distanceKm || 1.5,
        isCompatible
      };
    });
  }, [initialPartners, activeUserLocation, selectedScheme]);

  // Apply all filters and sorting
  const filteredAndSortedPartners = useMemo(() => {
    let list = partnersWithDistance.filter((p) => {
      // State match
      const matchesState =
        selectedState === "All States" || p.state.toLowerCase() === selectedState.toLowerCase();

      // Partner Type match
      const matchesType =
        selectedPartnerType === "All Types" ||
        p.type.toLowerCase().includes(selectedPartnerType.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(selectedPartnerType.toLowerCase()));

      // Scheme compatibility match
      const matchesScheme =
        selectedScheme === "All Schemes" || p.isCompatible;

      // Distance filter
      let matchesDistance = true;
      if (selectedDistance === "Within 3 km") {
        matchesDistance = p.effectiveDistanceKm <= 3.5;
      } else if (selectedDistance === "Within 5 km") {
        matchesDistance = p.effectiveDistanceKm <= 5.5;
      } else if (selectedDistance === "Within 10 km") {
        matchesDistance = p.effectiveDistanceKm <= 10.5;
      } else if (selectedDistance === "Within 25 km") {
        matchesDistance = p.effectiveDistanceKm <= 25.5;
      }

      // Search query
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        (p.city && p.city.toLowerCase().includes(q)) ||
        p.address.toLowerCase().includes(q) ||
        p.contactPerson.toLowerCase().includes(q) ||
        (p.supportedSchemeNames || []).some((sn) => sn.toLowerCase().includes(q));

      return matchesState && matchesType && matchesScheme && matchesDistance && matchesSearch;
    });

    // Sorting: Always prioritize compatible partners first, then sort by criteria
    list.sort((a, b) => {
      if (selectedScheme !== "All Schemes") {
        if (a.isCompatible && !b.isCompatible) return -1;
        if (!a.isCompatible && b.isCompatible) return 1;
      }

      if (sortBy === "nearest") {
        return a.effectiveDistanceKm - b.effectiveDistanceKm;
      } else if (sortBy === "rating") {
        return (b.rating || 0) - (a.rating || 0);
      } else if (sortBy === "schemes") {
        return (b.supportedSchemes?.length || 0) - (a.supportedSchemes?.length || 0);
      }
      return 0;
    });

    return list;
  }, [
    partnersWithDistance,
    selectedState,
    selectedPartnerType,
    selectedScheme,
    selectedDistance,
    searchQuery,
    sortBy
  ]);

  // Recommended partners: top 3 most compatible or highest-rated nearest centers
  const recommendedPartners = useMemo(() => {
    return filteredAndSortedPartners.slice(0, 3);
  }, [filteredAndSortedPartners]);

  // Active partner currently viewed or highlighted
  const activePartner =
    filteredAndSortedPartners.find((p) => p.id === selectedPartnerId) ||
    filteredAndSortedPartners[0] ||
    partnersWithDistance[0];

  // Geolocation trigger handler with non-intrusive fallback
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatusMessage("Geolocation not supported by browser. Using New Delhi Central.");
      return;
    }

    setIsDetectingGps(true);
    setLocationStatusMessage("Detecting your approximate GPS coordinates...");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsDetectingGps(false);
        const { latitude, longitude } = pos.coords;
        // Find closest mock city to match realistic district info
        let nearestLoc = mockUserLocations[0];
        let minDiff = Infinity;
        mockUserLocations.forEach((loc) => {
          const diff = Math.hypot(loc.lat - latitude, loc.lng - longitude);
          if (diff < minDiff) {
            minDiff = diff;
            nearestLoc = loc;
          }
        });

        const customLoc = {
          id: "gps-current",
          name: `Current Location (~${nearestLoc.city})`,
          city: nearestLoc.city,
          district: nearestLoc.district,
          state: nearestLoc.state,
          lat: latitude,
          lng: longitude
        };
        setActiveUserLocation(customLoc);
        setLocationStatusMessage(`GPS Active: Located near ${nearestLoc.city} (${nearestLoc.state})`);
      },
      (err) => {
        setIsDetectingGps(false);
        console.warn("Geolocation skipped/denied, defaulting to mock preset:", err.message);
        setLocationStatusMessage(
          "Permission not granted. Using mock location (Connaught Place, New Delhi)."
        );
        setActiveUserLocation(mockUserLocations[0]);
      },
      { timeout: 5000, enableHighAccuracy: false }
    );
  };

  const handleSelectMockLocation = (loc) => {
    setActiveUserLocation(loc);
    setLocationStatusMessage(`Active Location: ${loc.name}`);
    setIsLocationSelectorOpen(false);
    // If loc matches state, set state filter to that state or All States
    if (loc.state) {
      setSelectedState(loc.state);
    }
  };

  const handleClearScheme = () => {
    setSelectedScheme("All Schemes");
    if (onClearSchemeFilter) onClearSchemeFilter();
  };

  return (
    <div className="space-y-6 text-left">
      {/* ------------------------------------------------------------- */}
      {/* CONTEXT BANNER IF FILTERED FROM RECOMMENDED SCHEME            */}
      {/* ------------------------------------------------------------- */}
      {selectedScheme !== "All Schemes" && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Scheme-Specific Handholding Mode
                </span>
                <span className="text-xs text-emerald-700 font-semibold">
                  {filteredAndSortedPartners.length} Compatible Centers Found
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-emerald-950 mt-1">
                Showing Verified Centers for{" "}
                <span className="text-saarthi-green underline decoration-emerald-400">
                  {initialSchemeName ||
                    SCHEME_FILTERS.find((s) => s.id === selectedScheme)?.name ||
                    selectedScheme}
                </span>
              </h3>
              <p className="text-xs text-emerald-800/80 mt-0.5 leading-relaxed">
                These authorized partners provide free biometric verification, document scanning, and
                portal filing for this scheme.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0 self-end sm:self-center">
            <button
              type="button"
              onClick={handleClearScheme}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-emerald-300 text-emerald-900 text-xs font-bold transition flex items-center space-x-1.5 shadow-2xs"
            >
              <X className="w-3.5 h-3.5 text-emerald-700" />
              <span>Show All Partners</span>
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SEARCH, LOCATION & MULTI-FILTER CONTROL BAR                   */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-5 sm:p-6 space-y-4">
        {/* Row 1: Search Field + "Use My Location" Button */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          {/* Main search field */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by center name, city, district, address, pin code, or scheme..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-saarthi-navy transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* "Use My Location" + Quick City Selector */}
          <div className="flex items-center gap-2 relative">
            <button
              type="button"
              onClick={handleUseMyLocation}
              disabled={isDetectingGps}
              className="flex-1 sm:flex-initial px-4 py-3 rounded-2xl bg-saarthi-navy hover:bg-saarthi-navy-light text-white text-xs font-bold transition flex items-center justify-center space-x-2 shadow-sm"
              title="Use your device GPS or auto-detect"
            >
              <Navigation className={`w-4 h-4 text-emerald-400 ${isDetectingGps ? "animate-spin" : ""}`} />
              <span className="whitespace-nowrap">
                {isDetectingGps ? "Detecting..." : "Use My Location"}
              </span>
            </button>

            {/* Quick Mock Location Dropdown button */}
            <button
              type="button"
              onClick={() => setIsLocationSelectorOpen((prev) => !prev)}
              className="px-3 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold transition flex items-center space-x-1.5"
              title="Select a standard Indian city hub"
            >
              <MapPin className="w-4 h-4 text-rose-500" />
              <span className="hidden sm:inline">{activeUserLocation.city}</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isLocationSelectorOpen ? "rotate-90" : ""}`} />
            </button>

            {/* Location selector popover */}
            {isLocationSelectorOpen && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-30 space-y-1 animate-fadeIn">
                <div className="px-2 py-1.5 text-[11px] font-black uppercase text-slate-400 tracking-wider flex items-center justify-between border-b border-slate-100">
                  <span>Select Regional Hub</span>
                  <button
                    onClick={() => setIsLocationSelectorOpen(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-1 pt-1">
                  {mockUserLocations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => handleSelectMockLocation(loc)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                        activeUserLocation.id === loc.id
                          ? "bg-emerald-50 text-saarthi-green font-bold"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div>
                        <strong className="block">{loc.name}</strong>
                        <span className="text-[10px] text-slate-400">{loc.state}</span>
                      </div>
                      {activeUserLocation.id === loc.id && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-saarthi-green" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Location Status Feedback Pill */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-slate-600 font-medium">{locationStatusMessage}</span>
          </div>

          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Distances recalculated dynamically relative to selected hub
          </span>
        </div>

        {/* Row 2: Filter Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
          {/* Partner Type Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Partner Center Type
            </label>
            <select
              value={selectedPartnerType}
              onChange={(e) => setSelectedPartnerType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
            >
              {PARTNER_TYPES.map((pt) => (
                <option key={pt.id} value={pt.id}>
                  {pt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Scheme Compatibility Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Scheme Compatibility
            </label>
            <select
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
            >
              {SCHEME_FILTERS.map((sf) => (
                <option key={sf.id} value={sf.id}>
                  {sf.name}
                </option>
              ))}
            </select>
          </div>

          {/* Distance Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Distance Radius
            </label>
            <select
              value={selectedDistance}
              onChange={(e) => setSelectedDistance(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
            >
              <option value="Any Distance">Any Distance Radius</option>
              <option value="Within 3 km">Within 3 km</option>
              <option value="Within 5 km">Within 5 km</option>
              <option value="Within 10 km">Within 10 km</option>
              <option value="Within 25 km">Within 25 km</option>
            </select>
          </div>

          {/* Sort By Option */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Sort Partners By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
            >
              <option value="nearest">Nearest First (Proximity)</option>
              <option value="rating">Highest User Rating</option>
              <option value="schemes">Most Schemes Handled</option>
            </select>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* RECOMMENDED PARTNERS SPOTLIGHT (Top 3 Compatible)             */}
      {/* ------------------------------------------------------------- */}
      {recommendedPartners.length > 0 && (
        <div className="bg-gradient-to-br from-slate-900 via-saarthi-navy to-slate-900 rounded-3xl p-6 text-white shadow-soft">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                ★
              </div>
              <div>
                <h3 className="text-base font-black tracking-wide">
                  Top Recommended Partners Near You
                </h3>
                <p className="text-xs text-slate-300">
                  Highest rated government facilitation centers with confirmed verification desks.
                </p>
              </div>
            </div>

            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
              Verified Handholding Network
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedPartners.map((partner, idx) => (
              <div
                key={partner.id}
                onClick={() => setSelectedPartnerId(partner.id)}
                className={`p-4 rounded-2xl border transition cursor-pointer text-left flex flex-col justify-between ${
                  partner.id === activePartner?.id
                    ? "bg-white/15 border-emerald-400 ring-2 ring-emerald-400/40"
                    : "bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/20"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 truncate">
                      {partner.type}
                    </span>
                    <span className="text-[11px] font-black text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                      ★ {partner.rating}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white line-clamp-1">
                    {partner.name}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {partner.address}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs text-emerald-300 font-bold">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{partner.effectiveDistanceKm} km away</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDetailModalPartner(partner);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MAIN CONTENT: INTERACTIVE MAP + PARTNER CARDS LIST            */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        {/* Subheader / Status Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-black text-saarthi-navy">
              {filteredAndSortedPartners.length} Verified Partners Available
            </span>
            <span className="text-xs text-slate-400">
              ({selectedState !== "All States" ? selectedState : "All India Coverage"})
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-semibold">
            <span className="text-slate-500">Active View:</span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold">
              GPS Map & Directory
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Layout: Cards List (Left) + Interactive Vector Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
          {/* LEFT COLUMN: PARTNER CARDS DIRECTORY (5 cols) */}
          <div className="lg:col-span-5 border-r border-slate-200 p-4 space-y-3 overflow-y-auto max-h-[680px]">
            {filteredAndSortedPartners.length === 0 ? (
              <div className="p-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-700">No matching partners found</h4>
                <p className="text-xs text-slate-500">
                  Try widening your distance radius, selecting "All Schemes", or changing your location.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedScheme("All Schemes");
                    setSelectedPartnerType("All Types");
                    setSelectedDistance("Any Distance");
                    setSelectedState("All States");
                  }}
                  className="px-4 py-2 rounded-xl bg-saarthi-navy text-white text-xs font-bold hover:bg-saarthi-navy-light transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredAndSortedPartners.map((partner) => {
                const isSelected = partner.id === activePartner?.id;
                return (
                  <div
                    key={partner.id}
                    onClick={() => setSelectedPartnerId(partner.id)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer text-left relative ${
                      isSelected
                        ? "border-saarthi-green bg-emerald-50/40 shadow-sm ring-2 ring-emerald-500/20"
                        : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/70"
                    }`}
                  >
                    {/* Header: Type + Distance */}
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-saarthi-navy/80 bg-slate-100 px-2 py-0.5 rounded">
                        {partner.type}
                      </span>

                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center space-x-1 flex-shrink-0">
                        <Navigation className="w-3 h-3" />
                        <span>{partner.effectiveDistanceKm} km</span>
                      </span>
                    </div>

                    {/* Partner Name */}
                    <h4 className="text-sm sm:text-base font-bold text-saarthi-navy">
                      {partner.name}
                    </h4>

                    {/* Address & City */}
                    <p className="text-xs text-slate-500 mt-1 flex items-start space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 mr-0.5 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{partner.address}</span>
                    </p>

                    {/* Scheme Compatibility Badge */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      {partner.isCompatible ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-700" />
                          {selectedScheme !== "All Schemes"
                            ? `Compatible with ${
                                SCHEME_FILTERS.find((s) => s.id === selectedScheme)?.name || "Scheme"
                              }`
                            : "Verified Scheme Partner"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
                          General Citizen Services
                        </span>
                      )}

                      {/* Availability status badge */}
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        <Clock className="w-2.5 h-2.5 mr-1 text-slate-500" />
                        {partner.availabilityStatus?.split("•")[0]?.trim() || "Open Today"}
                      </span>
                    </div>

                    {/* Supported Schemes Tags */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                      {(partner.supportedSchemeNames || []).map((sName, sIdx) => {
                        const isCurrentScheme =
                          selectedScheme !== "All Schemes" &&
                          sName.toLowerCase().includes(selectedScheme.toLowerCase());
                        return (
                          <span
                            key={sIdx}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                              isCurrentScheme
                                ? "bg-emerald-600 text-white font-bold"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {sName}
                          </span>
                        );
                      })}
                    </div>

                    {/* Bottom Actions: Call, WhatsApp, View Details */}
                    <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-1.5">
                        <a
                          href={`tel:${partner.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                          title={`Call ${partner.contactPerson || partner.name}`}
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>

                        <a
                          href={`https://wa.me/${(partner.whatsapp || "").replace(/\+/g, "")}?text=Namaste,%20I%20need%20assistance%20with%20government%20scheme%20registration%20under%20Saarthi.`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition"
                          title="Contact via WhatsApp"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetailModalPartner(partner);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-saarthi-navy hover:bg-saarthi-navy-light text-white text-xs font-bold transition flex items-center space-x-1 shadow-2xs"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* RIGHT COLUMN: INTERACTIVE MAP-STYLE AREA (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950 flex flex-col justify-between relative overflow-hidden">
            {/* Visual Vector GPS Map Container */}
            <div className="relative w-full h-full min-h-[420px] flex items-center justify-center p-6 select-none">
              {/* Map GIS Grid Background Pattern */}
              <svg
                className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="gpsGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38BDF8" strokeWidth="0.75" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#gpsGrid)" />
              </svg>

              {/* Stylized Vector Roads / Highway Coordinates Graphic */}
              <svg
                className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
                viewBox="0 0 800 600"
                preserveAspectRatio="none"
              >
                <path
                  d="M 50 150 Q 250 80 450 250 T 750 400"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />
                <path
                  d="M 100 500 Q 300 450 500 200 T 700 80"
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="2"
                />
                <path
                  d="M 200 50 L 250 550"
                  fill="none"
                  stroke="#475569"
                  strokeWidth="1.5"
                />
                <path
                  d="M 600 50 L 550 550"
                  fill="none"
                  stroke="#475569"
                  strokeWidth="1.5"
                />
                <circle cx="400" cy="300" r="180" fill="none" stroke="#047857" strokeWidth="1" opacity="0.4" />
                <circle cx="400" cy="300" r="90" fill="none" stroke="#047857" strokeWidth="1" opacity="0.6" />
              </svg>

              {/* Center User Location Marker (Radar Pulse) */}
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
                style={{ top: "48%", left: "50%" }}
              >
                <div className="relative">
                  <span className="absolute -inset-2 rounded-full bg-emerald-500/40 animate-ping" />
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <LocateFixed className="w-4 h-4" />
                  </div>
                </div>
                <span className="mt-1 px-2 py-0.5 rounded-full bg-slate-900/90 text-white text-[10px] font-black border border-emerald-500/50 shadow whitespace-nowrap">
                  📍 {activeUserLocation.city} (You)
                </span>
              </div>

              {/* Partner Interactive Pins on Map */}
              <div className="absolute inset-0 p-8">
                {filteredAndSortedPartners.slice(0, 10).map((partner, index) => {
                  const isSelected = partner.id === activePartner?.id;
                  // Generate spread coordinates relative to center
                  const angle = (index * (360 / Math.min(filteredAndSortedPartners.length, 10)) * Math.PI) / 180;
                  const radius = 90 + ((index * 35) % 130);
                  const topPct = 48 + Math.sin(angle) * (radius / 6);
                  const leftPct = 50 + Math.cos(angle) * (radius / 4);

                  return (
                    <div
                      key={partner.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10"
                      style={{
                        top: `${Math.max(12, Math.min(88, topPct))}%`,
                        left: `${Math.max(10, Math.min(90, leftPct))}%`
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedPartnerId(partner.id)}
                        className={`group relative p-2 rounded-2xl flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-saarthi-green text-white scale-125 ring-4 ring-emerald-400/40 shadow-2xl z-30"
                            : "bg-white text-saarthi-navy hover:scale-115 shadow-md z-10"
                        }`}
                        title={`${partner.name} (${partner.effectiveDistanceKm} km)`}
                      >
                        {partner.type.includes("CSC") ? (
                          <Building2 className="w-4 h-4" />
                        ) : partner.type.includes("Bank") ? (
                          <Building2 className="w-4 h-4 text-blue-600" />
                        ) : partner.type.includes("DIC") ? (
                          <Award className="w-4 h-4 text-amber-600" />
                        ) : (
                          <MapPin className="w-4 h-4 text-rose-500" />
                        )}

                        {/* Pin Tag */}
                        {isSelected && (
                          <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-xl whitespace-nowrap border border-emerald-400/50 flex items-center space-x-1">
                            <span>{partner.name.split(" - ")[1] || partner.city}</span>
                            <span className="text-emerald-400">({partner.effectiveDistanceKm} km)</span>
                          </div>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Map Floating Top Console Bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="bg-slate-900/90 backdrop-blur text-white text-[11px] font-semibold px-3 py-1.5 rounded-full border border-slate-700/80 flex items-center space-x-2 shadow-lg pointer-events-auto">
                  <Navigation className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                  <span>Interactive Partner GPS Network</span>
                </div>

                {/* Future Map API Notice Pill */}
                <div className="hidden md:flex bg-slate-900/90 backdrop-blur text-slate-300 text-[10px] font-medium px-3 py-1.5 rounded-full border border-slate-800 pointer-events-auto">
                  <span>GIS Ready • Google Maps & OpenStreetMap Compatible</span>
                </div>
              </div>

              {/* Map Zoom Controls (Bottom Right) */}
              <div className="absolute bottom-4 right-4 flex flex-col space-y-1.5 z-20">
                <button
                  type="button"
                  onClick={() => setMapZoom((z) => Math.min(z + 0.2, 1.8))}
                  className="w-8 h-8 rounded-xl bg-slate-900/90 text-white hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold shadow-md transition"
                  title="Zoom In"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => setMapZoom((z) => Math.max(z - 0.2, 0.8))}
                  className="w-8 h-8 rounded-xl bg-slate-900/90 text-white hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold shadow-md transition"
                  title="Zoom Out"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMapZoom(1);
                    if (filteredAndSortedPartners[0]) {
                      setSelectedPartnerId(filteredAndSortedPartners[0].id);
                    }
                  }}
                  className="w-8 h-8 rounded-xl bg-slate-900/90 text-white hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold shadow-md transition"
                  title="Reset Map View"
                >
                  ⟲
                </button>
              </div>
            </div>

            {/* Bottom Active Partner Preview Card */}
            {activePartner && (
              <div className="p-5 sm:p-6 bg-white border-t border-slate-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">
                        {activePartner.type}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        <CheckCircle2 className="w-3 h-3 mr-1 text-saarthi-green" />
                        UIDAI / Ministry Verified Center
                      </span>
                    </div>

                    <h3 className="text-base font-black text-saarthi-navy mt-1">
                      {activePartner.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {activePartner.address}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <a
                      href={`tel:${activePartner.phone}`}
                      className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition border border-slate-200"
                    >
                      <Phone className="w-3.5 h-3.5 text-saarthi-navy" />
                      <span>Call Center</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setDetailModalPartner(activePartner)}
                      className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-saarthi-green hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
                    >
                      <span>Full Center Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Operating schedule & services preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 mt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">In-Charge & Hours:</span>
                    <strong className="text-slate-800 font-bold">{activePartner.contactPerson}</strong>
                    <span className="block text-slate-500 text-[11px]">{activePartner.operatingHours}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Supported Schemes:</span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {(activePartner.supportedSchemeNames || []).slice(0, 3).map((sn, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                          {sn}
                        </span>
                      ))}
                      {(activePartner.supportedSchemeNames || []).length > 3 && (
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px]">
                          +{(activePartner.supportedSchemeNames || []).length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* VIEW DETAILS COMPREHENSIVE MODAL                              */}
      {/* ------------------------------------------------------------- */}
      {detailModalPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-left">
            {/* Modal Header */}
            <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                    {detailModalPartner.type}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                    {detailModalPartner.effectiveDistanceKm} km from you
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-saarthi-navy">
                  {detailModalPartner.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 mr-1 flex-shrink-0" />
                  <span>{detailModalPartner.address}</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setDetailModalPartner(null);
                  setAppointmentSuccess(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center flex-shrink-0 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Contact Information & Hours Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-saarthi-navy">
                    Official Contact
                  </h4>
                  <div>
                    <span className="text-slate-400 block text-[10px]">In-Charge Person:</span>
                    <strong className="text-slate-800 text-sm font-bold">
                      {detailModalPartner.contactPerson}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Phone / Mobile:</span>
                    <a
                      href={`tel:${detailModalPartner.phone}`}
                      className="text-saarthi-navy font-bold hover:underline"
                    >
                      {detailModalPartner.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Email Address:</span>
                    <a
                      href={`mailto:${detailModalPartner.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {detailModalPartner.email}
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-saarthi-navy">
                    Operating Schedule & Languages
                  </h4>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Timings:</span>
                    <strong className="text-slate-800 font-bold">
                      {detailModalPartner.operatingHours}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Current Status:</span>
                    <span className="inline-flex items-center text-emerald-800 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5" />
                      {detailModalPartner.availabilityStatus}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Spoken Languages:</span>
                    <span className="text-slate-700 font-medium">
                      {(detailModalPartner.languages || ["Hindi", "English"]).join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Supported Schemes Table */}
              <div>
                <h4 className="text-sm font-black text-saarthi-navy mb-2 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-saarthi-green" />
                  <span>Government Schemes Supported & Handholding Services</span>
                </h4>
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2.5">
                  {(detailModalPartner.supportedSchemeNames || []).map((sName, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-2.5 rounded-xl bg-white border border-emerald-100 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-saarthi-green flex-shrink-0" />
                        <strong className="text-slate-800">{sName}</strong>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Official Application Desk
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Free Services Handled */}
              <div>
                <h4 className="text-sm font-black text-saarthi-navy mb-2">
                  Zero-Cost Services Offered at this Center:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {(detailModalPartner.servicesOffered || []).map((srv, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-2 text-slate-700"
                    >
                      <span className="text-saarthi-green font-black">✓</span>
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Appointment / Callback Request Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h5 className="text-xs font-black text-amber-950 uppercase tracking-wider">
                      Request Free Walk-In Appointment / Callback
                    </h5>
                    <p className="text-[11px] text-amber-900 mt-0.5">
                      Book a priority time slot for document verification and DPR submission.
                    </p>
                  </div>

                  {appointmentSuccess ? (
                    <span className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Slot Requested! Center will call you.</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setAppointmentSuccess(true)}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-sm"
                    >
                      Book Free Slot
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Center ID: <code className="font-mono">{detailModalPartner.id}</code> • SIH Accredited
              </span>

              <div className="flex items-center space-x-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    detailModalPartner.name + " " + detailModalPartner.address
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold transition flex items-center space-x-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span>Open in Maps</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setDetailModalPartner(null);
                    setAppointmentSuccess(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-saarthi-navy hover:bg-saarthi-navy-light text-white text-xs font-bold transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

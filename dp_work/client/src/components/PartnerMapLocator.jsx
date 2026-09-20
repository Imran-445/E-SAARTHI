import React, { useState } from "react";
import { MapPin, Phone, MessageSquare, Clock, Globe2, Search, CheckCircle2, Navigation, Star } from "lucide-react";
import { fallbackPartners } from "../services/api.js";

export default function PartnerMapLocator({ initialPartners = fallbackPartners }) {
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCategory, setSelectedCategory] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPartnerId, setSelectedPartnerId] = useState(initialPartners[0]?.id || "csc-001");

  const states = ["All States", "Delhi", "Uttar Pradesh", "Maharashtra", "Bihar", "Karnataka", "Rajasthan"];
  const categories = ["All Types", "Common Service Center (CSC)", "Lead District Bank Mitra", "MSME Nodal Facilitation Desk", "RSETI Skill & Enterprise Hub"];

  // Filter partners
  const filteredPartners = initialPartners.filter((p) => {
    const matchesState = selectedState === "All States" || p.state.toLowerCase() === selectedState.toLowerCase();
    const matchesCategory = selectedCategory === "All Types" || p.type.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesCategory && matchesSearch;
  });

  const activePartner = initialPartners.find((p) => p.id === selectedPartnerId) || filteredPartners[0] || initialPartners[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden text-left">
      {/* Search & Filter Header Bar */}
      <div className="p-6 bg-slate-50/80 border-b border-slate-200">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by center name, pin code, or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
            >
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Partner List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* Left Column: Partners List (5 cols) */}
        <div className="lg:col-span-5 border-r border-slate-200 overflow-y-auto max-h-[580px] p-4 space-y-3">
          <div className="flex items-center justify-between px-1 text-xs text-slate-500 font-semibold">
            <span>{filteredPartners.length} Verified Centers Found</span>
            <span>Real-Time Support</span>
          </div>

          {filteredPartners.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No matching centers found for this filter. Try selecting "All States" or clearing the search.
            </div>
          ) : (
            filteredPartners.map((p) => {
              const isSelected = p.id === activePartner?.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPartnerId(p.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? "border-saarthi-green bg-emerald-50/40 shadow-sm ring-1 ring-emerald-500/20"
                      : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-saarthi-navy/70 block">
                        {p.type}
                      </span>
                      <h4 className="text-sm font-bold text-saarthi-navy mt-0.5">
                        {p.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 flex items-center">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 mr-1 flex-shrink-0" />
                        <span className="line-clamp-1">{p.address}</span>
                      </p>
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex-shrink-0">
                      {p.distanceKm} km
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600 pt-2.5 border-t border-slate-100">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="font-bold">{p.rating}</span>
                      <span className="text-slate-400">({p.reviewsCount})</span>
                    </div>

                    <div className="text-slate-500">
                      Spoken: <strong className="text-slate-700">{p.languages.join(", ")}</strong>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Visual Interactive Map & Active Detail Card (7 cols) */}
        <div className="lg:col-span-7 bg-slate-100 flex flex-col justify-between relative overflow-hidden">
          {/* Stylized Visual Map Representation */}
          <div className="relative w-full h-[320px] bg-slate-900 overflow-hidden flex items-center justify-center">
            {/* Map Grid Pattern Background */}
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#60A5FA" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Stylized India Regional Outline Accent */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
              <svg viewBox="0 0 400 400" className="w-80 h-80 text-emerald-500 fill-emerald-950 stroke-emerald-400" strokeWidth="1.5">
                <path d="M190 40 Q210 60 230 90 T260 150 Q280 200 250 250 T190 350 Q160 280 140 220 T130 140 Q150 70 190 40 Z" />
              </svg>
            </div>

            {/* Interactive Pins for Filtered Partners */}
            <div className="absolute inset-0 p-8 flex flex-wrap items-center justify-around">
              {filteredPartners.map((p, i) => {
                const isSelected = p.id === activePartner?.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPartnerId(p.id)}
                    className={`relative transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 p-2 rounded-full flex items-center justify-center ${
                      isSelected
                        ? "bg-emerald-500 text-white scale-125 shadow-xl ring-4 ring-emerald-400/40 z-20"
                        : "bg-white text-saarthi-navy hover:scale-110 shadow-md z-10"
                    }`}
                    style={{
                      marginTop: `${(i % 3) * 35}px`,
                      marginLeft: `${(i % 4) * 45}px`
                    }}
                    title={p.name}
                  >
                    <MapPin className="w-5 h-5" />
                    {isSelected && (
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-saarthi-navy text-[10px] font-extrabold px-2 py-0.5 rounded shadow whitespace-nowrap">
                        {p.name.split(" - ")[1] || p.district}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Map control pill badge */}
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-white text-[11px] font-semibold px-3 py-1.5 rounded-full border border-slate-700 flex items-center space-x-1.5 shadow">
              <Navigation className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
              <span>Verified Government Partner GPS Network</span>
            </div>
          </div>

          {/* Active Partner Bottom Detail Pane */}
          {activePartner && (
            <div className="p-6 bg-white border-t border-slate-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      {activePartner.type}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Verified Center
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-saarthi-navy mt-0.5">
                    {activePartner.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activePartner.address}
                  </p>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <a
                    href={`tel:${activePartner.phone}`}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-saarthi-navy hover:bg-saarthi-navy-light text-white text-xs font-bold transition shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>

                  <a
                    href={`https://wa.me/${activePartner.whatsapp.replace(/\+/g, "")}?text=Namaste,%20I%20need%20assistance%20with%20government%20scheme%20registration%20under%20Saarthi.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Operating details & provided services */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[11px]">Contact Person & Timings:</span>
                  <strong className="text-slate-800">{activePartner.contactPerson}</strong>
                  <span className="block text-slate-500">{activePartner.operatingHours}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Free Services Handled:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {activePartner.servicesOffered.slice(0, 3).map((srv, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

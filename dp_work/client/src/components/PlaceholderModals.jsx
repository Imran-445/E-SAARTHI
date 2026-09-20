import React, { useState } from "react";
import { X, Lock, ShieldCheck, FileCheck, ArrowRight, UserCheck } from "lucide-react";

export function LoginModal({ isOpen, onClose }) {
  const [phoneOrAadhaar, setPhoneOrAadhaar] = useState("");
  const [role, setRole] = useState("Entrepreneur");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn text-left">
        <div className="tricolor-border-top" />

        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-saarthi-navy flex items-center justify-center text-white">
              <Lock className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-saarthi-navy">Citizen & Partner Login</h3>
              <p className="text-[11px] text-slate-500">Secure Government Auth Prototype</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {loggedIn ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <UserCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-saarthi-navy">Welcome, Entrepreneur!</h4>
              <p className="text-xs text-slate-500">
                You are authenticated into Saarthi (SIH 2026 Prototype). All matched schemes and partner connections are active.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-saarthi-green text-white text-xs font-bold"
              >
                Continue to Portal
              </button>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1.5">
                  Select Login Role
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setRole("Entrepreneur")}
                    className={`py-2 px-3 rounded-xl border font-semibold ${
                      role === "Entrepreneur"
                        ? "border-saarthi-green bg-emerald-50 text-emerald-800"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    Entrepreneur / Citizen
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("Partner")}
                    className={`py-2 px-3 rounded-xl border font-semibold ${
                      role === "Partner"
                        ? "border-saarthi-green bg-emerald-50 text-emerald-800"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    CSC / Bank Mitra
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1.5">
                  Mobile Number / Aadhaar Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 9876543210 or 12-digit Aadhaar"
                  value={phoneOrAadhaar}
                  onChange={(e) => setPhoneOrAadhaar(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
                />
              </div>

              {otpSent && (
                <div className="animate-fadeIn">
                  <label className="block text-xs font-bold uppercase tracking-wider text-saarthi-navy mb-1.5">
                    Enter Demo OTP (Use: 1234)
                  </label>
                  <input
                    type="text"
                    placeholder="1234"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-center tracking-widest text-slate-800 focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
                  />
                </div>
              )}

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-[11px] text-blue-800">
                🔒 Demo Mode: Enter any mobile number and test with OTP <code>1234</code>.
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!otpSent) {
                    setOtpSent(true);
                  } else {
                    setLoggedIn(true);
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-saarthi-green hover:bg-saarthi-green-hover text-white text-xs font-bold transition shadow"
              >
                {otpSent ? "Verify & Proceed" : "Send OTP via SMS"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

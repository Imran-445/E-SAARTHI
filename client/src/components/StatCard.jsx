import React from "react";

export default function StatCard({ icon: Icon, stat, label, description, highlightColor = "green" }) {
  const getIconColor = () => {
    switch (highlightColor) {
      case "green":
        return "bg-emerald-100 text-emerald-700";
      case "saffron":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft hover:shadow-card transition-all text-left flex items-start space-x-4">
      <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${getIconColor()}`}>
        {Icon && <Icon className="w-6 h-6" />}
      </div>
      <div>
        <div className="text-2xl sm:text-3xl font-black text-saarthi-navy tracking-tight">
          {stat}
        </div>
        <div className="text-sm font-bold text-slate-800 mt-0.5">
          {label}
        </div>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

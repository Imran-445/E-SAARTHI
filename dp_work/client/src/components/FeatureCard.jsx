import React from "react";
import { ArrowRight } from "lucide-react";

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  badgeText,
  onClick,
  accentColor = "navy", // 'navy', 'green', 'saffron', 'blue'
}) {
  const getBadgeStyle = () => {
    switch (accentColor) {
      case "green":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "saffron":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  const getIconContainerStyle = () => {
    switch (accentColor) {
      case "green":
        return "bg-emerald-100 text-emerald-800 group-hover:bg-emerald-600 group-hover:text-white";
      case "saffron":
        return "bg-amber-100 text-amber-800 group-hover:bg-amber-600 group-hover:text-white";
      default:
        return "bg-slate-100 text-saarthi-navy group-hover:bg-saarthi-navy group-hover:text-white";
    }
  };

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick && onClick();
        }
      }}
      className="group relative bg-white rounded-2xl border border-slate-200 p-6 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 shadow-sm ${getIconContainerStyle()}`}
          >
            {Icon && <Icon className="w-6 h-6" />}
          </div>
          {badgeText && (
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getBadgeStyle()}`}
            >
              {badgeText}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-saarthi-navy group-hover:text-saarthi-navy-light transition-colors mb-2">
          {title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-saarthi-navy group-hover:text-saarthi-green transition-colors">
        <span>Explore Now</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
      </div>
    </div>
  );
}

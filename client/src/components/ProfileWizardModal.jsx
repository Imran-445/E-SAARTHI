import React from "react";
import SchemeFinderFlow from "./SchemeFinderFlow";

export default function ProfileWizardModal({ isOpen, onClose, onMatchComplete }) {
  if (!isOpen) return null;

  const handleComplete = (formData) => {
    if (onMatchComplete) {
      onMatchComplete(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl my-8">
        <SchemeFinderFlow
          onComplete={handleComplete}
          onCancel={onClose}
          isModal={true}
        />
      </div>
    </div>
  );
}

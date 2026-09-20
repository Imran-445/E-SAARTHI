import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  HelpCircle,
  ShieldCheck,
  RotateCcw,
  Globe,
  ChevronDown,
  ExternalLink,
  Layers,
  Info,
  Building2,
  AlertTriangle
} from "lucide-react";
import { sendChatMessage } from "../services/api.js";
import {
  ASSISTANT_I18N,
  SCHEME_KNOWLEDGE,
  AVAILABLE_ASSISTANT_SCHEMES,
  getSuggestedQuestionsForScheme,
  generateAssistantResponse
} from "../services/assistantEngine.js";

export default function ChatbotWidget({ userProfile: propUserProfile = null }) {
  const location = useLocation();

  // 1. Language State (persisted in localStorage)
  const [currentLang, setCurrentLang] = useState(() => {
    try {
      const saved = localStorage.getItem("saarthi_assistant_lang");
      if (saved && ["en", "hi", "gu"].includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.warn("Could not load language from localStorage", e);
    }
    return "en";
  });

  const t = ASSISTANT_I18N[currentLang] || ASSISTANT_I18N.en;

  // 2. Open / Minimized State
  const [isOpen, setIsOpen] = useState(false);

  // 3. Scheme Context (defaults to "pm-svanidhi" or detected from URL)
  const [activeSchemeId, setActiveSchemeId] = useState("pm-svanidhi");
  const [schemeDropdownOpen, setSchemeDropdownOpen] = useState(false);

  // 4. User profile (from props or localStorage)
  const [userProfile, setUserProfile] = useState(() => {
    if (propUserProfile) return propUserProfile;
    try {
      const saved = localStorage.getItem("saarthi_user_profile");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return null;
  });

  // Automatically sync scheme context if user is viewing a scheme details page (/schemes/:id)
  useEffect(() => {
    const match = location.pathname.match(/^\/schemes\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      const schemeId = match[1];
      if (SCHEME_KNOWLEDGE[schemeId]) {
        setActiveSchemeId(schemeId);
      }
    }
  }, [location.pathname]);

  // Listen for custom open-chat events triggered by UI buttons across the platform
  useEffect(() => {
    const handleOpenChatEvent = (e) => {
      setIsOpen(true);
      if (e.detail?.schemeId && SCHEME_KNOWLEDGE[e.detail.schemeId]) {
        setActiveSchemeId(e.detail.schemeId);
      }
      if (e.detail?.initialQuery) {
        handleSendMessage(e.detail.initialQuery);
      }
    };
    window.addEventListener("saarthi:open-chat", handleOpenChatEvent);
    return () => window.removeEventListener("saarthi:open-chat", handleOpenChatEvent);
  }, [currentLang, activeSchemeId]);

  // Listen for storage events (e.g. language updated in Header)
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem("saarthi_assistant_lang");
        if (saved && ["en", "hi", "gu"].includes(saved) && saved !== currentLang) {
          setCurrentLang(saved);
        }
      } catch (e) {}
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [currentLang]);

  // Persist language selection
  const handleLanguageChange = (langCode) => {
    setCurrentLang(langCode);
    try {
      localStorage.setItem("saarthi_assistant_lang", langCode);
      window.dispatchEvent(new Event("storage"));
    } catch (e) {
      console.warn("Could not save language to localStorage", e);
    }
  };

  // Initial welcome message localized
  const getInitialMessage = (lang) => {
    const strings = ASSISTANT_I18N[lang] || ASSISTANT_I18N.en;
    return {
      sender: "bot",
      text: strings.welcome,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
  };

  // 5. Chat History (persisted in sessionStorage)
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem("saarthi_chat_history");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not load chat history from sessionStorage", e);
    }
    return [getInitialMessage(currentLang)];
  });

  // Save chat history to sessionStorage whenever it changes
  useEffect(() => {
    try {
      sessionStorage.setItem("saarthi_chat_history", JSON.stringify(messages));
    } catch (e) {
      console.warn("Could not save chat history to sessionStorage", e);
    }
  }, [messages]);

  // Suggested questions based on active scheme and current language
  const suggestedChips = getSuggestedQuestionsForScheme(activeSchemeId, currentLang);

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input on desktop
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [messages, isOpen]);

  // Clear chat history
  const handleClearChat = () => {
    const reset = [getInitialMessage(currentLang)];
    setMessages(reset);
    try {
      sessionStorage.setItem("saarthi_chat_history", JSON.stringify(reset));
    } catch (e) {}
  };

  // Send message
  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // 1. Append user message
    setMessages((prev) => [...prev, { sender: "user", text, timestamp: time }]);
    setInputMessage("");
    setIsLoading(true);

    // Realistic typing delay (450ms) for natural assistant feel
    await new Promise((resolve) => setTimeout(resolve, 450));

    try {
      const res = await sendChatMessage(text, {
        language: currentLang,
        schemeId: activeSchemeId,
        userProfile
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: res.reply,
          intent: res.intent,
          schemeId: res.schemeId,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } catch (err) {
      // Fallback directly to client assistant engine
      const localRes = generateAssistantResponse({
        message: text,
        language: currentLang,
        activeSchemeId,
        userProfile
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: localRes.reply,
          intent: localRes.intent,
          schemeId: localRes.schemeId,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to format bold, bullets, and line breaks in assistant replies
  const renderFormattedMessage = (text) => {
    if (!text) return null;
    const lines = text.split("\n");

    return (
      <div className="space-y-1.5 leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }

          // Format bold markers like **bold**
          const parts = line.split(/(\*\*.*?\*\*)/g);
          const renderedLine = parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="font-bold text-slate-900">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
              return (
                <em key={pIdx} className="italic text-slate-600">
                  {part.slice(1, -1)}
                </em>
              );
            }
            return part;
          });

          // Bullet points
          if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
            return (
              <div key={idx} className="flex items-start space-x-2 pl-1 text-slate-800">
                <span className="text-saarthi-green font-bold text-sm leading-none mt-1">•</span>
                <span className="flex-1">{renderedLine}</span>
              </div>
            );
          }

          // Numbered lists
          const numMatch = line.match(/^(\d+)\.\s*(.*)/);
          if (numMatch) {
            return (
              <div key={idx} className="flex items-start space-x-2 pl-1 text-slate-800">
                <span className="text-saarthi-navy font-bold text-xs bg-slate-100 rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {numMatch[1]}
                </span>
                <span className="flex-1">{renderedLine}</span>
              </div>
            );
          }

          return (
            <p key={idx} className="text-slate-800">
              {renderedLine}
            </p>
          );
        })}
      </div>
    );
  };

  const activeSchemeObj = AVAILABLE_ASSISTANT_SCHEMES.find((s) => s.id === activeSchemeId) || AVAILABLE_ASSISTANT_SCHEMES[0];
  const activeSchemeLabel =
    currentLang === "hi"
      ? activeSchemeObj.labelHi
      : currentLang === "gu"
      ? activeSchemeObj.labelGu
      : activeSchemeObj.labelEn;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 text-left">
      {/* 1. Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-saarthi-navy hover:bg-saarthi-navy-light text-white shadow-2xl hover:shadow-emerald-900/30 transition-all duration-300 hover:scale-105 border-2 border-amber-400/40"
          aria-label="Open Saarthi Mitra Multilingual AI Assistant"
        >
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white" />
          </div>

          <div className="text-left hidden sm:block">
            <div className="flex items-center space-x-1.5">
              <span className="text-sm font-bold block leading-tight">{t.name}</span>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 font-semibold px-1.5 py-0.2 rounded">
                AI
              </span>
            </div>
            <span className="text-[11px] text-slate-300 font-medium block">
              {currentLang === "hi" ? "योजना मार्गदर्शन" : currentLang === "gu" ? "યોજના માર્ગદર્શન" : "Multilingual Scheme Help"}
            </span>
          </div>

          {/* Quick Language pill on trigger */}
          <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/15 text-slate-200 border border-white/10 uppercase">
            {currentLang}
          </span>
        </button>
      )}

      {/* 2. Floating / Docked Chat Modal */}
      {isOpen && (
        <div className="fixed inset-x-2 bottom-2 top-14 sm:static sm:inset-auto sm:top-auto sm:bottom-auto sm:w-[430px] sm:h-[620px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fadeIn z-50">
          {/* A. Assistant Header */}
          <div className="p-3 sm:p-4 bg-gradient-to-r from-saarthi-navy via-slate-900 to-saarthi-navy text-white flex flex-col space-y-2.5 relative border-b border-slate-800">
            {/* Top row: Identity & controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md border border-emerald-400/30 flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-bold tracking-tight">{t.name}</h3>
                    <span className="text-[9px] bg-emerald-700/70 text-emerald-200 px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider">
                      {t.prototypeBadge}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300">{t.role}</p>
                </div>
              </div>

              {/* Actions: Clear chat & close */}
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={handleClearChat}
                  title={t.clearChat}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
                  aria-label="Clear chat history"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-red-500/80 flex items-center justify-center text-slate-300 hover:text-white transition"
                  aria-label="Close assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Middle row: Language Switcher Pills */}
            <div className="flex items-center justify-between bg-black/25 p-1 rounded-xl border border-white/10 text-xs">
              <span className="text-[10px] text-slate-300 font-semibold px-2 flex items-center space-x-1">
                <Globe className="w-3 h-3 text-amber-400" />
                <span>Language:</span>
              </span>

              <div className="flex items-center space-x-1">
                {[
                  { code: "en", label: "English" },
                  { code: "hi", label: "हिन्दी" },
                  { code: "gu", label: "ગુજરાતી" }
                ].map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => handleLanguageChange(l.code)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      currentLang === l.code
                        ? "bg-saarthi-green text-white shadow"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom row: Scheme Context Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSchemeDropdownOpen(!schemeDropdownOpen)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-[11px] text-slate-200 transition"
              >
                <div className="flex items-center space-x-1.5 truncate">
                  <Layers className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="text-slate-300 font-medium">{t.activeContext}:</span>
                  <span className="font-bold text-white truncate">{activeSchemeLabel}</span>
                </div>
                <ChevronDown className={`w-3 h-3 text-slate-300 transition-transform ${schemeDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {schemeDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 max-h-52 overflow-y-auto animate-fadeIn">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    {t.changeScheme}
                  </div>
                  {AVAILABLE_ASSISTANT_SCHEMES.map((scheme) => (
                    <button
                      key={scheme.id}
                      type="button"
                      onClick={() => {
                        setActiveSchemeId(scheme.id);
                        setSchemeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${
                        activeSchemeId === scheme.id ? "bg-emerald-50 text-emerald-900 font-bold" : "text-slate-700"
                      }`}
                    >
                      <span className="truncate">
                        {currentLang === "hi"
                          ? scheme.labelHi
                          : currentLang === "gu"
                          ? scheme.labelGu
                          : scheme.labelEn}
                      </span>
                      {activeSchemeId === scheme.id && (
                        <span className="text-saarthi-green text-xs font-bold ml-2">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* B. AI Prototype Disclaimer Banner */}
          <div className="bg-amber-50 border-b border-amber-200/80 px-3 py-1.5 flex items-start space-x-2 text-[10px] sm:text-[11px] text-amber-900 font-medium">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="leading-tight">{t.disclaimer}</p>
          </div>

          {/* C. Chat Messages Body */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 bg-slate-50/70 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-2 ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.sender === "bot" && (
                  <div className="w-7 h-7 rounded-xl bg-saarthi-navy text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-4 h-4 text-emerald-400" />
                  </div>
                )}

                <div className={`max-w-[85%] flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`p-3 sm:p-3.5 rounded-2xl text-xs shadow-sm ${
                      m.sender === "user"
                        ? "bg-saarthi-navy text-white rounded-br-none"
                        : "bg-white text-slate-800 border border-slate-200/90 rounded-bl-none"
                    }`}
                  >
                    {m.sender === "bot" ? renderFormattedMessage(m.text) : m.text}
                  </div>

                  {m.timestamp && (
                    <span className="text-[9px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
                  )}
                </div>

                {m.sender === "user" && (
                  <div className="w-7 h-7 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex items-center space-x-2.5 text-slate-500 text-xs bg-white border border-slate-200 rounded-2xl px-3 py-2.5 max-w-[75%] shadow-sm">
                <Bot className="w-4 h-4 text-emerald-600 animate-pulse flex-shrink-0" />
                <div className="flex items-center space-x-1.5">
                  <span className="text-[11px] font-medium text-slate-600">{t.typing}</span>
                  <div className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* D. Suggested Questions Pills */}
          <div className="p-2 sm:px-3 sm:py-2 bg-white border-t border-slate-100 flex flex-col space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold uppercase tracking-wider px-1">
              <span>{t.suggestedHeader}</span>
              <span className="text-emerald-700 font-bold">{activeSchemeObj.id}</span>
            </div>

            <div className="overflow-x-auto whitespace-nowrap flex space-x-1.5 no-scrollbar pb-1">
              {suggestedChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(chip)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 text-[11px] font-medium text-slate-700 transition flex-shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* E. Chat Input Bar */}
          <div className="p-2.5 sm:p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
            <input
              ref={inputRef}
              type="text"
              placeholder={t.inputPlaceholder}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 rounded-xl bg-saarthi-green hover:bg-saarthi-green-hover disabled:bg-slate-200 disabled:text-slate-400 text-white transition shadow flex-shrink-0"
              aria-label={t.send}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

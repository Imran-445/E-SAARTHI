import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Bot, User, HelpCircle, ShieldCheck } from "lucide-react";
import { sendChatMessage } from "../services/api.js";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Namaste! I am Saarthi Mitra, your AI scheme guidance assistant. I can help you understand government schemes, subsidies, and required documents. How can I assist you today?"
    }
  ]);
  const [quickChips, setQuickChips] = useState([
    "What is PM SVANidhi?",
    "How much subsidy under PMEGP?",
    "Benefits of PM Vishwakarma for artisans?",
    "Stand-Up India for Women & SC/ST?",
    "Where is my nearest CSC partner?"
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    // Append user message
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const res = await sendChatMessage(text);
      setMessages((prev) => [...prev, { sender: "bot", text: res.reply }]);
      if (res.suggestions && res.suggestions.length > 0) {
        setQuickChips(res.suggestions);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Central schemes like PM SVANidhi, Stand-Up India, PMEGP, and PM Vishwakarma offer collateral-free credit and capital subsidies. You can find full details on the Schemes page!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 text-left">
      {/* Trigger floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-2.5 px-4 py-3 rounded-full bg-saarthi-green hover:bg-saarthi-green-hover text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-emerald-400/40"
          aria-label="Open Saarthi Mitra Chatbot"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs font-bold block leading-none">Saarthi Mitra</span>
            <span className="text-[10px] text-emerald-100 font-medium">AI Scheme Help</span>
          </div>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="p-4 bg-saarthi-navy text-white flex items-center justify-between relative">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-sm font-bold">Saarthi Mitra</h3>
                  <span className="text-[10px] bg-emerald-700/80 text-emerald-200 px-1.5 py-0.2 rounded font-medium">
                    AI Assistant
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Govt Scheme & Handholding Guide
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-2 ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.sender === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-saarthi-navy text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3 rounded-2xl ${
                    m.sender === "user"
                      ? "bg-saarthi-navy text-white rounded-br-none"
                      : "bg-white text-slate-700 border border-slate-200/80 shadow-sm rounded-bl-none leading-relaxed"
                  }`}
                >
                  {m.text}
                </div>

                {m.sender === "user" && (
                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs">
                <Bot className="w-4 h-4 animate-spin text-saarthi-green" />
                <span>Saarthi Mitra is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 overflow-x-auto whitespace-nowrap flex space-x-1.5 no-scrollbar">
            {quickChips.slice(0, 3).map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-[11px] font-medium text-slate-700 transition flex-shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask about schemes, loans, subsidies..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-saarthi-navy"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim()}
              className="p-2 rounded-xl bg-saarthi-green hover:bg-saarthi-green-hover disabled:bg-slate-300 text-white transition shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

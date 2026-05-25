"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Zap, Shield, Search, FileText, X, Sparkles } from "lucide-react";
import { AI_MESSAGES } from "@/lib/mock-data";

type Message = { id: number; role: "user" | "assistant"; content: string; time: string };

const QUICK_ACTIONS = [
  { label: "Analyze Threats", icon: Shield, prompt: "Analyze my current threat landscape and give me a priority list." },
  { label: "Firewall Status", icon: Zap, prompt: "What is the current firewall status and are there any rules I should update?" },
  { label: "Vulnerability Scan", icon: Search, prompt: "Run a vulnerability analysis on my servers and identify critical gaps." },
  { label: "Generate Report", icon: FileText, prompt: "Generate a quick security summary report for this week." },
];

const AI_RESPONSES: Record<string, string> = {
  "Analyze my current threat landscape and give me a priority list.":
    "**Threat Analysis — Current Status**\n\n🔴 **Priority 1 (Critical)**: SQL Injection from 185.220.101.47 — Active. Recommend immediate geo-block of the /24 subnet.\n\n🟠 **Priority 2 (High)**: DDoS campaign targeting port 80. Rate limiting active but insufficient. Recommend CDN-level mitigation.\n\n🟡 **Priority 3 (Medium)**: Port scan activity from Iran IP range. Passive monitoring active, no immediate action required.\n\n✅ Overall risk rating: **HIGH** — 12 active threats being managed.",
  "What is the current firewall status and are there any rules I should update?":
    "**Firewall Status Report**\n\n✅ Firewall is **ACTIVE** — 10 rules enforced\n\n⚠️ **Recommendations:**\n- Rule #8 (Block China Range) is currently **DISABLED** — recommend re-enabling given current DDoS activity\n- Consider adding rate limiting rule for port 443\n- SSH access rule (Rule #3) should restrict source IP to known admin IPs only\n\nOverall firewall health: **Good** — 99.8% block rate in last 24h.",
  "Run a vulnerability analysis on my servers and identify critical gaps.":
    "**Vulnerability Scan Results**\n\n🔴 **Critical**: SRV-06 (Chicago DB) — CVE-2024-1234 (CVSS 9.8) — Unpatched PostgreSQL. **Action required immediately.**\n\n🟠 **High**: SRV-03 (Singapore) — Running at 87% CPU, susceptible to resource exhaustion attacks. Scale or optimize.\n\n🟡 **Medium**: SRV-02 (Frankfurt) — SSL cert expires in 45 days. Schedule renewal.\n\n✅ 5 servers fully patched and healthy.",
  "Generate a quick security summary report for this week.":
    "**Weekly Security Summary — May 17–23, 2025**\n\n📊 **Threats**: 1,420 total detected → 1,391 blocked (97.9% block rate)\n\n🛡️ **Security Score**: 94/100 (+2 from last week)\n\n⚡ **Top Threat**: SQL Injection (28% of all attacks)\n\n🌍 **Top Sources**: Russia (1,847), China (1,423), North Korea (891)\n\n✅ **Compliance**: GDPR 94%, SOC2 88%, ISO27001 91%\n\nNo successful breaches this week.",
};

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(AI_MESSAGES as Message[]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: text, time: "just now" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));
    setIsTyping(false);
    const response = AI_RESPONSES[text] || `I've analyzed your query: **"${text}"**\n\nBased on current telemetry from your 8 servers and active threat feeds, I recommend reviewing your firewall rules and ensuring all critical patches are applied. Would you like me to run a detailed analysis?`;
    const aiMsg: Message = { id: Date.now() + 1, role: "assistant", content: response, time: "just now" };
    setMessages((prev) => [...prev, aiMsg]);
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); sendMessage(input); };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-7rem)] flex flex-col">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-5">
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-[#0A192F] flex items-center justify-center shadow-elevated">
            <Bot size={22} className="text-[#60A5FA]" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#22C55E] border-2 border-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#0A192F]">CyberShield AI</h1>
          <p className="text-sm text-gray-400">Your intelligent security assistant · Online</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-xs font-semibold text-green-700">
          <Sparkles size={11} />
          AI-Powered Analysis
        </div>
      </motion.div>

      {/* Chat window */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 pr-1">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 ${
                msg.role === "assistant" ? "bg-[#0A192F]" : "bg-[#2563EB]"
              }`}>
                {msg.role === "assistant" ? <Bot size={15} className="text-[#60A5FA]" /> : <span className="text-white text-xs font-bold">AM</span>}
              </div>
              <div className={`max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "assistant"
                    ? "bg-white border border-gray-100 shadow-card text-[#0A192F] rounded-tl-sm"
                    : "bg-[#2563EB] text-white rounded-tr-sm shadow-royal"
                }`}
                  dangerouslySetInnerHTML={{
                    __html: msg.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br/>'),
                  }}
                />
                <span className="text-[10px] text-gray-300 px-1">{msg.time}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0A192F] flex items-center justify-center flex-shrink-0">
              <Bot size={15} className="text-[#60A5FA]" />
            </div>
            <div className="bg-white border border-gray-100 shadow-card px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div key={i} className="w-2 h-2 rounded-full bg-gray-300"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 flex-wrap mb-3">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.label}
            id={`ai-action-${action.label.toLowerCase().replace(/\s/g, "-")}`}
            onClick={() => sendMessage(action.prompt)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-600 hover:border-[#2563EB]/30 hover:text-[#2563EB] hover:bg-[#2563EB]/5 transition-all"
          >
            <action.icon size={12} />
            {action.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          id="ai-chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask CyberShield AI anything about your security..."
          className="flex-1 px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm text-[#0A192F] placeholder-gray-400 focus:outline-none focus:border-[#2563EB] transition-all shadow-sm"
        />
        <button
          type="submit"
          id="ai-send-btn"
          disabled={!input.trim() || isTyping}
          className="w-12 h-12 rounded-xl bg-[#2563EB] text-white flex items-center justify-center hover:bg-[#1D4ED8] transition-all shadow-royal disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}

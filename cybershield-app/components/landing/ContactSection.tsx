"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MessageSquare, MapPin, Send, Phone } from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-24 bg-[#0A192F]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to secure your <span className="text-gradient-royal">infrastructure?</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Talk to our security experts. We'll analyze your current posture and recommend the right plan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {[
              { icon: Mail, label: "Email Us", value: "security@cybershield.io", color: "#2563EB" },
              { icon: Phone, label: "Call Us", value: "+1 (800) CYBER-SH", color: "#22C55E" },
              { icon: MapPin, label: "Headquarters", value: "San Francisco, CA 94102", color: "#F59E0B" },
              { icon: MessageSquare, label: "Live Chat", value: "Available 24/7 for enterprise clients", color: "#8B5CF6" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 group">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform group-hover:scale-110"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
                >
                  <item.icon size={18} style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-0.5">{item.label}</p>
                  <p className="text-white font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full bg-[#112240] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#2563EB]/50 transition-colors"
                    id="contact-name"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full bg-[#112240] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#2563EB]/50 transition-colors"
                    id="contact-email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">Company</label>
                <input
                  type="text"
                  placeholder="Your company"
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  className="w-full bg-[#112240] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#2563EB]/50 transition-colors"
                  id="contact-company"
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your security needs..."
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full bg-[#112240] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#2563EB]/50 transition-colors resize-none"
                  id="contact-message"
                />
              </div>
              <button
                type="submit"
                id="contact-submit"
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                  sent
                    ? "bg-[#22C55E] text-white"
                    : "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-royal hover:shadow-[0_8px_24px_rgba(37,99,235,0.5)]"
                }`}
              >
                {sent ? "Message Sent! ✓" : (<><Send size={16} /> Send Message</>)}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

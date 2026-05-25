"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Shield, ArrowRight, Play, Lock, Zap, Eye } from "lucide-react";
import Link from "next/link";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const STATS = [
  { label: "Threats Blocked", value: 2400000, suffix: "+", icon: Shield, color: "#EF4444", display: "2.4M+" },
  { label: "Active Servers", value: 12000, suffix: "+", icon: Zap, color: "#22C55E", display: "12K+" },
  { label: "Firewall Protection", value: 99, suffix: ".9%", icon: Lock, color: "#2563EB", display: "99.9%" },
  { label: "Security Score", value: 98, suffix: "/100", icon: Eye, color: "#F59E0B", display: "98/100" },
];

// Pre-seeded static particle data — avoids SSR/client Math.random() hydration mismatch
const PARTICLES = [
  { left: 12.4, top: 23.1, duration: 3.8, delay: 0.4 },
  { left: 87.2, top: 61.5, duration: 5.1, delay: 1.2 },
  { left: 34.6, top: 8.9,  duration: 4.3, delay: 0.7 },
  { left: 56.8, top: 45.3, duration: 6.2, delay: 2.1 },
  { left: 78.1, top: 82.7, duration: 3.5, delay: 0.2 },
  { left: 5.3,  top: 55.4, duration: 5.7, delay: 1.8 },
  { left: 43.9, top: 34.2, duration: 4.9, delay: 0.9 },
  { left: 92.0, top: 18.6, duration: 3.2, delay: 2.4 },
  { left: 67.4, top: 73.1, duration: 6.8, delay: 1.5 },
  { left: 23.7, top: 91.8, duration: 4.1, delay: 0.1 },
  { left: 50.2, top: 6.3,  duration: 5.4, delay: 2.7 },
  { left: 81.5, top: 47.9, duration: 3.9, delay: 0.6 },
  { left: 17.8, top: 69.4, duration: 6.1, delay: 1.3 },
  { left: 39.3, top: 28.7, duration: 4.6, delay: 2.0 },
  { left: 64.1, top: 85.2, duration: 5.9, delay: 0.8 },
  { left: 96.4, top: 38.5, duration: 3.3, delay: 1.6 },
  { left: 28.6, top: 14.9, duration: 6.5, delay: 2.3 },
  { left: 73.9, top: 57.8, duration: 4.4, delay: 0.5 },
  { left: 8.2,  top: 78.3, duration: 5.2, delay: 1.9 },
  { left: 47.5, top: 43.6, duration: 3.7, delay: 2.6 },
];

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden gradient-hero">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(37,99,235,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#2563EB]/8 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#1E3A5F]/40 blur-[80px]" />
        {/* Floating particles — deterministic positions, no Math.random() */}
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#2563EB]/40"
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 border border-[#2563EB]/30 bg-[#2563EB]/10 text-[#60A5FA] backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
          AI-Powered Security Platform — Enterprise Grade
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-5xl mx-auto"
        >
          AI-Powered Cyber Security
          <br />
          <span className="text-gradient-royal">Platform for Intelligent</span>
          <br />
          Server & Firewall Management
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Protect your entire infrastructure with real-time AI threat detection, intelligent firewall management, 
          and automated incident response. Enterprise-grade security, effortlessly managed.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/register"
            id="hero-get-started"
            className="group flex items-center gap-2.5 px-7 py-3.5 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-[#1D4ED8] transition-all shadow-[0_8px_24px_rgba(37,99,235,0.4)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.55)] hover:-translate-y-0.5"
          >
            Start Free Trial
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <button
            id="hero-watch-demo"
            className="group flex items-center gap-2.5 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/15 border border-white/20 hover:border-white/30 transition-all backdrop-blur-sm"
          >
            <Play size={15} className="fill-white" />
            Watch Demo
          </button>
        </motion.div>

        {/* Animated Shield Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-3xl mb-16"
        >
          {/* Dashboard mockup */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.5)] bg-[#112240]">
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#0A192F] border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]/70" />
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]/70" />
                <div className="w-3 h-3 rounded-full bg-[#22C55E]/70" />
              </div>
              <div className="flex-1 mx-4 bg-[#1E3A5F]/60 rounded-md px-3 py-1 text-xs text-white/30 text-center">
                app.cybershield.io/admin/dashboard
              </div>
            </div>
            {/* Dashboard preview content */}
            <div className="p-4 grid grid-cols-4 gap-3">
              {["2.4M", "99.9%", "12K+", "98/100"].map((val, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="bg-[#1E3A5F]/60 rounded-xl p-3 border border-white/5"
                >
                  <div className="text-xs text-white/40 mb-1">{["Threats Blocked", "Protection Rate", "Active Servers", "Sec Score"][i]}</div>
                  <div className="text-lg font-bold text-white">{val}</div>
                  <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: ["#EF4444", "#22C55E", "#2563EB", "#F59E0B"][i] }}
                      initial={{ width: 0 }}
                      animate={{ width: ["85%", "99%", "72%", "98%"][i] }}
                      transition={{ delay: 1.2 + i * 0.1, duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
              <div className="col-span-2 bg-[#1E3A5F]/60 rounded-xl p-3 border border-white/5">
                <div className="text-xs text-white/40 mb-2">Threat Activity (7d)</div>
                <div className="flex items-end gap-1 h-12">
                  {[40, 65, 35, 80, 55, 90, 70].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-sm bg-[#2563EB]/60"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 1.0 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                    />
                  ))}
                </div>
              </div>
              <div className="col-span-2 bg-[#1E3A5F]/60 rounded-xl p-3 border border-white/5">
                <div className="text-xs text-white/40 mb-2">Live Threats</div>
                <div className="space-y-1.5">
                  {["SQL Injection • Critical", "DDoS Attack • High", "Brute Force • High"].map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className={`w-1.5 h-1.5 rounded-full ${["bg-red-500", "bg-orange-500", "bg-orange-400"][i]}`} />
                      <span className="text-white/60 truncate">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Glow effect underneath */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-[#2563EB]/20 blur-2xl rounded-full" />
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-5 text-center group hover:-translate-y-1 transition-transform"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110"
                style={{ background: `${stat.color}20`, border: `1px solid ${stat.color}30` }}
              >
                <stat.icon size={18} style={{ color: stat.color }} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.display}</div>
              <div className="text-xs text-white/50 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F7FA] to-transparent pointer-events-none" />
    </section>
  );
}

"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Zap, Eye, Lock, BarChart3, Globe, Bell, Cpu, Bot, FileCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Bot,
    title: "AI Threat Detection",
    description: "Machine learning models analyze network patterns in real-time, detecting zero-day exploits and anomalies before they breach your perimeter.",
    color: "#2563EB",
    badge: "Core",
  },
  {
    icon: Shield,
    title: "Intelligent Firewall",
    description: "Dynamic firewall rules that adapt automatically based on threat intelligence feeds and behavioral analytics.",
    color: "#22C55E",
    badge: "Protection",
  },
  {
    icon: Eye,
    title: "Real-Time Monitoring",
    description: "24/7 SOC-level visibility across all servers, networks, and endpoints with millisecond latency alerting.",
    color: "#F59E0B",
    badge: "Visibility",
  },
  {
    icon: Globe,
    title: "Geo-Intelligence",
    description: "Global threat intelligence with geographic blocking, country-level risk scoring, and IP reputation databases.",
    color: "#06B6D4",
    badge: "Intelligence",
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    description: "Smart notification system with severity-based escalation, PagerDuty integration, and customizable alert rules.",
    color: "#EF4444",
    badge: "Alerting",
  },
  {
    icon: Cpu,
    title: "Server Health",
    description: "Comprehensive infrastructure monitoring — CPU, RAM, disk, network — with predictive capacity planning.",
    color: "#8B5CF6",
    badge: "Infrastructure",
  },
  {
    icon: Lock,
    title: "Zero Trust Architecture",
    description: "Never trust, always verify. Micro-segmentation, MFA enforcement, and continuous identity validation.",
    color: "#EC4899",
    badge: "Access",
  },
  {
    icon: BarChart3,
    title: "Security Analytics",
    description: "Comprehensive security analytics and compliance reporting for GDPR, SOC2, ISO27001, and PCI-DSS.",
    color: "#14B8A6",
    badge: "Analytics",
  },
  {
    icon: FileCheck,
    title: "Compliance Reports",
    description: "Automated compliance documentation, audit trails, and one-click report generation for regulatory frameworks.",
    color: "#F97316",
    badge: "Compliance",
  },
];

function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#2563EB]/20 transition-all hover:-translate-y-1 shadow-card hover:shadow-elevated"
      style={{ cursor: "default" }}
    >
      {/* Hover glow effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse at top left, ${feature.color}08 0%, transparent 70%)` }}
      />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
            style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}20` }}
          >
            <feature.icon size={20} style={{ color: feature.color }} />
          </div>
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
            style={{ background: `${feature.color}12`, color: feature.color, border: `1px solid ${feature.color}20` }}
          >
            {feature.badge}
          </span>
        </div>
        <h3 className="text-base font-bold text-[#0A192F] mb-2">{feature.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="features" className="py-24 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 bg-[#2563EB]/8 text-[#2563EB] border border-[#2563EB]/15">
            <Zap size={12} />
            Enterprise Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A192F] mb-4">
            Everything you need to{" "}
            <span className="text-gradient-royal">secure your infrastructure</span>
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            CyberShield delivers SOC-grade protection with AI-powered intelligence, giving your team 
            complete control over your security posture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

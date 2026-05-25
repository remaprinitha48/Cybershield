"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Zap, Shield, Building2, ChevronRight } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Starter",
    icon: Zap,
    price: 49,
    period: "per month",
    description: "Perfect for small teams getting started with security.",
    color: "#22C55E",
    features: [
      "Up to 5 servers",
      "Basic threat detection",
      "Email alerts",
      "7-day log retention",
      "Standard firewall rules",
      "Community support",
    ],
    cta: "Start Free Trial",
    href: "/register",
    popular: false,
  },
  {
    name: "Professional",
    icon: Shield,
    price: 199,
    period: "per month",
    description: "Advanced security for growing organizations.",
    color: "#2563EB",
    features: [
      "Up to 50 servers",
      "AI threat detection",
      "Real-time alerts & PagerDuty",
      "90-day log retention",
      "Advanced firewall management",
      "Geo-blocking & IP intelligence",
      "Compliance reports (SOC2, GDPR)",
      "Priority support",
    ],
    cta: "Get Started",
    href: "/register",
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: null,
    period: "custom pricing",
    description: "Full-scale security for large enterprise environments.",
    color: "#F59E0B",
    features: [
      "Unlimited servers",
      "Advanced AI & ML threat prediction",
      "24/7 SOC support",
      "1-year log retention",
      "Custom firewall policies",
      "SIEM integration",
      "Full compliance suite",
      "Dedicated security engineer",
      "SLA guarantees",
    ],
    cta: "Contact Sales",
    href: "#contact",
    popular: false,
  },
];

export default function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 bg-[#0A192F]/5 text-[#0A192F] border border-[#0A192F]/10">
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A192F] mb-4">
            Plans that scale with <span className="text-gradient-royal">your security needs</span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Start free, scale as you grow. All plans include a 14-day free trial with no credit card required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              className={`relative rounded-2xl p-7 transition-all hover:-translate-y-1 ${
                plan.popular
                  ? "bg-[#0A192F] shadow-[0_20px_60px_rgba(10,25,47,0.3)] border border-[#2563EB]/30 scale-[1.03]"
                  : "bg-white border border-gray-150 shadow-card hover:shadow-elevated"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-[#2563EB] text-white shadow-royal">
                  Most Popular
                </div>
              )}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${plan.color}15`, border: `1px solid ${plan.color}25` }}
              >
                <plan.icon size={20} style={{ color: plan.color }} />
              </div>
              <h3 className={`text-xl font-bold mb-1 ${plan.popular ? "text-white" : "text-[#0A192F]"}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-5 ${plan.popular ? "text-white/50" : "text-gray-400"}`}>
                {plan.description}
              </p>
              <div className="flex items-baseline gap-1.5 mb-7">
                {plan.price ? (
                  <>
                    <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-[#0A192F]"}`}>
                      ${plan.price}
                    </span>
                    <span className={`text-sm ${plan.popular ? "text-white/50" : "text-gray-400"}`}>{plan.period}</span>
                  </>
                ) : (
                  <span className={`text-2xl font-bold ${plan.popular ? "text-white" : "text-[#0A192F]"}`}>
                    Custom
                  </span>
                )}
              </div>
              <ul className="space-y-2.5 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${plan.color}20` }}
                    >
                      <Check size={10} style={{ color: plan.color }} strokeWidth={3} />
                    </div>
                    <span className={plan.popular ? "text-white/70" : "text-gray-600"}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                id={`pricing-${plan.name.toLowerCase()}`}
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.popular
                    ? "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-royal"
                    : `border-2 hover:bg-gray-50`
                }`}
                style={
                  !plan.popular
                    ? { borderColor: plan.color, color: plan.color }
                    : {}
                }
              >
                {plan.cta}
                <ChevronRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

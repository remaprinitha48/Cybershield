import { Shield, MessageCircle, Briefcase, Code2, Mail } from "lucide-react";
import Link from "next/link";

const FOOTER_LINKS = {
  Product: ["Features", "Pricing", "Dashboard", "Changelog", "Roadmap"],
  Security: ["Threat Intel", "Firewall", "Server Monitor", "AI Assistant", "Reports"],
  Company: ["About Us", "Blog", "Careers", "Press Kit", "Partners"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR", "Security"],
};

export default function LandingFooter() {
  return (
    <footer className="bg-[#071428] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                Cyber<span className="text-[#2563EB]">Shield</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              Enterprise-grade AI cybersecurity platform protecting over 12,000 servers worldwide with real-time threat intelligence and automated incident response.
            </p>
            <div className="flex items-center gap-3">
              {[
          { icon: MessageCircle, href: "#", label: "Twitter" },
                { icon: Briefcase, href: "#", label: "LinkedIn" },
                { icon: Code2, href: "#", label: "GitHub" },
                { icon: Mail, href: "#contact", label: "Email" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-[#2563EB]/20 hover:border-[#2563EB]/30 transition-all"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/40 text-sm hover:text-white/80 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © 2025 CyberShield Security Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              All systems operational
            </span>
            <span>·</span>
            <span>99.99% uptime SLA</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-white/30 text-sm hover:text-white/60 transition-colors">Admin Portal</Link>
            <Link href="/login" className="text-white/30 text-sm hover:text-white/60 transition-colors">User Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

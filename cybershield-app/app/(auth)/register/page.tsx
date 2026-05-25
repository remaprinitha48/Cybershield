"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Lock, Mail, User, ArrowRight, ArrowLeft, Building2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function PasswordStrength({ password }: { password: string }) {
  const checks = [password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password), password.length >= 12];
  const score = checks.filter(Boolean).length;
  const labels = ["", "Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  const colors = ["", "#EF4444", "#F59E0B", "#F59E0B", "#22C55E", "#22C55E"];
  if (!password) return null;
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300" style={{ background: i < score ? colors[score] : "#E2E8F0" }} />
        ))}
      </div>
      <p className="text-xs font-medium" style={{ color: colors[score] }}>{labels[score]}</p>
    </div>
  );
}

export default function RegisterPage() {
  const [role, setRole] = useState<"admin" | "user">("user");
  const [form, setForm] = useState({ name: "", email: "", company: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error("Passwords do not match"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    toast.success("Account created! Redirecting to OTP verification...");
    setTimeout(() => router.push("/otp-verify"), 800);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 gradient-hero flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(37,99,235,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.5) 1px,transparent 1px)`, backgroundSize: "50px 50px" }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-[#2563EB]/10 blur-[80px]" />
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center shadow-royal"><Shield size={18} className="text-white" /></div>
          <span className="font-bold text-xl text-white">Cyber<span className="text-[#60A5FA]">Shield</span></span>
        </div>
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-[#22C55E]/20 border border-[#22C55E]/30 flex items-center justify-center mb-6"><ShieldCheck size={32} className="text-[#4ADE80]" /></div>
          <h2 className="text-3xl font-bold text-white mb-3">Start protecting your infrastructure today</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-8">Join 5,000+ enterprises using CyberShield to monitor, protect, and manage their security operations.</p>
          <div className="space-y-3">
            {["No credit card required", "14-day free trial", "Cancel anytime", "SOC2 compliant platform"].map((f) => (
              <div key={f} className="flex items-center gap-2.5 text-sm">
                <div className="w-5 h-5 rounded-full bg-[#22C55E]/20 border border-[#22C55E]/30 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                </div>
                <span className="text-white/70">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="relative z-10 text-white/20 text-xs">© 2025 CyberShield Security Inc.</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#F5F7FA] overflow-y-auto">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          {/* Back button + Mobile logo row */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              id="register-back-btn"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#2563EB] transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:border-[#2563EB]/30 group-hover:bg-[#2563EB]/5 transition-all">
                <ArrowLeft size={15} className="text-gray-400 group-hover:text-[#2563EB] transition-colors" />
              </div>
              <span>Back to Home</span>
            </Link>
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center"><Shield size={16} className="text-white" /></div>
              <span className="font-bold text-[#0A192F]">Cyber<span className="text-[#2563EB]">Shield</span></span>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-elevated border border-gray-100 p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-[#0A192F] mb-1">Create your account</h1>
              <p className="text-gray-400 text-sm">Start your 14-day free trial, no card required</p>
            </div>

            {/* Role Selector */}
            <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
              {(["user", "admin"] as const).map((r) => (
                <button key={r} id={`register-role-${r}`} onClick={() => setRole(r)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === r ? "bg-[#0A192F] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                  {r === "admin" ? <Building2 size={14} /> : <User size={14} />}
                  {r === "admin" ? "Admin Account" : "User Account"}
                </button>
              ))}
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Full Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input id="reg-name" type="text" required placeholder="John Doe" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full pl-9 pr-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[#0A192F] placeholder-gray-300 text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Company</label>
                  <div className="relative">
                    <Building2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input id="reg-company" type="text" placeholder="Acme Corp" value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} className="w-full pl-9 pr-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[#0A192F] placeholder-gray-300 text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input id="reg-email" type="email" required placeholder="you@company.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="w-full pl-9 pr-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[#0A192F] placeholder-gray-300 text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input id="reg-password" type={showPass ? "text" : "password"} required placeholder="Create a strong password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} className="w-full pl-9 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[#0A192F] placeholder-gray-300 text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPass ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                </div>
                <PasswordStrength password={form.password} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input id="reg-confirm" type="password" required placeholder="Confirm your password" value={form.confirm} onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))} className="w-full pl-9 pr-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[#0A192F] placeholder-gray-300 text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all" />
                </div>
                {form.confirm && form.password !== form.confirm && <p className="text-xs text-red-500 mt-1">Passwords do not match</p>}
              </div>
              <button type="submit" id="register-submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-[#1D4ED8] transition-all shadow-royal disabled:opacity-70">
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (<>Create Account <ArrowRight size={16} /></>)}
              </button>
            </form>
            <p className="text-center text-sm text-gray-400 mt-5">
              Already have an account? <Link href="/login" className="text-[#2563EB] font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4 px-4">By creating an account, you agree to our <a href="#" className="text-[#2563EB]">Terms of Service</a> and <a href="#" className="text-[#2563EB]">Privacy Policy</a>.</p>
        </motion.div>
      </div>
    </div>
  );
}

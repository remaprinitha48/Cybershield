"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Lock, Mail, ArrowRight, ArrowLeft, User, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
    password.length >= 12,
  ];
  const score = checks.filter(Boolean).length;
  const labels = ["", "Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  const colors = ["", "#EF4444", "#F59E0B", "#F59E0B", "#22C55E", "#22C55E"];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{ background: i < score ? colors[score] : "#E2E8F0" }}
          />
        ))}
      </div>
      <p className="text-xs font-medium" style={{ color: colors[score] }}>{labels[score]}</p>
    </div>
  );
}

export default function LoginPage() {
  const [role, setRole] = useState<"admin" | "user">("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success(`Welcome back! Redirecting to ${role} dashboard...`);
    setTimeout(() => {
      router.push(role === "admin" ? "/dashboard/admin" : "/dashboard/user");
    }, 800);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Dark Navy */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero flex-col justify-between p-12 relative overflow-hidden">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(37,99,235,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.5) 1px,transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-[#2563EB]/10 blur-[80px]" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center shadow-royal">
            <Shield size={18} className="text-white" />
          </div>
          <span className="font-bold text-xl text-white">Cyber<span className="text-[#60A5FA]">Shield</span></span>
        </div>

        {/* Center content */}
        <div className="relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-20 h-20 rounded-3xl bg-[#2563EB]/20 border border-[#2563EB]/30 flex items-center justify-center mb-8 backdrop-blur-sm">
              <ShieldCheck size={40} className="text-[#60A5FA]" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
              Secure Access to<br />Your SOC Platform
            </h2>
            <p className="text-white/50 leading-relaxed">
              Real-time threat monitoring, AI-powered detection, and complete infrastructure control — all from one platform.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Threats Blocked", value: "2.4M+" },
              { label: "Uptime SLA", value: "99.99%" },
              { label: "Active Servers", value: "12K+" },
              { label: "Security Score", value: "98/100" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl p-4">
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-white/20 text-xs">
          © 2025 CyberShield Security Inc. All rights reserved.
        </p>
      </div>

      {/* Right Panel — Auth Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#F5F7FA]">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Back button + Mobile logo row */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              id="login-back-btn"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#2563EB] transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:border-[#2563EB]/30 group-hover:bg-[#2563EB]/5 transition-all">
                <ArrowLeft size={15} className="text-gray-400 group-hover:text-[#2563EB] transition-colors" />
              </div>
              <span>Back to Home</span>
            </Link>
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center">
                <Shield size={16} className="text-white" />
              </div>
              <span className="font-bold text-[#0A192F]">Cyber<span className="text-[#2563EB]">Shield</span></span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-elevated border border-gray-100 p-8">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-[#0A192F] mb-1">Welcome back</h1>
              <p className="text-gray-400 text-sm">Sign in to your security dashboard</p>
            </div>

            {/* Role Selector */}
            <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
              {(["user", "admin"] as const).map((r) => (
                <button
                  key={r}
                  id={`role-${r}`}
                  onClick={() => setRole(r)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    role === r
                      ? "bg-[#0A192F] text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {r === "admin" ? <Shield size={14} /> : <User size={14} />}
                  {r === "admin" ? "Admin" : "User"}
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="login-email"
                    required
                    placeholder={role === "admin" ? "admin@cybershield.io" : "user@cybershield.io"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[#0A192F] placeholder-gray-300 text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    id="login-password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[#0A192F] placeholder-gray-300 text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <PasswordStrength password={password} />
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-xs text-[#2563EB] hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="login-submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-[#1D4ED8] transition-all shadow-royal disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Sign In <ArrowRight size={16} /></>
                )}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-5 p-3.5 bg-[#2563EB]/5 border border-[#2563EB]/15 rounded-xl">
              <p className="text-xs font-semibold text-[#2563EB] mb-1.5">Demo Credentials</p>
              <p className="text-xs text-gray-500">Admin: admin@cybershield.io / any password</p>
              <p className="text-xs text-gray-500">User: user@cybershield.io / any password</p>
            </div>

            <p className="text-center text-sm text-gray-400 mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#2563EB] font-semibold hover:underline">Sign up free</Link>
            </p>
          </div>

          {/* MFA hint */}
          <div className="flex items-center justify-center gap-2 mt-4 text-gray-400 text-xs">
            <Lock size={12} />
            Secured with 256-bit encryption & MFA
          </div>
        </motion.div>
      </div>
    </div>
  );
}

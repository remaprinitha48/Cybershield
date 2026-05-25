"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Mail, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    toast.success("Reset link sent! Check your email.");
    setTimeout(() => router.push("/otp-verify"), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        {/* Back button + Logo row */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/login"
            id="forgot-back-btn"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#2563EB] transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:border-[#2563EB]/30 group-hover:bg-[#2563EB]/5 transition-all">
              <ArrowLeft size={15} className="text-gray-400 group-hover:text-[#2563EB] transition-colors" />
            </div>
            <span>Back to Login</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <span className="font-bold text-[#0A192F] text-sm">Cyber<span className="text-[#2563EB]">Shield</span></span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-elevated border border-gray-100 p-8">
          {!sent ? (
            <>
              <div className="text-center mb-7">
                <div className="w-16 h-16 rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center mx-auto mb-4">
                  <Mail size={28} className="text-[#2563EB]" />
                </div>
                <h1 className="text-2xl font-bold text-[#0A192F] mb-2">Forgot Password?</h1>
                <p className="text-gray-400 text-sm">Enter your email and we&apos;ll send a reset link and OTP code.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input id="forgot-email" type="email" required placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[#0A192F] placeholder-gray-300 text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all" />
                  </div>
                </div>
                <button type="submit" id="forgot-submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-[#1D4ED8] transition-all shadow-royal disabled:opacity-70">
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (<>Send Reset Link <ArrowRight size={16} /></>)}
                </button>
              </form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">✓</div>
              </div>
              <h2 className="text-xl font-bold text-[#0A192F] mb-2">Check your email!</h2>
              <p className="text-gray-400 text-sm">We&apos;ve sent a reset link to <strong className="text-[#0A192F]">{email}</strong>. Redirecting to OTP verification...</p>
            </motion.div>
          )}

          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#0A192F] transition-colors">
              <ArrowLeft size={14} /> Back to Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

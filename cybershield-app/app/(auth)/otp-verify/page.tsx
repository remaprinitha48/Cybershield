"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, ArrowRight, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function OtpVerifyPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(t);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[i] = val.slice(-1);
    setOtp(newOtp);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      inputs.current[5]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) { toast.error("Please enter the 6-digit code"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success("Verified! Welcome to CyberShield.");
    router.push("/dashboard/admin");
  };

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    toast.success("New OTP sent to your email");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        {/* Back button + Logo row */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/login"
            id="otp-back-btn"
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
          <div className="text-center mb-8">
            {/* Animated ring */}
            <div className="relative w-20 h-20 mx-auto mb-5">
              <div className="absolute inset-0 rounded-full border-2 border-[#2563EB]/20 animate-ping" style={{ animationDuration: "2s" }} />
              <div className="w-20 h-20 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 flex items-center justify-center">
                <span className="text-3xl">📱</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mb-2">Verify Your Identity</h1>
            <p className="text-gray-400 text-sm">Enter the 6-digit code sent to your email and phone</p>
          </div>

          <form onSubmit={handleVerify}>
            {/* OTP Inputs */}
            <div className="flex gap-3 justify-center mb-6" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <motion.input
                  key={i}
                  ref={(el) => { inputs.current[i] = el; }}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all focus:outline-none ${
                    digit
                      ? "border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB]"
                      : "border-gray-200 bg-gray-50 text-[#0A192F] focus:border-[#2563EB]"
                  }`}
                />
              ))}
            </div>

            {/* Timer */}
            <div className="text-center mb-6">
              {!canResend ? (
                <p className="text-sm text-gray-400">
                  Resend code in <span className="font-semibold text-[#0A192F]">{countdown}s</span>
                </p>
              ) : (
                <button type="button" onClick={handleResend} id="otp-resend" className="flex items-center gap-1.5 text-sm text-[#2563EB] font-semibold mx-auto hover:underline">
                  <RefreshCw size={14} /> Resend OTP
                </button>
              )}
            </div>

            <button type="submit" id="otp-verify" disabled={loading || otp.join("").length < 6} className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-[#1D4ED8] transition-all shadow-royal disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (<>Verify & Continue <ArrowRight size={16} /></>)}
            </button>
          </form>

          <div className="mt-5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-center">
            <p className="text-xs text-amber-700 font-medium">Demo: Enter any 6 digits to proceed</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Download, FileText, Calendar, TrendingUp, CheckCircle2 } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { MONTHLY_REPORT_DATA, THREAT_TYPES_DATA, COMPLIANCE_DATA } from "@/lib/mock-data";
import { toast } from "sonner";

const REPORTS = [
  { id: "r1", title: "Executive Security Summary", period: "May 2025", type: "PDF", size: "2.4 MB", date: "May 23, 2025", icon: "📊" },
  { id: "r2", title: "Threat Intelligence Report", period: "May 2025", type: "PDF", size: "5.1 MB", date: "May 23, 2025", icon: "🔍" },
  { id: "r3", title: "Firewall Activity Log", period: "May 2025", type: "CSV", size: "1.2 MB", date: "May 22, 2025", icon: "🔥" },
  { id: "r4", title: "Vulnerability Assessment", period: "Q2 2025", type: "PDF", size: "8.7 MB", date: "May 20, 2025", icon: "🛡️" },
  { id: "r5", title: "Compliance Audit Report", period: "Q2 2025", type: "PDF", size: "3.9 MB", date: "May 15, 2025", icon: "✅" },
  { id: "r6", title: "Incident Response Summary", period: "May 2025", type: "PDF", size: "1.8 MB", date: "May 10, 2025", icon: "⚡" },
];

export default function ReportsPage() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("monthly");

  const handleDownload = (name: string) => {
    toast.success(`Downloading "${name}"...`);
  };

  return (
    <div className="space-y-6 max-w-[1600px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192F]">Reports & Analytics</h1>
          <p className="text-gray-400 text-sm mt-0.5">Security analytics, compliance tracking, and downloadable reports</p>
        </div>
        <div className="flex items-center p-1 bg-gray-100 rounded-xl">
          {(["weekly", "monthly"] as const).map((p) => (
            <button
              key={p}
              id={`reports-period-${p}`}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${period === p ? "bg-[#0A192F] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Threats", value: period === "monthly" ? "18,830" : "4,208", change: "-12%", color: "#EF4444", icon: "🎯" },
          { label: "Block Rate", value: "99.7%", change: "+0.2%", color: "#22C55E", icon: "🛡️" },
          { label: "Incidents", value: period === "monthly" ? "110" : "24", change: "-28%", color: "#2563EB", icon: "⚡" },
          { label: "Avg Security Score", value: "93/100", change: "+4", color: "#F59E0B", icon: "📈" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">{s.icon}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.change.startsWith("-") ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"}`}>{s.change}</span>
            </div>
            <p className="text-2xl font-bold text-[#0A192F]">{s.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
          <h3 className="font-bold text-[#0A192F] text-sm mb-4">Threat History ({period === "monthly" ? "Last 6 Months" : "Last 7 Weeks"})</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MONTHLY_REPORT_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0A192F", border: "1px solid rgba(37,99,235,0.3)", borderRadius: "10px", color: "#fff", fontSize: "12px" }} />
              <Bar dataKey="threats" fill="#EF4444" radius={[4, 4, 0, 0]} opacity={0.8} name="Threats" />
              <Bar dataKey="blocked" fill="#22C55E" radius={[4, 4, 0, 0]} opacity={0.7} name="Blocked" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
          <h3 className="font-bold text-[#0A192F] text-sm mb-4">Threat Breakdown</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={THREAT_TYPES_DATA} cx="50%" cy="50%" innerRadius={30} outerRadius={55} paddingAngle={3} dataKey="value">
                {THREAT_TYPES_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#0A192F", border: "1px solid rgba(37,99,235,0.3)", borderRadius: "10px", color: "#fff", fontSize: "11px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {THREAT_TYPES_DATA.map((t) => (
              <div key={t.name} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: t.color }} />
                <span className="flex-1 text-gray-500">{t.name}</span>
                <span className="font-semibold text-[#0A192F]">{t.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Security Score Trend */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
        <h3 className="font-bold text-[#0A192F] text-sm mb-4">Security Score Trend</h3>
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={MONTHLY_REPORT_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis domain={[85, 100]} tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#0A192F", border: "1px solid rgba(37,99,235,0.3)", borderRadius: "10px", color: "#fff", fontSize: "12px" }} />
            <Line type="monotone" dataKey="score" stroke="#22C55E" strokeWidth={2.5} dot={{ fill: "#22C55E", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Compliance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
        <div className="flex items-center gap-2 mb-5">
          <CheckCircle2 size={16} className="text-[#22C55E]" />
          <h3 className="font-bold text-[#0A192F] text-sm">Compliance Status</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {COMPLIANCE_DATA.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="text-center">
              <div className="relative w-20 h-20 mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#F0F4F8" strokeWidth="6" />
                  <motion.circle cx="40" cy="40" r="32" fill="none" stroke={c.color} strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 32}
                    initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 32 - (c.score / 100) * 2 * Math.PI * 32 }}
                    transition={{ duration: 1.2, delay: 0.6 + i * 0.1 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold" style={{ color: c.color }}>{c.score}%</span>
                </div>
              </div>
              <p className="text-sm font-bold text-[#0A192F] mt-2">{c.name}</p>
              <p className="text-xs text-gray-400">{c.score >= 90 ? "Compliant" : c.score >= 80 ? "Mostly Compliant" : "Needs Work"}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Downloadable Reports */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-gray-400" />
            <h3 className="font-bold text-[#0A192F] text-sm">Available Reports</h3>
          </div>
          <button id="reports-generate-new" className="flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:underline">
            <BarChart3 size={13} /> Generate New
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {REPORTS.map((r) => (
            <div key={r.id} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-[#2563EB]/20 hover:bg-[#2563EB]/2 transition-all group">
              <span className="text-2xl flex-shrink-0">{r.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#0A192F] truncate">{r.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{r.period} · {r.type} · {r.size}</p>
                <p className="text-[10px] text-gray-300 mt-0.5">{r.date}</p>
              </div>
              <button
                id={`report-download-${r.id}`}
                onClick={() => handleDownload(r.title)}
                className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] hover:bg-[#2563EB]/20 flex-shrink-0"
              >
                <Download size={14} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

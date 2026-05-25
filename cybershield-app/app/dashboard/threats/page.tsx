"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Shield, Eye, Zap, RefreshCw, Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { MOCK_THREATS, ATTACK_SOURCES } from "@/lib/mock-data";

const severityData = [
  { name: "Critical", count: 4, color: "#EF4444" },
  { name: "High", count: 8, color: "#F59E0B" },
  { name: "Medium", count: 12, color: "#06B6D4" },
  { name: "Low", count: 7, color: "#22C55E" },
];

const anomalyData = [
  { subject: "Network", A: 87, fullMark: 100 },
  { subject: "Auth", A: 42, fullMark: 100 },
  { subject: "API", A: 63, fullMark: 100 },
  { subject: "DNS", A: 29, fullMark: 100 },
  { subject: "Payload", A: 74, fullMark: 100 },
  { subject: "Geo", A: 91, fullMark: 100 },
];

export default function ThreatMonitoringPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = MOCK_THREATS.filter((t) => {
    const matchSeverity = filter === "all" || t.severity === filter;
    const matchSearch = !search || t.type.toLowerCase().includes(search.toLowerCase()) || t.source.toLowerCase().includes(search.toLowerCase()) || t.ip.includes(search);
    return matchSeverity && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-[1600px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192F]">Threat Monitoring</h1>
          <p className="text-gray-400 text-sm mt-0.5">Real-time attack detection and threat intelligence</p>
        </div>
        <button id="threat-refresh" className="flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-xl hover:bg-[#1D4ED8] transition-all">
          <RefreshCw size={14} /> Refresh Feed
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {severityData.map((s, i) => (
          <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card hover-lift cursor-pointer"
            onClick={() => setFilter(s.name.toLowerCase())}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-bold text-[#0A192F]">{s.count}</span>
              <div className="w-3 h-3 rounded-full" style={{ background: s.color, boxShadow: `0 0 8px ${s.color}60` }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: s.color }}>{s.name}</p>
            <p className="text-xs text-gray-400">active threats</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
          <h3 className="font-bold text-[#0A192F] text-sm mb-4">Attack Sources by Volume</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ATTACK_SOURCES} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="country" type="category" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={{ background: "#0A192F", border: "1px solid rgba(37,99,235,0.3)", borderRadius: "10px", color: "#fff", fontSize: "11px" }} />
              <Bar dataKey="attacks" fill="#EF4444" radius={[0, 4, 4, 0]} opacity={0.85} />
              <Bar dataKey="blocked" fill="#22C55E" radius={[0, 4, 4, 0]} opacity={0.75} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
          <h3 className="font-bold text-[#0A192F] text-sm mb-4">AI Anomaly Detection</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={anomalyData}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#64748B" }} />
              <PolarRadiusAxis tick={{ fontSize: 9, fill: "#94A3B8" }} domain={[0, 100]} />
              <Radar name="Anomaly Score" dataKey="A" stroke="#2563EB" fill="#2563EB" fillOpacity={0.15} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="text-center mt-1">
            <p className="text-xs text-gray-400">Higher = more anomalous activity</p>
          </div>
        </motion.div>
      </div>

      {/* Live Feed */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
            <h3 className="font-bold text-[#0A192F] text-sm">Live Attack Feed</h3>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <div className="relative">
              <input
                id="threat-search"
                type="text"
                placeholder="Search threats..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-[#2563EB] w-48 transition-all"
              />
              <Eye size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex items-center gap-1">
              {["all", "critical", "high", "medium", "low"].map((f) => (
                <button
                  key={f}
                  id={`threat-filter-${f}`}
                  onClick={() => setFilter(f)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${filter === f ? "bg-[#0A192F] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["Threat Type", "Source Country", "IP Address", "Port", "Severity", "Status", "Time"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-400 pb-3 pr-4 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((t, i) => (
                <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-4 font-medium text-[#0A192F] whitespace-nowrap">{t.type}</td>
                  <td className="py-3 pr-4 text-gray-500">{t.source}</td>
                  <td className="py-3 pr-4 font-mono text-xs text-gray-600">{t.ip}</td>
                  <td className="py-3 pr-4 text-gray-500">{t.port}</td>
                  <td className="py-3 pr-4"><span className={`badge-${t.severity}`}>{t.severity}</span></td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      t.status === "blocked" ? "bg-green-50 text-green-600" :
                      t.status === "quarantined" ? "bg-purple-50 text-purple-600" :
                      t.status === "detected" ? "bg-blue-50 text-blue-600" : "bg-yellow-50 text-yellow-600"
                    }`}>{t.status}</span>
                  </td>
                  <td className="py-3 text-gray-400 text-xs">{t.timestamp}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

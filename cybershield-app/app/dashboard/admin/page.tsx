"use client";
import { motion } from "framer-motion";
import { AlertTriangle, Server, Shield, TrendingUp, TrendingDown, Activity, Clock, Globe } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { THREAT_TIMELINE_DATA, TRAFFIC_DATA, THREAT_TYPES_DATA, MOCK_THREATS, ACTIVITY_LOG, ATTACK_SOURCES } from "@/lib/mock-data";

// Stat Card
function StatCard({ title, value, change, icon: Icon, color, subtitle }: {
  title: string; value: string; change: string; icon: React.ElementType; color: string; subtitle: string;
}) {
  const isPositive = change.startsWith("+");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card hover-lift"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}20` }}>
          <Icon size={20} style={{ color }} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
          {isPositive ? <TrendingDown size={10} /> : <TrendingUp size={10} />}
          {change}
        </div>
      </div>
      <p className="text-2xl font-bold text-[#0A192F] mb-0.5">{value}</p>
      <p className="text-sm font-medium text-gray-700 mb-0.5">{title}</p>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </motion.div>
  );
}

// Security Score Ring
function SecurityScoreWidget() {
  const score = 94;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-[#0A192F] text-sm">Security Score</h3>
        <span className="badge-low">Excellent</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#F0F4F8" strokeWidth="10" />
            <motion.circle
              cx="60" cy="60" r="54" fill="none" stroke="#22C55E" strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-[#0A192F]">{score}</span>
            <span className="text-xs text-gray-400">/100</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4 w-full">
          {[
            { label: "Firewall", v: "99%" },
            { label: "Patching", v: "87%" },
            { label: "MFA", v: "94%" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-sm font-bold text-[#0A192F]">{s.v}</p>
              <p className="text-[10px] text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Live Threat Feed
function LiveThreatFeed() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
          <h3 className="font-bold text-[#0A192F] text-sm">Live Threat Feed</h3>
        </div>
        <span className="text-xs text-gray-400">Last 2h</span>
      </div>
      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
        {MOCK_THREATS.slice(0, 8).map((t) => (
          <div key={t.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: t.severity === "critical" ? "#EF4444" : t.severity === "high" ? "#F59E0B" : t.severity === "medium" ? "#06B6D4" : "#22C55E" }} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#0A192F] truncate">{t.type}</p>
              <p className="text-[10px] text-gray-400 truncate">{t.ip} · {t.source}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`badge-${t.severity}`}>{t.severity}</span>
              <span className="text-[10px] text-gray-300">{t.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Attack Sources Table
function AttackSourcesPanel() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-[#2563EB]" />
          <h3 className="font-bold text-[#0A192F] text-sm">Top Attack Sources</h3>
        </div>
      </div>
      <div className="space-y-2">
        {ATTACK_SOURCES.slice(0, 6).map((s, i) => (
          <div key={s.country} className="flex items-center gap-3">
            <span className="text-base w-6">{s.flag}</span>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-[#0A192F]">{s.country}</span>
                <span className="text-xs text-gray-400">{s.attacks.toLocaleString()}</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: i < 2 ? "#EF4444" : i < 4 ? "#F59E0B" : "#22C55E" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(s.attacks / ATTACK_SOURCES[0].attacks) * 100}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              </div>
            </div>
            <span className={`badge-${s.severity} text-[10px] shrink-0`}>{s.severity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// AI Insights Panel
function AiInsightsPanel() {
  return (
    <div className="bg-[#0A192F] rounded-2xl p-5 border border-[#1E3A5F] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563EB]/10 rounded-full -translate-y-8 translate-x-8 blur-2xl" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#2563EB]/20 border border-[#2563EB]/30 flex items-center justify-center">
            <Activity size={16} className="text-[#60A5FA]" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">AI Security Insights</h3>
            <p className="text-[10px] text-white/35">Updated 2 minutes ago</p>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
        </div>
        <div className="space-y-3">
          {[
            { title: "Geo-block China IP range", desc: "Reduce DDoS surface area by 23%", color: "#F59E0B", action: "Apply Rule" },
            { title: "Patch SRV-06 immediately", desc: "Critical CVE-2024-1234 detected", color: "#EF4444", action: "View Patch" },
            { title: "Enable rate limiting on port 443", desc: "Unusual traffic spike detected", color: "#2563EB", action: "Configure" },
          ].map((rec) => (
            <div key={rec.title} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/8 transition-colors">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: rec.color }} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white">{rec.title}</p>
                <p className="text-[10px] text-white/40 mt-0.5">{rec.desc}</p>
              </div>
              <button className="text-[10px] font-semibold px-2 py-1 rounded-lg text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-all whitespace-nowrap">
                {rec.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Activity Log
function ActivityLogPanel() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-400" />
          <h3 className="font-bold text-[#0A192F] text-sm">Recent Activity</h3>
        </div>
        <button className="text-xs text-[#2563EB] hover:underline">View all</button>
      </div>
      <div className="space-y-3">
        {ACTIVITY_LOG.map((log) => (
          <div key={log.id} className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
              log.type === "threat" ? "bg-red-50" : log.type === "warning" ? "bg-yellow-50" : log.type === "auth" ? "bg-blue-50" : "bg-gray-50"
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                log.type === "threat" ? "bg-[#EF4444]" : log.type === "warning" ? "bg-[#F59E0B]" : log.type === "auth" ? "bg-[#2563EB]" : "bg-gray-400"
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#0A192F] truncate">{log.action}</p>
              <p className="text-[10px] text-gray-400">{log.user}</p>
            </div>
            <span className="text-[10px] text-gray-300 flex-shrink-0">{log.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 max-w-[1600px]">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192F]">Security Operations Center</h1>
          <p className="text-gray-400 text-sm mt-0.5">Real-time threat intelligence dashboard · Last updated just now</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg text-xs font-semibold text-green-700">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            All Systems Operational
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Active Threats", value: "12", change: "-8% today", icon: AlertTriangle, color: "#EF4444", subtitle: "3 critical · 5 high · 4 medium" },
          { title: "Servers Online", value: "7/8", change: "+99.9% uptime", icon: Server, color: "#22C55E", subtitle: "1 server degraded" },
          { title: "Blocked (24h)", value: "2,641", change: "+12% vs yesterday", icon: Shield, color: "#2563EB", subtitle: "99.8% block rate" },
          { title: "Security Score", value: "94/100", change: "+2 this week", icon: Activity, color: "#F59E0B", subtitle: "Excellent posture" },
        ].map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Threat Timeline - spans 2 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-[#0A192F] text-sm">Threat Activity — Last 7 Days</h3>
              <p className="text-xs text-gray-400">Total threats detected vs blocked</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-[#EF4444] rounded" />Threats</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-[#22C55E] rounded" />Blocked</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={THREAT_TIMELINE_DATA}>
              <defs>
                <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0A192F", border: "1px solid rgba(37,99,235,0.3)", borderRadius: "12px", color: "#fff", fontSize: "12px" }} />
              <Area type="monotone" dataKey="threats" stroke="#EF4444" strokeWidth={2} fill="url(#colorThreats)" />
              <Area type="monotone" dataKey="blocked" stroke="#22C55E" strokeWidth={2} fill="url(#colorBlocked)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Security Score */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <SecurityScoreWidget />
        </motion.div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Traffic Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#0A192F] text-sm">Network Traffic (Today)</h3>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={TRAFFIC_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} interval={2} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0A192F", border: "1px solid rgba(37,99,235,0.3)", borderRadius: "10px", color: "#fff", fontSize: "11px" }} />
              <Bar dataKey="inbound" fill="#2563EB" radius={[3, 3, 0, 0]} opacity={0.8} />
              <Bar dataKey="outbound" fill="#06B6D4" radius={[3, 3, 0, 0]} opacity={0.6} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Threat Types Pie */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
          <h3 className="font-bold text-[#0A192F] text-sm mb-4">Threat Types Distribution</h3>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={THREAT_TYPES_DATA} cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={3} dataKey="value">
                {THREAT_TYPES_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#0A192F", border: "1px solid rgba(37,99,235,0.3)", borderRadius: "10px", color: "#fff", fontSize: "11px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {THREAT_TYPES_DATA.map((t) => (
              <div key={t.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: t.color }} />
                <span className="text-gray-500 truncate">{t.name}</span>
                <span className="text-gray-700 font-semibold ml-auto">{t.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          <AiInsightsPanel />
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="lg:col-span-1">
          <LiveThreatFeed />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
          <AttackSourcesPanel />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <ActivityLogPanel />
        </motion.div>
      </div>
    </div>
  );
}

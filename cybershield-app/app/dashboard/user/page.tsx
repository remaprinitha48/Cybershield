"use client";
import { motion } from "framer-motion";
import { Server, Shield, Bell, Download, Activity, Clock, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { MOCK_SERVERS, MOCK_THREATS, ACTIVITY_LOG } from "@/lib/mock-data";

const userServerData = [
  { time: "Mon", score: 88 }, { time: "Tue", score: 91 }, { time: "Wed", score: 87 },
  { time: "Thu", score: 94 }, { time: "Fri", score: 92 }, { time: "Sat", score: 96 }, { time: "Sun", score: 94 },
];

export default function UserDashboardPage() {
  const myServers = MOCK_SERVERS.slice(0, 4);
  const myAlerts = MOCK_THREATS.filter((t) => t.severity === "critical" || t.severity === "high").slice(0, 5);

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192F]">Good morning, Sarah 👋</h1>
          <p className="text-gray-400 text-sm mt-0.5">Your security overview for today</p>
        </div>
        <button id="user-download-report" className="flex items-center gap-2 px-4 py-2.5 bg-[#0A192F] text-white text-sm font-semibold rounded-xl hover:bg-[#112240] transition-all shadow-sm">
          <Download size={15} /> Download Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "My Servers", value: "4", sub: "All healthy", color: "#22C55E", icon: Server },
          { label: "Active Alerts", value: "5", sub: "2 need action", color: "#EF4444", icon: Bell },
          { label: "Firewall Status", value: "Active", sub: "18 rules active", color: "#2563EB", icon: Shield },
          { label: "Security Score", value: "94/100", sub: "+2 this week", color: "#F59E0B", icon: Activity },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card hover-lift">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
                <s.icon size={18} style={{ color: s.color }} />
              </div>
              <TrendingUp size={14} className="text-green-500" />
            </div>
            <p className="text-2xl font-bold text-[#0A192F] mb-0.5">{s.value}</p>
            <p className="text-sm font-medium text-gray-600">{s.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Security trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#0A192F] text-sm">Your Security Score Trend</h3>
            <span className="text-xs text-gray-400">Last 7 days</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={userServerData}>
              <defs>
                <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0A192F", border: "1px solid rgba(37,99,235,0.3)", borderRadius: "12px", color: "#fff", fontSize: "12px" }} />
              <Area type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2} fill="url(#userGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* My Alerts */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
          <h3 className="font-bold text-[#0A192F] text-sm mb-4">My Alerts</h3>
          <div className="space-y-2.5">
            {myAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: alert.severity === "critical" ? "#EF4444" : "#F59E0B" }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#0A192F] truncate">{alert.type}</p>
                  <p className="text-[10px] text-gray-400">{alert.timestamp}</p>
                </div>
                <span className={`badge-${alert.severity} shrink-0`}>{alert.severity}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* My Servers */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#0A192F] text-sm">My Servers</h3>
          <button className="text-xs text-[#2563EB] hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {myServers.map((srv) => (
            <div key={srv.id} className="p-4 rounded-xl border border-gray-100 hover:border-[#2563EB]/20 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#0A192F]/5 flex items-center justify-center">
                  <Server size={14} className="text-[#0A192F]" />
                </div>
                <div className={`status-dot status-dot-${srv.status === "online" ? "online" : srv.status === "warning" ? "warning" : "danger"}`} />
              </div>
              <p className="text-sm font-bold text-[#0A192F] truncate">{srv.name.split("-").slice(0, 2).join("-")}</p>
              <p className="text-xs text-gray-400 mt-0.5 truncate">{srv.location}</p>
              <div className="mt-3 grid grid-cols-3 gap-1 text-center">
                {[{ label: "CPU", value: srv.cpu }, { label: "RAM", value: srv.ram }, { label: "Disk", value: srv.disk }].map((m) => (
                  <div key={m.label}>
                    <p className={`text-sm font-bold ${m.value > 80 ? "text-[#EF4444]" : m.value > 60 ? "text-[#F59E0B]" : "text-[#22C55E]"}`}>{m.value}%</p>
                    <p className="text-[10px] text-gray-400">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Activity + Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={15} className="text-gray-400" />
            <h3 className="font-bold text-[#0A192F] text-sm">Activity Timeline</h3>
          </div>
          <div className="space-y-3">
            {ACTIVITY_LOG.slice(0, 6).map((log) => (
              <div key={log.id} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#0A192F]">{log.action}</p>
                  <p className="text-[10px] text-gray-400">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="bg-[#0A192F] rounded-2xl p-5 border border-[#1E3A5F]">
          <h3 className="font-bold text-white text-sm mb-4">Security Recommendations</h3>
          <div className="space-y-3">
            {[
              { text: "Enable MFA on all accounts", priority: "High", done: false },
              { text: "Review firewall rules quarterly", priority: "Medium", done: false },
              { text: "Update SSL certificate in 30 days", priority: "Low", done: false },
              { text: "Run vulnerability scan this week", priority: "High", done: true },
            ].map((rec, i) => (
              <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${rec.done ? "opacity-50" : "bg-white/5 border border-white/5"}`}>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${rec.done ? "border-[#22C55E] bg-[#22C55E]" : "border-white/20"}`}>
                  {rec.done && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <p className={`flex-1 text-xs ${rec.done ? "line-through text-white/30" : "text-white/80"}`}>{rec.text}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rec.priority === "High" ? "bg-red-500/20 text-red-400" : rec.priority === "Medium" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"}`}>{rec.priority}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

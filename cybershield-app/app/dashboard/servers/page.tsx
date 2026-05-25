"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Server, Cpu, Database, HardDrive, Network, Activity, ChevronRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { MOCK_SERVERS, MOCK_PROCESSES, TRAFFIC_DATA } from "@/lib/mock-data";

function MetricGauge({ label, value, color, icon: Icon }: { label: string; value: number; color: string; icon: React.ElementType }) {
  const isHigh = value > 80;
  const isMed = value > 60;
  const displayColor = isHigh ? "#EF4444" : isMed ? "#F59E0B" : color;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="40" fill="none" stroke="#F0F4F8" strokeWidth="8" />
          <motion.circle cx="48" cy="48" r="40" fill="none" stroke={displayColor} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold" style={{ color: displayColor }}>{value}%</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        <Icon size={13} style={{ color: displayColor }} />
        <span className="text-xs font-semibold text-gray-600">{label}</span>
      </div>
    </div>
  );
}

export default function ServerMonitoringPage() {
  const [selected, setSelected] = useState(MOCK_SERVERS[0]);

  return (
    <div className="space-y-6 max-w-[1600px]">
      <div>
        <h1 className="text-2xl font-bold text-[#0A192F]">Server Monitoring</h1>
        <p className="text-gray-400 text-sm mt-0.5">{MOCK_SERVERS.filter((s) => s.status === "online").length} of {MOCK_SERVERS.length} servers online</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Online", value: MOCK_SERVERS.filter((s) => s.status === "online").length, color: "#22C55E" },
          { label: "Warning", value: MOCK_SERVERS.filter((s) => s.status === "warning").length, color: "#F59E0B" },
          { label: "Critical", value: MOCK_SERVERS.filter((s) => s.status === "critical").length, color: "#EF4444" },
          { label: "Avg CPU", value: `${Math.round(MOCK_SERVERS.reduce((a, s) => a + s.cpu, 0) / MOCK_SERVERS.length)}%`, color: "#2563EB" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">Servers {s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Server List */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
          <h3 className="font-bold text-[#0A192F] text-sm mb-4">Server Fleet</h3>
          <div className="space-y-2">
            {MOCK_SERVERS.map((srv) => (
              <button
                key={srv.id}
                id={`server-${srv.id}`}
                onClick={() => setSelected(srv)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${selected.id === srv.id ? "border-[#2563EB]/30 bg-[#2563EB]/5" : "border-transparent hover:bg-gray-50"}`}
              >
                <div className={`status-dot status-dot-${srv.status === "online" ? "online" : srv.status === "warning" ? "warning" : "danger"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0A192F] truncate">{srv.name}</p>
                  <p className="text-xs text-gray-400 truncate">{srv.location}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="text-right">
                    <p className={`text-xs font-bold ${srv.cpu > 80 ? "text-[#EF4444]" : srv.cpu > 60 ? "text-[#F59E0B]" : "text-[#22C55E]"}`}>{srv.cpu}%</p>
                    <p className="text-[10px] text-gray-400">CPU</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300" />
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Server Detail */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2 space-y-5">
          {/* Metrics */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-bold text-[#0A192F]">{selected.name}</h3>
                <p className="text-sm text-gray-400 mt-0.5">{selected.location} · {selected.ip}</p>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                selected.status === "online" ? "bg-green-50 text-green-600" :
                selected.status === "warning" ? "bg-yellow-50 text-yellow-600" : "bg-red-50 text-red-600"
              }`}>
                <div className={`status-dot status-dot-${selected.status === "online" ? "online" : selected.status === "warning" ? "warning" : "danger"}`} />
                {selected.status}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <MetricGauge label="CPU" value={selected.cpu} color="#2563EB" icon={Cpu} />
              <MetricGauge label="RAM" value={selected.ram} color="#8B5CF6" icon={Database} />
              <MetricGauge label="Disk" value={selected.disk} color="#06B6D4" icon={HardDrive} />
              <MetricGauge label="Uptime" value={parseFloat(selected.uptime)} color="#22C55E" icon={Activity} />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Operating System</p>
                <p className="text-sm font-semibold text-[#0A192F] mt-0.5">{selected.os}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Last Patched</p>
                <p className="text-sm font-semibold text-[#0A192F] mt-0.5">{selected.lastPatch}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">IP Address</p>
                <p className="text-sm font-mono font-semibold text-[#0A192F] mt-0.5">{selected.ip}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Uptime</p>
                <p className="text-sm font-semibold text-green-600 mt-0.5">{selected.uptime}</p>
              </div>
            </div>
          </div>

          {/* Network Traffic */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Network size={16} className="text-[#2563EB]" />
                <h3 className="font-bold text-[#0A192F] text-sm">Network Traffic (Today)</h3>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={TRAFFIC_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} interval={2} />
                <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0A192F", border: "1px solid rgba(37,99,235,0.3)", borderRadius: "10px", color: "#fff", fontSize: "11px" }} />
                <Line type="monotone" dataKey="inbound" stroke="#2563EB" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="outbound" stroke="#06B6D4" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Process List */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Server size={16} className="text-gray-400" />
            <h3 className="font-bold text-[#0A192F] text-sm">Active Processes — {selected.name}</h3>
          </div>
          <span className="text-xs text-gray-400">{MOCK_PROCESSES.length} running</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["PID", "Process Name", "CPU %", "Memory (MB)", "Status"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-400 pb-3 pr-6 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_PROCESSES.map((p) => (
                <tr key={p.pid} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-6 font-mono text-xs text-gray-500">{p.pid}</td>
                  <td className="py-3 pr-6 font-semibold text-[#0A192F]">{p.name}</td>
                  <td className="py-3 pr-6">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full w-16">
                        <div className="h-full rounded-full" style={{ width: `${p.cpu * 5}%`, background: p.cpu > 8 ? "#EF4444" : p.cpu > 4 ? "#F59E0B" : "#22C55E" }} />
                      </div>
                      <span className="text-xs text-gray-600">{p.cpu}%</span>
                    </div>
                  </td>
                  <td className="py-3 pr-6 text-gray-500 text-xs">{p.memory} MB</td>
                  <td className="py-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-600">{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

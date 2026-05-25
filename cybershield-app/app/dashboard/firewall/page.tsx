"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Plus, Trash2, Edit3, Shield, AlertTriangle, Lock, Globe, ToggleLeft, ToggleRight } from "lucide-react";
import { MOCK_FIREWALL_RULES } from "@/lib/mock-data";
import { toast } from "sonner";

type Rule = typeof MOCK_FIREWALL_RULES[0];

export default function FirewallManagementPage() {
  const [rules, setRules] = useState(MOCK_FIREWALL_RULES);
  const [showModal, setShowModal] = useState(false);
  const [editRule, setEditRule] = useState<Rule | null>(null);
  const [lockdownActive, setLockdownActive] = useState(false);
  const [showLockdownConfirm, setShowLockdownConfirm] = useState(false);
  const [newRule, setNewRule] = useState({ name: "", direction: "Inbound", protocol: "TCP", sourceIP: "", destPort: "", action: "ALLOW" });

  const toggleRule = (id: string) => {
    setRules((prev) => prev.map((r) => r.id === id ? { ...r, status: r.status === "active" ? "disabled" : "active" } : r));
    toast.success("Rule status updated");
  };

  const deleteRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
    toast.success("Firewall rule deleted");
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    const rule: Rule = {
      id: `fw-${Date.now()}`,
      ...newRule,
      status: "active",
      priority: rules.length + 1,
    };
    setRules((prev) => [rule, ...prev]);
    setShowModal(false);
    setNewRule({ name: "", direction: "Inbound", protocol: "TCP", sourceIP: "", destPort: "", action: "ALLOW" });
    toast.success("New firewall rule added successfully");
  };

  const activateRules = rules.filter((r) => r.status === "active").length;

  return (
    <div className="space-y-6 max-w-[1600px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192F]">Firewall Management</h1>
          <p className="text-gray-400 text-sm mt-0.5">{activateRules} active rules · {rules.length - activateRules} disabled</p>
        </div>
        <div className="flex items-center gap-3">
          <button id="fw-add-rule" onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-xl hover:bg-[#1D4ED8] transition-all shadow-royal">
            <Plus size={15} /> Add Rule
          </button>
          <button
            id="fw-emergency-lockdown"
            onClick={() => setShowLockdownConfirm(true)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
              lockdownActive
                ? "bg-[#EF4444] text-white shadow-danger animate-pulse"
                : "bg-red-50 text-[#EF4444] border-2 border-[#EF4444]/30 hover:bg-red-100"
            }`}
          >
            <Lock size={15} /> {lockdownActive ? "Lockdown ACTIVE" : "Emergency Lockdown"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Rules", value: rules.length, icon: Shield, color: "#2563EB" },
          { label: "Active Rules", value: activateRules, icon: Flame, color: "#22C55E" },
          { label: "Blocked Today", value: "2,641", icon: AlertTriangle, color: "#EF4444" },
          { label: "Geo-Blocked", value: "14 Countries", icon: Globe, color: "#F59E0B" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${s.color}15` }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <p className="text-2xl font-bold text-[#0A192F]">{s.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* IP Whitelist / Blacklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {[
          { label: "Whitelisted IPs", color: "#22C55E", items: ["10.0.0.0/8", "192.168.1.0/24", "172.16.0.0/12"] },
          { label: "Blacklisted IPs", color: "#EF4444", items: ["185.220.101.0/24", "103.35.74.0/24", "175.45.176.0/24", "194.165.16.0/24"] },
        ].map((list) => (
          <motion.div key={list.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#0A192F] text-sm">{list.label}</h3>
              <button className="text-xs font-semibold flex items-center gap-1" style={{ color: list.color }}>
                <Plus size={12} /> Add IP
              </button>
            </div>
            <div className="space-y-2">
              {list.items.map((ip) => (
                <div key={ip} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 group">
                  <span className="font-mono text-xs text-[#0A192F]">{ip}</span>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-[#EF4444]">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Rules Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card overflow-hidden">
        <h3 className="font-bold text-[#0A192F] text-sm mb-5">Firewall Rules</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["Priority", "Rule Name", "Direction", "Protocol", "Source IP", "Dest Port", "Action", "Status", ""].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-400 pb-3 pr-4 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="py-3 pr-4 text-gray-400 text-xs font-mono">#{rule.priority}</td>
                  <td className="py-3 pr-4 font-medium text-[#0A192F] whitespace-nowrap">{rule.name}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${rule.direction === "Inbound" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`}>{rule.direction}</span>
                  </td>
                  <td className="py-3 pr-4 text-gray-500 text-xs font-mono">{rule.protocol}</td>
                  <td className="py-3 pr-4 font-mono text-xs text-gray-600">{rule.sourceIP}</td>
                  <td className="py-3 pr-4 text-gray-500">{rule.destPort}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${rule.action === "ALLOW" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>{rule.action}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <button onClick={() => toggleRule(rule.id)} id={`fw-toggle-${rule.id}`}>
                      {rule.status === "active"
                        ? <ToggleRight size={20} className="text-[#22C55E]" />
                        : <ToggleLeft size={20} className="text-gray-300" />
                      }
                    </button>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button id={`fw-edit-${rule.id}`} onClick={() => { setEditRule(rule); setShowModal(true); }} className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-[#2563EB] transition-colors"><Edit3 size={13} /></button>
                      <button id={`fw-delete-${rule.id}`} onClick={() => deleteRule(rule.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-[#EF4444] transition-colors"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Rule Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-elevated z-10">
              <h3 className="font-bold text-[#0A192F] text-lg mb-5">{editRule ? "Edit Rule" : "Add Firewall Rule"}</h3>
              <form onSubmit={handleAddRule} className="space-y-4">
                {[
                  { label: "Rule Name", key: "name", type: "text", placeholder: "e.g. Block SSH from External" },
                  { label: "Source IP / CIDR", key: "sourceIP", type: "text", placeholder: "e.g. 0.0.0.0/0" },
                  { label: "Destination Port", key: "destPort", type: "text", placeholder: "e.g. 22 or ANY" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{f.label}</label>
                    <input id={`fw-modal-${f.key}`} type={f.type} required placeholder={f.placeholder} value={newRule[f.key as keyof typeof newRule]} onChange={(e) => setNewRule((n) => ({ ...n, [f.key]: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[#0A192F] text-sm focus:outline-none focus:border-[#2563EB]" />
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Direction", key: "direction", opts: ["Inbound", "Outbound"] },
                    { label: "Protocol", key: "protocol", opts: ["TCP", "UDP", "ICMP", "ANY"] },
                    { label: "Action", key: "action", opts: ["ALLOW", "DENY"] },
                  ].map((s) => (
                    <div key={s.key}>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{s.label}</label>
                      <select id={`fw-modal-${s.key}`} value={newRule[s.key as keyof typeof newRule]} onChange={(e) => setNewRule((n) => ({ ...n, [s.key]: e.target.value }))} className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[#0A192F] text-sm focus:outline-none focus:border-[#2563EB]">
                        {s.opts.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} id="fw-modal-cancel" className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">Cancel</button>
                  <button type="submit" id="fw-modal-save" className="flex-1 py-3 rounded-xl bg-[#2563EB] text-white font-semibold text-sm hover:bg-[#1D4ED8] transition-all shadow-royal">Save Rule</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lockdown Confirm */}
      <AnimatePresence>
        {showLockdownConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-elevated z-10 text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center mx-auto mb-4">
                <Lock size={28} className="text-[#EF4444]" />
              </div>
              <h3 className="font-bold text-[#0A192F] text-xl mb-2">Emergency Lockdown</h3>
              <p className="text-gray-400 text-sm mb-6">This will block ALL inbound traffic immediately. Are you sure?</p>
              <div className="flex gap-3">
                <button onClick={() => setShowLockdownConfirm(false)} id="lockdown-cancel" className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50">Cancel</button>
                <button id="lockdown-confirm" onClick={() => { setLockdownActive(true); setShowLockdownConfirm(false); toast.error("EMERGENCY LOCKDOWN ACTIVATED — All inbound traffic blocked!"); }} className="flex-1 py-3 rounded-xl bg-[#EF4444] text-white font-semibold text-sm hover:bg-red-600 transition-all shadow-danger">Activate Lockdown</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

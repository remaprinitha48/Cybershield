"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, Key, Trash2, Eye, EyeOff, Save, Check } from "lucide-react";
import { toast } from "sonner";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "api", label: "API Keys", icon: Key },
];

function Toggle({ enabled, onChange, id }: { enabled: boolean; onChange: () => void; id: string }) {
  return (
    <button
      id={id}
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-all ${enabled ? "bg-[#2563EB]" : "bg-gray-200"}`}
    >
      <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({ name: "Alex Morgan", email: "admin@cybershield.io", company: "CyberShield Inc.", role: "Administrator", phone: "+1 (555) 000-1234" });
  const [showKey, setShowKey] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifs, setNotifs] = useState({ email: true, sms: false, slack: true, critical: true, high: true, medium: false, low: false, weekly: true });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    toast.success("Settings saved successfully");
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A192F]">Settings</h1>
        <p className="text-gray-400 text-sm mt-0.5">Manage your account, security, and platform preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-48 flex lg:flex-col gap-1 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              id={`settings-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${activeTab === tab.id ? "bg-[#0A192F] text-white" : "text-gray-500 hover:bg-gray-100 hover:text-[#0A192F]"}`}
            >
              <tab.icon size={15} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="p-6">
                <h2 className="font-bold text-[#0A192F] text-base mb-5">Profile Information</h2>
                <div className="flex items-center gap-5 mb-6 pb-6 border-b border-gray-100">
                  <div className="w-16 h-16 rounded-2xl bg-[#0A192F] flex items-center justify-center text-2xl font-bold text-white">AM</div>
                  <div>
                    <p className="font-semibold text-[#0A192F]">Profile Photo</p>
                    <p className="text-sm text-gray-400 mt-0.5">Update your profile picture</p>
                    <button id="settings-upload-photo" className="mt-2 text-xs font-semibold text-[#2563EB] hover:underline">Upload Photo</button>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Full Name", key: "name", type: "text" },
                    { label: "Email Address", key: "email", type: "email" },
                    { label: "Company", key: "company", type: "text" },
                    { label: "Phone Number", key: "phone", type: "tel" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{f.label}</label>
                      <input
                        id={`settings-${f.key}`}
                        type={f.type}
                        value={profile[f.key as keyof typeof profile]}
                        onChange={(e) => setProfile((p) => ({ ...p, [f.key]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[#0A192F] text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Role</label>
                    <input type="text" value={profile.role} readOnly className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-400 text-sm cursor-not-allowed" />
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="p-6">
                <h2 className="font-bold text-[#0A192F] text-base mb-5">Notification Preferences</h2>
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Notification Channels</p>
                    <div className="space-y-3">
                      {[
                        { key: "email", label: "Email Notifications", desc: "Receive alerts via email" },
                        { key: "sms", label: "SMS Notifications", desc: "Critical alerts via SMS" },
                        { key: "slack", label: "Slack Integration", desc: "Send alerts to Slack channel" },
                      ].map((n) => (
                        <div key={n.key} className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50">
                          <div>
                            <p className="text-sm font-medium text-[#0A192F]">{n.label}</p>
                            <p className="text-xs text-gray-400">{n.desc}</p>
                          </div>
                          <Toggle id={`notif-${n.key}`} enabled={notifs[n.key as keyof typeof notifs] as boolean} onChange={() => setNotifs((p) => ({ ...p, [n.key]: !p[n.key as keyof typeof notifs] }))} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Alert Severity Levels</p>
                    <div className="space-y-2">
                      {[
                        { key: "critical", label: "Critical Alerts", color: "#EF4444" },
                        { key: "high", label: "High Severity", color: "#F59E0B" },
                        { key: "medium", label: "Medium Severity", color: "#06B6D4" },
                        { key: "low", label: "Low Severity", color: "#22C55E" },
                      ].map((s) => (
                        <div key={s.key} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50">
                          <div className="flex items-center gap-2.5">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                            <span className="text-sm text-[#0A192F] font-medium">{s.label}</span>
                          </div>
                          <Toggle id={`notif-sev-${s.key}`} enabled={notifs[s.key as keyof typeof notifs] as boolean} onChange={() => setNotifs((p) => ({ ...p, [s.key]: !p[s.key as keyof typeof notifs] }))} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="p-6 space-y-5">
                <h2 className="font-bold text-[#0A192F] text-base mb-5">Security Settings</h2>
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200">
                  <div>
                    <p className="font-semibold text-[#0A192F] text-sm">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-400 mt-0.5">Add an extra layer of security to your account</p>
                  </div>
                  <Toggle id="security-2fa" enabled={mfaEnabled} onChange={() => setMfaEnabled(!mfaEnabled)} />
                </div>
                <div className="p-4 rounded-xl border border-gray-200 space-y-4">
                  <p className="font-semibold text-[#0A192F] text-sm">Change Password</p>
                  {["Current Password", "New Password", "Confirm New Password"].map((label, i) => (
                    <div key={i}>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">{label}</label>
                      <div className="relative">
                        <input type={showKey ? "text" : "password"} placeholder="••••••••" id={`security-pass-${i}`} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[#0A192F] text-sm focus:outline-none focus:border-[#2563EB]" />
                        {i === 1 && <button onClick={() => setShowKey(!showKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showKey ? <EyeOff size={15} /> : <Eye size={15} />}</button>}
                      </div>
                    </div>
                  ))}
                  <button id="security-change-pass" className="px-4 py-2.5 bg-[#0A192F] text-white text-sm font-semibold rounded-xl hover:bg-[#112240] transition-all">Update Password</button>
                </div>
                <div className="p-4 rounded-xl border border-gray-200">
                  <p className="font-semibold text-[#0A192F] text-sm mb-3">Active Sessions</p>
                  {[
                    { device: "MacBook Pro · Chrome", ip: "192.168.1.10", time: "Active now" },
                    { device: "iPhone 15 · Safari", ip: "10.0.0.2", time: "2h ago" },
                  ].map((s) => (
                    <div key={s.device} className="flex items-center justify-between py-2.5 border-t border-gray-50 first:border-0">
                      <div>
                        <p className="text-sm font-medium text-[#0A192F]">{s.device}</p>
                        <p className="text-xs text-gray-400">{s.ip} · {s.time}</p>
                      </div>
                      <button className="text-xs text-[#EF4444] font-medium hover:underline">Revoke</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <div className="p-6 space-y-5">
                <h2 className="font-bold text-[#0A192F] text-base mb-5">Appearance</h2>
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200">
                  <div>
                    <p className="font-semibold text-[#0A192F] text-sm">Dark Mode</p>
                    <p className="text-xs text-gray-400">Switch to a dark color scheme</p>
                  </div>
                  <Toggle id="appearance-dark" enabled={darkMode} onChange={() => { setDarkMode(!darkMode); toast.success("Theme changed"); }} />
                </div>
                <div className="p-4 rounded-xl border border-gray-200">
                  <p className="font-semibold text-[#0A192F] text-sm mb-3">Accent Color</p>
                  <div className="flex gap-3">
                    {["#2563EB", "#8B5CF6", "#22C55E", "#EF4444", "#F59E0B", "#06B6D4"].map((c) => (
                      <button key={c} id={`appearance-color-${c.replace("#","")}`} className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform" style={{ background: c, outline: c === "#2563EB" ? "2px solid #2563EB" : "none", outlineOffset: "2px" }} />
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-gray-200">
                  <p className="font-semibold text-[#0A192F] text-sm mb-3">Dashboard Density</p>
                  <div className="flex gap-2">
                    {["Compact", "Comfortable", "Spacious"].map((d, i) => (
                      <button key={d} id={`appearance-density-${d.toLowerCase()}`} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${i === 1 ? "bg-[#0A192F] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>{d}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* API Keys Tab */}
            {activeTab === "api" && (
              <div className="p-6 space-y-5">
                <h2 className="font-bold text-[#0A192F] text-base mb-5">API Key Management</h2>
                <div className="p-4 rounded-xl border border-gray-200">
                  <p className="font-semibold text-[#0A192F] text-sm mb-3">Production API Key</p>
                  <div className="flex gap-2">
                    <div className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-mono text-xs text-gray-500">
                      {showKey ? "cs_live_sk_1234567890abcdefghijklmnopqrstuvwxyz" : "cs_live_sk_••••••••••••••••••••••••••••••••"}
                    </div>
                    <button id="api-toggle-visibility" onClick={() => setShowKey(!showKey)} className="px-3 py-2 rounded-xl border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors">
                      {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button id="api-copy-key" onClick={() => toast.success("API key copied!")} className="text-xs font-semibold text-[#2563EB] hover:underline">Copy Key</button>
                    <span className="text-gray-300">·</span>
                    <button id="api-regenerate-key" onClick={() => toast.success("API key regenerated!")} className="text-xs font-semibold text-[#EF4444] hover:underline">Regenerate</button>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-red-100 bg-red-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Trash2 size={14} className="text-[#EF4444]" />
                    <p className="font-semibold text-[#EF4444] text-sm">Danger Zone</p>
                  </div>
                  <p className="text-xs text-red-400 mb-3">Permanently delete your account and all associated data. This action cannot be undone.</p>
                  <button id="settings-delete-account" className="px-4 py-2 rounded-xl border border-red-300 text-[#EF4444] text-xs font-semibold hover:bg-red-100 transition-colors">Delete Account</button>
                </div>
              </div>
            )}

            {/* Save button */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <button
                id="settings-save"
                onClick={handleSave}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${saved ? "bg-[#22C55E] text-white" : "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-royal"}`}
              >
                {saved ? (<><Check size={15} /> Saved!</>) : (<><Save size={15} /> Save Changes</>)}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

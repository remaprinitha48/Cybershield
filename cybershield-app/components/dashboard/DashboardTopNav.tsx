"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, Sun, Moon, Menu, ChevronDown, Shield, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

const NOTIFICATIONS = [
  { id: 1, title: "Critical threat blocked", desc: "SQL Injection from 185.220.101.47", time: "2m ago", color: "#EF4444", read: false },
  { id: 2, title: "Server SRV-03 CPU alert", desc: "CPU usage at 87% — Singapore node", time: "12m ago", color: "#F59E0B", read: false },
  { id: 3, title: "Firewall rule updated", desc: "Block North Korea rule activated", time: "1h ago", color: "#2563EB", read: true },
  { id: 4, title: "Weekly report ready", desc: "May 2025 security report generated", time: "3h ago", color: "#22C55E", read: true },
];

export default function DashboardTopNav({ onMobileMenuToggle }: { onMobileMenuToggle: () => void }) {
  const [isDark, setIsDark] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0 relative z-30">
      {/* Left: Mobile menu + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          id="topnav-mobile-menu"
          onClick={onMobileMenuToggle}
          className="lg:hidden w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <Menu size={18} />
        </button>
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-72 group focus-within:border-[#2563EB] focus-within:bg-white transition-all">
          <Search size={15} className="text-gray-400 flex-shrink-0" />
          <input
            id="topnav-search"
            type="text"
            placeholder="Search threats, servers, rules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          id="topnav-theme-toggle"
          onClick={() => setIsDark(!isDark)}
          className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all"
          title="Toggle theme"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            id="topnav-notifications"
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-all relative"
          >
            <Bell size={16} />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-elevated border border-gray-100 overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <span className="font-semibold text-sm text-[#0A192F]">Notifications</span>
                  <span className="text-xs text-[#2563EB] font-medium cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {NOTIFICATIONS.map((n) => (
                    <div key={n.id} className={`flex gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${!n.read ? "bg-blue-50/50" : ""}`}>
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#0A192F] leading-tight">{n.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5 truncate">{n.desc}</p>
                        <p className="text-[10px] text-gray-300 mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-gray-100">
                  <button className="text-xs text-[#2563EB] font-medium w-full text-center hover:underline">View all notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            id="topnav-profile"
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-[#0A192F] flex items-center justify-center text-xs font-bold text-white">AM</div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-[#0A192F] leading-tight">Alex Morgan</p>
              <p className="text-[10px] text-gray-400">Administrator</p>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-52 bg-white rounded-2xl shadow-elevated border border-gray-100 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-[#0A192F]">Alex Morgan</p>
                  <p className="text-xs text-gray-400">admin@cybershield.io</p>
                </div>
                {[
                  { label: "My Profile", icon: User, href: "/dashboard/settings" },
                  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
                  { label: "Security", icon: Shield, href: "/dashboard/settings" },
                ].map((item) => (
                  <Link key={item.label} href={item.href} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#0A192F] transition-colors">
                    <item.icon size={14} className="text-gray-400" />
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-gray-100">
                  <Link href="/login" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#EF4444] hover:bg-red-50 transition-colors">
                    <LogOut size={14} />
                    Sign Out
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

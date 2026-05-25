"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield, LayoutDashboard, AlertTriangle, Flame, Server,
  Bot, BarChart3, Settings, Users, ChevronLeft, ChevronRight, X, LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard, badge: null },
  { label: "Threat Monitor", href: "/dashboard/threats", icon: AlertTriangle, badge: "12" },
  { label: "Firewall", href: "/dashboard/firewall", icon: Flame, badge: null },
  { label: "Servers", href: "/dashboard/servers", icon: Server, badge: null },
  { label: "AI Assistant", href: "/dashboard/ai-assistant", icon: Bot, badge: "New" },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart3, badge: null },
];

const ADMIN_ITEMS = [
  { label: "User Management", href: "/dashboard/admin/users", icon: Users, badge: null },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, badge: null },
];

interface Props {
  collapsed: boolean;
  onCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

function NavItem({ item, collapsed }: { item: typeof NAV_ITEMS[0]; collapsed: boolean }) {
  const pathname = usePathname();
  const isActive = pathname === item.href || (item.href !== "/dashboard/admin" && pathname.startsWith(item.href));

  return (
    <Link
      href={item.href}
      id={`nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
      className={`sidebar-item ${isActive ? "active" : ""} ${collapsed ? "justify-center px-2" : ""}`}
    >
      <item.icon size={18} className={isActive ? "text-white" : "text-slate-400"} />
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 whitespace-nowrap overflow-hidden"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
      {!collapsed && item.badge && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
          item.badge === "New"
            ? "bg-[#22C55E]/20 text-[#22C55E]"
            : "bg-[#EF4444]/20 text-[#EF4444]"
        }`}>
          {item.badge}
        </span>
      )}
    </Link>
  );
}

export default function DashboardSidebar({ collapsed, onCollapse, mobileOpen, onMobileClose }: Props) {
  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 h-16 border-b border-white/5 flex-shrink-0 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center flex-shrink-0 shadow-royal">
          <Shield size={16} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <span className="font-bold text-base text-white whitespace-nowrap">Cyber<span className="text-[#60A5FA]">Shield</span></span>
              <p className="text-[10px] text-white/30 -mt-0.5">Security Platform</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        <div className={`mb-1 ${collapsed ? "hidden" : "block"}`}>
          <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest px-3 mb-2">Main</p>
        </div>
        {NAV_ITEMS.map((item) => <NavItem key={item.href} item={item} collapsed={collapsed} />)}

        <div className={`mt-5 mb-1 ${collapsed ? "hidden" : "block"}`}>
          <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest px-3 mb-2">Admin</p>
        </div>
        {ADMIN_ITEMS.map((item) => <NavItem key={item.href} item={item} collapsed={collapsed} />)}
      </div>

      {/* User section */}
      <div className={`p-3 border-t border-white/5 flex-shrink-0`}>
        <div className={`flex items-center gap-3 rounded-xl p-2.5 hover:bg-white/5 transition-colors cursor-pointer ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-lg bg-[#2563EB]/30 border border-[#2563EB]/40 flex items-center justify-center flex-shrink-0 text-sm font-bold text-[#60A5FA]">
            AM
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">Alex Morgan</p>
                <p className="text-[10px] text-white/35 truncate">Admin</p>
              </motion.div>
            )}
          </AnimatePresence>
          {!collapsed && <LogOut size={14} className="text-white/25 hover:text-white/60 flex-shrink-0" />}
        </div>
      </div>

      {/* Collapse button */}
      <button
        onClick={onCollapse}
        id="sidebar-collapse-btn"
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#1E3A5F] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#2563EB] transition-all z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="hidden lg:flex flex-col relative bg-[#0A192F] border-r border-white/5 flex-shrink-0 overflow-hidden"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile overlay sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-[#0A192F] z-50 flex flex-col"
            >
              <button onClick={onMobileClose} className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-white">
                <X size={14} />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

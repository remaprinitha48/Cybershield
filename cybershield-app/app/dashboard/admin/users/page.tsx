"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, Search, Shield, User, MoreHorizontal, Edit3, Trash2, Lock } from "lucide-react";
import { MOCK_USERS } from "@/lib/mock-data";
import { toast } from "sonner";

export default function UserManagementPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = users.filter((u) => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || u.role === filter || u.status === filter;
    return matchSearch && matchFilter;
  });

  const suspend = (id: string) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === "suspended" ? "active" : "suspended" } : u));
    toast.success("User status updated");
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192F]">User Management</h1>
          <p className="text-gray-400 text-sm mt-0.5">{users.filter((u) => u.status === "active").length} active · {users.length} total users</p>
        </div>
        <button id="users-invite" className="flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-xl hover:bg-[#1D4ED8] transition-all shadow-royal">
          <UserPlus size={15} /> Invite User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: users.length, color: "#2563EB" },
          { label: "Admins", value: users.filter((u) => u.role === "admin").length, color: "#F59E0B" },
          { label: "Analysts", value: users.filter((u) => u.role === "analyst").length, color: "#8B5CF6" },
          { label: "MFA Enabled", value: users.filter((u) => u.mfa).length, color: "#22C55E" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input id="users-search" type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all" />
          </div>
          <div className="flex gap-2">
            {["all", "admin", "analyst", "user", "suspended"].map((f) => (
              <button key={f} id={`users-filter-${f}`} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${filter === f ? "bg-[#0A192F] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["User", "Email", "Role", "MFA", "Last Login", "Status", ""].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-400 pb-3 pr-4 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#0A192F] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">{user.avatar}</div>
                      <span className="font-semibold text-[#0A192F]">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 text-gray-500 text-xs">{user.email}</td>
                  <td className="py-3.5 pr-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      user.role === "admin" ? "bg-yellow-50 text-yellow-700" :
                      user.role === "analyst" ? "bg-purple-50 text-purple-700" : "bg-gray-100 text-gray-600"
                    }`}>{user.role}</span>
                  </td>
                  <td className="py-3.5 pr-4">
                    <div className={`flex items-center gap-1.5 text-xs font-medium ${user.mfa ? "text-green-600" : "text-red-400"}`}>
                      {user.mfa ? <Lock size={12} /> : <Lock size={12} />}
                      {user.mfa ? "Enabled" : "Disabled"}
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 text-gray-400 text-xs">{user.lastLogin}</td>
                  <td className="py-3.5 pr-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${user.status === "active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>{user.status}</span>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button id={`user-edit-${user.id}`} className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-[#2563EB] transition-colors"><Edit3 size={13} /></button>
                      <button id={`user-suspend-${user.id}`} onClick={() => suspend(user.id)} className="p-1.5 rounded-lg hover:bg-yellow-50 text-gray-400 hover:text-[#F59E0B] transition-colors"><Shield size={13} /></button>
                      <button id={`user-delete-${user.id}`} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-[#EF4444] transition-colors"><Trash2 size={13} /></button>
                    </div>
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

"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

type Role = "admin" | "user";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: Role) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: Role) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USERS = {
  admin: { id: "u1", name: "Alex Morgan", email: "admin@cybershield.io", role: "admin" as Role, avatar: "AM" },
  user: { id: "u2", name: "Sarah Chen", email: "user@cybershield.io", role: "user" as Role, avatar: "SC" },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = useCallback(async (email: string, _password: string, role: Role): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 1000));
    const mockUser = role === "admin" ? DEMO_USERS.admin : DEMO_USERS.user;
    setUser({ ...mockUser, email });
    if (typeof window !== "undefined") {
      localStorage.setItem("cs_user", JSON.stringify({ ...mockUser, email }));
    }
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cs_user");
    }
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string, role: Role): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 1200));
    const newUser: AuthUser = { id: `u_${Date.now()}`, name, email, role, avatar: name.slice(0, 2).toUpperCase() };
    setUser(newUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("cs_user", JSON.stringify(newUser));
    }
    return true;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

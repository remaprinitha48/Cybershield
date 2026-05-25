import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — CyberShield",
  description: "Sign in to your CyberShield security dashboard.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}

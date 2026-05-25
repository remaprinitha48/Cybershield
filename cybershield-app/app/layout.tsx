import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "CyberShield — AI-Powered Cybersecurity Platform",
  description:
    "Enterprise-grade AI cybersecurity platform for intelligent server & firewall management. Real-time threat monitoring, SOC dashboard, and automated incident response.",
  keywords: "cybersecurity, SOC, firewall management, threat monitoring, AI security, server monitoring",
  authors: [{ name: "CyberShield Security Inc." }],
  openGraph: {
    title: "CyberShield — AI-Powered Cybersecurity Platform",
    description: "Protect your infrastructure with AI-driven threat detection and intelligent security management.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#112240",
              color: "#FFFFFF",
              border: "1px solid rgba(37,99,235,0.3)",
              fontFamily: "Inter, sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}

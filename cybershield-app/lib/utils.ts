import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

export function formatBytes(bytes: number): string {
  if (bytes >= 1_073_741_824) return `${(bytes / 1_073_741_824).toFixed(2)} GB`;
  if (bytes >= 1_048_576) return `${(bytes / 1_048_576).toFixed(2)} MB`;
  if (bytes >= 1_024) return `${(bytes / 1_024).toFixed(2)} KB`;
  return `${bytes} B`;
}

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function getSeverityColor(severity: string): string {
  switch (severity.toLowerCase()) {
    case "critical": return "#EF4444";
    case "high": return "#F59E0B";
    case "medium": return "#06B6D4";
    case "low": return "#22C55E";
    default: return "#94A3B8";
  }
}

export function getSeverityBg(severity: string): string {
  switch (severity.toLowerCase()) {
    case "critical": return "rgba(239,68,68,0.15)";
    case "high": return "rgba(245,158,11,0.15)";
    case "medium": return "rgba(6,182,212,0.15)";
    case "low": return "rgba(34,197,94,0.15)";
    default: return "rgba(148,163,184,0.15)";
  }
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "online": case "active": case "healthy": return "#22C55E";
    case "warning": case "degraded": return "#F59E0B";
    case "offline": case "critical": case "down": return "#EF4444";
    default: return "#94A3B8";
  }
}

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateTimeSeriesData(
  days: number,
  baseValue: number,
  variance: number
): { date: string; value: number }[] {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Math.max(0, baseValue + randomBetween(-variance, variance)),
    };
  });
}

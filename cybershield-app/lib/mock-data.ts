// ========================================
// MOCK DATA — CyberShield Platform
// ========================================

export const MOCK_THREATS = [
  { id: "t1", type: "SQL Injection", source: "Russia", ip: "185.220.101.47", severity: "critical", status: "blocked", timestamp: "2m ago", port: 5432 },
  { id: "t2", type: "DDoS Attack", source: "China", ip: "103.35.74.192", severity: "high", status: "blocked", timestamp: "5m ago", port: 80 },
  { id: "t3", type: "Brute Force SSH", source: "North Korea", ip: "175.45.176.3", severity: "high", status: "blocked", timestamp: "8m ago", port: 22 },
  { id: "t4", type: "Port Scan", source: "Iran", ip: "194.165.16.47", severity: "medium", status: "detected", timestamp: "12m ago", port: 443 },
  { id: "t5", type: "XSS Attempt", source: "Romania", ip: "89.34.111.72", severity: "medium", status: "blocked", timestamp: "15m ago", port: 8080 },
  { id: "t6", type: "Ransomware Signal", source: "Ukraine", ip: "91.134.175.21", severity: "critical", status: "quarantined", timestamp: "23m ago", port: 445 },
  { id: "t7", type: "Phishing Request", source: "Nigeria", ip: "197.211.57.103", severity: "high", status: "blocked", timestamp: "31m ago", port: 25 },
  { id: "t8", type: "Command Injection", source: "Brazil", ip: "200.175.0.191", severity: "high", status: "blocked", timestamp: "45m ago", port: 3000 },
  { id: "t9", type: "LDAP Injection", source: "Vietnam", ip: "118.70.125.29", severity: "medium", status: "detected", timestamp: "1h ago", port: 389 },
  { id: "t10", type: "API Abuse", source: "India", ip: "122.177.213.219", severity: "low", status: "monitored", timestamp: "1h ago", port: 443 },
  { id: "t11", type: "Cryptojacking", source: "Turkey", ip: "78.189.111.43", severity: "medium", status: "blocked", timestamp: "2h ago", port: 4444 },
  { id: "t12", type: "Zero-Day Exploit", source: "Unknown", ip: "0.0.0.0", severity: "critical", status: "quarantined", timestamp: "3h ago", port: 0 },
];

export const MOCK_SERVERS = [
  { id: "srv-01", name: "US-East-Prod-01", location: "Virginia, USA", status: "online", cpu: 34, ram: 62, disk: 48, uptime: "99.97%", ip: "10.0.1.10", os: "Ubuntu 22.04", lastPatch: "2024-12-01" },
  { id: "srv-02", name: "EU-West-Prod-02", location: "Frankfurt, DE", status: "online", cpu: 51, ram: 73, disk: 55, uptime: "99.89%", ip: "10.0.2.11", os: "CentOS 9", lastPatch: "2024-11-28" },
  { id: "srv-03", name: "AP-South-Prod-03", location: "Singapore", status: "warning", cpu: 87, ram: 91, disk: 78, uptime: "98.41%", ip: "10.0.3.12", os: "Ubuntu 22.04", lastPatch: "2024-11-15" },
  { id: "srv-04", name: "US-West-Dev-04", location: "Oregon, USA", status: "online", cpu: 22, ram: 41, disk: 33, uptime: "99.99%", ip: "10.0.4.13", os: "Debian 12", lastPatch: "2024-12-03" },
  { id: "srv-05", name: "EU-North-Backup-05", location: "Stockholm, SE", status: "online", cpu: 12, ram: 28, disk: 71, uptime: "100%", ip: "10.0.5.14", os: "Ubuntu 20.04", lastPatch: "2024-12-02" },
  { id: "srv-06", name: "US-Central-DB-06", location: "Chicago, USA", status: "critical", cpu: 96, ram: 98, disk: 92, uptime: "91.23%", ip: "10.0.6.15", os: "RHEL 9", lastPatch: "2024-10-30" },
  { id: "srv-07", name: "AP-East-Cache-07", location: "Tokyo, JP", status: "online", cpu: 38, ram: 54, disk: 41, uptime: "99.95%", ip: "10.0.7.16", os: "Ubuntu 22.04", lastPatch: "2024-12-01" },
  { id: "srv-08", name: "AU-Prod-08", location: "Sydney, AU", status: "online", cpu: 45, ram: 67, disk: 52, uptime: "99.82%", ip: "10.0.8.17", os: "Debian 12", lastPatch: "2024-11-25" },
];

export const MOCK_FIREWALL_RULES = [
  { id: "fw-001", name: "Block North Korea", direction: "Inbound", protocol: "ANY", sourceIP: "175.45.176.0/24", destPort: "ANY", action: "DENY", status: "active", priority: 1 },
  { id: "fw-002", name: "Allow HTTPS", direction: "Inbound", protocol: "TCP", sourceIP: "0.0.0.0/0", destPort: "443", action: "ALLOW", status: "active", priority: 2 },
  { id: "fw-003", name: "Allow SSH Admin", direction: "Inbound", protocol: "TCP", sourceIP: "10.0.0.0/8", destPort: "22", action: "ALLOW", status: "active", priority: 3 },
  { id: "fw-004", name: "Block Tor Nodes", direction: "Inbound", protocol: "ANY", sourceIP: "185.220.101.0/24", destPort: "ANY", action: "DENY", status: "active", priority: 4 },
  { id: "fw-005", name: "Allow DNS", direction: "Outbound", protocol: "UDP", sourceIP: "10.0.0.0/8", destPort: "53", action: "ALLOW", status: "active", priority: 5 },
  { id: "fw-006", name: "Block Port 445", direction: "Inbound", protocol: "TCP", sourceIP: "0.0.0.0/0", destPort: "445", action: "DENY", status: "active", priority: 6 },
  { id: "fw-007", name: "Allow HTTP Redirect", direction: "Inbound", protocol: "TCP", sourceIP: "0.0.0.0/0", destPort: "80", action: "ALLOW", status: "active", priority: 7 },
  { id: "fw-008", name: "Block China Range", direction: "Inbound", protocol: "ANY", sourceIP: "103.0.0.0/8", destPort: "ANY", action: "DENY", status: "disabled", priority: 8 },
  { id: "fw-009", name: "Allow Monitoring", direction: "Inbound", protocol: "TCP", sourceIP: "10.0.0.0/8", destPort: "9090", action: "ALLOW", status: "active", priority: 9 },
  { id: "fw-010", name: "Block FTP", direction: "Inbound", protocol: "TCP", sourceIP: "0.0.0.0/0", destPort: "21", action: "DENY", status: "active", priority: 10 },
];

export const MOCK_USERS = [
  { id: "u1", name: "Alex Morgan", email: "a.morgan@corp.com", role: "admin", status: "active", lastLogin: "2 min ago", mfa: true, avatar: "AM" },
  { id: "u2", name: "Sarah Chen", email: "s.chen@corp.com", role: "analyst", status: "active", lastLogin: "15 min ago", mfa: true, avatar: "SC" },
  { id: "u3", name: "James Wilson", email: "j.wilson@corp.com", role: "user", status: "active", lastLogin: "1h ago", mfa: false, avatar: "JW" },
  { id: "u4", name: "Priya Sharma", email: "p.sharma@corp.com", role: "analyst", status: "active", lastLogin: "3h ago", mfa: true, avatar: "PS" },
  { id: "u5", name: "Michael Torres", email: "m.torres@corp.com", role: "user", status: "suspended", lastLogin: "2d ago", mfa: false, avatar: "MT" },
  { id: "u6", name: "Emma Johnson", email: "e.johnson@corp.com", role: "admin", status: "active", lastLogin: "30 min ago", mfa: true, avatar: "EJ" },
];

export const THREAT_TIMELINE_DATA = [
  { date: "May 17", threats: 142, blocked: 138, allowed: 4 },
  { date: "May 18", threats: 198, blocked: 191, allowed: 7 },
  { date: "May 19", threats: 89, blocked: 89, allowed: 0 },
  { date: "May 20", threats: 234, blocked: 228, allowed: 6 },
  { date: "May 21", threats: 312, blocked: 305, allowed: 7 },
  { date: "May 22", threats: 178, blocked: 175, allowed: 3 },
  { date: "May 23", threats: 267, blocked: 261, allowed: 6 },
];

export const TRAFFIC_DATA = [
  { time: "00:00", inbound: 1200, outbound: 800 },
  { time: "02:00", inbound: 800, outbound: 600 },
  { time: "04:00", inbound: 600, outbound: 400 },
  { time: "06:00", inbound: 900, outbound: 700 },
  { time: "08:00", inbound: 2400, outbound: 1800 },
  { time: "10:00", inbound: 3800, outbound: 2900 },
  { time: "12:00", inbound: 4200, outbound: 3100 },
  { time: "14:00", inbound: 3900, outbound: 2800 },
  { time: "16:00", inbound: 4600, outbound: 3400 },
  { time: "18:00", inbound: 3200, outbound: 2400 },
  { time: "20:00", inbound: 2100, outbound: 1600 },
  { time: "22:00", inbound: 1500, outbound: 1100 },
];

export const THREAT_TYPES_DATA = [
  { name: "SQL Injection", value: 28, color: "#EF4444" },
  { name: "DDoS", value: 22, color: "#F59E0B" },
  { name: "Brute Force", value: 18, color: "#2563EB" },
  { name: "XSS", value: 14, color: "#06B6D4" },
  { name: "Phishing", value: 11, color: "#8B5CF6" },
  { name: "Other", value: 7, color: "#94A3B8" },
];

export const COMPLIANCE_DATA = [
  { name: "GDPR", score: 94, color: "#22C55E" },
  { name: "SOC 2", score: 88, color: "#2563EB" },
  { name: "ISO 27001", score: 91, color: "#06B6D4" },
  { name: "PCI-DSS", score: 79, color: "#F59E0B" },
  { name: "HIPAA", score: 85, color: "#8B5CF6" },
];

export const ACTIVITY_LOG = [
  { id: 1, action: "Firewall rule updated", user: "Alex Morgan", time: "2 min ago", type: "config" },
  { id: 2, action: "Critical threat blocked", user: "System", time: "5 min ago", type: "threat" },
  { id: 3, action: "Server SRV-03 CPU alert", user: "System", time: "12 min ago", type: "warning" },
  { id: 4, action: "User Sarah Chen logged in", user: "Sarah Chen", time: "15 min ago", type: "auth" },
  { id: 5, action: "Security report generated", user: "Priya Sharma", time: "1h ago", type: "report" },
  { id: 6, action: "Vulnerability scan completed", user: "System", time: "2h ago", type: "scan" },
  { id: 7, action: "New firewall rule added", user: "Alex Morgan", time: "3h ago", type: "config" },
  { id: 8, action: "Ransomware quarantined", user: "System", time: "3h ago", type: "threat" },
];

export const AI_MESSAGES = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I'm CyberShield AI, your intelligent security assistant. I've analyzed your current security posture. Your overall security score is **94/100** — excellent work! I've detected 3 items that need your attention.",
    time: "just now",
  },
  {
    id: 2,
    role: "user",
    content: "What are the top threats right now?",
    time: "just now",
  },
  {
    id: 3,
    role: "assistant",
    content: "Based on real-time analysis, here are your top 3 active threats:\n\n**1. Critical — SQL Injection** from 185.220.101.47 (Russia) → Already blocked at perimeter firewall.\n\n**2. High — DDoS Campaign** targeting port 80 from distributed botnet (103.x.x.x range) → Rate limiting applied, recommend geo-block Chinese IP range.\n\n**3. High — SSH Brute Force** from 175.45.176.3 → 847 attempts in 15 minutes → Source IP banned.\n\nWould you like me to generate an incident response report?",
    time: "1s ago",
  },
];

export const MOCK_PROCESSES = [
  { pid: 1234, name: "nginx", cpu: 2.1, memory: 128, status: "running" },
  { pid: 2891, name: "postgresql", cpu: 8.4, memory: 2048, status: "running" },
  { pid: 3102, name: "node", cpu: 4.7, memory: 512, status: "running" },
  { pid: 4512, name: "redis-server", cpu: 1.2, memory: 256, status: "running" },
  { pid: 5821, name: "prometheus", cpu: 3.1, memory: 384, status: "running" },
  { pid: 6103, name: "grafana", cpu: 1.8, memory: 192, status: "running" },
  { pid: 7234, name: "fail2ban", cpu: 0.3, memory: 64, status: "running" },
  { pid: 8901, name: "sshd", cpu: 0.1, memory: 32, status: "running" },
];

export const ATTACK_SOURCES = [
  { country: "Russia", attacks: 1847, severity: "critical", blocked: 1847, flag: "🇷🇺" },
  { country: "China", attacks: 1423, severity: "high", blocked: 1390, flag: "🇨🇳" },
  { country: "North Korea", attacks: 891, severity: "critical", blocked: 891, flag: "🇰🇵" },
  { country: "Iran", attacks: 634, severity: "high", blocked: 628, flag: "🇮🇷" },
  { country: "Romania", attacks: 412, severity: "medium", blocked: 406, flag: "🇷🇴" },
  { country: "Nigeria", attacks: 289, severity: "medium", blocked: 281, flag: "🇳🇬" },
  { country: "Brazil", attacks: 198, severity: "low", blocked: 192, flag: "🇧🇷" },
  { country: "Vietnam", attacks: 145, severity: "low", blocked: 140, flag: "🇻🇳" },
];

export const MONTHLY_REPORT_DATA = [
  { month: "Dec", threats: 4280, blocked: 4251, incidents: 29, score: 91 },
  { month: "Jan", threats: 3890, blocked: 3864, incidents: 26, score: 92 },
  { month: "Feb", threats: 5120, blocked: 5098, incidents: 22, score: 93 },
  { month: "Mar", threats: 4670, blocked: 4651, incidents: 19, score: 94 },
  { month: "Apr", threats: 3980, blocked: 3972, incidents: 8, score: 95 },
  { month: "May", threats: 2890, blocked: 2884, incidents: 6, score: 94 },
];

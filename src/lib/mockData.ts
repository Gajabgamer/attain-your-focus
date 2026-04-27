export type Priority = "critical" | "important" | "normal";
export type SmartAction = "copy_otp" | "set_reminder" | "add_calendar" | null;

export interface NotificationItem {
  id: string;
  app: string;
  appColor: string;
  appIcon: string; // single letter fallback
  title: string;
  preview: string;
  time: string;
  priority: Priority;
  important?: boolean;
  blocked?: boolean;
  smartAction?: SmartAction;
  otp?: string;
}

export const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    app: "HDFC Bank",
    appColor: "#0E5BA8",
    appIcon: "H",
    title: "OTP for transaction",
    preview: "Your OTP is 482913. Valid for 5 minutes. Do not share with anyone.",
    time: "2m",
    priority: "critical",
    smartAction: "copy_otp",
    otp: "482913",
  },
  {
    id: "2",
    app: "Calendar",
    appColor: "#1A7A6E",
    appIcon: "C",
    title: "Standup with design team",
    preview: "Starting in 15 minutes • Google Meet link attached",
    time: "12m",
    priority: "important",
    important: true,
    smartAction: "add_calendar",
  },
  {
    id: "3",
    app: "Slack",
    appColor: "#4A154B",
    appIcon: "S",
    title: "Priya mentioned you in #design",
    preview: "Hey, can you review the new onboarding flow before EOD? Need your input on step 3.",
    time: "24m",
    priority: "important",
    smartAction: "set_reminder",
  },
  {
    id: "4",
    app: "Gmail",
    appColor: "#D93025",
    appIcon: "G",
    title: "Invoice #2847 from Linear",
    preview: "Your monthly subscription has been processed. Amount: $48.00",
    time: "1h",
    priority: "normal",
  },
  {
    id: "5",
    app: "WhatsApp",
    appColor: "#25D366",
    appIcon: "W",
    title: "Mom",
    preview: "Are you coming home for dinner tonight? Made your favorite.",
    time: "1h",
    priority: "important",
    important: true,
  },
  {
    id: "6",
    app: "Instagram",
    appColor: "#E1306C",
    appIcon: "I",
    title: "5 new likes on your post",
    preview: "alex_designs and 4 others liked your recent photo",
    time: "2h",
    priority: "normal",
    blocked: true,
  },
  {
    id: "7",
    app: "Uber",
    appColor: "#000000",
    appIcon: "U",
    title: "Your ride is arriving",
    preview: "Toyota Camry • DL 3C AB 4421 • 2 min away",
    time: "3h",
    priority: "critical",
  },
  {
    id: "8",
    app: "Linear",
    appColor: "#5E6AD2",
    appIcon: "L",
    title: "ATN-142 assigned to you",
    preview: "Implement notification grouping logic for the inbox view",
    time: "4h",
    priority: "normal",
    smartAction: "set_reminder",
  },
  {
    id: "9",
    app: "Spotify",
    appColor: "#1DB954",
    appIcon: "S",
    title: "Discover Weekly is ready",
    preview: "Your new mix has 30 fresh tracks based on what you've been listening to",
    time: "6h",
    priority: "normal",
    blocked: true,
  },
  {
    id: "10",
    app: "Twitter",
    appColor: "#1DA1F2",
    appIcon: "T",
    title: "12 new notifications",
    preview: "Activity from people you follow",
    time: "8h",
    priority: "normal",
    blocked: true,
  },
];

export interface InstalledApp {
  id: string;
  name: string;
  color: string;
  icon: string;
  status: "allow" | "block" | "priority";
  count: number;
}

export const installedApps: InstalledApp[] = [
  { id: "a1", name: "WhatsApp", color: "#25D366", icon: "W", status: "priority", count: 184 },
  { id: "a2", name: "Gmail", color: "#D93025", icon: "G", status: "allow", count: 92 },
  { id: "a3", name: "Slack", color: "#4A154B", icon: "S", status: "priority", count: 71 },
  { id: "a4", name: "Calendar", color: "#1A7A6E", icon: "C", status: "priority", count: 24 },
  { id: "a5", name: "Instagram", color: "#E1306C", icon: "I", status: "block", count: 218 },
  { id: "a6", name: "Twitter", color: "#1DA1F2", icon: "T", status: "block", count: 156 },
  { id: "a7", name: "Spotify", color: "#1DB954", icon: "S", status: "block", count: 43 },
  { id: "a8", name: "Linear", color: "#5E6AD2", icon: "L", status: "allow", count: 38 },
  { id: "a9", name: "Uber", color: "#000000", icon: "U", status: "allow", count: 12 },
  { id: "a10", name: "HDFC Bank", color: "#0E5BA8", icon: "H", status: "priority", count: 9 },
];

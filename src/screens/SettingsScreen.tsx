import { useState } from "react";
import { Sun, Moon, Monitor, X, Plus, Sparkles, Briefcase, Coffee, Focus } from "lucide-react";
import { AppIcon } from "@/components/AppIcon";
import { useTheme, ThemeMode } from "@/components/ThemeProvider";
import { installedApps, InstalledApp } from "@/lib/mockData";
import { cn } from "@/lib/utils";

type AppStatus = InstalledApp["status"];
const statusMeta: Record<AppStatus, { label: string; cls: string }> = {
  allow: { label: "Allow", cls: "text-foreground bg-muted" },
  block: { label: "Block", cls: "text-destructive bg-destructive/10" },
  priority: { label: "Priority", cls: "text-primary bg-primary/12" },
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-2">
    <h2 className="px-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
      {title}
    </h2>
    <div className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden">
      {children}
    </div>
  </section>
);

export const SettingsScreen = () => {
  const { mode, setMode } = useTheme();
  const [apps, setApps] = useState(installedApps);
  const [highKeywords, setHighKeywords] = useState(["OTP", "urgent", "meeting", "invoice"]);
  const [lowKeywords, setLowKeywords] = useState(["promo", "sale", "newsletter"]);
  const [newKeyword, setNewKeyword] = useState("");
  const [keywordType, setKeywordType] = useState<"high" | "low">("high");
  const [activeMode, setActiveMode] = useState("focus");
  const [aiEnabled, setAiEnabled] = useState(true);
  const [automation, setAutomation] = useState<"manual" | "smart" | "auto">("smart");

  const cycleStatus = (id: string) => {
    setApps((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        const order: AppStatus[] = ["allow", "priority", "block"];
        const next = order[(order.indexOf(a.status) + 1) % order.length];
        return { ...a, status: next };
      })
    );
  };

  const addKeyword = () => {
    if (!newKeyword.trim()) return;
    if (keywordType === "high") setHighKeywords([...highKeywords, newKeyword.trim()]);
    else setLowKeywords([...lowKeywords, newKeyword.trim()]);
    setNewKeyword("");
  };

  const themeOptions: { id: ThemeMode; label: string; Icon: typeof Sun }[] = [
    { id: "light", label: "Light", Icon: Sun },
    { id: "dark", label: "Dark", Icon: Moon },
    { id: "system", label: "System", Icon: Monitor },
  ];

  const modes = [
    { id: "focus", label: "Focus", desc: "Only critical", Icon: Focus, color: "text-primary" },
    { id: "work", label: "Work", desc: "Work apps only", Icon: Briefcase, color: "text-ai" },
    { id: "chill", label: "Chill", desc: "Everything in", Icon: Coffee, color: "text-warning" },
  ];

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-20 bg-primary px-5 pt-5 pb-4 border-b border-primary-dark">
        <h1 className="font-display text-[26px] font-extrabold tracking-tight text-primary-foreground">Settings</h1>
        <p className="mt-1 text-[13px] text-primary-foreground/75">Personalize how Attain behaves</p>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-hidden px-4 py-4 space-y-5">
        {/* Modes */}
        <Section title="Mode">
          <div className="grid grid-cols-3 gap-2 p-2">
            {modes.map((m) => {
              const active = activeMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveMode(m.id)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl p-3 transition-all active:scale-95",
                    active ? "bg-primary/10 ring-1 ring-primary/30" : "hover:bg-muted"
                  )}
                >
                  <m.Icon className={cn("h-5 w-5", active ? "text-primary" : m.color)} strokeWidth={2.2} />
                  <span className={cn("text-[13px] font-semibold", active && "text-primary")}>
                    {m.label}
                  </span>
                  <span className="text-[10.5px] text-muted-foreground text-center leading-tight">
                    {m.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </Section>

        {/* Theme */}
        <Section title="Theme">
          <div className="grid grid-cols-3 gap-2 p-2">
            {themeOptions.map((o) => {
              const active = mode === o.id;
              return (
                <button
                  key={o.id}
                  onClick={() => setMode(o.id)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl p-3 transition-all active:scale-95",
                    active ? "bg-primary/10 ring-1 ring-primary/30" : "hover:bg-muted"
                  )}
                >
                  <o.Icon className={cn("h-5 w-5", active ? "text-primary" : "text-muted-foreground")} strokeWidth={2.2} />
                  <span className={cn("text-[13px] font-semibold", active && "text-primary")}>
                    {o.label}
                  </span>
                </button>
              );
            })}
          </div>
        </Section>

        {/* App Control */}
        <Section title="App Control">
          <div className="divide-y divide-border">
            {apps.slice(0, 6).map((a) => (
              <div key={a.id} className="flex items-center gap-3 p-3">
                <AppIcon letter={a.icon} color={a.color} size={36} />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[14px] truncate">{a.name}</p>
                  <p className="text-[12px] text-muted-foreground">{a.count} this week</p>
                </div>
                <button
                  onClick={() => cycleStatus(a.id)}
                  className={cn(
                    "rounded-full px-3 py-1 text-[12px] font-semibold transition-all active:scale-95",
                    statusMeta[a.status].cls
                  )}
                >
                  {statusMeta[a.status].label}
                </button>
              </div>
            ))}
            <button className="w-full p-3 text-[13px] font-semibold text-primary hover:bg-muted/50 transition-colors">
              View all {apps.length} apps
            </button>
          </div>
        </Section>

        {/* Keywords */}
        <Section title="Keywords">
          <div className="p-4 space-y-4">
            <div>
              <p className="text-[12px] font-semibold text-muted-foreground mb-2">High priority</p>
              <div className="flex flex-wrap gap-1.5">
                {highKeywords.map((k) => (
                  <span
                    key={k}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2.5 py-1 text-[12px] font-semibold animate-scale-in"
                  >
                    {k}
                    <button
                      onClick={() => setHighKeywords(highKeywords.filter((x) => x !== k))}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[12px] font-semibold text-muted-foreground mb-2">Low priority</p>
              <div className="flex flex-wrap gap-1.5">
                {lowKeywords.map((k) => (
                  <span
                    key={k}
                    className="inline-flex items-center gap-1 rounded-full bg-muted text-muted-foreground px-2.5 py-1 text-[12px] font-semibold animate-scale-in"
                  >
                    {k}
                    <button
                      onClick={() => setLowKeywords(lowKeywords.filter((x) => x !== k))}
                      className="hover:bg-foreground/10 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <div className="flex rounded-lg border border-border p-0.5">
                {(["high", "low"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setKeywordType(t)}
                    className={cn(
                      "rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors capitalize",
                      keywordType === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                placeholder="Add keyword..."
                className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-[13px] outline-none focus:border-primary/50"
              />
              <button
                onClick={addKeyword}
                className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground active:scale-95 transition-transform"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Section>

        {/* AI & Automation */}
        <Section title="AI & Automation">
          <div className="divide-y divide-border">
            <div className="flex items-center gap-3 p-3.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-ai text-ai-foreground">
                <Sparkles className="h-4 w-4" strokeWidth={2.2} />
              </span>
              <div className="flex-1">
                <p className="font-semibold text-[14px]">Enable AI</p>
                <p className="text-[12px] text-muted-foreground">Smart classification & summaries</p>
              </div>
              <button
                onClick={() => setAiEnabled(!aiEnabled)}
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors",
                  aiEnabled ? "bg-primary" : "bg-muted-foreground/30"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-soft transition-transform",
                    aiEnabled ? "translate-x-5" : "translate-x-0.5"
                  )}
                />
              </button>
            </div>

            <div className="p-3.5">
              <p className="font-semibold text-[14px] mb-2.5">Automation mode</p>
              <div className="grid grid-cols-3 gap-1.5">
                {(["manual", "smart", "auto"] as const).map((a) => {
                  const active = automation === a;
                  const labels = { manual: "Manual", smart: "Smart Assist", auto: "Full Auto" };
                  return (
                    <button
                      key={a}
                      onClick={() => setAutomation(a)}
                      className={cn(
                        "rounded-xl border p-2.5 text-[12px] font-semibold transition-all active:scale-95",
                        active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/30"
                      )}
                    >
                      {labels[a]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Section>

        <p className="text-center text-[11px] text-muted-foreground pt-2 pb-1">
          Attain v1.0 • Made for focus
        </p>
      </div>
    </div>
  );
};

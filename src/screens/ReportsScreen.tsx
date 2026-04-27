import { useState } from "react";
import { Bell, Clock, Flame, TrendingUp, Sparkles, ArrowUp, ChevronRight } from "lucide-react";
import { AppIcon } from "@/components/AppIcon";
import { cn } from "@/lib/utils";

const stats = [
  { id: "1", label: "Processed", value: "1,284", delta: "+12%", Icon: Bell, gradient: "bg-gradient-stat-teal", iconColor: "text-primary" },
  { id: "2", label: "Time saved", value: "3h 42m", delta: "+18%", Icon: Clock, gradient: "bg-gradient-stat-violet", iconColor: "text-ai" },
  { id: "3", label: "Important", value: "47", delta: "+4", Icon: Flame, gradient: "bg-gradient-stat-amber", iconColor: "text-warning" },
  { id: "4", label: "Blocked", value: "612", delta: "-8%", Icon: TrendingUp, gradient: "bg-gradient-stat-rose", iconColor: "text-destructive" },
];

const insights = [
  { title: "Most distracting app", value: "Instagram", detail: "218 notifications this week", color: "#E1306C", icon: "I" },
  { title: "Most important source", value: "Slack", detail: "71 notifications, 89% acted on", color: "#4A154B", icon: "S" },
  { title: "Peak notification hour", value: "2:00 PM", detail: "Avg 38 notifications/hr", color: "#1A7A6E", icon: "🕒" },
];

const suggestions = ["Summarize today", "What did I miss?", "Show important tasks"];

interface AIResponse {
  query: string;
  summary: string;
  highlights: { label: string; value: string }[];
  bullets: string[];
}

const mockResponses: Record<string, AIResponse> = {
  "Summarize today": {
    query: "Summarize today",
    summary: "You received 184 notifications today. 12 were marked important, 47 were blocked.",
    highlights: [
      { label: "Top sender", value: "Slack (24)" },
      { label: "Action needed", value: "3 items" },
    ],
    bullets: [
      "Standup meeting at 10:00 AM — attended",
      "Invoice from Linear processed ($48.00)",
      "Mom asked about dinner — pending reply",
      "OTP from HDFC for ₹12,400 transaction",
    ],
  },
};

export const ReportsScreen = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<AIResponse | null>(null);

  const ask = (q: string) => {
    setInput("");
    setResponse(mockResponses[q] || mockResponses["Summarize today"]);
  };

  return (
    <div className="flex h-full flex-col">
      <header className="glass sticky top-0 z-20 px-5 pt-5 pb-4 border-b border-border/60">
        <h1 className="font-display text-[26px] font-extrabold tracking-tight">Reports</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">Last 7 days • Updated just now</p>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-hidden px-4 pt-4 pb-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div
              key={s.id}
              className={cn(
                "relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-soft animate-fade-in"
              )}
            >
              <div className={cn("absolute inset-0", s.gradient)} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className={cn("grid h-8 w-8 place-items-center rounded-lg bg-card/70 backdrop-blur", s.iconColor)}>
                    <s.Icon className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <span className="flex items-center gap-0.5 text-[11px] font-semibold text-success">
                    <ArrowUp className="h-3 w-3" />
                    {s.delta}
                  </span>
                </div>
                <p className="mt-3 font-display text-2xl font-extrabold tracking-tight">{s.value}</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Insights */}
        <section>
          <h2 className="px-1 mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Insights
          </h2>
          <div className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden divide-y divide-border">
            {insights.map((i) => (
              <button
                key={i.title}
                className="flex w-full items-center gap-3 p-3.5 transition-colors hover:bg-muted/50 active:bg-muted"
              >
                <AppIcon letter={i.icon} color={i.color} size={38} />
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {i.title}
                  </p>
                  <p className="font-semibold text-foreground">{i.value}</p>
                  <p className="text-[12px] text-muted-foreground truncate">{i.detail}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </button>
            ))}
          </div>
        </section>

        {/* AI Response */}
        {response && (
          <section className="animate-scale-in">
            <div className="rounded-2xl border border-ai/20 bg-card shadow-card overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-ai text-ai-foreground">
                <Sparkles className="h-4 w-4" />
                <span className="text-[12px] font-semibold tracking-wide">ATTAIN AI</span>
              </div>
              <div className="p-4 space-y-3">
                <p className="text-[14px] leading-relaxed text-foreground">{response.summary}</p>
                <div className="grid grid-cols-2 gap-2">
                  {response.highlights.map((h) => (
                    <div key={h.label} className="rounded-xl surface-alt p-2.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {h.label}
                      </p>
                      <p className="font-semibold text-foreground text-sm mt-0.5">{h.value}</p>
                    </div>
                  ))}
                </div>
                <ul className="space-y-1.5 pt-1">
                  {response.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-[13.5px] text-foreground/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ai" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* AI Input panel */}
      <div className="glass border-t border-border px-4 pt-3 pb-3 space-y-2.5">
        <div className="flex gap-2 overflow-x-auto scrollbar-hidden -mx-4 px-4">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => ask(s)}
              className="shrink-0 rounded-full border border-ai/30 bg-ai/5 px-3 py-1.5 text-[12.5px] font-medium text-ai transition-all hover:bg-ai/10 active:scale-95"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) ask(input.trim());
          }}
          className="flex items-center gap-2 rounded-2xl border border-border bg-card p-1.5 pl-4 shadow-soft focus-within:border-ai/50 focus-within:shadow-glow transition-all"
        >
          <Sparkles className="h-4 w-4 text-ai shrink-0" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Attain anything..."
            className="flex-1 bg-transparent py-2 text-[14px] outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-ai text-ai-foreground shadow-soft active:scale-95 transition-transform"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2.4} />
          </button>
        </form>
      </div>
    </div>
  );
};

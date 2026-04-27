import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { FilterChips } from "@/components/FilterChips";
import { NotificationRow } from "@/components/NotificationRow";
import { ActionSheet } from "@/components/ActionSheet";
import { mockNotifications, NotificationItem } from "@/lib/mockData";

export const InboxScreen = () => {
  const [filter, setFilter] = useState("all");
  const [sheetItem, setSheetItem] = useState<NotificationItem | null>(null);

  const visible = useMemo(() => {
    if (filter === "important") return mockNotifications.filter((n) => n.important || n.priority === "critical");
    if (filter === "blocked") return mockNotifications.filter((n) => n.blocked);
    return mockNotifications.filter((n) => !n.blocked);
  }, [filter]);

  const importantCount = mockNotifications.filter((n) => n.important || n.priority === "critical").length;

  const handleSmartAction = (item: NotificationItem) => {
    const messages: Record<string, string> = {
      copy_otp: `OTP ${item.otp} copied`,
      set_reminder: "Reminder set for 1 hour",
      add_calendar: "Added to calendar",
    };
    toast(messages[item.smartAction!] || "Done", {
      action: { label: "Undo", onClick: () => toast("Undone") },
    });
  };

  const handleSheetAction = (action: "allow" | "block" | "important") => {
    const labels = {
      allow: "Allowed always",
      block: "Blocked always",
      important: "Marked important",
    };
    toast(labels[action], {
      action: { label: "Undo", onClick: () => toast("Undone") },
    });
    setSheetItem(null);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Top Bar */}
      <header className="glass sticky top-0 z-20 px-5 pt-5 pb-3 border-b border-border/60">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-[26px] font-extrabold tracking-tight text-foreground leading-none">
              Attain
            </h1>
            <p className="mt-1.5 text-[13px] text-muted-foreground">
              <span className="font-semibold text-foreground">{importantCount}</span> need attention
            </p>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-gradient-ai shadow-glow text-ai-foreground active:scale-95 transition-transform">
            <Sparkles className="h-4.5 w-4.5" strokeWidth={2.2} />
          </button>
        </div>

        <div className="mt-4">
          <FilterChips
            value={filter}
            onChange={setFilter}
            options={[
              { id: "all", label: "All", count: mockNotifications.filter((n) => !n.blocked).length },
              { id: "important", label: "Important", count: importantCount },
              { id: "blocked", label: "Blocked", count: mockNotifications.filter((n) => n.blocked).length },
            ]}
          />
        </div>
      </header>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden px-4 py-3 space-y-2.5">
        {visible.length === 0 ? (
          <div className="grid h-full place-items-center text-center px-6">
            <div>
              <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <p className="font-semibold">All clear</p>
              <p className="text-sm text-muted-foreground mt-1">No notifications in this view.</p>
            </div>
          </div>
        ) : (
          visible.map((n) => (
            <NotificationRow
              key={n.id}
              item={n}
              onLongPress={setSheetItem}
              onSmartAction={handleSmartAction}
            />
          ))
        )}
        <div className="h-2" />
      </div>

      <ActionSheet item={sheetItem} onClose={() => setSheetItem(null)} onAction={handleSheetAction} />
    </div>
  );
};

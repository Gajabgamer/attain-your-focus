import { Check, Ban, Star, X } from "lucide-react";
import { AppIcon } from "./AppIcon";
import { NotificationItem } from "@/lib/mockData";
import { useEffect } from "react";

interface Props {
  item: NotificationItem | null;
  onClose: () => void;
  onAction: (action: "allow" | "block" | "important") => void;
}

export const ActionSheet = ({ item, onClose, onAction }: Props) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (item) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [item, onClose]);

  if (!item) return null;

  const actions = [
    { id: "allow" as const, label: "Allow always", Icon: Check, color: "text-success bg-success/10" },
    { id: "block" as const, label: "Block always", Icon: Ban, color: "text-destructive bg-destructive/10" },
    { id: "important" as const, label: "Mark important", Icon: Star, color: "text-warning bg-warning/10" },
  ];

  return (
    <div className="absolute inset-0 z-50 flex items-end animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-[2px]" />
      <div
        className="relative w-full rounded-t-3xl bg-card border-t border-border shadow-elevated p-5 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted-foreground/30" />

        <div className="flex items-center gap-3 mb-5">
          <AppIcon letter={item.appIcon} color={item.appColor} size={44} />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {item.app}
            </p>
            <p className="truncate font-semibold text-foreground">{item.title}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-1">
          {actions.map(({ id, label, Icon, color }) => (
            <button
              key={id}
              onClick={() => onAction(id)}
              className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all hover:bg-muted active:scale-[0.98]"
            >
              <span className={`grid h-9 w-9 place-items-center rounded-lg ${color}`}>
                <Icon className="h-4.5 w-4.5" strokeWidth={2.2} />
              </span>
              <span className="font-medium text-foreground">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

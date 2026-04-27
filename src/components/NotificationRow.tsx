import { useRef } from "react";
import { Copy, Bell, CalendarPlus } from "lucide-react";
import { AppIcon } from "./AppIcon";
import { NotificationItem, Priority } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface Props {
  item: NotificationItem;
  onLongPress: (item: NotificationItem) => void;
  onSmartAction: (item: NotificationItem) => void;
}

const priorityDot: Record<Priority, string> = {
  critical: "bg-destructive shadow-[0_0_0_3px_hsl(var(--destructive)/0.18)]",
  important: "bg-warning shadow-[0_0_0_3px_hsl(var(--warning)/0.18)]",
  normal: "bg-muted-foreground/40",
};

const smartActionMeta = {
  copy_otp: { label: "Copy OTP", Icon: Copy },
  set_reminder: { label: "Set reminder", Icon: Bell },
  add_calendar: { label: "Add to calendar", Icon: CalendarPlus },
};

export const NotificationRow = ({ item, onLongPress, onSmartAction }: Props) => {
  const timer = useRef<number | null>(null);

  const startPress = () => {
    timer.current = window.setTimeout(() => onLongPress(item), 450);
  };
  const cancelPress = () => {
    if (timer.current) window.clearTimeout(timer.current);
  };

  const meta = item.smartAction ? smartActionMeta[item.smartAction] : null;

  return (
    <article
      onMouseDown={startPress}
      onMouseUp={cancelPress}
      onMouseLeave={cancelPress}
      onTouchStart={startPress}
      onTouchEnd={cancelPress}
      className="group relative rounded-2xl bg-card border border-border p-3.5 shadow-soft transition-all duration-200 active:scale-[0.985] hover:shadow-card hover:border-primary/20 tap-highlight-none animate-fade-in"
    >
      <div className="flex gap-3">
        <AppIcon letter={item.appIcon} color={item.appColor} size={42} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {item.app}
                </span>
                {item.important && (
                  <span className="rounded-full bg-warning/15 px-1.5 py-0.5 text-[10px] font-semibold text-warning">
                    Important
                  </span>
                )}
              </div>
              <h3 className="mt-0.5 truncate text-[15px] font-semibold text-foreground">
                {item.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-muted-foreground tabular-nums">{item.time}</span>
              <span className={cn("h-2 w-2 rounded-full", priorityDot[item.priority])} />
            </div>
          </div>

          <p className="mt-1 line-clamp-2 text-[13.5px] leading-relaxed text-muted-foreground">
            {item.preview}
          </p>

          {meta && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSmartAction(item);
              }}
              className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1.5 text-[12.5px] font-semibold text-primary transition-all hover:bg-primary/15 active:scale-95"
            >
              <meta.Icon className="h-3.5 w-3.5" strokeWidth={2.4} />
              {meta.label}
              {item.otp && <span className="font-mono tracking-wider ml-0.5">{item.otp}</span>}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

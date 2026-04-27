import { Inbox, BarChart3, Settings as SettingsIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type Tab = "inbox" | "reports" | "settings";

interface BottomNavProps {
  active: Tab;
  onChange: (t: Tab) => void;
}

const items: { id: Tab; label: string; Icon: typeof Inbox }[] = [
  { id: "inbox", label: "Inbox", Icon: Inbox },
  { id: "reports", label: "Reports", Icon: BarChart3 },
  { id: "settings", label: "Settings", Icon: SettingsIcon },
];

export const BottomNav = ({ active, onChange }: BottomNavProps) => {
  return (
    <nav className="bg-primary border-t border-primary-dark px-2 pt-2 pb-3 tap-highlight-none">
      <ul className="flex items-center justify-around">
        {items.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <li key={id} className="flex-1">
              <button
                onClick={() => onChange(id)}
                className="group flex w-full flex-col items-center gap-1 py-1.5 transition-transform active:scale-95"
              >
                <span
                  className={cn(
                    "relative flex h-9 w-16 items-center justify-center rounded-full transition-all duration-300",
                    isActive ? "bg-primary-foreground/20" : "bg-transparent"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-colors duration-200",
                      isActive ? "text-primary-foreground" : "text-primary-foreground/65"
                    )}
                    strokeWidth={isActive ? 2.4 : 1.8}
                  />
                </span>
                <span
                  className={cn(
                    "text-[11px] font-medium tracking-wide transition-colors",
                    isActive ? "text-primary-foreground" : "text-primary-foreground/65"
                  )}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

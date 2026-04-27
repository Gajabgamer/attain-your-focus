import { cn } from "@/lib/utils";

interface FilterChipsProps {
  value: string;
  options: { id: string; label: string; count?: number }[];
  onChange: (id: string) => void;
}

export const FilterChips = ({ value, options, onChange }: FilterChipsProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hidden px-4 -mx-4">
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={cn(
              "relative flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-all duration-200 active:scale-95 tap-highlight-none",
              active
                ? "bg-primary text-primary-foreground border-primary shadow-glow"
                : "bg-card text-foreground border-border hover:border-primary/40"
            )}
          >
            {opt.label}
            {opt.count !== undefined && (
              <span
                className={cn(
                  "rounded-full px-1.5 text-[11px] font-semibold leading-tight py-0.5",
                  active ? "bg-primary-foreground/20" : "bg-muted text-muted-foreground"
                )}
              >
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

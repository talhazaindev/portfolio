import { cn } from "@/lib/cn";

type StatusLabelProps = {
  label: string;
  value: string;
  className?: string;
};

/** Sparse system-status brand detail. */
export function StatusLabel({ label, value, className }: StatusLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-secondary opacity-40 motion-reduce:animate-none" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-secondary" />
      </span>
      <span>
        {label} / <span className="text-foreground/80">{value}</span>
      </span>
    </span>
  );
}

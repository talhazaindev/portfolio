import { cn } from "@/lib/cn";

type SignalLineProps = {
  className?: string;
  /** Line grows toward the terminal node. */
  direction?: "right" | "left";
  /** Shorter rail for tight chrome (nav, labels). */
  compact?: boolean;
  /** Optional mono metadata — e.g. SIGNAL / 01 */
  label?: string;
  /** Hide the terminal node (rare). */
  showNode?: boolean;
};

/**
 * Brand primitive: SYSTEM → SIGNAL
 * Cyan/blue rail terminates in an amber attention node.
 * Use sparingly — navbar, portrait, section transitions, final CTA, footer.
 */
export function SignalLine({
  className,
  direction = "right",
  compact = false,
  label,
  showNode = true,
}: SignalLineProps) {
  const reverse = direction === "left";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2",
        reverse && "flex-row-reverse",
        className,
      )}
      aria-hidden={label ? undefined : true}
    >
      {label ? (
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          {label.includes("/") ? (
            <>
              <span className="text-signal">{label.split("/")[0]?.trim()}</span>
              <span className="text-muted"> / {label.split("/").slice(1).join("/").trim()}</span>
            </>
          ) : (
            label
          )}
        </span>
      ) : null}
      <span
        className={cn(
          "inline-flex items-center",
          reverse && "flex-row-reverse",
          compact ? "w-10 sm:w-14" : "w-16 sm:w-24",
        )}
      >
        <span
          className={cn(
            "h-px flex-1",
            reverse
              ? "bg-gradient-to-l from-transparent via-system-cyan/50 to-system-cyan/80"
              : "bg-gradient-to-r from-transparent via-system-cyan/50 to-system-cyan/80",
          )}
        />
        {showNode ? (
          <span
            className={cn(
              "relative shrink-0 rounded-full bg-signal",
              compact ? "h-[5px] w-[5px]" : "h-1.5 w-1.5",
              "shadow-[0_0_8px_rgba(255,181,71,0.45)]",
            )}
          />
        ) : null}
      </span>
    </div>
  );
}

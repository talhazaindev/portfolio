import Image from "next/image";
import { cn } from "@/lib/cn";

type BrandSignatureProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Kept for API compatibility — square TZ lockup already includes identity. */
  showWordmark?: boolean;
  compact?: boolean;
};

/** Square TZ logo sizes (1:1). */
const sizes = {
  sm: 32,
  md: 44,
  lg: 56,
} as const;

/**
 * Official Talha Zain logo (`/logo.png`) — square TZ systems mark.
 * Used in navigation, footer, favicon, and system chrome.
 */
export function BrandSignature({
  className,
  size = "sm",
  showWordmark = false,
}: BrandSignatureProps) {
  const px = sizes[size];

  return (
    <span className={cn("inline-flex items-center gap-2.5 leading-none", className)}>
      <Image
        src="/logo.png"
        alt={showWordmark ? "" : "Talha Zain — Applied AI Engineer"}
        width={px}
        height={px}
        priority={size !== "sm"}
        className="rounded-md object-cover"
        style={{ width: px, height: px }}
      />
      {showWordmark ? (
        <span className="flex flex-col">
          <span
            className={cn(
              "font-semibold tracking-tight text-foreground",
              size === "lg" ? "text-base" : "text-sm",
            )}
          >
            Talha Zain
          </span>
          <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Applied AI Engineer
          </span>
        </span>
      ) : null}
    </span>
  );
}

/** Alias for existing imports. */
export function LogoMark(props: BrandSignatureProps) {
  return <BrandSignature {...props} />;
}

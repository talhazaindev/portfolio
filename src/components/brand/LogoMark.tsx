import Image from "next/image";
import { cn } from "@/lib/cn";

type BrandSignatureProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Kept for API compatibility — logo2 lockup already includes name + title. */
  showWordmark?: boolean;
  compact?: boolean;
};

/**
 * Full TZ lockup sizes (`/logo2.png`).
 * Image has large internal padding — sizes are generous and we zoom so the mark reads clearly.
 */
const sizes = {
  sm: 48,
  md: 64,
  lg: 88,
} as const;

/**
 * Official Talha Zain logo (`/logo2.png`) — TZ mark + name lockup.
 * Used in navigation, footer, and system chrome.
 */
export function BrandSignature({
  className,
  size = "sm",
  showWordmark = false,
}: BrandSignatureProps) {
  const px = sizes[size];

  return (
    <span className={cn("inline-flex items-center gap-2.5 leading-none", className)}>
      <span
        className="relative inline-flex shrink-0 overflow-hidden rounded-md"
        style={{ width: px, height: px }}
      >
        <Image
          src="/logo2.png"
          alt={showWordmark ? "" : "Talha Zain — Applied AI Engineer"}
          width={px}
          height={px}
          priority={size !== "sm"}
          className="h-full w-full scale-[1.7] object-cover"
        />
      </span>
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

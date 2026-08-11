import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-system-navy text-breakout-text shadow-[var(--shadow-sm)] hover:bg-system-navy-deep",
  secondary:
    "bg-transparent text-ink border border-border-strong hover:border-system-navy/40 hover:bg-canvas-warm/60",
  ghost: "bg-transparent text-muted hover:text-ink hover:bg-canvas-warm/50",
};

const base =
  "focus-ring inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-[background-color,border-color,color,transform,box-shadow] duration-180 ease-out active:scale-[0.98]";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  "aria-label"?: string;
};

/** Brand button — navy primary, restrained secondary. */
export function Button({
  children,
  className,
  variant = "primary",
  href,
  external,
  type = "button",
  disabled,
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    const isExternal = external ?? /^https?:\/\//.test(href);
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        aria-label={ariaLabel}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

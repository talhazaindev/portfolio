"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/brand/LogoMark";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { primaryNav } from "@/components/navigation/nav-config";
import { social } from "@/data/social";
import { AnalyticsEvents, track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

/** Premium desktop + mobile navigation with minimized floating state. */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[padding,background-color,border-color,backdrop-filter] duration-300",
          compact
            ? "border-b border-border/80 bg-background/80 py-2 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-4",
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link href="/" className="focus-ring rounded-md" aria-label="Talha Zain — Home">
            <LogoMark showWordmark size="md" />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring text-sm text-muted transition-colors duration-180 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            {social.github ? (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring text-sm text-muted transition-colors hover:text-foreground"
                onClick={() => track(AnalyticsEvents.githubClick, { source: "nav" })}
              >
                GitHub
              </a>
            ) : null}
            <Magnetic>
              <Button href="/contact" variant="primary">
                Let&apos;s Talk
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Button>
            </Magnetic>
          </div>

          <button
            type="button"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-40 bg-background/95 px-5 pt-24 backdrop-blur-xl transition-[opacity,transform] duration-300 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="focus-ring rounded-md border border-border/60 bg-surface/50 px-4 py-4 text-lg text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 grid gap-2">
            <Button href="/contact" onClick={() => setOpen(false)}>
              Let&apos;s Talk
            </Button>
            {social.github ? (
              <Button href={social.github} variant="secondary" external>
                GitHub
              </Button>
            ) : null}
            <Button href={social.linkedin} variant="ghost" external>
              LinkedIn
            </Button>
          </div>
          <p className="mono-label mt-8">Press Ctrl K for commands</p>
        </nav>
      </div>
    </>
  );
}

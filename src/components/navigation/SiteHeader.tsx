"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Command } from "lucide-react";
import { primaryNav } from "@/components/navigation/nav-config";
import { social } from "@/data/social";
import { AnalyticsEvents, track } from "@/lib/analytics";
import { motionTiers } from "@/lib/motion";
import { cn } from "@/lib/cn";

const OPEN_COMMAND_EVENT = "tz:open-command-palette";

function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_COMMAND_EVENT));
}

function subscribeNoop() {
  return () => {};
}

function getIsMacSnapshot() {
  return /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
}

function isNavActive(pathname: string, href: string) {
  if (href === "/work") return pathname === "/work" || pathname.startsWith("/work/");
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Floating command-deck navigation — Intelligent Systems chrome. */
export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openedAtPath, setOpenedAtPath] = useState(pathname);
  const [compact, setCompact] = useState(false);
  const isMac = useSyncExternalStore(subscribeNoop, getIsMacSnapshot, () => false);
  const open = menuOpen && openedAtPath === pathname;

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 36);
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

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function toggleMenu() {
    setOpenedAtPath(pathname);
    setMenuOpen((value) => !value);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  const activeIndex = primaryNav.findIndex((item) => isNavActive(pathname, item.href));

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="pointer-events-auto mx-auto max-w-[1220px] px-3 sm:px-4 lg:px-5">
          <div
            className={cn(
              "relative overflow-hidden rounded-[16px] border border-border/80",
              "bg-[color-mix(in_oklab,var(--background-elevated)_84%,transparent)]",
              "shadow-[0_0_0_1px_rgba(148,173,204,0.04),0_12px_40px_rgba(0,0,0,0.38)]",
              "backdrop-blur-md backdrop-saturate-125",
              "transition-[margin,padding,box-shadow] duration-300 ease-out",
              compact
                ? "mt-2 shadow-[0_0_0_1px_rgba(148,173,204,0.06),0_10px_28px_rgba(0,0,0,0.45)]"
                : "mt-3 sm:mt-4",
            )}
          >
            {/* Subtle system rail */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-4 top-[1px] flex h-px items-center sm:inset-x-6"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border/40" />
              <div className="mx-3 flex w-40 items-center justify-between sm:mx-5 sm:w-52">
                {primaryNav.map((item, index) => {
                  const active = index === activeIndex;
                  return (
                    <span
                      key={item.href}
                      className={cn(
                        "block h-[3px] w-[3px] rounded-full transition-[background-color,box-shadow] duration-300",
                        active
                          ? "bg-accent-secondary shadow-[0_0_8px_rgba(103,232,249,0.55)]"
                          : "bg-[rgba(148,173,204,0.35)]",
                      )}
                    />
                  );
                })}
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border/40" />
            </div>

            <div
              className={cn(
                "flex items-center justify-between gap-3 px-3.5 transition-[padding] duration-300 sm:px-4 lg:px-5",
                compact ? "py-2 sm:py-2.5" : "py-2.5 sm:py-3",
              )}
            >
              <Link
                href="/"
                className="focus-ring flex min-w-0 shrink-0 items-center gap-2.5 rounded-md"
                aria-label="Talha Zain — Home"
              >
                <Image
                  src="/logo.png"
                  alt=""
                  width={28}
                  height={28}
                  priority
                  className="h-7 w-7 rounded-[7px] object-cover"
                />
                <span className="flex min-w-0 flex-col leading-none">
                  <span className="truncate text-[13px] font-semibold tracking-tight text-foreground sm:text-sm">
                    Talha Zain
                  </span>
                  <span className="mt-1 hidden font-mono text-[9px] uppercase tracking-[0.16em] text-muted sm:block">
                    Applied AI
                  </span>
                </span>
              </Link>

              <nav
                className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 lg:flex"
                aria-label="Primary"
              >
                {primaryNav.map((item) => {
                  const active = isNavActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "focus-ring relative rounded-md px-3.5 py-2 text-[13px] transition-colors duration-180",
                        active ? "text-foreground" : "text-muted hover:text-foreground",
                      )}
                    >
                      {active ? (
                        <motion.span
                          layoutId={reduce ? undefined : "nav-active-node"}
                          className="absolute inset-x-3 -bottom-[1px] flex h-3 items-end justify-center"
                          transition={motionTiers.functional}
                          aria-hidden
                        >
                          <span className="h-px w-full max-w-[2rem] bg-gradient-to-r from-transparent via-accent-secondary/70 to-transparent" />
                          <span className="absolute bottom-0 left-1/2 h-[5px] w-[5px] -translate-x-1/2 translate-y-[3px] rounded-full bg-accent-secondary shadow-[0_0_10px_rgba(103,232,249,0.45)]" />
                        </motion.span>
                      ) : null}
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <span
                  className="hidden h-1.5 w-1.5 rounded-full bg-accent-secondary lg:inline-block xl:hidden"
                  title="Mode / Production"
                  aria-label="Mode Production"
                />
                <span className="mr-1 hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted xl:inline-flex">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full bg-accent-secondary",
                      !reduce && "shadow-[0_0_6px_rgba(103,232,249,0.5)]",
                    )}
                    aria-hidden
                  />
                  <span>
                    Mode / <span className="text-foreground/85">Production</span>
                  </span>
                </span>

                <button
                  type="button"
                  onClick={openCommandPalette}
                  className="focus-ring hidden items-center gap-1.5 rounded-md border border-border/70 bg-background/35 px-2 py-1.5 text-muted transition-colors duration-180 hover:border-border-strong hover:text-foreground md:inline-flex"
                  aria-label="Open command palette"
                >
                  <Command className="h-3.5 w-3.5" aria-hidden />
                  <kbd className="font-mono text-[10px] tracking-wide">
                    {isMac ? "⌘K" : "Ctrl K"}
                  </kbd>
                </button>

                {social.github ? (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring hidden items-center gap-1 rounded-md px-2 py-1.5 text-[13px] text-muted transition-colors duration-180 hover:text-foreground lg:inline-flex"
                    onClick={() => track(AnalyticsEvents.githubClick, { source: "nav" })}
                  >
                    GitHub
                    <ArrowUpRight className="h-3 w-3 opacity-70" aria-hidden />
                  </a>
                ) : null}

                <Link
                  href="/contact"
                  className={cn(
                    "focus-ring group/cta relative hidden overflow-hidden rounded-md border border-border-strong",
                    "bg-transparent px-3.5 py-2 text-[13px] font-medium text-foreground",
                    "transition-[background-color,border-color,color,transform] duration-200 ease-out",
                    "hover:border-accent hover:bg-accent hover:text-white",
                    "active:scale-[0.98] lg:inline-flex lg:items-center lg:gap-1.5",
                  )}
                >
                  Let&apos;s Talk
                  <ArrowUpRight
                    className="h-3.5 w-3.5 opacity-80 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>

                <button
                  type="button"
                  className="focus-ring inline-flex h-9 items-center gap-2 rounded-md border border-border/80 bg-background/30 px-3 text-[12px] font-medium text-foreground lg:hidden"
                  aria-expanded={open}
                  aria-controls="mobile-command-nav"
                  aria-label={open ? "Close menu" : "Open menu"}
                  onClick={toggleMenu}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {open ? "Close" : "Menu"}
                  </span>
                  <span className="relative flex h-3 w-3.5 flex-col justify-center gap-[3px]" aria-hidden>
                    <span
                      className={cn(
                        "h-px w-full bg-foreground transition-transform duration-200",
                        open && "translate-y-[4px] rotate-45",
                      )}
                    />
                    <span
                      className={cn(
                        "h-px w-full bg-foreground transition-opacity duration-200",
                        open && "opacity-0",
                      )}
                    />
                    <span
                      className={cn(
                        "h-px w-full bg-foreground transition-transform duration-200",
                        open && "-translate-y-[4px] -rotate-45",
                      )}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-command-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={motionTiers.interface}
            className="fixed inset-0 z-40 flex flex-col bg-[#070b12]/97 px-5 pb-8 pt-24 backdrop-blur-md lg:hidden"
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: 8 }}
              transition={motionTiers.interface}
              className="mx-auto flex w-full max-w-lg flex-1 flex-col"
            >
              <div className="mb-8 flex items-center justify-between border-b border-border/70 pb-4">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-secondary" aria-hidden />
                  Mode / <span className="text-foreground/85">Production</span>
                </span>
                <button
                  type="button"
                  className="focus-ring rounded-md border border-border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
                  onClick={() => {
                    closeMenu();
                    openCommandPalette();
                  }}
                >
                  {isMac ? "⌘K" : "Ctrl K"}
                </button>
              </div>

              <nav className="flex flex-col" aria-label="Mobile">
                {primaryNav.map((item, index) => {
                  const active = isNavActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "focus-ring group flex items-baseline justify-between gap-4 border-b border-border/60 py-5",
                        active ? "text-foreground" : "text-foreground/90",
                      )}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[11px] tracking-[0.14em] text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[1.75rem] tracking-tight sm:text-[2rem]">
                          {item.label}
                        </span>
                      </span>
                      {active ? (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-accent-secondary shadow-[0_0_8px_rgba(103,232,249,0.5)]"
                          aria-hidden
                        />
                      ) : (
                        <ArrowUpRight
                          className="h-4 w-4 text-muted opacity-40 transition-opacity group-hover:opacity-100"
                          aria-hidden
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto space-y-1 pt-10">
                {social.github ? (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      track(AnalyticsEvents.githubClick, { source: "nav_mobile" });
                      closeMenu();
                    }}
                    className="focus-ring flex items-center justify-between border-b border-border/50 py-3.5 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    GitHub
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                ) : null}
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    track(AnalyticsEvents.linkedinClick, { source: "nav_mobile" });
                    closeMenu();
                  }}
                  className="focus-ring flex items-center justify-between border-b border-border/50 py-3.5 text-sm text-muted transition-colors hover:text-foreground"
                >
                  LinkedIn
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className={cn(
                    "focus-ring mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border-strong",
                    "bg-transparent px-4 py-3.5 text-sm font-medium text-foreground",
                    "transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-white",
                  )}
                >
                  Let&apos;s Talk
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { getCaseStudyProjects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { social } from "@/data/social";
import { AnalyticsEvents, track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type Command = {
  id: string;
  label: string;
  hint?: string;
  keywords?: string;
  run: () => void;
};

/** Keyboard command interface (Ctrl/⌘ K). */
export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [systemStatus, setSystemStatus] = useState(false);
  const [active, setActive] = useState(0);

  const commands = useMemo<Command[]>(() => {
    const projectCommands = getCaseStudyProjects().map((project) => ({
      id: project.slug,
      label: project.name,
      hint: "Case study",
      keywords: `${project.categories.join(" ")} ${project.domains.join(" ")}`,
      run: () => router.push(`/work/${project.slug}`),
    }));

    return [
      {
        id: "systems",
        label: "Explore Systems",
        hint: "Navigate",
        keywords: "work portfolio",
        run: () => router.push("/work"),
      },
      ...projectCommands,
      {
        id: "architecture",
        label: "View Architecture",
        hint: "Navigate",
        keywords: "capability graph systems",
        run: () => router.push("/#capabilities"),
      },
      {
        id: "experience",
        label: "Experience",
        hint: "Navigate",
        run: () => router.push("/experience"),
      },
      {
        id: "capabilities",
        label: "Capabilities",
        hint: "Navigate",
        run: () => router.push("/#capabilities"),
      },
      {
        id: "about",
        label: "About Talha",
        hint: "Navigate",
        run: () => router.push("/about"),
      },
      {
        id: "contact",
        label: "Email Talha",
        hint: "Contact",
        run: () => {
          track(AnalyticsEvents.emailClick, { source: "command_palette" });
          window.location.href = `mailto:${social.email}`;
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        hint: "External",
        run: () => {
          track(AnalyticsEvents.linkedinClick, { source: "command_palette" });
          window.open(social.linkedin, "_blank", "noopener,noreferrer");
        },
      },
      ...(social.github
        ? [
            {
              id: "github",
              label: "GitHub",
              hint: "External",
              run: () => {
                track(AnalyticsEvents.githubClick, { source: "command_palette" });
                window.open(social.github!, "_blank", "noopener,noreferrer");
              },
            },
          ]
        : []),
      ...(social.resumePath
        ? [
            {
              id: "resume",
              label: "Download Résumé",
              hint: "PDF",
              run: () => {
                track(AnalyticsEvents.resumeClick, { source: "command_palette" });
                window.open(social.resumePath!, "_blank", "noopener,noreferrer");
              },
            },
          ]
        : []),
      {
        id: "system-status",
        label: "system status",
        hint: "Brand",
        keywords: "status focus agentic",
        run: () => setSystemStatus(true),
      },
    ];
  }, [router]);

  const filtered = commands.filter((command) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      command.label.toLowerCase().includes(q) ||
      command.hint?.toLowerCase().includes(q) ||
      command.keywords?.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    function openPalette() {
      setOpen(true);
      setQuery("");
      setActive(0);
      setSystemStatus(false);
    }

    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
        setQuery("");
        setActive(0);
        setSystemStatus(false);
      }
      if (event.key === "Escape") {
        setOpen(false);
        setSystemStatus(false);
      }
    }

    function onOpenEvent() {
      openPalette();
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener("tz:open-command-palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("tz:open-command-palette", onOpenEvent);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div className="w-full max-w-xl overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted" aria-hidden />
          <input
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActive((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              }
              if (event.key === "Enter" && filtered[active]) {
                filtered[active].run();
                if (filtered[active].id !== "system-status") setOpen(false);
              }
            }}
            placeholder="Jump to systems, about, GitHub…"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
            aria-label="Command search"
          />
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted sm:inline">
            ESC
          </kbd>
        </div>

        {systemStatus ? (
          <div className="space-y-4 p-5 text-sm">
            <div>
              <p className="font-medium tracking-tight text-foreground">{siteConfig.name}</p>
              <p className="mono-label mt-1">{siteConfig.role}</p>
            </div>
            <div>
              <p className="mono-label mb-2">Focus</p>
              <ul className="space-y-1 text-muted">
                {siteConfig.specialties.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className="focus-ring mt-2 text-accent-secondary"
              onClick={() => setSystemStatus(false)}
            >
              Back to commands
            </button>
          </div>
        ) : (
          <ul className="max-h-80 overflow-auto p-2" role="listbox">
            {filtered.length === 0 ? (
              <li className="px-3 py-6 text-center text-sm text-muted">No matches.</li>
            ) : (
              filtered.map((command, index) => (
                <li key={command.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={index === active}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-colors duration-150",
                      index === active
                        ? "bg-accent-soft text-foreground"
                        : "text-muted hover:bg-white/5 hover:text-foreground",
                    )}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => {
                      command.run();
                      if (command.id !== "system-status") setOpen(false);
                    }}
                  >
                    <span>{command.label}</span>
                    {command.hint ? (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                        {command.hint}
                      </span>
                    ) : null}
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
import { LogoMark } from "@/components/brand/LogoMark";
import { SignalLine } from "@/components/brand/SignalLine";
import { Container } from "@/components/ui/Container";
import { social } from "@/data/social";
import { siteConfig } from "@/data/site";

/** Closing brand strip — system online → signal. */
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-canvas-soft/60 py-12">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
              System online
            </span>
            <SignalLine />
          </div>
          <LogoMark size="lg" />
          <p className="mt-4 max-w-sm text-sm text-ink-secondary">
            Designed as a living record of systems shipped.
          </p>
          <p className="mono-label mt-6 !text-system-navy">
            {siteConfig.name} / {siteConfig.role}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-muted">
          <Link href="/work" className="focus-ring hover:text-ink-strong">
            Systems
          </Link>
          <Link href="/experience" className="focus-ring hover:text-ink-strong">
            Experience
          </Link>
          <Link href="/about" className="focus-ring hover:text-ink-strong">
            About
          </Link>
          <Link href="/contact" className="focus-ring hover:text-ink-strong">
            Contact
          </Link>
          <a
            href={`mailto:${social.email}`}
            className="focus-ring hover:text-ink-strong"
          >
            Email
          </a>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring hover:text-ink-strong"
          >
            LinkedIn
          </a>
          {social.github ? (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring hover:text-ink-strong"
            >
              GitHub
            </a>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}

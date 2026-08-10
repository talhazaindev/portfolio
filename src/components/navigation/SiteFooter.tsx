import Link from "next/link";
import { LogoMark } from "@/components/brand/LogoMark";
import { Container } from "@/components/ui/Container";
import { social } from "@/data/social";
import { siteConfig } from "@/data/site";

/** Closing brand strip — no emoji, no generic “made with”. */
export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <LogoMark showWordmark size="lg" />
          <p className="mt-4 max-w-sm text-sm text-muted">
            Designed as a living record of systems shipped.
          </p>
          <p className="mono-label mt-6">
            {siteConfig.name} / {siteConfig.role}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <Link href="/work" className="focus-ring hover:text-foreground">
            Work
          </Link>
          <Link href="/experience" className="focus-ring hover:text-foreground">
            Experience
          </Link>
          <Link href="/about" className="focus-ring hover:text-foreground">
            About
          </Link>
          <Link href="/contact" className="focus-ring hover:text-foreground">
            Contact
          </Link>
          <a
            href={`mailto:${social.email}`}
            className="focus-ring hover:text-foreground"
          >
            Email
          </a>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring hover:text-foreground"
          >
            LinkedIn
          </a>
          {social.github ? (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring hover:text-foreground"
            >
              GitHub
            </a>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}

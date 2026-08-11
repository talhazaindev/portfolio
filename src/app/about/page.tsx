import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { certifications, education, siteConfig } from "@/data/site";
import { social } from "@/data/social";
import { createMetadata } from "@/lib/seo";
import { TrackLink } from "@/components/analytics/TrackLink";
import { AnalyticsEvents } from "@/lib/analytics";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Talha Zain — Applied AI Engineer focused on agentic AI, LLM systems, RAG, and production AI engineering.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <Container>
        <p className="mono-label mb-8">About / 01</p>

        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden sm:max-w-md lg:mx-0 lg:max-w-none">
            <Image
              src="/images/talha-zain-portrait.webp"
              alt="Portrait of Talha Zain, Applied AI Engineer"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 38vw"
              quality={85}
              className="object-cover object-[50%_18%]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-background/40 opacity-0 lg:opacity-80"
            />
          </div>

          <div className="max-w-xl">
            <h1 className="section-display text-balance">
              AI engineering is not
              <br />
              about calling a model.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              I focus on the systems surrounding the model — retrieval, orchestration, state,
              tools, data, evaluation, reliability, APIs and deployment.
            </p>

            <section className="mt-10" aria-labelledby="current-focus">
              <h2 id="current-focus" className="mono-label mb-3">
                Current focus
              </h2>
              <ul className="flex flex-wrap gap-2">
                {siteConfig.specialties.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-surface/50 px-3 py-1.5 text-sm text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <aside
              className="mt-10 rounded-[var(--radius-md)] border border-border bg-surface/40 p-5"
              aria-label="Currently"
            >
              <p className="mono-label mb-4">Currently / 2026</p>
              <dl className="space-y-3 text-sm">
                <div className="grid grid-cols-[6.5rem_1fr] gap-2">
                  <dt className="text-muted">Building</dt>
                  <dd className="text-foreground">Production agentic systems</dd>
                </div>
                <div className="grid grid-cols-[6.5rem_1fr] gap-2">
                  <dt className="text-muted">Exploring</dt>
                  <dd className="text-foreground">Evaluation-driven orchestration</dd>
                </div>
                <div className="grid grid-cols-[6.5rem_1fr] gap-2">
                  <dt className="text-muted">Based</dt>
                  <dd className="text-foreground">{siteConfig.location}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>

        <section className="mt-16 border-t border-border pt-10" aria-labelledby="education">
          <h2 id="education" className="mono-label mb-3">
            Education
          </h2>
          <p className="text-lg text-foreground">FAST-NUCES</p>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            {education.degree} · {education.period}
          </p>
          <p className="mt-1 text-xs text-muted">{education.school}</p>
        </section>

        <section className="mt-10" aria-labelledby="certs">
          <h2 id="certs" className="mono-label mb-3">
            Certifications
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((item) => (
              <li
                key={item}
                className="rounded-md border border-border bg-surface/40 px-3 py-2 text-sm text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/work">
            Explore Systems
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
          <Button href="/contact" variant="secondary">
            Let&apos;s Talk
          </Button>
          {social.resumePath ? (
            <TrackLink
              href={social.resumePath}
              event={AnalyticsEvents.resumeClick}
              payload={{ source: "about" }}
              className="focus-ring inline-flex items-center gap-1 rounded-md px-4 py-2.5 text-sm text-muted transition-colors hover:text-foreground"
              external
            >
              View Résumé
              <ArrowUpRight className="h-3.5 w-3.5" />
            </TrackLink>
          ) : null}
        </div>
      </Container>
    </div>
  );
}

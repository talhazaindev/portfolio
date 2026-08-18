"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Container } from "@/components/ui/Container";
import { SectionEnvironment } from "@/components/ui/SectionEnvironment";
import { StatusLabel } from "@/components/brand/StatusLabel";
import { HeroSystemGraph } from "@/components/hero/HeroSystemGraph";
import { siteConfig } from "@/data/site";
import { social } from "@/data/social";
import { motionTiers } from "@/lib/motion";
import { TrackLink } from "@/components/analytics/TrackLink";
import { AnalyticsEvents } from "@/lib/analytics";

const phraseEase = motionTiers.section.ease;

/** Opening brand statement + interactive system visual — warm ivory canvas. */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <SectionEnvironment
      tone="void"
      grid
      className="flex min-h-[100dvh] flex-col justify-center pt-20 pb-8 sm:pb-10 lg:pt-24 lg:pb-12"
    >
      <Container width="extra-wide">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10 xl:gap-12">
          <div className="relative z-10 flex flex-col justify-center">
            <motion.div
              className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2"
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.35, ease: phraseEase }
              }
            >
              <p className="mono-label">
                Applied AI Engineer · {siteConfig.location}
              </p>
              <StatusLabel label="Mode" value="Production" pulseOnce />
            </motion.div>

            <h1 className="hero-display">
              <motion.span
                className="block"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.5, delay: 0.1, ease: phraseEase }
                }
              >
                I architect AI systems
              </motion.span>
              <motion.span
                className="mt-0.5 block text-ink-strong/92"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.5, delay: 0.18, ease: phraseEase }
                }
              >
                that reason, retrieve, orchestrate
              </motion.span>
              <motion.span
                className="mt-0.5 block text-ink-strong/88"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.5, delay: 0.26, ease: phraseEase }
                }
              >
                &amp; act.
              </motion.span>
            </h1>

            <motion.p
              className="mt-4 max-w-[34rem] text-sm leading-relaxed text-ink-muted sm:text-base"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.4, delay: 0.25, ease: phraseEase }
              }
            >
              Production-grade agentic AI, LLM, RAG, multimodal and machine-learning
              systems—from model orchestration to APIs, evaluation and deployment.
            </motion.p>

            <motion.div
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.35, delay: 0.4, ease: phraseEase }
              }
            >
              <Magnetic>
                <Button href="/work" className="min-h-10 px-5 text-[15px]">
                  Explore Systems
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Button>
              </Magnetic>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.35, delay: 0.46, ease: phraseEase }
                }
              >
                <Button href="/contact" variant="secondary" className="min-h-10 px-5">
                  Let&apos;s Talk
                </Button>
              </motion.div>
              {social.github ? (
                <TrackLink
                  href={social.github}
                  event={AnalyticsEvents.githubClick}
                  payload={{ source: "hero" }}
                  className="focus-ring inline-flex items-center gap-1 text-sm text-ink-muted transition-colors duration-180 hover:text-ink-strong sm:ml-1"
                  external
                >
                  GitHub
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </TrackLink>
              ) : null}
            </motion.div>

            <motion.p
              className="mono-label mt-6 max-w-md !text-system-navy/80"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.35, delay: 0.6, ease: phraseEase }
              }
            >
              {siteConfig.specialties.join(" · ")}
            </motion.p>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.55, delay: 0.55, ease: phraseEase }
            }
            className="relative flex h-[min(28rem,52dvh)] sm:h-[min(30rem,56dvh)] lg:h-[min(34rem,68dvh)]"
          >
            <HeroSystemGraph />
          </motion.div>
        </div>
      </Container>
    </SectionEnvironment>
  );
}

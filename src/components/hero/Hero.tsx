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
import { heroStagger, motionTiers } from "@/lib/motion";
import { TrackLink } from "@/components/analytics/TrackLink";
import { AnalyticsEvents } from "@/lib/analytics";

/** Opening brand statement + interactive system visual — warm ivory canvas. */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <SectionEnvironment tone="void" grid className="pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20">
      <Container width="wide">
        <div className="grid items-start gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch lg:gap-12 xl:gap-14">
          <motion.div
            initial={reduce ? false : "hidden"}
            animate="visible"
            variants={heroStagger}
            className="relative z-10 flex flex-col"
          >
            <motion.div
              className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2"
              variants={
                reduce
                  ? undefined
                  : {
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0, transition: motionTiers.cinematic },
                    }
              }
            >
              <p className="mono-label">
                Applied AI Engineer · {siteConfig.location}
              </p>
              <StatusLabel label="Mode" value="Production" pulseOnce />
            </motion.div>

            <motion.h1
              className="hero-display"
              variants={
                reduce
                  ? undefined
                  : {
                      hidden: { opacity: 0, y: 22 },
                      visible: { opacity: 1, y: 0, transition: motionTiers.cinematic },
                    }
              }
            >
              <span className="block max-w-[11ch] sm:max-w-none">
                I architect AI systems
              </span>
              <span className="mt-1 block max-w-[14ch] text-ink-strong/92 sm:mt-1.5 sm:max-w-[16ch]">
                that reason, retrieve,
              </span>
              <span className="mt-1 block text-ink-strong/88 sm:mt-1.5">
                orchestrate &amp; act.
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-[36rem] text-base leading-relaxed text-ink-muted sm:text-lg"
              variants={
                reduce
                  ? undefined
                  : {
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0, transition: motionTiers.interface },
                    }
              }
            >
              Production-grade agentic AI, LLM, RAG, multimodal and machine-learning
              systems—from model orchestration to APIs, evaluation and deployment.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
              variants={
                reduce
                  ? undefined
                  : {
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0, transition: motionTiers.interface },
                    }
              }
            >
              <Magnetic>
                <Button href="/work" className="min-h-11 px-5 text-[15px]">
                  Explore Systems
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Button>
              </Magnetic>
              {social.github ? (
                <TrackLink
                  href={social.github}
                  event={AnalyticsEvents.githubClick}
                  payload={{ source: "hero" }}
                  className="focus-ring inline-flex min-h-11 items-center gap-1 rounded-md border border-border-strong px-5 text-sm text-ink transition-colors duration-180 hover:bg-canvas-warm/70"
                  external
                >
                  GitHub
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </TrackLink>
              ) : (
                <Button href="/contact" variant="secondary" className="min-h-11 px-5">
                  Let&apos;s Talk
                </Button>
              )}
            </motion.div>

            <motion.p
              className="mono-label mt-10 max-w-md !text-system-navy/80"
              variants={
                reduce
                  ? undefined
                  : { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.55 } } }
              }
            >
              {siteConfig.specialties.join(" · ")}
            </motion.p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...motionTiers.cinematic, delay: reduce ? 0 : 0.12 }}
            className="relative flex min-h-[32rem] sm:min-h-[36rem] lg:min-h-full lg:h-full"
          >
            <HeroSystemGraph />
          </motion.div>
        </div>
      </Container>
    </SectionEnvironment>
  );
}

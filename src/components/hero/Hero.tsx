"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Container } from "@/components/ui/Container";
import { StatusLabel } from "@/components/brand/StatusLabel";
import { HeroSystemGraph } from "@/components/hero/HeroSystemGraph";
import { siteConfig } from "@/data/site";
import { social } from "@/data/social";
import { heroStagger, motionTiers } from "@/lib/motion";
import { TrackLink } from "@/components/analytics/TrackLink";
import { AnalyticsEvents } from "@/lib/analytics";

/** Opening brand statement + interactive system visual — equal narrative weight. */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-70" aria-hidden />
      <Container>
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
              <StatusLabel label="Mode" value="Production" />
            </motion.div>

            <motion.h1
              className="hero-display text-foreground"
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
              <span className="mt-1 block max-w-[14ch] text-foreground/92 sm:mt-1.5 sm:max-w-[16ch]">
                that reason, retrieve,
              </span>
              <span className="mt-1 block text-foreground/88 sm:mt-1.5">
                orchestrate &amp; act.
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-[36rem] text-base leading-relaxed text-muted sm:text-lg"
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
                  Explore Selected Systems
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Button>
              </Magnetic>
              <Button href="/contact" variant="secondary" className="min-h-11 px-5">
                Let&apos;s Talk
              </Button>
              {social.github ? (
                <TrackLink
                  href={social.github}
                  event={AnalyticsEvents.githubClick}
                  payload={{ source: "hero" }}
                  className="focus-ring inline-flex items-center gap-1 px-1 text-sm text-muted transition-colors duration-180 hover:text-foreground"
                  external
                >
                  GitHub
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </TrackLink>
              ) : null}
            </motion.div>

            <motion.p
              className="mono-label mt-10 max-w-md"
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
            <div
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent_65%)]"
              aria-hidden
            />
            <HeroSystemGraph />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

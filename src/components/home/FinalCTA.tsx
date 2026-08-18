"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionEnvironment } from "@/components/ui/SectionEnvironment";
import { Container } from "@/components/ui/Container";
import { SignalLine } from "@/components/brand/SignalLine";
import { social } from "@/data/social";
import { TrackLink } from "@/components/analytics/TrackLink";
import { AnalyticsEvents } from "@/lib/analytics";
import { motionTiers } from "@/lib/motion";
import { Button } from "@/components/ui/Button";

/** Strongest warm signal moment — amber ambient, dark cobalt CTA. */
export function FinalCTA() {
  const reduce = useReducedMotion();
  const [signalKey, setSignalKey] = useState(0);

  return (
    <SectionEnvironment tone="signal" grid className="py-20 sm:py-24 lg:pb-32">
      <Container width="wide">
        <div className="relative px-1 py-10 sm:py-14 lg:py-16">
          <div className="relative z-10">
            <motion.div
              className="mb-6 flex flex-wrap items-center gap-3"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={motionTiers.component}
            >
              <p className="mono-label">INPUT</p>
              <SignalLine compact />
            </motion.div>

            <motion.h2
              className="section-display max-w-2xl text-balance text-heading"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ ...motionTiers.section, delay: reduce ? 0 : 0.08 }}
            >
              Have an AI system
              <br />
              to build?
            </motion.h2>

            <motion.div
              className="mt-6 flex items-center gap-3"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ ...motionTiers.component, delay: reduce ? 0 : 0.18 }}
              aria-hidden
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-heading/50">
                signal
              </span>
              <span className="relative h-px w-16 overflow-hidden bg-heading/20 sm:w-24">
                <motion.span
                  key={signalKey}
                  className="absolute inset-y-0 left-0 w-8 bg-signal"
                  initial={reduce ? false : { x: "-100%" }}
                  whileInView={reduce ? undefined : { x: "200%" }}
                  viewport={{ once: true }}
                  animate={
                    signalKey > 0 && !reduce
                      ? { x: ["-100%", "200%"] }
                      : undefined
                  }
                  transition={{ duration: 0.55, ease: motionTiers.section.ease }}
                />
              </span>
            </motion.div>

            <motion.p
              className="mt-6 max-w-md text-xl tracking-tight text-heading sm:text-2xl"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ ...motionTiers.component, delay: reduce ? 0 : 0.28 }}
            >
              Let&apos;s architect it.
              <span
                className="ml-2 inline-block h-2 w-2 translate-y-[-1px] rounded-full bg-signal"
                aria-hidden
              />
            </motion.p>

            <motion.div
              className="mt-12 flex flex-wrap gap-3"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ ...motionTiers.component, delay: reduce ? 0 : 0.36 }}
              onMouseEnter={() => {
                if (!reduce) setSignalKey((k) => k + 1);
              }}
            >
              <Button href="/contact" className="min-h-11 px-5">
                Let&apos;s architect it
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Button>
              <TrackLink
                href={social.linkedin}
                event={AnalyticsEvents.linkedinClick}
                payload={{ source: "final_cta" }}
                className="focus-ring inline-flex items-center gap-1 rounded-md border border-border-strong px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-accent-soft"
                external
              >
                LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </TrackLink>
            </motion.div>
          </div>
        </div>
      </Container>
    </SectionEnvironment>
  );
}

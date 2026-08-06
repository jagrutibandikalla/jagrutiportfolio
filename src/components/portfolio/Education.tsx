import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiMapPin } from "react-icons/fi";
import { SectionHeader } from "@/components/motion/primitives";
import { achievements, education } from "@/lib/portfolio-data";

export function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  const scaleY = useTransform(line, [0, 1], [0, 1]);

  return (
    <section id="education" className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <SectionHeader
          index="06"
          eyebrow="Education"
          title="The academic through-line."
        />

        <div ref={ref} className="relative mt-16 pl-10 sm:pl-16">
          <div className="absolute left-[13px] top-2 bottom-2 w-px bg-border sm:left-[27px]" />
          <motion.div
            className="absolute left-[13px] top-2 bottom-2 w-px origin-top bg-primary sm:left-[27px]"
            style={{ scaleY }}
          />

          <div className="flex flex-col gap-12 sm:gap-16">
            {education.map((e, i) => (
              <motion.article
                key={e.degree}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <span className="absolute -left-10 top-3 grid h-6 w-6 place-items-center rounded-full border border-border bg-background sm:-left-16">
                  <motion.span
                    className="h-2 w-2 rounded-full bg-primary"
                    whileInView={{ scale: [0, 1.6, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.08 }}
                  />
                </span>

                <div className="rounded-[1.8rem] border border-border bg-card/50 p-6 backdrop-blur-xl transition-colors duration-500 hover:border-primary/50 sm:p-8">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:justify-between">
                    <h3 className="min-w-0 text-xl leading-tight font-medium sm:text-2xl">
                      {e.degree}
                    </h3>
                    <span className="shrink-0 rounded-full bg-primary/15 px-3 py-1.5 text-[0.68rem] font-medium text-primary">
                      {e.period}
                    </span>
                  </div>
                  <p className="mt-3 text-base text-muted-foreground">{e.institution}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <FiMapPin size={13} /> {e.place}
                    </span>
                    <span className="font-display text-foreground">{e.note}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 aurora opacity-40 animate-drift"
      />
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <SectionHeader
          index="07"
          eyebrow="Achievements"
          title="Milestones worth mentioning."
          align="center"
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08 }}
              className="group relative overflow-hidden bg-card/60 p-7 backdrop-blur-xl transition-colors duration-500 hover:bg-card"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-primary/25 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
              />
              <span className="relative font-display text-[0.65rem] text-primary tabular-nums">
                0{i + 1}
              </span>
              <h3 className="relative mt-4 text-xl font-medium">{a.title}</h3>
              <p className="relative mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {a.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

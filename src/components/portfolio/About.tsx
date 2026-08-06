import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { SectionHeader, SplitText, staggerChild, staggerParent, Reveal } from "@/components/motion/primitives";
import { TiltCard } from "@/components/motion/interactive";
import { aboutBlocks, highlights, interests, profile, stats } from "@/lib/portfolio-data";
import { media } from "@/lib/media";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "10%"]);
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 -z-10 h-[36rem] w-[36rem] rounded-full bg-primary/12 blur-[130px]"
      />
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <SectionHeader
          index="01"
          eyebrow="About"
          title="A story told in code, curiosity and craft."
          description={profile.summary}
        />

        <div ref={ref} className="mt-20 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* image reveal */}
          <Reveal>
            <motion.div className="relative flex justify-center md:justify-start">
              <motion.img
                src={imgError ? media.profilePhotoFallback : media.profilePhoto}
                alt="Jagruti Bandikalla"
                loading="lazy"
                decoding="async"
                onError={() => setImgError(true)}
                style={{ y: imgY }}
                className="w-full max-w-[420px] h-[550px] object-cover rounded-[24px] shadow-[0_0_20px_5px_rgba(138,84,255,0.3)]"
              />
            </motion.div>
            <div className="mt-6 flex flex-wrap gap-2">
              {highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
                >
                  {h}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="flex flex-col gap-10">
            <motion.div
              className="grid gap-4 sm:grid-cols-2"
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-15%" }}
            >
              {aboutBlocks.map((block, i) => (
                <motion.div key={block.title} variants={staggerChild}>
                  <TiltCard className="h-full">
                    <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-xl transition-colors duration-500 hover:border-primary/50">
                      <span className="font-display text-[0.65rem] text-primary tabular-nums">
                        0{i + 1}
                      </span>
                      <h3 className="mt-3 text-xl font-medium">{block.title}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                        {block.body}
                      </p>
                      <span
                        aria-hidden
                        className="absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-primary/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                      />
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>

            <Reveal>
              <motion.div
                className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4"
                variants={staggerParent}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {stats.map((s) => (
                  <motion.div
                    key={s.label}
                    variants={staggerChild}
                    className="bg-card/60 p-5 backdrop-blur-xl"
                  >
                    <p className="font-display text-3xl font-semibold tabular-nums text-gradient">
                      {s.value}
                    </p>
                    <p className="mt-1 text-sm font-medium">{s.label}</p>
                    <p className="mt-1 text-[0.7rem] leading-snug text-muted-foreground">
                      {s.sub}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </Reveal>

            <Reveal>
              <p className="eyebrow">Beyond the screen</p>
              <p className="mt-4 font-editorial text-2xl leading-snug sm:text-3xl">
                <SplitText text={interests.join(" · ")} stagger={0.03} />
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

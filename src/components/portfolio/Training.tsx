import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiAward, FiPlus } from "react-icons/fi";
import { SectionHeader } from "@/components/motion/primitives";
import { TiltCard } from "@/components/motion/interactive";
import { training } from "@/lib/portfolio-data";

const accentMap: Record<string, string> = {
  violet: "var(--violet)",
  electric: "var(--electric)",
  gold: "var(--gold)",
};

export function Training() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);

  const scrollToCard = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - 24, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let min = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
        if (d < min) {
          min = d;
          closest = i;
        }
      });
      setIndex(closest);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="training" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[30rem] w-[30rem] rounded-full bg-accent/12 blur-[140px]"
      />
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            index="02"
            eyebrow="Training Journey"
            title="Where the skills were forged."
            description="Training at Techwing, a workshop at Aranea Den, and a daily practice habit — swipe through the journey."
          />
          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={() => scrollToCard(Math.max(0, index - 1))}
              aria-label="Previous training card"
              className="grid h-12 w-12 place-items-center rounded-full glass-panel transition-colors hover:border-primary/60 disabled:opacity-30"
              disabled={index === 0}
            >
              <FiArrowLeft />
            </button>
            <button
              onClick={() => scrollToCard(Math.min(training.length - 1, index + 1))}
              aria-label="Next training card"
              className="grid h-12 w-12 place-items-center rounded-full glass-panel transition-colors hover:border-primary/60 disabled:opacity-30"
              disabled={index === training.length - 1}
            >
              <FiArrowRight />
            </button>
            <span className="font-display text-sm tabular-nums text-muted-foreground">
              {String(index + 1).padStart(2, "0")} / {String(training.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {training.map((item, i) => {
            const accent = accentMap[item.accent] ?? accentMap['violet'];
            const isOpen = expanded === item.id;
            return (
              <div
                key={item.id}
                className="w-[85vw] shrink-0 snap-center sm:w-[60vw] lg:w-[38rem]"
              >
                <TiltCard intensity={6} className="h-full">
                  <motion.article
                    className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card/60 p-7 backdrop-blur-xl sm:p-9"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    style={{ boxShadow: `0 40px 100px -50px ${accent}` }}
                  >
                    {/* animated backdrop */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-40 blur-3xl animate-float-slow"
                      style={{ background: accent }}
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage:
                          "radial-gradient(currentColor 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                      }}
                    />

                    <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                      <div className="min-w-0">
                        <p className="eyebrow">{item.institution}</p>
                        <h3 className="mt-3 text-2xl leading-tight font-semibold sm:text-3xl">
                          {item.title}
                        </h3>
                      </div>
                      <span
                        className="shrink-0 rounded-full px-3 py-1.5 text-[0.65rem] font-medium"
                        style={{ background: `${accent}`, color: "var(--background)" }}
                      >
                        {item.status}
                      </span>
                    </div>

                    <p className="relative mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {item.description}
                    </p>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.p
                          key="detail"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="relative overflow-hidden text-sm leading-relaxed text-foreground/80"
                        >
                          <span className="mt-5 block border-l-2 border-primary/60 pl-4">
                            {item.detail}
                          </span>
                        </motion.p>
                      ) : null}
                    </AnimatePresence>

                    <div className="relative mt-7 flex flex-wrap gap-2">
                      {item.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-border bg-background/40 px-3 py-1.5 text-[0.7rem]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="relative mt-auto flex items-center justify-between gap-4 pt-8">
                      <span className="flex items-center gap-2 text-xs text-muted-foreground">
                        <FiAward size={14} style={{ color: accent }} /> {item.duration}
                      </span>
                      <button
                        onClick={() => setExpanded(isOpen ? null : item.id)}
                        className="group flex items-center gap-2 text-xs font-medium text-foreground"
                        aria-expanded={isOpen}
                      >
                        {isOpen ? "Less" : "Details"}
                        <motion.span
                          animate={{ rotate: isOpen ? 135 : 0 }}
                          transition={{ duration: 0.35 }}
                          className="grid h-8 w-8 place-items-center rounded-full border border-border transition-colors group-hover:border-primary/60"
                        >
                          <FiPlus size={13} />
                        </motion.span>
                      </button>
                    </div>
                  </motion.article>
                </TiltCard>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2">
          {training.map((t, i) => (
            <button
              key={t.id}
              onClick={() => scrollToCard(i)}
              aria-label={`Go to ${t.title}`}
              className="h-1 flex-1 overflow-hidden rounded-full bg-border"
            >
              <motion.span
                className="block h-full bg-primary"
                animate={{ width: i === index ? "100%" : "0%" }}
                transition={{ duration: 0.5 }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

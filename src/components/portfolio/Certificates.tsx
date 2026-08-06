import { motion } from "framer-motion";
import { useState } from "react";
import { FiArrowUpRight, FiAward, FiCheckCircle, FiClock } from "react-icons/fi";
import { SectionHeader } from "@/components/motion/primitives";
import { certificates } from "@/lib/portfolio-data";

export function Certificates() {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section id="certificates" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[150px]"
      />
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <SectionHeader
          index="05"
          eyebrow="Certificates & Badges"
          title="Recognition, collected."
          description="Eight certificates and badges from Google Cloud, Cisco Networking Academy, Microsoft and Techwing. Tap any card to turn it over."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((c, i) => {
            const isFlipped = flipped === i;
            const earned = c.status === "Earned";
            return (
              <motion.div
                key={c.title}
                role="button"
                tabIndex={0}
                onClick={() => setFlipped(isFlipped ? null : i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setFlipped(isFlipped ? null : i);
                  }
                }}
                initial={{ opacity: 0, y: 50, rotateX: -12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-64 w-full cursor-pointer [perspective:1400px] text-left outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-pressed={isFlipped}
                aria-label={`${c.title} — ${c.issuer}`}
              >
                <motion.div
                  className="relative h-full w-full [transform-style:preserve-3d]"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* front */}
                  <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[1.7rem] border border-border glass-panel p-6 [backface-visibility:hidden] shadow-soft">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-primary/30 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                    />
                    <div className="relative flex items-center justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/15 text-primary animate-float-slow">
                        <FiAward size={18} />
                      </span>
                      <span
                        className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6rem] font-medium ${
                          earned
                            ? "bg-primary/18 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {earned ? <FiCheckCircle size={11} /> : <FiClock size={11} />}
                        {c.status}
                      </span>
                    </div>
                    <div className="relative">
                      <h3 className="text-lg leading-tight font-medium">{c.title}</h3>
                      <p className="mt-2 text-xs text-muted-foreground">{c.issuer}</p>
                    </div>
                  </div>

                  {/* back */}
                  <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[1.7rem] border border-primary/40 bg-card p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div className="absolute inset-0 aurora opacity-60" />
                    <div className="relative">
                      <p className="eyebrow">{c.type}</p>
                      <h3 className="mt-3 text-lg leading-tight font-medium">{c.title}</h3>
                    </div>
                    <div className="relative">
                      <p className="font-display text-sm">{c.issuer}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{c.status}</p>
                      {c.href ? (
                        <a
                          href={c.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          onClick={(e) => e.stopPropagation()}
                          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/50 px-3 py-1.5 text-[0.7rem] font-medium text-primary transition-colors hover:bg-primary/15"
                        >
                          View credential <FiArrowUpRight size={12} />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

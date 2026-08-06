import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  SiAngular,
  SiC,
  SiCss,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGithubcopilot,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiPython,
  SiTypescript,
  SiVercel,
  SiClaude,
  SiCloudinary,
  SiPerplexity,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import {
  FiChevronDown,
  FiCode,
  FiCpu,
  FiDatabase,
  FiGitBranch,
  FiLayers,
  FiServer,
  FiSettings,
  FiTerminal,
  FiZap,
} from "react-icons/fi";
import { SectionHeader } from "@/components/motion/primitives";
import { skillCategories } from "@/lib/portfolio-data";

const iconFor: Record<string, React.ComponentType<{ size?: number }>> = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Angular: SiAngular,
  Java: FaJava,
  JSP: FaJava,
  Python: SiPython,
  C: SiC,
  SQL: SiMysql,
  DBMS: FiDatabase,
  Git: SiGit,
  GitHub: SiGithub,
  "CI/CD Concepts": FiGitBranch,
  Vercel: SiVercel,
  Firebase: SiFirebase,
  "GitHub Copilot": SiGithubcopilot,
  "Claude Code": SiClaude,
  Cloudinary: SiCloudinary,
  Perplexity: SiPerplexity,
  "VS Code": FiTerminal,
  "Antigravity IDE": FiTerminal,
};

const categoryIcon: Record<string, React.ComponentType<{ size?: number }>> = {
  frontend: FiLayers,
  backend: FiServer,
  languages: FiCode,
  databases: FiDatabase,
  devops: FiGitBranch,
  ai: FiZap,
  tools: FiSettings,
  dsa: FiCpu,
};

const marqueeIcons = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Angular",
  "Java",
  "Python",
  "SQL",
  "Git",
  "GitHub",
  "Vercel",
  "Firebase",
  "GitHub Copilot",
  "Claude Code",
];

export function Skills() {
  const [open, setOpen] = useState<string>(skillCategories[0]?.id ?? "");

  return (
    <section id="skills" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 aurora animate-drift opacity-50"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-[34rem] w-[34rem] rounded-full bg-primary/20 blur-[140px] animate-orb"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-accent/20 blur-[150px] animate-orb-slow"
      />

      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <SectionHeader
          index="03"
          eyebrow="Skills Universe"
          title="Eight disciplines. One curious mind."
          description="Open a discipline to see the tools inside — labelled honestly, from proficient to practising."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="flex flex-col gap-3">
            {skillCategories.map((cat, ci) => {
              const isOpen = open === cat.id;
              const CatIcon = categoryIcon[cat.id] ?? FiLayers;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.7, delay: ci * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className={`grad-border group relative overflow-hidden rounded-[1.6rem] glass-panel transition-shadow duration-600 ${
                    isOpen ? "ambient-glow" : "hover:shadow-soft"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? "" : cat.id)}
                    aria-expanded={isOpen}
                    className="relative flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <motion.span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary"
                      animate={{ rotate: isOpen ? 12 : 0, scale: isOpen ? 1.06 : 1 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <CatIcon size={18} />
                    </motion.span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2.5">
                        <span className="truncate font-display text-lg font-medium">
                          {cat.label}
                        </span>
                        <span className="shrink-0 font-display text-[0.65rem] tabular-nums text-primary">
                          {String(cat.skills.length).padStart(2, "0")}
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                        {cat.blurb}
                      </span>
                    </span>

                    <motion.span
                      className="shrink-0 text-muted-foreground"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <FiChevronDown size={18} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="relative overflow-hidden"
                      >
                        <ul className="flex flex-wrap gap-2.5 px-5 pb-6 sm:px-6">
                          {cat.skills.map((s, si) => {
                            const Icon = iconFor[s.name] ?? FiCpu;
                            return (
                              <motion.li
                                key={s.name}
                                initial={{ opacity: 0, y: 14, scale: 0.94 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{
                                  duration: 0.45,
                                  delay: 0.08 + si * 0.07,
                                  ease: [0.16, 1, 0.3, 1],
                                }}
                                className="group/item flex items-center gap-2.5 rounded-full border border-border bg-background/45 px-3.5 py-2 transition-all duration-400 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/10"
                              >
                                <span className="shrink-0 text-primary transition-transform duration-400 group-hover/item:scale-110">
                                  <Icon size={15} />
                                </span>
                                <span className="text-sm">{s.name}</span>
                                <span className="text-[0.6rem] tracking-wide text-muted-foreground uppercase">
                                  {s.level}
                                </span>
                              </motion.li>
                            );
                          })}
                        </ul>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="grad-border sticky top-28 hidden overflow-hidden rounded-[1.8rem] glass-panel p-7 lg:block"
          >
            <p className="eyebrow">Currently sharpening</p>
            <p className="mt-4 font-editorial text-[2rem] leading-tight">
              Java Full Stack, DevOps pipelines and AI-assisted engineering.
            </p>
            <ul className="mt-7 flex flex-col gap-3 text-sm text-muted-foreground">
              {[
                "Full stack builds with Java, JSP and Angular",
                "Git, GitHub and CI/CD workflows",
                "Daily DSA practice for problem solving",
                "Shipping to Vercel and Firebase",
              ].map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {t}
                </motion.li>
              ))}
            </ul>
          </motion.aside>
        </div>

        {/* marquee */}
        <div className="relative mt-16 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="flex shrink-0 animate-marquee gap-14 pr-14">
            {[...marqueeIcons, ...marqueeIcons].map((name, i) => {
              const Icon = iconFor[name] ?? FiCpu;
              return (
                <span
                  key={`${name}-${i}`}
                  className="flex shrink-0 items-center gap-3 text-muted-foreground"
                >
                  <Icon size={22} />
                  <span className="font-display text-sm">{name}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

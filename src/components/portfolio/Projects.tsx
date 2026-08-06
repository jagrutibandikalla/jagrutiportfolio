import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiGithub, FiX } from "react-icons/fi";
import { SectionHeader } from "@/components/motion/primitives";
import { LuxButton } from "@/components/motion/interactive";
import { projects, type Project } from "@/lib/portfolio-data";

const hueMap: Record<string, string> = {
  violet: "var(--violet)",
  electric: "var(--electric)",
  gold: "var(--gold)",
};

function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  const hue = hueMap[project.hue] ?? hueMap["violet"];
  return (
    <div
      className={`relative overflow-hidden rounded-[1.6rem] ${className ?? ""}`}
      style={{
        background: `radial-gradient(120% 100% at 20% 0%, ${hue}, transparent 62%), var(--color-secondary)`,
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
        <span className="font-display text-[0.65rem] tracking-[0.3em] uppercase opacity-70">
          {project.year}
        </span>
        <div className="flex flex-col gap-3">
          <motion.span
            className="h-24 w-24 rounded-3xl border border-foreground/25 backdrop-blur-sm sm:h-32 sm:w-32"
            animate={{ rotate: [0, 12, 0], y: [0, -10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="font-display text-3xl font-semibold sm:text-5xl">
            {project.title}
          </span>
        </div>
      </div>
    </div>
  );
}

function DetailOverlay({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const blocks: { label: string; items: string[] }[] = [
    { label: "Features", items: project.features },
    { label: "Challenges", items: project.challenges },
    { label: "Solutions", items: project.solutions },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[300] overflow-y-auto bg-background/95 backdrop-blur-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <div className="pointer-events-none fixed inset-0 aurora opacity-45" />
      <div className="relative mx-auto max-w-5xl px-5 py-24 sm:px-8">
        <button
          onClick={onClose}
          aria-label="Close case study"
          className="fixed right-5 top-5 z-10 grid h-12 w-12 place-items-center rounded-full glass-panel transition-colors hover:border-primary/60 sm:right-8 sm:top-8"
        >
          <FiX size={18} />
        </button>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">{project.year}</p>
          <h2 className="mt-5 text-[clamp(2.2rem,7vw,4.5rem)] leading-[0.95] font-semibold">
            {project.title}
          </h2>
          <p className="mt-4 max-w-2xl font-editorial text-2xl leading-snug text-muted-foreground">
            {project.tagline}
          </p>

          <ProjectVisual project={project} className="mt-10 aspect-[16/9] w-full" />

          <div className="mt-10 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs"
              >
                {t}
              </span>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-base leading-relaxed text-foreground/85 sm:text-lg">
            {project.overview}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {blocks.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.1 }}
                className="rounded-3xl border border-border bg-card/55 p-6 backdrop-blur-xl"
              >
                <h3 className="text-sm font-semibold tracking-wide uppercase text-primary">
                  {b.label}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {b.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-border bg-card/40 p-7 backdrop-blur-xl">
            <p className="eyebrow">Development journey</p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed sm:text-lg">
              {project.journey}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <LuxButton
              variant="primary"
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              <FiGithub size={16} /> View on GitHub
            </LuxButton>
            {project.demo ? (
              <LuxButton href={project.demo} target="_blank" rel="noreferrer noopener">
                <FiArrowUpRight size={16} /> Live Demo
              </LuxButton>
            ) : null}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProjectRow({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const reversed = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      className={`group grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16 ${
        reversed ? "lg:[direction:rtl]" : ""
      }`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.button
        onClick={onOpen}
        style={{ y }}
        className="relative block w-full overflow-hidden rounded-[2rem] border border-border text-left [direction:ltr]"
        aria-label={`Open ${project.title} case study`}
      >
        <ProjectVisual
          project={project}
          className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 ring-1 ring-primary/60 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="pointer-events-none absolute right-5 bottom-5 grid h-14 w-14 translate-y-4 place-items-center rounded-full bg-background/80 opacity-0 backdrop-blur-xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <FiArrowUpRight size={20} />
        </span>
      </motion.button>

      <div className="flex flex-col gap-5 [direction:ltr]">
        <span className="eyebrow">{project.year}</span>
        <h3 className="text-[clamp(1.9rem,4.6vw,3.4rem)] leading-[1] font-semibold">
          {project.title}
        </h3>
        <p className="font-editorial text-xl leading-snug text-muted-foreground sm:text-2xl">
          {project.tagline}
        </p>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {project.overview}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border px-3 py-1.5 text-[0.7rem] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={onOpen}
            className="group/btn flex items-center gap-2.5 text-sm font-medium"
          >
            Explore case study
            <span className="grid h-9 w-9 place-items-center rounded-full border border-border transition-all duration-400 group-hover/btn:border-primary/60 group-hover/btn:bg-primary/15">
              <FiArrowUpRight size={14} />
            </span>
          </button>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <FiGithub size={15} /> GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 -z-10 h-[38rem] w-[38rem] rounded-full bg-primary/12 blur-[150px]"
      />
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <SectionHeader
          index="04"
          eyebrow="Projects Showcase"
          title="Three products, three lessons."
          description="Each project opens into a full case study — stack, features, challenges, solutions and the journey behind it."
        />

        <div className="mt-20 flex flex-col gap-28 sm:gap-36">
          {projects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} onOpen={() => setOpen(p)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open ? <DetailOverlay project={open} onClose={() => setOpen(null)} /> : null}
      </AnimatePresence>
    </section>
  );
}

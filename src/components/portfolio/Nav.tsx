import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { sections } from "@/lib/portfolio-data";
import { Magnetic } from "@/components/motion/interactive";

export function Nav({
  theme,
  onToggleTheme,
}: {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.01, 0.25, 0.5] },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[200] h-px origin-left bg-primary"
        style={{ scaleX: bar }}
      />

      <header
        className={`fixed inset-x-0 top-0 z-[190] transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-5 sm:px-8">
          <button
            onClick={() => go("home")}
            className={`flex items-center gap-3 rounded-full px-3 py-2 transition-colors ${
              scrolled ? "glass-panel" : ""
            }`}
            aria-label="Back to top"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-[0.65rem] font-bold text-primary-foreground">
              JB
            </span>
            <span className="hidden font-display text-sm font-medium tracking-tight sm:block">
              Jagruti Bandikalla
            </span>
          </button>

          <nav className="hidden items-center gap-1 rounded-full glass-panel px-2 py-1.5 lg:flex">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className="group relative rounded-full px-3.5 py-2 text-[0.78rem] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {active === s.id ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-primary/18"
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                ) : null}
                <span
                  className={`relative ${active === s.id ? "text-foreground" : ""}`}
                >
                  {s.label}
                </span>
                <span
                  aria-hidden
                  className="absolute bottom-1 left-1/2 h-px w-[62%] -translate-x-1/2 origin-center scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"
                />
              </button>
            ))}
          </nav>


          <div className="flex items-center gap-2">
            <Magnetic strength={0.2}>
              <button
                onClick={onToggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="grid h-11 w-11 place-items-center rounded-full glass-panel text-foreground transition-colors hover:border-primary/60"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.35 }}
                    className="grid place-items-center"
                  >
                    {theme === "dark" ? <FiSun size={17} /> : <FiMoon size={17} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </Magnetic>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-11 w-11 place-items-center rounded-full glass-panel lg:hidden"
            >
              <FiMenu size={18} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[250] flex flex-col bg-background/95 backdrop-blur-2xl"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pointer-events-none absolute inset-0 aurora opacity-60" />
            <div className="flex items-center justify-between px-5 py-6">
              <span className="eyebrow">Menu</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full glass-panel"
              >
                <FiX size={18} />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-16">
              {sections.map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={() => go(s.id)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6 }}
                  className="flex items-baseline gap-4 border-b border-border py-4 text-left"
                >
                  <span className="font-display text-[0.65rem] text-primary tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="font-display text-2xl font-medium tracking-tight">
                    {s.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

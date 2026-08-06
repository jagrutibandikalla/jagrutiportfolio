import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

/** Cinematic circular wipe that plays while the theme morphs. */
export function ThemeMorph({ token }: { token: number }) {
  const [ping, setPing] = useState<number | null>(null);

  useEffect(() => {
    if (token === 0) return;
    setPing(token);
    const t = window.setTimeout(() => setPing(null), 900);
    return () => window.clearTimeout(t);
  }, [token]);

  return (
    <AnimatePresence>
      {ping !== null ? (
        <motion.div
          key={ping}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[400]"
          initial={{ opacity: 0.9, clipPath: "circle(0% at 92% 4%)" }}
          animate={{ opacity: 0.55, clipPath: "circle(160% at 92% 4%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 aurora" />
          <div className="absolute inset-0 backdrop-blur-[3px]" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Ambient light that follows the cursor across the whole page. */
export function MouseGlow() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!pos) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
      style={{
        background: `radial-gradient(520px circle at ${pos.x}px ${pos.y}px, color-mix(in oklab, var(--color-violet) 12%, transparent), transparent 72%)`,
      }}
    />
  );
}

/** Floating back-to-top with an animated scroll-progress ring. */
export function BackToTop() {
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.4,
  });

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 24 }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed right-5 bottom-5 z-[210] grid h-14 w-14 place-items-center rounded-full glass-panel shadow-lux sm:right-8 sm:bottom-8"
        >
          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 100 100"
            aria-hidden
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="2"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength={1}
              style={{ pathLength: progress }}
            />
          </svg>
          <motion.span
            className="relative text-foreground"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <FiArrowUp size={18} />
          </motion.span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

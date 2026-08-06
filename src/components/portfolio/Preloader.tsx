import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const easeLux = [0.16, 1, 0.3, 1] as const;

export function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let value = 0;
    const tick = window.setInterval(() => {
      value = Math.min(100, value + Math.random() * 9 + 4);
      setProgress(Math.floor(value));
      if (value >= 100) {
        window.clearInterval(tick);
        window.setTimeout(() => setExiting(true), 420);
        window.setTimeout(onDone, 1500);
      }
    }, 110);
    return () => window.clearInterval(tick);
  }, [onDone]);

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        className="fixed inset-0 z-[1000] flex flex-col items-center justify-center overflow-hidden bg-background grain"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <div className="pointer-events-none absolute inset-0 aurora animate-drift opacity-70" />

        {/* morphing blob */}
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute h-[70vmin] w-[70vmin] opacity-40 blur-[1px]"
          aria-hidden
        >
          <defs>
            <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.68 0.19 295)" />
              <stop offset="100%" stopColor="oklch(0.74 0.16 235)" />
            </linearGradient>
          </defs>
          <motion.path
            fill="none"
            stroke="url(#pg)"
            strokeWidth="0.6"
            d="M100,20 C150,20 180,60 180,100 C180,150 140,180 100,180 C50,180 20,140 20,100 C20,50 60,20 100,20Z"
            animate={{ rotate: [0, 180, 360], scale: [1, 1.08, 1] }}
            style={{ transformOrigin: "100px 100px" }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.svg>

        {/* monogram */}
        <motion.div
          className="relative flex flex-col items-center gap-8"
          animate={exiting ? { opacity: 0, y: -30, filter: "blur(12px)" } : {}}
          transition={{ duration: 0.7, ease: easeLux }}
        >
          <svg viewBox="0 0 120 60" className="h-16 w-32" aria-label="JB monogram">
            <motion.path
              d="M18 10 V38 C18 47 12 50 4 47"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              className="text-foreground"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: easeLux }}
            />
            <motion.path
              d="M40 10 H58 C68 10 68 24 58 24 H40 M40 24 H60 C71 24 71 40 60 40 H40 V10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              className="text-primary"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, delay: 0.2, ease: easeLux }}
            />
          </svg>

          <div className="flex items-baseline gap-3">
            <span className="font-display text-5xl font-light tabular-nums sm:text-7xl">
              {String(progress).padStart(3, "0")}
            </span>
            <span className="eyebrow">percent</span>
          </div>

          <div className="h-px w-56 overflow-hidden bg-border sm:w-80">
            <motion.div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <p className="eyebrow">Jagruti Bandikalla — Portfolio</p>
        </motion.div>

        {/* curtain reveal */}
        <AnimatePresence>
          {exiting ? (
            <>
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 h-full w-[25.2%] bg-background"
                  style={{ left: `${i * 25}%` }}
                  initial={{ y: "0%" }}
                  animate={{ y: "-105%" }}
                  transition={{ duration: 1, delay: 0.25 + i * 0.08, ease: easeLux }}
                />
              ))}
            </>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

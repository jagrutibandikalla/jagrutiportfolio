import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { media } from "@/lib/media";

const easeLux = [0.16, 1, 0.3, 1] as const;

export function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing Core...");
  const [exiting, setExiting] = useState(false);

  const targetProgressRef = useRef(15);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let isCancelled = false;
    let currentWeight = 15;

    const weights = {
      dom: 20,
      fonts: 20,
      profileImage: 30,
      windowLoad: 15,
    };

    const updateTarget = (addWeight: number, status: string) => {
      if (isCancelled) return;
      currentWeight = Math.min(100, currentWeight + addWeight);
      targetProgressRef.current = currentWeight;
      setStatusText(status);
    };

    // 1. DOM Interactive Check
    if (document.readyState === "interactive" || document.readyState === "complete") {
      updateTarget(weights.dom, "DOM Interactive...");
    } else {
      const handleDom = () => updateTarget(weights.dom, "DOM Ready...");
      document.addEventListener("DOMContentLoaded", handleDom, { once: true });
    }

    // 2. Fonts Ready Check
    if ("fonts" in document) {
      document.fonts.ready
        .then(() => {
          updateTarget(weights.fonts, "Fonts Loaded...");
        })
        .catch(() => {
          updateTarget(weights.fonts, "Fonts Ready...");
        });
    } else {
      updateTarget(weights.fonts, "Fonts Ready...");
    }

    // 3. Preload Profile Image
    const img = new Image();
    img.src = media.profilePhoto;
    const onImgLoad = () => updateTarget(weights.profileImage, "Media Loaded...");
    img.onload = onImgLoad;
    img.onerror = () => {
      const fallbackImg = new Image();
      fallbackImg.src = media.profilePhotoFallback;
      fallbackImg.onload = onImgLoad;
      fallbackImg.onerror = onImgLoad;
    };

    // 4. Window / Full Page Load Check
    if (document.readyState === "complete") {
      updateTarget(weights.windowLoad, "Portfolio Ready...");
    } else {
      const handleLoad = () => updateTarget(weights.windowLoad, "Portfolio Ready...");
      window.addEventListener("load", handleLoad, { once: true });
    }

    // Safety timeout to guarantee complete state within 2.2 seconds
    const safetyTimer = setTimeout(() => {
      updateTarget(100, "Ready");
    }, 2200);

    // Smooth animation loop to interpolate displayed progress to targetProgressRef.current
    let displayProgress = 0;
    const animate = () => {
      if (isCancelled) return;

      const target = targetProgressRef.current;
      if (displayProgress < target) {
        const diff = target - displayProgress;
        const step = Math.max(0.7, diff * 0.14);
        displayProgress = Math.min(target, displayProgress + step);
        setProgress(Math.floor(displayProgress));
      }

      if (displayProgress >= 100) {
        setProgress(100);
        setStatusText("Welcome");
        setTimeout(() => setExiting(true), 350);
        setTimeout(onDone, 1200);
        return;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
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

        {/* monogram & progress */}
        <motion.div
          className="relative flex flex-col items-center gap-6"
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

          <div className="relative h-[2px] w-56 overflow-hidden bg-border/40 sm:w-80 rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent shadow-[0_0_12px_rgba(168,85,247,0.5)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase transition-all duration-300">
              {statusText}
            </span>
            <p className="eyebrow">Jagruti Bandikalla — Portfolio</p>
          </div>
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


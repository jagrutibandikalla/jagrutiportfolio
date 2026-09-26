import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { media } from "@/lib/media";

const easeLux = [0.16, 1, 0.3, 1] as const;

export function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING ENGINE...");
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
      updateTarget(weights.dom, "DOM STRUCTURE READY");
    } else {
      const handleDom = () => updateTarget(weights.dom, "DOM SYNCED");
      document.addEventListener("DOMContentLoaded", handleDom, { once: true });
    }

    // 2. Fonts Ready Check
    if ("fonts" in document) {
      document.fonts.ready
        .then(() => {
          updateTarget(weights.fonts, "TYPOGRAPHY LOADED");
        })
        .catch(() => {
          updateTarget(weights.fonts, "FONTS READY");
        });
    } else {
      updateTarget(weights.fonts, "FONTS READY");
    }

    // 3. Preload Profile Image
    const img = new Image();
    img.src = media.profilePhoto;
    const onImgLoad = () => updateTarget(weights.profileImage, "MEDIA ASSETS LOADED");
    img.onload = onImgLoad;
    img.onerror = () => {
      const fallbackImg = new Image();
      fallbackImg.src = media.profilePhotoFallback;
      fallbackImg.onload = onImgLoad;
      fallbackImg.onerror = onImgLoad;
    };

    // 4. Window / Full Page Load Check
    if (document.readyState === "complete") {
      updateTarget(weights.windowLoad, "SYSTEM OPERATIONAL");
    } else {
      const handleLoad = () => updateTarget(weights.windowLoad, "SYSTEM OPERATIONAL");
      window.addEventListener("load", handleLoad, { once: true });
    }

    // Safety timeout to guarantee complete state within 2.2 seconds
    const safetyTimer = setTimeout(() => {
      updateTarget(100, "WELCOME");
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
        setStatusText("WELCOME");
        setTimeout(() => setExiting(true), 350);
        setTimeout(onDone, 1100);
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

  const marqueeText = "JAVA FULL STACK • FRONTEND CRAFT • DEVOPS LEARNER • CSE UNDERGRADUATE • CREATIVE DEVELOPER • ";

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        className="fixed inset-0 z-[1000] flex flex-col justify-between overflow-hidden bg-background grain select-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        {/* Background Grid & Aurora Glow */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-0 aurora animate-drift opacity-60" />

        {/* TOP KINETIC MARQUEE BANNER */}
        <div className="relative z-10 w-full overflow-hidden border-b border-border/30 bg-background/50 backdrop-blur-md py-2.5">
          <motion.div
            className="flex whitespace-nowrap text-xs font-mono tracking-widest text-muted-foreground/80 uppercase"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <span>{marqueeText.repeat(4)}</span>
            <span>{marqueeText.repeat(4)}</span>
          </motion.div>
        </div>

        {/* MAIN CENTERPIECE DISPLAY */}
        <motion.div
          className="relative z-10 my-auto flex flex-col items-center justify-center px-4"
          animate={exiting ? { opacity: 0, scale: 0.96, filter: "blur(14px)" } : {}}
          transition={{ duration: 0.6, ease: easeLux }}
        >
          {/* Monogram / Header HUD */}
          <div className="mb-4 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
              JAGRUTI BANDIKALLA // PORTFOLIO
            </span>
            <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary border border-primary/20">
              V2.0
            </span>
          </div>

          {/* GIANT DYNAMIC PERCENTAGE COUNTER */}
          <div className="relative flex items-baseline justify-center">
            <motion.span
              className="font-display text-7xl font-extrabold tracking-tighter tabular-nums sm:text-9xl md:text-[11rem] bg-gradient-to-b from-foreground via-foreground/90 to-foreground/40 bg-clip-text text-transparent drop-shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeLux }}
            >
              {String(progress).padStart(3, "0")}
            </motion.span>
            <span className="ml-2 font-mono text-xl sm:text-3xl font-light text-primary/80">
              %
            </span>
          </div>

          {/* DYNAMIC AUDIO EQUALIZER / SPECTRUM BARS */}
          <div className="my-6 flex items-center gap-1 sm:gap-1.5 h-10">
            {Array.from({ length: 24 }).map((_, i) => {
              const baseHeight = Math.sin((i + progress * 0.1) * 0.8) * 50 + 50;
              const isActive = (i / 24) * 100 <= progress;
              return (
                <motion.div
                  key={i}
                  className={`w-1 sm:w-1.5 rounded-full transition-colors duration-200 ${
                    isActive
                      ? "bg-gradient-to-t from-primary to-accent shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                      : "bg-muted-foreground/20"
                  }`}
                  animate={{
                    height: isActive ? [`${Math.max(15, baseHeight * 0.4)}%`, `${Math.max(25, baseHeight)}%`, `${Math.max(10, baseHeight * 0.6)}%`] : "12%",
                  }}
                  transition={{
                    duration: 0.5 + (i % 5) * 0.1,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
              );
            })}
          </div>

          {/* DUAL LASER PROGRESS TRACK */}
          <div className="relative w-72 sm:w-96 flex items-center justify-center my-2">
            <div className="h-[2px] w-full bg-border/40 overflow-hidden relative rounded-full">
              <motion.div
                className="absolute inset-y-0 bg-gradient-to-r from-cyan-400 via-primary to-accent shadow-[0_0_16px_rgba(168,85,247,0.8)]"
                style={{
                  left: `${50 - progress / 2}%`,
                  right: `${50 - progress / 2}%`,
                }}
              />
            </div>
          </div>

          {/* STATUS HUD FOOTER */}
          <div className="mt-4 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-muted-foreground">
              <span className="text-primary font-bold">[STATUS]</span>
              <span className="transition-all duration-300 font-medium">{statusText}</span>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM KINETIC MARQUEE BANNER */}
        <div className="relative z-10 w-full overflow-hidden border-t border-border/30 bg-background/50 backdrop-blur-md py-2.5">
          <motion.div
            className="flex whitespace-nowrap text-xs font-mono tracking-widest text-muted-foreground/80 uppercase"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <span>{marqueeText.repeat(4)}</span>
            <span>{marqueeText.repeat(4)}</span>
          </motion.div>
        </div>

        {/* MULTI-BLADE SHUTTER REVEAL EXIT */}
        <AnimatePresence>
          {exiting ? (
            <div className="absolute inset-0 z-50 pointer-events-none flex">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="h-full w-[16.7%] bg-background border-r border-border/20"
                  initial={{ y: "0%" }}
                  animate={{ y: i % 2 === 0 ? "-105%" : "105%" }}
                  transition={{
                    duration: 0.95,
                    delay: i * 0.05,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                />
              ))}
            </div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}



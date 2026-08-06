import { motion, useInView, type Variants } from "framer-motion";
import {
  useRef,
  type ElementType,
  type ReactNode,
  type CSSProperties,
} from "react";

export const easeLux = [0.16, 1, 0.3, 1] as const;

/** Section-level reveal with mask/clip feel. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const MotionTag = motion[as as "div"] ?? motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y, filter: "blur(10px)" }
      }
      transition={{ duration: 0.95, delay, ease: easeLux }}
    >
      {children}
    </MotionTag>
  );
}

/** Word-by-word split text reveal with mask. */
export function SplitText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden
        >
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: easeLux }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeLux },
  },
};

/** Section shell: eyebrow + heading + aurora backdrop. */
export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      <Reveal className="flex items-center gap-4">
        <span className="font-display text-xs tabular-nums text-primary">{index}</span>
        <span className="h-px w-10 bg-border" />
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <h2 className="max-w-4xl text-[clamp(2.1rem,6vw,4.6rem)] leading-[0.98] font-semibold">
        <SplitText text={title} />
      </h2>
      {description ? (
        <Reveal delay={0.15}>
          <p
            className={`max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/** Ambient gradient orbs used behind sections. */
export function AuroraBackdrop({ style }: { style?: CSSProperties }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 aurora animate-drift opacity-70 blur-[2px]"
      style={style}
    />
  );
}

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

/** Magnetic wrapper — element leans toward the cursor. */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      style={{ x, y }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

type ButtonVariant = "primary" | "ghost" | "outline";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3.5 text-sm font-medium tracking-tight transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lux",
  outline:
    "border border-border bg-glass text-foreground hover:border-primary/60",
  ghost: "text-muted-foreground hover:text-foreground",
};

export function LuxButton({
  variant = "outline",
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"a"> & { variant?: ButtonVariant }) {
  return (
    <Magnetic strength={0.22}>
      <a className={`${base} ${variants[variant]} ${className ?? ""}`} {...rest}>
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/15 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
        <span className="relative flex items-center gap-2.5">{children}</span>
      </a>
    </Magnetic>
  );
}

/** 3D tilting card. */
export function TiltCard({
  children,
  className,
  intensity = 8,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 18 });
  const sy = useSpring(my, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-intensity, intensity]);
  const glowX = useTransform(sx, [-0.5, 0.5], ["20%", "80%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["20%", "80%"]);

  return (
    <motion.div
      ref={ref}
      className={`relative [transform-style:preserve-3d] ${className ?? ""}`}
      style={{ rotateX, rotateY, perspective: 1200 }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-500 hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(220px circle at ${gx} ${gy}, oklch(0.98 0 0 / 0.09), transparent 70%)`,
          ),
        }}
      />
      {children}
    </motion.div>
  );
}

/** Custom cursor: dot + trailing ring that grows over interactive elements. */
export function LuxCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 180, damping: 20, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 180, damping: 20, mass: 0.5 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  if (typeof window !== "undefined") {
    // attach once via ref-less listener pattern
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999] hidden lg:block"
      aria-hidden
      ref={(node) => {
        if (!node) return;
        const move = (e: MouseEvent) => {
          x.set(e.clientX);
          y.set(e.clientY);
          setVisible(true);
          const el = e.target as HTMLElement | null;
          setActive(!!el?.closest("a,button,[data-cursor-hover]"));
        };
        window.addEventListener("mousemove", move, { passive: true });
      }}
    >
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-primary"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
      />
      <motion.div
        className="absolute rounded-full border border-primary/60"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: active ? 56 : 30,
          height: active ? 56 : 30,
          borderWidth: active ? 1.5 : 1,
          backgroundColor: active
            ? "oklch(0.68 0.19 295 / 0.14)"
            : "oklch(0.68 0.19 295 / 0)",
        }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

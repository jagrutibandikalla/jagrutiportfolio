import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiArrowDown, FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { LuxButton } from "@/components/motion/interactive";
import { profile } from "@/lib/portfolio-data";
import { media } from "@/lib/media";

const easeLux = [0.16, 1, 0.3, 1] as const;

function Typing() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = profile.roles[index % profile.roles.length]!;
    const delay = deleting ? 38 : text === full ? 1600 : 72;
    const timer = window.setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [text, deleting, index]);

  return (
    <span className="font-display text-primary">
      {text}
      <motion.span
        className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-primary"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </span>
  );
}

function Particles() {
  const dots = Array.from({ length: 26 }, (_, i) => ({
    id: i,
    left: (i * 37) % 100,
    top: (i * 61) % 100,
    size: 1 + ((i * 7) % 3),
    dur: 9 + ((i * 3) % 11),
  }));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-foreground/35"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
          }}
          animate={{ y: [0, -60, 0], opacity: [0, 0.9, 0] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.id * 0.4 }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={(e) =>
        setPointer({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        })
      }
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 grain"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 aurora animate-drift"
        style={{
          scale,
          x: (pointer.x - 0.5) * -60,
          y: (pointer.y - 0.5) * -40,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
          maskImage: "radial-gradient(70% 60% at 50% 40%, black, transparent)",
        }}
      />
      <Particles />

      <motion.div
        style={{ y, opacity }}
        className="mx-auto grid w-full max-w-[90rem] gap-14 px-5 sm:px-8 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-16"
      >
        <div className="flex flex-col gap-8">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: easeLux }}
          >
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-primary" />
              <span className="h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="eyebrow">Open to opportunities · {profile.location}</span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.9rem,10.5vw,8.4rem)] leading-[0.86] font-semibold">
            {["Jagruti", "Bandikalla"].map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  className={`inline-block ${i === 1 ? "text-gradient" : ""}`}
                  initial={{ y: "112%", rotate: 4 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{ duration: 1.25, delay: 0.15 + i * 0.12, ease: easeLux }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: easeLux }}
          >
            <Typing />
            <span className="block pt-3">
              Computer Science &amp; Engineering student building scalable, user-friendly
              applications — with problem solving and teamwork at the centre.
            </span>
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: easeLux }}
          >
            <LuxButton
              id="resume-download-btn"
              variant="primary"
              href={media.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Jagruti_Bandikalla_Resume.pdf"
            >
              <FiDownload size={16} /> Download Resume
            </LuxButton>
            <LuxButton href={profile.github} target="_blank" rel="noreferrer noopener">
              <FiGithub size={16} /> GitHub
            </LuxButton>
            <LuxButton href={profile.linkedin} target="_blank" rel="noreferrer noopener">
              <FiLinkedin size={16} /> LinkedIn
            </LuxButton>
            <LuxButton href={`mailto:${profile.email}`} variant="ghost">
              <FiMail size={16} /> Email
            </LuxButton>
          </motion.div>
        </div>

        {/* portrait */}
        <motion.div
          className="relative col-span-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.92, filter: "blur(18px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.4, ease: easeLux }}
          style={{ x: (pointer.x - 0.5) * 22, y: (pointer.y - 0.5) * 18 }}
        >
          <motion.img
            src={imgError ? media.profilePhotoFallback : media.profilePhoto}
            alt="Portrait of Jagruti Bandikalla"
            loading="eager"
            decoding="async"
            onError={() => setImgError(true)}
            className="w-full max-w-[500px] h-[650px] object-cover rounded-[24px] shadow-[0_0_20px_5px_rgba(138,84,255,0.3)]"
            initial={{ scale: 1.25, y: "6%" }}
            animate={{ scale: 1, y: "0%" }}
            transition={{ duration: 1.7, delay: 0.5, ease: easeLux }}
          />
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() =>
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        }
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        aria-label="Scroll to about section"
      >
        <span className="eyebrow">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <FiArrowDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  );
}

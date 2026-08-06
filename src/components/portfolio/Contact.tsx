import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiAward,
  FiBookOpen,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { Reveal, SplitText } from "@/components/motion/primitives";
import { LuxButton, Magnetic } from "@/components/motion/interactive";
import { profile, sections } from "@/lib/portfolio-data";
import resumePdf from "@/assets/resume.pdf";

const links = [
  { label: "GitHub", href: profile.github, icon: FiGithub },
  { label: "LinkedIn", href: profile.linkedin, icon: FiLinkedin },
  { label: "Credly", href: profile.credly, icon: FiAward },
  { label: "Microsoft Learn", href: profile.microsoftLearn, icon: FiBookOpen },
  { label: "Google Skills", href: profile.skillsGoogle, icon: FiArrowUpRight },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-40 grain">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 aurora animate-drift opacity-70"
      />
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <Reveal className="flex items-center gap-4">
            <span className="font-display text-xs text-primary">08</span>
            <span className="h-px w-10 bg-border" />
            <span className="eyebrow">Contact</span>
          </Reveal>

          <h2 className="max-w-5xl text-[clamp(2.4rem,9vw,7rem)] leading-[0.92] font-semibold">
            <SplitText text="Let's build something" />
            <span className="block text-gradient">
              <SplitText text="worth remembering." delay={0.2} />
            </span>
          </h2>

          <Reveal delay={0.2}>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Open to internships, full stack roles and collaborative projects. The
              fastest way to reach me is email — I reply to everything.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-4">
            <Magnetic strength={0.3}>
              <a
                href={`mailto:${profile.email}`}
                className="group inline-block font-editorial text-[clamp(1.3rem,4.4vw,3rem)] leading-none break-all text-foreground"
              >
                {profile.email}
                <span className="mt-2 block h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-700 group-hover:scale-x-100" />
              </a>
            </Magnetic>
          </Reveal>

          <Reveal delay={0.4} className="mt-6 flex flex-wrap justify-center gap-3">
            <LuxButton variant="primary" href={`mailto:${profile.email}`}>
              <FiMail size={16} /> Send an email
            </LuxButton>
            <LuxButton href={resumePdf} download="Jagruti_Bandikalla_Resume.pdf">
              <FiDownload size={16} /> Resume
            </LuxButton>
            <LuxButton href={`tel:${profile.phone.replace(/\s/g, "")}`} variant="ghost">
              <FiPhone size={16} /> {profile.phone}
            </LuxButton>
          </Reveal>

          <Reveal delay={0.5} className="mt-2 flex flex-wrap justify-center gap-2.5">
            {links.map((l) => (
              <Magnetic key={l.label} strength={0.25}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="grad-border flex items-center gap-2 rounded-full glass-panel px-4 py-2.5 text-xs font-medium transition-colors hover:text-primary"
                >
                  <l.icon size={14} /> {l.label}
                </a>
              </Magnetic>
            ))}
          </Reveal>

          <Reveal delay={0.6}>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <FiMapPin size={14} /> {profile.location}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="mx-auto max-w-[90rem] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight">
              Jagruti Bandikalla
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Java Full Stack developer in the making — building scalable, user-friendly
              applications from Chirala, Andhra Pradesh.
            </p>
            <div className="mt-6 flex gap-2">
              {links.map((l) => (
                <Magnetic key={l.label} strength={0.25}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={l.label}
                    className="grid h-11 w-11 place-items-center rounded-full glass-panel transition-colors hover:border-primary/60 hover:text-primary"
                  >
                    <l.icon size={16} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow">Navigate</p>
            <ul className="mt-5 grid grid-cols-2 gap-2.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() =>
                      document
                        .getElementById(s.id)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Languages</p>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li>English</li>
              <li>Telugu</li>
              <li>Hindi — conversational</li>
            </ul>
          </div>
        </div>

        <div className="relative mt-16 overflow-hidden">
          <motion.p
            className="font-display text-[clamp(3rem,15vw,11rem)] leading-none font-semibold tracking-tighter text-foreground/5"
            initial={{ y: "40%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            JAGRUTI
          </motion.p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Jagruti Bandikalla. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-left transition-colors hover:text-foreground sm:text-right"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

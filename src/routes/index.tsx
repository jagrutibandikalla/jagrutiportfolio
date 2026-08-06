import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Preloader } from "@/components/portfolio/Preloader";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Training } from "@/components/portfolio/Training";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Certificates } from "@/components/portfolio/Certificates";
import { Achievements, Education } from "@/components/portfolio/Education";
import { Contact, Footer } from "@/components/portfolio/Contact";
import { LuxCursor } from "@/components/motion/interactive";
import { BackToTop, MouseGlow, ThemeMorph } from "@/components/portfolio/Chrome";
import { useHydrated, useSmoothScroll, useTheme } from "@/hooks/use-portfolio";
import { profile } from "@/lib/portfolio-data";

const title = "Jagruti Bandikalla — Java Full Stack Developer Portfolio";
const description =
  "Interactive portfolio of Jagruti Bandikalla: Java Full Stack developer, CSE undergraduate. Training, skills, projects, certificates and education.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.role,
          email: `mailto:${profile.email}`,
          telephone: profile.phone,
          address: { "@type": "PostalAddress", addressLocality: "Chirala, Andhra Pradesh, India" },
          alumniOf: "Godavari Institute of Engineering and Technology",
          knowsLanguage: ["English", "Telugu", "Hindi"],
          knowsAbout: [
            "Java",
            "Full Stack Development",
            "HTML",
            "CSS",
            "JavaScript",
            "Angular",
            "SQL",
            "DevOps",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const hydrated = useHydrated();
  const [loaded, setLoaded] = useState(false);
  const { theme, toggle } = useTheme();
  const [morph, setMorph] = useState(0);
  useSmoothScroll(hydrated && loaded);

  return (
    <>
      <AnimatePresence>
        {hydrated && !loaded ? <Preloader onDone={() => setLoaded(true)} /> : null}
      </AnimatePresence>

      {hydrated ? <LuxCursor /> : null}
      {hydrated ? <MouseGlow /> : null}
      <ThemeMorph token={morph} />

      <motion.main
        initial={false}
        animate={{ opacity: loaded || !hydrated ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <Nav
          theme={theme}
          onToggleTheme={() => {
            setMorph((n) => n + 1);
            toggle();
          }}
        />
        <Hero />
        <About />
        <Training />
        <Skills />
        <Projects />
        <Certificates />
        <Education />
        <Achievements />
        <Contact />
        <Footer />
        <BackToTop />
      </motion.main>
    </>
  );
}

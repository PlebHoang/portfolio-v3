/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { animate, stagger } from "animejs";
import { Link } from "react-router-dom";

import { AboutDrawer } from "./components/AboutDrawer";
import { ContactDrawer } from "./components/ContactDrawer";
import { CustomCursor } from "./components/CustomCursor";
import { LoadingScreen } from "./components/LoadingScreen";
import { HeroSection } from "./components/HeroSection";
import { PhilosophyCarousel } from "./components/PhilosophyCarousel";
import { DesignGrid } from "./components/DesignGrid";
import { BucketList } from "./components/BucketList";
import { MarqueeTicker } from "./components/MarqueeTicker";
import { PillNav } from "./components/PillNav";
import { EnsoScreensaver } from "./components/EnsoScreensaver";
import { ItemDrawer, ItemDetails } from "./components/ItemDrawer";
import { ProjectCarousel, CarouselProject } from "./components/ProjectCarousel";
import { CommandPalette } from "./components/CommandPalette";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  description: string[];
  technologies: string[];
  link?: string;
}

const experiences: Experience[] = [
  {
    id: "sequoia-sky",
    role: "Grant Seeker & Capital Strategy",
    company: "Sequoia Sky Ltd. Co.",
    location: "Remote, Ho Chi Minh City, Vietnam",
    period: "Mar – Jun 2024",
    summary:
      "Built a structured funding pipeline for an early-stage ESG non-profit, mapping 7 green finance channels into an actionable $300k capital roadmap.",
    description: [
      "Researched sustainable finance mechanisms after noticing traditional grants were resulting in repeated rejections for their operational stage.",
      "Mapped 7 viable funding channels across green bonds and blended finance instruments with detailed eligibility and compliance criteria.",
      "Delivered a comprehensive Excel tracking model and briefed the CEO on a strategic pivot toward green finance instruments.",
    ],
    technologies: [
      "Green Finance",
      "Grant Research",
      "ESG Frameworks",
      "Capital Strategy",
    ],
    link: "https://drive.google.com/file/d/1KSDwA7mydbGayWU0AfEb8TuQd2ujGmxW/view?usp=sharing",
  },
  {
    id: "dk-engineering",
    role: "Engineering Intern",
    company: "DK Engineering Ltd.",
    location: "Onsite, Ha Noi, Vietnam",
    period: "Oct 2024",
    summary:
      "Drafted electrical power extraction schematics for a 1 MW (7,000 m²) commercial solar array and monitored live industrial IoT sensor telemetry.",
    description: [
      "Mapped circuit extraction and routing schematics across contractor and construction specifications for a 1 MW solar deployment.",
      "Monitored live AI and IoT sensor telemetry across active factory machinery.",
      "Identified an unexpected pressure anomaly on a pipeline valve in time for preventative maintenance, preventing floor downtime.",
    ],
    technologies: [
      "Solar Circuit Design",
      "Industrial IoT",
      "Sensor Telemetry",
      "Electrical Schematics",
    ],
    link: "https://docs.google.com/document/d/1sT7qXY-lAWTg8jxPSdger41W5dxy_NhA/edit?usp=sharing&ouid=105069165714848853856&rtpof=true&sd=true",
  },
  {
    id: "student-gov",
    role: "Advisor / President / Vice President",
    company: "Student Government, EMASI Van Phuc",
    location: "Onsite, Ho Chi Minh City, Vietnam",
    period: "Aug 2022 – Jun 2025",
    summary:
      "Restructured internal operations across 30+ members, built an organic PR channel, and raised ~40M VND ($2,000) in 14 days to fully self-fund Prom.",
    description: [
      "Moved team execution from scattered group chats to weekly structured agendas on Google Docs and Teams, establishing a reliable bi-monthly event cadence.",
      "Launched an organic student media and podcast channel that outperformed the official school page in audience engagement.",
      "Organized an independent campus food and beverage fundraiser over two weeks to self-fund the annual Prom without school budget.",
    ],
    technologies: [
      "Crisis Management",
      "Public Relations",
      "Fundraising",
      "Event Operations",
    ],
    link: "https://www.facebook.com/profile.php?id=100089082754802",
  },
];

const allProjects: CarouselProject[] = [
  {
    id: "morning-assistant",
    title: "AI-Integrated Morning Assistant",
    domain: "System Architecture & Automation",
    summary:
      "Containerized a Python pipeline on Docker integrating the Gemini API to automate weekly planning across Calendar, Notion, and unstructured data. Cut 60 minutes of manual scheduling down to 2–3 minutes.",
    highlight: "60 min → 3 min",
    technologies: ["Python", "Docker", "Gemini API", "Bash", "Discord Webhooks"],
    image: "./assets/morning-assistant.png",
    mediaType: "diagram",
    diagramImage: "./assets/morning-assistant.png",
    diagramCaption: "Containerized Morning Assistant Automation Pipeline Architecture (Docker + Gemini API)",
  },
  {
    id: "hackathon-rover",
    title: "Gemini × Makers Odyssey Hackathon",
    domain: "Product Design & Prototyping",
    summary:
      "3D-printed an adaptable-wheel rover chassis in Fusion 360 and engineered offline ESP-to-ESP wireless mesh telemetry for a NASA-inspired Martian exploration challenge. Delivered a fully functional prototype within 48 hours and won 3rd Place overall.",
    highlight: "3rd Place",
    technologies: ["Fusion 360", "3D Printing", "Arduino", "ESP Mesh"],
    image: "./assets/odysee/gemini x odysee.jpg",
    mediaType: "gallery",
    images: [
      { src: "./assets/odysee/gemini x odysee.jpg", caption: "Final Mars Rover Prototype on Test Course" },
      { src: "./assets/odysee/CDFCAFD5-4252-4971-B86A-70FB4F408F75.JPG", caption: "ESP Mesh Wireless Breadboard & Telemetry Wiring" },
      { src: "./assets/odysee/IMG_8238.webp", caption: "Modular Wheel & Suspension Testing" },
      { src: "./assets/odysee/IMG_8250.webp", caption: "Chassis Assembly & Motor Mounting" },
      { src: "./assets/odysee/IMG_8321.webp", caption: "Field Testing on Rugged Surface" },
      { src: "./assets/odysee/IMG_8322.webp", caption: "Sprint Prototyping & Iteration" },
      { src: "./assets/odysee/IMG_8323.webp", caption: "Testing Sensor Array" },
    ],
  },
  {
    id: "yearone-01",
    title: "The Fresh Connection",
    domain: "Supply Chain • Year 1",
    summary:
      "Simulated and stress-tested multi-tier supply chain networks under severe bullwhip effect scenarios, identifying critical inventory bottlenecks that destabilized fulfillment cycles.",
    highlight: "Bullwhip Diagnosis",
    technologies: ["Supply Chain Simulation", "Bullwhip Diagnostics", "Safety Stock Modeling", "Supplier SLAs", "ROI Optimization"],
    image: "./assets/fresh-connection.webp",
    mediaType: "simulation",
    simulationImage: "./assets/fresh-connection.webp",
    simulationStats: [
      { label: "ROI Target", value: "+8.4%" },
      { label: "Service Level", value: "96.8%" },
      { label: "Bullwhip Lag", value: "-42%" },
    ],
  },
  {
    id: "yearone-02",
    title: "33-Sheet Excel Beast",
    domain: "Operations • Year 1",
    summary:
      "Engineered an end-to-end 33-sheet parametric factory model with 2 teammates: ABC inventory analysis, MTM motion study, transport intensity matrices, facility layout optimization, and full BOM planning.",
    highlight: "Parametric Model",
    technologies: ["Advanced Excel (.XLSM)", "BOM Architecture", "MTM Motion Study", "ABC Inventory Analysis", "Transport Intensity Matrices"],
    image: "./assets/excel-beast-thumb.png",
    mediaType: "spreadsheet",
    spreadsheet: {
      downloadUrl: "./assets/33-sheets-beast.xlsm",
      fileLabel: "Parametric Factory Operations Model (.XLSM)",
      size: "734 KB",
      sheetsCount: 33,
      sheets: [
        { code: "S01", name: "Production Morphology", desc: "Process taxonomy & machine classification" },
        { code: "S14", name: "ABC Output", desc: "Cumulative value Pareto curves for components" },
        { code: "S15", name: "BOM Hierarchy", desc: "Multi-level parametric product structure tree" },
        { code: "S27", name: "Material Flow Matrix", desc: "From-to transit frequency across workstations" },
        { code: "S30", name: "Transport Intensity Matrix", desc: "Distance-weighted volume transport optimization" },
        { code: "S32", name: "MTM Motion Elements", desc: "Micro-motion synthesis calculating standard cycle times" },
        { code: "S33", name: "Required Operators", desc: "Takt time and staffing balancing equations" },
      ],
    },
  },
  {
    id: "yearone-03",
    title: "Sumobot (4th Place)",
    domain: "Hardware • Year 1",
    summary:
      "Wired and programmed an autonomous combat sumobot from scratch with no commercial kit or template. Placed 4th overall in the campus engineering tournament.",
    highlight: "4th Place",
    technologies: ["C++", "Arduino / Microcontrollers", "Ultrasonic Sensors", "IR Edge Detection", "Chassis Design", "Dual DC Drivetrain"],
    image: "./assets/sumobot-thumb.jpg",
    mediaType: "video",
    videos: [
      { title: "Match 1: Preliminary Bout", src: "./assets/Fight 1.mp4" },
      { title: "Match 2: Elimination Round", src: "./assets/Fight 2.mp4" },
    ],
  },
  {
    id: "yearone-04",
    title: "3D Printed Room Parts",
    domain: "Self-driven • Year 1",
    summary:
      "Sourced and adapted existing CAD designs to 3D print and post-process custom functional room organizers and brackets by hand, solving personal storage bottlenecks.",
    highlight: "Functional CAD",
    technologies: ["3D Printing", "CAD Slicing", "PLA Post-Processing", "Tolerance Fitting"],
    image: "./assets/odysee/IMG_8238.webp",
    mediaType: "gallery",
    images: [
      { src: "./assets/odysee/IMG_8238.webp", caption: "Custom functional room organizers & brackets" },
    ],
  },
];

const capabilities = [
  {
    id: "industrial-eng",
    title: "Industrial Engineering & Operations",
    skills: ["Supply Chain", "Factory Design", "Lean MTM/BOM", "Operations"],
    description:
      "Optimizing manufacturing processes, modeling facility layouts, and simulating dynamic production networks under real constraints.",
    proof: "33-Sheet Factory Model · The Fresh Connection",
  },
  {
    id: "software-sys",
    title: "Software & Automation",
    skills: ["Python", "Docker", "Gemini API", "TypeScript/Bun"],
    description:
      "Building containerized automation pipelines, LLM-integrated workflows, and reliable full-stack developer tools.",
    proof: "Morning Assistant · Docker Pipelines",
  },
  {
    id: "robotics",
    title: "Hardware Prototyping & CAD",
    skills: ["Fusion 360", "3D Printing", "Arduino", "ESP Mesh"],
    description:
      "Designing mechanical enclosures, rapid 3D prototyping, and programming microcontrollers for offline telemetry.",
    proof: "Gemini Mars Rover · Autonomous Sumobot",
  },
  {
    id: "sustainability",
    title: "Sustainability & Energy Systems",
    skills: ["Solar Circuit Design", "ESG Frameworks", "Green Finance", "Sensors"],
    description:
      "Mapping solar power extraction schematics, researching ESG compliance, and structuring green capital roadmaps.",
    proof: "DK Engineering 1 MW · Sequoia Sky",
  },
];

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [showEnso, setShowEnso] = useState(false);
  const [konamiFound, setKonamiFound] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemDetails | null>(null);

  const { scrollY } = useScroll();
  const headerShadow = useTransform(
    scrollY,
    [550, 650],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 4px 20px rgba(0,0,0,0.06)"]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "g") {
        e.preventDefault();
        setShowGrid((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Keyboard shortcut listener for Command Palette (⌘K)
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowPalette((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  // Konami Code detector for secret inline toast
  useEffect(() => {
    const konamiSeq = [
      "arrowup",
      "arrowup",
      "arrowdown",
      "arrowdown",
      "arrowleft",
      "arrowright",
      "arrowleft",
      "arrowright",
      "b",
      "a",
    ];
    let index = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === konamiSeq[index]) {
        index++;
        if (index === konamiSeq.length) {
          index = 0;
          setKonamiFound(true);
          setTimeout(() => setKonamiFound(false), 4000);
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);



  // 15-second Idle screensaver timer
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      if (isLoading || isAboutOpen || isContactOpen || showPalette || showEnso) return;

      idleTimer = setTimeout(() => {
        setShowEnso(true);
      }, 60000);
    };

    const events = ["mousemove", "keydown", "scroll", "touchstart", "click"];
    events.forEach((event) => window.addEventListener(event, resetIdleTimer, { passive: true }));
    
    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      events.forEach((event) => window.removeEventListener(event, resetIdleTimer));
    };
  }, [isLoading, isAboutOpen, isContactOpen, showPalette, showEnso]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    animate(e.currentTarget, {
      scale: 1.05,
      translateY: -2,
      duration: 400,
      easing: "spring(1, 80, 10, 0)",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    animate(e.currentTarget, {
      scale: 1.0,
      translateY: 0,
      duration: 400,
      easing: "spring(1, 80, 10, 0)",
    });
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -100px 0px",
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "capabilities") {
            animate("#capabilities .capability-item", {
              translateY: [40, 0],
              scale: [0.97, 1],
              opacity: [0, 1],
              delay: stagger(60),
              easing: "spring(1, 80, 10, 0)",
            });
            observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);

    const capabilitiesEl = document.getElementById("capabilities");
    if (capabilitiesEl) observer.observe(capabilitiesEl);

    return () => {
      if (capabilitiesEl) observer.unobserve(capabilitiesEl);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };



  const sectionReveal = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
  };

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Ensō Screensaver */}
      <AnimatePresence>
        {showEnso && <EnsoScreensaver onDismiss={() => setShowEnso(false)} />}
      </AnimatePresence>

      {/* Konami Easter Egg Toast */}
      <AnimatePresence>
        {konamiFound && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-black text-white font-mono text-xs rounded-full shadow-2xl flex items-center gap-2 border border-neutral-800"
          >
            <span className="animate-bounce">🎮</span> ↑↑↓↓←→←→BA · You found it. Let's build something.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Item Details Drawer */}
      <ItemDrawer item={selectedItem} onClose={() => setSelectedItem(null)} />

      {/* Command Palette */}
      <CommandPalette
        isOpen={showPalette}
        onClose={() => setShowPalette(false)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Pill Navigation */}
      <PillNav onOpenPalette={() => setShowPalette(true)} />

      <div className="min-h-screen flex flex-col justify-between selection:bg-black selection:text-white relative bg-[#F7F6F3]">
        {/* Subtle dot-grid texture overlay */}
        <div className="pointer-events-none fixed inset-0 opacity-[0.018] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] z-40" />

        {/* ── HEADER ── */}
        <motion.header style={{ boxShadow: headerShadow }} className="sticky top-0 w-full z-50 bg-[#F7F6F3]/80 backdrop-blur-md border-b border-[#d4d4d0]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1.5 cursor-pointer select-none group"
              id="brand-logo"
            >
              <span className="font-serif font-black text-2xl tracking-tighter text-[#111111] transition-colors duration-300 group-hover:opacity-75">
                KH
              </span>
              <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse mt-2" />
            </button>

            <nav className="flex items-center gap-6 md:gap-8">
              {/* Design Grid Toggle */}
              <button
                onClick={() => setShowGrid(!showGrid)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="px-3 py-1.5 border border-[#d4d4d0] hover:border-black hover:bg-neutral-100 rounded transition-all cursor-pointer flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-neutral-500 hover:text-black"
                title="Toggle Design Grid (Ctrl+G)"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="1"
                    width="10"
                    height="10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill={showGrid ? "currentColor" : "none"}
                    className="transition-colors duration-300"
                  />
                </svg>
                <span>{showGrid ? "Hide Grid" : "Show Grid"}</span>
              </button>

              {[
                { label: "Works", action: () => scrollToSection("works") },
                { label: "About", action: () => setIsAboutOpen(true) },
                { label: "Contact", action: () => setIsContactOpen(true) },
              ].map(({ label, action }) => (
                <button
                  key={label}
                  onClick={action}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative py-1 group cursor-pointer text-[13px] font-sans font-bold uppercase tracking-wider text-neutral-500 hover:text-black transition-colors"
                  id={`nav-${label.toLowerCase()}`}
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black group-hover:w-full transition-all duration-300 ease-out" />
                </button>
              ))}
              <Link
                to="/newsletter"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative py-1 group cursor-pointer text-[13px] font-sans font-bold uppercase tracking-wider text-neutral-500 hover:text-black transition-colors"
              >
                Newsletter
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black group-hover:w-full transition-all duration-300 ease-out" />
              </Link>
            </nav>
          </div>
        </motion.header>

        {/* ── MAIN ── */}
        <main className="flex-1 w-full">
          {/* ── HERO: 3D Layered Composition ── */}
          <HeroSection onAboutOpen={() => setIsAboutOpen(true)} isReady={!isLoading} />

          {/* ── MARQUEE TICKER ── */}
          <MarqueeTicker />

          {/* Spacer for content sections */}
          <div className="max-w-7xl mx-auto px-6 md:px-10 w-full space-y-24 md:space-y-36 py-12 md:py-16">

            {/* ── REAL-WORLD EXPERIENCE ── */}
            <motion.section
              id="works"
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-10"
            >
              <div className="flex items-center justify-between border-b border-[#d4d4d0] pb-3 text-sm font-sans font-medium tracking-widest text-black uppercase">
                <span>Real-World Experience</span>
                <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Problems Solved · Verified</span>
              </div>

              <div className="space-y-6">
                {experiences.map((exp) => (
                  <motion.div
                    key={exp.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative border border-[#d4d4d0] bg-white/40 p-8 md:p-12 rounded-2xl transition-all duration-500 ease-[var(--ease-fluid)] hover:border-black hover:bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.12)] group will-change-transform"
                    id={`experience-${exp.id}`}
                  >
                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-display font-black text-2xl uppercase tracking-tight text-neutral-900">
                          {exp.company}
                        </h3>
                        <p className="font-sans font-bold text-sm text-black mt-1">
                          {exp.role} •{" "}
                          <span className="font-semibold text-neutral-500">{exp.period}</span>
                        </p>
                        <p className="font-sans text-xs text-neutral-400 mt-1">{exp.location}</p>
                      </div>
                      {exp.link ? (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`View ${exp.company}`}
                          className="p-2 rounded-full border border-[#d4d4d0] text-black hover:border-black hover:bg-black hover:text-white transition-all flex-shrink-0 cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <div className="p-2 rounded-full border border-[#d4d4d0] text-black group-hover:border-black group-hover:bg-black group-hover:text-white transition-all flex-shrink-0">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    {/* Summary */}
                    <p className="font-sans text-base text-neutral-600 leading-relaxed mb-4">{exp.summary}</p>

                    {/* Bullets */}
                    <ul className="space-y-2 mb-6">
                      {exp.description.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0" />
                          <p className="font-sans text-sm text-neutral-500 leading-relaxed">{bullet}</p>
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-sans text-xs uppercase tracking-wider bg-white border border-[#d4d4d0] text-neutral-600 px-2.5 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ── PROJECTS & BUILDS ── */}
            <motion.section
              id="projects"
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-10"
            >
              <div className="flex items-center justify-between border-b border-[#d4d4d0] pb-3 text-sm font-sans font-medium tracking-widest text-black uppercase">
                <span>Projects & Builds</span>
                <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Infinite Gallery</span>
              </div>

              <ProjectCarousel
                projects={allProjects}
                onSelectProject={(project) => setSelectedItem(project)}
              />
            </motion.section>

            {/* ── CORE CAPABILITIES ── */}
            <motion.section
              id="capabilities"
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-10"
            >
              <div className="flex items-center justify-between border-b border-[#d4d4d0] pb-3 text-sm font-sans font-medium tracking-widest text-black uppercase">
                <span>Core Capabilities</span>
                <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">4 Core Domains</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {capabilities.map((cap) => (
                  <motion.div
                    key={cap.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="capability-item relative border border-[#d4d4d0] bg-white/40 p-8 rounded-2xl flex flex-col justify-between min-h-[240px] transition-all duration-500 ease-[var(--ease-fluid)] hover:border-black hover:bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.12)] group will-change-transform"
                    id={`capability-${cap.id}`}
                  >
                    <div className="space-y-4">
                      <h3 className="font-display font-black text-2xl uppercase tracking-tight text-neutral-900">
                        {cap.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {cap.skills.map((skill) => (
                          <span
                            key={skill}
                            className="font-sans font-bold text-xs tracking-wider uppercase text-neutral-800 border border-neutral-300 px-3 py-1 rounded-full bg-white/60"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-sans text-base text-neutral-600 leading-relaxed mt-6">{cap.description}</p>
                      {cap.proof && (
                        <div className="mt-4 pt-3 border-t border-[#d4d4d0]/60 flex items-center justify-between text-xs font-mono text-neutral-400">
                          <span className="uppercase text-[10px] font-bold">Proof:</span>
                          <span className="text-neutral-700 font-medium">{cap.proof}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ── PHILOSOPHY ── */}
            <motion.section
              id="philosophy"
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between border-b border-[#d4d4d0] pb-3 text-xs font-sans font-bold tracking-widest text-black uppercase">
                <span>Something to Sit With</span>
                <span className="text-neutral-400 font-bold uppercase tracking-wider">静寂</span>
              </div>

              <PhilosophyCarousel />
            </motion.section>

            {/* ── BUCKET LIST ── */}
            <motion.section
              id="bucket"
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-10"
            >
              <div className="flex items-center justify-between border-b border-[#d4d4d0] pb-3 text-sm font-sans font-medium tracking-widest text-black uppercase">
                <span>Bucket List</span>
                <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Interactive Goals</span>
              </div>

              <BucketList />
            </motion.section>

            {/* ── CONNECT CTA ── */}
            <motion.section
              id="connect"
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between border-b border-[#d4d4d0] pb-3 text-sm font-sans font-medium tracking-widest text-black uppercase">
                <span>Connect</span>
                <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Opportunities</span>
              </div>

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border border-[#d4d4d0] bg-white/40 rounded-2xl p-10 md:p-16">
                <div className="space-y-3 max-w-lg">
                  <h3 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight text-neutral-900 leading-[1.1]">
                    I arrived with 4 suitcases and a dream.
                  </h3>
                  <p className="font-sans text-lg text-neutral-600 leading-relaxed">
                    First-year IEM student based in Bremen, Germany. I'm actively looking for engineering internships, research collaborations, and technical projects where I can help solve problems or build systems.
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <Mail className="w-4 h-4 text-black" />
                    <a
                      href="mailto:hoangnguyenkhoi07@gmail.com"
                      className="font-sans text-sm font-bold text-black underline hover:opacity-70 transition-opacity"
                    >
                      hoangnguyenkhoi07@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setIsContactOpen(true)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="px-8 py-4 bg-black text-white font-sans font-bold text-sm tracking-widest uppercase rounded hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer"
                  >
                    Send Message
                  </button>
                  <a
                    href="https://www.linkedin.com/in/hoangnguyenkhoi/"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="flex items-center justify-center gap-2 px-8 py-4 border border-[#d4d4d0] font-sans font-bold text-sm tracking-widest uppercase text-neutral-800 rounded hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-all cursor-pointer"
                  >
                    LinkedIn <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.section>
          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer className="w-full bg-[#FAF9F6] border-t border-[#d4d4d0] mt-8">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-neutral-600">
            <div className="flex items-center gap-3">
              <span className="font-serif font-black text-xl text-[#111111]">KH</span>
              <p className="font-sans text-xs uppercase tracking-widest font-bold text-neutral-500">
                © 2026 KHOI HOANG. ALL RIGHTS RESERVED.
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-2 font-mono text-[10px] text-neutral-400">
              <kbd className="px-1.5 py-0.5 border border-[#d4d4d0] bg-white rounded shadow-sm text-neutral-600">⌘K</kbd> command palette · <kbd className="px-1.5 py-0.5 border border-[#d4d4d0] bg-white rounded shadow-sm text-neutral-600">↑↑↓↓←→←→BA</kbd> secret code
            </div>

            <div className="flex items-center gap-8 text-xs font-sans font-bold uppercase tracking-wider">
              <a href="https://www.linkedin.com/in/hoangnguyenkhoi/" target="_blank" rel="noreferrer" className="relative py-1 group hover:text-black transition-colors">
                LinkedIn
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black group-hover:w-full transition-all duration-300 ease-out" />
              </a>
              <a href="https://github.com/PlebHoang" target="_blank" rel="noreferrer" className="relative py-1 group hover:text-black transition-colors">
                GitHub
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            </div>
          </div>
        </footer>

        {/* Design Grid Overlay */}
        <DesignGrid isVisible={showGrid} />

        {/* ── DRAWERS ── */}
        <AboutDrawer isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
        <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </div>
    </>
  );
}

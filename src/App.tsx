/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowDown, ArrowUpRight, ArrowRight, BookOpen, Layers, Zap, Info, Mail } from "lucide-react";

import { TSMonogram, ConstructorUniversityLogo, EMASIBadge, WavyPattern, CornerArrows } from "./components/SVGIcons";
import { PortraitSVG } from "./components/PortraitSVG";
import { AboutDrawer } from "./components/AboutDrawer";
import { ContactDrawer } from "./components/ContactDrawer";
import { ExperienceModal } from "./components/ExperienceModal";
import { Experience, Capability, BeyondItem } from "./types";

export default function App() {
  // Navigation & Details Drawers State
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeExperience, setActiveExperience] = useState<Experience | null>(null);
  const [imageFailed, setImageFailed] = useState(false);

  // Parallax scroll hook
  const { scrollY } = useScroll();
  
  // Transform values for parallax layers in the Hero section
  const bgTextY = useTransform(scrollY, [0, 800], [0, -100]);
  const heroImageY = useTransform(scrollY, [0, 800], [0, 60]);
  const foregroundTextY = useTransform(scrollY, [0, 800], [0, 120]);
  const arrowScrollY = useTransform(scrollY, [0, 800], [0, 180]);

  // Data Definitions
  const capabilities: Capability[] = [
    {
      id: "robotics",
      title: "Robotics & Hardware",
      skills: ["ROS2 Swarm", "3D Design", "Sumobot", "Microcontrollers"],
      description: "Designing autonomous robotic mobility systems, custom PCB integration, and swarm co-ordination software architectures."
    },
    {
      id: "industrial-eng",
      title: "Industrial Engineering",
      skills: ["Supply Chain", "Factory Design", "Lean MTM/BOM", "Operations"],
      description: "Optimizing manufacturing processes, modelling facility capacity layouts, and simulating dynamic network queue systems."
    },
    {
      id: "software-sys",
      title: "Software & Systems",
      skills: ["RAG Engine", "TypeScript/Bun", "Full-Stack", "Docker/Infra"],
      description: "Architecting high-fidelity interactive software tools, full-stack reactive applications, and secure cloud system platforms."
    }
  ];

  const experiences: Experience[] = [
    {
      id: "robotics-swarm",
      role: "Lead Systems Engineer / Researcher",
      company: "Autonomous Systems Lab",
      logoType: "ts",
      period: "2024 - Present",
      summary: "Engineered ROS2-based robotic swarm navigation algorithms and spearheaded a major $300k ESG industrial facility audit.",
      description: [
        "Co-developed autonomous rover swarm coordination algorithms utilizing ROS2 and physical simulations, achieving 3rd place in the regional hackathon.",
        "Led a comprehensive ESG operational optimization and supply chain capacity audit for a manufacturing plant with a $300k structural budget.",
        "Programmed a custom Python-based analytics engine to ingest real-time telemetry from multiple IoT sensor nodes in the lab environment."
      ],
      technologies: ["ROS2", "Python", "3D Design", "Systems Optimization", "Dynamic Systems"],
      metrics: ["3rd Place Hackathon", "$300k ESG Audit", "+45% Efficiency"]
    },
    {
      id: "constructor-uni",
      role: "Interactive Tools Developer",
      company: "Constructor University",
      logoType: "constructor",
      period: "2023 - 2024",
      summary: "Developed high-fidelity educational simulators and interactive data visualization systems for engineering courses.",
      description: [
        "Designed and implemented high-fidelity physics-based simulations on the web using SVG manipulation and React hooks.",
        "Crafted interactive data visualization screens that allowed real-time tracking of student analytics and system feedback loops.",
        "Collaborated with academic researchers to turn complex industrial engineering models into responsive, easy-to-use tools."
      ],
      technologies: ["TypeScript", "SVG Canvas", "D3.js", "React Context", "Tailwind CSS"],
      metrics: ["2.5k+ Students", "+48% Engagement", "99.8% System Uptime"]
    }
  ];

  const beyondItems: BeyondItem[] = [
    {
      id: "boxing",
      title: "Boxing Training",
      category: "Focus & Reflexes",
      imageUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=800&auto=format&fit=crop",
      description: "Honing strategic foresight, split-second analytical reactions, and persistent mental focus inside and outside the ring."
    },
    {
      id: "camera",
      title: "Vintage Cameras",
      category: "Visual Narrative",
      imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
      description: "Exploring composition mechanics, shadows, and temporal fragments using vintage mechanical SLRs."
    },
    {
      id: "mountain",
      title: "Alpine Climbing",
      category: "Grit & Alpinism",
      imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
      description: "Pushing raw endurance, altitude limits, and risk assessment paradigms across alpine glaciers and peaks."
    }
  ];

  // Helper to smooth scroll to an element
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Motion variants for philosophy staggered text reveal
  const philosophyQuote = "IT IS UNWISE TO BE TOO SURE OF ONE'S OWN WISDOM. IT IS HEALTHY TO BE REMINDED THAT THE STRONGEST MIGHT WEAKEN AND THE WISEST ERR.";
  const quoteWords = philosophyQuote.split(" ");

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      }
    }
  };

  const wordFadeIn = {
    hidden: { opacity: 0.12, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-black selection:text-white relative bg-[#F7F6F3]">
      
      {/* Editorial Decorative Background Grain / Texture overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] z-40" />

      {/* 1. HEADER NAVIGATION */}
      <header className="sticky top-0 w-full z-40 bg-[#F7F6F3]/80 backdrop-blur-md border-b border-[#d4d4d0]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo brand (KH style) */}
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

          {/* Nav menu links */}
          <nav className="flex items-center gap-8 md:gap-12">
            <button
              onClick={() => scrollToSection("works")}
              className="relative py-1 group cursor-pointer text-[13px] font-sans font-bold uppercase tracking-wider text-neutral-500 hover:text-black transition-colors"
              id="nav-works"
            >
              Works
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black group-hover:w-full transition-all duration-300 ease-out" />
            </button>

            <button
              onClick={() => setIsAboutOpen(true)}
              className="relative py-1 group cursor-pointer text-[13px] font-sans font-bold uppercase tracking-wider text-neutral-500 hover:text-black transition-colors"
              id="nav-about"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black group-hover:w-full transition-all duration-300 ease-out" />
            </button>

            <button
              onClick={() => setIsContactOpen(true)}
              className="relative py-1 group cursor-pointer text-[13px] font-sans font-bold uppercase tracking-wider text-neutral-500 hover:text-black transition-colors"
              id="nav-contact"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black group-hover:w-full transition-all duration-300 ease-out" />
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl mx-auto px-6 w-full space-y-24 md:space-y-36 py-8">
        
        {/* 2. HERO / PARALLAX HEADER */}
        <section className="relative w-full overflow-hidden bg-transparent min-h-[480px] md:min-h-[580px] flex flex-col justify-between py-6 md:py-8 select-none">
          
          {/* Top Row matching screenshot layout */}
          <div className="flex items-center justify-between text-[10px] md:text-xs font-sans font-bold tracking-[0.25em] text-[#111111] uppercase pb-4">
            <span>Think . Research . Build . Validate . Loop</span>
            <button
              onClick={() => setIsContactOpen(true)}
              className="flex items-center gap-1 group cursor-pointer focus:outline-none"
              aria-label="Connect"
              id="hero-connect-arrow"
            >
              {/* Custom elegant thin arrow matching screenshot */}
              <svg viewBox="0 0 100 24" className="w-16 h-4 text-black stroke-current transition-transform duration-300 group-hover:translate-x-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="12" x2="90" y2="12" strokeWidth="1.5" />
                <path d="M82 6 L90 12 L82 18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Massive Display Title Layers matching the layout of KHOI [PORTRAIT] HOANG with outline effect */}
          <div className="relative w-full flex-1 flex items-center justify-center py-6 min-h-[280px] sm:min-h-[380px] md:min-h-[460px] overflow-visible">
            <div className="relative w-full h-full flex items-center justify-center select-none overflow-visible">
              
              {/* Layer 1: Solid Background Text */}
              <motion.div
                style={{ y: bgTextY }}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center gap-[4vw] md:gap-[6vw] xl:gap-[8vw] pointer-events-none z-0"
              >
                <h1 className="font-display font-black text-[15vw] md:text-[12vw] leading-none text-[#111111] uppercase tracking-tighter select-none">
                  KHOI
                </h1>
                <h1 className="font-display font-black text-[15vw] md:text-[12vw] leading-none text-[#111111] uppercase tracking-tighter select-none">
                  HOANG
                </h1>
              </motion.div>
              
              {/* Layer 2: PORTRAIT IMAGE - Layered in the middle with OK sign */}
              <motion.div
                style={{ y: heroImageY }}
                className="absolute bottom-[-16px] h-[105%] sm:h-[115%] md:h-[125%] max-h-[550px] aspect-[4/5] z-10 pointer-events-none flex items-end justify-center overflow-visible"
              >
                {!imageFailed ? (
                  <img
                    src="/myface.png"
                    onError={() => {
                      setImageFailed(true);
                    }}
                    alt="Khoi Hoang elegant portrait"
                    className="h-full w-auto object-contain filter grayscale contrast-[1.15] brightness-[1.02] hover:scale-102 transition-transform duration-700 pointer-events-auto"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <PortraitSVG className="h-full w-auto aspect-[4/5] pointer-events-auto" />
                )}
              </motion.div>
              
              {/* Layer 3: Foreground Outline Text (for beautiful 3D overlay) */}
              <motion.div
                style={{ y: bgTextY }}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center gap-[4vw] md:gap-[6vw] xl:gap-[8vw] pointer-events-none z-20"
              >
                <h1 className="font-display font-black text-[15vw] md:text-[12vw] leading-none text-transparent uppercase tracking-tighter select-none">
                  KHOI
                </h1>
                <h1 className="font-display font-black text-[15vw] md:text-[12vw] leading-none text-transparent uppercase tracking-tighter select-none flex">
                  <span className="text-outline-thin">H</span>
                  <span className="text-outline-thin">O</span>
                  <span className="text-transparent">ANG</span>
                </h1>
              </motion.div>
              
            </div>
          </div>

          {/* Hero Bottom Info Rail with wavy line matching the screenshot */}
          <div className="pt-6 border-t border-[#d4d4d0] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative">
            
            {/* Left Label: Academic Identity */}
            <div className="text-left">
              <div className="font-sans text-xs font-black tracking-wider text-neutral-500 uppercase">
                IEM Student @ Constructor University
              </div>
            </div>
            
            {/* Right Wave Contour Lines precisely matching the screenshot */}
            <div className="absolute right-0 bottom-0 opacity-80 pointer-events-none translate-y-3 hidden sm:block">
              <WavyPattern className="w-32 h-20 text-neutral-400/60" />
            </div>
          </div>
        </section>

        {/* 3. PHILOSOPHY SECTION */}
        <section id="philosophy" className="space-y-6 pt-12">
          {/* Label Header */}
          <div className="flex items-center justify-between border-b border-[#d4d4d0] pb-3 text-xs font-sans font-bold tracking-widest text-black uppercase">
            <span>Philosophy</span>
            <div className="flex items-center gap-1.5 text-neutral-500">
              <span>Staggered Reveal on Scroll</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Interactive Staggered Text Block */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            className="flex flex-wrap font-display font-black text-[4.2vw] sm:text-[3.5vw] md:text-[3vw] uppercase tracking-tight text-neutral-900 leading-none select-text py-4"
          >
            {quoteWords.map((word, idx) => (
              <motion.span
                key={idx}
                variants={wordFadeIn}
                className="mr-[1.5vw] mb-[1.2vw] block relative cursor-default hover:text-neutral-500 transition-colors"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </section>

        {/* 4. YEAR ONE BENTO GRID SECTION */}
        <section id="year-one" className="space-y-8 pt-6">
          {/* Label Header */}
          <div className="flex items-center justify-between border-b border-[#d4d4d0] pb-3 text-xs font-sans font-bold tracking-widest text-black uppercase">
            <span>Year One</span>
            <span className="text-neutral-500">10-Item Academic & Leadership Bento Grid</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Item 1 */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="border border-[#d4d4d0] bg-white/40 p-4 rounded-lg flex flex-col justify-between h-32 transition-all hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] cursor-pointer"
            >
              <span className="font-mono text-[9px] text-neutral-400 font-bold">01</span>
              <h4 className="font-serif font-bold text-sm text-neutral-900 leading-tight">Supply Chain Analysis</h4>
              <span className="font-sans font-bold text-[9px] tracking-wider uppercase text-neutral-400 mt-2">Industrial Eng.</span>
            </motion.div>

            {/* Item 2 */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="border border-[#d4d4d0] bg-white/40 p-4 rounded-lg flex flex-col justify-between h-32 transition-all hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] cursor-pointer"
            >
              <span className="font-mono text-[9px] text-neutral-400 font-bold">02</span>
              <h4 className="font-serif font-bold text-sm text-neutral-900 leading-tight">33-Sheet Excel System</h4>
              <span className="font-sans font-bold text-[9px] tracking-wider uppercase text-neutral-400 mt-2">Operations</span>
            </motion.div>

            {/* Item 3 (Large) */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="col-span-2 border border-black bg-black p-4 rounded-lg flex flex-col justify-between h-32 md:h-full md:row-span-2 transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] text-white cursor-pointer"
            >
              <span className="font-mono text-[9px] text-neutral-500 font-bold">03</span>
              <div>
                <span className="inline-block bg-white/20 px-2 py-0.5 rounded text-[8px] font-sans font-bold uppercase tracking-wider mb-2">🏆 Hackathon Win</span>
                <h4 className="font-serif font-black text-base text-white leading-tight">3rd Place — Robotics Hackathon</h4>
                <p className="font-sans text-[10px] text-neutral-300 mt-1 leading-normal">Co-designed ROS2 autonomous rover swarm navigation system.</p>
              </div>
              <span className="font-sans font-bold text-[9px] tracking-wider uppercase text-neutral-400 mt-2">Robotics</span>
            </motion.div>

            {/* Item 4 */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="border border-[#d4d4d0] bg-white/40 p-4 rounded-lg flex flex-col justify-between h-32 transition-all hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] cursor-pointer"
            >
              <span className="font-mono text-[9px] text-neutral-400 font-bold">04</span>
              <h4 className="font-serif font-bold text-sm text-neutral-900 leading-tight">Game Dev Outreach</h4>
              <span className="font-sans font-bold text-[9px] tracking-wider uppercase text-neutral-400 mt-2">Leadership</span>
            </motion.div>

            {/* Item 5 */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="border border-[#d4d4d0] bg-white/40 p-4 rounded-lg flex flex-col justify-between h-32 transition-all hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] cursor-pointer"
            >
              <span className="font-mono text-[9px] text-neutral-400 font-bold">05</span>
              <h4 className="font-serif font-bold text-sm text-neutral-900 leading-tight">Sumobot — 4th Place</h4>
              <span className="font-sans font-bold text-[9px] tracking-wider uppercase text-neutral-400 mt-2">Hardware</span>
            </motion.div>

            {/* Item 6 */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="border border-[#d4d4d0] bg-white/40 p-4 rounded-lg flex flex-col justify-between h-32 transition-all hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] cursor-pointer"
            >
              <span className="font-mono text-[9px] text-neutral-400 font-bold">06</span>
              <h4 className="font-serif font-bold text-sm text-neutral-900 leading-tight">FAC — €50k Budget</h4>
              <span className="font-sans font-bold text-[9px] tracking-wider uppercase text-neutral-400 mt-2">Governance</span>
            </motion.div>

            {/* Item 7 */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="border border-[#d4d4d0] bg-white/40 p-4 rounded-lg flex flex-col justify-between h-32 transition-all hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] cursor-pointer"
            >
              <span className="font-mono text-[9px] text-neutral-400 font-bold">07</span>
              <h4 className="font-serif font-bold text-sm text-neutral-900 leading-tight">IBCM FinCon '26</h4>
              <span className="font-sans font-bold text-[9px] tracking-wider uppercase text-neutral-400 mt-2">Events</span>
            </motion.div>

            {/* Item 8 */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="border border-[#d4d4d0] bg-white/40 p-4 rounded-lg flex flex-col justify-between h-32 transition-all hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] cursor-pointer"
            >
              <span className="font-mono text-[9px] text-neutral-400 font-bold">08</span>
              <h4 className="font-serif font-bold text-sm text-neutral-900 leading-tight">Manufacturing Lab</h4>
              <span className="font-sans font-bold text-[9px] tracking-wider uppercase text-neutral-400 mt-2">Production</span>
            </motion.div>

            {/* Item 9 */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="border border-[#d4d4d0] bg-white/40 p-4 rounded-lg flex flex-col justify-between h-32 transition-all hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] cursor-pointer"
            >
              <span className="font-mono text-[9px] text-neutral-400 font-bold">09</span>
              <h4 className="font-serif font-bold text-sm text-neutral-900 leading-tight">Mercator Strasse</h4>
              <span className="font-sans font-bold text-[9px] tracking-wider uppercase text-neutral-400 mt-2">Community</span>
            </motion.div>

            {/* Item 10 */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="border border-[#d4d4d0] bg-white/40 p-4 rounded-lg flex flex-col justify-between h-32 transition-all hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] cursor-pointer"
            >
              <span className="font-mono text-[9px] text-neutral-400 font-bold">10</span>
              <h4 className="font-serif font-bold text-sm text-neutral-900 leading-tight">3D Printed Parts</h4>
              <span className="font-sans font-bold text-[9px] tracking-wider uppercase text-neutral-400 mt-2">Self-driven</span>
            </motion.div>
          </div>
        </section>

        {/* 5. CAPABILITIES SECTION */}
        <section id="capabilities" className="space-y-8">
          {/* Label Header */}
          <div className="flex items-center justify-between border-b border-[#d4d4d0] pb-3 text-xs font-sans font-bold tracking-widest text-black uppercase">
            <span>Capabilities</span>
            <span className="text-neutral-500">Hover: Scale, Border, Shadow</span>
          </div>

          {/* Grid Layout Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <motion.div
                key={cap.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className={`relative border border-[#d4d4d0] bg-white/40 p-6 md:p-8 rounded-lg flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:border-black hover:bg-white hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.12)] group ${
                  cap.id === "front-eng" ? "md:scale-[1.02] border-black z-10 shadow-[0_0_20px_rgba(0,0,0,0.04)]" : ""
                }`}
                id={`capability-${cap.id}`}
              >
                {/* Custom active corner elements for frontend engineering highlight */}
                {cap.id === "front-eng" && <CornerArrows className="text-black" />}

                <div className="space-y-4">
                  <h3 className="font-display font-black text-xl uppercase tracking-tight text-neutral-900">
                    {cap.title}
                  </h3>
                  
                  {/* Skills capsule row */}
                  <div className="flex flex-wrap gap-2">
                    {cap.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-sans font-bold text-[10px] tracking-wider uppercase text-neutral-800 border border-neutral-300 px-2 py-0.5 rounded-full bg-white/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="font-sans text-xs text-neutral-600 leading-relaxed mt-6">
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. SELECTED EXPERIENCE SECTION */}
        <section id="works" className="space-y-8">
          {/* Label Header */}
          <div className="flex items-center justify-between border-b border-[#d4d4d0] pb-3 text-xs font-sans font-bold tracking-widest text-black uppercase">
            <span>Selected Experience</span>
            <span className="text-neutral-500">Hover: Scale, Border, Shadow / Click to Inspect</span>
          </div>

          {/* List Layout Cards */}
          <div className="space-y-6">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => setActiveExperience(exp)}
                className="relative border border-[#d4d4d0] bg-white/40 p-6 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all duration-300 hover:border-black hover:bg-white hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.12)] cursor-pointer group"
                id={`experience-${exp.id}`}
              >
                {/* Left Brand Badge */}
                <div className="flex items-center gap-6">
                  {exp.logoType === "ts" ? (
                    <TSMonogram className="w-16 h-16 rounded shadow-sm text-black bg-white border border-[#d4d4d0] flex-shrink-0" />
                  ) : (
                    <div className="p-2 border border-[#d4d4d0] rounded bg-white shadow-sm flex-shrink-0">
                      <ConstructorUniversityLogo className="h-12 w-auto text-black" />
                    </div>
                  )}

                  {/* Mid Title Details */}
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-lg uppercase tracking-tight text-neutral-900 group-hover:opacity-80 transition-colors">
                      {exp.company}
                    </h3>
                    <p className="font-sans font-bold text-xs text-black">
                      {exp.role} • <span className="font-semibold text-neutral-500">{exp.period}</span>
                    </p>
                  </div>
                </div>

                {/* Right Description summary */}
                <div className="flex-1 sm:max-w-md md:max-w-xl text-left">
                  <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                    {exp.summary}
                  </p>
                  
                  {/* Highlights preview */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {exp.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="font-sans text-[9px] uppercase tracking-wider bg-white border border-[#d4d4d0] text-neutral-600 px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    <span className="font-sans text-[9px] uppercase font-bold tracking-wider text-neutral-400">
                      +{exp.technologies.length - 3} More
                    </span>
                  </div>
                </div>

                {/* Inspect Button indicator */}
                <div className="p-2 rounded-full border border-[#d4d4d0] text-black group-hover:border-black group-hover:bg-black group-hover:text-white transition-all self-end sm:self-auto flex-shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. PROCESS LOOP SECTION */}
        <section id="process" className="space-y-8 pt-6">
          {/* Label Header */}
          <div className="flex items-center justify-between border-b border-[#d4d4d0] pb-3 text-xs font-sans font-bold tracking-widest text-black uppercase">
            <span>The Loop</span>
            <span className="text-neutral-500">Narrative Engineering Process Diagram</span>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 border border-[#d4d4d0] bg-white/40 rounded-lg p-8 md:p-12 relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 opacity-5 pointer-events-none translate-x-12 -translate-y-12">
              <span className="font-serif font-black text-[20vw] uppercase text-black select-none">LOOP</span>
            </div>

            {/* Narrative text Column */}
            <div className="max-w-md space-y-4 text-left">
              <span className="font-mono text-[9px] tracking-widest uppercase text-neutral-400 font-bold">Process Methodology</span>
              <h3 className="font-display font-black text-3xl uppercase tracking-tight text-neutral-900 leading-none">
                THE LOOP
              </h3>
              <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                I do not view engineering as a linear path, but rather a recursive circle of structured investigation. 
                Each step in my build sequence informs the next, validating hypotheses before committing to production.
              </p>
              <div className="pt-4 border-t border-[#d4d4d0]/60 space-y-2">
                <p className="font-sans text-[11px] leading-relaxed text-neutral-500 font-bold italic">
                  "To muddle through with excellence is better than to plan with mediocrity."
                </p>
                <span className="font-sans text-[10px] uppercase font-bold text-neutral-400">— Barbara Johnson</span>
              </div>
            </div>

            {/* SVG Interactive Loop Diagram Column */}
            <div className="flex-1 w-full flex items-center justify-center min-h-[440px]">
              <svg viewBox="0 0 500 420" className="w-full max-w-[480px] h-auto drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#111111"/>
                  </marker>
                </defs>

                {/* ANIMATED LINES: Main flow */}
                <motion.line
                  x1="250" y1="50" x2="250" y2="80"
                  stroke="#111111" strokeWidth="1.5"
                  markerEnd="url(#arrowhead)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                />

                <motion.line
                  x1="250" y1="120" x2="250" y2="150"
                  stroke="#111111" strokeWidth="1.5"
                  markerEnd="url(#arrowhead)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.1, duration: 0.4 }}
                />

                <motion.line
                  x1="250" y1="190" x2="250" y2="220"
                  stroke="#111111" strokeWidth="1.5"
                  markerEnd="url(#arrowhead)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.9, duration: 0.4 }}
                />

                <motion.line
                  x1="250" y1="260" x2="250" y2="290"
                  stroke="#111111" strokeWidth="1.5"
                  markerEnd="url(#arrowhead)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.7, duration: 0.4 }}
                />

                <motion.line
                  x1="250" y1="330" x2="250" y2="365"
                  stroke="#111111" strokeWidth="1.5"
                  markerEnd="url(#arrowhead)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 3.5, duration: 0.4 }}
                />

                {/* ANIMATED LINES: Branch lines */}
                <motion.line
                  x1="305" y1="100" x2="360" y2="100"
                  stroke="#111111" strokeWidth="1.5"
                  markerEnd="url(#arrowhead)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9, duration: 0.3 }}
                />

                <motion.line
                  x1="305" y1="310" x2="360" y2="310"
                  stroke="#111111" strokeWidth="1.5"
                  markerEnd="url(#arrowhead)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 3.1, duration: 0.3 }}
                />

                {/* ANIMATED LINES: Loop-back curved arrow */}
                <motion.path
                  d="M 450 310 Q 480 310, 480 200 Q 480 100, 305 100"
                  fill="none" stroke="#111111" strokeWidth="1.5"
                  markerEnd="url(#arrowhead)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 3.9, duration: 0.8 }}
                />

                {/* MAIN PATH NODES */}
                {/* Observe */}
                <motion.rect
                  x="195" y="10" width="110" height="40" rx="6"
                  initial={{ fill: "#ffffff", stroke: "#d4d4d0" }}
                  whileInView={{ fill: "#ffffff", stroke: "#111111" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="cursor-pointer hover:bg-neutral-50 transition-colors"
                />
                <text x="250" y="34" textAnchor="middle" className="font-mono text-[10px] font-bold tracking-widest fill-black pointer-events-none">OBSERVE</text>

                {/* Search */}
                <motion.rect
                  x="195" y="80" width="110" height="40" rx="6"
                  initial={{ fill: "#ffffff", stroke: "#d4d4d0" }}
                  whileInView={{ fill: "#ffffff", stroke: "#111111" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="cursor-pointer"
                />
                <text x="250" y="104" textAnchor="middle" className="font-mono text-[10px] font-bold tracking-widest fill-black pointer-events-none">SEARCH</text>

                {/* Question */}
                <motion.rect
                  x="195" y="150" width="110" height="40" rx="6"
                  initial={{ fill: "#ffffff", stroke: "#d4d4d0" }}
                  whileInView={{ fill: "#ffffff", stroke: "#111111" }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5 }}
                  className="cursor-pointer"
                />
                <text x="250" y="174" textAnchor="middle" className="font-mono text-[10px] font-bold tracking-widest fill-black pointer-events-none">QUESTION</text>

                {/* Prototype */}
                <motion.rect
                  x="195" y="220" width="110" height="40" rx="6"
                  initial={{ fill: "#ffffff", stroke: "#d4d4d0" }}
                  whileInView={{ fill: "#ffffff", stroke: "#111111" }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.3 }}
                  className="cursor-pointer"
                />
                <text x="250" y="244" textAnchor="middle" className="font-mono text-[10px] font-bold tracking-widest fill-black pointer-events-none">PROTOTYPE</text>

                {/* Test */}
                <motion.rect
                  x="195" y="290" width="110" height="40" rx="6"
                  initial={{ fill: "#ffffff", stroke: "#d4d4d0" }}
                  whileInView={{ fill: "#ffffff", stroke: "#111111" }}
                  viewport={{ once: true }}
                  transition={{ delay: 3.1 }}
                  className="cursor-pointer"
                />
                <text x="250" y="314" textAnchor="middle" className="font-mono text-[10px] font-bold tracking-widest fill-black pointer-events-none">TEST</text>

                {/* Ship */}
                <motion.rect
                  x="195" y="365" width="110" height="40" rx="6"
                  initial={{ fill: "#ffffff", stroke: "#d4d4d0" }}
                  whileInView={{ fill: "#000000", stroke: "#000000" }}
                  viewport={{ once: true }}
                  transition={{ delay: 3.8 }}
                  className="cursor-pointer"
                />
                <text x="250" y="389" textAnchor="middle" className="font-mono text-[10px] font-bold tracking-widest fill-white pointer-events-none">SHIP</text>

                {/* BRANCH NODES */}
                {/* Follow Proven Path */}
                <motion.rect
                  x="360" y="80" width="130" height="40" rx="6"
                  initial={{ fill: "#ffffff", stroke: "#d4d4d0" }}
                  whileInView={{ fill: "#ffffff", stroke: "#111111" }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.1 }}
                />
                <text x="425" y="99" textAnchor="middle" className="font-sans text-[8px] font-black fill-black pointer-events-none">FOLLOW PROVEN</text>
                <text x="425" y="111" textAnchor="middle" className="font-sans text-[8px] font-black fill-black pointer-events-none">PATH</text>

                {/* Break? */}
                <motion.rect
                  x="360" y="290" width="90" height="40" rx="6"
                  initial={{ fill: "#ffffff", stroke: "#d4d4d0" }}
                  whileInView={{ fill: "#ffffff", stroke: "#111111" }}
                  viewport={{ once: true }}
                  transition={{ delay: 3.3 }}
                />
                <text x="405" y="314" textAnchor="middle" className="font-mono text-[9px] font-bold fill-black pointer-events-none">BREAK?</text>

                {/* Labels & Subtexts */}
                <text x="312" y="93" className="font-sans text-[7px] font-bold fill-neutral-400 pointer-events-none">no better idea</text>
                <text x="312" y="303" className="font-sans text-[7px] font-bold fill-neutral-400 pointer-events-none">fails?</text>
                <text x="430" y="200" className="font-sans text-[7px] font-bold fill-neutral-400 pointer-events-none text-right">loop back</text>
              </svg>
            </div>
          </div>
        </section>

        {/* 7. BEYOND DESIGN SECTION */}
        <section id="beyond" className="space-y-8">
          {/* Label Header */}
          <div className="flex items-center justify-between border-b border-[#d4d4d0] pb-3 text-xs font-sans font-bold tracking-widest text-black uppercase">
            <span>Beyond Design</span>
            <span className="text-neutral-500">Hover: Zoom & Caption Overlay</span>
          </div>

          {/* 3 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {beyondItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                className="relative aspect-[3/4] border border-[#d4d4d0] bg-white rounded-lg overflow-hidden group shadow-sm flex flex-col justify-end"
                id={`beyond-${item.id}`}
              >
                {/* Image background with grayscale styling */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-75 group-hover:scale-110 group-hover:contrast-125 group-hover:brightness-90 transition-all duration-700 pointer-events-none"
                  referrerPolicy="no-referrer"
                />

                {/* Hover overlay mask */}
                <div className="absolute inset-0 bg-neutral-950/45 opacity-100 group-hover:opacity-85 group-hover:bg-neutral-950/90 transition-all duration-500" />

                {/* Caption labels */}
                <div className="relative p-6 text-white z-10 flex flex-col justify-end h-full">
                  
                  {/* Category Pill Tag */}
                  <span className="font-sans font-bold text-[9px] uppercase tracking-widest text-black border border-white/40 px-2 py-0.5 rounded-full w-max bg-white/80 mb-2">
                    {item.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-display font-black text-xl uppercase tracking-tight">
                    {item.title}
                  </h3>

                  {/* Description - Slides up on hover */}
                  <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-[100px] group-hover:opacity-100 group-hover:mt-3 transition-all duration-500 ease-out">
                    <p className="font-sans text-xs text-neutral-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Subtle visual link marker */}
                <div className="absolute top-4 right-4 p-2 rounded-full border border-black/20 text-black opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-90 transition-all duration-300 z-20 bg-white/80">
                  <Info className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>

      {/* 7. FOOTER SECTION */}
      <footer className="w-full bg-[#FAF9F6] border-t border-[#d4d4d0] mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-neutral-600">
          
          {/* Copyright notice */}
          <div className="flex items-center gap-3">
            <span className="font-serif font-black text-xl text-[#111111]">KH</span>
            <p className="font-sans text-xs uppercase tracking-widest font-bold text-neutral-500">
              © 2026 KHOI HOANG. ALL RIGHTS RESERVED.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-8 text-xs font-sans font-bold uppercase tracking-wider">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="relative py-1 group hover:text-black transition-colors"
            >
              LinkedIn
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black group-hover:w-full transition-all duration-300 ease-out" />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="relative py-1 group hover:text-black transition-colors"
            >
              GitHub
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black group-hover:w-full transition-all duration-300 ease-out" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="relative py-1 group hover:text-black transition-colors"
            >
              Instagram
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black group-hover:w-full transition-all duration-300 ease-out" />
            </a>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE COMPONENT LAYERS (MODAL / DRAWERS) */}
      <AboutDrawer isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <ExperienceModal experience={activeExperience} onClose={() => setActiveExperience(null)} />

    </div>
  );
}

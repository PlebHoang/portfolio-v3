/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { LiquidGlassBadge, LiquidButton, GlassFilter } from "./ui/liquid-glass-button";

interface HeroSectionProps {
  onAboutOpen: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onAboutOpen }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effects
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 600], [0, 180]);
  const heroFaceY = useTransform(scrollY, [0, 600], [0, -40]);
  const heroFaceScale = useTransform(scrollY, [200, 600], [1.3, 1.5]);

  // Scroll parallax for top badges and bottom value proposition dock
  const heroChipsY = useTransform(scrollY, [0, 500], [0, 110]);
  const heroChipsOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const heroHudY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroHudOpacity = useTransform(scrollY, [0, 480], [1, 0.15]);

  // Letter split configuration
  const firstRow = ["K", "H", "O", "I"];
  const secondRow = ["H", "O", "A", "N", "G"];
  const totalLetters = firstRow.length + secondRow.length;

  // Refs for tracking letter centers
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const outlineLetterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Raw cursor displacement motion values
  const xMotionValues = Array.from({ length: totalLetters }, () => useMotionValue(0));
  const yMotionValues = Array.from({ length: totalLetters }, () => useMotionValue(0));

  // Spring configurations for organic lag and inertia
  const springConfig = { stiffness: 120, damping: 14, mass: 0.8 };
  const xSprings = xMotionValues.map((v) => useSpring(v, springConfig));
  const ySprings = yMotionValues.map((v) => useSpring(v, springConfig));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;

    letterRefs.current.forEach((el, index) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2;
      const letterCenterY = rect.top + rect.height / 2;

      const deltaX = clientX - letterCenterX;
      const deltaY = clientY - letterCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Zen wave: fluid sine-based ripple
      const radius = 240;
      const outlineEl = outlineLetterRefs.current[index];

      if (distance < radius) {
        const force = 1 - distance / radius; // normalized weight
        const dirX = distance > 0 ? deltaX / distance : 0;
        const dirY = distance > 0 ? deltaY / distance : 0;

        const wavePhase = (distance * 0.04) - (index * 0.4);
        const amplitude = Math.sin(wavePhase) * force * 24;

        xMotionValues[index].set(dirX * amplitude);
        yMotionValues[index].set(dirY * amplitude);

        // Zen hover letter-relative fade/glow effect
        const opacity = 0.4 + (distance / radius) * 0.6;
        el.style.opacity = String(opacity);
        if (outlineEl) outlineEl.style.opacity = String(opacity);
      } else {
        xMotionValues[index].set(0);
        yMotionValues[index].set(0);
        el.style.opacity = "1";
        if (outlineEl) outlineEl.style.opacity = "1";
      }
    });
  };

  const handleMouseLeave = () => {
    xMotionValues.forEach((v) => v.set(0));
    yMotionValues.forEach((v) => v.set(0));
    letterRefs.current.forEach((el) => {
      if (el) el.style.opacity = "1";
    });
    outlineLetterRefs.current.forEach((el) => {
      if (el) el.style.opacity = "1";
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden select-none bg-[#F7F6F3] flex items-center justify-center py-20"
      style={{ minHeight: "90vh" }}
    >
      {/* Proof Chips - Dynamic scroll motion with liquid glass styling */}
      <motion.div
        style={{ y: heroChipsY, opacity: heroChipsOpacity }}
        className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2.5 z-20 select-none w-full max-w-xl px-4 pointer-events-auto"
      >
        <LiquidGlassBadge className="text-[10px] tracking-wider py-1.5 px-3.5">
          IEM Student
        </LiquidGlassBadge>
        <LiquidGlassBadge className="text-[10px] tracking-wider py-1.5 px-3.5">
          Constructor University · Bremen
        </LiquidGlassBadge>
        <LiquidGlassBadge className="text-[10px] tracking-wider py-1.5 px-3.5">
          First-Year Builder
        </LiquidGlassBadge>
      </motion.div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center justify-center relative min-h-[60vh] md:min-h-[75vh]">
        
        {/* Layer 1: Solid Typography - Behind the image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ zIndex: 10 }}>
          <motion.div style={{ y: heroTextY }} className="flex flex-col items-center leading-[0.75]">
            <div className="flex justify-center">
              {firstRow.map((letter, idx) => (
                <motion.span
                  key={`solid-first-${idx}`}
                  ref={(el) => {
                    letterRefs.current[idx] = el;
                  }}
                  style={{ x: xSprings[idx], y: ySprings[idx] }}
                  className="inline-block font-display font-black text-[16vw] md:text-[15vw] tracking-tighter text-[#111111] transition-opacity duration-200"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <div className="flex justify-center mt-8 md:mt-12">
              {secondRow.map((letter, idx) => {
                const globalIdx = idx + firstRow.length;
                return (
                  <motion.span
                    key={`solid-second-${idx}`}
                    ref={(el) => {
                      letterRefs.current[globalIdx] = el;
                    }}
                    style={{ x: xSprings[globalIdx], y: ySprings[globalIdx] }}
                    className="inline-block font-display font-black text-[16vw] md:text-[15vw] tracking-tighter text-[#111111] transition-opacity duration-200"
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Layer 2: Subject cutout */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 20 }}>
          <motion.img
            src="/assets/myface-transparent.png"
            alt="Khoi Hoang"
            style={{ y: heroFaceY, scale: heroFaceScale }}
            className="h-[55vh] sm:h-[65vh] md:h-[75vh] w-auto object-contain pointer-events-auto filter grayscale contrast-[1.1] brightness-[1.03] select-none"
            data-cursor="view"
          />
        </div>

        {/* Layer 3: Outline Typography - In front of the image, hollow inside */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ zIndex: 30 }}>
          <motion.div style={{ y: heroTextY }} className="flex flex-col items-center leading-[0.75]">
            <div className="flex justify-center">
              {firstRow.map((letter, idx) => (
                <motion.span
                  key={`outline-first-${idx}`}
                  ref={(el) => {
                    outlineLetterRefs.current[idx] = el;
                  }}
                  style={{
                    x: xSprings[idx],
                    y: ySprings[idx],
                    WebkitTextStroke: "1.5px #111111",
                    color: "transparent",
                    WebkitTextFillColor: "transparent"
                  }}
                  className="inline-block font-display font-black text-[16vw] md:text-[15vw] tracking-tighter transition-opacity duration-200"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <div className="flex justify-center mt-8 md:mt-12">
              {secondRow.map((letter, idx) => {
                const globalIdx = idx + firstRow.length;
                return (
                  <motion.span
                    key={`outline-second-${idx}`}
                    ref={(el) => {
                      outlineLetterRefs.current[globalIdx] = el;
                    }}
                    style={{
                      x: xSprings[globalIdx],
                      y: ySprings[globalIdx],
                      WebkitTextStroke: "1.5px #111111",
                      color: "transparent",
                      WebkitTextFillColor: "transparent"
                    }}
                    className="inline-block font-display font-black text-[16vw] md:text-[15vw] tracking-tighter transition-opacity duration-200"
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        </div>

      </div>

      {/* Value Proposition & CTA Buttons - Dynamic scroll motion with liquid glass styling */}
      <motion.div
        style={{ y: heroHudY, opacity: heroHudOpacity }}
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 select-none w-full max-w-xl px-4 pointer-events-auto"
      >
        <div className="relative inline-flex items-center justify-center rounded-full px-6 py-2.5 text-center transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <div className="absolute top-0 left-0 z-0 h-full w-full rounded-full 
              bg-white/60 backdrop-blur-xl
              shadow-[0_4px_20px_rgba(0,0,0,0.04),inset_1px_1px_1px_0px_rgba(255,255,255,0.95),inset_-1px_-1px_1px_0px_rgba(0,0,0,0.08),inset_0_0_8px_2px_rgba(255,255,255,0.6)] 
              border border-white/80" />
          <div
            className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-full"
            style={{ backdropFilter: 'url("#container-glass")' }}
          />
          <p className="relative pointer-events-none z-10 font-sans text-xs sm:text-[13px] text-neutral-800 font-medium tracking-tight">
            Diagnosing broken bottlenecks, cutting the noise, and engineering working systems.
          </p>
          <GlassFilter />
        </div>

        <div className="flex gap-3 pt-0.5">
          <LiquidButton
            onClick={() => {
              const el = document.getElementById("works");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            variant="dark"
            size="md"
            className="rounded-full font-sans text-[11px] font-bold tracking-widest uppercase px-6 py-2.5 shadow-sm"
          >
            View Work
          </LiquidButton>
          <LiquidButton
            onClick={onAboutOpen}
            variant="default"
            size="md"
            className="rounded-full font-sans text-[11px] font-bold tracking-widest uppercase px-6 py-2.5 bg-white/80 shadow-sm"
          >
            About Me
          </LiquidButton>
        </div>
      </motion.div>

      {/* Bottom gradient fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#F7F6F3] to-transparent pointer-events-none z-15" />
    </section>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";

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
  const heroBottomY = useTransform(scrollY, [0, 400], [0, 80]);
  const heroBottomOpacity = useTransform(scrollY, [0, 240], [1, 0]);

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
      {/* Proof Chips */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 z-40 select-none w-full max-w-xl px-4">
        <span className="px-3 py-1 border border-[#d4d4d0] rounded-full bg-white/60 text-neutral-500 font-sans text-[10px] font-bold tracking-widest uppercase hover:border-black hover:text-black transition-colors">
          IEM Student
        </span>
        <span className="px-3 py-1 border border-[#d4d4d0] rounded-full bg-white/60 text-neutral-500 font-sans text-[10px] font-bold tracking-widest uppercase hover:border-black hover:text-black transition-colors">
          Constructor University · Bremen
        </span>
        <span className="px-3 py-1 border border-[#d4d4d0] rounded-full bg-white/60 text-neutral-500 font-sans text-[10px] font-bold tracking-widest uppercase hover:border-black hover:text-black transition-colors">
          First-Year Builder
        </span>
      </div>

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

      {/* Value Proposition & CTA Buttons */}
      <motion.div
        style={{
          y: heroBottomY,
          opacity: heroBottomOpacity,
        }}
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-25 flex flex-col items-center gap-3.5 select-none w-full max-w-2xl px-4 will-change-transform"
      >
        {/* Liquid Glass Pill */}
        <div className="relative group overflow-hidden rounded-full p-[1px] shadow-[0_8px_32px_0_rgba(0,0,0,0.06),0_2px_8px_0_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_12px_36px_0_rgba(0,0,0,0.1)] max-w-full">
          {/* Specular border sheen */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/95 via-white/40 to-white/10 pointer-events-none" />
          
          {/* Liquid Glass Container */}
          <div className="relative backdrop-blur-xl bg-[#F7F6F3]/80 border border-white/70 px-6 py-2 sm:py-2.5 rounded-full flex items-center justify-center gap-2.5 shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.95),inset_0_-1px_2px_0_rgba(0,0,0,0.06),inset_0_0_16px_rgba(255,255,255,0.5)]">
            <span className="w-1.5 h-1.5 rounded-full bg-black/80 animate-pulse flex-shrink-0" />
            <p className="font-sans text-xs sm:text-[13px] md:text-sm text-neutral-800 font-semibold tracking-tight whitespace-nowrap text-center">
              Diagnosing broken bottlenecks, cutting the noise, and engineering working systems.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-0.5">
          <button
            onClick={() => {
              const el = document.getElementById("works");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-2.5 bg-black text-white font-sans text-[11px] font-bold tracking-widest uppercase rounded hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer"
          >
            View Work
          </button>
          <button
            onClick={onAboutOpen}
            className="px-6 py-2.5 border border-[#d4d4d0] bg-white text-black font-sans text-[11px] font-bold tracking-widest uppercase rounded hover:border-black hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            About Me
          </button>
        </div>
      </motion.div>

      {/* Bottom gradient fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#F7F6F3] to-transparent pointer-events-none z-15" />
    </section>
  );
};

import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ItemDetails } from "./ItemDrawer";

export interface CarouselProject extends Partial<ItemDetails> {
  id: string;
  title: string;
  domain: string;
  summary: string;
  highlight?: string;
  technologies?: string[];
  image?: string;
}

interface ProjectCarouselProps {
  projects: CarouselProject[];
  onSelectProject: (project: ItemDetails) => void;
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, onSelectProject }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastWheelTime = useRef<number>(0);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  // Auto-play timer (3s per slot), permanently stops once user interacts
  useEffect(() => {
    if (isPaused || hasInteracted || projects.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, hasInteracted, projects.length]);

  // Non-passive wheel event listener to prevent main page scroll while spinning slots
  useEffect(() => {
    const el = containerRef.current;
    if (!el || projects.length === 0) return;

    const handleWheel = (e: WheelEvent) => {
      // Intercept wheel event and stop vertical page scroll
      e.preventDefault();
      setHasInteracted(true);

      const now = Date.now();
      if (now - lastWheelTime.current < 250) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 10) return;

      lastWheelTime.current = now;
      if (delta > 0) {
        setActiveIndex((prev) => (prev + 1) % projects.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [projects.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - touchStartX.current;
    const deltaY = endY - touchStartY.current;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      setHasInteracted(true);
      setIsPaused(true);
      if (deltaX < 0) {
        setActiveIndex((prev) => (prev + 1) % projects.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleSelect = (idx: number) => {
    setHasInteracted(true);
    setIsPaused(true);
    if (idx === activeIndex) {
      const p = projects[idx];
      onSelectProject({
        ...p,
        title: p.title,
        subtitle: `${p.domain} ${p.highlight ? `• ${p.highlight}` : ""}`,
        description: p.description || p.summary,
        technologies: p.technologies,
      });
    } else {
      setActiveIndex(idx);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full py-8 flex flex-col items-center justify-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slot Machine Display Stage */}
      <div className="relative w-full max-w-7xl h-[340px] sm:h-[420px] md:h-[480px] flex items-center justify-center overflow-hidden">
        {projects.map((proj, idx) => {
          let offset = idx - activeIndex;

          if (offset < -Math.floor(projects.length / 2)) offset += projects.length;
          if (offset > Math.floor(projects.length / 2)) offset -= projects.length;

          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          return (
            <motion.div
              key={proj.id}
              onClick={() => handleSelect(idx)}
              initial={false}
              animate={{
                x: `${offset * 105}%`,
                scale: isActive ? 1 : 0.82,
                opacity: isActive ? 1 : Math.abs(offset) === 1 ? 0.45 : 0.15,
                filter: isActive ? "grayscale(0%)" : "grayscale(100%) brightness(0.6)",
                zIndex: 10 - Math.abs(offset),
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 24,
                mass: 0.8,
              }}
              className={`group absolute cursor-pointer rounded-2xl overflow-hidden border ${
                isActive
                  ? "border-black shadow-2xl ring-2 ring-black/10"
                  : "border-[#d4d4d0] hover:border-black hover:opacity-80"
              } bg-neutral-900 aspect-[16/10] w-[280px] sm:w-[440px] md:w-[620px] transition-colors duration-300`}
            >
              {/* Background Image / Placeholder */}
              <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center overflow-hidden">
                {proj.image ? (
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-black opacity-90" />
                )}
              </div>

              {/* Text Overlay */}
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/50 to-transparent">
                {proj.highlight && (
                  <span className="self-start px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-sans font-bold uppercase tracking-wider text-white mb-2">
                    {proj.highlight}
                  </span>
                )}
                <h3 className="font-display font-black text-xl sm:text-2xl md:text-4xl text-white tracking-tight uppercase leading-tight">
                  {proj.title}
                </h3>
                <p className="font-sans font-semibold text-xs md:text-sm text-neutral-300 tracking-wider uppercase mt-1">
                  {proj.domain}
                </p>
                <p
                  className={`font-sans text-xs sm:text-sm text-neutral-400 line-clamp-2 md:line-clamp-3 mt-3 transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {proj.summary}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Slot Dot Indicators */}
      <div className="flex items-center gap-2 mt-4">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveIndex(i);
              setHasInteracted(true);
              setIsPaused(true);
            }}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              i === activeIndex ? "w-8 bg-black" : "w-2 bg-[#d4d4d0] hover:bg-neutral-500"
            }`}
            title={`Go to project ${i + 1}`}
          />
        ))}
      </div>
      <p className="font-sans text-[11px] font-bold text-neutral-400 uppercase tracking-widest mt-3 text-center px-4">
        {isTouch
          ? "Swipe to explore • Tap to inspect"
          : "Scroll wheel over gallery to spin • Click to inspect"}
      </p>
    </div>
  );
};

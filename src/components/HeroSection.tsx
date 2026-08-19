/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";

interface HeroSectionProps {
  onAboutOpen: () => void;
  isReady?: boolean;
}

const ROLE_FULL = "First-Year IEM Student @ Constructor University";
const FOCUS_FULL = "Messy manual problems → Engineered working systems";

const PERIMETER_PATH = [0, 1, 2, 3, 4, 9, 14, 13, 12, 11, 10, 5];

const DotMatrixSpinner: React.FC<{ label?: string }> = ({ label }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % PERIMETER_PATH.length);
    }, 65);
    return () => clearInterval(timer);
  }, []);

  const headIdx = PERIMETER_PATH[step];
  const midIdx = PERIMETER_PATH[(step - 1 + PERIMETER_PATH.length) % PERIMETER_PATH.length];
  const tailIdx = PERIMETER_PATH[(step - 2 + PERIMETER_PATH.length) % PERIMETER_PATH.length];

  return (
    <div className="inline-flex items-center gap-1.5 bg-neutral-100/90 border border-neutral-200/90 px-2.5 py-0.5 rounded-md align-middle shadow-xs">
      <div className="grid grid-cols-5 gap-[2.5px]">
        {Array.from({ length: 15 }).map((_, i) => {
          let bg = "bg-neutral-200";
          if (i === headIdx) bg = "bg-black";
          else if (i === midIdx) bg = "bg-neutral-700";
          else if (i === tailIdx) bg = "bg-neutral-400";
          return <span key={i} className={`w-[3.5px] h-[3.5px] rounded-full ${bg} transition-colors duration-75`} />;
        })}
      </div>
      {label && <span className="text-[11px] text-neutral-500 font-mono font-medium">{label}</span>}
    </div>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onAboutOpen, isReady = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Terminal sequence state
  const [typedRole, setTypedRole] = useState("");
  const [typedFocus, setTypedFocus] = useState("");
  const [phase, setPhase] = useState<
    "idle" | "boot" | "flicker-role" | "thinking-role" | "typing-role" | "flicker-focus" | "thinking-focus" | "typing-focus" | "done"
  >("idle");
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    let isMounted = true;
    const timers: NodeJS.Timeout[] = [];

    const addTimer = (cb: () => void, delay: number) => {
      const t = setTimeout(() => {
        if (isMounted) cb();
      }, delay);
      timers.push(t);
      return t;
    };

    const addInterval = (cb: () => boolean, interval: number) => {
      const id = setInterval(() => {
        if (!isMounted) {
          clearInterval(id);
          return;
        }
        const shouldStop = cb();
        if (shouldStop) clearInterval(id);
      }, interval);
      return id;
    };

    const startCycle = () => {
      if (!isMounted) return;

      setTypedRole("");
      setTypedFocus("");
      setPhase("flicker-role");

      // 1. Role Prompt Micro-flicker (380ms) -> Thinking spinner (1000ms)
      addTimer(() => {
        setPhase("thinking-role");

        // 2. Typing Role
        addTimer(() => {
          setPhase("typing-role");
          let roleIdx = 0;

          addInterval(() => {
            if (roleIdx < ROLE_FULL.length) {
              setTypedRole(ROLE_FULL.slice(0, roleIdx + 1));
              roleIdx++;
              return false;
            } else {
              // 3. Pause before Focus (220ms) -> Focus Prompt Micro-flicker (380ms)
              addTimer(() => {
                setPhase("flicker-focus");

                // 4. Thinking Focus (800ms)
                addTimer(() => {
                  setPhase("thinking-focus");

                  // 5. Typing Focus
                  addTimer(() => {
                    setPhase("typing-focus");
                    let focusIdx = 0;

                    addInterval(() => {
                      if (focusIdx < FOCUS_FULL.length) {
                        setTypedFocus(FOCUS_FULL.slice(0, focusIdx + 1));
                        focusIdx++;
                        return false;
                      } else {
                        // 6. Complete -> Hold state for 2 seconds, then restart cycle
                        setPhase("done");
                        addTimer(() => {
                          startCycle();
                        }, 2000);
                        return true;
                      }
                    }, 16);
                  }, 800);
                }, 380);
              }, 220);
              return true;
            }
          }, 16);
        }, 1000);
      }, 380);
    };

    // Initial boot flicker
    setTypedRole("");
    setTypedFocus("");
    setPhase("boot");
    setIsBooted(false);

    addTimer(() => {
      setIsBooted(true);
      startCycle();
    }, 250);

    return () => {
      isMounted = false;
      timers.forEach(clearTimeout);
    };
  }, [isReady]);

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
        const force = (1 - distance / radius);
        const amplitude = Math.sin((distance * 0.04) - (index * 0.4)) * force * 24;
        
        const angle = Math.atan2(deltaY, deltaX);
        const waveX = Math.cos(angle) * amplitude;
        const waveY = Math.sin(angle) * amplitude;

        xMotionValues[index].set(waveX);
        yMotionValues[index].set(waveY);

        if (el) {
          const relativeFade = 0.4 + (distance / radius) * 0.6;
          el.style.opacity = relativeFade.toString();
        }
        if (outlineEl) {
          const outlineGlow = 0.8 + (1 - distance / radius) * 0.2;
          outlineEl.style.opacity = outlineGlow.toString();
        }
      } else {
        xMotionValues[index].set(0);
        yMotionValues[index].set(0);
        if (el) el.style.opacity = "1";
        if (outlineEl) outlineEl.style.opacity = "1";
      }
    });
  };

  const handleMouseLeave = () => {
    letterRefs.current.forEach((el, index) => {
      xMotionValues[index].set(0);
      yMotionValues[index].set(0);
      if (el) el.style.opacity = "1";
      const outlineEl = outlineLetterRefs.current[index];
      if (outlineEl) outlineEl.style.opacity = "1";
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden select-none bg-[#F7F6F3] flex items-center justify-center pt-2 sm:pt-4 pb-8 sm:pb-12"
      style={{ minHeight: "calc(100vh - 120px)" }}
    >
      <style>{`
        @keyframes crtFlicker {
          0% { opacity: 0.1; filter: brightness(2) contrast(1.5); }
          20% { opacity: 0.85; filter: brightness(1.3); }
          40% { opacity: 0.35; }
          60% { opacity: 0.95; }
          80% { opacity: 0.75; }
          100% { opacity: 1; filter: brightness(1) contrast(1); }
        }
        @keyframes promptFlicker {
          0% { opacity: 0; }
          20% { opacity: 0.85; }
          40% { opacity: 0.15; }
          60% { opacity: 0.95; }
          80% { opacity: 0.35; }
          100% { opacity: 1; }
        }
        @keyframes termCursorBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .animate-crt {
          animation: crtFlicker 0.3s ease-out forwards;
        }
        .animate-prompt-flicker {
          animation: promptFlicker 0.38s ease-out forwards;
        }
        .animate-terminal-cursor {
          animation: termCursorBlink 0.85s steps(1) infinite;
        }
      `}</style>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center justify-center relative min-h-[46vh] sm:min-h-[50vh] md:min-h-[56vh] -translate-y-8 sm:-translate-y-12 md:-translate-y-16">
        
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
                  className="inline-block font-display font-black text-[15vw] md:text-[13vw] tracking-tighter text-[#111111] transition-opacity duration-200"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <div className="flex justify-center mt-5 md:mt-7">
              {secondRow.map((letter, idx) => {
                const globalIdx = idx + firstRow.length;
                return (
                  <motion.span
                    key={`solid-second-${idx}`}
                    ref={(el) => {
                      letterRefs.current[globalIdx] = el;
                    }}
                    style={{ x: xSprings[globalIdx], y: ySprings[globalIdx] }}
                    className="inline-block font-display font-black text-[15vw] md:text-[13vw] tracking-tighter text-[#111111] transition-opacity duration-200"
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
            className="h-[44vh] sm:h-[50vh] md:h-[56vh] max-h-[480px] w-auto object-contain pointer-events-auto filter grayscale contrast-[1.1] brightness-[1.03] select-none"
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
                  className="inline-block font-display font-black text-[15vw] md:text-[13vw] tracking-tighter transition-opacity duration-200"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <div className="flex justify-center mt-5 md:mt-7">
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
                    className="inline-block font-display font-black text-[15vw] md:text-[13vw] tracking-tighter transition-opacity duration-200"
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        </div>

      </div>

      {/* Terminal HUD Box & Action Buttons */}
      <motion.div
        style={{
          y: heroBottomY,
          opacity: heroBottomOpacity,
        }}
        className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-25 flex flex-col items-center gap-2.5 select-none w-full max-w-lg sm:max-w-xl md:max-w-2xl px-4 will-change-transform"
      >
        {/* Terminal HUD Box with CRT Boot Flicker */}
        <div className={`border-2 border-black bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 md:p-4.5 w-full text-left font-mono shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-2 transition-all ${isBooted ? 'animate-crt' : 'opacity-0'}`}>
          
          {/* Top Static Header */}
          <div className="flex items-center justify-between border-b border-[#d4d4d0] pb-1.5 text-[11px] sm:text-xs text-neutral-500 font-bold uppercase tracking-wide">
            <span className="flex items-center gap-2 text-neutral-900 font-bold">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              sys://khoi.portfolio
            </span>
            <span className="text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200 text-[10px] font-bold">
              Status: Active
            </span>
          </div>
          
          <div className="space-y-1.5 pt-0.5 text-neutral-800 text-xs sm:text-[13px] md:text-sm min-h-[50px]">
            {/* Line 1: Role */}
            {phase !== "idle" && phase !== "boot" && (
              <div className="flex items-center gap-2 flex-wrap min-h-[22px]">
                <span className={`text-neutral-400 font-bold ${phase === 'flicker-role' ? 'animate-prompt-flicker' : ''}`}>
                  &gt; role:
                </span>
                
                {phase === "thinking-role" && (
                  <DotMatrixSpinner label="evaluating..." />
                )}

                {typedRole && (
                  <span className="font-semibold text-neutral-900">{typedRole}</span>
                )}

                {phase === "typing-role" && (
                  <span className="inline-block w-2.5 h-3.5 bg-black align-middle animate-terminal-cursor" />
                )}
              </div>
            )}

            {/* Line 2: Focus */}
            {(phase === "flicker-focus" || phase === "thinking-focus" || phase === "typing-focus" || phase === "done") && (
              <div className="flex items-center gap-2 flex-wrap min-h-[22px]">
                <span className={`text-neutral-400 font-bold ${phase === 'flicker-focus' ? 'animate-prompt-flicker' : ''}`}>
                  &gt; focus:
                </span>
                
                {phase === "thinking-focus" && (
                  <DotMatrixSpinner label="optimizing..." />
                )}

                {typedFocus && (
                  <span className="font-semibold text-neutral-900">{typedFocus}</span>
                )}

                {(phase === "typing-focus" || phase === "done") && (
                  <span className="inline-block w-2.5 h-3.5 bg-black align-middle animate-terminal-cursor" />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 pt-0.5">
          <button
            onClick={() => {
              const el = document.getElementById("works");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-2.5 bg-black text-white font-sans text-xs font-bold tracking-widest uppercase rounded hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
          >
            View Work
          </button>
          <button
            onClick={onAboutOpen}
            className="px-6 py-2.5 border border-[#d4d4d0] bg-white text-black font-sans text-xs font-bold tracking-widest uppercase rounded hover:border-black hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            About Me
          </button>
        </div>
      </motion.div>

      {/* Bottom gradient fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F7F6F3] to-transparent pointer-events-none z-15" />
    </section>
  );
};

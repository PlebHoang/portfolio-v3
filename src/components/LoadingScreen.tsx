/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState(0);
  // 0: black | 1: monogram | 2: line | 3: tagline | 4: slide out

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1200),
      setTimeout(() => setPhase(4), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      key="loading"
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-[#111111]"
      initial={{ y: 0 }}
      animate={phase >= 4 ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (phase >= 4) {
          onComplete();
        }
      }}
    >
      {/* Monogram */}
      <motion.span
        className="font-serif font-black text-6xl text-[#F7F6F3] select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        KH
      </motion.span>

      {/* Expanding line */}
      <motion.div
        className="bg-[#F7F6F3] mt-4"
        style={{ height: 1 }}
        initial={{ width: 0 }}
        animate={{ width: phase >= 2 ? 120 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Tagline: staggered word-by-word fade in */}
      <motion.div
        className="flex flex-wrap justify-center gap-x-2 md:gap-x-3 mt-5 px-6 font-sans text-xs tracking-[0.2em] uppercase text-neutral-500 select-none"
        initial="hidden"
        animate={phase >= 3 ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {["Think.", "Research.", "Build.", "Validate.", "Loop."].map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 4 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

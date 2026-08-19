/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Quote {
  text: string;
  author: string;
  topic: string;
}

const quotes: Quote[] = [
  {
    text: "It is unwise to be too sure of one's own wisdom. It is healthy to be reminded that the strongest might weaken and the wisest err.",
    author: "Mahatma Gandhi",
    topic: "On Wisdom",
  },
  {
    text: "Learning without thought is labor lost. Thought without learning is perilous.",
    author: "Confucius",
    topic: "On Learning",
  },
  {
    text: "Never let a problem to be solved become more important than a person to be loved.",
    author: "Barbara Johnson",
    topic: "On Priorities",
  },
];

export const PhilosophyCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  // Initialize with a random index on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setIndex(randomIndex);
  }, []);

  // Cycle quote every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const activeQuote = quotes[index];

  return (
    <div className="w-full border border-[#d4d4d0] bg-white/40 rounded-2xl p-6 sm:p-8 md:p-10 min-h-[220px] sm:min-h-[190px] md:min-h-[180px] flex flex-col justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex flex-col justify-center"
        >
          <p className="font-display font-black text-xl sm:text-2xl md:text-[2.2vw] lg:text-[1.8vw] uppercase tracking-tight text-neutral-900 leading-[1.15] select-text">
            "{activeQuote?.text}"
          </p>
          
          <div className="flex items-center gap-3 mt-4 md:mt-5">
            <span className="bg-black text-[#F7F6F3] px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider">
              {activeQuote?.topic}
            </span>
            <span className="font-serif italic text-sm md:text-base text-neutral-600">
              — {activeQuote?.author}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

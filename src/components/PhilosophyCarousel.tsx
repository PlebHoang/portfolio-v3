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
    <div className="w-full min-h-[300px] sm:min-h-[250px] md:min-h-[220px] flex flex-col justify-center relative py-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="w-full flex flex-col justify-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-2xl sm:text-3xl md:text-[3.2vw] lg:text-[2.6vw] uppercase tracking-tight text-neutral-900 leading-[1.08] select-text"
          >
            "{activeQuote?.text}"
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mt-6 md:mt-8"
          >
            <span className="bg-black text-[#F7F6F3] px-3 py-1 rounded-full text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider">
              {activeQuote?.topic}
            </span>
            <span className="font-serif italic text-base md:text-lg text-neutral-600">
              , {activeQuote?.author}
            </span>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

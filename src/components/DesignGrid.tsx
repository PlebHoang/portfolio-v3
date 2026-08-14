/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface DesignGridProps {
  isVisible: boolean;
}

export const DesignGrid: React.FC<DesignGridProps> = ({ isVisible }) => {
  const [sections, setSections] = useState<{ id: string; top: number }[]>([]);

  useEffect(() => {
    if (!isVisible) return;

    const updatePositions = () => {
      const ids = ["philosophy", "year-one", "capabilities", "works", "process", "connect"];
      const coords = ids.map((id) => {
        const el = document.getElementById(id);
        return {
          id,
          top: el ? el.offsetTop : 0,
        };
      });
      setSections(coords);
    };

    // Initial offset calculation
    updatePositions();

    // Recalculate on load and resize
    window.addEventListener("resize", updatePositions);
    window.addEventListener("load", updatePositions);
    
    // Add small delay to ensure rendering is complete
    const timeout = setTimeout(updatePositions, 500);

    return () => {
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("load", updatePositions);
      clearTimeout(timeout);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="absolute inset-y-0 left-0 right-0 z-40 pointer-events-none overflow-hidden select-none">
      {/* 12-Column Grid Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-full w-full relative">
        <div className="grid grid-cols-12 gap-6 h-full w-full">
          {Array.from({ length: 12 }).map((_, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.04 }}
              transition={{ delay: idx * 0.015, duration: 0.3 }}
              className="bg-[#FF00FF] h-full w-full border-l border-r border-[#FF00FF]/10"
            />
          ))}
        </div>
        
        {/* Max-width container boundary guidelines */}
        <div className="absolute inset-y-0 left-6 right-6 md:left-10 md:right-10 border-l border-r border-dashed border-[#FF00FF]/20" />
      </div>

      {/* Horizontal baseline grid (8px spacing) */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to bottom, #FF00FF 1px, transparent 1px)",
          backgroundSize: "100% 8px",
        }}
      />

      {/* Center crosshair fixed relative to viewport */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
        <div className="absolute h-12 w-[1px] bg-[#FF00FF]/40" />
        <div className="absolute w-12 h-[1px] bg-[#FF00FF]/40" />
      </div>

      {/* Section start boundaries */}
      {sections.map((sec) => (
        <div
          key={sec.id}
          className="absolute left-0 right-0 border-t border-dashed border-[#FF00FF]/25 pointer-events-none flex items-start justify-end"
          style={{ top: sec.top }}
        >
          <span className="font-mono text-[9px] font-bold text-[#FF00FF]/70 bg-[#F7F6F3] px-2 py-0.5 -mt-2.5 mr-6 border border-[#FF00FF]/20 rounded shadow-sm">
            SECTION: #{sec.id.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
};

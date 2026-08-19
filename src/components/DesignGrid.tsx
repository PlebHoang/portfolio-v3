/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { LayoutGrid, AlignVerticalJustifyStart, MessageSquareCode } from "lucide-react";

interface DesignGridProps {
  isVisible: boolean;
}

const SECTION_DATA: Record<string, { title: string; subtitle: string; rationale: string }> = {
  works: {
    title: "Real-World Experience",
    subtitle: "Credibility & Impact",
    rationale: "Positioned first to anchor engineering competence with verified operations & grant results.",
  },
  projects: {
    title: "Projects & Builds",
    subtitle: "Tactile Prototyping",
    rationale: "Interactive horizontal gallery showcasing hardware CAD, telemetry, and containerized pipelines.",
  },
  capabilities: {
    title: "Core Capabilities",
    subtitle: "2×2 Competency Matrix",
    rationale: "Evenly balanced 4-domain quadrant allowing instant scanning of multidisciplinary skills.",
  },
  philosophy: {
    title: "Philosophy & Principles",
    subtitle: "Cognitive Breathing Room",
    rationale: "Static framed pause (静寂) designed to slow reading pace between dense technical blocks.",
  },
  bucket: {
    title: "Bucket List",
    subtitle: "Community Quest Loop",
    rationale: "Interactive visitor participation anchor with moderated submission backend.",
  },
  connect: {
    title: "Connect & Opportunities",
    subtitle: "Dialogue Terminal",
    rationale: "Direct conclusion with immediate communication channels and career inquiry forms.",
  },
};

export const DesignGrid: React.FC<DesignGridProps> = ({ isVisible }) => {
  const [sections, setSections] = useState<{ id: string; top: number }[]>([]);
  const [viewportWidth, setViewportWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1280);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  // Inspector Layer Toggles (Baseline is opt-in to keep text crisp)
  const [showColumns, setShowColumns] = useState(true);
  const [showBaseline, setShowBaseline] = useState(false);
  const [showNotes, setShowNotes] = useState(true);

  useEffect(() => {
    if (!isVisible) return;

    const updateMetrics = () => {
      setViewportWidth(window.innerWidth);
      const ids = ["works", "projects", "capabilities", "philosophy", "bucket", "connect"];
      const coords = ids
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          return {
            id,
            top: el.getBoundingClientRect().top + window.scrollY,
          };
        })
        .filter((item): item is { id: string; top: number } => item !== null);
      setSections(coords);
    };

    updateMetrics();

    window.addEventListener("resize", updateMetrics);
    window.addEventListener("scroll", updateMetrics, { passive: true });
    
    const timeout = setTimeout(updateMetrics, 250);

    return () => {
      window.removeEventListener("resize", updateMetrics);
      window.removeEventListener("scroll", updateMetrics);
      clearTimeout(timeout);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const colCount = 12;

  return (
    <div className="absolute inset-y-0 left-0 right-0 z-40 pointer-events-none select-none">
      {/* 12-Column Grid Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-full w-full relative pointer-events-none">
        {showColumns && (
          <div className="grid grid-cols-12 gap-3 md:gap-6 h-full w-full pointer-events-auto">
            {Array.from({ length: colCount }).map((_, idx) => {
              const isHovered = hoveredCol === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredCol(idx)}
                  onMouseLeave={() => setHoveredCol(null)}
                  className={`h-full w-full border-l border-r transition-colors duration-200 relative flex flex-col justify-between cursor-crosshair ${
                    isHovered
                      ? "border-black/30 bg-black/[0.04]"
                      : "border-black/[0.08] bg-black/[0.015]"
                  }`}
                >
                  {/* Column Index & Hover Specs */}
                  <div className="sticky top-20 pt-2 px-1 flex flex-col items-center">
                    <span className={`font-mono text-[9px] font-bold transition-colors ${
                      isHovered ? "text-black bg-white px-1.5 py-0.5 rounded shadow-xs border border-black/20" : "text-neutral-400"
                    }`}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {isHovered && (
                      <span className="font-mono text-[8px] text-black bg-white/95 px-1 py-0.5 mt-1 rounded border border-black/10 shadow-xs whitespace-nowrap">
                        COL {idx + 1} / 12
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Max-width container boundary guidelines & Corner Brackets */}
        <div className="absolute inset-y-0 left-6 right-6 md:left-10 md:right-10 border-l border-r border-dashed border-black/20 pointer-events-none" />
      </div>

      {/* Horizontal Baseline Grid (8px vertical rhythm) */}
      {showBaseline && (
        <div
          className="absolute inset-0 opacity-[0.018] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(to bottom, #000000 1px, transparent 1px)",
            backgroundSize: "100% 8px",
          }}
        />
      )}

      {/* Center Viewport Crosshairs */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50 opacity-30">
        <div className="absolute h-16 w-[1px] bg-black" />
        <div className="absolute w-16 h-[1px] bg-black" />
      </div>

      {/* Floating Interactive HUD Inspector Controller (Fixed Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="p-2.5 rounded-2xl backdrop-blur-xl bg-white/90 border border-black/20 shadow-[0_12px_40px_rgba(0,0,0,0.12)] flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs font-mono"
        >
          {/* Live Viewport Spec */}
          <div className="flex items-center gap-2 pr-2 sm:border-r border-black/15">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            <span className="font-bold text-black">{viewportWidth}PX</span>
            <span className="text-[10px] text-neutral-500 font-medium">
              ({viewportWidth >= 1024 ? "DESKTOP 12-COL" : viewportWidth >= 768 ? "TABLET 8-COL" : "MOBILE 4-COL"})
            </span>
          </div>

          {/* Layer Toggle Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowColumns(!showColumns)}
              title="Toggle Columns"
              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                showColumns ? "bg-black text-white" : "bg-neutral-100 text-neutral-600 hover:text-black border border-transparent hover:border-black/20"
              }`}
            >
              <LayoutGrid className="w-3 h-3" />
              <span>Cols</span>
            </button>

            <button
              onClick={() => setShowBaseline(!showBaseline)}
              title="Toggle 8px Baseline Rhythm"
              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                showBaseline ? "bg-black text-white" : "bg-neutral-100 text-neutral-600 hover:text-black border border-transparent hover:border-black/20"
              }`}
            >
              <AlignVerticalJustifyStart className="w-3 h-3" />
              <span>8px</span>
            </button>

            <button
              onClick={() => setShowNotes(!showNotes)}
              title="Toggle Design Commentary Notes"
              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                showNotes ? "bg-black text-white" : "bg-neutral-100 text-neutral-600 hover:text-black border border-transparent hover:border-black/20"
              }`}
            >
              <MessageSquareCode className="w-3 h-3" />
              <span>Notes</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Section Dividers & Non-Overlapping Gutter Annotations (Offset above content) */}
      {sections.map((sec, idx) => {
        const data = SECTION_DATA[sec.id];
        return (
          <div
            key={sec.id}
            className="absolute left-0 right-0 pointer-events-none"
            style={{ top: sec.top - 20 }}
          >
            {/* Full-width Technical Section Boundary Line */}
            <div className="border-t border-dashed border-black/25 w-full" />

            {/* Container for Gutter-Aligned Tags (Outside Content Area) */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
              {/* Technical Section ID Badge (Sits on boundary line, well above section header) */}
              <div className="absolute left-6 md:left-10 -top-3">
                <span className="font-mono text-[9px] font-bold text-black bg-[#FAF9F6] px-2 py-0.5 border border-black/40 rounded shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] tracking-wider">
                  // {String(idx + 1).padStart(2, "0")} · {sec.id.toUpperCase()}
                </span>
              </div>

              {/* Sophisticated Black and White Design Commentary Note */}
              {showNotes && data && (
                <div className="absolute right-6 md:right-10 -top-11 max-w-sm hidden md:block">
                  <div className="p-2.5 rounded-xl backdrop-blur-md bg-white/90 border border-black/30 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] text-black space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-black uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 bg-black rounded-xs" />
                      <span>{data.subtitle}</span>
                    </div>
                    <p className="text-[10px] text-neutral-600 font-sans leading-tight">
                      {data.rationale}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

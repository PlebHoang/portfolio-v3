/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, MapPin, Code, TrendingUp, Award, ExternalLink } from "lucide-react";
import { TSMonogram, ConstructorUniversityLogo } from "./SVGIcons";
import { Experience } from "../types";

interface ExperienceModalProps {
  experience: Experience | null;
  onClose: () => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ experience, onClose }) => {
  if (!experience) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-900 cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative w-full max-w-2xl bg-[#F7F6F3] border border-[#d4d4d0] rounded-lg shadow-2xl overflow-hidden flex flex-col text-[#111111] z-10 max-h-[90vh]"
        >
          {/* Header Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full border border-[#d4d4d0] hover:border-black hover:text-black transition-colors bg-[#F7F6F3] z-20 group"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Scrollable Container */}
          <div className="overflow-y-auto p-6 md:p-8 space-y-6">
            {/* Top Brand Block */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#d4d4d0]">
              <div className="flex items-center gap-4">
                {experience.logoType === "ts" ? (
                  <TSMonogram className="w-14 h-14 rounded-lg shadow-md border border-[#d4d4d0] text-black bg-white" />
                ) : (
                  <div className="p-2 border border-[#d4d4d0] rounded-lg bg-white shadow-sm">
                    <ConstructorUniversityLogo className="h-10 text-black" />
                  </div>
                )}
                <div>
                  <h3 className="font-display font-bold text-xl uppercase tracking-tight text-[#111111]">
                    {experience.company}
                  </h3>
                  <p className="font-sans font-bold text-xs text-black mt-0.5">
                    {experience.role}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col text-left sm:text-right font-sans text-xs text-neutral-600 space-y-1">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-black" />
                  <span>{experience.period}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-black" />
                  <span>{experience.logoType === "ts" ? "Remote / US" : "Bremen, Germany"}</span>
                </div>
              </div>
            </div>

            {/* Core Summary */}
            <div className="space-y-2">
              <span className="font-sans font-bold text-[10px] tracking-widest text-neutral-500 uppercase">
                Narrative Context
              </span>
              <p className="font-serif text-lg leading-relaxed text-neutral-800">
                "{experience.summary}"
              </p>
            </div>

            {/* Key Outcomes / Bullet list */}
            <div className="space-y-3">
              <span className="font-sans font-bold text-[10px] tracking-widest text-neutral-500 uppercase block">
                Engineering Achievements
              </span>
              <ul className="space-y-3">
                {experience.description.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Award className="w-4 h-4 text-black mt-1 flex-shrink-0" />
                    <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                      {bullet}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Tags */}
            <div className="space-y-2 pt-2">
              <span className="font-sans font-bold text-[10px] tracking-widest text-neutral-500 uppercase flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-black" />
                Stack Architecture
              </span>
              <div className="flex flex-wrap gap-1.5">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-sans font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 bg-white border border-[#d4d4d0] text-neutral-800 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics Achievements */}
            <div className="space-y-2 pt-2">
              <span className="font-sans font-bold text-[10px] tracking-widest text-neutral-500 uppercase flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-black" />
                Quantifiable Impact Metrics
              </span>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {experience.metrics.map((metric, idx) => {
                  const [value, ...labelParts] = metric.split(" ");
                  const label = labelParts.join(" ");
                  return (
                    <div key={idx} className="border border-[#d4d4d0] p-4 rounded-md bg-white shadow-sm text-center">
                      <p className="font-display font-black text-xl text-black tracking-tight">
                        {value}
                      </p>
                      <p className="font-sans text-[9px] text-neutral-500 uppercase tracking-wider mt-0.5 leading-snug">
                        {label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 bg-[#FAF9F6] border-t border-[#d4d4d0] flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-black text-white font-sans font-bold text-[10px] tracking-widest uppercase rounded hover:bg-neutral-800 transition-colors"
            >
              Acknowledge & Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

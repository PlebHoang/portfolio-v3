/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Linkedin, Github, Instagram, ArrowUpRight, GraduationCap, Award, BookOpen, Heart } from "lucide-react";
import { EMASIBadge, ConstructorUniversityLogo } from "./SVGIcons";

interface AboutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutDrawer: React.FC<AboutDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-900 z-50 cursor-pointer"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[550px] md:w-[650px] bg-[#F7F6F3] border-l border-[#d4d4d0] shadow-2xl z-50 flex flex-col overflow-hidden text-[#111111]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#d4d4d0]">
              <span className="font-sans font-bold tracking-widest text-xs uppercase text-[#111111]">
                About / Khoi Hoang
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-full border border-[#d4d4d0] hover:border-black hover:text-black transition-colors group"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-12">
              {/* Introduction Banner */}
              <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-[#d4d4d0] bg-neutral-200 group">
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=1200"
                  alt="Khoi Hoang grayscale background"
                  className="w-full h-full object-cover filter grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h2 className="font-display font-black text-3xl tracking-tight uppercase">Khoi Hoang</h2>
                    <p className="font-sans font-medium text-xs text-neutral-300 tracking-wider uppercase mt-1">
                      Industrial Engineering & Management @ Constructor University
                    </p>
                  </div>
                </div>
              </div>

              {/* Bio & Vision */}
              <div className="space-y-4">
                <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-500">
                  Philosophical Narrative
                </h3>
                <p className="font-serif text-xl leading-relaxed text-neutral-800">
                  "I look at engineering and software development not just as functional components, but as a bridge between structural systems and the delicate nuances of human perception."
                </p>
                <p className="font-sans text-neutral-600 leading-relaxed text-sm">
                  Originally from Vietnam, where I graduated from EMASI, my academic journey took me to Bremen, Germany, to study Industrial Engineering and Management. By combining rigorous physical systems modeling, data-driven optimization, and high-fidelity front-end design, I focus on building software experiences that are as performant as they are aesthetically meaningful.
                </p>
              </div>

              {/* Grid: Education & Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {/* Education Box */}
                <div className="border border-[#d4d4d0] p-6 rounded-lg space-y-4 bg-white/40">
                  <div className="flex items-center gap-2 text-neutral-800">
                    <GraduationCap className="w-5 h-5 text-black" />
                    <h4 className="font-sans font-bold text-xs uppercase tracking-widest">Education</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="border-l-2 border-black pl-3">
                      <p className="font-sans font-bold text-xs text-neutral-500">2023 - Present</p>
                      <p className="font-serif font-bold text-sm text-neutral-900">B.Sc. Industrial Engineering & Management</p>
                      <p className="font-sans text-xs text-neutral-600">Constructor University (Bremen, Germany)</p>
                    </div>
                    <div className="border-l-2 border-neutral-300 pl-3">
                      <p className="font-sans font-bold text-xs text-neutral-500">Graduated 2023</p>
                      <p className="font-serif font-bold text-sm text-neutral-900">High School Diploma</p>
                      <p className="font-sans text-xs text-neutral-600">EMASI Schools (Ho Chi Minh City, Vietnam)</p>
                    </div>
                  </div>
                </div>

                {/* Core Pillars */}
                <div className="border border-[#d4d4d0] p-6 rounded-lg space-y-4 bg-white/40">
                  <div className="flex items-center gap-2 text-neutral-800">
                    <Award className="w-5 h-5 text-black" />
                    <h4 className="font-sans font-bold text-xs uppercase tracking-widest">Engineering Pillars</h4>
                  </div>
                  <ul className="space-y-2 text-xs font-sans text-neutral-600 list-disc list-inside">
                    <li><strong className="text-black">System Dynamics:</strong> Modelling flow, networks, and production structures.</li>
                    <li><strong className="text-black">Frontend Craft:</strong> Turning interface wireframes into fluid animations.</li>
                    <li><strong className="text-black">Quantitative Strategy:</strong> Applying analytics for lean operations.</li>
                    <li><strong className="text-black">Design Precision:</strong> Creating distinct typographic contrast.</li>
                  </ul>
                </div>
              </div>

              {/* Beyond Code List */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2 text-neutral-800">
                  <Heart className="w-5 h-5 text-black" />
                  <h4 className="font-sans font-bold text-xs uppercase tracking-widest">Interests & Pursuits</h4>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border border-[#d4d4d0] p-4 rounded-lg text-center space-y-1 bg-white/40">
                    <span className="text-xl">🥊</span>
                    <p className="font-sans font-bold text-[11px] text-neutral-800">Boxing</p>
                    <p className="font-sans text-[10px] text-neutral-500">Focus & Reflexes</p>
                  </div>
                  <div className="border border-[#d4d4d0] p-4 rounded-lg text-center space-y-1 bg-white/40">
                    <span className="text-xl">📷</span>
                    <p className="font-sans font-bold text-[11px] text-neutral-800">Photography</p>
                    <p className="font-sans text-[10px] text-neutral-500">Composition & Story</p>
                  </div>
                  <div className="border border-[#d4d4d0] p-4 rounded-lg text-center space-y-1 bg-white/40">
                    <span className="text-xl">🏔️</span>
                    <p className="font-sans font-bold text-[11px] text-neutral-800">Alpinism</p>
                    <p className="font-sans text-[10px] text-neutral-500">Climbing & Grit</p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-4 pt-4">
                <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-500">
                  Connect Online
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-4 border border-[#d4d4d0] rounded-lg bg-white hover:border-black hover:shadow-[3px_3px_0px_0px_#000000] transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-neutral-600 group-hover:text-black transition-colors" />
                      <span className="font-sans font-medium text-xs text-neutral-800">LinkedIn</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black transition-colors" />
                  </a>

                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-4 border border-[#d4d4d0] rounded-lg bg-white hover:border-black hover:shadow-[3px_3px_0px_0px_#000000] transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-neutral-600 group-hover:text-black transition-colors" />
                      <span className="font-sans font-medium text-xs text-neutral-800">GitHub</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black transition-colors" />
                  </a>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-4 border border-[#d4d4d0] rounded-lg bg-white hover:border-black hover:shadow-[3px_3px_0px_0px_#000000] transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-neutral-600 group-hover:text-black transition-colors" />
                      <span className="font-sans font-medium text-xs text-neutral-800">Instagram</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* School Badges footer */}
            <div className="p-6 bg-[#FAF9F6] border-t border-[#d4d4d0] flex items-center justify-between">
              <EMASIBadge className="h-6 text-neutral-800" />
              <ConstructorUniversityLogo className="h-6 text-neutral-800" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

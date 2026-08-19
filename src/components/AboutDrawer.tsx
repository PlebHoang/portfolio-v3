/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Linkedin, 
  Github, 
  Instagram, 
  ExternalLink, 
  ChevronDown, 
  Utensils, 
  Music, 
  Trophy, 
  BookOpen 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Drawer } from "./Drawer";

interface AboutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SPORTS_LIST = [
  "Basketball",
  "Indoor Baseball",
  "Soccer",
  "Football",
  "Table Tennis",
  "Volleyball",
  "Tennis",
  "Swimming",
  "Skating",
  "Kickboxing",
  "Sim Racing",
  "Chess",
];

const RECIPES = [
  {
    name: "Phở Bò",
    description: "Slow-simmered spiced beef bone broth, star anise, and fresh rice noodles.",
  },
  {
    name: "Bún Chả Hà Nội",
    description: "Charcoal grilled pork patties, fresh herbs, and warm dipping broth.",
  },
  {
    name: "Cơm Tấm Sườn Nướng",
    description: "Broken rice paired with lemongrass marinated grilled pork chop.",
  },
  {
    name: "Bò Sốt Vang",
    description: "Vietnamese aromatic red wine beef stew with warm baguette.",
  },
  {
    name: "Cà Phê Phin & Trứng",
    description: "Traditional slow-drip Robusta brew and Hanoi whipped egg coffee craft.",
  },
];

export const AboutDrawer: React.FC<AboutDrawerProps> = ({ isOpen, onClose }) => {
  const [isSportsOpen, setIsSportsOpen] = useState(false);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="About / Khoi Hoang">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-9 scrollbar-thin">
        
        {/* Introduction Portrait Banner */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#d4d4d0] bg-neutral-200 group">
          <img
            src="./assets/about-photo.webp"
            alt="Khoi Hoang"
            className="w-full h-full object-cover filter grayscale contrast-[1.15] brightness-[1.02] group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent flex items-end p-6">
            <div className="text-white">
              <h2 className="font-display font-black text-2xl md:text-3xl tracking-tight uppercase">Khoi Hoang</h2>
              <p className="font-sans font-medium text-xs text-neutral-300 tracking-wider uppercase mt-0.5">
                First-Year IEM Student • Constructor University (Bremen)
              </p>
            </div>
          </div>
        </div>

        {/* Bio & Vision */}
        <div className="space-y-3">
          <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-400">
            Who I Am
          </h3>
          <p className="font-serif text-base md:text-lg leading-relaxed text-neutral-800 italic">
            "I'm a first-year Industrial Engineering & Management student at Constructor University in Bremen. I'm happiest when I'm either diagnosing why a process is slow, assembling hardware at my desk, or writing scripts to automate things I hate doing by hand. When I'm away from a computer, you'll usually find me playing sports, cooking with whatever is in the dorm fridge, or learning something new."
          </p>
        </div>

        {/* Academics & Program Link */}
        <div className="space-y-3">
          <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-400">
            Academics & Program
          </h3>
          <a
            href="https://constructor.university/programs/undergraduate-education/industrial-engineering-management"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-4 border border-[#d4d4d0] bg-white/60 hover:bg-white hover:border-black rounded-xl transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-neutral-100 group-hover:bg-black group-hover:text-white transition-colors">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-xs text-neutral-900 uppercase tracking-wide">
                  BSc Industrial Engineering & Management
                </h4>
                <p className="font-sans text-xs text-neutral-500">Constructor University · Bremen, Germany</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors" />
          </a>
        </div>

        {/* Sports & Athletics Interactive Dropdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-400">
              Sports & Athletics
            </h3>
            <span className="font-mono text-[10px] text-neutral-500 uppercase font-bold">12 Disciplines</span>
          </div>

          <div className="border border-[#d4d4d0] bg-white/60 rounded-xl overflow-hidden transition-all">
            <button
              onClick={() => setIsSportsOpen(!isSportsOpen)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-white transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neutral-100 text-neutral-800">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-sans font-bold text-xs uppercase tracking-wide text-neutral-900 block">
                    Active Sports & Recreation
                  </span>
                  <span className="font-sans text-[11px] text-neutral-500">Click to explore disciplines</span>
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${
                  isSportsOpen ? "rotate-180 text-black" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isSportsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden border-t border-[#d4d4d0]/60 bg-[#FAF9F6] p-4"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SPORTS_LIST.map((sport) => (
                      <div
                        key={sport}
                        className="px-3 py-2 border border-[#d4d4d0] bg-white rounded-lg text-center font-sans text-xs font-semibold text-neutral-800 shadow-sm"
                      >
                        {sport}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dorm Cooking & Vietnamese Food Craft */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-400">
              Dorm Cooking & Craft
            </h3>
            <span className="font-mono text-[10px] text-neutral-500 uppercase font-bold">Authentic Recipes</span>
          </div>

          <div className="space-y-2.5">
            {RECIPES.map((recipe) => (
              <div
                key={recipe.name}
                className="p-3.5 border border-[#d4d4d0] bg-white/60 hover:bg-white rounded-xl space-y-1 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Utensils className="w-3.5 h-3.5 text-neutral-700" />
                  <span className="font-sans font-bold text-xs uppercase tracking-wide text-neutral-900">
                    {recipe.name}
                  </span>
                </div>
                <p className="font-sans text-xs text-neutral-600 leading-relaxed pl-5.5">
                  {recipe.description}
                </p>
              </div>
            ))}
          </div>
          <p className="font-mono text-[10px] text-neutral-400 italic">
            * Photos being curated as dorm kitchen experiments happen.
          </p>
        </div>

        {/* Music & Instruments */}
        <div className="space-y-3">
          <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-400">
            Music & Instruments
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {["Piano", "Ukulele"].map((instrument) => (
              <div
                key={instrument}
                className="flex items-center gap-2 px-4 py-2 border border-[#d4d4d0] bg-white/60 rounded-full font-sans text-xs font-bold text-neutral-800"
              >
                <Music className="w-3.5 h-3.5 text-neutral-700" />
                <span>{instrument}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social Channels */}
        <div className="space-y-3 pt-2 border-t border-[#d4d4d0]">
          <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-400">
            Connect Online
          </h3>
          <div className="flex items-center gap-6">
            {[
              {
                label: "LinkedIn",
                url: "https://www.linkedin.com/in/hoangnguyenkhoi/",
                icon: <Linkedin className="w-4 h-4" />,
              },
              {
                label: "GitHub",
                url: "https://github.com/PlebHoang",
                icon: <Github className="w-4 h-4" />,
              },
              {
                label: "Instagram",
                url: "https://www.instagram.com/peter_hoanggg_/",
                icon: <Instagram className="w-4 h-4" />,
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-neutral-500 hover:text-black transition-colors font-sans text-xs font-bold uppercase tracking-wider"
              >
                {social.icon}
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </Drawer>
  );
};

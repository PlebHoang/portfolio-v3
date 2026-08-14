/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Linkedin, Github, Instagram } from "lucide-react";
import { Drawer } from "./Drawer";

interface AboutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutDrawer: React.FC<AboutDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="About / Khoi Hoang">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-10">
        {/* Introduction Banner */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#d4d4d0] bg-neutral-200 group">
          <img
            src="/assets/myface-transparent.png"
            alt="Khoi Hoang"
            className="w-full h-full object-cover filter grayscale contrast-[1.15] brightness-[1.02] group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-6">
            <div className="text-white">
              <h2 className="font-display font-black text-3xl tracking-tight uppercase">Khoi Hoang</h2>
              <p className="font-sans font-medium text-xs text-neutral-300 tracking-wider uppercase mt-1">
                IEM Student @ Constructor University • Bremen, Germany
              </p>
            </div>
          </div>
        </div>

        {/* Bio & Vision */}
        <div className="space-y-4">
          <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-500">
            Who I Am
          </h3>
          <p className="font-serif text-lg md:text-xl leading-relaxed text-neutral-800 italic">
            "I'm a first-year Industrial Engineering & Management student at Constructor University in Bremen. I'm happiest when I'm either diagnosing why a process is slow, assembling hardware at my desk, or writing scripts to automate things I hate doing by hand. When I'm away from a computer, you'll usually find me playing sports, cooking with whatever is in the dorm fridge, or learning something new."
          </p>
        </div>

        {/* Quick Facts Horizontal Scroll Strip */}
        <div className="space-y-4">
          <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-500">
            Quick Facts
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin">
            {[
              "IEM @ Constructor University",
              "Hardware & Software Tinkerer",
              "Sports Enthusiast",
              "Dorm Cook",
            ].map((fact) => (
              <div
                key={fact}
                className="flex-shrink-0 px-5 py-2.5 border border-[#d4d4d0] bg-white/40 rounded-full text-sm font-sans font-semibold text-neutral-800"
              >
                {fact}
              </div>
            ))}
          </div>
        </div>

        {/* Social Channels */}
        <div className="space-y-4 pt-2">
          <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-500">
            Connect Online
          </h3>
          <div className="flex items-center gap-6">
            {[
              {
                label: "LinkedIn",
                url: "https://www.linkedin.com/in/hoangnguyenkhoi/",
                icon: <Linkedin className="w-5 h-5" />,
              },
              {
                label: "GitHub",
                url: "https://github.com/PlebHoang",
                icon: <Github className="w-5 h-5" />,
              },
              {
                label: "Instagram",
                url: "https://www.instagram.com/peter_hoanggg_/",
                icon: <Instagram className="w-5 h-5" />,
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-neutral-500 hover:text-black transition-colors duration-300 font-sans text-sm font-bold"
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

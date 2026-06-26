/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

// The "TS" stylized monogram for Tech Solutions Inc.
export const TSMonogram: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} fill-current`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" rx="0" fill="currentColor" />
      <text
        x="50%"
        y="58%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#faf7f2"
        className="font-serif font-bold text-5xl tracking-tighter"
      >
        TS
      </text>
    </svg>
  );
};

// The academic crest for Constructor University
export const ConstructorUniversityLogo: React.FC<{ className?: string }> = ({
  className = "h-12",
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Crest Shield */}
      <svg
        viewBox="0 0 100 120"
        className="w-10 h-12 fill-none stroke-current text-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 20 C10 20, 50 10, 90 20 C90 60, 90 90, 50 110 C10 90, 10 60, 10 20 Z"
          fill="currentColor"
          strokeWidth="4"
        />
        {/* Inner Tower/Chevron */}
        <path
          d="M50 30 L50 85 M30 50 L50 30 L70 50 M30 70 L50 50 L70 70"
          stroke="var(--color-dark-bg, #F7F6F3)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* Typography */}
      <div className="flex flex-col text-left leading-none">
        <span className="font-serif font-bold text-sm tracking-tight">Constructor</span>
        <span className="font-sans font-medium text-[11px] tracking-widest text-neutral-500 uppercase mt-0.5">
          University
        </span>
      </div>
    </div>
  );
};

// EMASI crest shown in Khoi's high school portrait
export const EMASIBadge: React.FC<{ className?: string }> = ({ className = "h-8" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-8 h-8 fill-none stroke-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="currentColor" strokeWidth="2" />
        <text
          x="50%"
          y="54%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="var(--color-dark-bg, #F7F6F3)"
          className="font-sans font-bold text-2xl tracking-tighter"
        >
          E
        </text>
      </svg>
      <div className="flex flex-col text-left leading-tight">
        <span className="font-sans font-bold text-xs tracking-wider uppercase">EMASI</span>
        <span className="font-sans font-light text-[8px] tracking-widest text-neutral-400 uppercase">
          SCHOOL
        </span>
      </div>
    </div>
  );
};

// Organic wave pattern seen at the bottom right corner of the hero section in the screenshot
export const WavyPattern: React.FC<{ className?: string }> = ({ className = "w-32 h-20" }) => {
  return (
    <svg
      viewBox="0 0 200 100"
      className={`${className} stroke-current text-neutral-300`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path d="M0,80 Q25,60 50,80 T100,80 T150,80 T200,80" strokeWidth="1.5" />
      <path d="M0,60 Q25,40 50,60 T100,60 T150,60 T200,60" strokeWidth="1.5" />
      <path d="M0,40 Q25,20 50,40 T100,40 T150,40 T200,40" strokeWidth="1.5" />
      <path d="M0,20 Q25,0 50,20 T100,20 T150,20 T200,20" strokeWidth="1.5" />
    </svg>
  );
};

// 4 Corner brackets for the Hover: Scale, Border, Shadow visual highlight on Capabilities Cards
export const CornerArrows: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Top-Left pointing outwards */}
      <svg
        viewBox="0 0 24 24"
        className="absolute top-2 left-2 w-4 h-4 text-current transition-transform duration-300 -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 3H3v12" />
        <path d="M3 3l11 11" />
      </svg>

      {/* Top-Right pointing outwards */}
      <svg
        viewBox="0 0 24 24"
        className="absolute top-2 right-2 w-4 h-4 text-current transition-transform duration-300 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 3h12v12" />
        <path d="M21 3L10 14" />
      </svg>

      {/* Bottom-Left pointing outwards */}
      <svg
        viewBox="0 0 24 24"
        className="absolute bottom-2 left-2 w-4 h-4 text-current transition-transform duration-300 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 21H3v-12" />
        <path d="M3 21l11-11" />
      </svg>

      {/* Bottom-Right pointing outwards */}
      <svg
        viewBox="0 0 24 24"
        className="absolute bottom-2 right-2 w-4 h-4 text-current transition-transform duration-300 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21h12v-12" />
        <path d="M21 21L10 10" />
      </svg>
    </div>
  );
};

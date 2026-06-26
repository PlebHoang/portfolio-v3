import React from "react";
import { motion } from "motion/react";

export const PortraitSVG: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => {
  return (
    <div className={`relative ${className} bg-transparent overflow-hidden select-none`}>
      {/* SVG Container */}
      <svg
        viewBox="0 0 400 500"
        className="relative w-full h-full z-10 filter grayscale contrast-[1.1] brightness-[1.01]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Soft shadow gradients for depth */}
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E1E1E" />
            <stop offset="100%" stopColor="#0B0B0B" />
          </linearGradient>

          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EAE5E2" />
          </linearGradient>

          <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5F5F5" />
            <stop offset="100%" stopColor="#D2CDCA" />
          </linearGradient>

          <linearGradient id="collarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#555555" />
            <stop offset="100%" stopColor="#2E2E2E" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient background glow */}
        <circle cx="200" cy="230" r="150" fill="#EAE5E2" opacity="0.3" filter="url(#softGlow)" />

        <g className="transition-all duration-500 ease-out">
          {/* 1. NECK */}
          <path
            d="M 165,300 C 165,360 175,370 175,380 L 225,380 C 225,370 235,360 235,300 Z"
            fill="url(#skinGrad)"
            stroke="#2E2E2E"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Neck shading shadow */}
          <path
            d="M 165,305 C 190,325 210,325 235,305 C 235,300 165,300 165,305 Z"
            fill="#C2BCB9"
            opacity="0.5"
          />

          {/* 2. FACE BASE */}
          <path
            d="M 130,190 C 130,120 270,120 270,190 C 270,265 240,310 200,310 C 160,310 130,265 130,190 Z"
            fill="url(#skinGrad)"
            stroke="#2E2E2E"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* 3. EARS */}
          {/* Right Ear */}
          <path
            d="M 131,180 C 120,180 118,215 131,225 Z"
            fill="url(#skinGrad)"
            stroke="#2E2E2E"
            strokeWidth="1.5"
          />
          <path
            d="M 129,190 C 124,192 124,208 129,212"
            fill="none"
            stroke="#2E2E2E"
            strokeWidth="1.2"
          />

          {/* Left Ear */}
          <path
            d="M 269,180 C 280,180 282,215 269,225 Z"
            fill="url(#skinGrad)"
            stroke="#2E2E2E"
            strokeWidth="1.5"
          />
          <path
            d="M 271,190 C 276,192 276,208 271,212"
            fill="none"
            stroke="#2E2E2E"
            strokeWidth="1.2"
          />

          {/* 4. HAIR (Short, textured, modern Asian cut) */}
          <path
            d="M 126,180 
               C 123,150 145,100 200,95 
               C 255,100 277,150 274,180
               C 265,182 260,175 258,168
               C 252,150 240,125 200,120
               C 160,125 148,150 142,168
               C 140,175 135,182 126,180 Z"
            fill="url(#hairGrad)"
            stroke="#0B0B0B"
            strokeWidth="1"
          />
          {/* Hair details / tufts */}
          <path
            d="M 145,130 C 155,115 175,110 200,110 C 225,110 245,115 255,130"
            fill="none"
            stroke="#555555"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M 160,120 C 175,112 200,112 215,120"
            fill="none"
            stroke="#555555"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* 5. EYEBROWS */}
          {/* Right Eyebrow */}
          <path
            d="M 148,175 C 158,168 172,168 178,175"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Left Eyebrow */}
          <path
            d="M 222,175 C 228,168 242,168 252,175"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* 6. EYES */}
          {/* Right Eye (smiling, squinting) */}
          <path
            d="M 149,193 C 156,188 170,188 177,193"
            fill="none"
            stroke="#2E2E2E"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 149,195 C 156,199 170,199 177,195"
            fill="none"
            stroke="#2E2E2E"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Right Pupil */}
          <circle cx="163" cy="192" r="3" fill="#1E1E1E" />
          <circle cx="164.5" cy="190.5" r="1" fill="#FFFFFF" />

          {/* Left Eye (fully visible smiling, looking through the circle) */}
          <path
            d="M 223,193 C 230,188 244,188 251,193"
            fill="none"
            stroke="#2E2E2E"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 223,195 C 230,199 244,199 251,195"
            fill="none"
            stroke="#2E2E2E"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Left Pupil */}
          <circle cx="237" cy="192" r="3" fill="#1E1E1E" />
          <circle cx="238.5" cy="190.5" r="1" fill="#FFFFFF" />

          {/* 7. NOSE */}
          <path
            d="M 195,190 L 195,225 C 195,230 190,233 200,233 C 210,233 205,230 205,225"
            fill="none"
            stroke="#2E2E2E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 8. SMILING MOUTH (Wide, happy smile with teeth) */}
          <g transform="translate(0, -5)">
            {/* Outline & cavity */}
            <path
              d="M 160,250 C 170,278 230,278 240,250 C 235,248 165,248 160,250 Z"
              fill="#2E1C1A"
              stroke="#2E2E2E"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Teeth (white block with line dividers) */}
            <path
              d="M 165,251 C 175,258 225,258 235,251 L 232,256 C 222,260 178,260 168,256 Z"
              fill="#FFFFFF"
            />
            {/* Smile creases */}
            <path
              d="M 155,248 C 158,252 158,255 155,258"
              fill="none"
              stroke="#2E2E2E"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M 245,248 C 242,252 242,255 245,258"
              fill="none"
              stroke="#2E2E2E"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>

          {/* 9. POLO SHIRT COLLAR & CHEST */}
          {/* Shirt Body */}
          <path
            d="M 110,410 C 110,400 135,370 200,370 C 265,370 290,400 290,410 L 290,500 L 110,500 Z"
            fill="url(#shirtGrad)"
            stroke="#2E2E2E"
            strokeWidth="1.5"
          />

          {/* Grey Collar (Polo shirt style) */}
          {/* Left Collar flap */}
          <path
            d="M 175,370 L 140,410 L 195,410 L 195,370 Z"
            fill="url(#collarGrad)"
            stroke="#111111"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Right Collar flap */}
          <path
            d="M 225,370 L 260,410 L 205,410 L 205,370 Z"
            fill="url(#collarGrad)"
            stroke="#111111"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Inner Placket / Button row */}
          <path
            d="M 195,410 L 195,470 C 195,475 205,475 205,470 L 205,410 Z"
            fill="#3E3E3E"
            stroke="#111111"
            strokeWidth="1"
          />
          {/* White button */}
          <circle cx="200" cy="430" r="4.5" fill="#FAFAFA" stroke="#2E2E2E" strokeWidth="1" />
          {/* Button holes */}
          <circle cx="198.5" cy="430" r="0.8" fill="#555555" />
          <circle cx="201.5" cy="430" r="0.8" fill="#555555" />

          {/* 10. RAISED HAND MAKING OK SIGN OVER LEFT EYE */}
          <g>
            {/* Arm / Wrist coming from bottom-right */}
            <path
              d="M 320,440 L 270,300 C 265,285 272,275 285,275 C 295,275 305,285 310,295 L 350,400 Z"
              fill="url(#skinGrad)"
              stroke="#2E2E2E"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Hand / Palm */}
            <path
              d="M 270,300 C 260,290 240,240 240,220 C 240,205 250,195 260,200 L 285,275 Z"
              fill="url(#skinGrad)"
              stroke="#2E2E2E"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* FINGERS FORMING THE "OK" CIRCLE (Centered exactly around left eye X=237, Y=192) */}
            {/* The outer loop of the thumb and index finger forming a circle */}
            <path
              d="M 237,152 
                 C 200,152 195,212 237,222 
                 C 255,222 267,215 272,205 
                 C 275,198 272,192 262,192
                 C 245,192 245,168 250,165
                 C 255,162 255,152 237,152 Z"
              fill="url(#skinGrad)"
              stroke="#2E2E2E"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            
            {/* Inner negative space circle showing the eye clearly */}
            <circle cx="237" cy="188" r="23" fill="none" stroke="#2E2E2E" strokeWidth="1.5" />

            {/* The other three fingers (Middle, Ring, Pinky) spread out vertically */}
            {/* Middle Finger */}
            <path
              d="M 270,185 C 275,170 295,145 295,135 C 295,128 285,128 280,138 L 262,192 Z"
              fill="url(#skinGrad)"
              stroke="#2E2E2E"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Ring Finger */}
            <path
              d="M 272,198 C 280,185 305,160 305,150 C 305,143 295,143 290,153 L 265,205 Z"
              fill="url(#skinGrad)"
              stroke="#2E2E2E"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Pinky Finger */}
            <path
              d="M 268,212 C 278,205 310,185 310,175 C 310,168 300,168 295,178 L 260,220 Z"
              fill="url(#skinGrad)"
              stroke="#2E2E2E"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Wrist crease / watch line */}
            <path
              d="M 288,340 C 295,342 308,345 315,348"
              fill="none"
              stroke="#2E2E2E"
              strokeWidth="1.2"
              opacity="0.5"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

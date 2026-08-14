import React from "react";

export const MarqueeTicker: React.FC = () => {
  const items = [
    "Solar Circuit Design",
    "Industrial IoT",
    "Supply Chain Simulation",
    "Docker & Automation",
    "Fusion 360",
    "Rapid 3D Prototyping",
    "ESP Mesh Telemetry",
    "Green Finance Strategy",
  ];

  return (
    <div className="w-full overflow-hidden border-t border-b border-[#d4d4d0] py-3 bg-[#FAF9F6] select-none">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="marquee-track">
        {/* Loop content multiple times to guarantee seamless scrolling across wide screens */}
        {Array.from({ length: 4 }).map((_, loopIdx) => (
          <React.Fragment key={loopIdx}>
            {items.map((item, idx) => (
              <div
                key={`${loopIdx}-${idx}`}
                className="flex items-center"
              >
                <span className="font-sans text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-500 whitespace-nowrap px-6">
                  {item}
                </span>
                <span className="text-neutral-300 font-sans text-[10px] font-bold">•</span>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

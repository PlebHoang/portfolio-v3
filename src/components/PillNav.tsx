import React, { useEffect, useState } from "react";

interface PillNavProps {
  onOpenPalette: () => void;
}

export const PillNav: React.FC<PillNavProps> = ({ onOpenPalette }) => {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const sections = ["hero", "works", "projects", "capabilities", "philosophy", "bucket", "connect"];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      let current = "hero";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.4) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      const num = parseInt(e.key);
      if (num > 0 && num <= sections.length) {
        e.preventDefault();
        const sectionId = sections[num - 1];
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 p-1.5 bg-[#111111]/90 backdrop-blur-md border border-white/10 rounded-full shadow-2xl transition-all duration-300">
      {sections.map((id, index) => {
        const label = id === "hero" ? "Top" : id === "year-one" ? "Year 1" : id === "bucket" ? "Bucket" : id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            title={`Shortcut: ${index + 1}`}
            className={`px-3 py-1.5 text-[10px] font-sans font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
              activeSection === id
                ? "bg-white/10 text-white animate-pulse"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {label === "capabilities" ? "Skills" : label === "works" ? "Work" : label === "projects" ? "Projects" : label}
          </button>
        );
      })}
      <div className="w-[1px] h-3 bg-white/15 mx-1" />
      <button
        onClick={onOpenPalette}
        className="px-2.5 py-1.5 text-[9px] font-mono text-neutral-500 hover:text-neutral-300 hover:bg-white/5 rounded-full transition-all cursor-pointer"
        title="Open Command Palette"
      >
        ⌘K
      </button>
    </nav>
  );
};

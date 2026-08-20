import React, { useEffect, useState, useRef } from "react";

interface CommandItem {
  label: string;
  icon: string;
  action: () => void;
  shortcut?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenSpot?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenAbout,
  onOpenContact,
  onOpenSpot,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const commands: CommandItem[] = [
    { label: "View Projects", icon: "📁", action: () => scrollTo("projects"), shortcut: "P" },
    { label: "View Work Experience", icon: "💼", action: () => scrollTo("works"), shortcut: "W" },
    { label: "View Capabilities", icon: "⚡", action: () => scrollTo("capabilities"), shortcut: "C" },
    { label: "Open About", icon: "👤", action: onOpenAbout, shortcut: "A" },
    { label: "Open Contact", icon: "✉️", action: onOpenContact, shortcut: "M" },
    { label: "The Spot Dimension (Secret)", icon: "🌀", action: () => { onClose(); onOpenSpot?.(); }, shortcut: "S" },
    { label: "Read Newsletter / Thoughts", icon: "📰", action: () => { window.location.hash = "/newsletter"; }, shortcut: "N" },
    { label: "Email Me", icon: "📧", action: () => { window.location.href = "mailto:hoangnguyenkhoi07@gmail.com"; }, shortcut: "E" },
    { label: "LinkedIn", icon: "🔗", action: () => window.open("https://www.linkedin.com/in/hoangnguyenkhoi/", "_blank"), shortcut: "L" },
    { label: "GitHub", icon: "🐙", action: () => window.open("https://github.com/PlebHoang", "_blank"), shortcut: "G" },
    { label: "Back to Top", icon: "⬆️", action: () => window.scrollTo({ top: 0, behavior: "smooth" }), shortcut: "T" },
    { label: "sudo hire-me", icon: "🔑", action: onOpenContact },
    { label: "rm -rf /", icon: "💣", action: () => alert("Nice try. Permission denied.") },
    { label: "cat about.md", icon: "📄", action: onOpenAbout },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
          onClose();
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[18vh] bg-black/45 backdrop-blur-[4px]"
    >
      <div className="w-[90%] max-w-[520px] bg-[#F7F6F3] border border-[#d4d4d0] rounded-2xl overflow-hidden shadow-2xl">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(0);
          }}
          placeholder="Type a command..."
          className="w-full p-4 sm:p-5 font-mono text-base sm:text-sm border-0 border-b border-[#d4d4d0] bg-transparent text-black outline-none"
        />
        <div className="max-h-[300px] overflow-y-auto p-2">
          {filtered.length > 0 ? (
            filtered.map((cmd, idx) => (
              <div
                key={cmd.label}
                onClick={() => {
                  cmd.action();
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex items-center gap-3 p-3 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  idx === selectedIndex
                    ? "bg-black text-[#FAF9F6]"
                    : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                <span className="text-sm">{cmd.icon}</span>
                <span>{cmd.label}</span>
                {cmd.shortcut && (
                  <span className="ml-auto font-mono text-[10px] text-neutral-400">
                    {cmd.shortcut}
                  </span>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-xs font-mono text-neutral-400">
              No results found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

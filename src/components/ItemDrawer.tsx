import React from "react";
import { ExternalLink } from "lucide-react";
import { Drawer } from "./Drawer";

export interface ItemDetails {
  title: string;
  subtitle: string;
  description: string | string[];
  technologies?: string[];
  link?: string;
}

interface ItemDrawerProps {
  item: ItemDetails | null;
  onClose: () => void;
}

export const ItemDrawer: React.FC<ItemDrawerProps> = ({ item, onClose }) => {
  return (
    <Drawer isOpen={!!item} onClose={onClose} title="Details">
      {item && (
        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          <div className="space-y-4">
            <h2 className="font-display font-black text-3xl tracking-tight uppercase">
              {item.title}
            </h2>
            <p className="font-sans font-medium text-xs text-neutral-500 tracking-wider uppercase">
              {item.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-500">
              Overview
            </h3>
            {Array.isArray(item.description) ? (
              <ul className="space-y-4">
                {item.description.map((desc, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2.5 flex-shrink-0" />
                    <p className="font-serif text-lg leading-relaxed text-neutral-800">
                      {desc}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-serif text-xl leading-relaxed text-neutral-800">
                {item.description}
              </p>
            )}
          </div>

          {item.technologies && item.technologies.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-500">
                Technologies & Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="font-sans font-bold text-xs tracking-wider uppercase text-neutral-800 border border-[#d4d4d0] px-3 py-1.5 rounded-full bg-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {item.link && (
            <div className="pt-6">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-[#ffffff] font-sans font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors"
              >
                <span>View Live</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      )}
    </Drawer>
  );
};

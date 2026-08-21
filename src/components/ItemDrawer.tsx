import React, { useState } from "react";
import { ExternalLink, Download, Maximize2, X, ChevronRight } from "lucide-react";
import { Drawer } from "./Drawer";

export interface VideoClip {
  title: string;
  src: string;
}

export interface GalleryImage {
  src: string;
  caption?: string;
}

export interface SheetInfo {
  code: string;
  name: string;
  desc: string;
}

export interface SpreadsheetData {
  downloadUrl: string;
  fileLabel: string;
  size?: string;
  sheetsCount?: number;
  sheets?: SheetInfo[];
  iframeUrl?: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface ItemDetails {
  title: string;
  subtitle: string;
  description: string | string[];
  technologies?: string[];
  link?: string;
  highlight?: string;
  mediaType?: "video" | "gallery" | "spreadsheet" | "diagram" | "simulation";
  videos?: VideoClip[];
  images?: GalleryImage[];
  spreadsheet?: SpreadsheetData;
  diagramImage?: string;
  diagramCaption?: string;
  simulationImage?: string;
  simulationStats?: StatItem[];
}

interface ItemDrawerProps {
  item: ItemDetails | null;
  onClose: () => void;
}

export const ItemDrawer: React.FC<ItemDrawerProps> = ({ item, onClose }) => {
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Reset state when item changes or closes
  const handleClose = () => {
    setActiveVideoIdx(0);
    setActiveGalleryIdx(0);
    setLightboxImg(null);
    onClose();
  };

  return (
    <>
      <Drawer isOpen={!!item} onClose={handleClose} title="Project Details">
        {item && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 sm:space-y-8">
            {/* Header: Title & Badges */}
            <div className="space-y-3">
              {item.highlight && (
                <span className="inline-block px-3 py-1 bg-black text-white rounded-full font-mono text-[10px] font-bold uppercase tracking-wider">
                  {item.highlight}
                </span>
              )}
              <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight uppercase text-neutral-900">
                {item.title}
              </h2>
              <p className="font-sans font-semibold text-xs text-neutral-500 tracking-wider uppercase">
                {item.subtitle}
              </p>
            </div>

            {/* ── 1. Video Player Module (Sumobot) ── */}
            {item.mediaType === "video" && item.videos && item.videos.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-400">
                    Match Footage
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500 uppercase font-bold">
                    {item.videos.length} Angle{item.videos.length > 1 ? "s" : ""}
                  </span>
                </div>

                {item.videos.length > 1 && (
                  <div className="flex gap-2 border-b border-[#d4d4d0] pb-2">
                    {item.videos.map((vid, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveVideoIdx(idx)}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                          idx === activeVideoIdx
                            ? "bg-black text-white shadow-xs"
                            : "bg-white/80 border border-[#d4d4d0] text-neutral-600 hover:text-black hover:border-black"
                        }`}
                      >
                        {vid.title}
                      </button>
                    ))}
                  </div>
                )}

                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-black bg-black shadow-md">
                  <video
                    key={item.videos[activeVideoIdx]?.src}
                    controls
                    preload="metadata"
                    className="w-full h-full object-contain"
                  >
                    <source src={item.videos[activeVideoIdx]?.src} type="video/mp4" />
                    Your browser does not support HTML5 video.
                  </video>
                </div>
              </div>
            )}

            {/* ── 2. Multi-Photo Gallery Module (Odyssey) ── */}
            {item.mediaType === "gallery" && item.images && item.images.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-400">
                    Prototype Gallery
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500 uppercase font-bold">
                    {item.images.length} Captures
                  </span>
                </div>

                {/* Main Stage Image */}
                <div
                  className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#d4d4d0] bg-neutral-900 group cursor-zoom-in shadow-sm"
                  onClick={() => setLightboxImg(item.images![activeGalleryIdx]?.src)}
                >
                  <img
                    src={item.images[activeGalleryIdx]?.src}
                    alt="Gallery item"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.images[activeGalleryIdx]?.caption && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 pointer-events-none">
                      <p className="text-white font-mono text-xs font-semibold">
                        {item.images[activeGalleryIdx]?.caption}
                      </p>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-full text-white text-[10px] font-mono font-bold flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />
                    Zoom
                  </div>
                </div>

                {/* Thumbnails strip */}
                {item.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {item.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveGalleryIdx(idx)}
                        className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          idx === activeGalleryIdx
                            ? "border-black shadow-sm"
                            : "border-[#d4d4d0] opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={img.src} alt="Thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── 3. Excel Spreadsheet Module (33-Sheet Beast) ── */}
            {item.mediaType === "spreadsheet" && item.spreadsheet && (
              <div className="space-y-4">
                <span className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-400">
                  Engineering Model
                </span>

                {/* File Card with clean name */}
                <div className="border-2 border-black bg-white rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center font-mono font-black text-emerald-800 text-xs">
                        .XLSM
                      </div>
                      <div>
                        <h4 className="font-mono font-bold text-xs text-neutral-900">
                          {item.spreadsheet.fileLabel}
                        </h4>
                        <p className="font-mono text-[11px] text-neutral-500">
                          {item.spreadsheet.size || "734 KB"} • {item.spreadsheet.sheetsCount || 33} Linked Sheets
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Optional iframe viewer */}
                  {item.spreadsheet.iframeUrl && (
                    <div className="w-full h-64 rounded-xl overflow-hidden border border-neutral-200">
                      <iframe
                        src={item.spreadsheet.iframeUrl}
                        title="Excel Sheet Viewer"
                        className="w-full h-full border-0"
                      />
                    </div>
                  )}

                  {item.spreadsheet.downloadUrl && (
                    <a
                      href={item.spreadsheet.downloadUrl}
                      download="Parametric_Factory_Optimization_Model.xlsm"
                      className="w-full py-2.5 bg-black text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      Download Operations Model (.XLSM)
                    </a>
                  )}
                </div>

                {/* Structured Sheet Hierarchy Breakdown */}
                {item.spreadsheet.sheets && item.spreadsheet.sheets.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                      Key Worksheet Modules:
                    </span>
                    <div className="space-y-2">
                      {item.spreadsheet.sheets.map((s) => (
                        <div
                          key={s.code}
                          className="p-3 border border-[#d4d4d0] bg-white/70 rounded-xl flex items-start gap-3"
                        >
                          <span className="px-2 py-0.5 bg-neutral-100 font-mono text-[10px] font-bold text-neutral-800 rounded border border-neutral-200">
                            {s.code}
                          </span>
                          <div>
                            <h5 className="font-sans font-bold text-xs text-neutral-900">{s.name}</h5>
                            <p className="font-sans text-[11px] text-neutral-600 mt-0.5">{s.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── 4. Architecture Diagram Module (Morning Assistant) ── */}
            {item.mediaType === "diagram" && item.diagramImage && (
              <div className="space-y-3">
                <span className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-400">
                  System Architecture
                </span>
                <div
                  className="relative aspect-video w-full rounded-2xl overflow-hidden border border-black bg-white p-2 shadow-md cursor-zoom-in group"
                  onClick={() => setLightboxImg(item.diagramImage!)}
                >
                  <img
                    src={item.diagramImage}
                    alt="System Architecture"
                    className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/80 rounded-full text-white text-[10px] font-mono font-bold flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />
                    Zoom
                  </div>
                </div>
                {item.diagramCaption && (
                  <p className="font-mono text-[11px] text-neutral-500 text-center">
                    {item.diagramCaption}
                  </p>
                )}
              </div>
            )}

            {/* ── 5. Simulation Module (The Fresh Connection) ── */}
            {item.mediaType === "simulation" && item.simulationImage && (
              <div className="space-y-3">
                <span className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-400">
                  Supply Chain Dashboard
                </span>
                <div
                  className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-black bg-neutral-900 shadow-md cursor-zoom-in group"
                  onClick={() => setLightboxImg(item.simulationImage!)}
                >
                  <img
                    src={item.simulationImage}
                    alt="Supply Chain Simulation"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/80 rounded-full text-white text-[10px] font-mono font-bold flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />
                    Zoom
                  </div>
                </div>

                {item.simulationStats && item.simulationStats.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {item.simulationStats.map((stat, idx) => (
                      <div key={idx} className="p-2.5 border border-[#d4d4d0] bg-white rounded-xl text-center">
                        <span className="font-mono text-[10px] text-neutral-400 block uppercase">
                          {stat.label}
                        </span>
                        <span className="font-sans font-bold text-sm text-neutral-900">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Overview Narrative ── */}
            <div className="space-y-4">
              <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-500">
                Overview & Engineering Approach
              </h3>
              {Array.isArray(item.description) ? (
                <ul className="space-y-4">
                  {item.description.map((desc, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 text-black mt-1 flex-shrink-0" />
                      <p className="font-serif text-lg leading-relaxed text-neutral-800">
                        {desc}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-serif text-lg leading-relaxed text-neutral-800">
                  {item.description}
                </p>
              )}
            </div>

            {/* ── Technologies & Skills ── */}
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

            {/* ── External Link ── */}
            {item.link && (
              <div className="pt-4">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-[#ffffff] font-sans font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors"
                >
                  <span>View Live Link</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* Lightbox Modal for Zooming */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
        >
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white cursor-pointer"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImg}
            alt="Full size preview"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </>
  );
};

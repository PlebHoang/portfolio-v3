/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue } from "motion/react";

type CursorVariant = "default" | "link" | "text" | "rake";

export function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Position motion values: instant tracking without spring interpolation delay
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // ponytail: sand cursor damping — raw target + rAF interpolation when variant is rake
  const variantRef = useRef(variant);
  variantRef.current = variant;
  const rawMouseRef = useRef({ x: 0, y: 0 });
  const sandAnimRef = useRef<number | null>(null);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      rawMouseRef.current.x = e.clientX;
      rawMouseRef.current.y = e.clientY;

      // Non-sand modes: instant tracking
      if (variantRef.current !== "rake") {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
      if (!visible) setVisible(true);
    },
    [cursorX, cursorY, visible]
  );

  // rAF loop: elastic spring lag for sand cursor
  useEffect(() => {
    const tick = () => {
      if (variantRef.current === "rake") {
        const cx = cursorX.get();
        const cy = cursorY.get();
        cursorX.set(cx + (rawMouseRef.current.x - cx) * 0.10);
        cursorY.set(cy + (rawMouseRef.current.y - cy) * 0.10);
      }
      sandAnimRef.current = requestAnimationFrame(tick);
    };
    sandAnimRef.current = requestAnimationFrame(tick);
    return () => {
      if (sandAnimRef.current) cancelAnimationFrame(sandAnimRef.current);
    };
  }, [cursorX, cursorY]);

  const resolveVariant = useCallback((target: EventTarget | null): CursorVariant => {
    let el = target as HTMLElement | null;
    let hasTextTag = false;

    while (el) {
      const dc = el.dataset?.cursor;
      if (dc === "link" || dc === "view") return "link";
      if (dc === "text") return "text";
      if (dc === "rake") return "rake";

      const tag = el.tagName;
      if (
        tag === "A" ||
        tag === "BUTTON" ||
        el.getAttribute("role") === "button" ||
        el.classList.contains("cursor-pointer")
      ) {
        return "link";
      }

      if (
        tag === "P" ||
        tag === "SPAN" ||
        tag === "H1" ||
        tag === "H2" ||
        tag === "H3" ||
        tag === "H4" ||
        tag === "H5" ||
        tag === "H6" ||
        tag === "LI" ||
        tag === "TEXTAREA" ||
        tag === "INPUT"
      ) {
        hasTextTag = true;
      }

      el = el.parentElement;
    }

    return hasTextTag ? "text" : "default";
  }, []);

  const handleOver = useCallback(
    (e: MouseEvent) => {
      setVariant(resolveVariant(e.target));
    },
    [resolveVariant]
  );

  useEffect(() => {
    const touch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;
    
    if (touch) {
      setIsTouch(true);
      return;
    }

    // Force default cursor to disappear globally for all elements when custom cursor is active
    document.documentElement.classList.add("has-custom-cursor");

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);
    const handleMouseUp = (e: MouseEvent) => setVariant(resolveVariant(e.target));
    const handleDragEnd = (e: DragEvent) => setVariant(resolveVariant(e.target));

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("dragend", handleDragEnd);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("dragend", handleDragEnd);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMove, handleOver]);

  if (isTouch) return null;

  // Align hot-spots correctly based on the cursor shape's active tip
  let transformSettings = { x: "-0%", y: "-0%" }; // default arrow pointer
  if (variant === "link") {
    // finger tip is roughly at x=7px, y=0.5px
    transformSettings = { x: "-7px", y: "-0.5px" };
  } else if (variant === "text") {
    // I-beam center is at x=4.5px, y=9.5px
    transformSettings = { x: "-4.5px", y: "-9.5px" };
  } else if (variant === "rake") {
    // rake tip/head center is at x=18px, y=10px
    transformSettings = { x: "-18px", y: "-10px" };
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none will-change-transform"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: transformSettings.x,
        translateY: transformSettings.y,
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s ease-out",
      }}
    >
      {variant === "default" && (
        <svg
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.18))" }}
        >
          <path
            d="M1 1 L1 14.5 L5 10.5 L9 17 L11.5 15.5 L7.5 9 L13 8.5 Z"
            fill="white"
            stroke="#111111"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {variant === "link" && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.18))" }}
        >
          <path
            d="M6 5.5V1.5C6 0.95 6.45 0.5 7 0.5C7.55 0.5 8 0.95 8 1.5V5.5M8 5.5V3.5C8 2.95 8.45 2.5 9 2.5C9.55 2.5 10 2.95 10 3.5V5.5M10 5.5V4.5C10 3.95 10.45 3.5 11 3.5C11.55 3.5 12 3.95 12 4.5V6.5M12 6.5V5.5C12 4.95 12.45 4.5 13 4.5C13.55 4.5 14 4.95 14 5.5V10.5C14 13.54 11.54 16 8.5 16C5.46 16 3 13.54 3 10.5V8.5C3 7.95 3.45 7.5 4 7.5C4.55 7.5 5 7.95 5 8.5V5.5H6"
            stroke="black"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="white"
          />
        </svg>
      )}

      {variant === "text" && (
        <svg
          width="9"
          height="19"
          viewBox="0 0 9 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.12))" }}
        >
          <path
            d="M1.5 1.5H7.5M4.5 1.5V17.5M1.5 17.5H7.5"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M1.5 1.5H7.5M4.5 1.5V17.5M1.5 17.5H7.5"
            stroke="white"
            strokeWidth="1.0"
            strokeLinecap="round"
          />
        </svg>
      )}

      {variant === "rake" && (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.3))" }}
        >
          {/* Underlay / Outline for visibility */}
          <line x1="6" y1="22" x2="18" y2="10" stroke="black" strokeWidth="4" strokeLinecap="round" />
          <path d="M14 6 L22 14" stroke="black" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="16" y1="8" x2="18" y2="6" stroke="black" strokeWidth="4" strokeLinecap="round" />
          <line x1="18" y1="10" x2="20" y2="8" stroke="black" strokeWidth="4" strokeLinecap="round" />
          <line x1="20" y1="12" x2="22" y2="10" stroke="black" strokeWidth="4" strokeLinecap="round" />

          {/* Core white rake */}
          <line x1="6" y1="22" x2="18" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M14 6 L22 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="16" y1="8" x2="18" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="10" x2="20" y2="8" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="12" x2="22" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </motion.div>
  );
}

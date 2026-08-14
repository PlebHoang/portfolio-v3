import React, { useEffect, useRef, useState } from "react";

interface EnsoScreensaverProps {
  onDismiss: () => void;
}

export const EnsoScreensaver: React.FC<EnsoScreensaverProps> = ({ onDismiss }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stampVisible, setStampVisible] = useState(false);
  
  // Audio state
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const audioDecayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sand physics state: cursor damping (#1), elastic spring lag (#2), micro-jitter (#3)
  const targetPos = useRef<{ x: number; y: number } | null>(null);
  const currPos = useRef<{ x: number; y: number } | null>(null);
  const lastDrawCoords = useRef<{ x: number; y: number } | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const initAudio = () => {
    if (audioCtxRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const bufferSize = ctx.sampleRate;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      noiseSourceRef.current = source;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1000;
      filter.Q.value = 0.8;
      filterRef.current = filter;

      const gain = ctx.createGain();
      gain.gain.value = 0;
      gainRef.current = gain;

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      source.start(0);
    } catch (err) {
      console.warn("Failed to initialize Web Audio API:", err);
    }
  };

  const clearSand = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawGuide(ctx, canvas.width, canvas.height);
  };

  const drawGuide = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.fillStyle = "#C2A66B"; // warm Kyoto sand base
    ctx.fillRect(0, 0, w, h);

    // Zen sand target circle
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, Math.min(w * 0.4, 140), 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);

    // ponytail: static grain texture overlay via pixel modification
    try {
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 12; // subtle sand grain noise
        data[i]     = Math.max(0, Math.min(255, data[i] + noise));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
      }
      ctx.putImageData(imageData, 0, 0);
    } catch (e) {
      console.warn("Failed to generate sand grain texture:", e);
    }
  };

  // Multi-groove sand rake simulation (permanent non-fading marks)
  const drawRakeMarks = (
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    w: number
  ) => {
    const dxLine = x2 - x1;
    const dyLine = y2 - y1;
    const len = Math.sqrt(dxLine * dxLine + dyLine * dyLine);
    if (len === 0) return;

    const px = -dyLine / len;
    const py = dxLine / len;

    // Draw wider shallow sand displacement base
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "rgba(215, 195, 145, 0.28)";
    ctx.lineWidth = w * 1.6;
    ctx.lineCap = "round";
    ctx.stroke();

    // Draw 3 distinct rake grooves
    const offsets = [-5, 0, 5];
    offsets.forEach((offset) => {
      ctx.beginPath();
      ctx.moveTo(x1 + px * offset, y1 + py * offset);
      ctx.lineTo(x2 + px * offset, y2 + py * offset);
      ctx.strokeStyle = "rgba(95, 75, 45, 0.45)";
      ctx.lineWidth = Math.max(1.2, w * 0.25);
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x1 + px * offset + 1, y1 + py * offset + 1);
      ctx.lineTo(x2 + px * offset + 1, y2 + py * offset + 1);
      ctx.strokeStyle = "rgba(235, 215, 175, 0.25)";
      ctx.lineWidth = Math.max(0.8, w * 0.12);
      ctx.lineCap = "round";
      ctx.stroke();
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => setStampVisible(true), 2000);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGuide(ctx, canvas.width, canvas.height);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
        e.preventDefault();
        e.stopPropagation();
        clearSand();
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("keydown", handleKeyDown);
    resize();

    // ponytail: physics animation loop for sand resistance (damping + spring lag + micro-jitter)
    const updatePhysics = () => {
      if (targetPos.current && currPos.current && canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          // ponytail: elastic spring lag (#2)
          currPos.current.x += (targetPos.current.x - currPos.current.x) * 0.12;
          currPos.current.y += (targetPos.current.y - currPos.current.y) * 0.12;

          if (!lastDrawCoords.current) {
            lastDrawCoords.current = { ...currPos.current };
          }

          const dx = currPos.current.x - lastDrawCoords.current.x;
          const dy = currPos.current.y - lastDrawCoords.current.y;
          const speed = Math.sqrt(dx * dx + dy * dy);

          if (speed > 0.3) {
            // ponytail: micro-jitter roughness (#3)
            const jitterX = (Math.random() - 0.5) * 1.6;
            const jitterY = (Math.random() - 0.5) * 1.6;

            const drawX = currPos.current.x + jitterX;
            const drawY = currPos.current.y + jitterY;
            const brushWidth = Math.max(4, 16 - speed * 0.3);

            drawRakeMarks(ctx, lastDrawCoords.current.x, lastDrawCoords.current.y, drawX, drawY, brushWidth);
            lastDrawCoords.current = { x: drawX, y: drawY };

            // ponytail: audio friction (#4)
            if (gainRef.current && filterRef.current && audioCtxRef.current) {
              const targetGain = Math.min(0.18, speed * 0.008);
              const targetFreq = 700 + Math.min(1300, speed * 35);
              const now = audioCtxRef.current.currentTime;
              gainRef.current.gain.setTargetAtTime(targetGain, now, 0.04);
              filterRef.current.frequency.setTargetAtTime(targetFreq, now, 0.04);
            }

            // ponytail: haptic vibration pulse (#6)
            if ("vibrate" in navigator && speed > 2) {
              try {
                navigator.vibrate(4);
              } catch (e) {}
            }

            if (audioDecayRef.current) clearTimeout(audioDecayRef.current);
            audioDecayRef.current = setTimeout(() => {
              if (gainRef.current && audioCtxRef.current) {
                const now = audioCtxRef.current.currentTime;
                gainRef.current.gain.setTargetAtTime(0, now, 0.08);
              }
            }, 80);
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      clearTimeout(timer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioDecayRef.current) clearTimeout(audioDecayRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", handleKeyDown);

      if (noiseSourceRef.current) {
        try {
          noiseSourceRef.current.stop();
        } catch (e) {}
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    const isTouch = "touches" in e;
    const clientX = isTouch ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = isTouch ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const x = clientX - canvas.offsetLeft;
    const y = clientY - canvas.offsetTop;

    if (!targetPos.current || !currPos.current) {
      targetPos.current = { x, y };
      currPos.current = { x, y };
      lastDrawCoords.current = { x, y };
      initAudio();
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      return;
    }

    // ponytail: cursor speed damping (#1) - scale down delta, then clamp max lag in one pass
    const dx = x - targetPos.current.x;
    const dy = y - targetPos.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const dampingFactor = 0.45 / (1 + dist * 0.02);

    targetPos.current.x += dx * dampingFactor;
    targetPos.current.y += dy * dampingFactor;

    // clamp: target can't fall more than 60px behind real mouse
    const maxLag = 60;
    const lx = x - targetPos.current.x;
    const ly = y - targetPos.current.y;
    const ld = lx * lx + ly * ly;
    if (ld > maxLag * maxLag) {
      const s = maxLag / Math.sqrt(ld);
      targetPos.current.x = x - lx * s;
      targetPos.current.y = y - ly * s;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[300] bg-[#C2A66B] overflow-hidden select-none flex items-center justify-center animate-fade-in"
      onClick={onDismiss}
      data-cursor="rake"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        onMouseMove={handlePointerMove}
        onTouchStart={handlePointerMove}
        onTouchMove={handlePointerMove}
      />

      <div
        className={`absolute bottom-8 right-8 font-serif font-black text-sm tracking-[0.25em] uppercase text-[#36454F]/35 select-none pointer-events-none transition-opacity duration-1000 ${
          stampVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        KH
      </div>

      <div className="absolute top-8 font-mono text-[9px] tracking-[0.2em] uppercase text-white/50 pointer-events-none select-none text-center px-6">
        Rake sand. Click anywhere to return. Ctrl+C to clear sand
      </div>
    </div>
  );
};


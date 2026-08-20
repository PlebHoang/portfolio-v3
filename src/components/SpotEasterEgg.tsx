import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Terminal, Zap, FileText } from "lucide-react";

// Web Audio API Sound Engine (Spider-Verse Deep Sub-bass & Smooth Inky Pops)
class SpotAudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) this.ctx = new AudioCtxClass();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public playStepTone(step: number) {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const freq = 160 + (step % 16) * 35;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.3, now + 0.06);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      // Autoplay fallback
    }
  }

  public playMergeTone(sizeFactor: number) {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const baseFreq = Math.max(50, 200 - sizeFactor * 1.5);
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, now + 0.25);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      // Autoplay fallback
    }
  }

  public playChargeUp() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(55, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.5);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.45);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch (e) {
      // Autoplay fallback
    }
  }

  // 1-Second Deep Sub-Bass Rumble (Clean, zero harsh chimes)
  public playGlitchSound() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(130, now);
      subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.9);

      subGain.gain.setValueAtTime(0.35, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 1.0);

      const bufferSize = ctx.sampleRate * 0.8;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const out = noiseBuffer.getChannelData(0);
      for (let j = 0; j < out.length; j++) out[j] = Math.random() * 2 - 1;

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(240, now);
      filter.frequency.exponentialRampToValueAtTime(45, now + 0.9);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.12, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(now);
    } catch (e) {
      // Autoplay fallback
    }
  }

  public playQuantumDrop() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(130, now);
      subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.8);

      subGain.gain.setValueAtTime(0.3, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 1.2);
    } catch (e) {
      // Autoplay fallback
    }
  }
}

const spotAudio = new SpotAudioEngine();

// Living Ink Portal Class with Organic Wobble & Elasticity
class InkPortal {
  x: number;
  y: number;
  targetRadius: number;
  radius: number;
  wobblePhase: number;
  wobbleSpeed: number;
  vx: number;
  vy: number;
  isDragged: boolean = false;
  points: number = 14;
  scale: number = 1;

  constructor(x: number, y: number, radius: number, startScale: number = 1) {
    this.x = x;
    this.y = y;
    this.targetRadius = radius;
    this.radius = radius;
    this.scale = startScale;
    this.wobblePhase = Math.random() * Math.PI * 2;
    this.wobbleSpeed = 0.03 + Math.random() * 0.02;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
  }

  update(
    width: number,
    height: number,
    mouse: { x: number; y: number; active: boolean; isDown: boolean },
    isFrozen: boolean
  ) {
    if (this.scale < 1) {
      this.scale += (1 - this.scale) * 0.28;
    }

    if (isFrozen) return;

    this.wobblePhase += this.wobbleSpeed;

    if (this.isDragged) {
      this.x += (mouse.x - this.x) * 0.35;
      this.y += (mouse.y - this.y) * 0.35;
      this.vx = 0;
      this.vy = 0;
      this.radius += (this.targetRadius * 1.25 - this.radius) * 0.15;
      return;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Bounds bounce
    if (this.x < this.radius) {
      this.x = this.radius;
      this.vx *= -1;
    } else if (this.x > width - this.radius) {
      this.x = width - this.radius;
      this.vx *= -1;
    }

    if (this.y < this.radius) {
      this.y = this.radius;
      this.vy *= -1;
    } else if (this.y > height - this.radius) {
      this.y = height - this.radius;
      this.vy *= -1;
    }

    // Cursor attraction when hovering
    if (mouse.active && !mouse.isDown) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 220 && dist > 1) {
        this.x += (dx / dist) * 0.6;
        this.y += (dy / dist) * 0.6;
        this.radius = this.targetRadius * (1 + (1 - dist / 220) * 0.25);
      } else {
        this.radius += (this.targetRadius - this.radius) * 0.1;
      }
    } else {
      this.radius += (this.targetRadius - this.radius) * 0.1;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scale, this.scale);

    ctx.beginPath();
    for (let i = 0; i <= this.points; i++) {
      const angle = (i / this.points) * Math.PI * 2;
      const offset =
        Math.sin(angle * 3 + this.wobblePhase) * (this.radius * 0.08) +
        Math.cos(angle * 2 - this.wobblePhase) * (this.radius * 0.06);
      const r = Math.max(8, this.radius + offset);
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = "#000000";
    ctx.fill();

    // Inner comic sketch dash ring
    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.lineWidth = Math.min(3, Math.max(1.2, this.radius * 0.03));
    ctx.setLineDash([4, 6]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Extra cosmic center core for giant merged super-spots
    if (this.radius > 75) {
      ctx.beginPath();
      ctx.arc(0, 0, this.radius * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
      ctx.fill();
    }

    ctx.restore();
  }
}

// Teleporting Ink Particle Class
class InkParticle {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
  radius: number = 2;
  color: string = "#000000";

  constructor(width: number, height: number) {
    this.reset(width, height);
  }

  reset(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 1.8;
    this.vy = (Math.random() - 0.5) * 1.8;
    this.radius = Math.random() * 2.8 + 1.2;
    this.color = Math.random() > 0.15 ? "#000000" : "#555555";
  }

  update(width: number, height: number, portals: InkPortal[], isFrozen: boolean) {
    if (isFrozen) return;

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.reset(width, height);
    }

    if (portals.length === 0) return;

    portals.forEach((p, pIdx) => {
      const dx = p.x - this.x;
      const dy = p.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < p.radius) {
        if (portals.length > 1) {
          const targetPortal = portals[(pIdx + 1) % portals.length];
          this.x = targetPortal.x + (Math.random() - 0.5) * (targetPortal.radius * 0.5);
          this.y = targetPortal.y + (Math.random() - 0.5) * (targetPortal.radius * 0.5);
        }
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = (Math.random() - 0.5) * 6;
      } else if (dist < p.radius * 2.8) {
        this.vx += (dx / dist) * 0.22;
        this.vy += (dy / dist) * 0.22;
      }
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

interface SpotEasterEggProps {
  isOpen: boolean;
  onClose: () => void;
  stepProgress: number; // 0 to 8
}

export const SpotEasterEgg: React.FC<SpotEasterEggProps> = ({ isOpen, onClose, stepProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const portalsRef = useRef<InkPortal[]>([]);
  const particlesRef = useRef<InkParticle[]>([]);
  const shockwavesRef = useRef<{ x: number; y: number; radius: number; maxRadius: number }[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean; isDown: boolean }>({
    x: 0,
    y: 0,
    active: false,
    isDown: false,
  });
  const draggedPortalRef = useRef<InkPortal | null>(null);
  const [portalCount, setPortalCount] = useState<number>(5);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(true);

  // Timeline Phases: 'idle' | 'charging' (0.5s) | 'freeze_multiplying' (2.4s) | 'glitching' (1.0s)
  const [collapsePhase, setCollapsePhase] = useState<"idle" | "charging" | "freeze_multiplying" | "glitching">("idle");
  const collapsePhaseRef = useRef<"idle" | "charging" | "freeze_multiplying" | "glitching">("idle");
  const [glitchSlices, setGlitchSlices] = useState<{ top: string; height: string; offset: string; invert: boolean }[]>([]);

  // Synchronize ref to prevent useEffect teardown loops
  useEffect(() => {
    collapsePhaseRef.current = collapsePhase;
  }, [collapsePhase]);

  useEffect(() => {
    if (isOpen) {
      setCollapsePhase("idle");
      collapsePhaseRef.current = "idle";
      setIsDossierOpen(true);
      spotAudio.playQuantumDrop();
    }
  }, [isOpen]);

  // Unstable Glitch Slice Animator (during 'glitching' phase for exactly 1.0s)
  useEffect(() => {
    if (collapsePhase !== "glitching") {
      setGlitchSlices([]);
      return;
    }

    const interval = setInterval(() => {
      const slices = Array.from({ length: 8 }, () => ({
        top: `${Math.random() * 95}%`,
        height: `${Math.random() * 12 + 3}%`,
        offset: `${(Math.random() - 0.5) * 40}px`,
        invert: Math.random() > 0.45,
      }));
      setGlitchSlices(slices);
    }, 55);

    return () => clearInterval(interval);
  }, [collapsePhase]);

  // Canvas Mounting & Animation Loop (Mounts ONLY on isOpen change so portalsRef is never wiped!)
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initial 5 portals
    portalsRef.current = [
      new InkPortal(width * 0.25, height * 0.3, 44),
      new InkPortal(width * 0.75, height * 0.35, 50),
      new InkPortal(width * 0.5, height * 0.7, 60),
      new InkPortal(width * 0.18, height * 0.75, 38),
      new InkPortal(width * 0.82, height * 0.78, 42),
    ];
    setPortalCount(portalsRef.current.length);

    particlesRef.current = Array.from({ length: 130 }, () => new InkParticle(width, height));

    const getEventPos = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if ("clientX" in e) {
        return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };
      }
      return { x: mouseRef.current.x, y: mouseRef.current.y };
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (collapsePhaseRef.current !== "idle") return;
      const pos = getEventPos(e);
      mouseRef.current.x = pos.x;
      mouseRef.current.y = pos.y;
      mouseRef.current.active = true;
      mouseRef.current.isDown = true;

      for (let i = portalsRef.current.length - 1; i >= 0; i--) {
        const p = portalsRef.current[i];
        const dx = pos.x - p.x;
        const dy = pos.y - p.y;
        if (Math.sqrt(dx * dx + dy * dy) <= p.radius * 1.2) {
          p.isDragged = true;
          draggedPortalRef.current = p;
          spotAudio.playStepTone(4);
          break;
        }
      }
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const pos = getEventPos(e);
      mouseRef.current.x = pos.x;
      mouseRef.current.y = pos.y;
      mouseRef.current.active = true;
    };

    const handlePointerUp = () => {
      mouseRef.current.isDown = false;
      if (draggedPortalRef.current) {
        draggedPortalRef.current.isDragged = false;
        draggedPortalRef.current = null;
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchstart", handlePointerDown, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("touchend", handlePointerUp);

    // Main Canvas Loop
    const render = () => {
      const currentPhase = collapsePhaseRef.current;
      const isFrozen = currentPhase === "freeze_multiplying";

      if (currentPhase === "glitching") {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < 5; i++) {
          const sy = Math.random() * height;
          const sh = Math.random() * 20 + 4;
          ctx.fillStyle = Math.random() > 0.5 ? "rgba(0, 0, 0, 0.85)" : "rgba(255, 255, 255, 0.85)";
          ctx.fillRect(0, sy, width, sh);
        }
      } else {
        ctx.fillStyle = "rgba(247, 246, 243, 0.35)";
        ctx.fillRect(0, 0, width, height);
      }

      const portals = portalsRef.current;

      // Normal idle merging physics
      if (currentPhase === "idle") {
        for (let i = 0; i < portals.length; i++) {
          for (let j = i + 1; j < portals.length; j++) {
            const p1 = portals[i];
            const p2 = portals[j];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const mergeDist = (p1.radius + p2.radius) * 0.78;

            if (dist < mergeDist && dist > 0) {
              const combinedRadius = Math.min(260, Math.sqrt(p1.targetRadius ** 2 + p2.targetRadius ** 2));
              const totalMass = p1.radius ** 2 + p2.radius ** 2;

              p1.x = (p1.x * (p1.radius ** 2) + p2.x * (p2.radius ** 2)) / totalMass;
              p1.y = (p1.y * (p1.radius ** 2) + p2.y * (p2.radius ** 2)) / totalMass;
              p1.targetRadius = combinedRadius;
              p1.radius = combinedRadius;
              p1.wobblePhase += Math.PI * 0.5;

              spotAudio.playMergeTone(combinedRadius);
              shockwavesRef.current.push({
                x: p1.x,
                y: p1.y,
                radius: 10,
                maxRadius: combinedRadius * 2.8,
              });

              portals.splice(j, 1);
              setPortalCount(portals.length);
              j--;
            } else if (dist < (p1.radius + p2.radius) * 1.4) {
              const pull = 0.45;
              p1.x += (dx / dist) * pull;
              p1.y += (dy / dist) * pull;
              p2.x -= (dx / dist) * pull;
              p2.y -= (dy / dist) * pull;
            }
          }
        }
      }

      // Draw portals
      if (currentPhase !== "glitching") {
        portals.forEach((p) => {
          p.update(width, height, mouseRef.current, isFrozen);
          p.draw(ctx);
        });

        // Draw background particles
        particlesRef.current.forEach((pt) => {
          pt.update(width, height, portals, isFrozen);
          pt.draw(ctx);
        });
      }

      // Render shockwaves
      for (let i = shockwavesRef.current.length - 1; i >= 0; i--) {
        const sw = shockwavesRef.current[i];
        sw.radius += 18;
        const alpha = Math.max(0, 1 - sw.radius / sw.maxRadius);

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 0, 0, ${alpha * 0.85})`;
        ctx.lineWidth = 4;
        ctx.stroke();

        if (sw.radius >= sw.maxRadius) {
          shockwavesRef.current.splice(i, 1);
        }
      }

      animFrame = requestAnimationFrame(render);
    };

    animFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [isOpen]);

  // ── Cinematic Multiverse Collapse: Charge (Anchored) → Freeze (38 Giant Spots Flood Screen Black) → Unstable Screen Glitch (1s) → Hero Page ──
  const triggerMultiverseCollapse = () => {
    if (collapsePhaseRef.current !== "idle") return;

    // 1. Charge Up (0.5s): Anchor the original 100% merged spot firmly at its exact position
    if (portalsRef.current.length > 0) {
      portalsRef.current[0].vx = 0;
      portalsRef.current[0].vy = 0;
      portalsRef.current[0].isDragged = false;
    }

    setCollapsePhase("charging");
    spotAudio.playChargeUp();

    const canvas = canvasRef.current;
    const width = canvas ? canvas.width : window.innerWidth;
    const height = canvas ? canvas.height : window.innerHeight;

    setTimeout(() => {
      // 2. Freeze: Flood screen with 38 massive overlapping black spots (radii 140px to 320px)
      setCollapsePhase("freeze_multiplying");

      const totalNewSpots = 38;
      let accumulatedDelay = 0;

      for (let i = 0; i < totalNewSpots; i++) {
        const stepDelay = Math.max(18, Math.floor(160 * Math.pow(0.92, i)));
        accumulatedDelay += stepDelay;

        setTimeout(() => {
          if (!portalsRef.current) return;
          const rx = Math.random() * width;
          const ry = Math.random() * height;
          const rSize = Math.random() * 180 + 140;
          portalsRef.current.push(new InkPortal(rx, ry, rSize, 0.15));
          setPortalCount(portalsRef.current.length);
          spotAudio.playStepTone(i);
        }, accumulatedDelay);
      }

      // 3. Unstable Screen Glitch (1.0s)
      setTimeout(() => {
        setCollapsePhase("glitching");
        spotAudio.playGlitchSound();
        portalsRef.current = [];

        // 4. Return seamlessly to clean Hero Page after exactly 1.0s
        setTimeout(() => {
          setCollapsePhase("idle");
          onClose();
        }, 1000);
      }, accumulatedDelay + 300);
    }, 500);
  };

  const sequence = ["↑", "↑", "↓", "↓", "←", "→", "←", "→"];

  const mergedSpot = portalsRef.current.length === 1 ? portalsRef.current[0] : null;

  return (
    <>
      {/* ── 1. Floating Keyboard Sequence UI Indicator (Hint HUD) ── */}
      <AnimatePresence>
        {stepProgress > 0 && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[90] bg-[#FAF9F6] border-2 border-black rounded-2xl p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-2 select-none"
          >
            <div className="flex items-center justify-between gap-3 border-b border-[#d4d4d0] pb-1.5">
              <span className="font-mono text-[10px] font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-black" />
                The Spot Protocol
              </span>
              <span className="font-mono text-[9px] font-bold text-neutral-400">
                {stepProgress}/8
              </span>
            </div>

            <div className="flex items-center gap-1">
              {sequence.map((key, idx) => {
                const isActive = idx < stepProgress;
                return (
                  <div
                    key={idx}
                    className={`w-7 h-7 flex items-center justify-center rounded-lg font-mono text-xs font-bold border transition-all ${
                      isActive
                        ? "bg-black text-white border-black scale-110 shadow-xs"
                        : "bg-white text-neutral-400 border-[#d4d4d0]"
                    }`}
                  >
                    {key}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 2. Full-Screen Spider-Verse "The Spot" Portal Dimension ── */}
      <AnimatePresence>
        {isOpen && (
          <div
            className={`fixed inset-0 z-[120] flex items-center justify-center p-4 transition-colors duration-200 ${
              collapsePhase === "glitching" ? "bg-transparent pointer-events-none" : "bg-black/75 backdrop-blur-md"
            }`}
          >
            {/* Living Ink Portals & Glitch Canvas */}
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 w-full h-full pointer-events-auto ${
                collapsePhase === "glitching"
                  ? "pointer-events-none"
                  : collapsePhase === "charging"
                  ? "animate-pulse"
                  : "cursor-grab active:cursor-grabbing"
              }`}
            />

            {/* Minimalist Top Control Pill (Always accessible when dossier card is closed) */}
            {!isDossierOpen && collapsePhase === "idle" && (
              <div className="absolute top-6 right-6 z-30 flex items-center gap-2.5">
                <button
                  onClick={() => setIsDossierOpen(true)}
                  className="px-3.5 py-1.5 bg-[#FAF9F6] hover:bg-white text-black font-mono text-xs font-bold border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Dossier
                </button>
                <button
                  onClick={onClose}
                  className="px-3.5 py-1.5 bg-black hover:bg-neutral-800 text-white font-mono text-xs font-bold border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                >
                  Exit
                </button>
              </div>
            )}

            {/* ── CIRCULAR "INITIATE" BUTTON: Appears when all spots are merged (portalCount === 1) ── */}
            <AnimatePresence>
              {portalCount === 1 && collapsePhase === "idle" && (
                <motion.button
                  initial={{ scale: 0, opacity: 0, rotate: -20 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0, opacity: 0, rotate: 20 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={triggerMultiverseCollapse}
                  className="absolute z-40 w-32 h-32 rounded-full bg-black text-white border-2 border-white/80 shadow-[0_0_35px_rgba(0,0,0,0.95)] flex flex-col items-center justify-center cursor-pointer select-none group transition-all"
                  style={{
                    left: mergedSpot ? `${mergedSpot.x}px` : "50%",
                    top: mergedSpot ? `${mergedSpot.y}px` : "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  title="Initiate Singularity Collapse"
                >
                  {/* Outer rotating dashed comic halo */}
                  <div
                    className="absolute -inset-2 rounded-full border-2 border-dashed border-white/40 animate-spin"
                    style={{ animationDuration: "14s" }}
                  />
                  <Zap className="w-5 h-5 text-white mb-1 transition-transform group-hover:scale-110" />
                  <span className="font-mono text-xs font-black tracking-widest uppercase text-white">
                    Initiate
                  </span>
                  <span className="font-mono text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
                    Collapse
                  </span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Unstable Reality Glitch Slices Layer (Active for 1s during collapse) */}
            {collapsePhase === "glitching" && (
              <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
                {glitchSlices.map((slice, i) => (
                  <div
                    key={i}
                    className={`absolute left-0 right-0 ${
                      slice.invert ? "bg-black text-white mix-blend-difference" : "bg-white/80 backdrop-invert"
                    } border-y border-black/60 shadow-lg`}
                    style={{
                      top: slice.top,
                      height: slice.height,
                      transform: `translateX(${slice.offset})`,
                    }}
                  />
                ))}
                <div className="absolute inset-0 bg-black/20 mix-blend-difference animate-pulse" />
              </div>
            )}

            {/* Comic Halftone Overlay */}
            {collapsePhase !== "glitching" && (
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                  backgroundImage: "radial-gradient(#111111 1.2px, transparent 1.2px)",
                  backgroundSize: "14px 14px",
                }}
              />
            )}

            {/* Anomaly Clearance Dossier Control Tab (X button closes tab, not whole screen) */}
            <AnimatePresence>
              {isDossierOpen && collapsePhase !== "glitching" && (
                <motion.div
                  initial={{ scale: 0.85, opacity: 0, rotate: -2 }}
                  animate={{
                    scale: collapsePhase === "charging" ? [1, 1.02, 0.98, 1.01] : 1,
                    opacity: 1,
                    rotate: 0,
                  }}
                  exit={{ scale: 0.85, opacity: 0, filter: "blur(12px)" }}
                  transition={{
                    scale: { duration: 0.2, repeat: collapsePhase === "charging" ? Infinity : 0 },
                    opacity: { duration: 0.2 },
                  }}
                  className="relative w-full max-w-2xl bg-[#FAF9F6]/60 backdrop-blur-2xl border-3 border-black rounded-3xl p-6 sm:p-9 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden z-10 space-y-5 select-none"
                >
                  {/* Top Header */}
                  <div className="flex items-center justify-between border-b-2 border-black/80 pb-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-black text-white font-serif font-black flex items-center justify-center text-sm shadow-md">
                        KH
                      </div>
                      <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-black font-extrabold block">
                          // ANOMALY_CLEARANCE: THE SPOT
                        </span>
                        <span className="font-mono text-[10px] text-neutral-600 font-semibold">
                          Coordinates: 53.0793° N, 8.8017° E (Bremen)
                        </span>
                      </div>
                    </div>

                    {/* X button closes this control tab */}
                    <button
                      onClick={() => setIsDossierOpen(false)}
                      disabled={collapsePhase !== "idle"}
                      className="w-8 h-8 rounded-full border-2 border-black bg-white/90 hover:bg-black hover:text-white transition-all font-bold text-xs flex items-center justify-center cursor-pointer"
                      title="Minimize Control Tab"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Center Content */}
                  <div className="space-y-4 text-left">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-block px-3 py-0.5 rounded-full bg-black text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                          Dimension Breach Confirmed
                        </span>
                        <span className="font-mono text-[11px] text-neutral-700 font-bold bg-white/70 px-2 py-0.5 rounded border border-black/20">
                          Active Portals: {portalCount}
                        </span>
                        {portalCount === 1 && collapsePhase === "idle" && (
                          <span className="font-mono text-[10px] text-purple-900 bg-purple-100 border border-purple-400 px-2 py-0.5 rounded-full font-bold animate-pulse">
                            Quantum Singularity Reached
                          </span>
                        )}
                        {collapsePhase === "charging" && (
                          <span className="font-mono text-[10px] text-amber-900 bg-amber-100 border border-amber-400 px-2 py-0.5 rounded-full font-bold animate-pulse">
                            CHARGING CORE...
                          </span>
                        )}
                        {collapsePhase === "freeze_multiplying" && (
                          <span className="font-mono text-[10px] text-white bg-black px-2 py-0.5 rounded-full font-bold animate-pulse">
                            DIMENSION CASCADE...
                          </span>
                        )}
                      </div>

                      <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-black leading-none pt-1">
                        You Found the Portal.
                      </h3>
                      <p className="font-serif text-neutral-800 text-sm sm:text-base leading-relaxed">
                        Sequence <span className="font-mono font-bold text-black bg-white/80 border border-black/20 px-1.5 py-0.5 rounded shadow-xs">↑↑↓↓←→←→</span> entered. Drag spots into each other to merge them into a single quantum singularity.
                      </p>
                    </div>

                    {/* Telemetry Matrix Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono">
                      <div className="p-3 bg-white/60 backdrop-blur-md border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-[9px] text-neutral-600 block uppercase font-bold">Spot Cohesion</span>
                        <span className="text-base sm:text-lg font-black text-black">
                          {portalCount === 1 ? "100% MERGED" : `${portalCount} VOIDS`}
                        </span>
                      </div>
                      <div className="p-3 bg-white/60 backdrop-blur-md border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-[9px] text-neutral-600 block uppercase font-bold">Quantum Mesh</span>
                        <span className="text-base sm:text-lg font-black text-black">ONLINE</span>
                      </div>
                      <div className="p-3 bg-white/60 backdrop-blur-md border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] col-span-2 sm:col-span-1">
                        <span className="text-[9px] text-neutral-600 block uppercase font-bold">System Tier</span>
                        <span className="text-base sm:text-lg font-black text-black">ROOT DEV</span>
                      </div>
                    </div>

                    {/* Comic Terminal Log */}
                    <div className="bg-black/90 text-[#FAF9F6] backdrop-blur-md border-2 border-black rounded-xl p-3 font-mono text-[11px] space-y-0.5 shadow-md">
                      <div className="flex items-center justify-between pb-1 border-b border-neutral-700 text-[9px] text-neutral-400">
                        <span className="flex items-center gap-1">
                          <Terminal className="w-3 h-3" />
                          root@hoang-quantum-hub:~#
                        </span>
                        <span className="text-emerald-400 font-bold">VERIFIED</span>
                      </div>
                      <p className="text-neutral-300">&gt; physics engine: living ink portal merging & teleportation active</p>
                      <p className="text-white font-bold pt-0.5">&gt; "Think. Research. Plan. Build. Validate. Loop."</p>
                    </div>
                  </div>

                  {/* Action Buttons & Secret Singularity Collapse Button */}
                  <div className="pt-2 border-t-2 border-black/80 flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex flex-wrap gap-2">
                      {portalCount === 1 ? (
                        <button
                          onClick={triggerMultiverseCollapse}
                          disabled={collapsePhase !== "idle"}
                          className="px-4 py-2.5 bg-black hover:bg-neutral-900 text-white font-mono font-black text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Zap className="w-4 h-4 text-amber-300 animate-pulse" />
                          {collapsePhase === "charging" ? "CHARGING..." : collapsePhase === "freeze_multiplying" ? "CASCADING..." : "Initiate Collapse"}
                        </button>
                      ) : (
                        <div className="font-mono text-xs font-bold text-neutral-500 flex items-center gap-1.5 py-2">
                          <span>Drag spots together to merge them</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsDossierOpen(false)}
                        className="px-4 py-2 border-2 border-black bg-white/90 hover:bg-white text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                      >
                        Hide Tab
                      </button>
                      <button
                        onClick={onClose}
                        disabled={collapsePhase !== "idle"}
                        className="px-4 py-2 bg-black hover:bg-neutral-800 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                      >
                        Exit
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export { spotAudio };

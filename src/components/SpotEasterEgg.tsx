import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Terminal, Zap, FileText, Split } from "lucide-react";

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

      const baseFreq = Math.max(45, 190 - sizeFactor * 1.4);
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.45, now + 0.35);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
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

// Living Ink Portal Class with Organic Wobble & Gravitational Tidal Stretching
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
  scale: number = 1;
  mergeCooldown: number = 0;

  constructor(x: number, y: number, radius: number, startScale: number = 1, cooldown: number = 0) {
    this.x = x;
    this.y = y;
    this.targetRadius = radius;
    this.radius = radius;
    this.scale = startScale;
    this.mergeCooldown = cooldown;
    this.wobblePhase = Math.random() * Math.PI * 2;
    this.wobbleSpeed = 0.04 + Math.random() * 0.03;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
  }

  update(
    width: number,
    height: number,
    mouse: { x: number; y: number; active: boolean; isDown: boolean },
    isFrozen: boolean,
    isInspiral: boolean = false
  ) {
    if (this.mergeCooldown > 0) {
      this.mergeCooldown--;
    }

    if (this.scale < 1) {
      this.scale += (1 - this.scale) * 0.28;
    }

    if (isFrozen) return;

    this.wobblePhase += this.wobbleSpeed * (isInspiral ? 4.0 : 1.0);

    if (this.isDragged) {
      this.x += (mouse.x - this.x) * 0.35;
      this.y += (mouse.y - this.y) * 0.35;
      this.vx = 0;
      this.vy = 0;
      this.radius += (this.targetRadius * 1.25 - this.radius) * 0.15;
      return;
    }

    if (!isInspiral) {
      // ── Continuous Ambient Cosmic Entropy Drift (Perpetual subtle wander) ──
      const entropyNoiseX = Math.cos(this.wobblePhase * 0.7 + this.x * 0.005) * 0.25;
      const entropyNoiseY = Math.sin(this.wobblePhase * 0.8 + this.y * 0.005) * 0.25;

      this.vx = (this.vx + entropyNoiseX * 0.12) * 0.985;
      this.vy = (this.vy + entropyNoiseY * 0.12) * 0.985;

      // Soft entropy floor so spots never sit completely still (~0.28 to 0.45px/frame)
      const currentSpeed = Math.hypot(this.vx, this.vy);
      if (currentSpeed < 0.25) {
        const wanderAngle = this.wobblePhase + this.radius * 0.1;
        this.vx += Math.cos(wanderAngle) * 0.06;
        this.vy += Math.sin(wanderAngle) * 0.06;
      }

      this.x += this.vx;
      this.y += this.vy;

      // Bounds bounce with soft cushion
      if (this.x < this.radius) {
        this.x = this.radius;
        this.vx = Math.abs(this.vx) * 0.85;
      } else if (this.x > width - this.radius) {
        this.x = width - this.radius;
        this.vx = -Math.abs(this.vx) * 0.85;
      }

      if (this.y < this.radius) {
        this.y = this.radius;
        this.vy = Math.abs(this.vy) * 0.85;
      } else if (this.y > height - this.radius) {
        this.y = height - this.radius;
        this.vy = -Math.abs(this.vy) * 0.85;
      }

      // Cursor attraction when hovering
      if (mouse.active && !mouse.isDown) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220 && dist > 1) {
          this.x += (dx / dist) * 0.5;
          this.y += (dy / dist) * 0.5;
          this.radius = this.targetRadius * (1 + (1 - dist / 220) * 0.25);
        } else {
          this.radius += (this.targetRadius - this.radius) * 0.1;
        }
      } else {
        this.radius += (this.targetRadius - this.radius) * 0.1;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, companionAngle?: number) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scale, this.scale);

    ctx.beginPath();
    const pts = 16;

    // Wobbleness scales dynamically with spot size: 3% for small spots up to 10% maximum for giant spots
    const sizeRatio = Math.min(1.0, Math.max(0, (this.radius - 22) / 180));
    const wobbleIntensity = 0.03 + sizeRatio * 0.07; // 3% to 10% maximum

    for (let i = 0; i <= pts; i++) {
      const angle = (i / pts) * Math.PI * 2;

      // Dynamic organic ink ripple scaled by spot size (capped at 10%)
      const wobble =
        Math.sin(angle * 3 + this.wobblePhase) * (this.radius * wobbleIntensity * 0.75) +
        Math.cos(angle * 2 - this.wobblePhase * 1.2) * (this.radius * wobbleIntensity * 0.25);

      // Subtle gentle tidal elongation toward companion (max 6-8%, smooth & grounded)
      let tidal = 0;
      if (companionAngle !== undefined) {
        tidal = Math.cos(angle - companionAngle) * (this.radius * 0.07);
      }

      // Safe lower-bound clamping guarantees no inversion or glitchy vertices
      const r = Math.max(this.radius * 0.6, Math.max(6, this.radius + wobble + tidal));
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;

      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = "#000000";
    ctx.fill();

    // Inner comic sketch dash ring
    ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
    ctx.lineWidth = Math.min(3.5, Math.max(1.2, this.radius * 0.035));
    ctx.setLineDash([4, 6]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Extra cosmic center core for giant merged super-spots
    if (this.radius > 75) {
      ctx.beginPath();
      ctx.arc(0, 0, this.radius * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
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

  update(
    width: number,
    height: number,
    portals: InkPortal[],
    isFrozen: boolean,
    barycenter?: { x: number; y: number; active: boolean; chaos: number }
  ) {
    if (isFrozen) return;

    // Sucked into accretion vortex around barycenter during inspiral
    if (barycenter && barycenter.active) {
      const bdx = barycenter.x - this.x;
      const bdy = barycenter.y - this.y;
      const bdist = Math.hypot(bdx, bdy);
      if (bdist < 360 && bdist > 5) {
        const tx = -bdy / bdist;
        const ty = bdx / bdist;
        const speed = Math.min(22, (90 + barycenter.chaos * 150) / Math.sqrt(bdist + 10));
        this.vx = this.vx * 0.8 + (tx * speed + (bdx / bdist) * 1.8) * 0.2;
        this.vy = this.vy * 0.8 + (ty * speed + (bdy / bdist) * 1.8) * 0.2;
      }
    }

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
        this.vx += (dx / dist) * 0.25;
        this.vy += (dy / dist) * 0.25;
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

const MAX_SPLITS = 2;
const SPOT_SEQUENCE = ["↑", "↑", "↓", "↓", "←", "→", "←", "→"] as const;

interface InspiralSession {
  startTime: number;
  baryX: number;
  baryY: number;
  nodes: {
    portal: InkPortal;
    initialR: number;
    initialAngle: number;
  }[];
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
  const lastClickRef = useRef<{ time: number; x: number; y: number }>({ time: 0, x: 0, y: 0 });
  const sessionRef = useRef<InspiralSession | null>(null);
  const gravityDisabledUntilRef = useRef<number>(0);

  const [portalCount, setPortalCount] = useState<number>(5);
  const [splitCount, setSplitCount] = useState<number>(0);
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
      setSplitCount(0);
      sessionRef.current = null;
      gravityDisabledUntilRef.current = 0;
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

  // ── Spot Splitting Capped to Max 3 Splits (Random 4 to 7 children per split) ──
  const splitSpots = (targetPortal?: InkPortal) => {
    if (collapsePhaseRef.current !== "idle" || splitCount >= MAX_SPLITS) return;

    spotAudio.playStepTone(3);
    sessionRef.current = null;
    gravityDisabledUntilRef.current = performance.now() + 2200; // Deactivate gravity for 2.2s so spots disperse far apart

    const portals = portalsRef.current;
    if (portals.length === 0) return;

    const splitSinglePortal = (p: InkPortal): InkPortal[] => {
      const count = Math.floor(Math.random() * 4) + 4; // 4, 5, 6, or 7
      const childRadius = Math.max(22, (p.radius / Math.sqrt(count)) * 0.95);
      const spawnDist = p.radius * 0.8 + childRadius * 1.8;

      return Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
        const px = p.x + Math.cos(angle) * spawnDist;
        const py = p.y + Math.sin(angle) * spawnDist;
        const child = new InkPortal(px, py, childRadius, 0.4, 90); // 90-frame collision grace period
        const pushSpeed = 7.5 + Math.random() * 3.5; // Strong outward push
        child.vx = Math.cos(angle) * pushSpeed;
        child.vy = Math.sin(angle) * pushSpeed;
        return child;
      });
    };

    const newPortals = portals.flatMap((p) =>
      !targetPortal || p === targetPortal ? splitSinglePortal(p) : [p]
    );

    portalsRef.current = newPortals;
    setPortalCount(newPortals.length);
    setSplitCount((prev) => prev + 1);
  };

  // Canvas Mounting & Animation Loop
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

      const now = Date.now();
      const isDoubleTap =
        now - lastClickRef.current.time < 320 &&
        Math.hypot(pos.x - lastClickRef.current.x, pos.y - lastClickRef.current.y) < 30;

      lastClickRef.current = { time: now, x: pos.x, y: pos.y };

      for (let i = portalsRef.current.length - 1; i >= 0; i--) {
        const p = portalsRef.current[i];
        const dx = pos.x - p.x;
        const dy = pos.y - p.y;
        if (Math.sqrt(dx * dx + dy * dy) <= p.radius * 1.2) {
          if (isDoubleTap) {
            splitSpots(p);
            return;
          }

          p.isDragged = true;
          draggedPortalRef.current = p;
          sessionRef.current = null; // reset inspiral session if user drags
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

      const numSpots = portalsRef.current.length;
      const isGravityActive = performance.now() >= gravityDisabledUntilRef.current;

      // Inspiral vortex only engages when the 2 or 3 spots have comparable sizes (within 2.2x ratio).
      // If one spot is gigantic and the others are tiny, the giant spot acts as an anchored supermassive attractor.
      let isComparableSize = false;
      if (numSpots === 2 || numSpots === 3) {
        const radii = portalsRef.current.map((p) => p.radius);
        const maxR = Math.max(...radii);
        const minR = Math.min(...radii);
        isComparableSize = maxR / Math.max(1, minR) < 2.2;
      }

      const isCandidateInspiral = isGravityActive && isComparableSize;

      let baryX = 0;
      let baryY = 0;
      let inspiralActive = false;
      let chaosLevel = 0; // 0 to 1

      // ── Numerical Relativity 3-Second Inspiral Merger Simulation (For comparable binary/ternary pairs) ──
      if (currentPhase === "idle" && isCandidateInspiral && !draggedPortalRef.current) {
        let totalMass = 0;
        let bx = 0;
        let by = 0;
        for (const p of portalsRef.current) {
          const m = p.radius ** 2;
          totalMass += m;
          bx += p.x * m;
          by += p.y * m;
        }
        bx /= totalMass;
        by /= totalMass;

        // Verify spots are within mutual gravitational reach
        const allWithinReach = portalsRef.current.every((p) => Math.hypot(p.x - bx, p.y - by) < 450);

        if (allWithinReach) {
          if (!sessionRef.current) {
            sessionRef.current = {
              startTime: performance.now(),
              baryX: bx,
              baryY: by,
              nodes: portalsRef.current.map((p) => ({
                portal: p,
                initialR: Math.max(35, Math.hypot(p.x - bx, p.y - by)),
                initialAngle: Math.atan2(p.y - by, p.x - bx),
              })),
            };
          }

          const session = sessionRef.current;
          baryX = session.baryX;
          baryY = session.baryY;
          inspiralActive = true;

          const now = performance.now();
          const elapsedSec = (now - session.startTime) / 1000;

          // Check if distance has collapsed or time has reached merger threshold (2.8s)
          const tau = Math.min(1.0, elapsedSec / 2.8);
          const distanceFactor = Math.max(0, 1 - Math.pow(tau, 1.25));

          if (tau >= 1.0 || distanceFactor <= 0.05) {
            // ── FUSE ALL INSPIRAL NODES SIMULTANEOUSLY INTO 1 GIANT PORTAL ──
            const totalR2 = session.nodes.reduce((acc, n) => acc + n.portal.targetRadius ** 2, 0);
            const combinedRadius = Math.min(270, Math.sqrt(totalR2));

            const singleMergedPortal = new InkPortal(session.baryX, session.baryY, combinedRadius);
            portalsRef.current = [singleMergedPortal];
            setPortalCount(1);
            setSplitCount(0);
            sessionRef.current = null;
            inspiralActive = false;

            spotAudio.playMergeTone(combinedRadius);
            shockwavesRef.current.push({
              x: session.baryX,
              y: session.baryY,
              radius: 15,
              maxRadius: combinedRadius * 3.5,
            });
          } else {
            chaosLevel = Math.max(0, (tau - 0.2) / 0.8);
            // Smooth ease-in chirp eliminating any initial angular velocity jerk
            const angleChirp = 5.2 * Math.pow(tau, 1.3) + 26.0 * Math.pow(tau, 2.4);

            for (const node of session.nodes) {
              const p = node.portal;
              const currentR = node.initialR * distanceFactor;
              const currentAngle = node.initialAngle + angleChirp;

              p.x = session.baryX + Math.cos(currentAngle) * currentR;
              p.y = session.baryY + Math.sin(currentAngle) * currentR;
              p.vx = 0;
              p.vy = 0;
            }

            // Gravitational wave ripples
            if (chaosLevel > 0.1) {
              for (let w = 0; w < 3; w++) {
                const wavePhase = (elapsedSec * 4.0 + w * (Math.PI / 1.5)) % Math.PI;
                const waveRadius = wavePhase * 130 + 20;
                const waveAlpha = Math.max(0, (1 - wavePhase / Math.PI) * chaosLevel * 0.25);

                ctx.beginPath();
                ctx.arc(session.baryX, session.baryY, waveRadius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(0, 0, 0, ${waveAlpha})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();
              }
            }
          }
        } else {
          sessionRef.current = null;
        }
      } else if (!isCandidateInspiral) {
        sessionRef.current = null;
      }

      // Autonomous Pairwise Merging & Accretion (when NOT in collective inspiral)
      if (currentPhase === "idle" && !inspiralActive && portalsRef.current.length > 1) {
        const activePortals = portalsRef.current;
        for (let i = 0; i < activePortals.length; i++) {
          for (let j = i + 1; j < activePortals.length; j++) {
            const p1 = activePortals[i];
            const p2 = activePortals[j];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.hypot(dx, dy);

            const isManualDrag = p1.isDragged || p2.isDragged;
            const mergeDist = (p1.radius + p2.radius) * (isManualDrag ? 0.95 : 0.75);
            const canMerge = p1.mergeCooldown === 0 && p2.mergeCooldown === 0;

            if (canMerge && dist < mergeDist && dist > 0) {
              const combinedRadius = Math.min(270, Math.sqrt(p1.targetRadius ** 2 + p2.targetRadius ** 2));
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
                maxRadius: combinedRadius * 3.0,
              });

              activePortals.splice(j, 1);
              setPortalCount(activePortals.length);
              sessionRef.current = null;
              if (activePortals.length === 1) {
                setSplitCount(0);
              }
              j--;
            } else if (isGravityActive && dist < (p1.radius + p2.radius) * 3.5 && dist > 1) {
              // Mass-proportional gravitational acceleration:
              // Heavier black holes remain firmly anchored while lighter spots accelerate toward them
              const m1 = p1.radius ** 2;
              const m2 = p2.radius ** 2;
              const totalM = m1 + m2;
              const pullForce = Math.min(2.5, ((p1.radius + p2.radius) * 14) / Math.max(30, dist));
              const nx = dx / dist;
              const ny = dy / dist;

              p1.vx += nx * pullForce * (m2 / totalM) * 0.2;
              p1.vy += ny * pullForce * (m2 / totalM) * 0.2;
              p2.vx -= nx * pullForce * (m1 / totalM) * 0.2;
              p2.vy -= ny * pullForce * (m1 / totalM) * 0.2;
            }
          }
        }
      }

      // Smoothly drift single giant singularity to viewport center
      const livePortals = portalsRef.current;
      if (livePortals.length === 1 && !livePortals[0].isDragged && currentPhase === "idle") {
        livePortals[0].x += (width * 0.5 - livePortals[0].x) * 0.08;
        livePortals[0].y += (height * 0.5 - livePortals[0].y) * 0.08;
        livePortals[0].vx = 0;
        livePortals[0].vy = 0;
      }

      // Draw portals cleanly with subtle living ink wobble
      if (currentPhase !== "glitching") {
        livePortals.forEach((p) => {
          p.update(width, height, mouseRef.current, isFrozen, inspiralActive);

          let compAngle: number | undefined = undefined;
          if (inspiralActive && livePortals.length === 2) {
            compAngle = Math.atan2(baryY - p.y, baryX - p.x);
          }

          p.draw(ctx, compAngle);
        });

        // Draw background particles (swirled by barycenter accretion disk)
        particlesRef.current.forEach((pt) => {
          pt.update(width, height, livePortals, isFrozen, { x: baryX, y: baryY, active: inspiralActive, chaos: chaosLevel });
          pt.draw(ctx);
        });
      }

      // Render shockwaves
      for (let i = shockwavesRef.current.length - 1; i >= 0; i--) {
        const sw = shockwavesRef.current[i];
        sw.radius += 20;
        const alpha = Math.max(0, 1 - sw.radius / sw.maxRadius);

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 0, 0, ${alpha * 0.9})`;
        ctx.lineWidth = 4.5;
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

  // ── Cinematic Multiverse Collapse: Charge (Anchored) → Freeze (39 to 45 Giant Spots Flood Screen Black) → Unstable Screen Glitch (1s) → Hero Page ──
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
      // 2. Freeze: Flood screen with 39 to 45 massive overlapping black spots (radii 140px to 320px)
      setCollapsePhase("freeze_multiplying");

      const totalNewSpots = Math.floor(Math.random() * 7) + 39; // 39 to 45
      let accumulatedDelay = 0;

      for (let i = 0; i < totalNewSpots; i++) {
        const stepDelay = Math.max(16, Math.floor(150 * Math.pow(0.92, i)));
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
              {SPOT_SEQUENCE.map((key, idx) => {
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
                  onClick={() => splitSpots()}
                  disabled={splitCount >= MAX_SPLITS}
                  className={`px-3.5 py-1.5 font-mono text-xs font-bold border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center gap-1.5 ${
                    splitCount >= MAX_SPLITS
                      ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                      : "bg-[#FAF9F6] hover:bg-white text-black"
                  }`}
                  title={splitCount >= MAX_SPLITS ? "Max 3 splits reached" : "Split into 4 to 7 spots"}
                >
                  <Split className="w-3.5 h-3.5" />
                  Split ({MAX_SPLITS - splitCount} left)
                </button>
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

            {/* ── 3D TACTILE CIRCULAR "INITIATE" BUTTON: Appears ONLY when fully merged into 1 Giant Spot ── */}
            <AnimatePresence>
              {portalCount === 1 && collapsePhase === "idle" && (
                <motion.button
                  initial={{ scale: 0, opacity: 0, rotate: -25 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0, opacity: 0, rotate: 25 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.94, y: 2 }}
                  onClick={triggerMultiverseCollapse}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-36 h-36 rounded-full bg-gradient-to-b from-neutral-900 via-black to-neutral-950 text-white border-3 border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_0_4px_rgba(255,255,255,0.2),inset_0_3px_6px_rgba(255,255,255,0.4),inset_0_-6px_12px_rgba(0,0,0,0.95)] flex flex-col items-center justify-center cursor-pointer select-none group transition-all"
                  title="Initiate Multiverse Singularity Collapse"
                >
                  {/* Outer Counter-Clockwise Comic Orbital Halo */}
                  <div
                    className="absolute -inset-3.5 rounded-full border-2 border-dashed border-white/30 animate-spin pointer-events-none"
                    style={{ animationDuration: "18s", animationDirection: "reverse" }}
                  />
                  {/* Inner Clockwise Comic Dashed Halo */}
                  <div
                    className="absolute -inset-1.5 rounded-full border border-dashed border-white/60 animate-spin pointer-events-none"
                    style={{ animationDuration: "10s" }}
                  />

                  {/* Radial Quantum Shimmer Flare Core */}
                  <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-purple-600/20 via-transparent to-amber-500/20 pointer-events-none group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10 flex flex-col items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    <Zap className="w-5 h-5 text-amber-300 mb-1 transition-transform group-hover:scale-125 group-hover:rotate-12 duration-200" />
                    <span className="font-mono text-xs font-black tracking-widest uppercase text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
                      Initiate
                    </span>
                    <span className="font-mono text-[9px] text-neutral-400 font-bold uppercase tracking-wider group-hover:text-amber-300 transition-colors">
                      Collapse
                    </span>
                  </div>
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
                        Sequence <span className="font-mono font-bold text-black bg-white/80 border border-black/20 px-1.5 py-0.5 rounded shadow-xs">↑↑↓↓←→←→</span> entered. Drag spots to merge them, watch the last 2-3 spots accelerate into an intense 3-second black hole merger, or split up to 3 times.
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
                        <span className="text-[9px] text-neutral-600 block uppercase font-bold">Inspiral Orbit</span>
                        <span className="text-base sm:text-lg font-black text-black">
                          {portalCount <= 3 && portalCount > 1 ? "NUMERICAL RELATIVITY" : "ONLINE"}
                        </span>
                      </div>
                      <div className="p-3 bg-white/60 backdrop-blur-md border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] col-span-2 sm:col-span-1">
                        <span className="text-[9px] text-neutral-600 block uppercase font-bold">Splits Remaining</span>
                        <span className="text-base sm:text-lg font-black text-black">
                          {MAX_SPLITS - splitCount} / {MAX_SPLITS}
                        </span>
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
                      <p className="text-neutral-300">&gt; physics engine: SXS-inspired numerical relativity merger & ringdown active</p>
                      <p className="text-white font-bold pt-0.5">&gt; "Think. Research. Plan. Build. Validate. Loop."</p>
                    </div>
                  </div>

                  {/* Action Buttons & Controls */}
                  <div className="pt-2 border-t-2 border-black/80 flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => splitSpots()}
                        disabled={splitCount >= MAX_SPLITS}
                        className={`px-3.5 py-2 border-2 border-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center gap-1.5 ${
                          splitCount >= MAX_SPLITS
                            ? "bg-neutral-200 text-neutral-400 cursor-not-allowed border-neutral-400 shadow-none"
                            : "bg-white/90 hover:bg-white text-black"
                        }`}
                        title={splitCount >= MAX_SPLITS ? "Max 3 splits reached" : "Split spots into 4 to 7 child voids"}
                      >
                        <Split className="w-3.5 h-3.5" />
                        Split Spots ({MAX_SPLITS - splitCount})
                      </button>

                      {portalCount === 1 ? (
                        <button
                          onClick={triggerMultiverseCollapse}
                          disabled={collapsePhase !== "idle"}
                          className="px-4 py-2 bg-black hover:bg-neutral-900 text-white font-mono font-black text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Zap className="w-4 h-4 text-amber-300 animate-pulse" />
                          {collapsePhase === "charging" ? "CHARGING..." : collapsePhase === "freeze_multiplying" ? "CASCADING..." : "Initiate Collapse"}
                        </button>
                      ) : (
                        <div className="font-mono text-[11px] font-bold text-neutral-500 flex items-center gap-1.5 py-2">
                          <span>Drag to merge or watch 3s black hole inspiral</span>
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

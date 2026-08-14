# Solving Scroll-Linked SVG Path Drawing in Framer Motion

## Problem
In `LoopDiagram.tsx`, the SVG connector lines were rendered using `<motion.line>` with their `pathLength` bound to a scroll progress transform. However, SVG `<line>` elements do not natively support the CSS `stroke-dasharray` and `stroke-dashoffset` tricks that Framer Motion utilizes to compute `pathLength` dynamically. As a result, the connector lines rendered fully drawn immediately, completely breaking the scroll-scrub animation sequence.

## Project Context
- **Project**: Portfolio V3 (Single Page Application)
- **Tech Stack**: React 19, Vite, Framer Motion (`motion/react`), Tailwind CSS v4

## Solution

### 1. Element Swapping (`line` to `path`)
To fix this, all `<motion.line>` components were converted into `<motion.path>` components. 
Instead of defining coordinates as attributes (`x1`, `y1`, `x2`, `y2`), the coordinates were mapped into the standard SVG path syntax: `d="M x1,y1 L x2,y2"`. 
Since `<path>` natively supports stroke dash arrays and offsets, Framer Motion was able to map `pathLength` dynamically and scrub the path from start to finish on scroll.

**Before:**
```tsx
<motion.line
  x1={250}
  y1={50}
  x2={250}
  y2={80}
  stroke="#111111"
  strokeWidth="1.5"
  markerEnd="url(#arrowhead)"
  style={{ pathLength: line1Path }}
/>
```

**After:**
```tsx
<motion.path
  d="M 250,50 L 250,80"
  stroke="#111111"
  strokeWidth="1.5"
  fill="none"
  markerEnd="url(#arrowhead)"
  style={{ pathLength: line1Path }}
/>
```

### 2. Data-Driven Optimization
Instead of declaring 20+ individual React hooks (`useTransform`) in the main component body, a single declarative configuration array was constructed inside the component body containing each path's coordinates, scroll ranges, and markers. Evaluating these hooks sequentially inside the configuration array avoided Rule-of-Hooks violations while dropping the component size from over 400 lines down to ~150 lines.

```typescript
const paths = [
  {
    id: "observe-search",
    d: "M 250,50 L 250,80",
    pathLength: useTransform(scrollYProgress, [0.12, 0.22], [0, 1]),
    marker: "url(#arrowhead)",
  },
  // ...
];
```

### 3. Glow & Aesthetic Upgrades
A duplicate `<motion.path>` was overlayed underneath the active path with a lower opacity, a thicker stroke, and a Gaussian blur filter (`feGaussianBlur stdDeviation="2"`), producing a subtle active "glow" trail that flows along with the scroll-scrubbed drawing.

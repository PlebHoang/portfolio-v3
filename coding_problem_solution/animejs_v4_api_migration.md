# Coding Problem Solution: migrating to anime.js v4 ESM exports in TypeScript/React

## Project
- **Name**: Personal Portfolio (v3)
- **Path**: `/home/khoi/resume/portfolio/v3/portfolio-v3`

## The Problem
When migrating a codebase to use the newer `animejs` (v4.5.0+) library, compilation failed with two TypeScript/build errors:
1. `error TS1192: Module '".../node_modules/animejs/dist/modules/index"' has no default export.`
2. `error TS2554: Expected 2 arguments, but got 1.`

In older versions of `anime.js` (v3.x), the library was imported as a default object `anime` and invoked with a single config object:
```typescript
import anime from "animejs";

anime({
  targets: ".item",
  translateY: [40, 0],
  delay: anime.stagger(40)
});
```

## The Solution
In `animejs` v4, the default export is removed, and the library shifts entirely to standard ESM named exports. Additionally, the main animation method is renamed to `animate` and takes two parameters instead of one: the target elements and the configuration parameters.

### 1. Update Imports
Import `animate` and `stagger` as named exports from `"animejs"`:
```typescript
import { animate, stagger } from "animejs";
```

### 2. Update Invocations
Split the unified config object into the `targets` parameter and the `parameters` parameter:
```typescript
// Before (v3):
// anime({ targets: e.currentTarget, scale: 1.05 });

// After (v4):
animate(e.currentTarget, {
  scale: 1.05,
  duration: 400,
  easing: "spring(1, 80, 10, 0)"
});
```

For staggered reveals:
```typescript
animate("#year-one .year-one-item", {
  translateY: [40, 0],
  opacity: [0, 1],
  delay: stagger(40)
});
```

This resolves all type conflicts and matches the standard API for anime.js v4.

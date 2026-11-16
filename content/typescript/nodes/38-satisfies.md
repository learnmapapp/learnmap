---
title: "The satisfies operator"
icon: "✔️"
branch: "generics"
requires: ["const-assertions", "interfaces", "utility-types"]
summary: "Check a contract while retaining useful inferred detail."
---
A design system's color palette. Each color is either a hex string or an RGB tuple. Three ways to write it, and only one gets everything right.

```typescript
type Color = string | [number, number, number];
type Palette = Record<"primary" | "accent", Color>;
```

**Version 1: annotate.**

```typescript
const palette: Palette = {
  primary: "#3178c6",
  accent: [255, 99, 71],
};

palette.primary.toUpperCase();
//              ~~~~~~~~~~~ Property 'toUpperCase' does not exist
//                          on type '[number, number, number]'.
```

The object is checked, but the annotation **wins**: `primary` is now just `Color`, and TypeScript forgot it's a string.

**Version 2: assert with `as`.**

```typescript
const palette = {
  primary: "#3178c6",
  acent: [255, 99, 71],             // typo!
} as Palette;
```

`as` tells the checker "trust me". It catches far less: here the typo slips through. Treat `as` as a last resort.

**Version 3: `satisfies`.**

```typescript
const palette = {
  primary: "#3178c6",
  accent: [255, 99, 71],
} satisfies Palette;

palette.primary.toUpperCase();      // fine: still a string
palette.accent[0];                  // fine: still a tuple
```

`satisfies` checks that the value fits `Palette` (a typo or missing color would be an error), and then **keeps the inferred type**, which is more precise.

## Summary

| | Checked? | Type you get |
| --- | --- | --- |
| `const p: Palette = ...` | ✅ | `Palette` (wide) |
| `... as Palette` | barely | `Palette` (wide) |
| `... satisfies Palette` | ✅ | the precise inferred type |

Reach for `satisfies` for config objects, lookup tables and route maps: anything where you want both a check and precise types.

```compare kotlin
// No equivalent: an annotation always sets the type.
```

```compare python
# No equivalent in Python's type system.
```

```exercise
goal: "`as` skips the real check and widens `primary` to `Color`. Use `satisfies` instead, so `toUpperCase` is allowed."
lang: typescript
code: |
  type Color = string | [number, number, number];
  const palette = { primary: "#3178c6" } as Record<"primary", Color>;
  console.log(palette.primary.toUpperCase());
checks:
  - match: 'satisfies\s+Record<"primary",\s*Color>'
    message: "Replace as with satisfies."
hint: Only the keyword changes.
solution: |
  type Color = string | [number, number, number];
  const palette = { primary: "#3178c6" } satisfies Record<"primary", Color>;
  console.log(palette.primary.toUpperCase());
```

```quiz
question: "After `const c = { port: 80 } satisfies { port: number }`, what is the type of `c.port`?"
options:
  - "`number`, inferred from the value"
  - "`unknown`"
  - "`any`"
answer: 0
explain: satisfies keeps the inferred type. Object properties widen, so port is number.
```

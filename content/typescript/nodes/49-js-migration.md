---
title: "Migrating JavaScript"
icon: "🛠️"
branch: "tooling"
requires: ["declarations", "modules", "toolchain"]
summary: "Add checking in small steps without replacing the whole project at once."
---

TypeScript can check existing JavaScript with JSDoc annotations:

```javascript title=helpers.js
// @ts-check
/** @param {number} value */
export function double(value) {
  return value * 2;
}
```

`allowJs` includes JavaScript in a project; `checkJs` enables checking across those files. A per-file `// @ts-check` is useful for a smaller first step.

## Migrate at useful boundaries

Start with a well-tested utility or a public contract. Add real types for inputs and outputs, then rename selected files to `.ts` when ready. JSX files use `.tsx` once they contain TypeScript syntax.

Keep the build and runtime import behavior working throughout the change. Declarations for dependencies help, but broad `any` declarations or blanket ignores can create an appearance of safety without useful guarantees.

Track remaining unchecked boundaries explicitly. Turn on stronger options gradually when necessary, but choose a clear destination such as strict checking. A small continuously working migration is easier to review than changing file extensions and suppressing every resulting error at once.

```exercise
goal: "Enable checking for this JavaScript file."
lang: javascript
code: |
  // @ts-nocheck
  /** @param {number} value */
  export function double(value) { return value * 2; }
checks:
  - match: "//\\s+@ts\\-check"
    message: "Replace @ts-nocheck with @ts-check."
hint: "Replace @ts-nocheck with @ts-check."
```

```quiz
question: Which option enables project-wide checking of included JavaScript files?
options:
  - "`checkJs`"
  - "`skipLibCheck`"
  - "`noEmit` alone"
answer: 0
explain: "`checkJs` checks JavaScript; `allowJs` controls its inclusion in the project."
```

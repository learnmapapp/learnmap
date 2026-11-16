---
title: "Migrating JavaScript"
icon: "🛠️"
branch: "tooling"
requires: ["declarations", "modules", "toolchain"]
summary: "Add checking in small steps without replacing the whole project at once."
---
You've got 40,000 lines of JavaScript, and a team that wants TypeScript. Renaming everything to `.ts` would produce thousands of errors on day one. Here's a migration plan in five stages, each one shippable.

## Stage 1: let TypeScript in

```json title=tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": false,
    "noEmit": true,
    "strict": false
  },
  "include": ["src"]
}
```

`allowJs` lets `.js` and `.ts` files live together and import each other. Nothing is checked yet, but new files can be written in TypeScript today.

## Stage 2: check JavaScript, one file at a time

Add this comment at the top of a `.js` file:

```javascript
// @ts-check
```

TypeScript now checks that file, using what it can infer. It catches more than you'd expect: misspelled methods, wrong argument counts, possibly-undefined values. (Its opposite, `// @ts-nocheck`, switches checking off for a file.)

## Stage 3: types in comments

Still plain JavaScript, no build step changes, but now with types via JSDoc:

```javascript
// @ts-check

/**
 * @param {number} price
 * @param {number} [quantity] optional
 * @returns {string}
 */
export function total(price, quantity = 1) {
  return (price * quantity).toFixed(2);
}
```

Some projects stop here, happily. It's full type checking with zero tooling changes.

## Stage 4: rename to `.ts`

File by file, starting with the leaves: utilities that import nothing else. Swap the JSDoc for real annotations. Where you're stuck, a short-lived `any` with a `// TODO` is fine.

## Stage 5: tighten

Turn on `strict`, or its parts one at a time (`noImplicitAny`, then `strictNullChecks`). Fix, ship, repeat. Then hunt down the leftover `any`s.

```tip
Run `tsc --noEmit` in CI from stage 1 on. Each stage then only ever ratchets forward.
```

```compare python
# Python migrations work the same way: add hints gradually,
# and tighten mypy settings module by module.
```

```compare kotlin
// Kotlin and Java files can live in the same project, the same way.
```

```exercise
goal: "This file has JSDoc types, but checking is switched off. Switch it on."
lang: javascript
code: |
  // @ts-nocheck
  /** @param {number} value */
  export function double(value) { return value * 2; }
checks:
  - match: '//\s*@ts-check'
    message: "Replace @ts-nocheck with @ts-check."
hint: Remove the "no".
solution: |
  // @ts-check
  /** @param {number} value */
  export function double(value) { return value * 2; }
```

```quiz
question: "What does `allowJs` do?"
options:
  - Converts JavaScript files to TypeScript.
  - Lets JavaScript files be part of a TypeScript project, so both can import each other.
  - Turns on type checking in every JavaScript file.
answer: 1
explain: allowJs lets them coexist. Checking JavaScript is a separate choice, with checkJs or a // @ts-check comment.
```

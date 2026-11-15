---
title: "The toolchain"
icon: "🧰"
branch: "core"
requires: ["typescript"]
summary: "Install the compiler locally and distinguish checking from execution."
---

Create a project and install TypeScript as a development dependency:

```shell
npm init -y
npm install --save-dev typescript
npx tsc --init
npx tsc --noEmit
```

`tsc` is the [[compiler]]. A local installation makes the project's chosen version available to `npx` and npm scripts. `--init` creates a configuration file; `--noEmit` checks without writing JavaScript.

Put a small program in a `.ts` file:

```typescript title=hello.ts
const message: string = "Hello, types!";
console.log(message);
```

## A checker is not a runner

Compilation, bundling, and execution are separate jobs. A browser project often uses Vite to transform and serve files, while `tsc --noEmit` checks them separately. Some transforms remove type syntax without checking it, so a successful development server is not proof of type correctness.

Run commands from the project directory. When checking a configured project, invoke `tsc` without individual source filenames so the project settings apply.

```exercise
goal: "Check the project without writing JavaScript files."
lang: shell
code: |
  npx tsc
checks:
  - match: "npx\\s+tsc\\s+\\-\\-noEmit"
    message: "Add --noEmit to the compiler command."
hint: "Add --noEmit to the compiler command."
```

```quiz
question: "What does tsc --noEmit do?"
options:
  - "Runs the application."
  - "Checks types without writing output files."
  - "Installs all missing runtime dependencies."
answer: 1
explain: "The noEmit option preserves type checking while disabling generated files."
```

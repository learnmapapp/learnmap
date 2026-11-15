---
title: "Compiler settings"
icon: "⚙️"
branch: "core"
requires: ["toolchain"]
summary: "Choose strict checking and settings that match the host."
---

`tsconfig.json` defines a project boundary and compiler options. This small example fits a browser application whose bundler handles JavaScript output:

```json title=tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

[[Strict mode]] enables a family of checks, including null handling and rejecting implicit `any`. `target` controls syntax output choices; it does not supply missing runtime APIs or polyfills.

## Match your runtime

`module` and `moduleResolution` must fit your tooling. The bundler setting above is for bundlers; a Node ESM project generally needs Node-compatible settings such as `NodeNext` instead.

`include` selects source files, and imports can bring additional files into the project. Keep generated output outside your source tree. Options such as `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` add useful checks beyond `strict`; introduce them deliberately so their extra requirements are understood.

```exercise
goal: "Enable the strict family of compiler checks."
lang: json
code: |
  {
    "compilerOptions": { "strict": false, "noEmit": true },
    "include": ["src"]
  }
checks:
  - match: "\"strict\":\\s+true"
    message: "Set strict to true."
hint: "Set strict to true."
```

```quiz
question: "Does target: ES2022 install missing runtime APIs?"
options:
  - "Yes, all APIs are polyfilled."
  - "Only for browsers."
  - "No; target does not provide polyfills."
answer: 2
explain: "Compiler targets affect emitted syntax and related defaults, not the runtime implementation."
```

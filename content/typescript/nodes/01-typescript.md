---
title: "TypeScript"
icon: "🔷"
branch: "core"
requires: []
summary: "JavaScript plus a static checker, not a different runtime."
kind: "hub"
---

TypeScript checks JavaScript-shaped programs before they run. It can catch a missing property, a wrong argument, or an unhandled state while you are still editing.

```typescript
const learner: string = "Ada";
console.log(learner.toUpperCase()); // ADA
```

The annotation after `learner` describes a [[static type]]. The emitted JavaScript has no `: string`: browsers and JavaScript runtimes execute the resulting program, not the type annotation.

## Know the boundary

Types describe assumptions; they do not inspect a server response or make a failing operation succeed. Data from outside your program still needs runtime validation. We will build that boundary in [JSON validation](node:json-validation).

Basic JavaScript knowledge helps: variables, functions, objects, and arrays still behave like JavaScript. Start with [the toolchain](node:toolchain), or pick a goal for a smaller route. Exercises here check your text rather than running a compiler. Use the local checker to experiment, with the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html) as a reference.

```quiz
question: "What happens to most type annotations in emitted JavaScript?"
options:
  - "They become automatic runtime validators."
  - "They are removed."
  - "They make all values immutable."
answer: 1
explain: "Most type syntax is erased. Checking external data remains runtime work."
```

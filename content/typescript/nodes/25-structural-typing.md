---
title: "Structural typing"
icon: "🧩"
branch: "modeling"
requires: ["interfaces"]
summary: "Compatibility depends on the required shape, not a matching declaration name."
---

TypeScript generally uses [[structural typing]]. An object is compatible when it supplies the required members:

```typescript
interface Named { name: string; }
function greet(value: Named): string {
  return `Hello, ${value.name}`;
}
const learner = { name: "Ada", score: 42 };
console.log(greet(learner));
```

The extra `score` does not invalidate this stored value. The caller has the required `name` property of the correct type.

## Fresh literals get extra scrutiny

A fresh literal passed directly to a narrower parameter may receive an excess-property check. That helps find typos; it is not a guarantee that all accepted objects have only those keys.

Private and protected class members introduce additional compatibility rules. Structural typing describes much of the everyday model, not every special case in the language.

Design small contracts around what a function actually needs. A formatting function needing only a name should not require a full database record merely because one caller happens to have one. This improves reuse and makes small test values easy to construct.

```exercise
goal: "Require only the property that greet actually reads."
lang: typescript
code: |
  interface Named { name: string; score: number; }
  function greet(value: Named): string { return `Hello, ${value.name}`; }
  console.log(greet({ name: "Ada" }));
checks:
  - match: "interface\\s+Named\\s*\\{\\s*name:\\s*string;\\s*\\}"
    message: "Remove the unnecessary score requirement from Named."
hint: "Remove the unnecessary score requirement from Named."
```

```quiz
question: "Why can a stored `{ name, score }` object be passed to a parameter requiring `{ name: string }`?"
options:
  - It supplies the required compatible shape.
  - The extra field is deleted.
  - All objects are implicitly any.
answer: 0
explain: Additional properties can remain present; compatibility checks the required members.
```

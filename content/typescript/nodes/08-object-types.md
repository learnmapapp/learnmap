---
title: "Object types"
icon: "🗂️"
branch: "basics"
requires: ["primitives"]
summary: "Describe required properties and infer contextual values."
---

An object type describes the properties a value must provide:

```typescript
function describe(learner: { name: string; score: number }): string {
  return `${learner.name}: ${learner.score}`;
}
console.log(describe({ name: "Ada", score: 42 }));
```

Property names and value types form a [[shape]]. Required properties must exist, and their values must be compatible. The checker can infer object types from literals too.

## Fresh literals catch mistakes

Passing a fresh object literal with an unexpected property can produce an excess-property error. That catches misspellings, but it does not make every object type an exact list of allowed runtime keys.

```typescript
const learner = { name: "Grace", score: 37, active: true };
console.log(describe(learner));
```

A value stored in a variable can have extra compatible properties. [Structural typing](node:structural-typing) explains why.

Use [type aliases](node:type-aliases) or interfaces when a shape deserves a reusable name. Keep property names specific: an object with `name` and `score` is easier to understand than one with generic `data` and `value` fields everywhere.

```exercise
goal: "Give score the numeric value required by the object type."
lang: typescript
code: |
  const learner: { name: string; score: number } = { name: "Ada", score: "42" };
  console.log(learner);
checks:
  - match: "score:\\s+42"
    message: "Use the number 42 rather than the string \"42\"."
hint: "Use the number 42 rather than the string \"42\"."
```

```quiz
question: "What does a required `score: number` property mean?"
options:
  - The object must provide a compatible numeric score.
  - TypeScript inserts a zero if it is missing.
  - The object can never have extra properties.
answer: 0
explain: Required properties must be supplied; annotations do not invent runtime values.
```

---
title: "Inference in types"
icon: "🕵️"
branch: "generics"
requires: ["conditional-types", "indexed-access"]
summary: "Capture part of a matching type pattern with infer."
---

Inside a conditional type, `infer` names a type matched by a pattern:

```typescript
type ElementOf<T> = T extends readonly (infer Item)[] ? Item : T;
type Name = ElementOf<readonly string[]>;
const name: Name = "Ada";
console.log(name.toUpperCase());
```

`Item` is available in the `true` branch because that branch establishes the array match. The `readonly` pattern accepts both mutable and `readonly` array forms.

## Extract a return relationship

```typescript
type ResultOf<T> = T extends (...args: never[]) => infer Result ? Result : never;
type Score = ResultOf<() => number>;
const score: Score = 42;
console.log(score);
```

For ordinary use, prefer the built-in `ReturnType` instead of rebuilding it. `Awaited<T>` is similarly more complete than a quick one-level Promise unwrapping type.

`infer` is a type-level operation. It does not run a function to observe its result. Test advanced transformations with small positive and negative cases so a clever expression does not silently drift away from its intended contract.

```exercise
goal: Return the inferred array element type rather than the whole array.
lang: typescript
code: |
  type ElementOf<T> = T extends readonly (infer Item)[] ? T : T;
  const name: ElementOf<string[]> = "Ada";
  console.log(name);
checks:
  - match: \?\s+Item\s+:\s+T
    message: Use Item in the true branch.
hint: Use Item in the `true` branch.
```

```quiz
question: "Where is an inferred Item available in `T extends (infer Item)[] ? Item : T`?"
options:
  - Only in the `true` branch.
  - As a global runtime variable.
  - Only after calling the type.
answer: 0
explain: The matching branch introduces Item as a static inferred type.
```

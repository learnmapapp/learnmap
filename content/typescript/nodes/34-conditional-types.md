---
title: "Conditional types"
icon: "🔱"
branch: "generics"
requires: ["generics", "unions"]
summary: "Choose a result type based on a type relationship."
---

A [[conditional type]] uses `extends` as a type-level test:

```typescript
type Label<T> = T extends string ? "text" : "other";
const textLabel: Label<string> = "text";
const numericLabel: Label<number> = "other";
console.log(textLabel, numericLabel);
```

This chooses a static result. It does not execute an `if` statement or inspect a runtime object.

## Distribution over unions

When the checked side is a bare type parameter, the conditional distributes over union members:

```typescript
type AsArray<T> = T extends unknown ? T[] : never;
type Separate = AsArray<string | number>; // string[] | number[]
type Together<T> = [T] extends [unknown] ? T[] : never;
const mixed: Together<string | number> = ["Ada", 42];
console.log(mixed);
```

Wrapping both sides in tuples prevents that distributive behavior. The difference matters when a result should handle the whole union together rather than each member separately.

Start with a concrete example and inspect the inferred result in an editor. A conditional type should express a useful relationship, not replace straightforward overloads or named contracts with unnecessary puzzles.

```exercise
goal: "Choose text for strings and other for the remaining types."
lang: typescript
code: |
  type Label<T> = T extends number ? "text" : "other";
  const label: Label<string> = "text";
  console.log(label);
checks:
  - match: "T\\s+extends\\s+string"
    message: "Test whether T extends string."
hint: "Test whether T extends string."
```

```quiz
question: "When does a conditional type usually distribute over a union?"
options:
  - "When checking a bare type parameter."
  - "Whenever it contains an array."
  - "Only at runtime."
answer: 0
explain: "A naked checked type parameter distributes; wrapping it can preserve the union as one input."
```

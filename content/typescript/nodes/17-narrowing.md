---
title: "Narrowing"
icon: "🔬"
branch: "narrowing"
requires: ["unions", "functions"]
summary: "Let runtime checks refine what the checker knows."
---

[[Narrowing]] uses control flow to refine a type inside a branch:

```typescript
function describe(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}
console.log(describe(12.5)); // 12.50
```

The return from the string branch means the remaining path must hold a number. TypeScript tracks that flow rather than treating every line as if no checks had happened.

## Choose checks that prove the claim

`typeof` handles primitives, `instanceof` can recognize class instances, and `in` can test for an object's property. `Array.isArray` distinguishes arrays from ordinary objects.

Truthiness checks can accidentally exclude valid values such as an empty string or zero. Use a specific nullish check when you only want to exclude missing values.

Remember JavaScript's historical edge case: `typeof null` is `"object"`. Testing for an object at an external boundary also needs `value !== null`. A narrowing condition must actually establish the runtime fact you rely on.

```exercise
goal: "Check for a string before using toUpperCase."
lang: typescript
code: |
  function describe(value: string | number): string {
    if (typeof value === "number") return value.toUpperCase();
    return value.toFixed(2);
  }
  console.log(describe("Ada"));
checks:
  - match: "typeof\\s+value\\s+===\\s+\"string\""
    message: "Narrow with typeof value === \"string\"."
hint: "Narrow with typeof value === \"string\"."
```

```quiz
question: "Why is typeof value === \"object\" insufficient to exclude null?"
options:
  - "null also reports object."
  - "typeof never works in TypeScript."
  - "All arrays report string."
answer: 0
explain: "JavaScript reports typeof null as object, so explicitly exclude null."
```

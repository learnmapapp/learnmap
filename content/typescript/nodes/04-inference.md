---
title: "Type inference"
icon: "🔎"
branch: "basics"
requires: ["tsconfig"]
summary: "Let the checker infer obvious types; annotate useful boundaries."
---

TypeScript often infers a type from an initializer, so you do not need an annotation on every name:

```typescript
let score = 10;          // number
score += 5;
const title = "Types";  // the literal type "Types"
const scores = [10, 20]; // number[]
```

[[Inference]] follows how a value is introduced and used. A mutable variable usually gets a wider type than an immutable primitive binding: `let title = "Types"` normally becomes `string`.

## Annotate the contract

Function parameters are useful annotation points because callers supply their values:

```typescript
function double(value: number) {
  return value * 2; // return type inferred as number
}
console.log(double(21));
```

An explicit return annotation can document an exported contract, even when inference already knows the implementation's result. Avoid adding `any` merely to silence an error; that gives up checking instead of explaining the value.

Use `const` when the binding will not be reassigned. It does not freeze the contents of an object or array, which [readonly](node:readonly) explores separately.

```exercise
goal: "Annotate the parameter so strict mode can check callers."
lang: typescript
code: |
  function double(value) {
    return value * 2;
  }
  console.log(double(21));
checks:
  - match: "value:\\s+number"
    message: "Add : number after value."
hint: "Add : number after value."
```

```quiz
question: "Why does let score = 10 usually infer number rather than only 10?"
options:
  - "The binding is mutable and can hold other numbers."
  - "All variables have type any."
  - "Integers cannot be inferred."
answer: 0
explain: "Widening lets mutable bindings accept other values of the same broad type."
```

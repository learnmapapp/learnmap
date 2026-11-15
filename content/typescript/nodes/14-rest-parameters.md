---
title: "Rest parameters"
icon: "📥"
branch: "functions"
requires: ["arrays", "optional-parameters"]
summary: "Collect extra arguments into a typed array."
---

A rest parameter gathers remaining arguments into an array. It must be the final parameter:

```typescript
function total(...values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0);
}
console.log(total(10, 20, 12)); // 42
```

The empty call `total()` is valid and returns zero because the reduction has an initial accumulator. The element type checks every supplied argument.

## Collect versus expand

Rest collects values in a parameter list. Spread expands a collection at a call site:

```typescript
const values = [10, 20, 12];
console.log(total(...values));
```

When calling a function with a fixed positional signature, an ordinary array may not prove the required argument count. A tuple can represent a known pair and spread safely into a two-parameter function.

Use rest for a genuinely variable argument list. If the inputs represent named concepts rather than a sequence of similar values, an object parameter usually communicates intent better.

```exercise
goal: "Collect all numeric arguments with a rest parameter."
lang: typescript
code: |
  function total(values: number[]): number {
    return values.reduce((sum, value) => sum + value, 0);
  }
  console.log(total(10, 20, 12));
checks:
  - match: "\\.\\.\\.values:\\s+number\\[\\]"
    message: "Add ... before values in the parameter list."
hint: "Add ... before values in the parameter list."
```

```quiz
question: "What type does ...values: number[] have inside the function?"
options:
  - "A number array."
  - "A single number."
  - "A tuple of exactly two numbers."
answer: 0
explain: "Rest parameters collect the remaining arguments into an array."
```

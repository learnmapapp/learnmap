---
title: "Optional properties"
icon: "❔"
branch: "basics"
requires: ["object-types"]
summary: "Mark possible absence and choose a fallback without losing zero."
---

A question mark marks a property that may be absent:

```typescript
function describe(learner: { name: string; score?: number }): string {
  const score = learner.score ?? 0;
  return `${learner.name}: ${score}`;
}
console.log(describe({ name: "Ada" })); // Ada: 0
```

Reading an optional property yields a value that may be `undefined`. `Optional` chaining, such as `learner.score?.toFixed(0)`, skips the call when the value is nullish.

## Absent and explicitly undefined

With `exactOptionalPropertyTypes`, `score?: number` permits omission but not explicitly assigning `undefined` unless it is included in the property type. Reading can still produce `undefined` because the property may be missing.

Use `??` for a fallback on `null` or `undefined`. `||` also replaces valid values such as zero, an empty string, and `false`.

Do not silence a missing-value error with a non-`null` assertion just because a property usually exists. Either provide a fallback, check a condition, or strengthen the contract so absence is impossible.

```exercise
goal: "Keep a score of zero while defaulting only missing values."
lang: typescript
code: |
  const learner: { score?: number } = { score: 0 };
  const score = learner.score || 10;
  console.log(score);
checks:
  - match: "learner\\.score\\s+\\?\\?\\s+10"
    message: "Use ?? so zero is preserved."
hint: "Use ?? so zero is preserved."
```

```quiz
question: Why use `score ?? 10` instead of `score || 10`?
options:
  - It keeps a legitimate zero.
  - It converts text to numbers.
  - It rejects negative numbers.
answer: 0
explain: Nullish coalescing replaces only `null` or undefined; logical OR also replaces zero.
```

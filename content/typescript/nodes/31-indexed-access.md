---
title: "Indexed access types"
icon: "👉"
branch: "generics"
requires: ["keyof", "type-queries"]
summary: "Reuse the type of a property or collection element."
---

An indexed access type selects part of another type:

```typescript
type Learner = { name: string; score: number; active: boolean };
type Score = Learner["score"];             // number
type SummaryValue = Learner["name" | "score"]; // string | number
const score: Score = 42;
console.log(score.toFixed(0));
```

The index is a type-level key, not a runtime property lookup. An invalid key fails checking instead of inventing a field.

## Select array elements

```typescript
const learners = [{ name: "Ada", score: 42 }];
type LearnerItem = (typeof learners)[number];
const next: LearnerItem = { name: "Grace", score: 37 };
console.log(next);
```

`[number]` asks for the type of array elements. For a tuple, a specific numeric literal can select one position; indexing with `number` produces the union of its element types.

This is useful when a response type already defines a nested contract and another function should reuse it. Avoid copying the same property type into several declarations, where one version can drift from the source.

```exercise
goal: "Derive Score from the score property rather than the name."
lang: typescript
code: |
  type Learner = { name: string; score: number };
  type Score = Learner["name"];
  const score: Score = 42;
  console.log(score);
checks:
  - match: "Learner\\[\"score\"\\]"
    message: "Index the type with \"score\"."
hint: "Index the type with \"score\"."
```

```quiz
question: "What does Learner[\"score\"] mean in a type alias?"
options:
  - "Read the runtime score immediately."
  - "Select the static type of that property."
  - "Make score optional."
answer: 1
explain: "Indexed access reuses a property type without executing a lookup."
```

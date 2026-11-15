---
title: "Utility types"
icon: "🧰"
branch: "generics"
requires: ["mapped-types", "intersections"]
summary: "Use standard transformations before writing your own."
---

TypeScript includes reusable type transformations:

```typescript
type Learner = { id: string; name: string; score: number };
type LearnerPatch = Partial<Learner>;
type PublicLearner = Pick<Learner, "name" | "score">;
type NewLearner = Omit<Learner, "id">;
const draft: NewLearner = { name: "Ada", score: 0 };
console.log(draft);
```

`Partial` makes properties optional, `Required` makes them required, and `Readonly` restricts writes through each property. These transformations are shallow unless explicitly defined otherwise.

## Select the right contract

```typescript
type Status = "queued" | "done";
const counts: Record<Status, number> = { queued: 3, done: 1 };
console.log(counts.done);
```

A finite-key `Record` requires each listed key. `Record<string, T>` describes a broader dictionary and does not guarantee every possible runtime key exists.

`Exclude`, `Extract`, and `NonNullable` operate on union members; `Parameters`, `ReturnType`, and `Awaited` inspect other type relationships. Name the transformed result when it represents a domain concept rather than repeating a long utility expression everywhere.

```exercise
goal: "Describe a patch that can omit the unchanged properties."
lang: typescript
code: |
  type Learner = { name: string; score: number };
  type Patch = Learner;
  const patch: Patch = { score: 42 };
  console.log(patch);
checks:
  - match: "type\\s+Patch\\s+=\\s+Partial<Learner>;"
    message: "Use Partial<Learner> for the patch contract."
hint: "Use Partial<Learner> for the patch contract."
```

```quiz
question: "Does Partial<Learner> recursively make every nested field optional?"
options:
  - "Yes."
  - "No, it changes the top-level properties."
  - "Only when Learner is an interface."
answer: 1
explain: "The built-in Partial is a shallow property transformation."
```

---
title: "Intersection types"
icon: "➕"
branch: "modeling"
requires: ["interfaces"]
summary: "Combine contracts that must all hold at once."
---

An [[intersection]] requires a value to satisfy each member type:

```typescript
type Named = { name: string };
type Scored = { score: number };
type RankedLearner = Named & Scored;
const learner: RankedLearner = { name: "Ada", score: 42 };
console.log(learner);
```

A union accepts alternatives; an intersection combines requirements. This can compose a small payload with shared metadata or capabilities.

## Conflicts are not overrides

If one member requires `id: string` and another requires `id: number`, the intersection does not choose the later one. The property must satisfy both incompatible requirements, often reducing it to never.

Use `Omit<Base, "id"> & { id: NewType }` when you intentionally replace a property type, rather than intersecting contradictory contracts. [Utility types](node:utility-types) develops that pattern.

Intersections are static relationships. They do not merge objects or copy properties at runtime. Create the actual combined object with JavaScript operations, then let the checker verify that its shape fits.

```exercise
goal: "Require both capabilities rather than either one."
lang: typescript
code: |
  type Named = { name: string };
  type Scored = { score: number };
  type Learner = Named | Scored;
  const learner: Learner = { name: "Ada", score: 42 };
  console.log(learner.name, learner.score);
checks:
  - match: "Named\\s+\\&\\s+Scored"
    message: "Use & to combine required shapes."
hint: "Use & to combine required shapes."
```

```quiz
question: What does `Named & Scored` require?
options:
  - Either a name or a score.
  - Both compatible name and score properties.
  - A runtime object merge automatically.
answer: 1
explain: An intersection requires every member contract to hold simultaneously.
```

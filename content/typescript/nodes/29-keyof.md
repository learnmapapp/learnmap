---
title: "Keys with keyof"
icon: "🔑"
branch: "generics"
requires: ["generic-constraints"]
summary: "Connect an object key argument to the object it belongs to."
---

`keyof T` produces a union of the known property keys of `T`:

```typescript
type Learner = { name: string; score: number };
type LearnerKey = keyof Learner; // "name" | "score"

function read<T, K extends keyof T>(value: T, key: K): T[K] {
  return value[key];
}
const score = read({ name: "Ada", score: 42 }, "score");
console.log(score.toFixed(0));
```

Constraining `K` ties the key to `T`. The indexed return `T[K]` preserves the type of the selected property instead of returning an unrelated union of every field.

## Keys can be more than strings

Property keys can be strings, numbers, or symbols. Index signatures can make `keyof` broader than a finite literal union; a string index signature can also admit numeric keys because JavaScript coerces ordinary numeric property access.

`Object.keys` returns runtime enumerable string keys, not a universally safe `Array<keyof T>`. Runtime objects can contain additional properties beyond a static contract, so avoid asserting every returned key without considering that boundary.

```exercise
goal: "Restrict the key type to keys of the supplied object."
lang: typescript
code: |
  function read<T, K extends string>(value: T, key: K): T[K] {
    return value[key];
  }
  console.log(read({ score: 42 }, "score"));
checks:
  - match: "K\\s+extends\\s+keyof\\s+T"
    message: "Use K extends keyof T."
hint: "Use K extends keyof T."
```

```quiz
question: "What does K extends keyof T ensure in a property reader?"
options:
  - "K is a key allowed by T."
  - "Every key exists on every runtime object."
  - "K is always a number."
answer: 0
explain: "It relates the selected static key to the object type; it is not external-data validation."
```

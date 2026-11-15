---
title: "Arrays"
icon: "📋"
branch: "basics"
requires: ["primitives"]
summary: "Describe element types and remember that indexes can miss."
---

`number[]` means an array of numbers. `Array<number>` is an equivalent generic spelling:

```typescript
const scores: number[] = [10, 20];
scores.push(30);
const doubled = scores.map(score => score * 2);
console.log(doubled); // [20, 40, 60]
```

The callback parameter is inferred from the element type. Adding a string to `scores` is a type error; mixed elements require an explicit wider type such as `(string | number)[]`.

## A type is not a bounds check

Ordinary `number[]` indexing may be typed as `number` even when an index is out of range. Enable `noUncheckedIndexedAccess` to include `undefined` for unchecked indexed reads.

Methods such as `find` and `at` already return possibly missing results under strict checking. Check the result before using a number-specific method.

Array operations keep their JavaScript behavior: `map` creates a new array, `push` changes the original, and `sort` mutates. Use a copy when sharing a collection across code that should not see mutation.

```exercise
goal: "Make the element type match a collection of numbers."
lang: typescript
code: |
  const scores: string[] = [10, 20];
  console.log(scores.map(score => score * 2));
checks:
  - match: "number\\[\\]"
    message: "Annotate scores as number[]."
hint: "Annotate scores as number[]."
```

```quiz
question: "Does declaring number[] guarantee that scores[999] exists?"
options:
  - "Yes."
  - "Only if the array is const."
  - "No; an index can still be out of bounds."
answer: 2
explain: "The element type does not prove the array has a value at every index."
```

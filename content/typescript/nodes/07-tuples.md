---
title: "Tuples"
icon: "📍"
branch: "basics"
requires: ["arrays"]
summary: "Give each position its own type for a small fixed record."
---

A [[tuple]] describes positions rather than one shared element type:

```typescript
const point: [number, number] = [3, 4];
const [x, y] = point;
console.log(x + y); // 7

const result: [name: string, score: number] = ["Ada", 42];
console.log(result[1].toFixed(0));
```

Labels document the positions but do not become runtime property names. A tuple is still a JavaScript array, so labels such as `name` do not create `result.name`.

## Choose positions deliberately

Use tuples for compact, established pairs such as coordinates or a value and setter. If many positions have unclear meanings, a named object is often easier to use correctly.

`readonly [number, number]` prevents assignment through that tuple reference. `Optional` and rest elements can describe more flexible argument lists, but an ordinary array is clearer when position does not carry distinct meaning.

A plain `[3, 4]` without context usually infers `number[]`, not a two-element tuple. Supply an annotation or use a const assertion when fixed positions matter.

```exercise
goal: "Use a tuple whose second position is a number."
lang: typescript
code: |
  const learner: [string, string] = ["Ada", 42];
  console.log(learner[1].toFixed(0));
checks:
  - match: "\\[string,\\s+number\\]"
    message: "Change the tuple type to [string, number]."
hint: "Change the tuple type to [string, number]."
```

```quiz
question: "Do labels in `[name: string, score: number]` create object properties?"
options:
  - Yes, result.name reads the first value.
  - No, access is still positional.
  - Only after compilation.
answer: 1
explain: Tuple labels help readers and tooling; the runtime value remains an array.
```

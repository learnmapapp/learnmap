---
title: "Object types"
icon: "🗂️"
branch: "basics"
requires: ["primitives"]
summary: "Describe required properties and infer contextual values."
---
Most JavaScript data is objects, so this is where TypeScript earns its keep. An object type lists the properties and their types:

```typescript
function describe(learner: { name: string; score: number }): string {
  return `${learner.name}: ${learner.score}`;
}
```

Writing that inline gets noisy, so you'll usually name it with a [type alias](node:type-aliases):

```typescript
type Learner = {
  name: string;
  score: number;
};

function describe(learner: Learner): string {
  return `${learner.name}: ${learner.score}`;
}
```

That's the [[shape]] an object must have. Now let's see what the checker catches.

## Spot the three bugs

```typescript
describe({ name: "Ada" });
//       ~~~~~~~~~~~~~~ Property 'score' is missing.

describe({ name: "Ada", score: "42" });
//                      ~~~~~ Type 'string' is not assignable
//                            to type 'number'.

describe({ name: "Ada", score: 42, scroe: 43 });
//                                 ~~~~~ Object literal may only
//                                       specify known properties.
```

A missing property, a wrong type, and a typo. All three caught before running.

## The surprising one: extra properties

That last error only fires for a **fresh object literal**, written right there in the call. This works fine:

```typescript
const ada = { name: "Ada", score: 42, active: true };
describe(ada);   // OK: ada has everything Learner needs
```

TypeScript cares that an object has **at least** the properties required. Extra ones are fine. The literal check is just a bonus that catches typos at the place you're most likely to make them. [Structural typing](node:structural-typing) explains the thinking behind it.

```compare java
record Learner(String name, int score) {}
// Java needs a named class; TypeScript just needs the shape.
```

```compare go
type Learner struct { Name string; Score int }
```

```exercise
goal: "`score` is a string, but the type wants a number. Give it the number 42."
lang: typescript
code: |
  type Learner = { name: string; score: number };
  const learner: Learner = { name: "Ada", score: "42" };
  console.log(learner);
checks:
  - match: 'score:\s*42\b'
    message: "Use the number 42 rather than the string \"42\"."
hint: Remove the quotes.
solution: |
  type Learner = { name: string; score: number };
  const learner: Learner = { name: "Ada", score: 42 };
  console.log(learner);
```

```quiz
question: "`type Point = { x: number; y: number }`. A variable `p3 = { x: 1, y: 2, z: 3 }` is passed where a Point is expected. What happens?"
options:
  - An error, because z isn't in Point.
  - It's accepted, because p3 has x and y.
  - z is removed at runtime.
answer: 1
explain: Objects only need the required properties. The extra-property error applies to fresh literals written inline, not to existing variables.
```

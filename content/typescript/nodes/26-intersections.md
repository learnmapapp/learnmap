---
title: "Intersection types"
icon: "➕"
branch: "modeling"
requires: ["interfaces"]
summary: "Combine contracts that must all hold at once."
---
A [union](node:unions) `A | B` is "A **or** B". An **intersection** `A & B` is "A **and** B": a value that has everything from both.

```typescript
type Named = { name: string };
type Timestamped = { createdAt: Date; updatedAt: Date };

type Post = Named & Timestamped;

const post: Post = {
  name: "Hello world",
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

Leave out any of the three properties and the checker complains.

## The confusing part

Here's a mental trap that catches nearly everyone. `|` and `&` seem to work "backwards" on objects:

- `Named | Timestamped` accepts objects with **either** set of properties. You can rely on **fewer** properties being there (only the shared ones).
- `Named & Timestamped` requires objects with **both** sets. You can rely on **more** properties.

Think in terms of sets of values, not properties: the union is a bigger set of values, and the intersection is the overlap, a smaller set with stricter requirements.

## Building blocks

Intersections let you build types from small reusable pieces:

```typescript
type WithId = { id: string };
type Draft = { title: string; body: string };

type SavedPost = Draft & WithId & Timestamped;

function save(draft: Draft): SavedPost {
  const now = new Date();
  const id = crypto.randomUUID();
  return { ...draft, id, createdAt: now, updatedAt: now };
}
```

## When pieces conflict

If both sides define the same property with incompatible types, you get an impossible type:

```typescript
type A = { id: string };
type B = { id: number };
type C = A & B;    // id: string & number, which is never
```

No value can satisfy it, so you'll get errors as soon as you try to create one. `interface ... extends` would report that conflict right where you declare it, which is one reason some people prefer [interfaces](node:interfaces) for this.

```compare java
// Like a class implementing two interfaces at once:
// class Post implements Named, Timestamped { ... }
```

```compare python
class Post(Named, Timestamped, Protocol): ...
```

```exercise
goal: "`Named | Scored` only promises one of the two, so `learner.score` isn't safe to read. Require both."
lang: typescript
code: |
  type Named = { name: string };
  type Scored = { score: number };
  type Learner = Named | Scored;
  const learner: Learner = { name: "Ada", score: 42 };
  console.log(learner.name, learner.score);
checks:
  - match: 'Named\s*&\s*Scored'
    message: "Use & to require both shapes."
hint: Replace the | with &.
solution: |
  type Named = { name: string };
  type Scored = { score: number };
  type Learner = Named & Scored;
  const learner: Learner = { name: "Ada", score: 42 };
  console.log(learner.name, learner.score);
```

```quiz
question: "`type T = { a: string } & { b: number }`. Which value fits T?"
options:
  - "`{ a: \"x\" }`"
  - "`{ b: 1 }`"
  - "`{ a: \"x\", b: 1 }`"
answer: 2
explain: An intersection needs everything from both sides.
```

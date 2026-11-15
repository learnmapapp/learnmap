---
title: "Typed promises"
icon: "⏳"
branch: "applications"
requires: ["generics", "unions"]
summary: "Describe a future result while handling failures separately."
---

`Promise<T>` represents an asynchronous operation that may fulfill with a value of type `T`:

```typescript
function loadScore(): Promise<number> {
  return Promise.resolve(42);
}
loadScore().then(score => console.log(score.toFixed(0)));
```

The type parameter describes fulfillment, not a guaranteed success or a typed rejection channel. A promise can still reject, and that path needs handling.

## Keep return relationships visible

A `.then` callback transforms the next fulfilled value. Returning a string creates a promise for a string; returning another promise lets the chain adopt its eventual result.

`Promise.all` waits for a group of supplied operations and rejects when one rejects. It does not automatically cancel the other operations. Starting work and then awaiting a group differs from awaiting each operation before starting the next.

Use a discriminated result union when expected failure is part of the function's value contract. Unexpected exceptions can still occur, so do not assume a union alone makes a function incapable of throwing.

```exercise
goal: "Return a Promise that fulfills with a number."
lang: typescript
code: |
  function loadScore(): Promise<number> {
    return Promise.resolve("42");
  }
  loadScore().then(score => console.log(score));
checks:
  - match: "Promise\\.resolve\\(42\\)"
    message: "Resolve the numeric value 42."
hint: "Resolve the numeric value 42."
```

```quiz
question: "What does Promise<number> describe?"
options:
  - "A future fulfillment value of number."
  - "A rejection that must be a number."
  - "An operation that cannot fail."
answer: 0
explain: "The type parameter describes fulfillment; rejection is a separate runtime path."
```

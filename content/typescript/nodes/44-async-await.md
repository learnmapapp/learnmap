---
title: "Async and await"
icon: "🕰️"
branch: "applications"
requires: ["promises"]
summary: "Write asynchronous control flow while keeping its Promise contract."
---

An `async` function always returns a promise. `await` gives its fulfilled result inside asynchronous code:

```typescript
async function loadScore(): Promise<number> {
  const score = await Promise.resolve(42);
  return score;
}
loadScore().then(score => console.log(score));
```

Returning a plain number from this async body fulfills the returned promise with that number. Throwing inside the body rejects it.

## Sequencing matters

```typescript
async function total(): Promise<number> {
  const [left, right] = await Promise.all([
    Promise.resolve(20),
    Promise.resolve(22),
  ]);
  return left + right;
}
total().then(value => console.log(value));
```

Independent operations can be started together. If the second depends on the first, await the first before constructing it. Marking a function async does not move CPU work to another thread.

An `await` expression can throw when the operation rejects. Catch where recovery or added context is useful, rather than logging and returning a misleading successful value. Keep the declared result honest about whether failure is represented as a value.

```exercise
goal: "Await the promise before adding one to its value."
lang: typescript
code: |
  async function nextScore(): Promise<number> {
    const score = Promise.resolve(41);
    return score + 1;
  }
  nextScore().then(value => console.log(value));
checks:
  - match: "const\\s+score\\s+=\\s+await\\s+Promise\\.resolve\\(41\\);"
    message: "Add await so score is a number rather than a Promise."
hint: "Add await so score is a number rather than a Promise."
```

```quiz
question: "What does an async function return when its body returns 42?"
options:
  - "The bare number directly."
  - "A promise fulfilled with 42."
  - "A thread handle."
answer: 1
explain: "Async functions return promises even when their return expressions are plain values."
```

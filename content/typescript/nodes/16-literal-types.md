---
title: "Literal types"
icon: "🚦"
branch: "narrowing"
requires: ["unions", "object-types"]
summary: "Use exact values to describe a finite set of choices."
---
What's wrong with this?

```typescript
function setStatus(status: string) { /* ... */ }

setStatus("done");
setStatus("Done");
setStatus("finsihed");
```

Nothing, as far as `string` is concerned. But only one of those is a status your app understands. A **literal type** is a type with exactly one value, and a union of them is a precise list of allowed values:

```typescript
type Status = "queued" | "running" | "done";

function setStatus(status: Status) { /* ... */ }

setStatus("done");      // fine
setStatus("Done");
//        ~~~~~~ Argument of type '"Done"' is not assignable
//               to parameter of type 'Status'.
```

Your editor also autocompletes the three options as you type the quotes. It's an enum without any extra machinery.

## Numbers and booleans work too

```typescript
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
type Port = 80 | 443;
```

## Why `const` gives you literal types

Remember [inference](node:inference)? A `let` gets a wide type and a `const` gets the exact value:

```typescript
let a = "done";       // string: you might reassign it
const b = "done";     // "done": it can never change
```

That's why this works:

```typescript
const current = "done";
setStatus(current);   // fine: current is "done", which is a Status
```

But this one surprises people:

```typescript
const task = { status: "done" };
setStatus(task.status);
//        ~~~~~~~~~~~ Argument of type 'string' is not assignable
//                    to parameter of type 'Status'.
```

Object properties can be changed (`task.status = "oops"`), so `task.status` is widened to `string`. Annotate the object (`const task: { status: Status } = ...`), or see [Const assertions](node:const-assertions) for another fix.

```compare java
enum Status { QUEUED, RUNNING, DONE }
```

```compare python
from typing import Literal
Status = Literal["queued", "running", "done"]
```

```exercise
goal: "`\"queued\"` isn't an allowed `Status` yet. Add it to the type."
lang: typescript
code: |
  type Status = "done";
  const status: Status = "queued";
  console.log(status);
checks:
  - match: '"queued"\s*\|\s*"done"'
    message: "Use the union \"queued\" | \"done\"."
hint: "Put \"queued\" first, then a vertical bar, then \"done\"."
solution: |
  type Status = "queued" | "done";
  const status: Status = "queued";
  console.log(status);
```

```quiz
question: "What is the inferred type of `x` in `const x = 3`?"
options:
  - "`number`"
  - "`3`"
  - "`const`"
answer: 1
explain: A const can't change, so TypeScript gives it the exact literal type 3.
```

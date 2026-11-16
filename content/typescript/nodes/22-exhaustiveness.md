---
title: "Exhaustive checks"
icon: "✅"
branch: "modeling"
requires: ["discriminated-unions"]
summary: "Use never to make a missing variant visible to the checker."
---

After every member of a union has been handled, the remaining value has type [[never]]. Use that fact to detect a forgotten branch:

```typescript
type Mode = "read" | "edit";
function unreachable(value: never): never {
  throw new Error(`Unexpected mode: ${value}`);
}
function label(mode: Mode): string {
  switch (mode) {
    case "read": return "Reading";
    case "edit": return "Editing";
    default: return unreachable(mode);
  }
}
console.log(label("read"));
```

Add a new member to `Mode` without adding a branch and the call to `unreachable` fails checking: the remaining member is not `never`.

## Keep the runtime fallback

The helper throws because untyped callers or invalid external input can still violate static assumptions. Exhaustiveness checks do not replace boundary validation.

A `never` return type describes a function that cannot finish normally, such as one that always throws. It differs from `void`, where normal completion is allowed but no useful return value is expected.

```exercise
goal: Use `never` for the impossible remaining mode.
lang: typescript
code: |
  type Mode = "read" | "edit";
  function label(mode: Mode): string {
    switch (mode) {
      case "read": return "Reading";
      case "edit": return "Editing";
      default: {
        const remaining: string = mode;
        return remaining;
      }
    }
  }
checks:
  - match: remaining:\s+never
    message: Annotate remaining as never so adding a variant breaks checking.
hint: Annotate remaining as `never` so adding a variant breaks checking.
```

```quiz
question: What should the remaining value type be after handling every union variant?
options:
  - any
  - "`unknown`"
  - "`never`"
answer: 2
explain: No possible member remains, so the type is `never`.
```

---
title: "Exhaustive checks"
icon: "✅"
branch: "modeling"
requires: ["discriminated-unions"]
summary: "Use never to make a missing variant visible to the checker."
---
**Six months from now**, someone adds a new state:

```typescript
type Request =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string }
  | { status: "cancelled" };                 // new!
```

There are twelve `switch` statements around the codebase that handle `Request`. Which ones forgot the new case? With a small trick, the compiler will tell you, every single one.

## Meet `never`

[[never]] is the type with **no values**. Nothing can be assigned to it. That sounds useless, but it's exactly what's left when you've narrowed away every possibility:

```typescript
function render(r: Request): string {
  switch (r.status) {
    case "loading": return "Loading...";
    case "success": return r.data.join(", ");
    case "error":   return r.message;
    default: {
      const unhandled: never = r;
      //    ~~~~~~~~~ Type '{ status: "cancelled"; }' is not
      //              assignable to type 'never'.
      return unhandled;
    }
  }
}
```

Before `"cancelled"` existed, every case was handled, so in `default` the type of `r` was `never` and the assignment was fine. After it was added, `r` in `default` is the cancelled case, which can't be assigned to `never`. Error, in every switch that forgot it. And the error message names the missing case.

## Make it reusable

Most codebases have a tiny helper:

```typescript
function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
}

// ...
default: return assertNever(r);
```

That covers you twice: a compile error when a case is missing, and a clear runtime error if bad data arrives anyway.

```tip
This works for unions of [literal types](node:literal-types) too: `type Mode = "read" | "edit"` in a switch on `mode`.
```

```compare rust
// match must be exhaustive; Rust checks it with no trick needed.
```

```compare kotlin
// when over a sealed type must be exhaustive when used as a value.
```

```exercise
goal: "Annotating `remaining` as `string` hides missing cases. Annotate it as `never`, so adding a mode causes an error here."
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
  - match: 'remaining:\s*never'
    message: Annotate remaining as never.
hint: never is the type that has no values.
solution: |
  type Mode = "read" | "edit";
  function label(mode: Mode): string {
    switch (mode) {
      case "read": return "Reading";
      case "edit": return "Editing";
      default: {
        const remaining: never = mode;
        return remaining;
      }
    }
  }
```

```quiz
question: "In a `default` branch after every case is handled, what type does the switched value have?"
options:
  - "`unknown`"
  - "`never`"
  - The original union.
answer: 1
explain: Every possibility has been narrowed away, so nothing is left, and that's never.
```

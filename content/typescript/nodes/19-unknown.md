---
title: "Unknown values"
icon: "📦"
branch: "narrowing"
requires: ["narrowing", "nullability"]
summary: "Accept an untrusted value without giving up checking."
---

[[Unknown]] can hold any value, but operations require you to establish a more specific type first:

```typescript
function shout(value: unknown): string {
  if (typeof value !== "string") {
    throw new Error("Expected text");
  }
  return value.toUpperCase();
}
console.log(shout("Ada"));
```

This is a useful starting point for parsed JSON, messages, and other external input. `any` permits unchecked property access and calls; `unknown` makes you justify them.

## Check every layer

Knowing a value is an object does not prove it has the properties your application needs. Start with object and `null` checks, then check required properties and their types.

An assertion such as `value as Learner` does not perform those checks. It asks the checker to trust your claim. If the source is untrusted, prefer a decoder function or a validation library that actually inspects the data.

Validation should return a useful typed result or report a clear error. Scattering broad assertions throughout rendering and business logic makes boundary mistakes much harder to find.

```exercise
goal: Use `unknown` so the function must narrow its input.
lang: typescript
code: |
  function shout(value: any): string {
    if (typeof value !== "string") throw new Error("Expected text");
    return value.toUpperCase();
  }
  console.log(shout("Ada"));
checks:
  - match: value:\s+unknown
    message: Replace any with unknown.
hint: Replace any with `unknown`.
```

```quiz
question: Why is `unknown` safer than any at an external boundary?
options:
  - It automatically validates a schema.
  - It requires narrowing before specialized operations.
  - It prevents all runtime errors.
answer: 1
explain: Unknown retains a checking obligation; it does not itself validate the input.
```

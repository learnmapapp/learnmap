---
title: "Testing contracts"
icon: "🧪"
branch: "tooling"
requires: ["satisfies", "utility-types", "functions"]
summary: "Keep positive examples and deliberate negative checks next to an API."
---

A type contract can have regression checks just like runtime behavior:

```typescript
function double(value: number): number { return value * 2; }
const valid: number = double(21);
// @ts-expect-error text must remain invalid
const invalid = double("21");
console.log(valid, invalid);
```

`@ts-expect-error` requires the next line to produce a checking error. If a future change accidentally allows the call, the directive itself becomes an error. Keep its scope narrow and explain the intended rejection.

## Two kinds of evidence

Run these checks with `tsc --noEmit`. Unlike type checking, runtime tests execute behavior: parsing, computation, and error handling still need real tests.

Do not use `@ts-expect-error` as a permanent substitute for understanding an application error. In a dedicated negative test it records an intentional contract boundary; in production logic it may hide a broken assumption.

`satisfies` is useful for positive fixture checks. A value satisfying one broad shape does not prove two arbitrary types are identical, so use a deliberate testing strategy for complicated generic relationships.

```exercise
goal: "Require the following bad call to keep producing a type error."
lang: typescript
code: |
  function double(value: number): number { return value * 2; }
  // @ts-ignore strings are intentionally rejected
  double("21");
checks:
  - match: "//\\s+@ts\\-expect\\-error"
    message: "Use @ts-expect-error instead of @ts-ignore."
hint: "Use @ts-expect-error instead of @ts-ignore."
```

```quiz
question: "What happens if the next line no longer errors after @ts-expect-error?"
options:
  - "The directive reports an unused expectation."
  - "The compiler silently ignores it forever."
  - "The line is deleted from runtime code."
answer: 0
explain: "An unused expect-error directive fails checking, making negative tests sensitive to contract changes."
```

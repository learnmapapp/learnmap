---
title: "Union types"
icon: "🔀"
branch: "narrowing"
requires: ["primitives"]
summary: "Represent alternatives and narrow before using specialized operations."
---

A [[union]] accepts values belonging to any of its alternatives:

```typescript
function label(id: string | number): string {
  return `Learner ${id}`;
}
console.log(label(42));
console.log(label("ada"));
```

Before narrowing, you can use only operations valid for every possible member. Calling `id.toUpperCase()` directly would fail checking because numbers do not provide it.

## Preserve the alternatives

`string | number` differs from `any`: the union keeps track of which possibilities must be handled. It also differs from an intersection, which requires a value to satisfy multiple contracts together.

```typescript
function display(id: string | number): string {
  return typeof id === "string" ? id.toUpperCase() : id.toFixed(0);
}
console.log(display(42));
```

The conditional gives each branch a more specific type. Do not convert every value to `any` to bypass the error; choose the appropriate branch or use an operation supported by both alternatives.

Parentheses matter for collections: `(string | number)[]` is an array whose elements may use either type.

```exercise
goal: "Allow a numeric or textual identifier."
lang: typescript
code: |
  function label(id: string): string {
    return `Learner ${id}`;
  }
  console.log(label(42));
checks:
  - match: "id:\\s+string\\s+\\|\\s+number"
    message: "Use string | number for the id parameter."
hint: "Use string | number for the id parameter."
```

```quiz
question: "What can you call on a union before narrowing?"
options:
  - "Every method from either member."
  - "Only operations safe for all possible members."
  - "No operations at all."
answer: 1
explain: "The checker must know that an operation works for every remaining possibility."
```

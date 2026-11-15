---
title: "Type guards"
icon: "🛂"
branch: "narrowing"
requires: ["unknown", "function-types"]
summary: "Package a runtime test as a precise narrowing predicate."
---

A user-defined [[type guard]] returns a boolean with a type predicate describing what a successful result proves:

```typescript
function isText(value: unknown): value is string {
  return typeof value === "string";
}
const values: unknown[] = ["Ada", 42, "Grace"];
const names = values.filter(isText);
console.log(names.map(name => name.toUpperCase()));
```

The result is a `string[]` because the predicate narrows each retained item. Modern TypeScript can infer some simple predicates, but an explicit predicate makes a public guard's intent visible.

## A predicate is a promise

The checker trusts the declared relationship; it does not prove that your implementation checked every property. An incorrect guard can make unsafe operations appear valid.

For an object guard, check that the value is non-null, has the required keys, and contains compatible values. Test both accepted and rejected inputs. A guard for a class-like shape does not establish prototype identity unless that is what the code actually tests.

Use guards for a clear reusable check; use a decoder when you also need detailed validation errors or normalization.

```exercise
goal: "Declare the narrowing relationship in the guard return type."
lang: typescript
code: |
  function isText(value: unknown): boolean {
    return typeof value === "string";
  }
  const values: unknown[] = ["Ada", 42];
  console.log(values.filter(isText));
checks:
  - match: ":\\s+value\\s+is\\s+string\\s+\\{"
    message: "Return value is string as the predicate type."
hint: "Return value is string as the predicate type."
```

```quiz
question: "Does TypeScript prove that a custom type predicate validates every promised field?"
options:
  - "Yes."
  - "No, the implementation must uphold that contract."
  - "Only for exported functions."
answer: 1
explain: "A declared type predicate is trusted, so incomplete guard logic can be unsound."
```

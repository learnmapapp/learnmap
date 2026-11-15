---
title: "Type queries"
icon: "🔭"
branch: "generics"
requires: ["inference", "type-aliases"]
summary: "Derive a type from a value with typeof in a type position."
---

In a type position, `typeof` asks the checker for the type of a value:

```typescript
const defaults = { retries: 3, label: "Learner" };
type Settings = typeof defaults;

function describe(settings: Settings): string {
  return `${settings.label}: ${settings.retries}`;
}
console.log(describe(defaults));
```

This avoids maintaining a duplicate handwritten shape when a runtime value is the natural source of truth.

## Two uses of typeof

JavaScript's runtime `typeof value` returns a string such as `"number"`. TypeScript's type query `type T = typeof value` exists only while checking. The syntax shares a word but does different jobs depending on its position.

Combine `keyof typeof defaults` to obtain the value's known property keys as a type. If you need exact literal values rather than widened mutable properties, a const assertion can retain that precision.

Keep the direction of ownership clear: sometimes a public type should define the contract and values should satisfy it. Deriving everything from one implementation can unintentionally expose implementation details.

```exercise
goal: "Derive Settings from the existing defaults value."
lang: typescript
code: |
  const defaults = { retries: 3, label: "Learner" };
  type Settings = defaults;
  const settings: Settings = { retries: 2, label: "Course" };
  console.log(settings);
checks:
  - match: "type\\s+Settings\\s+=\\s+typeof\\s+defaults;"
    message: "Use typeof defaults in the type alias."
hint: "Use typeof defaults in the type alias."
```

```quiz
question: "What is produced by type Settings = typeof defaults?"
options:
  - "A duplicate runtime object."
  - "A static type derived from defaults."
  - "The string \"object\"."
answer: 1
explain: "In a type position, typeof refers to the inferred type of the value."
```

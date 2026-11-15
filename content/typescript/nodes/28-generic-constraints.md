---
title: "Generic constraints"
icon: "📏"
branch: "generics"
requires: ["generics", "object-types"]
summary: "Require capabilities while retaining the caller's specific type."
---

A constraint limits which types a type parameter may represent:

```typescript
function withLabel<T extends { name: string }>(value: T): T {
  console.log(value.name);
  return value;
}
const learner = withLabel({ name: "Ada", score: 42 });
console.log(learner.score); // preserved
```

`extends` here means the type must satisfy the required shape. The returned value still has the caller's full inferred type, including `score`.

## A constraint is not an exact type

Knowing that `T` has a name does not let you manufacture any `{ name: string }` object and return it as `T`. The caller may have supplied additional required fields or a narrower name type. Return the original value, or explicitly describe a transformation's new result type.

Prefer the smallest capability the implementation needs. A function reading `.length` can constrain to `{ length: number }` rather than insisting on an array.

Constraints are erased like other type syntax. They do not check objects arriving from untyped sources, so runtime boundaries still need validation.

```exercise
goal: "Constrain T so reading its length is justified."
lang: typescript
code: |
  function size<T>(value: T): number {
    return value.length;
  }
  console.log(size("Ada"));
checks:
  - match: "<T\\s+extends\\s+\\{\\s+length:\\s+number\\s+\\}>"
    message: "Require T to provide length: number."
hint: "Require T to provide length: number."
```

```quiz
question: "Does T extends { name: string } mean T has no other required fields?"
options:
  - "Yes."
  - "No, T can contain additional requirements."
  - "Only if T is inferred."
answer: 1
explain: "The constraint is a minimum capability; a particular T can be more specific."
```

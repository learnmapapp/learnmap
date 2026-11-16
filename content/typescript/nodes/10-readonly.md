---
title: "Readonly values"
icon: "🔒"
branch: "basics"
requires: ["optional-properties", "arrays"]
summary: "Restrict mutation through a reference without claiming a deep freeze."
---

`readonly` prevents writes through a typed property or array reference:

```typescript
type Point = { readonly x: number; readonly y: number };
const point: Point = { x: 3, y: 4 };

function total(values: readonly number[]): number {
  return values.reduce((sum, value) => sum + value, 0);
}
console.log(point.x, total([1, 2, 3]));
```

A function accepting a `readonly` array promises not to mutate it through that parameter. Both mutable arrays and `readonly` arrays can be passed to it.

## Compile-time restrictions

`const` prevents rebinding the variable, while `readonly` restricts writes through a type. Neither automatically freezes runtime objects. Another mutable alias may still be able to change the same object.

Readonly is also shallow by default. A `readonly` property containing a mutable array prevents replacing that array reference, but not necessarily pushing into the array. Describe nested levels separately when that distinction matters.

Return a new object or array for an update rather than forcing a `readonly` value back into a mutable type with an assertion.

```exercise
goal: Accept a `readonly` array without requiring mutable access.
lang: typescript
code: |
  function total(values: number[]): number {
    return values.reduce((sum, value) => sum + value, 0);
  }
  const values: readonly number[] = [1, 2];
  console.log(total(values));
checks:
  - match: function\s+total\(\s*values:\s*readonly\s+number\[\]
    message: Add readonly to the parameter array type.
hint: Add `readonly` to the parameter array type.
```

```quiz
question: Does `readonly` automatically call `Object.freeze` at runtime?
options:
  - Yes.
  - No, it is a static restriction.
  - Only for arrays.
answer: 1
explain: Readonly type syntax restricts checked access; it does not implement runtime freezing.
```

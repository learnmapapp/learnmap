---
title: "Generic constraints"
icon: "📏"
branch: "generics"
requires: ["generics", "object-types"]
summary: "Require capabilities while retaining the caller's specific type."
---
**Bug report:** "This generic function doesn't compile."

```typescript
function longest<T>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
  //       ~~~~~~ Property 'length' does not exist on type 'T'.
}
```

**Diagnosis:** `T` could be **anything**, including `number`, which has no `length`. The checker is right to refuse.

**Fix:** narrow down what `T` is allowed to be, with `extends`:

```typescript
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
```

`T extends { length: number }` is a [[constraint]]. Read it as "T can be any type, **as long as** it has a numeric `length`". Inside the function, you may use `length`. At the call site, the checker enforces it:

```typescript
longest("apple", "fig");         // T = string
longest([1, 2], [1, 2, 3]);      // T = number[]
longest(10, 20);
//      ~~ Argument of type 'number' is not assignable
//         to parameter of type '{ length: number; }'.
```

## Why not just use `{ length: number }` directly?

Fair question. Compare:

```typescript
function longest(a: { length: number }, b: { length: number }) {
  return a.length >= b.length ? a : b;
}

const word = longest("apple", "fig");
word.toUpperCase();
//   ~~~~~~~~~~~ Property 'toUpperCase' does not exist
//               on type '{ length: number; }'.
```

The non-generic version forgets you passed strings. The generic one keeps the **exact** type, while still guaranteeing `length`. That's the whole trick: constraints say what you need, generics remember what you got.

## Constraints with named types

Any type works as a constraint:

```typescript
interface HasId { id: string }

function byId<T extends HasId>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);
}
```

`byId(users, "u1")` returns a `User`, not a bare `HasId`.

```compare java
static <T extends Comparable<T>> T max(T a, T b) { ... }
```

```compare rust
fn longest<T: AsRef<str>>(a: T, b: T) -> T { ... }
```

```exercise
goal: "The checker won't allow `value.length`, since `T` might not have one. Constrain `T` to types with a numeric `length`."
lang: typescript
code: |
  function size<T>(value: T): number {
    return value.length;
  }
  console.log(size("Ada"));
checks:
  - match: '<T\s+extends\s+\{\s*length:\s*number;?\s*\}>'
    message: "Write <T extends { length: number }>."
hint: "The constraint goes inside the angle brackets: T extends { ... }."
solution: |
  function size<T extends { length: number }>(value: T): number {
    return value.length;
  }
  console.log(size("Ada"));
```

```quiz
question: "`function f<T extends string>(x: T)`. Which call is rejected?"
options:
  - "`f(\"hi\")`"
  - "`f(42)`"
  - "`f(\"\")`"
answer: 1
explain: 42 isn't a string, so it doesn't satisfy the constraint.
```

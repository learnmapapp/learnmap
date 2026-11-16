---
title: "Readonly values"
icon: "🔒"
branch: "basics"
requires: ["optional-properties", "arrays"]
summary: "Restrict mutation through a reference without claiming a deep freeze."
---
Ever passed an array to a helper function, only to find it was sorted in place afterwards? `readonly` lets a function **promise** not to do that.

```typescript
function topThree(scores: readonly number[]): number[] {
  return [...scores].sort((a, b) => b - a).slice(0, 3);
}
```

Inside the function, any attempt to change the array is an error:

```typescript
function cheat(scores: readonly number[]) {
  scores.push(100);
  //     ~~~~ Property 'push' does not exist on type
  //          'readonly number[]'.
  scores.sort();
  //     ~~~~ Property 'sort' does not exist ...
}
```

`map`, `filter`, `slice` and other non-changing methods are all still there. Callers can pass a normal array; it's the **function** that gave up the right to change it.

## Readonly properties

Properties can be `readonly` too:

```typescript
type Point = { readonly x: number; readonly y: number };

const p: Point = { x: 3, y: 4 };
p.x = 10;
//^ Cannot assign to 'x' because it is a read-only property.
```

To "change" one, make a new object: `const moved = { ...p, x: 10 }`. This style of update is everywhere in React and Redux.

## Three things `readonly` doesn't do

1. **It doesn't freeze anything at runtime.** It's a type-level rule; the JavaScript output is ordinary. Use `Object.freeze` if you need a runtime guarantee.
2. **It's shallow.** A `readonly` property that holds an array stops you **replacing** the array, not pushing into it. You'd need `readonly string[]` for that too.
3. **It isn't `const`.** `const` stops a variable from being reassigned. `readonly` stops writes to properties or elements. A `const` array can still be pushed to.

```compare kotlin
fun topThree(scores: List<Int>)   // Kotlin's List is read-only
```

```compare rust
fn top_three(scores: &[u32])       // a shared borrow can't mutate
```

```exercise
goal: "`total` doesn't change the array, but its parameter type is mutable, so the `readonly` array can't be passed. Make the parameter `readonly`."
lang: typescript
code: |
  function total(values: number[]): number {
    return values.reduce((sum, value) => sum + value, 0);
  }
  const values: readonly number[] = [1, 2];
  console.log(total(values));
checks:
  - match: 'function\s+total\(\s*values:\s*readonly\s+number\[\]'
    message: Add readonly to the parameter array type.
hint: Put readonly in front of number[] in the signature.
solution: |
  function total(values: readonly number[]): number {
    return values.reduce((sum, value) => sum + value, 0);
  }
  const values: readonly number[] = [1, 2];
  console.log(total(values));
```

```quiz
question: "`const list: string[] = []`. Is `list.push(\"a\")` allowed?"
options:
  - No, list is const.
  - Yes; const prevents reassigning list, not changing the array.
  - Only inside a function.
answer: 1
explain: const is about the variable binding. To stop changes to the array itself, use readonly string[].
```

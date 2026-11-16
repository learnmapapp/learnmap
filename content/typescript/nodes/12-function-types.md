---
title: "Function types"
icon: "☎️"
branch: "functions"
requires: ["functions"]
summary: "Treat callbacks as values with their own call signatures."
---
JavaScript passes functions around all the time: callbacks, event handlers, `map`, `filter`. So TypeScript needs a way to describe a function **as a type**. It looks like an arrow function without a body:

```typescript
type Transform = (value: number) => number;
```

Read it as: "a function that takes a number and returns a number". The parameter **name** is just documentation; only the types matter.

## Puzzle: which of these fit?

```typescript
type Transform = (value: number) => number;

const double: Transform = n => n * 2;              // ✅
const round: Transform = Math.round;               // ✅
const ignore: Transform = () => 0;                 // ✅ (!)
const label: Transform = n => `${n}`;              // ❌
//                            ~~~~~~ Type 'string' is not
//                                   assignable to type 'number'.
const add: Transform = (a: number, b: number) => a + b;   // ❌
```

Two of those deserve a closer look:

- **`ignore` is fine**, even though it takes no parameters. A function that ignores its arguments can always be called with more. It's the same reason `array.map(x => x * 2)` works even though `map` passes the index and the array too.
- **`add` isn't**, because it **needs** a second argument that callers of `Transform` will never pass.

Notice too that `n` in `double` needs no annotation. The checker infers it from `Transform`. This is called *contextual typing*, and it's why callbacks in `map` and `addEventListener` need no annotations.

## Functions that take functions

```typescript
function applyTwice(fn: Transform, value: number): number {
  return fn(fn(value));
}

applyTwice(n => n + 10, 1);   // 21
```

```tip
For callbacks whose result you ignore, use `void` as the return type: `type Listener = (event: string) => void`. Then callbacks that happen to return something are still accepted.
```

```compare kotlin
val double: (Int) -> Int = { it * 2 }
```

```compare java
Function<Integer, Integer> doubler = n -> n * 2;
```

```exercise
goal: "`double` returns a number, but the `Transform` type says the result is a string. Fix the type."
lang: typescript
code: |
  type Transform = (value: number) => string;
  const double: Transform = value => value * 2;
  console.log(double(21));
checks:
  - match: 'Transform\s*=\s*\(value:\s*number\)\s*=>\s*number'
    message: "The callback returns a number, so use => number."
hint: The return type comes after the =>.
solution: |
  type Transform = (value: number) => number;
  const double: Transform = value => value * 2;
  console.log(double(21));
```

```quiz
question: "`type Handler = (event: string, time: number) => void`. Is `const h: Handler = (event) => console.log(event)` accepted?"
options:
  - Yes; a function may ignore parameters it doesn't need.
  - No; it must declare both parameters.
  - Only if time is optional.
answer: 0
explain: Fewer parameters is always safe. Callers pass both, and the function just doesn't use the second.
```

---
title: "Narrowing"
icon: "🔬"
branch: "narrowing"
requires: ["unions", "functions"]
summary: "Let runtime checks refine what the checker knows."
---
A union says "this or that". **Narrowing** is how you find out which one, and it's the move you'll make most often in TypeScript. The nice part: you don't learn new syntax. You write ordinary JavaScript checks, and the checker **follows along**.

Here's one function, annotated with what the checker believes at each point:

```typescript
function describe(value: string | number | string[]): string {
  // value: string | number | string[]

  if (typeof value === "number") {
    // value: number
    return value.toFixed(2);
  }

  // value: string | string[]   (the number case returned)

  if (Array.isArray(value)) {
    // value: string[]
    return value.join(", ");
  }

  // value: string   (it's the only thing left)
  return value.toUpperCase();
}
```

Notice that the checker removes possibilities as they're handled. After the number branch returns, `number` is gone for the rest of the function.

## The checks it understands

| Check | Narrows to |
| --- | --- |
| `typeof x === "string"` | strings (also `"number"`, `"boolean"`, ...) |
| `Array.isArray(x)` | arrays |
| `x instanceof Date` | instances of a class |
| `"email" in x` | object types that have that property |
| `x === "done"` | that exact literal |
| `if (x)` | truthy values, so no `null` or `undefined` ([nullability](node:nullability)) |

## A `typeof` gotcha

`typeof null` is `"object"`, a JavaScript quirk from 1995. So `typeof x === "object"` doesn't rule out `null`. TypeScript knows this, and will remind you:

```typescript
function keys(x: object | null) {
  if (typeof x === "object") {
    Object.keys(x);
    //          ~ 'x' is possibly 'null'.
  }
}
```

```compare kotlin
when (value) {
    is Int -> value.plus(1)       // smart cast, same idea
    is String -> value.uppercase()
}
```

```compare python
if isinstance(value, int):
    return f"{value:.2f}"         # mypy narrows here too
```

```exercise
goal: "The branches are the wrong way round: numbers don't have `toUpperCase`. Check for a string instead."
lang: typescript
code: |
  function describe(value: string | number): string {
    if (typeof value === "number") return value.toUpperCase();
    return value.toFixed(2);
  }
  console.log(describe("Ada"));
checks:
  - match: 'typeof\s+value\s*===\s*"string"'
    message: "Narrow with typeof value === \"string\"."
hint: Change which type the if checks for.
solution: |
  function describe(value: string | number): string {
    if (typeof value === "string") return value.toUpperCase();
    return value.toFixed(2);
  }
  console.log(describe("Ada"));
```

```quiz
question: "`value: string | number`. After `if (typeof value === \"string\") return;`, what type is `value`?"
options:
  - "`string | number`"
  - "`number`"
  - "`string`"
answer: 1
explain: The string case returned early, so only number remains for the rest of the function.
```

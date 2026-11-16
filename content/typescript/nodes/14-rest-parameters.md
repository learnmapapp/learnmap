---
title: "Rest parameters"
icon: "📥"
branch: "functions"
requires: ["arrays", "optional-parameters"]
summary: "Collect extra arguments into a typed array."
---
`Math.max(3, 9, 4)` takes any number of arguments. Writing your own function like that takes a **rest parameter**: three dots in front of the last parameter, which collects every remaining argument into an array.

```typescript
function total(...values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0);
}

total();              // 0
total(5);             // 5
total(10, 20, 12);    // 42
```

The type is the array type, `number[]`, because that's what `values` is inside the function. Every argument is checked against the element type:

```typescript
total(1, "2", 3);
//       ~~~ Argument of type 'string' is not assignable
//           to parameter of type 'number'.
```

## The same dots, the other way round

Three dots also **spread** an existing array into separate arguments:

```typescript
const scores = [90, 85, 77];
total(...scores);     // 252
```

So you see `...` in two roles:

| Where | Name | What it does |
| --- | --- | --- |
| in a parameter list | rest | gathers arguments into an array |
| in a call or literal | spread | expands an array into items |

## Mixing with normal parameters

The rest parameter goes last, and there can only be one:

```typescript
function log(level: "info" | "warn", ...parts: string[]): void {
  console.log(`[${level}]`, ...parts);
}

log("warn", "disk", "almost", "full");
```

```tip
If you find yourself spreading big arrays into a rest parameter, consider taking the array directly: `total(values: readonly number[])`. Rest parameters shine for calls written by hand.
```

```compare java
int total(int... values) { /* values is an int[] */ }
```

```compare python
def total(*values: int) -> int:
    return sum(values)
```

```exercise
goal: "`total(10, 20, 12)` passes three separate numbers. Turn `values` into a rest parameter to collect them."
lang: typescript
code: |
  function total(values: number[]): number {
    return values.reduce((sum, value) => sum + value, 0);
  }
  console.log(total(10, 20, 12));
checks:
  - match: '\.\.\.values:\s*number\[\]'
    message: "Add ... before values in the parameter list."
hint: The type stays number[]; only the dots are new.
solution: |
  function total(...values: number[]): number {
    return values.reduce((sum, value) => sum + value, 0);
  }
  console.log(total(10, 20, 12));
```

```quiz
question: "Inside `function f(...names: string[])`, what is `names` when you call `f()`?"
options:
  - "`undefined`"
  - "An empty array, `[]`"
  - It's a compile error to call it with no arguments.
answer: 1
explain: A rest parameter is always an array. With no arguments, it's empty.
```

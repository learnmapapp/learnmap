---
title: "Tuples"
icon: "📍"
branch: "basics"
requires: ["arrays"]
summary: "Give each position its own type for a small fixed record."
---
An array type like `number[]` says "any number of numbers". Sometimes you mean something stricter: **exactly two things, in this order**. That's a [[tuple]]:

```typescript
const point: [number, number] = [52.37, 4.89];
const entry: [string, number] = ["Ada", 42];
```

Each position has its own type, and the length is fixed:

```typescript
entry[0].toUpperCase();    // fine: position 0 is a string
entry[1].toFixed(1);       // fine: position 1 is a number
entry[2];
//    ~ Tuple type '[string, number]' of length '2'
//      has no element at index '2'.
```

## You've already used tuples

Ever written this in React?

```typescript
const [count, setCount] = useState(0);
```

`useState` returns a tuple: the value first, the setter second. Tuples are perfect for functions that return a couple of values that callers immediately destructure and name themselves. `Object.entries` returns tuples too:

```typescript
const prices = { tea: 2, cake: 4 };
for (const [item, price] of Object.entries(prices)) {
  console.log(item.toUpperCase(), price.toFixed(2));
}
```

## Labels make them readable

Plain tuples don't say what each position means. Labels fix that, and they show up in your editor's hints:

```typescript
type Range = [start: number, end: number];

function split(text: string): [head: string, rest: string] {
  return [text.slice(0, 1), text.slice(1)];
}
```

```tip
Past two or three positions, a tuple gets hard to read: what was index 3 again? Switch to an [object type](node:object-types) with named properties.
```

```compare python
entry: tuple[str, int] = ("Ada", 42)
```

```compare kotlin
val entry: Pair<String, Int> = "Ada" to 42
```

```exercise
goal: "The second item is a number, but the tuple type says `string`. Fix the type."
lang: typescript
code: |
  const learner: [string, string] = ["Ada", 42];
  console.log(learner[1].toFixed(0));
checks:
  - match: '\[string,\s*number\]'
    message: "Change the tuple type to [string, number]."
hint: Each position gets its own type, in order.
solution: |
  const learner: [string, number] = ["Ada", 42];
  console.log(learner[1].toFixed(0));
```

```quiz
question: "What's the difference between `[string, number]` and `(string | number)[]`?"
options:
  - They're the same type.
  - The tuple has exactly two items with fixed positions; the array can hold any mix, any length.
  - The array is faster.
answer: 1
explain: A tuple fixes length and position types. The union array only says what kinds of items are allowed.
```

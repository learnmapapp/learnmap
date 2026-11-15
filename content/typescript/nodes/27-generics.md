---
title: "Generics"
icon: "🧬"
branch: "generics"
requires: ["functions", "arrays"]
summary: "Preserve relationships between input and output types."
---

A [[generic]] introduces a type parameter chosen for each use:

```typescript
function first<T>(values: readonly T[]): T | undefined {
  return values[0];
}
const name = first(["Ada", "Grace"]); // string | undefined
const score = first([10, 20]);        // number | undefined
console.log(name, score);
```

`T` keeps the input element and output type related. Using `any` would lose that connection; using `unknown` for every element would make callers narrow a result whose type was already known.

## Let calls infer the type

The checker can usually infer type arguments from inputs. Supply an explicit argument, such as `first<string>([])`, when the empty input gives too little information.

A type parameter does not prove arbitrary operations are valid. Inside the function, `T` could be many different types, so calling `toUpperCase` on it is not justified. Use a [constraint](node:generic-constraints) to express required capabilities.

Do not add a generic parameter merely to make a function look reusable. It should express a relationship or a meaningful caller-selected type.

```compare rust
fn identity<T>(value: T) -> T { value }
```

```compare java
static <T> T identity(T value) { return value; }
```

```compare kotlin
fun <T> identity(value: T): T = value
```

```compare go
func identity[T any](value T) T { return value }
```

```exercise
goal: "Keep the returned type connected to the input."
lang: typescript
code: |
  function identity(value: unknown): unknown {
    return value;
  }
  const score = identity(42);
  console.log(score.toFixed(0));
checks:
  - match: "function\\s+identity<T>\\(value:\\s+T\\):\\s+T"
    message: "Declare T and use it for both the parameter and return type."
hint: "Declare T and use it for both the parameter and return type."
```

```quiz
question: "What advantage does T provide over any in first<T>?"
options:
  - "It preserves the relationship to the input element type."
  - "It validates every element at runtime."
  - "It ensures the array is nonempty."
answer: 0
explain: "The type parameter preserves information without promising that an element exists."
```

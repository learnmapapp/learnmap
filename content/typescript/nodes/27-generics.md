---
title: "Generics"
icon: "🧬"
branch: "generics"
requires: ["functions", "arrays"]
summary: "Preserve relationships between input and output types."
---
Let's write a tiny function: return the first item of an array. Watch the attempts get better.

**Attempt 1: pick a type.**

```typescript
function first(items: number[]): number | undefined {
  return items[0];
}

first([1, 2, 3]);         // fine
first(["a", "b"]);        // error: strings aren't numbers
```

Works, but only for numbers. We'd need `firstString`, `firstUser`...

**Attempt 2: accept anything.**

```typescript
function first(items: unknown[]): unknown {
  return items[0];
}

const name = first(["Ada", "Grace"]);
name.toUpperCase();
//^^ 'name' is of type 'unknown'.
```

Now it accepts every array, but the result forgets what was inside. We put strings in and got `unknown` out.

**Attempt 3: a type parameter.**

```typescript
function first<T>(items: T[]): T | undefined {
  return items[0];
}

const name = first(["Ada", "Grace"]);   // string | undefined
const n = first([1, 2, 3]);             // number | undefined
```

`<T>` declares a **type parameter**: a placeholder for a type, filled in fresh at each call. TypeScript sees `["Ada", "Grace"]`, works out that `T` is `string`, and the return type follows. That's a [[generic]] function, and the point is the **connection** between input and output.

## You've been using generics all along

```typescript
const ids: Array<number> = [1, 2];              // Array<T>
const cache = new Map<string, User>();          // Map<K, V>
const loaded: Promise<User> = fetchUser(7);     // Promise<T>
```

`Array`, `Map`, `Set` and `Promise` are all generic. The `<...>` fills in their type parameters.

## Generic types

Type aliases can take parameters too:

```typescript
type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

type UserResponse = ApiResponse<User>;
```

```tip
`T` is just a convention for "type". Longer names like `Item` or `TUser` are fine, and help when there are several parameters.
```

```compare java
static <T> T first(List<T> items) { return items.get(0); }
```

```compare rust
fn first<T: Clone>(items: &[T]) -> Option<T> { items.first().cloned() }
```

```exercise
goal: "`identity` returns `unknown`, so `score.toFixed` is rejected. Make it generic, so the result keeps the input's type."
lang: typescript
code: |
  function identity(value: unknown): unknown {
    return value;
  }
  const score = identity(42);
  console.log(score.toFixed(0));
checks:
  - match: 'function\s+identity<T>\(value:\s*T\):\s*T'
    message: "Declare <T> and use T for both the parameter and the return type."
hint: "Add <T> after the function name, then replace both unknowns with T."
solution: |
  function identity<T>(value: T): T {
    return value;
  }
  const score = identity(42);
  console.log(score.toFixed(0));
```

```quiz
question: "With `function first<T>(items: T[]): T | undefined`, what's the type of `first([true, false])`?"
options:
  - "`unknown`"
  - "`boolean | undefined`"
  - "`T | undefined`"
answer: 1
explain: T is inferred as boolean from the argument, and the return type follows.
```

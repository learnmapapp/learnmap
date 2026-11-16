---
title: "Union types"
icon: "🔀"
branch: "narrowing"
requires: ["primitives"]
summary: "Represent alternatives and narrow before using specialized operations."
---
Real data is often "this **or** that". An order ID might be a number in the new system and a string like `"A-1042"` in the old one. A [[union]] type says exactly that, with `|`:

```typescript
type OrderId = number | string;

function label(id: OrderId): string {
  return `Order ${id}`;
}

label(1042);       // fine
label("A-1042");   // fine
label(true);
//    ~~~~ Argument of type 'boolean' is not assignable
//         to parameter of type 'string | number'.
```

## The catch: what can you do with it?

Here's where unions get interesting. Try calling a string method:

```typescript
function shout(id: number | string) {
  return id.toUpperCase();
  //        ~~~~~~~~~~~ Property 'toUpperCase' does not exist
  //                    on type 'number'.
}
```

Fair enough: if `id` is a number, that would crash. With a union, you can only use what's valid for **every** member. Template strings and `===` work for both; `toUpperCase` doesn't.

To use the string side, you first check which one you have. The checker follows your `if`:

```typescript
function shout(id: number | string): string {
  if (typeof id === "string") {
    return id.toUpperCase();     // here, id is a string
  }
  return String(id);             // here, id is a number
}
```

That's [[narrowing]], and it's [the next big topic](node:narrowing).

## Unions everywhere

You've seen unions already, maybe without noticing:

- `string | undefined`, for an [optional property](node:optional-properties).
- `(string | number)[]`, for a mixed array.
- `"queued" | "done"`, a union of exact values, coming up in [literal types](node:literal-types).

```compare python
OrderId = int | str
```

```compare kotlin
// Kotlin has no ad-hoc unions; you'd write a sealed interface
// with one class per case.
```

```exercise
goal: "`label(42)` is rejected because `id` only accepts strings. Allow numbers too."
lang: typescript
code: |
  function label(id: string): string {
    return `Learner ${id}`;
  }
  console.log(label(42));
checks:
  - match: 'id:\s*string\s*\|\s*number'
    message: "Use string | number for the id parameter."
hint: Join the two types with a vertical bar.
solution: |
  function label(id: string | number): string {
    return `Learner ${id}`;
  }
  console.log(label(42));
```

```quiz
question: "`value` has type `string | number`. Which of these compiles without any checks?"
options:
  - "`value.toUpperCase()`"
  - "`value.toFixed(2)`"
  - "`String(value)`"
answer: 2
explain: String() accepts both members. The methods only exist on one of them, so you'd need to narrow first.
```

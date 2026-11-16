---
title: "Type guards"
icon: "🛂"
branch: "narrowing"
requires: ["unknown", "function-types"]
summary: "Package a runtime test as a precise narrowing predicate."
---
Narrowing works inline. But what happens when you move a check into a helper function?

```typescript
function isText(value: unknown): boolean {
  return typeof value === "string";
}

function shout(value: unknown) {
  if (isText(value)) {
    return value.toUpperCase();
    //     ~~~~~ 'value' is of type 'unknown'.
  }
}
```

The checker only sees that `isText` returns a `boolean`. It doesn't look inside, so it doesn't know what `true` means.

## The fix: say what `true` means

A [[type predicate]] replaces `boolean` in the return type:

```typescript
function isText(value: unknown): value is string {
  return typeof value === "string";
}
```

`value is string` reads as: "if this returns true, `value` is a string". Now the helper narrows just like an inline check:

```typescript
if (isText(value)) {
  value.toUpperCase();          // value: string
}
```

Functions like this are called [[type guard]]s.

## It works with `filter` too

This is where predicates really pay off:

```typescript
const mixed: unknown[] = ["Ada", 42, "Grace"];

// Before TypeScript 5.5 this gave unknown[]:
mixed.filter(v => typeof v === "string");
mixed.filter(isText);                        // string[]
```

Recent TypeScript versions (5.5+) can infer simple predicates like that arrow function by themselves. Writing one explicitly is still the way for anything the checker can't work out.

## Guards for your own types

```typescript
type Cat = { meow(): void };
type Dog = { bark(): void };

function isCat(pet: Cat | Dog): pet is Cat {
  return "meow" in pet;
}
```

```warn
The checker trusts your predicate completely. If `isCat` returned `true` for dogs, nothing would catch it. Keep guard functions small and obviously correct.
```

```compare kotlin
// Kotlin contracts do the same:
// contract { returns(true) implies (value is String) }
```

```compare python
from typing import TypeGuard
def is_text(value: object) -> TypeGuard[str]: ...
```

```exercise
goal: "`isText` returns a plain `boolean`, so it doesn't narrow. Change its return type to a type predicate."
lang: typescript
code: |
  function isText(value: unknown): boolean {
    return typeof value === "string";
  }
  const values: unknown[] = ["Ada", 42];
  console.log(values.filter(isText));
checks:
  - match: ':\s*value\s+is\s+string\s*\{'
    message: "Use value is string as the return type."
hint: "The predicate is written value is string."
solution: |
  function isText(value: unknown): value is string {
    return typeof value === "string";
  }
  const values: unknown[] = ["Ada", 42];
  console.log(values.filter(isText));
```

```quiz
question: "What does the return type `x is Date` promise?"
options:
  - That x is converted to a Date.
  - That if the function returns true, x is a Date.
  - That the function always returns a Date.
answer: 1
explain: A predicate links the boolean result to the type of the parameter. The checker trusts it.
```

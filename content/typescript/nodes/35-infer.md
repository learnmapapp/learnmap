---
title: "Inference in types"
icon: "🕵️"
branch: "generics"
requires: ["conditional-types", "indexed-access"]
summary: "Capture part of a matching type pattern with infer."
---
A [conditional type](node:conditional-types) can ask "is `T` an array?". With `infer`, it can also ask "**and if so, of what**?", and capture the answer in a new type variable.

Think of it like a pattern match with a blank to fill in:

```typescript
type ElementOf<T> = T extends (infer Item)[] ? Item : never;
//                             ^^^^^^^^^^
//                  "some array of something; call that something Item"

type A = ElementOf<string[]>;          // string
type B = ElementOf<(number | null)[]>; // number | null
type C = ElementOf<boolean>;           // never: not an array
```

`infer Item` only works inside the `extends` part of a conditional type, and `Item` can only be used in the "true" branch, where the pattern matched.

## Unpacking things

You can put the blank anywhere in a pattern:

```typescript
// What does a promise resolve to?
type Unwrap<T> = T extends Promise<infer V> ? V : T;
type U = Unwrap<Promise<User>>;              // User

// What does a function return?
type Result<F> = F extends (...args: never[]) => infer R ? R : never;
type R = Result<() => boolean>;              // boolean

// What's the first element of a tuple?
type Head<T> = T extends [infer First, ...unknown[]] ? First : never;
type H = Head<[string, number]>;             // string
```

These might look familiar: the built-in `ReturnType`, `Parameters` and `Awaited` from [utility types](node:utility-types) are written exactly like this.

## Should you write these?

In application code, rarely. You'll mostly **read** them in library type definitions, and now you can. If you catch yourself chaining several `infer`s, check whether a plain named type would do.

```compare python
# No equivalent; Python's type system can't destructure types.
```

```compare rust
// Closest is an associated type: <T as IntoIterator>::Item
```

```exercise
goal: "The true branch returns the whole array `T`. Return the captured element type `Item` instead."
lang: typescript
code: |
  type ElementOf<T> = T extends readonly (infer Item)[] ? T : T;
  const name: ElementOf<string[]> = "Ada";
  console.log(name);
checks:
  - match: '\?\s*Item\s*:\s*T'
    message: Use Item in the true branch.
hint: The true branch is the part between ? and :.
solution: |
  type ElementOf<T> = T extends readonly (infer Item)[] ? Item : T;
  const name: ElementOf<string[]> = "Ada";
  console.log(name);
```

```quiz
question: "What is `Unwrap<Promise<number>>` with `type Unwrap<T> = T extends Promise<infer V> ? V : T`?"
options:
  - "`Promise<number>`"
  - "`number`"
  - "`V`"
answer: 1
explain: The pattern matches, so V is captured as number and returned.
```

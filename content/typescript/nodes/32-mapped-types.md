---
title: "Mapped types"
icon: "🗺️"
branch: "generics"
requires: ["indexed-access"]
summary: "Transform every property of a known shape."
---
**Recipe card: derive a type by transforming every property of another.**

**You'll need:** [keyof](node:keyof), [indexed access](node:indexed-access), and a form with this shape:

```typescript
type SignupForm = {
  email: string;
  password: string;
  age: number;
};
```

**The goal:** a `touched` type that has a boolean per field, recording whether the user has edited it. Written by hand:

```typescript
type Touched = { email: boolean; password: boolean; age: boolean };
```

That works until someone adds a field to the form. Instead, let's derive it.

## Step 1: loop over the keys

```typescript
type Touched = { [K in keyof SignupForm]: boolean };
```

Read `[K in keyof SignupForm]` as "for each key `K` of the form". It's a `for` loop over property names, but for types. The result: `{ email: boolean; password: boolean; age: boolean }`.

## Step 2: make it reusable

Swap the specific form for a type parameter:

```typescript
type Flags<T> = { [K in keyof T]: boolean };

type Touched = Flags<SignupForm>;
```

That's a [[mapped type]].

## Step 3: use the original property types

`T[K]` is the type of each property, so you can transform it rather than replace it:

```typescript
type Errors<T> = { [K in keyof T]?: string };          // optional
type Getters<T> = { [K in keyof T]: () => T[K] };      // wrap each
type Frozen<T> = { readonly [K in keyof T]: T[K] };    // add readonly
```

`Getters<SignupForm>` gives `{ email: () => string; ...; age: () => number }`.

## Serving suggestion

You'll rarely write mapped types from scratch, because the common ones are built in. `Readonly<T>`, `Partial<T>` and `Record<K, V>` are all mapped types under the hood. They're on the menu in [utility types](node:utility-types).

```compare java
// No equivalent: you'd write each class by hand or generate code.
```

```compare python
# No equivalent in Python's type system.
```

```exercise
goal: "The flags are true and false, but the mapped type gives every property `string`. Map them to `boolean` instead."
lang: typescript
code: |
  type Flags<T> = { [K in keyof T]: string };
  const changed: Flags<{ name: string; score: number }> = { name: true, score: false };
  console.log(changed);
checks:
  - match: '\]:\s*boolean'
    message: "Use boolean as the property type."
hint: The type after the colon applies to every property.
solution: |
  type Flags<T> = { [K in keyof T]: boolean };
  const changed: Flags<{ name: string; score: number }> = { name: true, score: false };
  console.log(changed);
```

```quiz
question: "What does `{ [K in keyof T]: T[K] }` produce?"
options:
  - A type with the same properties as T, unchanged.
  - An array of T's keys.
  - A type with all properties optional.
answer: 0
explain: Each key keeps its own type, so it's a copy of T. Add ? or readonly to transform it.
```

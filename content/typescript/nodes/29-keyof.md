---
title: "Keys with keyof"
icon: "🔑"
branch: "generics"
requires: ["generic-constraints"]
summary: "Connect an object key argument to the object it belongs to."
---
Here's a small helper that reads one property from an object. In plain JavaScript it's a one-liner. Typing it well needs a new operator.

```javascript
function get(obj, key) {
  return obj[key];
}
```

The naive TypeScript version lets typos through:

```typescript
function get(obj: User, key: string) {
  return obj[key];      // error in strict mode, and any at best
}
get(user, "nmae");      // no complaint about the typo
```

## `keyof`: the keys of a type, as a type

`keyof T` produces a union of `T`'s property names:

```typescript
type User = { id: string; name: string; age: number };

type UserKey = keyof User;    // "id" | "name" | "age"
```

So `key: keyof User` accepts exactly the real property names, with autocomplete:

```typescript
function get(user: User, key: keyof User) {
  return user[key];               // string | number
}

get(user, "name");
get(user, "nmae");
//        ~~~~~~ Argument of type '"nmae"' is not assignable
//               to parameter of type 'keyof User'.
```

## Making it generic

Two type parameters, connected: `K` must be a key of `T`.

```typescript
function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const age = get(user, "age");     // number
const name = get(user, "name");   // string
```

The return type `T[K]` means "the type of property `K` in `T`". That's an [indexed access type](node:indexed-access), and it's why `age` is a `number` rather than `string | number`.

This exact pattern, `K extends keyof T` plus `T[K]`, is in a lot of library code: lodash's `pick`, form libraries, ORMs and state stores.

```tip
`keyof` works on types, not values. For an object **value**, combine it with [typeof](node:type-queries): `keyof typeof config`.
```

```compare java
// Java has no equivalent: you'd pass a getter, like User::getName.
```

```compare kotlin
// The closest is a property reference: get(user, User::name)
```

```exercise
goal: "`K extends string` lets any text through, so `value[key]` isn't safe. Restrict `K` to the keys of `T`."
lang: typescript
code: |
  function read<T, K extends string>(value: T, key: K): T[K] {
    return value[key];
  }
  console.log(read({ score: 42 }, "score"));
checks:
  - match: 'K\s+extends\s+keyof\s+T'
    message: Use K extends keyof T.
hint: Replace string with keyof T.
solution: |
  function read<T, K extends keyof T>(value: T, key: K): T[K] {
    return value[key];
  }
  console.log(read({ score: 42 }, "score"));
```

```quiz
question: "What is `keyof { x: number; y: number }`?"
options:
  - "`number`"
  - "`\"x\" | \"y\"`"
  - "`string`"
answer: 1
explain: keyof gives a union of the property names as literal types.
```

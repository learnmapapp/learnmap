---
title: "Indexed access types"
icon: "👉"
branch: "generics"
requires: ["keyof", "type-queries"]
summary: "Reuse the type of a property or collection element."
---
You know `user["name"]` reads a property from a **value**. The same brackets on a **type** read a property's type:

```typescript
type User = {
  id: string;
  profile: { bio: string; avatarUrl: string };
  roles: ("admin" | "editor" | "viewer")[];
};

type UserId = User["id"];             // string
type Profile = User["profile"];  // { bio: string; avatarUrl: ... }
```

That's an [[indexed access]] type. It's a way of saying "whatever type that property has", so it keeps up when `User` changes.

## Five tricks with brackets

**1. Dig deeper**, by chaining:

```typescript
type Bio = User["profile"]["bio"];    // string
```

**2. Several keys at once**, with a union:

```typescript
type IdOrBio = User["id" | "profile"];   // string | { bio...; ... }
```

**3. All value types**, with [keyof](node:keyof):

```typescript
type Point = { x: number; y: number; label: string };
type PointValue = Point[keyof Point];    // number | string
```

**4. The element type of an array**, with `number`:

```typescript
type Role = User["roles"][number]; // "admin" | "editor" | ...
```

Why `number`? Arrays are indexed by numbers, so "the type at any numeric index" is the element type. This one is really common.

**5. In generics**, as in `T[K]` from the [keyof lesson](node:keyof): the type of property `K` of whatever `T` is.

## Why bother?

Without it, you'd repeat yourself:

```typescript
function setRole(user: User, role: "admin" | "editor" | "viewer") {}
```

Add a `"guest"` role to `User` and that function silently falls behind. With `role: User["roles"][number]`, there's one source of truth.

```warn
The brackets need a type inside, so it's `User["id"]` with quotes, a literal type. `User.id` with a dot is an error in a type position.
```

```compare java
// No equivalent: Java has no way to refer to "the type of field id".
```

```compare kotlin
// No equivalent either; you'd repeat the type.
```

```exercise
goal: "`Score` should be the type of the `score` property, but it reads `name`. Index the right property."
lang: typescript
code: |
  type Learner = { name: string; score: number };
  type Score = Learner["name"];
  const score: Score = 42;
  console.log(score);
checks:
  - match: 'Learner\["score"\]'
    message: "Index the type with \"score\"."
hint: Change the key inside the brackets.
solution: |
  type Learner = { name: string; score: number };
  type Score = Learner["score"];
  const score: Score = 42;
  console.log(score);
```

```quiz
question: "`type Tags = string[]`. What is `Tags[number]`?"
options:
  - "`number`"
  - "`string`"
  - "`string[]`"
answer: 1
explain: Indexing an array type with number gives the element type.
```

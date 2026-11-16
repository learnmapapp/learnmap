---
title: "Utility types"
icon: "🧰"
branch: "generics"
requires: ["mapped-types", "intersections"]
summary: "Use standard transformations before writing your own."
---
TypeScript ships with a toolbox of ready-made type transformations. You don't need to memorize them all; here's a field guide to the ones you'll actually meet, using one type throughout:

```typescript
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};
```

## `Partial<T>`: everything optional

**Spot it in the wild:** update functions, where you only send what changed.

```typescript
function updateUser(id: string, changes: Partial<User>) { /* ... */ }

updateUser("u1", { name: "Ada" });     // fine: the rest is optional
```

## `Pick<T, Keys>` and `Omit<T, Keys>`: subsets

**Spot it in the wild:** API responses that must not leak fields.

```typescript
type PublicUser = Omit<User, "password">;
// { id: string; name: string; email: string }

type Credentials = Pick<User, "email" | "password">;
```

`Pick` keeps the listed keys; `Omit` keeps everything else.

## `Record<Keys, Value>`: a lookup table

**Spot it in the wild:** maps from a fixed set of keys.

```typescript
type Role = "admin" | "editor" | "viewer";

const canPublish: Record<Role, boolean> = {
  admin: true,
  editor: true,
  viewer: false,
};
```

Forget a role and the checker tells you. `Record<string, number>` works as a general dictionary type too.

## `Readonly<T>` and `Required<T>`

All properties [readonly](node:readonly), or all of them required (the reverse of `Partial`).

## Function helpers

```typescript
function createUser(name: string, email: string) {
  return { id: crypto.randomUUID(), name, email };
}

type NewUser = ReturnType<typeof createUser>;
type CreateArgs = Parameters<typeof createUser>;   // [string, string]
type Loaded = Awaited<Promise<User>>;              // User
```

Under the hood, most of these are [mapped types](node:mapped-types) and [conditional types](node:conditional-types) that you could write yourself.

```compare kotlin
// Kotlin uses copy() for partial updates instead:
// user.copy(name = "Ada")
```

```compare java
// No equivalent: Java would need separate DTO classes.
```

```exercise
goal: "A patch only contains the fields that change, but `Patch` requires all of them. Make every property optional."
lang: typescript
code: |
  type Learner = { name: string; score: number };
  type Patch = Learner;
  const patch: Patch = { score: 42 };
  console.log(patch);
checks:
  - match: 'type\s+Patch\s*=\s*Partial<Learner>;'
    message: Use Partial<Learner>.
hint: One of the utility types makes every property optional.
solution: |
  type Learner = { name: string; score: number };
  type Patch = Partial<Learner>;
  const patch: Patch = { score: 42 };
  console.log(patch);
```

```quiz
question: "Which utility type removes the `password` field from `User`?"
options:
  - "`Pick<User, \"password\">`"
  - "`Omit<User, \"password\">`"
  - "`Partial<User>`"
answer: 1
explain: Omit drops the listed keys. Pick would keep only the password.
```

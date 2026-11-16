---
title: "Type aliases"
icon: "🏷️"
branch: "modeling"
requires: ["unions", "object-types"]
summary: "Give useful shapes and combinations a reusable name."
---
A [[type alias]] gives a name to any type. That's all it does, and it's used constantly.

```typescript
type UserId = string;
type Point = { x: number; y: number };
type Status = "active" | "banned";
type Callback = (error: Error | null) => void;
```

Each line is `type Name = <any type expression>`. After that, the name and the type are interchangeable.

## Three reasons to name a type

**1. Repetition.** If `{ x: number; y: number }` appears in ten signatures, a change means ten edits. With `Point`, it's one.

**2. Meaning.** Compare:

```typescript
function move(a: [number, number], b: number): [number, number];
function move(position: Point, distance: Meters): Point;
```

The second one documents itself.

**3. Complex types need names.** Unions, function types and the computed types later in this course get unreadable inline. Naming them breaks them into pieces.

## A limit worth knowing

An alias is **just a name**, not a new type. These two are interchangeable:

```typescript
type UserId = string;
type OrderId = string;

function cancelOrder(id: OrderId) { /* ... */ }

const user: UserId = "u-17";
cancelOrder(user);    // no error: both are just string
```

The checker sees two strings and is happy. If you need it to keep them apart, there's a pattern for that called "branded types": search for it once you're comfortable with [intersections](node:intersections).

## Aliases or interfaces?

For object types, there's also `interface`, which is the [next lesson](node:interfaces). They overlap a lot. A simple rule: use `type` for unions, functions and tuples (only aliases can do those), and pick one style for objects and stay consistent.

```compare kotlin
typealias UserId = String   // also just a name, not a new type
```

```compare go
type UserID string   // in Go this IS a new, distinct type
```

```exercise
goal: "The alias only allows numbers, but `\"ada\"` is a valid ID too. Make it accept strings as well."
lang: typescript
code: |
  type LearnerId = number;
  const id: LearnerId = "ada";
  console.log(id);
checks:
  - match: 'type\s+LearnerId\s*=\s*string\s*\|\s*number;'
    message: "Define the alias as string | number."
hint: Use a union, string first.
solution: |
  type LearnerId = string | number;
  const id: LearnerId = "ada";
  console.log(id);
```

```quiz
question: "`type Email = string`. Can you pass an `Email` where a plain `string` is expected?"
options:
  - Yes; an alias is just another name for the same type.
  - No; it's a new type.
  - Only after a cast.
answer: 0
explain: Aliases don't create new types. Email and string are completely interchangeable.
```

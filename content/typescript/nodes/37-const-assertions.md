---
title: "Const assertions"
icon: "📌"
branch: "generics"
requires: ["readonly", "literal-types"]
summary: "Retain literal precision and readonly structure for literal expressions."
---
**Myth:** "I wrote `const`, so TypeScript knows these exact values."

**Reality:** `const` only freezes the **variable**. What's inside an array or object can still change, so TypeScript widens the types:

```typescript
const directions = ["left", "right"];
// string[]: someone could push("up") later

const config = { mode: "dark", retries: 3 };
// { mode: string; retries: number }
```

Most of the time that's what you want. But sometimes you mean "these exact values, forever". That's what `as const` says:

```typescript
const directions = ["left", "right"] as const;
// readonly ["left", "right"]

const config = { mode: "dark", retries: 3 } as const;
// { readonly mode: "dark"; readonly retries: 3 }
```

A [[const assertion]] does three things at once: literal types instead of wide ones, `readonly` everywhere, and arrays become fixed [tuples](node:tuples).

**Myth:** "`as const` is just for constants. It's a style thing."

**Reality:** its killer use is deriving a union type from a list of values, so the list exists **once** and is usable at runtime too:

```typescript
const ROLES = ["admin", "editor", "viewer"] as const;
type Role = (typeof ROLES)[number];   // "admin" | "editor" | "viewer"

function isRole(value: string): value is Role {
  return (ROLES as readonly string[]).includes(value);
}

for (const role of ROLES) {           // loop over them at runtime
  console.log(role);
}
```

That's [typeof](node:type-queries) plus [indexed access](node:indexed-access) with `number`. Without `as const`, `Role` would be plain `string`.

**Myth:** "`as const` freezes the object."

**Reality:** like all types, it's gone at runtime. Nothing stops plain JavaScript from changing the array. Use `Object.freeze` if you need that.

```compare java
enum Role { ADMIN, EDITOR, VIEWER }   // values() gives the list
```

```compare kotlin
enum class Role { ADMIN, EDITOR, VIEWER }  // entries gives the list
```

```exercise
goal: "`Direction` is just `string`, because the array was widened. Keep the exact values with a const assertion."
lang: typescript
code: |
  const directions = ["left", "right"];
  type Direction = (typeof directions)[number];
  const direction: Direction = "left";
  console.log(direction);
checks:
  - match: '\["left",\s*"right"\]\s+as\s+const;'
    message: Add as const after the array literal.
hint: as const goes right after the closing bracket.
solution: |
  const directions = ["left", "right"] as const;
  type Direction = (typeof directions)[number];
  const direction: Direction = "left";
  console.log(direction);
```

```quiz
question: "What is the type of `const x = [1, 2] as const`?"
options:
  - "`number[]`"
  - "`readonly [1, 2]`"
  - "`[number, number]`"
answer: 1
explain: as const keeps the literal values, makes it readonly, and fixes the length.
```

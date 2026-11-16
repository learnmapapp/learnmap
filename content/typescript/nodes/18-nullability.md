---
title: "Nullability"
icon: "🕳️"
branch: "narrowing"
requires: ["narrowing", "optional-properties"]
summary: "Handle missing values instead of silencing their types."
---
Tony Hoare, who invented the null reference, later called it his "billion-dollar mistake". In JavaScript you get two of them: `null` and `undefined`. With [strict mode](node:tsconfig) on, TypeScript treats them as separate types, which **don't** sneak into other types. A `string` is always a real string. If it might be missing, the type says so:

```typescript
let nickname: string | null = null;     // explicitly "maybe nothing"
```

## Where they come from

You often get a "maybe nothing" without writing it yourself:

```typescript
const user = users.find(u => u.id === 7);        // User | undefined
const el = document.querySelector(".title");     // Element | null
const port = process.env.PORT;                   // string | undefined
```

All three can fail to find something, and their types are honest about it. Trying to use the result directly is an error:

```typescript
console.log(user.name);
//          ~~~~ 'user' is possibly 'undefined'.
```

## Your toolkit

**Early return**, the cleanest option for functions:

```typescript
function lengthOf(text: string | null): number {
  if (text === null) return 0;
  return text.length;            // text: string from here on
}
```

**Optional chaining `?.`** to read through a maybe-missing value. The result stays maybe-missing:

```typescript
const name = user?.name;                     // string | undefined
```

**`??` for a default**, giving you a definite value:

```typescript
const port = Number(process.env.PORT ?? "3000");
```

**The `!` operator**, which tells the checker "trust me, it's there":

```typescript
const title = document.querySelector(".title")!;
```

Use `!` sparingly. It doesn't check anything at runtime. If you're wrong, you're back to `Cannot read properties of null`.

```tip
`== null` (two equals signs) matches both `null` and `undefined`. It's the one place where many style guides allow `==`.
```

```compare kotlin
val length = text?.length ?: 0   // Kotlin's nullable types
```

```compare rust
// No null at all: Option<String> is Some(text) or None.
```

```exercise
goal: "`lengthOf(null)` crashes, because the check looks for an empty string instead of `null`. Return 0 for `null`."
lang: typescript
code: |
  function lengthOf(text: string | null): number {
    if (text === "") return 0;
    return text.length;
  }
  console.log(lengthOf(null));
checks:
  - match: 'if\s*\(text\s*===\s*null\)\s*return\s+0;'
    message: Check text === null before reading length.
hint: Compare text with null instead of "".
solution: |
  function lengthOf(text: string | null): number {
    if (text === null) return 0;
    return text.length;
  }
  console.log(lengthOf(null));
```

```quiz
question: "What's the type of `user?.name` when `user` is `User | undefined` and `name` is a `string`?"
options:
  - "`string`"
  - "`string | undefined`"
  - "`User`"
answer: 1
explain: "?. stops at a missing user and gives undefined, so the result can be either."
```

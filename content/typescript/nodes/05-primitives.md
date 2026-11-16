---
title: "Primitive types"
icon: "🔢"
branch: "basics"
requires: ["inference"]
summary: "Use string, number, and boolean rather than wrapper-object types."
---
TypeScript's everyday types are the JavaScript values you already know. Here's the full cast:

| Type | Example values |
| --- | --- |
| `string` | `"Ada"`, `` `Hi ${name}` `` |
| `number` | `42`, `3.14`, `NaN` (one type for ints and floats) |
| `boolean` | `true`, `false` |
| `bigint` | `9007199254740993n` (huge integers) |
| `null` and `undefined` | "nothing", in two flavours |
| `symbol` | unique keys; rarely needed |

All lowercase. `String` and `Number` with capitals also exist, but those are the wrapper objects: always use the lowercase versions in types.

```typescript
const title: string = "Learn TypeScript";
const lessons: number = 50;
const published: boolean = true;
```

## Where types meet reality: user input

Everything that comes from a form field, a URL or `process.argv` is a **string**, even when it looks like a number. JavaScript would happily "add" them:

```javascript
"41" + 1   // "411"
```

TypeScript stops you mixing them up unnoticed:

```typescript
const input = "42";
const score: number = input;
//    ~~~~~ Type 'string' is not assignable to type 'number'.
```

You convert explicitly, at the point where the text comes in:

```typescript
const score = Number(input);        // 42, or NaN for bad text
if (Number.isNaN(score)) {
  throw new Error(`Not a number: ${input}`);
}
```

Note that `NaN` is still a `number`, so the checker can't catch bad text for you. That check is your job.

## Escape hatches to avoid

- **`any`** turns off checking for a value, and the "off" spreads to everything it touches.
- **`unknown`** is the safe alternative for "I don't know yet". You must check it before using it, as [Unknown values](node:unknown) shows.

```compare python
score: int = int(text)   # Python converts the same way
```

```compare go
score, err := strconv.Atoi(input)   // conversion can fail
```

```exercise
goal: "`input` is text, so it can't be a `number` yet. Convert it with `Number(...)`."
lang: typescript
code: |
  const input = "42";
  const score: number = input;
  console.log(score + 1);
checks:
  - match: 'Number\(\s*input\s*\)'
    message: Use Number(input) to convert the text.
hint: Number(...) turns text into a number.
solution: |
  const input = "42";
  const score: number = Number(input);
  console.log(score + 1);
```

```quiz
question: "What is the type of `Number(\"hello\")`?"
options:
  - "`number`, holding NaN"
  - "`undefined`"
  - It's a compile error.
answer: 0
explain: Number() always returns a number. For bad text that's NaN, which you have to check for yourself.
```

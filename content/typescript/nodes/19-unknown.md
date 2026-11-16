---
title: "Unknown values"
icon: "📦"
branch: "narrowing"
requires: ["narrowing", "nullability"]
summary: "Accept an untrusted value without giving up checking."
---
TypeScript has two types for "I don't know what this is". They sound similar, and they're opposites.

**`any` says "don't check this".** Anything goes, in both directions:

```typescript
const data: any = JSON.parse(text);
data.user.name.toUpperCase();   // compiles. Might crash.
const n: number = data;         // compiles. Might be a lie.
```

Worse, `any` spreads: `data.user` is `any`, and so is everything you get from it.

**`unknown` says "check this first".** You can store and pass it, but not use it:

```typescript
const data: unknown = JSON.parse(text);
data.user;
//^^^^ 'data' is of type 'unknown'.
const n: number = data;
//    ~ Type 'unknown' is not assignable to type 'number'.
```

To use it, you [narrow](node:narrowing) it, exactly as with a union:

```typescript
function shout(value: unknown): string {
  if (typeof value !== "string") {
    throw new Error("Expected text");
  }
  return value.toUpperCase();     // value: string
}
```

## Side by side

| | `any` | `unknown` |
| --- | --- | --- |
| Can hold anything | yes | yes |
| Can call methods on it | yes, unchecked | no, narrow first |
| Can assign to a `number` | yes, unchecked | no, narrow first |
| Safe | no | yes |

## When to use `unknown`

Whenever data comes from outside your program: `JSON.parse`, `fetch`, `localStorage`, `catch (error)` blocks, messages from other windows. You genuinely don't know what's in there, and `unknown` makes you prove it. [Validating JSON](node:json-validation) builds on this.

```tip
In strict mode, the variable in `catch (error)` is `unknown` too. [Typed errors](node:typed-errors) shows how to handle it.
```

```compare kotlin
val data: Any = parse(text)  // like unknown: needs an is-check
```

```compare python
data: object = json.loads(text)  # object, not Any, forces checks
```

```exercise
goal: "`any` turns off the checker, so the `typeof` check is optional. Use `unknown` so it's required."
lang: typescript
code: |
  function shout(value: any): string {
    if (typeof value !== "string") throw new Error("Expected text");
    return value.toUpperCase();
  }
  console.log(shout("Ada"));
checks:
  - match: 'value:\s*unknown'
    message: Replace any with unknown.
hint: Only the parameter type changes; the check already narrows it.
solution: |
  function shout(value: unknown): string {
    if (typeof value !== "string") throw new Error("Expected text");
    return value.toUpperCase();
  }
  console.log(shout("Ada"));
```

```quiz
question: "`const x: unknown = 5`. Which line compiles?"
options:
  - "`x + 1`"
  - "`if (typeof x === \"number\") x + 1`"
  - "`const y: number = x`"
answer: 1
explain: Inside the typeof check, x is narrowed to number. Without a check, unknown can't be used.
```

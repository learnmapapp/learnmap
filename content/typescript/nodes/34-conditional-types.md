---
title: "Conditional types"
icon: "🔱"
branch: "generics"
requires: ["generics", "unions"]
summary: "Choose a result type based on a type relationship."
---
**Fair warning:** this is the deep end. Conditional types power a lot of library code, and you'll read them more often than you write them. If your app code needs a lot of these, simpler types are usually the better answer.

That said, the core idea is one line. It's a ternary operator, for types:

```typescript
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<"hello">;   // "yes"
type B = IsString<42>;        // "no"
```

`T extends string ? X : Y` asks: "is `T` assignable to `string`? Then the type is `X`, otherwise `Y`." Here, `extends` means "fits into", the same as in [constraints](node:generic-constraints).

## A practical one

A function that returns a different type depending on its input:

```typescript
type Parsed<T> = T extends "number" ? number
               : T extends "boolean" ? boolean
               : string;

declare function readEnv<T extends "number" | "boolean" | "string">(
  name: string,
  as: T,
): Parsed<T>;

const port = readEnv("PORT", "number");     // number
const debug = readEnv("DEBUG", "boolean");  // boolean
```

They chain like nested ternaries.

## The surprise: unions get split up

When `T` is a union, the condition runs **for each member separately**, and the results are joined again:

```typescript
type NonNull<T> = T extends null | undefined ? never : T;

type A = NonNull<string | null | number>;
// string extends null|undefined? no  -> string
// null   extends null|undefined? yes -> never
// number extends null|undefined? no  -> number
// result: string | number
```

`never` disappears in a union, so this filters out members. That's exactly how the built-in `NonNullable<T>` and `Exclude<T, U>` work.

```tip
Hover over a conditional type with real arguments in your editor. Seeing the result is the fastest way to understand one.
```

```compare java
// No equivalent: Java generics can't branch on a type.
```

```compare rust
// Rust gets similar effects with traits and associated types.
```

```exercise
goal: "`Label<string>` should be `\"text\"`, but the condition tests for numbers. Test for `string` instead."
lang: typescript
code: |
  type Label<T> = T extends number ? "text" : "other";
  const label: Label<string> = "text";
  console.log(label);
checks:
  - match: 'T\s+extends\s+string'
    message: "Test whether T extends string."
hint: Change the type after extends.
solution: |
  type Label<T> = T extends string ? "text" : "other";
  const label: Label<string> = "text";
  console.log(label);
```

```quiz
question: "With `type F<T> = T extends string ? T : never`, what is `F<\"a\" | 1 | \"b\">`?"
options:
  - "`never`"
  - "`\"a\" | \"b\"`"
  - "`\"a\" | 1 | \"b\"`"
answer: 1
explain: Each member is checked separately. 1 becomes never, which drops out of the union.
```

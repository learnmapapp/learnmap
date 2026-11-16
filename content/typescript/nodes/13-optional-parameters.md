---
title: "Optional parameters"
icon: "🎛️"
branch: "functions"
requires: ["function-types", "optional-properties"]
summary: "Make omitted arguments explicit and use defaults where useful."
---
JavaScript lets you call any function with fewer arguments; the missing ones are just `undefined`. TypeScript counts arguments, so you have to say which ones may be left out. There are two ways, and the difference is who supplies the fallback.

## Option A: `?`, the caller may skip it

```typescript
function greet(name: string, title?: string): string {
  if (title === undefined) {
    return `Hello, ${name}`;
  }
  return `Hello, ${title} ${name}`;
}

greet("Ada");               // "Hello, Ada"
greet("Ada", "Countess");   // "Hello, Countess Ada"
```

Inside the function, `title` is `string | undefined`, so the checker makes you deal with the missing case.

## Option B: a default value

```typescript
function multiply(value: number, factor = 2): number {
  return value * factor;
}

multiply(21);       // 42
multiply(21, 3);    // 63
```

A default does two jobs: the parameter becomes optional for callers, and **inside** the function it's always a plain `number`. No undefined checks needed. The type is inferred from the default, so `factor = 2` is enough.

## Which one?

| You want... | Use |
| --- | --- |
| a sensible fallback value | a default: `factor = 2` |
| to behave differently when it's missing | `?`, then check for `undefined` |

## The ordering rule

Optional parameters must come **after** required ones, because arguments are matched by position:

```typescript
function bad(title?: string, name: string) {}
//                           ~~~~ A required parameter cannot
//                                follow an optional parameter.
```

When a function collects several optional settings, switch to a single options object with [optional properties](node:optional-properties). `connect({ retries: 3 })` reads better than `connect(undefined, undefined, 3)`.

```compare python
def multiply(value: int, factor: int = 2) -> int:
    return value * factor
```

```compare kotlin
fun multiply(value: Int, factor: Int = 2) = value * factor
```

```exercise
goal: "`multiply(21)` fails because `factor` is required. Give it a default of 2."
lang: typescript
code: |
  function multiply(value: number, factor: number): number {
    return value * factor;
  }
  console.log(multiply(21));
checks:
  - match: 'factor\s*=\s*2'
    message: Give factor a default of 2.
hint: "Replace the annotation with = 2; the type is inferred from the default."
solution: |
  function multiply(value: number, factor = 2): number {
    return value * factor;
  }
  console.log(multiply(21));
```

```quiz
question: "In `function f(limit = 10)`, what's the type of `limit` inside the function body?"
options:
  - "`number | undefined`"
  - "`number`"
  - "`10`"
answer: 1
explain: The default fills in any missing value, so inside the function limit is always a number.
```

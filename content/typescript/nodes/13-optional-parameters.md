---
title: "Optional parameters"
icon: "🎛️"
branch: "functions"
requires: ["function-types", "optional-properties"]
summary: "Make omitted arguments explicit and use defaults where useful."
---

An optional parameter may be omitted, and its value can be `undefined` inside the function:

```typescript
function greet(name: string, punctuation?: string): string {
  return `Hello, ${name}${punctuation ?? "!"}`;
}
console.log(greet("Ada"));
```

A default is often more direct when there is one natural fallback:

```typescript
function multiply(value: number, factor = 2): number {
  return value * factor;
}
console.log(multiply(21)); // 42
```

Default initializers apply to omitted or `undefined` arguments, not to explicit `null`. Required parameters normally belong before optional parameters so callers have a clear positional interface.

## Callbacks need an accurate contract

Do not mark a callback parameter optional just because the callback implementation may choose not to use it. An optional parameter means the caller is allowed to omit it. For example, a callback that always receives an index should declare that index as required, even if some callback implementations accept fewer parameters.

Use an options object when several optional positional arguments become difficult to read.

```exercise
goal: Default factor to two so `multiply(21)` is valid.
lang: typescript
code: |
  function multiply(value: number, factor: number): number {
    return value * factor;
  }
  console.log(multiply(21));
checks:
  - match: factor\s+=\s+2
    message: Give factor a default of 2.
hint: Give factor a default of 2.
```

```quiz
question: When does a default parameter initializer apply?
options:
  - For every falsy argument.
  - Only for `null`.
  - When omitted or passed undefined.
answer: 2
explain: Zero, `false`, and an empty string are valid supplied values; they do not trigger defaults.
```

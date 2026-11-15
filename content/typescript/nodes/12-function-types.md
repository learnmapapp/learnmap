---
title: "Function types"
icon: "☎️"
branch: "functions"
requires: ["functions"]
summary: "Treat callbacks as values with their own call signatures."
---

Functions are values, so their types can describe arguments and results independently of an implementation:

```typescript
type Transform = (value: number) => number;

function apply(value: number, transform: Transform): number {
  return transform(value);
}
console.log(apply(21, value => value * 2));
```

The callback's `value` parameter is contextually typed as `number`. You do not need to repeat an annotation that the surrounding contract already supplies.

## Return-value intent

A callback typed as returning `void` means its caller ignores the result. A function returning a value can often fill that role; this is useful for callbacks that perform work such as array insertion.

```typescript
const record: (value: string) => void = value => console.log(value);
record("finished");
```

Avoid the broad `Function` type. It does not express the argument and return relationship that makes a callback safe to call.

A function type uses `=>` between its parameter list and return type. That syntax describes a callable value; it does not execute or create a function by itself.

```exercise
goal: "Make the callback return type match a numeric transformation."
lang: typescript
code: |
  type Transform = (value: number) => string;
  const double: Transform = value => value * 2;
  console.log(double(21));
checks:
  - match: "=>\\s+number"
    message: "The callback returns a number, so use => number."
hint: "The callback returns a number, so use => number."
```

```quiz
question: "What does (value: number) => string describe?"
options:
  - "An immediately executed conversion."
  - "A function accepting a number and returning a string."
  - "An object with a property called value."
answer: 1
explain: "A function type describes a call signature."
```

---
title: "Literal types"
icon: "🚦"
branch: "narrowing"
requires: ["unions", "object-types"]
summary: "Use exact values to describe a finite set of choices."
---

A literal type is one particular value. Combining literals makes an explicit menu of allowed choices:

```typescript
type Direction = "left" | "right";
function move(direction: Direction): string {
  return `Moving ${direction}`;
}
console.log(move("left"));
```

`"up"` is a string, but it is not a `Direction`. Literal unions make misspellings visible and give editors useful completion choices.

## Widening can lose precision

An object's properties are mutable unless constrained, even when its binding is `const`. A property initialized with `"left"` may infer `string`, making it too broad for `Direction`.

```typescript
const settings: { direction: Direction } = { direction: "left" };
console.log(move(settings.direction));
```

Annotate the intended contract, or use a [const assertion](node:const-assertions) when the value should retain narrow literal information.

Literal unions work well for a finite set of statuses, commands, or variants. Do not use an unrestricted string if the program actually supports only a few named cases.

```exercise
goal: "Add queued to the allowed status values."
lang: typescript
code: |
  type Status = "done";
  const status: Status = "queued";
  console.log(status);
checks:
  - match: "\"queued\"\\s+\\|\\s+\"done\""
    message: "Use the union \"queued\" | \"done\"."
hint: "Use the union \"queued\" | \"done\"."
```

```quiz
question: Is every string assignable to `"left" | "right"`?
options:
  - Yes, because both members are strings.
  - No, only those exact values are accepted.
  - Only if it is stored with const.
answer: 1
explain: A union of string literals is narrower than the general string type.
```

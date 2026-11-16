---
title: "Template literal types"
icon: "🧵"
branch: "generics"
requires: ["literal-types", "keyof"]
summary: "Build finite string contracts from other literal types."
---
You know template strings: `` `user:${id}` ``. TypeScript has the same syntax **for types**, and it builds string literal types:

```typescript
type Size = "sm" | "md" | "lg";
type Side = "top" | "bottom";

type Margin = `margin-${Side}`;
// "margin-top" | "margin-bottom"

type Spacing = `${Side}-${Size}`;
// "top-sm" | "top-md" | "top-lg" | "bottom-sm" | ...
```

Unions get **multiplied out**: every combination appears. Two sides and three sizes give six names.

## A typed event system

Here's where it's handy. Say an app emits events named `entity:action`:

```typescript
type Entity = "user" | "order";
type Action = "created" | "deleted";
type EventName = `${Entity}:${Action}`;

function on(event: EventName, handler: () => void) { /* ... */ }

on("user:created", refresh);      // fine, with autocomplete
on("user:updated", refresh);
//  ~~~~~~~~~~~~~ Argument of type '"user:updated"' is not
//                assignable to parameter of type 'EventName'.
```

Add an entity, and every valid event name appears automatically.

## Patterns, not just lists

A template with a plain `string` or `number` inside matches a whole family:

```typescript
type CssPixels = `${number}px`;

const ok: CssPixels = "12px";
const bad: CssPixels = "12em";
//    ~~~ Type '"12em"' is not assignable to type '`${number}px`'.

type DataAttribute = `data-${string}`;
```

There are also four built-in helpers for case: `Uppercase`, `Lowercase`, `Capitalize` and `Uncapitalize`:

```typescript
type Handler = `on${Capitalize<EventName>}`;
// "onUser:created" | ...
```

```compare java
// No equivalent; you'd use an enum per event.
```

```compare python
# No equivalent; Literal types can't be combined like this.
```

```exercise
goal: "The events in this app start with `lesson:`, not `course:`. Fix the template so `\"lesson:start\"` is allowed."
lang: typescript
code: |
  type Phase = "start" | "finish";
  type EventName = `course:${Phase}`;
  const event: EventName = "lesson:start";
  console.log(event);
checks:
  - match: '`lesson:\$\{Phase\}`'
    message: "Use the lesson: prefix in the template type."
hint: Only the text before ${Phase} changes.
solution: |
  type Phase = "start" | "finish";
  type EventName = `lesson:${Phase}`;
  const event: EventName = "lesson:start";
  console.log(event);
```

```quiz
question: "How many members does `` `${\"a\" | \"b\"}-${1 | 2 | 3}` `` have?"
options:
  - "2"
  - "5"
  - "6"
answer: 2
explain: Every combination of the two unions is produced, so 2 × 3 = 6.
```

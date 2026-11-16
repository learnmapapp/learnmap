---
title: "Mapped types"
icon: "🗺️"
branch: "generics"
requires: ["indexed-access"]
summary: "Transform every property of a known shape."
---

A [[mapped type]] walks over a union of keys and constructs a new object type:

```typescript
type Flags<T> = { [K in keyof T]: boolean };
type Learner = { name: string; score: number };
const changed: Flags<Learner> = { name: true, score: false };
console.log(changed);
```

Each property keeps its key but receives a boolean value type. The input object is not transformed at runtime; this defines the shape of a separate value.

## Modifiers can change too

```typescript
type Editable<T> = { -readonly [K in keyof T]-?: T[K] };
type Draft = { readonly title?: string };
const complete: Editable<Draft> = { title: "Types" };
console.log(complete.title);
```

`-readonly` removes the `readonly` modifier and `-?` removes optionality. A mapped type over `keyof T` normally preserves those modifiers unless you change them.

Use these transformations for related contracts, not to hide a complicated API behind layers of unreadable machinery. The standard library already supplies many common versions as [utility types](node:utility-types).

```exercise
goal: "Map every property to boolean flags."
lang: typescript
code: |
  type Flags<T> = { [K in keyof T]: string };
  const changed: Flags<{ name: string; score: number }> = { name: true, score: false };
  console.log(changed);
checks:
  - match: "\\]:\\s+boolean"
    message: "Use boolean as the mapped property value type."
hint: "Use boolean as the mapped property value type."
```

```quiz
question: Does a mapped type copy an object at runtime?
options:
  - Yes.
  - No, it constructs a static type.
  - Only when it uses `keyof`.
answer: 1
explain: Mapped types are erased; actual value transformation still needs JavaScript.
```

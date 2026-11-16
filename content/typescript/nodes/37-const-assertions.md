---
title: "Const assertions"
icon: "📌"
branch: "generics"
requires: ["readonly", "literal-types"]
summary: "Retain literal precision and readonly structure for literal expressions."
---

A [[const assertion]] keeps literal information that normal inference might widen:

```typescript
const directions = ["left", "right"] as const;
type Direction = (typeof directions)[number];
const direction: Direction = "left";
console.log(direction);
```

The array is inferred as a `readonly` tuple with those exact elements. Object literal properties also become `readonly` in the inferred type.

## Static precision, not a runtime freeze

```typescript
const settings = { mode: "read", retries: 3 } as const;
function open(mode: "read" | "edit"): string {
  return `Opening ${mode}`;
}
console.log(open(settings.mode));
```

`as const` applies to suitable literal expressions. It does not recursively freeze independently referenced objects or call `Object.freeze`. An alias to shared mutable state can still change that state.

Use const assertions for static lookup tables, literal menus, and fixed tuples. If the value must also conform to a named broader shape while preserving useful inference, combine the literal with [satisfies](node:satisfies).

```exercise
goal: Preserve the exact direction values as a `readonly` tuple.
lang: typescript
code: |
  const directions = ["left", "right"];
  type Direction = (typeof directions)[number];
  const direction: Direction = "left";
  console.log(direction);
checks:
  - match: \["left",\s+"right"\]\s+as\s+const;
    message: Add as const after the array literal.
hint: Add as const after the array literal.
```

```quiz
question: What does `["left", "right"] as const` infer?
options:
  - A mutable string array.
  - A `readonly` tuple retaining both literal values.
  - A runtime Set.
answer: 1
explain: The assertion preserves literal values and `readonly` tuple structure.
```

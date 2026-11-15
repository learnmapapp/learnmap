---
title: "Nullability"
icon: "🕳️"
branch: "narrowing"
requires: ["narrowing", "optional-properties"]
summary: "Handle missing values instead of silencing their types."
---

Under strict null checking, a possibly missing value must be handled before use:

```typescript
function lengthOf(text: string | null): number {
  if (text === null) return 0;
  return text.length;
}
console.log(lengthOf(null)); // 0
```

`null` and `undefined` are separate types. A deliberate `value == null` check excludes both because of JavaScript's equality rules; explicit comparisons can be clearer when only one is relevant.

## Convenience with a cost

Optional chaining skips work on a nullish receiver:

```typescript
const settings: { label?: string } = {};
const length = settings.label?.length ?? 0;
console.log(length);
```

The non-null assertion `value!` removes nullish possibilities from the static view without checking anything at runtime. Use a real guard when the value might actually be missing.

Do not treat absence as an error automatically. Sometimes a fallback is the right contract; sometimes the function should reject the missing input. Make that choice visible in code and in the return type.

```compare kotlin
fun lengthOf(text: String?): Int = text?.length ?: 0
```

```compare javascript
function lengthOf(text) { return text?.length ?? 0; }
```

```exercise
goal: "Return zero when text is null before reading its length."
lang: typescript
code: |
  function lengthOf(text: string | null): number {
    if (text === "") return 0;
    return text.length;
  }
  console.log(lengthOf(null));
checks:
  - match: "if\\s+\\(text\\s+===\\s+null\\)\\s+return\\s+0;"
    message: "Check text === null before the property access."
hint: "Check text === null before the property access."
```

```quiz
question: "What runtime check does value! perform?"
options:
  - "It throws if the value is null."
  - "None; it only changes the static view."
  - "It inserts a default object."
answer: 1
explain: "The non-null assertion is erased and offers no runtime protection."
```

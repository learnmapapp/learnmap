---
title: "Optional properties"
icon: "❔"
branch: "basics"
requires: ["object-types"]
summary: "Mark possible absence and choose a fallback without losing zero."
---
**Scenario:** user profiles. Everyone has a name, but not everyone has filled in a bio or a nickname. A `?` marks a property as optional:

```typescript
type Profile = {
  name: string;
  nickname?: string;
  age?: number;
};

const ada: Profile = { name: "Ada" };              // fine
const bob: Profile = { name: "Bob", age: 0 };      // also fine
```

## What `?` changes when you read it

An optional property's type includes `undefined`. So the checker won't let you use it as if it were definitely there:

```typescript
ada.nickname.toUpperCase();
//  ~~~~~~~~ 'ada.nickname' is possibly 'undefined'.
```

You have three tools for that:

```typescript
// 1. Check first.
if (ada.nickname !== undefined) {
  console.log(ada.nickname.toUpperCase());   // a string in here
}

// 2. Optional chaining: stop if it's missing.
ada.nickname?.toUpperCase();                 // string | undefined

// 3. A default with ??
const shown = ada.nickname ?? ada.name;      // string
```

## The `||` trap

Older code often uses `||` for defaults. Here's why `??` is better:

```typescript
const age = bob.age || 18;   // 18! Bob's real age, 0, is lost
const age2 = bob.age ?? 18;  // 0: only null/undefined use 18
```

`||` falls back on **any** falsy value: `0`, `""`, `false`. `??` falls back only for [[nullish]] values, `null` and `undefined`, which is what "missing" really means.

```tip
Use `?` when the property may genuinely be absent. If it's always there but sometimes empty, consider a required property with a value like `""` or `null`. Then every place that creates the object has to decide.
```

```compare kotlin
val nickname: String? = null
val shown = nickname ?: name     // Kotlin's elvis operator
```

```compare python
nickname: str | None = None
shown = nickname if nickname is not None else name
```

```exercise
goal: "A score of 0 is real, but `||` replaces it with 10. Default only when the score is missing."
lang: typescript
code: |
  const learner: { score?: number } = { score: 0 };
  const score = learner.score || 10;
  console.log(score);
checks:
  - match: 'learner\.score\s*\?\?\s*10'
    message: "Use ?? so zero is preserved."
hint: There's an operator that only falls back for null and undefined.
solution: |
  const learner: { score?: number } = { score: 0 };
  const score = learner.score ?? 10;
  console.log(score);
```

```quiz
question: "What is `\"\" ?? \"guest\"`?"
options:
  - "`\"guest\"`"
  - "`\"\"`"
  - "`undefined`"
answer: 1
explain: The empty string isn't null or undefined, so ?? keeps it. With || you'd get "guest".
```

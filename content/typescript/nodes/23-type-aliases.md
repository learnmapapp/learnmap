---
title: "Type aliases"
icon: "🏷️"
branch: "modeling"
requires: ["unions", "object-types"]
summary: "Give useful shapes and combinations a reusable name."
---

A [[type alias]] names a type expression:

```typescript
type LearnerId = string | number;
type Learner = { id: LearnerId; name: string };

function display(learner: Learner): string {
  return `${learner.id}: ${learner.name}`;
}
console.log(display({ id: 1, name: "Ada" }));
```

Aliases can name objects, unions, tuples, primitives, and more complex transformations. They make repeated contracts easier to read and update.

## Names do not create runtime objects

`Learner` is not a constructor or a validator. It disappears during compilation. Calling `Learner(...)` would be an error unless you also separately defined a runtime value with that name.

An alias usually does not create a nominal distinction. If `LearnerId` and `CourseId` are both aliases of `string`, plain strings are compatible with both. A distinct brand requires an additional modeling technique and a trustworthy construction boundary.

Use a name when it expresses a real domain idea. Avoid aliases that merely rename a primitive everywhere without clarifying what values mean.

```exercise
goal: "Make LearnerId accept text as well as numeric identifiers."
lang: typescript
code: |
  type LearnerId = number;
  const id: LearnerId = "ada";
  console.log(id);
checks:
  - match: "type\\s+LearnerId\\s+=\\s+string\\s+\\|\\s+number;"
    message: "Define the alias as string | number."
hint: "Define the alias as string | number."
```

```quiz
question: Does `type Learner = ...` create a runtime validator?
options:
  - Yes.
  - No, it only names a static type.
  - Only if exported.
answer: 1
explain: Type aliases are erased and do not create runtime behavior.
```

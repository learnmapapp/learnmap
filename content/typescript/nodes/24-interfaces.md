---
title: "Interfaces"
icon: "📐"
branch: "modeling"
requires: ["type-aliases"]
summary: "Name object contracts and extend them with additional fields."
---

An [[interface]] names an object contract. Interfaces can extend other interfaces:

```typescript
interface Named {
  name: string;
}
interface Learner extends Named {
  score: number;
}
const learner: Learner = { name: "Ada", score: 42 };
console.log(learner.name);
```

A type alias can express a similar object shape. Interfaces emphasize object contracts; aliases can also express unions and other type expressions that interfaces do not directly name.

## Declaration merging

Interfaces with the same name in the same relevant scope can merge. This supports extending some library contracts, but accidental duplicate declarations can also enlarge a contract unexpectedly. A type alias cannot be reopened in the same way.

Choose the form that best fits the contract and the project's conventions. Do not assume using an interface makes an object nominal or changes its JavaScript representation. The checker still compares ordinary object shapes structurally.

A class can declare that it implements an interface, but the interface itself does not contain executable method implementations.

```compare go
type Speaker interface { Speak(name string) string }
```

```compare java
interface Speaker { String speak(String name); }
```

```exercise
goal: "Extend Named so Learner also requires a name."
lang: typescript
code: |
  interface Named { name: string; }
  interface Learner { score: number; }
  const learner: Learner = { name: "Ada", score: 42 };
  console.log(learner.name);
checks:
  - match: "interface\\s+Learner\\s+extends\\s+Named\\s+\\{"
    message: "Use interface Learner extends Named."
hint: "Use interface Learner extends Named."
```

```quiz
question: "Which type declaration can be reopened through declaration merging?"
options:
  - "An interface."
  - "Every type alias."
  - "Only a primitive literal."
answer: 0
explain: "Compatible interface declarations can merge; a type alias cannot be reopened that way."
```

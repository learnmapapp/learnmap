---
title: "Template literal types"
icon: "🧵"
branch: "generics"
requires: ["literal-types", "keyof"]
summary: "Build finite string contracts from other literal types."
---

Template literal types combine literal strings into a new set of possible strings:

```typescript
type Phase = "start" | "finish";
type EventName = `lesson:${Phase}`;
const event: EventName = "lesson:start";
console.log(event);
```

The value still behaves like an ordinary string at runtime. The type constrains which strings checked callers can supply.

## Connect names to object keys

```typescript
type ChangeEvent<T> = `${Extract<keyof T, string>}Changed`;
type Learner = { name: string; score: number };
const changeEvent: ChangeEvent<Learner> = "scoreChanged";
console.log(changeEvent);
```

`Extract` excludes keys that cannot participate as string literals in this contract. Intrinsic types such as `Uppercase`, `Lowercase`, and `Capitalize` can transform literal strings further.

Keep the set comprehensible. Large unions can expand into many combinations and slow down tooling. A literal pattern is also not a runtime parser: external strings still need to be checked or decoded before being trusted as this contract.

```exercise
goal: "Allow lesson:start as a valid event name."
lang: typescript
code: |
  type Phase = "start" | "finish";
  type EventName = `course:${Phase}`;
  const event: EventName = "lesson:start";
  console.log(event);
checks:
  - match: "`lesson:\\$\\{Phase\\}`"
    message: "Use the lesson: prefix in the template literal type."
hint: "Use the lesson: prefix in the template literal type."
```

```quiz
question: "Does a template literal type validate an incoming network string at runtime?"
options:
  - "Yes."
  - "No, it is a static string constraint."
  - "Only when the string contains a colon."
answer: 1
explain: "Template literal types are erased; runtime data still needs validation."
```

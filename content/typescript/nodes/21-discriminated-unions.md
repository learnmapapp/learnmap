---
title: "Tagged unions"
icon: "🚥"
branch: "modeling"
requires: ["literal-types", "narrowing", "object-types"]
summary: "Keep each state and its valid data together."
---

A [[discriminated union]] uses a shared property whose literal value identifies each variant:

```typescript
type LoadState =
  | { status: "loading" }
  | { status: "ready"; names: string[] }
  | { status: "failed"; message: string };

function describe(state: LoadState): string {
  switch (state.status) {
    case "loading": return "Loading";
    case "ready": return state.names.join(", ");
    case "failed": return state.message;
  }
}
console.log(describe({ status: "ready", names: ["Ada"] }));
```

Checking `status` narrows the entire object, including which other properties are available. A loading state does not need a fake empty result or error string.

## Model valid combinations

An object with unrelated `loading`, `error`, and `data` properties can represent contradictory combinations. A union makes the supported states explicit and gives each state only its relevant data.

Keep the discriminator available when narrowing. Storing loosely related fields in separate variables can obscure their relationship. This pattern works well for async results, editor modes, and commands with different payloads.

```exercise
goal: "Read the successful payload only in the ready variant."
lang: typescript
code: |
  type Result = { status: "ready"; value: number } | { status: "failed"; message: string };
  function describe(result: Result): string {
    if (result.status === "failed") return String(result.value);
    return result.message;
  }
checks:
  - match: "result\\.status\\s+===\\s+\"ready\""
    message: "Narrow the ready variant before reading value."
hint: "Narrow the ready variant before reading value."
```

```quiz
question: "What makes status a discriminator here?"
options:
  - "Every variant has a distinct literal value for it."
  - "Its name must literally be status."
  - "It is always a boolean."
answer: 0
explain: "A shared property with distinct literal types lets the checker identify a variant."
```

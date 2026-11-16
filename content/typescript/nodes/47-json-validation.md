---
title: "Validating JSON"
icon: "🛂"
branch: "applications"
requires: ["unknown", "discriminated-unions"]
summary: "Decode untrusted data into a trustworthy application contract."
---

Parsing JSON checks syntax, not your application's shape. Treat the parsed result as `unknown`, then inspect it:

```typescript
type Learner = { name: string; score: number };
function decodeLearner(value: unknown): Learner {
  if (
    typeof value !== "object" || value === null ||
    !("name" in value) || typeof value.name !== "string" ||
    !("score" in value) || typeof value.score !== "number" ||
    !Number.isFinite(value.score)
  ) {
    throw new Error("Invalid learner");
  }
  return { name: value.name, score: value.score };
}
const raw: unknown = JSON.parse('{"name":"Ada","score":42}');
console.log(decodeLearner(raw));
```

The function returns a fresh object containing validated fields. Extra incoming fields do not become part of its result.

## Validate meaningful constraints

A numeric field can still be negative or outside your domain's range. Add those rules when the contract needs them. Arrays need element validation as well as an outer array check.

For larger schemas, a runtime validation library can reduce repetition. Regardless of the tool, connect the returned static type to checks that really run rather than asserting the input into the desired type.

```exercise
goal: "Reject non-string names rather than trusting an assertion."
lang: typescript
code: |
  function decodeName(value: unknown): string {
    if (typeof value === "string") throw new Error("Expected name");
    return value;
  }
  console.log(decodeName("Ada"));
checks:
  - match: "typeof\\s+value\\s+!==\\s+\"string\""
    message: "Reject the value when typeof value is not string."
hint: "Reject the value when typeof value is not string."
```

```quiz
question: Does `JSON.parse` prove that a response contains a numeric score?
options:
  - Yes, JSON is already typed.
  - No, it only parses valid JSON syntax.
  - Only for objects.
answer: 1
explain: The application must check the fields it depends on after parsing.
```

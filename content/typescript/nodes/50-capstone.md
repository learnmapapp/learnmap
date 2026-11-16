---
title: "A typed API client"
icon: "🚢"
branch: "applications"
requires: ["json-validation", "typed-errors", "modules", "testing-types"]
summary: "Combine runtime decoding with an honest asynchronous result."
---

Build a small client whose successful result always contains validated data. This example uses a simulated response so it runs without a server:

```typescript
type Learner = { name: string; score: number };
type Result = { ok: true; learner: Learner } | { ok: false; message: string };

function decode(value: unknown): Learner {
  if (typeof value !== "object" || value === null ||
      !("name" in value) || typeof value.name !== "string" ||
      !("score" in value) || typeof value.score !== "number" ||
      !Number.isFinite(value.score)) {
    throw new Error("Invalid learner");
  }
  return { name: value.name, score: value.score };
}

async function loadLearner(read: () => Promise<unknown>): Promise<Result> {
  try {
    return { ok: true, learner: decode(await read()) };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Load failed" };
  }
}
loadLearner(async () => ({ name: "Ada", score: 42 }))
  .then(result => console.log(result.ok ? result.learner.name : result.message));
```

## Turn it into a project

Move the decoder, result types, and client into separate modules. For a fetch adapter, check `response.ok`, read JSON as `unknown`, and let the decoder establish the application type. A response annotation alone is insufficient.

Test a valid record, invalid fields, a malformed response, and a rejected read. Type-check consumers so they handle both result variants. Add cancellation or domain-specific validation when your real application needs those contracts.

```exercise
goal: Read external input as `unknown` so decoding remains necessary.
lang: typescript
code: |
  async function readValue(read: () => Promise<any>): Promise<unknown> {
    return await read();
  }
  readValue(async () => ({ name: "Ada", score: 42 })).then(value => console.log(value));
checks:
  - match: read:\s+\(\)\s+=>\s+Promise<unknown>
    message: Use Promise<unknown> at the untrusted read boundary.
hint: Use `Promise<unknown>` at the untrusted read boundary.
```

```quiz
question: Which part establishes that `unknown` input really fits Learner?
options:
  - The Promise annotation alone.
  - The runtime decoder checks.
  - The filename extension.
answer: 1
explain: The decoder connects runtime validation to the returned static contract.
```

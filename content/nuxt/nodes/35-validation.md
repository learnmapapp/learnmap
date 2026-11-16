---
title: Validate request input
icon: 🛠️
branch: server
requires:
  - http-methods
summary: Treat request bodies as unknown and validate before using them.
---

In your Nuxt 4 project, save this as `server/api/tasks.post.ts`. Treat request bodies as `unknown` and validate before using them. This example returns a validated task but does not persist it.

```typescript
export default defineEventHandler(async (event) => {
  const body: unknown = await readBody(event);
  if (typeof body !== "object" || body === null || !("title" in body) ||
      typeof body.title !== "string" || body.title.trim().length === 0) {
    throw createError({ statusCode: 400, statusMessage: "Title required" });
  }
  return { title: body.title.trim(), done: false };
});
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about validate request input.
lang: typescript
code: |-
  export default defineEventHandler(async (event) => {
    const body: unknown = await readBody(event);
    if (typeof body !== "object" || body === null || !("title" in body) ||
        typeof body.title !== "string" || body.title.trim().length === 0) {
      throw createError({ statusCode: 500, statusMessage: "Title required" });
    }
    return { title: body.title.trim(), done: false };
  });
checks:
  - match: statusCode:\s+400
    message: "Use statusCode: 400 for this step."
  - notMatch: statusCode:\s+500
    message: "Replace statusCode: 500 in the starting code."
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: "Does `readBody<{ title: string }>(event)` validate an incoming title at runtime?"
options:
  - Yes; every malformed field is automatically rejected.
  - Only when the body is JSON.
  - No; the type argument alone performs no runtime checks.
answer: 2
explain: Read untrusted input as `unknown` and check its required runtime shape.
```

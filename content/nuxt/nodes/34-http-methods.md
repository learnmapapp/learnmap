---
title: Method-specific handlers
icon: 📦
branch: server
requires:
  - server-routes
summary: The .post.ts suffix selects POST requests.
---

In your Nuxt 4 project, save this as `server/api/tasks.post.ts`. The .post.ts suffix selects POST requests. Reading a body does not validate its runtime shape; the next lesson adds explicit validation.

```typescript
export default defineEventHandler(async (event) => {
  const body = await readBody<{ title?: string }>(event);
  return { received: body.title ?? "" };
});
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about method-specific handlers.
lang: typescript
code: |-
  export default defineEventHandler(async (event) => {
    const body = await readBody<{ title?: string }>(event);
    return { received: body.title ?? "Unknown" };
  });
checks:
  - match: body\.title\s+\?\?\s+""
    message: Use body.title ?? "" for this step.
  - notMatch: body\.title\s+\?\?\s+"Unknown"
    message: Replace body.title ?? "Unknown" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about method-specific handlers is correct?
options:
  - .post.ts automatically accepts only GET requests.
  - The .post.ts suffix selects POST requests. Reading a body does not validate its runtime shape;
    the next lesson adds explicit validation.
  - A TypeScript annotation validates all incoming JSON at runtime.
answer: 1
explain: The .post.ts suffix selects POST requests. Reading a body does not validate its runtime
  shape; the next lesson adds explicit validation.
```

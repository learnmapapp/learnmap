---
title: Response middleware
icon: 🧩
branch: server
requires:
  - server-rendering
summary: Middleware can inspect requests and transform responses.
---

In your Astro project, save this as `src/middleware.ts`. Middleware can inspect requests and transform responses. In a static build its work happens during prerendering; live request behavior needs a server deployment.

```typescript
import { defineMiddleware } from "astro:middleware";
export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  response.headers.set("X-Study-Site", "learnmap");
  return response;
});
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about response middleware.
lang: typescript
code: |-
  import { defineMiddleware } from "astro:middleware";
  export const onRequest = defineMiddleware(async (_context, next) => {
    const response = await next();
    response.headers.set("X-Study-Site", "unknown");
    return response;
  });
checks:
  - match: '"X\-Study\-Site",\s+"learnmap"'
    message: Use "X-Study-Site", "learnmap" for this step.
  - notMatch: '"X\-Study\-Site",\s+"unknown"'
    message: Replace "X-Study-Site", "unknown" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about response middleware is correct?
options:
  - Middleware can inspect requests and transform responses. In a static build its work happens
    during prerendering; live request behavior needs a server deployment.
  - Middleware always runs in the visitor’s browser.
  - Static hosting supplies a new server execution for every request.
answer: 0
explain: Middleware can inspect requests and transform responses. In a static build its work happens
  during prerendering; live request behavior needs a server deployment.
```

---
title: JSON endpoints
icon: 🔁
branch: server
requires:
  - routes
summary: An endpoint returns a Response rather than page markup.
---

In your Astro project, save this as `src/pages/api/status.json.ts`. An endpoint returns a Response rather than page markup. With static output this GET can be prerendered; request-specific endpoints need on-demand rendering.

```typescript
import type { APIRoute } from "astro";
export const GET: APIRoute = () => Response.json({ status: "ready" });
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about json endpoints.
lang: typescript
code: |-
  import type { APIRoute } from "astro";
  export const GET: APIRoute = () => Response.json({ status: "waiting" });
checks:
  - match: status:\s+"ready"
    message: 'Use status: "ready" for this step.'
  - notMatch: status:\s+"waiting"
    message: 'Replace status: "waiting" in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What should an Astro endpoint return?
options:
  - A `Response`.
  - A required React component.
  - An Astro layout filename.
answer: 0
explain: Endpoints produce responses such as JSON rather than page component markup.
```

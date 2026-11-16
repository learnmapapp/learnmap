---
title: Prerender known routes
icon: 🧩
branch: production
requires:
  - pages
  - route-rules
summary: Explicit prerender routes help cover pages a crawler may not discover.
---

In your Nuxt 4 project, save this as `nuxt.config.ts`. Explicit prerender routes help cover pages a crawler may not discover. Ensure the listed pages exist and inspect generated output before deploying static assets.

```typescript
export default defineNuxtConfig({
  nitro: { prerender: { routes: ["/", "/about"] } },
});
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about prerender known routes.
lang: typescript
code: |-
  export default defineNuxtConfig({
    nitro: { prerender: { routes: ["/"] } },
  });
checks:
  - match: routes:\s+\["/",\s+"/about"\]
    message: 'Use routes: ["/", "/about"] for this step.'
  - notMatch: routes:\s+\["/"\]
    message: 'Replace routes: ["/"] in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about prerender known routes is correct?
options:
  - Explicit prerender routes help cover pages a crawler may not discover. Ensure the listed pages
    exist and inspect generated output before deploying static assets.
  - Prerendering can execute a live POST API after static deployment.
  - Every possible dynamic URL is always discoverable automatically.
answer: 0
explain: Explicit prerender routes help cover pages a crawler may not discover. Ensure the listed
  pages exist and inspect generated output before deploying static assets.
```

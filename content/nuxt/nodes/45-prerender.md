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
question: Why explicitly list known routes for prerendering?
options:
  - Some pages may not be discoverable by link crawling.
  - The list creates missing page components automatically.
  - It preserves live POST APIs on a static-only host.
answer: 0
explain: Prerender configuration selects existing pages to generate; it does not add a server runtime.
```

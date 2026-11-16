---
title: Per-route rendering rules
icon: 🔧
branch: production
requires:
  - server-routes
summary: Route rules express rendering or caching behavior by path.
---

In your Nuxt 4 project, save this as `nuxt.config.ts`. Route rules express rendering or caching behavior by path. SSR does not authenticate dashboard users; authorization remains a server responsibility.

```typescript
export default defineNuxtConfig({
  routeRules: { "/about": { prerender: true }, "/dashboard/**": { ssr: true } },
});
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about per-route rendering rules.
lang: typescript
code: |-
  export default defineNuxtConfig({
    routeRules: { "/about": { prerender: false }, "/dashboard/**": { ssr: true } },
  });
checks:
  - match: '"/about":\s+\{\s+prerender:\s+true\s+\}'
    message: 'Use "/about": { prerender: true } for this step.'
  - notMatch: '"/about":\s+\{\s+prerender:\s+false\s+\}'
    message: 'Replace "/about": { prerender: false } in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about per-route rendering rules is correct?
options:
  - "Setting ssr: true makes a route private."
  - All pages must use the same rendering strategy.
  - Route rules express rendering or caching behavior by path. SSR does not authenticate dashboard
    users; authorization remains a server responsibility.
answer: 2
explain: Route rules express rendering or caching behavior by path. SSR does not authenticate
  dashboard users; authorization remains a server responsibility.
```

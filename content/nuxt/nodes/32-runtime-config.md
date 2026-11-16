---
title: Runtime configuration
icon: 🔧
branch: server
requires:
  - setup
summary: Public runtimeConfig is exposed to browser code; private keys belong on the server.
---

In your Nuxt 4 project, save this as `nuxt.config.ts`. Public runtimeConfig is exposed to browser code; private keys belong on the server. Override matching keys through NUXT_ environment variables such as NUXT_API_SECRET.

```typescript
export default defineNuxtConfig({
  runtimeConfig: { apiSecret: "", public: { apiBase: "/api" } },
});
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about runtime configuration.
lang: typescript
code: |-
  export default defineNuxtConfig({
    runtimeConfig: { apiSecret: "", public: { apiBase: "/internal" } },
  });
checks:
  - match: apiBase:\s+"/api"
    message: 'Use apiBase: "/api" for this step.'
  - notMatch: apiBase:\s+"/internal"
    message: 'Replace apiBase: "/internal" in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about runtime configuration is correct?
options:
  - Putting a secret under public encrypts it.
  - Every runtimeConfig key is automatically private.
  - Public runtimeConfig is exposed to browser code; private keys belong on the server. Override
    matching keys through NUXT_ environment variables such as NUXT_API_SECRET.
answer: 2
explain: Public runtimeConfig is exposed to browser code; private keys belong on the server.
  Override matching keys through NUXT_ environment variables such as NUXT_API_SECRET.
```

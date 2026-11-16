---
title: Nuxt Image module
icon: 🔁
branch: production
requires:
  - assets
summary: Install @nuxt/image before enabling it.
---

In your Nuxt 4 project, save this as `nuxt.config.ts`. Install `@nuxt/image` before enabling it. Then use NuxtImg with a real source, dimensions, and useful alt text, and choose an image provider supported by the host.

```typescript
export default defineNuxtConfig({ modules: ["@nuxt/image"] });
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about nuxt image module.
lang: typescript
code: "export default defineNuxtConfig({ modules: [] });"
checks:
  - match: modules:\s+\["@nuxt/image"\]
    message: 'Use modules: ["@nuxt/image"] for this step.'
  - notMatch: modules:\s+\[\]
    message: "Replace modules: [] in the starting code."
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What is required before enabling `@nuxt/image` in `modules`?
options:
  - Install the module package.
  - Rename every image to `.vue`.
  - Disable all server rendering.
answer: 0
explain: Configuration references a real installed integration; sources and provider settings still matter.
```

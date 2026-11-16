---
title: Nuxt Image module
icon: 🔁
branch: production
requires:
  - assets
summary: Install @nuxt/image before enabling it.
---

In your Nuxt 4 project, save this as `nuxt.config.ts`. Install @nuxt/image before enabling it. Then use NuxtImg with a real source, dimensions, and useful alt text, and choose an image provider supported by the host.

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
question: Which statement about nuxt image module is correct?
options:
  - Install @nuxt/image before enabling it. Then use NuxtImg with a real source, dimensions, and
    useful alt text, and choose an image provider supported by the host.
  - Adding a module downloads every image in the world.
  - NuxtImg can optimize a nonexistent source without errors.
answer: 0
explain: Install @nuxt/image before enabling it. Then use NuxtImg with a real source, dimensions,
  and useful alt text, and choose an image provider supported by the host.
```

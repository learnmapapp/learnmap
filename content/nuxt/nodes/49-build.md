---
title: Build and run production
icon: 🧪
branch: production
requires:
  - setup
summary: The default Node server build writes .output.
---

In your Nuxt 4 project, save this as `terminal commands`. The default Node server build writes .output. Test the built server with production configuration; for static hosting use a suitable generated-output workflow instead.

```shell
npm run build
node .output/server/index.mjs
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about build and run production.
lang: shell
code: |-
  npm run build
  node .output/index.mjs
checks:
  - match: node\s+\.output/server/index\.mjs
    message: Use node .output/server/index.mjs for this step.
  - notMatch: node\s+\.output/index\.mjs
    message: Replace node .output/index.mjs in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which command starts the default built Node server?
options:
  - "`npm run dev` as the built artifact."
  - "`node .output/server/index.mjs`."
  - "`node app/app.vue`."
answer: 1
explain: Build output and development serving have different entry points.
```

---
title: Create a Nuxt project
icon: 🏷️
branch: basics
requires:
  - nuxt
summary: Create a fresh practice project using Nuxt 4.
---

In your Nuxt 4 project, save this as `terminal commands`. Create a fresh practice project using Nuxt 4. Keep its dependencies separate from Learnmap and check package.json for the installed major version.

```shell
npm create nuxt@latest study-app
cd study-app
npm install
npm run dev
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about create a nuxt project.
lang: shell
code: |-
  npm create nuxt@latest study-app
  cd study-app
  npm install
  npm run build
checks:
  - match: npm\s+run\s+dev
    message: Use npm run dev for this step.
  - notMatch: npm\s+run\s+build
    message: Replace npm run build in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about create a nuxt project is correct?
options:
  - These commands should replace Learnmap’s package.json.
  - The development server is the final production artifact.
  - Create a fresh practice project using Nuxt 4. Keep its dependencies separate from Learnmap and
    check package.json for the installed major version.
answer: 2
explain: Create a fresh practice project using Nuxt 4. Keep its dependencies separate from Learnmap
  and check package.json for the installed major version.
```

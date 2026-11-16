---
title: Create a project
icon: 🏷️
branch: basics
requires:
  - astro
summary: Create a new practice project, choose a minimal template, and use Astro 7.
---

In your Astro project, save this as `terminal commands`. Create a new practice project, choose a minimal template, and use Astro 7. The dev server supports editing; build produces deployable output.

```shell
npm create astro@latest study-site
cd study-site
npm install
npm run dev
npm run build
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about create a project.
lang: shell
code: |-
  npm create astro@latest study-site
  cd study-site
  npm install
  npm run dev
  npm run preview
checks:
  - match: npm\s+run\s+build
    message: Use npm run build for this step.
  - notMatch: npm\s+run\s+preview
    message: Replace npm run preview in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which command normally generates an Astro project's production output?
options:
  - "`npm run dev`"
  - "`npm run preview`"
  - "`npm run build`"
answer: 2
explain: Build creates output; dev serves source during editing and preview serves a built site.
```

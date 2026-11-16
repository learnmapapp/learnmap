---
title: Conditional markup
icon: 🔁
branch: basics
requires:
  - expressions
summary: Ternaries and logical expressions select markup during rendering.
---

In your Astro project, save this as `src/pages/index.astro`. Ternaries and logical expressions select markup during rendering. A server-rendered variable does not become reactive in the browser by itself.

```astro
---
const lessons = 3;
---
{lessons > 0 ? <p>Keep learning</p> : <p>Choose a course</p>}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about conditional markup.
lang: astro
code: |-
  ---
  const lessons = 3;
  ---
  {lessons > 5 ? <p>Keep learning</p> : <p>Choose a course</p>}
checks:
  - match: lessons\s+>\s+0
    message: Use lessons > 0 for this step.
  - notMatch: lessons\s+>\s+5
    message: Replace lessons > 5 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Does a frontmatter variable automatically become reactive in the browser?
options:
  - No; browser updates need explicit client-side behavior.
  - Yes; every assignment rerenders all open pages.
  - Only when the variable is a number.
answer: 0
explain: Server rendering chooses initial markup; it does not create browser reactivity by itself.
```

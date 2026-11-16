---
title: Public assets
icon: 💬
branch: styles
requires:
  - setup
summary: Place a logo.svg file in public and reference it from the site root.
---

In your Astro project, save this as `src/pages/index.astro`. Place a `logo.svg` file in public and reference it from the site root. Public files are copied directly; meaningful images need useful alternative text.

```astro
<img src="/logo.svg" width="80" height="80" alt="Study club" />
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about public assets.
lang: astro
code: <img src="/logo.svg" width="80" height="80" alt="" />
checks:
  - match: alt="Study\s+club"
    message: Use alt="Study club" for this step.
  - notMatch: alt=""
    message: Replace alt="" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Where should `/logo.svg` live for a direct public asset reference?
options:
  - "`src/components/public/logo.svg`"
  - "`public/logo.svg`"
  - "`src/pages/logo.svg`"
answer: 1
explain: Public assets are served from the site root and copied directly.
```

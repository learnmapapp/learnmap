---
title: Scoped component styles
icon: 🧪
branch: styles
requires:
  - components
summary: Astro scopes component style selectors by default.
---

In your Astro project, save this as `src/pages/index.astro`. Astro scopes component style selectors by default. This reduces accidental styling of unrelated components while keeping CSS beside its markup.

```astro
<p class="note">Practice daily.</p>
<style>
  .note { color: rebeccapurple; line-height: 1.6; }
</style>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about scoped component styles.
lang: astro
code: |-
  <p class="note">Practice daily.</p>
  <style>
    .note { color: rebeccapurple; line-height: 1; }
  </style>
checks:
  - match: line\-height:\s+1\.6
    message: "Use line-height: 1.6 for this step."
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about scoped component styles is correct?
options:
  - Astro styles require a client framework.
  - Astro scopes component style selectors by default. This reduces accidental styling of unrelated
    components while keeping CSS beside its markup.
  - A component style block always affects every page element globally.
answer: 1
explain: Astro scopes component style selectors by default. This reduces accidental styling of
  unrelated components while keeping CSS beside its markup.
```

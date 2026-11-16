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
question: What is the default scope of a component's `<style>` block?
options:
  - Only inline style attributes.
  - The component's markup through generated scope markers.
  - Every matching element on every page unconditionally.
answer: 1
explain: Scoped selectors help prevent styles from unintentionally affecting unrelated components.
```

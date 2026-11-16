---
title: Default slots
icon: 📦
branch: basics
requires:
  - components
summary: A slot receives child markup from a parent.
---

In your Astro project, save this as `src/components/Panel.astro`. A slot receives child markup from a parent. Render `<Panel><p>Hello</p></Panel>`; the fallback appears only when suitable content is absent.

A useful term here is [[slot]]: A placeholder where a parent can supply child content.

```astro
<section class="panel">
  <slot><p>No content yet.</p></slot>
</section>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about default slots.
lang: astro
code: |-
  <section class="panel">
    <slot><p>Missing</p></slot>
  </section>
checks:
  - match: <p>No\s+content\s+yet\.</p>
    message: Use <p>No content yet.</p> for this step.
  - notMatch: <p>Missing</p>
    message: Replace <p>Missing</p> in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: When does a default slot's fallback content appear?
options:
  - Only after React hydrates the parent.
  - When no suitable child content is supplied.
  - Whenever children are supplied.
answer: 1
explain: A slot uses provided content when available and its fallback otherwise.
```

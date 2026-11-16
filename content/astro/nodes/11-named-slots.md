---
title: Named slots
icon: 🛠️
branch: basics
requires:
  - slots
summary: Named slots separate content regions.
---

In your Astro project, save this as `src/components/Aside.astro`. Named slots separate content regions. A parent can supply <h2 slot="heading">Notes</h2> alongside default body content.

```astro
<aside>
  <header><slot name="heading" /></header>
  <slot />
</aside>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about named slots.
lang: astro
code: |-
  <aside>
    <header><slot name="title" /></header>
    <slot />
  </aside>
checks:
  - match: name="heading"
    message: Use name="heading" for this step.
  - notMatch: name="title"
    message: Replace name="title" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about named slots is correct?
options:
  - Every slot must have the same name.
  - Named slots can only receive numbers.
  - Named slots separate content regions. A parent can supply <h2 slot="heading">Notes</h2>
    alongside default body content.
answer: 2
explain: Named slots separate content regions. A parent can supply <h2 slot="heading">Notes</h2>
  alongside default body content.
```

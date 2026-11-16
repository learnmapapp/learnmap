---
title: Reusable components
icon: 📋
branch: basics
requires:
  - frontmatter
summary: Move reusable markup into src/components.
---

In your Astro project, save this as `src/components/Card.astro`. Move reusable markup into src/components. Import it from a page with import Card from "../components/Card.astro" and render <Card />.

A useful term here is [[component]]: A reusable unit of markup and rendering logic imported into another page or component.

```astro
<article class="card">
  <h2>Practice daily</h2>
  <p>Small steps add up.</p>
</article>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about reusable components.
lang: astro
code: |-
  <article class="card">
    <h2>Practice weekly</h2>
    <p>Small steps add up.</p>
  </article>
checks:
  - match: Practice\s+daily
    message: Use Practice daily for this step.
  - notMatch: Practice\s+weekly
    message: Replace Practice weekly in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about reusable components is correct?
options:
  - Component files must all live directly inside src/pages.
  - Move reusable markup into src/components. Import it from a page with import Card from
    "../components/Card.astro" and render <Card />.
  - Every reusable component needs a route.
answer: 1
explain: Move reusable markup into src/components. Import it from a page with import Card from
  "../components/Card.astro" and render <Card />.
```

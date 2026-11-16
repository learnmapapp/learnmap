---
title: Typed component props
icon: 🔧
branch: basics
requires:
  - components
summary: Props receive data supplied by a parent.
---

In your Astro project, save this as `src/components/Card.astro`. Props receive data supplied by a parent. Render this version with <Card title="Astro" /> and let TypeScript describe required inputs.

A useful term here is [[prop]]: An input passed from a parent to a component.

```astro
---
interface Props { title: string; description?: string }
const { title, description = "Keep practicing" } = Astro.props;
---
<article><h2>{title}</h2><p>{description}</p></article>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about typed component props.
lang: astro
code: |-
  ---
  interface Props { title: string; description?: string }
  const { title, description = "" } = Astro.props;
  ---
  <article><h2>{title}</h2><p>{description}</p></article>
checks:
  - match: description\s+=\s+"Keep\s+practicing"
    message: Use description = "Keep practicing" for this step.
  - notMatch: description\s+=\s+""
    message: Replace description = "" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about typed component props is correct?
options:
  - Astro.props reads only URL query parameters.
  - Optional props can never have defaults.
  - Props receive data supplied by a parent. Render this version with <Card title="Astro" /> and let
    TypeScript describe required inputs.
answer: 2
explain: Props receive data supplied by a parent. Render this version with <Card title="Astro" />
  and let TypeScript describe required inputs.
```

---
title: Generate dynamic routes
icon: 🧪
branch: routing
requires:
  - routes
  - lists
summary: For static output, getStaticPaths enumerates the parameter values to build.
---

In your Astro project, save this as `src/pages/topics/[topic].astro`. For static output, `getStaticPaths` enumerates the parameter values to build. A bracketed filename names the parameter available through `Astro.params`.

```astro
---
export function getStaticPaths() {
  return ["astro", "lua"].map(topic => ({ params: { topic } }));
}
const { topic } = Astro.params;
---
<h1>Learning {topic}</h1>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about generate dynamic routes.
lang: astro
code: |-
  ---
  export function getStaticPaths() {
    return ["astro"].map(topic => ({ params: { topic } }));
  }
  const { topic } = Astro.params;
  ---
  <h1>Learning {topic}</h1>
checks:
  - match: \["astro",\s+"lua"\]
    message: Use ["astro", "lua"] for this step.
  - notMatch: \["astro"\]
    message: Replace ["astro"] in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Why does a static `[topic].astro` route need `getStaticPaths`?
options:
  - To create arbitrary dynamic URLs only after deployment.
  - To enumerate the parameter values to generate at build time.
  - To read every future visitor's browser history.
answer: 1
explain: A static build must know which concrete route paths to produce.
```

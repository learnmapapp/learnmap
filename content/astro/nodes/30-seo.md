---
title: Page metadata
icon: 🔁
branch: routing
requires:
  - layouts
summary: Give each public page a descriptive title and summary.
---

In your Astro project, save this as `src/pages/index.astro`. Give each public page a descriptive title and summary. Metadata should reflect the rendered page rather than repeat unrelated keywords.

```astro
---
const title = "Astro study notes";
const description = "Practical notes from a daily learning habit.";
---
<html lang="en"><head>
  <title>{title}</title>
  <meta name="description" content={description} />
</head><body><h1>{title}</h1></body></html>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about page metadata.
lang: astro
code: |-
  ---
  const title = "Astro study notes";
  const description = "Practical notes from a daily learning habit.";
  ---
  <html lang="en"><head>
    <title>{title}</title>
    <meta name="keywords" content={description} />
  </head><body><h1>{title}</h1></body></html>
checks:
  - match: name="description"
    message: Use name="description" for this step.
  - notMatch: name="keywords"
    message: Replace name="keywords" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What should a page's title and description describe?
options:
  - The content of that particular page.
  - The same unrelated keywords on every route.
  - Only the name of the build tool.
answer: 0
explain: Accurate metadata helps readers and other tools identify the current content.
```

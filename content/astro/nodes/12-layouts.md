---
title: Shared layouts
icon: 🌐
branch: basics
requires:
  - props
  - slots
summary: A layout is an ordinary component that wraps page content.
---

In your Astro project, save this as `src/layouts/Base.astro`. A layout is an ordinary component that wraps page content. Import it into a page and pass a meaningful title for each route.

```astro
---
interface Props { title: string }
const { title } = Astro.props;
---
<html lang="en">
  <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /><title>{title}</title></head>
  <body><main><slot /></main></body>
</html>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about shared layouts.
lang: astro
code: >-
  ---

  interface Props { title: string }

  const { title } = Astro.props;

  ---

  <html lang="en">
    <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /><title>Untitled</title></head>
    <body><main><slot /></main></body>
  </html>
checks:
  - match: <title>\{title\}</title>
    message: Use <title>{title}</title> for this step.
  - notMatch: <title>Untitled</title>
    message: Replace <title>Untitled</title> in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about shared layouts is correct?
options:
  - A layout is an ordinary component that wraps page content. Import it into a page and pass a
    meaningful title for each route.
  - Layouts require a special global registry.
  - A layout’s title must be identical for all pages.
answer: 0
explain: A layout is an ordinary component that wraps page content. Import it into a page and pass a
  meaningful title for each route.
```

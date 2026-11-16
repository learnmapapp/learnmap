---
title: A useful 404 page
icon: 💬
branch: routing
requires:
  - routes
summary: A 404.astro page supplies helpful missing-route content.
---

In your Astro project, save this as `src/pages/404.astro`. A 404.astro page supplies helpful missing-route content. Ensure your hosting platform serves the generated 404 output for unknown URLs.

```astro
<html lang="en"><head><title>Page not found</title></head>
<body><h1>Page not found</h1><p>Try the <a href="/">home page</a>.</p></body></html>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about a useful 404 page.
lang: astro
code: |-
  <html lang="en"><head><title>Page not found</title></head>
  <body><h1>Page not found</h1><p>Try the <a href="/missing/">home page</a>.</p></body></html>
checks:
  - match: href="/"
    message: Use href="/" for this step.
  - notMatch: href="/missing/"
    message: Replace href="/missing/" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about a useful 404 page is correct?
options:
  - A 404 page must contain a JavaScript timer.
  - A 404.astro page supplies helpful missing-route content. Ensure your hosting platform serves the
    generated 404 output for unknown URLs.
  - Any missing route automatically redirects to an arbitrary page.
answer: 1
explain: A 404.astro page supplies helpful missing-route content. Ensure your hosting platform
  serves the generated 404 output for unknown URLs.
```

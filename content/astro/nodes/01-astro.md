---
title: Meet Astro
icon: 🚀
branch: core
requires: []
summary: Astro renders components to HTML by default.
kind: hub
---

In your Astro project, save this as `src/pages/index.astro`. Astro renders components to HTML by default. Browser JavaScript is added when you request it rather than for every component.

```astro
<html lang="en">
  <head><title>My learning site</title></head>
  <body><h1>Hello, Astro!</h1></body>
</html>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

This course targets **Astro 7**. Check your local tool version before following examples. See the [official reference](https://docs.astro.build/en/getting-started/) when an API differs. The lesson files are examples to run in a separate learning project, not commands to execute inside this site's source tree.

```exercise
goal: Repair the starting example using what you learned about meet astro.
lang: astro
code: |-
  <html lang="en">
    <head><title>My learning site</title></head>
    <body><h1>Hello, world!</h1></body>
  </html>
checks:
  - match: Hello,\s+Astro!
    message: Use Hello, Astro! for this step.
  - notMatch: Hello,\s+world!
    message: Replace Hello, world! in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about meet astro is correct?
options:
  - Astro pages require a React root.
  - Astro renders components to HTML by default. Browser JavaScript is added when you request it
    rather than for every component.
  - Every Astro component automatically hydrates in the browser.
answer: 1
explain: Astro renders components to HTML by default. Browser JavaScript is added when you request
  it rather than for every component.
```

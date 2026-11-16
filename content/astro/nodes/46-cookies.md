---
title: Request cookies
icon: 📦
branch: server
requires:
  - server-rendering
summary: Request-specific cookies require on-demand rendering.
---

In your Astro project, save this as `src/pages/index.astro`. Request-specific cookies require on-demand rendering. Treat a preference cookie as untrusted input and never confuse it with proof of identity.

```astro
---
export const prerender = false;
const theme = Astro.cookies.get("theme")?.value ?? "light";
---
<p>Preferred theme: {theme}</p>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about request cookies.
lang: astro
code: |-
  ---
  export const prerender = false;
  const theme = Astro.cookies.get("theme")?.value ?? "dark";
  ---
  <p>Preferred theme: {theme}</p>
checks:
  - match: \?\?\s+"light"
    message: Use ?? "light" for this step.
  - notMatch: \?\?\s+"dark"
    message: Replace ?? "dark" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Why must a page reading each visitor's cookie be rendered on demand?
options:
  - Cookies are available only to React components.
  - The cookie belongs to that visitor's request.
  - A static build knows every future visitor's cookies.
answer: 1
explain: Build-time HTML cannot personalize itself using future request data.
```

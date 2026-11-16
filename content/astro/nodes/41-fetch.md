---
title: Fetch during rendering
icon: 🚦
branch: server
requires:
  - frontmatter
summary: For prerendered pages, this request runs at build time; on-demand pages run it per request.
---

In your Astro project, save this as `src/pages/index.astro`. For prerendered pages, this request runs at build time; on-demand pages run it per request. Validate external response data before using it in a real application.

```astro
---
const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
if (!response.ok) throw new Error(`Request failed: ${response.status}`);
const todo = await response.json();
---
<p>{todo.title}</p>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about fetch during rendering.
lang: astro
code: |-
  ---
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  if (response.ok) throw new Error(`Request failed: ${response.status}`);
  const todo = await response.json();
  ---
  <p>{todo.title}</p>
checks:
  - match: if\s+\(!response\.ok\)
    message: Use if (!response.ok) for this step.
  - notMatch: if\s+\(response\.ok\)
    message: Replace if (response.ok) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about fetch during rendering is correct?
options:
  - Every frontmatter fetch automatically polls in the visitor’s browser.
  - fetch rejects automatically for every HTTP error status.
  - For prerendered pages, this request runs at build time; on-demand pages run it per request.
    Validate external response data before using it in a real application.
answer: 2
explain: For prerendered pages, this request runs at build time; on-demand pages run it per request.
  Validate external response data before using it in a real application.
```

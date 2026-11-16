---
title: Browser event handlers
icon: 🧩
branch: islands
requires:
  - frontmatter
summary: A processed script runs in the browser and can register event handlers.
---

In your Astro project, save this as `src/pages/index.astro`. A processed script runs in the browser and can register event handlers. Frontmatter itself cannot attach a live browser click listener.

```astro
<button id="practice">Practice</button>
<script>
  const button = document.querySelector("#practice");
  button?.addEventListener("click", () => { button.textContent = "Well done"; });
</script>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about browser event handlers.
lang: astro
code: |-
  <button id="practice">Practice</button>
  <script>
    const button = document.querySelector("#practice");
    button?.addEventListener("dblclick", () => { button.textContent = "Well done"; });
  </script>
checks:
  - match: '"click"'
    message: Use "click" for this step.
  - notMatch: '"dblclick"'
    message: Replace "dblclick" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Where should an ordinary DOM click listener be registered?
options:
  - In a browser `<script>` block.
  - In component frontmatter as if `document` were available.
  - In the collection schema.
answer: 0
explain: Browser scripts can access the DOM; frontmatter runs in the rendering environment.
```

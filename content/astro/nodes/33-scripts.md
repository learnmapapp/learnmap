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
question: Which statement about browser event handlers is correct?
options:
  - A processed script runs in the browser and can register event handlers. Frontmatter itself
    cannot attach a live browser click listener.
  - Frontmatter and browser scripts execute in the same environment.
  - Astro requires React for a button click listener.
answer: 0
explain: A processed script runs in the browser and can register event handlers. Frontmatter itself
  cannot attach a live browser click listener.
```

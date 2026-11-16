---
title: Custom elements
icon: "🧩"
branch: islands
requires: [scripts]
summary: Give each component instance its own behavior by wrapping it in a custom element.
---
**Bug report:** "I put two counters on the page. Clicking either one only updates the first."

```astro title=src/components/Counter.astro
<div>
  <button id="plus">+1</button>
  <span id="count">0</span>
</div>

<script>
  let count = 0;
  document.getElementById("plus")?.addEventListener("click", () => {
    count++;
    document.getElementById("count")!.textContent = String(count);
  });
</script>
```

**Diagnosis:** two things are going wrong at once.

1. **The ids aren't unique.** Both counters render `id="plus"` and `id="count"`, and `getElementById` always finds the first.
2. **The script runs once** for the whole page, as you saw in the [previous lesson](node:scripts), so it only ever wires up one button.

**The fix: a custom element.** Browsers let you define your own HTML tags with a class. The browser creates one instance of the class for every tag on the page, so each counter gets its own state:

```astro title=src/components/Counter.astro
<star-counter>
  <button>+1</button>
  <span>0</span>
</star-counter>

<script>
  class StarCounter extends HTMLElement {
    connectedCallback() {
      let count = 0;
      const button = this.querySelector("button")!;
      const output = this.querySelector("span")!;
      button.addEventListener("click", () => {
        count++;
        output.textContent = String(count);
      });
    }
  }
  customElements.define("star-counter", StarCounter);
</script>
```

**Why this works:**

- `customElements.define` teaches the browser the `<star-counter>` tag. Custom tag names must contain a hyphen.
- `connectedCallback` runs once per element, when it's attached to the page.
- `this` is that one `<star-counter>`, so `this.querySelector` only searches inside it. No ids needed.

**Passing data in:** use attributes, as in the [scripts lesson](node:scripts):

```astro
<star-counter data-step="5">...</star-counter>
```

Then read `Number(this.dataset.step)` inside the class.

**When to stop here and when to reach for a framework.** Custom elements are great for small behaviors: toggles, copy buttons, tabs. They cost no extra library. When a component has lots of state and re-renders lots of markup, a [React or Vue island](node:react-integration) becomes easier to write.

```compare javascript
// This is the standard Web Components API; it works the same without
// Astro.
```

```compare typescript
// Lit and Stencil are libraries built on top of custom elements.
```

```compare python
# No server-side equivalent: this is purely browser behavior.
```

```exercise
goal: "Register the class with the browser: call `customElements.define` with the tag name `\"like-button\"` and the class `LikeButton`."
lang: typescript
code: |-
  class LikeButton extends HTMLElement {
    connectedCallback() {
      this.querySelector("button")?.addEventListener("click", () => {
        this.classList.toggle("liked");
      });
    }
  }
checks:
  - match: 'customElements\.define\(\s*"like-button"\s*,\s*LikeButton\s*\)'
    message: 'Add customElements.define("like-button", LikeButton);'
solution: |-
  class LikeButton extends HTMLElement {
    connectedCallback() {
      this.querySelector("button")?.addEventListener("click", () => {
        this.classList.toggle("liked");
      });
    }
  }
  customElements.define("like-button", LikeButton);
```

```quiz
question: "Why does `this.querySelector(\"button\")` find the right button in each counter?"
options:
  - Astro rewrites the selector at build time.
  - this is the individual custom element, so the search only covers its own children.
  - querySelector always returns the clicked element.
answer: 1
explain: Each element runs its own connectedCallback, and searches only inside itself.
```

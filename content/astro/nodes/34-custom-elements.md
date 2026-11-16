---
title: Reusable browser behavior
icon: 📦
branch: islands
requires:
  - scripts
summary: A custom element scopes browser behavior to each instance.
---

In your Astro project, save this as `src/pages/index.astro`. A custom element scopes browser behavior to each instance. Registration is global, while instance state belongs to each connected element.

```astro
<study-counter><button>0</button></study-counter>
<script>
  class StudyCounter extends HTMLElement {
    connectedCallback() {
      const button = this.querySelector("button");
      let count = 0;
      if (button) button.onclick = () => { button.textContent = String(++count); };
    }
  }
  if (!customElements.get("study-counter")) customElements.define("study-counter", StudyCounter);
</script>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about reusable browser behavior.
lang: astro
code: |-
  <study-counter><button>0</button></study-counter>
  <script>
    class StudyCounter extends HTMLElement {
      connectedCallback() {
        const button = this.querySelector("button");
        let count = 0;
        if (button) button.onclick = () => { button.textContent = String(--count); };
      }
    }
    if (!customElements.get("study-counter")) customElements.define("study-counter", StudyCounter);
  </script>
checks:
  - match: String\(\+\+count\)
    message: Use String(++count) for this step.
  - notMatch: String\(\-\-count\)
    message: Replace String(--count) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Where should each custom counter instance keep its own count?
options:
  - In the public route filename.
  - In state associated with that element instance.
  - In one global count shared by every element.
answer: 1
explain: Reusable behavior should not unintentionally share mutable state between instances.
```

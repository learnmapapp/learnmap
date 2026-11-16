---
title: Scoped styles
icon: "🎨"
branch: styles
requires: [components]
summary: A style tag in a component only affects that component, so class names never clash.
---
**An experiment.** Two components, both with a `.title` class, both styling it differently:

```astro title=src/components/Alert.astro
<p class="title">Server is down</p>

<style>
  .title { color: crimson; }
</style>
```

```astro title=src/components/Promo.astro
<p class="title">50% off this week</p>

<style>
  .title { color: seagreen; }
</style>
```

Put both on one page. In plain HTML and CSS, the second rule would win and both titles would turn green. **In Astro, the alert is red and the promo is green.**

**What happened?** Look at the built HTML and CSS:

```html
<p class="title" data-astro-cid-x7k2m4>Server is down</p>
<p class="title" data-astro-cid-p9q1z8>50% off this week</p>
```

```css
.title[data-astro-cid-x7k2m4] { color: crimson; }
.title[data-astro-cid-p9q1z8] { color: seagreen; }
```

Astro gave each component a unique attribute and rewrote its selectors to require it. A `<style>` tag in a component is **scoped**: it only reaches elements written in that component's template.

**Consequences worth knowing:**

- **Use simple selectors.** `h2`, `.title` and `button` are perfectly safe inside a component. No naming schemes like BEM required.
- **Children don't inherit the scope.** Elements rendered by a *child* component, or passed in through a [slot](node:slots), aren't affected by your styles. Each component styles its own markup. (Inherited CSS properties such as `color` and `font` still cascade down normally.)
- **Unused styles are dropped**, and the CSS is bundled and minified for you.
- **No JavaScript involved.** It's all done at build time.

**Using values from the frontmatter.** `define:vars` turns frontmatter variables into CSS custom properties:

```astro
---
const accent = "rebeccapurple";
---
<h2>Hello</h2>
<style define:vars={{ accent }}>
  h2 { color: var(--accent); }
</style>
```

When you do want to style things outside the component, see [global styles](node:global-css).

```compare javascript
// CSS Modules do the same thing with generated class names:
import styles from "./Alert.module.css"; // styles.title === "Alert_title_x7k2"
```

```compare typescript
// Vue's <style scoped> uses the same data-attribute trick.
```

```compare python
# Server templates have no scoping; you'd namespace classes by hand
# (.alert-title).
```

```exercise
goal: "Give the component's button a scoped style: add a `<style>` block that sets `button { border-radius: 8px; }`."
code: |-
  <button>Subscribe</button>
checks:
  - match: '<style>\s*button\s*\{\s*border-radius:\s*8px;?\s*\}\s*</style>'
    message: 'Add <style> button { border-radius: 8px; } </style>'
solution: |-
  <button>Subscribe</button>

  <style>
    button { border-radius: 8px; }
  </style>
```

```quiz
question: "A component's `<style>` sets `p { color: red; }`. Which paragraphs turn red?"
options:
  - Every paragraph on the page.
  - Only paragraphs written in that component's own template.
  - Only the first paragraph.
answer: 1
explain: Styles are scoped to the component; paragraphs from other components or slots aren't matched.
```

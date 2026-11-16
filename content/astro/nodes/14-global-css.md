---
title: Global styles
icon: "🌐"
branch: styles
requires: [scoped-css]
summary: Three ways to style beyond one component, and when to use each.
---
Scoped styles are the default, but some CSS really is site-wide: fonts, colors, a reset, the look of Markdown content. Here's a cheat sheet of the escape hatches.

**1. Import a CSS file.** Best for site-wide basics. Import it once, usually in your [layout](node:layouts):

```css title=src/styles/global.css
:root {
  --accent: #7c3aed;
  font-family: system-ui, sans-serif;
}
body { margin: 0; line-height: 1.6; }
```

```astro title=src/layouts/BaseLayout.astro
---
import "../styles/global.css";
---
```

Every page using the layout gets those styles. Astro bundles the file and adds the `<link>` tag for you.

**2. `<style is:global>`.** The whole block skips scoping. Useful when CSS belongs with a component but must reach beyond it:

```astro
<style is:global>
  .prose a { text-decoration-thickness: 2px; }
</style>
```

**3. `:global()` for a single selector.** Keep the block scoped, and escape only the part that needs it. The classic case is styling content passed in through a slot, or HTML generated from Markdown:

```astro title=src/components/Article.astro
<article><slot /></article>

<style>
  article :global(h2) { margin-top: 2rem; }
</style>
```

`article` stays scoped to this component, while `h2` matches any heading inside it, whoever rendered it.

**Which one when:**

| Need | Use |
| --- | --- |
| fonts, colors, resets for the whole site | an imported CSS file |
| a component-shaped chunk of global CSS | `<style is:global>` |
| reach into slotted or Markdown content | `:global(...)` inside a scoped block |

**Tip:** CSS custom properties defined on `:root` work everywhere, including inside scoped styles. Global variables and scoped rules are a nice combination: `color: var(--accent)`.

```compare javascript
// Vite: import "./global.css" in main.js. The same import works in
// Astro frontmatter.
```

```compare typescript
// Vue: <style> without scoped, or :deep() to reach child components.
```

```compare python
# Django/Jinja: a <link rel="stylesheet"> in base.html.
```

```exercise
goal: "Style headings inside the slotted content: wrap the `h3` in `:global(...)` so it reaches elements rendered outside this component."
code: |-
  <section class="docs"><slot /></section>

  <style>
    .docs h3 { color: var(--accent); }
  </style>
checks:
  - match: '\.docs\s+:global\(\s*h3\s*\)'
    message: 'Write .docs :global(h3)'
solution: |-
  <section class="docs"><slot /></section>

  <style>
    .docs :global(h3) { color: var(--accent); }
  </style>
```

```quiz
question: "Where's the best place to import a site-wide `global.css`?"
options:
  - In every component.
  - Once, in the shared layout.
  - In public/, without importing it.
answer: 1
explain: Every page that uses the layout gets the styles, and Astro bundles them.
```

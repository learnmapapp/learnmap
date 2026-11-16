---
title: Global styles
icon: 🏷️
branch: styles
requires:
  - scoped-css
summary: Import this stylesheet from Base.astro frontmatter with import "../styles/global.css".
---

In your Astro project, save this as `src/styles/global.css`. Import this stylesheet from Base.astro frontmatter with import "../styles/global.css". Use global styles for document defaults and shared design tokens.

```css
html { font-family: system-ui, sans-serif; }
body { margin: 0; }
a { text-underline-offset: 0.2em; }
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about global styles.
lang: css
code: |-
  html { font-family: system-ui, sans-serif; }
  body { margin: 8px; }
  a { text-underline-offset: 0.2em; }
checks:
  - match: margin:\s+0
    message: "Use margin: 0 for this step."
  - notMatch: margin:\s+8px
    message: "Replace margin: 8px in the starting code."
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about global styles is correct?
options:
  - A CSS file in src/styles is automatically loaded without an import.
  - Global styles can only be defined in JavaScript.
  - Import this stylesheet from Base.astro frontmatter with import "../styles/global.css". Use
    global styles for document defaults and shared design tokens.
answer: 2
explain: Import this stylesheet from Base.astro frontmatter with import "../styles/global.css". Use
  global styles for document defaults and shared design tokens.
```

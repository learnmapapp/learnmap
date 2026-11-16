---
title: Scoped component CSS
icon: "🎨"
branch: production
requires: [templates]
summary: "scoped styles stay inside a component; :deep reaches children, and global CSS goes in nuxt.config."
---
**Cheat sheet: where does this CSS go?**

| I want to style… | Write |
| --- | --- |
| Only this component | `<style scoped>` |
| An element inside a child component | `:deep(.selector)` in a scoped block |
| The whole site (resets, fonts, variables) | a CSS file listed in `nuxt.config.ts` |
| Based on a prop or ref | `v-bind()` inside CSS |

**Scoped styles.** Two components both use a `.title` class:

```vue title=app/components/TaskCard.vue
<template>
  <h3 class="title">{{ task.title }}</h3>
</template>

<style scoped>
.title { font-size: 1rem; color: #334; }
</style>
```

With `scoped`, Vue adds a unique attribute to this component's elements, something like `data-v-7ba5bd90`, and rewrites the selector to `.title[data-v-7ba5bd90]`. The other component's `.title` is untouched. Without `scoped`, the last stylesheet loaded wins, and the bug shows up on a page you weren't looking at.

**Reaching into a child.** Scoped selectors stop at the child component's root element. To style deeper, use `:deep`:

```vue
<style scoped>
.card :deep(a) { color: inherit; }
</style>
```

**Site-wide CSS.** Put it in a file and register it once:

```typescript title=nuxt.config.ts
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
});
```

`~` points to the `app/` folder, so that's `app/assets/css/main.css`. Every page loads it.

**CSS that follows your data:**

```vue
<script setup lang="ts">
const props = defineProps<{ color: string }>();
</script>

<style scoped>
.badge { background: v-bind('props.color'); }
</style>
```

Vue turns this into a CSS variable that updates when the prop changes.

```compare typescript
// React: CSS Modules (styles.title) or a CSS-in-JS
// library to get the same isolation.
```

```compare javascript
// Plain CSS: BEM names like .task-card__title,
// kept unique by hand.
```

```exercise
goal: "The `.price` rule is leaking into other components. Make this style block scoped."
lang: vue
code: |-
  <template>
    <span class="price">€12</span>
  </template>

  <style>
  .price { font-weight: bold; }
  </style>
checks:
  - match: '<style scoped>'
    message: Add the scoped attribute to the style tag.
solution: |-
  <template>
    <span class="price">€12</span>
  </template>

  <style scoped>
  .price { font-weight: bold; }
  </style>
```

```quiz
question: "A scoped style says `.card a { color: red }`, but links inside a child component stay blue. Why?"
options:
  - Scoped styles don't support descendant selectors.
  - Scoped selectors don't reach elements inside child components; use :deep(a).
  - The child's styles always win.
answer: 1
explain: The scope attribute is only on this component's own elements. :deep lifts the restriction.
```

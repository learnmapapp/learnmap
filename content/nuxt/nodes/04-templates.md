---
title: Single-file components
icon: "🧬"
branch: basics
requires: [setup]
summary: The three parts of a .vue file, and how the template uses values from the script.
---
**A guided tour of a .vue file.** Everything you build in Nuxt is a [[single-file component]]. Here's one, and then we'll walk through it top to bottom:

```vue title=app/components/WelcomeCard.vue
<script setup lang="ts">
const user = 'Ada';
const tasks = 3;
</script>

<template>
  <section class="card">
    <h2>Welcome back, {{ user }}</h2>
    <p>{{ tasks }} tasks, about {{ tasks * 25 }} minutes.</p>
  </section>
</template>

<style scoped>
.card { padding: 1rem; border-radius: 8px; }
</style>
```

**Stop 1: `<script setup lang="ts">`.** Plain TypeScript, run once each time the component is created. `setup` is the important word: every variable you declare here is **available in the template automatically**. There's no `return` and no `export`. `lang="ts"` turns on TypeScript; leave it out to write JavaScript.

**Stop 2: `<template>`.** HTML, with a few additions. `{{ }}` takes any JavaScript *expression*, so `{{ tasks * 25 }}` works. A statement like `if` doesn't fit inside the braces; Vue has [[directive|directives]] for that, coming up soon.

**Stop 3: `<style scoped>`.** CSS for this component only. `scoped` stops `.card` from leaking into other components; there's [a whole lesson](node:styles) on it later.

Only the template is required. Many small components have no style block, and some have no script.

```warn
Interpolation inserts **text**, not HTML. If `user` contained `<b>Ada</b>`, you'd see the tags printed literally. That's a safety feature: it stops user input from injecting markup.
```

```compare javascript
// JSX puts markup inside JavaScript. A .vue file does
// the reverse: separate script and template blocks.
```

```compare python
# Jinja: {{ user }} prints a value, just like Vue.
```

```exercise
goal: "Show the user's name: replace the hard-coded `Ada` in the heading with `{{ user }}`."
lang: vue
code: |-
  <script setup lang="ts">
  const user = 'Grace';
  </script>

  <template>
    <h2>Welcome back, Ada</h2>
  </template>
checks:
  - match: '<h2>Welcome back, \{\{\s*user\s*\}\}</h2>'
    message: Write {{ user }} where the name goes.
solution: |-
  <script setup lang="ts">
  const user = 'Grace';
  </script>

  <template>
    <h2>Welcome back, {{ user }}</h2>
  </template>
```

```quiz
question: "Inside `<script setup>`, you write `const price = 20;`. How does the template get access to it?"
options:
  - "You must `return { price }` from a setup function."
  - It's available automatically, as `{{ price }}`.
  - You must export it.
answer: 1
explain: With script setup, every top-level binding is exposed to the template.
```

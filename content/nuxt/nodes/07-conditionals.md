---
title: Show and hide
icon: "🔀"
branch: basics
requires: [refs]
summary: v-if, v-else-if and v-else choose what to render; v-show toggles visibility.
---
Vue's template [[directive|directives]] are attributes that start with `v-`. The first ones you'll need decide **whether something appears at all**.

**A loading screen in three states:**

```vue
<script setup lang="ts">
const status = ref<'loading' | 'error' | 'ready'>('loading');
</script>

<template>
  <p v-if="status === 'loading'">Loading…</p>
  <p v-else-if="status === 'error'">Something went wrong.</p>
  <TaskList v-else />
</template>
```

Read it as an if/else chain written on the elements themselves. Only one of the three ends up in the page. The others aren't hidden; they're **not there at all**.

The rules of the chain:

- `v-else-if` and `v-else` must come **right after** a `v-if` sibling. Put another element in between and Vue warns that the chain is broken.
- The value is a JavaScript expression. No `{{ }}` inside directives.

**To toggle several elements at once,** wrap them in `<template>`. It groups them without adding an element to the page:

```vue
<template v-if="user">
  <h2>Hi {{ user.name }}</h2>
  <button>Log out</button>
</template>
```

**v-if or v-show?** `v-show` keeps the element in the page and switches `display: none` on and off.

| | `v-if` | `v-show` |
| --- | --- | --- |
| When false | Element removed | Element hidden with CSS |
| Switching cost | Builds or destroys it | Just flips a style |
| Works with `v-else` | Yes | No |
| Good for | Mostly static choices | Things toggled often, like a dropdown |

When unsure, use `v-if`.

```compare python
# Jinja: {% if %} ... {% elif %} ... {% else %}
```

```compare typescript
// JSX: {status === 'loading' ? <Spinner /> : <List />}
```

```exercise
goal: "Show `Your cart is empty` when `items.length` is 0, and the list otherwise. Add `v-else` to the `<ul>`."
lang: vue
code: |-
  <template>
    <p v-if="items.length === 0">Your cart is empty</p>
    <ul>
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </template>
checks:
  - match: '<ul\s+v-else\s*>'
    message: Add v-else to the <ul>, right after the v-if paragraph.
solution: |-
  <template>
    <p v-if="items.length === 0">Your cart is empty</p>
    <ul v-else>
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </template>
```

```quiz
question: "A modal opens and closes dozens of times per session. Which directive fits best?"
options:
  - v-if, because hidden elements still cost memory.
  - v-show, because toggling a CSS property is cheaper than rebuilding the element.
  - Either. They behave identically.
answer: 1
explain: v-show keeps the element and flips display, which suits frequent toggling.
```

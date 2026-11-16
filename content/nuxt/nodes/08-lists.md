---
title: Keyed lists
icon: 🔧
branch: basics
requires:
  - templates
summary: Use v-for to render a collection and a stable unique key to preserve item identity as the
  list changes.
---

In your Nuxt 4 project, save this as `app/pages/index.vue`. Use v-for to render a collection and a stable unique key to preserve item identity as the list changes. Prefer a domain ID over an editable label.

```vue
<script setup lang="ts">
const topics = [{ id: "vue", title: "Vue" }, { id: "nuxt", title: "Nuxt" }];
</script>
<template><ul><li v-for="topic in topics" :key="topic.id">{{ topic.title }}</li></ul></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```compare javascript
const topics = ["Astro", "Nuxt"];
const list = document.createElement("ul");
for (const topic of topics) {
  const item = document.createElement("li");
  item.textContent = topic;
  list.append(item);
}
document.body.append(list);
```

```compare typescript
const topics: { id: string; title: string }[] = [
  { id: "astro", title: "Astro" },
  { id: "nuxt", title: "Nuxt" },
];
const titles = topics.map(topic => topic.title);
```

```compare python
topics = ["Astro", "Nuxt"]
for topic in topics:
    print(topic)
# This prints text; it does not create browser DOM elements.
```

```exercise
goal: Repair the starting example using what you learned about keyed lists.
lang: vue
code: >-
  <script setup lang="ts">

  const topics = [{ id: "vue", title: "Vue" }, { id: "nuxt", title: "Nuxt" }];

  </script>

  <template><ul><li v-for="topic in topics" :key="topic.title">{{ topic.title
  }}</li></ul></template>
checks:
  - match: :key="topic\.id"
    message: Use :key="topic.id" for this step.
  - notMatch: :key="topic\.title"
    message: Replace :key="topic.title" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which key is most suitable for reorderable records with stable IDs?
options:
  - A new random value on each render.
  - Its current array index regardless of reordering.
  - The record's ID.
answer: 2
explain: Stable keys preserve identity when items move.
```

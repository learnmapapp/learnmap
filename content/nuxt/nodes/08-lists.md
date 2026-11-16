---
title: Keyed lists
icon: "📋"
branch: basics
requires: [templates]
summary: v-for renders one element per item, and :key tells Vue which element belongs to which item.
---
**A bug report.** *"I typed a note into the second task's input, then deleted the first task. My note jumped to the wrong task!"*

Here's the component:

```vue
<script setup lang="ts">
const tasks = ref([
  { id: 1, title: 'Buy milk' },
  { id: 2, title: 'Call Sam' },
  { id: 3, title: 'Book train' },
]);
</script>

<template>
  <ul>
    <li v-for="task in tasks">
      {{ task.title }} <input placeholder="Note" />
    </li>
  </ul>
</template>
```

`v-for="task in tasks"` repeats the `<li>` once per task. That part is fine. The bug is what Vue does when the list **changes**.

**The diagnosis.** Without a key, Vue matches elements by **position**. Delete task 1, and Vue sees three items become two. The cheapest update is to change the *text* of the first two `<li>` elements and remove the last one. The inputs, with whatever you typed into them, stay where they were. Your note for *Call Sam* now sits next to *Book train*.

**The fix.** Give each element a stable identity:

```vue
<li v-for="task in tasks" :key="task.id">
  {{ task.title }} <input placeholder="Note" />
</li>
```

Now Vue removes the element whose key is 1, and the others keep their inputs.

**What makes a good key:**

- **Unique** within the list, and **stable**: the same item always has the same key. A database id is perfect.
- **Not the index.** `:key="index"` is position matching again, so it has the same bug.
- **Not `Math.random()`.** A new key on every render makes Vue rebuild every element each time.

You also get the index when you need it: `v-for="(task, index) in tasks"`.

```compare typescript
// React has the same rule:
// tasks.map(t => <li key={t.id}>...</li>)
```

```compare python
# Jinja: {% for task in tasks %} has no keys,
# because the server re-renders the whole page.
```

```exercise
goal: "Fix the bug: give each `<li>` a stable `:key` using `task.id`."
lang: vue
code: |-
  <template>
    <ul>
      <li v-for="task in tasks">{{ task.title }}</li>
    </ul>
  </template>
checks:
  - match: ':key="task\.id"'
    message: Add :key="task.id" to the <li>.
solution: |-
  <template>
    <ul>
      <li v-for="task in tasks" :key="task.id">{{ task.title }}</li>
    </ul>
  </template>
```

```quiz
question: "Why is `:key=\"index\"` a poor choice for a list where items can be deleted?"
options:
  - Indexes aren't allowed as keys.
  - After a delete, the indexes shift, so elements get matched to the wrong items.
  - It makes the list render in reverse.
answer: 1
explain: An index describes a position, not an item, so it doesn't survive a reorder or a delete.
```

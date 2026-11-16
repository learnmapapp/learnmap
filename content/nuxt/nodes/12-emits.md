---
title: Typed component events
icon: "📣"
branch: components
requires: [props]
summary: defineEmits lets a child tell its parent that something happened, with typed payloads.
---
**A conversation between two components.** Props carry data down. Here's how a child talks back.

> **TaskCard:** The user ticked my checkbox. I'd like `done` to be true now.
>
> **Parent:** You can't change that yourself: I own the tasks. Send me an event and I'll update the list.
>
> **TaskCard:** `emit('toggle', 42)`.
>
> **Parent:** Got it. Task 42 is now done, and here's your new `done` prop.

In code, the child declares which [[emit|events]] it can send:

```vue title=app/components/TaskCard.vue
<script setup lang="ts">
defineProps<{ id: number; title: string; done: boolean }>();

const emit = defineEmits<{
  toggle: [id: number];
  remove: [id: number];
}>();
</script>

<template>
  <li>
    <input
      type="checkbox"
      :checked="done"
      @change="emit('toggle', id)"
    />
    {{ title }}
    <button @click="emit('remove', id)">✕</button>
  </li>
</template>
```

The type reads as "event name: list of arguments". `toggle: [id: number]` means the toggle event carries one number.

The parent listens with `@`, just like it would for a native click:

```vue
<script setup lang="ts">
const tasks = ref([{ id: 42, title: 'Ship it', done: false }]);

function toggle(id: number) {
  const task = tasks.value.find((t) => t.id === id);
  if (task) task.done = !task.done;
}
</script>

<template>
  <TaskCard
    v-for="task in tasks"
    :key="task.id"
    v-bind="task"
    @toggle="toggle"
  />
</template>
```

`v-bind="task"` passes every field of `task` as a prop at once. Handy when the names match.

**Why the round trip?** With one owner, data has one source of truth. When something changes, there's exactly one place to look.

```compare javascript
// DOM: el.dispatchEvent(new CustomEvent('toggle',
//   { detail: 42 })) and addEventListener in the parent.
```

```compare typescript
// React passes callbacks down as props instead:
// <TaskCard onToggle={toggle} />
```

```exercise
goal: "Declare a `select` event that carries a `name: string`, then emit it on click."
lang: vue
code: |-
  <script setup lang="ts">
  const props = defineProps<{ name: string }>();
  </script>

  <template>
    <button>{{ name }}</button>
  </template>
checks:
  - match: 'defineEmits<\{\s*select:\s*\[name:\s*string\];?\s*\}>\(\)'
    message: "Declare const emit = defineEmits<{ select: [name: string] }>();"
  - match: '@click="emit\(''select'',\s*(props\.)?name\)"'
    message: On click, call emit('select', name).
solution: |-
  <script setup lang="ts">
  const props = defineProps<{ name: string }>();
  const emit = defineEmits<{ select: [name: string] }>();
  </script>

  <template>
    <button @click="emit('select', name)">{{ name }}</button>
  </template>
```

```quiz
question: "The child declares `remove: [id: number]`. How does the parent listen?"
options:
  - "`<TaskCard @remove=\"onRemove\" />`"
  - "`<TaskCard :remove=\"onRemove\" />`"
  - "`<TaskCard v-model=\"remove\" />`"
answer: 0
explain: Component events are listened to with @, just like native DOM events.
```

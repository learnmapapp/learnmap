---
title: Typed props
icon: "🎛️"
branch: components
requires: [templates]
summary: defineProps declares a component's inputs, with TypeScript types and default values.
---
**A component's [[prop|props]] are its public contract.** Like a function signature, they say what callers have to provide and what they may leave out. Here's a contract for a task card:

```vue title=app/components/TaskCard.vue
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    done?: boolean;
    priority?: 'low' | 'high';
  }>(),
  { done: false, priority: 'low' },
);
</script>

<template>
  <article :class="props.priority">
    <input type="checkbox" :checked="done" disabled />
    {{ title }}
  </article>
</template>
```

Read the contract:

| Prop | Required? | Type | Default |
| --- | --- | --- | --- |
| `title` | yes | string | none |
| `done` | no (`?`) | boolean | `false` |
| `priority` | no | `'low'` or `'high'` | `'low'` |

**Using it** looks like passing HTML attributes:

```vue
<template>
  <TaskCard title="Write docs" />
  <TaskCard title="Ship it" :done="true" priority="high" />
</template>
```

Note the colon in `:done="true"`. Without it, you'd pass the *string* `"true"`. A plain attribute is always a string; `:` makes the value an expression. Your editor flags `done="true"` as a type error, because the contract wants a boolean.

**In the template you can use props directly** (`{{ title }}`). In script, go through the object `defineProps` returns: `props.title`.

**Props flow one way: down.** A child must not change its props. `props.title = 'x'` gives a warning, because the parent owns that value. To ask the parent for a change, the child [emits an event](node:emits).

```compare typescript
// React: function TaskCard({ title, done = false }: Props)
```

```compare python
# Like a function signature with defaults:
# def task_card(title: str, done: bool = False)
```

```exercise
goal: "Declare the contract: a required `title: string` and an optional `count?: number`."
lang: vue
code: |-
  <script setup lang="ts">
  const props = defineProps();
  </script>

  <template>
    <h3>{{ title }} ({{ count ?? 0 }})</h3>
  </template>
checks:
  - match: 'defineProps<\{'
    message: Give defineProps a type, defineProps<{ ... }>().
  - match: 'title:\s*string'
    message: Declare title as string.
  - match: 'count\?:\s*number'
    message: "Declare count as an optional number (count?: number)."
solution: |-
  <script setup lang="ts">
  const props = defineProps<{ title: string; count?: number }>();
  </script>

  <template>
    <h3>{{ title }} ({{ count ?? 0 }})</h3>
  </template>
```

```quiz
question: "`<TaskCard title=\"Ship\" done=\"false\" />`. What does the component receive for `done`?"
options:
  - The boolean false.
  - "The string \"false\", which is truthy."
  - Nothing. The prop is ignored.
answer: 1
explain: Without a colon, attribute values are strings. Write :done="false" for a boolean.
```

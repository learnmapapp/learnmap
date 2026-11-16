---
title: Typed props
icon: 🛠️
branch: components
requires:
  - templates
summary: Props describe parent-supplied inputs.
---

In your Nuxt 4 project, save this as `app/components/TaskCard.vue`. Props describe parent-supplied inputs. Treat them as read-only and use events when a child requests a state change.

A useful term here is [[prop]]: A read-only input supplied by a component’s parent.

```vue
<script setup lang="ts">
withDefaults(defineProps<{ title: string; done?: boolean }>(), { done: false });
</script>
<template><article><h2>{{ title }}</h2><p>{{ done ? "Complete" : "In progress" }}</p></article></template>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about typed props.
lang: vue
code: >-
  <script setup lang="ts">

  withDefaults(defineProps<{ title: string; done?: boolean }>(), { done: true });

  </script>

  <template><article><h2>{{ title }}</h2><p>{{ done ? "Complete" : "In progress"
  }}</p></article></template>
checks:
  - match: \{\s+done:\s+false\s+\}
    message: "Use { done: false } for this step."
  - notMatch: \{\s+done:\s+true\s+\}
    message: "Replace { done: true } in the starting code."
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about typed props is correct?
options:
  - A child should directly overwrite every parent prop.
  - Props can only contain strings.
  - Props describe parent-supplied inputs. Treat them as read-only and use events when a child
    requests a state change.
answer: 2
explain: Props describe parent-supplied inputs. Treat them as read-only and use events when a child
  requests a state change.
```

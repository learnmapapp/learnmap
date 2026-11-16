---
title: Handle user events
icon: "🖱️"
branch: basics
requires: [refs]
summary: "Listen with @click and friends, and use modifiers like .prevent and .enter to skip boilerplate."
---
**Cheat sheet first, explanations after.**

| You want | Write |
| --- | --- |
| Run a function on click | `@click="save"` |
| Run a one-liner | `@click="count++"` |
| Pass an argument | `@click="remove(task.id)"` |
| Use the event object | `@input="onInput($event)"` |
| Submit a form without reloading | `@submit.prevent="save"` |
| React to Enter in an input | `@keyup.enter="add"` |
| Stop a click reaching the parent | `@click.stop="open"` |
| Listen only once | `@click.once="start"` |

**`@` is short for `v-on:`.** `@click="save"` and `v-on:click="save"` are the same thing. Everyone uses the short form.

**Name or call?** Both `@click="save"` and `@click="save()"` work. Use the name when the handler takes no arguments or wants the event: Vue passes the event to it. Use a call when you pass your own arguments.

**Modifiers save boilerplate.** Here's a form the long way and the short way:

```vue
<script setup lang="ts">
function save(event: Event) {
  event.preventDefault();
  // ... save the form
}
</script>

<template>
  <form @submit="save">...</form>
</template>
```

```vue
<script setup lang="ts">
function save() {
  // ... save the form
}
</script>

<template>
  <form @submit.prevent="save">...</form>
</template>
```

`.prevent` calls `preventDefault()` for you, so the browser doesn't reload the page. Your function is left with only the interesting part.

**Key modifiers** work on keyboard events: `.enter`, `.esc`, `.tab`, `.space`, `.up`, `.down`. They combine with system keys too: `@keydown.ctrl.enter="send"`.

```compare javascript
// form.addEventListener('submit', (e) => {
//   e.preventDefault(); save();
// });
```

```compare typescript
// React: <form onSubmit={(e) => { e.preventDefault(); save(); }}>
```

```exercise
goal: "Stop the page from reloading: submit the form with `@submit.prevent`."
lang: vue
code: |-
  <script setup lang="ts">
  const title = ref('');
  function add() {
    console.log('Adding', title.value);
  }
  </script>

  <template>
    <form @submit="add">
      <input v-model="title" />
      <button>Add</button>
    </form>
  </template>
checks:
  - match: '@submit\.prevent="add"'
    message: Use @submit.prevent="add" on the form.
solution: |-
  <script setup lang="ts">
  const title = ref('');
  function add() {
    console.log('Adding', title.value);
  }
  </script>

  <template>
    <form @submit.prevent="add">
      <input v-model="title" />
      <button>Add</button>
    </form>
  </template>
```

```quiz
question: "A delete button sits inside a clickable card. Clicking delete also opens the card. Which modifier helps?"
options:
  - "@click.prevent"
  - "@click.stop"
  - "@click.once"
answer: 1
explain: .stop calls stopPropagation, so the click doesn't bubble up to the card.
```

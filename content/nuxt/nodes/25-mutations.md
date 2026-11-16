---
title: Event-driven mutations
icon: "✉️"
branch: data
requires: [models]
summary: Send changes with $fetch inside event handlers; useFetch is for loading, not for saving.
---
**Follow one click from start to finish.** A form adds a task:

```vue title=app/components/NewTask.vue
<script setup lang="ts">
const title = ref('');
const saving = ref(false);
const emit = defineEmits<{ added: [] }>();

async function add() {
  saving.value = true;
  try {
    await $fetch('/api/tasks', {
      method: 'POST',
      body: { title: title.value },
    });
    title.value = '';
    emit('added');
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <form @submit.prevent="add">
    <input v-model="title" required />
    <button :disabled="saving">Add</button>
  </form>
</template>
```

**0 ms.** The user presses Enter. `@submit.prevent` stops the page reload and calls `add`.

**1 ms.** `saving` turns true, so the button is disabled. No accidental double submits.

**2 ms.** `$fetch` sends `POST /api/tasks`. The `body` object is turned into JSON for you, along with the right `Content-Type` header.

**80 ms.** The server answers. `$fetch` parses the JSON reply. If the status were 4xx or 5xx, it would **throw**, and we'd skip straight to `finally`.

**81 ms.** The input is cleared, and the component emits `added`, so the parent knows to [refresh its list](node:refresh).

**82 ms.** `finally` re-enables the button, whether the request worked or not.

**Why `$fetch` and not `useFetch`?** `useFetch` is built for reading: it runs during setup, caches under a key, and avoids repeat requests. A save should happen *exactly when the user clicks*, every time, and never during server rendering. That's a plain function call, so `$fetch` is the right tool.

**`$fetch` vs `fetch`:** `$fetch` throws on error status codes (plain `fetch` doesn't), handles JSON in both directions, and, during server rendering, calls your own API routes directly instead of over the network.

```compare javascript
// fetch('/api/tasks', { method: 'POST', headers: {...},
//   body: JSON.stringify(...) }) + res.ok checks.
```

```compare python
# requests.post('/api/tasks', json={'title': title})
```

```exercise
goal: "Send the comment: call `$fetch('/api/comments')` with method `'POST'` and the comment as `body`."
lang: typescript
code: |-
  const text = ref('');

  async function send() {
    await $fetch('/api/comments');
    text.value = '';
  }
checks:
  - match: "method:\\s*'POST'"
    message: "Add method: 'POST' to the options."
  - match: 'body:\s*\{\s*text:\s*text\.value\s*\}'
    message: "Add body: { text: text.value }."
solution: |-
  const text = ref('');

  async function send() {
    await $fetch('/api/comments', {
      method: 'POST',
      body: { text: text.value },
    });
    text.value = '';
  }
```

```quiz
question: "The server answers a `$fetch` POST with status 422. What happens in your code?"
options:
  - $fetch returns the error body as a normal result.
  - $fetch throws, so code after the await doesn't run (unless you catch it).
  - The request is retried automatically.
answer: 1
explain: Unlike plain fetch, $fetch throws for error status codes.
```

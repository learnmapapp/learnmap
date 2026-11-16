---
title: A task dashboard
icon: "🏁"
branch: production
requires: [validation, use-fetch, mutations, layouts, testing]
summary: Build a small full-stack task app with a validated API, server-rendered data, a form, a layout and a test.
---
**Your final assignment: a sticky note from Fern.**

> Build a task dashboard for a tiny team. It should list tasks, add new ones, and mark them done. The list must be in the server-rendered HTML, and the API must reject nonsense. One test, please, so we know it keeps working. 💚

Here's one way to build it, in five milestones. Try each one yourself before reading the code.

**Milestone 1: the API.** Two routes and a validated body. An in-memory array is enough for now:

```typescript title=server/utils/tasks.ts
export type Task = { id: number; title: string; done: boolean };

export const tasks: Task[] = [];
let nextId = 1;

export function addTask(title: string): Task {
  const task = { id: nextId++, title, done: false };
  tasks.push(task);
  return task;
}
```

```typescript title=server/api/tasks/index.get.ts
export default defineEventHandler(() => tasks);
```

```typescript title=server/api/tasks/index.post.ts
import { z } from 'zod';

const NewTask = z.object({ title: z.string().trim().min(1).max(120) });

export default defineEventHandler(async (event) => {
  const { title } = await readValidatedBody(event, NewTask.parse);
  setResponseStatus(event, 201);
  return addTask(title);
});
```

*Check it:* `curl -X POST` with an empty title should get a 400.

**Milestone 2: the frame.** A default layout with a header, and `<NuxtLayout><NuxtPage /></NuxtLayout>` in `app.vue`, as in [the layouts lesson](node:layouts).

**Milestone 3: the list, server-rendered.**

```vue title=app/pages/index.vue
<script setup lang="ts">
useHead({ title: 'Dashboard' });
const { data: tasks, refresh } = await useFetch('/api/tasks');
const open = computed(
  () => tasks.value?.filter((t) => !t.done).length ?? 0,
);
</script>

<template>
  <TaskCount :open="open" />
  <NewTaskForm @added="refresh" />
  <ul>
    <li v-for="task in tasks" :key="task.id">{{ task.title }}</li>
  </ul>
</template>
```

*Check it:* view the page source. The tasks should be in the HTML.

**Milestone 4: the form.** `NewTaskForm` sends `$fetch('/api/tasks', { method: 'POST', body })` and emits `added`, exactly like [the mutations lesson](node:mutations). Show the server's error message when the request fails:

```typescript
try {
  await $fetch('/api/tasks', {
    method: 'POST',
    body: { title: title.value },
  });
  title.value = '';
  emit('added');
} catch {
  error.value = 'Please enter a title.';
}
```

**Milestone 5: the test.** Reuse the `TaskCount` test from [the testing lesson](node:testing); it covers the number at the top of the page.

**Stretch goals,** each linked to the lesson that helps:

- A `PATCH /api/tasks/[id]` route to toggle `done` ([methods](node:http-methods)).
- Only logged-in users can add tasks ([authorization](node:authorization)).
- A `?filter=open` query to show only open tasks ([query parameters](node:route-query)).
- Swap the array for a real database, keeping the same API.

```exercise
goal: "Finish the POST route: validate the body with `readValidatedBody(event, NewTask.parse)` and return `addTask(title)`."
lang: typescript
code: |-
  import { z } from 'zod';

  const NewTask = z.object({ title: z.string().trim().min(1) });

  export default defineEventHandler(async (event) => {
  });
checks:
  - match: 'const \{ title \} = await readValidatedBody\(event,\s*NewTask\.parse\)'
    message: "Start with const { title } = await readValidatedBody(event, NewTask.parse);"
  - match: 'return addTask\(title\)'
    message: Return addTask(title).
solution: |-
  import { z } from 'zod';

  const NewTask = z.object({ title: z.string().trim().min(1) });

  export default defineEventHandler(async (event) => {
    const { title } = await readValidatedBody(event, NewTask.parse);
    return addTask(title);
  });
```

```quiz
question: "After adding a task, the list doesn't show it. Which piece is most likely missing?"
options:
  - The POST route's validation.
  - The form's added event isn't connected to the list's refresh().
  - The layout's slot.
answer: 1
explain: useFetch caches its result; something has to call refresh after a change.
```

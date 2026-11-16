---
title: Nuxt component tests
icon: "🧪"
branch: production
requires: [props]
summary: Run Vitest in a Nuxt environment and mount components with mountSuspended, auto-imports included.
---
**Red, green, done: a test-first walkthrough.** We want a `TaskCount` component that says *"3 tasks left"*, or *"All done!"* at zero. Let's write the test first.

**Setup, once per project.** Install the tools:

```repl shell
> npm install -D @nuxt/test-utils vitest @vue/test-utils happy-dom
```

Then tell Vitest to run tests inside a Nuxt environment:

```typescript title=vitest.config.ts
import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: { environment: 'nuxt' },
});
```

Why a special environment? Your components use auto-imports (`ref`, `useFetch`, other components) that only exist inside Nuxt. Plain Vitest would fail with *ref is not defined*.

**Red: write the test first.**

```typescript title=tests/TaskCount.nuxt.test.ts
import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import TaskCount from '~/components/TaskCount.vue';

describe('TaskCount', () => {
  it('shows how many tasks are left', async () => {
    const wrapper = await mountSuspended(TaskCount, {
      props: { open: 3 },
    });
    expect(wrapper.text()).toBe('3 tasks left');
  });

  it('celebrates at zero', async () => {
    const wrapper = await mountSuspended(TaskCount, {
      props: { open: 0 },
    });
    expect(wrapper.text()).toBe('All done!');
  });
});
```

Run `npx vitest`: both fail, because the component doesn't exist yet. Good: a test that never failed hasn't proven anything.

**Green: write just enough component.**

```vue title=app/components/TaskCount.vue
<script setup lang="ts">
defineProps<{ open: number }>();
</script>

<template>
  <p v-if="open === 0">All done!</p>
  <p v-else>{{ open }} tasks left</p>
</template>
```

Both pass.

**Why `mountSuspended` instead of Vue Test Utils' `mount`?** It mounts inside a real Nuxt app, with plugins, auto-imports and router, and it waits for async setup. A component with `await useFetch(...)` at the top just works.

**Faster tests for plain logic.** A function in `app/utils/` that doesn't touch Nuxt can be tested without the Nuxt environment, which starts much faster.

```compare typescript
// React Testing Library: render(<TaskCount open={3} />)
// then expect(screen.getByText('3 tasks left')).
```

```compare python
# pytest: def test_task_count(): assert ... with a
# client fixture standing in for mountSuspended.
```

```exercise
goal: "Test the badge: mount it with `mountSuspended` and props `{ label: 'New' }`, then expect the text `New`."
lang: typescript
code: |-
  import { expect, it } from 'vitest';
  import { mountSuspended } from '@nuxt/test-utils/runtime';
  import AppBadge from '~/components/AppBadge.vue';

  it('shows its label', async () => {
  });
checks:
  - match: 'await mountSuspended\(AppBadge,\s*\{\s*props:\s*\{\s*label:\s*''New''\s*\}'
    message: "Mount it: await mountSuspended(AppBadge, { props: { label: 'New' } })."
  - match: 'expect\(wrapper\.text\(\)\)\.toBe\(''New''\)'
    message: Assert with expect(wrapper.text()).toBe('New').
solution: |-
  import { expect, it } from 'vitest';
  import { mountSuspended } from '@nuxt/test-utils/runtime';
  import AppBadge from '~/components/AppBadge.vue';

  it('shows its label', async () => {
    const wrapper = await mountSuspended(AppBadge, {
      props: { label: 'New' },
    });
    expect(wrapper.text()).toBe('New');
  });
```

```quiz
question: "A component test fails with `useRoute is not defined`. What's the likely cause?"
options:
  - useRoute must be imported from vue-router in tests.
  - The test isn't running in the Nuxt environment, so auto-imports don't exist.
  - The component needs a .client suffix.
answer: 1
explain: Auto-imports come from Nuxt. Run the test with environment 'nuxt' and use mountSuspended.
```

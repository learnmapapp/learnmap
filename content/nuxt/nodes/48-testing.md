---
title: Nuxt component tests
icon: 🌐
branch: production
requires:
  - props
summary: Install @nuxt/test-utils, @vue/test-utils, Vitest, and happy-dom as development dependencies.
---

In your Nuxt 4 project, save this as `tests/nuxt/task-card.test.ts`. Install @nuxt/test-utils, @vue/test-utils, Vitest, and happy-dom as development dependencies. Use the Nuxt test project configuration below, then run npx vitest run.

```typescript
import { expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import TaskCard from "../../app/components/TaskCard.vue";
it("renders a task title", async () => {
  const wrapper = await mountSuspended(TaskCard, { props: { title: "Practice" } });
  expect(wrapper.text()).toContain("Practice");
});
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

Create `vitest.config.ts` in the practice project root:

```typescript
import { defineConfig } from 'vitest/config';
import { defineVitestProject } from '@nuxt/test-utils/config';

export default defineConfig({
  test: {
    projects: [await defineVitestProject({
      test: { name: 'nuxt', include: ['tests/nuxt/*.test.ts'], environment: 'nuxt' },
    })],
  },
});
```

Keep `"type": "module"` in the project’s `package.json`.

```exercise
goal: Repair the starting example using what you learned about nuxt component tests.
lang: typescript
code: |-
  import { expect, it } from "vitest";
  import { mountSuspended } from "@nuxt/test-utils/runtime";
  import TaskCard from "../../app/components/TaskCard.vue";
  it("renders a task title", async () => {
    const wrapper = await mountSuspended(TaskCard, { props: { title: "Practice" } });
    expect(wrapper.text()).toContain("Missing");
  });
checks:
  - match: toContain\("Practice"\)
    message: Use toContain("Practice") for this step.
  - notMatch: toContain\("Missing"\)
    message: Replace toContain("Missing") in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about nuxt component tests is correct?
options:
  - Install @nuxt/test-utils, @vue/test-utils, Vitest, and happy-dom as development dependencies.
    Use the Nuxt test project configuration below, then run npx vitest run.
  - Nuxt runtime tests need no test environment configuration.
  - A component title test verifies API authorization too.
answer: 0
explain: Install @nuxt/test-utils, @vue/test-utils, Vitest, and happy-dom as development
  dependencies. Use the Nuxt test project configuration below, then run npx vitest run.
```

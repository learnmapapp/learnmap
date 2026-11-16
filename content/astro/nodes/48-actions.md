---
title: Validated server actions
icon: 🌐
branch: server
requires:
  - server-rendering
  - schemas
summary: Actions provide validated server entry points.
---

In your Astro project, save this as `src/actions/index.ts`. Actions provide validated server entry points. Call actions.greet from astro:actions in a browser script and handle its data and error results explicitly.

```typescript
import { defineAction } from "astro:actions";
import { z } from "astro/zod";
export const server = {
  greet: defineAction({
    input: z.object({ name: z.string().trim().min(1) }),
    handler: async ({ name }) => `Hello, ${name}`,
  }),
};
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about validated server actions.
lang: typescript
code: |-
  import { defineAction } from "astro:actions";
  import { z } from "astro/zod";
  export const server = {
    greet: defineAction({
      input: z.object({ name: z.string().trim().min(0) }),
      handler: async ({ name }) => `Hello, ${name}`,
    }),
  };
checks:
  - match: z\.string\(\)\.trim\(\)\.min\(1\)
    message: Use z.string().trim().min(1) for this step.
  - notMatch: z\.string\(\)\.trim\(\)\.min\(0\)
    message: Replace z.string().trim().min(0) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does an action's Zod input schema provide?
options:
  - Validation of the declared input contract.
  - Automatic authentication of every caller.
  - Persistence of all submitted values.
answer: 0
explain: Validation, authorization, and storage are separate responsibilities.
```

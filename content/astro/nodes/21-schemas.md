---
title: Validate content metadata
icon: 🧩
branch: content
requires:
  - collections
summary: A schema validates entry metadata and supplies useful inferred types.
---

In your Astro project, save this as `src/content.config.ts`. A schema validates entry metadata and supplies useful inferred types. Astro 7 imports Zod through astro/zod; give every note a string title in its frontmatter.

```typescript
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/notes" }),
  schema: z.object({ title: z.string(), draft: z.boolean().default(false) }),
});
export const collections = { notes };
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about validate content metadata.
lang: typescript
code: |-
  import { defineCollection } from "astro:content";
  import { glob } from "astro/loaders";
  import { z } from "astro/zod";
  const notes = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/data/notes" }),
    schema: z.object({ title: z.number(), draft: z.boolean().default(false) }),
  });
  export const collections = { notes };
checks:
  - match: title:\s+z\.string\(\)
    message: "Use title: z.string() for this step."
  - notMatch: title:\s+z\.number\(\)
    message: "Replace title: z.number() in the starting code."
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about validate content metadata is correct?
options:
  - A schema validates entry metadata and supplies useful inferred types. Astro 7 imports Zod
    through astro/zod; give every note a string title in its frontmatter.
  - Schemas validate only CSS colors.
  - An invalid title is always silently changed into a string.
answer: 0
explain: A schema validates entry metadata and supplies useful inferred types. Astro 7 imports Zod
  through astro/zod; give every note a string title in its frontmatter.
```

---
title: Collection schemas
icon: "📐"
branch: content
requires: [collections]
summary: Describe each entry's frontmatter with Zod, so typos and missing fields stop the build.
---
**Spot the mistakes.** Three posts, three frontmatter blocks. Which ones are broken?

```markdown
---
title: First light
date: 2026-03-02
---
```

```markdown
---
titel: Jupiter's moons
date: 2026-03-09
---
```

```markdown
---
title: Dark skies
date: next tuesday
tags: astronomy
---
```

The second misspells `title`. The third has a date nobody can parse, and a string where the site expects a list of tags. Without checks, these turn into a blank heading, an "Invalid Date" and a crash somewhere in your tag page. You'd find out from a reader.

**The fix: a [[schema]].** Add one to the collection, written with Zod, a validation library Astro includes:

```typescript title=src/content.config.ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

Now the build stops with a message naming the file and the field: the second post is missing `title`, the third has an invalid `date`, and `tags` should be an array. Mistakes are caught on your machine.

**Reading the schema:**

| Line | Means |
| --- | --- |
| `z.string()` | required text |
| `z.coerce.date()` | anything that converts to a `Date`, like `2026-03-02` |
| `z.array(z.string())` | a list of strings |
| `.default([])` | optional; use this value when it's missing |
| `.optional()` | optional, `undefined` when missing |

**The bonus: types.** Astro generates TypeScript types from the schema. `post.data.date` is a real `Date` (so `.getFullYear()` works), `post.data.tags` is a `string[]`, and your editor autocompletes all of it.

```compare javascript
// Without a schema, every page re-checks: if (!post.title) throw new
// Error(...)
```

```compare typescript
// Zod is popular outside Astro too; the same z.object works in any TS
// project.
```

```compare python
# Like a Pydantic model for each post's metadata.
```

```exercise
goal: "Add an optional `author` field: a string that defaults to `\"Nova\"`."
lang: typescript
code: |-
  const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: z.object({
      title: z.string(),
    }),
  });
checks:
  - match: 'author:\s*z\.string\(\)\.default\(\s*["'']Nova["'']\s*\)'
    message: 'Add author: z.string().default("Nova"),'
solution: |-
  const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: z.object({
      title: z.string(),
      author: z.string().default("Nova"),
    }),
  });
```

```quiz
question: "A post's frontmatter has `date: 2026-03-02`. With `date: z.coerce.date()`, what is `post.data.date`?"
options:
  - "The string \"2026-03-02\""
  - A JavaScript Date object
  - A number of milliseconds
answer: 1
explain: coerce.date() converts the value into a Date, and the generated types say so.
```

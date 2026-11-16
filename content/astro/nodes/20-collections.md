---
title: Define a collection
icon: 🔧
branch: content
requires:
  - markdown
summary: A content collection loads entries through a loader.
---

In your Astro project, save this as `src/content.config.ts`. A content collection loads entries through a loader. Create Markdown files under `src/data/notes`; this location does not create page routes automatically.

A useful term here is [[content collection]]: A named set of loaded content entries with an optional validated schema.

```typescript
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/notes" }),
});
export const collections = { notes };
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about define a collection.
lang: typescript
code: |-
  import { defineCollection } from "astro:content";
  import { glob } from "astro/loaders";
  const notes = defineCollection({
    loader: glob({ pattern: "**/*.txt", base: "./src/data/notes" }),
  });
  export const collections = { notes };
checks:
  - match: pattern:\s+"\*\*/\*\.md"
    message: 'Use pattern: "**/*.md" for this step.'
  - notMatch: pattern:\s+"\*\*/\*\.txt"
    message: 'Replace pattern: "**/*.txt" in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Does loading files into a content collection create page routes automatically?
options:
  - Yes; every entry immediately creates a public page.
  - Only entries whose title contains a space.
  - No; define pages that query and render the entries.
answer: 2
explain: Collection loading and page routing are separate responsibilities.
```

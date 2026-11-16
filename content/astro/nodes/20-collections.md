---
title: Content collections
icon: "🗂️"
branch: content
requires: [markdown]
summary: Group your Markdown posts into a collection that Astro loads, indexes and lets you query.
---
**Picture a library.** Loose papers in a drawer are fine until there are hundreds of them. A library gives each book a shelf, a catalog card and a librarian who can find "all books by this author, newest first". A [[content collection]] is that library for your posts.

**The shelf: a folder of files.** Posts move out of `src/pages/` into their own folder, where they're data rather than pages:

```text
src/
  content.config.ts
  content/
    blog/
      first-light.md
      jupiter-moons.md
      dark-skies.md
```

(Any folder works; `src/content/` is the convention.)

**The catalog: `src/content.config.ts`.** This special file declares your collections and where their entries come from:

```typescript title=src/content.config.ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
});

export const collections = { blog };
```

- `defineCollection` creates a collection.
- A *loader* tells Astro where the entries live. `glob` reads matching files from a folder; there's also `file` for a single JSON or YAML file, and community loaders for CMSs and APIs.
- The exported `collections` object names them. This one is called `blog`.

**The librarian: query functions.** Any page or component can now ask for entries:

```astro
---
import { getCollection } from "astro:content";
const posts = await getCollection("blog");
---
<p>{posts.length} posts so far.</p>
```

Each entry has an `id` (the file name without extension, such as `first-light`), its frontmatter as `data`, and its body ready to render.

**Why move to the library at all?**

- **Validation:** a [schema](node:schemas) checks every entry's frontmatter and stops the build on mistakes.
- **Types:** your editor knows that `post.data.title` is a string.
- **Speed:** Astro caches the entries, so big sites build faster.
- **Freedom:** you decide which URLs exist and how they look, using [routes](node:content-pages).

```compare javascript
// The manual way: fs.readdir + a front-matter parser, every time you
// need the list.
```

```compare typescript
// Like a typed repository layer over a folder of files.
```

```compare python
# Pelican or Hugo "sections": content in folders, queried by the
# templates.
```

```exercise
goal: "Register the `recipes` collection: export it in the `collections` object."
lang: typescript
code: |-
  import { defineCollection } from "astro:content";
  import { glob } from "astro/loaders";

  const recipes = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/recipes" }),
  });
checks:
  - match: 'export\s+const\s+collections\s*=\s*\{\s*recipes\s*\}'
    message: 'Add export const collections = { recipes };'
solution: |-
  import { defineCollection } from "astro:content";
  import { glob } from "astro/loaders";

  const recipes = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/recipes" }),
  });

  export const collections = { recipes };
```

```quiz
question: "Where do you declare content collections?"
options:
  - In astro.config.mjs.
  - In src/content.config.ts.
  - In each Markdown file's frontmatter.
answer: 1
explain: src/content.config.ts defines and exports the collections.
```

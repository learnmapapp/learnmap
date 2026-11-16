---
title: An RSS feed
icon: 📋
branch: routing
requires:
  - query
summary: Install @astrojs/rss and set site in astro.config.mjs to your real public origin.
---

In your Astro project, save this as `src/pages/rss.xml.ts`. Install @astrojs/rss and set site in astro.config.mjs to your real public origin. Feed links should point to published pages.

```typescript
import type { APIContext } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
export async function GET(context: APIContext) {
  const notes = await getCollection("notes", note => !note.data.draft);
  return rss({ title: "Study notes", description: "A learning journal", site: context.site!,
    items: notes.map(note => ({ title: note.data.title, link: `/notes/${note.id}/` })) });
}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about an rss feed.
lang: typescript
code: |-
  import type { APIContext } from "astro";
  import rss from "@astrojs/rss";
  import { getCollection } from "astro:content";
  export async function GET(context: APIContext) {
    const notes = await getCollection("notes", note => !note.data.draft);
    return rss({ title: "Untitled", description: "A learning journal", site: context.site!,
      items: notes.map(note => ({ title: note.data.title, link: `/notes/${note.id}/` })) });
  }
checks:
  - match: title:\s+"Study\s+notes"
    message: 'Use title: "Study notes" for this step.'
  - notMatch: title:\s+"Untitled"
    message: 'Replace title: "Untitled" in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about an rss feed is correct?
options:
  - context.site is always known without configuration.
  - Install @astrojs/rss and set site in astro.config.mjs to your real public origin. Feed links
    should point to published pages.
  - RSS requires a hydrated React tree.
answer: 1
explain: Install @astrojs/rss and set site in astro.config.mjs to your real public origin. Feed
  links should point to published pages.
```

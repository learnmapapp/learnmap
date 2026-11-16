---
title: Query a collection
icon: 📦
branch: content
requires:
  - schemas
  - lists
summary: getCollection retrieves loaded entries and can filter drafts.
---

In your Astro project, save this as `src/pages/index.astro`. `getCollection` retrieves loaded entries and can filter drafts. A link is useful only after a matching page route has been created.

```astro
---
import { getCollection } from "astro:content";
const notes = await getCollection("notes", entry => !entry.data.draft);
---
<ul>{notes.map(note => <li><a href={`/notes/${note.id}/`}>{note.data.title}</a></li>)}</ul>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about query a collection.
lang: astro
code: |-
  ---
  import { getCollection } from "astro:content";
  const notes = await getCollection("notes", entry => entry.data.draft);
  ---
  <ul>{notes.map(note => <li><a href={`/notes/${note.id}/`}>{note.data.title}</a></li>)}</ul>
checks:
  - match: entry\s+=>\s+!entry\.data\.draft
    message: Use entry => !entry.data.draft for this step.
  - notMatch: entry\s+=>\s+entry\.data\.draft
    message: Replace entry => entry.data.draft in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which filter selects published entries when `draft` is Boolean?
options:
  - '`entry => entry.id === "draft"`'
  - "`entry => !entry.data.draft`"
  - "`entry => entry.data.draft`"
answer: 1
explain: Publication state belongs to metadata rather than being inferred from an arbitrary ID.
```

---
title: A learning publication
icon: 🏷️
branch: tools
requires:
  - content-pages
  - layouts
  - seo
  - sitemap
  - testing
summary: Connect the earlier layout, notes schema, and generated note routes.
---

In your Astro project, save this as `src/pages/index.astro`. Connect the earlier layout, notes schema, and generated note routes. Add two notes, mark one as draft, build the project, and verify only the published note appears.

```astro
---
import Base from "../layouts/Base.astro";
import { getCollection } from "astro:content";
const notes = (await getCollection("notes")).filter(note => !note.data.draft);
---
<Base title="Learning journal">
  <h1>Learning journal</h1>
  <ul>{notes.map(note => <li><a href={`/notes/${note.id}/`}>{note.data.title}</a></li>)}</ul>
</Base>
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about a learning publication.
lang: astro
code: |-
  ---
  import Base from "../layouts/Base.astro";
  import { getCollection } from "astro:content";
  const notes = (await getCollection("notes")).filter(note => note.data.draft);
  ---
  <Base title="Learning journal">
    <h1>Learning journal</h1>
    <ul>{notes.map(note => <li><a href={`/notes/${note.id}/`}>{note.data.title}</a></li>)}</ul>
  </Base>
checks:
  - match: filter\(note\s+=>\s+!note\.data\.draft\)
    message: Use filter(note => !note.data.draft) for this step.
  - notMatch: filter\(note\s+=>\s+note\.data\.draft\)
    message: Replace filter(note => note.data.draft) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Why should the publication's listing omit draft entries?
options:
  - Because draft titles cannot be strings.
  - Because an anchor creates its own destination page.
  - To link only content intended for publication.
answer: 2
explain: Use a consistent publication policy when generating listings and article routes.
```

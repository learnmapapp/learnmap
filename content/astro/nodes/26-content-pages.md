---
title: Collection routes
icon: 🏷️
branch: routing
requires:
  - render-content
  - static-paths
summary: Pass an entry through route props to avoid looking it up again.
---

In your Astro project, save this as `src/pages/notes/[...id].astro`. Pass an entry through route props to avoid looking it up again. A rest parameter supports collection IDs containing nested path segments.

```astro
---
import { getCollection, render } from "astro:content";
export async function getStaticPaths() {
  const notes = await getCollection("notes", note => !note.data.draft);
  return notes.map(note => ({ params: { id: note.id }, props: { note } }));
}
const { note } = Astro.props;
const { Content } = await render(note);
---
<h1>{note.data.title}</h1>
<Content />
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about collection routes.
lang: astro
code: |-
  ---
  import { getCollection, render } from "astro:content";
  export async function getStaticPaths() {
    const notes = await getCollection("notes", note => note.data.draft);
    return notes.map(note => ({ params: { id: note.id }, props: { note } }));
  }
  const { note } = Astro.props;
  const { Content } = await render(note);
  ---
  <h1>{note.data.title}</h1>
  <Content />
checks:
  - match: note\s+=>\s+!note\.data\.draft
    message: Use note => !note.data.draft for this step.
  - notMatch: note\s+=>\s+note\.data\.draft
    message: Replace note => note.data.draft in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Why use `[...id].astro` for collection IDs that may contain slashes?
options:
  - It removes the need to load content.
  - It guarantees every ID contains exactly one segment.
  - A rest parameter can match multiple path segments.
answer: 2
explain: A single bracketed parameter matches one segment; a rest parameter can span several.
```

---
title: Render an entry
icon: 🛠️
branch: content
requires:
  - query
summary: render converts an entry’s body into a component.
---

In your Astro project, save this as `src/pages/index.astro`. render converts an entry’s body into a component. Check for absence before accessing metadata or rendering content.

```astro
---
import { getEntry, render } from "astro:content";
const entry = await getEntry("notes", "welcome");
if (!entry) throw new Error("Create src/data/notes/welcome.md first");
const { Content } = await render(entry);
---
<h1>{entry.data.title}</h1>
<Content />
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about render an entry.
lang: astro
code: |-
  ---
  import { getEntry, render } from "astro:content";
  const entry = await getEntry("notes", "missing");
  if (!entry) throw new Error("Create src/data/notes/welcome.md first");
  const { Content } = await render(entry);
  ---
  <h1>{entry.data.title}</h1>
  <Content />
checks:
  - match: getEntry\("notes",\s+"welcome"\)
    message: Use getEntry("notes", "welcome") for this step.
  - notMatch: getEntry\("notes",\s+"missing"\)
    message: Replace getEntry("notes", "missing") in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `render(entry)` provide for an entry's body?
options:
  - A new route added automatically to pages.
  - A client-side editor for the Markdown source.
  - A `Content` component that can be rendered.
answer: 2
explain: Querying metadata and rendering an entry's body are distinct steps.
```

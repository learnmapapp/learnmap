---
title: "Effects"
icon: "🔌"
branch: "effects"
requires: ["state", "events"]
summary: "Synchronize with an external system after React commits."
---

An [[effect]] connects committed UI state to something outside the render calculation:

```jsx
import { useEffect, useState } from "react";

export default function TitleEditor() {
  const [title, setTitle] = useState("React lab");
  useEffect(() => {
    document.title = title;
  }, [title]);
  return <label>Page title <input value={title} onChange={event => setTitle(event.target.value)} /></label>;
}
```

Updating the browser title is external synchronization. Computing a filtered list from current inputs is a render calculation and usually needs no effect.

## Respond to the right cause

Work caused by a specific user action generally belongs in its handler. An effect instead describes a relationship that should stay synchronized while the component exists and its dependencies change.

Effects do not run during server rendering. If an external connection needs cleanup, return a cleanup function. Development Strict Mode can exercise setup and cleanup an extra time to expose missing symmetry.

Do not make the effect callback itself `async`; React expects an optional cleanup function, not a promise. Start asynchronous work inside it and manage its lifecycle explicitly.

```exercise
goal: "Declare the title dependency used by the effect."
lang: jsx
code: |
  import { useEffect } from "react";
  export default function Page({ title = "React lab" }) {
    useEffect(() => { document.title = title; }, []);
    return <h1>{title}</h1>;
  }
checks:
  - match: "\\},\\s+\\[title\\]\\);"
    message: "Include title in the effect dependency list."
hint: "Include title in the effect dependency list."
```

```quiz
question: "Which task is a natural use for an effect?"
options:
  - "Filtering current props to display a list."
  - "Synchronizing the browser title with component state."
  - "Building a greeting string from two names."
answer: 1
explain: "Effects synchronize external systems; ordinary derived calculations belong in rendering."
```

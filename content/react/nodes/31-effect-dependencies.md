---
title: "Effect dependencies"
icon: "🔗"
branch: "effects"
requires: ["effects", "props"]
summary: "List the reactive values the synchronization actually reads."
---

Dependencies describe which render values an effect uses. React compares each listed value with its previous value using `Object.is`:

```jsx
import { useEffect } from "react";

export default function Page({ title = "Lessons" }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return <h1>{title}</h1>;
}
```

Omitting `title` would leave the synchronization tied to an older render's value. Configure the Hooks lint rules in a real project rather than manually suppressing dependency warnings.

## Change the code, not the facts

An object or function created during rendering has a new identity each time. If an effect depends on it, the effect can rerun even when its contents seem equal. Move an unnecessary helper inside the effect or use stable primitive inputs where appropriate.

An empty dependency list means the effect reads no changing reactive values; it is not a general instruction to "ignore updates." In development Strict Mode, even an empty-list effect may have an extra setup and cleanup cycle.

```exercise
goal: "Track roomId so the external title stays synchronized."
lang: jsx
code: |
  import { useEffect } from "react";
  export default function Room({ roomId = "lobby" }) {
    useEffect(() => { document.title = `Room ${roomId}`; }, []);
    return <h1>{roomId}</h1>;
  }
checks:
  - match: "\\},\\s+\\[roomId\\]\\);"
    message: "Include roomId rather than suppressing its updates."
hint: "Include roomId rather than suppressing its updates."
```

```quiz
question: "What should determine an effect's dependencies?"
options:
  - "Which values its synchronization reads."
  - "How often you personally want it to run, regardless of its code."
  - "The number of DOM nodes."
answer: 0
explain: "Dependencies represent the reactive values read by the effect."
```

---
title: "Portals"
icon: "🌀"
branch: "experience"
requires: ["dom-refs", "context"]
summary: "Place DOM elsewhere while retaining React ancestry."
---

A [[portal]] renders children into a different DOM container while preserving their place in the React tree:

```jsx
import { useState } from "react";
import { createPortal } from "react-dom";

export default function Notice() {
  const [open, setOpen] = useState(false);
  return <><button onClick={() => setOpen(true)}>Show notice</button>
    {open && createPortal(
      <aside aria-label="Notice"><p>Your draft is local.</p><button onClick={() => setOpen(false)}>Close</button></aside>,
      document.body
    )}</>;
}
```

This can avoid clipping from an ancestor's overflow or stacking context. Context still flows through React ancestry, and React events can propagate through that tree even though the DOM location changed.

## Placement is not accessibility

A portal alone does not implement a modal dialog. A modal needs appropriate semantics, focus movement and restoration, keyboard dismissal, and containment of interaction while open. Use a well-designed dialog primitive or implement those behaviors deliberately.

The target container must exist in the client environment. Server-rendered components cannot read `document` while rendering on the server; this example only uses it after the user opens the notice.

```exercise
goal: "Mount the notice into the body using createPortal."
lang: jsx
code: |
  import { createPortal } from "react-dom";
  export default function Notice({ open = false }) {
    return open ? createPortal(<aside>Notice</aside>, null) : null;
  }
checks:
  - match: "createPortal\\(<aside>Notice</aside>,\\s+document\\.body\\)"
    message: "Pass an existing DOM container such as document.body."
hint: "Pass an existing DOM container such as document.body."
```

```quiz
question: "Does a portal break the child's React context ancestry?"
options:
  - "Yes, context follows only DOM parents."
  - "No, React ancestry remains intact."
  - "Only if rendered into body."
answer: 1
explain: "A portal changes DOM placement while retaining the React tree relationship."
```

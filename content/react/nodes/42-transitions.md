---
title: "Transitions"
icon: "🚥"
branch: "performance"
requires: ["state", "controlled-inputs", "suspense"]
summary: "Mark non-urgent UI work while keeping immediate input updates urgent."
---

`useTransition` provides a way to mark updates as non-urgent and expose whether that work is pending:

```jsx
import { useState, useTransition } from "react";

export default function Tabs() {
  const [tab, setTab] = useState("overview");
  const [isPending, startTransition] = useTransition();
  function selectDetails() {
    startTransition(() => setTab("details"));
  }
  return <><button onClick={selectDetails}>Details</button>
    <p aria-busy={isPending}>Current tab: {tab}</p></>;
}
```

The transition callback runs immediately; its state updates are marked for interruptible rendering. It does not move arbitrary JavaScript computation to a background thread.

## Prioritize the interaction

Controlled input text should update urgently. Transition the expensive dependent UI, not the input's own value update. A transition can help avoid replacing already revealed content with a fallback during a supported suspenseful update.

This tiny tab example demonstrates the API, not a measurable optimization. Use transitions where real rendering work or loading behavior benefits. If independent async requests can race, their ordering still needs to be handled by the data or action layer.

```exercise
goal: "Mark the tab update as a transition."
lang: jsx
code: |
  import { useState, useTransition } from "react";
  export default function Tabs() {
    const [tab, setTab] = useState("overview");
    const [isPending, startTransition] = useTransition();
    return <button aria-busy={isPending} onClick={() => setTab("details")}>{tab}</button>;
  }
checks:
  - match: "onClick=\\{\\(\\)\\s+=>\\s+startTransition\\(\\(\\)\\s+=>\\s+setTab\\(\"details\"\\)\\)\\}"
    message: "Wrap the non-urgent tab update in startTransition."
hint: "Wrap the non-urgent tab update in startTransition."
```

```quiz
question: "Does startTransition move arbitrary CPU work into another thread?"
options:
  - "Yes."
  - "No, it marks related state updates for rendering priority."
  - "Only in development."
answer: 1
explain: "Transitions affect React scheduling; synchronous work in the callback still runs normally."
```

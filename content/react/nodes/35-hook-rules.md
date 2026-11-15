---
title: "Rules of Hooks"
icon: "📏"
branch: "effects"
requires: ["custom-hooks", "state"]
summary: "Keep ordinary Hook calls at the top level and keep rendering pure."
---

Call Hooks such as `useState`, `useEffect`, and your custom Hooks at the top level of a component or another custom Hook:

```jsx
import { useState } from "react";

export default function Details({ visible = true }) {
  const [expanded, setExpanded] = useState(false);
  if (!visible) return null;
  return <button onClick={() => setExpanded(previous => !previous)}>
    {expanded ? "Expanded" : "Collapsed"}
  </button>;
}
```

The Hook runs before the conditional early return, so its position stays consistent across renders. Calling it only when visible would change the call sequence.

## Let tools help

The Hooks ESLint rules catch many invalid calls and missing dependencies. Do not put Hooks inside event handlers, loops, or nested callback functions. Name ordinary pure helpers without the `use` prefix unless they actually need Hook semantics.

React's newer `use` API has specific exceptions to some call-order rules; those exceptions do not apply to `useState` or `useEffect`. Learn the ordinary rules first and consult the API contract when using a different primitive.

```exercise
goal: "Call useState unconditionally before the early return."
lang: jsx
code: |
  import { useState } from "react";
  export default function Details({ visible = true }) {
    if (visible) useState(false);
    if (!visible) return null;
    return <button onClick={() => setExpanded(previous => !previous)}>{String(expanded)}</button>;
  }
checks:
  - match: "const\\s+\\[expanded,\\s+setExpanded\\]\\s+=\\s+useState\\(false\\);"
    message: "Declare the Hook at the top level before the early return."
hint: "Declare the Hook at the top level before the early return."
```

```quiz
question: "Where should useState appear relative to a conditional early return?"
options:
  - "After it, only when the branch renders."
  - "Before it at the component's top level."
  - "Inside the click handler."
answer: 1
explain: "Ordinary Hooks must preserve a consistent top-level call sequence."
```

---
title: "Derived values"
icon: "🧮"
branch: "architecture"
requires: ["lifting-state", "lists"]
summary: "Calculate what you can from current inputs instead of synchronizing copies."
---

A value computed from existing props or state usually belongs in the render calculation:

```jsx
import { useState } from "react";

export default function SearchableNames() {
  const [query, setQuery] = useState("");
  const names = ["Ada", "Grace", "Linus"];
  const visible = names.filter(name => name.toLowerCase().includes(query.toLowerCase()));
  return <><label>Search <input value={query} onChange={event => setQuery(event.target.value)} /></label>
    <ul>{visible.map(name => <li key={name}>{name}</li>)}</ul></>;
}
```

There is no `visible` state and no effect to keep it synchronized. Each render computes the view from the current query and data.

## Avoid a delayed copy

An effect that filters records and sets new state causes another render and briefly carries an outdated derived result. Keeping only the source inputs removes that synchronization problem.

If a calculation is measured to be expensive, memoization may help. First make the data flow correct; do not add memoization to justify duplicating derived state. Values such as a full name, selected record, or item count often need no independent state at all.

```exercise
goal: "Derive the count from the current items rather than a fixed value."
lang: jsx
code: |
  export default function Summary() {
    const items = ["JSX", "State"];
    const count = 0;
    return <p>{count} lessons</p>;
  }
checks:
  - match: "const\\s+count\\s+=\\s+items\\.length;"
    message: "Read items.length instead of storing a separate count."
hint: "Read items.length instead of storing a separate count."
```

```quiz
question: "Where should an ordinary filtered view of current data usually be calculated?"
options:
  - "During rendering from its current inputs."
  - "In state synchronized by a mandatory effect."
  - "Only inside a DOM event."
answer: 0
explain: "Pure derived values can be computed directly; no second source of truth is needed."
```

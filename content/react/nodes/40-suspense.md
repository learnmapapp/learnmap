---
title: "Suspense"
icon: "⏳"
branch: "performance"
requires: ["error-boundaries", "fetching-data"]
summary: "Describe a loading boundary for work that actually integrates with Suspense."
---

[[Suspense]] shows a fallback when a descendant suspends through a supported mechanism. Lazy component loading is one such mechanism:

```jsx
import { lazy, Suspense } from "react";

const Summary = lazy(async () => ({
  default: function Summary() { return <p>Three lessons remain.</p>; },
}));
export default function App() {
  return <Suspense fallback={<p>Loading summary</p>}><Summary /></Suspense>;
}
```

This small resolved-module example demonstrates the boundary without a separate file. The next lesson uses a real dynamic import to load a component chunk.

## Not every pending request suspends

A fetch started in `useEffect` does not automatically activate a Suspense fallback. Data-driven Suspense needs an integrating framework, library, or supported resource pattern. Do not create a fresh uncached promise on every render and expect a stable data layer.

Suspense handles waiting; error boundaries handle failures. Place boundaries around coherent sections, so unrelated UI can remain usable. Reveal order and transitions affect whether existing content stays visible while something new loads.

```exercise
goal: "Supply the loading UI through the Suspense fallback prop."
lang: jsx
code: |
  import { Suspense } from "react";
  export default function App() {
    return <Suspense loading={<p>Loading</p>}><h1>Lessons</h1></Suspense>;
  }
checks:
  - match: "fallback=\\{<p>Loading</p>\\}"
    message: "Name the prop fallback."
hint: "Name the prop fallback."
```

```quiz
question: Does an arbitrary fetch inside `useEffect` automatically trigger Suspense?
options:
  - Yes.
  - No, the work must integrate with Suspense.
  - Only if the URL ends in JSON.
answer: 1
explain: Effect-based fetching is not automatically a Suspense data source.
```

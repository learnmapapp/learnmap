---
title: "Lazy components"
icon: "📦"
branch: "performance"
requires: ["suspense"]
summary: "Load a component module on demand and keep its declaration stable."
---

`lazy` wraps a promise for a component module. A dynamic import lets the bundler split the module into a separate chunk:

```jsx title=LessonDetails.jsx
export default function LessonDetails() {
  return <p>Practice makes the next step easier.</p>;
}
```

```jsx title=App.jsx
import { lazy, Suspense } from "react";
const LessonDetails = lazy(() => import("./LessonDetails.jsx"));

export default function App() {
  return <Suspense fallback={<p>Loading details</p>}><LessonDetails /></Suspense>;
}
```

The imported module must provide the component as its `default` export for this direct pattern. A named export needs an adapter that returns the required module shape.

## Declare outside rendering

Put the lazy declaration at module level. Declaring it inside the component creates a new component identity on subsequent renders and can reset state.

Code splitting reduces the initial bundle only when it moves meaningful code behind a later boundary. It also introduces a network request and possible loading failure. Pair a coherent Suspense fallback with an error boundary where recovery is useful, and measure the real loading experience rather than splitting every tiny component.

```exercise
goal: "Adapt the named module field into the default export shape lazy expects."
lang: jsx
code: |
  import { lazy, Suspense } from "react";
  const Panel = lazy(async () => ({ Panel: function Panel() { return <p>Ready</p>; } }));
  export default function App() { return <Suspense fallback={<p>Loading</p>}><Panel /></Suspense>; }
checks:
  - match: "\\(\\{\\s+default:\\s+function\\s+Panel\\(\\)"
    message: "Resolve an object with a default component export."
hint: "Resolve an object with a default component export."
```

```quiz
question: "Where should a lazy component declaration normally live?"
options:
  - "At module level outside rendering."
  - "Inside every click handler."
  - "Inside the component on each render."
answer: 0
explain: "A stable module-level declaration preserves component identity."
```

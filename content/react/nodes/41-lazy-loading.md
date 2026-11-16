---
title: "Lazy components"
icon: "📦"
branch: "performance"
requires: ["suspense"]
summary: "Load a component module on demand and keep its declaration stable."
---
Your app has a rich-text editor that only admins ever open. It's a big library, and right now **every** visitor downloads it with the rest of the app, before seeing anything.

`lazy` splits a component into its own file that's downloaded the first time it's rendered.

## Before

```jsx
import AdminEditor from "./AdminEditor";
```

A normal `import` puts `AdminEditor`, and everything it imports, into the main bundle.

## After

```jsx
import { lazy, Suspense } from "react";

const AdminEditor = lazy(() => import("./AdminEditor"));

export default function AdminPage({ isAdmin }) {
  if (!isAdmin) return <p>Nothing to see here.</p>;
  return (
    <Suspense fallback={<p>Loading editor…</p>}>
      <AdminEditor />
    </Suspense>
  );
}
```

`import("./AdminEditor")` (with parentheses) is a *dynamic import*: it returns a promise and loads the module when it's called. Vite sees it and puts the editor in a separate chunk. While that chunk downloads, the nearest [Suspense](node:suspense) boundary shows its fallback.

## Three things to get right

**1. `lazy` expects a default export.** It needs a promise that resolves to `{ default: Component }`, which is what `import()` gives you for a module with `export default`. For a named export, convert it:

```jsx
const Chart = lazy(() =>
  import("./charts").then(module => ({ default: module.Chart })),
);
```

**2. Declare it at the top level of a module**, never inside a component. Inside, every render would create a **new** lazy component, which React treats as a different type: it would reset its state and load again.

**3. Have a fallback ready.** A lazy component without a Suspense boundary above it suspends up to the nearest one, which may be far higher than you expect.

## What's worth splitting?

Routes and pages, big rarely-used features (editors, charts, maps), and modals. Not small components: each chunk is a separate request, so splitting tiny pieces makes things slower. The bundle report from `vite build` shows the size of each chunk, so you can measure first.

```compare javascript
// Dynamic import works without React too:
const { default: Editor } = await import("./AdminEditor.js");
```

```exercise
goal: "`lazy` needs an object with a `default` property, but this one has `Panel`. Rename the key."
lang: jsx
code: |
  import { lazy, Suspense } from "react";
  const Panel = lazy(async () => ({ Panel: function Panel() { return <p>Ready</p>; } }));
  export default function App() { return <Suspense fallback={<p>Loading</p>}><Panel /></Suspense>; }
checks:
  - match: '\(\{\s+default:\s+function\s+Panel\(\)'
    message: "Resolve an object with a default property."
hint: "Change the first Panel: to default:"
solution: |
  import { lazy, Suspense } from "react";
  const Panel = lazy(async () => ({ default: function Panel() { return <p>Ready</p>; } }));
  export default function App() { return <Suspense fallback={<p>Loading</p>}><Panel /></Suspense>; }
```

```quiz
question: "Why must `lazy(...)` be called outside the component?"
options:
  - React only allows lazy in module scope for performance.
  - Inside, each render creates a new component type, resetting state and loading again.
  - The import path is only valid at the top level.
answer: 1
explain: React compares component types by identity. A new lazy() is a new type.
```

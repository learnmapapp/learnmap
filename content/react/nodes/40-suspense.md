---
title: "Suspense"
icon: "⏳"
branch: "performance"
requires: ["error-boundaries", "fetching-data"]
summary: "Describe a loading boundary for work that actually integrates with Suspense."
---
## The idea, at a restaurant

You order three dishes. The kitchen could bring each one when it's ready, in any order, with the table rearranging itself every few minutes. Or the waiter could say "your mains are on their way", and bring them together.

`<Suspense>` is that waiter. You wrap part of the page, and give it a **fallback** to show while anything inside is still loading:

```jsx
import { Suspense } from "react";

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <Suspense fallback={<p>Loading your stats…</p>}>
        <Stats />
        <RecentActivity />
      </Suspense>
    </>
  );
}
```

The heading shows immediately. `Stats` and `RecentActivity` appear **together** when both are ready; until then, the fallback shows in their place.

## What can make a component "not ready"?

This is the important fine print: Suspense doesn't detect a `fetch` in an [effect](node:fetching-data). A component has to **suspend**, which only happens with sources built for it:

- [lazy-loaded components](node:lazy-loading), loading their code,
- the `use` API reading a promise that was created outside rendering (for example by a framework),
- Suspense-enabled data libraries and frameworks: Next.js, React Router, TanStack Query and others.

If you fetch in `useEffect`, you're managing your own loading state, and Suspense won't help.

## Placing boundaries

Where you put boundaries decides what loads together:

```jsx
<Suspense fallback={<PageSkeleton />}>
  <Header />
  <Suspense fallback={<SidebarSkeleton />}>
    <Sidebar />
  </Suspense>
  <Main />
</Suspense>
```

The outer fallback shows until `Header` and `Main` are ready. Then `Sidebar` may still show its own fallback for a moment. Group things that should appear together; split things that are independent.

## With an error boundary

Suspense handles "not ready yet". An [error boundary](node:error-boundaries) handles "failed". They're often used as a pair around the same section.

```tip
Skeleton placeholders the same size as the real content prevent the page from jumping when it arrives.
```

```compare javascript
// Without React, you'd show a spinner, await everything, then
// replace it:
spinner.hidden = false;
await Promise.all([loadStats(), loadActivity()]);
spinner.hidden = true;
```

```exercise
goal: "`Suspense` has no `loading` prop, so nothing shows while waiting. Use the right prop name."
lang: jsx
code: |
  import { Suspense } from "react";
  export default function App() {
    return <Suspense loading={<p>Loading</p>}><h1>Lessons</h1></Suspense>;
  }
checks:
  - match: 'fallback=\{<p>Loading</p>\}'
    message: "Name the prop fallback."
hint: It's what you fall back to while waiting.
solution: |
  import { Suspense } from "react";
  export default function App() {
    return <Suspense fallback={<p>Loading</p>}><h1>Lessons</h1></Suspense>;
  }
```

```quiz
question: "A component fetches data in `useEffect`. Will a surrounding `<Suspense>` show its fallback while it loads?"
options:
  - Yes, Suspense detects any fetch.
  - No, only sources that suspend, like lazy components or Suspense-enabled libraries, trigger it.
  - Only if the fetch takes longer than a second.
answer: 1
explain: An effect runs after rendering, so the component never suspends.
```

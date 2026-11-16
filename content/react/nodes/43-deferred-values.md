---
title: "Deferred values"
icon: "🐢"
branch: "performance"
requires: ["transitions", "derived-state"]
summary: "Let expensive results lag behind an immediately updated input."
---
Imagine a search box over 5,000 products, where rendering the result list is slow. Type "keyboard" and the input stutters: each letter waits for the whole list to re-render before it appears.

[Transitions](node:transitions) fix that when you own the state update. But often the slow part is a component that just receives a value as a prop. That's where `useDeferredValue` comes in.

## Two versions of the same value

```jsx
import { useDeferredValue, useState } from "react";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <SlowResults query={deferredQuery} />
    </>
  );
}
```

`useDeferredValue(query)` gives you a copy of `query` that's **allowed to lag behind**. Here's what happens as you type "key":

| You type | `query` (input) | `deferredQuery` (results) |
| --- | --- | --- |
| k | "k" | "" → then "k" when there's time |
| e | "ke" | still working on "k"... |
| y | "key" | skips "ke", goes to "key" |

The input always shows exactly what you typed. The results catch up when React has time, and skip the in-between values if you type faster than they render.

## Show that results are stale

When the two values differ, the list on screen is out of date. Say so, gently:

```jsx
const isStale = query !== deferredQuery;

<div style={{ opacity: isStale ? 0.5 : 1 }}>
  <SlowResults query={deferredQuery} />
</div>
```

## Making it actually skip work

For the background render to be cheap to throw away, `SlowResults` should skip re-rendering when its `query` prop hasn't changed. Wrap it in `memo` ([next lesson](node:memoization)):

```jsx
const SlowResults = memo(function SlowResults({ query }) {
  // ...
});
```

## Deferred value or transition?

- You call the setter yourself and can wrap it: **transition**.
- You receive the value (a prop, or state you don't want to split): **deferred value**.

Both do the same thing underneath: mark some rendering as interruptible.

```compare javascript
// The classic non-React approach is debouncing: wait until the user
// pauses typing. Deferred values adapt to the device instead of using
// a fixed delay.
```

```exercise
goal: "The filter uses `query`, so it still runs on every keystroke. Filter with `deferredQuery` instead."
lang: jsx
code: |
  import { useDeferredValue, useState } from "react";
  export default function Search() {
    const [query, setQuery] = useState("");
    const deferredQuery = useDeferredValue(query);
    const visible = ["Ada", "Grace"].filter(name => name.includes(query));
    return <><input aria-label="Search" value={query} onChange={event => setQuery(event.target.value)} /><p>{visible.join(", ")}</p></>;
  }
checks:
  - match: 'name\.includes\(deferredQuery\)'
    message: "Use deferredQuery in the filter."
  - match: 'value=\{query\}'
    message: "Keep the input showing query, so typing stays instant."
hint: Only the slow part should use the lagging value.
solution: |
  import { useDeferredValue, useState } from "react";
  export default function Search() {
    const [query, setQuery] = useState("");
    const deferredQuery = useDeferredValue(query);
    const visible = ["Ada", "Grace"].filter(name => name.includes(deferredQuery));
    return <><input aria-label="Search" value={query} onChange={event => setQuery(event.target.value)} /><p>{visible.join(", ")}</p></>;
  }
```

```quiz
question: "Which value should the input's `value` use?"
options:
  - deferredQuery, so it matches the results.
  - query, so typing appears instantly.
  - Either; they're always equal.
answer: 1
explain: The input must stay urgent. Only the slow results use the deferred copy.
```

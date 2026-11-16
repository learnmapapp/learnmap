---
title: "Deferred values"
icon: "🐢"
branch: "performance"
requires: ["transitions", "derived-state"]
summary: "Let expensive results lag behind an immediately updated input."
---

`useDeferredValue` lets a dependent view render from an older value while React works on a newer render:

```jsx
import { useDeferredValue, useState } from "react";

const names = ["Ada", "Grace", "Linus"];
export default function Search() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const stale = deferredQuery !== query;
  const visible = names.filter(name => name.toLowerCase().includes(deferredQuery.toLowerCase()));
  return <><label>Search <input value={query} onChange={event => setQuery(event.target.value)} /></label>
    <ul style={{ opacity: stale ? 0.6 : 1 }}>{visible.map(name => <li key={name}>{name}</li>)}</ul></>;
}
```

The input remains controlled by `query`. Results use the deferred value, and the comparison can indicate stale content.

## Not a debounce timer

Deferral does not impose a fixed delay or automatically reduce network requests. Fetch caching, cancellation, and request-rate control are separate concerns.

A three-item list does not need this optimization; the example shows data flow. For a slow child, an appropriate memoization boundary can let React skip its urgent render until the deferred value changes. Measure the real workload and preserve clear feedback when the displayed result is stale.

```exercise
goal: "Filter using the deferred query while the input keeps its immediate query."
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
  - match: "name\\.includes\\(deferredQuery\\)"
    message: "Use deferredQuery in the dependent filter."
hint: "Use deferredQuery in the dependent filter."
```

```quiz
question: Does `useDeferredValue` automatically debounce network requests?
options:
  - Yes, with a fixed half-second delay.
  - No, it controls rendering priority rather than request rate.
  - Only for text inputs.
answer: 1
explain: Deferral schedules rendering; request debouncing and caching require separate mechanisms.
```

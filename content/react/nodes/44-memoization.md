---
title: "Memoization"
icon: "📊"
branch: "performance"
requires: ["derived-state", "props", "events"]
summary: "Cache measured work without making correctness depend on a cache."
---

`useMemo` can reuse a pure calculation while its dependencies stay equal:

```jsx
import { useMemo } from "react";

const initialScores = [10, 20, 12];
export default function Total({ scores = initialScores }) {
  const total = useMemo(() => scores.reduce((sum, score) => sum + score, 0), [scores]);
  return <p>Total: {total}</p>;
}
```

This small sum is cheap; it demonstrates syntax rather than a reason to cache every expression. A stale dependency list can make the displayed value incorrect.

## Related tools

`memo` can skip a component render when props compare equal. `useCallback` can preserve a function identity between renders. Neither fixes mutation or makes an impure component correct. A freshly created object prop can also defeat a memoized child's shallow comparison.

Use the profiler to locate meaningful work before adding manual caches. React Compiler can automate memoization when enabled and supported by the project, but do not assume every app has it configured.

Treat caching as an optimization. The component should remain correct if the calculation runs again; it must not depend on a cached value as durable storage.

```exercise
goal: "Declare the scores dependency of the memoized total."
lang: jsx
code: |
  import { useMemo } from "react";
  const initial = [10, 20, 12];
  export default function Total({ scores = initial }) {
    const total = useMemo(() => scores.reduce((sum, score) => sum + score, 0), []);
    return <p>{total}</p>;
  }
checks:
  - match: ",\\s+\\[scores\\]\\);"
    message: "Include scores in the dependency list."
hint: "Include scores in the dependency list."
```

```quiz
question: Should correctness depend on `useMemo` never recalculating?
options:
  - Yes, the cache is permanent state.
  - No, memoization is a performance optimization.
  - Only for arrays.
answer: 1
explain: A memoized calculation must stay pure and correct if React recalculates it.
```

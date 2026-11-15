---
title: "Updater functions"
icon: "🔁"
branch: "interaction"
requires: ["state-snapshots"]
summary: "Compose queued state updates from the previous value."
---

When a new state depends on its previous value, pass a function to the setter:

```jsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  function addThree() {
    setCount(previous => previous + 1);
    setCount(previous => previous + 1);
    setCount(previous => previous + 1);
  }
  return <button onClick={addThree}>Count: {count}</button>;
}
```

React applies queued updater functions in sequence. Three calls with `setCount(count + 1)` from the same snapshot would request the same replacement value three times.

## Updaters must be pure

An updater calculates the next state. Do not send requests, mutate external objects, or perform other side effects inside it. Development checks may call it again to expose impurities.

React batches many updates so several setter calls can produce one render. Do not depend on the exact number of renders as application behavior. Depend on the final state and the contract of the updater queue instead.

```exercise
goal: "Increment from the queued previous value."
lang: jsx
code: |
  import { useState } from "react";
  export default function Counter() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
  }
checks:
  - match: "setCount\\(previous\\s+=>\\s+previous\\s+\\+\\s+1\\)"
    message: "Pass previous => previous + 1 to setCount."
hint: "Pass previous => previous + 1 to setCount."
```

```quiz
question: "Why use a functional updater for several dependent increments?"
options:
  - "It processes the latest queued previous value."
  - "It creates a new thread."
  - "It prevents all rerenders."
answer: 0
explain: "Each updater receives the preceding queued result rather than a stale render snapshot."
```

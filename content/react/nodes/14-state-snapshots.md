---
title: "State snapshots"
icon: "📸"
branch: "interaction"
requires: ["state"]
summary: "A setter schedules a future render; it does not rewrite the current local value."
---

Each render sees a [[snapshot]] of state. Calling a setter does not change the variables in that render's running handler:

```jsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  function handleClick() {
    const next = count + 1;
    setCount(next);
    console.log("Requested", next, "from", count);
  }
  return <button onClick={handleClick}>{count}</button>;
}
```

The first click requests `1` but still reads `count` as `0` inside that handler. React later calls the component with the updated state.

## Closures retain their render's values

A timeout or asynchronous callback can retain the values from when it was created. That is normal JavaScript closure behavior, not evidence that the setter failed.

If you need to calculate the next state from queued previous state, use an [updater function](node:updater-functions). If you need a mutable value whose changes should not render, consider a ref. Choose based on the value's role rather than using a ref to bypass ordinary state flow.

```exercise
goal: "Log the requested next value explicitly instead of assuming count has changed."
lang: jsx
code: |
  import { useState } from "react";
  export default function Counter() {
    const [count, setCount] = useState(0);
    function handleClick() {
      const next = count + 1;
      setCount(next);
      console.log(count);
    }
    return <button onClick={handleClick}>{count}</button>;
  }
checks:
  - match: "console\\.log\\(next\\);"
    message: "Log next, the value calculated before calling the setter."
hint: "Log next, the value calculated before calling the setter."
```

```quiz
question: Does `setCount(1)` immediately change count in the already running handler?
options:
  - Yes.
  - No, that handler retains its render snapshot.
  - Only in production.
answer: 1
explain: The setter requests a future render; local snapshot variables stay unchanged.
```

---
title: "Effect cleanup"
icon: "🧹"
branch: "effects"
requires: ["effect-dependencies", "updater-functions"]
summary: "Undo subscriptions and timers before replacement or removal."
---

Return a function from an effect to clean up what its setup created:

```jsx
import { useEffect, useState } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds(previous => previous + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <p>{seconds} seconds</p>;
}
```

Before rerunning an effect for changed dependencies, React runs the prior cleanup with its old values. Cleanup also runs when the component is removed.

## Symmetry matters

Pair `addEventListener` with `removeEventListener`, and connection setup with disconnection. Use the same handler identity when removing a listener. A cleanup function should undo this effect's setup, not unrelated application state.

Development Strict Mode deliberately exercises setup, cleanup, and setup again. A visible duplicate connection often reveals missing cleanup rather than a need to disable the check.

Using an updater for the timer's count avoids capturing a stale count value, so the interval need not be recreated for every tick.

```exercise
goal: "Clear the interval when the effect is cleaned up."
lang: jsx
code: |
  import { useEffect, useState } from "react";
  export default function Timer() {
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
      const id = setInterval(() => setSeconds(previous => previous + 1), 1000);
      return () => console.log(id);
    }, []);
    return <p>{seconds}</p>;
  }
checks:
  - match: "return\\s+\\(\\)\\s+=>\\s+clearInterval\\(id\\);"
    message: "Return a cleanup that calls clearInterval(id)."
hint: "Return a cleanup that calls clearInterval(id)."
```

```quiz
question: "When can effect cleanup run besides unmount?"
options:
  - "Before rerunning setup after a dependency changes."
  - "Only during a browser crash."
  - "Before every event handler."
answer: 0
explain: "React cleans up the previous synchronization before replacing it with updated dependencies."
```

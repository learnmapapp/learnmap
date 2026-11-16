---
title: "Component state"
icon: "🧠"
branch: "interaction"
requires: ["events"]
summary: "Remember a value between renders and request updates with a setter."
---

[[State]] gives a component memory. `useState` returns the current value and a function that requests a new render:

```jsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

A plain local variable would reset whenever the component function runs again. The setter asks React to keep a new value and render from it.

## Ownership is per instance

Two rendered counters have separate state. React associates each state slot with a component's identity in the tree, not with the variable name itself.

Call Hooks such as `useState` at the top level of a component or custom Hook. Do not call them inside branches, loops, or event handlers. That preserves the relationship between successive calls and their state slots.

Initialize state with the smallest useful representation. Values that can be computed from props or existing state usually do not need their own state variable.

```compare typescript
import { useState } from "react";
function useCounter() {
  const [count, setCount] = useState<number>(0);
  return { count, increment: () => setCount(previous => previous + 1) };
} // The explicit number is optional here because 0 already infers it
```

```exercise
goal: Use the setter to request a counter update.
lang: jsx
code: |
  import { useState } from "react";
  export default function Counter() {
    const [count, setCount] = useState(0);
    return <button onClick={() => count + 1}>{count}</button>;
  }
checks:
  - match: onClick=\{\(\)\s+=>\s+setCount\(count\s+\+\s+1\)\}
    message: Call setCount(count + 1) in the handler.
hint: Call `setCount(count + 1)` in the handler.
```

```quiz
question: Why does a plain local `let count = 0` not replace `useState`?
options:
  - Local variables automatically update the DOM.
  - It resets during rendering and assignment does not request a render.
  - React forbids local variables.
answer: 1
explain: State persists across renders and its setter notifies React to render again.
```

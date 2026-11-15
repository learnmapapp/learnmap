---
title: "Mutable refs"
icon: "📌"
branch: "effects"
requires: ["state-snapshots"]
summary: "Keep a mutable value that does not participate in rendering."
---

A [[ref]] is a stable object with a mutable `.current` property. Changing it does not request a render:

```jsx
import { useRef } from "react";

export default function ClickLogger() {
  const clicks = useRef(0);
  function handleClick() {
    clicks.current += 1;
    console.log("Clicks:", clicks.current);
  }
  return <button onClick={handleClick}>Log a click</button>;
}
```

Use refs for information such as a timer handle or an integration instance when the UI does not need to display changes to it.

## State owns visible data

If changing a value should update the screen, state is usually the right tool. Reading `.current` in rendered output does not make React subscribe to its changes.

Avoid reading or writing refs during rendering except supported initialization patterns. Rendering should calculate output from its inputs without mutating shared state.

A ref is an escape hatch, not a substitute for state ownership. Use it where a mutable connection to something outside the render flow is actually required. [DOM refs](node:dom-refs) show one common example.

```exercise
goal: "Update the mutable current property of the ref."
lang: jsx
code: |
  import { useRef } from "react";
  export default function ClickLogger() {
    const clicks = useRef(0);
    return <button onClick={() => { clicks.value += 1; console.log(clicks.current); }}>Log</button>;
  }
checks:
  - match: "clicks\\.current\\s+\\+=\\s+1;"
    message: "The mutable ref value lives in .current."
hint: "The mutable ref value lives in .current."
```

```quiz
question: "What happens to rendering when ref.current changes?"
options:
  - "React always rerenders immediately."
  - "Nothing is scheduled solely by that change."
  - "Every parent rerenders."
answer: 1
explain: "Refs hold mutable values outside the ordinary state update mechanism."
```

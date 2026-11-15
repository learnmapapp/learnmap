---
title: "DOM refs"
icon: "🎯"
branch: "effects"
requires: ["refs", "controlled-inputs"]
summary: "Use a ref for a small imperative operation such as moving focus."
---

Attach a ref to a built-in element to access its DOM node after commit:

```jsx
import { useRef } from "react";

export default function FocusField() {
  const inputRef = useRef(null);
  return <><label>Name <input ref={inputRef} /></label>
    <button onClick={() => inputRef.current?.focus()}>Focus name</button></>;
}
```

The ref initially contains `null`. React sets its current value when the node is attached and clears it when removed, so guard access appropriately.

## Keep ownership clear

Focus, scrolling, and connecting a non-React widget are useful imperative operations. Avoid manually adding or removing children that React also owns; the two models can conflict.

In React 19 a function component can receive `ref` as a prop and pass it to a DOM node. Older code often uses `forwardRef`; understand the project's supported version before changing its public interface.

Prefer a declarative prop when it already expresses the behavior. For example, an input's text value usually belongs in `value` and `onChange`, while focusing it after a user's action is a reasonable ref operation.

```exercise
goal: "Connect the ref to the input that should receive focus."
lang: jsx
code: |
  import { useRef } from "react";
  export default function FocusField() {
    const inputRef = useRef(null);
    return <><input aria-label="Name" /><button onClick={() => inputRef.current?.focus()}>Focus</button></>;
  }
checks:
  - match: "<input\\s+aria\\-label=\"Name\"\\s+ref=\\{inputRef\\}\\s+/>"
    message: "Attach ref={inputRef} to the input."
hint: "Attach ref={inputRef} to the input."
```

```quiz
question: "When is a DOM ref normally populated?"
options:
  - "Before the component function first runs."
  - "When the DOM node is attached during commit."
  - "Only after a click."
answer: 1
explain: "DOM refs are assigned during commit, so initial render access must not assume a node exists."
```

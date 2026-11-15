---
title: "Lifting state"
icon: "⬆️"
branch: "architecture"
requires: ["controlled-inputs", "props"]
summary: "Move shared data to the nearest parent that coordinates its users."
---

When two components need the same changing value, move its ownership to their closest useful common parent:

```jsx
import { useState } from "react";

function NameInput({ value, onChange }) {
  return <label>Name <input value={value} onChange={event => onChange(event.target.value)} /></label>;
}
export default function GreetingEditor() {
  const [name, setName] = useState("Ada");
  return <><NameInput value={name} onChange={setName} /><p>Hello, {name}</p></>;
}
```

The child is controlled by props and a callback. The parent is the [[source of truth]], so both the input and preview reflect the same value.

## Share only as far as necessary

Do not keep a second independent copy in the child and try to synchronize it with effects. Two owners introduce stale values and ambiguous update order.

Not every state value belongs at the application root. Local focus, an expanded panel, or a draft field may belong near the component that uses it. Lift only when coordination requires it. Context can distribute a value farther down the tree, but it does not remove the need to choose its owner.

```exercise
goal: "Pass the shared parent value to the controlled input."
lang: jsx
code: |
  import { useState } from "react";
  function Field({ value, onChange }) { return <input aria-label="Name" value={value} onChange={event => onChange(event.target.value)} />; }
  export default function App() {
    const [name, setName] = useState("Ada");
    return <><Field value="Fixed" onChange={setName} /><p>{name}</p></>;
  }
checks:
  - match: "value=\\{name\\}\\s+onChange=\\{setName\\}"
    message: "Supply name as the value prop."
hint: "Supply name as the value prop."
```

```quiz
question: "Where should a value shared by an input and its preview usually live?"
options:
  - "In two unrelated local states."
  - "In their coordinating parent."
  - "In a global variable outside React."
answer: 1
explain: "One parent-owned value gives both children a consistent source of truth."
```

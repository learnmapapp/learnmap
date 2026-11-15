---
title: "Preserving state"
icon: "🪪"
branch: "architecture"
requires: ["state-structure", "keys"]
summary: "Identity in the rendered tree determines whether state survives."
---

React associates state with a component's type and position, including its key. Changing a key intentionally starts a new identity:

```jsx
import { useState } from "react";

function Draft() {
  const [text, setText] = useState("");
  return <label>Draft <input value={text} onChange={event => setText(event.target.value)} /></label>;
}
export default function Editor() {
  const [recipient, setRecipient] = useState("Ada");
  return <><button onClick={() => setRecipient(recipient === "Ada" ? "Grace" : "Ada")}>Switch recipient</button>
    <p>To {recipient}</p><Draft key={recipient} /></>;
}
```

Switching recipients resets the draft because a different key creates a fresh Draft. Without that identity change, the component at that location would normally keep its state.

## Reset on purpose

Use a meaningful key when a form belongs to a different record. Avoid random keys and nested component definitions, which can cause accidental resets on unrelated renders.

Removing a component from the tree also removes its local state. If a draft must survive being hidden or navigation, move its ownership to a component or storage layer with the appropriate lifetime.

```exercise
goal: "Reset the draft when the recipient changes by keying its identity."
lang: jsx
code: |
  import { useState } from "react";
  function Draft() { const [text, setText] = useState(""); return <input aria-label="Draft" value={text} onChange={event => setText(event.target.value)} />; }
  export default function Editor({ recipient = "Ada" }) { return <Draft />; }
checks:
  - match: "<Draft\\s+key=\\{recipient\\}\\s+/>"
    message: "Give Draft the recipient key."
hint: "Give Draft the recipient key."
```

```quiz
question: "What does changing a component's key signal?"
options:
  - "Keep all local state no matter what."
  - "Treat it as a different identity and reset its local state."
  - "Only change its CSS class."
answer: 1
explain: "A changed key creates a new component identity at that position."
```

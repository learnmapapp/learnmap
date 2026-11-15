---
title: "Accessible controls"
icon: "♿"
branch: "experience"
requires: ["validation", "dom-refs"]
summary: "Use semantics, connected labels, visible focus, and understandable feedback."
---

Start with native elements that already provide keyboard and accessibility behavior. A button should usually be a `<button>`, not a clickable `div`.

```jsx
import { useId, useState } from "react";

export default function NameField() {
  const id = useId();
  const [name, setName] = useState("");
  return <><label htmlFor={id}>Display name</label>
    <input id={id} value={name} onChange={event => setName(event.target.value)} />
    <p>{name ? `Hello, ${name}` : "Choose a name."}</p></>;
}
```

`useId` provides an id suitable for accessibility relationships across component instances. It is not a source of list item keys; keys belong to the data's identity.

## Test how someone uses it

Tab through controls, activate them with the keyboard, and check that focus is visible. Use meaningful button text and connected labels. Associate error messages with their fields, and announce important asynchronous status changes appropriately.

Do not add an ARIA role to compensate for avoidable semantic mistakes. Native controls reduce the amount of custom interaction behavior you must correctly recreate.

```exercise
goal: "Use a native button for an action."
lang: jsx
code: |
  export default function ContinueButton() {
    return <div onClick={() => console.log("continue")}>Continue</div>;
  }
checks:
  - match: "<button\\s+type=\"button\""
    message: "Use a button with native keyboard behavior."
hint: "Use a button with native keyboard behavior."
```

```quiz
question: "Should useId generate keys for records in a changing list?"
options:
  - "Yes, that is its main purpose."
  - "No, list keys should come from data identity."
  - "Only for filtered lists."
answer: 1
explain: "useId supports accessibility relationships, while list keys represent logical record identity."
```

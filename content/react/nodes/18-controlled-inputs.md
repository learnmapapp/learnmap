---
title: "Controlled inputs"
icon: "⌨️"
branch: "forms"
requires: ["state", "events"]
summary: "Keep an input value and the state that owns it synchronized."
---

A [[controlled input]] takes its current value from React state and reports edits through `onChange`:

```jsx
import { useState } from "react";

export default function NameField() {
  const [name, setName] = useState("");
  return <label>Name <input value={name} onChange={event => setName(event.target.value)} /></label>;
}
```

Update the state in response to edits so the input is not read-only. A text input should keep a string value, rather than switching between `undefined` and a string.

## Different controls, different properties

Checkboxes use `checked` and `event.target.checked`; their value string is not the checked state. A number input still exposes a text value through `.value`, so choose how to represent an empty input before converting it to a number.

An uncontrolled input uses `defaultValue` for its initial value and lets the DOM hold subsequent edits. Both models have uses. Choose deliberately instead of mixing them on the same input across renders.

Labels are part of the control's interface, not decorative text. Nest the input in its label or connect them with `htmlFor` and `id`.

```exercise
goal: "Use checked when updating the checkbox state."
lang: jsx
code: |
  import { useState } from "react";
  export default function Toggle() {
    const [enabled, setEnabled] = useState(false);
    return <label><input type="checkbox" checked={enabled} onChange={event => setEnabled(event.target.value)} />Enabled</label>;
  }
checks:
  - match: "setEnabled\\(event\\.target\\.checked\\)"
    message: "Read event.target.checked for a checkbox."
hint: "Read event.target.checked for a checkbox."
```

```quiz
question: "Which property represents a checkbox's boolean state?"
options:
  - "value"
  - "checked"
  - "innerHTML"
answer: 1
explain: "Use checked for the state and event.target.checked when handling an edit."
```

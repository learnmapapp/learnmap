---
title: "Form validation"
icon: "🛂"
branch: "forms"
requires: ["forms", "conditional-rendering"]
summary: "Connect useful feedback to a field and validate again at the real boundary."
---

Validation should explain what to fix, preserve the user's input, and be associated with the relevant control:

```jsx
import { useState } from "react";

export default function NameForm() {
  const [name, setName] = useState("");
  const [attempted, setAttempted] = useState(false);
  const error = attempted && !name.trim() ? "Enter a name." : "";
  return <form onSubmit={event => { event.preventDefault(); setAttempted(true); }}>
    <label htmlFor="learner-name">Name</label>
    <input id="learner-name" value={name} onChange={event => setName(event.target.value)}
      aria-invalid={Boolean(error)} aria-describedby={error ? "name-error" : undefined} />
    {error && <p id="name-error" role="alert">{error}</p>}
    <button type="submit">Continue</button>
  </form>;
}
```

Here the error is derived from current input and whether submission was attempted. It does not need a separate state update on every keystroke.

## Feedback is not enforcement

Use built-in constraints such as `required` when they fit, and add application-specific feedback where needed. Client validation improves usability; the receiving service must still enforce its own rules.

Do not communicate failure with red styling alone. Provide text, connect it to the input, and manage focus when a larger form needs a summary of several errors.

```exercise
goal: "Connect the error text to the input with aria-describedby."
lang: jsx
code: |
  export default function Field() {
    return <><label htmlFor="name">Name</label><input id="name" aria-invalid={true} aria-describedby="other-error" /><p id="name-error">Enter a name.</p></>;
  }
checks:
  - match: "aria\\-describedby=\"name\\-error\""
    message: "Reference the id of the actual error element."
hint: "Reference the id of the actual error element."
```

```quiz
question: "Can client-side validation replace validation on the receiving service?"
options:
  - "Yes."
  - "No, it only improves client feedback."
  - "Only for required fields."
answer: 1
explain: "Clients can be bypassed; the receiving boundary must enforce its own contract."
```

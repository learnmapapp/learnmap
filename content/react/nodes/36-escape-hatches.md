---
title: "Choosing an escape hatch"
icon: "🚪"
branch: "effects"
requires: ["effects", "derived-state", "refs"]
summary: "Use a handler for an action, rendering for derived data, and effects for synchronization."
---

Before adding an effect, name the cause of the work. If it happens because a user clicked, an event handler often expresses that relationship directly:

```jsx
import { useState } from "react";

export default function SaveButton() {
  const [message, setMessage] = useState("");
  function handleSave() {
    localStorage.setItem("lesson:draft", "React");
    setMessage("Draft saved on this browser");
  }
  return <><button onClick={handleSave}>Save draft</button><p>{message}</p></>;
}
```

This deliberately saves on demand. An effect tied to a `clicked` boolean would obscure the user's direct action and introduce a reset problem.

## Choose by responsibility

Compute a filtered list during rendering. Store visible changing data in state. Keep a DOM node or timer handle in a ref. Synchronize a live connection through an effect with cleanup.

An external browser API can fail, such as storage being unavailable; production handlers should provide useful recovery. An escape hatch gives access to an external system, not a guarantee that system will work. Keep the integration small and the surrounding data flow declarative.

```exercise
goal: "Attach the save operation to the click handler without running it during render."
lang: jsx
code: |
  export default function SaveButton() {
    function save() { localStorage.setItem("lesson:draft", "React"); }
    return <button onClick={save()}>Save</button>;
  }
checks:
  - match: "onClick=\\{save\\}"
    message: "Pass save as the event handler."
hint: "Pass save as the event handler."
```

```quiz
question: "Where should an explicit Save button's one-time save usually begin?"
options:
  - "In its event handler."
  - "In every render."
  - "In an effect that watches an unrelated flag."
answer: 0
explain: "The handler directly expresses work caused by that user action."
```

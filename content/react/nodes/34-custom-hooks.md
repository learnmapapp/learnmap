---
title: "Custom Hooks"
icon: "🪝"
branch: "effects"
requires: ["fetching-data", "refs"]
summary: "Share reusable stateful logic while each call keeps its own state."
---

A [[custom hook]] extracts reusable Hook-based logic. Its name starts with `use`:

```jsx
import { useEffect, useState } from "react";

function useOnlineStatus() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  return online;
}
export default function ConnectionBadge() {
  return <p>{useOnlineStatus() ? "Network appears online" : "Offline"}</p>;
}
```

This reports the browser's network indication, not proof that a specific service is reachable. A real service request still needs error handling.

## Share behavior, not a hidden singleton

Two calls to this Hook have independent state and subscriptions. Extracting a Hook does not automatically create shared application state.

Name Hooks after their purpose, such as `useOnlineStatus`, rather than generic lifecycle wrappers that hide dependencies. Preserve setup and cleanup inside the reusable logic, and expose a small interface that matches what the caller needs.

```exercise
goal: "Name the reusable Hook with the use prefix."
lang: jsx
code: |
  import { useState } from "react";
  function toggleState() {
    const [enabled, setEnabled] = useState(false);
    return [enabled, () => setEnabled(previous => !previous)];
  }
  export default function Toggle() {
    const [enabled, toggle] = useToggle();
    return <button onClick={toggle}>{enabled ? "On" : "Off"}</button>;
  }
checks:
  - match: "function\\s+useToggle\\(\\)"
    message: "Name the Hook useToggle so its role and call rules are explicit."
hint: "Name the Hook useToggle so its role and call rules are explicit."
```

```quiz
question: "Do two calls to an ordinary custom Hook automatically share one state value?"
options:
  - "Yes."
  - "No, each call has its own Hook state."
  - "Only if the names match."
answer: 1
explain: "Custom Hooks reuse logic; shared state requires an explicit owner or external store."
```

---
title: "Custom Hooks"
icon: "🪝"
branch: "effects"
requires: ["fetching-data", "refs"]
summary: "Share reusable stateful logic while each call keeps its own state."
---
**Copy-paste spotted.** Two components both need to know whether the browser is online:

```jsx
function StatusBar() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  return <p>{online ? "✅ Online" : "❌ Offline"}</p>;
}

function SaveButton() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    // ...the same eleven lines again...
  }, []);
  return <button disabled={!online}>Save</button>;
}
```

A regular helper function can't hold it, because it uses Hooks. But a **custom Hook** can.

## Extract it

```jsx title=src/useOnlineStatus.js
import { useEffect, useState } from "react";

export function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  return online;
}
```

## Use it

```jsx
function StatusBar() {
  const online = useOnlineStatus();
  return <p>{online ? "✅ Online" : "❌ Offline"}</p>;
}

function SaveButton() {
  const online = useOnlineStatus();
  return <button disabled={!online}>Save</button>;
}
```

Each component now says **what** it needs, not how to get it.

## The fine print

- **The name must start with `use`.** That's how you, your teammates and the linter know it's a Hook, and that the [Rules of Hooks](node:hook-rules) apply to it.
- **It shares logic, not state.** `StatusBar` and `SaveButton` each get their own `online` state. Calling a custom Hook is like pasting its body into your component. (To share the same state, see [lifting state](node:lifting-state) or [context](node:context).)
- **Return whatever is convenient**: a value, an array like `[value, toggle]`, or an object like `{ data, error, loading }`.
- **Only extract when it uses Hooks.** A function that just formats a date is a plain function; don't call it `useFormattedDate`.

```compare javascript
// Like any helper function extraction, but it's allowed to use
// state and effects, because it runs as part of a component.
```

```exercise
goal: "The component calls `useToggle`, but the function is named `toggleState`. Rename it, which also tells everyone it's a Hook."
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
  - match: 'function\s+useToggle\(\)'
    message: Name the Hook useToggle.
hint: Hook names start with use.
solution: |
  import { useState } from "react";
  function useToggle() {
    const [enabled, setEnabled] = useState(false);
    return [enabled, () => setEnabled(previous => !previous)];
  }
  export default function Toggle() {
    const [enabled, toggle] = useToggle();
    return <button onClick={toggle}>{enabled ? "On" : "Off"}</button>;
  }
```

```quiz
question: "Two components call `useOnlineStatus()`. How many `online` states exist?"
options:
  - One, shared between them.
  - Two, one per component.
  - None; custom Hooks can't have state.
answer: 1
explain: Each call runs the Hook's code inside that component, with its own state.
```

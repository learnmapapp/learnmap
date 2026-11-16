---
title: "Rules of Hooks"
icon: "📏"
branch: "effects"
requires: ["custom-hooks", "state"]
summary: "Keep ordinary Hook calls at the top level and keep rendering pure."
---
Two rules, then the reason behind them, which makes them easy to remember.

## The rules

1. **Only call Hooks at the top level** of a component or custom Hook. Not inside `if`, loops, nested functions, or after an early `return`.
2. **Only call Hooks from React functions**: components and custom Hooks. Not from regular helpers or event handlers.

## Why: Hooks are numbered lockers

When you write:

```jsx
function Profile() {
  const [name, setName] = useState("Ada");
  const [age, setAge] = useState(36);
  const [editing, setEditing] = useState(false);
}
```

you never told React which state is called "name". It doesn't know names. It only knows **order**: the first `useState` call gets locker 1, the second gets locker 2, the third gets locker 3. On the next render, it hands out the lockers in the same order.

Now add a condition:

```jsx
function Profile({ showAge }) {
  const [name, setName] = useState("Ada");
  if (showAge) {
    const [age, setAge] = useState(36);   // ❌
  }
  const [editing, setEditing] = useState(false);
}
```

| Call | Render 1 (`showAge` true) | Render 2 (`showAge` false) |
| --- | --- | --- |
| 1st `useState` | name → locker 1 | name → locker 1 |
| 2nd `useState` | age → locker 2 | **editing → locker 2, so it's 36** |
| 3rd `useState` | editing → locker 3 | — |

On render 2, `editing` opens age's locker. That's why React insists on the same calls, in the same order, every time. (In practice, React notices and throws an error.)

## The early return is a hidden condition

```jsx
function Details({ visible }) {
  if (!visible) return null;
  const [open, setOpen] = useState(false);   // ❌ skipped when hidden
}
```

Put the Hooks first, then return:

```jsx
function Details({ visible }) {
  const [open, setOpen] = useState(false);   // ✅ always called
  if (!visible) return null;
}
```

## Conditions go inside

Need an effect only sometimes? Call it always, and put the condition **inside**:

```jsx
useEffect(() => {
  if (!enabled) return;
  // ...
}, [enabled]);
```

The `react-hooks` lint rule catches all of these. (The new `use` API from React 19 is the one exception: it may be called conditionally.)

```compare javascript
// Like reading function arguments by position: swap two, and
// each one gets the other's value.
```

```exercise
goal: "`useState` runs only sometimes, and its result is thrown away. Declare `[expanded, setExpanded]` at the top, before the early return."
lang: jsx
code: |
  import { useState } from "react";
  export default function Details({ visible = true }) {
    if (visible) useState(false);
    if (!visible) return null;
    return <button onClick={() => setExpanded(previous => !previous)}>{String(expanded)}</button>;
  }
checks:
  - match: 'const\s+\[expanded,\s+setExpanded\]\s+=\s+useState\(false\);'
    message: Declare the Hook at the top level before the early return.
  - notMatch: 'if\s+\(visible\)\s+useState'
    message: Remove the conditional useState call.
hint: Replace the first if line with a normal useState declaration.
solution: |
  import { useState } from "react";
  export default function Details({ visible = true }) {
    const [expanded, setExpanded] = useState(false);
    if (!visible) return null;
    return <button onClick={() => setExpanded(previous => !previous)}>{String(expanded)}</button>;
  }
```

```quiz
question: "How does React know which state belongs to which `useState` call?"
options:
  - By the variable name you destructure into.
  - By the order of the calls during rendering.
  - By a hidden id the compiler adds.
answer: 1
explain: That's why the order must be the same on every render.
```

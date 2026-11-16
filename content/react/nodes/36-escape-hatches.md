---
title: "Choosing an escape hatch"
icon: "🚪"
branch: "effects"
requires: ["effects", "derived-state", "refs"]
summary: "Use a handler for an action, rendering for derived data, and effects for synchronization."
---
You've met handlers, derived values, refs and effects. When something needs to happen, which one is it? This lesson is a decision guide you can come back to.

## The three questions

**1. Did the user just do something?** (clicked, typed, submitted)
→ Put it in the **event handler**. You know exactly what happened and why.

**2. Can it be calculated from props or state?**
→ **Calculate it during rendering.** No state, no effect.

**3. Does something outside React need to stay in sync with what's on screen?**
→ That's an **effect**.

And if you need to remember a value that isn't displayed, that's a **ref**.

## Practice cases

| Situation | Answer |
| --- | --- |
| Send an analytics event when "Buy" is clicked | Handler: the click caused it. |
| Show the number of selected items | Render: `selected.length`. |
| Connect to a chat room while it's on screen | Effect, with cleanup. |
| Reset a form after a successful save | Handler: set state after the save. |
| Filter a list by the search text | Render: `items.filter(...)`. |
| Remember the previous scroll position | Ref. |
| Keep a map widget's zoom in sync with state | Effect. |
| Show a "Saved!" toast after clicking Save | Handler. |
| Reset all state when `userId` changes | Neither: give the component a [key](node:preserving-state). |

## The most common wrong answer

Effects look like a universal "do this when that changes", so they get used for case 1:

```jsx
const [submitted, setSubmitted] = useState(false);

useEffect(() => {
  if (submitted) sendOrder(cart);
}, [submitted]);

<button onClick={() => setSubmitted(true)}>Order</button>
```

It works, but in a roundabout way: click, set a flag, render, run the effect, check the flag, and then send. And it can misfire; if the component remounts with `submitted` true, the order goes out twice. Just do it in the handler:

```jsx
<button onClick={() => sendOrder(cart)}>Order</button>
```

A good test from the React docs: **"why does this code run?"** If the answer is "because the user clicked", it belongs in the handler. If it's "because the component is visible", it's an effect.

```compare javascript
// Without React, the same split exists: listeners for actions,
// functions for calculations, setup/teardown for subscriptions.
```

```exercise
goal: "Saving is triggered by a click, but this sends it through state and an effect. Remove the effect and save directly in a `save` handler: `onClick={save}`."
lang: jsx
code: |
  import { useEffect, useState } from "react";
  export default function SaveButton() {
    const [clicked, setClicked] = useState(false);
    useEffect(() => {
      if (clicked) localStorage.setItem("lesson:draft", "React");
    }, [clicked]);
    return <button onClick={() => setClicked(true)}>Save</button>;
  }
checks:
  - match: 'onClick=\{save\}'
    message: "Pass a save function as the click handler."
  - match: 'function\s+save\(\)'
    message: "Define function save() inside the component."
  - notMatch: 'useEffect\('
    message: "Remove the effect; the handler does the work now."
hint: "function save() { localStorage.setItem(...); }"
solution: |
  export default function SaveButton() {
    function save() { localStorage.setItem("lesson:draft", "React"); }
    return <button onClick={save}>Save</button>;
  }
```

```quiz
question: "Where should code that shows a confirmation toast after the user clicks Delete go?"
options:
  - In an effect that watches a deleted flag.
  - In the Delete button's event handler.
  - In the component body, during rendering.
answer: 1
explain: The user's click caused it, so the click handler is the place.
```

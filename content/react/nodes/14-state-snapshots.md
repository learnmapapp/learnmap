---
title: "State snapshots"
icon: "📸"
branch: "interaction"
requires: ["state"]
summary: "A setter schedules a future render; it does not rewrite the current local value."
---
**Predict the output.** You click this button once. What does the console show, and what does the button show?

```jsx
export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    console.log(count);
  }

  return <button onClick={handleClick}>{count}</button>;
}
```

Take a guess before reading on.

**Answer:** the console shows **0**, and the button shows **1**.

## Why: each render is a snapshot

Calling `setCount` doesn't change the `count` variable. It can't: `count` is a `const`. What it does is **ask for a new render**, in which `useState` will return 1.

Picture each render as a photograph. During the render where `count` is 0, everything in it (the JSX, the click handler, the `console.log`) sees 0, permanently. The new value only exists in the **next** photo.

## Round two

Same idea, harder. One click on this:

```jsx
function handleClick() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}
```

Is it 3? No: **1**. All three lines read `count` from the same snapshot, where it's 0, so they all ask for `0 + 1`. ([Updater functions](node:updater-functions) shows how to make it 3.)

## Round three

```jsx
function handleClick() {
  setCount(count + 5);
  setTimeout(() => alert(count), 3000);
}
```

Three seconds later, the alert says **0**, even though the screen has shown 5 for a while. The timeout was created in the snapshot where `count` was 0, and it remembers that one.

## The practical takeaway

If you need the new value in the same handler, calculate it first and use your own variable:

```jsx
function handleClick() {
  const next = count + 1;
  setCount(next);
  saveToServer(next);       // not count, which is still the old one
}
```

```compare javascript
// The same thing happens with any const captured by a closure:
const count = 0;
setTimeout(() => console.log(count), 1000);   // always 0
```

```exercise
goal: "`console.log(count)` prints the old value. Log `next`, the value you just passed to the setter."
lang: jsx
code: |
  import { useState } from "react";
  export default function Counter() {
    const [count, setCount] = useState(0);
    function handleClick() {
      const next = count + 1;
      setCount(next);
      console.log(count);
    }
    return <button onClick={handleClick}>{count}</button>;
  }
checks:
  - match: 'console\.log\(next\);'
    message: "Log next, the value calculated before calling the setter."
hint: The new value is already in a local variable.
solution: |
  import { useState } from "react";
  export default function Counter() {
    const [count, setCount] = useState(0);
    function handleClick() {
      const next = count + 1;
      setCount(next);
      console.log(next);
    }
    return <button onClick={handleClick}>{count}</button>;
  }
```

```quiz
question: "`count` is 2. A handler runs `setCount(count * 10)` and then `console.log(count)`. What's logged?"
options:
  - "2"
  - "20"
  - "undefined"
answer: 0
explain: The handler belongs to the render where count is 2. The new value arrives in the next render.
```

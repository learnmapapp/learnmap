---
title: "Mutable refs"
icon: "📌"
branch: "effects"
requires: ["state-snapshots"]
summary: "Keep a mutable value that does not participate in rendering."
---
A Q&A about the hook that's like state, but isn't.

**Q: What is a ref?**

A box that holds a value, and survives re-renders:

```jsx
import { useRef } from "react";

const clicks = useRef(0);   // { current: 0 }
clicks.current += 1;         // change it whenever you like
```

`useRef(0)` returns an object with one property, `current`. React gives you the **same object** on every render, so whatever you put in it stays there.

**Q: How is that different from state?**

| | `useState` | `useRef` |
| --- | --- | --- |
| Survives re-renders | yes | yes |
| Changing it re-renders | yes | **no** |
| How you change it | the setter | assign to `.current` |
| New value visible | in the next render | immediately |

**Q: So when do I need one?**

When you need to remember something that **doesn't affect what's on screen**. The classic example is a timer id, so you can stop it later:

```jsx
export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  function start() {
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  }

  function stop() {
    clearInterval(intervalRef.current);
  }

  return (
    <>
      <p>{seconds}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  );
}
```

`seconds` is shown, so it's state. The interval id is never shown, so it's a ref.

**Q: Why not just use a variable outside the component?**

A module variable is shared by **every** instance. Two stopwatches would fight over one id. A ref belongs to its own component instance.

**Q: Why not a `let` inside the component?**

It's reset on every render. Refs aren't.

**Q: Can I show a ref's value in JSX?**

You can, but it won't update when you change it, since nothing re-renders. If it appears on screen, it should be state. For the same reason, don't read or write `.current` during rendering; do it in event handlers and effects.

**Q: I've seen `ref={...}` on elements. Same thing?**

Same hook, different job: holding a DOM element. That's [the next lesson](node:dom-refs).

```compare javascript
// A ref is like a property on an object that lives as long as
// the component does: this.intervalId = setInterval(...)
```

```exercise
goal: "The value lives in `.current`, but this code writes to `.value`. Fix the increment."
lang: jsx
code: |
  import { useRef } from "react";
  export default function ClickLogger() {
    const clicks = useRef(0);
    return <button onClick={() => { clicks.value += 1; console.log(clicks.current); }}>Log</button>;
  }
checks:
  - match: 'clicks\.current\s+\+=\s+1;'
    message: "The mutable ref value lives in .current."
hint: A ref object has exactly one property.
solution: |
  import { useRef } from "react";
  export default function ClickLogger() {
    const clicks = useRef(0);
    return <button onClick={() => { clicks.current += 1; console.log(clicks.current); }}>Log</button>;
  }
```

```quiz
question: "You change `myRef.current` in a click handler. What happens on screen?"
options:
  - The component re-renders with the new value.
  - Nothing; refs don't trigger renders.
  - React warns that refs are read-only.
answer: 1
explain: That's the main difference from state.
```

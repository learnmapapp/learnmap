---
title: "Updater functions"
icon: "🔁"
branch: "interaction"
requires: ["state-snapshots"]
summary: "Compose queued state updates from the previous value."
---
In [the last lesson](node:state-snapshots), three `setCount(count + 1)` calls in one click added only 1. Here's the fix, and why it works.

## Pass a function instead of a value

```jsx
function handleClick() {
  setCount(c => c + 1);
  setCount(c => c + 1);
  setCount(c => c + 1);
}
```

Now one click adds **3**. Instead of saying "set it to this value", you're saying "**here's how to compute the next value from the previous one**". That function is an *updater function*.

## What React does with them

React doesn't apply updates immediately. It queues them, then works through the queue before the next render. Think of a cash register with a list of instructions:

| Queued | `c` going in | Result |
| --- | --- | --- |
| `c => c + 1` | 0 | 1 |
| `c => c + 1` | 1 | 2 |
| `c => c + 1` | 2 | 3 |

Each updater receives the result of the one before it. A plain value like `setCount(5)` just means "replace with 5", which ignores everything queued before it.

## When to use which

**Use an updater** when the next value depends on the previous one, and especially when the update happens later than the click: in a timer, after an `await`, or in a callback where the snapshot might be stale.

```jsx
useEffect(() => {
  const id = setInterval(() => setSeconds(s => s + 1), 1000);
  return () => clearInterval(id);
}, []);
```

(`useEffect` comes later, in [Effects](node:effects); the point here is the timer.) That interval was created in the very first render. With `setSeconds(seconds + 1)` it would see `seconds` as 0 forever, and keep setting it to 1. The updater always gets the latest value.

**Use a plain value** when the new state doesn't depend on the old: `setName(event.target.value)`, `setOpen(false)`.

## Naming

Common names for the parameter are the first letter of the state (`c` for count), or `prev`, or `previous`. Pick one and be consistent.

```tip
Updaters must be pure: just calculate and return. No API calls or other side effects inside them, because React may call them more than once in development to help you catch bugs.
```

```exercise
goal: "Rewrite the update as an updater function, `previous => previous + 1`, so it always builds on the latest value."
lang: jsx
code: |
  import { useState } from "react";
  export default function Counter() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
  }
checks:
  - match: 'setCount\(previous\s+=>\s+previous\s+\+\s+1\)'
    message: "Pass previous => previous + 1 to setCount."
hint: Replace the value with an arrow function.
solution: |
  import { useState } from "react";
  export default function Counter() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(previous => previous + 1)}>{count}</button>;
  }
```

```quiz
question: "`count` is 0. A handler runs `setCount(c => c + 1)` and then `setCount(10)`. What's the next count?"
options:
  - "1"
  - "10"
  - "11"
answer: 1
explain: The plain value replaces whatever the queue had produced so far.
```

---
title: "Component state"
icon: "🧠"
branch: "interaction"
requires: ["events"]
summary: "Remember a value between renders and request updates with a setter."
---
Here's a counter that doesn't work. Can you see why?

```jsx
export default function Counter() {
  let count = 0;

  function handleClick() {
    count = count + 1;
    console.log(count);       // 1, 2, 3... the variable does change!
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}
```

The console counts up, but the button still says 0. Two reasons:

1. **Changing a variable doesn't tell React anything.** React only re-runs your component when it's asked to.
2. **Even if it did re-run**, `let count = 0` would start from zero again. Local variables don't survive between calls of a function.

## `useState` fixes both

```jsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

`useState(0)` gives you a pair:

- **`count`**, the current value. React remembers it between renders. `0` is only used the very first time.
- **`setCount`**, a function that stores a new value and asks React to render again.

So a click calls `setCount(1)`, React calls `Counter` again, `useState` returns `1` this time, and the button shows the new text. That loop of "set state, re-render, show the new UI" is the heart of React.

[[state|State]] is a component's memory. Each `<Counter />` on the page has its own count.

## Conventions

- Name the pair `[thing, setThing]`, using array destructuring.
- Call `useState` at the top of the component, not in loops or conditions ([why](node:hook-rules)).
- Functions starting with `use` are called **Hooks**. `useState` is the first of several.

## What should be state?

Anything that changes over time **and** affects what's on screen: an input's text, whether a menu is open, the selected tab. If you can compute it from other values, it [shouldn't be state](node:derived-state).

```compare javascript
// Without React, you update the screen yourself:
count++;
button.textContent = `Clicked ${count} times`;
```

```exercise
goal: "The click handler computes `count + 1` but throws it away. Pass it to the setter."
lang: jsx
code: |
  import { useState } from "react";
  export default function Counter() {
    const [count, setCount] = useState(0);
    return <button onClick={() => count + 1}>{count}</button>;
  }
checks:
  - match: 'onClick=\{\(\)\s+=>\s+setCount\(count\s+\+\s+1\)\}'
    message: Call setCount(count + 1) in the handler.
hint: Wrap the calculation in setCount(...).
solution: |
  import { useState } from "react";
  export default function Counter() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
  }
```

```quiz
question: "When is the `0` in `useState(0)` used?"
options:
  - On every render.
  - Only on the first render; after that React returns the stored value.
  - Whenever the setter is called.
answer: 1
explain: The argument is the initial value. Later renders get the current state.
```

---
title: "DOM refs"
icon: "🎯"
branch: "effects"
requires: ["refs", "controlled-inputs"]
summary: "Use a ref for a small imperative operation such as moving focus."
---
React builds the DOM for you, and most of the time that's all you need. But a few things can only be done by calling a method on a real element: moving focus, scrolling, measuring, or playing a video. For those, you need the element itself.

## Focusing a search field, step by step

**Step 1.** Create an empty ref:

```jsx
const inputRef = useRef(null);
```

**Step 2.** Attach it to an element with the `ref` attribute:

```jsx
<input ref={inputRef} aria-label="Search" />
```

**Step 3.** When React creates that `<input>` in the DOM, it puts the element in `inputRef.current`. Now you can use the browser's API on it, in an event handler:

```jsx
<button onClick={() => inputRef.current.focus()}>Search</button>
```

All together:

```jsx
import { useRef } from "react";

export default function SearchBar() {
  const inputRef = useRef(null);

  return (
    <>
      <input ref={inputRef} aria-label="Search" />
      <button onClick={() => inputRef.current.focus()}>🔍</button>
    </>
  );
}
```

## When is `current` filled?

- **During the first render**: still `null`. The element doesn't exist yet.
- **After React updates the page**: the element. Event handlers and [effects](node:effects) run after that, so they're safe.
- **If the element is removed**: back to `null`. Use `inputRef.current?.focus()` when that's possible.

## Other examples

```jsx
videoRef.current.play();
listRef.current.scrollTo({ top: 0 });
const width = boxRef.current.getBoundingClientRect().width;
```

## Refs on your own components

In React 19, `ref` is an ordinary prop for function components. Pass it on to the element inside:

```jsx
function TextField({ ref, label }) {
  return <input ref={ref} aria-label={label} />;
}

<TextField ref={inputRef} label="Name" />
```

(Older code wraps the component in `forwardRef` for this.)

```warn
Use refs for these browser actions, not to change content. Setting `ref.current.textContent` directly fights with React, which will overwrite your change on the next render. To change what's displayed, use state.
```

```compare javascript
// Without React, you'd find the element yourself:
document.querySelector("#search").focus();
```

```exercise
goal: "The button focuses `inputRef`, but the ref isn't attached to anything. Attach it to the input."
lang: jsx
code: |
  import { useRef } from "react";
  export default function FocusField() {
    const inputRef = useRef(null);
    return <><input aria-label="Name" /><button onClick={() => inputRef.current?.focus()}>Focus</button></>;
  }
checks:
  - match: '<input\s+aria\-label="Name"\s+ref=\{inputRef\}\s+/>'
    message: "Attach ref={inputRef} to the input."
hint: "Add ref={inputRef} after the aria-label."
solution: |
  import { useRef } from "react";
  export default function FocusField() {
    const inputRef = useRef(null);
    return <><input aria-label="Name" ref={inputRef} /><button onClick={() => inputRef.current?.focus()}>Focus</button></>;
  }
```

```quiz
question: "What is `inputRef.current` while the component is rendering for the first time?"
options:
  - The input element.
  - "null"
  - An empty string.
answer: 1
explain: The element is created after rendering, so the ref is filled in afterwards.
```

---
title: "Event handlers"
icon: "🖱️"
branch: "interaction"
requires: ["props"]
summary: "Pass functions so work runs when the user acts."
---

Pass an event handler as a prop rather than calling it while rendering:

```jsx
export default function SaveButton() {
  function handleClick() {
    console.log("Save requested");
  }
  return <button onClick={handleClick}>Save</button>;
}
```

`onClick={handleClick()}` would call the function immediately and pass its result. To supply an argument, wrap the call: `onClick={() => handleSelect(id)}`.

## Events are part of a component API

A parent can pass a callback such as `onComplete` to a child. The child invokes it when the relevant user action occurs. Use names describing the behavior rather than exposing internal state setters everywhere.

Handlers receive an event object. `event.preventDefault()` prevents a browser default such as form submission navigation. `event.stopPropagation()` affects propagation to ancestor handlers; it serves a different purpose.

Keep render calculations pure. Sending a request or writing an application record generally belongs in a user handler or an explicitly managed synchronization boundary, not in the component body just because it runs often.

```exercise
goal: "Pass the handler without calling it during rendering."
lang: jsx
code: |
  export default function SaveButton() {
    function handleClick() { console.log("saved"); }
    return <button onClick={handleClick()}>Save</button>;
  }
checks:
  - match: "onClick=\\{handleClick\\}"
    message: "Pass handleClick rather than handleClick()."
hint: "Pass handleClick rather than handleClick()."
```

```quiz
question: "What does onClick={handleClick()} do during render?"
options:
  - "Registers the function without calling it."
  - "Calls handleClick immediately."
  - "Automatically waits for a click."
answer: 1
explain: "Parentheses execute the function; pass a function for React to call later."
```

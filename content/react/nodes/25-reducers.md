---
title: "Reducers"
icon: "⚙️"
branch: "architecture"
requires: ["updater-functions", "object-state"]
summary: "Express state transitions as pure functions of state and an action."
---
As a component grows, its event handlers fill up with state updates. A shopping cart might have `setItems` calls in six different handlers, each with its own `map` or `filter`. To understand how the cart can change, you have to read all of them.

A [[reducer]] collects all the ways state can change into **one function**.

## Step 1: describe what happened, not how to update

Instead of setting state in the handlers, they **dispatch** an *action*: a plain object that says what the user did.

```jsx
function handleAdd(product) {
  dispatch({ type: "added", product });
}

function handleRemove(id) {
  dispatch({ type: "removed", id });
}
```

## Step 2: write the reducer

The reducer takes the current state and an action, and **returns the next state**:

```jsx
function cartReducer(items, action) {
  switch (action.type) {
    case "added":
      return [...items, { ...action.product, quantity: 1 }];
    case "removed":
      return items.filter(item => item.id !== action.id);
    case "cleared":
      return [];
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
```

## Step 3: connect it with `useReducer`

```jsx
import { useReducer } from "react";

function Cart() {
  const [items, dispatch] = useReducer(cartReducer, []);
  // items: the current state; dispatch: sends an action
}
```

## The rules for reducers

A reducer must be **pure**: same input, same output, and no side effects.

- **Return new state; don't modify the old.** Like the setter, React compares by identity, so the same rules as [object state](node:object-state) apply.
- **No API calls, timers or random numbers inside.** Do those in the event handler, then dispatch the result.

## Why bother?

- **One place to read** every possible state change.
- **Easy to test**: it's a plain function. `cartReducer([], { type: "cleared" })` returns `[]`, no React needed.
- **Actions are a log**: "added, added, removed" tells you what the user did.

For a counter or a toggle, `useState` is simpler. Reach for a reducer when state updates get complicated or spread out.

```compare javascript
// The same idea as Array.reduce: fold actions into a state.
const finalCart = actions.reduce(cartReducer, []);
```

```exercise
goal: "The reducer modifies the old state and returns a number. Return a new object with the incremented count."
lang: jsx
code: |
  import { useReducer } from "react";
  function reducer(state) { return ++state.count; }
  export default function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    return <button onClick={() => dispatch()}>{state.count}</button>;
  }
checks:
  - match: 'return\s+\{\s+count:\s+state\.count\s+\+\s+1\s+\};'
    message: "Return a new object containing the updated count."
hint: "return { count: state.count + 1 };"
solution: |
  import { useReducer } from "react";
  function reducer(state) { return { count: state.count + 1 }; }
  export default function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    return <button onClick={() => dispatch()}>{state.count}</button>;
  }
```

```quiz
question: "Where should an API call go when using a reducer?"
options:
  - Inside the reducer, in the matching case.
  - In the event handler; then dispatch an action with the result.
  - In the action object.
answer: 1
explain: Reducers must be pure. Side effects belong in handlers or effects.
```

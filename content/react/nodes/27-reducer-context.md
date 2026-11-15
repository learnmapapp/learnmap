---
title: "Reducer and context"
icon: "🤝"
branch: "architecture"
requires: ["reducers", "context"]
summary: "Keep transitions in one owner while distributing state and dispatch separately."
---

Combine a reducer with context when distant descendants need one coordinated state owner:

```jsx
import { createContext, useContext, useReducer } from "react";

const CountContext = createContext(0);
const DispatchContext = createContext(null);
function AddButton() {
  const dispatch = useContext(DispatchContext);
  return <button onClick={() => dispatch({ type: "add" })}>Add</button>;
}
function CountLabel() {
  return <p>{useContext(CountContext)}</p>;
}
function reducer(count, action) {
  if (action.type === "add") return count + 1;
  return count;
}
export default function App() {
  const [count, dispatch] = useReducer(reducer, 0);
  return <CountContext value={count}><DispatchContext value={dispatch}>
    <CountLabel /><AddButton />
  </DispatchContext></CountContext>;
}
```

Separating state and dispatch lets consumers depend on the part they use. A real feature can wrap reads in custom Hooks that throw a clear error when a required provider is absent.

## Scope the owner

Mount the provider where the feature's state should live and reset. Moving everything into one application-wide provider can make ownership and rerendering harder to reason about.

Keep the reducer pure. Context changes delivery, not transition semantics or the need for a coherent state model.

```exercise
goal: "Dispatch an action object rather than calling the state value."
lang: jsx
code: |
  import { useReducer } from "react";
  function reducer(count, action) { return action.type === "add" ? count + 1 : count; }
  export default function Counter() {
    const [count, dispatch] = useReducer(reducer, 0);
    return <button onClick={() => count({ type: "add" })}>{count}</button>;
  }
checks:
  - match: "onClick=\\{\\(\\)\\s+=>\\s+dispatch\\(\\{\\s+type:\\s+\"add\"\\s+\\}\\)\\}"
    message: "Call dispatch with the action."
hint: "Call dispatch with the action."
```

```quiz
question: "What does context add to a reducer-based design?"
options:
  - "Delivery of state or dispatch to descendants."
  - "Automatic network persistence."
  - "Permission to mutate the old state."
answer: 0
explain: "Context distributes values; the reducer still calculates pure transitions."
```

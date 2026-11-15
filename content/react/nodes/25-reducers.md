---
title: "Reducers"
icon: "⚙️"
branch: "architecture"
requires: ["updater-functions", "object-state"]
summary: "Express state transitions as pure functions of state and an action."
---

A [[reducer]] centralizes transitions when updates become more involved:

```jsx
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment": return { count: state.count + 1 };
    case "reset": return { count: 0 };
    default: throw new Error("Unknown action");
  }
}
export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return <><p>{state.count}</p><button onClick={() => dispatch({ type: "increment" })}>Add</button>
    <button onClick={() => dispatch({ type: "reset" })}>Reset</button></>;
}
```

Dispatch describes what happened. The reducer calculates the next state without mutating the previous object.

## Keep effects outside

Do not send requests, start timers, or generate random identifiers in the reducer. Put those activities in handlers or synchronization code, then dispatch the meaningful result. A pure reducer can be tested as an ordinary function.

A reducer is useful when several transitions must maintain the same invariants. It is not mandatory for a simple local toggle. Name actions in terms of application events so the transition code tells a coherent story.

```compare typescript
type State = { count: number };
type Action = { type: "increment" } | { type: "reset" };
function reducer(state: State, action: Action): State {
  return { count: action.type === "reset" ? 0 : state.count + 1 };
}
```

```exercise
goal: "Return a new state object rather than modifying the old one."
lang: jsx
code: |
  import { useReducer } from "react";
  function reducer(state) { return ++state.count; }
  export default function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    return <button onClick={() => dispatch()}>{state.count}</button>;
  }
checks:
  - match: "return\\s+\\{\\s+count:\\s+state\\.count\\s+\\+\\s+1\\s+\\};"
    message: "Return a new object containing the updated count."
hint: "Return a new object containing the updated count."
```

```quiz
question: "What should a reducer do?"
options:
  - "Calculate next state without side effects or mutation."
  - "Update the browser DOM directly."
  - "Start every network request."
answer: 0
explain: "Reducers are pure transition functions; effects belong elsewhere."
```

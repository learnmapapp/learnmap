---
title: "Array state"
icon: "🧮"
branch: "interaction"
requires: ["object-state", "lists", "keys"]
summary: "Use map, filter, and spread to produce a new collection."
---

Update a state array by creating a new array and copying changed records:

```jsx
import { useState } from "react";

export default function Checklist() {
  const [tasks, setTasks] = useState([{ id: "read", title: "Read", done: false }]);
  function toggle(id) {
    setTasks(previous => previous.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  }
  return <ul>{tasks.map(task => <li key={task.id}>
    <button onClick={() => toggle(task.id)}>{task.done ? "Done" : "Todo"}: {task.title}</button>
  </li>)}</ul>;
}
```

Use `filter` to remove items and `[...previous, newItem]` to append. Do not call `push`, `splice`, or a mutating sort on the stored array.

## Copy changed levels

Copying the array alone does not make its records independent. If changing a record, copy that record as well. Preserve stable ids while changing data so React keeps component identity aligned with each logical item.

Calculate updates from previous state when they depend on its current contents. Generate a new record's id at creation time, such as in the event handler, rather than while rendering its list.

```compare javascript
const tasks = [{ id: "read", done: false }];
const next = tasks.map(task => ({ ...task, done: true }));
// Immutable updates are ordinary JavaScript array and object operations.
```

```exercise
goal: "Append by creating a new array instead of returning push's length."
lang: jsx
code: |
  import { useState } from "react";
  export default function Names() {
    const [names, setNames] = useState(["Ada"]);
    return <button onClick={() => setNames(previous => previous.push("Grace"))}>{names.join(", ")}</button>;
  }
checks:
  - match: "\\[\\.\\.\\.previous,\\s+\"Grace\"\\]"
    message: "Return [...previous, \"Grace\"] from the updater."
hint: "Return [...previous, \"Grace\"] from the updater."
```

```quiz
question: "Is [...tasks] enough if you then mutate one of its existing objects?"
options:
  - "Yes, spread deep-copies every object."
  - "No, the nested objects are still shared."
  - "Only when tasks is const."
answer: 1
explain: "Array spread is shallow; copy a changed record too."
```

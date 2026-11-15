---
title: "Typed Hooks"
icon: "🧬"
branch: "quality"
requires: ["typescript-props", "reducers", "dom-refs"]
summary: "Provide explicit types where empty or absent initial values cannot infer enough."
---

Many Hook calls infer their types from an initializer. Empty collections and nullable references often need more information:

```tsx
import { useRef, useState } from "react";

type Task = { id: string; title: string };
export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  function add() {
    const title = inputRef.current?.value.trim();
    if (title) setTasks(previous => [...previous, { id: crypto.randomUUID(), title }]);
  }
  return <><label>Task <input ref={inputRef} /></label><button onClick={add}>Add</button>
    <ul>{tasks.map(task => <li key={task.id}>{task.title}</li>)}</ul></>;
}
```

The generic arguments explain the array element and DOM reference contracts. The ref still needs a null check before use.

## Model transitions too

For a typed reducer, use a discriminated action union such as `{ type: "add"; task: Task } | { type: "remove"; id: string }`. The switch can then narrow each action's payload.

Avoid `any` state merely because an empty initializer is inconvenient. Give the state a useful contract, including `null` or status alternatives where absence is meaningful.

```exercise
goal: "Type the empty collection as a Task array."
lang: tsx
code: |
  import { useState } from "react";
  type Task = { id: string; title: string };
  export default function Tasks() {
    const [tasks, setTasks] = useState<string[]>([]);
    return <button onClick={() => setTasks([{ id: "first", title: "Learn" }])}>{tasks.length}</button>;
  }
checks:
  - match: "useState<Task\\[\\]>\\(\\[\\]\\)"
    message: "Use Task[] as the state type argument."
hint: "Use Task[] as the state type argument."
```

```quiz
question: "Why supply useState<Task[]>([]) for an empty initial array?"
options:
  - "An empty initializer cannot describe the intended Task element contract."
  - "All state needs explicit generic arguments."
  - "It validates fetched tasks automatically."
answer: 0
explain: "The explicit type tells the checker what later array elements should be."
```

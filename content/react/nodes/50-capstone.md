---
title: "A task board"
icon: "🚢"
branch: "architecture"
requires: ["array-state", "forms", "state-structure", "accessibility", "interaction-tests"]
summary: "Combine a controlled form, stable records, derived views, and immutable updates."
---

Build a small task board with one owner for its records and a derived count:

```jsx
import { useState } from "react";

export default function TaskBoard() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const remaining = tasks.filter(task => !task.done).length;
  function add(event) {
    event.preventDefault();
    const clean = title.trim();
    if (!clean) return;
    const task = { id: crypto.randomUUID(), title: clean, done: false };
    setTasks(previous => [...previous, task]);
    setTitle("");
  }
  function toggle(id) {
    setTasks(previous => previous.map(task => task.id === id ? { ...task, done: !task.done } : task));
  }
  return <section><h1>Task board</h1><form onSubmit={add}>
    <label>New task <input value={title} onChange={event => setTitle(event.target.value)} /></label>
    <button type="submit">Add task</button>
  </form><p aria-live="polite">{remaining} remaining</p>
    <ul>{tasks.map(task => <li key={task.id}><label>
      <input type="checkbox" checked={task.done} onChange={() => toggle(task.id)} />{task.title}
    </label></li>)}</ul>
  </section>;
}
```

## Verify the experience

Test adding a trimmed title, rejecting blank input, toggling completion, and keeping ids stable. Use keyboard interaction and queries by label or role. The remaining count should follow the records without a separate synchronization effect.

Extract a TaskRow when its behavior becomes independently useful. Add persistence through an explicit boundary when needed; this example intentionally keeps its records in component state. A reducer and typed action union are natural next steps once the transitions grow.

```exercise
goal: "Remove the selected task by returning a filtered array."
lang: jsx
code: |
  import { useState } from "react";
  export default function TaskBoard() {
    const [tasks, setTasks] = useState([{ id: "first", title: "Learn React" }]);
    function remove(id) { setTasks(previous => previous.filter(task => task.id === id)); }
    return <ul>{tasks.map(task => <li key={task.id}>{task.title}<button onClick={() => remove(task.id)}>Remove</button></li>)}</ul>;
  }
checks:
  - match: "task\\.id\\s+!==\\s+id"
    message: "Keep the tasks whose id differs from the removed id."
hint: "Keep the tasks whose id differs from the removed id."
```

```quiz
question: "Why is remaining calculated from tasks instead of independently stored?"
options:
  - "It should stay derived from the one source of truth."
  - "React cannot store numbers."
  - "Effects are required to count arrays."
answer: 0
explain: "Derivation prevents a second count from drifting away from the task records."
```

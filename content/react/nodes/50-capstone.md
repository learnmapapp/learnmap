---
title: "A task board"
icon: "🚢"
branch: "architecture"
requires: ["array-state", "forms", "state-structure", "accessibility", "interaction-tests"]
summary: "Combine a controlled form, stable records, derived views, and immutable updates."
---
Time to put it together. We'll build a small task board in four rounds, and each round uses something from earlier in the course. Try writing each round yourself before reading the code.

## Round 1: the data

What's the [smallest state](node:state-structure) that describes the board? A list of tasks, and the current filter. Everything else can be derived.

```jsx title=src/TaskBoard.jsx
import { useState } from "react";

const initialTasks = [
  { id: crypto.randomUUID(), title: "Learn JSX", done: true },
  { id: crypto.randomUUID(), title: "Build a board", done: false },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  // "all", "open" or "done":
  const [filter, setFilter] = useState("all");
```

Each task gets a stable `id` when it's created, for [keys](node:keys) and lookups.

## Round 2: derived values

```jsx
  const visible = tasks.filter(task => {
    if (filter === "done") return task.done;
    if (filter === "open") return !task.done;
    return true;
  });
  const openCount = tasks.filter(task => !task.done).length;
```

No state for these; they're [calculated](node:derived-state) on every render, so they can't fall out of sync.

## Round 3: the updates

All [immutable](node:array-state): a new array every time.

```jsx
  function add(title) {
    setTasks(previous => [
      ...previous,
      { id: crypto.randomUUID(), title, done: false },
    ]);
  }

  function toggle(id) {
    setTasks(previous =>
      previous.map(task =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function remove(id) {
    setTasks(previous => previous.filter(task => task.id !== id));
  }
```

## Round 4: the UI

```jsx
  return (
    <section>
      <h1>Tasks ({openCount} open)</h1>
      <NewTaskForm onAdd={add} />

      <div role="group" aria-label="Filter">
        {["all", "open", "done"].map(name => (
          <button
            key={name}
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <ul>
        {visible.map(task => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggle(task.id)}
              />
              {task.title}
            </label>
            <button
              aria-label={`Remove ${task.title}`}
              onClick={() => remove(task.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      {visible.length === 0 && <p>Nothing here.</p>}
    </section>
  );
}

function NewTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (title.trim() === "") return;
    onAdd(title.trim());
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-task">New task</label>
      <input
        id="new-task"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
```

Spot the earlier lessons: a [controlled input](node:controlled-inputs) in a real [form](node:forms), handlers passed down as props, [accessible](node:accessibility) labels on the icon button and filter group, and keys from stable ids.

## Your next steps

- Write [interaction tests](node:interaction-tests): add a task, filter it, remove it.
- Save the tasks to `localStorage` with an [effect](node:effects).
- Move the updates into a [reducer](node:reducers), and share it through [context](node:reducer-context).
- Convert it to TypeScript with [typed props](node:typescript-props).

Congratulations on finishing the map! 🪁

```compare javascript
// The vanilla version would need to re-render the list and keep the
// counter, filter buttons and empty message in sync by hand on every
// change. That's the problem React set out to solve in lesson one.
```

```exercise
goal: "Clicking ✕ removes every task **except** the one you clicked. Fix the filter so it keeps the others."
lang: jsx
code: |
  import { useState } from "react";
  export default function TaskBoard() {
    const [tasks, setTasks] = useState([{ id: "first", title: "Learn React" }]);
    function remove(id) { setTasks(previous => previous.filter(task => task.id === id)); }
    return <ul>{tasks.map(task => <li key={task.id}>{task.title}<button onClick={() => remove(task.id)}>Remove</button></li>)}</ul>;
  }
checks:
  - match: 'task\.id\s+!==\s+id'
    message: "Keep the tasks whose id differs from the removed id."
hint: filter keeps the items for which the test is true.
solution: |
  import { useState } from "react";
  export default function TaskBoard() {
    const [tasks, setTasks] = useState([{ id: "first", title: "Learn React" }]);
    function remove(id) { setTasks(previous => previous.filter(task => task.id !== id)); }
    return <ul>{tasks.map(task => <li key={task.id}>{task.title}<button onClick={() => remove(task.id)}>Remove</button></li>)}</ul>;
  }
```

```quiz
question: "Why is `openCount` a plain variable instead of state?"
options:
  - State can't hold numbers.
  - It's derived from tasks, so storing it separately could make it go out of sync.
  - Variables render faster than state.
answer: 1
explain: Anything you can calculate from existing state should be calculated.
```

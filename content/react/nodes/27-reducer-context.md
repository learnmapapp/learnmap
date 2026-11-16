---
title: "Reducer and context"
icon: "🤝"
branch: "architecture"
requires: ["reducers", "context"]
summary: "Keep transitions in one owner while distributing state and dispatch separately."
---
You now have two tools: a [reducer](node:reducers) gathers all the ways state can change into one place, and [context](node:context) delivers values deep into the tree. Combined, they make a small, home-made state manager. Let's build one for a to-do app, as a recipe.

**Ingredients:** a reducer, two contexts, one provider component.

## Step 1: two contexts

```jsx title=src/TasksContext.jsx
import { createContext, useContext, useReducer } from "react";

const TasksContext = createContext(null);
const DispatchContext = createContext(null);
```

Why two? Components that only **send** actions, like an "Add" button, don't need the task list. With a separate context for `dispatch`, they don't re-render when the list changes. `dispatch` never changes, so they almost never re-render.

## Step 2: one provider component

```jsx
export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  return (
    <TasksContext value={tasks}>
      <DispatchContext value={dispatch}>
        {children}
      </DispatchContext>
    </TasksContext>
  );
}
```

## Step 3: small hooks, so components don't import contexts

```jsx
export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(DispatchContext);
}
```

## Step 4: serve

```jsx title=src/App.jsx
export default function App() {
  return (
    <TasksProvider>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}

function AddTask() {
  const dispatch = useTasksDispatch();
  return (
    <button
      onClick={() => dispatch({ type: "added", title: "New task" })}
    >
      Add
    </button>
  );
}

function TaskList() {
  const tasks = useTasks();
  return (
    <ul>
      {tasks.map(task => <li key={task.id}>{task.title}</li>)}
    </ul>
  );
}
```

`App` knows nothing about how tasks are stored. `AddTask` and `TaskList` could be anywhere in the tree.

## When to use it

For state shared across a whole section of an app, this pattern is plenty. Bigger apps often reach for a library (Redux Toolkit, Zustand, or a data-fetching library for server data), which build on the same ideas.

```compare javascript
// A tiny event bus does something similar without React:
// emit("added", task); on("added", render);
```

```exercise
goal: "The button calls `count` as if it were a function. Send the action through `dispatch`."
lang: jsx
code: |
  import { useReducer } from "react";
  function reducer(count, action) { return action.type === "add" ? count + 1 : count; }
  export default function Counter() {
    const [count, dispatch] = useReducer(reducer, 0);
    return <button onClick={() => count({ type: "add" })}>{count}</button>;
  }
checks:
  - match: 'onClick=\{\(\)\s+=>\s+dispatch\(\{\s+type:\s+"add"\s+\}\)\}'
    message: "Call dispatch with the action."
hint: "useReducer returns the state first and dispatch second."
solution: |
  import { useReducer } from "react";
  function reducer(count, action) { return action.type === "add" ? count + 1 : count; }
  export default function Counter() {
    const [count, dispatch] = useReducer(reducer, 0);
    return <button onClick={() => dispatch({ type: "add" })}>{count}</button>;
  }
```

```quiz
question: "Why put `dispatch` in its own context, separate from the state?"
options:
  - React doesn't allow functions in context.
  - Components that only dispatch don't re-render when the state changes.
  - dispatch must be provided first.
answer: 1
explain: dispatch is stable, so its context value never changes.
```

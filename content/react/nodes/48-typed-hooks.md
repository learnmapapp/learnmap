---
title: "Typed Hooks"
icon: "🧬"
branch: "quality"
requires: ["typescript-props", "reducers", "dom-refs"]
summary: "Provide explicit types where empty or absent initial values cannot infer enough."
---
Most Hooks infer their types from what you give them, so you write fewer annotations than you'd think. This lesson is a field guide: for each Hook, when inference is enough, and when you have to help.

## `useState`

**Inference works** when the initial value says it all:

```tsx
const [count, setCount] = useState(0);          // number
const [name, setName] = useState("");           // string
```

**You help** when the initial value is empty or missing, because TypeScript can't see the future:

```tsx
type Task = { id: string; title: string };

const [tasks, setTasks] = useState<Task[]>([]);         // not never[]
const [user, setUser] = useState<User | null>(null);   // not null
```

Without `<Task[]>`, an empty array is inferred as `never[]`, and adding a task is an error.

## `useRef`

**For DOM elements**, pass the element type and start with `null`:

```tsx
const inputRef = useRef<HTMLInputElement>(null);

inputRef.current?.focus();      // current may be null, hence ?.
```

**For values**, the type of the initial value is used, or give one:

```tsx
const intervalRef = useRef<number | null>(null);
```

## `useReducer`

**Type the reducer**, and the rest follows. A union of action types makes `switch` cases type-safe:

```tsx
type Action =
  | { type: "added"; title: string }
  | { type: "removed"; id: string };

function reducer(tasks: Task[], action: Action): Task[] {
  switch (action.type) {
    case "added":
      const id = crypto.randomUUID();
      return [...tasks, { id, title: action.title }];
    case "removed":
      return tasks.filter(task => task.id !== action.id);
  }
}

const [tasks, dispatch] = useReducer(reducer, []);
dispatch({ type: "added", title: "Learn" });     // ✅
dispatch({ type: "added" });                     // ❌ title is missing
```

## `useContext`

**Type `createContext`**. A common pattern for contexts without a sensible default:

```tsx
const UserContext = createContext<User | null>(null);

function useUser(): User {
  const user = useContext(UserContext);
  if (user === null) throw new Error("useUser needs a UserContext");
  return user;
}
```

The custom Hook checks once, so callers get a plain `User`.

## `useMemo` and `useCallback`

**Inference works.** They return whatever your function returns. Annotate callback parameters, as in any function.

```compare typescript
// The same problem outside React:
const tasks = [];            // any[] or never[], depending on settings
const typed: Task[] = [];    // say what goes in
```

```exercise
goal: "The state is typed as `string[]`, but it holds tasks. Give `useState` the right type argument."
lang: tsx
code: |
  import { useState } from "react";
  type Task = { id: string; title: string };
  export default function Tasks() {
    const [tasks, setTasks] = useState<string[]>([]);
    return <button onClick={() => setTasks([{ id: "first", title: "Learn" }])}>{tasks.length}</button>;
  }
checks:
  - match: 'useState<Task\[\]>\(\[\]\)'
    message: "Use Task[] as the state type argument."
hint: An array of Task is written Task[].
solution: |
  import { useState } from "react";
  type Task = { id: string; title: string };
  export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    return <button onClick={() => setTasks([{ id: "first", title: "Learn" }])}>{tasks.length}</button>;
  }
```

```quiz
question: "Why does `useState([])` need a type argument, while `useState(0)` doesn't?"
options:
  - Arrays always need explicit types in TypeScript.
  - An empty array tells TypeScript nothing about what will go in it.
  - useState only infers primitive types.
answer: 1
explain: 0 is clearly a number. [] could be an array of anything.
```

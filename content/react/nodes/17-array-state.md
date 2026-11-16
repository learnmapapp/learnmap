---
title: "Array state"
icon: "🧮"
branch: "interaction"
requires: ["object-state", "lists", "keys"]
summary: "Use map, filter, and spread to produce a new collection."
---
Same rule as [objects](node:object-state): never change a state array, make a new one. The catch is that many familiar array methods change the array in place. Here's a cheat sheet for the operations you'll need, with `todos` as our state.

```jsx
const [todos, setTodos] = useState([
  { id: 1, title: "Buy milk", done: false },
  { id: 2, title: "Walk the dog", done: true },
]);
```

## Add

```jsx
setTodos(previous => [...previous, newTodo]);    // at the end
setTodos(previous => [newTodo, ...previous]);    // at the start
```

## Remove

```jsx
setTodos(previous => previous.filter(todo => todo.id !== id));
```

`filter` keeps the items where the test is true, so "remove this id" is "keep everything **else**".

## Update one item

```jsx
setTodos(previous =>
  previous.map(todo =>
    todo.id === id ? { ...todo, done: !todo.done } : todo,
  ),
);
```

`map` returns a new array. The matching item is replaced by a changed copy; all others are kept as they are.

## Sort or reverse

```jsx
setTodos(previous =>
  previous.toSorted((a, b) => a.title.localeCompare(b.title)),
);
```

`toSorted` and `toReversed` return new arrays. Their older cousins `sort` and `reverse` change the original.

## Which methods are safe?

| ✅ Return a new array | ❌ Change the array in place |
| --- | --- |
| `map`, `filter`, `slice`, `concat` | `push`, `pop`, `shift`, `unshift` |
| `toSorted`, `toReversed`, `with` | `sort`, `reverse`, `splice` |
| `[...array]` | `array[i] = x` |

## The `push` trap

```jsx
setTodos(previous => previous.push(newTodo));
```

This breaks twice: it changes the old array, **and** `push` returns the new **length**. Your state is now the number 3, and `todos.map` crashes on the next render.

```compare javascript
// Outside React, push is fine; the screen isn't watching:
todos.push(newTodo);
```

```exercise
goal: "`push` returns the array's new length, so the state becomes a number. Return a new array instead."
lang: jsx
code: |
  import { useState } from "react";
  export default function Names() {
    const [names, setNames] = useState(["Ada"]);
    return (
      <button onClick={() => setNames(previous => previous.push("Grace"))}>
        {names.join(", ")}
      </button>
    );
  }
checks:
  - match: '\[\.\.\.previous,\s+"Grace"\]'
    message: "Return [...previous, \"Grace\"] from the updater."
hint: Spread the old items into a new array, then add the name.
solution: |
  import { useState } from "react";
  export default function Names() {
    const [names, setNames] = useState(["Ada"]);
    return (
      <button onClick={() => setNames(previous => [...previous, "Grace"])}>
        {names.join(", ")}
      </button>
    );
  }
```

```quiz
question: "How do you remove the todo with id 7 from state?"
options:
  - "`setTodos(t => t.splice(7, 1))`"
  - "`setTodos(t => t.filter(todo => todo.id !== 7))`"
  - "`delete todos[7]`"
answer: 1
explain: filter returns a new array with every todo except number 7.
```

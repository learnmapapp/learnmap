---
title: "Stable keys"
icon: "🔑"
branch: "rendering"
requires: ["lists"]
summary: "Preserve list item identity with data-owned identifiers."
---
You've seen `key` in every list. Here's what it's for, with an experiment you can picture.

A to-do list, where each row has a checkbox and a text input:

```jsx
{todos.map(todo => (
  <li key={???}>
    <input type="checkbox" />
    {todo.title}
  </li>
))}
```

You tick the first item ("Buy milk"). Then you add a new item at the **top** of the list. What happens to the tick?

## Experiment 1: `key={index}`

The new item is now index 0. React matches rows by key, so it thinks row 0 is the same row as before and keeps its state, the tick, there. Now **"Walk the dog" is ticked**, and "Buy milk" isn't. The checkbox stayed where it was while the data moved.

## Experiment 2: `key={Math.random()}`

Every render produces new keys. React thinks every row is brand new, so it destroys and recreates them all. The tick is **lost**, any focus is lost, and it's slow.

## Experiment 3: `key={todo.id}`

"Buy milk" keeps its id wherever it moves. React follows it, and its tick goes with it. ✅

## The rules

A [[key]] tells React **which item is which** between renders. So a good key is:

- **Stable**: the same item gets the same key every time.
- **Unique among its siblings**: two items in the same list can't share one. (Keys don't need to be unique across the whole page.)
- **From the data**: database ids, slugs or UUIDs. If your data has none, create them when items are **created**, for example with `crypto.randomUUID()`, and store them with the item.

Using the index is acceptable only when the list never reorders, filters or inserts, and the rows hold no state.

## Keys go on the outermost element in the map

```jsx
{todos.map(todo => <TodoRow key={todo.id} todo={todo} />)}
```

`key` isn't passed to the component as a prop. It's for React only. If `TodoRow` needs the id, pass it separately.

```tip
Keys can also reset a component on purpose. Change its key, and React treats it as new. [Preserving state](node:preserving-state) uses this trick.
```

```exercise
goal: "A random key changes on every render, so React recreates every row. Use the lesson's stable `id`."
lang: jsx
code: |
  export default function Lessons() {
    const lessons = [{ id: "jsx", title: "JSX" }];
    return <ul>{lessons.map(lesson => <li key={Math.random()}>{lesson.title}</li>)}</ul>;
  }
checks:
  - match: 'key=\{lesson\.id\}'
    message: "Use the stable id stored on each lesson."
hint: Each lesson object has an id property.
solution: |
  export default function Lessons() {
    const lessons = [{ id: "jsx", title: "JSX" }];
    return <ul>{lessons.map(lesson => <li key={lesson.id}>{lesson.title}</li>)}</ul>;
  }
```

```quiz
question: "A sortable table uses `key={index}`. What can go wrong when the user sorts it?"
options:
  - Nothing; the index is always unique.
  - State inside the rows, like a checkbox or input, stays at the old positions.
  - The table can't be sorted.
answer: 1
explain: After sorting, index 0 is a different item, but React thinks it's the same row.
```

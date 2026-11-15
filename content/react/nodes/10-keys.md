---
title: "Stable keys"
icon: "🔑"
branch: "rendering"
requires: ["lists"]
summary: "Preserve list item identity with data-owned identifiers."
---

A key tells React which sibling represents the same item across renders:

```jsx
export default function Lessons() {
  const lessons = [
    { id: "jsx", title: "JSX" },
    { id: "state", title: "State" },
  ];
  return <ul>{lessons.map(lesson => <li key={lesson.id}>{lesson.title}</li>)}</ul>;
}
```

Keys need to be unique among siblings, not across the whole application. They help preserve the right component state when records move, appear, or disappear.

## Identity comes from the record

Avoid generating keys with `Math.random()` during rendering. A new key on every render remounts the component and loses its state. Array indexes can also attach state to the wrong record when the list changes order or contents.

Put the key on the element directly returned by `map`, including a wrapping component or explicit Fragment. A key is not delivered as an ordinary prop; pass `id` separately when the child needs it.

Stable keys describe identity, not just a way to silence a warning. Editing a list should keep input state associated with the same logical item.

```exercise
goal: "Use the lesson identifier rather than a random key."
lang: jsx
code: |
  export default function Lessons() {
    const lessons = [{ id: "jsx", title: "JSX" }];
    return <ul>{lessons.map(lesson => <li key={Math.random()}>{lesson.title}</li>)}</ul>;
  }
checks:
  - match: "key=\\{lesson\\.id\\}"
    message: "Use the stable id stored on each lesson."
hint: "Use the stable id stored on each lesson."
```

```quiz
question: "Why avoid random keys created during rendering?"
options:
  - "They are too short."
  - "They create new identities and can reset component state."
  - "Keys must always be numbers."
answer: 1
explain: "Changing a key tells React to treat an item as a different component identity."
```

---
title: "Rendering lists"
icon: "📋"
branch: "rendering"
requires: ["conditional-rendering", "children"]
summary: "Transform data into elements with map and filter."
---

Use an array transformation to turn data into a list of elements:

```jsx
export default function LessonList() {
  const lessons = [
    { id: "jsx", title: "JSX", done: true },
    { id: "state", title: "State", done: false },
  ];
  const remaining = lessons.filter(lesson => !lesson.done);
  return <ul>{remaining.map(lesson => <li key={lesson.id}>{lesson.title}</li>)}</ul>;
}
```

`filter` selects records and `map` describes their UI. Neither should mutate the input array. Each mapped sibling needs a stable [[key]], explored next.

## Arrow function returns

An arrow with an expression body returns it automatically: `item => <li>...</li>`. An arrow with braces needs an explicit `return`. Forgetting that return produces undefined items instead of visible output.

Keep data separate from markup where practical. A stable identifier belongs to the record, not to a random value created while rendering. Empty lists are a real state too; show an appropriate message when that helps the user.

```exercise
goal: "Return the JSX from the map callback."
lang: jsx
code: |
  export default function Names() {
    return <ul>{["Ada", "Grace"].map(name => { <li key={name}>{name}</li>; })}</ul>;
  }
checks:
  - match: "name\\s+=>\\s+\\{\\s+return\\s+<li"
    message: "Add return inside the braced map callback."
hint: "Add return inside the braced map callback."
```

```quiz
question: "What is required when a map callback uses a braced function body?"
options:
  - "An explicit return for the JSX."
  - "A new React root."
  - "A useEffect call."
answer: 0
explain: "A braced arrow function body does not implicitly return its final expression."
```

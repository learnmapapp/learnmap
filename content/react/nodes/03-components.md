---
title: "Components"
icon: "🧱"
branch: "rendering"
requires: ["setup"]
summary: "Name components with capitals and let React call them."
---

A function component returns renderable content. Its name begins with a capital letter so JSX distinguishes it from a built-in tag:

```jsx
function LessonBadge() {
  return <span>One step closer</span>;
}
export default function Dashboard() {
  return <section><h1>Your lessons</h1><LessonBadge /></section>;
}
```

Lowercase tags such as `<section>` describe browser elements. `<LessonBadge />` refers to your component function.

## Compose instead of calling

Render a component as `<LessonBadge />`, rather than manually calling `LessonBadge()`. React owns the timing and identity of component calls, which becomes especially important when state and Hooks appear.

Define component functions at module level. Defining a component inside another component creates a new function identity on each render and can unexpectedly reset its subtree's state.

Split a component when a section has a useful name, repeated structure, or independent behavior. Do not split every single tag into a separate file merely to increase the component count. A clear composition should make the screen's structure easier to understand.

```compare javascript
import { createElement } from "react";
export default function Badge() {
  return createElement("span", null, "Ready");
} // React without JSX
```

```exercise
goal: "Use the defined component rather than a lowercase custom element."
lang: jsx
code: |
  function LessonBadge() { return <span>Ready</span>; }
  export default function App() { return <lessonBadge />; }
checks:
  - match: "<LessonBadge\\s+/>"
    message: "Capitalize the component name in JSX."
hint: "Capitalize the component name in JSX."
```

```quiz
question: Why does `<LessonBadge />` start with a capital letter?
options:
  - It marks a user-defined component rather than a built-in tag.
  - All JSX tags must use capitals.
  - It makes the result a class instance.
answer: 0
explain: Capitalized JSX names refer to component values; lowercase names describe built-in elements.
```

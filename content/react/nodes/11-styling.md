---
title: "Styling components"
icon: "🎨"
branch: "rendering"
requires: ["props", "jsx"]
summary: "Use CSS classes for design and inline styles for computed values."
---

Use `className` to connect markup to ordinary CSS:

```jsx
export default function Badge({ active = true }) {
  return <span className={active ? "badge active" : "badge"}>React</span>;
}
```

The CSS still owns layout, colors, and interaction states. Import a stylesheet in your application entry point or component when supported by the build tool.

## Inline styles use an object

```jsx
export function Progress({ percent = 60 }) {
  return <div style={{ width: `${percent}%`, backgroundColor: "teal", height: 8 }} />;
}
```

The outer braces enter JavaScript; the inner braces create an object. Property names normally use camelCase. Numeric values receive pixel units for many properties, while some properties are unitless; explicit strings are useful when a different unit is intended.

Prefer classes for shared rules, responsive breakpoints, hover states, and focus indicators. Inline styles suit a small dynamic value such as progress width. Maintain readable contrast and visible keyboard focus rather than relying on color alone to communicate state.

```exercise
goal: "Supply an object with the camelCase CSS property."
lang: jsx
code: |
  export default function Badge() {
    return <span style="background-color: teal">Ready</span>;
  }
checks:
  - match: "style=\\{\\{\\s+backgroundColor:\\s+\"teal\"\\s+\\}\\}"
    message: "Use a style object with backgroundColor."
hint: "Use a style object with backgroundColor."
```

```quiz
question: "Why are there two brace pairs in style={{ color: \"teal\" }}?"
options:
  - "One enters JavaScript; one creates an object."
  - "React requires every prop to use double braces."
  - "The first one declares CSS."
answer: 0
explain: "The style value is a JavaScript object embedded in JSX."
```

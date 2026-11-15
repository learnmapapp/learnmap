---
title: "Children"
icon: "🎁"
branch: "rendering"
requires: ["props"]
summary: "Build wrappers that accept nested content instead of knowing every use case."
---

Nested JSX arrives through the `children` prop:

```jsx
function Card({ title, children }) {
  return <section><h2>{title}</h2><div>{children}</div></section>;
}
export default function App() {
  return <Card title="Next lesson"><p>Learn state.</p></Card>;
}
```

The wrapper controls its frame, while its caller chooses the inner content. This is [[composition]]: combining small pieces without forcing a wrapper to know every screen it might contain.

## Keep the API clear

Children can be a single node, several nodes, text, or nothing. Do not assume they are always an array. Most wrappers should render them directly rather than inspecting or rewriting them.

Named JSX props can provide additional slots, such as `footer={<button>Continue</button>}`, when a component has distinct regions. Use children for the main content and meaningful named props for other roles.

Composition often avoids inheritance and large sets of mode booleans. If a wrapper accumulates many unrelated special cases, let callers supply the varying content instead.

```exercise
goal: "Show the content passed into the Panel wrapper."
lang: jsx
code: |
  function Panel({ children }) { return <section />; }
  export default function App() { return <Panel><p>Ready</p></Panel>; }
checks:
  - match: "<section>\\{children\\}</section>"
    message: "Render children inside the section."
hint: "Render children inside the section."
```

```quiz
question: "Where does JSX nested inside <Card>...</Card> arrive?"
options:
  - "In the children prop."
  - "As a global variable."
  - "In the DOM before React renders."
answer: 0
explain: "Nested content is supplied through children."
```

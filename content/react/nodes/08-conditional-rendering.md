---
title: "Conditional UI"
icon: "🚦"
branch: "rendering"
requires: ["expressions", "props"]
summary: "Choose markup with ordinary JavaScript conditions."
---

Return different markup or use a conditional expression to describe different states:

```jsx
function Status({ completed }) {
  return completed ? <p>Finished</p> : <p>Keep going</p>;
}
export default function App() {
  return <Status completed={false} />;
}
```

A component can return `null` when it should render nothing. Booleans, `null`, and `undefined` used as children do not display text.

## Beware numeric short-circuiting

`count && <Badge />` renders the number `0` when count is zero. If you mean a condition, write `count > 0 && <Badge />`.

```jsx
export function Badge({ count }) {
  return <div>{count > 0 && <span>{count} new</span>}</div>;
}
```

Keep branches readable instead of stacking nested ternaries. Choose a named variable or an early return for a larger distinction.

Hiding a component by removing it from the tree can reset its state when later remounted. Conditional output is therefore also an identity decision, which [preserving state](node:preserving-state) explores.

```exercise
goal: "Render the badge only when count is positive, without showing zero."
lang: jsx
code: |
  export default function Badge({ count = 0 }) {
    return <div>{count && <span>{count} new</span>}</div>;
  }
checks:
  - match: "count\\s+>\\s+0\\s+\\&\\&"
    message: "Use count > 0 as the boolean condition."
hint: "Use count > 0 as the boolean condition."
```

```quiz
question: What can `0 && <Badge />` render as a child?
options:
  - Nothing in every case.
  - The number 0.
  - The word `false`.
answer: 1
explain: The expression evaluates to 0, which React can render as a number.
```

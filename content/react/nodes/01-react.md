---
title: "React"
icon: "⚛️"
branch: "core"
requires: []
summary: "Describe an interface as components whose output follows data."
kind: "hub"
---

React builds interfaces from [[component|components]]: functions describing a piece of the screen. A component can be a small button or a whole page.

```jsx
export default function Welcome() {
  return <h1>Ready to learn?</h1>;
}
```

This is [[JSX]], a syntax extension transformed by the build tool. React uses the resulting descriptions to update the browser DOM as data changes. It does not require every screen element to be managed by hand.

## Choose a route

Learn JavaScript functions, arrays, objects, and modules before tackling advanced examples. This map uses JavaScript with JSX first; its later TypeScript branch adds typed contracts. Examples use modern function components and React 19 APIs where explicitly introduced.

Start with [setup](node:setup), or choose a goal for forms, shared state, or external data. Exercises check code text rather than executing a browser. Run examples in a local React project to see behavior. The [official learning guide](https://react.dev/learn) provides a companion reference.

```quiz
question: "What is a React component in the examples on this map?"
options:
  - "A function describing part of the interface."
  - "A separate browser window."
  - "A CSS selector."
answer: 0
explain: "Function components describe UI that React renders and updates."
```

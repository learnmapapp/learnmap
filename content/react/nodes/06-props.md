---
title: "Props"
icon: "📨"
branch: "rendering"
requires: ["expressions"]
summary: "Pass data from parents and treat it as a read-only input."
---

[[Props]] are the inputs a parent passes to a component. Destructure them in the function parameter:

```jsx
function Greeting({ name, punctuation = "!" }) {
  return <h2>Hello, {name}{punctuation}</h2>;
}
export default function App() {
  return <Greeting name="Ada" punctuation="." />;
}
```

Numbers, booleans, objects, and functions use expression braces at the call site. A prop default applies when the value is missing or `undefined`, not when it is explicitly `null`.

## Inputs are read-only snapshots

Do not mutate props, including nested objects received through them. Request a change through an event callback or create an independent local value. The parent owns the data it supplies.

Prop names are part of your component's API. Prefer specific names that say what a value means. A small component does not need to know every field of its parent's application state.

When a component needs changeable memory of its own, use [state](node:state). Props and state both influence rendering, but their ownership differs.

```compare typescript
type Props = { name: string; punctuation?: string };
function greeting({ name, punctuation = "!" }: Props): string {
  return `Hello, ${name}${punctuation}`;
} // The same data contract before adding JSX
```

```exercise
goal: "Pass the name as a prop to Greeting."
lang: jsx
code: |
  function Greeting({ name }) { return <h1>Hello, {name}</h1>; }
  export default function App() { return <Greeting />; }
checks:
  - match: "<Greeting\\s+name=\"Ada\"\\s+/>"
    message: "Add name=\"Ada\" to the component."
hint: "Add name=\"Ada\" to the component."
```

```quiz
question: "Who owns the prop value supplied to a child?"
options:
  - "The parent that supplies it."
  - "The child may freely mutate it."
  - "React copies every nested object deeply."
answer: 0
explain: "Props are read-only inputs; the parent controls the supplied data."
```

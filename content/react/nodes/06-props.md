---
title: "Props"
icon: "📨"
branch: "rendering"
requires: ["expressions"]
summary: "Pass data from parents and treat it as a read-only input."
---
A component that always shows "Ada" isn't very useful. **Props** make components reusable: the parent passes values in, like arguments to a function.

```jsx
function Greeting({ name, emoji }) {
  return <h1>Hello, {name} {emoji}</h1>;
}

export default function App() {
  return (
    <>
      <Greeting name="Ada" emoji="👋" />
      <Greeting name="Grace" emoji="🚀" />
    </>
  );
}
```

One component, two different greetings. The props are written like HTML attributes, and React collects them into **one object** that it passes as the function's first parameter. `{ name, emoji }` destructures that object.

## Passing different kinds of values

```jsx
<Product
  title="Teapot"            // a string: quotes are fine
  price={24.5}              // anything else: use braces
  tags={["kitchen", "tea"]}
  inStock                   // shorthand for inStock={true}
  onBuy={() => addToCart()} // functions too
/>
```

## Defaults

Destructuring defaults work for props that might not be passed:

```jsx
function Greeting({ name, emoji = "👋" }) {
  return <h1>Hello, {name} {emoji}</h1>;
}
```

## The golden rule: props are read-only

A component **never changes its own props**:

```jsx
function Greeting({ name }) {
  name = name.toUpperCase();   // don't: you're changing an input
  return <h1>Hello, {name}</h1>;
}
```

Think of props like the arguments of a pure function: the same inputs should always give the same output. If you need a different version, compute a new variable: `const shout = name.toUpperCase()`. If a value must change over time, that's [state](node:state), and it lives somewhere else.

Data flows **down**: parents pass props to children, never the other way round. (Children talk back to parents through functions passed as props, as you'll see in [events](node:events).)

```compare javascript
// The same idea as calling a function with an options object:
greeting({ name: "Ada", emoji: "👋" });
```

```compare typescript
// TypeScript can describe exactly which props are allowed:
function Greeting({ name }: { name: string }) { /* ... */ }
```

```exercise
goal: "`Greeting` expects a `name`, but `App` doesn't pass one. Pass `name=\"Ada\"`."
lang: jsx
code: |
  function Greeting({ name }) { return <h1>Hello, {name}</h1>; }
  export default function App() { return <Greeting />; }
checks:
  - match: '<Greeting\s+name="Ada"\s+/>'
    message: "Add name=\"Ada\" to the component."
hint: Props are written like HTML attributes.
solution: |
  function Greeting({ name }) { return <h1>Hello, {name}</h1>; }
  export default function App() { return <Greeting name="Ada" />; }
```

```quiz
question: "How does a component receive its props?"
options:
  - As separate function parameters, one per prop.
  - As one object, the function's first parameter.
  - Through a global props variable.
answer: 1
explain: "That's why components usually destructure it: function Card({ title, body })."
```

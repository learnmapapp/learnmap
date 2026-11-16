---
title: "Components"
icon: "🧱"
branch: "rendering"
requires: ["setup"]
summary: "Name components with capitals and let React call them."
---
A component is a JavaScript function that returns markup. That's genuinely all:

```jsx
function Avatar() {
  return <img src="/ada.png" alt="Ada Lovelace" />;
}
```

You use it like an HTML tag. Components contain other components, and that's how you build a whole page:

```jsx
function ProfileCard() {
  return (
    <div className="card">
      <Avatar />
      <h2>Ada Lovelace</h2>
      <FollowButton />
    </div>
  );
}
```

Split the screen into boxes, give each box a name, and you have your components. A page is a tree of them: `App` contains `ProfileCard`, which contains `Avatar`.

## The capital letter rule

This is the one rule that trips up everyone at first. **Component names must start with a capital letter.**

```jsx
<Avatar />     // your component
<avatar />     // an HTML tag called "avatar", which doesn't exist
```

That's how JSX tells them apart: lowercase means a built-in HTML element like `<div>`, and capitalised means a component. Write `<avatar />` and React silently creates an empty, unknown HTML element. No error, just nothing on screen.

## You don't call components

You write `<Avatar />`, never `Avatar()`. React calls your function, when it decides to, which is what lets it manage [state](node:state) and updates for you.

## One file or many?

Small components can share a file. When a component is used in several places, give it its own file and export it:

```jsx title=src/Avatar.jsx
export default function Avatar() {
  return <img src="/ada.png" alt="Ada Lovelace" />;
}
```

```jsx
import Avatar from "./Avatar.jsx";
```

```warn
Define components at the top level of a file, never inside another component. A component defined inside another is a brand new function on every render, so React throws away its state each time.
```

```compare javascript
// Without React: a function that builds and returns DOM nodes.
function avatar() {
  const img = document.createElement("img");
  img.src = "/ada.png";
  return img;
}
```

```exercise
goal: "`<lessonBadge />` starts with a lowercase letter, so React treats it as an unknown HTML tag. Use the component."
lang: jsx
code: |
  function LessonBadge() { return <span>Ready</span>; }
  export default function App() { return <lessonBadge />; }
checks:
  - match: '<LessonBadge\s+/>'
    message: "Capitalise the component name in JSX."
hint: The name in JSX must match the function name exactly.
solution: |
  function LessonBadge() { return <span>Ready</span>; }
  export default function App() { return <LessonBadge />; }
```

```quiz
question: "Why must component names start with a capital letter?"
options:
  - "It's only a style convention."
  - "JSX treats lowercase names as built-in HTML elements."
  - "Lowercase names are reserved for class components."
answer: 1
explain: "`<div>` is an HTML tag; `<Div>` would be a component. The first letter decides."
```

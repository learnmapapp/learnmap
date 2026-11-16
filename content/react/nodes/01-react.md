---
title: "React"
icon: "⚛️"
branch: "core"
requires: []
summary: "Describe an interface as components whose output follows data."
kind: "hub"
---
If you've built a web page with plain JavaScript, you know this dance: find an element, change its text, add a class, remember to remove it later, keep the counter in the header in sync with the list...

```javascript
const badge = document.querySelector("#unread");
badge.textContent = String(unread);
badge.classList.toggle("hidden", unread === 0);
```

Every piece of data needs code that updates every place it appears. Miss one, and the screen is out of sync.

React flips this around. You write **what the screen should look like for the current data**, and React works out what to change in the page:

```jsx
function UnreadBadge({ unread }) {
  if (unread === 0) return null;
  return <span className="badge">{unread}</span>;
}
```

That function is a [[component]]: a piece of interface, written as a function that returns markup. The HTML-like syntax is [[JSX]]. When `unread` changes, React calls the function again and updates the page to match. You never write the "update" code yourself.

## The big ideas on this map

- **Components** are functions that describe part of the screen. You build pages by nesting them, like LEGO.
- **Props** are a component's inputs, passed in by its parent.
- **State** is data a component remembers, like what's typed in a box. Changing it re-renders the screen.
- **Effects** connect React to the world outside, such as timers, network requests and browser APIs.

## Before you start

You'll want to be comfortable with modern JavaScript: arrow functions, destructuring (`const { name } = user`), `map` and `filter`, spread (`...`), and `import`/`export`. React leans on all of them.

Head to [Local setup](node:setup) to get a project running, or pick a goal. The exercises here are checked by pattern, without running a browser, so try the examples in your own project too. The [official React docs](https://react.dev/learn) make a great companion.

```quiz
question: "In React, what do you write to keep the screen in sync with your data?"
options:
  - "Code that finds elements and updates them whenever data changes."
  - "Components that describe what the screen looks like for the current data."
  - "CSS rules that react to data attributes."
answer: 1
explain: "You describe the result; React works out which page updates are needed."
```

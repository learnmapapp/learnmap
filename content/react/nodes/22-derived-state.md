---
title: "Derived values"
icon: "🧮"
branch: "architecture"
requires: ["lifting-state", "lists"]
summary: "Calculate what you can from current inputs instead of synchronizing copies."
---
**Before.** A shopping cart, written with good intentions:

```jsx
function Cart() {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  function addItem(item) {
    setItems([...items, item]);
    setCount(count + 1);
    setTotal(total + item.price);
  }

  function removeItem(id) {
    setItems(items.filter(item => item.id !== id));
    setCount(count - 1);
    // ...oops, forgot to update total
  }
}
```

Three pieces of state that must always agree. Every function that touches the cart has to update all three, and the first time someone forgets, the badge says 2 items while the list shows 3.

**After.**

```jsx
function Cart() {
  const [items, setItems] = useState([]);

  const count = items.length;
  const total = items.reduce((sum, item) => sum + item.price, 0);

  function addItem(item) {
    setItems([...items, item]);
  }

  function removeItem(id) {
    setItems(items.filter(item => item.id !== id));
  }
}
```

`count` and `total` are now [[derived value]]s: plain variables, calculated from `items` on every render. They **can't** disagree with the list, because they're computed from it.

## The test

Before adding `useState`, ask: **"can I calculate this from props or other state?"** If yes, calculate it. Common examples:

- the number of items, or a total
- a filtered or sorted list: `items.filter(item => item.name.includes(query))`
- whether a form is valid
- a full name from first and last name

## "But isn't recalculating slow?"

Almost never. Filtering a few hundred items takes microseconds, and React renders often anyway. If you **measure** a real slowdown, [memoization](node:memoization) caches the result. Correct first, fast second.

## The effect anti-pattern

You might see this in older code:

```jsx
const [total, setTotal] = useState(0);
useEffect(() => {
  setTotal(items.reduce((sum, item) => sum + item.price, 0));
}, [items]);
```

It works, but it renders twice (once with the stale total) and adds code to maintain. Plain calculation during rendering is simpler and always up to date.

```compare javascript
// A getter is the same idea in plain JavaScript:
get total() { return this.items.reduce((s, i) => s + i.price, 0); }
```

```exercise
goal: "`count` is a fixed 0 that will never match the list. Derive it from `items`."
lang: jsx
code: |
  export default function Summary() {
    const items = ["JSX", "State"];
    const count = 0;
    return <p>{count} lessons</p>;
  }
checks:
  - match: 'const\s+count\s+=\s+items\.length;'
    message: "Use items.length instead of a separate count."
hint: Arrays know their own length.
solution: |
  export default function Summary() {
    const items = ["JSX", "State"];
    const count = items.length;
    return <p>{count} lessons</p>;
  }
```

```quiz
question: "A component has `firstName` and `lastName` in state. Where should `fullName` come from?"
options:
  - A third piece of state, updated whenever either name changes.
  - A variable computed during rendering from the two names.
  - An effect that sets it after each render.
answer: 1
explain: It can be calculated, so calculate it. Then it can never be out of date.
```

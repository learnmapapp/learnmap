---
title: "State structure"
icon: "🧭"
branch: "architecture"
requires: ["derived-state", "array-state"]
summary: "Store identifiers and intentional states instead of redundant copies."
---
You've learned how to use state. Now, how to **shape** it. Here are four state designs from real code, each with a smell, and a better version. These ideas matter more as apps grow.

## Smell 1: booleans that can contradict each other

```jsx
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
```

Can it be loading **and** failed? The types say yes. One status value makes impossible combinations impossible:

```jsx
const [status, setStatus] = useState("idle");
// "idle" | "loading" | "error" | "success"
```

## Smell 2: a copy of a selected object

```jsx
const [items, setItems] = useState(initialItems);
const [selectedItem, setSelectedItem] = useState(null);
```

Rename the selected item in `items`, and `selectedItem` still has the old name: it's a stale copy. Store the **id**, and look it up:

```jsx
const [selectedId, setSelectedId] = useState(null);
const selectedItem = items.find(item => item.id === selectedId);
```

Look up by `id`, never by something that can change, like the title.

## Smell 3: state that mirrors a prop

```jsx
function Message({ color }) {
  const [textColor, setTextColor] = useState(color);
}
```

`useState(color)` only reads the prop on the **first** render. When the parent passes a new `color`, `textColor` ignores it. Use the prop directly. (If you really do want "initial value only", name it `initialColor` so it's obvious.)

## Smell 4: deep nesting

```jsx
const [plan, setPlan] = useState({
  days: [{ id: 1, stops: [{ id: 7, places: [/* ... */] }] }],
});
```

Updating one place means copying every level above it. Consider a flat shape, keyed by id, like a little database:

```jsx
const [stops, setStops] = useState({
  7: { id: 7, dayId: 1, name: "Museum" },
});
```

## The short version

- Don't store what you can [calculate](node:derived-state).
- Don't store the same thing twice.
- Group values that always change together into one state.
- Prefer one status over several booleans.

```compare typescript
// TypeScript makes smell 1 a compile error to get wrong:
type Status = "idle" | "loading" | "error" | "success";
```

```exercise
goal: "The selected lesson is looked up by title, which can change. Compare the stable `id` instead."
lang: jsx
code: |
  export default function Selection() {
    const lessons = [{ id: "jsx", title: "JSX" }];
    const selectedId = "jsx";
    const selected = lessons.find(lesson => lesson.title === selectedId);
    return <p>{selected?.title}</p>;
  }
checks:
  - match: 'lesson\.id\s+===\s+selectedId'
    message: "Compare the id field with selectedId."
hint: Swap title for id in the comparison.
solution: |
  export default function Selection() {
    const lessons = [{ id: "jsx", title: "JSX" }];
    const selectedId = "jsx";
    const selected = lessons.find(lesson => lesson.id === selectedId);
    return <p>{selected?.title}</p>;
  }
```

```quiz
question: "Why store `selectedId` rather than a copy of the selected item?"
options:
  - Ids use less memory.
  - A copy can go stale when the original item changes; an id is always looked up fresh.
  - React can only store strings in state.
answer: 1
explain: With an id, there's one copy of the item, so it can't disagree with itself.
```

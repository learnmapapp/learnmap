---
title: "Memoization"
icon: "📊"
branch: "performance"
requires: ["derived-state", "props", "events"]
summary: "Cache measured work without making correctness depend on a cache."
---
## Myth: "React re-renders too much, so wrap everything in `useMemo`."

**Reality:** re-rendering is usually cheap. A render calls your function and compares the result; React only touches the real DOM where something changed. Most apps never need memoization. Measure first: the React DevTools Profiler shows which components take time.

When you **do** find something slow, there are three tools. [[memoization|Memoization]] means: remember a result, and reuse it while the inputs are the same.

## `useMemo`: cache a calculation

```jsx
const sorted = useMemo(
  () => products.toSorted((a, b) => a.price - b.price),
  [products],
);
```

The sort runs on the first render, and again only when `products` changes. Like [effect dependencies](node:effect-dependencies), list every value the function reads.

## `memo`: skip re-rendering a component

```jsx
const ProductList = memo(function ProductList({ products }) {
  // ...expensive rendering
});
```

When the parent re-renders, `ProductList` is skipped if its props are the same as last time.

## Myth: "`memo` makes my component skip renders."

**Reality:** only if the props are really the same, compared with `Object.is`. This defeats it:

```jsx
<ProductList products={products} onSelect={id => setSelected(id)} />
```

The arrow function is **new** on every render, so the props always differ. That's what the third tool is for. `useCallback` keeps the same function between renders:

```jsx
const handleSelect = useCallback(id => setSelected(id), []);
<ProductList products={products} onSelect={handleSelect} />
```

The same goes for objects and arrays created during rendering (`style={{...}}`, `filter(...)`): new each time.

## Myth: "Memoization can fix a bug."

**Reality:** your code must work correctly **without** it. React may throw away cached values, for example to free memory. Use it as a speed-up, never to control when something happens; that's what [effects](node:effects) are for.

## Myth: "I'll have to do all this by hand forever."

**Reality:** the React Compiler can add memoization automatically at build time, and many new projects enable it. Then you rarely write these yourself. Knowing what they do still helps when reading code, and when the profiler points at something.

```compare javascript
// Memoizing a plain function, without React:
const cache = new Map();
function slowSquare(n) {
  if (!cache.has(n)) cache.set(n, n * n);
  return cache.get(n);
}
```

```exercise
goal: "The memoized total never updates, because its dependency array is empty. Add the value it reads."
lang: jsx
code: |
  import { useMemo } from "react";
  const initial = [10, 20, 12];
  export default function Total({ scores = initial }) {
    const total = useMemo(() => scores.reduce((sum, score) => sum + score, 0), []);
    return <p>{total}</p>;
  }
checks:
  - match: ',\s+\[scores\]\);'
    message: "Include scores in the dependency list."
hint: The calculation reads one prop.
solution: |
  import { useMemo } from "react";
  const initial = [10, 20, 12];
  export default function Total({ scores = initial }) {
    const total = useMemo(() => scores.reduce((sum, score) => sum + score, 0), [scores]);
    return <p>{total}</p>;
  }
```

```quiz
question: "A `memo` component receives `onClick={() => save(id)}` from its parent. Does it skip re-rendering when the parent re-renders?"
options:
  - Yes, memo always skips re-renders.
  - No, the arrow function is new each render, so the props differ.
  - Only if the component has no state.
answer: 1
explain: Wrap the function in useCallback if the skip matters.
```

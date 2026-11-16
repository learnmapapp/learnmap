---
title: "Styling components"
icon: "🎨"
branch: "rendering"
requires: ["props", "jsx"]
summary: "Use CSS classes for design and inline styles for computed values."
---
React doesn't have its own styling system. You choose one. Here's a quick tour of the options, using one component: a progress bar.

## 1. Plain CSS classes

The default, and still a great choice:

```css title=src/ProgressBar.css
.progress { height: 8px; background: #eee; border-radius: 4px; }
.progress-fill { height: 100%; background: teal; border-radius: 4px; }
.progress-fill.done { background: gold; }
```

```jsx title=src/ProgressBar.jsx
import "./ProgressBar.css";

export default function ProgressBar({ percent }) {
  const done = percent === 100;
  const fillClass = done ? "progress-fill done" : "progress-fill";
  return (
    <div className="progress">
      <div className={fillClass} style={{ width: `${percent}%` }} />
    </div>
  );
}
```

`import "./ProgressBar.css"` works because Vite handles CSS imports. The styles are global, so use class names that won't clash.

## 2. Inline `style`, for computed values

See `style={{ width: ... }}` above? That's the one thing CSS classes can't easily do: a value that comes from data. Three details:

- It takes an **object**, not a string. The outer braces mean "JavaScript", and the inner braces are the object.
- Property names are **camelCase**: `backgroundColor`, not `background-color`.
- Numbers get `px` added automatically for sizes: `{ height: 8 }` is `8px`.

Use inline styles for dynamic values, and classes for everything else. Inline styles can't do hover states or media queries.

## 3. CSS Modules

Name a file `ProgressBar.module.css`, and its class names become local to the component:

```jsx
import styles from "./ProgressBar.module.css";

<div className={styles.progress} />
```

No clashes, ever. Vite supports it without setup.

## 4. Utility classes and CSS-in-JS

Tailwind CSS (`className="h-2 rounded bg-teal-500"`) and libraries like styled-components are popular too. They're separate tools with their own docs; the React part is the same `className` prop.

```compare javascript
// Without React: el.style.width = `${percent}%`;
// and el.classList.toggle("done", percent === 100);
```

```exercise
goal: "`style` takes an object in JSX, not a CSS string. Pass `{ backgroundColor: \"teal\" }`."
lang: jsx
code: |
  export default function Badge() {
    return <span style="background-color: teal">Ready</span>;
  }
checks:
  - match: 'style=\{\{\s+backgroundColor:\s+"teal"\s+\}\}'
    message: "Use a style object with backgroundColor."
hint: "Double braces: style={{ backgroundColor: \"teal\" }}"
solution: |
  export default function Badge() {
    return <span style={{ backgroundColor: "teal" }}>Ready</span>;
  }
```

```quiz
question: "Why does `style` have double braces, as in `style={{ color: \"red\" }}`?"
options:
  - "It's special syntax just for styles."
  - "The outer braces switch to JavaScript; the inner ones are an object literal."
  - "Double braces escape the CSS."
answer: 1
explain: It's an ordinary object inside an ordinary JSX expression.
```

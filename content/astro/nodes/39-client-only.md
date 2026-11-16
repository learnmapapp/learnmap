---
title: Client-only components
icon: "🖥️"
branch: islands
requires: [hydration]
summary: client:only skips the server render, for components that can only work in the browser.
---
**The error message tells the story.** You add a component that reads the visitor's saved theme:

```jsx title=src/components/ThemePicker.jsx
export default function ThemePicker() {
  const saved = localStorage.getItem("theme") ?? "light";
  return <p>Current theme: {saved}</p>;
}
```

```astro
<ThemePicker client:load />
```

The build fails:

```repl shell
> npm run build
error: ReferenceError: localStorage is not defined
```

**Why?** With `client:load`, the component is rendered twice: once to HTML at build time, and again in the browser to hydrate. At build time there's no browser, so there's no `localStorage`, `window` or `document`.

**The fix: `client:only`.** It skips the server render entirely. The component is rendered only in the browser:

```astro
<ThemePicker client:only="react" />
```

Note the value: `"react"`. Without a server render, Astro can't guess which framework the component belongs to, so you tell it.

**The trade-off:** no server HTML means the spot is empty until the JavaScript has loaded and run. To avoid a blank space or a layout jump, give it a fallback with `slot="fallback"`:

```astro
<ThemePicker client:only="react">
  <p slot="fallback">Loading theme…</p>
</ThemePicker>
```

**When to use which:**

- **The component touches browser APIs while rendering** (`localStorage`, `window.innerWidth`, a canvas, a browser-only library): `client:only`.
- **It only uses them in event handlers or effects**: those don't run on the server, so a normal directive works, and you keep the fast server HTML. Often the best fix is moving the browser code into a `useEffect`.

```jsx
const [theme, setTheme] = useState("light");
useEffect(() => setTheme(localStorage.getItem("theme") ?? "light"), []);
```

```compare javascript
// The classic guard: if (typeof window !== "undefined") { ... }
```

```compare typescript
// Next.js: dynamic(() => import("./ThemePicker"), { ssr: false })
```

```compare python
# Server templates never run browser code, so this split doesn't come
# up.
```

```exercise
goal: "This chart library needs `window` while rendering. Switch the directive to `client:only=\"react\"`."
code: |-
  ---
  import Chart from "../components/Chart.jsx";
  ---
  <Chart data={[3, 5, 2]} client:load />
checks:
  - match: '<Chart\s+data=\{\[3, 5, 2\]\}\s+client:only="react"\s*/>'
    message: 'Replace client:load with client:only="react".'
solution: |-
  ---
  import Chart from "../components/Chart.jsx";
  ---
  <Chart data={[3, 5, 2]} client:only="react" />
```

```quiz
question: "Why does `client:only` need the framework name, as in `client:only=\"react\"`?"
options:
  - For documentation only.
  - Without a server render, Astro has no other way to know which framework should render the component in the browser.
  - Astro supports only one framework per directive.
answer: 1
explain: Normally the server render reveals the framework; client:only skips that step.
```

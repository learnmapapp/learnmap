---
title: Add React
icon: "⚛️"
branch: islands
requires: [setup]
summary: Install the React integration and use React components inside Astro pages.
---
**A field guide to bringing a UI framework along.** Astro supports React, Preact, Vue, Svelte, Solid and more through *integrations*. This course uses React, but the steps are the same for the others.

**1. Install it.**

```repl shell
> npx astro add react
```

That one command installs `@astrojs/react`, `react` and `react-dom`, adds the integration to `astro.config.mjs`, and sets up TypeScript for JSX. Answer yes to its questions.

**2. Write a React component**, as a `.jsx` or `.tsx` file. Put it next to your Astro components:

```jsx title=src/components/Counter.jsx
import { useState } from "react";

export default function Counter({ start = 0 }) {
  const [count, setCount] = useState(start);
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

Nothing Astro-specific: it's a regular React component, and existing ones work unchanged.

**3. Use it from an Astro file**, like any other component:

```astro title=src/pages/index.astro
---
import Counter from "../components/Counter.jsx";
---
<h1>Welcome</h1>
<Counter start={5} />
```

**4. Look at the page. Click the button. Nothing happens!**

That's not a bug; it's Astro's default. React rendered the button to HTML at build time ("Clicked 5 times") and then Astro shipped **no React to the browser**. You get static HTML from a React component, which is perfect for things like a formatted table or a card.

**5. Make it interactive** by adding a client directive: `<Counter start={5} client:load />`. That's the subject of the [next lesson](node:hydration).

**Things to know when mixing:**

- **Props must be serializable** once the component is interactive: strings, numbers, arrays, plain objects, dates. Not functions.
- **Astro components can contain React components**, but not the other way round. A `.jsx` file can't import a `.astro` file. You can pass Astro content into React as children, though.
- **Several frameworks can coexist** on one page, if you really need it.

```compare javascript
// Without Astro, you'd render React on the server yourself with
// renderToString().
```

```compare typescript
// Next.js components are interactive by default; Astro components are
// static by default.
```

```compare python
# Like server-rendering a React component from Django, but built in.
```

```exercise
goal: "Use the React component in this Astro page: import `Clock` from `../components/Clock.jsx` and render `<Clock />` below the heading."
code: |-
  ---
  ---
  <h1>World time</h1>
checks:
  - match: 'import\s+Clock\s+from\s+"\.\./components/Clock\.jsx"'
    message: Import Clock from "../components/Clock.jsx".
  - match: '</h1>\s*\n\s*<Clock\s*/>'
    message: 'Add <Clock /> after the heading.'
solution: |-
  ---
  import Clock from "../components/Clock.jsx";
  ---
  <h1>World time</h1>
  <Clock />
```

```quiz
question: "You render a React counter with `<Counter />` and no directive. What happens when you click it?"
options:
  - It counts, as in any React app.
  - Nothing; it was rendered to static HTML and no React was sent to the browser.
  - The build fails.
answer: 1
explain: Without a client directive, framework components render to HTML only.
```

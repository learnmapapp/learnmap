---
title: "Context"
icon: "📡"
branch: "architecture"
requires: ["lifting-state", "children"]
summary: "Provide shared values through the tree without threading every intermediate prop."
---
## The problem, in one picture

Your app has a dark mode. The setting lives in `App`, and the button that needs it is five levels down:

```text
App            theme = "dark"
└─ Layout          (passes theme)
   └─ Sidebar      (passes theme)
      └─ Menu      (passes theme)
         └─ Item   (passes theme)
            └─ Button    uses theme
```

Four components accept a `theme` prop only to hand it on. That's called *prop drilling*: it's tedious, and every refactor of the middle components risks breaking the chain.

[[context|Context]] lets a component **broadcast** a value to everything below it, and lets any descendant **tune in**, skipping the middle.

## 1. Create the context

```jsx title=src/ThemeContext.js
import { createContext } from "react";

export const ThemeContext = createContext("light");
```

`"light"` is the default, used when there's no provider above.

## 2. Provide a value

Wrap part of the tree in the context, with a `value`:

```jsx
import { ThemeContext } from "./ThemeContext";

export default function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext value={theme}>
      <Layout />
    </ThemeContext>
  );
}
```

(Before React 19 you wrote `<ThemeContext.Provider value={theme}>`. You'll see both in the wild.)

## 3. Read it, anywhere below

```jsx
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Button({ children }) {
  const theme = useContext(ThemeContext);
  return <button className={`button-${theme}`}>{children}</button>;
}
```

`Layout`, `Sidebar`, `Menu` and `Item` no longer mention `theme` at all. When `theme` changes in `App`, every component reading it re-renders with the new value.

## Good uses, and a warning

Context fits values that **many** components need: the theme, the signed-in user, the language, a router.

It's not a replacement for props. Props make data flow visible: you can see where a value comes from. Context hides it. Before reaching for it, try [passing children](node:children) instead: often the middle components don't need to render the deep ones themselves.

```compare javascript
// Without React, you might reach for a module-level variable,
// but nothing would re-render when it changes.
export let theme = "light";
```

```exercise
goal: "`Label` stores the context object itself, not the value. Read the value with `useContext`."
lang: jsx
code: |
  import { createContext, useContext } from "react";
  const ThemeContext = createContext("light");
  function Label() { const theme = ThemeContext; return <p>{theme}</p>; }
  export default function App() { return <ThemeContext value="dark"><Label /></ThemeContext>; }
checks:
  - match: 'const\s+theme\s+=\s+useContext\(ThemeContext\);'
    message: Call useContext with ThemeContext.
hint: "useContext(ThemeContext) returns the nearest provided value."
solution: |
  import { createContext, useContext } from "react";
  const ThemeContext = createContext("light");
  function Label() { const theme = useContext(ThemeContext); return <p>{theme}</p>; }
  export default function App() { return <ThemeContext value="dark"><Label /></ThemeContext>; }
```

```quiz
question: "A component calls `useContext(ThemeContext)`, but there's no provider above it. What does it get?"
options:
  - "undefined"
  - The default value passed to createContext.
  - An error.
answer: 1
explain: The default is exactly for that case.
```

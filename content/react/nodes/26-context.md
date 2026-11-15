---
title: "Context"
icon: "📡"
branch: "architecture"
requires: ["lifting-state", "children"]
summary: "Provide shared values through the tree without threading every intermediate prop."
---

[[Context]] distributes a value to descendants. Create the context once at module level:

```jsx
import { createContext, useContext } from "react";

const ThemeContext = createContext("light");
function ThemeLabel() {
  const theme = useContext(ThemeContext);
  return <p>Theme: {theme}</p>;
}
export default function App() {
  return <ThemeContext value="dark"><ThemeLabel /></ThemeContext>;
}
```

This provider shorthand is available in React 19. Older React versions use `<ThemeContext.Provider value="dark">`.

## Nearest provider wins

A reader receives the nearest matching provider above it. The default supplied to `createContext` is a fallback when there is no provider; it is not a state variable that updates itself.

Context distributes data but does not choose its owner. A parent can put state in a provider and update it normally. Split unrelated concerns when one broad context causes many consumers to update unnecessarily.

Use props for direct, local relationships. Context is useful for genuinely cross-cutting data such as theme or a coordinated feature's shared state, not a requirement for every value.

```exercise
goal: "Read the supplied theme using useContext."
lang: jsx
code: |
  import { createContext, useContext } from "react";
  const ThemeContext = createContext("light");
  function Label() { const theme = ThemeContext; return <p>{theme}</p>; }
  export default function App() { return <ThemeContext value="dark"><Label /></ThemeContext>; }
checks:
  - match: "const\\s+theme\\s+=\\s+useContext\\(ThemeContext\\);"
    message: "Call useContext with ThemeContext."
hint: "Call useContext with ThemeContext."
```

```quiz
question: "Which context provider value does a consumer read?"
options:
  - "The nearest matching provider above it."
  - "The first provider ever created."
  - "Always the createContext default."
answer: 0
explain: "Context lookup follows the component tree to the nearest provider."
```

---
title: "Local setup"
icon: "🧰"
branch: "core"
requires: ["react"]
summary: "Create a development project and mount an application root."
---

For this browser-focused learning project, a Vite React template supplies a JSX transform and development server:

```shell
npm create vite@latest react-lab -- --template react
cd react-lab
npm install
npm run dev
```

Follow the tool's Node-version requirements. Keep the generated scripts: `npm run build` produces a production bundle, while the development server supports rapid editing.

## Mount once at the boundary

A typical entry file connects React to a container already present in the HTML:

```jsx
import { createRoot } from "react-dom/client";

function App() {
  return <h1>React lab</h1>;
}
const container = document.getElementById("root");
if (container) createRoot(container).render(<App />);
```

The HTML needs a matching `<div id="root"></div>`. Create a root once, then let state updates drive the application. Recreating roots during ordinary renders is not the update mechanism.

A development build is useful for feedback, while a deployment needs the production output. This map's course content does not install a second application in the repository.

```exercise
goal: "Render the component as JSX rather than passing its function itself."
lang: jsx
code: |
  import { createRoot } from "react-dom/client";
  function App() { return <h1>React lab</h1>; }
  const container = document.getElementById("root");
  if (container) createRoot(container).render(App);
checks:
  - match: "\\.render\\(<App\\s+/>\\)"
    message: "Pass <App /> to render."
hint: "Pass <App /> to render."
```

```quiz
question: "Where should createRoot normally be called?"
options:
  - "Inside every component render."
  - "At the application entry boundary for its container."
  - "Before every state setter."
answer: 1
explain: "A root connects React to a container; component state drives subsequent updates."
```

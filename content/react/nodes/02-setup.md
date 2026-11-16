---
title: "Local setup"
icon: "🧰"
branch: "core"
requires: ["react"]
summary: "Create a development project and mount an application root."
---
Let's get a React app on your screen. You need [Node.js](https://nodejs.org) (a current LTS version). Then, in a terminal:

```shell
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

Open the address it prints, usually `http://localhost:5173`, and you'll see a starter page. Edit a file, save, and the browser updates instantly.

**What just happened?** [Vite](https://vite.dev) is a build tool: it serves your files during development, turns JSX into JavaScript, and bundles everything for production with `npm run build`. Use `--template react-ts` if you want TypeScript from the start.

## A tour of the three files that matter

**1. `index.html`** has one empty element. React will fill it:

```html title=index.html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

**2. `src/main.jsx`** connects React to that element. It runs once:

```jsx title=src/main.jsx
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
```

Read it right to left: render the `App` component into a root created from the `#root` div.

**3. `src/App.jsx`** is your first component, and where you'll spend your time. Replace its contents with:

```jsx title=src/App.jsx
export default function App() {
  return <h1>Hello, React!</h1>;
}
```

Save, and the page says hello.

## Note the angle brackets

`render(<App />)` passes an **element**: a description of "render the App component here". Passing the function itself, `render(App)`, doesn't work: React gets a function where it expects something to show. You'll write `<App />`-style elements all the time.

```tip
Building a whole site with routing and server rendering? The React team recommends a framework such as Next.js or React Router. Vite is the simplest way to learn React itself.
```

```exercise
goal: "`render(App)` passes the function itself. Pass an element, `<App />`, instead."
lang: jsx
code: |
  import { createRoot } from "react-dom/client";
  function App() { return <h1>React lab</h1>; }
  const container = document.getElementById("root");
  if (container) createRoot(container).render(App);
checks:
  - match: '\.render\(<App\s+/>\)'
    message: Pass <App /> to render.
hint: "Wrap the name in angle brackets with a slash: `<App />`."
solution: |
  import { createRoot } from "react-dom/client";
  function App() { return <h1>React lab</h1>; }
  const container = document.getElementById("root");
  if (container) createRoot(container).render(<App />);
```

```quiz
question: "What is `npm run dev` for in a Vite project?"
options:
  - "It builds the production files."
  - "It starts a development server that reloads as you edit."
  - "It installs React."
answer: 1
explain: npm run build makes the production version; npm install fetches the dependencies.
```

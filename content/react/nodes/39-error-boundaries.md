---
title: "Error boundaries"
icon: "🛟"
branch: "experience"
requires: ["components", "children", "state"]
summary: "Contain rendering failures and show a useful fallback."
---
**What happens when a component throws?** Say a weather widget in the sidebar of your dashboard reads `forecast.days[0].temp`, and one day the API sends no `days`. The widget throws during rendering.

React's answer, by default: remove **the whole app** from the page. Blank white screen. React reasons that showing broken UI is worse than showing none.

An [[error boundary]] is how you say: "if something in **this** part fails, show a fallback here, and keep the rest running". Like a fuse box: one blown fuse turns off the kitchen, not the house.

## Writing one

Error boundaries are the one thing that still needs a **class component**. You'll likely write one, once, and reuse it:

```jsx title=src/ErrorBoundary.jsx
import { Component } from "react";

export class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    // Log it, or send it to an error-tracking service:
    console.error(error, info.componentStack);
  }

  render() {
    const { fallback, children } = this.props;
    return this.state.failed ? fallback : children;
  }
}
```

- `getDerivedStateFromError` runs when a child throws. The object it returns becomes the new state, which switches `render` to the fallback.
- `componentDidCatch` is for logging.

(Prefer not to write a class? The `react-error-boundary` package gives you a ready-made one.)

## Placing the fuses

```jsx
<Layout>
  <ErrorBoundary fallback={<p>Weather is unavailable right now.</p>}>
    <WeatherWidget />
  </ErrorBoundary>
  <ErrorBoundary fallback={<p>Couldn't load your tasks.</p>}>
    <TaskList />
  </ErrorBoundary>
</Layout>
```

A broken forecast now shows a short message in the sidebar, and the task list works as usual. Also wrap the whole app in one, as a last resort.

## What it doesn't catch

Boundaries catch errors **during rendering** (and in lifecycle code) of the components inside them. They don't catch:

- errors in **event handlers**: use `try`/`catch` there and set an error state,
- errors in async code like a `fetch` callback, unless you store the error in state and throw it during render,
- errors in the boundary itself.

```compare javascript
// The closest plain-JavaScript idea is try/catch around a
// rendering function, but it can't keep the rest of the page alive.
try { renderWidget(); } catch { showFallback(); }
```

```exercise
goal: "`getDerivedStateFromError` returns `failed: false`, so the fallback never shows. Make it switch to the fallback."
lang: jsx
code: |
  import { Component } from "react";
  class Boundary extends Component {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: false }; }
    render() { return this.state.failed ? <p>Unavailable</p> : this.props.children; }
  }
  export default function App() { return <Boundary><h1>Lessons</h1></Boundary>; }
checks:
  - match: 'return\s+\{\s+failed:\s+true\s+\};'
    message: "Return failed: true from getDerivedStateFromError."
hint: The returned object becomes the new state.
solution: |
  import { Component } from "react";
  class Boundary extends Component {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: true }; }
    render() { return this.state.failed ? <p>Unavailable</p> : this.props.children; }
  }
  export default function App() { return <Boundary><h1>Lessons</h1></Boundary>; }
```

```quiz
question: "A click handler inside an error boundary throws. What happens?"
options:
  - The boundary shows its fallback.
  - The boundary doesn't catch it; handle it with try/catch in the handler.
  - React removes the whole app.
answer: 1
explain: Boundaries catch rendering errors. Handler errors don't break rendering, so React leaves them to you.
```

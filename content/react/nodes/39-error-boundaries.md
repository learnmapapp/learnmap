---
title: "Error boundaries"
icon: "🛟"
branch: "experience"
requires: ["components", "children", "state"]
summary: "Contain rendering failures and show a useful fallback."
---

An [[error boundary]] can replace a failed descendant subtree with fallback UI. A small class boundary is still a standard React mechanism:

```jsx
import { Component } from "react";

class Boundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error, info) { console.error(error, info.componentStack); }
  render() {
    return this.state.failed ? <p role="alert">This panel could not load.</p> : this.props.children;
  }
}
export default function App() {
  return <Boundary><h1>Lessons</h1></Boundary>;
}
```

`getDerivedStateFromError` selects fallback state; `componentDidCatch` can report diagnostics. A framework or library may supply a boundary wrapper for you.

## Know its scope

An ordinary error in a click handler still needs explicit handling; a boundary is not a universal catch for every asynchronous failure. Validate data and represent expected failures as ordinary UI states.

Place boundaries around meaningful areas so a failed widget need not remove the whole application. A retry design must actually reset the failed boundary and the underlying cause, not merely hide the fallback text.

```exercise
goal: Switch the boundary into fallback state when a descendant fails.
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
  - match: return\s+\{\s+failed:\s+true\s+\};
    message: "Return failed: true from getDerivedStateFromError."
hint: "Return failed: `true` from getDerivedStateFromError."
```

```quiz
question: "Does an error boundary replace handling an ordinary click-handler failure?"
options:
  - "Yes, it catches every possible failure."
  - "No, event failures still need appropriate handling."
  - "Only when the button is disabled."
answer: 1
explain: "Boundaries contain descendant rendering failures, not every error in application code."
```

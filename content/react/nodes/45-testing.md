---
title: "Testing components"
icon: "🧪"
branch: "quality"
requires: ["props", "conditional-rendering", "accessibility"]
summary: "Assert visible behavior through the interface a user can find."
---

For a Vite learning project, install a test runner, React Testing Library, user-event, and a DOM environment:

```shell
npm install --save-dev vitest @testing-library/react @testing-library/dom @testing-library/user-event jsdom
```

Keep a component and its behavior test in separate files:

```jsx title=Greeting.jsx
export default function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

```jsx title=Greeting.test.jsx
// @vitest-environment jsdom
import { expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Greeting from "./Greeting.jsx";

it("greets the learner", () => {
  try {
    render(<Greeting name="Ada" />);
    expect(screen.getByRole("heading", { name: "Hello, Ada" })).toBeTruthy();
  } finally {
    cleanup();
  }
});
```

Run `npx vitest run` with JSX transformation configured, as the Vite React template provides. The file comment selects jsdom for this test; a shared test configuration can set it globally.

## Test a useful contract

Queries by role and accessible name mirror the interface more closely than private state or internal CSS selectors. Keep tests focused on behavior, such as a visible message or enabled action. DOM-environment tests complement real-browser checks; they do not prove layout or every browser behavior.

```exercise
goal: "Assert the greeting by its heading role and accessible name."
lang: jsx
code: |
  // @vitest-environment jsdom
  import { expect, it } from "vitest";
  import { cleanup, render, screen } from "@testing-library/react";
  function Greeting() { return <h1>Hello, Ada</h1>; }
  it("greets", () => {
    try {
      render(<Greeting />);
      expect(screen.getByRole("button", { name: "Hello, Ada" })).toBeTruthy();
    } finally { cleanup(); }
  });
checks:
  - match: "getByRole\\(\"heading\",\\s+\\{\\s+name:\\s+\"Hello,\\s+Ada\"\\s+\\}\\)"
    message: "The displayed greeting is a heading, so query its heading role."
hint: "The displayed greeting is a heading, so query its heading role."
```

```quiz
question: "What is a robust way to find a visible button in a component test?"
options:
  - "Its private state variable."
  - "Its role and accessible name."
  - "Its source-code line number."
answer: 1
explain: "Role-based queries test the accessible interface rather than implementation details."
```

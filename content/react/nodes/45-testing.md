---
title: "Testing components"
icon: "🧪"
branch: "quality"
requires: ["props", "conditional-rendering", "accessibility"]
summary: "Assert visible behavior through the interface a user can find."
---
The guiding idea of React Testing Library fits in one sentence:

> The more your tests resemble the way your software is used, the more confidence they can give you.

Users don't know about your state, props or class names. They see a heading, a button labelled "Save", a text field called "Email". Good component tests find things **the same way**.

## Setup

In a Vite project, add Vitest, a fake browser DOM, and Testing Library:

```repl shell
> npm install -D vitest jsdom
> npm install -D @testing-library/react @testing-library/user-event
```

Then tell Vitest to use jsdom, by adding a `test` section to `vite.config.js`:

```javascript title=vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom" },
});
```

## A first test

```jsx title=src/Greeting.test.jsx
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import Greeting from "./Greeting";

it("greets the user by name", () => {
  render(<Greeting name="Ada" />);
  const heading = screen.getByRole("heading", { name: "Hello, Ada" });
  expect(heading).toBeTruthy();
});
```

`render` puts the component in the fake DOM. `screen` queries the whole page. Run it with `npx vitest`.

## Choosing a query

Use the first one that works, in this order:

| Query | Finds | Example |
| --- | --- | --- |
| `getByRole` | elements by role and accessible name | `getByRole("button", { name: "Save" })` |
| `getByLabelText` | form fields by their label | `getByLabelText("Email")` |
| `getByText` | text content | `getByText("No tasks yet")` |
| `getByTestId` | a `data-testid` attribute | last resort |

Role queries have a bonus: if `getByRole("button")` can't find your clickable `<div>`, a screen reader can't either. Your test just found an [accessibility](node:accessibility) bug.

## `get`, `query` and `find`

- `getBy...` throws if the element isn't there. Use it for things that should exist.
- `queryBy...` returns `null` instead. Use it to check something is **absent**: `expect(screen.queryByText("Error")).toBeNull()`.
- `findBy...` waits for the element to appear, and returns a promise. Use it after something async.

## What not to test

Internal state values, how many times something rendered, which Hook you used. Those can change in a refactor while the user sees exactly the same thing, and the test would fail for no good reason.

```compare javascript
// Without Testing Library, you'd query the DOM directly:
expect(document.querySelector("h1").textContent).toBe("Hello, Ada");
```

```exercise
goal: "The greeting is an `h1`, but the test looks for a button. Query it by its real role."
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
  - match: 'getByRole\("heading",\s+\{\s+name:\s+"Hello,\s+Ada"\s+\}\)'
    message: "An h1 has the heading role."
hint: h1 to h6 elements all have the same role.
solution: |
  // @vitest-environment jsdom
  import { expect, it } from "vitest";
  import { cleanup, render, screen } from "@testing-library/react";
  function Greeting() { return <h1>Hello, Ada</h1>; }
  it("greets", () => {
    try {
      render(<Greeting />);
      expect(screen.getByRole("heading", { name: "Hello, Ada" })).toBeTruthy();
    } finally { cleanup(); }
  });
```

```quiz
question: "How do you check that an error message is NOT on the page?"
options:
  - "`getByText(\"Error\")` inside a try/catch"
  - "`expect(queryByText(\"Error\")).toBeNull()`"
  - "`findByText(\"Error\")`"
answer: 1
explain: queryBy returns null for missing elements instead of throwing.
```

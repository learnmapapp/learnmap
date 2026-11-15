---
title: "Interaction tests"
icon: "🖱️"
branch: "quality"
requires: ["testing", "controlled-inputs", "updater-functions"]
summary: "Await user events and check the resulting UI instead of counting renders."
---

`user-event` simulates user interactions more faithfully than manually invoking a component's private handler:

```jsx title=Counter.test.jsx
// @vitest-environment jsdom
import { useState } from "react";
import { expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(previous => previous + 1)}>Count: {count}</button>;
}
it("increments after a click", async () => {
  const user = userEvent.setup();
  try {
    render(<Counter />);
    await user.click(screen.getByRole("button", { name: "Count: 0" }));
    expect(screen.getByRole("button", { name: "Count: 1" })).toBeTruthy();
  } finally {
    cleanup();
  }
});
```

Await interactions so React has a chance to process their work. Use `findBy...` queries for asynchronously appearing content, and assertions about what the user can observe.

## Build representative cases

Test typing, submission, validation, and an intended failure path when those behaviors matter. Keep each test independent and clean up rendered DOM. Avoid assertions about the exact number of renders: development checks and scheduling can change those without breaking the user-facing contract.

Mock the external boundary when necessary, rather than replacing the component's own state machinery with a fake implementation.

```exercise
goal: "Wait for the simulated click before checking the new count."
lang: jsx
code: |
  // @vitest-environment jsdom
  import { useState } from "react";
  import { expect, it } from "vitest";
  import { cleanup, render, screen } from "@testing-library/react";
  import userEvent from "@testing-library/user-event";
  function Counter() { const [count, setCount] = useState(0); return <button onClick={() => setCount(previous => previous + 1)}>Count: {count}</button>; }
  it("increments", async () => {
    const user = userEvent.setup();
    try {
      render(<Counter />);
      user.click(screen.getByRole("button", { name: "Count: 0" }));
      expect(screen.getByRole("button", { name: "Count: 1" })).toBeTruthy();
    } finally { cleanup(); }
  });
checks:
  - match: "await\\s+user\\.click\\("
    message: "Await the simulated user interaction."
hint: "Await the simulated user interaction."
```

```quiz
question: "Why await user.click in a component test?"
options:
  - "To allow the interaction and resulting work to settle before asserting."
  - "To freeze React permanently."
  - "To skip event handlers."
answer: 0
explain: "User-event operations are asynchronous, and assertions should observe their completed effects."
```

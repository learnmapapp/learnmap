---
title: "Interaction tests"
icon: "🖱️"
branch: "quality"
requires: ["testing", "controlled-inputs", "updater-functions"]
summary: "Await user events and check the resulting UI instead of counting renders."
---
**A test that lies.** This test for a counter fails, even though the counter works fine in the browser:

```jsx
it("increments", () => {
  const user = userEvent.setup();
  render(<Counter />);
  user.click(screen.getByRole("button", { name: "Count: 0" }));
  const button = screen.getByRole("button", { name: "Count: 1" });
  expect(button).toBeTruthy();
});
```

The error says it can't find a button named "Count: 1". Let's investigate.

**Clue 1:** `user.click` returns a promise. `user-event` simulates a real person: pointer moves, mouse down, focus, mouse up, click. That takes several steps, and they're asynchronous.

**Clue 2:** nobody waited for it. The `expect` runs straight away, while the click is still in progress and the button still says "Count: 0".

**The fix:** make the test `async`, and `await` the interaction:

```jsx
it("increments", async () => {
  const user = userEvent.setup();
  render(<Counter />);
  await user.click(screen.getByRole("button", { name: "Count: 0" }));
  const button = screen.getByRole("button", { name: "Count: 1" });
  expect(button).toBeTruthy();
});
```

Every `user.*` call returns a promise. Always `await` them.

## The interactions you'll use most

```jsx
await user.click(button);
await user.type(screen.getByLabelText("Title"), "Learn tests");
await user.clear(input);
await user.keyboard("{Enter}");
await user.tab();                      // keyboard navigation
await user.selectOptions(select, "Large");
```

## A full user story

```jsx
it("adds a task", async () => {
  const user = userEvent.setup();
  render(<TaskBoard />);

  await user.type(screen.getByLabelText("New task"), "Write tests");
  await user.click(screen.getByRole("button", { name: "Add" }));

  const item = screen.getByRole("listitem");
  expect(item.textContent).toBe("Write tests");
  expect(screen.getByLabelText("New task").value).toBe("");
});
```

Read it out loud: type a task, click Add, see it in the list, and the box is empty again. That's the behaviour a user cares about, and the test would survive a complete rewrite of the component's internals.

## When the result arrives later

If the click starts a fetch, the result appears after a moment. Use a `findBy` query, which waits:

```jsx
await user.click(screen.getByRole("button", { name: "Load" }));
expect(await screen.findByText("Ada Lovelace")).toBeTruthy();
```

```tip
Prefer `userEvent` over the lower-level `fireEvent`. `fireEvent.click` dispatches a single event; a real click also moves focus and fires pointer events, which `userEvent` simulates.
```

```compare javascript
// The equivalent without user-event dispatches one event and checks:
button.click();
expect(button.textContent).toBe("Count: 1");
```

```exercise
goal: "This test checks the result before the click has finished. Await the click."
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
  - match: 'await\s+user\.click\('
    message: "Await the simulated click."
hint: The test function is already async.
solution: |
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
      await user.click(screen.getByRole("button", { name: "Count: 0" }));
      expect(screen.getByRole("button", { name: "Count: 1" })).toBeTruthy();
    } finally { cleanup(); }
  });
```

```quiz
question: "A click triggers a fetch, and the result appears afterwards. Which query should check for it?"
options:
  - "`getByText`, straight after the click."
  - "`await findByText`, which waits for it to appear."
  - "`queryByText`, which returns null if it's missing."
answer: 1
explain: findBy queries retry until the element appears or a timeout passes.
```

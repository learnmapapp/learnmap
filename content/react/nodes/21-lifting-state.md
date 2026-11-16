---
title: "Lifting state"
icon: "⬆️"
branch: "architecture"
requires: ["controlled-inputs", "props"]
summary: "Move shared data to the nearest parent that coordinates its users."
---
**The situation:** a temperature converter. Two inputs, one for Celsius and one for Fahrenheit. Type in either, and the other updates.

**First attempt:** each input is its own component with its own state.

```jsx
function TemperatureInput({ label }) {
  const [value, setValue] = useState("");
  return (
    <label>
      {label}
      <input value={value} onChange={e => setValue(e.target.value)} />
    </label>
  );
}

export default function Converter() {
  return (
    <>
      <TemperatureInput label="°C" />
      <TemperatureInput label="°F" />
    </>
  );
}
```

Each one works, but they can't see each other. State is private to the component that owns it, and **siblings can't read each other's state**.

**The fix:** move the state **up** to their closest common parent, and pass it down as props. That's called lifting state up.

```jsx
function TemperatureInput({ label, value, onChange }) {
  return (
    <label>
      {label}
      <input value={value} onChange={e => onChange(e.target.value)} />
    </label>
  );
}

export default function Converter() {
  const [celsius, setCelsius] = useState("");
  const fahrenheit =
    celsius === "" ? "" : String((Number(celsius) * 9) / 5 + 32);

  return (
    <>
      <TemperatureInput
        label="°C"
        value={celsius}
        onChange={setCelsius}
      />
      <TemperatureInput
        label="°F"
        value={fahrenheit}
        onChange={f => setCelsius(String((Number(f) - 32) * 5 / 9))}
      />
    </>
  );
}
```

Notice what changed in `TemperatureInput`: no `useState` at all. It shows the `value` it's given and reports changes through `onChange`. The parent is the single [[source of truth]], and both inputs simply display it. (And Fahrenheit isn't stored at all; it's calculated. More on that [next](node:derived-state).)

## How to decide where state lives

1. List every component that **reads or changes** the value.
2. Find their closest common parent.
3. Put the state there, or higher if needed.

Lifting too high has a cost: more props to pass, and more components re-rendering. When many distant components need the same thing, [context](node:context) helps.

```compare javascript
// Without React you'd sync them by hand, in both directions:
celsiusInput.oninput = () => {
  fahrenheitInput.value = toF(celsiusInput.value);
};
```

```exercise
goal: "`Field` displays a fixed string, so typing does nothing visible. Give it the parent's `name` state as its value."
lang: jsx
code: |
  import { useState } from "react";
  function Field({ value, onChange }) {
    return <input aria-label="Name" value={value} onChange={event => onChange(event.target.value)} />;
  }
  export default function App() {
    const [name, setName] = useState("Ada");
    return <><Field value="Fixed" onChange={setName} /><p>{name}</p></>;
  }
checks:
  - match: 'value=\{name\}\s+onChange=\{setName\}'
    message: "Pass name as the value prop."
hint: Replace the string with the state variable, in braces.
solution: |
  import { useState } from "react";
  function Field({ value, onChange }) {
    return <input aria-label="Name" value={value} onChange={event => onChange(event.target.value)} />;
  }
  export default function App() {
    const [name, setName] = useState("Ada");
    return <><Field value={name} onChange={setName} /><p>{name}</p></>;
  }
```

```quiz
question: "Two sibling components need the same changing value. Where should its state live?"
options:
  - In both siblings, kept in sync with an effect.
  - In their closest common parent, passed down as props.
  - In a global variable.
answer: 1
explain: One owner, shared through props, means one source of truth.
```

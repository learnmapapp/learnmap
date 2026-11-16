---
title: "Form validation"
icon: "🛂"
branch: "forms"
requires: ["forms", "conditional-rendering"]
summary: "Connect useful feedback to a field and validate again at the real boundary."
---
Good validation feels like a helpful colleague; bad validation feels like a bouncer. Here's a checklist for the helpful kind, built around a sign-up field.

```jsx
export default function UsernameField() {
  const [username, setUsername] = useState("");
  const [touched, setTouched] = useState(false);

  const error =
    username.length < 3 ? "Use at least 3 characters." :
    /\s/.test(username) ? "Spaces aren't allowed." :
    null;
  const showError = touched && error !== null;

  return (
    <div>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        onBlur={() => setTouched(true)}
        aria-invalid={showError}
        aria-describedby={showError ? "username-error" : undefined}
      />
      {showError && <p id="username-error">{error}</p>}
    </div>
  );
}
```

## ☑️ Compute the error; don't store it

`error` is calculated from `username` on every render. There's no separate error state that could get out of sync with the text. (More on this idea in [derived values](node:derived-state).)

## ☑️ Don't shout before they've started

Showing "too short" after the first keystroke is annoying. The `touched` flag waits until the user leaves the field (`onBlur`). Also show all errors when they try to submit.

## ☑️ Say how to fix it

"Invalid username" is a bouncer. "Use at least 3 characters" is a colleague.

## ☑️ Connect the message to the field

Screen readers don't see that a red paragraph sits near an input. Two attributes link them:

- `aria-invalid` announces that the field has a problem.
- `aria-describedby="username-error"` points at the **id** of the message, so it's read out with the field.

The id must match exactly, or the link silently does nothing.

## ☑️ Use the browser's built-ins too

`required`, `type="email"`, `minLength` and `pattern` give you validation for free, and keyboard users and password managers understand them.

## ☑️ Validate again on the server

Anything in the browser can be bypassed with developer tools or a direct request. Client-side validation is for a pleasant experience; the server's check is the one that keeps your data safe.

```compare javascript
// The browser's own API, without React:
input.setCustomValidity("Use at least 3 characters.");
input.reportValidity();
```

```exercise
goal: "`aria-describedby` points at an id that doesn't exist. Point it at the error message's id."
lang: jsx
code: |
  export default function Field() {
    return (
      <>
        <label htmlFor="name">Name</label>
        <input id="name" aria-invalid={true} aria-describedby="other-error" />
        <p id="name-error">Enter a name.</p>
      </>
    );
  }
checks:
  - match: 'aria-describedby="name-error"'
    message: "Use the id of the actual error element."
hint: Look at the id on the paragraph.
solution: |
  export default function Field() {
    return (
      <>
        <label htmlFor="name">Name</label>
        <input id="name" aria-invalid={true} aria-describedby="name-error" />
        <p id="name-error">Enter a name.</p>
      </>
    );
  }
```

```quiz
question: "Why validate on the server when the form already validates in the browser?"
options:
  - Browsers sometimes skip JavaScript validation by accident.
  - Anyone can bypass browser checks, so only the server's check protects your data.
  - Server validation is faster.
answer: 1
explain: Browser validation improves the experience. It isn't a security boundary.
```

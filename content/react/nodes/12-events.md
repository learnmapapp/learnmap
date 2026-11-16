---
title: "Event handlers"
icon: "🖱️"
branch: "interaction"
requires: ["props"]
summary: "Pass functions so work runs when the user acts."
---
To respond to the user, pass a **function** to an event prop like `onClick`. React calls it when the event happens:

```jsx
export default function LikeButton() {
  function handleClick() {
    console.log("Liked!");
  }

  return <button onClick={handleClick}>👍 Like</button>;
}
```

The convention is `on<Event>` for the prop and `handle<Event>` for the function: `onSubmit`, `handleSubmit`. Other common events: `onChange`, `onSubmit`, `onKeyDown`, `onFocus`, `onMouseEnter`.

## The bug that fires immediately

Spot the difference:

```jsx
<button onClick={handleClick}>Like</button>    // ✅ passes the function
<button onClick={handleClick()}>Like</button>  // ❌ calls it now
```

The second version **calls** `handleClick` while rendering, and passes its result (`undefined`) as the handler. You see "Liked!" in the console on page load, and clicking does nothing.

To pass an argument, wrap the call in an arrow function, so it runs later:

```jsx
<button onClick={() => like(post.id)}>Like</button>
```

## The event object

Handlers receive an event object, similar to the browser's own:

```jsx
function handleKeyDown(event) {
  if (event.key === "Enter") search();
}

<input onKeyDown={handleKeyDown} />
```

## Passing handlers down

A child component can't change its parent's data, but it can **tell** the parent something happened, by calling a function the parent passed in:

```jsx
function DeleteButton({ onDelete }) {
  return <button onClick={onDelete}>Delete</button>;
}

function Comment({ comment, removeComment }) {
  return (
    <article>
      <p>{comment.text}</p>
      <DeleteButton onDelete={() => removeComment(comment.id)} />
    </article>
  );
}
```

This is how data flows back up the tree. You'll use it constantly.

```compare javascript
// The same thing in plain JavaScript:
button.addEventListener("click", handleClick);
```

```exercise
goal: "`handleClick()` runs during rendering instead of on click. Pass the function itself."
lang: jsx
code: |
  export default function SaveButton() {
    function handleClick() { console.log("saved"); }
    return <button onClick={handleClick()}>Save</button>;
  }
checks:
  - match: 'onClick=\{handleClick\}'
    message: Pass handleClick rather than handleClick().
hint: Remove the parentheses.
solution: |
  export default function SaveButton() {
    function handleClick() { console.log("saved"); }
    return <button onClick={handleClick}>Save</button>;
  }
```

```quiz
question: "How do you pass an argument to a click handler, so it runs on click?"
options:
  - "`onClick={remove(id)}`"
  - "`onClick={() => remove(id)}`"
  - "`onClick=\"remove(id)\"`"
answer: 1
explain: The arrow function is the handler. It calls remove(id) when the click happens.
```

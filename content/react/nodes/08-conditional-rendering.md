---
title: "Conditional UI"
icon: "🚦"
branch: "rendering"
requires: ["expressions", "props"]
summary: "Choose markup with ordinary JavaScript conditions."
---
There's no special template syntax for "if" in React. You use JavaScript. Here are four patterns, from the most flexible to the most compact. Pick the one that reads best for the situation.

## Pattern 1: `if` with an early return

For "show something completely different":

```jsx
function Inbox({ messages }) {
  if (messages.length === 0) {
    return <p>All caught up! ☕</p>;
  }
  return <MessageList messages={messages} />;
}
```

## Pattern 2: ternary, for "this or that"

```jsx
<button>{isFollowing ? "Unfollow" : "Follow"}</button>
```

## Pattern 3: `&&`, for "this or nothing"

```jsx
{isAdmin && <DeleteButton />}
```

If `isAdmin` is `false`, the expression is `false`, which renders nothing.

## Pattern 4: a variable, for longer logic

```jsx
let banner = null;
if (isOffline) banner = <OfflineBanner />;
else if (hasUpdate) banner = <UpdateBanner />;

return <main>{banner}<Feed /></main>;
```

## The `0` trap

There's one bug everyone hits with pattern 3:

```jsx
<div>{count && <span>{count} new</span>}</div>
```

When `count` is 0, the page shows a lonely **0**. Why? `0 && anything` is `0`, and React renders numbers, unlike `false`. Make the left side a real boolean:

```jsx
<div>{count > 0 && <span>{count} new</span>}</div>
```

Same with strings: `{name && ...}` is safe for an empty string `""` (renders nothing), but the habit of writing a real comparison avoids surprises.

## Hiding instead of removing

Patterns 1 to 4 remove the element from the page entirely. That also resets anything stored inside it, like the text in an input. Usually that's what you want. If you only need to hide something, the `hidden` attribute or a CSS class keeps it around.

```compare javascript
// Without React: toggle visibility by hand, and keep it updated.
el.hidden = messages.length === 0;
```

```exercise
goal: "When `count` is 0, this shows a stray 0. Make the condition a real boolean, so nothing shows."
lang: jsx
code: |
  export default function Badge({ count = 0 }) {
    return <div>{count && <span>{count} new</span>}</div>;
  }
checks:
  - match: 'count\s+>\s+0\s+\&\&'
    message: "Use count > 0 as the condition."
hint: Compare count with 0.
solution: |
  export default function Badge({ count = 0 }) {
    return <div>{count > 0 && <span>{count} new</span>}</div>;
  }
```

```quiz
question: "What does `{items.length && <List />}` show when the array is empty?"
options:
  - Nothing.
  - "The number 0."
  - An empty list.
answer: 1
explain: 0 && ... is 0, and React renders numbers. Use items.length > 0 instead.
```

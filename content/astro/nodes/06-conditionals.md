---
title: Show or hide markup
icon: "🔀"
branch: basics
requires: [expressions]
summary: Use &&, the ternary operator and early variables to render markup conditionally.
---
**Bug hunt.** This banner should only appear when there are unread messages. Can you spot the two problems before reading on?

```astro title=src/components/Inbox.astro
---
const unread = 0;
const user = null;
---
{unread && <p class="badge">{unread} new messages</p>}
<p>Welcome back, {user.name}!</p>
```

**Problem 1: the stray zero.** With `unread = 0`, the page shows a lonely `0`. The `&&` operator returns its left side when that side is falsy, and `0` is a number Astro happily renders. Compare it with a boolean:

```astro
{unread > 0 && <p class="badge">{unread} new messages</p>}
```

Now the left side is `false`, which renders nothing. Rule of thumb: put a real boolean before `&&`.

**Problem 2: the crash.** `user` is `null`, so `user.name` throws during the build, and the build fails. Choose between two branches with the ternary operator `? :`:

```astro
{user ? <p>Welcome back, {user.name}!</p> : <a href="/login">Log in</a>}
```

**The fixed component:**

```astro title=src/components/Inbox.astro
---
const unread = 0;
const user = null;
---
{unread > 0 && <p class="badge">{unread} new messages</p>}
{user ? <p>Welcome back, {user.name}!</p> : <a href="/login">Log in</a>}
```

**What renders as nothing?** `false`, `null` and `undefined` all disappear. Numbers (including `0`) and strings (including `""`, which is just empty) are rendered.

**More than two cases?** Nested ternaries get unreadable fast. Work out the answer in the frontmatter instead:

```astro
---
const stock = 3;
let label;
if (stock === 0) label = "Sold out";
else if (stock < 5) label = "Almost gone";
else label = "In stock";
---
<p>{label}</p>
```

Remember, the frontmatter is just JavaScript, so `if`, `switch` and helper functions are all available there.

```compare javascript
// The same operators, with the same 0 trap:
const html = unread && `<p>${unread} new</p>`; // 0 when unread is 0
```

```compare typescript
// React JSX has exactly the same pitfall with {count && <Badge />}.
```

```compare python
# Jinja: {% if unread > 0 %}<p>{{ unread }} new</p>{% endif %}
```

```exercise
goal: "The page shows a stray `0` when the cart is empty. Change the condition so it's a boolean: `items > 0`."
code: |-
  ---
  const items = 0;
  ---
  {items && <a href="/checkout">Check out ({items})</a>}
checks:
  - match: '\{\s*items\s*>\s*0\s*&&'
    message: 'Start the expression with items > 0 &&'
solution: |-
  ---
  const items = 0;
  ---
  {items > 0 && <a href="/checkout">Check out ({items})</a>}
```

```quiz
question: "`const name = \"\"`. What does `{name || \"Anonymous\"}` render?"
options:
  - Nothing.
  - Anonymous
  - "\"\""
answer: 1
explain: An empty string is falsy, so || falls back to the right side.
```

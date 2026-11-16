---
title: Template expressions
icon: "🧮"
branch: basics
requires: [frontmatter]
summary: Curly braces insert values, set attributes and run small JavaScript expressions in the template.
---
**Predict the HTML.** Given this component, what does the browser receive? Write down your guess for each line.

```astro title=src/pages/profile.astro
---
const user = { name: "Ada", tasks: 3, site: "https://ada.dev" };
const bio = "<b>Engineer</b>";
---
<h1>{user.name.toUpperCase()}</h1>
<p>{user.tasks} tasks, {user.tasks * 25} minutes</p>
<a href={user.site}>Website</a>
<a href={`/users/${user.name}`}>Profile</a>
<p>{bio}</p>
```

**The answer:**

```html
<h1>ADA</h1>
<p>3 tasks, 75 minutes</p>
<a href="https://ada.dev">Website</a>
<a href="/users/Ada">Profile</a>
<p>&lt;b&gt;Engineer&lt;/b&gt;</p>
```

**What each line taught us:**

- **`{...}` takes any JavaScript expression**, such as a method call or arithmetic. Not statements: no `if` or `for` inside the braces. (You'll see how to do [conditions](node:conditionals) and [lists](node:lists) with expressions.)
- **Attributes use braces without quotes**: `href={user.site}`. Writing `href="{user.site}"` would give you the literal text `{user.site}`.
- **Template literals** build an attribute from pieces: ``href={`/users/${user.name}`}``.
- **Strings are escaped.** The `<b>` in `bio` arrives as text, not as bold. That protects you from accidentally injecting HTML, for example from user input.

**When you do want raw HTML**, such as from a Markdown renderer you trust, use the `set:html` directive:

```astro
<p set:html={bio} />
```

Now it renders as **Engineer** in bold. Only use it with HTML you trust.

**A shorthand:** when the attribute name and the variable name match, `{href}` is enough. These two are the same:

```astro
<a href={href}>Home</a>
<a {href}>Home</a>
```

```compare javascript
// A template literal does similar substitution, without the escaping:
const html = `<h1>${user.name.toUpperCase()}</h1>`;
```

```compare typescript
// JSX in React uses the same braces: <a href={user.site}>Website</a>
```

```compare python
# Jinja: <a href="{{ user.site }}">Website</a>  (also escapes by
# default)
```

```exercise
goal: "The link points to the literal text `{url}`. Remove the quotes around the braces so the attribute uses the variable."
code: |-
  ---
  const url = "https://docs.astro.build";
  ---
  <a href="{url}">Astro docs</a>
checks:
  - match: '<a href=\{\s*url\s*\}>'
    message: 'Write href={url} without quotes.'
solution: |-
  ---
  const url = "https://docs.astro.build";
  ---
  <a href={url}>Astro docs</a>
```

```quiz
question: "`const note = \"<i>hi</i>\"`. What does `<p>{note}</p>` show in the browser?"
options:
  - "hi, in italics."
  - "The text <i>hi</i>, with the tags visible."
  - Nothing; HTML strings are removed.
answer: 1
explain: Expressions are escaped. Use set:html to insert trusted HTML.
```

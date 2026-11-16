---
title: Cookies
icon: "🍪"
branch: server
requires: [server-rendering]
summary: Read and set cookies with Astro.cookies to remember a visitor between requests.
---
**A cheat sheet for `Astro.cookies`.** It works in on-demand pages, endpoints and middleware (as `context.cookies`).

**Read**

```javascript
const theme = Astro.cookies.get("theme")?.value ?? "light";
const exists = Astro.cookies.has("theme");
```

`get` returns `undefined` if the cookie isn't there, hence the `?.value` and a default.

**Write**

```javascript
Astro.cookies.set("theme", "dark", {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  httpOnly: true,
  secure: true,
  sameSite: "lax",
});
```

**Delete**

```javascript
Astro.cookies.delete("theme", { path: "/" });
```

**The options, decoded:**

| Option | Means |
| --- | --- |
| `path: "/"` | sent with requests to every page, not just this folder |
| `maxAge` | lifetime in seconds; without it, the cookie dies when the browser closes |
| `httpOnly` | browser JavaScript can't read it, which protects session ids from injected scripts |
| `secure` | only sent over HTTPS |
| `sameSite: "lax"` | not sent along with most cross-site requests, which blocks many forged-request attacks |

**Put together:** a theme switcher that remembers the choice:

```astro title=src/pages/settings.astro
---
export const prerender = false;

const choice = Astro.url.searchParams.get("theme");
if (choice === "light" || choice === "dark") {
  Astro.cookies.set("theme", choice, { path: "/", maxAge: 31536000 });
}
const theme = Astro.cookies.get("theme")?.value ?? "light";
---
<body class={theme}>
  <p>Current theme: {theme}</p>
  <a href="?theme=light">Light</a> <a href="?theme=dark">Dark</a>
</body>
```

**Gotchas:**

- **Only on demand.** A prerendered page was rendered at build time, with no visitor and no cookies. Add `export const prerender = false`.
- **Set before the response starts.** Set cookies in the frontmatter or middleware, not from inside a child component after the page has started streaming.
- **Never trust a cookie's contents.** Visitors can edit them. Store a random session id and look up the data on the server, rather than storing `isAdmin=true`.

```compare javascript
// Express: req.cookies.theme and res.cookie("theme", "dark", {
// httpOnly: true })
```

```compare typescript
// Next.js: cookies().get("theme") and cookies().set(...) in server
// code.
```

```compare python
# Flask: request.cookies.get("theme") and response.set_cookie("theme",
# "dark")
```

```exercise
goal: "Remember the visitor's language: set a cookie named `lang` to `\"nl\"`, with `path: \"/\"`."
code: |-
  ---
  export const prerender = false;
  ---
  <p>Taal ingesteld op Nederlands.</p>
checks:
  - match: 'Astro\.cookies\.set\(\s*"lang"\s*,\s*"nl"\s*,\s*\{\s*path:\s*"/"\s*\}\s*\)'
    message: 'Write Astro.cookies.set("lang", "nl", { path: "/" });'
solution: |-
  ---
  export const prerender = false;
  Astro.cookies.set("lang", "nl", { path: "/" });
  ---
  <p>Taal ingesteld op Nederlands.</p>
```

```quiz
question: "Why does reading a cookie in a prerendered page always give the default value?"
options:
  - Cookies are disabled in Astro by default.
  - The page was rendered at build time, when there was no visitor and no cookies.
  - You need the httpOnly option.
answer: 1
explain: Cookies arrive with requests. Only on-demand pages see each request.
```

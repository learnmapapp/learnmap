---
title: Fetch data
icon: "🌦️"
branch: server
requires: [frontmatter]
summary: Call an API with fetch in the frontmatter, and know when that call actually happens.
---
**Spot the difference.** Two pages show the same weather forecast. Both use top-level `await fetch` in the frontmatter:

```astro title=src/pages/weather.astro
---
const url = "https://api.example.com/forecast?city=utrecht";
const response = await fetch(url);
if (!response.ok) throw new Error(`Forecast failed: ${response.status}`);
const forecast = await response.json();
---
<h1>Utrecht</h1>
<p>{forecast.summary}, {forecast.high}°C</p>
```

```astro title=src/pages/weather-live.astro
---
export const prerender = false;
const url = "https://api.example.com/forecast?city=utrecht";
const response = await fetch(url);
const forecast = await response.json();
---
<h1>Utrecht</h1>
<p>{forecast.summary}, {forecast.high}°C</p>
```

One line differs: `export const prerender = false`. The behavior differs a lot:

| | `weather.astro` | `weather-live.astro` |
| --- | --- | --- |
| `fetch` runs | once, during `npm run build` | on every request |
| Forecast is | frozen at build time | always fresh |
| Speed for the visitor | instant, a static file | waits for the API each time |
| API calls | one per build | one per visitor |
| Needs a server | no | yes, see [server rendering](node:server-rendering) |

**Neither is wrong.** A list of products that changes weekly? Fetch at build time and rebuild when it changes. Live stock levels or the weather? Render on demand.

**Things that work the same in both:**

- **`fetch` is the standard one** you know from browsers, available on the server too.
- **Secrets are safe.** An API key in the headers stays on the server; visitors only get the HTML.
- **Handle failures.** Check `response.ok`. At build time a thrown error stops the build, which is often what you want. When rendering on demand, show a friendly message instead of crashing.

**Data that isn't from an API?** Import it. `import products from "../data/products.json"` works at build time with no fetch at all.

**Need the same data in many places?** For lots of entries, a [content collection](node:collections) with a custom loader caches it across builds.

```compare javascript
// In the browser you'd fetch in a script after the page loads and show
// a spinner meanwhile.
```

```compare typescript
// Next.js server components: await fetch(...) inside the component,
// with caching options.
```

```compare python
# Django view: requests.get(...) before render(), on every request.
```

```exercise
goal: "Load the quote from the API: `await fetch(url)`, then `await response.json()`, storing the result in `quote`."
code: |-
  ---
  const url = "https://api.example.com/quote";
  const quote = { text: "" };
  ---
  <blockquote>{quote.text}</blockquote>
checks:
  - match: 'const\s+response\s*=\s*await\s+fetch\(\s*url\s*\)'
    message: Add const response = await fetch(url);
  - match: 'const\s+quote\s*=\s*await\s+response\.json\(\)'
    message: 'Set const quote = await response.json();'
solution: |-
  ---
  const url = "https://api.example.com/quote";
  const response = await fetch(url);
  const quote = await response.json();
  ---
  <blockquote>{quote.text}</blockquote>
```

```quiz
question: "On a static site, when does a `fetch` in the frontmatter run?"
options:
  - Every time a visitor opens the page.
  - Once, at build time.
  - In the visitor's browser.
answer: 1
explain: Static pages are rendered during the build; the result is saved as HTML.
```

---
title: Client-side scripts
icon: "🖱️"
branch: islands
requires: [frontmatter]
summary: A script tag in a component runs in the browser, and Astro bundles and deduplicates it.
---
**Two places for code, side by side.** The same component, with code at the top and at the bottom:

```astro title=src/components/CopyButton.astro
---
// 1. Frontmatter: runs at build time, on the server.
const label = "Copy link";
---
<button class="copy">{label}</button>

<script>
  // 2. Script: runs in the visitor's browser.
  const buttons = document.querySelectorAll("button.copy");
  for (const button of buttons) {
    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(location.href);
      button.textContent = "Copied!";
    });
  }
</script>
```

| | Frontmatter `---` | `<script>` |
| --- | --- | --- |
| Runs | at build time (or per request) | in the browser |
| Can use | files, secrets, `await fetch` at build time | `document`, `window`, events, clipboard |
| Reaches the visitor | only as HTML output | as a JavaScript file |

**What Astro does with a `<script>` tag:**

- **Bundles it.** You can write TypeScript and use `import` from npm packages; Astro compiles it to a JavaScript module.
- **Includes it once.** Put `<CopyButton />` on a page ten times and the script is still loaded once. That's why the example uses `querySelectorAll` and loops: one script handles every button.
- **Defers it**, as a module script, so the HTML is parsed first.

**Passing a frontmatter value to the browser.** The script can't see frontmatter variables, because they're gone by the time the browser runs. Put the value in the HTML as a `data-` attribute instead:

```astro
---
const message = "Copied!";
---
<button class="copy" data-message={message}>Copy link</button>
<script>
  const buttons = document.querySelectorAll<HTMLButtonElement>(".copy");
  for (const button of buttons) {
    button.addEventListener("click", () => {
      button.textContent = button.dataset.message ?? "Done";
    });
  }
</script>
```

**Opting out of processing.** `<script is:inline>` is left exactly as written: no bundling or TypeScript, and it's repeated each time the component is used. Use it for snippets that must run as-is, like an analytics tag.

For components with more state and markup, a [custom element](node:custom-elements) or a [framework island](node:hydration) keeps things tidier.

```compare javascript
// In a plain HTML page you'd add <script type="module" src="copy.js">
// yourself.
```

```compare typescript
// In React, this would be an onClick handler, plus React itself
// shipped to the browser.
```

```compare python
# Like a Jinja template with an inline <script>:
# the template runs on the server, the script in the browser.
```

```exercise
goal: "Make the button do something in the browser: add a `<script>` that finds `#greet` and calls `addEventListener(\"click\", ...)` on it."
code: |-
  <button id="greet">Say hi</button>
checks:
  - match: '<script>[\s\S]*document\.(querySelector\(\s*"#greet"\s*\)|getElementById\(\s*"greet"\s*\))[\s\S]*addEventListener\(\s*"click"[\s\S]*</script>'
    message: 'Add a <script> that selects #greet and listens for "click".'
solution: |-
  <button id="greet">Say hi</button>

  <script>
    const button = document.querySelector("#greet");
    button?.addEventListener("click", () => {
      button.textContent = "Hi!";
    });
  </script>
```

```quiz
question: "A component with a `<script>` appears five times on a page. How many times does its script load?"
options:
  - Five times.
  - Once.
  - Never; scripts need is:inline.
answer: 1
explain: Processed scripts are bundled and deduplicated, so write them to handle every instance.
```

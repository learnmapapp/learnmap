---
title: Server islands
icon: "🛰️"
branch: islands
requires: [components]
summary: server:defer renders a slow or personalized component separately, so the rest of the page can be cached and served fast.
---
**A design walkthrough.** A product page that's the same for everyone, except one corner: "Hi Sam, 3 items in your cart."

**Option A: render the whole page per request.** Correct, but now nothing can be cached. Every visitor waits for the cart lookup before seeing anything.

**Option B: a client island fetching the cart.** Works, but ships JavaScript and an API just to show a line of text.

**Option C: a server island.** Mark that one component with `server:defer`:

```astro title=src/pages/products/kettle.astro
---
import CartSummary from "../../components/CartSummary.astro";
---
<h1>Copper kettle</h1>
<p>€49. Boils in two minutes.</p>

<CartSummary server:defer>
  <p slot="fallback">Loading your cart…</p>
</CartSummary>
```

```astro title=src/components/CartSummary.astro
---
const session = Astro.cookies.get("session")?.value;
const cart = session ? await loadCart(session) : null;
---
{cart
  ? <p>Hi {cart.name}, {cart.items} items in your cart.</p>
  : <a href="/login">Log in</a>}
```

**How it plays out:**

1. The page, minus the cart, is served straight away. It can be static, or cached on a CDN for everyone.
2. In the cart's place, the visitor briefly sees the fallback: "Loading your cart…".
3. A tiny script asks the server to render just `CartSummary`, with this visitor's cookies.
4. The returned HTML replaces the fallback. No framework is shipped, and the component is still a plain `.astro` file.

**Rules of thumb:**

- **Needs a server.** Server islands are rendered on demand, so the project needs an [[adapter]] (see [server rendering](node:server-rendering)). The surrounding page can still be prerendered.
- **Props must be serializable**, because they're sent along with the request for the island. Keep them small and non-secret, like an id.
- **Always give a fallback**, sized like the real content, so the page doesn't jump.

**Server islands vs client islands:**

| | `server:defer` | `client:*` |
| --- | --- | --- |
| Renders | on the server, later | in the browser |
| Ships a UI framework | no | yes |
| Good for | personalized or slow data | interactivity |

```compare javascript
// Like fetching an HTML fragment and setting innerHTML, done for you.
```

```compare typescript
// Next.js: Partial Prerendering with <Suspense> around a dynamic
// component.
```

```compare python
# Like the htmx pattern hx-get="/fragment/cart" hx-trigger="load".
```

```exercise
goal: "Defer the slow weather widget: add `server:defer` to the component, and a fallback paragraph `<p slot=\"fallback\">Checking the sky…</p>` inside it."
code: |-
  ---
  import Weather from "../components/Weather.astro";
  ---
  <Weather city="Utrecht" />
checks:
  - match: '<Weather\s+city="Utrecht"\s+server:defer\s*>'
    message: 'Write <Weather city="Utrecht" server:defer> with an opening and closing tag.'
  - match: '<p slot="fallback">Checking the sky…</p>\s*</Weather>'
    message: 'Put <p slot="fallback">Checking the sky…</p> inside, then close with </Weather>.'
solution: |-
  ---
  import Weather from "../components/Weather.astro";
  ---
  <Weather city="Utrecht" server:defer>
    <p slot="fallback">Checking the sky…</p>
  </Weather>
```

```quiz
question: "What does the visitor see in a server island's place while it's still being rendered?"
options:
  - Nothing.
  - The content of its fallback slot.
  - The island's static build output.
answer: 1
explain: The fallback is part of the main page and is swapped out when the island arrives.
```

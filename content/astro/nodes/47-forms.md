---
title: Handle a form
icon: "📮"
branch: server
requires: [server-rendering]
summary: Receive a form post in the same page that shows the form, validate it, and redirect after success.
---
**Follow one form submission** from click to confirmation. The page:

```astro title=src/pages/subscribe.astro
---
export const prerender = false;

let error = "";
if (Astro.request.method === "POST") {
  const data = await Astro.request.formData();
  const email = data.get("email");

  if (typeof email !== "string" || !email.includes("@")) {
    error = "Please enter a valid email address.";
  } else {
    await addSubscriber(email);
    return Astro.redirect("/subscribe/thanks");
  }
}
---
<form method="post">
  <label>Email <input type="email" name="email" required /></label>
  <button>Subscribe</button>
</form>
{error && <p role="alert">{error}</p>}
```

**Stop 1: the first visit.** A `GET` request. The `if` is skipped, and the visitor sees the empty form.

**Stop 2: the submission.** The browser sends a `POST` to the *same* URL, because the form has no `action` attribute. The body holds `email=sam@example.com`, keyed by the input's `name`.

**Stop 3: reading the data.** `Astro.request` is a standard `Request`, so `await Astro.request.formData()` parses the body. `data.get("email")` returns the value, or `null` if the field was missing.

**Stop 4a: invalid input.** The page renders again, now with the error message. The `required` and `type="email"` attributes catch most mistakes in the browser, but **always validate on the server too**: anyone can send a request without your form.

**Stop 4b: success.** Save the subscriber, then `return Astro.redirect(...)`. Redirecting after a successful post, called *Post/Redirect/Get*, means refreshing the thanks page doesn't submit the form a second time.

**Why this needs server rendering:** a prerendered page can't receive a POST. Hence `prerender = false` at the top.

**Accessibility touches:** each `<input>` has a `<label>`, and the error uses `role="alert"`, so screen readers announce it.

**Next level:** for many forms or more complex validation, [actions](node:actions) give you typed, validated handlers with less code.

```compare javascript
// Express: app.post("/subscribe", express.urlencoded(), handler),
// where the handler validates req.body.email and calls res.redirect().
```

```compare typescript
// Remix: an action function in the same route module, with a very
// similar flow.
```

```compare python
# Flask: if request.method == "POST": email = request.form["email"]
```

```exercise
goal: "Only handle submissions: wrap the form-reading code in `if (Astro.request.method === \"POST\") { ... }`."
code: |-
  ---
  export const prerender = false;
  let name = "";
  const data = await Astro.request.formData();
  name = String(data.get("name") ?? "");
  ---
  <form method="post"><input name="name" /><button>Send</button></form>
  <p>{name}</p>
checks:
  - match: 'if\s*\(\s*Astro\.request\.method\s*===\s*"POST"\s*\)\s*\{\s*\n?\s*const\s+data\s*=\s*await\s+Astro\.request\.formData\(\)'
    message: 'Put the formData code inside if (Astro.request.method === "POST") { ... }'
solution: |-
  ---
  export const prerender = false;
  let name = "";
  if (Astro.request.method === "POST") {
    const data = await Astro.request.formData();
    name = String(data.get("name") ?? "");
  }
  ---
  <form method="post"><input name="name" /><button>Send</button></form>
  <p>{name}</p>
```

```quiz
question: "Why redirect after a successful form post instead of rendering a thank-you message directly?"
options:
  - Astro requires it.
  - So that refreshing the page doesn't resubmit the form.
  - Redirects are faster.
answer: 1
explain: After a redirect, the browser's current page is a GET, which is safe to reload.
```

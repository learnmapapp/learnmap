---
title: Cookie preferences
icon: "🍪"
branch: server
requires: [state]
summary: useCookie reads and writes a cookie as a ref, on the server and in the browser.
---
**Cheat sheet: cookies in Nuxt.** A cookie is a small value the browser sends with every request to your site. That makes it ideal for preferences the *server* needs to know when it renders, such as a theme. Here's which tool to use where:

| Where you are | Read | Write |
| --- | --- | --- |
| Component or composable | `useCookie('theme')` | assign to its `.value` |
| Server route in `server/` | `getCookie(event, 'theme')` | `setCookie(event, 'theme', 'dark')` |
| Remove it (component) | | set `.value = null` |
| Remove it (server) | | `deleteCookie(event, 'theme')` |

**A theme switch that doesn't flash:**

```vue title=app/components/ThemeToggle.vue
<script setup lang="ts">
const theme = useCookie<'light' | 'dark'>('theme', {
  default: () => 'light',
  maxAge: 60 * 60 * 24 * 365,
});

useHead({ htmlAttrs: { class: theme } });
</script>

<template>
  <button @click="theme = theme === 'light' ? 'dark' : 'light'">
    Switch to {{ theme === 'light' ? 'dark' : 'light' }}
  </button>
</template>
```

`useCookie` returns a ref. Read it, assign to it, and the cookie follows. The trick is that during server rendering, `useCookie` reads the cookie **from the request**. So the server already renders `<html class="dark">`, and dark-mode users never see a white flash.

Compare `localStorage`: it only exists in the browser, so the server would render light and the page would switch after loading.

**Useful options:**

- `default`: the value when no cookie is set.
- `maxAge`: lifetime in seconds. Without it, the cookie ends with the browser session.
- `sameSite`, `secure`: send the cookie only in safe situations.
- `httpOnly`: hides the cookie from browser JavaScript. That's essential for session tokens, so only set those from the server with `setCookie`.

```warn
Cookies travel with *every* request, and users can edit them. Keep them small, and never trust a cookie value for authorization without checking it on the server.
```

```compare javascript
// document.cookie = 'theme=dark; max-age=31536000'
// and string parsing to read it back.
```

```compare python
# Flask: request.cookies.get('theme') and
# response.set_cookie('theme', 'dark').
```

```exercise
goal: "Store the language in a cookie: replace the ref with `useCookie('lang', { default: () => 'en' })`."
lang: typescript
code: |-
  const lang = ref('en');
checks:
  - match: 'useCookie\(\s*''lang'',\s*\{\s*default:\s*\(\)\s*=>\s*''en''\s*,?\s*\}\s*\)'
    message: "Write useCookie('lang', { default: () => 'en' })."
solution: |-
  const lang = useCookie('lang', { default: () => 'en' });
```

```quiz
question: "Why does a theme stored in a cookie avoid the flash that `localStorage` causes?"
options:
  - Cookies load faster than localStorage.
  - The server receives the cookie with the request, so it renders the right theme straight away.
  - Browsers cache cookie-based CSS.
answer: 1
explain: The server can't see localStorage, but cookies arrive with every request.
```

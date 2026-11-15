# Learnmap

A playful, map-based tutorial site with one map per programming language. Pick a language, tell the guide which language you already know, choose a goal, and follow the lit-up route through small, hands-on lessons.

On the map, hovering a lesson traces everything you need to learn first. Clicking it offers **Build the route**: the map collapses into a numbered path to that lesson, from wherever you are now. Any lesson can be a destination; the `goals` in `course.yaml` are just suggested ones.

It runs as a static website, works on phones, and can be embedded in an IntelliJ plugin (JCEF) or any `<iframe>`.

```sh
npm install
npm run dev        # http://localhost:5173
npm test           # parser, highlighter and content checks for every course
npm run build      # static site in dist/ (relative paths, works from file:// too)
```

## How it fits together

```
content/
  catalog.yaml            # every language on the landing page, incl. "coming soon"
  nix/
    course.yaml           # name, colours, guide, branches, goals
    glossary.yaml         # terms used as [[term]] in lessons
    nodes/01-nix.md       # one lesson per file; the number only sets file order
src/
  content/                # YAML + markdown loading and parsing
  syntax/languages.ts     # syntax highlighting rules, one entry per language
  compareLangs.ts         # languages learners can compare with
  graph.ts                # layout, routes and "what's next"
  stats.ts                # XP, levels, streaks, daily quests and badges
  components/             # map, lesson panel, guide, search, settings
```

Courses are discovered automatically: any `content/<id>/course.yaml` becomes a playable map. Lessons are loaded lazily, per course.

The map is laid out as a tree: the first branch in `course.yaml` runs down the middle and the other branches alternate to its right and left, so put the main path first.

## Dashboard, points and badges

The home page is a dashboard: continue where you left off, your maps, and a side column with your level, daily quests, the week's XP and recent badges. `#/badges` lists every badge with its progress, and `#/about` explains how it works.

Everything is kept in the browser's `localStorage`: lesson progress under `learnmap:course:<id>`, scores under `learnmap:stats`. Nothing is sent anywhere. Each thing pays out once:

| Action | XP |
| --- | --- |
| Complete a lesson | 10 |
| Solve an exercise | 5 |
| Answer a quick check on the first try (or later) | 5 (2) |
| Finish a daily quest | 10 |
| Reach a goal | 25 |
| Complete a whole map | 100 |

Level *n* needs `25 · n · (n − 1)` XP in total. A streak counts the days in a row with any XP and stays alive until the end of the next day. There are three daily quests, picked from the date, so everyone gets the same ones. Badges live in `allBadges` in `src/stats.ts`, and every map gets a "master" badge automatically. Lessons finished before scores existed are credited the first time the dashboard loads. Resetting a map keeps your XP and badges; "Start over" on the About page clears everything.

## Adding a language

1. **Create `content/<id>/course.yaml`.** Copy one from an existing course. The important fields:

   ```yaml
   name: Zig
   tagline: Simple, explicit, no hidden control flow.
   logo: "⚡"
   color: "#f7a41d"
   syntax: zig              # key in src/syntax/languages.ts
   extension: zig
   pluginUrl: https://jetplugins.dev
   comparisons: [python, javascript, java, kotlin, go, rust]   # optional

   guide:
     name: Ziggy
     avatar: "🦎"
     intro:
       - "First thing the guide says."
       - "Second thing."
     askGoal: "Where do you want to go?"

   branches:              # colour-coded groups on the map
     - { id: core, title: Zig, color: "#f7a41d" }
     - { id: basics, title: Basics, color: "#e0b84f" }

   goals:                 # suggested destinations; learners can also route to any lesson
     - { id: first, title: Write my first program, node: functions, icon: "👋", description: Variables, functions and loops. }
   ```

2. **Write lessons in `content/<id>/nodes/*.md`** (see the format below).

3. **Add a glossary** in `content/<id>/glossary.yaml` (optional):

   ```yaml
   comptime:
     definition: Code that runs at compile time.
     node: comptime        # optional: lesson to open on a second tap
   allocator: A short definition also works as a plain string.
   ```

4. **Add syntax highlighting** in `src/syntax/languages.ts` (keywords, constants, builtins, comment and string styles). Without it, code still renders, just in one colour.

5. **Remove it from "coming soon"**: once the folder exists, the catalog entry automatically turns into a playable card.

6. Run `npm test`. It checks every course for broken prerequisites, unknown branches, cycles, goals that point nowhere, glossary terms that don't exist, broken `node:` links, and exercises that are already solved by their starting code.

## Lesson format

```markdown
---
title: Attribute sets
icon: "🗂️"
branch: language
requires: [strings, booleans]   # edges on the map
summary: The key–value structure that holds almost everything.
kind: hub                       # optional: a big node
---
Normal markdown. Link a glossary term with [[attribute set]] or [[attribute set|a custom label]],
and another lesson with [text](node:let-in).
```

Special fenced blocks:

| Fence | What it does |
| --- | --- |
| ` ```repl ` | Lines starting with `> ` are input, the rest is output. Output starting with `error:` shows as a red error. Use ` ```repl shell ` for terminal sessions. |
| ` ```compare python ` | Only shown to learners who picked Python. Add one per comparison language. |
| ` ```nix title=flake.nix ` | Regular code, with an optional file title. |
| ` ```tip ` / ` ```warn ` | A highlighted note (markdown inside). |
| ` ```exercise ` | An editable code box, checked live (YAML, see below). |
| ` ```quiz ` | A multiple-choice question (YAML, see below). |

Exercises are checked with regular expressions, in order. The first failing check shows its message. This keeps everything client-side and language-agnostic: no compilers or sandboxes needed.

````markdown
```exercise
goal: Add an attribute `enable` with the value `true`.
code: |
  {
    name = "nginx";
  }
checks:
  - match: 'enable\s*=\s*true'
    message: Add a line like  name = value;  inside the braces.
  - notMatch: 'True'
    message: Booleans are lowercase.
output: '{ enable = true; name = "nginx"; }'    # shown once solved
hint: Optional hint.
```

```quiz
question: What does `//` do?
options:
  - Divides two numbers.
  - Merges two attribute sets.
answer: 1
explain: The right-hand side wins.
```
````

A lesson's **Complete** button unlocks once all its exercises and quizzes are solved. Progress is stored in `localStorage` per course. The code a learner types in an exercise is saved too, per exercise, so it's still there when they come back. **Reset progress** clears both.

## Embedding (IntelliJ plugins)

The build uses relative paths, so `dist/` can be bundled in a plugin's resources and loaded from disk or a local server.

URL options:

- `?embed=1` hides web-only chrome (footer, plugin links).
- `?compare=kotlin` preselects the comparison language, so the guide doesn't need to ask.
- `#/nix/flakes` opens a specific lesson; `#/nix` opens the map.

Events go to the host as JSON:

```ts
{ type: 'lessonCompleted', course, node }
{ type: 'openInEditor', course, node, lang, code }   // "Open in editor" button on exercises
{ type: 'openUrl', url }
```

The site sends them to `window.learnmapHost.postMessage(json)` when that exists, and to `window.parent.postMessage` when it runs in an iframe. The "Open in editor" button only appears when `window.learnmapHost` is present.

A minimal JCEF setup in a plugin:

```kotlin
val browser = JBCefBrowser()
val query = JBCefJSQuery.create(browser as JBCefBrowserBase)
query.addHandler { json ->
    // parse json, e.g. open a scratch file with the exercise code
    null
}
browser.jbCefClient.addLoadHandler(object : CefLoadHandlerAdapter() {
    override fun onLoadEnd(b: CefBrowser, frame: CefFrame, status: Int) {
        b.executeJavaScript(
            "window.learnmapHost = { postMessage: function(m) { ${query.inject("m")} } };",
            b.url, 0,
        )
    }
}, browser.cefBrowser)
browser.loadURL("http://localhost:$port/index.html?embed=1&compare=kotlin#/nix")
```

## Renaming the site

Branding lives in `src/site.ts` (name, tagline, footer link) and `index.html` (page title).

## Ad mode

Links to the JetPlugins plugins (the "Get the plugin" link on a map, the plugin links on coming-soon cards, and the "Made by the folks behind JetPlugins" footer) only show in **ad mode**. It's off by default.

- Turn it on for good: set `adMode: true` in `src/site.ts`.
- Turn it on for one build: `VITE_AD_MODE=true npm run build`.
- Preview either way: add `?ads=1` or `?ads=0` to the URL.

Plugin links never show inside the IntelliJ plugins (`?embed=1`), since the learner already has the plugin.

## Credits

Inspired by Vimjoyer's [Nixmap](https://vimjoyer.com/nixmap/), a playful, choose-your-own-adventure guide to Nix. The landing page has an About section that credits it too.

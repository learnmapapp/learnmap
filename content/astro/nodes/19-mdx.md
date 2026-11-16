---
title: MDX
icon: "🧪"
branch: content
requires: [markdown]
summary: MDX is Markdown that can import and use components, for posts that need more than text.
---
**When Markdown isn't enough.** You're writing a tutorial and want a warning box in the middle. In plain Markdown your options are a blockquote, or raw HTML you'll have to keep consistent by hand. In MDX, you use your component:

```mdx title=src/pages/guides/backup.mdx
---
title: Back up your notes
layout: ../../layouts/PostLayout.astro
---
import Callout from "../../components/Callout.astro";

Copy the `notes/` folder to an external drive.

<Callout type="warning">
  Close the app first, or the copy may be incomplete.
</Callout>

That's it. Do it **weekly**.
```

**Step by step:**

1. **Install the integration once:** `npx astro add mdx`. It installs `@astrojs/mdx` and registers it in `astro.config.mjs`.
2. **Name the file `.mdx`.** Everything you know from Markdown still works: frontmatter, layouts, headings, lists.
3. **Import components** below the frontmatter, with a normal `import` line.
4. **Use them like HTML tags**, with props and children.

**Other MDX tricks:**

- **JavaScript expressions:** `{2 + 2}` renders 4, and `{frontmatter.title}` renders the title.
- **Exports:** `export const year = 2026;` defines a value you can use in the file.

**Watch out for these differences from Markdown:**

- `{` and `<` are special. A literal brace in prose needs escaping (`\{`), and stray `<` characters must be written as `&lt;`.
- HTML comments `<!-- -->` don't work; use `{/* comment */}`.
- Component tags need a blank line before and after them to be treated as blocks.

**When to choose which:** plain Markdown for most writing. It's simpler, and anyone can edit it. Reach for MDX on the pages that need interactive demos, custom callouts or embedded components.

```compare javascript
// MDX is a separate project (mdxjs.com); Astro, Next.js and Docusaurus
// all support it.
```

```compare typescript
// In React projects MDX compiles to a React component; in Astro, to an
// Astro component.
```

```compare python
# Like Sphinx directives (.. warning::), but with your own components.
```

```exercise
goal: "Import the `Chart` component from `../../components/Chart.astro` below the frontmatter, so the tag below works."
lang: markdown
code: |-
  ---
  title: Monthly visitors
  ---

  Visits doubled this month.

  <Chart month="May" />
checks:
  - match: '^import\s+Chart\s+from\s+["'']\.\./\.\./components/Chart\.astro["''];?\s*$'
    message: Add import Chart from "../../components/Chart.astro";
  - match: '---\s*\n[\s\S]*import\s+Chart[\s\S]*<Chart'
    message: Put the import after the frontmatter and before the <Chart /> tag.
solution: |-
  ---
  title: Monthly visitors
  ---
  import Chart from "../../components/Chart.astro";

  Visits doubled this month.

  <Chart month="May" />
```

```quiz
question: "Which of these works in an .mdx file but not in a .md file?"
options:
  - "**bold** text"
  - "<Callout>Careful!</Callout> using an imported Astro component"
  - A YAML frontmatter block
answer: 1
explain: Importing and rendering components is what MDX adds on top of Markdown.
```

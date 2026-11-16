---
title: Paginated routes
icon: 🔢
branch: routing
requires:
  - static-paths
summary: paginate generates route entries plus page metadata.
---

In your Astro project, save this as `src/pages/archive/[...page].astro`. paginate generates route entries plus page metadata. A rest page parameter also supports the first page without an explicit numeric segment.

```astro
---
import type { GetStaticPaths, Page } from "astro";
export const getStaticPaths = (({ paginate }) => {
  return paginate(["Astro", "Lua", "Nim", "Swift"], { pageSize: 2 });
}) satisfies GetStaticPaths;
interface Props { page: Page<string> }
const { page } = Astro.props;
---
<ul>{page.data.map(title => <li>{title}</li>)}</ul>
{page.url.next && <a href={page.url.next}>Next</a>}
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about paginated routes.
lang: astro
code: |-
  ---
  import type { GetStaticPaths, Page } from "astro";
  export const getStaticPaths = (({ paginate }) => {
    return paginate(["Astro", "Lua", "Nim", "Swift"], { pageSize: 1 });
  }) satisfies GetStaticPaths;
  interface Props { page: Page<string> }
  const { page } = Astro.props;
  ---
  <ul>{page.data.map(title => <li>{title}</li>)}</ul>
  {page.url.next && <a href={page.url.next}>Next</a>}
checks:
  - match: pageSize:\s+2
    message: "Use pageSize: 2 for this step."
  - notMatch: pageSize:\s+1
    message: "Replace pageSize: 1 in the starting code."
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about paginated routes is correct?
options:
  - paginate generates route entries plus page metadata. A rest page parameter also supports the
    first page without an explicit numeric segment.
  - paginate requires loading every page in the browser.
  - page.url.next is always present on the final page.
answer: 0
explain: paginate generates route entries plus page metadata. A rest page parameter also supports
  the first page without an explicit numeric segment.
```

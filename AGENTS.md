# Repository Guidelines

## Project Structure & Module Organization

Learnmap is a React/TypeScript tutorial site built with Vite. Application code lives in `src/`: UI components in `components/`, content parsers in `content/`, and highlighting rules in `syntax/`. Graph routing is in `graph.ts`; progress and rewards are in `progress.ts` and `stats.ts`. Shared styles live in `src/styles.css`.

Courses live in `content/<language>/`, with `course.yaml`, optional `glossary.yaml`, and lessons under `nodes/`. `content/catalog.yaml` lists landing-page languages. Tests live in `tests/`; generated site assets go to `dist/`.

## Build, Test, and Development Commands

- `npm ci`: install dependencies from the lockfile.
- `npm run dev`: start the local Vite server, normally at `http://localhost:5173`.
- `npm run typecheck`: check TypeScript without emitting files.
- `npm test`: run the Vitest suite once.
- `npm run build`: type-check and generate the static site in `dist/`.
- `npm run preview`: serve the production build locally.
- `npm run deploy`: build and publish static assets using Cloudflare Wrangler and `wrangler.jsonc`.

## Coding Style & Naming Conventions

Follow existing two-space indentation, single-quoted TypeScript strings, and semicolons. Use PascalCase for React components and their filenames, camelCase for functions and variables, and explicit TypeScript types at module boundaries. Strict checking rejects unused locals and parameters. No formatter or linter is configured; match surrounding code.

Name lessons with numeric prefixes and descriptive slugs, such as `01-rust.md`. The loader strips numeric prefixes when deriving lesson IDs; keep prerequisite and `node:` links consistent with those IDs.

## Testing Guidelines

Use Vitest with `describe`, `it`, and `expect` in `tests/*.test.ts`. Tests run in Node. Extend relevant suites for parser, graph, highlighting, or rewards changes. Course checks cover prerequisites, cycles, layout collisions, glossary links, and exercise starting code. Run `npm test` and `npm run build` before submitting. No coverage threshold is configured. For UI changes, also check mobile layouts and embedded mode (`?embed=1`) manually.

## Commit & Pull Request Guidelines

Git history is unavailable in this checkout. Use concise, imperative commit subjects, such as `Fix lesson route ordering`. Keep changes focused. Pull requests should explain the behavior changed, link relevant issues, report validation commands and results, and include screenshots for visible UI changes.

## Architecture Constraints

Preserve relative asset paths (`base: './'`) for disk and IntelliJ/JCEF embedding. Keep lessons lazily loaded per course and retain course-scoped browser progress storage. Follow `README.md` for lesson frontmatter and exercise formats.

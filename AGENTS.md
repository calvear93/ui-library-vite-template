# AGENTS.md

> Single source of truth for **all** AI coding assistants working in this repository
> (GitHub Copilot, Claude, Gemini, Codex, Cursor, and any agent that reads `AGENTS.md`).

This is a modern **React + TypeScript UI component library** template. Its purpose is to build
reusable UI components — organized with **Atomic Design** — and **bundle them with Vite library
mode** for publishing to npm, developed and documented in Storybook. Examples are intentionally
simple: they demonstrate _structure_, not a house style.

## How to use this document

- This file is the canonical, tool-agnostic instruction set. `CLAUDE.md` and `GEMINI.md`
  are thin pointers to it, and GitHub Copilot reads this file natively — **do not**
  duplicate guidance into those pointers.
- Keep this file as the high-level contract (stack, rules, conventions). Long-form detail
  lives in [`.ai/`](.ai/README.md); link to it instead of repeating.
- **Read first:** [`.ai/skills/ways-of-working.md`](.ai/skills/ways-of-working.md) — autonomy,
  Definition of Done, and how to talk to a (possibly non-technical) user.

## Priority order

When guidance conflicts, resolve in this order:

1. **User instructions** — a direct request in chat.
2. **This file (`AGENTS.md`)** — the canonical contract.
3. **Deep references** in [`.ai/`](.ai/README.md) and [`.github/instructions/`](.github/instructions/).
4. **Existing patterns** in `src/` (the `atoms`/`molecules`/`organisms` components are the exemplars).

## Tech stack

| Area              | Choice                                                           |
| ----------------- | ---------------------------------------------------------------- |
| Language          | TypeScript 6+ (strict)                                           |
| Framework         | React 19+ (built for React `>=18` consumers via peer deps)       |
| Build             | Vite 8 **library mode** (Rolldown) — multi-entry, ESM output     |
| Types output      | `vite-plugin-dts` (`.d.ts` per entry)                            |
| Per-component CSS | `vite-plugin-lib-inject-css` (CSS injected alongside each chunk) |
| Docs / dev        | Storybook 10 (`@storybook/react-vite`)                           |
| Styling           | CSS Modules + UnoCSS (atomic CSS via `@apply`)                   |
| Architecture      | Atomic Design (atoms → molecules → organisms)                    |
| Testing           | Vitest 4 + React Testing Library (happy-dom)                     |
| Coverage          | Vitest Coverage V8                                               |
| Mutation testing  | Stryker Mutator                                                  |
| Tooling           | ESLint 10 + Prettier + Stylelint, pnpm                           |
| Runtime           | Node `>=24`, pnpm `>=11`                                         |

## Commands

```bash
pnpm dev                 # Storybook dev server (port 5001)
pnpm build               # bundle the library to dist/ (entries + CSS + .d.ts)
pnpm build:storybook     # static Storybook build
pnpm test                # Vitest + coverage
pnpm test:mutation       # Stryker mutation tests
pnpm lint                # ESLint (cached)
pnpm stylelint           # CSS linting (cached)
pnpm format              # Prettier (write)
pnpm clean               # remove build artifacts
```

Run `pnpm lint && pnpm stylelint && pnpm test && pnpm build` before finalizing non-trivial changes.

## Project structure

```
src/
  components/
    atoms/<name>/      Component.tsx + .module.css + .stories.tsx + .spec.tsx + index.ts
    molecules/<name>/  …compose atoms
    organisms/<name>/  …compose molecules + atoms
    layouts/<name>/    …arrange organisms + content (structure only)
  hooks/              reusable hooks (*.hook.ts + *.hook.spec.tsx + *.hook.mdx)
  __tests__/          shared test utilities (the #testing alias)
  main.ts             public barrel — pure re-exports (no side effects)
```

The build (`vite.config.ts`) globs `src/**` into one ESM entry per module, generates the
`exports` map and `dist/package.json`, injects per-component CSS, and emits `.d.ts`. Folder
`index.ts` barrels are internal (re-exported by `main.ts`), not their own public subpath.

## Core principles

- **Atomic Design** — compose UI bottom-up: atoms → molecules → organisms (`src/components/`).
  Compose upward only. See the `atomic-design` skill.
- **Simple examples** — the sample components teach structure, not a brand. Keep styling minimal.
- **Public API** — props are typed and JSDoc'd; extend the native element's props and spread
  `...rest` to the DOM node; sensible defaults. See the `component-api` skill.
- **Tree-shakeable** — named exports only; no side-effectful top-level code; `main.ts` is a pure
  barrel. See the `library-exports` skill.
- **UnoCSS styling** — style with utilities via `@apply` in CSS Modules; they compile into each
  component's own CSS and export per component (no global stylesheet needed).
- **Accessibility by default** — semantic HTML, ARIA, keyboard support, visible focus.
- **Storybook-first** — every component ships a story with autodocs.
- **Test what you ship** — meaningful (mutation-aware) assertions.
- **YAGNI** — minimal, atomic changes.

## Critical rules

These are non-negotiable; fix violations before considering work done.

- **Every component ships a story and a spec.** No exceptions.
- **Follow the atomic layers** — place a component in atoms/molecules/organisms by its composition,
  and only import lower layers.
- **Named exports only.** Re-export each component from its folder `index.ts` and from `src/main.ts`.
- **Style with UnoCSS** via `@apply` in the component's CSS Module; keep it simple and restyleable.
- **Keep `react`/`react-dom` as peer dependencies**, never hard dependencies; never bundle React.
- **Props are typed and documented** — no `any` (prefer `unknown` + narrowing); JSDoc public props.
- **Accessibility** — label controls, manage focus, support keyboard.
- **Language:** English for code, comments, and docs.

## Code style (essentials)

- Tabs for indentation (width 4); single quotes; semicolons; trailing commas (all); ~80 col width.
- Arrow functions with parens around params; named exports preferred over default exports.
- Include `.ts`/`.tsx` extensions in relative imports; use the `#testing` alias for test utils.
- Import order: external packages → `#*` aliases → relative imports.
- Files `kebab-case` (component files `PascalCase.tsx`), components `PascalCase`,
  functions/vars `camelCase`, module constants `SCREAMING_SNAKE_CASE`, private members `_`-prefixed.

Full ruleset: [`.github/instructions/coding-standards.instructions.md`](.github/instructions/coding-standards.instructions.md).

## Testing

- Vitest + React Testing Library; assert on user-visible output, not internals.
- Use `screen` queries and `userEvent`; cover the happy path, an edge case, and a11y where relevant.
- Place `*.spec.tsx` alongside the component. See the `vitest-tdd` skill.

## Commit conventions

Use **Conventional Commits with Gitmoji**:

```
<type>(<optional scope>) <gitmoji>: <description>
```

Examples:

```
feat(button) ✨: add the Button atom
fix(field) 🐛: link the label to the input
docs(readme) 📚: document the atomic structure
test(form) ✅: cover the sign-up organism
chore(deps) 🔧: bump vite
```

## Spec-driven development (OpenSpec)

Build non-trivial features through a spec-first loop (the [OpenSpec](https://openspec.dev)
convention): living specs are current truth, and each request is a **change** carrying spec
**deltas** applied on ship. The procedures live in [`.ai/skills/`](.ai/README.md):

```
/spec-propose    idea   → specs/changes/<id>/proposal.md + spec deltas
/spec-design     change → design.md (skip if trivial)
/spec-tasks      change → tasks.md (atomic, test-first)
/spec-implement  change → code + tests
/spec-archive    change → apply deltas to specs/specs/ + move to specs/changes/archive/
```

Living specs live in `specs/specs/`, proposals in `specs/changes/<id>/`, shipped changes in
`specs/changes/archive/`. Format reference: [`spec-conventions`](.ai/skills/spec-conventions.md);
project context: [`specs/project.md`](specs/project.md). The official `openspec` CLI is not wired
in — the `spec-*` skills are the engine. GitHub Copilot surfaces the loop as `/spec-*` prompts
under [`.github/prompts/`](.github/prompts/).

## Deep references

| Document                                                                      | Scope                                                                  |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [Operating manual](.ai/skills/ways-of-working.md)                             | Autonomy, default decisions, Definition of Done                        |
| [`.ai/skills/`](.ai/README.md)                                                | Atomic design, component API, exports, Storybook, a11y, build, testing |
| [`.ai/prompts/`](.ai/README.md)                                               | Task playbooks (create-component, create-hook)                         |
| [`.ai/agents/`](.ai/README.md)                                                | Agent roles (react component-library engineer)                         |
| [Coding standards](.github/instructions/coding-standards.instructions.md)     | Formatting, naming, file suffixes, TypeScript rules                    |
| [Architecture guide](.github/instructions/architecture-guide.instructions.md) | Build pipeline, exports map, atomic design, Storybook wiring           |
| [README](README.md)                                                           | Human-facing setup and usage                                           |

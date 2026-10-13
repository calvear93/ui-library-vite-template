# AGENTS.md

These are the canonical, tool-agnostic instructions for every AI assistant in this repo.
`CLAUDE.md` and `GEMINI.md` only import this file, and the skills live in [`.ai/`](.ai/README.md).
Precedence: user instructions, then this file, then existing code patterns.

This is a **React UI component library template**: Atomic Design components, bundled with Vite
library mode (one ESM entry per module, with its own CSS and `.d.ts`), documented in Storybook and
published to npm. The examples teach structure, not a house style.

## Stack

- **Core:** React 19 (consumers: `react`/`react-dom` `>=18` as peers), TypeScript 6 (strict).
- **Build:** Vite 8 library mode (Rolldown), `vite-plugin-dts`, `vite-plugin-lib-inject-css`.
- **Styling:** CSS Modules + UnoCSS via `@apply`.
- **Docs:** Storybook 10 (`@storybook/react-vite`), a11y addon, `storybook-dark-mode`.
- **Tests:** Vitest 5 + Testing Library (happy-dom).
- **Runtime:** Node ≥ 24, pnpm ≥ 12.

## Commands

```bash
pnpm dev                        # Storybook dev server (http://localhost:5001)
pnpm test                       # Vitest in watch mode
pnpm test:cov                   # tests once, with coverage
pnpm typecheck                  # tsc --noEmit
pnpm lint --fix                 # ESLint + Prettier (style is enforced here)
pnpm stylelint                  # CSS lint
pnpm build                      # library bundle to dist/ (entries + CSS + .d.ts + package.json)
pnpm build:storybook            # static Storybook build
pnpm pub / pub:alpha            # gate + publish dist/ (see library-build)
```

**Gate** (must be green before a change is done):
`pnpm typecheck && pnpm lint && pnpm stylelint && pnpm test:cov && pnpm build`

## Layout

```
src/components/atoms/<name>/       one native element each (Button, Input)
src/components/molecules/<name>/   atoms combined into a unit (Field)
src/components/organisms/<name>/   molecules + atoms forming a section (SignUpForm)
src/components/layouts/<name>/     arrange children; structure only, no colors (Stack)
src/hooks/                         use-<name>.hook.ts + .hook.spec.tsx + .hook.mdx
src/docs/                          standalone Storybook MDX pages
src/__tests__/                     #testing helpers
src/main.ts                        public barrel: pure re-exports, grouped by layer
.storybook/                        Storybook config, theme and branding
.vscode/__templates__/             scaffolds (atom, molecule, organism, layout, hook)
```

A component folder holds `<Name>.tsx` + `.module.css` + `.stories.tsx` + `.spec.tsx` + `index.ts`.
The exemplars are the components under `src/components/`.

## Rules (the ones lint can't check)

- **Every component ships a story and a spec**, and is re-exported from its folder `index.ts` and
  from `src/main.ts`.
- **Layers compose upward only:** a layer imports lower layers, never its own or a higher one.
  See [`components`](.ai/skills/components.md).
- **Props are a public contract:** extend the root element's native props, spread `...rest`, merge
  `className` (never overwrite it), and JSDoc every public prop. Renaming or removing a prop is a
  major release. See [`components`](.ai/skills/components.md).
- **Named exports only.** The one exception is `export default meta` in stories (CSF).
- **React is a peer dependency**, never a dependency and never bundled. `src/main.ts` has no side
  effects and never imports `uno.css`. See [`library-build`](.ai/skills/library-build.md).
- **Accessibility:** semantic elements, labelled controls, keyboard support, a visible
  `:focus-visible` style and `prefers-reduced-motion` for animation.
- **Imports:** relative imports keep their `.ts`/`.tsx` extension; test helpers come from
  `#testing`.
- **Browser-safe types:** use `ReturnType<typeof setTimeout>`, never `NodeJS.*` (Node types are in
  the program for `vite.config.ts`, so tsc won't catch it).
- **Tests:** ship tests with the code. See [`testing`](.ai/skills/testing.md).
- **Types and checks:** prefer `unknown` or generics. `any` (lint allows it) is fine only when an
  exact type adds complexity without safety. No `@ts-expect-error` or `eslint-disable` to dodge
  an error.
- **YAGNI:** minimal, atomic changes, with no new dependency without a reason. Keep the examples
  plainly styled so consumers can restyle them.
- **Style is tooling-owned.** Formatting, import and prop order, type imports and file naming are
  enforced by ESLint, Prettier and Stylelint. Run `pnpm lint --fix`.

## Language

Code, comments, docs and commits are in **English**. Talk to the user in their language.

## Commits

Use Conventional Commits + Gitmoji: `<type>(<scope>) <gitmoji>: <description>`.
For example: `feat(button) ✨: add the ghost variant`, `fix(field) 🐛: …`, `refactor ♻️`,
`test ✅`, `docs 📚`, `chore(deps) 🔧`. For non-trivial changes, add
`Refs: docs/changes/<file>.md` to the commit body.

## How to work

Follow [`ways-of-working`](.ai/skills/ways-of-working.md). It covers autonomy, how to right-size
a change, change records ([`docs/changes/`](docs/changes/README.md)), and the Definition of Done.

<div align="center">

<img src="assets/logo.svg" width="220" alt="UI Kit" />

# UI Kit

**A React component library template — bundled with Vite, organized with Atomic Design.**

[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Storybook](https://img.shields.io/badge/Storybook-10-FF4785?logo=storybook&logoColor=white)](https://storybook.js.org)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE.md)

</div>

---

Tree-shakeable, typed, and tested — scaffold your design system, document it in Storybook, and
publish it to npm. Every component is its own ES entry with its own CSS and type definitions.

## ✨ Features

- 🧱 **Atomic Design** — atoms → molecules → organisms, the only structural opinion.
- ⚡ **Vite 8 library mode** (Rolldown) — one ESM entry per component, tree-shakeable.
- 🎨 **UnoCSS** — style with utilities via `@apply`; they compile into each component's own CSS.
- 📦 **Per-component CSS + `.d.ts`** — auto-injected styles, generated types, clean `exports` map.
- 📖 **Storybook 10** — autodocs, a11y checks, and interaction tests for every component.
- ✅ **Tested** — Vitest + Testing Library, with Stryker mutation testing.
- 🤝 **React 18 & 19** — shipped as peer dependencies; React is never bundled.

## 🚀 Quick start

```bash
pnpm install
pnpm dev          # Storybook → http://localhost:5001
```

Then replace the placeholders (`(((lib-name)))`, `(((description)))`, `(((repository)))`) in
`package.json` and start building components.

## 📦 Usage (consumers)

```bash
npm install <lib-name>
```

```tsx
import { Button, Field } from '<lib-name>';

export const App = () => (
	<form>
		<Field label='Email' type='email' />
		<Button text='Get started' />
	</form>
);
```

Each component injects its own CSS automatically — **nothing else to import**. Import a single
component by subpath for the smallest footprint:

```tsx
import { Button } from '<lib-name>/Button';
```

## 🧱 Atomic Design

```
src/components/
  atoms/        Button · Input          — one element each
  molecules/    Field                   — Label + Input
  organisms/    SignUpForm              — Field × 2 + Button
```

Each component lives in its own folder, co-located with its styles, story, and test:

```
atoms/button/
  Button.tsx
  Button.module.css     # UnoCSS @apply
  Button.stories.tsx    # Storybook + autodocs
  Button.spec.tsx       # Vitest + Testing Library
  index.ts
```

Scaffold new ones with the [`.ai/prompts/create-component.md`](.ai/prompts/create-component.md) playbook.

## 🎨 Styling

Style with [UnoCSS](https://unocss.dev) utilities via `@apply` inside each component's CSS Module:

```css
.button {
	@apply cursor-pointer rounded-lg bg-blue-500 px-6 py-3 text-sm font-bold text-white;
}
```

UnoCSS compiles only the utilities you use into that component's scoped stylesheet, which the build
exports per component — no global stylesheet to ship. Icons work the same way
(`@apply i-mdi-account-plus`).

## 🛠️ Scripts

| Command                              | Action                           |
| ------------------------------------ | -------------------------------- |
| `pnpm dev`                           | Storybook dev server (port 5001) |
| `pnpm build`                         | Bundle the library to `dist/`    |
| `pnpm build:storybook`               | Static Storybook build           |
| `pnpm test`                          | Vitest + coverage                |
| `pnpm test:mutation`                 | Stryker mutation tests           |
| `pnpm lint` · `stylelint` · `format` | ESLint · Stylelint · Prettier    |
| `pnpm clean`                         | Remove build artifacts           |

## 📤 Publishing

`pnpm build` emits a self-contained package into `dist/` — its own `package.json` with the
`exports` map, `peerDependencies`, and `sideEffects`. Publish from there:

```bash
pnpm build
cd dist && npm publish        # npm pack --dry-run to inspect first
```

## 🤖 Conventions & AI agents

Project conventions live in [AGENTS.md](AGENTS.md), with playbooks under [`.ai/`](.ai/README.md).
`CLAUDE.md` and `GEMINI.md` point to the same source.

<div align="center"><sub>MIT © UI Kit template</sub></div>

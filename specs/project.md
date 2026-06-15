# Project: (((lib-name)))

> OpenSpec project context. This is the stable, high-level description of **this** codebase
> that every spec-driven change reads first. Keep it short and current; deep rules live in
> [`AGENTS.md`](../AGENTS.md) and [`.github/instructions/`](../.github/instructions/).

## Stack

- **Type:** Publishable React component library — no app shell, router, or backend.
- **Language:** TypeScript 6+ (strict).
- **Build:** Vite 8 library mode (Rolldown) — one ESM entry per component, with per-component
  CSS and generated `.d.ts`.
- **Architecture:** Atomic Design — `src/components/{atoms,molecules,organisms}/` plus `src/hooks/`.
- **Styling:** CSS Modules + UnoCSS (`@apply`).
- **Docs:** Storybook 10.
- **Testing:** Vitest + React Testing Library (happy-dom).
- **Runtime:** Node `>=24`, pnpm `>=11`. `react`/`react-dom` are **peer** dependencies.

## Conventions

- Code and inline docs in **English** (identifiers, comments, props, errors). Full rules in
  [`AGENTS.md`](../AGENTS.md).
- Every component ships a story and a spec, is exported from its folder `index.ts` and from
  `src/main.ts`, and styles with UnoCSS. Start new work from
  [`.ai/prompts/create-component.md`](../.ai/prompts/create-component.md).

## Quality gates (the change lifecycle runs these)

```bash
pnpm lint            # ESLint (cached)
pnpm stylelint       # CSS linting
pnpm test            # Vitest + coverage
pnpm build           # library build (typecheck + dist)
pnpm format          # Prettier (write)
```

## How specs work here (OpenSpec)

- `specs/specs/` — **living truth**: one folder per capability, the behavior that **is** built.
- `specs/changes/` — **proposals** (like DB migrations): each change carries spec **deltas**
  (`## ADDED|MODIFIED|REMOVED Requirements`). When shipped, `spec-archive` applies the deltas
  to `specs/specs/` and moves the change to `specs/changes/archive/`.

See the lifecycle in [`.ai/README.md`](../.ai/README.md) and the format in
[`.ai/skills/spec-conventions.md`](../.ai/skills/spec-conventions.md).

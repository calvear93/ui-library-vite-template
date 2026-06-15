# Project: <app name>

> OpenSpec project context. Stable, high-level description of this codebase that every
> spec-driven change reads first. Keep short; deep rules live in `AGENTS.md`.

## Stack

- **Framework / language:** <e.g. React 19 + TypeScript 6 (Vite library mode)>
- **Architecture:** <e.g. component library — src/components (Atomic Design: atoms/molecules/organisms) + src/hooks>
- **Testing:** <e.g. Vitest + React Testing Library>
- **Runtime / tooling:** <e.g. Vite + pnpm; ESLint + Prettier + Stylelint>

## Conventions

- <Language policy, formatting, where canonical scaffolds live. Link `AGENTS.md`.>

## Quality gates (the change lifecycle runs these)

```bash
<lint command>
<test command>
<build/typecheck command>
<format command>
```

## How specs work here (OpenSpec)

- `specs/specs/` — living truth (one folder per capability).
- `specs/changes/` — proposals with spec deltas (ADDED/MODIFIED/REMOVED); archived on ship.

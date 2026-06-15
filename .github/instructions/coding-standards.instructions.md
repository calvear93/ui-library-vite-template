---
applyTo: 'src/**/*.{ts,tsx,css}'
---

# Coding standards

Elaborates the "Code style" section of [`AGENTS.md`](../../AGENTS.md).

## Formatting

- Tabs for indentation (width 4); single quotes; semicolons; trailing commas (all); ~80 columns.
- Arrow functions with parens around params. Prettier and ESLint are the source of truth — run
  `pnpm format` and `pnpm lint`.

## Naming & files

- Files `kebab-case`; component files `PascalCase.tsx`; component folder `kebab-case/`.
- Components `PascalCase`; functions/vars `camelCase`; module constants `SCREAMING_SNAKE_CASE`;
  private members `_`-prefixed.
- Suffixes: `*.module.css`, `*.stories.tsx`, `*.spec.tsx`, `*.hook.ts`.
- Relative imports include the `.ts`/`.tsx` extension; use the `#testing` alias for test utils.
- Import order: external → `#*` aliases → relative.

## TypeScript

- `strict`; no `any` (prefer `unknown` + narrowing). Public props are typed and JSDoc'd.
- Named exports only. Extend native element prop types for components; `forwardRef` + spread `...rest`.
- Browser-safe types: `ReturnType<typeof setTimeout>`, not `NodeJS.Timeout`.

## CSS

- Style with UnoCSS utilities via `@apply`; keep it simple and easy to restyle.
- CSS Modules per component; keep selectors flat; respect `prefers-reduced-motion`.

## Anti-patterns

- Swallowing `className`/`style`/`ref`/handlers; default exports; bundling React; broad
  side-effect imports in `main.ts`; magic values in CSS; components without a story or spec.

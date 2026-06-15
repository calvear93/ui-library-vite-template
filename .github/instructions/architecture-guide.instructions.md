---
applyTo: '**'
---

# Architecture guide

How the library is structured and built. Pairs with the [`atomic-design`](../../.ai/skills/atomic-design.md),
[`vite-library-mode`](../../.ai/skills/vite-library-mode.md), and
[`library-exports`](../../.ai/skills/library-exports.md) skills.

## Folder topology

```
src/
  components/
    atoms/<name>/      Component.tsx + .module.css + .stories.tsx + .spec.tsx + index.ts
    molecules/<name>/  …compose atoms
    organisms/<name>/  …compose molecules + atoms
  hooks/              *.hook.ts (+ *.hook.spec.tsx)
  __tests__/          shared test utils (#testing alias)
  main.ts             public barrel (pure re-exports)
.storybook/           Storybook config + assets (logo, favicon)
```

Components follow **Atomic Design**: compose upward (atoms → molecules → organisms), importing
only lower layers.

## Build pipeline (`vite.config.ts`, Vite 8 / Rolldown)

1. `getEntryfiles()` globs `src/**` (excluding tests/stories/mocks/fixtures/`index` barrels) into
   one ESM entry per module, and builds the `exports` map (POSIX forward slashes).
2. `build.lib` (`formats: ['es']`, `target: 'es2022'`) + `build.rolldownOptions` (Vite 8's renamed
   `rollupOptions`) externalize all deps and `react`/`react-dom`.
3. Plugins: `checker` → `react` → `unocss` → `libInjectCss` (per-component CSS) → `dts` (`.d.ts`) →
   `pkgJson` (generates `dist/package.json`) → `docs` (copies README/LICENSE).

Output `dist/`: per-entry `.js`, per-component `assets/<name>.css`, `.d.ts`, and a self-contained
`package.json` with `exports`, `peerDependencies`, and `sideEffects`.

## Styling

Components style with UnoCSS utilities via `@apply` in their CSS Modules. UnoCSS compiles only the
used utilities (and icons) into each component's scoped CSS, which `vite-plugin-lib-inject-css`
injects into that component's chunk — so there is **no global stylesheet** to ship or import.
Keep styling minimal so the template is easy to restyle.

## Storybook

`@storybook/react-vite` (v10) reuses `vite.config.ts` (so `virtual:uno.css` resolves). `addon-docs`
provides autodocs + MDX; controls/actions/viewport are in the core. Branding and the nested-layers
icon live in `.storybook/assets/`.

## Boundaries

- `react`/`react-dom` are peer dependencies — never imported as hard deps, never bundled.
- `main.ts` is a pure barrel: re-exports only, no side effects.
- Folder `index.ts` files are internal barrels, not public subpath exports.
- Components only import lower atomic layers.

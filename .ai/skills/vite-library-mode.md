# Vite library mode (the build)

`vite.config.ts` builds the library with Vite 8 (Rolldown). Understand it before changing it.

## How it works

- **Multi-entry** — `getEntryfiles()` globs `src/**` (excluding tests/stories/mocks/fixtures and
  internal `index.ts` barrels) into a `Record<key, path>`; every module becomes its own ESM entry.
- **`build.lib`** — `formats: ['es']` only; `target: 'es2022'` (explicit, conservative for a
  redistributable library).
- **`build.rolldownOptions`** — note the name: Vite 8 renamed `rollupOptions` → **`rolldownOptions`**.
    - `external` externalizes all deps + devDeps + `react`/`react-dom` (regex) so React is never bundled.
    - `output` sets `entryFileNames`/`chunkFileNames`/`assetFileNames`.
- **Plugins (order matters):** `checker` (tsc/eslint/stylelint) → `react` → `unocss` →
  `libInjectCss` (per-component CSS) → `dts` (`tsconfigPath: './tsconfig.json'`, `entryRoot: 'src'`) →
  `pkgJson` → `docs`.
- **`pkgJson()`** generates `dist/package.json`: the `exports` map (built from the entries, with
  POSIX forward slashes), `peerDependencies` (`react`/`react-dom: >=18`), `sideEffects`, `main`/
  `module`/`types`. **Paths must use `/`**, never `\` — normalize with `node:path` `posix`.
- **`docs()`** copies `README.md` + `LICENSE.md` into `dist/`.

## Gotchas

- A new component file is picked up automatically (the glob) — no manual entry edits needed.
- Keep `react`/`react-dom` in `devDependencies` (for build/test/Storybook) + `peerDependencies`
  (for consumers); never in `dependencies`.
- TypeScript keeps `declaration: true` so `vite-plugin-dts` can emit `.d.ts` (Vite/dts handle emit;
  `noEmit: true` for tsc itself).
- Storybook reuses this config; its own build overrides `build.lib`, and the `unocss` plugin
  provides `virtual:uno.css` to the preview.

Verify a build with `pnpm build`, then inspect `dist/`: per-entry `.js`, per-component `assets/*.css`,
`.d.ts`, and a correct `dist/package.json` with no React inlined.

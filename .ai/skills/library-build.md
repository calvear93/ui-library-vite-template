# Skill: library build, exports and publishing

`vite.config.ts` is the source of truth and is commented; read it before changing it. This file
covers what the code doesn't say.

## How the build works

- **One entry per module:** `getEntryfiles()` globs `src/**` (minus specs, stories, mocks,
  fixtures and folder `index.ts` barrels). A new file is picked up automatically.
- **Output:** ESM only, `target: 'es2022'`, under `build.rolldownOptions` (Vite 8 renamed
  `rollupOptions`). All deps, devDeps and `react`/`react-dom` are external.
- **Plugins, in order:** `checker` (tsc/eslint/stylelint) → `react` → `unocss` → `libInjectCss`
  (each component's CSS is imported by its chunk) → `dts` → `pkgJson` → `docs`.
- **`pkgJson()`** writes `dist/package.json`: the `exports` map, `main`/`module`/`types`,
  `peerDependencies` (`>=18`) and `sideEffects: ['**/*.css']`. Paths are POSIX (`/`), always.
- **Subpath keys are the file basename** (`./Button`, `./use-counter.hook`). Two modules with the
  same file name in different folders silently collide, so keep names unique across `src/`.

## Exports

- `src/main.ts` is a pure barrel of `export *` from each folder `index.ts`, grouped by layer
  comments. No side effects, and never `uno.css`: it would ship the whole utility catalogue.
- Folder `index.ts` files re-export the component and its props type. They are internal, not
  subpaths.
- Consumers import from the barrel (`import { Button } from '<lib>'`) or a subpath
  (`'<lib>/Button'`); either way the component's CSS comes with its JS.
- `react`/`react-dom` stay in `devDependencies` (build, tests, Storybook) and the generated peers.
  Never add them to `dependencies`.

## Publishing

1. Replace the root `package.json` placeholders (`(((lib-name)))`, `(((description)))`,
   `(((repository)))`) and bump `version` there; the build copies it into `dist/`.
2. Inspect: `pnpm build`, then `cd dist && npm pack --dry-run`. Check the file list, that every
   `exports` path uses `/`, and that `react` stays an external `import … from 'react'`.
3. `pnpm pub` (latest) or `pnpm pub:alpha` (prerelease). Each runs typecheck, lint, `test:cov`
   and build, then publishes `dist/` with `--access public --no-git-checks`.

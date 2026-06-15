# Publishing

The library is published **from `dist/`**, which carries its own generated `package.json`.

## Flow

1. Replace the root `package.json` placeholders (`(((lib-name)))`, `(((description)))`,
   `(((repository)))`) with real values.
2. `pnpm build` — emits `dist/` with:
    - one `.js` per entry + `main.js`, per-component `assets/<name>.css`, and `.d.ts`.
    - `dist/package.json` with the `exports` map, `main`/`module`/`types`, `peerDependencies`
      (`react`/`react-dom: >=18`), `sideEffects: ["**/*.css"]`, and `dist/README.md` + `LICENSE.md`.
3. Inspect before shipping: `cd dist && npm pack --dry-run` (check the file list and `exports`).
4. Publish: `cd dist && npm publish` (add `--access public` for a scoped public package).

## Checklist

- Bump `version` in the **root** `package.json` (the build copies it into `dist`).
- Confirm `react`/`react-dom` are **peer** dependencies and **not** inlined in the bundles
  (grep `dist` for `react` imports — they should be external `import … from "react"`).
- Confirm every `exports` path uses forward slashes (cross-platform / npm correctness).
- Consumers import a component; its CSS is injected automatically (no global stylesheet to import):
    ```ts
    import { Button } from '<lib>';
    ```

## Optional hardening (not included by default)

- **Changesets** for versioning + changelog.
- **CI** (lint/test/build on PR) and a publish workflow gated on `NPM_TOKEN`.
- A **consumer smoke test**: install the packed tarball into a scratch Vite app and confirm it
  renders, styles apply, and unused components tree-shake out.

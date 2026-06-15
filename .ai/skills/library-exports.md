# Library exports & tree-shaking

Consumers should pay only for what they import. The build makes every source module its own
entry, so exports hygiene directly controls bundle size.

## Rules

- **Named exports only.** No default exports for components or hooks.
- **`src/main.ts` is a pure barrel** — only re-exports, no side effects:
    ```ts
    // atoms
    export * from './components/atoms/button/index.ts';
    // molecules
    export * from './components/molecules/field/index.ts';
    // organisms
    export * from './components/organisms/sign-up-form/index.ts';
    ```
    Never import the global `uno.css` here — it would ship the entire utility catalog. Components
    style with `@apply`, so UnoCSS compiles only the utilities they use into their own CSS.
- **Folder `index.ts`** re-exports the component (and its props type). It is internal: `main.ts`
  re-exports it, and the build excludes `index` files from becoming their own subpath export.
- **No top-level side effects.** The published `package.json` sets `"sideEffects": ["**/*.css"]`
  so bundlers keep each component's CSS but shake unused JS.

## How it reaches consumers

The build generates `dist/package.json` `exports` from the source tree, e.g.:

```jsonc
"./Button": {
	"types": "./components/atoms/button/Button.d.ts",
	"import": "./components/atoms/button/Button.js",
	"style": "./assets/Button.css"
}
```

So both of these work, and unused components shake out of the consumer's bundle:

```ts
import { Button } from '<lib>'; // from the barrel
import { Button } from '<lib>/Button'; // subpath (smallest)
```

Each component's CSS (the compiled `@apply` utilities) is injected into its chunk by
`vite-plugin-lib-inject-css`, so importing the component's JS pulls in its styles automatically —
no global stylesheet to ship or import. See `vite-library-mode` for the build details.

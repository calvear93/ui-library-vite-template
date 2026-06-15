# Component API design

A library component's props are a public contract. Design them for consumers.

## Checklist

- **Extend the native element props** so consumers get the full DOM API for free:
    ```ts
    export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    	text: string;
    }
    ```
- **Forward the ref** when consumers need DOM access (`forwardRef` + `displayName`); simple atoms may omit it.
- **Spread `...rest`** onto that node so `id`, `aria-*`, `data-*`, event handlers, etc. pass through.
- **Merge `className`**, never overwrite it: `[styles.root, className].filter(Boolean).join(' ')`.
- **Sensible defaults** for optional props (`variant = 'primary'`); keep required props minimal.
- **JSDoc every public prop** — it becomes Storybook autodocs and editor hints.
- **Type unions, not booleans-that-multiply** — prefer `variant?: 'primary' | 'ghost'` over several flags.
- **Controlled & uncontrolled** — for inputs, accept `value`/`defaultValue` and forward both; use
  `useId()` to generate an `id` when the consumer doesn't supply one (links `label` ↔ control).

## Anti-patterns

- Don't hardcode styles ad hoc — use UnoCSS utilities via `@apply` (see `atomic-design`).
- Don't swallow `className`, `style`, `ref`, or event handlers.
- Don't leak internal types or require consumers to import from deep paths.
- Don't add a dependency to ship a trivial component — keep the dependency surface tiny.

## Semver implications

- Adding an optional prop → minor. Renaming/removing a prop or changing a default → **major**.
- Changing a component's DOM structure or class names can break consumer overrides — treat as major.

Reference exemplars: `atoms/button`, `atoms/input`, `molecules/field` (label + `useId`), `organisms/sign-up-form`.

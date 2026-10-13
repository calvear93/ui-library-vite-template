# Skill: components (Atomic Design, props API, styling, a11y)

Read this when you create or change a component. Start from a scaffold in `.vscode/__templates__/`
(`atom`, `molecule`, `organism`, `layout`, or `hook` for `src/hooks/`). Exemplars:
`atoms/button`, `atoms/input`, `molecules/field`, `organisms/sign-up-form`, `layouts/stack`.

## Layers

| Layer     | Is                                                 | May import                |
| --------- | -------------------------------------------------- | ------------------------- |
| Atoms     | One native element (Button, Input)                 | Nothing from components   |
| Molecules | A few atoms as one unit (Field = label + Input)    | Atoms                     |
| Organisms | A self-contained section (SignUpForm)              | Molecules, atoms          |
| Layouts   | Arrangement only: flex/grid/gap, no colors (Stack) | Any lower layer, children |

- Pick the layer by composition. Reuse the atom instead of a raw element inside a molecule.
- Layouts carry no house style, so they have no dark-mode variant.
- Wire a new component in two places: its folder `index.ts` and `src/main.ts` (under its layer
  comment). The build finds entries by glob (see [`library-build`](library-build.md)).

## Props API

```tsx
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** Visible label, also the button's accessible name. */
	text: string;
}

export const Button = ({
	className,
	text,
	type = 'button',
	...props
}: ButtonProps) => (
	<button
		className={[styles.button, className].filter(Boolean).join(' ')}
		type={type}
		{...props}
	>
		{text}
	</button>
);
```

- Extend the root element's native props and spread `...rest` onto it, so `id`, `aria-*`,
  `data-*` and handlers pass through. A molecule that wraps a control (Field) forwards them to the
  control instead.
- **Merge `className`**, never overwrite it: a consumer's class must add to the component's.
- `ref` is a plain prop in React 19: no `forwardRef`.
- JSDoc every public prop; it becomes Storybook autodocs and editor hints.
- Prefer a union (`variant?: 'primary' | 'ghost'`) over several booleans, and give optional props
  defaults.
- Inputs accept `value` and `defaultValue`; generate a missing `id` with `useId()` to link the
  label.
- **Semver:** an optional prop is a minor release. Renaming or removing a prop, changing a default,
  the DOM structure or class names is **major**, because consumers override them.

## Styling

- UnoCSS utilities via `@apply` inside the component's `*.module.css`; they compile into that
  component's own CSS. Icons work the same way (`@apply i-mdi-account-plus`).
- Dark mode: a `:global(.dark) .x { @apply … }` block; consumers enable it with `.dark` on a root.
- `@apply` is **not** expanded inside a nested `@media`. Write plain CSS there
  (`transition: none;`).
- Keep the examples minimal so a consumer can restyle them.

## Accessibility (what jsx-a11y can't see)

- A visible `:focus-visible` style; never remove an outline without a replacement.
- Wrap non-essential animation in `@media (prefers-reduced-motion: reduce)`.
- Icon-only controls need `aria-label`; decorative icons get `aria-hidden='true'`.
- Text stays legible in light and dark; keep Storybook's a11y panel clean.

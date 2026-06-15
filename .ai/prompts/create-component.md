# Prompt: create a component

Scaffold a new component as a self-contained folder, placed in the right Atomic Design layer.
Mirror the existing `atoms`/`molecules`/`organisms` exemplars. Apply the `atomic-design`,
`component-api`, `storybook`, `accessibility`, and `vitest-tdd` skills.

> In VSCode, the Template Tool scaffolds these from `.vscode/__templates__/` (`atom`, `molecule`,
> `organism`, `layout`, `hook`) — right-click the target folder → "New From Template". The steps
> below are the manual equivalent.

## Steps

1. Pick the layer by composition:
    - **atom** — wraps one native element (no other components).
    - **molecule** — composes atoms.
    - **organism** — composes molecules and atoms.
    - **layout** — arranges organisms/content via `children`/slots (structure only, no house style).
2. Create `src/components/<layer>/<kebab-name>/` with five files (component in `PascalCase`):
    - `<Name>.tsx`, `<Name>.module.css`, `<Name>.stories.tsx`, `<Name>.spec.tsx`, `index.ts`
3. Write the component: named export; for atoms extend the native element's props and spread
   `...rest`; for molecules/organisms import and compose lower-layer components. Type props + JSDoc.
4. Style with UnoCSS via `@apply` in the CSS Module — keep it simple and easy to restyle.
5. Story (CSF3, `tags: ['autodocs']`) + spec (RTL: `screen` queries, `userEvent`, `afterEach(cleanup)`).
6. `index.ts`: `export * from './<Name>.tsx';`
7. Re-export from `src/main.ts` under its layer comment.
8. Verify: `pnpm lint && pnpm stylelint && pnpm test && pnpm build`.

## Atom skeleton

```tsx
import { type ButtonHTMLAttributes } from 'react';
import styles from './Name.module.css';

export interface NameProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
}

/** Name atom. */
export const Name = ({ text, type = 'button', ...props }: NameProps) => {
	return (
		<button className={styles.button} type={type} {...props}>
			{text}
		</button>
	);
};
```

## CSS module (UnoCSS `@apply`)

```css
.button {
	@apply cursor-pointer rounded-lg bg-blue-500 px-6 py-3 text-sm font-bold text-white;
}
```

UnoCSS compiles these utilities into the component's own scoped CSS, which the build exports per
component. Icons work the same way: `.icon { @apply i-mdi-account-plus; }`.

Then add the story and spec following the `storybook` and `vitest-tdd` skills.

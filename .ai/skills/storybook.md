# Storybook

Storybook 10 (`@storybook/react-vite`) is the dev environment and the docs site. Every component
ships a story.

## Imports (Storybook 10)

- Types: `import type { Meta, StoryObj } from '@storybook/react-vite';`
- Test utils: `import { expect, userEvent, within } from 'storybook/test';`
- MDX blocks: `import { Meta } from '@storybook/addon-docs/blocks';`

(The renderer-based `@storybook/react` and the old `@storybook/test`/`@storybook/blocks` paths
are gone — use the ones above.)

## CSF3 pattern

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button.tsx';

const meta = {
	component: Button,
	tags: ['autodocs'],
	args: { text: 'Click me' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
```

- Use `satisfies Meta<typeof X>` for inference; derive `StoryObj<typeof meta>`.
- `tags: ['autodocs']` generates the docs page from props (JSDoc → descriptions, types → controls).
- Add at least one **play function** that drives the component and asserts with `storybook/test`.

## Documenting hooks & non-components (MDX)

Hooks aren't components, so autodocs won't pick them up. Document them with an **MDX page** — the
stories glob already includes `src/**/*.mdx`. Give it a `title` to place it in the sidebar, describe
the signature/params/returns, and render a small **live demo** that uses the hook:

```mdx
import { Meta } from '@storybook/addon-docs/blocks';
import { Button } from '../components/atoms/button/index.ts';
import { useCounter } from '../hooks/use-counter.hook.ts';

<Meta title='Hooks/useCounter' />

# useCounter

export const Demo = () => {
	const [count, increment] = useCounter();
	return <Button text={`Count: ${count}`} onClick={increment} />;
};

<Demo />
```

See `src/docs/*.mdx` for the live examples. The same pattern documents any utility or guideline page.

## Config & branding

- `.storybook/main.ts` — `addons` (docs, onboarding, links, a11y, html), `staticDirs`, framework.
  Remember: in v10, `@storybook/addon-docs` is explicit (autodocs + MDX); controls/actions/viewport
  are in the core.
- `.storybook/manager.ts` — branding via `storybook/theming/create` (logo at `.storybook/assets/logo.svg`).
- `.storybook/preview.tsx` — global decorator (`PreviewLayout`) and `virtual:uno.css` for utilities.

The custom favicon/logo (nested-layers mark) live in `.storybook/assets/`.

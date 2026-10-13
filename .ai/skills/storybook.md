# Skill: Storybook

Storybook 10 (`@storybook/react-vite`) is the dev server and the docs site. Reference stories sit
next to each component (`*.stories.tsx`); the scaffolds already follow this file.

## Imports (Storybook 10)

- Types: `import type { Meta, StoryObj } from '@storybook/react-vite';`
- Test utils: `import { expect, userEvent, within } from 'storybook/test';`
- MDX blocks: `import { Meta } from '@storybook/addon-docs/blocks';`

`@storybook/react`, `@storybook/test` and `@storybook/blocks` are the old paths; don't use them.

## Stories (CSF3)

```tsx
const meta = {
	component: Button,
	args: { text: 'Click me' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
```

- Autodocs is on globally (`.storybook/preview.tsx`), so stories don't set `tags`. JSDoc on props
  becomes the docs descriptions.
- Add a `play` function when the component has behavior worth driving (a submit, a toggle). Assert
  with `storybook/test`.

## MDX pages

- Hooks aren't components, so document each one in `use-<name>.hook.mdx` beside it: a
  `<Meta title='Hooks/<name>' />`, the signature, and a small live demo that uses the hook.
- Standalone pages (like the intro) go in `src/docs/`. The stories glob includes `src/**/*.mdx`.

## Config

- `.storybook/main.ts`: addons (docs, a11y, …), `staticDirs`, framework. Controls, actions and
  viewport are in the core.
- `.storybook/preview.tsx`: the `PreviewLayout` decorator, `virtual:uno.css`, and dark mode
  (`storybook-dark-mode` toggles a `.dark` class on the canvas).
- `.storybook/manager.ts` + `theme.ts`: branding (light and dark themes, logo in
  `.storybook/assets/`).

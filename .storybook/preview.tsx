import type { Preview } from '@storybook/react-vite';
import { dark, light } from './theme.ts';
import { PreviewLayout } from './utils/PreviewLayout.tsx';
import 'virtual:uno.css';

export default {
	// every component story gets an autodocs page by default
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<PreviewLayout>
				<Story />
			</PreviewLayout>
		),
	],
	parameters: {
		controls: {
			expanded: true,
			sort: 'requiredFirst',
			matchers: {
				color: /(?:background|color)$/iu,
				date: /date$/iu,
			},
		},
		// toolbar toggle (storybook-dark-mode) — switches chrome + canvas + docs
		darkMode: {
			current: 'light',
			dark,
			light,
			stylePreview: true,
		},
		docs: {
			toc: true,
		},
		options: {
			storySort: {
				method: 'alphabetical',
				order: [
					'Introduction',
					'Atoms',
					'Molecules',
					'Organisms',
					'Hooks',
				],
			},
		},
	},
} satisfies Preview;

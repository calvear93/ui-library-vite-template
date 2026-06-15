import type { Preview } from '@storybook/react-vite';
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
			matchers: {
				color: /(?:background|color)$/iu,
				date: /date$/iu,
			},
			sort: 'requiredFirst',
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

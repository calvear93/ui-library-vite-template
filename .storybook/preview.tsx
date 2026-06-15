import type { Preview } from '@storybook/react-vite';
import { PreviewLayout } from './utils/PreviewLayout.tsx';
import 'virtual:uno.css';

export default {
	decorators: [
		(Story) => (
			<PreviewLayout>
				<Story />
			</PreviewLayout>
		),
	],
	parameters: {
		controls: {
			matchers: {
				color: /(?:background|color)$/iu,
				date: /date$/iu,
			},
		},
		docs: {
			toc: true,
		},
	},
} satisfies Preview;

import type { Preview } from '@storybook/react';
import '../src/main.scss';
import 'virtual:uno.css';

export default {
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

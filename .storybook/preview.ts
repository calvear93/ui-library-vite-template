import type { Preview } from '@storybook/react';
import '../src/main.scss';
import 'virtual:uno.css';

export default {
	parameters: {
		backgrounds: {
			default: 'light',
			values: [
				{
					name: 'light',
					value: '#fff',
				},
				{
					name: 'dark',
					value: '#222425',
				},
				{
					name: 'black',
					value: '#000',
				},
			],
		},
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

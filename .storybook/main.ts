/* eslint-disable perfectionist/sort-objects */
import type { StorybookConfig } from '@storybook/react-vite';

export default {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	core: {
		builder: '@storybook/builder-vite',
		disableTelemetry: true,
	},
	framework: {
		name: '@storybook/react-vite',
		options: {
			strictMode: true,
		},
	},
	typescript: {
		check: true,
		reactDocgen: 'react-docgen-typescript',
	},
	addons: [
		'@storybook/addon-onboarding',
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-a11y',
		'@whitespace/storybook-addon-html',
	],
} satisfies StorybookConfig;

import type { StorybookConfig } from '@storybook/react-vite';

export default {
	addons: [
		'@storybook/addon-onboarding',
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-a11y',
		'@whitespace/storybook-addon-html',
	],
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
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	typescript: {
		check: true,
		reactDocgen: 'react-docgen-typescript',
	},
} satisfies StorybookConfig;

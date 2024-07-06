import type { StorybookConfig } from '@storybook/react-vite';

export default {
	addons: [
		'@storybook/addon-onboarding',
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
} satisfies StorybookConfig;

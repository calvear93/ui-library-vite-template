/* eslint-disable perfectionist/sort-objects */
import type { StorybookConfig } from '@storybook/react-vite';

export default {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	staticDirs: ['./assets'],
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
	// controls, actions, viewport, interactions… are bundled into the core in v9+;
	// docs (autodocs + MDX) is still an explicit addon
	addons: [
		'@storybook/addon-docs',
		'@storybook/addon-onboarding',
		'@storybook/addon-links',
		'@storybook/addon-a11y',
		'@whitespace/storybook-addon-html',
	],
	managerHead: (head) =>
		`${head}
		<link rel="icon" type="image/svg+xml" href="./favicon.svg" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;700&display=swap" rel="stylesheet" />`,
} satisfies StorybookConfig;

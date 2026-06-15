/* eslint-disable perfectionist/sort-objects */
import { create, type ThemeVars } from 'storybook/theming';

// shared brand tokens — restyle these to brand your own library
const shared = {
	brandTitle: 'UI Kit',
	brandImage: './logo.svg',
	brandTarget: '_self',

	colorPrimary: '#6366f1',
	colorSecondary: '#7c3aed',

	appBorderRadius: 10,
	inputBorderRadius: 8,

	fontBase: '"Quicksand", system-ui, sans-serif',
	fontCode: 'ui-monospace, "Cascadia Code", "Fira Code", monospace',

	barSelectedColor: '#6366f1',
	barHoverColor: '#7c3aed',
};

export const light: ThemeVars = create({
	...shared,
	base: 'light',

	appBg: '#f6f7fb',
	appContentBg: '#ffffff',
	appPreviewBg: '#ffffff',
	appBorderColor: 'rgba(99, 102, 241, 0.16)',

	textColor: '#1a1c1e',
	textMutedColor: '#5b6470',

	barBg: '#ffffff',
	barTextColor: '#5b6470',

	inputBg: '#ffffff',
	inputBorder: 'rgba(99, 102, 241, 0.2)',
	inputTextColor: '#1a1c1e',
});

export const dark: ThemeVars = create({
	...shared,
	base: 'dark',

	appBg: '#16181a',
	appContentBg: '#1e2124',
	appPreviewBg: '#1e2124',
	appBorderColor: 'rgba(255, 255, 255, 0.1)',

	textColor: '#e6e8ea',
	textMutedColor: '#9aa4b2',

	barBg: '#1e2124',
	barTextColor: '#9aa4b2',

	inputBg: '#16181a',
	inputBorder: 'rgba(255, 255, 255, 0.14)',
	inputTextColor: '#e6e8ea',
});

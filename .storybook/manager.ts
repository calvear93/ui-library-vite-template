import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

addons.setConfig({
	theme: create({
		appBorderColor: 'rgba(99, 102, 241, 0.2)',
		barTextColor: '#5b6470',
		base: 'light',
		brandImage: './logo.svg',
		brandTarget: '_self',
		brandTitle: 'UI Kit',
		colorPrimary: '#6366f1',
		colorSecondary: '#7c3aed',
	}),
});

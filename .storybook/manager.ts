import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

addons.setConfig({
	theme: create({
		base: 'light',

		brandTarget: '_self',
		brandTitle: 'React UI Kit',
		brandImage:
			'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',

		colorPrimary: '#4169E1',
		colorSecondary: '#4d6a96',

		appBorderColor: '#4d6a96',
		barTextColor: '#4d6a96',
		inputTextColor: '#4d6a96',
		textColor: '#4d6a96',
	}),
});

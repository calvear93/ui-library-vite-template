import {
	type UserConfig,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss';
import icons from 'unocss/preset-icons';
import typography from 'unocss/preset-typography';
import wind from 'unocss/preset-wind';

export default {
	presets: [typography(), wind({ preflight: true }), icons()],
	theme: {
		colors: {
			'brand-blue': '#4d6a96',
			'brand-blue-alt': '#96c5fa',
			'brand-blue-dark': '#002a6c',
			'brand-green': '#13c045',
			'brand-green-alt': '#7eff45',
			'brand-green-dark': '#004c14',
			'brand-purple': '#8b73ff',
			'brand-purple-alt': '#b8aeff',
			primary: '#00b2a9',
		},
	},
	transformers: [transformerDirectives(), transformerVariantGroup()],
} satisfies UserConfig;

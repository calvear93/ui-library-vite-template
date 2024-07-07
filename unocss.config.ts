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
	transformers: [transformerDirectives(), transformerVariantGroup()],
} satisfies UserConfig;

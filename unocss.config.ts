import {
	transformerDirectives,
	transformerVariantGroup,
	type UserConfig,
} from 'unocss';
import icons from 'unocss/preset-icons';
import typography from 'unocss/preset-typography';
import wind from 'unocss/preset-wind3';

export default {
	presets: [typography(), wind(), icons()],
	transformers: [transformerDirectives(), transformerVariantGroup()],
} satisfies UserConfig;

import { checker } from 'vite-plugin-checker';
import type { UserConfigExport } from 'vitest/config';

const TEST_DIR = '.reports';

export default {
	clearScreen: false,
	plugins: [
		checker({
			eslint: {
				dev: { logLevel: ['error'] },
				lintCommand: 'eslint --cache src/**/*.{ts,cts,mts,tsx}',
				useFlatConfig: true,
			},
			terminal: true,
			typescript: true,
		}),
	],
	test: {
		coverage: {
			exclude: [
				'**/*.{d,config,mock,fixture,interface}.?(c|m)[jt]s?(x)',
				'**/{index,main}.?(c|m)[jt]s?(x)',
				'**/__{tests,mocks,fixtures,msw}__/**/*',
			],
			include: ['src/**/*.?(c|m)[jt]s?(x)'],
			reporter: ['text', 'text-summary', 'lcov', 'cobertura', 'json'],
			reportsDirectory: `${TEST_DIR}/coverage`,
		},
		environment: 'jsdom',
		include: ['src/**/*.{spec,test}.?(c|m)[jt]s?(x)'],
		outputFile: {
			junit: `${TEST_DIR}/junit.xml`,
		},
		reporters: ['junit', 'verbose'],
		setupFiles: ['@testing-library/react/dont-cleanup-after-each'],
	},
} satisfies UserConfigExport;

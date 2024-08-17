import { checker } from 'vite-plugin-checker';
import type { UserConfigExport } from 'vitest/config';

const TEST_DIR = '.reports';

export default {
	clearScreen: false,
	plugins: [
		checker({
			eslint: {
				dev: { logLevel: ['error'] },
				lintCommand: 'eslint --cache src/**/*.{ts,mts,tsx}',
				useFlatConfig: true,
			},
			terminal: true,
			typescript: true,
		}),
	],
	test: {
		coverage: {
			exclude: [
				'**/*.{d,config,mock,fixture,interface,stories}.?(m)[jt]s?(x)',
				'**/{index,main}.?(m)[jt]s?(x)',
				'**/__{tests,mocks,fixtures}__/**/*',
			],
			include: ['src/**/*.?(m)[jt]s?(x)'],
			reporter: ['text', 'text-summary', 'lcov', 'cobertura', 'json'],
			reportsDirectory: `${TEST_DIR}/coverage`,
		},
		environment: 'jsdom',
		include: ['src/**/*.{spec,test}.?(m)[jt]s?(x)'],
		reporters: ['verbose'],
		setupFiles: [
			'@testing-library/react/dont-cleanup-after-each',
			'@testing-library/jest-dom/vitest',
		],
	},
} satisfies UserConfigExport;

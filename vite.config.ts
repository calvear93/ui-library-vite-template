import { writeFile } from 'node:fs/promises';
import { join, parse } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { globStream } from 'glob';
import css from 'unocss/vite';
import { type PluginOption, type UserConfigExport } from 'vite';
import { checker } from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';
import { libInjectCss as injectCss } from 'vite-plugin-lib-inject-css';
import packageJson from './package.json';
import { compilerOptions } from './tsconfig.json';

const SRC = {
	EXCLUDE: [
		'**/*.{mock,fixture,spec,test}.?(m)[jt]s?(x)',
		'**/*.{stories}.?(m)[jt]s',
		'**/__{tests,mocks,fixtures}__/**/*',
	],
	INCLUDE: ['src/**/*.?(m)[jt]s?(x)'],
};

const { entryfiles, libExports } = await getEntryfiles();

// https://vitejs.dev/config/
export default {
	build: {
		cssCodeSplit: true,
		emptyOutDir: true,
		lib: {
			entry: entryfiles,
			formats: ['es'],
		},
		rollupOptions: {
			external: [
				...Object.keys(packageJson.dependencies),
				...Object.keys(packageJson.devDependencies),
				'react/jsx-runtime',
			],
			output: {
				assetFileNames: 'assets/[name].[ext]',
				chunkFileNames: '[name]',
				compact: true,
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},
			treeshake: true,
		},
		sourcemap: compilerOptions.sourceMap,
		target: compilerOptions.target,
	},
	clearScreen: false,
	plugins: [
		checker({
			enableBuild: true,
			eslint: {
				lintCommand: 'eslint --cache src/**/*.{ts,mts,tsx}',
				useFlatConfig: true,
			},
			stylelint: {
				lintCommand: 'stylelint --cache src/**/*.{css,scss,sass}',
			},
			terminal: true,
			typescript: true,
		}),
		react(),
		css(),
		injectCss(),
		dts({
			entryRoot: 'src',
			exclude: SRC.EXCLUDE,
			include: SRC.INCLUDE,
			logLevel: 'silent',
		}),
		pkgJson(),
	],
} satisfies UserConfigExport;

/**
 * Generates build package.json.
 */
function pkgJson(): PluginOption {
	return {
		name: 'package-json-gen',
		writeBundle: async () => {
			const pkg = {
				description: packageJson.description,
				engines: packageJson.engines,
				exports: libExports,
				main: 'main.js',
				module: 'main.js',
				name: packageJson.name,
				peerDependencies: packageJson.dependencies,
				private: true,
				sideEffects: ['**/*.css'],
				type: packageJson.type,
				types: 'main.d.ts',
				version: packageJson.version,
			};

			await writeFile('dist/package.json', JSON.stringify(pkg, null, 4));
		},
	};
}

/**
 * Calculates Rollup input entryfiles.
 *
 * @param glob - matching glob pattern
 */
async function getEntryfiles() {
	const entryfiles: Record<string, string> = {};
	const libExports: Record<string, { import: string; types: string }> = {};

	for await (const buffer of globStream(SRC.INCLUDE, {
		ignore: SRC.EXCLUDE,
	})) {
		const path = buffer.toString();
		const { dir, name } = parse(path);
		// removes src root from path
		const key = join(dir.replace(/src[/\\]?/iu, ''), name);

		entryfiles[key] = path;
		libExports[name === 'main' ? '.' : `./${name}`] = {
			import: `./${key}.js`,
			types: `./${key}.d.ts`,
		};
	}

	return { entryfiles, libExports };
}

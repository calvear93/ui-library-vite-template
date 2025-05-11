import react from '@vitejs/plugin-react-swc';
import { globStream } from 'glob';
import { copyFile, writeFile } from 'node:fs/promises';
import { join, parse } from 'node:path';
import css from 'unocss/vite';
import { type PluginOption, type UserConfigExport } from 'vite';
import { checker } from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';
import { libInjectCss as injectCss } from 'vite-plugin-lib-inject-css';
import packageJson from './package.json';
import { compilerOptions } from './tsconfig.json';

const SRC = {
	INCLUDE: ['src/**/*.?(m)[jt]s?(x)'],
	EXCLUDE: [
		'**/*.{mock,fixture,spec,test,stories}.?(m)[jt]s?(x)',
		'**/__{tests,mocks,fixtures,stories}__/**/*',
	],
};

const { entryfiles, libExports } = await getEntryfiles();

// https://vitejs.dev/config/
export default {
	clearScreen: false,
	build: {
		cssCodeSplit: true,
		emptyOutDir: true,
		sourcemap: compilerOptions.sourceMap,
		target: compilerOptions.target,
		lib: {
			entry: entryfiles,
			formats: ['es'],
		},
		rollupOptions: {
			treeshake: true,
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
		},
	},
	plugins: [
		checker({
			enableBuild: true,
			terminal: true,
			typescript: true,
			eslint: {
				lintCommand: 'eslint --cache src/**/*.{ts,mts,tsx}',
				useFlatConfig: true,
			},
			stylelint: {
				lintCommand: 'stylelint --cache src/**/*.css',
			},
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
		docs(),
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
				sideEffects: ['**/*.css'],
				description: packageJson.description,
				engines: packageJson.engines,
				exports: libExports,
				main: 'main.js',
				module: 'main.js',
				name: packageJson.name,
				peerDependencies: packageJson.dependencies,
				type: packageJson.type,
				types: 'main.d.ts',
				version: packageJson.version,
			};

			await writeFile('dist/package.json', JSON.stringify(pkg, null, 4));
		},
	};
}

/**
 * Copies docs in output.
 */
function docs(): PluginOption {
	return {
		name: 'docs',
		writeBundle: async () => {
			await copyFile('README.md', 'dist/README.md');
			await copyFile('LICENSE.md', 'dist/LICENSE.md');
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
	const libExports: Record<
		string,
		{ import: string; style?: string; types?: string }
	> = {};

	for await (const buffer of globStream(SRC.INCLUDE, {
		ignore: SRC.EXCLUDE,
	})) {
		const path = buffer.toString();
		const { dir, ext, name } = parse(path);
		// removes src root from path
		const key = join(dir.replace(/src[/\\]?/iu, ''), name);
		const exportKey = name === 'main' ? '.' : `./${name}`;

		entryfiles[key] = path;

		libExports[exportKey] = {
			import: `./${key}.js`,
			types: `./${key}.d.ts`,
		};
		// per component stylesheet
		if (ext === '.tsx') {
			libExports[exportKey].style = `./assets\\${name}.css`;
		}
	}

	// main stylesheet
	libExports['./styles.css'] = {
		import: String.raw`./assets\main.css`,
	};

	return { entryfiles, libExports };
}

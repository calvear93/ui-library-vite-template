import react from '@vitejs/plugin-react';
import { globStream } from 'glob';
import { copyFile, writeFile } from 'node:fs/promises';
import { posix } from 'node:path';
import css from 'unocss/vite';
import { type PluginOption, type UserConfigExport } from 'vite';
import { checker } from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';
import { libInjectCss as injectCss } from 'vite-plugin-lib-inject-css';
import packageJson from './package.json';
import { compilerOptions } from './tsconfig.json';

// react/react-dom live in devDependencies (peer for consumers); a runtime
// `dependencies` block is optional, so it is typed in defensively here.
const pkg = packageJson as typeof packageJson & {
	dependencies?: Record<string, string>;
};

const SRC = {
	INCLUDE: ['src/**/*.?(m)[jt]s?(x)'],
	EXCLUDE: [
		'**/*.{mock,fixture,spec,test,stories}.?(m)[jt]s?(x)',
		'**/__{tests,mocks,fixtures,stories}__/**/*',
	],
};

const { entryfiles, libExports } = await getEntryfiles();

// https://vite.dev/config/
export default {
	clearScreen: false,
	build: {
		cssCodeSplit: true,
		emptyOutDir: true,
		sourcemap: compilerOptions.sourceMap,
		// explicit, conservative target for a redistributable library
		// (consumers re-down-level as needed); do not bake a browserslist snapshot
		target: 'es2022',
		lib: {
			entry: entryfiles,
			formats: ['es'],
		},
		// vite 8 is Rolldown-based: `rollupOptions` is now `rolldownOptions`
		rolldownOptions: {
			external: [
				...Object.keys(pkg.dependencies ?? {}),
				...Object.keys(pkg.devDependencies),
				'react/jsx-runtime',
				/^react(?:$|\/)/u,
				/^react-dom(?:$|\/)/u,
			],
			output: {
				assetFileNames: 'assets/[name].[ext]',
				chunkFileNames: '[name].js',
				entryFileNames: '[name].js',
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
			tsconfigPath: './tsconfig.json',
		}),
		pkgJson(),
		docs(),
	],
} satisfies UserConfigExport;

/**
 * Generates the published `dist/package.json` (the library is published from
 * `dist/`, which carries its own manifest).
 */
function pkgJson(): PluginOption {
	return {
		name: 'package-json-gen',
		writeBundle: async () => {
			const manifest = {
				description: packageJson.description,
				engines: packageJson.engines,
				exports: libExports,
				keywords: packageJson.keywords,
				license: packageJson.license,
				main: './main.js',
				module: './main.js',
				name: packageJson.name,
				repository: packageJson.repository,
				sideEffects: ['**/*.css'],
				type: packageJson.type,
				types: './main.d.ts',
				version: packageJson.version,
				// wide peer range so consumers on React 18 or 19 can install
				peerDependencies: {
					react: '>=18',
					'react-dom': '>=18',
				},
			};

			await writeFile(
				'dist/package.json',
				JSON.stringify(manifest, null, 4),
			);
		},
	};
}

/**
 * Copies docs into the output.
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
 * Calculates Rolldown input entry files and the published `exports` map.
 *
 * Every path is normalized to POSIX forward slashes so the generated
 * `exports` resolve correctly on every platform (and npm).
 */
async function getEntryfiles() {
	const entryfiles: Record<string, string> = {};
	const libExports: Record<
		string,
		string | { import: string; types: string; style?: string }
	> = {};

	for await (const buffer of globStream(SRC.INCLUDE, {
		ignore: SRC.EXCLUDE,
	})) {
		const path = buffer.toString().replaceAll('\\', '/');
		const { dir, ext, name } = posix.parse(path);
		// folder barrels (index.ts) are internal; main.ts re-exports them,
		// so they should not become their own subpath export
		if (name === 'index') continue;
		// removes the `src` root from the path
		const key = posix.join(dir.replace(/^src\/?/iu, ''), name);
		const exportKey = name === 'main' ? '.' : `./${name}`;

		entryfiles[key] = path;

		const entry: { import: string; types: string; style?: string } = {
			import: `./${key}.js`,
			types: `./${key}.d.ts`,
		};
		// per-component stylesheet (injected by vite-plugin-lib-inject-css)
		if (ext === '.tsx') {
			entry.style = `./assets/${name}.css`;
		}

		libExports[exportKey] = entry;
	}

	// expose the generated manifest for tooling that reads it
	libExports['./package.json'] = './package.json';

	return { entryfiles, libExports };
}

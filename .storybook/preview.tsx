import type { Preview } from '@storybook/react-vite';
import { type PropsWithChildren } from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { dark, light } from './theme.ts';
import { PreviewLayout } from './utils/PreviewLayout.tsx';
import 'virtual:uno.css';

// syncs the preview (canvas + components) with the dark-mode toolbar toggle by
// applying a `.dark` class that the component CSS reacts to.
const ThemeWrapper = ({ children }: PropsWithChildren) => {
	const isDark = useDarkMode();

	return <div className={isDark ? 'dark' : ''}>{children}</div>;
};

export default {
	// every component story gets an autodocs page by default
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<ThemeWrapper>
				<PreviewLayout>
					<Story />
				</PreviewLayout>
			</ThemeWrapper>
		),
	],
	parameters: {
		controls: {
			expanded: true,
			sort: 'requiredFirst',
			matchers: {
				color: /(?:background|color)$/iu,
				date: /date$/iu,
			},
		},
		// toolbar toggle (storybook-dark-mode) — switches chrome + canvas + docs
		darkMode: {
			current: 'light',
			dark,
			light,
			stylePreview: true,
		},
		docs: {
			toc: true,
		},
		options: {
			storySort: {
				method: 'alphabetical',
				order: [
					'Introduction',
					'Atoms',
					'Molecules',
					'Organisms',
					'Hooks',
				],
			},
		},
	},
} satisfies Preview;

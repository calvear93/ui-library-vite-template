import { DocsContainer } from '@storybook/addon-docs/blocks';
import type { Preview } from '@storybook/react-vite';
import { type ComponentProps, type PropsWithChildren } from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { dark, light } from './theme.ts';
import { PreviewLayout } from './utils/PreviewLayout.tsx';
import 'virtual:uno.css';

// syncs the story canvas (and component `.dark` styles) with the toolbar toggle
const ThemeWrapper = ({ children }: PropsWithChildren) => {
	const isDark = useDarkMode();

	return <div className={isDark ? 'dark' : ''}>{children}</div>;
};

// syncs the MDX / autodocs pages with the toolbar toggle
const DocsContainerWithTheme = ({
	children,
	context,
}: ComponentProps<typeof DocsContainer>) => {
	const isDark = useDarkMode();

	return (
		<DocsContainer context={context} theme={isDark ? dark : light}>
			{children}
		</DocsContainer>
	);
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
			container: DocsContainerWithTheme,
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
					'Layouts',
					'Hooks',
				],
			},
		},
	},
} satisfies Preview;

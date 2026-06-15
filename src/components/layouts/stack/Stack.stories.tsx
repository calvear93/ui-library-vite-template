import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from './Stack.tsx';

const items = ['One', 'Two', 'Three'].map((label) => (
	<div
		key={label}
		style={{
			background: '#e0e7ff',
			borderRadius: '0.5rem',
			padding: '0.75rem 1rem',
		}}
	>
		{label}
	</div>
));

const meta = {
	args: { children: items, direction: 'column', gap: 1 },
	component: Stack,
	title: 'Layouts/Stack',
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Column: Story = {};

export const Row: Story = {
	args: { direction: 'row' },
};

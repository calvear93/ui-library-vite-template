import type { Meta, StoryObj } from '@storybook/react-vite';
import { ___ComponentName___ } from './___ComponentName___.tsx';

const meta = {
	args: {
		children: (
			<>
				<div>One</div>
				<div>Two</div>
				<div>Three</div>
			</>
		),
	},
	component: ___ComponentName___,
	title: 'Layouts/___ComponentName___',
} satisfies Meta<typeof ___ComponentName___>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Row: Story = {
	args: { direction: 'row' },
};

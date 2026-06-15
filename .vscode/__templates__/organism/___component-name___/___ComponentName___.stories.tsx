import type { Meta, StoryObj } from '@storybook/react-vite';
import { ___ComponentName___ } from './___ComponentName___.tsx';

const meta = {
	args: { children: 'content', title: '___ComponentName___' },
	component: ___ComponentName___,
	title: 'Organisms/___ComponentName___',
} satisfies Meta<typeof ___ComponentName___>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import type { Meta, StoryObj } from '@storybook/react';
import { SampleInput } from './SampleInput.tsx';

// metadata
type MetaData = Meta<typeof SampleInput>;
type Story = StoryObj<typeof meta>;

const meta: MetaData = {
	component: SampleInput,
	tags: ['autodocs'],
	args: {
		type: 'text',
	},
};

// stories
export const MyLabel: Story = {
	args: {
		id: 'id',
		label: 'My Label',
	},
};

export default meta;

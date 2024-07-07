import type { Meta, StoryObj } from '@storybook/react';
import { SampleInput } from './SampleInput.tsx';

// metadata
type MetaData = Meta<typeof SampleInput>;
type Story = StoryObj<typeof meta>;

const meta: MetaData = {
	args: {
		type: 'text',
	},
	component: SampleInput,
	tags: ['autodocs'],
};

// stories
export const MyLabel: Story = {
	args: {
		id: 'id',
		label: 'My Label',
	},
};

export default meta;

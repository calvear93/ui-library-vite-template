import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { SampleButton } from './SampleButton.tsx';

// metadata
type MetaData = Meta<typeof SampleButton>;
type Story = StoryObj<typeof meta>;

const meta: MetaData = {
	component: SampleButton,
	tags: ['autodocs'],
	args: {
		text: 'Default',
	},
};
export default meta;

// stories
export const WithMyText: Story = {
	args: {
		text: 'My Text',
	},
};

export const OtherText: Story = {
	args: {
		text: 'Other Text',
	},
};

export const OnHover: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: /default/iu });
		await expect(button).toBeInTheDocument();
		await userEvent.hover(button);
	},
};

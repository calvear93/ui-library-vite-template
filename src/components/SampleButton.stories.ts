import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { SampleButton } from './SampleButton.tsx';

const meta = {
	args: {
		text: 'Default',
	},
	component: SampleButton,
	tags: ['autodocs'],
	title: 'Examples/SampleButton',
} satisfies Meta<typeof SampleButton>;

type Story = StoryObj<typeof meta>;

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

export default meta;

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from './Field.tsx';

const meta = {
	args: { label: 'Email', placeholder: 'you@example.com', type: 'email' },
	component: Field,
	tags: ['autodocs'],
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

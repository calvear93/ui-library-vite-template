import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignUpForm } from './SignUpForm.tsx';

const meta = {
	component: SignUpForm,
	tags: ['autodocs'],
} satisfies Meta<typeof SignUpForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

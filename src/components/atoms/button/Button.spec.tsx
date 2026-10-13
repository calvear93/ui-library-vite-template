import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { Button } from './Button.tsx';

afterEach(cleanup);

describe('Button', () => {
	test('renders its text', () => {
		render(<Button text='Save' />);

		expect(
			screen.getByRole('button', { name: 'Save' }),
		).toBeInTheDocument();
	});

	test('handles clicks', async () => {
		const onClick = vi.fn();
		render(<Button onClick={onClick} text='Save' />);

		await userEvent.click(screen.getByRole('button', { name: 'Save' }));

		expect(onClick).toHaveBeenCalledOnce();
	});

	test('merges a consumer className with its own styles', () => {
		render(<Button className='custom' text='Merge' />);

		const button = screen.getByRole('button', { name: 'Merge' });

		expect(button).toHaveClass('custom');
		expect(button.classList.length).toBeGreaterThan(1);
	});
});

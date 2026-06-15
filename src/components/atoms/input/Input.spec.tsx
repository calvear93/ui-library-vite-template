import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test } from 'vitest';
import { Input } from './Input.tsx';

afterEach(cleanup);

describe('Input', () => {
	test('accepts typing', async () => {
		render(<Input aria-label='name' />);

		const input = screen.getByLabelText('name');
		await userEvent.type(input, 'hello');

		expect(input).toHaveValue('hello');
	});
});

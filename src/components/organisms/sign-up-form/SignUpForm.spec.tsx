import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { SignUpForm } from './SignUpForm.tsx';

afterEach(cleanup);

describe('SignUpForm', () => {
	test('renders its fields and submit button', () => {
		render(<SignUpForm />);

		expect(screen.getByLabelText('Email')).toBeInTheDocument();
		expect(screen.getByLabelText('Password')).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: 'Sign up' }),
		).toBeInTheDocument();
	});
});

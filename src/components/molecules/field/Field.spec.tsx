import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { Field } from './Field.tsx';

afterEach(cleanup);

describe('Field', () => {
	test('links the label to the input', () => {
		render(<Field label='Email' />);

		expect(screen.getByLabelText('Email')).toBeInTheDocument();
	});
});

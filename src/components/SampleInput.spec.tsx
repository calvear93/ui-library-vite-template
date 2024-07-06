import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { SampleInput } from './SampleInput.tsx';

export default { component: SampleInput };
describe(SampleInput, () => {
	// tests
	test('renders input with label and "type" from props', () => {
		const id = 'id';
		const type = 'text';
		const label = 'My Input';

		render(<SampleInput id={id} label={label} type={type} />);
		const input = screen.getByLabelText<HTMLInputElement>(label);

		expect(input.type).toBe(type);
	});

	test('input allows to write and sets its value', () => {
		const id = 'id';
		const type = 'text';
		const label = 'My Input';

		const textValue = 'A';

		render(<SampleInput id={id} label={label} type={type} />);
		const input = screen.getByLabelText<HTMLInputElement>(label);

		fireEvent.input(input, { target: { value: textValue } });
		// or await userEvent.type(input, 'A');

		expect(input.value).toBe(textValue);
	});
});

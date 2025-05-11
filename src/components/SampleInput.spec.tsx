import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { SampleInput } from './SampleInput.tsx';

export default { component: SampleInput };
describe(SampleInput, () => {
	// hooks
	const renderSampleInput = () => {
		const id = 'id';
		const type = 'text';
		const label = 'My Input';

		render(<SampleInput id={id} label={label} type={type} />);

		return { id, label, type };
	};

	afterEach(cleanup);

	// tests
	test('renders input with label and "type" from props', () => {
		const { label, type } = renderSampleInput();

		const input = screen.getByLabelText<HTMLInputElement>(label);

		expect(input.type).toBe(type);
	});

	test('input allows to write and sets its value', () => {
		const { label } = renderSampleInput();
		const textValue = 'A';

		const input = screen.getByLabelText<HTMLInputElement>(label);

		fireEvent.input(input, { target: { value: textValue } });
		// or await userEvent.type(input, 'A');

		expect(input.value).toBe(textValue);
	});
});

import { render, screen } from '@testing-library/react';
import { describe, test } from 'vitest';
import { SampleButton } from './SampleButton.tsx';

describe(SampleButton, () => {
	// tests
	test('has text', () => {
		const text = 'any text';

		render(<SampleButton text={text} />);

		screen.getByText(text);
	});
});

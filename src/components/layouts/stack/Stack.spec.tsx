import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { Stack } from './Stack.tsx';

afterEach(cleanup);

describe('Stack', () => {
	test('renders its children', () => {
		render(
			<Stack>
				<span>child</span>
			</Stack>,
		);

		expect(screen.getByText('child')).toBeInTheDocument();
	});

	test('lays out along the given direction', () => {
		render(<Stack direction='row'>content</Stack>);

		expect(screen.getByText('content')).toHaveStyle({
			flexDirection: 'row',
		});
	});
});

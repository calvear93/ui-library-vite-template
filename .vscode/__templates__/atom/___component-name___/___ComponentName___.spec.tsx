import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { ___ComponentName___ } from './___ComponentName___.tsx';

afterEach(cleanup);

describe('___ComponentName___', () => {
	test('renders its children', () => {
		render(<___ComponentName___>content</___ComponentName___>);

		expect(screen.getByText('content')).toBeInTheDocument();
	});
});

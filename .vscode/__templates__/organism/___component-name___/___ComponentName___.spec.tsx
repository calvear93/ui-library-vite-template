import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { ___ComponentName___ } from './___ComponentName___.tsx';

afterEach(cleanup);

describe('___ComponentName___', () => {
	test('renders its title as a heading', () => {
		render(
			<___ComponentName___ title='Panel'>content</___ComponentName___>,
		);

		expect(
			screen.getByRole('heading', { name: 'Panel' }),
		).toBeInTheDocument();
	});
});

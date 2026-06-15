import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { ___ComponentName___ } from './___ComponentName___.tsx';

afterEach(cleanup);

describe('___ComponentName___', () => {
	test('renders its label', () => {
		render(
			<___ComponentName___ label='Email'>content</___ComponentName___>,
		);

		expect(screen.getByText('Email')).toBeInTheDocument();
	});
});

import { renderHookFactory } from '#testing';
import { act } from 'react';
import { describe, expect, test } from 'vitest';
import { useCounter } from './use-counter.hook.ts';

describe(useCounter, () => {
	const renderUserCounter = renderHookFactory(useCounter);

	// tests
	test('initial counter state is 0 by default', () => {
		const expectedDefaultValue = 0;
		const { get } = renderUserCounter();

		expect(get()).toBe(expectedDefaultValue);
	});

	test('initial counter state respect args', () => {
		const initialValue = 10;
		const { get } = renderUserCounter(initialValue);

		expect(get()).toBe(initialValue);
	});

	test('increment increases counter to 1', () => {
		const initialValue = 10;
		const { get, set: increment } = renderUserCounter(initialValue);

		act(increment);

		expect(get()).toBe(initialValue + 1);
	});
});

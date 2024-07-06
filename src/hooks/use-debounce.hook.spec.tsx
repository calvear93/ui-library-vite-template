import { renderHookFactory, useFakeTimers } from '#testing';
import { describe, expect, test, vi } from 'vitest';
import { useDebounceState } from './use-debounce.hook.ts';

describe(useDebounceState, () => {
	const renderDebounceState = renderHookFactory(useDebounceState);

	// hooks
	useFakeTimers();

	// tests
	test('initialValue is setted', () => {
		const initialValue = 'initial state value';
		const { get } = renderDebounceState(initialValue);

		expect(get()).toBe(initialValue);
	});

	test('set state, changes it after the interval', async () => {
		const newValue = 'new value';
		const { get, set } = renderDebounceState(null, 1);

		set(newValue);
		await vi.advanceTimersToNextTimerAsync();

		expect(get()).toBe(newValue);
	});

	test('set state, skips intermediate changes before interval', async () => {
		const firstValue = 'first value';
		const lastValue = 'last value';
		const { get, set } = renderDebounceState(null, 1);

		set(firstValue);
		const settedFirstValue = get();
		set(lastValue);
		await vi.advanceTimersToNextTimerAsync();

		expect(settedFirstValue).not.toBe(firstValue);
		expect(get()).toBe(lastValue);
	});
});

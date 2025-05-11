import { act } from '@testing-library/react';
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

		await act(() => {
			set(newValue);
			return vi.advanceTimersToNextTimerAsync();
		});

		expect(get()).toBe(newValue);
	});

	test('set state, skips intermediate changes before interval', async () => {
		const firstValue = 'first value';
		const lastValue = 'last value';
		const { get, set } = renderDebounceState(null, 1);

		await act(() => set(firstValue));
		const settedFirstValue = get();
		await act(() => {
			set(lastValue);
			return vi.advanceTimersToNextTimerAsync();
		});

		expect(settedFirstValue).not.toBe(firstValue);
		expect(get()).toBe(lastValue);
	});
});

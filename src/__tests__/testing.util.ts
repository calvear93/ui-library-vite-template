import { afterAll, beforeAll, vi } from 'vitest';

export const useFakeTimers = () => {
	beforeAll(() => vi.useFakeTimers());

	afterAll(() => vi.useRealTimers());
};

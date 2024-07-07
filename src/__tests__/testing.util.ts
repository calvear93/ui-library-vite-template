import { afterAll, beforeAll, vi } from 'vitest';

export const useFakeTimers = () => {
	beforeAll(() => void vi.useFakeTimers());

	afterAll(() => void vi.useRealTimers());
};

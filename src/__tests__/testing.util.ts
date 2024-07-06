import { afterAll, beforeAll, vi } from 'vitest';

export default {};
export const useFakeTimers = () => {
	beforeAll(() => void vi.useFakeTimers());

	afterAll(() => void vi.useRealTimers());
};

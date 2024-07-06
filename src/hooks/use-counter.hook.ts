import { useState } from 'react';

/**
 * Creates a counter state with 'increment' action.
 *
 * @param initialValue - initial counter value
 */
export const useCounter = (initialValue = 0) => {
	const [counter, setCounter] = useState(initialValue);

	return [counter, () => setCounter((counter) => counter + 1)] as const;
};

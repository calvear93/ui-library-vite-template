import { useState } from 'react';

/**
 * use___HookName___ hook.
 *
 * @param initialValue - the starting value
 */
export const use___HookName___ = (initialValue = 0) => {
	const [value, setValue] = useState(initialValue);

	return [value, setValue] as const;
};

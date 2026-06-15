import { type SetStateAction, useRef, useState } from 'react';

export const useDebounceState = <S>(initialState?: S, interval = 200) => {
	const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [state, setState] = useState(initialState);

	return [
		state,
		(value: SetStateAction<S | undefined>) => {
			if (timeout.current) clearTimeout(timeout.current);

			timeout.current = setTimeout(() => setState(value), interval);
		},
	] as const;
};

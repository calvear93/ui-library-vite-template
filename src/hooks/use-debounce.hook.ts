import { useRef, useState } from 'react';

export default {};
export const useDebounceState = <S>(initialState?: S, interval = 200) => {
	const timeout = useRef<NodeJS.Timeout>();
	const [state, setState] = useState(initialState);

	return [
		state,
		(value: React.SetStateAction<S | undefined>) => {
			if (timeout.current) clearTimeout(timeout.current);

			timeout.current = setTimeout(() => setState(value), interval);
		},
	] as const;
};

import { renderHook } from '@testing-library/react';

type Fn = (...args: any[]) => any;

export const renderHookFactory =
	<H extends Fn>(use: H) =>
	(...args: Parameters<H>) => {
		const { rerender, result, unmount } = renderHook(() => use(...args));

		return {
			rerender,
			set: result.current[1],
			unmount,
			get: () => result.current[0],
		};
	};

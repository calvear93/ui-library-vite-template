import { renderHook } from '@testing-library/react';

export default {};
type Fn = (...args: any[]) => any;

export const renderHookFactory =
	<H extends Fn>(use: H) =>
	(...args: Parameters<H>) => {
		const { rerender, result, unmount } = renderHook(() => use(...args));

		return {
			get: () => result.current[0],
			rerender,
			set: result.current[1],
			unmount,
		};
	};

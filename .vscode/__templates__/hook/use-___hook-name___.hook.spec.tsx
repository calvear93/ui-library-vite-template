import { renderHookFactory } from '#testing';
import { describe, expect, test } from 'vitest';
import { use___HookName___ } from './use-___hook-name___.hook.ts';

describe('use___HookName___', () => {
	const render___HookName___ = renderHookFactory(use___HookName___);

	test('returns the initial value', () => {
		const { get } = render___HookName___(5);

		expect(get()).toBe(5);
	});
});

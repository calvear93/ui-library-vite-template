# Skill: testing

The stack is Vitest 5, Testing Library and happy-dom. Specs sit beside the source as
`*.spec.tsx` (hooks: `*.hook.spec.tsx`). Reference code: `atoms/button/Button.spec.tsx` and
`src/hooks/*.hook.spec.tsx`. The scaffolds already follow this file.

## The two surprises

- **Auto-cleanup is off** (`vitest.config.ts` loads `dont-cleanup-after-each`). Component specs
  call `afterEach(cleanup)`.
- **Globals are off.** Import `describe`, `test`, `expect` and `vi` from `vitest`.

## Shape

```tsx
afterEach(cleanup);

describe('Button', () => {
	test('handles clicks', async () => {
		const onClick = vi.fn();
		render(<Button onClick={onClick} text='Save' />);

		await userEvent.click(screen.getByRole('button', { name: 'Save' }));

		expect(onClick).toHaveBeenCalledOnce();
	});
});
```

- Query by role or label through `screen`; a role/name query doubles as an a11y check. Always
  `await userEvent.*`.
- Hooks: `renderHookFactory(useX)` from `#testing` returns `{ get, set, rerender, unmount }` for
  `[value, setter]` hooks; otherwise use `renderHook`. Timers: `useFakeTimers()` from `#testing`
  inside the `describe`.
- Cover the happy path, an edge or disabled state, and the accessible name. A component that
  takes `className` gets a merge test.
- Coverage target is ≥ 80% (`main.ts`, `index.ts`, stories and `__tests__` are excluded).

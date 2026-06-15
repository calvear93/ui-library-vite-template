# Prompt: create a hook

Scaffold a reusable hook under `src/hooks/`.

> In VSCode, the Template Tool scaffolds these from `.vscode/__templates__/hook/` — right-click
> `src/hooks/` → "New From Template". The steps below are the manual equivalent.

## Steps

1. Create `src/hooks/use-<name>.hook.ts`, `src/hooks/use-<name>.hook.spec.tsx`, and
   `src/hooks/use-<name>.hook.mdx` (Storybook doc: `<Meta title="Hooks/use<Name>" />` + a live
   demo). Storybook auto-picks the MDX up via the `src/**/*.mdx` glob — no registration needed.
2. Export a named `use<Name>` function with JSDoc; type inputs and the return value (prefer a
   `readonly` tuple via `as const`, like `useCounter`).
3. Keep it portable: use browser-safe types — e.g. `ReturnType<typeof setTimeout>`, **not**
   `NodeJS.Timeout` (this is a browser library; the Node global isn't in scope).
4. Re-export from `src/main.ts`.
5. Test with `renderHook` (see `src/__tests__/hooks.util.ts` and the `#testing` alias). Use
   `vi.useFakeTimers()` (via `useFakeTimers` from `#testing`) for time-based hooks.
6. Verify: `pnpm lint && pnpm test && pnpm build`.

## Skeleton

```ts
import { useState } from 'react';

/**
 * Short description.
 *
 * @param initialValue - the starting value
 */
export const useName = (initialValue = 0) => {
	const [value, setValue] = useState(initialValue);

	return [value, () => setValue((v) => v + 1)] as const;
};
```

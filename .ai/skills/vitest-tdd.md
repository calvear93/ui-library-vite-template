# Testing (Vitest + RTL)

Vitest 4 + React Testing Library on happy-dom. Tests live beside the source as `*.spec.tsx`.

## Pattern

```tsx
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { Button } from './Button.tsx';

afterEach(cleanup);

describe('Button', () => {
	test('handles clicks', async () => {
		const onClick = vi.fn();
		render(<Button text='Save' onClick={onClick} />);

		await userEvent.click(screen.getByRole('button', { name: 'Save' }));

		expect(onClick).toHaveBeenCalledOnce();
	});
});
```

## Rules

- **Query by role/label/text** via `screen`, not container or test ids — assert what users perceive.
- **`userEvent`** for interactions (always `await` it).
- Globals are **off** — import `describe`/`test`/`expect`/`vi` from `vitest`.
- Auto-cleanup is disabled by the setup; call `afterEach(cleanup)` in component specs so renders
  don't leak between tests.
- Cover the happy path, an edge/disabled state, and an accessibility assertion.
- Hooks: test with `renderHook` (see `src/__tests__/hooks.util.ts` and the `#testing` alias).
- Coverage runs via `pnpm test`; meaningful assertions matter more than the number — `pnpm test:mutation`
  (Stryker) validates that the tests actually catch regressions.
